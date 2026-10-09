import type { Metric } from "@/content/data";
import { cn } from "@/lib/utils";

/** Números de resultado. `size="lg"` é usado na página do case. */
export function Metrics({
  metrics,
  size = "sm",
  className,
}: {
  metrics: readonly Metric[];
  size?: "sm" | "lg";
  className?: string;
}) {
  if (!metrics.length) return null;
  return (
    <dl className={cn("flex flex-wrap gap-x-8 gap-y-3", className)}>
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col-reverse">
          <dt className="text-sm text-muted-foreground">{metric.label}</dt>
          <dd
            className={cn(
              "font-semibold tracking-[-0.02em] text-foreground",
              size === "lg" ? "text-2xl" : "text-lg",
            )}
          >
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
