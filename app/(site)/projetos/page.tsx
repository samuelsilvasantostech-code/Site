import type { Metadata } from "next";

import { FinalCta } from "@/components/sections/final-cta";
import { PageIntro } from "@/components/shared/page-intro";
import { ProjectCard } from "@/components/shared/project-card";
import { projectKinds, projects, type ProjectKind } from "@/content/data";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos de automação de processos, integração de sistemas e dados entregues em produção: problema, abordagem, tecnologias e resultados.",
  alternates: { canonical: "/projetos" },
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
