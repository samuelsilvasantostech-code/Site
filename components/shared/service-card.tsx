import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Spotlight } from "@/components/motion/spotlight";
import { ServiceVisual } from "@/components/ui/service-visuals";
import type { Service } from "@/content/data";
import { cn } from "@/lib/utils";

import { TrackedLink } from "./tracked-link";

/** Posição de cada serviço no bento de 12 colunas (desktop). */
const LAYOUT: Record<Service["slug"], string> = {
  automacao: "lg:col-span-7",
  integracao: "lg:col-span-5",
  ia: "lg:col-span-5",
  consultoria: "lg:col-span-7",
};

/**
 * Bloco de serviço do bento da home: uma micro-visualização do que o serviço
 * faz, o nome, a frase-resumo e o link. Os serviços principais (automação e
 * integração) são mais altos e trazem exemplos.
 */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const principal = service.tier === "principal";
  return (
    <li
      data-animate="scale"
      data-animate-delay={(index % 2) * 0.08}
      className={cn("min-w-0", LAYOUT[service.slug])}
    >
      <Spotlight
        className={cn(
          "flex h-full flex-col overflow-hidden",
          principal ? "min-h-[34rem] p-8 md:p-10" : "p-8 md:p-10",
        )}
      >
        <div className={cn("mb-10", principal && "flex flex-1 flex-col justify-center")}>
          <ServiceVisual slug={service.slug} />
        </div>
        <div>
          <h3 className="text-title">{service.name}</h3>
          <p className="mt-3 max-w-lg text-pretty text-muted-foreground">{service.summary}</p>
          {principal && (
            <ul className="mt-6 grid gap-2.5">
              {service.examples.slice(0, 3).map((example) => (
                <li key={example} className="flex gap-2.5 text-sm leading-relaxed">
                  <CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-link" />
                  {example}
                </li>
              ))}
            </ul>
          )}
          <TrackedLink
            href={`/servicos#${service.slug}`}
            event="service_cta_click"
            eventData={{ service: service.slug }}
            className="group mt-8 inline-flex items-center gap-2 font-medium text-link"
          >
            {service.cta}
            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-1"
            />
          </TrackedLink>
        </div>
      </Spotlight>
    </li>
  );
}
