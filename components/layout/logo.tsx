import { useId } from "react";

import { brand } from "@/content/data";
import { cn } from "@/lib/utils";

/**
 * Traçado do símbolo SSNEX: duas faixas em "C" encaixadas em perspectiva
 * isométrica (bordas a 30°). Exportado para reuso no ícone e na imagem OG.
 */
export const MARK_PATHS = [
  "M50 0 L100 28.87 L77.5 41.9 L50 26 L36.4 33.9 L58.67 46.74 L36.16 59.75 L0 38.87 L0 28.87 Z",
  "M50 109.5 L0 80.63 L22.5 67.6 L50 83.5 L63.6 75.6 L41.33 62.76 L63.84 49.75 L100 70.63 L100 80.63 Z",
];
export const MARK_VIEWBOX = "-2 -2 104 113.5";

/** Símbolo com o gradiente azul → ciano da marca. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  const gradient = `ssnex-${id.replace(/:/g, "")}`;
  return (
    <svg viewBox={MARK_VIEWBOX} aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={gradient} x1="0" y1="1" x2="1" y2="0.2">
          <stop offset="0" stopColor="#1D4ED8" />
          <stop offset="0.55" stopColor="#2563EB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <g
        fill={`url(#${gradient})`}
        stroke={`url(#${gradient})`}
        strokeWidth={2.5}
        strokeLinejoin="round"
      >
        {MARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

type LogoProps = {
  /** Mostra "Technology Consulting" abaixo do nome. */
  withDescriptor?: boolean;
  className?: string;
};

/** Logotipo completo: símbolo + SSNEX (com o "X" em gradiente). */
export function Logo({ withDescriptor = false, className }: LogoProps) {
  const name = brand.name;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-auto shrink-0" />
      <span className="flex flex-col">
        <span className="font-display text-xl leading-none font-bold tracking-[0.12em]">
          {name.slice(0, -1)}
          <span className="text-gradient">{name.slice(-1)}</span>
        </span>
        {withDescriptor && (
          <span className="mt-1.5 text-[0.6rem] leading-none font-medium tracking-[0.32em] text-muted-foreground uppercase">
            {brand.descriptor}
          </span>
        )}
      </span>
    </span>
  );
}
