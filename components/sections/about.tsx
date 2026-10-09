import { FileTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { about, ui } from "@/content/data";

import { Experience } from "./experience";

export function About() {
  return (
    <Section id="sobre" tone="invert" title={about.title}>
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
            {about.paragraphs.map((paragraph, i) => (
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
