"use client";

import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { pick } from "@/lib/i18n-text";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { AnimatedItem, Section } from "@/components/ui/section";
import { CaseBottomCTA } from "@/components/case-bottom-cta";
import { ShowcaseViewer } from "@/components/cases-catalog/showcase-viewer";
import { AdminShowcase } from "@/components/cases-catalog/admin-showcase";
import { CATEGORY_LABEL, pad } from "@/components/cases-catalog/labels";
import { catalogEntries, sortEntries } from "@/lib/catalog";
import type { ShowcaseItem } from "@/lib/showcase-data";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ShowcaseDetailContent({ item }: { item: ShowcaseItem }) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();

  const ordered = sortEntries(catalogEntries, "featured", language);
  const index = ordered.findIndex((e) => e.slug === item.slug);
  const next = ordered[(index + 1) % ordered.length];
  const external = item.url && /^https?:/.test(item.url);

  const meta: [string, string][] = [
    [pick({ en: "Industry", ru: "Сфера", zh: "行业", tr: "Sektör", ar: "القطاع" }, language), item.sphere[language]],
    [pick({ en: "Format", ru: "Формат", zh: "形式", tr: "Format", ar: "الصيغة" }, language), item.format[language]],
    [pick({ en: "Year", ru: "Год", zh: "年份", tr: "Yıl", ar: "السنة" }, language), String(item.year)],
    ...(item.stack?.length
      ? ([[pick({ en: "Stack", ru: "Стек", zh: "技术栈", tr: "Yığın", ar: "التقنيات" }, language), item.stack.slice(0, 4).join(" · ")]] as [string, string][])
      : item.fonts
        ? ([[pick({ en: "Typefaces", ru: "Шрифты", zh: "字体", tr: "Yazı tipleri", ar: "الخطوط" }, language), item.fonts]] as [string, string][])
        : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-bg-primary pb-10 pt-10 md:pb-14 md:pt-14">
        {/* Project palette as a soft glow behind the title */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${item.palette[2]}, transparent 65%)` }}
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">
            <NextLink href="/cases" className="inline-flex items-center gap-2 transition-colors hover:text-accent-primary">
              <span aria-hidden="true">←</span> {pick({ en: "All work", ru: "Все работы", zh: "全部作品", tr: "Tüm işler", ar: "جميع الأعمال" }, language)}
            </NextLink>
            <span>
              {pad(index + 1)} / {pad(ordered.length)}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-body-sm text-text-secondary">
            <span className="font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">
              {CATEGORY_LABEL[item.category][language]} · {item.year}
            </span>
          </div>

          <h1 className="mt-5 overflow-hidden pb-[0.06em] font-brand text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-text-primary sm:text-7xl lg:text-8xl">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {item.title[language]}
            </motion.span>
          </h1>
          <motion.p
            className="mt-4 max-w-2xl text-heading-md text-text-secondary"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          >
            {item.client[language]}
          </motion.p>

          <div className="mt-10 grid gap-6 border-t border-border pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">{k}</dt>
                  <dd className="mt-1 text-body-md text-text-primary">{v}</dd>
                </div>
              ))}
            </dl>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary px-5 py-3 text-body-md font-medium text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
              >
                {pick({ en: "Open site", ru: "Открыть сайт", zh: "打开网站", tr: "Siteyi aç", ar: "افتح الموقع" }, language)}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <ShowcaseViewer item={item} />
          </motion.div>
        </div>
      </section>

      {item.admin?.length ? <AdminShowcase item={item} /> : null}

      <Section background="secondary" padding="lg" className="border-t border-border">
        <div className="grid gap-10 lg:grid-cols-[14rem_1fr]">
          <AnimatedItem>
            <p className="font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">{pick({ en: "Review", ru: "Разбор", zh: "解析", tr: "İnceleme", ar: "مراجعة" }, language)}</p>
          </AnimatedItem>
          <div className="max-w-3xl">
            <AnimatedItem>
              <p className="text-heading-lg font-medium leading-snug text-text-primary md:text-heading-xl">{item.summary[language]}</p>
            </AnimatedItem>
            {item.review[language].map((p, i) => (
              <AnimatedItem key={i} delay={0.05 * (i + 1)}>
                <p className="mt-6 text-body-lg text-text-secondary">{p}</p>
              </AnimatedItem>
            ))}
            <AnimatedItem>
              <ul className="mt-8 flex flex-wrap gap-2">
                {Array.from(new Set([...item.tags[language], ...(item.stack ?? [])])).map((t, i) => (
                  <motion.li
                    key={t}
                    initial={reduced ? false : { opacity: 0, scale: 0.6, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 18, delay: i * 0.04 }}
                    className="rounded-full border border-border bg-bg-primary px-3 py-1 text-body-sm text-text-secondary transition-colors hover:border-accent-primary/40 hover:text-text-primary"
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>
            </AnimatedItem>
          </div>
        </div>
      </Section>

      <Section background="primary" padding="lg">
        <div className="grid gap-10 lg:grid-cols-[14rem_1fr]">
          <AnimatedItem>
            <p className="font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">{pick({ en: "Techniques", ru: "Приёмы", zh: "技法", tr: "Teknikler", ar: "التقنيات والأساليب" }, language)}</p>
          </AnimatedItem>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {item.features.map((f, i) => (
              <AnimatedItem key={f.title.en} delay={i * 0.08}>
                <li className="group relative h-full bg-bg-primary p-6 transition-colors duration-500 hover:bg-bg-secondary md:p-8">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 transition-transform duration-700 group-hover:scale-x-100" />
                  <span className="font-mono text-caption text-accent-primary">{pad(i + 1)}</span>
                  <h3 className="mt-6 text-heading-md font-semibold text-text-primary">{f.title[language]}</h3>
                  <p className="mt-2 text-body-md text-text-secondary">{f.text[language]}</p>
                </li>
              </AnimatedItem>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[14rem_1fr]">
          <AnimatedItem>
            <p className="font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">{pick({ en: "Palette", ru: "Палитра", zh: "配色", tr: "Palet", ar: "لوحة الألوان" }, language)}</p>
          </AnimatedItem>
          <AnimatedItem>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {item.palette.map((c, i) => (
                <li key={`${c}-${i}`} className="group overflow-hidden rounded-xl border border-border transition-transform duration-500 hover:-translate-y-1">
                  <span className="block h-20 overflow-hidden">
                    <motion.span
                      className="block h-full origin-bottom transition-transform duration-500 group-hover:scale-y-110"
                      style={{ background: c }}
                      initial={reduced ? false : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                    />
                  </span>
                  <code className="block bg-bg-primary px-3 py-2 font-mono text-caption text-text-secondary">{c.toUpperCase()}</code>
                </li>
              ))}
            </ul>
          </AnimatedItem>
        </div>
      </Section>

      {next && (
        <NextLink
          href={`/cases/${next.slug}`}
          className="group block overflow-hidden border-t border-border bg-text-primary text-white"
          data-cursor={pick({ en: "Next", ru: "Дальше", zh: "下一步", tr: "İleri", ar: "التالي" }, language)}
        >
          <div className="container mx-auto flex flex-col gap-3 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <span className="font-mono text-caption uppercase tracking-[0.16em] text-white/50">{pick({ en: "Next work", ru: "Следующая работа", zh: "下一个作品", tr: "Sonraki iş", ar: "العمل التالي" }, language)}</span>
            <span className="flex flex-wrap items-center gap-x-4 font-brand text-4xl font-semibold tracking-[-0.03em] [overflow-wrap:anywhere] md:text-7xl">
              {next.title[language]}
              <span className="transition-transform duration-500 group-hover:translate-x-3 motion-reduce:group-hover:translate-x-0" aria-hidden="true">
                →
              </span>
            </span>
            <span className="text-body-md text-white/60">{next.client[language]}</span>
          </div>
        </NextLink>
      )}

      <CaseBottomCTA />
    </>
  );
}
