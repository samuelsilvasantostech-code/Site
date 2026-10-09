import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { brand, hero, profile, seo } from "@/content/data";

/* Imagem de preview (LinkedIn, WhatsApp, X), gerada a partir do conteúdo. */

export const alt = seo.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  bg: "#09090B",
  line: "#27272A",
  text: "#FAFAFA",
  muted: "#A1A1AA",
  from: "#22D3EE",
  to: "#7C3AED",
};

const font = (file: string) => readFile(join(process.cwd(), "app/fonts/og", file));

export default async function OpengraphImage() {
  const [jakarta600, jakarta800] = await Promise.all([
    font("plus-jakarta-sans-600.ttf"),
    font("plus-jakarta-sans-800.ttf"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px 88px",
        background: C.bg,
        backgroundImage: `radial-gradient(circle at 85% 0%, ${C.to}55, transparent 45%), radial-gradient(circle at 15% 0%, ${C.from}40, transparent 45%)`,
        color: C.text,
        fontFamily: "Plus Jakarta Sans",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 14,
            backgroundImage: `linear-gradient(135deg, ${C.from}, ${C.to})`,
            fontSize: 26,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {brand.initials}
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>{brand.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -2.5,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {hero.title}
        </div>
        <div style={{ marginTop: 28, fontSize: 30, fontWeight: 600, color: C.muted }}>
          {profile.headline}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: jakarta600, weight: 600, style: "normal" },
        { name: "Plus Jakarta Sans", data: jakarta800, weight: 800, style: "normal" },
      ],
    },
  );
}
