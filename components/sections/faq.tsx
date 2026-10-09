import { Section } from "@/components/shared/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/content/data";

export function Faq() {
  return (
    <Section id="faq" title={faq.title} align="center">
      <Accordion type="single" collapsible data-animate className="mx-auto max-w-3xl">
        {faq.items.map((item, i) => (
          <AccordionItem key={item.question} value={`item-${i}`} className="border-line">
            <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">
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
