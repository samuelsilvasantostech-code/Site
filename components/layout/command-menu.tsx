"use client";

import {
  CopyIcon,
  FileTextIcon,
  HashIcon,
  MessageCircleIcon,
  MoonIcon,
  SearchIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cases, contact, links, nav, ui } from "@/content/data";
import { whatsappUrl } from "@/lib/format";

import { InstagramIcon, LinkedinIcon } from "./brand-icons";
import { copyEmail } from "./copy-email-button";

const subscribeNoop = () => () => {};

/** "⌘" no Mac, "Ctrl" nos demais. No servidor assume "Ctrl". */
function useModifierKey() {
  return useSyncExternalStore(
    subscribeNoop,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );
}

/**
 * Menu de comandos (Ctrl+K / ⌘K): navegar pelas seções, abrir um case,
 * copiar o e-mail, trocar o tema e abrir os perfis.
 */
export function CommandMenu({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const modifier = useModifierKey();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const goToSection = (id: string) => {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView();
      history.replaceState(null, "", `#${id}`);
    } else {
      router.push(`/#${id}`);
    }
  };

  const openExternal = (href: string) => window.open(href, "_blank", "noopener,noreferrer");

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen(true)}
        size={compact ? "icon" : "default"}
        className={
          compact
            ? "text-muted-foreground hover:text-foreground"
            : "gap-2 px-2.5 text-muted-foreground hover:text-foreground"
        }
        aria-label={compact ? `${ui.search} (${modifier} K)` : undefined}
        title={compact ? `${ui.search} (${modifier} K)` : undefined}
        aria-keyshortcuts="Control+K Meta+K"
      >
        <SearchIcon aria-hidden="true" />
        {!compact && (
          <>
            {ui.search}
            <kbd className="hidden rounded-sm border border-line px-1.5 font-sans text-sm leading-5 font-medium sm:inline">
              {modifier} K
            </kbd>
          </>
        )}
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={ui.commandTitle}
        description={ui.commandDescription}
        showCloseButton={false}
      >
        <CommandInput placeholder={ui.commandPlaceholder} />
        <CommandList>
          <CommandEmpty>{ui.commandEmpty}</CommandEmpty>

          <CommandGroup heading={ui.commandGroups.navigate}>
            {nav.map((item) => (
              <CommandItem key={item.id} onSelect={() => run(() => goToSection(item.id))}>
                <HashIcon aria-hidden="true" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading={ui.commandGroups.cases}>
            {cases.items.map((item) => (
              <CommandItem
                key={item.slug}
                value={`${item.title} ${item.stack.join(" ")}`}
                onSelect={() => run(() => router.push(`/cases/${item.slug}`))}
              >
                <FileTextIcon aria-hidden="true" />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading={ui.commandGroups.actions}>
            <CommandItem onSelect={() => run(() => void copyEmail())}>
              <CopyIcon aria-hidden="true" />
              {ui.copyEmail}
            </CommandItem>
            <CommandItem onSelect={() => run(() => router.push("/curriculo"))}>
              <FileTextIcon aria-hidden="true" />
              {ui.resume}
            </CommandItem>
            <CommandItem
              onSelect={() =>
                run(() => openExternal(whatsappUrl(links.whatsapp, contact.whatsappMessage)))
              }
            >
              <MessageCircleIcon aria-hidden="true" />
              {contact.whatsappCta}
            </CommandItem>
            <CommandItem
              onSelect={() => run(() => setTheme(resolvedTheme === "light" ? "dark" : "light"))}
            >
              <MoonIcon aria-hidden="true" />
              {ui.toggleTheme}
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading={ui.commandGroups.links}>
            <CommandItem onSelect={() => run(() => openExternal(links.linkedin))}>
              <LinkedinIcon />
              LinkedIn
              <SquareArrowOutUpRightIcon className="ml-auto" aria-hidden="true" />
            </CommandItem>
            <CommandItem onSelect={() => run(() => openExternal(links.instagram))}>
              <InstagramIcon />
              Instagram
              <SquareArrowOutUpRightIcon className="ml-auto" aria-hidden="true" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
