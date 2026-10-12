"use client";

import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "./gsap";

/** Easing padrão da marca, o mesmo de `--ease` no CSS. */
export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const START = "top 85%";

/**
 * Animações de entrada ligadas à rolagem, montadas uma vez por página (no template):
 * - `data-split`: título revelado linha a linha, saindo de trás de uma máscara;
 * - `data-animate`: fade-in com leve deslocamento para cima;
 * - `data-scrub-line`: linha que se desenha conforme a seção atravessa a tela.
 *
 * O estado oculto só existe depois que este script roda (sem JavaScript, tudo
 * aparece). Ao chegar por âncora (/servicos#integracao, links do rodapé), o
 * que já está na tela ou acima dela aparece pronto, sem áreas vazias.
 * Com movimento reduzido, tudo simplesmente aparece.
 */
export function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const reveals: { el: Element; tween: gsap.core.Animation }[] = [];

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((heading) => {
        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          // O leitor de tela lê o título inteiro, não as linhas soltas.
          aria: "auto",
          onSplit: (self) => {
            const tween = gsap.from(self.lines, {
              yPercent: 100,
              duration: 0.9,
              ease: EASE,
              stagger: 0.08,
              scrollTrigger: { trigger: heading, start: START, once: true },
            });
            reveals.push({ el: heading, tween });
            return tween;
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((el) => {
        const tween = gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: EASE,
          // Itens vizinhos que entram juntos ganham um pequeno atraso em cascata.
          delay: Number(el.dataset.animateDelay ?? 0),
          scrollTrigger: { trigger: el, start: START, once: true },
        });
        reveals.push({ el, tween });
      });

      gsap.utils.toArray<HTMLElement>("[data-scrub-line]").forEach((line) => {
        gsap.fromTo(
          line,
          {
            scaleY: line.dataset.scrubLine === "y" ? 0 : 1,
            scaleX: line.dataset.scrubLine === "y" ? 1 : 0,
          },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line.closest("section") ?? line,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          },
        );
      });

      /** Termina na hora as entradas do que já está na tela ou acima dela. */
      const settle = () => {
        const limit = window.innerHeight;
        for (const { el, tween } of reveals) {
          if (el.getBoundingClientRect().top < limit) tween.progress(1);
        }
      };

      /** Espera a rolagem até a âncora parar e então acomoda a tela. */
      let frame = 0;
      const settleAfterScroll = () => {
        cancelAnimationFrame(frame);
        let last = -1;
        let still = 0;
        const check = () => {
          const y = window.scrollY;
          still = y === last ? still + 1 : 0;
          last = y;
          if (still >= 6) settle();
          else frame = requestAnimationFrame(check);
        };
        frame = requestAnimationFrame(check);
      };

      const onClick = (event: MouseEvent) => {
        const link = (event.target as Element | null)?.closest?.("a[href*='#']");
        if (link) settleAfterScroll();
      };

      if (window.location.hash) settleAfterScroll();
      window.addEventListener("hashchange", settleAfterScroll);
      document.addEventListener("click", onClick, true);
      ScrollTrigger.refresh();

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("hashchange", settleAfterScroll);
        document.removeEventListener("click", onClick, true);
      };
    });
  });

  return null;
}
