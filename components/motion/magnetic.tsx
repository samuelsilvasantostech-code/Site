"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { gsap, MOTION_OK, useGSAP } from "./gsap";

/**
 * Atração discreta na direção do mouse (no máximo `max` px) e retorno suave
 * ao sair. Só com mouse e sem "reduzir movimento"; no toque não faz nada.
 */
export function Magnetic({
  children,
  max = 4,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
        const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
        const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          x(gsap.utils.clamp(-1, 1, dx) * max);
          y(gsap.utils.clamp(-1, 1, dy) * max);
        };
        const onLeave = () => {
          x(0);
          y(0);
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {children}
    </span>
  );
}
