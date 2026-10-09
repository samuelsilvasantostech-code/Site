import { cases, impact, integrations, platforms } from "@/content/data";

/* Os dois primeiros números saem do próprio conteúdo, para nunca ficarem desatualizados. */
const systemsCount = integrations.groups.reduce(
  (total, group) => total + ("items" in group ? group.items.length : 0),
  0,
);

const stats = [
  { value: String(systemsCount), label: "sistemas integrados em produção" },
  { value: String(cases.items.length), label: "projetos entregues" },
  ...impact,
];

/** Social proof: faixa infinita de plataformas + números de impacto. */
export function Integrations() {
  // Lista duplicada: a animação desloca 50% e recomeça sem salto.
  const loop = [...platforms.items, ...platforms.items];

  return (
    <section aria-labelledby="plataformas-title" className="border-y border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="plataformas-title"
          className="text-center text-sm font-medium text-muted-foreground"
        >
          {platforms.title}
        </h2>

        <div className="marquee-mask group relative mt-8 overflow-hidden">
          <ul
            aria-label={platforms.title}
            className="flex w-max animate-marquee gap-14 group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-4"
          >
            {loop.map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= platforms.items.length ? "true" : undefined}
                className="text-xl font-bold tracking-tight whitespace-nowrap text-foreground/50 transition-opacity duration-300 ease-in-out hover:text-foreground/90 motion-reduce:[&:nth-child(n+12)]:hidden"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-animate className="flex flex-col-reverse text-center">
              <dt className="mx-auto mt-2 max-w-[16rem] text-sm text-pretty text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="text-gradient text-4xl font-extrabold tracking-tight md:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
