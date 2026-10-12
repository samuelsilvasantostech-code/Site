"use client";

import { gsap } from "./gsap";

/**
 * Linha do tempo de um `DataFlowDiagram`: cada sistema acende em sequência e
 * a conexão até o próximo se desenha. Ao terminar, o diagrama fica "ao vivo"
 * (pulsos correndo pelas conexões, em CSS). Volta pausada, para quem a usa
 * decidir se ela toca sozinha ou acompanha a rolagem.
 */
export function flowTimeline(figure: Element) {
  const nodes = figure.querySelectorAll<HTMLElement>(".flow-node");
  const lines = figure.querySelectorAll<HTMLElement>(".flow-link-line");
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "none" },
    onUpdate() {
      figure.toggleAttribute("data-live", this.progress() > 0.98);
    },
  });
  nodes.forEach((node, i) => {
    tl.fromTo(node, { "--lit": 0 }, { "--lit": 1, duration: 0.4 }, i);
    const line = lines[i];
    if (line) tl.fromTo(line, { "--draw": 0 }, { "--draw": 1, duration: 0.6 }, i + 0.4);
  });
  return tl;
}
