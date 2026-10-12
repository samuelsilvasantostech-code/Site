"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";

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

/**
 * WebGL emulado na CPU (SwiftShader, llvmpipe…): a cena travaria a página.
 * Nesses casos fica a ilustração em SVG.
 */
function isSoftwareRenderer(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  return /swiftshader|llvmpipe|software|basic render/i.test(renderer);
}

function detectCapable() {
  if (capableCache !== undefined) return capableCache;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  if (saveData) return (capableCache = false);
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    capableCache = Boolean(gl) && !isSoftwareRenderer(gl!);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
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

/** `true` depois do primeiro paint, quando o navegador fica ocioso. */
function useIdle() {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setIdle(true), 300);
    return () => clearTimeout(id);
  }, []);
  return idle;
}

/**
 * Visual do hero, em tela cheia: mostra a ilustração estática (`fallback`) de
 * imediato e a troca pela cena 3D quando ela fica pronta, com um leve zoom de
 * entrada. O three.js só é baixado depois do primeiro paint, com o navegador
 * ocioso. Sem WebGL, com WebGL emulado na CPU, com economia de dados, com
 * "reduzir movimento" ou se a máquina não sustentar a cena, fica a ilustração.
 */
export function HeroVisual({ fallback }: { fallback: ReactNode }) {
  const webgl = useCanRender3D();
  const wide = useWide();
  const reduceMotion = useReducedMotion();
  const idle = useIdle();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const show3D = webgl && !reduceMotion && !failed && idle;

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-brand",
          show3D && ready && "opacity-0",
        )}
      >
        {fallback}
      </div>
      {show3D && (
        <div
          className={cn(
            "absolute inset-0 scale-90 opacity-0 transition-[opacity,scale] duration-[1400ms] ease-brand",
            ready && "scale-100 opacity-100",
          )}
        >
          <HeroScene
            quality={wide ? "high" : "low"}
            onReady={() => setReady(true)}
            onFallback={() => setFailed(true)}
          />
        </div>
      )}
    </div>
  );
}
