import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";

import { FlowReveal } from "@/components/motion/flow-reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { Metrics } from "@/components/shared/metrics";
import { hasVerifiedMetrics, ProjectKindBadge } from "@/components/shared/project-card";
import { DataFlowDiagram } from "@/components/ui/data-flow-diagram";
import { projectKinds, projects, services, ui } from "@/content/data";
import { cn } from "@/lib/utils";
import { canonical } from "@/lib/seo";

function findProject(slug: string) {
  const index = projects.items.findIndex((item) => item.slug === slug);
  if (index === -1) return null;
  return {
    item: projects.items[index],
    previous: projects.items[index - 1],
    next: projects.items[index + 1],
  };
}

export function generateStaticParams() {
  return projects.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = findProject(slug);
  if (!found) return {};
  const description = `${found.item.summary} ${found.item.benefit}`;
  return {
    title: found.item.title,
    description,
    alternates: canonical(`/projetos/${slug}`),
    openGraph: { title: found.item.title, description, url: `/projetos/${slug}` },
  };
}

/** Um bloco do case: rótulo técnico à esquerda, conteúdo à direita (desktop). */
function Block({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      data-animate
      className={cn(
        "grid gap-6 border-t border-line py-14 md:py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16",
        className,
      )}
    >
      <h2 className="eyebrow text-muted-foreground lg:pt-2">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const found = findProject(slug);
  if (!found) notFound();
  const { item, previous, next } = found;
  const StepList = item.stepsOrdered ? "ol" : "ul";
  const service = services.items.find((s) => s.slug === item.service);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden pt-[calc(var(--header-h)+clamp(3rem,9vh,6rem))] pb-[clamp(3rem,8vh,5rem)]">
          <div aria-hidden="true" className="hero-backdrop absolute inset-0 -z-10" />
          <div className="container-site">
            <Link
              href="/projetos"
              className="-ml-2 inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-4" />
              {ui.allProjects}
            </Link>

            <ProjectKindBadge kind={item.kind} className="mt-10 block" />
            <ViewTransition name={`projeto-${item.slug}`} share="morph" default="none">
              <h1 className="mt-6 max-w-[16ch] text-hero">{item.title}</h1>
            </ViewTransition>
            <p className="mt-8 max-w-2xl text-lead text-pretty text-muted-foreground">
              {item.summary}
            </p>
            <p className="mt-10 flex max-w-3xl gap-3 text-sm leading-relaxed text-muted-foreground">
              <InfoIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-link" />
              {projectKinds[item.kind].description}
            </p>
          </div>
        </header>

        <div className="container-site">
          <Block title={ui.problem}>
            <p className="text-title text-pretty">{item.problem}</p>
          </Block>
          <Block title={ui.solution}>
            <p className="text-lead text-pretty">{item.solution}</p>
          </Block>
          <Block title={ui.flow}>
            <FlowReveal>
              <DataFlowDiagram steps={item.flow} size="lg" />
            </FlowReveal>
          </Block>
          {item.steps.length > 0 && (
            <Block title={ui.implementation}>
              <StepList className="grid gap-4">
                {item.steps.map((step, i) => (
                  <li key={step} className="flex gap-5 text-lead leading-relaxed text-pretty">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 w-6 shrink-0 font-mono text-sm text-muted-foreground"
                    >
                      {item.stepsOrdered ? String(i + 1).padStart(2, "0") : "—"}
                    </span>
                    {step}
                  </li>
                ))}
              </StepList>
            </Block>
          )}
          <Block title={ui.benefit}>
            <p className="text-display text-pretty">{item.benefit}</p>
          </Block>
          {hasVerifiedMetrics(item) && (
            <Block title={ui.results}>
              <Metrics metrics={item.metrics} size="lg" />
            </Block>
          )}

          {service && (
            <Link
              href={`/servicos#${service.slug}`}
              className="group flex items-center justify-between gap-6 border-t border-line py-10"
            >
              <span>
                <span className="block eyebrow text-muted-foreground">{ui.relatedService}</span>
                <span className="mt-3 block text-title group-hover:text-link">{service.name}</span>
              </span>
              <ArrowRightIcon
                aria-hidden="true"
                className="size-6 shrink-0 text-link transition-transform duration-300 ease-brand group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>

        <nav aria-label="Outros projetos" className="border-t border-line">
          {next && (
            <Link
              href={`/projetos/${next.slug}`}
              className="group relative block overflow-hidden py-[clamp(4rem,12vh,8rem)]"
            >
              <span
                aria-hidden="true"
                className="hero-backdrop absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 ease-brand group-hover:opacity-100"
              />
              <span className="container-site block">
                <span className="flex items-center gap-2 eyebrow text-muted-foreground">
                  {ui.nextProject}
                  <ArrowRightIcon aria-hidden="true" className="size-3.5" />
                </span>
                <span className="mt-6 block max-w-[18ch] text-display transition-colors duration-500 ease-brand group-hover:text-link">
                  {next.title}
                </span>
                <span className="mt-8 block max-w-3xl">
                  <DataFlowDiagram steps={next.flow} />
                </span>
              </span>
            </Link>
          )}
          {previous && (
            <div className="container-site border-t border-line py-8">
              <Link
                href={`/projetos/${previous.slug}`}
                className="group inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeftIcon aria-hidden="true" className="size-4" />
                <span className="eyebrow">{ui.previousProject}</span>
                <span className="font-medium group-hover:text-link">{previous.title}</span>
              </Link>
            </div>
          )}
        </nav>
      </article>

      <FinalCta source={`projeto-${item.slug}`} />
    </>
  );
}
