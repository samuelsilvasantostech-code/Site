import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { FinalCta } from "@/components/sections/final-cta";
import { FlowDiagram } from "@/components/shared/flow-diagram";
import { Metrics } from "@/components/shared/metrics";
import { hasVerifiedMetrics, ProjectKindBadge } from "@/components/shared/project-card";
import { TagList } from "@/components/shared/tag-list";
import { projectKinds, projects, services, ui } from "@/content/data";
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

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-3 text-lg font-bold tracking-tight">{title}</h2>
      {children}
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
      <article className="mx-auto max-w-3xl px-6 pt-[calc(var(--header-h)+3rem)] pb-8">
        <Link
          href="/projetos"
          className="-ml-2 inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          {ui.allProjects}
        </Link>

        <header className="mt-6">
          <ProjectKindBadge kind={item.kind} />
          <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-balance md:text-5xl">
            {item.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
            {item.summary}
          </p>
          <p className="mt-6 flex gap-3 rounded-md border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            <InfoIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-link" />
            {projectKinds[item.kind].description}
          </p>
        </header>

        <Block title={ui.problem}>
          <p className="leading-relaxed text-pretty">{item.problem}</p>
        </Block>
        <Block title={ui.solution}>
          <p className="leading-relaxed text-pretty">{item.solution}</p>
        </Block>
        <Block title={ui.flow}>
          <FlowDiagram steps={item.flow} variant="full" />
        </Block>
        {item.steps.length > 0 && (
          <Block title={ui.implementation}>
            <StepList
              className={
                item.stepsOrdered
                  ? "list-decimal space-y-2 pl-5 marker:text-muted-foreground"
                  : "list-disc space-y-2 pl-5 marker:text-line-strong"
              }
            >
              {item.steps.map((step) => (
                <li key={step} className="pl-1 leading-relaxed text-pretty">
                  {step}
                </li>
              ))}
            </StepList>
          </Block>
        )}
        <Block title={ui.stack}>
          <TagList tags={item.stack} />
        </Block>
        <Block title={ui.benefit}>
          <p className="leading-relaxed text-pretty">{item.benefit}</p>
        </Block>
        {hasVerifiedMetrics(item) && (
          <Block title={ui.results}>
            <Metrics metrics={item.metrics} size="lg" className="border-y border-line py-6" />
          </Block>
        )}

        {service && (
          <Link
            href={`/servicos#${service.slug}`}
            className="group mt-14 flex items-center justify-between gap-4 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong"
          >
            <span>
              <span className="block text-sm text-muted-foreground">{ui.relatedService}</span>
              <span className="mt-0.5 block font-display font-bold tracking-tight group-hover:text-link">
                {service.name}
              </span>
            </span>
            <ArrowRightIcon
              aria-hidden="true"
              className="size-5 shrink-0 text-link transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        )}

        <nav aria-label="Outros projetos" className="mt-8 grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/projetos/${previous.slug}`}
              className="group rounded-lg border border-line p-4 transition-colors hover:border-line-strong"
            >
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
                {ui.previousProject}
              </span>
              <span className="mt-1 block font-medium group-hover:text-link">{previous.title}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next && (
            <Link
              href={`/projetos/${next.slug}`}
              className="group rounded-lg border border-line p-4 text-right transition-colors hover:border-line-strong"
            >
              <span className="flex items-center justify-end gap-1.5 text-sm text-muted-foreground">
                {ui.nextProject}
                <ArrowRightIcon aria-hidden="true" className="size-3.5" />
              </span>
              <span className="mt-1 block font-medium group-hover:text-link">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      <FinalCta source={`projeto-${item.slug}`} />
    </>
  );
}
