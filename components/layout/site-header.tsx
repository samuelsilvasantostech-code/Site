"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { nav, primaryCta, ui } from "@/content/data";
import { cn } from "@/lib/utils";

import { Brand } from "./brand";
import { CommandMenu } from "./command-menu";
import { ThemeToggle } from "./theme-toggle";

/** Header fixo com efeito de vidro. Ganha fundo quando a página rola. */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ease-in-out",
        scrolled || open
          ? "border-line bg-background/75 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-(--header-h) max-w-6xl items-center gap-6 px-6">
        <Brand />

        <nav
          id="site-nav"
          aria-label={ui.mainNav}
          className={cn(
            "ml-auto max-md:absolute max-md:inset-x-0 max-md:top-(--header-h) max-md:border-b max-md:border-line max-md:bg-background max-md:px-6 max-md:py-4",
            !open && "max-md:hidden",
          )}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <ul className="flex items-center gap-1 max-md:flex-col max-md:items-stretch">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground aria-[current=page]:text-foreground max-md:py-3 max-md:text-base"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="sm:hidden">
              <Button asChild className="mt-3 w-full">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-1 max-md:ml-auto">
          <CommandMenu compact />
          <ThemeToggle />
          <Button asChild size="sm" className="btn-glow ml-2 max-sm:hidden">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <XIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
