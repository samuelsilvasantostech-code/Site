"use client";

import { useEffect, useState } from "react";

import { useActiveSection } from "@/components/motion/use-active-section";
import { nav, profile, ui } from "@/content/data";
import { cn } from "@/lib/utils";

import { BrandMark } from "./brand-mark";
import { iconButtonClass } from "./icon-button";
import { ThemeToggle } from "./theme-toggle";

const SECTION_IDS = nav.map((item) => item.id);

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/88 backdrop-blur-[10px]">
      <div className="wrap flex h-(--header-h) items-center gap-4">
        <a
          href="#topo"
          className="mr-auto inline-flex items-center gap-[0.7rem] font-semibold tracking-[-0.01em] no-underline"
        >
          <BrandMark className="size-[34px]" />
          <span className="text-[1.05rem] max-lg:sr-only">{profile.shortName}</span>
        </a>

        <nav
          id="site-nav"
          aria-label={ui.mainNav}
          className={cn(
            "max-lg:fixed max-lg:inset-x-0 max-lg:top-(--header-h) max-lg:border-b max-lg:border-line max-lg:bg-background max-lg:px-(--pad) max-lg:pt-3 max-lg:pb-5",
            !menuOpen && "max-lg:hidden",
          )}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
          }}
        >
          <ul className="flex gap-1 max-lg:flex-col max-lg:gap-0">
            {nav.map((item) => {
              const current = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={current ? "true" : undefined}
                    className={cn(
                      "block rounded-sm px-[0.7rem] py-2 text-sm text-muted-foreground no-underline transition-colors duration-200 hover:text-foreground",
                      "aria-[current=true]:rounded-none aria-[current=true]:text-foreground aria-[current=true]:shadow-[inset_0_-2px_0_var(--accent)]",
                      "max-lg:border-b max-lg:border-line max-lg:px-0 max-lg:py-[0.85rem] max-lg:text-md max-lg:text-foreground",
                      "max-lg:aria-[current=true]:text-brand max-lg:aria-[current=true]:shadow-none",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            id="menu-toggle"
            type="button"
            className={cn(iconButtonClass, "lg:hidden")}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? ui.closeMenu : ui.menu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              className="size-5 fill-none stroke-current [stroke-width:1.7] [stroke-linecap:round]"
            >
              <path
                d="M4 8h16"
                className={cn(
                  "origin-center transition-transform duration-200",
                  menuOpen && "translate-y-1 rotate-45",
                )}
              />
              <path
                d="M4 16h16"
                className={cn(
                  "origin-center transition-transform duration-200",
                  menuOpen && "-translate-y-1 -rotate-45",
                )}
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
