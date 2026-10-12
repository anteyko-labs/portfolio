"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick, type L } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";

// Clients whose names we show publicly. Logos come from the projects themselves
// (Asaki's brand kit, Djal's logo file, TRM's file); ShoeStreet and Avtodom use a
// text wordmark in their own UI, so they are set in type the same way.
// Each tile lifts and glows in the brand colour on hover, with a one-line caption.
type Client = {
  name: string;
  what: L;
  color: string;
  logo: React.ReactNode;
};

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
    name: "ShoeStreet",
    what: { en: "Sneaker store", ru: "Магазин кроссовок", zh: "球鞋商店", tr: "Spor ayakkabı mağazası", ar: "متجر أحذية رياضية" },
    color: "#B08968",
    logo: (
      <span className="inline-block origin-center scale-x-[0.86] font-sans text-[26px] font-extrabold uppercase leading-none tracking-[0.08em]">
        ShoeStreet
      </span>
    ),
  },
  {
    name: "Avtodom",
    what: { en: "Auto service accounting", ru: "Учёт для автосервиса", zh: "汽修服务会计", tr: "Oto servis muhasebesi", ar: "محاسبة مركز خدمة السيارات" },
    color: "#2563EB",
    logo: (
      <span className="flex items-center gap-2 font-sans text-[24px] font-bold leading-none tracking-tight">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-current">
          <span className="text-[15px] font-black text-bg-secondary">A</span>
        </span>
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

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CLIENTS.map((c, i) => (
            <motion.li
              key={c.name}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={i === CLIENTS.length - 1 ? "col-span-2 sm:col-span-1" : undefined}
            >
              <div
                className="logo-tile group relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-bg-secondary px-4 text-text-primary transition-[border-color,box-shadow,color] duration-500"
                style={{ ["--brand" as string]: c.color }}
                title={c.name}
              >
                <span aria-hidden="true" className="logo-tile__glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative flex h-12 items-center transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105">{c.logo}</span>
                <span className="relative mt-1 translate-y-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
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
