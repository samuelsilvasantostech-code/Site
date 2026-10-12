"use client";

import { Environment, Float, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

import { hero } from "@/content/data";

import { CoreLogo } from "./core-logo";
import { SystemNetwork, type SceneState } from "./system-network";

/** Inclinação máxima da cena seguindo o mouse (12°). */
const MAX_TILT = THREE.MathUtils.degToRad(12);

/** Poeira de fundo: dá profundidade sem chamar atenção. */
function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    // Gerador determinístico: a mesma "poeira" em toda visita.
    let seed = 7;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + random() * 6;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      array[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#8A94A6"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

/** Atualiza o progresso de saída do hero (0 → 1) no estado da cena. */
function readScroll(state: SceneState, el: HTMLElement | null) {
  if (el) {
    const rect = el.getBoundingClientRect();
    state.scroll = THREE.MathUtils.clamp(-rect.top / rect.height, 0, 1);
  }
  return state.scroll;
}

function dampCameraZ(camera: THREE.Camera, target: number, delta: number) {
  camera.position.z = THREE.MathUtils.damp(camera.position.z, target, 6, delta);
}

/**
 * A cena: núcleo + sistemas, deslocada para a direita em telas largas (o texto
 * ocupa a esquerda). Inclina na direção do mouse e, ao rolar, a câmera recua.
 */
function Rig({
  state,
  container,
  labelsRef,
  glass,
}: {
  state: RefObject<SceneState>;
  container: RefObject<HTMLDivElement | null>;
  labelsRef: RefObject<HTMLDivElement | null>;
  glass: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const frameGroup = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);
  const wide = viewport.aspect > 1.15;
  // Em telas estreitas a cena encolhe e sobe, longe do texto.
  const offset: [number, number, number] = wide
    ? [viewport.width * 0.27, 0.15, 0]
    : [0, viewport.height * 0.2, 0];
  const scale = wide ? 1 : 0.62;

  useFrame((frame, delta) => {
    const scroll = readScroll(state.current, container.current);
    // Ao rolar, a câmera recua e a cena "abre espaço" para a seção seguinte.
    dampCameraZ(frame.camera, 10 + scroll * 4, delta);

    // A cena vem para o centro conforme os sistemas se alinham.
    const outer = frameGroup.current;
    if (outer) outer.position.x = offset[0] * (1 - Math.min(scroll / 0.85, 1) * 0.85);

    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, frame.pointer.x * MAX_TILT, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -frame.pointer.y * MAX_TILT, 3, delta);
  });

  return (
    <group ref={frameGroup} position={offset} scale={scale}>
      <group ref={group}>
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
          <CoreLogo glass={glass} />
        </Float>
        <SystemNetwork labels={hero.diagram.nodes} state={state} labelsRef={labelsRef} animate />
      </group>
    </group>
  );
}

type HeroSceneProps = {
  /** `low` no celular: sem refração, menos partículas e resolução menor. */
  quality?: "high" | "low";
  onReady?: () => void;
  /** A máquina não sustenta a cena: volta para a ilustração estática. */
  onFallback?: () => void;
};

export default function HeroScene({ quality = "high", onReady, onFallback }: HeroSceneProps) {
  const low = quality === "low";
  const container = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const state = useRef<SceneState>({ scroll: 0, hovered: -1 });
  const [visible, setVisible] = useState(true);
  const maxDpr = low ? 1.5 : 1.75;
  const [dpr, setDpr] = useState(maxDpr);

  // Pausa a renderização quando o hero sai da tela (economiza bateria e CPU).
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={dpr}
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(maxDpr)}
          flipflops={3}
          onFallback={() => onFallback?.()}
        />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 6]} intensity={1.5} />
        <pointLight position={[-5, -2, 4]} intensity={10} color="#00E0C6" distance={14} />
        <pointLight position={[5, 3, -2]} intensity={26} color="#2F6BFF" distance={16} />

        <Rig state={state} container={container} labelsRef={labelsRef} glass={!low} />
        <Particles count={low ? 90 : 220} />

        {/* Reflexos: luzes de estúdio geradas na hora, sem baixar imagens. */}
        <Environment resolution={low ? 128 : 256}>
          <Lightformer form="rect" intensity={3} position={[0, 6, -4]} scale={[12, 2, 1]} />
          <Lightformer
            form="rect"
            intensity={1.2}
            color="#00E0C6"
            position={[-6, 0, 2]}
            rotation-y={Math.PI / 2}
            scale={[8, 2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={3}
            color="#2F6BFF"
            position={[6, -1, 1]}
            rotation-y={-Math.PI / 2}
            scale={[8, 2, 1]}
          />
          <Lightformer form="ring" intensity={1.6} position={[0, 0, 8]} scale={4} />
        </Environment>
      </Canvas>

      {/* Rótulos dos sistemas, na mesma ordem dos nós. */}
      <div ref={labelsRef} className="pointer-events-none absolute inset-0 overflow-hidden">
        {hero.diagram.nodes.map((name) => (
          <span key={name} className="node-label">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
