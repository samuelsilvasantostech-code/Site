import Link from "next/link";

import { brand, ui } from "@/content/data";

/** Marca: monograma com o gradiente + nome. */
export function Brand() {
  return (
    <Link href="/" aria-label={`${brand.name}, ${ui.home}`} className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-md bg-gradient-to-br from-grad-from to-grad-to text-sm font-extrabold tracking-tight text-white"
      >
        {brand.initials}
      </span>
      <span className="font-bold tracking-tight">{brand.name}</span>
    </Link>
  );
}
