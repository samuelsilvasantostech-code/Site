import { ArrowUpRightIcon, CheckIcon, CircleDotIcon, MinusIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { CtaButtons } from "@/components/shared/cta-buttons";
import { FeatureIcon } from "@/components/shared/icon";
import { PageIntro } from "@/components/shared/page-intro";
import { projects, services, servicesPage, ui, type Service } from "@/content/data";
import { cn } from "@/lib/utils";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Serviços de automação de processos, integração de sistemas e IA",
  description:
    "Automação de processos, integração de sistemas e APIs, soluções com inteligência artificial e consultoria em tecnologia para pequenas e médias empresas.",
  alternates: canonical("/servicos"),
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

/** Links para os projetos do serviço (ligação interna serviços ↔ projetos). */
function RelatedProjects({ slug }: { slug: Service["slug"] }) {
  const related = projects.items.filter((item) => item.service === slug).slice(0, 3);
  if (!related.length) return null;
  return (
    <div className="mt-8">
      <h3 className="mb-3 font-display text-sm font-semibold">{ui.relatedProjects}</h3>
      <ul className="grid gap-2">
        {related.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/projetos/${item.slug}`}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-link underline-offset-4 hover:underline"
            >
              {item.title}
              <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
            </Link>
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
          <RelatedProjects slug={service.slug} />
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

const principal = services.items.filter((service) => service.tier === "principal");
const complementary = services.items.filter((service) => service.tier === "complementar");

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

      {principal.map((service, i) => (
        <ServiceDetail key={service.slug} service={service} index={i} />
      ))}

      <div className="border-y border-line bg-background">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-bold tracking-tight">{servicesPage.complementaryTitle}</h2>
          <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
            {servicesPage.complementaryIntro}
          </p>
        </div>
      </div>

      {complementary.map((service, i) => (
        <ServiceDetail key={service.slug} service={service} index={i + principal.length} />
      ))}

      <section aria-labelledby="contratacao-title" className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div data-animate className="rounded-lg border border-line bg-surface p-7 md:p-10">
            <h2 id="contratacao-title" className="text-2xl font-bold tracking-tight">
              {servicesPage.hiring.title}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {servicesPage.hiring.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-pretty">
                  <CheckIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-link" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Faq title={servicesPage.faq.title} items={servicesPage.faq.items} tone="invert" />
      <FinalCta source="servicos" />
    </>
  );
}
