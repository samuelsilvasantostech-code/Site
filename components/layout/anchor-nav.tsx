"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type AnchorNavProps = {
  label: string;
  items: readonly { id: string; label: string }[];
  className?: string;
};

/**
 * Navegação por âncoras que acompanha a leitura: fica presa ao topo e marca
 * (aria-current) a seção que está na tela.
 */
export function AnchorNav({ label, items, className }: AnchorNavProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className={cn(
        "sticky top-[calc(var(--header-h)+0.75rem)] z-30 mx-auto w-fit max-w-full",
        className,
      )}
    >
      <ul className="flex [scrollbar-width:none] gap-1 overflow-x-auto rounded-full border border-line bg-background/70 p-1 backdrop-blur-xl">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className="block rounded-full px-4 py-2 text-sm whitespace-nowrap text-muted-foreground transition-colors duration-300 ease-brand hover:text-foreground aria-[current=location]:bg-surface-2 aria-[current=location]:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
