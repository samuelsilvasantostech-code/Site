"use client";

import { useRef, type ReactNode } from "react";

import { lenis } from "./smooth-scroll";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "./gsap";

/** Unidades de tempo da linha do tempo: abertura e cada problema. */
const INTRO = 1;
const STEP = 3;

/**
 * Narrativa dos problemas guiada pela rolagem (só em telas largas, com
 * movimento): fixa a seção e acende cada frase palavra por palavra (0.15 → 1),
 * depois mostra a descrição e o link. Se o foco do teclado cair num link de
 * um problema que ainda não está na tela, a rolagem vai até ele.
 */
export function ProblemsStory({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const section = root.current?.querySelector<HTMLElement>(".problems");
        if (!section) return;
        const items = gsap.utils.toArray<HTMLElement>(".problem", section);
        const counter = section.querySelector<HTMLElement>("[data-problem-counter]");
        section.dataset.pinned = "true";

        const tl = gsap.timeline({ defaults: { ease: "none" } });
        tl.to(".problems-intro", { autoAlpha: 0, y: -60, duration: 0.6 }, INTRO - 0.6);

        items.forEach((item, i) => {
          const at = INTRO + i * STEP;
          const words = item.querySelectorAll(".problem-word");
          const detail = item.querySelector(".problem-detail");
          tl.fromTo(item, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, at);
          tl.fromTo(
            words,
            { opacity: 0.15 },
            { opacity: 1, stagger: 1.4 / words.length, duration: 0.4 },
            at + 0.2,
          );
          tl.fromTo(detail, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, at + 1.6);
          if (i < items.length - 1) {
            tl.to(item, { autoAlpha: 0, y: -40, duration: 0.4 }, at + STEP - 0.4);
          }
        });

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          animation: tl,
          onUpdate: () => {
            const index = gsap.utils.clamp(
              0,
              items.length - 1,
              Math.floor((tl.time() - INTRO) / STEP),
            );
            if (counter) counter.textContent = String(index + 1).padStart(2, "0");
          },
        });

        // Teclado: leva a rolagem até o problema do link que recebeu foco.
        const onFocus = (event: FocusEvent) => {
          const item = (event.target as Element).closest<HTMLElement>(".problem");
          if (!item) return;
          const index = Number(item.dataset.problem);
          const time = INTRO + index * STEP + 2.2;
          const y = trigger.start + (time / tl.duration()) * (trigger.end - trigger.start);
          if (lenis) lenis.scrollTo(y, { immediate: true });
          else window.scrollTo({ top: y });
        };
        section.addEventListener("focusin", onFocus);

        return () => {
          section.removeEventListener("focusin", onFocus);
          trigger.kill();
          tl.kill();
          delete section.dataset.pinned;
        };
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
