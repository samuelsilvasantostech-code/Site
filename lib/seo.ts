import type { Metadata } from "next";

import { SITE_URL } from "./constants";

/**
 * `true` quando `NEXT_PUBLIC_SITE_URL` aponta para um domínio próprio.
 * Enquanto o site estiver em *.vercel.app (ou local), não declaramos URL
 * canônica: assim a troca para o domínio definitivo não deixa canonicals
 * antigos indexados.
 */
export const HAS_CUSTOM_DOMAIN = !/(\.vercel\.app|localhost|127\.0\.0\.1)$/.test(
  new URL(SITE_URL).hostname,
);

/** `alternates` com a URL canônica, só quando o domínio próprio estiver confirmado. */
export function canonical(path: string): Metadata["alternates"] {
  return HAS_CUSTOM_DOMAIN ? { canonical: path } : undefined;
}
