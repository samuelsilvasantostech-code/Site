import Link from "next/link";

import { brand, contact, footer, hero, links, nav, profile, ui } from "@/content/data";
import { prettyUrl, whatsappUrl } from "@/lib/format";

import { Brand } from "./brand";
import { CurrentYear } from "./current-year";
import { SocialLinks } from "./social-links";

const columnTitle = "mb-4 text-sm font-semibold";
const columnLink =
  "text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {hero.value}
          </p>
          <SocialLinks className="mt-6 -ml-2.5" />
        </div>

        <nav aria-label="Rodapé">
          <h2 className={columnTitle}>Navegação</h2>
          <ul className="grid gap-3">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className={columnLink}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/curriculo" className={columnLink}>
                {ui.resume}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={columnTitle}>Contato</h2>
          <ul className="grid gap-3">
            <li>
              <a href={`mailto:${links.email}`} className={columnLink}>
                {links.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(links.whatsapp, contact.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={columnLink}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={columnLink}
              >
                {prettyUrl(links.linkedin)}
              </a>
            </li>
            <li className="text-sm text-muted-foreground">
              {profile.city}, {profile.region}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 py-6 text-sm text-muted-foreground">
          © <CurrentYear /> {brand.name}. {footer.note}
        </p>
      </div>
    </footer>
  );
}
