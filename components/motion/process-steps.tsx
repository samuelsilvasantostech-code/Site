"use client";

import { useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Troca o número grande fixo conforme cada passo cruza o meio da tela.
 * Funciona também com "reduzir movimento" (a troca é instantânea, sem animação).
 */
export function ProcessSteps({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const numbers = gsap.utils.toArray<HTMLElement>("[data-step-number]", root.current);
      const activate = (index: number) =>
        numbers.forEach((n, i) => (n.dataset.active = String(i === index)));
      const triggers = gsap.utils.toArray<HTMLElement>("[data-step]", root.current).map((step, i) =>
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && activate(i),
        }),
      );
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
