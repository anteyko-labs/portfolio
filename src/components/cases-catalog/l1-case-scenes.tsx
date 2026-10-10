"use client";

import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import { INTL_LOCALE, pick, type Language } from "@/lib/i18n-text";

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

function FinalityScene({ language }: { language: Language }) {
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
          <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">{pick({ en: "time to final", ru: "до окончательной записи", zh: "最终确认耗时", tr: "kesinleşme süresi", ar: "الزمن حتى الحسم النهائي" }, language)}</p>
          <p className={`font-mono text-4xl font-semibold tabular-nums transition-colors duration-300 ${final ? "text-emerald-300" : "text-white"}`}>
            {(FIN_MS[c] / 1000).toFixed(2)}
            <span className="ml-1 text-xl text-white/50">{pick({ en: "s", ru: "с", zh: "秒", tr: "sn", ar: "ث" }, language)}</span>
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
          {pick({ en: "slowed ×10", ru: "замедлено ×10", zh: "已放慢 ×10", tr: "×10 yavaşlatıldı", ar: "مبطّأ ×10" }, language)}
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
                <span className={`text-[11px] ${newest && final ? "text-emerald-200" : "text-white/60"}`}>🔒 {pick({ en: "final", ru: "навсегда", zh: "已最终确认", tr: "kesinleşti", ar: "نهائي" }, language)}</span>
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

function FairOrderScene({ language }: { language: Language }) {
  const { ref, run } = useRun<HTMLDivElement>();
  const tick = useTicker(750, run);
  const c = run ? tick % 7 : 4;
  const cycle = Math.floor(tick / 7);
  const label: Record<Who, string> = {
    you: pick({ en: "You", ru: "Вы", zh: "您", tr: "Siz", ar: "أنت" }, language),
    buyer: pick({ en: "Buyer", ru: "Покупатель", zh: "买家", tr: "Alıcı", ar: "المشتري" }, language),
    bot: pick({ en: "Bot", ru: "Бот", zh: "机器人", tr: "Bot", ar: "روبوت" }, language),
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
      l: pick({ en: "Ordinary exchange", ru: "Обычная биржа", zh: "普通交易所", tr: "Sıradan borsa", ar: "منصة تداول عادية" }, language),
      v: slipped ? "$180" : "$0",
      w: slipped ? "100%" : "4%",
      cls: "bg-gradient-to-r from-rose-500 to-orange-400",
    },
    {
      k: "new",
      l: pick({ en: "This network", ru: "Эта сеть", zh: "本网络", tr: "Bu ağ", ar: "هذه الشبكة" }, language),
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
          <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/45">{pick({ en: "Ordinary exchange", ru: "Обычная биржа", zh: "普通交易所", tr: "Sıradan borsa", ar: "منصة تداول عادية" }, language)}</p>
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
                  {w === "bot" && <span className="font-mono text-[10px] text-rose-200/80">{pick({ en: "jumped in", ru: "влез", zh: "插队", tr: "araya girdi", ar: "تجاوز الدور" }, language)}</span>}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-3 h-9">
            <AnimatePresence mode="wait">
              {c === 1 && (
                <motion.p key="eye" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[12px] text-amber-200/90">
                  👀 {pick({ en: "A bot sees your order…", ru: "Бот видит вашу заявку…", zh: "机器人看到了您的订单…", tr: "Bir bot emrinizi görür…", ar: "روبوت يرى طلبك…" }, language)}
                </motion.p>
              )}
              {slipped && (
                <motion.p key="loss" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[12px] text-rose-300">
                  {pick({ en: "…and you overpay $180", ru: "…и вы переплатили $180", zh: "…您多付了 $180", tr: "…ve siz $180 fazla ödersiniz", ar: "…وتدفع 180 دولارًا زيادة" }, language)}
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
            <span>{pick({ en: "This network", ru: "Эта сеть", zh: "本网络", tr: "Bu ağ", ar: "هذه الشبكة" }, language)}</span>
            <span>
              {opened ? "🔓" : "🔒"} {pick({ en: "batch", ru: "пачка", zh: "批次", tr: "toplu işlem", ar: "دفعة" }, language)}
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
                  {pick({ en: "One price for everyone — the bot gains nothing", ru: "Одна цена для всех — бот ничего не выиграл", zh: "所有人同一价格——机器人一无所获", tr: "Herkese tek fiyat — bot hiçbir şey kazanmaz", ar: "سعر واحد للجميع — ولا يكسب الروبوت شيئًا" }, language)}
                </motion.p>
              ) : (
                <motion.p key="hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[12px] text-white/50">
                  {pick({ en: "Orders are sealed until the batch clears", ru: "Заявки запечатаны до исполнения пачки", zh: "订单在批次撮合前保持加密", tr: "Emirler, toplu işlem eşleşene kadar mühürlü kalır", ar: "الطلبات مختومة حتى تُنفَّذ الدفعة" }, language)}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* what it cost you */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/45">{pick({ en: "Your overpayment", ru: "Ваша переплата", zh: "您多付的金额", tr: "Fazla ödemeniz", ar: "ما دفعته زيادة" }, language)}</p>
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

function PrivacyScene({ language }: { language: Language }) {
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
  const price = phase === 0 ? (pick({ en: "market", ru: "по рынку", zh: "市价", tr: "piyasa", ar: "سعر السوق" }, language)) : phase === 1 ? noise[1] || SEALED_PRICE : SEALED_PRICE;
  const checks = [
    { t: pick({ en: "Enough funds", ru: "Средств достаточно", zh: "资金充足", tr: "Yeterli bakiye", ar: "الرصيد كافٍ" }, language), at: 2 },
    { t: pick({ en: "Signature valid", ru: "Подпись верна", zh: "签名有效", tr: "İmza geçerli", ar: "التوقيع صحيح" }, language), at: 2 },
    { t: pick({ en: "Trade is correct", ru: "Сделка корректна", zh: "交易无误", tr: "İşlem doğru", ar: "الصفقة سليمة" }, language), at: 3 },
  ];

  return (
    <div ref={ref} className="space-y-3">
      <div
        className={`relative overflow-hidden rounded-2xl border p-4 transition-colors duration-500 ${phase >= 2 ? "border-cyan-300/40 bg-cyan-400/[0.06]" : "border-white/10 bg-white/[0.04]"}`}
      >
        {phase === 1 && <span aria-hidden="true" className="l1s-scan pointer-events-none absolute inset-y-0 w-1/3" />}
        <p className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/45">
          <span>{pick({ en: "Large order", ru: "Крупная заявка", zh: "大额订单", tr: "Büyük emir", ar: "طلب كبير" }, language)}</span>
          <span className="transition-opacity">{phase >= 1 ? "🔒" : "🔓"}</span>
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[13px]">
          <dt className="text-white/45">{pick({ en: "side", ru: "действие", zh: "方向", tr: "yön", ar: "الاتجاه" }, language)}</dt>
          <dd className="text-emerald-300">{pick({ en: "Buy", ru: "Купить", zh: "买入", tr: "Al", ar: "شراء" }, language)}</dd>
          <dt className="text-white/45">{pick({ en: "amount", ru: "объём", zh: "数量", tr: "miktar", ar: "الكمية" }, language)}</dt>
          <dd className={`truncate tabular-nums ${phase >= 1 ? "text-cyan-200" : "text-white"}`}>{amount}</dd>
          <dt className="text-white/45">{pick({ en: "price", ru: "цена", zh: "价格", tr: "fiyat", ar: "السعر" }, language)}</dt>
          <dd className={`truncate tabular-nums ${phase >= 1 ? "text-cyan-200" : "text-white"}`}>{price}</dd>
        </dl>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-white/45">{pick({ en: "The network checks — without looking", ru: "Сеть проверяет — не подглядывая", zh: "网络在不窥探的前提下完成校验", tr: "Ağ bakmadan doğrular", ar: "الشبكة تتحقق — دون أن تتلصص" }, language)}</p>
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
          <span className="text-white/45">{pick({ en: "The market sees:", ru: "Рынок видит:", zh: "市场看到的是：", tr: "Piyasa şunu görür:", ar: "ما يراه السوق:" }, language)}</span> <span className="font-mono text-white/80">{pick({ en: "Buy", ru: "Купить", zh: "买入", tr: "Al", ar: "شراء" }, language)} ██████ BTC</span>
        </p>
      </div>
    </div>
  );
}

/* ───────────────────────── 4. A whole platform ───────────────────────── */

const APPS = [
  { x: 62, y: 40, icon: "📈", en: "Trading", ru: "Торговля", zh: "交易", tr: "İşlem", ar: "التداول" },
  { x: 258, y: 40, icon: "🔍", en: "Explorer", ru: "Обозреватель", zh: "浏览器", tr: "Gezgin", ar: "المستكشف" },
  { x: 62, y: 170, icon: "🛠", en: "Control panel", ru: "Панель сети", zh: "控制面板", tr: "Kontrol paneli", ar: "لوحة تحكم الشبكة" },
  { x: 258, y: 170, icon: "💧", en: "Faucet", ru: "Кран токенов", zh: "水龙头", tr: "Faucet", ar: "صنبور الرموز" },
];
const CORE = { x: 160, y: 105 };
const HEX_PTS = Array.from({ length: 6 }, (_, i) => {
  const a = Math.PI / 6 + (i * Math.PI) / 3;
  return `${r2(CORE.x + Math.cos(a) * 38)},${r2(CORE.y + Math.sin(a) * 38)}`;
}).join(" ");

function PlatformScene({ language }: { language: Language }) {
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
          {pick({ en: "Blockchain", ru: "Блокчейн", zh: "区块链", tr: "Blokzincir", ar: "بلوكتشين" }, language)}
        </text>
        <text x={CORE.x} y={CORE.y + 10} textAnchor="middle" fontSize="9" fill="#ffffffcc">
          {pick({ en: "+ exchange", ru: "+ биржа", zh: "+ 交易所", tr: "+ borsa", ar: "+ منصة تداول" }, language)}
        </text>

        {APPS.map((a) => (
          <g key={`card-${a.en}`}>
            <rect x={a.x - 57} y={a.y - 17} width="114" height="34" rx="10" fill="#141128" stroke="#ffffff26" />
            <text x={a.x - 47} y={a.y + 4.5} fontSize="12">
              {a.icon}
            </text>
            <text x={a.x - 30} y={a.y + 4} fontSize="10" fill="#ffffffd9">
              {pick(a, language)}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">{pick({ en: "dev kits", ru: "наборы для разработчиков", zh: "开发者工具包", tr: "geliştirici kitleri", ar: "حزم المطوّرين" }, language)}</span>
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

function TestRun({ language }: { language: Language }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const started = seen || reduced;
  const fmt = (n: number) => Math.round(n).toLocaleString(INTL_LOCALE[language]).replace(/ /g, " ");

  const stats = [
    { to: 450000, suffix: "+", l: pick({ en: "lines of code", ru: "строк кода", zh: "行代码", tr: "satır kod", ar: "سطر من الشيفرة" }, language) },
    { to: 8850, suffix: "+", l: pick({ en: "automated tests", ru: "автотестов", zh: "项自动化测试", tr: "otomatik test", ar: "اختبار آلي" }, language) },
    {
      to: 49,
      suffix: " / 49",
      l: pick({ en: "audit findings fixed", ru: "замечаний аудита закрыто", zh: "项审计问题已修复", tr: "denetim bulgusu giderildi", ar: "ملاحظة تدقيق تمت معالجتها" }, language),
    },
    { to: 13, suffix: "", l: pick({ en: "order types", ru: "типов ордеров", zh: "种订单类型", tr: "emir türü", ar: "نوعًا من الأوامر" }, language) },
  ];

  return (
    <div ref={ref} className={`grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center ${started ? "l1s-run" : ""}`}>
      <div>
        <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-white/50">
          <span>$ {pick({ en: "run all tests", ru: "запуск всех тестов", zh: "运行全部测试", tr: "tüm testleri çalıştır", ar: "تشغيل جميع الاختبارات" }, language)}</span>
          <span className={`transition-colors duration-700 ${started ? "text-emerald-300" : ""}`}>{started ? (pick({ en: "all passed", ru: "все прошли", zh: "全部通过", tr: "hepsi geçti", ar: "اجتازت كلها" }, language)) : "…"}</span>
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

export function L1CaseScenes() {
  const { language } = useLanguage();
  return (
    <section id="case-how" className="relative isolate overflow-hidden bg-[#06060B] py-20 text-white md:py-28">
      <div aria-hidden="true" className="home-aurora home-aurora--violet pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="font-mono text-caption uppercase tracking-[0.2em] text-fuchsia-300/80">{pick({ en: "How it works", ru: "Как это устроено", zh: "运作方式", tr: "Nasıl çalışır", ar: "آلية العمل" }, language)}</p>
          <h2 className="mt-4 font-brand text-3xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
            {pick(
              {
                en: (
                  <>
                    Four ideas the <span className="home-gradient-text">exchange</span> stands on
                  </>
                ),
                ru: (
                  <>
                    Четыре идеи, на которых держится <span className="home-gradient-text">биржа</span>
                  </>
                ),
                zh: (
                  <>
                    支撑这家<span className="home-gradient-text">交易所</span>的四个理念
                  </>
                ),
                tr: (
                  <>
                    <span className="home-gradient-text">Borsanın</span> dayandığı dört fikir
                  </>
                ),
                ar: (
                  <>
                    أربع أفكار تقوم عليها <span className="home-gradient-text">المنصة</span>
                  </>
                ),
              },
              language
            )}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <SceneCard
            n="01"
            title={pick({ en: "Final in ~0.2 seconds", ru: "Окончательно за ~0,2 секунды", zh: "约 0.2 秒即最终确认", tr: "~0,2 saniyede kesinleşir", ar: "حسم نهائي في ~0.2 ثانية" }, language)}
            text={
              pick({ en: "Orders gather into a small batch, the network’s validators agree on it — and the block is written for good. No “pending”, no rollbacks.", ru: "Заявки собираются в пачку, валидаторы сети соглашаются — и блок записан навсегда. Без «в обработке» и без откатов.", zh: "订单汇集成小批次，网络验证者对其达成共识——区块即被永久写入。没有“处理中”，没有回滚。", tr: "Emirler küçük bir toplu işlemde toplanır, ağın doğrulayıcıları üzerinde anlaşır — ve blok kalıcı olarak yazılır. “Beklemede” yok, geri alma yok.", ar: "تتجمّع الطلبات في دفعة صغيرة، ويتفق عليها مدقّقو الشبكة — ثم تُكتب الكتلة نهائيًا. دون «قيد المعالجة» ودون تراجع." }, language)
            }
          >
            <FinalityScene language={language} />
          </SceneCard>
          <SceneCard
            n="02"
            title={pick({ en: "Nobody cuts in line", ru: "Никто не влезает без очереди", zh: "没人能插队", tr: "Kimse sıraya atlayamaz", ar: "لا أحد يتجاوز الدور" }, language)}
            text={
              pick({ en: "On a usual exchange a bot can see your order and jump ahead of it. Here orders are sealed and filled together — at one fair price.", ru: "На обычной бирже бот видит вашу заявку и встаёт перед ней. Здесь заявки запечатаны и исполняются вместе — по одной честной цене.", zh: "在普通交易所，机器人能看到您的订单并抢在前面。在这里，订单被加密封存并一同成交——按同一个公平价格。", tr: "Sıradan bir borsada bir bot emrinizi görüp önüne geçebilir. Burada emirler mühürlenir ve birlikte, tek bir adil fiyattan gerçekleştirilir.", ar: "في المنصات المعتادة يرى الروبوت طلبك ويقفز أمامه. هنا تُختم الطلبات وتُنفَّذ معًا — بسعر واحد عادل." }, language)
            }
          >
            <FairOrderScene language={language} />
          </SceneCard>
          <SceneCard
            n="03"
            title={pick({ en: "Private, yet provable", ru: "Приватно, но проверяемо", zh: "保密，却可验证", tr: "Gizli ama kanıtlanabilir", ar: "خصوصية قابلة للإثبات" }, language)}
            text={
              pick({ en: "A big trader hides the size of an order, and the network still proves the trade is valid — without seeing its details.", ru: "Крупный трейдер скрывает размер заявки, а сеть всё равно доказывает, что сделка честная, — не видя её деталей.", zh: "大户可以隐藏订单规模，而网络依然能证明交易合法——却看不到其细节。", tr: "Büyük bir yatırımcı emrinin boyutunu gizler; ağ ise detayları görmeden işlemin geçerli olduğunu yine de kanıtlar.", ar: "يُخفي المتداول الكبير حجم طلبه، وتثبت الشبكة مع ذلك أن الصفقة سليمة — دون أن ترى تفاصيلها." }, language)
            }
          >
            <PrivacyScene language={language} />
          </SceneCard>
          <SceneCard
            n="04"
            title={pick({ en: "A whole platform, not just an exchange", ru: "Целая платформа, а не только биржа", zh: "是一整个平台，而不只是交易所", tr: "Sadece bir borsa değil, komple bir platform", ar: "منصة متكاملة وليست مجرد بورصة" }, language)}
            text={
              pick({ en: "Four apps share one network, and developer kits let others build their own products on it.", ru: "Четыре приложения работают на одной сети, а наборы для разработчиков позволяют другим строить на ней свои продукты.", zh: "四个应用共用同一网络，开发者工具包让其他人也能在其上构建自己的产品。", tr: "Dört uygulama tek bir ağı paylaşır; geliştirici kitleri başkalarının üzerinde kendi ürünlerini kurmasına olanak tanır.", ar: "أربعة تطبيقات تعمل على شبكة واحدة، وحزم المطوّرين تتيح للآخرين بناء منتجاتهم عليها." }, language)
            }
          >
            <PlatformScene language={language} />
          </SceneCard>
          <SceneCard
            n="05"
            className="lg:col-span-2"
            title={pick({ en: "Checked by thousands of tests", ru: "Проверено тысячами тестов", zh: "经由数千项测试验证", tr: "Binlerce testle doğrulandı", ar: "مُختبَرة بآلاف الاختبارات" }, language)}
            text={
              pick({ en: "Every rule of the exchange and the network is covered by automated tests that run on each change.", ru: "Каждое правило биржи и сети покрыто автотестами, которые запускаются при каждом изменении.", zh: "交易所和网络的每条规则都有自动化测试覆盖，每次变更都会运行。", tr: "Borsanın ve ağın her kuralı, her değişiklikte çalışan otomatik testlerle kapsanır.", ar: "كل قاعدة في المنصة والشبكة مغطاة باختبارات آلية تُشغَّل مع كل تغيير." }, language)
            }
          >
            <TestRun language={language} />
          </SceneCard>
        </div>
      </div>
    </section>
  );
}
