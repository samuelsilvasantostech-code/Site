import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageIntroProps = {
  title: string;
  intro: string;
  /** Rótulo técnico acima do título, só quando informa algo. */
  eyebrow?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Abertura das páginas internas: título em escala de cartaz, introdução em
 * tamanho de lead e o halo da marca vindo de cima. A linha de conexão marca
 * a passagem para o conteúdo.
 */
export function PageIntro({ title, intro, eyebrow, children, className }: PageIntroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-[calc(var(--header-h)+clamp(4rem,12vh,8rem))] pb-[clamp(4rem,10vh,7rem)]",
        className,
      )}
    >
      <div aria-hidden="true" className="hero-backdrop absolute inset-0 -z-10" />
      <div className="container-site">
        {eyebrow && <p className="mb-8 eyebrow text-muted-foreground">{eyebrow}</p>}
        <h1 className="max-w-[18ch] text-hero">
          {/* Cada palavra sobe de trás de uma máscara, em CSS (não espera o JavaScript). */}
          {title.split(" ").map((word, i) => (
            <span key={`${word}-${i}`}>
              {i > 0 && " "}
              <span className="word-mask">
                <span className="word-rise" style={{ animationDelay: `${80 + i * 45}ms` }}>
                  {word}
                </span>
              </span>
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-2xl animate-in text-lead text-pretty text-muted-foreground duration-900 ease-brand fill-mode-both [animation-delay:300ms] fade-in slide-in-from-bottom-4">
          {intro}
        </p>
        {children && (
          <div className="mt-10 animate-in duration-900 ease-brand fill-mode-both [animation-delay:450ms] fade-in">
            {children}
          </div>
        )}
      </div>
      <div aria-hidden="true" className="connection-line absolute inset-x-0 bottom-0" />
    </section>
  );
}
