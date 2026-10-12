"use client";

import { useRef, type ComponentPropsWithoutRef, type PointerEvent } from "react";

import { cn } from "@/lib/utils";

/**
 * Superfície com "spotlight": um brilho suave segue o mouse por dentro e a
 * borda acende no ponto mais próximo do cursor, como um sinal chegando.
 * Só reage a mouse; no toque e com "reduzir movimento" fica a borda estática.
 * Os valores vão em variáveis CSS, sem re-renderizar o React.
 */
export function Spotlight({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn("spotlight relative", className)}
      {...props}
    >
      {children}
    </div>
  );
}
