"use client";

import { useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Flip } from "gsap/Flip";

import { gsap, MOTION_REDUCED, ScrollTrigger } from "./gsap";

/* Flip só é usado aqui: registrado neste módulo, fica fora das outras páginas. */
gsap.registerPlugin(Flip);

type Option = { value: string; label: string };

/** Largura (em colunas de 12) de cada posição visível: ritmo editorial 7/5, 5/7 (igual à página). */
const spanFor = (i: number) => (i % 4 === 0 || i % 4 === 3 ? "7" : "5");

/**
 * Filtros da grade de projetos. Os cards (filhos, com `data-area`) ficam todos
 * no HTML; o filtro esconde os de outras áreas e a grade se reorganiza com
 * uma transição de layout (GSAP Flip). Sem animação com "reduzir movimento".
 */
export function ProjectFilter({
  options,
  allLabel,
  children,
}: {
  options: Option[];
  allLabel: string;
  children: ReactNode;
}) {
  const grid = useRef<HTMLUListElement>(null);
  const [filter, setFilter] = useState("all");
  const [count, setCount] = useState<number | null>(null);

  function apply(value: string) {
    const list = grid.current;
    if (!list || value === filter) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-area]"));
    const state = Flip.getState(items);

    let visible = 0;
    for (const item of items) {
      const show = value === "all" || item.dataset.area === value;
      item.hidden = !show;
      if (show) item.dataset.span = spanFor(visible++);
    }
    setFilter(value);
    setCount(visible);

    if (window.matchMedia(MOTION_REDUCED).matches) return ScrollTrigger.refresh();
    Flip.from(state, {
      duration: 0.7,
      ease: "power3.inOut",
      absolute: true,
      scale: true,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.96, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }

  const all = [{ value: "all", label: allLabel }, ...options];

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrar projetos por área"
        className="mb-10 flex flex-wrap gap-2"
      >
        {all.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={filter === option.value}
            onClick={() => apply(option.value)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 ease-brand",
              filter === option.value
                ? "border-transparent bg-foreground text-background"
                : "border-line text-muted-foreground hover:border-line-strong hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {count !== null && `${count} projetos exibidos.`}
      </p>
      <ul ref={grid} className="project-grid">
        {children}
      </ul>
    </div>
  );
}
