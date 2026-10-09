"use client";

import { useEffect, useRef } from "react";

import { MOTION_REDUCED } from "./gsap";

/**
 * Luz difusa que acompanha o mouse dentro da seção-pai. Só reage a mouse
 * (não a toque) e fica parada com "reduzir movimento". Atualiza variáveis
 * CSS no próximo quadro, sem re-renderizar o React.
 */
export function PointerSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.parentElement;
    if (!el || !area || window.matchMedia(MOTION_REDUCED).matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = area.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      });
    };
    area.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="pointer-spotlight absolute inset-0 -z-10" />;
}
