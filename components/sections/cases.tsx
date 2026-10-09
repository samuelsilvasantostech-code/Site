import { ArrowRightIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/shared/project-card";
import { Section } from "@/components/shared/section";
import { portfolioDisclaimer, projects, ui } from "@/content/data";

/* Na home, só os projetos marcados como destaque (3 ou 4). */
const highlights = projects.items.filter((item) => item.featured).slice(0, 4);

/** Prévia de projetos na home, com o aviso de origem e link para a página completa. */
export function Cases() {
  return (
    <Section id="projetos" title={projects.headline} intro={projects.intro}>
      <p
        data-animate
        className="mb-8 flex max-w-3xl gap-3 rounded-md border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted-foreground"
      >
        <InfoIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-link" />
        {portfolioDisclaimer}
      </p>

      <ul className="grid gap-4 md:grid-cols-2">
        {highlights.map((item) => (
          <ProjectCard key={item.slug} item={item} />
        ))}
      </ul>

      <Link
        href="/projetos"
        className="group mt-8 inline-flex items-center gap-2 font-semibold text-link"
      >
        {ui.allProjects}
        <ArrowRightIcon
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
        />
      </Link>
    </Section>
  );
}
