import { Section } from "@/components/shared/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqProps = {
  title: string;
  items: readonly { question: string; answer: string }[];
  tone?: "base" | "invert";
};

export function Faq({ title, items, tone = "base" }: FaqProps) {
  return (
    <Section id="duvidas" title={title} tone={tone} align="center">
      <Accordion type="single" collapsible data-animate className="mx-auto max-w-3xl">
        {items.map((item, i) => (
          <AccordionItem key={item.question} value={`item-${i}`} className="border-line">
            <AccordionTrigger className="py-6 text-left font-display text-lg font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
