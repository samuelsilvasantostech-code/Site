import { Section } from "@/components/shared/section";
import { ServiceCard } from "@/components/shared/service-card";
import { services } from "@/content/data";

/** Automação e integração em destaque; IA e consultoria como complementares. */
export function Services() {
  return (
    <Section id="servicos" title={services.headline} intro={services.intro}>
      <ul className="grid gap-5 md:grid-cols-6">
        {services.items.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </ul>
    </Section>
  );
}
