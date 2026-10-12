import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Spotlight } from "@/components/motion/spotlight";
import { DataFlowDiagram } from "@/components/ui/data-flow-diagram";
import { projectKinds, ui, type CaseStudy } from "@/content/data";
import { cn } from "@/lib/utils";

/** Selo que identifica a origem do projeto (SSNEX, fundador ou demonstração). */
export function ProjectKindBadge({
  kind,
  className,
}: {
  kind: CaseStudy["kind"];
  className?: string;
}) {
  return (
    <span className={cn("eyebrow text-muted-foreground", className)}>
      {projectKinds[kind].label}
    </span>
  );
}

/** Métricas só aparecem quando foram confirmadas (`metricsVerified`). */
export function hasVerifiedMetrics(item: CaseStudy) {
  return item.metricsVerified && item.metrics.length > 0;
}

/**
 * Card de projeto da grade editorial (/projetos): origem, título, resumo, o
 * fluxo entre os sistemas e o que melhora. O card inteiro é clicável.
 * `span` define a largura na grade de 12 colunas (7 ou 5).
 */
export function ProjectCard({ item, span }: { item: CaseStudy; span: "7" | "5" }) {
  return (
    <li data-area={item.area} data-span={span} className="project-grid-item">
      <Spotlight className="flex h-full flex-col p-7 md:p-10">
        <ProjectKindBadge kind={item.kind} />
        <h2 className="mt-6 text-title">
          <Link
            href={`/projetos/${item.slug}`}
            className="after:absolute after:inset-0 after:rounded-[inherit] hover:text-link"
          >
            {item.title}
          </Link>
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-muted-foreground">{item.summary}</p>

        <DataFlowDiagram steps={item.flow} className="mt-auto pt-10" />

        <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-pretty">
          <span className="font-medium">{ui.benefit}: </span>
          <span className="text-muted-foreground">{item.benefit}</span>
        </p>
        <span
          aria-hidden="true"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-link"
        >
          {ui.viewProject}
          <ArrowUpRightIcon className="size-4" />
        </span>
      </Spotlight>
    </li>
  );
}
