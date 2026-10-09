import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Tilt } from "@/components/motion/tilt";
import { FeatureIcon } from "@/components/shared/icon";
import { Section } from "@/components/shared/section";
import { problems } from "@/content/data";

/** Cada problema leva ao serviço que costuma resolvê-lo. */
export function Problems() {
  return (
    <Section id="problemas" tone="invert" title={problems.headline} intro={problems.intro}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {problems.cards.map((card) => (
          <li key={card.title} data-animate>
            <Tilt className="flex flex-col rounded-lg border border-line bg-surface p-7 transition-colors duration-300 ease-in-out hover:border-line-strong">
              <FeatureIcon name={card.icon} />
              <h3 className="mt-6 text-lg leading-snug font-bold tracking-tight">{card.title}</h3>
              <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
                {card.description}
              </p>
              <Link
                href={card.solution.href}
                className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-link"
              >
                {card.solution.label}
                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                />
              </Link>
            </Tilt>
          </li>
        ))}
      </ul>
    </Section>
  );
}
