"use client";

import { useRef, type ReactNode } from "react";

import { flowTimeline } from "./flow";
import { lenis } from "./smooth-scroll";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Trilho horizontal dos projetos. No desktop (com movimento), a seção fica
 * fixa e a rolagem vertical move os painéis para o lado; o diagrama de cada
 * projeto acende conforme o painel chega ao centro. Se o foco do teclado cair
 * num painel fora da tela, a rolagem vai até ele. No celular e com "reduzir
 * movimento", é um carrossel nativo com encaixe (o CSS cuida disso).
 */
export function ProjectsRail({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const rail = root.current;
        const track = rail?.querySelector<HTMLElement>("[data-rail-track]");
        if (!rail || !track) return;
        rail.dataset.pinned = "true";

        const distance = () => track.scrollWidth - window.innerWidth;
        const move = gsap.to(track, { x: () => -distance(), ease: "none" });
        const trigger = ScrollTrigger.create({
          trigger: rail,
          start: "center center",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          animation: move,
          invalidateOnRefresh: true,
        });

        const flows = gsap.utils.toArray<HTMLElement>("[data-rail-panel]", rail).map((panel) => {
          const figure = panel.querySelector("[data-flow]");
          if (!figure) return null;
          const tl = flowTimeline(figure);
          return ScrollTrigger.create({
            trigger: panel,
            containerAnimation: move,
            start: "left 85%",
            end: "center 55%",
            scrub: 0.4,
            animation: tl,
          });
        });

        const onFocus = (event: FocusEvent) => {
          const panel = (event.target as Element).closest<HTMLElement>("[data-rail-panel]");
          if (!panel) return;
          const ratio = gsap.utils.clamp(0, 1, panel.offsetLeft / distance());
          const y = trigger.start + ratio * (trigger.end - trigger.start);
          if (lenis) lenis.scrollTo(y, { immediate: true });
          else window.scrollTo({ top: y });
        };
        rail.addEventListener("focusin", onFocus);

        return () => {
          rail.removeEventListener("focusin", onFocus);
          flows.forEach((flow) => flow?.kill());
          trigger.kill();
          move.kill();
          delete rail.dataset.pinned;
        };
      });

      // Carrossel (celular): cada diagrama acende ao entrar na tela.
      mm.add(`${MOTION_OK} and (max-width: 1023px)`, () => {
        const triggers = gsap.utils
          .toArray<HTMLElement>("[data-flow]", root.current)
          .map((figure) => {
            const tl = flowTimeline(figure);
            return ScrollTrigger.create({
              trigger: figure,
              start: "top 85%",
              once: true,
              onEnter: () => tl.duration(2).play(),
            });
          });
        return () => triggers.forEach((t) => t.kill());
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="projects-rail">
      {children}
    </div>
  );
}
