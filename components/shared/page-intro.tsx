import type { ReactNode } from "react";

type PageIntroProps = {
  title: string;
  intro: string;
  children?: ReactNode;
};

/** Abertura das páginas internas: título (h1), descrição e ações opcionais. */
export function PageIntro({ title, intro, children }: PageIntroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pt-[calc(var(--header-h)+4rem)] pb-16 md:pt-[calc(var(--header-h)+5.5rem)] md:pb-20">
      <div aria-hidden="true" className="hero-backdrop absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-balance md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {intro}
        </p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
