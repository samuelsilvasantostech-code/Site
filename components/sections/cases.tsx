import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { DataFlow } from "@/components/shared/data-flow";
import { Section } from "@/components/shared/section";
import { TagList } from "@/components/shared/tag-list";
import { cases, ui, type CaseStudy } from "@/content/data";
import { cn } from "@/lib/utils";

/* Cases com métricas viram destaque; os demais formam a grade abaixo. */
const featured = cases.items.filter((item) => item.metrics.length > 0);
const others = cases.items.filter((item) => item.metrics.length === 0);

function CaseCard({ item, large = false }: { item: CaseStudy; large?: boolean }) {
  return (
    <li data-animate className="h-full">
      <Link
        href={`/cases/${item.slug}`}
        className={cn(
          "group flex h-full flex-col rounded-lg border border-line bg-surface transition-[border-color,transform] duration-300 ease-in-out hover:-translate-y-0.5 hover:border-line-strong",
          large ? "p-8" : "p-6",
        )}
      >
        <DataFlow steps={item.flow} />
        <h3
          className={cn(
            "mt-4 font-bold tracking-tight text-balance",
            large ? "text-2xl" : "text-lg",
          )}
        >
          {item.title}
        </h3>
        <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">{item.summary}</p>

        {large && (
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse">
                <dt className="text-sm text-muted-foreground">{metric.label}</dt>
                <dd className="text-gradient text-3xl font-extrabold tracking-tight">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          {large ? <TagList tags={item.stack} label={ui.stack} /> : <span />}
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-link">
            {ui.readCaseShort}
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

export function Cases() {
  return (
    <Section id="cases" title={cases.title} intro={cases.intro}>
      <ul className="grid gap-4 lg:grid-cols-2">
        {featured.map((item) => (
          <CaseCard key={item.slug} item={item} large />
        ))}
      </ul>
      <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {others.map((item) => (
          <CaseCard key={item.slug} item={item} />
        ))}
      </ul>
    </Section>
  );
}
