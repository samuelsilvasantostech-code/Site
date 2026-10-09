import { ArrowRightIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { finalCta, primaryCta } from "@/content/data";
import { cn } from "@/lib/utils";

import { WhatsappLink } from "./whatsapp-link";

type CtaButtonsProps = {
  /** De onde veio o clique, para as métricas do WhatsApp. */
  source: string;
  secondaryLabel?: string;
  className?: string;
};

/** Par de CTAs padrão: "Solicitar diagnóstico" (principal) + WhatsApp. */
export function CtaButtons({
  source,
  secondaryLabel = finalCta.secondaryLabel,
  className,
}: CtaButtonsProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button asChild size="lg" className="btn-glow h-12 px-6 text-base">
        <Link href={primaryCta.href}>
          {primaryCta.label}
          <ArrowRightIcon aria-hidden="true" />
        </Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="h-12 border-line-strong bg-transparent px-6 text-base transition-colors duration-300 ease-in-out hover:bg-surface dark:bg-transparent"
      >
        <WhatsappLink message={finalCta.whatsappMessage} source={source}>
          <MessageCircleIcon aria-hidden="true" />
          {secondaryLabel}
        </WhatsappLink>
      </Button>
    </div>
  );
}
