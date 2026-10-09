"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useReducedMotion } from "./use-reduced-motion";

/* A cena 3D (three.js) só é baixada no navegador, depois do resto da página. */
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

const subscribeNoop = () => () => {};

const WIDE = "(min-width: 768px)";

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/* Verificado uma vez só: cada teste cria um contexto WebGL, e o navegador limita quantos existem. */
let capableCache: boolean | undefined;

function detectCapable() {
  if (capableCache !== undefined) return capableCache;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  if (saveData) return (capableCache = false);
  try {
    const canvas = document.createElement("canvas");
    capableCache = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    capableCache = false;
  }
  return capableCache;
}

/** Telas a partir de 768px recebem a cena em qualidade alta; menores, a versão leve. */
function useWide() {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE).matches,
    () => false,
  );
}

/**
 * `true` quando dá para carregar a cena 3D: WebGL disponível e sem o modo de
 * economia de dados. Caso contrário, a ilustração em SVG fica no lugar.
 * No servidor, assume que não.
 */
function useCanRender3D() {
  return useSyncExternalStore(subscribeNoop, detectCapable, () => false);
}

/**
 * Visual do hero: mostra a ilustração em SVG (`fallback`) de imediato e a
 * troca pela cena 3D animada quando ela termina de carregar (versão leve no
 * celular). Sem WebGL ou com economia de dados, a ilustração continua e a cena
 * nem é baixada.
 * Com "reduzir movimento", a cena 3D aparece parada.
 */
export function HeroVisual({ fallback }: { fallback: ReactNode }) {
  const webgl = useCanRender3D();
  const wide = useWide();
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
          <HeroScene
            animate={!reduceMotion}
            quality={wide ? "high" : "low"}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}
