import { ArrowRightIcon } from "lucide-react";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

/** Caminho dos dados entre sistemas: "Conta Azul → n8n → WhatsApp". */
export function DataFlow({ steps, className }: { steps: readonly string[]; className?: string }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground",
        className,
      )}
    >
      <span className="sr-only">Fluxo de dados: {steps.join(" para ")}</span>
      <span aria-hidden="true" className="contents">
        {steps.map((step, i) => (
          <Fragment key={`${step}-${i}`}>
            {i > 0 && <ArrowRightIcon className="size-3.5 text-line-strong" />}
            <span>{step}</span>
          </Fragment>
        ))}
      </span>
    </p>
  );
}
