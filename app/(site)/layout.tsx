import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

/** Moldura de todas as páginas do site: header fixo, conteúdo e rodapé. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div className="print:hidden">
        <SiteHeader />
      </div>
      {/* Acima do rodapé: a página sobe e revela o rodapé fixo por baixo. */}
      <main id="conteudo" tabIndex={-1} className="relative z-10 bg-background">
        {children}
      </main>
      <SiteFooter />
      <SmoothScroll />
    </>
  );
}
