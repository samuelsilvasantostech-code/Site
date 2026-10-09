import type { Metric } from "@/content/data";

export function Metrics({ metrics }: { metrics: readonly Metric[] }) {
  if (!metrics.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {metrics.map((metric) => (
        <li key={metric.label} className="flex items-baseline gap-[0.45rem]">
          <b className="text-md font-bold text-foreground tabular-nums">{metric.value}</b>
          <span className="text-sm text-muted-foreground">{metric.label}</span>
        </li>
      ))}
    </ul>
  );
}
