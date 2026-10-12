import { ProcessSteps } from "@/components/motion/process-steps";
import { Section } from "@/components/shared/section";
import { howItWorks } from "@/content/data";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Etapas em sequência (aqui a numeração é informação, não enfeite). No
 * desktop, o número da etapa atual fica fixo à esquerda, em escala de cartaz,
 * e troca conforme a rolagem; uma linha vertical se preenche ao lado dos
 * passos. No celular, cada passo mostra o próprio número.
 */
export function Process() {
  return (
    <Section id="como-funciona" tone="invert" title={howItWorks.headline} intro={howItWorks.intro}>
      <ProcessSteps>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div aria-hidden="true" className="hidden lg:block">
            <div className="process-number sticky top-[30vh]">
              {howItWorks.steps.map((step, i) => (
                <span key={step.title} data-step-number={i} data-active={i === 0}>
                  {pad(i + 1)}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line" />
            <span
              aria-hidden="true"
              data-scrub-line="y"
              className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-grad-from to-grad-to"
            />
            <ol className="grid gap-[clamp(4rem,14vh,9rem)] py-4 pl-8 md:pl-12">
              {howItWorks.steps.map((step, i) => (
                <li key={step.title} data-step={i} data-animate className="max-w-xl">
                  <span className="eyebrow text-muted-foreground lg:hidden">{pad(i + 1)}</span>
                  <h3 className="mt-3 text-title lg:mt-0">{step.title}</h3>
                  <p className="mt-4 text-lead text-pretty text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </ProcessSteps>
    </Section>
  );
}
