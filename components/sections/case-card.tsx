"use client";

import { XIcon } from "lucide-react";
import { useRef } from "react";

import { useLiveOnView } from "@/components/motion/use-live-on-view";
import { Metrics } from "@/components/shared/metrics";
import { MiniFlow } from "@/components/shared/mini-flow";
import { TagList } from "@/components/shared/tag-list";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ui, type CaseStudy } from "@/content/data";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h3 className="mb-2 font-mono text-xs font-normal text-brand">{title}</h3>
      {children}
    </section>
  );
}

function CaseDetails({ item }: { item: CaseStudy }) {
  const StepList = item.stepsOrdered ? "ol" : "ul";
  return (
    <DialogContent
      showCloseButton={false}
      aria-describedby={undefined}
      className="block max-h-[min(88vh,900px)] w-[min(760px,calc(100vw-24px))] max-w-none overflow-y-auto overscroll-contain rounded-lg border-line-strong bg-card p-[clamp(1.4rem,4vw,2.5rem)] sm:max-w-none"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div data-live="true">
          <MiniFlow steps={item.flow} />
        </div>
        <DialogClose
          aria-label={ui.close}
          className="inline-grid size-11 shrink-0 place-items-center rounded-md border border-line transition-colors hover:border-line-strong"
        >
          <XIcon className="size-5" strokeWidth={1.7} aria-hidden="true" />
        </DialogClose>
      </div>

      <DialogTitle className="mt-4 text-lg leading-[1.15] font-[650] tracking-[-0.02em]">
        {item.title}
      </DialogTitle>

      {item.metrics.length > 0 && (
        <div className="mt-7 rounded-md bg-surface-2 px-[1.2rem] py-4">
          <Metrics metrics={item.metrics} />
        </div>
      )}

      <Block title={ui.problem}>
        <p className="max-w-[40rem]">{item.problem}</p>
      </Block>
      <Block title={ui.solution}>
        <p className="max-w-[40rem]">{item.solution}</p>
      </Block>
      {item.steps.length > 0 && (
        <Block title={ui.howItWorks}>
          <StepList className="cd-steps">
            {item.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </StepList>
        </Block>
      )}
      <Block title={ui.stack}>
        <TagList tags={item.stack} />
      </Block>
    </DialogContent>
  );
}

export function CaseCard({ item }: { item: CaseStudy }) {
  const ref = useRef<HTMLLIElement>(null);
  useLiveOnView(ref);

  return (
    <li
      ref={ref}
      className="relative flex flex-col gap-[0.9rem] rounded-lg border border-line bg-card p-6 transition-colors duration-200 focus-within:border-line-strong hover:border-line-strong"
    >
      <MiniFlow steps={item.flow} />
      <h3 className="text-md leading-[1.25] font-semibold tracking-[-0.01em]">{item.title}</h3>
      <p className="text-muted-foreground">{item.summary}</p>

      <div className="mt-auto flex flex-col items-start gap-3 pt-2">
        <Metrics metrics={item.metrics} />
        <Dialog>
          <DialogTrigger className="min-h-11 font-semibold text-brand underline decoration-1 underline-offset-4 after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-brand">
            {ui.viewDetails}
            <span className="sr-only"> {item.title}</span>
          </DialogTrigger>
          <CaseDetails item={item} />
        </Dialog>
      </div>
    </li>
  );
}
