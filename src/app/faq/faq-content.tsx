"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { AccordionItem } from "@/components/ui/accordion";
import { SearchInput } from "@/components/ui/search-input";
import { getFAQItems, type FAQCategory } from "@/lib/faq-data";

export function FAQContent() {
  const { t, language } = useLanguage();
  const faqItems = getFAQItems();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FAQCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: { value: FAQCategory | "all"; label: string; icon: string }[] = [
    { value: "all", label: t("faq.categories.all"), icon: "✦" },
    { value: "pricing", label: t("faq.categories.pricing"), icon: "💰" },
    { value: "process", label: t("faq.categories.process"), icon: "⚙️" },
    { value: "tech", label: t("faq.categories.tech"), icon: "🛠" },
    { value: "legal", label: t("faq.categories.legal"), icon: "📜" },
    { value: "web3", label: t("faq.categories.web3"), icon: "🔗" },
  ];

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
      setOpenId(hash);
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

  return (
    <>
      <PageHero
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
        eyebrow="FAQ"
        metric={{
          value: String(faqItems.length),
          label: language === "en" ? "answers ready" : "ответов готово",
        }}
      />

      <Section background="secondary" padding="lg">
        <div className="max-w-3xl mx-auto">
          {/* Search & Filters */}
          <div className="space-y-5 mb-10">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder={t("faq.searchPlaceholder")}
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  aria-pressed={category === cat.value}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-body-sm font-medium border transition-all duration-200 ${
                    category === cat.value
                      ? "border-accent-primary/40 bg-accent-primary/10 text-accent-primary shadow-sm shadow-accent-primary/10"
                      : "border-border/60 bg-bg-primary/40 text-text-tertiary hover:text-text-secondary hover:border-border hover:bg-bg-primary/80"
                  }`}
                >
                  <span className="text-sm" aria-hidden="true">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {query.trim() && (
            <AnimatedItem>
              <p className="text-caption text-text-tertiary mb-4">
                {language === "en"
                  ? `${filteredItems.length} result${filteredItems.length !== 1 ? "s" : ""} found`
                  : `${filteredItems.length} ${filteredItems.length === 1 ? "результат" : filteredItems.length < 5 ? "результата" : "результатов"}`}
              </p>
            </AnimatedItem>
          )}

          {/* FAQ Items — Card-based */}
          <div className="space-y-3">
            {filteredItems.length === 0 && (
              <AnimatedItem>
                <div className="py-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-bg-tertiary/60 flex items-center justify-center">
                    <svg className="w-7 h-7 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-body-md text-text-secondary mb-1">
                    {language === "en" ? "No results found" : "Ничего не найдено"}
                  </p>
                  <p className="text-caption text-text-tertiary">
                    {language === "en"
                      ? "Try another keyword or category"
                      : "Попробуйте другой запрос или категорию"}
                  </p>
                </div>
              </AnimatedItem>
            )}
            {filteredItems.map((item, index) => (
              <AnimatedItem key={item.id} delay={Math.min(index * 0.04, 0.4)}>
                <div id={item.id}>
                  <AccordionItem
                    title={highlight(item.question[language])}
                    isOpen={openId === item.id}
                    onToggle={() => handleToggle(item.id)}
                    number={String(index + 1).padStart(2, "0")}
                    variant="card"
                  >
                    <div className="space-y-4">
                      <p className="leading-relaxed">{highlight(item.answer[language])}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.id);
                        }}
                        className="inline-flex items-center gap-1.5 text-caption text-accent-primary/70 hover:text-accent-primary transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        {copiedId === item.id ? t("faq.copied") : t("faq.copyLink")}
                      </button>
                    </div>
                  </AccordionItem>
                </div>
              </AnimatedItem>
            ))}
          </div>

          {/* CTA */}
          <AnimatedItem delay={0.3}>
            <div className="mt-12 p-8 rounded-2xl border border-border bg-gradient-to-br from-bg-tertiary/80 via-bg-secondary to-bg-tertiary/40 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <p className="text-heading-sm font-medium text-text-primary mb-2">
                {language === "en"
                  ? "Still have questions?"
                  : "Остались вопросы?"}
              </p>
              <p className="text-body-sm text-text-secondary mb-6">
                {language === "en"
                  ? "We respond within 48 hours. No bots, real engineers."
                  : "Отвечаем в течение 48 часов. Без ботов, живые инженеры."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white text-body-sm font-medium hover:bg-accent-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                >
                  {t("cta.primary")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-body-sm text-text-secondary font-medium hover:text-text-primary hover:border-border-hover transition-colors"
                >
                  {t("cta.secondary")}
                </a>
              </div>
            </div>
          </AnimatedItem>
        </div>
      </Section>
    </>
  );
}
