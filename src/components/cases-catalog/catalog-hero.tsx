"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { catalogEntries, sortEntries } from "@/lib/catalog";
import { microCases } from "@/lib/cases-data";
import { plural } from "./labels";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const controls = animate(0, to, {
      duration: 1.4,
      delay,
      ease: EASE,
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => controls.stop();
  }, [to, delay, reduced]);
  return (
    <span ref={ref} className="tabular-nums">
      {to}
    </span>
  );
}

export function CatalogHero() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wallY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const wallTilt = useTransform(scrollYProgress, [0, 1], [24, 8]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const withCover = sortEntries(catalogEntries.filter((e) => e.cover && !e.mobileFirst && !e.phones), "featured", language);
  const rows = [0, 1, 2].map((r) => withCover.filter((_, i) => i % 3 === r));

  // Everything on the page: catalog entries plus the "More work" list below it
  const total = catalogEntries.length + microCases.length;
  const industries = new Set(catalogEntries.map((e) => industryGroup(e.industry.ru))).size;
  const directions = new Set(catalogEntries.map((e) => e.category)).size;
  const years = catalogEntries.map((e) => e.year);
  const span = Math.max(...years) - Math.min(...years) + 1;

  const lines =
    language === "en"
      ? [["Work you can"], ["open", " and scroll"], ["right here"]]
      : [["Работы, которые"], ["можно ", "открыть"], ["и пролистать"]];
  const accentWord = language === "en" ? "open" : "открыть";

  const stats = [
    { value: total, label: language === "en" ? "projects and modules" : plural(total, ["проект и модуль", "проекта и модуля", "проектов и модулей"]) },
    { value: industries, label: language === "en" ? "industries" : plural(industries, ["отрасль", "отрасли", "отраслей"]) },
    { value: span, label: language === "en" ? "years in production" : plural(span, ["год в разработке", "года в разработке", "лет в разработке"]) },
    { value: directions, label: language === "en" ? "web, product, Web3, infra" : "сайты, продукты, Web3, инфра" },
  ];

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-bg-primary pb-10 pt-10 md:pb-16 md:pt-16">
      {/* Wall of real screens, tilted in perspective */}
      <motion.div
        aria-hidden="true"
        className="catalog-wall pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[125%]"
        style={reduced ? undefined : { y: wallY, opacity: fade }}
      >
        <motion.div className="catalog-wall__plane" style={reduced ? undefined : { rotateX: wallTilt, rotateZ: -7 }}>
          {rows.map((row, r) => (
            <div key={r} className="catalog-wall__row" data-dir={r % 2 ? "rev" : "fwd"} style={{ ["--dur" as string]: `${70 + r * 14}s` }}>
              {[...row, ...row].map((e, i) => (
                <div key={`${e.slug}-${i}`} className="catalog-wall__tile">
                  <Image src={e.cover!} alt="" fill sizes="360px" className="object-cover object-top" priority={r === 0 && i < 3} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
      <div aria-hidden="true" className="catalog-wall__veil pointer-events-none absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          className="flex items-center gap-3 font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="h-px w-8 bg-text-muted" />
          {language === "en" ? "Cases · catalog" : "Кейсы · каталог"}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-primary/70 px-2.5 py-0.5 normal-case tracking-normal text-text-secondary backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success motion-reduce:animate-none" />
            {language === "en" ? "live previews" : "живые превью"}
          </span>
        </motion.p>

        <h1 className="mt-6 max-w-5xl font-brand text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.035em] text-text-primary sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {lines.map((parts, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.08 + i * 0.09, ease: EASE }}
              >
                {parts.map((p) =>
                  p.trim() === accentWord ? (
                    <span key={p} className="catalog-hero__accent">
                      {p}
                    </span>
                  ) : (
                    <span key={p}>{p}</span>
                  )
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          >
            <p className="max-w-xl text-body-lg text-text-secondary">
              {language === "en"
                ? "Websites, products and Web3 platforms by Anteyko — from landing pages and online stores to ERP, banking and tokenization platforms. The previews in the cards are real pages — they scroll by themselves."
                : "Сайты, продукты и Web3-платформы студии Anteyko — от лендингов и интернет-магазинов до ERP, банкинга и платформ токенизации. Превью в карточках — настоящие страницы, и они листаются сами."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-text-primary px-5 py-3 text-body-md font-medium text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
              >
                {language === "en" ? "Browse the catalog" : "Смотреть каталог"}
                <span aria-hidden="true">↓</span>
              </a>
              <NextLink
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-primary/80 px-5 py-3 text-body-md font-medium text-text-primary backdrop-blur transition-colors hover:border-accent-primary/40 hover:text-accent-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              >
                {language === "en" ? "Discuss your project" : "Обсудить проект"}
              </NextLink>
            </div>
          </motion.div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4 lg:w-[34rem]">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="bg-bg-primary/85 p-4 backdrop-blur md:p-5"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.07, ease: EASE }}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-brand text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                    <Counter to={s.value} delay={0.55 + i * 0.07} />
                  </span>
                  <span className="mt-1 block text-caption leading-snug text-text-tertiary">{s.label}</span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// Industry labels vary per project ("Финтех", "FinTech / Крипто", …) —
// fold them into broad groups so the counter stays honest.
const INDUSTRY_GROUPS: [string, RegExp][] = [
  ["food", /общепит|horeca|foodtech|суши|ресторан/i],
  ["fintech", /финтех|fintech|банк|инвест|токениз|крипто/i],
  ["web3", /web3|defi|блокчейн/i],
  ["travel", /туризм|путешеств/i],
  ["commerce", /e-commerce|розниц|магазин|продаж|малый бизнес/i],
  ["auto", /авто|прокат/i],
  ["transport", /перевозк|логистик/i],
  ["manufacturing", /производств|металлург|микроэлектрон|швейн/i],
  ["saas", /saas|business intelligence|аналитик/i],
];
function industryGroup(label: string) {
  return INDUSTRY_GROUPS.find(([, re]) => re.test(label))?.[0] ?? label.toLowerCase();
}
