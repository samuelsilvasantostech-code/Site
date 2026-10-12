import {
  BracesIcon,
  Building2Icon,
  ChartColumnIcon,
  DatabaseIcon,
  HeadsetIcon,
  UsersIcon,
  WebhookIcon,
  type LucideIcon,
} from "lucide-react";
import {
  siGit,
  siGooglebigquery,
  siMake,
  siN8n,
  siNodedotjs,
  siPostman,
  siPython,
  siSupabase,
  siWhatsapp,
  type SimpleIcon,
} from "simple-icons";

import { Marquee } from "@/components/motion/marquee";
import { integrations } from "@/content/data";

/**
 * Ícone de cada ferramenta: o logo monocromático (simple-icons) quando existe,
 * ou um ícone genérico para categorias (ERPs, CRMs, APIs). Os logos só
 * identificam as ferramentas usadas; não indicam parceria com os fornecedores.
 */
const ICONS: Record<string, SimpleIcon | LucideIcon> = {
  n8n: siN8n,
  Make: siMake,
  "APIs REST": BracesIcon,
  Webhooks: WebhookIcon,
  Postman: siPostman,
  SQL: DatabaseIcon,
  Supabase: siSupabase,
  BigQuery: siGooglebigquery,
  "Power BI": ChartColumnIcon,
  Python: siPython,
  "Node.js": siNodedotjs,
  Git: siGit,
  ERPs: Building2Icon,
  CRMs: UsersIcon,
  "Plataformas de atendimento": HeadsetIcon,
  WhatsApp: siWhatsapp,
};

function ToolIcon({ name }: { name: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  if ("path" in icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="tool-icon size-[1.15em]"
        style={{ "--brand": `#${icon.hex}` } as React.CSSProperties}
      >
        <path d={icon.path} />
      </svg>
    );
  }
  const Lucide = icon;
  return <Lucide aria-hidden="true" className="tool-icon size-[1.15em]" strokeWidth={1.6} />;
}

function Tool({ name }: { name: string }) {
  return (
    <span className="tool group mx-2 inline-flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-2.5 font-mono text-sm whitespace-nowrap text-muted-foreground transition-colors duration-300 hover:border-line-strong hover:text-foreground">
      <ToolIcon name={name} />
      {name}
    </span>
  );
}

const items = integrations.groups.flatMap((group) => group.items);
const half = Math.ceil(items.length / 2);
const rows = [items.slice(0, half), items.slice(half)];

/**
 * Faixa de ferramentas em duas linhas que correm em sentidos opostos e
 * aceleram com a rolagem. A lista também existe em texto para leitores de tela.
 */
export function TechMarquee() {
  return (
    <section aria-labelledby="tecnologias-faixa" className="relative py-16 md:py-20">
      <div aria-hidden="true" className="connection-line absolute inset-x-0 top-0" />
      <div className="container-site mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="tecnologias-faixa" className="eyebrow text-muted-foreground">
          Ferramentas e tecnologias usadas em projetos reais
        </h2>
      </div>
      <p className="sr-only">{items.join(", ")}.</p>
      <div aria-hidden="true" className="grid gap-4">
        {rows.map((row, i) => (
          <Marquee key={i} reverse={i === 1} duration={i === 1 ? 46 : 54}>
            {row.map((name) => (
              <Tool key={name} name={name} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
