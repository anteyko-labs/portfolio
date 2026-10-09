"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { GENERATIVE_COVERS } from "@/components/cases-catalog/generative-covers";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Full-page screenshot that pans down while the card is hovered */
function SitePan({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-t-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/showcase/paddock/full.jpg"
        alt=""
        loading="lazy"
        className="absolute left-0 top-0 w-full"
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

/** Blocks chaining up, the newest one pulsing */
function Chain({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center overflow-hidden" style={{ background: "radial-gradient(circle at 70% 40%, #7C3AED40, transparent 60%), #0B0B14" }}>
      <div className={clsx("home-chain flex gap-3 pl-6", active && "home-chain--fast")}>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="grid h-20 w-24 shrink-0 place-content-center rounded-xl border border-white/15 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 text-center">
              <span className="font-mono text-[10px] text-white/50">batch</span>
              <span className="font-mono text-sm font-semibold text-white">#{(1024 + i).toString(16)}</span>
            </div>
            <span className="h-px w-6 bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeServices() {
  const { language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const Bi = GENERATIVE_COVERS["analytics-pro-enterprise-bi"];

  const items = [
    {
      span: "lg:col-span-7",
      href: "/services/launch-site",
      tag: en ? "Websites" : "Сайты",
      title: en ? "Websites that sell — and that people scroll to the end" : "Сайты, которые продают и которые хочется долистать",
      text: en ? "Corporate sites, catalogs with booking, landing pages with scroll scenes. SEO, speed and analytics from day one." : "Корпоративные сайты, каталоги с бронированием, лендинги со скролл-сценами. SEO, скорость и аналитика с первого дня.",
      chips: ["Next.js", "CSS 3D", "SEO"],
      visual: (a: boolean) => <SitePan active={a} />,
      dark: false,
    },
    {
      span: "lg:col-span-5",
      href: "/services/mvp-sprint",
      tag: en ? "Products & MVP" : "Продукты и MVP",
      title: en ? "Apps your customers install" : "Приложения, которые ставят на телефон",
      text: en ? "Ordering, booking and loyalty PWAs with an owner's cabinet." : "PWA для заказов, записи и лояльности — с кабинетом владельца.",
      chips: ["PWA", "Push", en ? "Admin" : "Админка"],
      visual: (a: boolean) => <Phones active={a} />,
      dark: true,
    },
    {
      span: "lg:col-span-5",
      href: "/services/web3-addon",
      tag: "Web3",
      title: en ? "From a token to your own L1" : "От токена до собственного L1",
      text: en ? "Smart contracts, wallets, tokenization platforms and a full blockchain with a perp DEX." : "Смарт-контракты, кошельки, платформы токенизации и целый блокчейн с DEX перпетуалов.",
      chips: ["Rust", "EVM", "Solidity"],
      visual: (a: boolean) => <Chain active={a} />,
      dark: true,
    },
    {
      span: "lg:col-span-7",
      href: "/services/startup-under-key",
      tag: en ? "ERP, CRM, analytics" : "ERP, CRM, аналитика",
      title: en ? "Systems the business runs on" : "Системы, на которых держится бизнес",
      text: en ? "Accounting, marking and logistics, BI dashboards — built around how your team actually works." : "Учёт, маркировка и логистика, BI-дашборды — под то, как реально работает ваша команда.",
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
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary">{en ? "What we build" : "Что мы делаем"}</p>
            <h2 className="mt-4 max-w-2xl font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-text-primary md:text-6xl">
              {en ? "One studio, the whole product" : "Одна студия — весь продукт"}
            </h2>
          </div>
          <p className="max-w-md text-body-lg text-text-secondary">
            {en
              ? "Design, frontend, backend, admin panels, integrations and launch — Web2 and Web3 in one delivery loop."
              : "Дизайн, фронтенд, бэкенд, админки, интеграции и запуск — Web2 и Web3 в одном цикле поставки."}
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
