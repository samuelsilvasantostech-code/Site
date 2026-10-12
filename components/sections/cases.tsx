import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";

import { ProjectsRail } from "@/components/motion/projects-rail";
import { DataFlowDiagram } from "@/components/ui/data-flow-diagram";
import { portfolioDisclaimer, projectKinds, projects, ui } from "@/content/data";

/* Na home, só os projetos marcados como destaque (3 ou 4). */
const highlights = projects.items.filter((item) => item.featured).slice(0, 4);
const total = String(highlights.length).padStart(2, "0");

/**
 * Projetos como narrativa horizontal: cada painel mostra o problema resolvido,
 * o fluxo de dados entre os sistemas (o protagonista, aceso pela rolagem) e o
 * que melhora. O título viaja até a página do projeto na transição.
 */
export function Cases() {
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="relative py-section">
      <div className="container-site">
        <header className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <h2 id="projetos-title" data-split className="text-display">
              {projects.headline}
            </h2>
            <p data-animate className="mt-8 max-w-2xl text-lead text-pretty text-muted-foreground">
              {projects.intro}
            </p>
          </div>
          <Link
            href="/projetos"
            className="group inline-flex items-center gap-2 font-medium text-link"
          >
            {ui.allProjects}
            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-1"
            />
          </Link>
        </header>
        <p data-animate className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {portfolioDisclaimer}
        </p>
      </div>

      <ProjectsRail>
        <ul data-rail-track className="projects-track">
          {highlights.map((item, i) => (
            <li key={item.slug} data-rail-panel className="project-panel">
              <article className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow text-muted-foreground">
                    {projectKinds[item.kind].label}
                  </span>
                  <span aria-hidden="true" className="eyebrow text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                </div>

                <ViewTransition name={`projeto-${item.slug}`} share="morph" default="none">
                  <h3 className="mt-8 max-w-[18ch] text-[clamp(2rem,3.6vw,3.75rem)] leading-none font-bold tracking-[-0.035em]">
                    <Link
                      href={`/projetos/${item.slug}`}
                      className="after:absolute after:inset-0 after:rounded-[inherit] hover:text-link"
                    >
                      {item.title}
                    </Link>
                  </h3>
                </ViewTransition>
                <p className="mt-5 max-w-2xl text-lead text-pretty text-muted-foreground">
                  {item.summary}
                </p>

                <DataFlowDiagram steps={item.flow} className="mt-auto pt-10" />

                <div className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <p className="eyebrow text-muted-foreground">{ui.benefit}</p>
                    <p className="mt-3 max-w-3xl text-title text-pretty">{item.benefit}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-link"
                  >
                    {ui.viewProject}
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </ProjectsRail>
    </section>
  );
}
