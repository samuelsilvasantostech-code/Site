import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  /** `invert` usa o tema oposto ao da página (faixa branca no tema escuro). */
  tone?: "base" | "invert";
  align?: "left" | "center";
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  title,
  intro,
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
        "bg-background py-20 text-foreground md:py-28",
        tone === "invert" && "tone-invert",
        className,
      )}
    >
      <div className="container-site">
        <header className={cn("mb-14 max-w-2xl", align === "center" && "mx-auto text-center")}>
          <h2
            id={`${id}-title`}
            data-split
            className="text-3xl font-extrabold tracking-tight text-balance md:text-5xl md:leading-[1.08]"
          >
            {title}
          </h2>
          {intro && (
            <p
              data-animate
              className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground"
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
