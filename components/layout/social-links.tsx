import { MailIcon, MessageCircleIcon } from "lucide-react";

import { WhatsappLink } from "@/components/shared/whatsapp-link";
import { finalCta, links, ui } from "@/content/data";
import { cn } from "@/lib/utils";

import { InstagramIcon, LinkedinIcon } from "./brand-icons";

const iconLink =
  "inline-grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground";

const external = [
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: links.instagram, Icon: InstagramIcon },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul aria-label={ui.social} className={cn("flex items-center gap-1", className)}>
      {external.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLink}
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
      {links.whatsapp && (
        <li>
          <WhatsappLink
            message={finalCta.whatsappMessage}
            source="social"
            aria-label="WhatsApp"
            title="WhatsApp"
            className={iconLink}
          >
            <MessageCircleIcon aria-hidden="true" className="size-5" />
          </WhatsappLink>
        </li>
      )}
      <li>
        <a
          href={`mailto:${links.email}`}
          aria-label="Enviar e-mail"
          title="Enviar e-mail"
          className={iconLink}
        >
          <MailIcon aria-hidden="true" className="size-5" />
        </a>
      </li>
    </ul>
  );
}
