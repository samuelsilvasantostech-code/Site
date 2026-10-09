import { DataFlow } from "@/components/shared/data-flow";
import { FeatureIcon } from "@/components/shared/icon";
import { Section } from "@/components/shared/section";
import { differentiators } from "@/content/data";
import { cn } from "@/lib/utils";

/** Bento grid: o destaque ocupa 2×2; os demais preenchem a grade ao lado. */
export function Differentiators() {
  return (
    <Section id="diferenciais" title={differentiators.title} intro={differentiators.intro}>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {differentiators.items.map((item) => (
          <li
            key={item.title}
            data-animate
            className={cn(
              "relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface p-7 transition-colors duration-300 ease-in-out hover:border-line-strong",
              item.featured && "md:col-span-2 lg:row-span-2 lg:p-10",
            )}
          >
            {item.featured && (
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 size-72 rounded-full bg-gradient-to-br from-grad-from/25 to-grad-to/25 blur-3xl"
              />
            )}
            <div className="relative">
              <FeatureIcon name={item.icon} />
              <h3
                className={cn(
                  "mt-6 font-bold tracking-tight",
                  item.featured ? "text-2xl md:text-3xl" : "text-lg",
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  "mt-3 leading-relaxed text-pretty text-muted-foreground",
                  item.featured && "max-w-md text-lg",
                )}
              >
                {item.text}
              </p>
            </div>
            {item.path && (
              <div className="relative mt-10 border-t border-line pt-6 lg:mt-auto">
                <DataFlow steps={item.path} className="text-base" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
