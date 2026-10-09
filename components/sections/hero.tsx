import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { HeroVisual } from "@/components/motion/hero-visual";
import { Button } from "@/components/ui/button";
import { brand, hero, primaryCta } from "@/content/data";

import { SystemsDiagram } from "./systems-diagram";

/* Entrada do hero: CSS puro (tw-animate), aparece antes mesmo do JavaScript carregar. */
const enter = "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out";

export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3.5rem)] pb-20 md:pt-[calc(var(--header-h)+5rem)] md:pb-28"
    >
      <div aria-hidden="true" className="hero-backdrop absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className={`${enter} text-sm font-medium text-muted-foreground`}>
            <span className="text-foreground">{brand.tagline.lead}</span>{" "}
            <span className="text-link">{brand.tagline.highlight}</span>
          </p>

          <h1
            id="hero-title"
            className={`${enter} mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-balance delay-100 sm:text-5xl lg:text-[3.25rem]`}
          >
            {hero.headline}
          </h1>

          <p
            className={`${enter} mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground delay-200`}
          >
            {hero.description}
          </p>

          <div className={`${enter} mt-9 flex flex-wrap gap-3 delay-300`}>
            <Button asChild size="lg" className="btn-glow h-12 px-6 text-base">
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-line-strong bg-transparent px-6 text-base transition-colors duration-300 ease-in-out hover:bg-surface dark:bg-transparent"
            >
              <a href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className={`${enter} delay-300`}>
          <HeroVisual fallback={<SystemsDiagram />} />
        </div>
      </div>
    </section>
  );
}
