import { FileTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { about, ui } from "@/content/data";

import { Experience } from "./experience";

/** Como a SSNEX pensa tecnologia: três princípios de abordagem. */
export function AboutApproach() {
  return (
    <Section id="abordagem" title={about.approachTitle}>
      <ol className="grid gap-5 md:grid-cols-3">
        {about.approach.map((item) => (
          <li
            key={item.title}
            data-animate
            className="rounded-lg border border-line bg-surface p-7"
          >
            <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** O fundador: história real, trajetória e currículo. */
export function About() {
  return (
    <Section id="fundador" tone="invert" title={about.founderTitle}>
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div data-animate>
          {about.photo && (
            <Image
              src={about.photo}
              alt={about.photoAlt}
              width={600}
              height={600}
              className="mb-8 size-24 rounded-full object-cover"
            />
          )}
          <div className="max-w-[62ch] space-y-5 text-pretty">
            {about.founderParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0 ? "text-xl leading-relaxed" : "leading-relaxed text-muted-foreground"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-8 bg-transparent dark:bg-transparent">
            <Link href="/curriculo">
              <FileTextIcon aria-hidden="true" />
              {ui.resume}
            </Link>
          </Button>
        </div>

        <div data-animate className="rounded-lg border border-line bg-surface p-7">
          <Experience />
        </div>
      </div>
    </Section>
  );
}
