import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/content/data";
import { cn } from "@/lib/utils";

type PrimaryCtaProps = {
  size?: "sm" | "lg" | "xl";
  /** Atração magnética discreta (só nos CTAs de destaque). */
  magnetic?: boolean;
  className?: string;
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
  xl: "h-14 px-8 text-base md:h-16 md:px-10 md:text-lg",
};

/**
 * "Solicitar diagnóstico": o CTA principal, o mesmo em todo o site. No hover,
 * um pulso de luz percorre a borda, como um dado passando pela conexão.
 */
export function PrimaryCta({ size = "lg", magnetic = false, className }: PrimaryCtaProps) {
  const button = (
    <Button asChild className={cn("btn-pulse", sizes[size], className)}>
      <Link href={primaryCta.href}>
        {primaryCta.label}
        {size !== "sm" && <ArrowRightIcon aria-hidden="true" />}
      </Link>
    </Button>
  );
  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}
