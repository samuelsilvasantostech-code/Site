import type { Metadata } from "next";

import { About, AboutApproach } from "@/components/sections/about";
import { Differentiators } from "@/components/sections/differentiators";
import { FinalCta } from "@/components/sections/final-cta";
import { Integrations } from "@/components/sections/integrations";
import { PageIntro } from "@/components/shared/page-intro";
import { about, brand, links, profile } from "@/content/data";
import { SITE_URL } from "@/lib/constants";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre a SSNEX",
  description:
    "A SSNEX nasceu da experiência prática com operações, implantação de tecnologia e integração de sistemas. Conheça a abordagem e o fundador.",
  alternates: canonical("/sobre"),
};

/** O fundador, com dados reais de trajetória. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: `${SITE_URL}/sobre`,
  worksFor: { "@type": "Organization", name: brand.name },
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.alumniOf },
  sameAs: [links.linkedin, links.instagram],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <PageIntro title={about.headline} intro={about.intro} />
      <AboutApproach />
      <About />
      <Differentiators />
      <Integrations />
      <FinalCta source="sobre" />
    </>
  );
}
