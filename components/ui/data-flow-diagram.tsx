import { Fragment } from "react";

import { cn } from "@/lib/utils";

type DataFlowDiagramProps = {
  steps: readonly string[];
  /** `lg` na página do projeto; `md` nos painéis da home. */
  size?: "md" | "lg";
  className?: string;
};

function roleOf(i: number, total: number) {
  if (i === 0) return "Origem";
  if (i === total - 1) return "Destino";
  return "Processamento";
}

/**
 * Diagrama do fluxo de dados entre sistemas: origem → processamento →
 * destino, ligados por conexões onde um pulso de dados corre. Em HTML,
 * em linha quando o espaço comporta os sistemas e em coluna quando não. O estado padrão é o diagrama completo e
 * aceso; a animação (`flowTimeline`) parte do apagado e acende em sequência.
 * Os rótulos são genéricos quando o nome real seria confidencial.
 */
export function DataFlowDiagram({ steps, size = "md", className }: DataFlowDiagramProps) {
  const description = `Fluxo de dados: ${steps.join(", depois ")}.`;
  return (
    <figure
      data-flow
      data-count={Math.min(steps.length, 4)}
      className={cn("flow", size === "lg" && "flow-lg", className)}
    >
      <figcaption className="sr-only">{description}</figcaption>
      <ol aria-hidden="true" className="flow-track">
        {steps.map((step, i) => (
          <Fragment key={`${step}-${i}`}>
            {i > 0 && (
              <li className="flow-link">
                <span className="flow-link-line" />
                <span className="flow-pulse" />
              </li>
            )}
            <li className="flow-node">
              <span className="flow-role">{roleOf(i, steps.length)}</span>
              <span className="flow-name">{step}</span>
            </li>
          </Fragment>
        ))}
      </ol>
    </figure>
  );
}
