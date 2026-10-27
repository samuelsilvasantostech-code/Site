"use client";

/**
 * Ponto único de importação do GSAP. Registra os plugins uma vez e reexporta,
 * para que nenhum componente importe "gsap" diretamente sem os plugins.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Media queries de movimento usadas em `gsap.matchMedia()` e `matchMedia()`.
 * Por decisão de design, o site anima para todos e ignora o
 * "reduzir movimento" do sistema: `MOTION_OK` sempre casa e
 * `MOTION_REDUCED` nunca casa.
 */
export const MOTION_OK = "all";
export const MOTION_REDUCED = "not all";

export { gsap, ScrollTrigger, SplitText, useGSAP };
