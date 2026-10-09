import { Cases } from "@/components/sections/cases";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Problems } from "@/components/sections/problems";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { brand, links, seo } from "@/content/data";
import { SITE_URL } from "@/lib/constants";

/**
 * Dados estruturados da marca. Só informações reais: sem endereço comercial,
 * avaliações ou horários, que a SSNEX ainda não tem.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name,
  slogan: `${brand.tagline.lead} ${brand.tagline.highlight}`,
  description: seo.description,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/opengraph-image`,
  email: `mailto:${links.email}`,
  telephone: "+55-38-99747-2560",
  areaServed: { "@type": "Country", name: "Brasil" },
  knowsAbout: seo.knowsAbout,
  sameAs: [links.linkedin, links.instagram],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON gerado a partir de dados estáticos; "<" é escapado para não fechar a tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <TechMarquee />
      <Problems />
      <Services />
      <Cases />
      <Process />
      <FinalCta source="home" />
    </>
  );
}
