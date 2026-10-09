import type { Metadata } from "next";
import Link from "next/link";

import { RequestPath } from "@/components/layout/request-path";
import { Button } from "@/components/ui/button";
import { notFound } from "@/content/data";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="grid min-h-svh place-items-center bg-[radial-gradient(var(--dot)_1.2px,transparent_1.3px)] bg-size-[22px_22px] px-5 py-8"
    >
      <div className="w-full max-w-[560px]">
        <div className="mb-10 flex items-center" aria-hidden="true">
          <span className="rounded-md border-[1.5px] border-brand bg-card px-[0.85rem] py-[0.7rem] font-mono text-xs whitespace-nowrap">
            você
          </span>
          <span className="relative h-0.5 min-w-10 flex-1 bg-[linear-gradient(90deg,var(--accent)_0_40%,transparent_40%_60%,var(--line-strong)_60%)]">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[54%] text-[1.1rem] leading-none text-signal">
              ×
            </span>
          </span>
          <span className="rounded-md border-[1.5px] border-dashed border-line-strong bg-card px-[0.85rem] py-[0.7rem] font-mono text-xs whitespace-nowrap text-muted-foreground">
            página
          </span>
        </div>

        <h1 className="text-[clamp(2.2rem,1.6rem+3vw,3.4rem)] leading-[1.02] font-bold tracking-[-0.035em]">
          {notFound.title}
        </h1>
        <p className="mt-4 max-w-[34rem] text-muted-foreground">
          {notFound.text}{" "}
          <code className="font-mono text-xs wrap-anywhere text-signal">
            <RequestPath />
          </code>{" "}
          {notFound.textAfter}
        </p>

        <Button asChild size="lg" className="mt-8 h-12 px-[1.35rem] text-base font-semibold">
          <Link href="/">{notFound.cta}</Link>
        </Button>
      </div>
    </main>
  );
}
