import { CheckIcon, CircleDotIcon, InfoIcon, MinusIcon } from "lucide-react";
import type { Metadata } from "next";

import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { CtaButtons } from "@/components/shared/cta-buttons";
import { FeatureIcon } from "@/components/shared/icon";
import { PageIntro } from "@/components/shared/page-intro";
import { services, servicesPage, type Service } from "@/content/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Automação de processos, integração de sistemas e APIs, soluções com inteligência artificial e consultoria em tecnologia para pequenas e médias empresas.",
  alternates: { canonical: "/servicos" },
};

/** JSON-LD das perguntas frequentes desta página. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: servicesPage.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

function List({
  title,
  items,
  icon: Icon,
  muted = false,
}: {
  title: string;
  items: string[];
  icon: typeof CheckIcon;
  muted?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-3 font-display text-sm font-semibold">{title}</h3>
      <ul className="grid gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
            <Icon
              aria-hidden="true"
              className={cn(
                "mt-0.5 size-4 shrink-0",
                muted ? "text-muted-foreground" : "text-link",
              )}
            />
            <span className={muted ? "text-muted-foreground" : undefined}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const { labels } = servicesPage;
  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className={cn(
        "scroll-mt-16 bg-background py-20 text-foreground md:py-24",
        index % 2 === 1 && "tone-invert",
      )}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div data-animate>
          <FeatureIcon name={service.icon} />
          <h2
            id={`${service.slug}-title`}
            className="mt-6 text-3xl leading-[1.1] font-bold tracking-tight text-balance md:text-4xl"
          >
            {service.name}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
            {service.description}
          </p>
          <div className="mt-8">
            <List title={labels.examples} items={service.examples} icon={CircleDotIcon} />
          </div>
          <CtaButtons source={`servicos-${service.slug}`} className="mt-10" />
        </div>

        <div
          data-animate
          className="grid gap-8 rounded-lg border border-line bg-surface p-7 md:p-9"
        >
          <List title={labels.problems} items={service.problems} icon={MinusIcon} muted />
          <List title={labels.deliverables} items={service.deliverables} icon={CheckIcon} />
          <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <List title={labels.included} items={service.included} icon={CheckIcon} />
            <List title={labels.separate} items={service.separate} icon={MinusIcon} muted />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PageIntro title={servicesPage.headline} intro={servicesPage.intro}>
        <nav aria-label="Serviços nesta página" className="flex flex-wrap gap-2">
          {services.items.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="rounded-full border border-line bg-surface/60 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:border-line-strong hover:text-foreground"
            >
              {service.name}
            </a>
          ))}
        </nav>
      </PageIntro>

      {services.items.map((service, i) => (
        <ServiceDetail key={service.slug} service={service} index={i} />
      ))}

      <section aria-labelledby="escopo-title" className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div
            data-animate
            className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-7 md:flex-row md:p-10"
          >
            <InfoIcon aria-hidden="true" className="size-6 shrink-0 text-link" />
            <div>
              <h2 id="escopo-title" className="text-xl font-bold tracking-tight">
                {servicesPage.scopeNote.title}
              </h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-pretty text-muted-foreground">
                {servicesPage.scopeNote.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Faq title={servicesPage.faq.title} items={servicesPage.faq.items} tone="invert" />
      <FinalCta source="servicos" />
    </>
  );
}
