import { Section } from "@/components/shared/section";
import { howItWorks } from "@/content/data";

/** Etapas em sequência: aqui a numeração é informação, não enfeite. */
export function Process() {
  return (
    <Section id="como-funciona" tone="invert" title={howItWorks.headline}>
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        <span
          aria-hidden="true"
          className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-grad-from/60 to-grad-to/60 md:block"
        />
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} data-animate className="relative md:text-center">
            <span className="relative grid size-12 place-items-center rounded-full border border-line bg-surface font-display text-sm font-bold text-link md:mx-auto">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-lg font-bold tracking-tight">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
