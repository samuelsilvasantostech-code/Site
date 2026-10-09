import { ArrowRightIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { finalCta, links, primaryCta, ui } from "@/content/data";
import { cn } from "@/lib/utils";

import { WhatsappLink } from "./whatsapp-link";

type CtaButtonsProps = {
  /** De onde veio o clique, para as métricas do WhatsApp. */
  source: string;
  className?: string;
};

/**
 * CTA padrão: um único botão principal ("Solicitar diagnóstico") e, como
 * alternativa discreta, um link para o WhatsApp. Evita botões disputando atenção.
 */
export function CtaButtons({ source, className }: CtaButtonsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-4", className)}>
      <Button asChild size="lg" className="btn-glow h-12 px-6 text-base">
        <Link href={primaryCta.href}>
          {primaryCta.label}
          <ArrowRightIcon aria-hidden="true" />
        </Link>
      </Button>
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
