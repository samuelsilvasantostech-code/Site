"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Faixa contínua. A velocidade acompanha a da rolagem (e volta ao normal
 * depois), com uma leve inclinação na direção do movimento. `reverse` corre
 * no sentido oposto. Com "reduzir movimento", a faixa fica parada e quebra
 * em linhas (o CSS cuida disso).
 */
export function Marquee({
  children,
  reverse = false,
  duration = 50,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  /** Segundos para uma volta completa. */
  duration?: number;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = root.current?.querySelector<HTMLElement>("[data-marquee-track]");
        if (!track) return;
        const loop = gsap.fromTo(
          track,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
        );
        const skew = gsap.quickTo(track, "skewX", { duration: 0.6, ease: "power3" });
        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(velocity) / 400);
            gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
            skew(gsap.utils.clamp(-6, 6, (velocity / 300) * (reverse ? 1 : -1)));
            gsap.delayedCall(0.15, () => skew(0));
          },
        });
        return () => {
          trigger.kill();
          loop.kill();
        };
      });
    },
    { scope: root, dependencies: [reverse, duration] },
  );

  return (
    <div ref={root} className={cn("marquee-mask overflow-hidden", className)}>
      {/* Conteúdo duplicado: a animação desloca 50% e recomeça sem salto. */}
      <div data-marquee-track className="marquee-track flex w-max will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
