import { FileTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { about, ui } from "@/content/data";

import { Experience } from "./experience";

/**
 * Como a SSNEX pensa tecnologia: três princípios em linhas editoriais,
 * ligadas pela linha de conexão da marca.
 */
export function AboutApproach() {
  return (
    <Section id="abordagem" title={about.approachTitle}>
      <ul className="border-b border-line">
        {about.approach.map((item) => (
          <li
            key={item.title}
            data-animate
            className="grid gap-4 border-t border-line py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:py-14"
          >
            <h3 className="text-title">{item.title}</h3>
            <p className="text-lead text-pretty text-muted-foreground">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/**
 * O fundador: a história real em tamanho de leitura, a foto (quando houver,
 * com leve parallax) e a trajetória como linha do tempo.
 */
export function About() {
  const [lead, ...rest] = about.founderParagraphs;
  return (
    <Section id="fundador" tone="invert" title={about.founderTitle}>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <p data-animate className="text-title text-pretty">
            {lead}
          </p>
          <div className="mt-8 max-w-[62ch] space-y-5">
            {rest.map((paragraph, i) => (
              <p key={i} data-animate className="text-lead text-pretty text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-10 h-12 px-6">
            <Link href="/curriculo">
              <FileTextIcon aria-hidden="true" />
              {ui.resume}
            </Link>
          </Button>
        </div>

        {about.photo && (
          <div className="overflow-hidden rounded-[var(--radius-xl)]">
            <Image
              src={about.photo}
              alt={about.photoAlt}
              width={600}
              height={750}
              data-parallax="0.08"
              className="aspect-[4/5] w-full scale-110 object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-24">
        <Experience />
      </div>
    </Section>
  );
}
