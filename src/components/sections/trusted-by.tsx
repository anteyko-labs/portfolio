"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick, type L } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";

// Clients whose names we show publicly. Logos come from the projects themselves
// (Asaki's brand kit, AKMOU's and AnarMarket's brand folders, Djal's and TRM's
// files); Avtodom has no logo of its own, so it gets a small animated mark.
// The wall is alive but quiet: logos drift, a light sweep runs across the tiles
// in turn, and each tile lifts and glows in the brand colour on hover.
// `featured` sets a client on a dark tile.
type Client = {
  name: string;
  what: L;
  color: string;
  logo: React.ReactNode;
  featured?: boolean;
};

/** Avtodom mark: a car with an oil drop on the door, driving on the spot */
function AvtodomMark() {
  return (
    <svg viewBox="0 0 80 40" className="avd-mark h-7 w-auto shrink-0 overflow-visible sm:h-9" aria-hidden="true">
      {/* exhaust puffs */}
      <circle className="avd-puff" cx="4" cy="29" r="2.2" fill="currentColor" />
      <circle className="avd-puff avd-puff--2" cx="4" cy="29" r="2.2" fill="currentColor" />
      {/* road running under the wheels */}
      <line className="avd-road" x1="0" y1="38.5" x2="80" y2="38.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="7 6" opacity="0.35" />
      <g className="avd-body">
        <path
          fill="currentColor"
          d="M6 27c0-3.5 2-5 5.5-5.5l9.5-1 7.5-7c1.5-1.5 3.3-2 5.5-2h15c2.5 0 4.2.8 5.8 2.5l6.2 6.5 7 1.1c3.5.6 5 2.4 5 5.4v2.5c0 1.5-1 2.5-2.5 2.5h-62C7 32 6 31 6 29.5Z"
        />
        <path className="fill-bg-secondary" d="M30.5 14.2c.8-.7 1.8-1 3-1h6v6.8h-15Zm11.5-1h6.5c1.5 0 2.8.6 3.8 1.7l5.2 5.1H42Z" />
        {/* oil drop on the door */}
        <path className="avd-drop" fill="#F59E0B" d="M40 21.6c1.7 2.3 2.8 3.8 2.8 5.1a2.8 2.8 0 0 1-5.6 0c0-1.3 1.1-2.8 2.8-5.1Z" />
      </g>
      {[20, 59].map((cx) => (
        <g key={cx} className="avd-wheel">
          <circle cx={cx} cy="32" r="5.2" fill="currentColor" />
          <circle className="fill-bg-secondary" cx={cx} cy="32" r="2.4" />
          <path d={`M${cx} 29.6v4.8M${cx - 2.4} 32h4.8`} stroke="currentColor" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

const CLIENTS: Client[] = [
  {
    name: "Asaki Sushi",
    what: { en: "Ordering PWA", ru: "PWA заказов", zh: "点餐 PWA", tr: "Sipariş PWA'sı", ar: "PWA للطلبات" },
    color: "#E11D2E",
    logo: (
      <span className="flex items-center gap-2">
        <Image src="/logos/asaki-mark.svg" alt="" width={40} height={40} className="h-9 w-9" />
        <Image src="/logos/asaki-wordmark.svg" alt="Asaki Sushi" width={120} height={44} className="h-8 w-auto" />
      </span>
    ),
  },
  {
    name: "AKMOU",
    what: { en: "Fashion B2B showcase", ru: "Fashion B2B-витрина", zh: "时装 B2B 展示网站", tr: "Moda B2B vitrini", ar: "واجهة أزياء B2B" },
    color: "#C9A57A",
    featured: true,
    logo: <Image src="/logos/akmou.svg" alt="AKMOU" width={2398} height={436} className="h-8 w-auto invert sm:h-10" />,
  },
  {
    name: "TRM",
    what: { en: "Offer acceptance", ru: "Акцепт оферты", zh: "要约接受", tr: "Teklif onayı", ar: "قبول العرض" },
    color: "#F97316",
    logo: <Image src="/logos/trm.png" alt="TRM" width={160} height={80} className="h-12 w-auto object-contain" />,
  },
  {
    name: "Djal",
    what: { en: "Guest survey & promos", ru: "Опрос гостей и акции", zh: "顾客调研与促销", tr: "Misafir anketi ve promosyonlar", ar: "استطلاع الضيوف والعروض" },
    color: "#EA580C",
    logo: <Image src="/logos/djal.png" alt="Шашлычная Джал" width={704} height={240} className="h-12 w-auto" />,
  },
  {
    name: "AnarMarket",
    what: { en: "Wholesale ordering", ru: "Оптовые заказы", zh: "批发订货", tr: "Toptan sipariş", ar: "طلبات الجملة" },
    color: "#B3262F",
    logo: <Image src="/logos/anarmarket.png" alt="AnarMarket" width={733} height={105} className="h-6 w-auto sm:h-8" />,
  },
  {
    name: "Avtodom",
    what: { en: "Auto service accounting", ru: "Учёт для автосервиса", zh: "汽修服务会计", tr: "Oto servis muhasebesi", ar: "محاسبة مركز خدمة السيارات" },
    color: "#2563EB",
    logo: (
      <span className="flex items-center gap-1.5 font-sans text-[19px] font-bold leading-none tracking-tight sm:gap-2 sm:text-[24px]">
        <AvtodomMark />
        Avtodom
      </span>
    ),
  },
];

export function TrustedBySection() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();

  return (
    <section className="border-b border-border bg-bg-primary py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary">{pick({ en: "Trusted by", ru: "Нам доверяют", zh: "受信赖于", tr: "Güvenenler", ar: "يثق بنا" }, language)}</p>
          <p className="text-body-md text-text-secondary">
            {pick({ en: "70+ projects in total — many of them under NDA.", ru: "Всего 70+ проектов — многие из них под NDA.", zh: "累计 70 多个项目——其中许多受 NDA 保护。", tr: "Toplamda 70'ten fazla proje — çoğu NDA kapsamında.", ar: "أكثر من 70 مشروعًا إجمالًا — كثير منها بموجب NDA." }, language)}
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CLIENTS.map((c, i) => (
            <motion.li
              key={c.name}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={clsx(
                  "logo-tile group relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-2xl border px-4 transition-[border-color,box-shadow,color] duration-500",
                  c.featured ? "logo-tile--featured border-[#2A2620] bg-[#0A0A0A] text-white" : "border-border bg-bg-secondary text-text-primary"
                )}
                style={{ ["--brand" as string]: c.color, ["--i" as string]: i }}
                title={c.name}
              >
                {c.featured && <span aria-hidden="true" className="logo-tile__aura pointer-events-none absolute inset-0" />}
                <span aria-hidden="true" className="logo-tile__sheen pointer-events-none absolute inset-0" />
                <span aria-hidden="true" className="logo-tile__glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="logo-tile__drift relative flex h-12 items-center transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105">{c.logo}</span>
                <span
                  className={clsx(
                    "relative mt-1 translate-y-2 font-mono text-[11px] uppercase tracking-wider opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100",
                    c.featured ? "text-white/60" : "text-text-tertiary"
                  )}
                >
                  {c.what[language]}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
