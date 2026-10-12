import { cn } from "@/lib/utils";

type TagListProps = {
  tags: readonly string[];
  label?: string;
  className?: string;
};

/** Rótulos técnicos (ferramentas, tecnologias) em mono: a textura da marca. */
export function TagList({ tags, label, className }: TagListProps) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs tracking-wide whitespace-nowrap text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
