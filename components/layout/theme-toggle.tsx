"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { ui } from "@/content/data";

import { iconButtonClass } from "./icon-button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className={iconButtonClass}
      aria-label={ui.toggleTheme}
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {/* Os dois ícones são renderizados; o CSS mostra o certo sem esperar a hidratação. */}
      <SunIcon className="hidden size-5 dark:block" strokeWidth={1.7} aria-hidden="true" />
      <MoonIcon className="size-5 dark:hidden" strokeWidth={1.7} aria-hidden="true" />
    </button>
  );
}
