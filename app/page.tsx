import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FlowRail } from "@/components/motion/flow-rail";
import { About } from "@/components/sections/about";
import { Cases } from "@/components/sections/cases";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Integrations } from "@/components/sections/integrations";
import { Services } from "@/components/sections/services";
import { links, profile, seo } from "@/content/data";
import { SITE_URL } from "@/lib/constants";

/** Dados estruturados (schema.org/Person) para mecanismos de busca. */
const personJsonLd = {
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
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON gerado a partir de dados estáticos; "<" é escapado para não fechar a tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <div className="flow">
          <Hero />
          <div className="relative">
            <FlowRail />
            <About />
            <Services />
            <Integrations />
            <Cases />
            <Experience />
            <Contact />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
