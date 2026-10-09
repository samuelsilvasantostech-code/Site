import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Tilt } from "@/components/motion/tilt";
import { projectKinds, ui, type CaseStudy } from "@/content/data";
import { cn } from "@/lib/utils";

import { FlowDiagram } from "./flow-diagram";

/** Selo que identifica a origem do projeto (SSNEX, fundador ou demonstração). */
export function ProjectKindBadge({ kind }: { kind: CaseStudy["kind"] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {projectKinds[kind].label}
    </span>
  );
}

/** Métricas só aparecem quando foram confirmadas (`metricsVerified`). */
export function hasVerifiedMetrics(item: CaseStudy) {
  return item.metricsVerified && item.metrics.length > 0;
}

/**
 * Card de projeto reutilizável (home e /projetos): origem, título, problema,
 * fluxo entre sistemas e o que melhora. `large` mostra também o problema.
 */
export function ProjectCard({ item, large = false }: { item: CaseStudy; large?: boolean }) {
  return (
    <li data-animate className="h-full">
      <Tilt className="rounded-lg">
        <Link
          href={`/projetos/${item.slug}`}
          className={cn(
            "group flex h-full flex-col rounded-lg border border-line bg-surface transition-colors duration-300 ease-in-out hover:border-line-strong",
            large ? "p-7 md:p-8" : "p-6",
          )}
        >
          <ProjectKindBadge kind={item.kind} />
          <h3
            className={cn(
              "mt-4 font-bold tracking-tight text-balance group-hover:text-link",
              large ? "text-xl md:text-2xl" : "text-lg",
            )}
          >
            {item.title}
          </h3>
          <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
            {large ? item.problem : item.summary}
          </p>

          <FlowDiagram steps={item.flow} className="mt-5" />

          <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-pretty">
            <span className="font-semibold">{ui.benefit}: </span>
            <span className="text-muted-foreground">{item.benefit}</span>
          </p>

          {large && hasVerifiedMetrics(item) && (
            <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
              {item.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse">
                  <dt className="text-sm text-muted-foreground">{metric.label}</dt>
                  <dd className="text-gradient font-display text-3xl font-bold tracking-tight">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-link">
            {ui.viewProject}
            <ArrowUpRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </Link>
      </Tilt>
    </li>
  );
}
