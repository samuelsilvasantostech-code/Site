"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Fade-in com leve deslocamento para cima nos elementos com `data-animate`,
 * quando entram na tela. Montado uma vez por página; não renderiza nada.
 * Com movimento reduzido, os elementos simplesmente aparecem.
 */
export function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-animate]");
      // Só opacidade: `visibility: hidden` tiraria o conteúdo da árvore de acessibilidade.
      gsap.set(targets, { opacity: 0, y: 24 });
      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });

      // Linhas de progresso: se desenham conforme a seção atravessa a tela.
      gsap.utils.toArray<HTMLElement>("[data-scrub-line]").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line.closest("section") ?? line,
              start: "top 75%",
              end: "center 45%",
              scrub: 0.6,
            },
          },
        );
      });
    });
  });

  return null;
}
