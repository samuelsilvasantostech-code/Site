import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { MARK_PATHS, MARK_VIEWBOX } from "@/components/layout/logo";
import { brand, seo } from "@/content/data";

/* Imagem de preview (LinkedIn, WhatsApp, X), no estilo do banner da marca. */

export const alt = seo.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  bg: "#0B0F14",
  text: "#F8FAFC",
  muted: "#9CA3AF",
  blue: "#2563EB",
  cyan: "#06B6D4",
};

const font = (file: string) => readFile(join(process.cwd(), "app/fonts/og", file));

/* O símbolo vai como imagem SVG: o gerador desenha gradientes em SVG, mas não em texto. */
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}"><defs><linearGradient id="g" x1="0" y1="1" x2="1" y2="0.2"><stop offset="0" stop-color="#1D4ED8"/><stop offset="0.55" stop-color="#2563EB"/><stop offset="1" stop-color="#06B6D4"/></linearGradient></defs><g fill="url(#g)" stroke="url(#g)" stroke-width="2.5" stroke-linejoin="round">${MARK_PATHS.map((d) => `<path d="${d}"/>`).join("")}</g></svg>`;
const markSrc = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString("base64")}`;

export default async function OpengraphImage() {
  const [montserrat, inter] = await Promise.all([
    font("montserrat-700.ttf"),
    font("inter-500.ttf"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: C.bg,
        backgroundImage: `linear-gradient(115deg, transparent 80%, ${C.blue}55 80.3%, transparent 86%), linear-gradient(115deg, transparent 87%, ${C.blue}aa 87.2%, ${C.cyan}33 93%, transparent 93.4%), radial-gradient(circle at 25% 0%, ${C.blue}40, transparent 50%)`,
        color: C.text,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={196} height={214} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Montserrat",
                fontSize: 132,
                fontWeight: 700,
                letterSpacing: 14,
                lineHeight: 1,
              }}
            >
              <span>{brand.name.slice(0, -1)}</span>
              <span style={{ color: C.cyan }}>{brand.name.slice(-1)}</span>
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 26,
                letterSpacing: 13,
                color: C.muted,
                textTransform: "uppercase",
              }}
            >
              {brand.descriptor}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 64, fontSize: 36 }}>
          <span>{brand.tagline.lead}</span>
          <span style={{ color: "#3B82F6" }}>{brand.tagline.highlight}</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: montserrat, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
