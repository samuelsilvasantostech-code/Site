import { FeatureIcon } from "@/components/shared/icon";
import { Section } from "@/components/shared/section";
import { principles } from "@/content/data";
import { cn } from "@/lib/utils";

/**
 * Princípios de trabalho em bento grid. São compromissos de método, não
 * afirmações sobre resultados de clientes.
 */
export function Differentiators() {
  return (
    <Section id="principios" tone="invert" title={principles.headline} intro={principles.intro}>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {principles.items.map((item, i) => {
          const featured = i === 0;
          return (
            <li
              key={item.title}
              data-animate
              className={cn(
                "relative overflow-hidden rounded-lg border border-line bg-surface p-7 transition-colors duration-300 ease-in-out hover:border-line-strong",
                featured && "md:col-span-2 lg:row-span-2 lg:p-10",
              )}
            >
              {featured && (
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-24 size-72 rounded-full bg-gradient-to-br from-grad-from/20 to-grad-to/20 blur-3xl"
                />
              )}
              <div className="relative">
                <FeatureIcon name={item.icon} />
                <h3
                  className={cn(
                    "mt-6 font-bold tracking-tight",
                    featured ? "text-2xl md:text-3xl" : "text-lg",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 leading-relaxed text-pretty text-muted-foreground",
                    featured && "max-w-md text-lg",
                  )}
                >
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
