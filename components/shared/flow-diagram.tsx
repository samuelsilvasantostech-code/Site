import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

type FlowDiagramProps = {
  steps: readonly string[];
  /** `compact`: pílulas em linha (cards). `full`: caixas que empilham no celular (página do projeto). */
  variant?: "compact" | "full";
  className?: string;
};

/**
 * Diagrama do fluxo de dados entre sistemas: origem → … → destino.
 * Os rótulos são genéricos quando o nome real seria confidencial.
 */
export function FlowDiagram({ steps, variant = "compact", className }: FlowDiagramProps) {
  const description = `Fluxo de dados: ${steps.join(", depois ")}.`;

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
        <span className="sr-only">{description}</span>
        {steps.map((step, i) => (
          <Fragment key={`${step}-${i}`}>
            {i > 0 && <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 text-link" />}
            <span
              aria-hidden="true"
              className="rounded-md border border-line bg-background px-2 py-0.5 text-xs font-medium whitespace-nowrap"
            >
              {step}
            </span>
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <figure className={cn("rounded-lg border border-line bg-surface p-5 md:p-6", className)}>
      <figcaption className="sr-only">{description}</figcaption>
      <ol
        aria-hidden="true"
        className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
      >
        {steps.map((step, i) => (
          <Fragment key={`${step}-${i}`}>
            {i > 0 && (
              <li className="flex justify-center text-link sm:px-1">
                <ArrowDownIcon className="size-5 sm:hidden" />
                <ArrowRightIcon className="hidden size-5 sm:block" />
              </li>
            )}
            <li
              className={cn(
                "flex-1 rounded-md border bg-background px-4 py-3 text-center text-sm font-semibold",
                i === 0 || i === steps.length - 1 ? "border-link/50" : "border-line-strong",
              )}
            >
              <span className="block text-[0.7rem] font-medium tracking-wide text-muted-foreground">
                {i === 0 ? "Origem" : i === steps.length - 1 ? "Destino" : "Processamento"}
              </span>
              {step}
            </li>
          </Fragment>
        ))}
      </ol>
    </figure>
  );
}
