import Link from "next/link";

import { WhatsappLink } from "@/components/shared/whatsapp-link";
import { brand, finalCta, footer, links, nav, services, ui } from "@/content/data";

import { Brand } from "./brand";
import { CurrentYear } from "./current-year";
import { FooterCurtain } from "./footer-curtain";
import { SocialLinks } from "./social-links";

const columnTitle = "mb-5 eyebrow text-muted-foreground";
const columnLink =
  "text-[0.95rem] text-foreground/80 transition-colors duration-300 hover:text-foreground";

/**
 * Rodapé amplo: marca, navegação, serviços e contato, e a palavra SSNEX em
 * escala de cartaz, recortada na base. Revelado pela página como uma cortina.
 */
export function SiteFooter() {
  return (
    <FooterCurtain>
      <footer className="relative overflow-hidden border-t border-line bg-elevated">
        {/* Linha de conexão com um pulso: a assinatura da marca no fim da página. */}
        <div aria-hidden="true" className="connection-line absolute inset-x-0 top-0" />

        <div className="container-site grid gap-12 pt-20 pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.2fr]">
          <div>
            <Brand withDescriptor />
            <p className="mt-8 text-title">
              {brand.tagline.lead} <span className="text-link">{brand.tagline.highlight}</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
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

        <div className="container-site">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-muted-foreground">
            <p>
              © <CurrentYear /> {brand.name}. {footer.note}
            </p>
            <Link
              href="/privacidade"
              className="transition-colors duration-300 hover:text-foreground"
            >
              Aviso de Privacidade
            </Link>
          </div>
        </div>

        {/* A marca em escala de cartaz, recortada na base. Decorativa: o nome já está no logo. */}
        <p
          aria-hidden="true"
          className="footer-wordmark pointer-events-none -mb-[0.24em] text-center font-display leading-[0.8] font-bold tracking-[-0.06em] select-none"
        >
          {brand.name}
        </p>
      </footer>
    </FooterCurtain>
  );
}
