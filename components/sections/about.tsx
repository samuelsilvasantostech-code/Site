import Image from "next/image";

import { Section } from "@/components/shared/section";
import { about } from "@/content/data";

export function About() {
  return (
    <Section id="sobre" title={about.title}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
        <div className="space-y-[1.1rem]">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className="max-w-[38rem] text-pretty first:text-md">
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="grid content-start gap-6">
          {about.photo && (
            <Image
              src={about.photo}
              alt={about.photoAlt}
              width={600}
              height={600}
              className="aspect-square w-full max-w-[280px] rounded-lg border border-line object-cover"
            />
          )}
          <dl className="border-t border-line">
            {about.facts.map((fact) => (
              <div key={fact.term} className="border-b border-line py-[0.9rem]">
                <dt className="font-mono text-xs text-muted-foreground">{fact.term}</dt>
                <dd className="mt-[0.2rem]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
