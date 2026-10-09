import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { About } from "@/components/sections/about";
import { Cases } from "@/components/sections/cases";
import { Contact } from "@/components/sections/contact";
import { Differentiators } from "@/components/sections/differentiators";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Integrations } from "@/components/sections/integrations";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { faq, links, profile, seo } from "@/content/data";
import { SITE_URL } from "@/lib/constants";

/** Dados estruturados para mecanismos de busca: a pessoa e as perguntas frequentes. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: seo.personDescription,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/opengraph-image`,
    email: `mailto:${links.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      addressRegion: profile.region,
      addressCountry: profile.country,
    },
    worksFor: { "@type": "Organization", name: profile.worksFor },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.alumniOf },
    knowsAbout: seo.knowsAbout,
    sameAs: [links.linkedin, links.github],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON gerado a partir de dados estáticos; "<" é escapado para não fechar a tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Integrations />
        <Services />
        <Differentiators />
        <Process />
        <Cases />
        <About />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
