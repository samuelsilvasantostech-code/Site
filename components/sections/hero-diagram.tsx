"use client";

import { useEffect, useRef, useState } from "react";

import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { hero, ui } from "@/content/data";
import { cn } from "@/lib/utils";

type NodeKind = "src" | "hub" | "tgt";
type DiagramNode = { x: number; y: number; w: number; h: number; kind: NodeKind; i?: number };
type Edge = readonly [x1: number, y1: number, x2: number, y2: number];
type Layout = { w: number; h: number; dir: "h" | "v"; nodes: DiagramNode[]; edges: Edge[] };

/** Layout horizontal (≥ 640px) e vertical (celular). O CSS escolhe qual exibir. */
const LAYOUTS: Record<"wide" | "narrow", Layout> = {
  wide: {
    w: 560,
    h: 360,
    dir: "h",
    nodes: [
      { x: 0, y: 34, w: 162, h: 70, kind: "src", i: 0 },
      { x: 0, y: 256, w: 162, h: 70, kind: "src", i: 1 },
      { x: 205, y: 122, w: 150, h: 116, kind: "hub" },
      { x: 398, y: 34, w: 162, h: 70, kind: "tgt", i: 0 },
      { x: 398, y: 256, w: 162, h: 70, kind: "tgt", i: 1 },
    ],
    edges: [
      [162, 69, 205, 162],
      [162, 291, 205, 198],
      [355, 162, 398, 69],
      [355, 198, 398, 291],
    ],
  },
  narrow: {
    w: 340,
    h: 440,
    dir: "v",
    nodes: [
      { x: 0, y: 0, w: 158, h: 66, kind: "src", i: 0 },
      { x: 182, y: 0, w: 158, h: 66, kind: "src", i: 1 },
      { x: 70, y: 166, w: 200, h: 108, kind: "hub" },
      { x: 0, y: 374, w: 158, h: 66, kind: "tgt", i: 0 },
      { x: 182, y: 374, w: 158, h: 66, kind: "tgt", i: 1 },
    ],
    edges: [
      [79, 66, 140, 166],
      [261, 66, 200, 166],
      [140, 274, 79, 374],
      [200, 274, 261, 374],
    ],
  },
};

const STEP_COUNT = 4;
const LOG_VISIBLE = 3;
const LOG_INTERVAL_MS = 1600;
/** Atraso de cada pacote, em segundos, para que não saiam todos juntos. */
const PACKET_OFFSETS = [0, 1.3, 0.65, 1.95];
const PACKET_CYCLE = 2.6;

function edgePath([x1, y1, x2, y2]: Edge, dir: Layout["dir"]) {
  if (dir === "h") {
    const mx = (x2 - x1) / 2;
    return `M${x1},${y1} C${x1 + mx},${y1} ${x2 - mx},${y2} ${x2},${y2}`;
  }
  const my = (y2 - y1) / 2;
  return `M${x1},${y1} C${x1},${y1 + my} ${x2},${y2 - my} ${x2},${y2}`;
}

function nodeLabel(node: DiagramNode) {
  const d = hero.diagram;
  if (node.kind === "hub") return d.hub;
  return (node.kind === "src" ? d.sources : d.targets)[node.i ?? 0];
}

function Diagram({
  layout,
  stepsOn,
  className,
}: {
  layout: Layout;
  stepsOn: number;
  className?: string;
}) {
  const paths = layout.edges.map((edge) => edgePath(edge, layout.dir));

  return (
    <svg
      className={cn("diagram", layout.dir === "h" && "is-wide", className)}
      viewBox={`0 0 ${layout.w} ${layout.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={ui.diagramLabel}
    >
      <g>
        {paths.map((d, i) => (
          <g key={i}>
            <path className="d-edge" d={d} />
            <path className="d-edge-glow" d={d} data-edge={i} />
          </g>
        ))}
      </g>

      {layout.nodes.map((node, n) => {
        const label = nodeLabel(node);
        const isHub = node.kind === "hub";
        const cx = node.x + 16;
        return (
          <g key={n} className={cn("d-node", isHub && "is-hub")}>
            <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={isHub ? 14 : 10} />
            <text className="d-title" x={cx} y={node.y + (isHub ? 38 : 31)}>
              {label.title}
            </text>
            <text className="d-detail" x={cx} y={node.y + (isHub ? 60 : 52)}>
              {label.detail}
            </text>
            {isHub &&
              Array.from({ length: STEP_COUNT }, (_, s) => (
                <rect
                  key={s}
                  className="d-step"
                  data-on={s < stepsOn}
                  x={cx + s * 30}
                  y={node.y + node.h - 30}
                  width={22}
                  height={10}
                  rx={3}
                />
              ))}
          </g>
        );
      })}

      {layout.edges.map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <circle className="d-port" cx={x1} cy={y1} r={4.5} />
          <circle className="d-port" cx={x2} cy={y2} r={4.5} />
        </g>
      ))}

      {paths.map((_, i) => (
        <circle key={i} className="d-packet" data-packet={i} r={4.5} opacity={0} />
      ))}
    </svg>
  );
}

/** Log de execução que "roda" junto com o diagrama. */
function useExecutionLog(reduceMotion: boolean) {
  const [tick, setTick] = useState(LOG_VISIBLE);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setTick((t) => t + 1);
    }, LOG_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const lines = hero.diagram.log;
  if (reduceMotion) {
    return {
      entries: lines.slice(1, 1 + LOG_VISIBLE).map((line, i) => ({ key: i, line })),
      stepsOn: STEP_COUNT,
    };
  }

  const entries = Array.from({ length: LOG_VISIBLE }, (_, k) => {
    const index = tick - LOG_VISIBLE + k;
    return { key: index, line: lines[index % lines.length] };
  });
  return { entries, stepsOn: ((tick - 1) % STEP_COUNT) + 1 };
}

export function HeroDiagram() {
  const scope = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { entries, stepsOn } = useExecutionLog(reduceMotion);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        scope.current?.querySelectorAll<SVGSVGElement>("svg.diagram").forEach((svg) => {
          svg.querySelectorAll<SVGCircleElement>(".d-packet").forEach((packet) => {
            const i = Number(packet.dataset.packet);
            const path = svg.querySelector<SVGPathElement>(`[data-edge="${i}"]`);
            if (!path) return;
            const travel = PACKET_CYCLE * 0.55;
            gsap
              .timeline({ repeat: -1, delay: PACKET_OFFSETS[i] })
              .set(packet, { opacity: 0 })
              .to(
                packet,
                {
                  motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
                  duration: travel,
                  ease: "none",
                },
                0,
              )
              .to(packet, { opacity: 1, duration: 0.2 }, 0)
              .to(packet, { opacity: 0, duration: 0.26 }, travel - 0.1)
              .to({}, { duration: PACKET_CYCLE - travel - 0.16 });
          });
        });
      });
    },
    { scope },
  );

  return (
    <figure ref={scope} className="relative self-center">
      <Diagram layout={LAYOUTS.narrow} stepsOn={stepsOn} className="sm:hidden" />
      <Diagram layout={LAYOUTS.wide} stepsOn={stepsOn} className="hidden sm:block" />

      <ol
        aria-hidden="true"
        className="mt-5 min-h-[calc(3*1.9em+1.7rem)] overflow-hidden rounded-md border border-line bg-surface/70 px-4 py-[0.85rem] font-mono text-2xs leading-[1.9] text-muted-foreground"
      >
        {entries.map(({ key, line }) => (
          <li
            key={key}
            className={cn(
              "flex gap-[0.9rem] overflow-hidden text-ellipsis whitespace-nowrap",
              !reduceMotion && "slide-in-from-bottom-1.5 animate-in duration-300 fade-in",
            )}
          >
            <span className="text-line-strong">{line.time}</span>
            <span>{line.text}</span>
            <span className={line.warn ? "text-signal" : "text-brand"}>{line.status}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
