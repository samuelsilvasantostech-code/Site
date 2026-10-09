import Link from "next/link";

import { WhatsappLink } from "@/components/shared/whatsapp-link";
import { brand, finalCta, footer, links, nav, services, ui } from "@/content/data";

import { Brand } from "./brand";
import { CurrentYear } from "./current-year";
import { SocialLinks } from "./social-links";

const columnTitle = "mb-4 font-display text-sm font-semibold";
const columnLink =
  "text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Brand withDescriptor />
          <p className="mt-6 font-display text-lg font-semibold tracking-tight">
            {brand.tagline.lead} <span className="text-link">{brand.tagline.highlight}</span>
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {brand.slogan}
          </p>
          <SocialLinks className="mt-6 -ml-2.5" />
        </div>

        <nav aria-label={ui.footerNav}>
          <h2 className={columnTitle}>Navegação</h2>
          <ul className="grid gap-3">
            <li>
              <Link href="/" className={columnLink}>
                Início
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={columnLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={columnTitle}>Serviços</h2>
          <ul className="grid gap-3">
            {services.items.map((service) => (
              <li key={service.slug}>
                <Link href={`/servicos#${service.slug}`} className={columnLink}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={columnTitle}>Contato</h2>
          <ul className="grid gap-3">
            <li>
              <a href={`mailto:${links.email}`} className={`${columnLink} break-all`}>
                {links.email}
              </a>
            </li>
            <li>
              <a href={links.phoneHref} className={columnLink}>
                {links.phone}
              </a>
            </li>
            <li>
              <WhatsappLink
                message={finalCta.whatsappMessage}
                source="footer"
                className={columnLink}
              >
                WhatsApp
              </WhatsappLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground">
          <p>
            © <CurrentYear /> {brand.name}. {footer.note}
          </p>
          <Link
            href="/privacidade"
            className="transition-colors duration-300 hover:text-foreground"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
