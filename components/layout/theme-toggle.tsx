"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { ui } from "@/content/data";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={ui.toggleTheme}
      title={ui.toggleTheme}
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {/* Os dois ícones são renderizados; o CSS mostra o certo antes da hidratação. */}
      <SunIcon className="hidden dark:block" aria-hidden="true" />
      <MoonIcon className="dark:hidden" aria-hidden="true" />
    </Button>
  );
}
