import { ArrowUpRightIcon, CheckIcon, CircleDotIcon, MinusIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AnchorNav } from "@/components/layout/anchor-nav";
import { Spotlight } from "@/components/motion/spotlight";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { CtaButtons } from "@/components/shared/cta-buttons";
import { PageIntro } from "@/components/shared/page-intro";
import { ServiceVisual } from "@/components/ui/service-visuals";
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
      <h3 className="mb-4 eyebrow text-muted-foreground">{title}</h3>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-pretty">
            <Icon
              aria-hidden="true"
              className={cn("mt-1 size-4 shrink-0", muted ? "text-muted-foreground" : "text-link")}
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
    <div className="mt-10">
      <h3 className="mb-4 eyebrow text-muted-foreground">{ui.relatedProjects}</h3>
      <ul className="grid gap-2.5">
        {related.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/projetos/${item.slug}`}
              className="group inline-flex items-center gap-1.5 font-medium text-link underline-offset-4 hover:underline"
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

/**
 * Um serviço em tela cheia: texto e visualização lado a lado (alternando o
 * lado a cada serviço) e, abaixo, o escopo detalhado em blocos.
 */
function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const { labels } = servicesPage;
  const flip = index % 2 === 1;
  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="relative py-section"
    >
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={cn(flip && "lg:order-2")}>
            <h2 id={`${service.slug}-title`} data-split className="text-display">
              {service.name}
            </h2>
            <p data-animate className="mt-8 text-lead text-pretty text-muted-foreground">
              {service.description}
            </p>
            <div data-animate className="mt-10">
              <List title={labels.examples} items={service.examples} icon={CircleDotIcon} />
            </div>
            <div data-animate>
              <RelatedProjects slug={service.slug} />
              <CtaButtons source={`servicos-${service.slug}`} className="mt-12" />
            </div>
          </div>

          <Spotlight data-animate="scale" className={cn("p-8 md:p-12", flip && "lg:order-1")}>
            <ServiceVisual slug={service.slug} />
          </Spotlight>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {[
            { title: labels.problems, items: service.problems, icon: MinusIcon, muted: true },
            { title: labels.deliverables, items: service.deliverables, icon: CheckIcon },
            { title: labels.included, items: service.included, icon: CheckIcon },
            { title: labels.separate, items: service.separate, icon: MinusIcon, muted: true },
          ].map((block, i) => (
            <Spotlight key={block.title} data-animate data-animate-delay={i * 0.06} className="p-7">
              <List {...block} />
            </Spotlight>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="connection-line absolute inset-x-0 bottom-0" />
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
      <PageIntro title={servicesPage.headline} intro={servicesPage.intro} />

      <div className="relative">
        <AnchorNav
          label="Serviços nesta página"
          items={services.items.map((service) => ({ id: service.slug, label: service.name }))}
          className="-mt-6"
        />

        {principal.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} index={i} />
        ))}

        <div className="pt-section container-site">
          <h2 data-split className="max-w-3xl text-display">
            {servicesPage.complementaryTitle}
          </h2>
          <p data-animate className="mt-6 max-w-2xl text-lead text-pretty text-muted-foreground">
            {servicesPage.complementaryIntro}
          </p>
        </div>

        {complementary.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} index={i + principal.length} />
        ))}
      </div>

      <section aria-labelledby="contratacao-title" className="py-section">
        <div className="container-site">
          <Spotlight data-animate className="p-8 md:p-14">
            <h2 id="contratacao-title" className="text-title">
              {servicesPage.hiring.title}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {servicesPage.hiring.items.map((item) => (
                <li key={item} className="flex gap-3 text-lead leading-relaxed text-pretty">
                  <CheckIcon aria-hidden="true" className="mt-1.5 size-5 shrink-0 text-link" />
                  {item}
                </li>
              ))}
            </ul>
          </Spotlight>
        </div>
      </section>

      <Faq title={servicesPage.faq.title} items={servicesPage.faq.items} tone="invert" />
      <FinalCta source="servicos" />
    </>
  );
}
