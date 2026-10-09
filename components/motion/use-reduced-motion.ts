"use client";

import { useSyncExternalStore } from "react";

import { MOTION_REDUCED } from "./gsap";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(MOTION_REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * `true` quando o visitante pediu menos movimento no sistema.
 * No servidor assume `false`; o valor real chega na hidratação.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOTION_REDUCED).matches,
    () => false,
  );
}
