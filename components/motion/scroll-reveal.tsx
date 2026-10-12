"use client";

import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "./gsap";

/**
 * Animações ligadas à rolagem, montadas uma vez por página (no template):
 * - `data-split`: título revelado linha a linha, saindo de trás de uma máscara;
 * - `data-animate`: fade-in com leve deslocamento para cima;
 * - `data-scrub-line`: linha que se desenha conforme a seção atravessa a tela.
 * Com movimento reduzido, tudo simplesmente aparece.
 */
export function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((heading) => {
        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          // O leitor de tela lê o título inteiro, não as linhas soltas.
          aria: "auto",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: heading, start: "top 88%", once: true },
            }),
        });
      });

      const targets = gsap.utils.toArray<HTMLElement>("[data-animate]");
      // Só opacidade: `visibility: hidden` tiraria o conteúdo da árvore de acessibilidade.
      gsap.set(targets, { opacity: 0, y: 32 });
      ScrollTrigger.batch(targets, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });

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
