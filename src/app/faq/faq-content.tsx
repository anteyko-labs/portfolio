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

  // Consolidated categories for better UX (grouped similar topics)
  const categories: { value: FAQCategory | "all"; label: string }[] = [
    { value: "all", label: t("faq.categories.all") },
    { value: "pricing", label: t("faq.categories.pricing") }, // includes budget/payment questions
    { value: "process", label: t("faq.categories.process") }, // includes timeline, quality, general process
    { value: "tech", label: t("faq.categories.tech") }, // includes design, quality, stack
    { value: "legal", label: t("faq.categories.legal") }, // includes support terms
    { value: "web3", label: t("faq.categories.web3") }, // web3 specific
  ];

  // Category groupings for consolidated filter
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
      // Check if item's category matches the selected group
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
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const highlight = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    // Escape special regex characters to prevent errors
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
      />

      <Section background="secondary" padding="lg">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-8">
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
                  className={`px-3 py-1.5 rounded-full text-caption border transition-colors ${
                    category === cat.value
                      ? "border-accent-primary/40 bg-accent-primary/10 text-accent-primary"
                      : "border-border text-text-tertiary hover:text-text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <AnimatedItem>
            <div className="bg-bg-primary rounded-2xl border border-border overflow-hidden">
              {filteredItems.length === 0 && (
                <div className="p-6 text-body-sm text-text-secondary">
                  {language === "en"
                    ? "No results. Try another keyword or category."
                    : "Нет результатов. Попробуйте другой запрос или категорию."}
                </div>
              )}
              {filteredItems.map((item) => (
                <div key={item.id} id={item.id}>
                  <AccordionItem
                    title={highlight(item.question[language])}
                    isOpen={openId === item.id}
                    onToggle={() => handleToggle(item.id)}
                  >
                    <div className="space-y-3">
                      <p>{highlight(item.answer[language])}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.id);
                        }}
                        className="text-caption text-accent-primary hover:text-accent-secondary"
                      >
                        {copiedId === item.id ? t("faq.copied") : t("faq.copyLink")}
                      </button>
                    </div>
                  </AccordionItem>
                </div>
              ))}
            </div>
          </AnimatedItem>

          <div className="mt-10 p-6 rounded-2xl border border-border bg-bg-tertiary/60 text-center">
            <p className="text-body-md text-text-secondary mb-4">
              {language === "en"
                ? "Still have questions? We respond within 48 hours."
                : "Остались вопросы? Отвечаем в течение 48 часов."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-white text-body-sm font-medium hover:bg-accent-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              >
                {t("cta.primary")}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border text-body-sm text-text-secondary font-medium hover:text-text-primary hover:border-border-hover transition-colors"
              >
                {t("cta.secondary")}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
