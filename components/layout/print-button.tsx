"use client";

import { PrinterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ui } from "@/content/data";

/** Abre a impressão do navegador, onde dá para escolher "Salvar como PDF". */
export function PrintButton() {
  return (
    <Button type="button" onClick={() => window.print()} className="print:hidden">
      <PrinterIcon aria-hidden="true" />
      {ui.printResume}
    </Button>
  );
}
