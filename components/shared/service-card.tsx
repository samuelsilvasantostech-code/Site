import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Tilt } from "@/components/motion/tilt";
import type { Service } from "@/content/data";
import { cn } from "@/lib/utils";

import { FeatureIcon } from "./icon";
import { TrackedLink } from "./tracked-link";

/**
 * Card de serviço da home. Os serviços principais (automação e integração)
 * ganham mais destaque e exemplos; os complementares, um formato compacto.
 */
export function ServiceCard({ service }: { service: Service }) {
  const principal = service.tier === "principal";
  return (
    <li data-animate className="md:col-span-3">
      <Tilt
        className={cn(
          "flex flex-col rounded-lg border bg-surface transition-colors duration-300 ease-in-out",
          principal
            ? "border-line-strong p-7 hover:border-link/60 md:p-9"
            : "border-line p-6 hover:border-line-strong",
        )}
      >
        <div className="flex items-center gap-4">
          <FeatureIcon name={service.icon} />
          <h3 className={cn("font-bold tracking-tight", principal ? "text-2xl" : "text-lg")}>
            {service.name}
          </h3>
        </div>
        <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{service.summary}</p>
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
          className={cn(
            "group mt-auto inline-flex items-center gap-2 font-semibold text-link",
            principal ? "pt-7" : "pt-5",
          )}
        >
          {service.cta}
          <ArrowRightIcon
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
          />
        </TrackedLink>
      </Tilt>
    </li>
  );
}
