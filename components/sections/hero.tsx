import { Button } from "@/components/ui/button";
import { hero } from "@/content/data";

import { HeroDiagram } from "./hero-diagram";

export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="dot-grid relative isolate grid grid-cols-1 gap-10 pt-[clamp(3rem,8vw,6rem)] pb-[clamp(3.5rem,8vw,5.5rem)] lg:min-h-[min(calc(100svh-var(--header-h)),820px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-[clamp(2.5rem,5vw,5rem)]"
    >
      <div>
        <h1 id="hero-title" className="text-hero font-bold tracking-[-0.04em] text-balance">
          {hero.name}
        </h1>
        <p className="mt-5 max-w-[34rem] font-mono text-xs leading-[1.7] text-brand">{hero.role}</p>
        <p className="mt-6 max-w-[32rem] text-lg tracking-[-0.01em] text-pretty">{hero.value}</p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 px-[1.35rem] text-base font-semibold">
            <a href="#cases">{hero.ctaPrimary}</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-line-strong bg-transparent px-[1.35rem] text-base font-semibold shadow-none hover:border-brand hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
          >
            <a href="#contato">
              <span className="size-2 rounded-full bg-current opacity-85" aria-hidden="true" />
              {hero.ctaSecondary}
            </a>
          </Button>
        </div>

        <p className="status-dot mt-8 flex max-w-[32rem] items-baseline gap-[0.6rem] text-sm text-muted-foreground">
          {hero.status}
        </p>
      </div>

      <HeroDiagram />
    </section>
  );
}
