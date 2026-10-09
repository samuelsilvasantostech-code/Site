"use client";

import {
  CopyIcon,
  FileTextIcon,
  FileIcon,
  SendIcon,
  MessageCircleIcon,
  MoonIcon,
  SearchIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
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
import { finalCta, links, nav, primaryCta, projects, ui } from "@/content/data";
import { track } from "@/lib/analytics";
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
 * Menu de comandos (Ctrl+K / ⌘K): navegar pelas páginas, abrir um projeto,
 * copiar o e-mail, trocar o tema e abrir os perfis.
 */
export function CommandMenu({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
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

          <CommandGroup heading={ui.commandGroups.pages}>
            {[
              { href: "/", label: "Início" },
              ...nav,
              { href: "/privacidade", label: "Aviso de Privacidade" },
            ].map((item) => (
              <CommandItem key={item.href} onSelect={() => run(() => router.push(item.href))}>
                <FileIcon aria-hidden="true" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading={ui.commandGroups.projects}>
            {projects.items.map((item) => (
              <CommandItem
                key={item.slug}
                value={`${item.title} ${item.stack.join(" ")}`}
                onSelect={() => run(() => router.push(`/projetos/${item.slug}`))}
              >
                <FileTextIcon aria-hidden="true" />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading={ui.commandGroups.actions}>
            <CommandItem onSelect={() => run(() => router.push(primaryCta.href))}>
              <SendIcon aria-hidden="true" />
              {primaryCta.label}
            </CommandItem>
            <CommandItem onSelect={() => run(() => void copyEmail())}>
              <CopyIcon aria-hidden="true" />
              {ui.copyEmail}
            </CommandItem>
            <CommandItem onSelect={() => run(() => router.push("/curriculo"))}>
              <FileTextIcon aria-hidden="true" />
              {ui.resume}
            </CommandItem>
            {links.whatsapp && (
              <CommandItem
                onSelect={() =>
                  run(() => {
                    track("whatsapp_click", { source: "command-menu" });
                    openExternal(whatsappUrl(links.whatsapp, finalCta.whatsappMessage));
                  })
                }
              >
                <MessageCircleIcon aria-hidden="true" />
                {ui.whatsapp}
              </CommandItem>
            )}
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
