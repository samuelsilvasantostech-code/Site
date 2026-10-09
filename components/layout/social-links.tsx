import { MailIcon, MessageCircleIcon } from "lucide-react";

import { contact, links, ui } from "@/content/data";
import { whatsappUrl } from "@/lib/format";
import { cn } from "@/lib/utils";

import { InstagramIcon, LinkedinIcon } from "./brand-icons";

const items = [
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Instagram", href: links.instagram, Icon: InstagramIcon, external: true },
  {
    label: "WhatsApp",
    href: whatsappUrl(links.whatsapp, contact.whatsappMessage),
    Icon: MessageCircleIcon,
    external: true,
  },
  { label: "Enviar e-mail", href: `mailto:${links.email}`, Icon: MailIcon, external: false },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul aria-label={ui.social} className={cn("flex items-center gap-1", className)}>
      {items.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className="inline-grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
