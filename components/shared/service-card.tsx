import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Tilt } from "@/components/motion/tilt";
import type { Service } from "@/content/data";

import { FeatureIcon } from "./icon";
import { TrackedLink } from "./tracked-link";

/** Card de serviço reutilizável: nome, descrição, exemplos e CTA para a página de serviços. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <li data-animate>
      <Tilt className="flex flex-col rounded-lg border border-line bg-surface p-7 transition-colors duration-300 ease-in-out hover:border-line-strong md:p-8">
        <FeatureIcon name={service.icon} />
        <h3 className="mt-6 text-xl font-bold tracking-tight">{service.name}</h3>
        <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
          {service.description}
        </p>
        <ul className="mt-6 grid gap-2.5">
          {service.examples.map((example) => (
            <li key={example} className="flex gap-2.5 text-sm leading-relaxed">
              <CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-link" />
              {example}
            </li>
          ))}
        </ul>
        <TrackedLink
          href={`/servicos#${service.slug}`}
          event="service_cta_click"
          eventData={{ service: service.slug }}
          className="group mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-link"
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
