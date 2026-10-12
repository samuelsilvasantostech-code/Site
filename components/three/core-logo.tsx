"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { MARK_PATHS } from "@/components/layout/logo";

const MARK_CENTER = { x: 50, y: 54.75 };
const MARK_SCALE = 0.021;

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

/**
 * O símbolo SSNEX como núcleo da cena: vidro azulado que refrata o que está
 * atrás (qualidade alta) ou metal polido (versão leve, sem o custo da refração).
 */
export function CoreLogo({ glass }: { glass: boolean }) {
  // O vidro refrata o fundo da página (o canvas é transparente).
  const { resolvedTheme } = useTheme();
  const background = useMemo(
    () => new THREE.Color(resolvedTheme === "light" ? "#F5F5F7" : "#05070A"),
    [resolvedTheme],
  );
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(MARK_PATHS.map(pathToShape), {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.05,
      bevelSegments: 6,
      curveSegments: 1,
    });
    geo.center();
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} scale={0.78}>
      {glass ? (
        <MeshTransmissionMaterial
          background={background}
          samples={6}
          resolution={512}
          transmission={1}
          thickness={0.55}
          roughness={0.08}
          ior={1.45}
          chromaticAberration={0.06}
          anisotropicBlur={0.15}
          distortion={0.12}
          distortionScale={0.4}
          temporalDistortion={0.08}
          clearcoat={1}
          attenuationColor="#2F6BFF"
          attenuationDistance={0.35}
          color="#a9c2ff"
        />
      ) : (
        <meshPhysicalMaterial
          color="#2F6BFF"
          metalness={0.55}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#0b2a8a"
          emissiveIntensity={0.35}
        />
      )}
    </mesh>
  );
}
