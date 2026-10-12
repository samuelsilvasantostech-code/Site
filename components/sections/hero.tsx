import Link from "next/link";
import { Fragment } from "react";

import { PrimaryCta } from "@/components/shared/primary-cta";
import { HeroVisual } from "@/components/three/hero-visual";
import { Button } from "@/components/ui/button";
import { brand, hero } from "@/content/data";

import { SystemsDiagram } from "./systems-diagram";

/* Entradas em CSS puro: aparecem antes mesmo do JavaScript carregar. */
const enter = "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-900 ease-brand";

/**
 * Hero em tela cheia: a cena 3D (núcleo SSNEX e os sistemas conectados a ele)
 * ocupa o fundo e reage ao mouse e à rolagem; o texto fica por cima, à
 * esquerda. A camada de texto deixa o mouse passar até a cena, exceto nos
 * links e botões.
 */
export function Hero() {
  const words = hero.headline.split(" ");
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <div aria-hidden="true" className="signature-glow absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10">
        <HeroVisual
          fallback={
            <div className="absolute top-1/2 right-[3%] hidden w-[44%] max-w-[560px] -translate-y-1/2 lg:block">
              <SystemsDiagram />
            </div>
          }
        />
      </div>
      {/* Véu sob o texto: mantém a leitura quando a cena passa por trás. */}
      <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0 -z-10" />

      <div className="pointer-events-none container-site flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-14 md:justify-center md:pb-20">
        <p className={`${enter} eyebrow text-muted-foreground`}>
          <span className="text-foreground">{brand.tagline.lead}</span>{" "}
          <span className="text-link">{brand.tagline.highlight}</span>
        </p>

        <h1
          id="hero-title"
          className="mt-6 max-w-[13ch] text-hero md:max-w-[min(62%,50rem)]"
          aria-label={hero.headline}
        >
          {/* Cada palavra sobe de trás de uma máscara, em cascata. */}
          {words.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              {i > 0 && " "}
              <span aria-hidden="true" className="word-mask">
                <span className="word-rise" style={{ animationDelay: `${120 + i * 45}ms` }}>
                  {word}
                </span>
              </span>
            </Fragment>
          ))}
        </h1>

        <p
          className={`${enter} mt-8 max-w-xl text-lead text-pretty text-muted-foreground`}
          style={{ animationDelay: `${200 + words.length * 45}ms` }}
        >
          {hero.description}
        </p>

        <div
          className={`${enter} pointer-events-auto mt-10 flex flex-wrap items-center gap-3 self-start`}
          style={{ animationDelay: `${320 + words.length * 45}ms` }}
        >
          <PrimaryCta size="xl" magnetic />
          <Button
            asChild
            variant="ghost"
            className="h-14 px-7 text-base text-muted-foreground hover:text-foreground md:h-16 md:text-lg"
          >
            <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
