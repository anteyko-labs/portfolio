"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";

// Clients whose names we show publicly. Logos come from the projects themselves
// (Asaki's brand kit, Paddock's site, TRM's file); ShoeStreet and Avtodom use a
// text wordmark in their own UI, so they are set in type the same way.
// Each tile lifts and glows in the brand colour on hover, with a one-line caption.
type Client = {
  name: string;
  what: { en: string; ru: string };
  color: string;
  logo: React.ReactNode;
};

const CLIENTS: Client[] = [
  {
    name: "Asaki Sushi",
    what: { en: "Ordering PWA", ru: "PWA заказов" },
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
    what: { en: "Offer acceptance", ru: "Акцепт оферты" },
    color: "#F97316",
    logo: <Image src="/logos/trm.png" alt="TRM" width={160} height={80} className="h-12 w-auto object-contain" />,
  },
  {
    name: "Paddock Rent a Car",
    what: { en: "Car rental, Dubai", ru: "Прокат авто, Дубай" },
    color: "#E4252A",
    logo: <Image src="/logos/paddock.png" alt="Paddock Rent a Car" width={443} height={33} className="h-6 w-auto" />,
  },
  {
    name: "ShoeStreet",
    what: { en: "Sneaker store", ru: "Магазин кроссовок" },
    color: "#B08968",
    logo: (
      <span className="inline-block origin-center scale-x-[0.86] font-sans text-[26px] font-extrabold uppercase leading-none tracking-[0.08em]">
        ShoeStreet
      </span>
    ),
  },
  {
    name: "Avtodom",
    what: { en: "Auto service accounting", ru: "Учёт для автосервиса" },
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
  const en = language === "en";

  return (
    <section className="border-b border-border bg-bg-primary py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary">{en ? "Trusted by" : "Нам доверяют"}</p>
          <p className="text-body-md text-text-secondary">
            {en ? "And 40+ more products in production — many of them under NDA." : "И ещё 40+ продуктов в продакшене — многие из них под NDA."}
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
                className="logo-tile group relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-bg-secondary px-4 text-text-primary transition-[border-color,box-shadow,transform,color] duration-500 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
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
