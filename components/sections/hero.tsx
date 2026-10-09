import { ArrowRightIcon, CircleCheckIcon, SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contact, hero, links } from "@/content/data";
import { whatsappUrl } from "@/lib/format";

/* Entrada do hero: CSS puro (tw-animate), aparece antes mesmo do JavaScript carregar. */
const enter = "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out";

function WorkflowPanel() {
  const { panel } = hero;
  return (
    <figure className={`${enter} relative mx-auto mt-16 max-w-3xl delay-500 md:mt-20`}>
      {/* Moldura com brilho do gradiente */}
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-xl bg-gradient-to-br from-grad-from/50 via-line to-grad-to/50"
      />
      <div className="relative overflow-hidden rounded-xl bg-surface text-left">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <p className="font-semibold">{panel.title}</p>
            <figcaption className="text-sm text-muted-foreground">{panel.caption}</figcaption>
          </div>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-link">
            n8n
          </span>
        </div>
        <ol className="divide-y divide-line">
          {panel.steps.map((step, i) => (
            <li key={step.name} className="flex items-center gap-4 px-5 py-3.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-xs font-semibold text-muted-foreground">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{step.name}</span>
              <span className="hidden rounded-md bg-background px-2 py-0.5 text-xs text-muted-foreground sm:inline">
                {step.tool}
              </span>
              <CircleCheckIcon aria-hidden="true" className="size-4 shrink-0 text-link" />
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+5rem)] pb-20 md:pt-[calc(var(--header-h)+7rem)]"
    >
      <div aria-hidden="true" className="hero-backdrop absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <p
          className={`${enter} inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1 text-sm font-medium text-muted-foreground backdrop-blur`}
        >
          <SparklesIcon aria-hidden="true" className="size-3.5 text-link" />
          {hero.badge}
        </p>

        <h1
          id="hero-title"
          className={`${enter} mx-auto mt-8 max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-tight text-balance delay-100 sm:text-5xl md:text-7xl`}
        >
          {hero.title}
        </h1>

        <p
          className={`${enter} mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground delay-200 md:text-xl`}
        >
          {hero.value}
        </p>

        <div className={`${enter} mt-10 flex flex-wrap justify-center gap-3 delay-300`}>
          <Button asChild size="lg" className="btn-glow h-12 px-6 text-base">
            <a
              href={whatsappUrl(links.whatsapp, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.ctaPrimary}
              <ArrowRightIcon aria-hidden="true" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-line-strong bg-transparent px-6 text-base transition-colors duration-300 ease-in-out hover:bg-surface dark:bg-transparent"
          >
            <a href="#cases">{hero.ctaSecondary}</a>
          </Button>
        </div>

        <WorkflowPanel />
      </div>
    </section>
  );
}
