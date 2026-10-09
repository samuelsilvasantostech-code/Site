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
    <main id="conteudo" className="mx-auto grid min-h-svh max-w-xl content-center px-6 py-16">
      <p className="text-sm text-muted-foreground">Erro 404</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{notFound.title}</h1>
      <p className="mt-4 text-pretty text-muted-foreground">
        {notFound.text}{" "}
        <code className="rounded-sm bg-surface px-1.5 py-0.5 text-sm text-foreground">
          <RequestPath />
        </code>{" "}
        {notFound.textAfter}
      </p>
      <Button asChild className="mt-8 justify-self-start">
        <Link href="/">{notFound.cta}</Link>
      </Button>
    </main>
  );
}
