"use client";

import { Environment, Float, Html, Lightformer, Line, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { MARK_PATHS } from "@/components/layout/logo";
import { hero } from "@/content/data";

/* ------------------------------------------------------------------ */
/* Símbolo SSNEX em 3D                                                 */
/* ------------------------------------------------------------------ */

const MARK_CENTER = { x: 50, y: 54.75 };
const MARK_SCALE = 0.021;
const GRADIENT = ["#1D4ED8", "#2563EB", "#06B6D4"].map((c) => new THREE.Color(c));

/** Converte "M x y L x y … Z" (o traçado do logo) em uma forma do three.js. */
function pathToShape(d: string) {
  const points = [...d.matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)].map(
    ([, x, y]) =>
      new THREE.Vector2(
        (Number(x) - MARK_CENTER.x) * MARK_SCALE,
        // O SVG cresce para baixo; o three.js, para cima.
        -(Number(y) - MARK_CENTER.y) * MARK_SCALE,
      ),
  );
  return new THREE.Shape(points);
}

/** Pinta cada vértice com o gradiente da marca (azul embaixo à esquerda → ciano em cima à direita). */
function paintGradient(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const size = new THREE.Vector3();
  box.getSize(size);
  const position = geometry.getAttribute("position");
  const colors = new Float32Array(position.count * 3);
  const color = new THREE.Color();
  for (let i = 0; i < position.count; i++) {
    const t =
      ((position.getX(i) - box.min.x) / size.x + (position.getY(i) - box.min.y) / size.y) / 2;
    if (t < 0.55) color.lerpColors(GRADIENT[0], GRADIENT[1], t / 0.55);
    else color.lerpColors(GRADIENT[1], GRADIENT[2], (t - 0.55) / 0.45);
    color.toArray(colors, i * 3);
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

function LogoMark3D({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(MARK_PATHS.map(pathToShape), {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.035,
      bevelSegments: 4,
      curveSegments: 1,
    });
    geo.center();
    paintGradient(geo);
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  // Gira devagar e inclina na direção do ponteiro.
  useFrame((state, delta) => {
    if (!animate || !group.current) return;
    const t = state.clock.elapsedTime;
    const targetY = Math.sin(t * 0.4) * 0.7 + state.pointer.x * 0.4;
    const targetX = -state.pointer.y * 0.25 + Math.sin(t * 0.25) * 0.08;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta);
  });

  return (
    <group ref={group} rotation={[0.08, -0.35, 0]}>
      <mesh geometry={geometry} castShadow>
        <meshPhysicalMaterial
          vertexColors
          metalness={0.35}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.12}
          emissive="#0b2a6b"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Sistemas em órbita e dados em trânsito                              */
/* ------------------------------------------------------------------ */

/**
 * Sistemas num anel em volta do núcleo. O raio acompanha a largura visível,
 * para os rótulos não saírem da área da cena.
 */
function useOrbitNodes() {
  const width = useThree((state) => state.viewport.width);
  return useMemo(() => {
    const radius = Math.min(3.0, width / 2 - 0.75);
    return hero.diagram.nodes.map((label, i, all) => {
      const angle = (i / all.length) * Math.PI * 2;
      return {
        label,
        position: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0),
      };
    });
  }, [width]);
}

/** Pacote de dados que viaja de um sistema até o núcleo. */
function Packet({
  from,
  offset,
  animate,
}: {
  from: THREE.Vector3;
  offset: number;
  animate: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const to = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = animate ? (state.clock.elapsedTime * 0.38 + offset) % 1 : 0.5;
    mesh.current.position.lerpVectors(from, to, t);
    const material = mesh.current.material as THREE.MeshBasicMaterial;
    // Aparece ao sair do sistema e some ao chegar no núcleo.
    material.opacity = Math.sin(t * Math.PI) * 0.95;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshBasicMaterial
        color="#22D3EE"
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/** Um sistema em órbita. O rótulo esmaece quando o sistema passa por trás do núcleo. */
function OrbitNode({ label, position }: { label: string; position: THREE.Vector3 }) {
  const ref = useRef<THREE.Group>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const world = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!ref.current || !labelRef.current) return;
    ref.current.getWorldPosition(world);
    const opacity = THREE.MathUtils.clamp(0.55 + world.z * 0.35, 0.18, 1);
    labelRef.current.style.opacity = opacity.toFixed(2);
  });

  return (
    <group ref={ref} position={position}>
      <RoundedBox args={[0.42, 0.42, 0.42]} radius={0.09} smoothness={4}>
        <meshPhysicalMaterial
          color="#111827"
          metalness={0.6}
          roughness={0.25}
          clearcoat={1}
          emissive="#168BFF"
          emissiveIntensity={0.18}
        />
      </RoundedBox>
      <Html center position={[0, 0, 0.55]} zIndexRange={[10, 0]} pointerEvents="none">
        <span
          ref={labelRef}
          className="block translate-y-7 rounded-full border border-line bg-background/80 px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-foreground backdrop-blur"
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

/** Ângulo do anel em relação à tela: inclinado para dar profundidade. */
const RING_TILT = -1.08;

function SystemsOrbit({ animate }: { animate: boolean }) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const nodes = useOrbitNodes();

  useFrame((state, delta) => {
    if (!animate || !tilt.current || !spin.current) return;
    // Os sistemas giram continuamente em volta do núcleo…
    spin.current.rotation.z += delta * 0.16;
    // …e o anel inclina levemente na direção do ponteiro.
    tilt.current.rotation.x = THREE.MathUtils.damp(
      tilt.current.rotation.x,
      RING_TILT - state.pointer.y * 0.15,
      2,
      delta,
    );
    tilt.current.rotation.y = THREE.MathUtils.damp(
      tilt.current.rotation.y,
      state.pointer.x * 0.2,
      2,
      delta,
    );
  });

  return (
    <group ref={tilt} rotation={[RING_TILT, 0, 0]}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[nodes[0]?.position.length() ?? 3, 0.006, 8, 160]} />
          <meshBasicMaterial color="#2563EB" transparent opacity={0.35} />
        </mesh>
        {nodes.map((node, i) => (
          <group key={node.label}>
            <Line
              points={[node.position, [0, 0, 0]]}
              color="#2563EB"
              lineWidth={1.2}
              transparent
              opacity={0.3}
            />
            <Packet from={node.position} offset={i / nodes.length} animate={animate} />
            <Packet from={node.position} offset={i / nodes.length + 0.5} animate={animate} />
            <OrbitNode label={node.label} position={node.position} />
          </group>
        ))}
      </group>
    </group>
  );
}

/** Poeira de fundo: dá profundidade sem chamar atenção. */
function Particles({ animate, count = 260 }: { animate: boolean; count?: number }) {
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
      const radius = 3.5 + random() * 4;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      array[i * 3 + 2] = radius * Math.cos(phi) - 3;
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (animate && points.current) points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#94A3B8"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Cena                                                                */
/* ------------------------------------------------------------------ */

type HeroSceneProps = {
  /** `false` com "reduzir movimento": a cena aparece parada. */
  animate: boolean;
  /** `low` no celular: menos partículas e resolução menor. */
  quality?: "high" | "low";
  onReady?: () => void;
};

export default function HeroScene({ animate, quality = "high", onReady }: HeroSceneProps) {
  const low = quality === "low";
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Pausa a renderização quando o hero sai da tela (economiza bateria e CPU).
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "100px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const frameloop = !animate ? "demand" : visible ? "always" : "never";

  return (
    <div ref={container} className="absolute inset-0">
      <Canvas
        frameloop={frameloop}
        dpr={low ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0, 8.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={18} color="#06B6D4" distance={12} />
        <pointLight position={[4, 2, -2]} intensity={14} color="#2563EB" distance={12} />

        <Float speed={animate ? 1.4 : 0} rotationIntensity={0.15} floatIntensity={0.5}>
          <LogoMark3D animate={animate} />
        </Float>
        <SystemsOrbit animate={animate} />
        <Particles animate={animate} count={low ? 120 : 260} />

        {/* Reflexos do símbolo: luzes de estúdio geradas na hora, sem baixar imagens. */}
        <Environment resolution={low ? 128 : 256}>
          <Lightformer form="rect" intensity={3} position={[0, 5, -4]} scale={[10, 2, 1]} />
          <Lightformer
            form="rect"
            intensity={2}
            color="#06B6D4"
            position={[-5, 0, 2]}
            rotation-y={Math.PI / 2}
            scale={[6, 2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2.5}
            color="#2563EB"
            position={[5, -1, 1]}
            rotation-y={-Math.PI / 2}
            scale={[6, 2, 1]}
          />
          <Lightformer form="ring" intensity={1.5} position={[0, 0, 6]} scale={3} />
        </Environment>
      </Canvas>
    </div>
  );
}
