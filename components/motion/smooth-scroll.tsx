"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { gsap, MOTION_REDUCED, ScrollTrigger } from "./gsap";

/** Instância ativa (ou `null` com movimento reduzido). */
export let lenis: Lenis | null = null;

/**
 * Posição de rolagem de uma âncora, descontando o header como a rolagem
 * nativa faz (`scroll-padding-top` do CSS).
 */
function anchorY(target: Element) {
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  return target.getBoundingClientRect().top + window.scrollY - padding;
}

function findHash(hash: string) {
  try {
    return hash.length > 1 ? document.querySelector(decodeURIComponent(hash)) : null;
  } catch {
    return null;
  }
}

/**
 * Rolagem com inércia (Lenis) sincronizada com o ScrollTrigger: um único
 * relógio (o ticker do GSAP) move a página e as animações ligadas à rolagem.
 * No toque a rolagem continua nativa (padrão do Lenis) e, com "reduzir
 * movimento", o Lenis nem é criado.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia(MOTION_REDUCED).matches) return;

    const instance = new Lenis({
      lerp: 0.1,
      autoRaf: false,
      // Modais e listas com rolagem própria (menu de comandos) rolam nativamente.
      prevent: (node) => Boolean(node.closest("[role='dialog'], [data-lenis-prevent]")),
    });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Links para âncoras desta página: rolagem suave até o ponto certo.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = findHash(url.hash);
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      instance.scrollTo(anchorY(target), { duration: 1.1 });
      if (target instanceof HTMLElement) target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    // Modal aberto (Radix trava o body): a rolagem suave também para.
    const observer = new MutationObserver(() => {
      if (document.body.hasAttribute("data-scroll-locked")) instance.stop();
      else instance.start();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    return () => {
      document.removeEventListener("click", onClick);
      observer.disconnect();
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // Página nova: vai direto à âncora (ex.: /servicos#integracao) ou ao topo.
  useEffect(() => {
    if (!lenis) return;
    lenis.resize();
    const target = findHash(window.location.hash);
    if (target) {
      const go = () => lenis?.scrollTo(anchorY(target), { immediate: true, force: true });
      go();
      // As fontes mudam a altura do que vem antes: reposiciona quando carregam.
      void document.fonts.ready.then(() => requestAnimationFrame(go));
    } else {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname]);

  return null;
}
