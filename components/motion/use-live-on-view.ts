"use client";

import type { RefObject } from "react";

import { gsap, MOTION_OK, MOTION_REDUCED, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Marca o elemento com `data-live="true"` quando ele entra na tela (uma vez só).
 * Com movimento reduzido, marca imediatamente.
 */
export function useLiveOnView(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => el.setAttribute("data-live", "true"),
        });
      });
      mm.add(MOTION_REDUCED, () => {
        el.setAttribute("data-live", "true");
      });
    },
    { scope: ref },
  );
}
