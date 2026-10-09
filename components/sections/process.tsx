import { Section } from "@/components/shared/section";
import { howIWork } from "@/content/data";

/** Etapas em sequência: aqui a numeração é informação, não enfeite. */
export function Process() {
  return (
    <Section id="como-trabalho" tone="invert" title={howIWork.title} intro={howIWork.intro}>
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        <span
          aria-hidden="true"
          className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-grad-from/60 to-grad-to/60 md:block"
        />
        {howIWork.steps.map((step, i) => (
          <li key={step.title} data-animate className="relative md:text-center">
            <span className="relative grid size-10 place-items-center rounded-full border border-line bg-background text-sm font-bold md:mx-auto">
              {i + 1}
            </span>
            <h3 className="mt-5 text-lg font-bold tracking-tight">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
