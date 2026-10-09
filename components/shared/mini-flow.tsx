import type { CSSProperties } from "react";

/** Mini fluxo "origem → … → destino". As ligações acendem quando o pai tem `data-live`. */
export function MiniFlow({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2" aria-label={steps.join(" para ")}>
      {steps.map((step, i) => (
        <li key={`${step}-${i}`} className="flex items-center">
          {i > 0 && (
            <span className="mf-link" aria-hidden="true" style={{ "--i": i } as CSSProperties} />
          )}
          <span className="mf-node rounded-sm border bg-background px-[0.6rem] py-2 font-mono text-2xs leading-none whitespace-nowrap">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}
