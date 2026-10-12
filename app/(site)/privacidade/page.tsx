import type { Metadata } from "next";

import { privacy } from "@/content/data";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Aviso de Privacidade",
  description:
    "Como a SSNEX trata os dados pessoais coletados pelo site, conforme a Lei Geral de Proteção de Dados (LGPD).",
  alternates: canonical("/privacidade"),
};

export default function PrivacyPage() {
  return (
    <article className="pb-section mx-auto max-w-3xl px-6 pt-[calc(var(--header-h)+clamp(3rem,10vh,6rem))]">
      <h1 className="text-display">{privacy.headline}</h1>
      <p className="mt-6 font-mono text-xs tracking-wide text-muted-foreground">
        Última atualização: {privacy.updatedAt}
      </p>

      {privacy.sections.map((section) => (
        <section key={section.title} className="mt-14 border-t border-line pt-10">
          <h2 className="text-title">{section.title}</h2>
          <div className="mt-3 space-y-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-pretty text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
