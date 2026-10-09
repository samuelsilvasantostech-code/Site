import { integrations } from "@/content/data";

const items = integrations.groups.flatMap((group) => group.items);

/**
 * Faixa contínua com as ferramentas usadas nos projetos. Só nomes (sem
 * logos de fornecedores), para não sugerir parceria. Para quando o mouse
 * passa por cima e fica estática com "reduzir movimento".
 */
export function TechMarquee() {
  // Lista duplicada: a animação desloca 50% e recomeça sem salto.
  const loop = [...items, ...items];

  return (
    <section aria-labelledby="tecnologias-faixa" className="border-y border-line py-10">
      <h2
        id="tecnologias-faixa"
        className="mx-auto max-w-6xl px-6 text-center text-sm font-medium text-muted-foreground"
      >
        Ferramentas e tecnologias usadas em projetos reais
      </h2>
      <div className="marquee-mask group relative mt-6 overflow-hidden">
        <ul
          aria-label="Ferramentas e tecnologias"
          className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] motion-reduce:mx-auto motion-reduce:w-auto motion-reduce:max-w-6xl motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6"
        >
          {loop.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= items.length ? "true" : undefined}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors duration-300 hover:border-link/50 hover:text-foreground motion-reduce:[&:nth-child(n+17)]:hidden"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
