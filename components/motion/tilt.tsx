"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { MOTION_REDUCED } from "./gsap";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Inclinação máxima, em graus. */
  max?: number;
};

/**
 * Inclina o card em 3D na direção do mouse, com um reflexo de luz que
 * acompanha o ponteiro. Só com mouse (no toque não faz sentido) e nunca com
 * "reduzir movimento". Os valores vão em variáveis CSS, sem re-renderizar.
 */
export function Tilt({ children, className, max = 5 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia(MOTION_REDUCED).matches) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("tilt group/tilt relative h-full", className)}
    >
      {children}
      <span aria-hidden="true" className="tilt-glare" />
    </div>
  );
}
