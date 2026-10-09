import { FeatureIcon } from "@/components/shared/icon";
import { Section } from "@/components/shared/section";
import { problems } from "@/content/data";

export function Problems() {
  return (
    <Section id="problemas" tone="invert" title={problems.headline} intro={problems.intro}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {problems.cards.map((card) => (
          <li
            key={card.title}
            data-animate
            className="rounded-lg border border-line bg-surface p-7 transition-[border-color,transform] duration-300 ease-in-out hover:-translate-y-0.5 hover:border-line-strong"
          >
            <FeatureIcon name={card.icon} />
            <h3 className="mt-6 text-lg font-bold tracking-tight">{card.title}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
              {card.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
