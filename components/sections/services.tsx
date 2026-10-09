import { Section } from "@/components/shared/section";
import { TagList } from "@/components/shared/tag-list";
import { services } from "@/content/data";

export function Services() {
  return (
    <Section id="servicos" title={services.title} intro={services.intro}>
      <div className="border-t border-line">
        {services.items.map((service) => (
          <article
            key={service.title}
            className="grid gap-x-8 gap-y-[0.6rem] border-b border-line py-[1.6rem] lg:grid-cols-[15rem_minmax(0,1fr)_13rem] lg:items-baseline"
          >
            <h3 className="text-md leading-[1.3] font-semibold tracking-[-0.01em]">
              {service.title}
            </h3>
            <p className="max-w-[40rem] text-muted-foreground">{service.text}</p>
            <TagList tags={service.tags} className="lg:justify-end" />
          </article>
        ))}
      </div>
    </Section>
  );
}
