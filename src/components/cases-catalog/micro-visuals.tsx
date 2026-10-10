"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick, type L } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import type { CaseCategory } from "@/lib/cases-data";

// Animated visualisations for the "More work" micro cases. Each case maps to
// one of a dozen parametrised scenes (matrix, pipeline, before/after, hub…).
// Scenes are SVG on a 1200×640 canvas and play while the block is on screen.

type Theme = { a: string; b: string; soft: string; ink: string; bg: string };
const THEMES: Record<CaseCategory, Theme> = {
  web: { a: "#4F46E5", b: "#06B6D4", soft: "#E0E7FF", ink: "#1E1B4B", bg: "linear-gradient(135deg,#EEF2FF 0%,#ECFEFF 100%)" },
  product: { a: "#059669", b: "#84CC16", soft: "#D1FAE5", ink: "#064E3B", bg: "linear-gradient(135deg,#ECFDF5 0%,#F7FEE7 100%)" },
  web3: { a: "#7C3AED", b: "#EC4899", soft: "#EDE9FE", ink: "#2E1065", bg: "linear-gradient(135deg,#F5F3FF 0%,#FDF2F8 100%)" },
  infrastructure: { a: "#EA580C", b: "#F59E0B", soft: "#FFEDD5", ink: "#431407", bg: "linear-gradient(135deg,#FFF7ED 0%,#FEFCE8 100%)" },
};

type SceneProps = { t: Theme; on: boolean; tr: (l: L) => string };

const SANS = "var(--font-manrope), system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const EASE = [0.22, 1, 0.36, 1] as const;
/** Round coordinates so server and client serialise identical attributes */
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Font size that keeps a line of text within maxWidth (rough glyph width ≈ 0.56em) */
const fitSize = (text: string, size: number, maxWidth: number) => Math.min(size, Math.floor(maxWidth / (text.length * 0.56)));
/** Pill width for a label at ~23px */
const pill = (text: string, perChar = 13.5) => Math.max(150, Math.round(text.length * perChar + 80));

/** Number that counts up while the scene is on screen */
function Count({ to, on, decimals = 0, prefix = "", suffix = "", x, y, size, fill, anchor = "middle" }: {
  to: number; on: boolean; decimals?: number; prefix?: string; suffix?: string; x: number; y: number; size: number; fill: string; anchor?: "start" | "middle" | "end";
}) {
  const ref = useRef<SVGTextElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!on) {
      el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
      return;
    }
    const c = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (v) => (el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`) });
    return () => c.stop();
  }, [on, to, decimals, prefix, suffix]);
  return <text ref={ref} x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={800} fill={fill} fontFamily={SANS}>{`${prefix}${to.toFixed(decimals)}${suffix}`}</text>;
}

const Caption = ({ x, y, children, fill, anchor = "start", size = 22 }: { x: number; y: number; children: React.ReactNode; fill: string; anchor?: "start" | "middle" | "end"; size?: number }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontFamily={MONO} letterSpacing="1">{children}</text>
);

// ── Scenes ─────────────────────────────────────────────────────

/** Grid of scenarios lighting up; optional flaky cells that get fixed */
function Matrix({ t, on, tr, total, flaky = [], label, result }: SceneProps & { total: number; flaky?: number[]; label: L; result: L }) {
  const cols = 12;
  const size = 46;
  const gap = 10;
  const rows = Math.ceil(total / cols);
  const y0 = Math.round(320 - (rows * (size + gap) - gap) / 2);
  const badgeW = pill(tr(result), 15);
  return (
    <g>
      {Array.from({ length: total }, (_, i) => {
        const x = 90 + (i % cols) * (size + gap);
        const y = y0 + Math.floor(i / cols) * (size + gap);
        const bad = flaky.includes(i);
        return (
          <motion.rect
            key={i} x={x} y={y} width={size} height={size} rx={10}
            initial={false}
            animate={on ? { fill: bad ? ["#FCA5A5", "#EF4444", t.a] : [t.soft, t.a], opacity: 1 } : { fill: t.soft, opacity: 0.5 }}
            transition={{ duration: bad ? 1.4 : 0.4, delay: on ? i * 0.035 : 0, times: bad ? [0, 0.5, 1] : undefined }}
          />
        );
      })}
      <Count to={total} on={on} x={1010} y={300} size={120} fill={t.ink} />
      <Caption x={1010} y={350} fill={t.a} anchor="middle">{tr(label)}</Caption>
      <motion.g initial={false} animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: total * 0.035 + 0.3, duration: 0.6 }}>
        <rect x={1010 - badgeW / 2} y={400} width={badgeW} height={70} rx={35} fill={t.a} />
        <text x={1010} y={445} textAnchor="middle" fontSize={24} fontWeight={700} fill="#fff" fontFamily={SANS}>✓ {tr(result)}</text>
      </motion.g>
    </g>
  );
}

/** Stages on a line; a packet runs through, issues get caught at the gates */
function Pipeline({ t, on, tr, steps, caught, caughtLabel, finish }: SceneProps & { steps: L[]; caught?: number; caughtLabel?: L; finish?: L }) {
  const x0 = 120;
  const span = 960;
  const step = span / (steps.length - 1);
  const yLine = 300;
  return (
    <g>
      <line x1={x0} y1={yLine} x2={x0 + span} y2={yLine} stroke={t.soft} strokeWidth={14} strokeLinecap="round" />
      <motion.line x1={x0} y1={yLine} x2={x0 + span} y2={yLine} stroke={t.a} strokeWidth={14} strokeLinecap="round"
        initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 2.2, ease: "easeInOut" }} />
      {steps.map((s, i) => {
        const x = x0 + i * step;
        return (
          <g key={i}>
            <motion.circle cx={x} cy={yLine} r={34} initial={false}
              animate={on ? { fill: t.a, scale: [1, 1.18, 1] } : { fill: "#fff", scale: 1 }}
              stroke={t.a} strokeWidth={6} transition={{ delay: on ? (i / (steps.length - 1)) * 2.2 : 0, duration: 0.5 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            <motion.path d={`M${x - 12} ${yLine} l8 9 l17 -19`} stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round"
              initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ delay: on ? (i / (steps.length - 1)) * 2.2 + 0.2 : 0, duration: 0.3 }} />
            <text x={x} y={yLine + 80} textAnchor="middle" fontSize={24} fontWeight={700} fill={t.ink} fontFamily={SANS}>{tr(s)}</text>
          </g>
        );
      })}
      {on && (
        <motion.circle r={14} cx={x0} cy={yLine} fill={t.b}
          animate={{ x: [0, span], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }} />
      )}
      {caught !== undefined && caughtLabel && (
        <g>
          {Array.from({ length: Math.min(caught, 12) }, (_, i) => (
            <motion.circle key={i} r={9} fill="#EF4444" cx={r2(x0 + step * (1 + (i % (steps.length - 2))))} cy={yLine}
              initial={false} animate={on ? { y: [0, 170 + (i % 3) * 22], opacity: [0, 1, 1] } : { y: 0, opacity: 0 }}
              transition={{ delay: on ? 0.6 + i * 0.18 : 0, duration: 0.7, ease: "easeIn" }} />
          ))}
          <rect x={x0 + step - 40} y={445} width={step * (steps.length - 3) + 80} height={90} rx={18} fill="none" stroke="#EF4444" strokeDasharray="8 8" strokeOpacity={0.5} />
          <Count to={caught} on={on} x={x0 + span} y={520} size={64} fill="#EF4444" anchor="end" />
          <Caption x={x0 + span} y={560} fill="#B91C1C" anchor="end">{tr(caughtLabel)}</Caption>
        </g>
      )}
      {finish && (
        <motion.text x={x0 + span} y={yLine - 70} textAnchor="end" fontSize={30} fontWeight={800} fill={t.a} fontFamily={SANS}
          initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 2.3 }}>{tr(finish)}</motion.text>
      )}
    </g>
  );
}

/** Horizontal bars: "before" stays grey, "after" shrinks/grows into place */
function BeforeAfter({ t, on, tr, rows }: SceneProps & { rows: { label: L; before: number; after: number; unit: L; max: number; better: "lower" | "higher" }[] }) {
  const W = 760;
  return (
    <g>
      {rows.map((r, i) => {
        const y = rows.length > 1 ? 150 + i * 230 : 260;
        const wB = r2((r.before / r.max) * W);
        const wA = r2((r.after / r.max) * W);
        return (
          <g key={i}>
            <text x={90} y={y - 24} fontSize={28} fontWeight={700} fill={t.ink} fontFamily={SANS}>{tr(r.label)}</text>
            <rect x={90} y={y} width={wB} height={56} rx={14} fill="#CBD5E1" />
            <text x={90 + wB + 18} y={y + 38} fontSize={26} fill="#64748B" fontFamily={MONO}>{tr({ en: "before", ru: "до", zh: "之前", tr: "önce", ar: "قبل" })} · {r.before}{tr(r.unit)}</text>
            <motion.rect x={90} y={y + 72} height={56} rx={14} fill={t.a} initial={false}
              animate={{ width: on ? wA : wB }} transition={{ duration: 1.4, delay: 0.4 + i * 0.3, ease: EASE }} />
            <motion.text y={y + 110} fontSize={30} fontWeight={800} fill={t.a} fontFamily={SANS} initial={false}
              animate={{ x: on ? 90 + wA + 18 : 90 + wB + 18, opacity: on ? 1 : 0 }} transition={{ duration: 1.4, delay: 0.4 + i * 0.3, ease: EASE }}>
              {tr({ en: "after", ru: "после", zh: "之后", tr: "sonra", ar: "بعد" })} · {r.after}{tr(r.unit)}
            </motion.text>
          </g>
        );
      })}
    </g>
  );
}

/** Centre node with satellites; optional failover (one node drops, traffic reroutes) or a halo of many integrations */
function Hub({ t, on, tr, center, nodes, failover, many, badge }: SceneProps & { center: L; nodes: string[]; failover?: boolean; many?: number; badge?: L }) {
  const cx = 600;
  const cy = 300;
  const R = 200;
  const [down, setDown] = useState(false);
  useEffect(() => {
    if (!failover || !on) return;
    const id = window.setInterval(() => setDown((d) => !d), 2600);
    return () => window.clearInterval(id);
  }, [failover, on]);
  return (
    <g>
      {many && Array.from({ length: many }, (_, i) => {
        const a = (i / many) * Math.PI * 2;
        return <motion.circle key={i} cx={r2(cx + Math.cos(a) * 300)} cy={r2(cy + Math.sin(a) * 250)} r={7} fill={t.b}
          initial={false} animate={{ opacity: on ? 0.9 : 0, scale: on ? 1 : 0 }} transition={{ delay: on ? i * 0.02 : 0 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }} />;
      })}
      {nodes.map((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = r2(cx + Math.cos(a) * R * 1.35);
        const y = r2(cy + Math.sin(a) * R);
        const isDown = failover && down && i === 0;
        return (
          <g key={n}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={isDown ? "#EF4444" : t.soft} strokeWidth={6} strokeDasharray={isDown ? "6 10" : undefined} />
            {on && !isDown && (
              <motion.circle r={8} cx={x} cy={y} fill={t.a} animate={{ x: [0, cx - x], y: [0, cy - y], opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25, ease: "easeIn" }} />
            )}
            <motion.g initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }} transition={{ delay: on ? 0.1 + i * 0.08 : 0, duration: 0.5, ease: EASE }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <rect x={x - pill(n) / 2} y={y - 32} width={pill(n)} height={64} rx={32} fill="#fff" stroke={isDown ? "#EF4444" : t.a} strokeWidth={3} />
              <circle cx={x - pill(n) / 2 + 30} cy={y} r={11} fill={isDown ? "#EF4444" : "#22C55E"} />
              <text x={x - pill(n) / 2 + 52} y={y + 9} fontSize={23} fontWeight={700} fill={t.ink} fontFamily={SANS}>{n}</text>
            </motion.g>
          </g>
        );
      })}
      <motion.circle cx={cx} cy={cy} r={110} fill={t.a} fillOpacity={0.12}
        animate={on ? { scale: [1, 1.15, 1] } : { scale: 1 }} transition={{ duration: 2.4, repeat: Infinity }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <circle cx={cx} cy={cy} r={82} fill={t.a} />
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize={fitSize(tr(center), 26, 140)} fontWeight={800} fill="#fff" fontFamily={SANS}>{tr(center)}</text>
      {badge && (
        <g>
          <rect x={cx - pill(tr(badge), 12) / 2} y={575} width={pill(tr(badge), 12)} height={50} rx={25} fill={t.ink} />
          <text x={cx} y={608} textAnchor="middle" fontSize={22} fontWeight={700} fill="#fff" fontFamily={SANS}>{tr(badge)}</text>
        </g>
      )}
    </g>
  );
}

/** Ring gauge with the value counting up */
function Gauge({ t, on, tr, value, decimals = 0, suffix = "%", label, side }: SceneProps & { value: number; decimals?: number; suffix?: string; label: L; side?: L[] }) {
  const r = 200;
  const c = r2(2 * Math.PI * r);
  return (
    <g>
      <circle cx={420} cy={320} r={r} fill="none" stroke={t.soft} strokeWidth={44} />
      <motion.circle cx={420} cy={320} r={r} fill="none" stroke={t.a} strokeWidth={44} strokeLinecap="round"
        strokeDasharray={c} transform="rotate(-90 420 320)" initial={false}
        animate={{ strokeDashoffset: on ? c * (1 - value / 100) : c }} transition={{ duration: 1.8, ease: EASE }} />
      <Count to={value} on={on} decimals={decimals} suffix={suffix} x={420} y={345} size={84} fill={t.ink} />
      <Caption x={420} y={395} fill={t.a} anchor="middle" size={Math.min(22, Math.floor(300 / (tr(label).length * 0.62)))}>{tr(label)}</Caption>
      {side?.map((s, i) => (
        <motion.g key={i} initial={false} animate={{ opacity: on ? 1 : 0, x: on ? 0 : 30 }} transition={{ delay: on ? 0.6 + i * 0.2 : 0, duration: 0.5 }}>
          <rect x={720} y={170 + i * 110} width={400} height={80} rx={20} fill="#fff" stroke={t.soft} strokeWidth={3} />
          <circle cx={760} cy={210 + i * 110} r={14} fill={t.a} />
          <text x={790} y={219 + i * 110} fontSize={24} fontWeight={600} fill={t.ink} fontFamily={SANS}>{tr(s)}</text>
        </motion.g>
      ))}
    </g>
  );
}

/** Line chart drawing itself, with a delta badge */
function Growth({ t, on, tr, values, badge, label }: SceneProps & { values: number[]; badge: string; label: L }) {
  const max = Math.max(...values);
  const pts = values.map((v, i) => [r2(100 + (i / (values.length - 1)) * 1000), r2(540 - (v / max) * 380)] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <g>
      {[160, 280, 400, 520].map((y) => <line key={y} x1={100} x2={1100} y1={y} y2={y} stroke={t.ink} strokeOpacity={0.06} strokeWidth={2} />)}
      <motion.path d={`${d} L1100 560 L100 560 Z`} fill={t.a} initial={false} animate={{ opacity: on ? 0.12 : 0 }} transition={{ delay: 1.2, duration: 0.8 }} />
      <motion.path d={d} fill="none" stroke={t.a} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round"
        initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 1.8, ease: EASE }} />
      {pts.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={11} fill="#fff" stroke={t.a} strokeWidth={5}
          initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: on ? (i / pts.length) * 1.8 : 0 }} />
      ))}
      <motion.g initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 20 }} transition={{ delay: 1.9, duration: 0.5 }}>
        <rect x={pts[pts.length - 1][0] - 210} y={pts[pts.length - 1][1] - 110} width={210} height={76} rx={38} fill={t.a} />
        <text x={pts[pts.length - 1][0] - 105} y={pts[pts.length - 1][1] - 60} textAnchor="middle" fontSize={36} fontWeight={800} fill="#fff" fontFamily={SANS}>{badge}</text>
      </motion.g>
      <Caption x={100} y={110} fill={t.a}>{tr(label)}</Caption>
    </g>
  );
}

/** A phrase gets struck through and replaced, in a loop over pairs */
function Morph({ t, on, tr, pairs, title }: SceneProps & { pairs: [L, L][]; title: L }) {
  const [i, setI] = useState(0);
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => {
      setFixed((f) => {
        if (f) setI((n) => (n + 1) % pairs.length);
        return !f;
      });
    }, 1700);
    return () => window.clearInterval(id);
  }, [on, pairs.length]);
  const [from, to] = pairs[i];
  return (
    <g>
      <Caption x={600} y={130} fill={t.a} anchor="middle">{tr(title)}</Caption>
      <rect x={130} y={190} width={940} height={260} rx={36} fill="#fff" stroke={t.soft} strokeWidth={4} />
      <motion.g key={`f${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <text x={600} y={300} textAnchor="middle" fontSize={fitSize(tr(from), 50, 860)} fontWeight={700} fill={fixed ? "#94A3B8" : t.ink} fontFamily={SANS}>“{tr(from)}”</text>
      </motion.g>
      <motion.line x1={250} x2={950} y1={285} y2={285} stroke="#EF4444" strokeWidth={6} strokeLinecap="round"
        initial={false} animate={{ pathLength: fixed ? 1 : 0, opacity: fixed ? 1 : 0 }} transition={{ duration: 0.4 }} />
      <motion.g initial={false} animate={{ opacity: fixed ? 1 : 0, y: fixed ? 0 : 20 }} transition={{ duration: 0.45 }}>
        <text x={600} y={395} textAnchor="middle" fontSize={fitSize(tr(to), 50, 860)} fontWeight={800} fill={t.a} fontFamily={SANS}>→ “{tr(to)}”</text>
      </motion.g>
      {pairs.map((_, k) => <circle key={k} cx={600 - (pairs.length - 1) * 14 + k * 28} cy={520} r={8} fill={k === i ? t.a : t.soft} />)}
    </g>
  );
}

/** The same UI card cycling through languages; optional "remembered" cookie */
function Languages({ t, on, tr, langs, remember }: SceneProps & { langs: { code: string; hello: string; cta: string }[]; remember?: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % langs.length), 1600);
    return () => window.clearInterval(id);
  }, [on, langs.length]);
  const l = langs[i];
  return (
    <g>
      <rect x={220} y={110} width={760} height={420} rx={32} fill="#fff" stroke={t.soft} strokeWidth={4} />
      <rect x={220} y={110} width={760} height={64} rx={32} fill={t.soft} />
      {langs.map((x, k) => (
        <g key={x.code}>
          <rect x={700 + k * 88} y={124} width={76} height={36} rx={18} fill={k === i ? t.a : "#fff"} />
          <text x={738 + k * 88} y={149} textAnchor="middle" fontSize={20} fontWeight={700} fill={k === i ? "#fff" : t.ink} fontFamily={MONO}>{x.code}</text>
        </g>
      ))}
      <motion.g key={`h${i}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <text x={290} y={300} fontSize={fitSize(l.hello, 72, 640)} fontWeight={800} fill={t.ink} fontFamily={SANS}>{l.hello}</text>
      </motion.g>
      <motion.g key={`c${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <rect x={290} y={360} width={300} height={80} rx={40} fill={t.a} />
        <text x={440} y={410} textAnchor="middle" fontSize={28} fontWeight={700} fill="#fff" fontFamily={SANS}>{l.cta}</text>
      </motion.g>
      {remember && (
        <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 0.8 }}>
          <rect x={700} y={360} width={220} height={80} rx={20} fill={t.ink} />
          <text x={810} y={396} textAnchor="middle" fontSize={20} fill="#fff" fontFamily={MONO}>locale = {l.code}</text>
          <text x={810} y={424} textAnchor="middle" fontSize={18} fill="#ffffffaa" fontFamily={MONO}>{tr({ en: "saved for return", ru: "сохранено", zh: "已保存以便回访", tr: "geri dönüş için kaydedildi", ar: "محفوظ للعودة" })}</text>
        </motion.g>
      )}
    </g>
  );
}

/** Site-map tree drawing level by level */
function Tree({ t, on, tr, root, branches }: SceneProps & { root: L; branches: { label: L; leaves: number }[] }) {
  const rx = 600;
  const ry = 120;
  return (
    <g>
      <rect x={rx - 120} y={ry - 40} width={240} height={80} rx={20} fill={t.a} />
      <text x={rx} y={ry + 10} textAnchor="middle" fontSize={28} fontWeight={800} fill="#fff" fontFamily={SANS}>{tr(root)}</text>
      {branches.map((b, i) => {
        const bx = r2(160 + i * (880 / (branches.length - 1)));
        const by = 300;
        return (
          <g key={i}>
            <motion.path d={`M${rx} ${ry + 40} C ${rx} ${ry + 120}, ${bx} ${by - 120}, ${bx} ${by - 36}`} fill="none" stroke={t.a} strokeWidth={4}
              initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ delay: on ? 0.2 + i * 0.12 : 0, duration: 0.6 }} />
            <motion.g initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 14 }} transition={{ delay: on ? 0.6 + i * 0.12 : 0 }}>
              <rect x={bx - 95} y={by - 36} width={190} height={72} rx={18} fill="#fff" stroke={t.a} strokeWidth={3} />
              <text x={bx} y={by + 9} textAnchor="middle" fontSize={23} fontWeight={700} fill={t.ink} fontFamily={SANS}>{tr(b.label)}</text>
            </motion.g>
            {Array.from({ length: b.leaves }, (_, k) => (
              <motion.g key={k} initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: on ? 1 + i * 0.12 + k * 0.08 : 0 }}>
                <line x1={bx} y1={by + 36} x2={bx} y2={by + 90 + k * 62} stroke={t.soft} strokeWidth={4} />
                <rect x={bx - 70} y={by + 70 + k * 62} width={140} height={40} rx={12} fill={t.soft} />
                <rect x={bx - 50} y={by + 86 + k * 62} width={70 + ((k * 23) % 30)} height={8} rx={4} fill={t.a} fillOpacity={0.5} />
              </motion.g>
            ))}
          </g>
        );
      })}
    </g>
  );
}

/** Weekly cadence: a row of weeks, each lighting its demo in turn */
function Weeks({ t, on, tr, weeks, item, label }: SceneProps & { weeks: number; item: L; label: L }) {
  return (
    <g>
      <Caption x={100} y={120} fill={t.a}>{tr(label)}</Caption>
      {Array.from({ length: weeks }, (_, i) => {
        const x = r2(100 + i * (1000 / weeks));
        const w = r2(1000 / weeks - 16);
        return (
          <g key={i}>
            <rect x={x} y={170} width={w} height={320} rx={22} fill="#fff" stroke={t.soft} strokeWidth={3} />
            <text x={x + 22} y={215} fontSize={20} fill="#94A3B8" fontFamily={MONO}>W{i + 1}</text>
            {[0, 1, 2, 3].map((r) => <rect key={r} x={x + 22} y={250 + r * 36} width={w - 44 - ((r * 37 + i * 13) % 50)} height={14} rx={7} fill={t.soft} />)}
            <motion.g initial={false} animate={on ? { opacity: 1, scale: [0.6, 1.1, 1] } : { opacity: 0.2, scale: 0.6 }}
              transition={{ delay: on ? 0.3 + i * 0.35 : 0, duration: 0.5 }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <rect x={x + 22} y={420} width={w - 44} height={46} rx={23} fill={t.a} />
              <text x={x + w / 2} y={451} textAnchor="middle" fontSize={20} fontWeight={700} fill="#fff" fontFamily={SANS}>▶ {tr(item)}</text>
            </motion.g>
          </g>
        );
      })}
    </g>
  );
}

/** Milestones on a road with a progress fill and checkpoints */
function Milestones({ t, on, tr, items }: SceneProps & { items: L[] }) {
  const path = "M100 470 C 300 470, 300 260, 500 300 S 760 520, 900 330 S 1060 160, 1110 170";
  return (
    <g>
      <path d={path} fill="none" stroke={t.soft} strokeWidth={22} strokeLinecap="round" />
      <motion.path d={path} fill="none" stroke={t.a} strokeWidth={22} strokeLinecap="round" initial={false}
        animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 2.6, ease: "easeInOut" }} />
      {(items.length === 4 ? [[100, 470], [420, 290], [700, 430], [1110, 170]] : [[100, 470], [420, 290], [700, 430], [900, 330], [1110, 170]]).slice(0, items.length).map(([x, y], i) => (
        <g key={i}>
          <motion.circle cx={x} cy={y} r={30} initial={false} animate={{ fill: on ? t.a : "#fff" }} stroke={t.a} strokeWidth={6}
            transition={{ delay: on ? (i / (items.length - 1)) * 2.6 : 0 }} />
          <text x={x} y={y + 9} textAnchor="middle" fontSize={24} fontWeight={800} fill={on ? "#fff" : t.a} fontFamily={SANS}>{i + 1}</text>
          <motion.text x={x} y={y - 54} textAnchor="middle" fontSize={24} fontWeight={700} fill={t.ink} fontFamily={SANS} initial={false}
            animate={{ opacity: on ? 1 : 0.3 }} transition={{ delay: on ? (i / (items.length - 1)) * 2.6 : 0 }}>{tr(items[i])}</motion.text>
        </g>
      ))}
    </g>
  );
}

/** Documents with sensitive lines being redacted, then locked */
function Redact({ t, on, tr, stamp }: SceneProps & { stamp: L }) {
  return (
    <g>
      {[0, 1, 2].map((d) => (
        <g key={d} transform={`translate(${190 + d * 70} ${110 + d * 26}) rotate(${-6 + d * 4})`}>
          <rect width={460} height={420} rx={24} fill="#fff" stroke={t.soft} strokeWidth={4} />
          {Array.from({ length: 8 }, (_, r) => {
            const secret = (r + d) % 3 === 1;
            const w = 380 - ((r * 41) % 120);
            return (
              <g key={r}>
                <rect x={40} y={60 + r * 42} width={w} height={14} rx={7} fill={t.soft} />
                {secret && <motion.rect x={36} y={52 + r * 42} height={30} rx={6} fill={t.ink} initial={false}
                  animate={{ width: on ? w + 8 : 0 }} transition={{ delay: on ? 0.3 + r * 0.12 + d * 0.2 : 0, duration: 0.4 }} />}
              </g>
            );
          })}
        </g>
      ))}
      <motion.g initial={false} animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }} transition={{ delay: 1.6, duration: 0.5, ease: EASE }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx={930} cy={320} r={130} fill={t.a} />
        <rect x={880} y={310} width={100} height={80} rx={14} fill="#fff" />
        <path d="M900 310 v-34 a30 30 0 0 1 60 0 v34" fill="none" stroke="#fff" strokeWidth={14} />
        <text x={930} y={500} textAnchor="middle" fontSize={28} fontWeight={800} fill={t.ink} fontFamily={SANS}>{tr(stamp)}</text>
      </motion.g>
    </g>
  );
}

/** Latency histogram with the p95 line */
function Latency({ t, on, tr, p95 }: SceneProps & { p95: number }) {
  const bars = [18, 46, 88, 120, 104, 76, 48, 30, 18, 10, 6, 4];
  const bw = 70;
  const p95x = 120 + 7.6 * bw;
  return (
    <g>
      {bars.map((h, i) => (
        <motion.rect key={i} x={120 + i * bw} width={bw - 12} rx={10} fill={i < 8 ? t.a : t.soft} initial={false}
          animate={{ height: on ? h * 3 : 0, y: on ? 540 - h * 3 : 540 }} transition={{ delay: on ? i * 0.06 : 0, duration: 0.7, ease: EASE }} />
      ))}
      <motion.line x1={p95x} x2={p95x} y1={130} y2={540} stroke={t.ink} strokeWidth={4} strokeDasharray="10 8"
        initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ delay: 0.9, duration: 0.6 }} />
      <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 1.3 }}>
        <rect x={p95x + 16} y={130} width={250} height={110} rx={20} fill={t.ink} />
        <text x={p95x + 40} y={174} fontSize={22} fill="#ffffffaa" fontFamily={MONO}>p95</text>
        <Count to={p95} on={on} suffix={tr({ en: " ms", ru: " мс", zh: " 毫秒", tr: " ms", ar: " مللي ثانية" })} x={p95x + 40} y={222} size={46} fill="#fff" anchor="start" />
      </motion.g>
      <g>
        <rect x={120} y={110} width={150} height={52} rx={26} fill={t.b} />
        <text x={195} y={144} textAnchor="middle" fontSize={22} fontWeight={700} fill="#fff" fontFamily={SANS}>cache</text>
        <rect x={290} y={110} width={150} height={52} rx={26} fill="#fff" stroke={t.a} strokeWidth={3} />
        <text x={365} y={144} textAnchor="middle" fontSize={22} fontWeight={700} fill={t.a} fontFamily={SANS}>DB</text>
      </g>
    </g>
  );
}

/** Nested hex grids at three resolutions */
function HexZoom({ t, on, tr }: SceneProps) {
  const hex = (cx: number, cy: number, r: number) => Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${i ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ") + "Z";
  const levels = [{ r: 220, n: 1 }, { r: 74, n: 7 }, { r: 25, n: 49 }];
  const centres = (r: number, n: number): [number, number][] => {
    if (n === 1) return [[600, 320]];
    const out: [number, number][] = [[600, 320]];
    const ring = (cx: number, cy: number, rr: number) => Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i;
      return [r2(cx + Math.cos(a) * rr * Math.sqrt(3)), r2(cy + Math.sin(a) * rr * Math.sqrt(3))] as [number, number];
    });
    out.push(...ring(600, 320, r));
    if (n > 7) {
      const big = [...out];
      for (const [x, y] of big) for (const p of [[x, y] as [number, number], ...ring(x, y, r)]) if (!out.some(([ox, oy]) => Math.hypot(ox - p[0], oy - p[1]) < 1)) out.push(p);
    }
    return out;
  };
  return (
    <g>
      {levels.map((lv, li) => centres(lv.r, lv.n).map(([x, y], i) => (
        <motion.path key={`${li}-${i}`} d={hex(x, y, lv.r - 3)} fill={li === 2 ? t.a : "none"} fillOpacity={li === 2 ? r2(0.15 + ((i * 7) % 10) / 14) : 0}
          stroke={li === 0 ? t.ink : t.a} strokeWidth={li === 0 ? 6 : li === 1 ? 4 : 2} initial={false}
          animate={{ opacity: on ? 1 : 0 }} transition={{ delay: on ? li * 0.7 + i * 0.01 : 0, duration: 0.5 }} />
      )))}
      {["res 6", "res 7", "res 8"].map((r, i) => (
        <motion.g key={r} initial={false} animate={{ opacity: on ? 1 : 0, x: on ? 0 : 20 }} transition={{ delay: on ? i * 0.7 : 0 }}>
          <rect x={960} y={180 + i * 90} width={160} height={60} rx={30} fill={i === 2 ? t.a : "#fff"} stroke={t.a} strokeWidth={3} />
          <text x={1040} y={219 + i * 90} textAnchor="middle" fontSize={24} fontWeight={700} fill={i === 2 ? "#fff" : t.a} fontFamily={MONO}>{r}</text>
        </motion.g>
      ))}
      <Caption x={100} y={110} fill={t.a}>{tr({ en: "one grid, every zoom level", ru: "одна сетка на всех масштабах", zh: "一套网格，适配所有缩放级别", tr: "tek ızgara, her yakınlaştırma düzeyi", ar: "شبكة واحدة لكل مستويات التكبير" })}</Caption>
    </g>
  );
}

/** Pitch-deck slides fanning out */
function Slides({ t, on, tr, items }: SceneProps & { items: L[] }) {
  return (
    <g>
      {items.map((s, i) => {
        const mid = (items.length - 1) / 2;
        return (
          <motion.g key={i} initial={false}
            animate={on ? { x: (i - mid) * 190, rotate: (i - mid) * 6, y: Math.abs(i - mid) * 18 } : { x: 0, rotate: 0, y: 0 }}
            transition={{ duration: 0.9, delay: on ? 0.1 + i * 0.06 : 0, ease: EASE }} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
            <rect x={460} y={170} width={280} height={340} rx={22} fill="#fff" stroke={t.a} strokeWidth={3} />
            <rect x={490} y={200} width={220} height={120} rx={14} fill={i % 2 ? t.soft : t.a} fillOpacity={i % 2 ? 1 : 0.85} />
            {[0, 1, 2].map((r) => <rect key={r} x={490} y={345 + r * 30} width={200 - r * 40} height={12} rx={6} fill={t.soft} />)}
            <text x={490} y={480} fontSize={22} fontWeight={700} fill={t.ink} fontFamily={SANS}>{tr(s)}</text>
          </motion.g>
        );
      })}
    </g>
  );
}

/** Roles × resources matrix filling with allow/deny, audit log ticking */
function Access({ t, on, tr, badge }: SceneProps & { badge: L }) {
  const roles: L[] = [{ en: "Owner", ru: "Владелец", zh: "所有者", tr: "Sahip", ar: "المالك" }, { en: "Admin", ru: "Админ", zh: "管理员", tr: "Yönetici", ar: "مدير" }, { en: "Ops", ru: "Ops", zh: "运维", tr: "Operasyon", ar: "العمليات" }, { en: "Viewer", ru: "Наблюдатель", zh: "查看者", tr: "Görüntüleyici", ar: "مشاهد" }];
  const res = ["users", "funds", "reports", "settings"];
  const allow = [[1, 1, 1, 1], [1, 0, 1, 1], [0, 1, 1, 0], [0, 0, 1, 0]];
  return (
    <g>
      {res.map((r, j) => <text key={r} x={330 + j * 130} y={140} textAnchor="middle" fontSize={20} fill="#64748B" fontFamily={MONO}>{r}</text>)}
      {roles.map((r, i) => (
        <g key={i}>
          <text x={240} y={205 + i * 90} textAnchor="end" fontSize={24} fontWeight={700} fill={t.ink} fontFamily={SANS}>{tr(r)}</text>
          {res.map((_, j) => (
            <motion.g key={j} initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }}
              transition={{ delay: on ? (i * 4 + j) * 0.06 : 0 }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <rect x={290 + j * 130} y={170 + i * 90} width={80} height={56} rx={14} fill={allow[i][j] ? t.a : "#F1F5F9"} />
              <text x={330 + j * 130} y={207 + i * 90} textAnchor="middle" fontSize={26} fontWeight={800} fill={allow[i][j] ? "#fff" : "#94A3B8"} fontFamily={SANS}>{allow[i][j] ? "✓" : "—"}</text>
            </motion.g>
          ))}
        </g>
      ))}
      <rect x={860} y={150} width={280} height={340} rx={20} fill={t.ink} />
      <text x={884} y={190} fontSize={18} fill="#ffffff99" fontFamily={MONO}>audit.log</text>
      {Array.from({ length: 7 }, (_, k) => (
        <motion.text key={k} x={884} y={230 + k * 36} fontSize={16} fill={k % 3 === 2 ? t.b : "#ffffffcc"} fontFamily={MONO} initial={false}
          animate={{ opacity: on ? 1 : 0 }} transition={{ delay: on ? 0.8 + k * 0.25 : 0 }}>
          {["12:01 admin read users", "12:02 ops export rep", "12:04 owner edit set", "12:05 viewer denied", "12:07 admin read rep", "12:09 ops read funds", "12:10 owner 2FA ok"][k]}
        </motion.text>
      ))}
      <motion.g initial={false} animate={on ? { opacity: 1, rotate: -8, scale: 1 } : { opacity: 0, rotate: 0, scale: 1.6 }}
        transition={{ delay: 2.2, duration: 0.4, ease: EASE }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <rect x={880} y={510} width={240} height={70} rx={14} fill="none" stroke={t.a} strokeWidth={5} />
        <text x={1000} y={556} textAnchor="middle" fontSize={28} fontWeight={800} fill={t.a} fontFamily={SANS}>{tr(badge)}</text>
      </motion.g>
    </g>
  );
}

/** Contract diff: v1 → v2 fields, additive only */
function Contract({ t, on, tr }: SceneProps) {
  const v1 = ["id: string", "amount: number", "status: Status", "createdAt: ISO8601"];
  const v2 = [...v1, "currency?: string", "meta?: object"];
  return (
    <g>
      {[{ x: 120, title: "v1", rows: v1 }, { x: 640, title: "v2", rows: v2 }].map((col, c) => (
        <g key={col.title}>
          <rect x={col.x} y={120} width={440} height={420} rx={24} fill="#fff" stroke={t.soft} strokeWidth={4} />
          <rect x={col.x} y={120} width={440} height={64} rx={24} fill={c ? t.a : t.soft} />
          <text x={col.x + 30} y={162} fontSize={26} fontWeight={800} fill={c ? "#fff" : t.ink} fontFamily={MONO}>PaymentDTO {col.title}</text>
          {col.rows.map((r, i) => {
            const added = c === 1 && i >= v1.length;
            return (
              <motion.g key={r} initial={false} animate={{ opacity: on || !added ? 1 : 0, x: on || !added ? 0 : -20 }} transition={{ delay: on && added ? 0.8 + (i - v1.length) * 0.3 : 0 }}>
                {added && <rect x={col.x + 16} y={208 + i * 52} width={408} height={40} rx={8} fill="#DCFCE7" />}
                <text x={col.x + 30} y={236 + i * 52} fontSize={22} fill={added ? "#15803D" : t.ink} fontFamily={MONO}>{added ? "+ " : "  "}{r}</text>
              </motion.g>
            );
          })}
        </g>
      ))}
      <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 1.6 }}>
        <rect x={420} y={565} width={360} height={56} rx={28} fill={t.ink} />
        <text x={600} y={601} textAnchor="middle" fontSize={22} fontWeight={700} fill="#fff" fontFamily={SANS}>{tr({ en: "0 breaking changes", ru: "0 ломающих изменений", zh: "0 个破坏性变更", tr: "0 uyumsuzluk yaratan değişiklik", ar: "0 تغييرات جذرية" })}</text>
      </motion.g>
    </g>
  );
}

/** Investor dots streaming through onboarding steps into vesting */
function Funnel({ t, on, tr, total, steps }: SceneProps & { total: number; steps: L[] }) {
  return (
    <g>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={120 + i * 250} y={220} width={210} height={200} rx={24} fill="#fff" stroke={t.a} strokeWidth={3} />
          <text x={225 + i * 250} y={460} textAnchor="middle" fontSize={22} fontWeight={700} fill={t.ink} fontFamily={SANS}>{tr(s)}</text>
        </g>
      ))}
      {on && Array.from({ length: 18 }, (_, k) => (
        <motion.circle key={k} r={9} cx={80} fill={k % 3 ? t.a : t.b} cy={300 + ((k * 37) % 60)}
          animate={{ x: [0, 1020], opacity: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: k * 0.22, ease: "linear" }} />
      ))}
      <Count to={total} on={on} suffix="+" x={600} y={150} size={84} fill={t.ink} />
      <Caption x={600} y={190} fill={t.a} anchor="middle">{tr({ en: "investors onboarded", ru: "инвесторов прошли онбординг", zh: "位投资人完成入驻", tr: "yatırımcı onboard edildi", ar: "مستثمرون أنهوا الإعداد" })}</Caption>
      {[0, 1, 2, 3, 4, 5].map((m) => (
        <motion.rect key={m} x={120 + m * 165} y={520} width={150} height={40} rx={10} fill={t.a} initial={false}
          animate={{ opacity: on ? 0.25 + m * 0.13 : 0.1 }} transition={{ delay: on ? 1.2 + m * 0.15 : 0 }} />
      ))}
      <Caption x={120} y={600} fill={t.a}>{tr({ en: "vesting schedule", ru: "график вестинга", zh: "解锁（vesting）计划", tr: "vesting takvimi", ar: "جدول الاستحقاق (Vesting)" })}</Caption>
    </g>
  );
}

/** Token in the centre, utilities orbiting, compliance check */
function TokenOrbit({ t, on, tr, utilities }: SceneProps & { utilities: L[] }) {
  return (
    <g>
      <motion.g animate={on ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "600px 320px" }}>
        <ellipse cx={600} cy={320} rx={400} ry={220} fill="none" stroke={t.soft} strokeWidth={4} strokeDasharray="10 12" />
      </motion.g>
      {on && ["₿", "Ξ", "₮"].map((c, i) => (
        <motion.g key={c} animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: i * -3 }}
          style={{ offsetPath: 'path("M200 320 a400 220 0 1 0 800 0 a400 220 0 1 0 -800 0")', offsetRotate: "0deg" }}>
          <circle r={24} fill={[t.b, t.a, "#26A17B"][i]} />
          <text y={9} textAnchor="middle" fontSize={26} fontWeight={800} fill="#fff" fontFamily={SANS}>{c}</text>
        </motion.g>
      ))}
      {utilities.map((u, i) => {
        const a = (i / utilities.length) * Math.PI * 2 - Math.PI / 2;
        const x = r2(600 + Math.cos(a) * 400);
        const y = r2(320 + Math.sin(a) * 220);
        return (
          <motion.g key={i} initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.5 }} transition={{ delay: on ? 0.3 + i * 0.15 : 0 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <rect x={x - 110} y={y - 34} width={220} height={68} rx={34} fill="#fff" stroke={t.a} strokeWidth={3} />
            <text x={x} y={y + 9} textAnchor="middle" fontSize={22} fontWeight={700} fill={t.ink} fontFamily={SANS}>{tr(u)}</text>
          </motion.g>
        );
      })}
      <motion.g animate={on ? { rotateY: [0, 360] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "600px 320px" }}>
        <circle cx={600} cy={320} r={110} fill={t.a} />
        <circle cx={600} cy={320} r={84} fill="none" stroke="#ffffff66" strokeWidth={6} />
        <text x={600} y={336} textAnchor="middle" fontSize={44} fontWeight={800} fill="#fff" fontFamily={SANS}>TKN</text>
      </motion.g>
    </g>
  );
}

// ── Case → scene ───────────────────────────────────────────────

const SCENES: Record<string, (p: SceneProps) => React.ReactElement> = {
  "micro-1": (p) => <Matrix {...p} total={47} label={{ en: "scenarios", ru: "сценариев", zh: "种场景", tr: "senaryo", ar: "سيناريوهات" }} result={{ en: "0 bugs in production", ru: "0 багов в продакшене", zh: "生产环境 0 个 bug", tr: "production'da 0 hata", ar: "0 أخطاء في الإنتاج" }} />,
  "micro-2": (p) => <Pipeline {...p} steps={[{ en: "Build", ru: "Сборка", zh: "构建", tr: "Derleme", ar: "البناء" }, { en: "Tests", ru: "Тесты", zh: "测试", tr: "Testler", ar: "الاختبارات" }, { en: "Lint", ru: "Линт", zh: "Lint", tr: "Lint", ar: "Lint" }, { en: "Security", ru: "Безопасность", zh: "安全", tr: "Güvenlik", ar: "الأمان" }, { en: "Deploy", ru: "Деплой", zh: "部署", tr: "Dağıtım", ar: "النشر" }]} caught={12} caughtLabel={{ en: "issues caught before users", ru: "проблем поймано до пользователей", zh: "个问题在用户发现前被拦截", tr: "kullanıcılar görmeden yakalanan sorunlar", ar: "مشكلة رُصدت قبل وصولها للمستخدمين" }} />,
  "micro-3": (p) => <BeforeAfter {...p} rows={[{ label: { en: "Developer onboarding", ru: "Адаптация разработчика", zh: "开发者上手", tr: "Geliştirici onboarding'i", ar: "تأهيل المطوّر" }, before: 14, after: 3, unit: { en: " days", ru: " дн.", zh: " 天", tr: " gün", ar: " أيام" }, max: 14, better: "lower" }]} />,
  "micro-4": (p) => <Hub {...p} center={{ en: "dApp", ru: "dApp", zh: "dApp", tr: "dApp", ar: "dApp" }} nodes={["MetaMask", "Rabby", "Coinbase", "Trust", "Rainbow", "OKX", "Phantom", "WalletConnect"]} badge={{ en: "8 providers · 0 errors", ru: "8 провайдеров · 0 ошибок", zh: "8 个服务商 · 0 错误", tr: "8 sağlayıcı · 0 hata", ar: "8 مزوّدين · 0 أخطاء" }} />,
  "micro-5": (p) => <Hub {...p} center={{ en: "RPC", ru: "RPC", zh: "RPC", tr: "RPC", ar: "RPC" }} nodes={["Node A", "Node B", "Node C", "Node D"]} failover badge={{ en: "99.99% uptime · auto failover", ru: "99.99% аптайм · автопереключение", zh: "99.99% 可用性 · 自动故障转移", tr: "%99,99 uptime · otomatik failover", ar: "99.99% وقت تشغيل · تحويل تلقائي عند الأعطال" }} />,
  "micro-6": (p) => <Tree {...p} root={{ en: "Product", ru: "Продукт", zh: "产品", tr: "Ürün", ar: "منتج" }} branches={[{ label: { en: "Onboarding", ru: "Онбординг", zh: "上手引导", tr: "Onboarding", ar: "الإعداد والتأهيل" }, leaves: 3 }, { label: { en: "Catalog", ru: "Каталог", zh: "目录", tr: "Katalog", ar: "الكتالوج" }, leaves: 4 }, { label: { en: "Checkout", ru: "Оформление", zh: "结账", tr: "Ödeme", ar: "إتمام الشراء" }, leaves: 3 }, { label: { en: "Account", ru: "Кабинет", zh: "账户", tr: "Hesap", ar: "الحساب" }, leaves: 2 }]} />,
  "micro-7": (p) => <Languages {...p} langs={[{ code: "EN", hello: "Welcome back", cta: "Continue" }, { code: "RU", hello: "С возвращением", cta: "Продолжить" }, { code: "DE", hello: "Willkommen", cta: "Weiter" }]} />,
  "micro-8": (p) => <Languages {...p} remember langs={[{ code: "RU", hello: "С возвращением", cta: "Продолжить" }, { code: "EN", hello: "Welcome back", cta: "Continue" }]} />,
  "micro-9": (p) => <Growth {...p} values={[100, 102, 101, 106, 112, 115, 121, 123]} badge="+23%" label={{ en: "mobile conversion", ru: "мобильная конверсия", zh: "移动端转化率", tr: "mobil dönüşüm", ar: "التحويل عبر الجوال" }} />,
  "micro-10": (p) => <Pipeline {...p} steps={[{ en: "Tag", ru: "Тег", zh: "标签", tr: "Etiket", ar: "وسم" }, { en: "Build", ru: "Сборка", zh: "构建", tr: "Derleme", ar: "البناء" }, { en: "Artifact", ru: "Артефакт", zh: "交付物", tr: "Çıktı", ar: "الملف" }, { en: "Deploy", ru: "Деплой", zh: "部署", tr: "Dağıtım", ar: "النشر" }]} finish={{ en: "any version in < 5 min", ru: "любая версия за < 5 мин", zh: "任意版本 5 分钟内回滚", tr: "herhangi bir sürüm < 5 dk'da", ar: "أي إصدار خلال أقل من 5 دقائق" }} />,
  "micro-11": (p) => <Matrix {...p} total={36} flaky={[4, 11, 19, 27, 33]} label={{ en: "checks", ru: "проверок", zh: "项检查", tr: "kontrol", ar: "فحوصات" }} result={{ en: "no false positives", ru: "без ложных срабатываний", zh: "无误报", tr: "yanlış pozitif yok", ar: "دون نتائج إيجابية كاذبة" }} />,
  "micro-12": (p) => <Hub {...p} center={{ en: "KYC layer", ru: "KYC-слой", zh: "KYC 层", tr: "KYC katmanı", ar: "طبقة KYC" }} nodes={["Provider A", "Provider B", "Provider C", "Provider D"]} failover badge={{ en: "switch providers without code", ru: "смена провайдера без кода", zh: "无需改代码即可切换服务商", tr: "kod yazmadan sağlayıcı değiştirin", ar: "تبديل المزوّدين دون تعديل الشيفرة" }} />,
  "micro-13": (p) => <Funnel {...p} total={800} steps={[{ en: "Sign-up", ru: "Регистрация", zh: "注册", tr: "Kayıt", ar: "التسجيل" }, { en: "KYC", ru: "KYC", zh: "KYC", tr: "KYC", ar: "KYC" }, { en: "Allocation", ru: "Аллокация", zh: "分配", tr: "Tahsis", ar: "التخصيص" }, { en: "Vesting", ru: "Вестинг", zh: "解锁期", tr: "Vesting", ar: "الاستحقاق" }]} />,
  "micro-14": (p) => <Access {...p} badge={{ en: "SOC 2 ✓", ru: "SOC 2 ✓", zh: "SOC 2 ✓", tr: "SOC 2 ✓", ar: "SOC 2 ✓" }} />,
  "micro-15": (p) => <TokenOrbit {...p} utilities={[{ en: "Access", ru: "Доступ", zh: "访问权限", tr: "Erişim", ar: "الوصول" }, { en: "Discounts", ru: "Скидки", zh: "折扣", tr: "İndirimler", ar: "الخصومات" }, { en: "Governance", ru: "Голосование", zh: "治理投票", tr: "Yönetişim", ar: "الحوكمة" }, { en: "Rewards", ru: "Бонусы", zh: "奖励", tr: "Ödüller", ar: "المكافآت" }, { en: "Compliance ✓", ru: "Compliance ✓", zh: "合规 ✓", tr: "Uyumluluk ✓", ar: "الامتثال ✓" }]} />,
  "micro-16": (p) => <Morph {...p} title={{ en: "legal-safe staking copy", ru: "юридически безопасные формулировки", zh: "合规安全的质押文案", tr: "hukuken güvenli staking metni", ar: "صياغة قانونية آمنة لخدمة التخزين" }} pairs={[[{ en: "earn interest", ru: "получайте проценты", zh: "赚取利息", tr: "faiz kazan", ar: "اكسب فائدة" }, { en: "lock for benefits", ru: "блокируйте ради бенефитов", zh: "锁仓换权益", tr: "avantajlar için kilitle", ar: "اقفل مقابل مزايا" }], [{ en: "guaranteed APY", ru: "гарантированный доход", zh: "保证 APY", tr: "garantili APY", ar: "عائد سنوي مضمون" }, { en: "benefits while locked", ru: "бенефиты на время блокировки", zh: "锁仓期间享权益", tr: "kilitliyken avantajlar", ar: "مزايا أثناء القفل" }], [{ en: "passive income", ru: "пассивный доход", zh: "被动收入", tr: "pasif gelir", ar: "دخل سلبي" }, { en: "member perks", ru: "привилегии участника", zh: "会员专属权益", tr: "üye ayrıcalıkları", ar: "مزايا الأعضاء" }]]} />,
  "micro-17": (p) => <Gauge {...p} value={90} label={{ en: "tasks solved without devs", ru: "задач без разработчиков", zh: "项任务无需开发即可解决", tr: "geliştirici olmadan çözülen görevler", ar: "مهام تُنجَز دون مطوّرين" }} side={[{ en: "Users & roles", ru: "Пользователи и роли", zh: "用户与角色", tr: "Kullanıcılar ve roller", ar: "المستخدمون والأدوار" }, { en: "Content & banners", ru: "Контент и баннеры", zh: "内容与横幅", tr: "İçerik ve bannerlar", ar: "المحتوى واللافتات" }, { en: "Reports & export", ru: "Отчёты и выгрузки", zh: "报表与导出", tr: "Raporlar ve dışa aktarma", ar: "التقارير والتصدير" }]} />,
  "micro-18": (p) => <Pipeline {...p} steps={[{ en: "Event", ru: "Событие", zh: "事件", tr: "Olay", ar: "الحدث" }, { en: "Schema", ru: "Схема", zh: "Schema", tr: "Şema", ar: "المخطط" }, { en: "Pipeline", ru: "Пайплайн", zh: "流水线", tr: "Hat", ar: "المسار" }, { en: "Dashboard", ru: "Дашборд", zh: "看板", tr: "Panel", ar: "لوحة المعلومات" }]} finish={{ en: "actionable from day one", ru: "данные с первого дня", zh: "第一天起就能指导行动", tr: "ilk günden uygulanabilir", ar: "جاهزة للتنفيذ من اليوم الأول" }} />,
  "micro-19": (p) => <BeforeAfter {...p} rows={[{ label: { en: "No-shows", ru: "Неявки", zh: "爽约", tr: "Gelmeyenler", ar: "عدم الحضور" }, before: 32, after: 8, unit: { en: "%", ru: "%", zh: "%", tr: "%", ar: "%" }, max: 32, better: "lower" }, { label: { en: "Chargebacks", ru: "Чарджбэки", zh: "拒付", tr: "Ters ibrazlar", ar: "الاسترجاعات (Chargebacks)" }, before: 100, after: 10, unit: { en: "%", ru: "%", zh: "%", tr: "%", ar: "%" }, max: 100, better: "lower" }]} />,
  "micro-20": (p) => <Milestones {...p} items={[{ en: "Scope", ru: "Объём", zh: "范围", tr: "Kapsam", ar: "النطاق" }, { en: "Change req.", ru: "Запрос", zh: "变更请求", tr: "Değişiklik talebi", ar: "طلب تغيير" }, { en: "Estimate", ru: "Оценка", zh: "估算", tr: "Tahmin", ar: "التقدير" }, { en: "Approved", ru: "Одобрено", zh: "已批准", tr: "Onaylandı", ar: "معتمد" }, { en: "Logged", ru: "В журнале", zh: "已记录", tr: "Kaydedildi", ar: "مسجّل" }]} />,
  "micro-21": (p) => <Weeks {...p} weeks={6} item={{ en: "Demo", ru: "Демо", zh: "演示", tr: "Demo", ar: "عرض تجريبي" }} label={{ en: "every week — demo + recording", ru: "каждую неделю — демо и запись", zh: "每周一次——演示 + 录屏", tr: "her hafta — demo + kayıt", ar: "كل أسبوع — عرض تجريبي + تسجيل" }} />,
  "micro-22": (p) => <Slides {...p} items={[{ en: "Problem", ru: "Проблема", zh: "问题", tr: "Sorun", ar: "المشكلة" }, { en: "Solution", ru: "Решение", zh: "解决方案", tr: "Çözüm", ar: "الحل" }, { en: "Market", ru: "Рынок", zh: "市场", tr: "Pazar", ar: "السوق" }, { en: "Traction", ru: "Трекшн", zh: "增长数据", tr: "Traction", ar: "الزخم" }, { en: "Ask", ru: "Раунд", zh: "融资需求", tr: "Talep", ar: "الطلب" }]} />,
  "micro-23": (p) => <Milestones {...p} items={[{ en: "Architecture", ru: "Архитектура", zh: "架构", tr: "Mimari", ar: "البنية المعمارية" }, { en: "Security", ru: "Безопасность", zh: "安全", tr: "Güvenlik", ar: "الأمان" }, { en: "Data", ru: "Данные", zh: "数据", tr: "Veri", ar: "البيانات" }, { en: "DD done · 3 days", ru: "DD за 3 дня", zh: "3 天完成尽调", tr: "DD tamam · 3 gün", ar: "اكتمل الفحص النافي للجهالة · 3 أيام" }]} />,
  "micro-24": (p) => <Contract {...p} />,
  "micro-25": (p) => <Latency {...p} p95={180} />,
  "micro-26": (p) => <HexZoom {...p} />,
  "micro-27": (p) => <Hub {...p} center={{ en: "Public API", ru: "Публичный API", zh: "公开 API", tr: "Public API", ar: "API عام" }} nodes={["GET /rates", "GET /stats", "GET /assets"]} many={50} badge={{ en: "50+ integrations · read-only", ru: "50+ интеграций · только чтение", zh: "50+ 集成 · 只读", tr: "50+ entegrasyon · salt okunur", ar: "50+ تكاملًا · للقراءة فقط" }} />,
  "micro-28": (p) => <Morph {...p} title={{ en: "engineering → founder voice", ru: "инженерный язык → голос основателя", zh: "工程语言 → 创始人的表达", tr: "mühendislik → kurucu dili", ar: "من لغة الهندسة إلى لغة المؤسس" }} pairs={[[{ en: "sharded Postgres with read replicas", ru: "шардированный Postgres с репликами", zh: "带只读副本的分片 Postgres", tr: "read replica'lı shard'lanmış Postgres", ar: "Postgres موزّع (sharded) مع نسخ قراءة" }, { en: "it stays fast as you grow", ru: "работает быстро при любом росте", zh: "业务增长，速度依旧", tr: "büyürken de hızlı kalır", ar: "يبقى سريعًا مع نموّك" }], [{ en: "idempotent payment webhooks", ru: "идемпотентные вебхуки платежей", zh: "幂等的支付 webhook", tr: "idempotent ödeme webhook'ları", ar: "Webhooks دفع متكررة الأمان (idempotent)" }, { en: "no customer is charged twice", ru: "клиент не заплатит дважды", zh: "绝不会向客户重复扣款", tr: "hiçbir müşteriden iki kez çekim yapılmaz", ar: "لا يُخصم من أي عميل مرتين" }]]} />,
  "micro-29": (p) => <Redact {...p} stamp={{ en: "NDA · IP protected", ru: "NDA · IP защищён", zh: "NDA · IP 受保护", tr: "NDA · IP korumalı", ar: "NDA · حماية الملكية الفكرية" }} />,
  "micro-30": (p) => <Milestones {...p} items={[{ en: "Discovery", ru: "Discovery", zh: "需求调研", tr: "Keşif", ar: "الاستكشاف" }, { en: "Design", ru: "Дизайн", zh: "设计", tr: "Tasarım", ar: "التصميم" }, { en: "MVP", ru: "MVP", zh: "MVP", tr: "MVP", ar: "MVP" }, { en: "Launch", ru: "Запуск", zh: "上线", tr: "Lansman", ar: "الإطلاق" }, { en: "Support", ru: "Поддержка", zh: "支持", tr: "Destek", ar: "الدعم" }]} />,
};

export function hasMicroVisual(id: string) {
  return id in SCENES;
}

export function MicroVisual({ id, category }: { id: string; category: CaseCategory }) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const Scene = SCENES[id];
  if (!Scene) return null;
  const t = THEMES[category];
  const tr = (l: L) => pick(l, language);
  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl border border-border shadow-[0_40px_80px_-50px_rgba(10,10,10,0.35)]" style={{ background: t.bg }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: `radial-gradient(${t.a}22 1.5px, transparent 1.5px)`, backgroundSize: "28px 28px" }}
      />
      <svg viewBox="0 0 1200 640" className="relative block h-auto w-full" role="img" aria-label={pick({ en: "Animated illustration of the result", ru: "Анимированная иллюстрация результата", zh: "成果的动画示意图", tr: "Sonucun animasyonlu illüstrasyonu", ar: "رسم متحرك يوضح النتيجة" }, language)}>
        <Scene t={t} on={reduced ? true : inView} tr={tr} />
      </svg>
    </div>
  );
}
