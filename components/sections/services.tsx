import { Section } from "@/components/shared/section";
import { ServiceCard } from "@/components/shared/service-card";
import { services } from "@/content/data";

/**
 * Bento das soluções: automação e integração (o centro do trabalho) em
 * blocos altos; IA e consultoria como complementares.
 */
export function Services() {
  return (
    <Section id="servicos" title={services.headline} intro={services.intro}>
      <ul className="grid gap-4 md:gap-5 lg:grid-cols-12">
        {services.items.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </ul>
    </Section>
  );
}
