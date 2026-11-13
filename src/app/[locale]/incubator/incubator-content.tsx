"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Link as NextLink } from "@/i18n/navigation";
import { DrawCheck, EASE } from "@/components/motion/kit";
import { ApplyForm, TelegramIcon } from "@/components/incubator/apply-form";

// /incubator is the page the QR code in the talk deck points to
// (https://www.anteyko.com/ru/incubator?src=talk-1311), so it stays at this URL.
// It is a link hub for phones: socials first, then the big «Инкубация» button
// that opens the interactive program, then the application form.
// ApplyForm keeps ?src= in sessionStorage, so the mark survives the trip to
// /incubator/program and back.

export const CHANNEL_URL = "https://t.me/anteykolabs";

type T = { en: string; ru: string };

const LINKS = [
  { key: "tg", href: CHANNEL_URL, title: { en: "Telegram channel", ru: "Telegram-канал" }, handle: "@anteykolabs", kind: "tg" as const },
  { key: "ig-labs", href: "https://www.instagram.com/anteyko.labs/", title: { en: "Instagram Anteyko Labs", ru: "Instagram Anteyko Labs" }, handle: "@anteyko.labs", kind: "ig" as const },
  { key: "ig-erg", href: "https://www.instagram.com/ergeshovl/", title: { en: "Instagram", ru: "Instagram" }, handle: "@ergeshovl", kind: "ig" as const },
];

export function IncubatorContent() {
  const { language } = useLanguage();
  const lang: "en" | "ru" = language === "ru" ? "ru" : "en";
  const tx = useCallback((v: T) => v[lang], [lang]);
  const reduced = useReducedMotion();

  return (
    <>
      <section className="section-dark relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-16">
        <div aria-hidden="true" className="home-aurora home-aurora--violet pointer-events-none absolute inset-0 -z-10 opacity-50" />
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="text-center">
            <p className="font-mono text-caption uppercase tracking-[0.18em] text-indigo-300">{tx({ en: "IT incubator · free for students", ru: "IT-инкубатор · бесплатно для студентов" })}</p>
            <h1 className="mt-3 font-brand text-heading-xl font-semibold tracking-tight text-white">Anteyko Labs</h1>
            <p className="mx-auto mt-3 max-w-md text-body-lg text-white/60">
              {tx({ en: "Trainers in architecture, DevOps and MVP from a team that builds real products.", ru: "Тренажёры по архитектуре, DevOps и MVP от команды, которая делает настоящие продукты." })}
            </p>
          </motion.div>

          <ul className="mt-8 space-y-3">
            {LINKS.map((l, i) => (
              <motion.li key={l.key} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: EASE }}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white transition hover:border-white/30 hover:bg-white/[0.07] active:scale-[0.99]"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${l.kind === "tg" ? "bg-[#229ED9]" : "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]"}`}>
                    {l.kind === "tg" ? <TelegramIcon className="h-5 w-5" /> : <InstagramIcon className="h-5 w-5" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-body-md font-medium">{tx(l.title)}</span>
                    <span className="block truncate font-mono text-[12px] text-white/50">{l.handle}</span>
                  </span>
                  <span aria-hidden="true" className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white">→</span>
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease: EASE }} className="mt-6">
            <IncubationButton tx={tx} reduced={reduced} />
          </motion.div>

          <a href="#apply" className="mt-5 block text-center text-body-sm text-white/55 underline-offset-4 transition hover:text-white hover:underline">
            {tx({ en: "Or apply right away ↓", ru: "Или сразу подать заявку ↓" })}
          </a>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-bg-secondary py-14 sm:py-20">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-caption uppercase tracking-[0.18em] text-accent-primary">{tx({ en: "Application", ru: "Заявка" })}</p>
            <h2 className="mt-3 font-brand text-heading-xl font-semibold tracking-tight">{tx({ en: "Tell us about yourself", ru: "Расскажите о себе" })}</h2>
            <p className="mt-4 max-w-md text-body-lg text-text-secondary">
              {tx({ en: "We read every application and write back to get acquainted. No tests at the entrance.", ru: "Читаем каждую заявку и пишем, чтобы познакомиться. Вступительных тестов нет." })}
            </p>
            <ul className="mt-8 space-y-3 text-body-md text-text-secondary">
              {[
                { en: "Free of charge", ru: "Бесплатно" },
                { en: "Any year and major", ru: "Любой курс и специальность" },
                { en: "Online and in our Bishkek office", ru: "Онлайн и в офисе в Бишкеке" },
              ].map((x, i) => (
                <li key={x.en} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                    <DrawCheck delay={0.1 * i} className="h-3.5 w-3.5" />
                  </span>
                  {tx(x)}
                </li>
              ))}
            </ul>
          </div>
          <ApplyForm tx={tx} channelUrl={CHANNEL_URL} />
        </div>
      </section>
    </>
  );
}

/** The big «Инкубация» button: opens the interactive program */
function IncubationButton({ tx, reduced }: { tx: (v: T) => string; reduced: boolean }) {
  return (
    <NextLink
      href="/incubator/program"
      className="group relative isolate block overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 p-[1.5px] shadow-[0_25px_60px_-20px_rgba(217,70,239,0.65)] transition active:scale-[0.99]"
    >
      <span className="relative flex items-center justify-between gap-4 overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#0B0B14] px-6 py-6 sm:px-8 sm:py-7">
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={{ x: ["0%", "450%"] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
          />
        )}
        <span className="relative text-left">
          <span className="block bg-gradient-to-r from-white via-fuchsia-100 to-amber-100 bg-clip-text font-brand text-[2rem] font-semibold leading-none tracking-tight text-transparent sm:text-[2.5rem]">
            {tx({ en: "Incubation", ru: "Инкубация" })}
          </span>
          <span className="mt-2 block text-body-sm text-white/60">{tx({ en: "3 playable trainers: architecture, DevOps, MVP", ru: "3 тренажёра прямо в браузере: архитектура, DevOps, MVP" })}</span>
        </span>
        <motion.span
          aria-hidden="true"
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl text-[#0A0A0A] transition-transform group-hover:translate-x-1"
          animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </span>
    </NextLink>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
