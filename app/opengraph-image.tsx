import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { profile, seo } from "@/content/data";

/* Imagem de preview (LinkedIn, WhatsApp, X), gerada a partir do conteúdo. */

export const alt = seo.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  bg: "#0E1B24",
  surface: "#142733",
  lineStrong: "#3A5B70",
  text: "#E4EDF1",
  muted: "#9AB0BD",
  accent: "#3FD6C2",
  signal: "#F4B54A",
  dot: "rgba(154,176,189,.16)",
};

const DIAGRAM = { w: 380, h: 460 };

/* Nós do diagrama. Ficam em <div> porque o gerador só aplica as fontes a texto HTML. */
const NODES = [
  { x: 90, y: 0, w: 200, h: 80, title: "ERP", detail: "GET /cobrancas" },
  { x: 70, y: 180, w: 240, h: 110, title: "n8n", detail: "workflow", hub: true },
  { x: 0, y: 380, w: 180, h: 80, title: "WhatsApp", detail: "POST /mensagens" },
  { x: 200, y: 380, w: 180, h: 80, title: "CRM", detail: "POST /vendas" },
];

const EDGES = [
  "M190,80 C190,130 190,140 190,180",
  "M190,290 C190,330 100,340 100,380",
  "M190,290 C190,330 280,340 280,380",
];

const PORTS = [
  [190, 80],
  [190, 180],
  [190, 290],
  [100, 380],
  [280, 380],
];

const PACKETS = [
  [190, 130],
  [133, 345],
];

const font = (file: string) => readFile(join(process.cwd(), "app/fonts/og", file));

export default async function OpengraphImage() {
  const [grotesk600, grotesk700, mono] = await Promise.all([
    font("familjen-grotesk-600.ttf"),
    font("familjen-grotesk-700.ttf"),
    font("martian-mono-400.ttf"),
  ]);

  const layer = { position: "absolute", top: 0, left: 0 } as const;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: C.bg,
        backgroundImage: `radial-gradient(${C.dot} 1.4px, transparent 1.5px)`,
        backgroundSize: "26px 26px",
        color: C.text,
        fontFamily: "Familjen Grotesk",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 76,
            height: 76,
            borderRadius: 18,
            background: C.surface,
            border: `2px solid ${C.lineStrong}`,
            color: C.accent,
            fontWeight: 700,
            fontSize: 36,
            letterSpacing: -1,
          }}
        >
          SS
          <div
            style={{
              position: "absolute",
              right: -9,
              top: 29,
              width: 14,
              height: 14,
              borderRadius: 999,
              background: C.bg,
              border: `3px solid ${C.accent}`,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 40,
            fontSize: 84,
            lineHeight: 0.94,
            letterSpacing: -3.4,
            fontWeight: 700,
          }}
        >
          <span>{profile.givenName} Silva</span>
          <span>Santos</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 26,
            fontFamily: "Martian Mono",
            fontSize: 19,
            lineHeight: 1.6,
            color: C.accent,
          }}
        >
          <span>Integrações, automação e</span>
          <span>CRM omnichannel</span>
        </div>
      </div>

      <div style={{ display: "flex", position: "relative", width: DIAGRAM.w, height: DIAGRAM.h }}>
        <svg
          width={DIAGRAM.w}
          height={DIAGRAM.h}
          viewBox={`0 0 ${DIAGRAM.w} ${DIAGRAM.h}`}
          style={layer}
        >
          {EDGES.map((d) => (
            <path key={d} d={d} fill="none" stroke={C.accent} strokeWidth={2} opacity={0.8} />
          ))}
        </svg>

        {NODES.map((node) => (
          <div
            key={node.title}
            style={{
              position: "absolute",
              left: node.x,
              top: node.y,
              width: node.w,
              height: node.h,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 20px",
              borderRadius: node.hub ? 16 : 12,
              background: C.surface,
              border: `${node.hub ? 2 : 1.5}px solid ${node.hub ? C.accent : C.lineStrong}`,
            }}
          >
            <span style={{ fontSize: node.hub ? 30 : 22, fontWeight: node.hub ? 700 : 600 }}>
              {node.title}
            </span>
            <span
              style={{ marginTop: 6, fontFamily: "Martian Mono", fontSize: 12, color: C.muted }}
            >
              {node.detail}
            </span>
          </div>
        ))}

        <svg
          width={DIAGRAM.w}
          height={DIAGRAM.h}
          viewBox={`0 0 ${DIAGRAM.w} ${DIAGRAM.h}`}
          style={layer}
        >
          {PORTS.map(([cx, cy]) => (
            <circle
              key={`p${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={6}
              fill={C.bg}
              stroke={C.accent}
              strokeWidth={2.5}
            />
          ))}
          {PACKETS.map(([cx, cy]) => (
            <circle key={`k${cx}-${cy}`} cx={cx} cy={cy} r={6} fill={C.signal} />
          ))}
        </svg>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Familjen Grotesk", data: grotesk600, weight: 600, style: "normal" },
        { name: "Familjen Grotesk", data: grotesk700, weight: 700, style: "normal" },
        { name: "Martian Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
