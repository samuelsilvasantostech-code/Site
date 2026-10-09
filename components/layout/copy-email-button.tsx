"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { links, ui } from "@/content/data";

/** Copia o e-mail e confirma com um aviso. Retorna `true` se deu certo. */
export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(links.email);
    toast.success(ui.emailCopied, { description: links.email });
    return true;
  } catch {
    toast.error(`${ui.emailCopyFailed} ${links.email}.`);
    return false;
  }
}

export function CopyEmailButton(props: Omit<ComponentProps<typeof Button>, "onClick">) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (await copyEmail()) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Button type="button" variant="outline" onClick={copy} {...props}>
      {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
      {ui.copyEmail}
    </Button>
  );
}
