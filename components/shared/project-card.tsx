import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { projectKinds, ui, type CaseStudy } from "@/content/data";
import { cn } from "@/lib/utils";

import { DataFlow } from "./data-flow";
import { TagList } from "./tag-list";

/** Selo que identifica a origem do projeto (cliente, fundador ou demonstração). */
export function ProjectKindBadge({ kind }: { kind: CaseStudy["kind"] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {projectKinds[kind].label}
    </span>
  );
}

/** Card de projeto reutilizável (home e /projetos). `large` mostra métricas e tecnologias. */
export function ProjectCard({ item, large = false }: { item: CaseStudy; large?: boolean }) {
  return (
    <li data-animate className="h-full">
      <Link
        href={`/projetos/${item.slug}`}
        className={cn(
          "group flex h-full flex-col rounded-lg border border-line bg-surface transition-[border-color,transform] duration-300 ease-in-out hover:-translate-y-0.5 hover:border-line-strong",
          large ? "p-8" : "p-6",
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <DataFlow steps={item.flow} />
          <ProjectKindBadge kind={item.kind} />
        </div>
        <h3
          className={cn(
            "mt-4 font-bold tracking-tight text-balance",
            large ? "text-2xl" : "text-lg",
          )}
        >
          {item.title}
        </h3>
        <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">{item.summary}</p>

        {large && item.metrics.length > 0 && (
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
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

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          {large ? <TagList tags={item.stack} label={ui.stack} /> : <span />}
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-link">
            {ui.viewProject}
            <ArrowUpRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </li>
  );
}
