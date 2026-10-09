import { LogoMark } from "@/components/layout/logo";
import { hero } from "@/content/data";

const W = 520;
const H = 440;
const CX = W / 2;
const CY = H / 2;
const NODE_W = 124;
const NODE_H = 44;

/* Seis sistemas em volta do núcleo, em hexágono achatado. */
const nodes = hero.diagram.nodes.map((label, i) => {
  const angle = (Math.PI / 3) * i - Math.PI / 2 + Math.PI / 6;
  return {
    label,
    x: CX + Math.cos(angle) * 195,
    y: CY + Math.sin(angle) * 165,
  };
});

/**
 * Ilustração do hero: sistemas da empresa conectados por fluxos de dados ao
 * núcleo SSNEX. Decorativa (o texto ao lado já explica a proposta); as linhas
 * "correm" via CSS e param quando o sistema pede menos movimento.
 */
export function SystemsDiagram() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[520px]">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
        <defs>
          <linearGradient id="flow-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563EB" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
          <radialGradient id="hub-glow">
            <stop offset="0" stopColor="#2563EB" stopOpacity="0.35" />
            <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={150} fill="url(#hub-glow)" />
        <ellipse
          cx={CX}
          cy={CY}
          rx={195}
          ry={165}
          fill="none"
          className="stroke-line"
          strokeDasharray="2 6"
        />

        {nodes.map((node) => (
          <g key={node.label}>
            <line
              x1={CX}
              y1={CY}
              x2={node.x}
              y2={node.y}
              className="stroke-line-strong"
              strokeWidth={1.25}
            />
            <line
              x1={CX}
              y1={CY}
              x2={node.x}
              y2={node.y}
              stroke="url(#flow-line)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="6 14"
              className="animate-[flow_2.4s_linear_infinite]"
            />
          </g>
        ))}

        {nodes.map((node) => (
          <g key={`${node.label}-node`}>
            <rect
              x={node.x - NODE_W / 2}
              y={node.y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx={10}
              className="fill-surface stroke-line-strong"
            />
            <circle cx={node.x - NODE_W / 2 + 16} cy={node.y} r={4} fill="#06B6D4" />
            <text
              x={node.x - NODE_W / 2 + 28}
              y={node.y + 5}
              className="fill-foreground font-sans"
              fontSize={14}
              fontWeight={600}
            >
              {node.label}
            </text>
          </g>
        ))}

        <rect
          x={CX - 52}
          y={CY - 52}
          width={104}
          height={104}
          rx={22}
          className="fill-background"
          stroke="url(#flow-line)"
          strokeWidth={1.5}
        />
      </svg>
      <LogoMark className="absolute top-1/2 left-1/2 h-[12%] w-auto -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
