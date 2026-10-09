import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/** Moldura de todas as páginas do site: header fixo, conteúdo e rodapé. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div className="print:hidden">
        <SiteHeader />
      </div>
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <div className="print:hidden">
        <SiteFooter />
      </div>
      <ScrollReveal />
    </>
  );
}
