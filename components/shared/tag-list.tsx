import { cn } from "@/lib/utils";

type TagListProps = {
  tags: readonly string[];
  label?: string;
  className?: string;
};

export function TagList({ tags, label, className }: TagListProps) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-surface px-2.5 py-0.5 text-sm whitespace-nowrap text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
