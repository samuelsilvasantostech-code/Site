import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { FinalCta } from "@/components/sections/final-cta";
import { DataFlow } from "@/components/shared/data-flow";
import { Metrics } from "@/components/shared/metrics";
import { ProjectKindBadge } from "@/components/shared/project-card";
import { TagList } from "@/components/shared/tag-list";
import { projectKinds, projects, ui } from "@/content/data";

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
  return {
    title: found.item.title,
    description: found.item.summary,
    alternates: { canonical: `/projetos/${slug}` },
    openGraph: {
      title: found.item.title,
      description: found.item.summary,
      url: `/projetos/${slug}`,
    },
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
          <div className="flex flex-wrap items-center gap-3">
            <ProjectKindBadge kind={item.kind} />
            <DataFlow steps={item.flow} />
          </div>
          <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-balance md:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {projectKinds[item.kind].description}
          </p>
        </header>

        <Block title={ui.objective}>
          <p className="text-lg leading-relaxed text-pretty">{item.summary}</p>
        </Block>
        <Block title={ui.problem}>
          <p className="leading-relaxed text-pretty">{item.problem}</p>
        </Block>
        <Block title={ui.approach}>
          <p className="leading-relaxed text-pretty">{item.solution}</p>
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
        {item.metrics.length > 0 && (
          <Block title={ui.results}>
            <Metrics metrics={item.metrics} size="lg" className="border-y border-line py-6" />
          </Block>
        )}

        <nav aria-label="Outros projetos" className="mt-16 grid gap-3 sm:grid-cols-2">
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
