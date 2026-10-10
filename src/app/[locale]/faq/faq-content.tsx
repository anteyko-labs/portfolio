"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Link as NextLink } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { EASE } from "@/components/motion/kit";
import { CategoryChips, FaqEmpty, FaqGlyphs, FaqHeroScene, FaqRow, FaqSearch } from "@/components/misc-anim/faq-anim";
import { getFAQItems, type FAQCategory } from "@/lib/faq-data";

// Which data categories each filter chip covers.
const categoryGroups: Record<FAQCategory, FAQCategory[]> = {
  pricing: ["pricing"],
  process: ["process", "timeline", "quality", "general"],
  tech: ["tech", "design"],
  legal: ["legal", "support"],
  web3: ["web3"],
  timeline: ["timeline"],
  support: ["support"],
  quality: ["quality"],
  design: ["design"],
  general: ["general"],
};

export function FAQContent() {
  const { t, language } = useLanguage();
  const faqItems = getFAQItems();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FAQCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const en = language === "en";

  const categories: { value: FAQCategory | "all"; label: string; icon: string }[] = [
    { value: "all", label: t("faq.categories.all"), icon: "✦" },
    { value: "pricing", label: t("faq.categories.pricing"), icon: "💰" },
    { value: "process", label: t("faq.categories.process"), icon: "⚙️" },
    { value: "tech", label: t("faq.categories.tech"), icon: "🛠" },
    { value: "legal", label: t("faq.categories.legal"), icon: "📜" },
    { value: "web3", label: t("faq.categories.web3"), icon: "🔗" },
  ];


  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqItems.filter((item) => {
      const matchesCategory =
        category === "all" ||
        categoryGroups[category as FAQCategory]?.includes(item.category);
      const matchesQuery =
        !q ||
        item.question[language].toLowerCase().includes(q) ||
        item.answer[language].toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [faqItems, query, category, language]);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (hash) {
      requestAnimationFrame(() => setOpenId(hash));
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  const handleCopy = async (id: string) => {
    const url = `${window.location.origin}/faq#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      try { document.execCommand("copy"); setCopiedId(id); setTimeout(() => setCopiedId(null), 1500); } catch { /* ignore */ }
      document.body.removeChild(textArea);
    }
  };

  const highlight = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedQ})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <mark key={`hl-${index}-${part.slice(0, 10)}`} className="bg-accent-primary/20 text-text-primary rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const countFor = (value: FAQCategory | "all") =>
    value === "all" ? faqItems.length : faqItems.filter((item) => categoryGroups[value]?.includes(item.category)).length;
  const heroQuestions = faqItems.slice(0, 6).map((item) => item.question[language]);

  return (
    <>
      <PageHero
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
        eyebrow="FAQ"
        align="left"
        metric={{
          value: String(faqItems.length),
          label: language === "en" ? "answers ready" : "ответов готово",
        }}
        rightSlot={<FaqHeroScene en={en} questions={heroQuestions} />}
      />

      <Section background="secondary" padding="lg" className="relative overflow-hidden">
        <div aria-hidden="true" className="ms-orb pointer-events-none absolute -left-48 top-10 h-[28rem] w-[28rem] rounded-full bg-indigo-300/20 blur-3xl" />
        <div aria-hidden="true" className="ms-orb pointer-events-none absolute -right-48 top-1/2 h-[28rem] w-[28rem] rounded-full bg-fuchsia-300/15 blur-3xl" style={{ animationDelay: "-7s" }} />
        <div className="relative max-w-3xl mx-auto">
          {/* Search & Filters */}
          <motion.div
            className="space-y-5 mb-10"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <FaqSearch
              value={query}
              onChange={setQuery}
              placeholder={t("faq.searchPlaceholder")}
              en={en}
            />
            <CategoryChips
              items={categories.map((cat) => ({ ...cat, count: countFor(cat.value) }))}
              value={category}
              onChange={setCategory}
            />
          </motion.div>

          {/* Results count */}
          <AnimatePresence initial={false}>
            {query.trim() && (
              <motion.p
                key="count"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-caption text-text-tertiary mb-4 overflow-hidden"
                aria-live="polite"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={filteredItems.length}
                    className="inline-block font-semibold tabular-nums text-accent-primary"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {filteredItems.length}
                  </motion.span>
                </AnimatePresence>{" "}
                {language === "en"
                  ? `result${filteredItems.length !== 1 ? "s" : ""} found`
                  : filteredItems.length % 10 === 1 && filteredItems.length % 100 !== 11
                    ? "результат"
                    : [2, 3, 4].includes(filteredItems.length % 10) && ![12, 13, 14].includes(filteredItems.length % 100)
                      ? "результата"
                      : "результатов"}
              </motion.p>
            )}
          </AnimatePresence>

          {/* FAQ Items — Card-based */}
          <div className="space-y-3">
            <AnimatePresence initial={false} mode="popLayout">
              {filteredItems.length === 0 && <FaqEmpty key="empty" en={en} />}
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  id={item.id}
                  layout={reduced ? false : "position"}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, ease: EASE, delay: Math.min(index * 0.03, 0.2) }}
                  className="scroll-mt-28"
                >
                  <FaqRow
                    title={highlight(item.question[language])}
                    open={openId === item.id}
                    onToggle={() => handleToggle(item.id)}
                    number={String(index + 1).padStart(2, "0")}
                  >
                    <div className="space-y-4">
                      <p className="leading-relaxed">{highlight(item.answer[language])}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.id);
                        }}
                        className="group/copy inline-flex items-center gap-1.5 rounded-lg px-2 py-1 -ml-2 text-caption text-accent-primary/70 hover:bg-accent-primary/5 hover:text-accent-primary transition-colors"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {copiedId === item.id ? (
                            <motion.svg key="ok" className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 20 20" fill="none" aria-hidden="true" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <motion.path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35 }} />
                            </motion.svg>
                          ) : (
                            <motion.svg key="link" className="w-3.5 h-3.5 transition-transform group-hover/copy:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                        {copiedId === item.id ? t("faq.copied") : t("faq.copyLink")}
                      </button>
                    </div>
                  </FaqRow>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative isolate mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B14] p-6 text-center text-white shadow-[0_40px_90px_-40px_rgba(30,27,75,0.9)] sm:p-10"
          >
            <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
            <FaqGlyphs />
            <div className="relative mx-auto mb-5 grid h-14 w-14 place-items-center">
              <span aria-hidden="true" className="ms-ping absolute inset-1 rounded-2xl bg-indigo-400/30" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-[0_12px_30px_-8px_rgba(168,85,247,0.8)]">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </span>
            </div>
            <p className="font-brand text-2xl font-semibold tracking-tight sm:text-3xl mb-3">
              <span className="home-gradient-text">
                {language === "en"
                  ? "Still have questions?"
                  : "Остались вопросы?"}
              </span>
            </p>
            <p className="text-body-md text-white/60 mb-7">
              {language === "en"
                ? "We respond within 24 hours. No bots, real engineers."
                : "Отвечаем в течение 24 часов. Без ботов, живые инженеры."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <NextLink
                href="/contact"
                className="home-cta-glow group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0A0A0F] text-body-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B14]"
              >
                {t("cta.primary")}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </NextLink>
              <NextLink
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/5 text-body-sm text-white font-medium backdrop-blur hover:bg-white/10 transition-colors"
              >
                {t("cta.secondary")}
              </NextLink>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
