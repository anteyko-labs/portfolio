"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/link";
import { Link as NextLink } from "@/i18n/navigation";
import { EASE } from "@/components/motion/kit";
import {
  AnimatedTags,
  ArticleToc,
  BlogCover,
  ReadingProgress,
  RevealHeading,
  readingMinutes,
  useActiveSection,
} from "@/components/misc-anim/blog-anim";
import { blogPosts, type BlogPost } from "@/lib/blog-data";
import { formatPostDate } from "../blog-index-content";

const SECTION_PREFIX = "section-";

export function BlogArticleContent({ post }: { post: BlogPost }) {
  const { language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion();
  const bodyRef = useRef<HTMLElement>(null);
  const activeSection = useActiveSection(post.body.length, SECTION_PREFIX);
  const words = post.body.reduce((n, sec) => n + sec.paragraphs[language].join(" ").split(/\s+/).length, 0);
  const minutes = readingMinutes(words);

  // Prev/next within the (already newest-first) list, for footer navigation.
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <PageHero
        title={post.title[language]}
        subtitle={post.excerpt[language]}
        eyebrow={language === "en" ? "Article" : "Статья"}
        align="left"
        backLink={{
          href: "/blog",
          label: language === "en" ? "All articles" : "Все статьи",
        }}
        rightSlot={
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B14] text-white">
            <BlogCover slug={post.slug} tags={post.tags} className="aspect-[16/9]" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-caption uppercase tracking-wider text-white/45 mb-2 font-mono">
                    {language === "en" ? "Published" : "Опубликовано"}
                  </p>
                  <time dateTime={post.date} className="text-body-md text-white font-medium">
                    {formatPostDate(post.date, language)}
                  </time>
                </div>
                <div className="flex items-center gap-2.5 text-right">
                  <div>
                    <p className="text-caption uppercase tracking-wider text-white/45 mb-2 font-mono">{en ? "Read" : "Чтение"}</p>
                    <p className="text-body-md font-medium text-white">
                      {minutes} {en ? "min" : "мин"}
                    </p>
                  </div>
                  <svg viewBox="0 0 36 36" className="h-10 w-10 -rotate-90" aria-hidden="true">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
                    <motion.circle cx="18" cy="18" r="15" fill="none" stroke="url(#ms-read-ring)" strokeWidth="3" strokeLinecap="round" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: Math.min(1, minutes / 10) }} transition={{ duration: 1.4, delay: 0.8, ease: EASE }} />
                    <defs>
                      <linearGradient id="ms-read-ring" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#A5B4FC" />
                        <stop offset="100%" stopColor="#F0ABFC" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              {post.tags.length > 0 && (
                <div className="mt-4">
                  <AnimatedTags tags={post.tags} dark delay={0.7} />
                </div>
              )}
            </div>
          </div>
        }
      />

      {/* Article body */}
      <Section ref={bodyRef} background="secondary" padding="lg" container={false} className="relative !pt-0">
        <ReadingProgress target={bodyRef} en={en} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-12 grid max-w-6xl gap-12 md:mt-16 xl:grid-cols-[220px_minmax(0,48rem)] xl:justify-center">
          <aside className="hidden xl:block">
            <ArticleToc headings={post.body.map((sec) => sec.heading[language])} active={activeSection} prefix={SECTION_PREFIX} en={en} />
          </aside>
          <div className="mx-auto w-full max-w-3xl space-y-14">
            {post.body.map((section, i) => (
              <article key={`section-${i}`}>
                <RevealHeading text={section.heading[language]} index={i} id={`${SECTION_PREFIX}${i}`} />
                <div className="space-y-5">
                  {section.paragraphs[language].map((para, j) => (
                    <motion.p
                      key={`section-${i}-para-${j}`}
                      className={`text-body-lg text-text-secondary leading-relaxed ${i === 0 && j === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-brand first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.9] first-letter:text-accent-primary" : ""}`}
                      initial={reduced ? false : { opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: Math.min(j * 0.06, 0.2), ease: EASE }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </article>
            ))}
            <motion.div
              aria-hidden="true"
              className="flex items-center justify-center gap-3 pt-4 text-accent-primary/60"
              initial={reduced ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-accent-primary/50" />
              <span className="font-brand text-lg">✦</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-accent-primary/50" />
            </motion.div>
          </div>
        </div>
        </div>
      </Section>

      {/* Prev / next navigation */}
      {(prevPost || nextPost) && (
        <Section background="primary" padding="md">
          <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
            {[
              { p: prevPost, dir: "prev" as const },
              { p: nextPost, dir: "next" as const },
            ].map(({ p, dir }, k) =>
              p ? (
                <motion.div
                  key={dir}
                  className={dir === "next" && !prevPost ? "sm:col-start-2" : ""}
                  initial={reduced ? false : { opacity: 0, x: dir === "prev" ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: k * 0.08, ease: EASE }}
                >
                  <NextLink
                    href={`/blog/${p.slug}`}
                    className={`group flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-bg-tertiary/40 p-3 pr-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/30 hover:bg-bg-primary hover:shadow-[0_20px_50px_-30px_rgba(79,70,229,0.6)] ${dir === "next" ? "flex-row-reverse text-right pl-5 pr-3" : ""}`}
                  >
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                      <BlogCover slug={p.slug} tags={p.tags} className="absolute inset-0 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 inline-flex items-center gap-1.5 text-caption text-text-tertiary">
                        {dir === "prev" && <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>}
                        {dir === "prev" ? (language === "en" ? "Previous" : "Предыдущая") : language === "en" ? "Next" : "Следующая"}
                        {dir === "next" && <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>}
                      </p>
                      <p className="line-clamp-2 text-body-sm font-medium text-text-primary transition-colors group-hover:text-accent-primary">
                        {p.title[language]}
                      </p>
                    </div>
                  </NextLink>
                </motion.div>
              ) : (
                <div key={dir} className="hidden sm:block" />
              ),
            )}
          </div>
        </Section>
      )}

      {/* Bottom CTA → /contact */}
      <section className="relative isolate overflow-hidden bg-[#06060B] py-20 text-white md:py-28">
        <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "56px 56px" }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedItem>
              <h2 className="font-brand text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl mb-5">
                <span className="home-gradient-text">
                  {language === "en"
                    ? "Have a project in mind?"
                    : "Есть проект на примете?"}
                </span>
              </h2>
              <p className="text-body-lg text-white/60 mb-9">
                {language === "en"
                  ? "20 minutes — we'll discuss your task and give an honest estimate. No strings attached."
                  : "45 минут — обсудим вашу задачу и дадим честную оценку. Без обязательств."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ButtonLink href="/contact" buttonVariant="primary" size="lg" className="home-cta-glow">
                  {language === "en"
                    ? "Get an estimate in 24 hours"
                    : "Получить оценку за 24 часа"}
                </ButtonLink>
                <NextLink
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-body-md font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  {language === "en" ? "Read more articles" : "Читать другие статьи"}
                </NextLink>
              </div>
            </AnimatedItem>
          </div>
        </div>
      </section>
    </>
  );
}
