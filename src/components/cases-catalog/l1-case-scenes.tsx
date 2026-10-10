"use client";

import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

// "How it works" block for the L1 case: each idea from the case study told as a
// small looping scene drawn in code (no product screenshots). Every scene ticks
// only while it is on screen; with reduced motion it shows its final frame.

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const r2 = (n: number) => Math.round(n * 100) / 100;

function useTicker(ms: number, active: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [ms, active]);
  return tick;
}

/** Runs while the element is in view and motion is allowed */
function useRun<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();
  return { ref, run: inView && !reduced, reduced };
}

function Counter({ to, run, format }: { to: number; run: boolean; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !run || done.current) return;
    done.current = true;
    const c = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => (el.textContent = format(v)),
    });
    return () => c.stop();
  }, [run, to, format]);
  return <span ref={ref}>{format(to)}</span>;
}

/* ───────────────────────── 1. Final in ~0.2 s ───────────────────────── */

const VALIDATORS = 7;
const CX = 160;
const CY = 100;
const VAL_POS = Array.from({ length: VALIDATORS }, (_, i) => {
  const a = -Math.PI / 2 + (i / VALIDATORS) * Math.PI * 2;
  return { x: r2(CX + Math.cos(a) * 80), y: r2(CY + Math.sin(a) * 80) };
});
const FIN_MS = [0, 30, 70, 110, 140, 170, 200, 200];
const BASE_HEIGHT = 1_284_310;
const fmtHeight = (n: number) => n.toLocaleString("ru-RU").replace(/ /g, " ");

function FinalityScene({ en }: { en: boolean }) {
  const { ref, run } = useRun<HTMLDivElement>();
  const tick = useTicker(430, run);
  const c = run ? tick % 8 : 6;
  const cycle = Math.floor(tick / 8);
  const sealed = c >= 2;
  const votes = c >= 3 ? Math.min(VALIDATORS, (c - 2) * 2 + 1) : 0;
  const final = c >= 6;
  const height = BASE_HEIGHT + cycle + (final ? 1 : 0);
  const chain = Array.from({ length: 5 }, (_, i) => height - 4 + i);
  const ring = 2 * Math.PI * 30;

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">{en ? "time to final" : "до окончательной записи"}</p>
          <p className={`font-mono text-4xl font-semibold tabular-nums transition-colors duration-300 ${final ? "text-emerald-300" : "text-white"}`}>
            {(FIN_MS[c] / 1000).toFixed(2)}
            <span className="ml-1 text-xl text-white/50">{en ? "s" : "с"}</span>
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
          {en ? "slowed ×10" : "замедлено ×10"}
        </span>
      </div>

      <svg viewBox="0 0 320 200" className="w-full" aria-hidden="true">
        <defs>
          <radialGradient id="l1s-fin-glow">
            <stop offset="0%" stopColor={final ? "#34D399" : "#8B5CF6"} stopOpacity="0.45" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r="70" fill="url(#l1s-fin-glow)" />

        {/* proposal lines out to every validator */}
        {VAL_POS.map((v, i) => (
          <motion.line
            key={`ln${i}`}
            x1={CX}
            y1={CY}
            x2={v.x}
            y2={v.y}
            stroke={i < votes ? "#34D399" : "#A78BFA"}
            strokeWidth="1.2"
            initial={false}
            animate={{ pathLength: sealed ? 1 : 0, opacity: sealed ? 0.7 : 0 }}
            transition={{
              duration: 0.35,
              delay: sealed && c === 2 ? i * 0.03 : 0,
            }}
          />
        ))}

        {/* incoming orders */}
        {c < 2 &&
          Array.from({ length: 6 }, (_, k) => (
            <motion.g
              key={`o${cycle}-${k}`}
              initial={{ x: 6, y: 30 + k * 28, opacity: 0 }}
              animate={{ x: CX, y: CY, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.7, delay: k * 0.07, ease: "easeIn" }}
            >
              <circle r="3.2" fill={k % 2 ? "#F472B6" : "#60A5FA"} />
            </motion.g>
          ))}

        {/* votes flying back */}
        {c >= 3 &&
          c < 6 &&
          VAL_POS.slice(0, votes).map((v, i) => (
            <motion.g key={`v${cycle}-${i}`} initial={{ x: v.x, y: v.y, opacity: 1 }} animate={{ x: CX, y: CY, opacity: 0 }} transition={{ duration: 0.45, ease: "easeIn" }}>
              <circle r="2.6" fill="#6EE7B7" />
            </motion.g>
          ))}

        {/* validators */}
        {VAL_POS.map((v, i) => {
          const voted = i < votes;
          return (
            <g key={`n${i}`}>
              {voted && !final && (
                <motion.circle
                  key={`p${cycle}`}
                  cx={v.x}
                  cy={v.y}
                  r="11"
                  fill="none"
                  stroke="#34D399"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.9, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <circle
                cx={v.x}
                cy={v.y}
                r="11"
                fill={voted ? "#065F46" : "#1E1B4B"}
                stroke={voted ? "#34D399" : "#ffffff30"}
                strokeWidth="1.2"
                className="transition-[fill,stroke] duration-300"
              />
              <text x={v.x} y={r2(v.y + 3.5)} textAnchor="middle" fontSize="9" fontWeight="700" fill={voted ? "#A7F3D0" : "#ffffff70"} fontFamily="ui-monospace, monospace">
                {voted ? "✓" : `V${i + 1}`}
              </text>
            </g>
          );
        })}

        {/* agreement ring: fills up to the 2/3 threshold and beyond */}
        <circle cx={CX} cy={CY} r="30" fill="none" stroke="#ffffff14" strokeWidth="4" />
        <circle
          cx={CX}
          cy={CY}
          r="30"
          fill="none"
          stroke={votes >= 5 ? "#34D399" : "#A78BFA"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={r2(ring)}
          strokeDashoffset={r2(ring * (1 - votes / VALIDATORS))}
          transform={`rotate(-90 ${CX} ${CY})`}
          className="transition-[stroke-dashoffset,stroke] duration-300"
        />
        <rect x={CX - 20} y={CY - 20} width="40" height="40" rx="10" fill={final ? "#10B981" : sealed ? "#6D28D9" : "#272150"} className="transition-[fill] duration-300" />
        <text x={CX} y={CY + 5} textAnchor="middle" fontSize={final ? 18 : 12} fontWeight="700" fill="#fff" fontFamily="ui-monospace, monospace">
          {final ? "✓" : sealed ? `${votes}/7` : "•••"}
        </text>

        {final && (
          <motion.circle
            key={`f${cycle}`}
            cx={CX}
            cy={CY}
            r="30"
            fill="none"
            stroke="#34D399"
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0.9 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        )}
      </svg>

      {/* the chain grows by one block each round */}
      <div className="mt-2 flex items-center gap-2 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {chain.map((h, i) => {
            const newest = i === chain.length - 1;
            return (
              <motion.div
                key={h}
                layout
                initial={{ opacity: 0, x: 30, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={`${i < 2 ? "hidden sm:flex" : "flex"} min-w-0 flex-1 flex-col rounded-lg border px-2 py-1.5 font-mono ${newest && final ? "border-emerald-400/60 bg-emerald-400/15 shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]" : "border-white/10 bg-white/[0.04]"}`}
              >
                <span className="truncate text-[10px] text-white/40">#{fmtHeight(h)}</span>
                <span className={`text-[11px] ${newest && final ? "text-emerald-200" : "text-white/60"}`}>🔒 {en ? "final" : "навсегда"}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────────────────── 2. No cutting in line ───────────────────────── */

type Who = "you" | "buyer" | "bot";
const WHO_STYLE: Record<Who, string> = {
  you: "border-indigo-400/50 bg-indigo-500/25 text-indigo-100",
  buyer: "border-white/15 bg-white/10 text-white/80",
  bot: "border-rose-400/50 bg-rose-500/25 text-rose-100",
};

function FairOrderScene({ en }: { en: boolean }) {
  const { ref, run } = useRun<HTMLDivElement>();
  const tick = useTicker(750, run);
  const c = run ? tick % 7 : 4;
  const cycle = Math.floor(tick / 7);
  const label: Record<Who, string> = {
    you: en ? "You" : "Вы",
    buyer: en ? "Buyer" : "Покупатель",
    bot: en ? "Bot" : "Бот",
  };
  const icon: Record<Who, string> = { you: "🙂", buyer: "👤", bot: "🤖" };

  // Ordinary exchange: the bot spots your order and slips in front of it
  const queue: Who[] = c >= 2 ? ["buyer", "bot", "you"] : ["buyer", "you"];
  const slipped = c >= 3;

  // Here: everything goes into one sealed batch and clears at one price
  const inBatch: Who[] = (["buyer", "you", "bot"] as Who[]).slice(0, Math.min(3, c + 1));
  const opened = c >= 3;

  const bars = [
    {
      k: "old",
      l: en ? "Ordinary exchange" : "Обычная биржа",
      v: slipped ? "$180" : "$0",
      w: slipped ? "100%" : "4%",
      cls: "bg-gradient-to-r from-rose-500 to-orange-400",
    },
    {
      k: "new",
      l: en ? "This network" : "Эта сеть",
      v: "$0",
      w: "4%",
      cls: "bg-gradient-to-r from-emerald-400 to-cyan-300",
    },
  ];

  return (
    <div ref={ref} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {/* ordinary exchange */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/45">{en ? "Ordinary exchange" : "Обычная биржа"}</p>
          <ul className="space-y-1.5">
            <AnimatePresence initial={false}>
              {queue.map((w) => (
                <motion.li
                  key={`${w}-${cycle}`}
                  layout
                  initial={w === "bot" ? { opacity: 0, x: 40, scale: 0.9 } : false}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[12px] ${WHO_STYLE[w]}`}
                >
                  <span>
                    {icon[w]} {label[w]}
                  </span>
                  {w === "you" && (
                    <span className={`font-mono tabular-nums transition-colors ${slipped ? "text-rose-300" : "text-white/70"}`}>{slipped ? "$64 380" : "$64 200"}</span>
                  )}
                  {w === "bot" && <span className="font-mono text-[10px] text-rose-200/80">{en ? "jumped in" : "влез"}</span>}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-3 h-9">
            <AnimatePresence mode="wait">
              {c === 1 && (
                <motion.p key="eye" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[12px] text-amber-200/90">
                  👀 {en ? "A bot sees your order…" : "Бот видит вашу заявку…"}
                </motion.p>
              )}
              {slipped && (
                <motion.p key="loss" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[12px] text-rose-300">
                  {en ? "…and you overpay $180" : "…и вы переплатили $180"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* here */}
        <div
          className={`relative rounded-2xl border p-3 transition-colors duration-500 ${opened ? "border-emerald-400/40 bg-emerald-400/[0.06]" : "border-violet-400/30 bg-violet-500/[0.06]"}`}
        >
          <p className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/45">
            <span>{en ? "This network" : "Эта сеть"}</span>
            <span>
              {opened ? "🔓" : "🔒"} {en ? "batch" : "пачка"}
            </span>
          </p>
          <ul className="min-h-[106px] space-y-1.5">
            <AnimatePresence initial={false}>
              {inBatch.map((w) => (
                <motion.li
                  key={`${w}-${cycle}`}
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[12px] transition-colors duration-500 ${opened ? WHO_STYLE[w] : "border-white/10 bg-white/[0.06] text-white/50"}`}
                >
                  <span className={opened ? "" : "blur-[3px]"}>
                    {icon[w]} {label[w]}
                  </span>
                  <span className="font-mono tabular-nums">{opened ? <span className="text-emerald-300">$64 200 ✓</span> : "•••"}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-3 h-9">
            <AnimatePresence mode="wait">
              {opened ? (
                <motion.p key="fair" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[12px] text-emerald-200">
                  {en ? "One price for everyone — the bot gains nothing" : "Одна цена для всех — бот ничего не выиграл"}
                </motion.p>
              ) : (
                <motion.p key="hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[12px] text-white/50">
                  {en ? "Orders are sealed until the batch clears" : "Заявки запечатаны до исполнения пачки"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* what it cost you */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/45">{en ? "Your overpayment" : "Ваша переплата"}</p>
        <div className="space-y-2.5">
          {bars.map((b) => (
            <div key={b.k} className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3 text-[12px]">
              <span className="text-white/60">{b.l}</span>
              <span className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <span className={`block h-full rounded-full transition-[width] duration-700 ease-out ${b.cls}`} style={{ width: b.w }} />
              </span>
              <span className={`text-right font-mono tabular-nums ${b.k === "old" && slipped ? "text-rose-300" : "text-emerald-300"}`}>{b.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 3. Private, yet provable ───────────────────────── */

const HEX = "0123456789abcdef";
const SEALED_AMOUNT = "0x9f3a…c41e";
const SEALED_PRICE = "0x2b7d…08fa";

function scramble(len: number) {
  let s = "0x";
  for (let i = 0; i < len; i++) s += HEX[Math.floor(Math.random() * 16)];
  return s;
}

function PrivacyScene({ en }: { en: boolean }) {
  const { ref, run } = useRun<HTMLDivElement>();
  const tick = useTicker(1000, run);
  const phase = run ? tick % 5 : 3; // 0 plain · 1 encrypting · 2–4 sealed + proofs
  const [noise, setNoise] = useState(["", ""]);

  useEffect(() => {
    if (phase !== 1) return;
    const id = window.setInterval(() => setNoise([scramble(8), scramble(8)]), 55);
    return () => window.clearInterval(id);
  }, [phase]);

  const amount = phase === 0 ? "120 BTC" : phase === 1 ? noise[0] || SEALED_AMOUNT : SEALED_AMOUNT;
  const price = phase === 0 ? (en ? "market" : "по рынку") : phase === 1 ? noise[1] || SEALED_PRICE : SEALED_PRICE;
  const checks = [
    { t: en ? "Enough funds" : "Средств достаточно", at: 2 },
    { t: en ? "Signature valid" : "Подпись верна", at: 2 },
    { t: en ? "Trade is correct" : "Сделка корректна", at: 3 },
  ];

  return (
    <div ref={ref} className="space-y-3">
      <div
        className={`relative overflow-hidden rounded-2xl border p-4 transition-colors duration-500 ${phase >= 2 ? "border-cyan-300/40 bg-cyan-400/[0.06]" : "border-white/10 bg-white/[0.04]"}`}
      >
        {phase === 1 && <span aria-hidden="true" className="l1s-scan pointer-events-none absolute inset-y-0 w-1/3" />}
        <p className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/45">
          <span>{en ? "Large order" : "Крупная заявка"}</span>
          <span className="transition-opacity">{phase >= 1 ? "🔒" : "🔓"}</span>
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[13px]">
          <dt className="text-white/45">{en ? "side" : "действие"}</dt>
          <dd className="text-emerald-300">{en ? "Buy" : "Купить"}</dd>
          <dt className="text-white/45">{en ? "amount" : "объём"}</dt>
          <dd className={`truncate tabular-nums ${phase >= 1 ? "text-cyan-200" : "text-white"}`}>{amount}</dd>
          <dt className="text-white/45">{en ? "price" : "цена"}</dt>
          <dd className={`truncate tabular-nums ${phase >= 1 ? "text-cyan-200" : "text-white"}`}>{price}</dd>
        </dl>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-white/45">{en ? "The network checks — without looking" : "Сеть проверяет — не подглядывая"}</p>
        <ul className="space-y-1.5">
          {checks.map((k) => {
            const ok = phase >= k.at;
            return (
              <li key={k.t} className="flex items-center gap-2 text-[13px]">
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[11px] transition-all duration-500 ${ok ? "scale-100 bg-emerald-400 text-[#06060B]" : "scale-75 bg-white/10 text-transparent"}`}
                >
                  ✓
                </span>
                <span className={`transition-colors duration-500 ${ok ? "text-white/90" : "text-white/35"}`}>{k.t}</span>
              </li>
            );
          })}
        </ul>
        <p className={`mt-3 text-[12px] transition-opacity duration-500 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
          <span className="text-white/45">{en ? "The market sees:" : "Рынок видит:"}</span> <span className="font-mono text-white/80">{en ? "Buy" : "Купить"} ██████ BTC</span>
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── 4. A whole platform ───────────────────────── */

const APPS = [
  { x: 62, y: 40, icon: "📈", en: "Trading", ru: "Торговля" },
  { x: 258, y: 40, icon: "🔍", en: "Explorer", ru: "Обозреватель" },
  { x: 62, y: 170, icon: "🛠", en: "Control panel", ru: "Панель сети" },
  { x: 258, y: 170, icon: "💧", en: "Faucet", ru: "Кран токенов" },
];
const CORE = { x: 160, y: 105 };
const HEX_PTS = Array.from({ length: 6 }, (_, i) => {
  const a = Math.PI / 6 + (i * Math.PI) / 3;
  return `${r2(CORE.x + Math.cos(a) * 38)},${r2(CORE.y + Math.sin(a) * 38)}`;
}).join(" ");

function PlatformScene({ en }: { en: boolean }) {
  const reduced = useReducedMotion();
  const sdks = ["TypeScript", "Python", "Rust"];
  return (
    <div>
      <svg viewBox="0 0 320 210" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id="l1s-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        {APPS.map((a, i) => (
          <g key={a.en}>
            <line x1={CORE.x} y1={CORE.y} x2={a.x} y2={a.y} stroke="#A78BFA" strokeOpacity="0.5" strokeWidth="1.2" className={reduced ? undefined : "l1s-flow"} />
            {!reduced && (
              <>
                <circle r="3" fill="#F0ABFC">
                  <animateMotion dur="1.8s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={`M${CORE.x},${CORE.y} L${a.x},${a.y}`} />
                </circle>
                <circle r="2.4" fill="#67E8F9">
                  <animateMotion dur="2.2s" begin={`${0.9 + i * 0.4}s`} repeatCount="indefinite" path={`M${a.x},${a.y} L${CORE.x},${CORE.y}`} />
                </circle>
              </>
            )}
          </g>
        ))}

        <g className={reduced ? undefined : "l1s-core"}>
          <polygon points={HEX_PTS} fill="url(#l1s-core)" />
          <polygon points={HEX_PTS} fill="none" stroke="#fff" strokeOpacity="0.35" />
        </g>
        <text x={CORE.x} y={CORE.y - 3} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
          {en ? "Blockchain" : "Блокчейн"}
        </text>
        <text x={CORE.x} y={CORE.y + 10} textAnchor="middle" fontSize="9" fill="#ffffffcc">
          {en ? "+ exchange" : "+ биржа"}
        </text>

        {APPS.map((a) => (
          <g key={`card-${a.en}`}>
            <rect x={a.x - 57} y={a.y - 17} width="114" height="34" rx="10" fill="#141128" stroke="#ffffff26" />
            <text x={a.x - 47} y={a.y + 4.5} fontSize="12">
              {a.icon}
            </text>
            <text x={a.x - 30} y={a.y + 4} fontSize="10" fill="#ffffffd9">
              {en ? a.en : a.ru}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">{en ? "dev kits" : "наборы для разработчиков"}</span>
        {sdks.map((s, i) => (
          <span
            key={s}
            className="l1s-chip rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-white/80"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── 5. Test run ───────────────────────── */

const CELLS = 180;

function TestRun({ en }: { en: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const started = seen || reduced;
  const ru = (n: number) => Math.round(n).toLocaleString("ru-RU").replace(/ /g, " ");
  const enf = (n: number) => Math.round(n).toLocaleString("en-US");
  const fmt = en ? enf : ru;

  const stats = [
    { to: 450000, suffix: "+", l: en ? "lines of code" : "строк кода" },
    { to: 8850, suffix: "+", l: en ? "automated tests" : "автотестов" },
    {
      to: 49,
      suffix: " / 49",
      l: en ? "audit findings fixed" : "замечаний аудита закрыто",
    },
    { to: 13, suffix: "", l: en ? "order types" : "типов ордеров" },
  ];

  return (
    <div ref={ref} className={`grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center ${started ? "l1s-run" : ""}`}>
      <div>
        <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-white/50">
          <span>$ {en ? "run all tests" : "запуск всех тестов"}</span>
          <span className={`transition-colors duration-700 ${started ? "text-emerald-300" : ""}`}>{started ? (en ? "all passed" : "все прошли") : "…"}</span>
        </div>
        <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] gap-[3px]">
          {Array.from({ length: CELLS }, (_, i) => (
            <span key={i} className="l1s-cell aspect-square rounded-[2px]" style={{ animationDelay: `${((i * 37) % CELLS) * 9}ms` }} />
          ))}
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <dt className="sr-only">{s.l}</dt>
            <dd>
              <span className="block font-brand text-2xl font-semibold tabular-nums md:text-3xl">
                <Counter to={s.to} run={started} format={(n) => `${fmt(n)}${s.suffix}`} />
              </span>
              <span className="mt-1 block text-body-sm text-white/55">{s.l}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

function SceneCard({ n, title, text, children, className = "" }: { n: string; title: string; text: string; children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`l1s-card relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7 ${className}`}
    >
      <div className="mb-5 flex items-start gap-4">
        <span className="font-mono text-[11px] text-fuchsia-300/80">{n}</span>
        <div>
          <h3 className="font-brand text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
          <p className="mt-1.5 max-w-md text-body-sm text-white/55">{text}</p>
        </div>
      </div>
      {children}
    </motion.article>
  );
}

export function L1CaseScenes({ en }: { en: boolean }) {
  return (
    <section id="case-how" className="relative isolate overflow-hidden bg-[#06060B] py-20 text-white md:py-28">
      <div aria-hidden="true" className="home-aurora home-aurora--violet pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="font-mono text-caption uppercase tracking-[0.2em] text-fuchsia-300/80">{en ? "How it works" : "Как это устроено"}</p>
          <h2 className="mt-4 font-brand text-3xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
            {en ? (
              <>
                Four ideas the <span className="home-gradient-text">exchange</span> stands on
              </>
            ) : (
              <>
                Четыре идеи, на которых держится <span className="home-gradient-text">биржа</span>
              </>
            )}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <SceneCard
            n="01"
            title={en ? "Final in ~0.2 seconds" : "Окончательно за ~0,2 секунды"}
            text={
              en
                ? "Orders gather into a small batch, the network’s validators agree on it — and the block is written for good. No “pending”, no rollbacks."
                : "Заявки собираются в пачку, валидаторы сети соглашаются — и блок записан навсегда. Без «в обработке» и без откатов."
            }
          >
            <FinalityScene en={en} />
          </SceneCard>
          <SceneCard
            n="02"
            title={en ? "Nobody cuts in line" : "Никто не влезает без очереди"}
            text={
              en
                ? "On a usual exchange a bot can see your order and jump ahead of it. Here orders are sealed and filled together — at one fair price."
                : "На обычной бирже бот видит вашу заявку и встаёт перед ней. Здесь заявки запечатаны и исполняются вместе — по одной честной цене."
            }
          >
            <FairOrderScene en={en} />
          </SceneCard>
          <SceneCard
            n="03"
            title={en ? "Private, yet provable" : "Приватно, но проверяемо"}
            text={
              en
                ? "A big trader hides the size of an order, and the network still proves the trade is valid — without seeing its details."
                : "Крупный трейдер скрывает размер заявки, а сеть всё равно доказывает, что сделка честная, — не видя её деталей."
            }
          >
            <PrivacyScene en={en} />
          </SceneCard>
          <SceneCard
            n="04"
            title={en ? "A whole platform, not just an exchange" : "Целая платформа, а не только биржа"}
            text={
              en
                ? "Four apps share one network, and developer kits let others build their own products on it."
                : "Четыре приложения работают на одной сети, а наборы для разработчиков позволяют другим строить на ней свои продукты."
            }
          >
            <PlatformScene en={en} />
          </SceneCard>
          <SceneCard
            n="05"
            className="lg:col-span-2"
            title={en ? "Checked by thousands of tests" : "Проверено тысячами тестов"}
            text={
              en
                ? "Every rule of the exchange and the network is covered by automated tests that run on each change."
                : "Каждое правило биржи и сети покрыто автотестами, которые запускаются при каждом изменении."
            }
          >
            <TestRun en={en} />
          </SceneCard>
        </div>
      </div>
    </section>
  );
}
