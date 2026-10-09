import { MailIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";
import type { Metadata } from "next";

import { InstagramIcon, LinkedinIcon } from "@/components/layout/brand-icons";
import { CopyEmailButton } from "@/components/layout/copy-email-button";
import { ContactForm } from "@/components/sections/contact-form";
import { WhatsappLink } from "@/components/shared/whatsapp-link";
import { contactPage, finalCta, links } from "@/content/data";
import { prettyUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Solicite um diagnóstico: conte o desafio da sua empresa com automação, integração de sistemas, inteligência artificial ou suporte tecnológico.",
  alternates: { canonical: "/contato" },
};

const channelClass =
  "flex items-center gap-3 rounded-md px-3 py-2.5 -mx-3 transition-colors duration-300 hover:bg-surface";

export default function ContactPage() {
  return (
    <section
      aria-labelledby="contato-title"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3.5rem)] pb-20 md:pt-[calc(var(--header-h)+5rem)] md:pb-28"
    >
      <div aria-hidden="true" className="hero-backdrop absolute inset-0 -z-10 h-[32rem]" />
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <div>
          <h1
            id="contato-title"
            className="text-4xl leading-[1.08] font-bold tracking-tight text-balance md:text-5xl"
          >
            {contactPage.headline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            {contactPage.intro}
          </p>

          <h2 className="mt-12 font-display text-sm font-semibold">{contactPage.nextStepsTitle}</h2>
          <ol className="mt-4 grid gap-4">
            {contactPage.nextSteps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line font-display text-xs font-bold text-link">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-relaxed text-pretty text-muted-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <h2 className="mt-12 font-display text-sm font-semibold">{contactPage.channelsTitle}</h2>
          <ul className="mt-3 grid gap-1">
            <li>
              <a href={`mailto:${links.email}`} className={channelClass}>
                <MailIcon aria-hidden="true" className="size-5 shrink-0 text-link" />
                <span className="break-all">{links.email}</span>
              </a>
            </li>
            {links.whatsapp && (
              <li>
                <WhatsappLink
                  message={finalCta.whatsappMessage}
                  source="contato"
                  className={channelClass}
                >
                  <MessageCircleIcon aria-hidden="true" className="size-5 shrink-0 text-link" />
                  WhatsApp {links.phone}
                </WhatsappLink>
              </li>
            )}
            <li>
              <a href={links.phoneHref} className={channelClass}>
                <PhoneIcon aria-hidden="true" className="size-5 shrink-0 text-link" />
                {links.phone}
              </a>
            </li>
            <li>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClass}
              >
                <LinkedinIcon className="size-5 shrink-0 text-link" />
                {prettyUrl(links.linkedin)}
              </a>
            </li>
            <li>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClass}
              >
                <InstagramIcon className="size-5 shrink-0 text-link" />
                {prettyUrl(links.instagram)}
              </a>
            </li>
          </ul>
          <CopyEmailButton className="mt-6 border-line-strong bg-transparent dark:bg-transparent" />
        </div>

        <div className="rounded-xl border border-line bg-surface p-6 md:p-9">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
