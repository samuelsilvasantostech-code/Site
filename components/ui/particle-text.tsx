"use client";

import { useEffect, useRef } from "react";

import { MOTION_REDUCED } from "@/components/motion/gsap";

type Particle = { x: number; y: number; tx: number; ty: number; sx: number; sy: number };

/**
 * Partículas soltas que se organizam formando um texto (IA aplicada: dados
 * dispersos ganhando forma), depois se soltam de novo, em ciclo. Canvas 2D,
 * só anima na tela; com "reduzir movimento" o texto aparece já formado.
 */
export function ParticleText({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let start = 0;

    const style = getComputedStyle(canvas);
    const color = style.getPropertyValue("--data").trim() || "#00E0C6";
    const muted = style.getPropertyValue("--muted").trim() || "#8A94A6";

    function setup() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      // Amostra os pixels do texto para saber onde cada partícula deve parar.
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const o = off.getContext("2d")!;
      o.fillStyle = "#fff";
      o.font = `700 ${Math.round(height * 0.82)}px ${style.fontFamily}`;
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillText(text, width / 2, height / 2 + height * 0.04);
      const data = o.getImageData(0, 0, width, height).data;
      const gap = Math.max(4, Math.round(width / 70));
      particles = [];
      let seed = 3;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          if (data[(y * width + x) * 4 + 3] > 128) {
            particles.push({
              x: 0,
              y: 0,
              tx: x,
              ty: y,
              sx: random() * width,
              sy: random() * height,
            });
          }
        }
      }
    }

    function draw(time: number) {
      // Ciclo de 6 s: espalhado → forma o texto → segura → espalha.
      const t = ((time - start) / 6000) % 1;
      const k = t < 0.15 ? 0 : t < 0.45 ? (t - 0.15) / 0.3 : t < 0.8 ? 1 : 1 - (t - 0.8) / 0.2;
      const e = k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x = p.sx + (p.tx - p.sx) * e;
        p.y = p.sy + (p.ty - p.sy) * e;
        ctx!.fillStyle = e > 0.6 ? color : muted;
        ctx!.globalAlpha = 0.35 + e * 0.65;
        ctx!.fillRect(p.x, p.y, 1.6, 1.6);
      }
      if (running) frame = requestAnimationFrame(draw);
    }

    setup();
    // Com a fonte da marca carregada, refaz a amostragem do texto.
    void document.fonts.ready.then(setup);
    if (window.matchMedia(MOTION_REDUCED).matches) {
      void document.fonts.ready.then(() => {
        start = performance.now() - 3600; // ponto do ciclo com o texto formado
        draw(performance.now());
      });
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        start = performance.now();
        frame = requestAnimationFrame(draw);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(canvas);
    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [text]);

  return <canvas ref={canvasRef} className="h-32 w-full font-display md:h-36" />;
}
