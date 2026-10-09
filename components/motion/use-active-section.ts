"use client";

import { useState } from "react";

import { ScrollTrigger, useGSAP } from "./gsap";

/**
 * Retorna o id da seção que está "acesa" (a última cujo topo passou de 55% da tela).
 * No fim da página, a última seção fica ativa mesmo que seja curta.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useGSAP(
    () => {
      const lit = new Set<string>();

      const update = () => {
        const atBottom = ScrollTrigger.maxScroll(window) - window.scrollY < 4;
        const current = atBottom ? ids.at(-1) : ids.findLast((id) => lit.has(id));
        setActive(current ?? null);
      };

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "max",
          onToggle: (self) => {
            if (self.isActive) lit.add(id);
            else lit.delete(id);
            update();
          },
        });
      });

      ScrollTrigger.create({ start: 0, end: "max", onUpdate: update });
    },
    { dependencies: [ids] },
  );

  return active;
}
