import {
  CompassIcon,
  DatabaseIcon,
  FileCheckIcon,
  MessageSquareTextIcon,
  NetworkIcon,
  PlugIcon,
  RepeatIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TargetIcon,
  UnplugIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/content/data";

const ICONS: Record<IconName, LucideIcon> = {
  workflow: WorkflowIcon,
  plug: PlugIcon,
  sparkles: SparklesIcon,
  compass: CompassIcon,
  repeat: RepeatIcon,
  unplug: UnplugIcon,
  database: DatabaseIcon,
  network: NetworkIcon,
  target: TargetIcon,
  "file-check": FileCheckIcon,
  shield: ShieldCheckIcon,
  message: MessageSquareTextIcon,
};

/** Ícone em um quadrado com borda fina e um toque do gradiente da marca. */
export function FeatureIcon({ name }: { name: IconName }) {
  const Icon = ICONS[name];
  return (
    <span className="relative inline-grid size-11 shrink-0 place-items-center rounded-md border border-line bg-background">
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-md bg-gradient-to-br from-grad-from/12 to-grad-to/12"
      />
      <Icon aria-hidden="true" className="relative size-5 text-link" strokeWidth={1.75} />
    </span>
  );
}
