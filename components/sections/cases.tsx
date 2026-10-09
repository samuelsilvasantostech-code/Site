import { Section } from "@/components/shared/section";
import { cases } from "@/content/data";

import { CaseCard } from "./case-card";

export function Cases() {
  return (
    <Section id="cases" title={cases.title} intro={cases.intro}>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-4">
        {cases.items.map((item) => (
          <CaseCard key={item.slug} item={item} />
        ))}
      </ul>
    </Section>
  );
}
