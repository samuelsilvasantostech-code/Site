import { CtaButtons } from "@/components/shared/cta-buttons";
import { finalCta } from "@/content/data";

/** Chamada final, repetida no fim das páginas principais. */
export function FinalCta({ source = "final-cta" }: { source?: string }) {
  return (
    <section aria-labelledby="cta-final-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div
          data-animate
          className="relative isolate overflow-hidden rounded-xl border border-line bg-surface px-8 py-14 text-center md:px-16 md:py-20"
        >
          <div
            aria-hidden="true"
            className="absolute -top-40 left-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-grad-from/10 blur-3xl"
          />
          <h2
            id="cta-final-title"
            className="mx-auto max-w-3xl text-3xl leading-[1.1] font-bold tracking-tight text-balance md:text-5xl"
          >
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {finalCta.description}
          </p>
          <CtaButtons source={source} className="mt-9 justify-center" />
        </div>
      </div>
    </section>
  );
}
