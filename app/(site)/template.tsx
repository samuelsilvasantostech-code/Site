import { ViewTransition } from "react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Remonta a cada navegação (ao contrário do layout): a página nova entra com
 * uma transição de cortina e as animações de rolagem são criadas de novo.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>
        {children}
        <ScrollReveal />
      </div>
    </ViewTransition>
  );
}
