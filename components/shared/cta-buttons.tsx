import { MessageCircleIcon } from "lucide-react";

import { finalCta, links, ui } from "@/content/data";
import { cn } from "@/lib/utils";

import { PrimaryCta } from "./primary-cta";
import { WhatsappLink } from "./whatsapp-link";

type CtaButtonsProps = {
  /** De onde veio o clique, para as métricas do WhatsApp. */
  source: string;
  /** Tamanho do botão principal (`xl` no fechamento das páginas). */
  size?: "lg" | "xl";
  /** Atração magnética discreta no botão principal. */
  magnetic?: boolean;
  className?: string;
};

/**
 * CTA padrão: um único botão principal ("Solicitar diagnóstico") e, como
 * alternativa discreta, um link para o WhatsApp. Evita botões disputando atenção.
 */
export function CtaButtons({ source, size = "lg", magnetic = false, className }: CtaButtonsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-4", className)}>
      <PrimaryCta magnetic={magnetic} size={size} />
      {links.whatsapp && (
        <p className="text-sm text-muted-foreground">
          {ui.orWhatsapp}{" "}
          <WhatsappLink
            message={finalCta.whatsappMessage}
            source={source}
            className="inline-flex items-center gap-1 font-semibold text-link underline-offset-4 hover:underline"
          >
            <MessageCircleIcon aria-hidden="true" className="size-4" />
            {ui.whatsapp}
          </WhatsappLink>
        </p>
      )}
    </div>
  );
}
