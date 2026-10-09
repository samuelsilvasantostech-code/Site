import { cn } from "@/lib/utils";

type TagListProps = {
  tags: readonly string[];
  /** `strong` usa fundo e texto mais fortes (chips de ferramentas). */
  variant?: "default" | "strong";
  className?: string;
};

export function TagList({ tags, variant = "default", className }: TagListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-[0.4rem]", variant === "strong" && "gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className={cn(
            "rounded-sm border border-line font-mono leading-none whitespace-nowrap",
            variant === "default" && "px-[0.55rem] py-[0.45rem] text-2xs text-muted-foreground",
            variant === "strong" && "bg-surface-2 px-3 py-[0.6rem] text-xs text-foreground",
          )}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
