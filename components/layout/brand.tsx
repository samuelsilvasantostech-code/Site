import Link from "next/link";

import { brand, ui } from "@/content/data";

import { Logo } from "./logo";

/** Logotipo com link para a página inicial. */
export function Brand({ withDescriptor = false }: { withDescriptor?: boolean }) {
  return (
    <Link href="/" aria-label={`${brand.name} ${brand.descriptor}, ${ui.home}`}>
      <Logo withDescriptor={withDescriptor} />
    </Link>
  );
}
