import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/shared/project-card";
import { Section } from "@/components/shared/section";
import { projectKinds, projects, ui } from "@/content/data";

/* Na home, os projetos com resultados verificáveis vêm primeiro. */
const highlights = [...projects.items]
  .sort((a, b) => b.metrics.length - a.metrics.length)
  .slice(0, 3);
const kindsShown = [...new Set(highlights.map((item) => item.kind))];

/** Prévia de projetos na home, com link para a página completa. */
export function Cases() {
  return (
    <Section id="projetos" title={projects.headline} intro={projects.intro}>
      <ul className="grid gap-4 lg:grid-cols-3">
        {highlights.map((item) => (
          <ProjectCard key={item.slug} item={item} />
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-sm text-muted-foreground">
          {kindsShown.map(
            (kind) => `${projectKinds[kind].label}: ${projectKinds[kind].description}`,
          )}
        </p>
        <Link
          href="/projetos"
          className="group inline-flex items-center gap-2 font-semibold text-link"
        >
          {ui.allProjects}
          <ArrowRightIcon
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Section>
  );
}
