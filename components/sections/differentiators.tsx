import { Spotlight } from "@/components/motion/spotlight";
import { FeatureIcon } from "@/components/shared/icon";
import { Section } from "@/components/shared/section";
import { principles } from "@/content/data";
import { cn } from "@/lib/utils";

/**
 * Princípios de trabalho em bento. São compromissos de método, não
 * afirmações sobre resultados de clientes.
 */
export function Differentiators() {
  return (
    <Section id="principios" title={principles.headline} intro={principles.intro}>
      <ul className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:grid-rows-2">
        {principles.items.map((item, i) => {
          const featured = i === 0;
          return (
            <li
              key={item.title}
              data-animate="scale"
              data-animate-delay={(i % 4) * 0.06}
              className={cn(featured && "md:col-span-2 lg:row-span-2")}
            >
              <Spotlight className={cn("h-full p-7", featured && "lg:p-12")}>
                <FeatureIcon name={item.icon} />
                <h3
                  className={cn(
                    "mt-8 font-display font-semibold tracking-[-0.02em]",
                    featured ? "text-[clamp(1.75rem,3vw,3rem)] leading-[1.02]" : "text-lg",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 text-pretty text-muted-foreground",
                    featured && "max-w-md text-lead",
                  )}
                >
                  {item.description}
                </p>
              </Spotlight>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
