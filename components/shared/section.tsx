import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  /** Rótulo técnico acima do título, só quando informa algo (ex.: contagem). */
  eyebrow?: string;
  /** `invert` usa o tema oposto ao da página (faixa clara no tema escuro). */
  tone?: "base" | "invert";
  align?: "left" | "center";
  className?: string;
  children: ReactNode;
};

/**
 * Seção padrão: título em escala de display (revelado linha a linha),
 * introdução em tamanho de lead e o ritmo vertical do design system.
 */
export function Section({
  id,
  title,
  intro,
  eyebrow,
  tone = "base",
  align = "left",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative bg-background py-section text-foreground",
        tone === "invert" && "tone-invert",
        className,
      )}
    >
      <div className="container-site">
        <header
          className={cn("mb-16 max-w-4xl md:mb-20", align === "center" && "mx-auto text-center")}
        >
          {eyebrow && <p className="mb-6 eyebrow text-muted-foreground">{eyebrow}</p>}
          <h2 id={`${id}-title`} data-split className="text-display">
            {title}
          </h2>
          {intro && (
            <p
              data-animate
              className={cn(
                "mt-8 max-w-2xl text-lead text-pretty text-muted-foreground",
                align === "center" && "mx-auto",
              )}
            >
              {intro}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
