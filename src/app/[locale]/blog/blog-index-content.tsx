"use client";

import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { AnimatedItem } from "@/components/ui/section";
import { blogPosts } from "@/lib/blog-data";
import type { Language } from "@/lib/translations";

// Locale-aware, human-readable date. ISO in → "28 April 2026" / "28 апреля 2026".
export function formatPostDate(iso: string, language: Language): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function BlogIndexContent() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PageHero
        title={language === "en" ? "Blog / Insights" : "Блог / Инсайты"}
        subtitle={
          language === "en"
            ? "Field notes on how we ship: fast MVPs, Web2 and Web3 in one loop, and delivery you can see and own at every step."
            : "Заметки о том, как мы поставляем: быстрые MVP, Web2 и Web3 в одном цикле и поставка, которую вы видите и которой владеете на каждом шаге."
        }
        eyebrow={language === "en" ? "Insights" : "Инсайты"}
        metric={{
          value: String(blogPosts.length),
          label: language === "en" ? "articles" : "статьи",
        }}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
            <p className="text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {language === "en" ? "What you'll find" : "Что вы найдёте"}
            </p>
            <ul className="space-y-3 text-body-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "How we scope and ship" : "Как мы планируем и поставляем"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Engineering, not opinions" : "Инженерия, а не мнения"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Grounded in real delivery" : "На основе реальной поставки"}
              </li>
            </ul>
          </div>
        }
      />

      <Section background="secondary" padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post, index) => (
            <AnimatedItem key={post.slug} delay={index * 0.06}>
              <NextLink href={`/blog/${post.slug}`} className="block h-full group">
                <motion.div
                  className="h-full"
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Card
                    variant="bordered"
                    hover
                    padding="lg"
                    className="h-full flex flex-col"
                  >
                    {/* Date + tags */}
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <time
                        dateTime={post.date}
                        className="text-caption text-text-tertiary font-mono"
                      >
                        {formatPostDate(post.date, language)}
                      </time>
                      {post.tags.length > 0 && (
                        <span className="text-text-muted" aria-hidden="true">
                          ·
                        </span>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-bg-tertiary border border-border text-caption text-text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-heading-lg font-medium text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                      {post.title[language]}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-body-md text-text-secondary line-clamp-3 flex-1">
                      {post.excerpt[language]}
                    </p>

                    {/* Read more */}
                    <span className="mt-6 inline-flex items-center text-body-sm text-accent-primary font-medium group-hover:gap-2 transition-all">
                      {language === "en" ? "Read article" : "Читать статью"}
                      <svg
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </Card>
                </motion.div>
              </NextLink>
            </AnimatedItem>
          ))}
        </div>
      </Section>
    </>
  );
}
