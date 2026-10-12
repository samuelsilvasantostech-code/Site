"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

/** Estado compartilhado da cena, lido a cada quadro (sem re-renderizar o React). */
export type SceneState = {
  /** 0 → 1 conforme o hero sai da tela. */
  scroll: number;
  /** Índice do nó sob o cursor (-1 = nenhum). */
  hovered: number;
};

const DATA = new THREE.Color("#00E0C6");
const WIRE = new THREE.Color("#2F6BFF");

/** Textura de brilho radial, gerada na hora (sem baixar imagem). */
function useGlowTexture() {
  const texture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, "rgba(255,255,255,0.45)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

/** Posiciona o rótulo HTML de um nó (fora do componente: só escreve no DOM). */
function placeLabel(el: HTMLElement, x: number, y: number, opacity: number, active: boolean) {
  el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, 0)`;
  el.style.opacity = opacity.toFixed(2);
  el.dataset.active = active ? "true" : "false";
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Os sistemas da empresa em órbita do núcleo, ligados a ele por fios onde
 * pulsos de dados (ciano) correm até o centro. Ao rolar, a órbita se desfaz
 * e os sistemas se alinham, preparando a passagem para a seção seguinte.
 * Os rótulos são elementos HTML comuns, posicionados pela projeção da câmera.
 */
export function SystemNetwork({
  labels,
  state,
  labelsRef,
  animate,
}: {
  labels: readonly string[];
  state: RefObject<SceneState>;
  labelsRef: RefObject<HTMLDivElement | null>;
  animate: boolean;
}) {
  const count = labels.length;
  const width = useThree((s) => s.viewport.width);
  const nodes = useRef<(THREE.Group | null)[]>([]);
  const materials = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);
  const pulses = useRef<(THREE.Group | null)[]>([]);
  const spin = useRef(0);
  const glow = useGlowTexture();

  const radius = Math.min(2.25, Math.max(1.8, width * 0.17));
  const spacing = Math.min(1.2, (width * 0.7) / count);

  // Fios: um segmento por sistema, atualizado a cada quadro.
  const wires = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 6), 3));
    return geometry;
  }, [count]);
  useEffect(() => () => wires.dispose(), [wires]);

  const positions = useMemo(() => labels.map(() => new THREE.Vector3()), [labels]);
  const tmpRing = useMemo(() => new THREE.Vector3(), []);
  const tmpLine = useMemo(() => new THREE.Vector3(), []);
  const projected = useMemo(() => new THREE.Vector3(), []);

  useFrame((frame, delta) => {
    const scroll = state.current.scroll;
    const p = ease(THREE.MathUtils.clamp(scroll / 0.85, 0, 1));
    if (animate) spin.current += delta * 0.12 * (1 - p);

    const attribute = wires.getAttribute("position") as THREE.BufferAttribute;
    const labelEls = labelsRef.current?.children;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + spin.current;
      // Órbita elíptica com profundidade.
      tmpRing.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.42,
        Math.sin(angle) * radius * 0.75,
      );
      // Alinhados numa fileira abaixo do núcleo.
      tmpLine.set((i - (count - 1) / 2) * spacing, -1.6, 0.4);
      const position = positions[i].lerpVectors(tmpRing, tmpLine, p);

      const node = nodes.current[i];
      if (node) {
        node.position.copy(position);
        node.rotation.set(0.35 * (1 - p), angle * 0.5 * (1 - p), 0);
        const hovered = state.current.hovered === i;
        const target = hovered ? 1.18 : 1;
        node.scale.setScalar(THREE.MathUtils.damp(node.scale.x, target, 10, delta));
      }
      const material = materials.current[i];
      if (material) {
        const target = state.current.hovered === i ? 1.2 : 0;
        material.emissiveIntensity = THREE.MathUtils.damp(
          material.emissiveIntensity,
          target,
          10,
          delta,
        );
      }

      attribute.setXYZ(i * 2, 0, 0, 0);
      attribute.setXYZ(i * 2 + 1, position.x, position.y, position.z);

      // Dois pulsos por fio, do sistema até o núcleo.
      for (let k = 0; k < 2; k++) {
        const pulse = pulses.current[i * 2 + k];
        if (!pulse) continue;
        const t = animate ? (frame.clock.elapsedTime * 0.32 + i / count + k / 2) % 1 : 0.5;
        pulse.position.copy(position).multiplyScalar(1 - t);
        pulse.scale.setScalar(Math.sin(t * Math.PI));
      }

      // Rótulo HTML acompanhando o nó; mais apagado quando ele está atrás do núcleo.
      const label = labelEls?.[i] as HTMLElement | undefined;
      if (label && node) {
        projected.set(0, -0.42, 0);
        node.localToWorld(projected);
        projected.project(frame.camera);
        const x = (projected.x * 0.5 + 0.5) * frame.size.width;
        const y = (-projected.y * 0.5 + 0.5) * frame.size.height;
        const depth = THREE.MathUtils.clamp(0.75 + position.z * 0.25, 0.25, 1);
        const active = state.current.hovered === i;
        placeLabel(label, x, y, active ? 1 : depth, active);
      }
    }
    attribute.needsUpdate = true;
  });

  return (
    <group>
      <lineSegments geometry={wires}>
        <lineBasicMaterial color={WIRE} transparent opacity={0.45} depthWrite={false} />
      </lineSegments>

      {labels.map((label, i) => (
        <group
          key={label}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            state.current.hovered = i;
          }}
          onPointerOut={() => {
            if (state.current.hovered === i) state.current.hovered = -1;
          }}
        >
          <RoundedBox args={[0.42, 0.42, 0.42]} radius={0.1} smoothness={4}>
            <meshPhysicalMaterial
              ref={(el) => {
                materials.current[i] = el;
              }}
              color="#1a2130"
              metalness={0.65}
              roughness={0.22}
              clearcoat={1}
              clearcoatRoughness={0.12}
              emissive={DATA}
              emissiveIntensity={0}
            />
          </RoundedBox>
        </group>
      ))}

      {Array.from({ length: count * 2 }, (_, i) => (
        <group
          key={i}
          ref={(el) => {
            pulses.current[i] = el;
          }}
        >
          <mesh>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={DATA} toneMapped={false} />
          </mesh>
          <sprite scale={0.45}>
            <spriteMaterial
              map={glow}
              color={DATA}
              transparent
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              opacity={0.9}
            />
          </sprite>
        </group>
      ))}
    </group>
  );
}
