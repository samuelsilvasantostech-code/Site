"use client";

import { useRef } from "react";

import { gsap, MOTION_OK, MOTION_REDUCED, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Trilho vertical que liga as seções. Ele "enche" conforme a rolagem e acende
 * o nó de cada seção (`data-lit`) quando o topo dela passa do meio da tela.
 *
 * Deve ficar dentro do contêiner das seções (`.flow-sections`).
 */
export function FlowRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const container = railRef.current?.parentElement;
    if (!container || !fillRef.current) return;

    const sections = Array.from(container.querySelectorAll<HTMLElement>(":scope > section"));
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "max",
        onToggle: (self) => section.setAttribute("data-lit", String(self.isActive)),
      });
    });

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.to(fillRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: container, start: "top 50%", end: "bottom 50%", scrub: 0.4 },
      });
    });
    mm.add(MOTION_REDUCED, () => {
      ScrollTrigger.create({
        trigger: container,
        start: "top 50%",
        end: "bottom 50%",
        onUpdate: (self) => gsap.set(fillRef.current, { scaleY: self.progress }),
      });
    });
  });

  return (
    <div ref={railRef} className="rail" aria-hidden="true">
      <span ref={fillRef} className="rail-fill" />
    </div>
  );
}
