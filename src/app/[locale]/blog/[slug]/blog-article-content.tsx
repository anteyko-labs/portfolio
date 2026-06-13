"use client";

import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/link";
import { Link as NextLink } from "@/i18n/navigation";
import { blogPosts, type BlogPost } from "@/lib/blog-data";
import { formatPostDate } from "../blog-index-content";

export function BlogArticleContent({ post }: { post: BlogPost }) {
  const { language } = useLanguage();

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
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
            <p className="text-caption uppercase tracking-wider text-text-tertiary mb-3">
              {language === "en" ? "Published" : "Опубликовано"}
            </p>
            <time
              dateTime={post.date}
              className="text-body-md text-text-primary font-medium"
            >
              {formatPostDate(post.date, language)}
            </time>
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-bg-tertiary border border-border text-caption text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        }
      />

      {/* Article body */}
      <Section background="secondary" padding="lg">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {post.body.map((section, i) => (
              <AnimatedItem key={`section-${i}`} delay={Math.min(i * 0.05, 0.3)}>
                <article>
                  <h2 className="text-heading-xl font-display font-medium text-text-primary mb-5">
                    {section.heading[language]}
                  </h2>
                  <div className="space-y-5">
                    {section.paragraphs[language].map((para, j) => (
                      <p
                        key={`section-${i}-para-${j}`}
                        className="text-body-lg text-text-secondary leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </Section>

      {/* Prev / next navigation */}
      {(prevPost || nextPost) && (
        <Section background="primary" padding="md">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-3xl mx-auto">
            {prevPost ? (
              <NextLink
                href={`/blog/${prevPost.slug}`}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-tertiary/50 hover:border-accent-primary/30 transition-colors w-full sm:max-w-[48%]"
              >
                <svg
                  className="w-5 h-5 text-text-tertiary group-hover:text-accent-primary transition-colors shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <div className="min-w-0">
                  <p className="text-caption text-text-tertiary mb-1">
                    {language === "en" ? "Previous" : "Предыдущая"}
                  </p>
                  <p className="text-body-sm text-text-primary font-medium truncate group-hover:text-accent-primary transition-colors">
                    {prevPost.title[language]}
                  </p>
                </div>
              </NextLink>
            ) : (
              <div />
            )}

            {nextPost ? (
              <NextLink
                href={`/blog/${nextPost.slug}`}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-tertiary/50 hover:border-accent-primary/30 transition-colors w-full sm:max-w-[48%] sm:ml-auto text-right"
              >
                <div className="min-w-0">
                  <p className="text-caption text-text-tertiary mb-1">
                    {language === "en" ? "Next" : "Следующая"}
                  </p>
                  <p className="text-body-sm text-text-primary font-medium truncate group-hover:text-accent-primary transition-colors">
                    {nextPost.title[language]}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-text-tertiary group-hover:text-accent-primary transition-colors shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </NextLink>
            ) : (
              <div />
            )}
          </div>
        </Section>
      )}

      {/* Bottom CTA → /contact */}
      <Section background="secondary" padding="lg" className="border-t border-border/50">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedItem>
            <h2 className="text-display-sm font-display font-bold text-text-primary mb-4">
              {language === "en"
                ? "Have a project in mind?"
                : "Есть проект на примете?"}
            </h2>
            <p className="text-body-lg text-text-secondary mb-8">
              {language === "en"
                ? "20 minutes — we'll discuss your task and give an honest estimate. No strings attached."
                : "45 минут — обсудим вашу задачу и дадим честную оценку. Без обязательств."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" buttonVariant="primary" size="lg">
                {language === "en"
                  ? "Get an estimate in 24 hours"
                  : "Получить оценку за 24 часа"}
              </ButtonLink>
              <ButtonLink href="/blog" buttonVariant="secondary" size="lg">
                {language === "en" ? "Read more articles" : "Читать другие статьи"}
              </ButtonLink>
            </div>
          </AnimatedItem>
        </div>
      </Section>
    </>
  );
}
