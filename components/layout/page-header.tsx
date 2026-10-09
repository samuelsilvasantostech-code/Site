import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { CommandMenu } from "./command-menu";
import { ThemeToggle } from "./theme-toggle";

type PageHeaderProps = { backHref: string; backLabel: string; className?: string };

/** Barra das páginas internas: voltar, menu de comandos e tema. */
export function PageHeader({ backHref, backLabel, className }: PageHeaderProps) {
  return (
    <header className={cn("flex items-center justify-between gap-4 py-6", className)}>
      <Link
        href={backHref}
        className="-ml-2 inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-4" />
        {backLabel}
      </Link>
      <div className="flex items-center gap-1">
        <CommandMenu />
        <ThemeToggle />
      </div>
    </header>
  );
}
