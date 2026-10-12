import type { Metadata } from "next";

import { ProjectFilter } from "@/components/motion/project-filter";
import { FinalCta } from "@/components/sections/final-cta";
import { PageIntro } from "@/components/shared/page-intro";
import { ProjectCard } from "@/components/shared/project-card";
import {
  portfolioDisclaimer,
  projectAreas,
  projectKinds,
  projects,
  type ProjectArea,
  type ProjectKind,
} from "@/content/data";
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

/* Só os filtros de áreas que têm projetos. */
const areaOptions = (Object.keys(projectAreas) as ProjectArea[])
  .filter((area) => projects.items.some((item) => item.area === area))
  .map((area) => ({ value: area, label: projectAreas[area] }));

/** Ritmo editorial da grade: 7/5, 5/7 (o filtro recalcula ao esconder cards). */
const spanFor = (i: number) => (i % 4 === 0 || i % 4 === 3 ? "7" : "5");

export default function ProjectsPage() {
  return (
    <>
      <PageIntro title={projects.headline} intro={projects.intro} />

      <section aria-label="Lista de projetos" className="py-section">
        <div className="container-site">
          <div className="mb-16 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <p className="max-w-2xl text-lead text-pretty">{portfolioDisclaimer}</p>
            <dl className="grid gap-6">
              {kindsInUse.map((kind) => (
                <div key={kind} className="border-l border-line-strong pl-5">
                  <dt className="eyebrow text-muted-foreground">{projectKinds[kind].label}</dt>
                  <dd className="mt-2 leading-relaxed text-pretty text-muted-foreground">
                    {projectKinds[kind].description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ProjectFilter options={areaOptions} allLabel="Todos">
            {projects.items.map((item, i) => (
              <ProjectCard key={item.slug} item={item} span={spanFor(i)} />
            ))}
          </ProjectFilter>
        </div>
      </section>

      <FinalCta source="projetos" />
    </>
  );
}
