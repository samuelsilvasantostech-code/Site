"use client";

import { useRef, type ReactNode } from "react";

import { flowTimeline } from "./flow";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Acende o diagrama de fluxo em sequência quando ele entra na tela e o deixa
 * "ao vivo" (pulsos correndo). Com "reduzir movimento", o diagrama já aparece
 * completo e parado.
 */
export function FlowReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const figure = root.current?.querySelector("[data-flow]");
        if (!figure) return;
        const tl = flowTimeline(figure);
        const trigger = ScrollTrigger.create({
          trigger: figure,
          start: "top 80%",
          once: true,
          onEnter: () => tl.duration(2.2).play(),
        });
        return () => {
          trigger.kill();
          tl.kill();
          figure.removeAttribute("data-live");
        };
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
