"use client";

import { useSyncExternalStore } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * `true` em telas de toque (sem mouse preciso): efeitos que dependem do
 * cursor (spotlight, magnético) e cenas pinadas horizontais ficam de fora.
 * No servidor assume toque, o caminho mais leve.
 */
export function useIsTouch() {
  return useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(FINE_POINTER).matches,
    () => true,
  );
}
