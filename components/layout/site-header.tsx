"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { lenis } from "@/components/motion/smooth-scroll";
import { PrimaryCta } from "@/components/shared/primary-cta";
import { Button } from "@/components/ui/button";
import { brand, nav, primaryCta, ui } from "@/content/data";
import { cn } from "@/lib/utils";

import { Brand } from "./brand";
import { CommandMenu } from "./command-menu";
import { ThemeToggle } from "./theme-toggle";

/** A partir de quanto rolado o header pode se esconder. */
const HIDE_AFTER = 160;

/**
 * Header fixo e translúcido. Some ao rolar para baixo e volta ao rolar para
 * cima; enquanto está escondido, o CTA principal flutua no canto da tela,
 * para nunca ficar a mais de um gesto de distância. No celular, o menu abre
 * em tela cheia.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Uma seção com o próprio CTA em destaque (fechamento) dispensa o flutuante.
  const [ctaZone, setCtaZone] = useState(false);

  useEffect(() => {
    const zones = document.querySelectorAll("[data-cta-zone]");
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setCtaZone(visible.size > 0);
    });
    zones.forEach((zone) => observer.observe(zone));
    return () => {
      observer.disconnect();
      setCtaZone(false);
    };
  }, [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      setScrolled(y > 8);
      // Não esconde com o foco dentro do header (navegação por teclado).
      if (headerRef.current?.contains(document.activeElement)) return setHidden(false);
      if (y < HIDE_AFTER || delta < -4) setHidden(false);
      else if (delta > 4) setHidden(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu em tela cheia: trava a rolagem da página e fecha com Esc.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const showFloatingCta = hidden && !open && !ctaZone && pathname !== primaryCta.href;

  return (
    <>
      <header
        ref={headerRef}
        onFocus={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-brand",
          scrolled || open
            ? "border-line bg-background/60 backdrop-blur-[20px] backdrop-saturate-150"
            : "border-transparent bg-transparent",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div className="container-site flex h-(--header-h) items-center gap-6">
          <Brand />

          <nav
            id="site-nav"
            aria-label={ui.mainNav}
            className={cn(
              "ml-auto",
              "max-md:fixed max-md:inset-x-0 max-md:top-(--header-h) max-md:bottom-0 max-md:overflow-y-auto max-md:bg-background max-md:px-6 max-md:pt-8 max-md:pb-10",
              !open && "max-md:hidden",
            )}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <ul className="flex items-center gap-1 max-md:flex-col max-md:items-stretch max-md:gap-2">
              {nav.map((item, i) => (
                <li
                  key={item.href}
                  className="max-md:animate-in max-md:duration-700 max-md:ease-brand max-md:fill-mode-both max-md:fade-in max-md:slide-in-from-bottom-6"
                  style={{ animationDelay: `${80 + i * 60}ms` }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground aria-[current=page]:text-foreground max-md:rounded-none max-md:border-b max-md:border-line max-md:px-0 max-md:py-4 max-md:font-display max-md:text-4xl max-md:font-semibold max-md:tracking-[-0.03em] max-md:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-8 md:hidden">
                <PrimaryCta size="xl" className="w-full" />
                <p className="mt-6 eyebrow text-muted-foreground">
                  {brand.tagline.lead} {brand.tagline.highlight}
                </p>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-1 max-md:ml-auto">
            <CommandMenu compact />
            <ThemeToggle />
            <PrimaryCta size="sm" className="ml-2 max-sm:hidden" />
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

      {/* CTA flutuante enquanto o header está escondido. */}
      <div
        className={cn(
          "fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 transition-[opacity,transform] duration-500 ease-brand md:right-6 md:bottom-6",
          showFloatingCta
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
        aria-hidden={!showFloatingCta}
        inert={!showFloatingCta}
      >
        <PrimaryCta size="lg" className="shadow-[0_12px_40px_-12px_rgb(47_107_255/0.6)]" />
      </div>
    </>
  );
}
