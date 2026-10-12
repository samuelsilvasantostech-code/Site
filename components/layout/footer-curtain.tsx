"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { lenis } from "@/components/motion/smooth-scroll";

/**
 * Efeito "cortina": o rodapé fica fixo por baixo e a página sobe para
 * revelá-lo. Só quando o rodapé cabe na tela (senão vira rodapé comum).
 * Se o foco do teclado entrar no rodapé ainda coberto, a página rola até o fim
 * para que o foco nunca fique escondido.
 */
export function FooterCurtain({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () =>
      setFits(window.innerWidth >= 768 && el.offsetHeight <= window.innerHeight * 0.9);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  function onFocus() {
    if (!fits) return;
    const end = document.documentElement.scrollHeight;
    if (lenis) lenis.scrollTo(end, { immediate: true });
    else window.scrollTo({ top: end });
  }

  return (
    <div
      ref={ref}
      onFocus={onFocus}
      className={fits ? "sticky bottom-0 z-0 print:hidden" : "relative z-0 print:hidden"}
      data-curtain={fits ? "on" : "off"}
    >
      {children}
    </div>
  );
}
