import { Section } from "@/components/shared/section";
import { contact, links } from "@/content/data";
import { prettyUrl } from "@/lib/format";

import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <Section
      id="contato"
      title={contact.title}
      intro={contact.intro}
      className="pb-[clamp(4rem,7vw,5.5rem)]"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <ul className="border-t border-line">
          {contact.channels.map((channel) => {
            const isEmail = channel.key === "email";
            const value = links[channel.key];
            const href = isEmail ? `mailto:${value}` : value;
            return (
              <li key={channel.key}>
                <a
                  href={href}
                  {...(!isEmail && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group grid gap-[0.15rem] border-b border-line py-4 no-underline transition-[padding] duration-200 ease-brand hover:pl-2"
                >
                  <span className="font-mono text-xs text-muted-foreground">{channel.label}</span>
                  <strong className="text-md font-semibold wrap-anywhere group-hover:text-brand">
                    {prettyUrl(value)}
                  </strong>
                </a>
              </li>
            );
          })}
        </ul>

        <ContactForm />
      </div>
    </Section>
  );
}
