import { InfoIcon } from "lucide-react";
import type { Metadata } from "next";

import { FinalCta } from "@/components/sections/final-cta";
import { PageIntro } from "@/components/shared/page-intro";
import { ProjectCard } from "@/components/shared/project-card";
import { portfolioDisclaimer, projectKinds, projects, type ProjectKind } from "@/content/data";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projetos de automação e integração de sistemas",
  description:
    "Exemplos reais de automação de processos, integração de sistemas por APIs e webhooks e centralização de dados: problema, solução, fluxo e tecnologias.",
  alternates: canonical("/projetos"),
};

/* Só mostra as origens que existem na lista (cliente, fundador ou demonstração). */
const kindsInUse = Object.keys(projectKinds).filter((kind) =>
  projects.items.some((item) => item.kind === kind),
) as ProjectKind[];

export default function ProjectsPage() {
  return (
    <>
      <PageIntro title={projects.headline} intro={projects.intro} />

      <section aria-label="Lista de projetos" className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 flex max-w-3xl gap-3 rounded-md border border-link/30 bg-link/5 px-4 py-3 leading-relaxed text-pretty">
            <InfoIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-link" />
            {portfolioDisclaimer}
          </p>

          <dl className="mb-10 grid gap-4 md:grid-cols-3">
            {kindsInUse.map((kind) => (
              <div key={kind} className="rounded-lg border border-line p-5">
                <dt className="font-display text-sm font-semibold">{projectKinds[kind].label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {projectKinds[kind].description}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="grid gap-4 md:grid-cols-2">
            {projects.items.map((item) => (
              <ProjectCard key={item.slug} item={item} large />
            ))}
          </ul>
        </div>
      </section>

      <FinalCta source="projetos" />
    </>
  );
}
