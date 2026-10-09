import type { ReactNode } from "react";

import type { SectionId } from "@/content/data";
import { cn } from "@/lib/utils";

import { SectionHeader } from "./section-header";

type SectionProps = {
  id: SectionId;
  title: string;
  intro?: string;
  className?: string;
  children: ReactNode;
};

/** Seção do fluxo: âncora de navegação, título ligado ao trilho e espaçamento padrão. */
export function Section({ id, title, intro, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative py-[clamp(3.5rem,6vw,5.25rem)]", className)}
    >
      <SectionHeader id={id} title={title} intro={intro} />
      {children}
    </section>
  );
}
