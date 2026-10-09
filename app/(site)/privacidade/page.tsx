import type { Metadata } from "next";

import { privacy } from "@/content/data";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a SSNEX trata os dados pessoais coletados pelo site, conforme a Lei Geral de Proteção de Dados (LGPD).",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-[calc(var(--header-h)+4rem)] pb-24">
      <h1 className="text-4xl leading-[1.1] font-bold tracking-tight md:text-5xl">
        {privacy.headline}
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">Última atualização: {privacy.updatedAt}</p>

      {privacy.sections.map((section) => (
        <section key={section.title} className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">{section.title}</h2>
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
