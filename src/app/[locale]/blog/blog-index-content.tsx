"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { EASE } from "@/components/motion/kit";
import { AnimatedTags, BlogCover, TiltCard } from "@/components/misc-anim/blog-anim";
import { blogPosts, type BlogPost } from "@/lib/blog-data";
import type { Language } from "@/lib/translations";
import { INTL_LOCALE } from "@/lib/i18n-text";
import { pick } from "@/lib/i18n-text";

// Locale-aware, human-readable date. ISO in → "28 April 2026" / "28 апреля 2026".
export function formatPostDate(iso: string, language: Language): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(language === "en" ? "en-GB" : INTL_LOCALE[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

const FIND_ICONS = [
  // compass — how we scope
  "M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5l-2 5-5 2 2-5 5-2z",
  // chip — engineering
  "M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2zm3 5h4v4h-4z",
  // flag — real delivery
  "M5 21V4m0 0h11l-2 4 2 4H5",
];

/** One article card: generative cover on top (or on the left when featured), tilt + spotlight */
function PostCard({ post, featured, index }: { post: BlogPost; featured: boolean; index: number }) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      className={featured ? "md:col-span-2" : ""}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
    >
      <NextLink href={`/blog/${post.slug}`} className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4 rounded-3xl">
        <TiltCard onHover={setHover} className="overflow-hidden rounded-3xl border border-border bg-bg-primary shadow-[0_24px_60px_-40px_rgba(30,27,75,0.5)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-40px_rgba(79,70,229,0.6)]">
          <div className={`flex h-full flex-col ${featured ? "lg:flex-row" : ""}`}>
            <div className={`relative shrink-0 overflow-hidden ${featured ? "aspect-[16/9] lg:aspect-auto lg:w-[55%] lg:min-h-[340px]" : "aspect-[16/9]"}`}>
              <BlogCover slug={post.slug} tags={post.tags} active={hover} className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                {String(index + 1).padStart(2, "0")} / {String(blogPosts.length).padStart(2, "0")}
              </span>
            </div>
            <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-10 lg:justify-center" : "md:p-7"}`}>
              {/* Date + tags */}
              <div className="flex items-center flex-wrap gap-2 mb-3">
                <time dateTime={post.date} className="text-caption text-text-tertiary font-mono">
                  {formatPostDate(post.date, language)}
                </time>
                {post.tags.length > 0 && (
                  <span className="text-text-muted" aria-hidden="true">
                    ·
                  </span>
                )}
                <AnimatedTags tags={post.tags} delay={0.2 + index * 0.1} />
              </div>

              {/* Title */}
              <h2 className={`font-medium text-text-primary mb-3 transition-colors group-hover:text-accent-primary ${featured ? "text-heading-xl lg:text-display-sm" : "text-heading-lg"}`}>
                {post.title[language]}
              </h2>

              {/* Excerpt */}
              <p className="text-body-md text-text-secondary line-clamp-3 flex-1">{post.excerpt[language]}</p>

              {/* Read more */}
              <span className="mt-6 inline-flex items-center gap-2 text-body-sm text-accent-primary font-medium">
                <span className="relative">
                  {pick({ en: "Read article", ru: "Читать статью", zh: "阅读文章", tr: "Makaleyi oku", ar: "اقرأ المقال" }, language)}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-primary transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-primary/10 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-accent-primary group-hover:text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </span>
            </div>
          </div>
        </TiltCard>
      </NextLink>
    </motion.div>
  );
}

export function BlogIndexContent() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const findItems = [
    pick({ en: "How we scope and ship", ru: "Как мы планируем и поставляем", zh: "我们如何规划与交付", tr: "Nasıl kapsam belirler ve teslim ederiz", ar: "كيف نحدّد النطاق ونُسلّم" }, language),
    pick({ en: "Engineering, not opinions", ru: "Инженерия, а не мнения", zh: "靠工程，不靠观点", tr: "Görüş değil, mühendislik", ar: "هندسة لا آراء" }, language),
    pick({ en: "Grounded in real delivery", ru: "На основе реальной поставки", zh: "源自真实的交付实践", tr: "Gerçek teslimata dayalı", ar: "مبنية على تسليم فعلي" }, language),
  ];

  return (
    <>
      <PageHero
        title={pick({ en: "Blog / Insights", ru: "Блог / Инсайты", zh: "博客 / 洞见", tr: "Blog / İçgörüler", ar: "المدونة / رؤى" }, language)}
        subtitle={
          pick({ en: "Field notes on how we ship: fast MVPs, Web2 and Web3 in one loop, and delivery you can see at every step.", ru: "Заметки о том, как мы поставляем: быстрые MVP, Web2 и Web3 в одном цикле и поставка, которую вы видите на каждом шаге.", zh: "交付一线笔记：快速 MVP、Web2 与 Web3 一体化迭代，以及每一步都看得见的交付。", tr: "Nasıl teslim ettiğimize dair saha notları: hızlı MVP'ler, tek döngüde Web2 ve Web3 ve her adımda görebileceğiniz teslimat.", ar: "ملاحظات ميدانية حول طريقة عملنا: منتجات MVP سريعة، وWeb2 وWeb3 في دورة واحدة، وتسليم ترونه في كل خطوة." }, language)
        }
        eyebrow={pick({ en: "Insights", ru: "Инсайты", zh: "洞见", tr: "İçgörüler", ar: "رؤى" }, language)}
        metric={{
          value: String(blogPosts.length),
          label: pick({ en: "articles", ru: "статьи", zh: "篇文章", tr: "makale", ar: "مقالات" }, language),
        }}
        rightSlot={
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B14] p-6 text-white">
            <div aria-hidden="true" className="ms-orb pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div aria-hidden="true" className="ms-orb pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-indigo-500/25 blur-3xl" style={{ animationDelay: "-6s" }} />
            <p className="relative text-caption uppercase tracking-wider text-white/45 mb-5 font-mono">
              {pick({ en: "What you'll find", ru: "Что вы найдёте", zh: "您将看到", tr: "Neler bulacaksınız", ar: "ما ستجده هنا" }, language)}
            </p>
            <ul className="relative space-y-3 text-body-sm">
              {findItems.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white/80"
                  initial={reduced ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.12, ease: EASE }}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500/40 to-fuchsia-500/30 text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <motion.path d={FIND_ICONS[i]} initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.8 + i * 0.15, ease: EASE }} />
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-5 flex items-center gap-2 font-mono text-[11px] text-white/40" aria-hidden="true">
              <span className="ms-caret inline-block h-3 w-[2px] bg-fuchsia-300" />
              {pick({ en: "new notes in progress", ru: "новые заметки в работе", zh: "篇新笔记撰写中", tr: "yeni not hazırlanıyor", ar: "ملاحظات جديدة قيد الإعداد" }, language)}
            </div>
          </div>
        }
      />

      <Section background="secondary" padding="lg" className="relative overflow-hidden">
        <div aria-hidden="true" className="ms-orb pointer-events-none absolute -left-40 top-0 h-[26rem] w-[26rem] rounded-full bg-indigo-300/20 blur-3xl" />
        <div aria-hidden="true" className="ms-orb pointer-events-none absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-fuchsia-300/15 blur-3xl" style={{ animationDelay: "-7s" }} />
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} featured={index === 0} index={index} />
          ))}
        </div>
      </Section>
    </>
  );
}
