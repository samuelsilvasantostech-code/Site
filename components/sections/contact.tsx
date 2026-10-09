import { MailIcon, MessageCircleIcon } from "lucide-react";

import { CopyEmailButton } from "@/components/layout/copy-email-button";
import { Button } from "@/components/ui/button";
import { contact, links } from "@/content/data";
import { whatsappUrl } from "@/lib/format";

import { ContactForm } from "./contact-form";

/** CTA final: chamada + canais diretos à esquerda, formulário à direita. */
export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative isolate overflow-hidden rounded-xl border border-line bg-surface">
          <div
            aria-hidden="true"
            className="absolute -top-40 -left-40 -z-10 size-[28rem] rounded-full bg-grad-from/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-40 -bottom-40 -z-10 size-[28rem] rounded-full bg-grad-to/20 blur-3xl"
          />

          <div className="grid gap-12 p-8 md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div data-animate>
              <h2
                id="contato-title"
                className="text-3xl font-extrabold tracking-tight text-balance md:text-5xl md:leading-[1.08]"
              >
                {contact.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
                {contact.intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="btn-glow h-12 px-6 text-base">
                  <a
                    href={whatsappUrl(links.whatsapp, contact.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircleIcon aria-hidden="true" />
                    {contact.whatsappCta}
                  </a>
                </Button>
                <CopyEmailButton
                  size="lg"
                  className="h-12 border-line-strong bg-transparent px-6 text-base dark:bg-transparent"
                />
              </div>

              <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <MailIcon aria-hidden="true" className="size-4" />
                <a href={`mailto:${links.email}`} className="hover:text-foreground">
                  {links.email}
                </a>
              </p>
            </div>

            <div data-animate className="rounded-lg border border-line bg-background p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
