"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, useLoop } from "@/components/motion/kit";
import "./process-anim.css";

// One small looping scene per process phase, drawn in code. Each scene ticks via
// useLoop (only while on screen, ≤ ~2.5 renders/sec) and shows its last, most
// complete frame with reduced motion.

const r1 = (n: number) => Math.round(n * 10) / 10;
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const GREEN = "#34D399";
const AMBER = "#FBBF24";

type Tone = "amber" | "green" | "violet";
const TONE: Record<Tone, string> = {
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-200",
};

/** Dark window chrome around a scene: traffic lights, a file name and a status pill */
function Frame({ label, status, tone, run, live, children, frameRef }: { label: string; status: string; tone: Tone; run: boolean; live?: boolean; children: ReactNode; frameRef: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={frameRef} data-run={run} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B14]/90 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex shrink-0 gap-1">
            <i className="h-2 w-2 rounded-full bg-white/15" />
            <i className="h-2 w-2 rounded-full bg-white/15" />
            <i className="h-2 w-2 rounded-full bg-white/15" />
          </span>
          <span className="truncate font-mono text-[10px] text-white/45">{label}</span>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] transition-colors duration-500 ${TONE[tone]}`}>
          {live && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="pr-ping absolute inset-0 rounded-full bg-emerald-400" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
          )}
          {status}
        </span>
      </div>
      {children}
    </div>
  );
}

const Check = ({ x, y, s = 1, color = GREEN }: { x: number; y: number; s?: number; color?: string }) => (
  <path d={`M${x - 4 * s} ${y} l${3 * s} ${3 * s} l${5 * s} -${6 * s}`} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
);

/* ───────────── 01 · Discovery: brief writing itself, sticky notes, risk radar ───────────── */

const BRIEF_LINES = [
  { y: 48, w: 104 },
  { y: 58, w: 86 },
  { y: 68, w: 96 },
  { y: 84, w: 70 },
  { y: 94, w: 100 },
];
const KPIS = [
  { t: "conv", w: 58 },
  { t: "LTV", w: 40 },
  { t: "SLA", w: 70 },
];
const NOTES = [
  { x: 150, y: 34, rot: 7, c: "#FDE68A", t: "MVP", at: 3 },
  { x: 160, y: 92, rot: -6, c: "#F9A8D4", t: "v1", at: 5 },
  { x: 146, y: 148, rot: 4, c: "#A5F3FC", t: "API", at: 9 },
];
const RX = 278;
const RY = 100;
const BLIPS = [
  { x: 306, y: 70, at: 2 },
  { x: 246, y: 80, at: 4 },
  { x: 254, y: 132, at: 6 },
  { x: 314, y: 122, at: 8 },
];
const WEDGE = `M${RX} ${RY} L${RX + 66} ${RY} A66 66 0 0 0 ${r1(RX + 66 * Math.cos(0.7))} ${r1(RY - 66 * Math.sin(0.7))} Z`;

export function DiscoveryScene({ en }: { en: boolean }) {
  const { ref, tick, run, reduced } = useLoop<HTMLDivElement>(450);
  const c = reduced ? 15 : tick % 16;
  const found = BLIPS.filter((b) => c >= b.at).length;
  const closed = BLIPS.filter((_, i) => c >= 11 + i).length;
  const done = closed === BLIPS.length;

  return (
    <Frame frameRef={ref} run={run} label="discovery / brief.md" tone={done ? "green" : "amber"} status={done ? (en ? "scope fixed ✓" : "объём зафиксирован ✓") : en ? "mapping…" : "картируем…"}>
      <svg viewBox="0 0 360 210" className="block w-full" aria-hidden="true">
        <defs>
          <linearGradient id="pr-radar-g" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="pr-radar-bg">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* brief */}
        <rect x="12" y="14" width="138" height="182" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
        <text x="24" y="33" fontFamily={MONO} fontSize="9" fill="rgba(255,255,255,0.55)">
          {en ? "# Project brief" : "# Бриф проекта"}
        </text>
        {BRIEF_LINES.map((l, i) => (
          <motion.line key={`bl${i}`} x1="24" y1={l.y} x2={24 + l.w} y2={l.y} stroke="rgba(255,255,255,0.28)" strokeWidth="3" strokeLinecap="round" initial={false} animate={{ pathLength: c >= i ? 1 : 0, opacity: c >= i ? 1 : 0 }} transition={{ duration: 0.4, ease: EASE }} />
        ))}
        <text x="24" y="120" fontFamily={MONO} fontSize="8" fill="#A5B4FC">
          KPI
        </text>
        {KPIS.map((k, i) => (
          <g key={k.t}>
            <text x="24" y={138 + i * 18} fontFamily={MONO} fontSize="8" fill="rgba(255,255,255,0.45)">
              {k.t}
            </text>
            <line x1="52" y1={135 + i * 18} x2="134" y2={135 + i * 18} stroke="rgba(255,255,255,0.08)" strokeWidth="5" strokeLinecap="round" />
            <motion.line x1="52" y1={135 + i * 18} x2={52 + k.w} y2={135 + i * 18} stroke="url(#pr-kpi-g)" strokeWidth="5" strokeLinecap="round" initial={false} animate={{ pathLength: c >= 6 + i ? 1 : 0, opacity: c >= 6 + i ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE }} />
          </g>
        ))}
        <defs>
          <linearGradient id="pr-kpi-g" gradientUnits="userSpaceOnUse" x1="52" y1="0" x2="134" y2="0">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#F0ABFC" />
          </linearGradient>
        </defs>

        {/* radar */}
        <circle cx={RX} cy={RY} r="70" fill="url(#pr-radar-bg)" />
        {[66, 44, 22].map((r) => (
          <circle key={r} cx={RX} cy={RY} r={r} fill="none" stroke="rgba(255,255,255,0.1)" />
        ))}
        <line x1={RX - 66} y1={RY} x2={RX + 66} y2={RY} stroke="rgba(255,255,255,0.06)" />
        <line x1={RX} y1={RY - 66} x2={RX} y2={RY + 66} stroke="rgba(255,255,255,0.06)" />
        {!reduced && (
          <g className="pr-sweep" style={{ transformOrigin: `${RX}px ${RY}px` }}>
            <path d={WEDGE} fill="url(#pr-radar-g)" />
            <line x1={RX} y1={RY} x2={RX + 66} y2={RY} stroke="#A5B4FC" strokeWidth="1.2" />
          </g>
        )}
        {BLIPS.map((b, i) => {
          const on = c >= b.at;
          const ok = c >= 11 + i;
          const col = ok ? GREEN : i % 2 ? "#F87171" : AMBER;
          return (
            <motion.g key={`b${i}`} initial={false} animate={{ x: b.x, y: b.y, scale: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.4, ease: EASE }}>
              {!ok && <circle r="4" fill={col} className="pr-ping" />}
              <circle r={ok ? 7 : 4} fill={ok ? "rgba(52,211,153,0.15)" : col} stroke={ok ? GREEN : "none"} style={{ transition: "all .4s" }} />
              {ok && <Check x={0} y={0} s={0.7} />}
            </motion.g>
          );
        })}
        <text x={RX} y="190" textAnchor="middle" fontFamily={MONO} fontSize="9" fill="rgba(255,255,255,0.6)">
          {en ? `risks: ${found} · closed: ${closed}` : `риски: ${found} · закрыто: ${closed}`}
        </text>

        {/* sticky notes */}
        {NOTES.map((n) => {
          const on = c >= n.at;
          return (
            <motion.g key={n.t} initial={false} animate={{ x: n.x, y: n.y, rotate: n.rot, scale: on ? 1 : 0.4, opacity: on ? 1 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>
              <rect x="-17" y="-15" width="34" height="30" rx="3" fill={n.c} />
              <rect x="-17" y="-15" width="34" height="6" rx="2" fill="rgba(0,0,0,0.08)" />
              <text y="6" textAnchor="middle" fontFamily={MONO} fontSize="9" fontWeight="700" fill="#1F1B2E">
                {n.t}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ───────────── 02 · Design: wireframe drawing itself, filling with UI, a cursor, architecture ───────────── */

const WIRE = [
  { x: 24, y: 38, w: 172, h: 12, r: 4, fill: "rgba(255,255,255,0.08)" },
  { x: 24, y: 60, w: 108, h: 14, r: 4, fill: "url(#pr-ui-a)" },
  { x: 24, y: 80, w: 84, h: 8, r: 3, fill: "rgba(255,255,255,0.22)" },
  { x: 24, y: 96, w: 52, h: 16, r: 8, fill: "#818CF8" },
  { x: 142, y: 60, w: 54, h: 52, r: 8, fill: "url(#pr-ui-b)" },
  { x: 24, y: 124, w: 52, h: 62, r: 6, fill: "rgba(129,140,248,0.18)" },
  { x: 84, y: 124, w: 52, h: 62, r: 6, fill: "rgba(240,171,252,0.16)" },
  { x: 144, y: 124, w: 52, h: 62, r: 6, fill: "rgba(103,232,249,0.16)" },
];
const CURSOR = [
  [60, 44],
  [100, 66],
  [60, 84],
  [50, 104],
  [168, 86],
  [50, 150],
  [110, 150],
  [170, 150],
  [90, 70],
  [60, 106],
  [180, 90],
  [120, 160],
  [170, 160],
  [130, 120],
];
const NODES = [
  { t: "Web", x: 286, y: 46, at: 2 },
  { t: "API", x: 286, y: 106, at: 4 },
  { t: "DB", x: 250, y: 166, at: 6 },
  { t: "Cache", x: 322, y: 166, at: 7 },
];
const EDGES = [
  { d: "M286 57 L286 95", at: 5 },
  { d: "M276 117 L256 155", at: 7 },
  { d: "M296 117 L316 155", at: 8 },
];

export function DesignScene({ en }: { en: boolean }) {
  const { ref, tick, run, reduced } = useLoop<HTMLDivElement>(520);
  const c = reduced ? 13 : tick % 14;
  const [cx, cy] = CURSOR[c];
  const ok = c >= 11;

  return (
    <Frame frameRef={ref} run={run} label="design / app.fig" tone={ok ? "green" : "violet"} status={ok ? (en ? "approved ✓" : "согласовано ✓") : c >= 5 ? (en ? "UI…" : "UI…") : en ? "wireframes…" : "вайрфреймы…"}>
      <svg viewBox="0 0 360 210" className="block w-full" aria-hidden="true">
        <defs>
          <linearGradient id="pr-ui-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="100%" stopColor="#F0ABFC" />
          </linearGradient>
          <linearGradient id="pr-ui-b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E879F9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* app frame */}
        <rect x="12" y="14" width="196" height="184" rx="10" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.12)" />
        <line x1="12" y1="30" x2="208" y2="30" stroke="rgba(255,255,255,0.08)" />
        {[22, 30, 38].map((x) => (
          <circle key={x} cx={x} cy="22" r="2" fill="rgba(255,255,255,0.2)" />
        ))}
        {WIRE.map((w, k) => {
          const drawn = c >= Math.floor(k / 2);
          const filled = c >= 5 + Math.floor(k / 2);
          return (
            <g key={k}>
              <motion.rect x={w.x} y={w.y} width={w.w} height={w.h} rx={w.r} fill={w.fill} initial={false} animate={{ opacity: filled ? 1 : 0 }} transition={{ duration: 0.5 }} />
              <motion.rect x={w.x} y={w.y} width={w.w} height={w.h} rx={w.r} fill="none" stroke={filled ? "rgba(255,255,255,0.12)" : "rgba(165,180,252,0.7)"} strokeWidth="1" initial={false} animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} />
            </g>
          );
        })}
        {/* card contents appear once filled */}
        {[24, 84, 144].map((x, i) => (
          <motion.g key={x} initial={false} animate={{ opacity: c >= 8 + (i > 0 ? 1 : 0) ? 1 : 0 }} transition={{ duration: 0.4 }}>
            <circle cx={x + 12} cy="138" r="6" fill="rgba(255,255,255,0.35)" />
            <rect x={x + 8} y="152" width="34" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
            <rect x={x + 8} y="161" width="24" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
          </motion.g>
        ))}

        {/* architecture */}
        <text x="232" y="24" fontFamily={MONO} fontSize="8" fill="rgba(255,255,255,0.4)">
          {en ? "architecture" : "архитектура"}
        </text>
        {EDGES.map((e) => (
          <g key={e.d}>
            <motion.path d={e.d} stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none" initial={false} animate={{ pathLength: c >= e.at ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} />
            {c >= 9 && <path d={e.d} stroke="#67E8F9" strokeWidth="1.6" fill="none" className="pr-flow" strokeLinecap="round" />}
          </g>
        ))}
        {NODES.map((n) => {
          const on = c >= n.at;
          return (
            <motion.g key={n.t} initial={false} animate={{ x: n.x, y: n.y, scale: on ? 1 : 0.5, opacity: on ? 1 : 0 }} transition={{ type: "spring", stiffness: 280, damping: 18 }}>
              <rect x="-24" y="-11" width="48" height="22" rx="6" fill="#15152A" stroke={ok ? "rgba(52,211,153,0.6)" : "rgba(165,180,252,0.5)"} style={{ transition: "stroke .5s" }} />
              <text y="3" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="rgba(255,255,255,0.85)">
                {n.t}
              </text>
            </motion.g>
          );
        })}

        {/* collaborator cursor */}
        {!reduced && (
          <motion.g initial={false} animate={{ x: cx, y: cy }} transition={{ duration: 0.45, ease: [0.45, 0, 0.2, 1] }}>
            <path d="M0 0 L0 13 L3.6 9.6 L6.6 15.6 L8.8 14.6 L5.8 8.6 L10.6 8.6 Z" fill="#F0ABFC" stroke="#fff" strokeWidth="0.8" strokeLinejoin="round" />
            <rect x="9" y="14" width={en ? 46 : 50} height="13" rx="4" fill="#C026D3" />
            <text x="13" y="23.5" fontFamily={MONO} fontSize="7.5" fill="#fff">
              {en ? "designer" : "дизайнер"}
            </text>
          </motion.g>
        )}
      </svg>
    </Frame>
  );
}

/* ───────────── 03 · Build & QA: commits → CI pipeline → green tests, weekly demos ───────────── */

const STAGES_X = [44, 132, 220, 308];
const STAGE_T = [
  [1, 3],
  [3, 7],
  [7, 9],
  [9, 11],
];
const COMMITS = ["feat: checkout flow", "fix: auth edge case", "test: api contracts", "perf: lazy images", "feat: admin roles", "chore: release list"];
const hash = (i: number) => (((i + 7) * 2654435761) % 0xfffffff).toString(16).padStart(7, "0").slice(0, 7);
const TESTS = 148;

export function BuildScene({ en }: { en: boolean }) {
  const { ref, tick, run, reduced } = useLoop<HTMLDivElement>(450);
  const c = reduced ? 15 : tick % 16;
  const cycle = reduced ? 0 : Math.floor(tick / 16);
  const stageNames = en ? ["build", "test", "review", "staging"] : ["сборка", "тесты", "ревью", "стейдж"];
  const state = (s: number) => (c < STAGE_T[s][0] ? 0 : c < STAGE_T[s][1] ? 1 : 2);
  const cur = c < 1 ? -1 : Math.min(3, STAGE_T.findIndex(([, e]) => c < e) === -1 ? 3 : STAGE_T.findIndex(([, e]) => c < e));
  const dotX = cur < 0 ? 10 : STAGES_X[cur];
  const green = c >= 11;
  const passed = c < 3 ? 0 : c < 7 ? Math.round((TESTS * (c - 2)) / 5) : TESTS;
  const cov = c >= 7 ? 0.87 : 0;
  const weeks = (cycle % 8) + 1;
  const rows = [0, 1, 2].map((j) => cycle * 1 + 2 - j);

  return (
    <Frame frameRef={ref} run={run} label="ci / pipeline.yml" tone={green ? "green" : "amber"} status={green ? (en ? "staging ✓" : "стейдж ✓") : en ? "running…" : "идёт сборка…"}>
      <svg viewBox="0 0 360 210" className="block w-full" aria-hidden="true">
        {/* pipeline */}
        <line x1={STAGES_X[0]} y1="34" x2={STAGES_X[3]} y2="34" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <motion.line x1={STAGES_X[0]} y1="34" x2={STAGES_X[3]} y2="34" stroke="url(#pr-ci-g)" strokeWidth="2" initial={false} animate={{ pathLength: Math.max(0, cur) / 3 }} transition={{ duration: 0.45, ease: EASE }} />
        <defs>
          <linearGradient id="pr-ci-g" gradientUnits="userSpaceOnUse" x1="44" y1="0" x2="308" y2="0">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor={GREEN} />
          </linearGradient>
          <linearGradient id="pr-cov-g" gradientUnits="userSpaceOnUse" x1="222" y1="0" x2="338" y2="0">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor={GREEN} />
          </linearGradient>
        </defs>
        {STAGES_X.map((x, s) => {
          const st = state(s);
          return (
            <g key={x}>
              <circle cx={x} cy="34" r="11" fill="#0E0E1A" stroke={st === 2 ? GREEN : st === 1 ? AMBER : "rgba(255,255,255,0.18)"} strokeWidth="1.5" style={{ transition: "stroke .3s" }} />
              {st === 1 && <circle cx={x} cy="34" r="15" fill="none" stroke={AMBER} strokeWidth="1.5" strokeDasharray="18 76" strokeLinecap="round" className="pr-spin" />}
              {st === 2 && <Check x={x} y={34} s={0.9} />}
              {st === 0 && <circle cx={x} cy="34" r="2" fill="rgba(255,255,255,0.3)" />}
              <text x={x} y="62" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill={st === 2 ? "#A7F3D0" : "rgba(255,255,255,0.5)"}>
                {stageNames[s]}
              </text>
            </g>
          );
        })}
        {!reduced && (
          <motion.g initial={false} animate={{ x: dotX, y: 34, opacity: c < 13 ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }}>
            <circle r="4.5" fill="#67E8F9" opacity="0.35" />
            <circle r="2.5" fill="#fff" />
          </motion.g>
        )}

        {/* git log */}
        <rect x="12" y="76" width="190" height="100" rx="8" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.1)" />
        <text x="22" y="92" fontFamily={MONO} fontSize="8" fill="rgba(255,255,255,0.4)">
          $ git log --oneline
        </text>
        {rows.map((idx, j) => (
          <motion.g key={idx} initial={reduced ? false : { x: 0, y: 98, opacity: 0 }} animate={{ x: 0, y: 112 + j * 20, opacity: 1 - j * 0.25 }} transition={{ duration: 0.5, ease: EASE }}>
            <circle cx="24" cy="-3" r="3" fill={j === 0 && !green ? AMBER : GREEN} style={{ transition: "fill .3s" }} />
            <text x="34" y="0" fontFamily={MONO} fontSize="8.5" fill="#FDE68A">
              {hash(idx)}
            </text>
            <text x="76" y="0" fontFamily={MONO} fontSize="8.5" fill="rgba(255,255,255,0.7)">
              {COMMITS[idx % COMMITS.length]}
            </text>
          </motion.g>
        ))}

        {/* tests */}
        <rect x="212" y="76" width="136" height="100" rx="8" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.1)" />
        <text x="222" y="92" fontFamily={MONO} fontSize="8" fill="rgba(255,255,255,0.4)">
          {en ? "tests" : "тесты"}
        </text>
        <text x="222" y="122" fontFamily={MONO} fontSize="22" fontWeight="600" fill={passed === TESTS ? "#6EE7B7" : "#fff"} style={{ transition: "fill .3s" }}>
          {passed}
          <tspan fontSize="11" fill="rgba(255,255,255,0.4)">/{TESTS}</tspan>
        </text>
        <text x="222" y="146" fontFamily={MONO} fontSize="8" fill="rgba(255,255,255,0.4)">
          {en ? "coverage" : "покрытие"} {Math.round(cov * 100)}%
        </text>
        <line x1="222" y1="158" x2="338" y2="158" stroke="rgba(255,255,255,0.08)" strokeWidth="5" strokeLinecap="round" />
        <motion.line x1="222" y1="158" x2="338" y2="158" stroke="url(#pr-cov-g)" strokeWidth="5" strokeLinecap="round" initial={false} animate={{ pathLength: cov, opacity: cov ? 1 : 0 }} transition={{ duration: 0.8, ease: EASE }} />

        {/* weekly demos */}
        <text x="12" y="200" fontFamily={MONO} fontSize="8" fill="rgba(255,255,255,0.45)">
          {en ? "weekly demo" : "демо / нед."}
        </text>
        {Array.from({ length: 8 }, (_, i) => {
          const x = 104 + i * 32;
          const on = i < weeks;
          const now = i === weeks - 1;
          return (
            <g key={i}>
              {now && !reduced && <circle cx={x} cy="197" r="7" fill="#A78BFA" className="pr-ping" />}
              <circle cx={x} cy="197" r="7" fill={on ? "rgba(167,139,250,0.25)" : "rgba(255,255,255,0.04)"} stroke={on ? "#A78BFA" : "rgba(255,255,255,0.12)"} style={{ transition: "all .4s" }} />
              <text x={x} y="200" textAnchor="middle" fontFamily={MONO} fontSize="7" fill={on ? "#EDE9FE" : "rgba(255,255,255,0.3)"}>
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ───────────── 04 · Launch: deploy progress, then a live monitoring graph ───────────── */

const GX0 = 16;
const GX1 = 344;
const PTS = 30;
const STEP = (GX1 - GX0) / (PTS - 1);
const lat = (k: number) => 118 + 20 * Math.sin(k * 0.55) + 9 * Math.sin(k * 1.9 + 1) + (k % 23 === 0 ? 26 : 0);
const gy = (v: number) => r1(170 - ((v - 80) / 90) * 80);
const LIVE_AT = 7;

function linePath(off: number) {
  return Array.from({ length: PTS + 1 }, (_, i) => `${i ? "L" : "M"}${r1(GX0 + i * STEP)} ${gy(lat(off + i))}`).join(" ");
}

export function LaunchScene({ en }: { en: boolean }) {
  const { ref, tick, run, reduced } = useLoop<HTMLDivElement>(420);
  const c = reduced ? 23 : tick % 24;
  const cycle = reduced ? 0 : Math.floor(tick / 24);
  const live = c >= LIVE_AT;
  const p = Math.min(1, c / LIVE_AT);
  const off = live ? cycle * 17 + c - LIVE_AT : 0;
  const steps = en ? ["build image", "migrate db", "switch traffic", "live"] : ["сборка образа", "миграции БД", "переключение трафика", "в эфире"];
  const stepText = c < 3 ? steps[0] : c < 5 ? steps[1] : c < LIVE_AT ? steps[2] : steps[3];
  const d = linePath(off);
  const p95 = Math.round(lat(off + PTS));
  const endY = gy(lat(off + PTS));

  return (
    <Frame frameRef={ref} run={run} label="prod / monitoring" tone={live ? "green" : "amber"} live={live && !reduced} status={live ? "LIVE" : en ? "deploying…" : "деплой…"}>
      <svg viewBox="0 0 360 210" className="block w-full" aria-hidden="true">
        <defs>
          <linearGradient id="pr-mon-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="pr-mon-a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
          </linearGradient>
          <clipPath id="pr-mon-clip">
            <rect x={GX0} y="70" width={GX1 - GX0} height="104" />
          </clipPath>
        </defs>

        {/* deploy */}
        <text x="16" y="26" fontFamily={MONO} fontSize="9" fill="rgba(255,255,255,0.75)">
          deploy <tspan fill="#A5B4FC">v1.{cycle % 10}</tspan>
          <tspan fill="rgba(255,255,255,0.45)"> · {stepText}</tspan>
        </text>
        <text x="344" y="26" textAnchor="end" fontFamily={MONO} fontSize="9" fill={live ? "#6EE7B7" : "rgba(255,255,255,0.6)"}>
          {Math.round(p * 100)}%
        </text>
        <line x1="16" y1="40" x2="344" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="6" strokeLinecap="round" />
        <motion.line x1="16" y1="40" x2="344" y2="40" stroke={live ? GREEN : "url(#pr-dep-g)"} strokeWidth="6" strokeLinecap="round" initial={false} animate={{ pathLength: p }} transition={{ duration: 0.4, ease: "linear" }} />
        <defs>
          <linearGradient id="pr-dep-g" gradientUnits="userSpaceOnUse" x1="16" y1="0" x2="344" y2="0">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#67E8F9" />
          </linearGradient>
        </defs>

        {/* graph */}
        {[86, 112, 138, 164].map((y) => (
          <line key={y} x1={GX0} y1={y} x2={GX1} y2={y} stroke="rgba(255,255,255,0.05)" />
        ))}
        <text x={GX0} y="64" fontFamily={MONO} fontSize="8" fill="rgba(255,255,255,0.4)">
          {en ? "latency, ms" : "задержка, мс"}
        </text>
        {live ? (
          <g clipPath="url(#pr-mon-clip)">
            <motion.g key={tick} initial={{ x: reduced ? -STEP : 0 }} animate={{ x: -STEP }} transition={{ duration: reduced ? 0 : 0.42, ease: "linear" }}>
              <path d={`${d} L${r1(GX0 + PTS * STEP)} 174 L${GX0} 174 Z`} fill="url(#pr-mon-a)" />
              <path d={d} fill="none" stroke="url(#pr-mon-l)" strokeWidth="1.8" strokeLinejoin="round" />
            </motion.g>
          </g>
        ) : (
          <g>
            <line x1={GX0} y1="150" x2={GX1} y2="150" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 5" />
            <text x={(GX0 + GX1) / 2} y="128" textAnchor="middle" fontFamily={MONO} fontSize="9" fill="rgba(255,255,255,0.4)">
              {en ? "waiting for traffic" : "ждём трафик"}
              <tspan className="pr-blink">_</tspan>
            </text>
          </g>
        )}
        {live && (
          <motion.g initial={false} animate={{ x: GX1, y: endY }} transition={{ duration: 0.42, ease: "linear" }}>
            {!reduced && <circle r="4" fill={GREEN} className="pr-ping" />}
            <circle r="3" fill={GREEN} />
          </motion.g>
        )}

        {/* stats */}
        {[
          { k: en ? "uptime" : "аптайм", v: live ? "99.98%" : "—" },
          { k: "p95", v: live ? `${p95} ${en ? "ms" : "мс"}` : "—" },
          { k: en ? "errors" : "ошибки", v: live ? "0" : "—" },
        ].map((s, i) => (
          <g key={s.k}>
            <text x={16 + i * 116} y="194" fontFamily={MONO} fontSize="8" fill="rgba(255,255,255,0.4)">
              {s.k}
            </text>
            <text x={16 + i * 116} y="206" fontFamily={MONO} fontSize="10" fontWeight="600" fill={live ? "#A7F3D0" : "rgba(255,255,255,0.4)"}>
              {s.v}
            </text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

export const PHASE_SCENES = [DiscoveryScene, DesignScene, BuildScene, LaunchScene];
