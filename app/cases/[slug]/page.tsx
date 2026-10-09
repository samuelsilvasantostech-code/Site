import { ArrowLeftIcon, ArrowRightIcon, MessageCircleIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CopyEmailButton } from "@/components/layout/copy-email-button";
import { PageHeader } from "@/components/layout/page-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DataFlow } from "@/components/shared/data-flow";
import { Metrics } from "@/components/shared/metrics";
import { TagList } from "@/components/shared/tag-list";
import { Button } from "@/components/ui/button";
import { cases, contact, links, ui } from "@/content/data";
import { whatsappUrl } from "@/lib/format";

function findCase(slug: string) {
  const index = cases.items.findIndex((item) => item.slug === slug);
  if (index === -1) return null;
  return {
    item: cases.items[index],
    previous: cases.items[index - 1],
    next: cases.items[index + 1],
  };
}

export function generateStaticParams() {
  return cases.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = findCase(slug);
  if (!found) return {};
  return {
    title: found.item.title,
    description: found.item.summary,
    alternates: { canonical: `/cases/${slug}` },
    openGraph: { title: found.item.title, description: found.item.summary, url: `/cases/${slug}` },
  };
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default async function CasePage({ params }: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const found = findCase(slug);
  if (!found) notFound();
  const { item, previous, next } = found;
  const StepList = item.stepsOrdered ? "ol" : "ul";

  return (
    <div className="mx-auto max-w-2xl px-6">
      <PageHeader backHref="/#cases" backLabel={ui.allCases} />

      <main id="conteudo" tabIndex={-1} className="pt-10 pb-20">
        <article>
          <header>
            <DataFlow steps={item.flow} />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
              {item.title}
            </h1>
            <p className="mt-4 text-lg text-pretty text-muted-foreground">{item.summary}</p>
            {item.metrics.length > 0 && (
              <Metrics
                metrics={item.metrics}
                size="lg"
                className="mt-8 border-y border-line py-6"
              />
            )}
          </header>

          <Block title={ui.problem}>
            <p className="text-pretty">{item.problem}</p>
          </Block>
          <Block title={ui.solution}>
            <p className="text-pretty">{item.solution}</p>
          </Block>
          {item.steps.length > 0 && (
            <Block title={ui.howItWorks}>
              <StepList
                className={
                  item.stepsOrdered
                    ? "list-decimal space-y-2 pl-5 marker:text-muted-foreground"
                    : "list-disc space-y-2 pl-5 marker:text-line-strong"
                }
              >
                {item.steps.map((step) => (
                  <li key={step} className="pl-1 text-pretty">
                    {step}
                  </li>
                ))}
              </StepList>
            </Block>
          )}
          <Block title={ui.stack}>
            <TagList tags={item.stack} />
          </Block>
        </article>

        <aside className="mt-16 rounded-lg bg-surface p-6">
          <h2 className="font-semibold">{contact.title}</h2>
          <p className="mt-1 text-pretty text-muted-foreground">{contact.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild>
              <a
                href={whatsappUrl(links.whatsapp, contact.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleIcon aria-hidden="true" />
                {contact.whatsappCta}
              </a>
            </Button>
            <CopyEmailButton />
          </div>
        </aside>

        <nav aria-label="Outros cases" className="mt-12 grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/cases/${previous.slug}`}
              className="group rounded-lg border border-line p-4 transition-colors hover:border-line-strong"
            >
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
                {ui.previousCase}
              </span>
              <span className="mt-1 block font-medium group-hover:text-link">{previous.title}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next && (
            <Link
              href={`/cases/${next.slug}`}
              className="group rounded-lg border border-line p-4 text-right transition-colors hover:border-line-strong"
            >
              <span className="flex items-center justify-end gap-1.5 text-sm text-muted-foreground">
                {ui.nextCase}
                <ArrowRightIcon aria-hidden="true" className="size-3.5" />
              </span>
              <span className="mt-1 block font-medium group-hover:text-link">{next.title}</span>
            </Link>
          )}
        </nav>
      </main>

      <SiteFooter />
    </div>
  );
}
