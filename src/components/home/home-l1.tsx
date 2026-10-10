"use client";

import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { pick, type Language } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { L1Terminal } from "@/components/cases-catalog/l1-terminal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** The node's core modules (from the case study) lighting up layer by layer, like a node booting */
function NodeModules({ language }: { language: Language }) {
  const layers = [
    { name: pick({ en: "Network", ru: "Сеть", zh: "网络", tr: "Ağ", ar: "الشبكة" }, language), mods: ["P2P", "Sync", "Light client"] },
    { name: pick({ en: "Consensus", ru: "Консенсус", zh: "共识", tr: "Konsensüs", ar: "الإجماع" }, language), mods: ["Finality", pick({ en: "Validators", ru: "Валидаторы", zh: "验证者", tr: "Doğrulayıcılar", ar: "المدقّقون" }, language), "Slashing"] },
    { name: pick({ en: "Execution", ru: "Исполнение", zh: "执行", tr: "Yürütme", ar: "التنفيذ" }, language), mods: ["EVM · revm", "Fee market", pick({ en: "Native token", ru: "Нативный токен", zh: "原生代币", tr: "Yerel token", ar: "العملة الأصلية" }, language)] },
    { name: "DEX", mods: [pick({ en: "Orderbook", ru: "Ордербук", zh: "订单簿", tr: "Emir defteri", ar: "دفتر الأوامر" }, language), pick({ en: "Perps & margin", ru: "Перпетуалы и маржа", zh: "永续合约与保证金", tr: "Perps ve marjin", ar: "العقود الدائمة والهامش" }, language), "Bulletproofs"] },
    { name: pick({ en: "Apps", ru: "Приложения", zh: "应用", tr: "Uygulamalar", ar: "التطبيقات" }, language), mods: ["DEX UI", pick({ en: "Explorer", ru: "Эксплорер", zh: "区块浏览器", tr: "Gezgin", ar: "المستكشف" }, language), pick({ en: "Operator", ru: "Оператор", zh: "运营端", tr: "Operatör", ar: "المشغّل" }, language)] },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/50">
        <span>{pick({ en: "single-binary Rust node", ru: "Rust-нода в одном бинарнике", zh: "单一二进制的 Rust 节点", tr: "tek ikili dosyalı Rust node'u", ar: "عقدة Rust بملف تنفيذي واحد" }, language)}</span>
        <span>25+ {pick({ en: "modules", ru: "модулей", zh: "个模块", tr: "modül", ar: "وحدات" }, language)}</span>
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
  const reduced = useReducedMotion();

  const facts = [
    { v: "25+", l: pick({ en: "Rust core modules", ru: "модулей ядра на Rust", zh: "个 Rust 核心模块", tr: "Rust çekirdek modülü", ar: "وحدات نواة Rust" }, language) },
    { v: "4", l: pick({ en: "apps: DEX, explorer, operator, faucet", ru: "приложения: DEX, эксплорер, оператор, фаусет", zh: "应用：DEX、浏览器、运营端、水龙头", tr: "uygulamalar: DEX, gezgin, operatör, faucet", ar: "تطبيقات: DEX ومستكشف ومشغّل وصنبور رموز" }, language) },
    { v: "90+", l: pick({ en: "API endpoints", ru: "API-эндпоинтов", zh: "个 API 端点", tr: "API endpoint'i", ar: "نقاط نهاية API" }, language) },
    { v: "2", l: pick({ en: "TypeScript SDKs", ru: "TypeScript SDK", zh: "个 TypeScript SDK", tr: "TypeScript SDK'sı", ar: "حزم TypeScript SDK" }, language) },
  ];
  const tech = ["EVM · revm", "EIP-1559", "Bulletproofs", pick({ en: "Governance", ru: "Governance", zh: "治理", tr: "Yönetişim", ar: "الحوكمة" }, language), pick({ en: "Slashing", ru: "Слэшинг", zh: "罚没", tr: "Slashing", ar: "العقوبات (Slashing)" }, language), "Fraud proofs", "Checkpoint sync", "TypeScript SDK"];

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] py-24 text-white md:py-32">
      <div aria-hidden="true" className="home-aurora home-aurora--violet pointer-events-none absolute inset-0 -z-10 opacity-80" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-fuchsia-300/80">{pick({ en: "Flagship · Web3 infrastructure", ru: "Флагман · Web3-инфраструктура", zh: "旗舰 · Web3 基础设施", tr: "Amiral gemisi · Web3 altyapısı", ar: "المشروع الرئيسي · بنية Web3 التحتية" }, language)}</p>
            <h2 className="mt-5 font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
              {pick(
                {
                  en: (
                    <>
                      An <span className="home-gradient-text">L1 blockchain</span> with a built-in perp DEX
                    </>
                  ),
                  ru: (
                    <>
                      <span className="home-gradient-text">L1-блокчейн</span> со встроенной DEX
                    </>
                  ),
                  zh: (
                    <>
                      内置永续合约 DEX 的 <span className="home-gradient-text">L1 区块链</span>
                    </>
                  ),
                  tr: (
                    <>
                      Dahili perp DEX’e sahip bir <span className="home-gradient-text">L1 blokzinciri</span>
                    </>
                  ),
                  ar: (
                    <>
                      <span className="home-gradient-text">بلوكتشين L1</span> مع منصة DEX مدمجة للعقود الدائمة
                    </>
                  ),
                },
                language,
              )}
            </h2>
            <p className="mt-6 max-w-xl text-body-lg text-white/60">
              {pick({ en: "From the Rust core and deterministic EVM to the trading terminal, explorer and operator panel. The matching engine, margin and settlement live at the protocol level, with full EVM compatibility.", ru: "От ядра на Rust и детерминированного EVM до торгового терминала, эксплорера и панели оператора. Матчинг, маржа и расчёты живут на уровне протокола, при полной EVM-совместимости.", zh: "从 Rust 核心和确定性 EVM，到交易终端、区块浏览器和运营面板。撮合引擎、保证金和结算都在协议层，并完全兼容 EVM。", tr: "Rust çekirdeğinden deterministik EVM'ye, işlem terminalinden gezgine ve operatör paneline. Eşleştirme motoru, marjin ve takas protokol seviyesinde yer alır; tam EVM uyumluluğu ile.", ar: "من نواة Rust وEVM الحتمي إلى محطة التداول والمستكشف ولوحة المشغّل. محرّك المطابقة والهامش والتسوية تعمل على مستوى البروتوكول، مع توافق كامل مع EVM." }, language)}
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
              {pick({ en: "Read the case study", ru: "Разбор кейса", zh: "阅读案例研究", tr: "Vaka çalışmasını okuyun", ar: "اقرأ دراسة الحالة" }, language)} <span aria-hidden="true">→</span>
            </NextLink>
          </div>

          <div className="lg:col-span-6">
            <NodeModules language={language} />

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 40, rotateX: 14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 shadow-[0_50px_100px_-30px_rgba(124,58,237,0.6)] [transform-origin:50%_100%]"
            >
              <L1Terminal />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
