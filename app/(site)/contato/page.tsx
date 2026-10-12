import { CheckIcon, MailIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";
import type { Metadata } from "next";

import { InstagramIcon, LinkedinIcon } from "@/components/layout/brand-icons";
import { CopyEmailButton } from "@/components/layout/copy-email-button";
import { ContactForm } from "@/components/sections/contact-form";
import { WhatsappLink } from "@/components/shared/whatsapp-link";
import { contactPage, finalCta, links } from "@/content/data";
import { prettyUrl } from "@/lib/format";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contato e diagnóstico",
  description:
    "Conte o desafio da sua empresa com automação de processos, integração de sistemas, inteligência artificial ou suporte tecnológico e solicite um diagnóstico.",
  alternates: canonical("/contato"),
};

const channelClass =
  "flex items-center gap-3 rounded-2xl px-3 py-2.5 -mx-3 transition-colors duration-300 hover:bg-surface-2";

export default function ContactPage() {
  return (
    <section
      aria-labelledby="contato-title"
      className="pb-section relative isolate overflow-hidden pt-[calc(var(--header-h)+clamp(3rem,10vh,6rem))]"
    >
      <div aria-hidden="true" className="hero-backdrop absolute inset-0 -z-10 h-[40rem]" />
      <div className="container-site grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <h1
            id="contato-title"
            className="font-display text-[clamp(2.25rem,4.2vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.04em]"
          >
            {contactPage.headline}
          </h1>
          <p className="mt-8 text-lead text-pretty text-muted-foreground">{contactPage.intro}</p>

          <h2 className="mt-14 eyebrow text-muted-foreground">{contactPage.firstTalkTitle}</h2>
          <ul className="mt-4 grid gap-2.5">
            {contactPage.firstTalk.map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-pretty text-muted-foreground"
              >
                <CheckIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-link" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-14 eyebrow text-muted-foreground">{contactPage.nextStepsTitle}</h2>
          <ol className="mt-4 grid gap-4">
            {contactPage.nextSteps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-xs text-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-relaxed text-pretty text-muted-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <h2 className="mt-14 eyebrow text-muted-foreground">{contactPage.channelsTitle}</h2>
          <ul className="mt-3 grid gap-1">
            <li>
              <a href={`mailto:${links.email}`} className={channelClass}>
                <MailIcon aria-hidden="true" className="size-5 shrink-0 text-link" />
                <span className="break-all">
                  <span className="block text-xs text-muted-foreground">E-mail</span>
                  {links.email}
                </span>
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
                  <span>
                    <span className="block text-xs text-muted-foreground">WhatsApp</span>
                    {links.phone}
                  </span>
                </WhatsappLink>
              </li>
            )}
            <li>
              <a href={links.phoneHref} className={channelClass}>
                <PhoneIcon aria-hidden="true" className="size-5 shrink-0 text-link" />
                <span>
                  <span className="block text-xs text-muted-foreground">Telefone</span>
                  {links.phone}
                </span>
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
                <span className="min-w-0 break-all">
                  <span className="block text-xs text-muted-foreground">LinkedIn</span>
                  {prettyUrl(links.linkedin)}
                </span>
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
                <span className="min-w-0 break-all">
                  <span className="block text-xs text-muted-foreground">Instagram</span>
                  {prettyUrl(links.instagram)}
                </span>
              </a>
            </li>
          </ul>
          <CopyEmailButton className="mt-6 h-11 rounded-full border-line-strong bg-transparent px-5 dark:bg-transparent" />
        </div>

        <div className="rounded-[var(--radius-xl)] border border-line bg-elevated p-6 shadow-[var(--inner-glow)] md:p-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
