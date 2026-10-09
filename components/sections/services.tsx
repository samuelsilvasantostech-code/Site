import { ArrowRightIcon } from "lucide-react";

import { FeatureIcon } from "@/components/shared/icon";
import { Section } from "@/components/shared/section";
import { TagList } from "@/components/shared/tag-list";
import { contact, links, services } from "@/content/data";
import { whatsappUrl } from "@/lib/format";

const card =
  "rounded-lg border border-line bg-background p-7 transition-[border-color,transform,box-shadow] duration-300 ease-in-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)]";

export function Services() {
  return (
    <Section id="servicos" tone="invert" title={services.title} intro={services.intro}>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.items.map((service) => (
          <li key={service.title} data-animate className={card}>
            <FeatureIcon name={service.icon} />
            <h3 className="mt-6 text-lg font-bold tracking-tight">{service.title}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">{service.text}</p>
            <TagList tags={service.tags} className="mt-5" />
          </li>
        ))}
        <li
          data-animate
          className="flex flex-col justify-between rounded-lg bg-gradient-to-br from-grad-from/15 to-grad-to/15 p-7"
        >
          <div>
            <h3 className="text-lg font-bold tracking-tight">Tem outro cenário?</h3>
            <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
              Se envolve sistemas que precisam conversar entre si, vale a conversa.
            </p>
          </div>
          <a
            href={whatsappUrl(links.whatsapp, contact.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 font-semibold"
          >
            {contact.whatsappCta}
            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
            />
          </a>
        </li>
      </ul>
    </Section>
  );
}
