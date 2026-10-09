import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { PrintButton } from "@/components/layout/print-button";
import {
  cases,
  experience,
  integrations,
  links,
  profile,
  resume,
  services,
  ui,
} from "@/content/data";
import { prettyUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: resume.title,
  description: resume.summary,
  alternates: { canonical: "/curriculo" },
};

const jobs = [...experience.jobs].reverse();
const tools = [
  ...integrations.groups.flatMap((group) =>
    "chips" in group ? group.chips : group.items.map((item) => item.name),
  ),
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 break-inside-avoid-page print:mt-6">
      <h2 className="mb-4 border-b border-line pb-2 font-semibold print:mb-2">{title}</h2>
      {children}
    </section>
  );
}

function Row({ aside, children }: { aside: ReactNode; children: ReactNode }) {
  return (
    <div className="grid break-inside-avoid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6 print:grid-cols-[8rem_1fr] print:gap-4">
      <p className="pt-0.5 text-sm text-muted-foreground">{aside}</p>
      <div>{children}</div>
    </div>
  );
}

export default function ResumePage() {
  const contactLines = [
    { label: "E-mail", value: links.email, href: `mailto:${links.email}` },
    { label: "LinkedIn", value: prettyUrl(links.linkedin), href: links.linkedin },
    { label: "Telefone", value: links.phone, href: links.phoneHref },
    { label: "WhatsApp", value: prettyUrl(links.whatsapp), href: links.whatsapp },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 print:max-w-none print:px-0">
      <PageHeader backHref="/" backLabel={ui.backHome} className="print:hidden" />

      <main id="conteudo" tabIndex={-1} className="pt-6 pb-20 print:p-0">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight print:text-[26pt]">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg font-medium">{profile.headline}</p>
            <p className="text-muted-foreground">
              {profile.city}, {profile.region}. Trabalho remoto.
            </p>
          </div>
          <PrintButton />
        </header>

        <dl className="mt-6 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
          {contactLines.map((line) => (
            <div key={line.label} className="flex gap-2">
              <dt className="text-muted-foreground">{line.label}</dt>
              <dd>
                <a href={line.href} className="underline-offset-4 hover:underline">
                  {line.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 max-w-[70ch] text-pretty">{resume.summary}</p>

        <Block title={resume.sections.experience}>
          <div className="grid gap-6 print:gap-4">
            {jobs.map((job) => (
              <Row key={job.company} aside={job.period}>
                <h3 className="font-semibold">
                  {job.role}, {job.company}
                </h3>
                <p className="mt-1 text-pretty text-muted-foreground">{job.text}</p>
              </Row>
            ))}
          </div>
        </Block>

        <Block title={resume.sections.cases}>
          <ul className="grid gap-3">
            {cases.items.map((item) => (
              <li key={item.slug} className="break-inside-avoid">
                <span className="font-medium">{item.title}.</span>{" "}
                <span className="text-muted-foreground">{item.summary}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={resume.sections.skills}>
          <div className="grid gap-4">
            <Row aside="Áreas">
              <p>{services.items.map((service) => service.title).join(", ")}.</p>
            </Row>
            <Row aside="Ferramentas">
              <p>{tools.join(", ")}.</p>
            </Row>
          </div>
        </Block>

        <Block title={resume.sections.education}>
          {experience.education.map((item) => (
            <Row key={item.course} aside={item.period}>
              <h3 className="font-semibold">{item.course}</h3>
              <p className="text-muted-foreground">{item.school}</p>
            </Row>
          ))}
        </Block>
      </main>
    </div>
  );
}
