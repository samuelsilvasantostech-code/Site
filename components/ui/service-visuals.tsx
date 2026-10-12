import { CheckIcon } from "lucide-react";

import { InView } from "@/components/motion/in-view";
import type { ServiceSlug } from "@/content/data";

import { ParticleText } from "./particle-text";

/*
 * Micro-visualizações dos serviços: cada uma mostra o que o serviço faz, no
 * vocabulário visual da marca (nós, conexões e dados em movimento). São
 * decorativas (o texto do bloco explica) e só animam quando estão na tela.
 */

/** Automação: rotinas disparando sozinhas, uma após a outra. */
function AutomationVisual() {
  const rows = ["Lembrete de cobrança", "Boleto enviado", "Status atualizado", "Equipe notificada"];
  return (
    <ol className="grid gap-2.5">
      {rows.map((row, i) => (
        <li
          key={row}
          className="viz-row flex items-center gap-3 rounded-xl border border-line bg-background/60 px-4 py-2.5 font-mono text-xs text-muted-foreground"
          style={{ animationDelay: `${i * 0.9}s` }}
        >
          <span className="viz-tick grid size-5 shrink-0 place-items-center rounded-full border border-line-strong">
            <CheckIcon className="size-3" strokeWidth={2.5} />
          </span>
          <span className="truncate">{row}</span>
          <span className="ml-auto text-[0.65rem] tracking-widest opacity-70">
            {`${String(8 + i).padStart(2, "0")}:00`}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Integração: dois sistemas trocando dados pelos dois sentidos. */
function IntegrationVisual() {
  const routes: [string, string][] = [
    ["CRM", "ERP"],
    ["WhatsApp", "Supabase"],
    ["Lead Ads", "CRM"],
  ];
  return (
    <div className="grid gap-5">
      {routes.map(([from, to], i) => (
        <div key={from + to} className="flex items-center gap-3">
          <span className="viz-node w-28 text-center">{from}</span>
          <span className="viz-wire relative h-px flex-1 bg-line-strong">
            <span className="viz-packet" style={{ animationDelay: `${i * 0.5}s` }} />
          </span>
          <span className="viz-node viz-node-hub">n8n</span>
          <span className="viz-wire relative h-px flex-1 bg-line-strong">
            <span className="viz-packet" style={{ animationDelay: `${i * 0.5 + 1.1}s` }} />
          </span>
          <span className="viz-node w-28 text-center">{to}</span>
        </div>
      ))}
    </div>
  );
}

/** Consultoria: um gráfico que se desenha, de diagnóstico a melhoria. */
function ConsultingVisual() {
  return (
    <svg
      viewBox="0 0 320 110"
      preserveAspectRatio="none"
      className="h-32 w-full overflow-visible md:h-36"
    >
      {[20, 55, 90].map((y) => (
        <line
          key={y}
          x1="0"
          x2="320"
          y1={y}
          y2={y}
          className="stroke-line"
          strokeDasharray="2 6"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path
        d="M0 92 C 40 88, 60 80, 90 74 S 150 70, 175 52 S 240 40, 265 26 S 300 16, 320 12"
        pathLength={1}
        className="viz-chart fill-none stroke-[var(--cta)]"
        strokeWidth={2.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const VISUALS: Record<ServiceSlug, () => React.JSX.Element> = {
  automacao: AutomationVisual,
  integracao: IntegrationVisual,
  ia: () => <ParticleText text="IA" />,
  consultoria: ConsultingVisual,
};

export function ServiceVisual({ slug }: { slug: ServiceSlug }) {
  const Visual = VISUALS[slug];
  return (
    <InView aria-hidden="true" className="viz">
      <Visual />
    </InView>
  );
}
