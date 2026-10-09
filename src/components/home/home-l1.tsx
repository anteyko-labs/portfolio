"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** The node's core modules (from the case study) lighting up layer by layer, like a node booting */
function NodeModules({ en }: { en: boolean }) {
  const layers = [
    { name: en ? "Network" : "Сеть", mods: ["P2P", "Sync", "Light client"] },
    { name: en ? "Consensus" : "Консенсус", mods: ["Finality", en ? "Validators" : "Валидаторы", "Slashing"] },
    { name: en ? "Execution" : "Исполнение", mods: ["EVM · revm", "Fee market", en ? "Native token" : "Нативный токен"] },
    { name: "DEX", mods: [en ? "Orderbook" : "Ордербук", en ? "Perps & margin" : "Перпетуалы и маржа", "Bulletproofs"] },
    { name: en ? "Apps" : "Приложения", mods: ["DEX UI", en ? "Explorer" : "Эксплорер", en ? "Operator" : "Оператор"] },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/50">
        <span>{en ? "single-binary Rust node" : "Rust-нода в одном бинарнике"}</span>
        <span>25+ {en ? "modules" : "модулей"}</span>
      </div>
      <ol className="space-y-2">
        {layers.map((l, i) => (
          <li key={l.name} className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">{l.name}</span>
            <div className="grid grid-cols-3 gap-2">
              {l.mods.map((m, k) => (
                <span
                  key={m}
                  className="home-module rounded-lg border border-white/10 px-2 py-2 text-center text-[12px] text-white/80"
                  style={{ animationDelay: `${(i * 3 + k) * 0.18}s` }}
                >
                  {m}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HomeL1() {
  const { language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion();

  const facts = [
    { v: "25+", l: en ? "Rust core modules" : "модулей ядра на Rust" },
    { v: "4", l: en ? "apps: DEX, explorer, operator, faucet" : "приложения: DEX, эксплорер, оператор, фаусет" },
    { v: "90+", l: en ? "API endpoints" : "API-эндпоинтов" },
    { v: "2", l: en ? "TypeScript SDKs" : "TypeScript SDK" },
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
                ? "From the Rust core and deterministic EVM to the trading terminal, explorer and operator panel. The matching engine, margin and settlement live at the protocol level, with full EVM compatibility."
                : "От ядра на Rust и детерминированного EVM до торгового терминала, эксплорера и панели оператора. Матчинг, маржа и расчёты живут на уровне протокола, при полной EVM-совместимости."}
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
            <NodeModules en={en} />

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
