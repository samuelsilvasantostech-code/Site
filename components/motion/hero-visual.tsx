"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useReducedMotion } from "./use-reduced-motion";

/* A cena 3D (three.js) só é baixada no navegador, depois do resto da página. */
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

const subscribeNoop = () => () => {};

/** `true` se o navegador consegue desenhar WebGL. No servidor, assume que não. */
function useWebGL() {
  return useSyncExternalStore(
    subscribeNoop,
    () => {
      try {
        const canvas = document.createElement("canvas");
        return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
      } catch {
        return false;
      }
    },
    () => false,
  );
}

/**
 * Visual do hero: mostra a ilustração em SVG (`fallback`) de imediato e a
 * troca pela cena 3D animada quando ela termina de carregar. Sem WebGL, a
 * ilustração continua. Com "reduzir movimento", a cena 3D aparece parada.
 */
export function HeroVisual({ fallback }: { fallback: ReactNode }) {
  const webgl = useWebGL();
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[1.1] w-full max-w-[560px]">
      <div
        className={cn(
          "absolute inset-0 flex items-center transition-opacity duration-700 ease-out",
          ready && "opacity-0",
        )}
      >
        {fallback}
      </div>
      {webgl && (
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-1000 ease-out",
            ready && "opacity-100",
          )}
        >
          <HeroScene animate={!reduceMotion} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
