"use client";

/**
 * Ponto único de importação do GSAP. Registra os plugins uma vez e reexporta,
 * para que nenhum componente importe "gsap" diretamente sem os plugins.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

/** Media query usada em `gsap.matchMedia()` para respeitar a preferência do sistema. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, useGSAP };
