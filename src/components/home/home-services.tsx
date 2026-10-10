"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { GENERATIVE_COVERS } from "@/components/cases-catalog/generative-covers";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Full-page screenshot that pans down while the card is hovered */
function SitePan({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-t-xl">
      <Image
        src="/images/showcase/paddock/full.jpg"
        alt=""
        width={1200}
        height={6000}
        sizes="(max-width: 768px) 90vw, 480px"
        className="absolute left-0 top-0 h-auto w-full"
        style={{ transform: `translateY(${active ? "-72%" : "0%"})`, transition: `transform ${active ? 9 : 1.2}s cubic-bezier(.45,.05,.4,1)` }}
      />
    </div>
  );
}

function Phones({ active }: { active: boolean }) {
  const phones = ["/images/showcase/asaki-sushi/phone-1.jpg", "/images/showcase/asaki-sushi/phone-2.jpg", "/images/showcase/asaki-sushi/phone-3.jpg"];
  return (
    <div className="absolute inset-0 flex items-start justify-center overflow-hidden pt-6" style={{ background: "radial-gradient(circle at 50% 120%, #FF4D4D55, transparent 60%)" }}>
      {phones.map((src, i) => {
        const d = i - 1;
        return (
          <div
            key={src}
            className="relative mx-[-4%] aspect-[390/844] w-[34%] shrink-0 overflow-hidden rounded-[18px] border-[4px] border-[#0A0A0A] bg-[#0A0A0A] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ zIndex: 3 - Math.abs(d), transform: `translateX(${d * (active ? 30 : 12)}%) translateY(${Math.abs(d) * (active ? 4 : 10)}%) rotate(${d * (active ? 8 : 4)}deg)` }}
          >
            <Image src={src} alt="" fill sizes="200px" className="object-cover object-top" />
          </div>
        );
      })}
    </div>
  );
}

const COINS = [
  { sym: "₿", bg: "#F7931A", from: "-46cqw -28cqw", delay: 0 },
  { sym: "Ξ", bg: "#627EEA", from: "44cqw -30cqw", delay: -0.8 },
  { sym: "₮", bg: "#26A17B", from: "-48cqw 14cqw", delay: -1.6 },
  { sym: "◎", bg: "#9945FF", from: "46cqw 18cqw", delay: -2.4 },
  { sym: "₿", bg: "#F7931A", from: "10cqw -44cqw", delay: -3.2 },
  { sym: "Ξ", bg: "#627EEA", from: "-20cqw 30cqw", delay: -4 },
];

/** Crypto wallet (our KutWallet screens) with coins flying in and a chain running underneath */
function CryptoWallet({ active }: { active: boolean }) {
  return (
    <div
      className="cw-scene @container absolute inset-0 overflow-hidden"
      data-active={active}
      style={{ background: "radial-gradient(circle at 70% 30%, #7C3AED55, transparent 55%), radial-gradient(circle at 20% 90%, #EC489933, transparent 50%), #0B0B14" }}
    >
      {/* chain of blocks along the bottom */}
      <div className="absolute inset-x-0 bottom-3 opacity-60">
        <div className={clsx("home-chain flex gap-2 pl-4", active && "home-chain--fast")}>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="grid h-9 w-14 shrink-0 place-content-center rounded-md border border-white/15 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20">
                <span className="font-mono text-[9px] text-white/60">#{(4096 + i).toString(16)}</span>
              </div>
              <span className="h-px w-3 bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-start justify-center pt-4 [perspective:1000px]">
        <div className="cw-phone cw-phone--back absolute aspect-[796/1636] h-[96%]">
          <Image src="/images/cases/kut-wallet/exchange-chart.png" alt="" fill sizes="160px" className="object-contain" />
        </div>
        <div className="cw-phone cw-phone--front relative aspect-[796/1636] h-[104%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]">
          <Image src="/images/cases/kut-wallet/dashboard.png" alt="" fill sizes="180px" className="object-contain" />
        </div>
      </div>

      {/* landing pulse on the wallet */}
      <span className="cw-pulse pointer-events-none absolute left-1/2 top-[46%] h-[22cqw] w-[22cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-fuchsia-300/70" />
      {/* wallet notifications */}
      <div className="absolute left-[4cqw] top-[6cqw] flex flex-col gap-[1.6cqw]">
        <span className="cw-toast inline-flex items-center gap-[1.2cqw] rounded-full border border-white/15 bg-white/10 px-[2cqw] py-[1cqw] text-[2.4cqw] font-semibold text-white backdrop-blur">
          <span className="grid aspect-square w-[3.6cqw] place-items-center rounded-full bg-[#F7931A] text-[2cqw]">₿</span>+0.0425 BTC
        </span>
        <span className="cw-toast inline-flex items-center gap-[1.2cqw] rounded-full border border-white/15 bg-white/10 px-[2cqw] py-[1cqw] text-[2.4cqw] font-semibold text-white backdrop-blur [animation-delay:-2.4s]">
          <span className="text-emerald-300">⇄</span>ETH → USDT ✓
        </span>
      </div>
      {/* coins flying into the wallet */}
      <div className="absolute left-1/2 top-[46%] h-0 w-0">
        {COINS.map((c, i) => (
          <span
            key={i}
            className="cw-coin absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
            style={{ background: c.bg, ["--from" as string]: c.from, animationDelay: `${c.delay}s`, width: "clamp(24px, 7cqw, 44px)", height: "clamp(24px, 7cqw, 44px)", fontSize: "clamp(12px, 3.6cqw, 22px)" }}
          >
            {c.sym}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomeServices() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const Bi = GENERATIVE_COVERS["analytics-pro-enterprise-bi"];

  const items = [
    {
      span: "lg:col-span-7",
      href: "/cases?type=web",
      tag: pick({ en: "Websites", ru: "Сайты", zh: "网站", tr: "Web siteleri", ar: "مواقع" }, language),
      title: pick({ en: "Websites that sell — and that people scroll to the end", ru: "Сайты, которые продают и которые хочется долистать", zh: "能带来转化、让人一路读到底的网站", tr: "Satış yapan — ve sonuna kadar kaydırılan web siteleri", ar: "مواقع تبيع — ويتصفحها الناس حتى النهاية" }, language),
      text: pick({ en: "Corporate sites, catalogs with booking, landing pages with scroll scenes. SEO, speed and analytics from day one.", ru: "Корпоративные сайты, каталоги с бронированием, лендинги со скролл-сценами. SEO, скорость и аналитика с первого дня.", zh: "企业官网、带预约的商品目录、带滚动场景的落地页。第一天起就具备 SEO、速度和数据分析。", tr: "Kurumsal siteler, rezervasyonlu kataloglar, kaydırma sahneli açılış sayfaları. İlk günden SEO, hız ve analitik.", ar: "مواقع مؤسسية، وكتالوجات مع الحجز، وصفحات هبوط بمشاهد تمرير. SEO وسرعة وتحليلات من اليوم الأول." }, language),
      chips: ["Next.js", "CSS 3D", "SEO"],
      visual: (a: boolean) => <SitePan active={a} />,
      dark: false,
    },
    {
      span: "lg:col-span-5",
      href: "/cases?type=mobile",
      tag: pick({ en: "Products & MVP", ru: "Продукты и MVP", zh: "产品与 MVP", tr: "Ürünler ve MVP", ar: "المنتجات وMVP" }, language),
      title: pick({ en: "Apps your customers install", ru: "Приложения, которые ставят на телефон", zh: "让客户愿意安装的应用", tr: "Müşterilerinizin yüklediği uygulamalar", ar: "تطبيقات يثبّتها عملاؤك" }, language),
      text: pick({ en: "Ordering, booking and loyalty PWAs with an owner's cabinet.", ru: "PWA для заказов, записи и лояльности — с кабинетом владельца.", zh: "点餐、预约和会员忠诚度 PWA，附带店主后台。", tr: "Sipariş, rezervasyon ve sadakat PWA'ları; sahip paneliyle birlikte.", ar: "تطبيقات PWA للطلب والحجز والولاء مع لوحة خاصة بالمالك." }, language),
      chips: ["PWA", "Push", pick({ en: "Admin", ru: "Админка", zh: "后台", tr: "Yönetim", ar: "الإدارة" }, language)],
      visual: (a: boolean) => <Phones active={a} />,
      dark: true,
    },
    {
      span: "lg:col-span-5",
      href: "/cases?type=web3",
      tag: "Web3",
      title: pick({ en: "Crypto wallets, tokens and blockchains", ru: "Криптокошельки, токены и блокчейн", zh: "加密钱包、代币和区块链", tr: "Kripto cüzdanlar, tokenlar ve blokzincirler", ar: "محافظ العملات الرقمية والرموز والبلوكتشين" }, language),
      text: pick({ en: "Non-custodial wallets with a built-in exchange, smart contracts, tokenization platforms and a full blockchain with a DEX.", ru: "Некастодиальные кошельки со встроенной биржей, смарт-контракты, платформы токенизации и целый блокчейн с DEX.", zh: "内置交易所的非托管钱包、智能合约、代币化平台，以及带 DEX 的完整区块链。", tr: "Yerleşik borsalı non-custodial cüzdanlar, akıllı kontratlar, tokenizasyon platformları ve DEX'li eksiksiz bir blokzincir.", ar: "محافظ غير حاضنة مع منصة تداول مدمجة، وعقود ذكية، ومنصات توكنة، وبلوكتشين كاملة مع DEX." }, language),
      chips: [pick({ en: "Wallets", ru: "Кошельки", zh: "钱包", tr: "Cüzdanlar", ar: "المحافظ" }, language), "Solidity", "Rust"],
      visual: (a: boolean) => <CryptoWallet active={a} />,
      dark: true,
    },
    {
      span: "lg:col-span-7",
      href: "/cases?type=product",
      tag: pick({ en: "ERP, CRM, analytics", ru: "ERP, CRM, аналитика", zh: "ERP、CRM、数据分析", tr: "ERP, CRM, analitik", ar: "ERP وCRM والتحليلات" }, language),
      title: pick({ en: "Systems the business runs on", ru: "Системы, на которых держится бизнес", zh: "支撑业务运转的系统", tr: "İşin üzerinde döndüğü sistemler", ar: "أنظمة تقوم عليها أعمالك" }, language),
      text: pick({ en: "Accounting, marking and logistics, BI dashboards — built around how your team actually works.", ru: "Учёт, маркировка и логистика, BI-дашборды — под то, как реально работает ваша команда.", zh: "会计、标签管理与物流、BI 看板——围绕您团队的真实工作方式打造。", tr: "Muhasebe, işaretleme ve lojistik, BI panelleri — ekibinizin gerçekte çalışma biçimine göre kurulur.", ar: "محاسبة وتوسيم ولوجستيات ولوحات BI — مبنية على طريقة عمل فريقك الفعلية." }, language),
      chips: ["NestJS", "PostgreSQL", "BI"],
      visual: (a: boolean) => <Bi active={a} />,
      dark: false,
    },
  ];

  return (
    <section id="home-services" className="relative bg-bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary">{pick({ en: "What we build", ru: "Что мы делаем", zh: "我们打造什么", tr: "Ne inşa ediyoruz", ar: "ما نبنيه" }, language)}</p>
            <h2 className="mt-4 max-w-2xl font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-text-primary md:text-6xl">
              {pick({ en: "One studio, the whole product", ru: "Одна студия — весь продукт", zh: "一个工作室，搞定整个产品", tr: "Tek stüdyo, bütün ürün", ar: "استوديو واحد، ومنتج كامل" }, language)}
            </h2>
          </div>
          <p className="max-w-md text-body-lg text-text-secondary">
            {pick({ en: "Design, frontend, backend, admin panels, integrations and launch — Web2 and Web3 in one delivery loop.", ru: "Дизайн, фронтенд, бэкенд, админки, интеграции и запуск — Web2 и Web3 в одном цикле поставки.", zh: "设计、前端、后端、管理后台、系统集成到上线——Web2 与 Web3 同一交付闭环。", tr: "Tasarım, frontend, backend, yönetim panelleri, entegrasyonlar ve lansman — Web2 ve Web3 tek bir teslimat döngüsünde.", ar: "التصميم والواجهة الأمامية والخلفية ولوحات الإدارة والتكاملات والإطلاق — Web2 وWeb3 في دورة تسليم واحدة." }, language)}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {items.map((it, i) => (
            <motion.div
              key={it.href}
              className={it.span}
              initial={reduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE }}
            >
              <NextLink
                href={it.href}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
                className={clsx(
                  "group flex h-full flex-col overflow-hidden rounded-3xl border transition-[transform,box-shadow] duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary motion-reduce:hover:translate-y-0",
                  it.dark ? "border-white/10 bg-[#0B0B14] text-white hover:shadow-[0_40px_80px_-40px_rgba(124,58,237,0.6)]" : "border-border bg-bg-secondary text-text-primary hover:shadow-[0_40px_80px_-40px_rgba(10,10,10,0.3)]"
                )}
              >
                <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl md:h-72">{it.visual(hover === i)}</div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className={clsx("font-mono text-caption uppercase tracking-[0.16em]", it.dark ? "text-white/50" : "text-text-tertiary")}>{it.tag}</p>
                  <h3 className="mt-3 font-brand text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{it.title}</h3>
                  <p className={clsx("mt-3 text-body-md", it.dark ? "text-white/60" : "text-text-secondary")}>{it.text}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <ul className="flex flex-wrap gap-1.5">
                      {it.chips.map((c) => (
                        <li key={c} className={clsx("rounded-full border px-2.5 py-0.5 text-caption", it.dark ? "border-white/15 text-white/70" : "border-border text-text-secondary")}>
                          {c}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45" aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>
              </NextLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
