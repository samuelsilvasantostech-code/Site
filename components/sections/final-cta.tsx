import { CtaButtons } from "@/components/shared/cta-buttons";
import { HeroVisual } from "@/components/three/hero-visual";
import { finalCta } from "@/content/data";

import { SystemsDiagram } from "./systems-diagram";

/**
 * Fechamento do conceito: a página abriu com sistemas que se separam e
 * termina com eles se reconectando em volta do núcleo, atrás do título.
 * Repetida no fim das páginas principais.
 */
export function FinalCta({ source = "final-cta" }: { source?: string }) {
  return (
    <section
      aria-labelledby="cta-final-title"
      data-cta-zone
      className="relative isolate flex min-h-svh items-center overflow-hidden border-t border-line py-section"
    >
      <div aria-hidden="true" className="finale-glow absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 opacity-60">
        <HeroVisual
          variant="finale"
          fallback={
            <div className="absolute top-1/2 left-1/2 w-[min(90vw,40rem)] -translate-x-1/2 -translate-y-1/2 opacity-40">
              <SystemsDiagram />
            </div>
          }
        />
      </div>
      {/* Véu central: o título continua legível sobre a cena. */}
      <div aria-hidden="true" className="finale-scrim pointer-events-none absolute inset-0 -z-10" />

      <div className="pointer-events-none container-site text-center">
        <h2 id="cta-final-title" data-split className="mx-auto max-w-[16ch] text-hero">
          {finalCta.headline}
        </h2>
        <p
          data-animate
          className="mx-auto mt-8 max-w-2xl text-lead text-pretty text-muted-foreground"
        >
          {finalCta.description}
        </p>
        <div data-animate className="pointer-events-auto mt-12 inline-flex">
          <CtaButtons source={source} size="xl" magnetic className="justify-center" />
        </div>
      </div>
    </section>
  );
}
