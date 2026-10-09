"use client";

import type { ComponentProps } from "react";

import { links } from "@/content/data";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/format";

type WhatsappLinkProps = Omit<ComponentProps<"a">, "href"> & {
  message: string;
  /** De onde veio o clique, para as métricas. */
  source: string;
};

/** WhatsApp com mensagem pronta. Não renderiza nada se o número não estiver configurado. */
export function WhatsappLink({ message, source, onClick, ...props }: WhatsappLinkProps) {
  if (!links.whatsapp) return null;
  return (
    <a
      {...props}
      href={whatsappUrl(links.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        track("whatsapp_click", { source });
        onClick?.(e);
      }}
    />
  );
}
