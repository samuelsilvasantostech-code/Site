import {
  ChartColumnIcon,
  DatabaseIcon,
  GaugeIcon,
  HeadsetIcon,
  MessagesSquareIcon,
  PlugIcon,
  RocketIcon,
  ShieldCheckIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/content/data";

const ICONS: Record<IconName, LucideIcon> = {
  plug: PlugIcon,
  workflow: WorkflowIcon,
  messages: MessagesSquareIcon,
  chart: ChartColumnIcon,
  rocket: RocketIcon,
  headset: HeadsetIcon,
  shield: ShieldCheckIcon,
  gauge: GaugeIcon,
  database: DatabaseIcon,
};

/** Ícone em um quadrado com borda fina e brilho do gradiente da marca. */
export function FeatureIcon({ name }: { name: IconName }) {
  const Icon = ICONS[name];
  return (
    <span className="relative inline-grid size-11 place-items-center rounded-md border border-line bg-background">
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-md bg-gradient-to-br from-grad-from/15 to-grad-to/15"
      />
      <Icon aria-hidden="true" className="relative size-5 text-link" strokeWidth={1.75} />
    </span>
  );
}
