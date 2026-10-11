"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

// Illustrated trading terminal for the L1 + perp DEX case — drawn in code,
// with made-up market data (a seeded random walk), so it never shows any
// real product UI. Used as the catalog cover and on the home page.

type Candle = { o: number; c: number; h: number; l: number };

/** Deterministic PRNG so the server and the first client render match */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function nextCandle(prev: number, rnd: () => number): Candle {
  const o = prev;
  const c = Math.max(40, o + (rnd() - 0.47) * 6);
  const h = Math.max(o, c) + rnd() * 3;
  const l = Math.min(o, c) - rnd() * 3;
  return { o, c, h, l };
}

const COUNT = 26;
const r1 = (n: number) => Math.round(n * 10) / 10;

export function L1Terminal({ active = false, live = true }: { active?: boolean; live?: boolean }) {
  const reduced = useReducedMotion();
  const initial = useMemo(() => {
    const rnd = mulberry32(7);
    const out: Candle[] = [];
    let p = 100;
    for (let i = 0; i < COUNT; i++) {
      const k = nextCandle(p, rnd);
      out.push(k);
      p = k.c;
    }
    return out;
  }, []);
  const [candles, setCandles] = useState(initial);
  const [tick, setTick] = useState(0);
  // The market only moves while the terminal is near the screen: off screen it would keep
  // re-rendering the chart and the order book (width transitions = layout) every tick
  const root = useRef<HTMLDivElement>(null);
  const near = useInView(root, { margin: "200px" });

  useEffect(() => {
    if (!live || reduced || !near) return;
    const rnd = mulberry32(Date.now() % 100000);
    const id = window.setInterval(() => {
      setCandles((cs) => [...cs.slice(1), nextCandle(cs[cs.length - 1].c, rnd)]);
      setTick((t) => t + 1);
    }, active ? 550 : 1200);
    return () => window.clearInterval(id);
  }, [live, reduced, active, near]);

  const max = Math.max(...candles.map((c) => c.h));
  const min = Math.min(...candles.map((c) => c.l));
  const y = (v: number) => r1(8 + ((max - v) / (max - min || 1)) * 84);
  const last = candles[candles.length - 1];
  const up = last.c >= last.o;
  const price = (last.c * 830).toFixed(1);

  const book = Array.from({ length: 6 }, (_, i) => ({
    ask: r1(20 + ((i * 37 + tick * 13) % 70)),
    bid: r1(20 + ((i * 53 + tick * 17) % 70)),
  }));
  const tape = Array.from({ length: 5 }, (_, i) => {
    const k = tick + i;
    return { side: (k * 7) % 3 === 0 ? "sell" : "buy", size: ((k * 13) % 90) / 10 + 0.1, key: k };
  });

  return (
    <div
      ref={root}
      className="@container absolute inset-0 overflow-hidden"
      style={{ background: "radial-gradient(70% 80% at 80% 0%, #6D28D980, transparent 60%), radial-gradient(60% 70% at 0% 100%, #DB277750, transparent 60%), linear-gradient(160deg, #1E1B4B, #0F0A2A)" }}
      aria-hidden="true"
    >
      <div className="absolute inset-[3.5cqw] grid grid-cols-[1fr_28cqw] grid-rows-[auto_1fr_auto] gap-[2cqw]">
        {/* ticker */}
        <div className="col-span-2 flex items-center justify-between rounded-[1.6cqw] border border-white/15 bg-white/10 px-[2.4cqw] py-[1.4cqw] backdrop-blur">
          <span className="flex items-center gap-[1.4cqw]">
            <span className="grid aspect-square w-[4.4cqw] place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-[2.4cqw] font-black text-white">₿</span>
            <span className="text-[2.6cqw] font-semibold text-white">BTC-PERP</span>
            <span className="rounded-full bg-white/15 px-[1.2cqw] py-[0.3cqw] font-mono text-[1.6cqw] text-white/70">20x</span>
          </span>
          <span className={`font-mono text-[3cqw] font-bold tabular-nums transition-colors ${up ? "text-emerald-300" : "text-rose-300"}`}>
            ${price}
          </span>
        </div>

        {/* candles */}
        <div className="relative overflow-hidden rounded-[1.6cqw] border border-white/15 bg-white/[0.06]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {[25, 50, 75].map((g) => (
              <line key={g} x1="0" x2="100" y1={g} y2={g} stroke="#fff" strokeOpacity="0.07" strokeWidth="0.4" />
            ))}
            {candles.map((k, i) => {
              const x = r1(2 + i * (96 / COUNT));
              const w = r1(96 / COUNT - 1.2);
              const green = k.c >= k.o;
              const color = green ? "#34D399" : "#FB7185";
              return (
                <g key={`${tick}-${i}`} className={i === COUNT - 1 ? "l1-candle-new" : undefined}>
                  <line x1={r1(x + w / 2)} x2={r1(x + w / 2)} y1={y(k.h)} y2={y(k.l)} stroke={color} strokeWidth="0.5" />
                  <rect x={x} y={Math.min(y(k.o), y(k.c))} width={w} height={Math.max(0.8, Math.abs(y(k.o) - y(k.c)))} fill={color} rx="0.4" />
                </g>
              );
            })}
            <line x1="0" x2="100" y1={y(last.c)} y2={y(last.c)} stroke={up ? "#34D399" : "#FB7185"} strokeDasharray="1.2 1.2" strokeWidth="0.4" />
          </svg>
        </div>

        {/* order book */}
        <div className="row-span-2 flex flex-col gap-[0.8cqw] rounded-[1.6cqw] border border-white/15 bg-white/[0.06] p-[1.6cqw]">
          {book.map((b, i) => (
            <div key={`a${i}`} className="relative h-[3cqw] overflow-hidden rounded-[0.6cqw]">
              <span className="absolute inset-y-0 right-0 rounded-[0.6cqw] bg-rose-400/35 transition-[width] duration-500" style={{ width: `${b.ask}%` }} />
              <span className="relative block px-[0.8cqw] font-mono text-[1.6cqw] leading-[3cqw] text-rose-200">{(Number(price) + (6 - i) * 4.5).toFixed(1)}</span>
            </div>
          ))}
          <div className="my-[0.6cqw] h-px bg-white/20" />
          {book.map((b, i) => (
            <div key={`b${i}`} className="relative h-[3cqw] overflow-hidden rounded-[0.6cqw]">
              <span className="absolute inset-y-0 right-0 rounded-[0.6cqw] bg-emerald-400/35 transition-[width] duration-500" style={{ width: `${b.bid}%` }} />
              <span className="relative block px-[0.8cqw] font-mono text-[1.6cqw] leading-[3cqw] text-emerald-200">{(Number(price) - (i + 1) * 4.5).toFixed(1)}</span>
            </div>
          ))}
        </div>

        {/* trade tape */}
        <div className="flex gap-[1cqw] overflow-hidden">
          {tape.map((t) => (
            <span
              key={t.key}
              className={`l1-tape shrink-0 rounded-full px-[1.6cqw] py-[0.6cqw] font-mono text-[1.6cqw] ${t.side === "buy" ? "bg-emerald-400/20 text-emerald-200" : "bg-rose-400/20 text-rose-200"}`}
            >
              {t.side === "buy" ? "▲" : "▼"} {t.size.toFixed(1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
