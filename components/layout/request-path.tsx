"use client";

import { usePathname } from "next/navigation";

/** Mostra "GET /caminho" da URL que não foi encontrada. */
export function RequestPath() {
  const pathname = usePathname();
  return <>GET {pathname}</>;
}
