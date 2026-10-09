"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { estimateHeight, type L1Snapshot } from "@/lib/l1-stats";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** The last few finalized batches; a new one slides in every second */
function BlockStream({ snapshot }: { snapshot: L1Snapshot }) {
  const [head, setHead] = useState(snapshot.height);
  useEffect(() => {
    const tick = () => setHead(estimateHeight(snapshot));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [snapshot]);
  const blocks = Array.from({ length: 5 }, (_, i) => head - i);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/50">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          public testnet · live
        </span>
        <span>~1 s / batch</span>
      </div>
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {blocks.map((b, i) => (
            <motion.li
              key={b}
              layout
              initial={{ opacity: 0, x: -30, backgroundColor: "rgba(124,58,237,0.35)" }}
              animate={{ opacity: 1 - i * 0.14, x: 0, backgroundColor: "rgba(255,255,255,0.03)" }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-2.5"
            >
              <span className="font-mono text-sm tabular-nums text-white">#{b.toLocaleString("ru-RU")}</span>
              <span className="hidden font-mono text-xs text-white/40 sm:inline">0x{((b * 2654435761) >>> 0).toString(16).padStart(8, "0")}…</span>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">finalized</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function Validators() {
  return (
    <div className="relative mx-auto aspect-square w-40">
      <div className="absolute inset-0 rounded-full border border-dashed border-white/15 home-spin-slow" />
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return (
          <span
            key={i}
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)] home-blink"
            style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%`, animationDelay: `${i * 0.35}s` }}
          />
        );
      })}
      <div className="absolute inset-[28%] grid place-content-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-center shadow-[0_0_60px_rgba(124,58,237,0.6)]">
        <span className="font-brand text-xl font-semibold">5/5</span>
      </div>
    </div>
  );
}

export function HomeL1({ snapshot }: { snapshot: L1Snapshot }) {
  const { language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion();

  const facts = [
    { v: "25+", l: en ? "Rust core modules" : "модулей ядра на Rust" },
    { v: "4", l: en ? "apps: DEX, explorer, operator, faucet" : "приложения: DEX, эксплорер, оператор, фаусет" },
    { v: "25x", l: en ? "max leverage on perps" : "максимальное плечо на перпетуалах" },
    { v: "1B", l: en ? "hard-capped token supply" : "жёсткий потолок эмиссии токена" },
  ];
  const tech = ["EVM · revm", "EIP-1559", "Bulletproofs", en ? "Governance" : "Governance", en ? "Slashing" : "Слэшинг", "Fraud proofs", "Checkpoint sync", "TypeScript SDK"];
  const screens = ["/images/cases/l1-chain/explorer-blocks.png", "/images/cases/l1-chain/dex-trading.png", "/images/cases/l1-chain/operator-overview.png"];

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] py-24 text-white md:py-32">
      <div aria-hidden="true" className="home-aurora home-aurora--violet pointer-events-none absolute inset-0 -z-10 opacity-80" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-fuchsia-300/80">{en ? "Flagship · Web3 infrastructure" : "Флагман · Web3-инфраструктура"}</p>
            <h2 className="mt-5 font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
              {en ? (
                <>
                  Our own <span className="home-gradient-text">L1 blockchain</span> with a built-in perp DEX
                </>
              ) : (
                <>
                  Собственный <span className="home-gradient-text">L1-блокчейн</span> со встроенной DEX
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-body-lg text-white/60">
              {en
                ? "From the Rust core and deterministic EVM to the trading terminal, explorer and operator panel. The matching engine, margin and settlement live at the protocol level — and the public testnet finalizes a batch every second."
                : "От ядра на Rust и детерминированного EVM до торгового терминала, эксплорера и панели оператора. Матчинг, маржа и расчёты живут на уровне протокола, а публичный тестнет финализирует батч каждую секунду."}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-4">
              {facts.map((f, i) => (
                <motion.div
                  key={f.l}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <dt className="sr-only">{f.l}</dt>
                  <dd>
                    <span className="block font-brand text-3xl font-semibold">{f.v}</span>
                    <span className="mt-1 block text-body-sm text-white/55">{f.l}</span>
                  </dd>
                </motion.div>
              ))}
            </dl>

            <ul className="mt-8 flex flex-wrap gap-2">
              {tech.map((t) => (
                <li key={t} className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 font-mono text-caption text-white/70">
                  {t}
                </li>
              ))}
            </ul>

            <NextLink
              href="/cases/web3-l1-dex"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-body-md font-semibold text-[#0A0A0F] transition-transform hover:-translate-y-0.5"
            >
              {en ? "Read the case study" : "Разбор кейса"} <span aria-hidden="true">→</span>
            </NextLink>
          </div>

          <div className="lg:col-span-6">
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <BlockStream snapshot={snapshot} />
              <div className="hidden text-center sm:block">
                <Validators />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-white/50">{en ? "validators online" : "валидаторов в сети"}</p>
              </div>
            </div>

            <div className="relative mt-10 h-64 [perspective:1400px] md:h-80">
              {screens.map((src, i) => (
                <motion.div
                  key={src}
                  initial={reduced ? false : { opacity: 0, y: 40, rotateY: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: -18 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                  className="absolute top-0 w-[70%] overflow-hidden rounded-xl border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
                  style={{ left: `${i * 15}%`, top: `${i * 8}%`, zIndex: i }}
                >
                  <div className="relative aspect-[2048/1180]">
                    <Image src={src} alt="" fill sizes="(max-width: 1024px) 70vw, 420px" className="object-cover object-top" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
