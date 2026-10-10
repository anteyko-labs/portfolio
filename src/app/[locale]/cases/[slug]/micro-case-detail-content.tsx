"use client";

import { Link as NextLink } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { pick } from "@/lib/i18n-text";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Section, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";
import { CategoryBadge } from "@/components/ui/badge";
import { MetricPill } from "@/components/ui/metric-pill";
import { ButtonLink } from "@/components/ui/link";
import {
  type MicroCase,
  getRelatedFlagshipCases,
  microCases,
} from "@/lib/cases-data";
import { CaseBottomCTA } from "@/components/case-bottom-cta";
import { MicroVisual } from "@/components/cases-catalog/micro-visuals";

interface MicroCaseDetailContentProps {
  caseItem: MicroCase;
}

export function MicroCaseDetailContent({ caseItem }: MicroCaseDetailContentProps) {
  const { language, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  
  // Get related flagship cases by same category
  const relatedFlagship = getRelatedFlagshipCases(caseItem.category, 2);
  
  // Get other micro cases in same category (excluding current)
  const relatedMicro = microCases
    .filter((c) => c.category === caseItem.category && c.id !== caseItem.id)
    .slice(0, 4);

  // Category descriptions for context
  const categoryDescriptions = {
    web: {
      en: "Web development expertise including responsive design, performance optimization, and modern frameworks.",
      ru: "Экспертиза веб-разработки: адаптивный дизайн, оптимизация производительности, современные фреймворки.",
      zh: "网站开发专长，涵盖响应式设计、性能优化和现代框架。",
      tr: "Duyarlı tasarım, performans optimizasyonu ve modern framework'leri kapsayan web geliştirme uzmanlığı.",
      ar: "خبرة في تطوير الويب تشمل التصميم المتجاوب وتحسين الأداء وأحدث الأطر البرمجية.",
    },
    product: {
      en: "Product development from concept to launch, including UX research, prototyping, and iterative delivery.",
      ru: "Разработка продукта от концепции до запуска: UX-исследования, прототипирование, итеративная поставка.",
      zh: "从概念到上线的产品开发，包括 UX 研究、原型设计和迭代交付。",
      tr: "Konseptten lansmana ürün geliştirme: UX araştırması, prototipleme ve yinelemeli teslimat.",
      ar: "تطوير المنتجات من الفكرة حتى الإطلاق، بما يشمل أبحاث UX والنماذج الأولية والتسليم التكراري.",
    },
    web3: {
      en: "Blockchain and Web3 solutions including smart contracts, wallet integration, and DeFi protocols.",
      ru: "Блокчейн и Web3 решения: смарт-контракты, интеграция кошельков, DeFi протоколы.",
      zh: "区块链与 Web3 解决方案，包括智能合约、钱包集成和 DeFi 协议。",
      tr: "Akıllı kontratlar, cüzdan entegrasyonu ve DeFi protokollerini kapsayan blokzincir ve Web3 çözümleri.",
      ar: "حلول البلوكتشين وWeb3 تشمل العقود الذكية وربط المحافظ وبروتوكولات DeFi.",
    },
    infrastructure: {
      en: "Backend infrastructure, DevOps, CI/CD pipelines, and scalable architecture design.",
      ru: "Бэкенд-инфраструктура, DevOps, CI/CD пайплайны, проектирование масштабируемой архитектуры.",
      zh: "后端基础设施、DevOps、CI/CD 流水线以及可扩展架构设计。",
      tr: "Backend altyapısı, DevOps, CI/CD hatları ve ölçeklenebilir mimari tasarımı.",
      ar: "البنية التحتية للـ Backend وDevOps وخطوط CI/CD وتصميم بنية قابلة للتوسع.",
    },
  };

  const index = microCases.findIndex((c) => c.id === caseItem.id);
  const next = microCases[(index + 1) % microCases.length];
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <>
      <section className="relative overflow-hidden bg-bg-primary pb-10 pt-10 md:pb-14 md:pt-14">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent-primary/10 blur-3xl" aria-hidden="true" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">
            <NextLink href="/cases" className="inline-flex items-center gap-2 transition-colors hover:text-accent-primary">
              <span aria-hidden="true">←</span> {pick({ en: "All work", ru: "Все работы", zh: "全部作品", tr: "Tüm işler", ar: "جميع الأعمال" }, language)}
            </NextLink>
            <span>
              {String(index + 1).padStart(2, "0")} / {String(microCases.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-8">
            <CategoryBadge category={caseItem.category} />
          </div>
          <h1 className="mt-5 max-w-4xl overflow-hidden pb-[0.06em] font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-text-primary sm:text-6xl">
            <motion.span
              className="block"
              initial={prefersReducedMotion ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {caseItem.title[language]}
            </motion.span>
          </h1>
          <motion.p
            className="mt-4 max-w-2xl text-heading-md text-text-secondary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            {caseItem.what[language]}
          </motion.p>
        </div>
      </section>

      <section className="bg-bg-primary pb-14 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          >
            <MicroVisual id={caseItem.id} category={caseItem.category} />
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <AnimatedItem>
              <div className="h-full rounded-2xl border border-border bg-bg-secondary p-6 md:p-8">
                <p className="font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">{pick({ en: "What we did", ru: "Что сделали", zh: "我们做了什么", tr: "Ne yaptık", ar: "ما أنجزناه" }, language)}</p>
                <p className="mt-3 text-heading-md text-text-primary">{caseItem.what[language]}</p>
                <p className="mt-3 text-body-md text-text-secondary">{categoryDescriptions[caseItem.category][language]}</p>
              </div>
            </AnimatedItem>
            <AnimatedItem delay={0.08}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-text-primary p-6 text-white md:p-8">
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent-primary/40 blur-3xl" aria-hidden="true" />
                <p className="relative font-mono text-caption uppercase tracking-[0.16em] text-white/50">{pick({ en: "Outcome", ru: "Результат", zh: "成果", tr: "Sonuç", ar: "النتيجة" }, language)}</p>
                <p className="relative mt-3 font-brand text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{caseItem.outcome[language]}</p>
              </div>
            </AnimatedItem>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-5 md:p-6">
            <p className="text-body-md text-text-secondary">
              {pick({ en: "Want something similar in your product?", ru: "Хотите такое же в вашем продукте?", zh: "想在您的产品中实现类似功能？", tr: "Ürününüzde de benzerini ister misiniz?", ar: "تريد شيئًا مماثلًا في منتجك؟" }, language)}
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" buttonVariant="primary">
                {pick({ en: "Discuss the project", ru: "Обсудить проект", zh: "洽谈项目", tr: "Projeyi konuşalım", ar: "ناقش المشروع معنا" }, language)}
              </ButtonLink>
              <ButtonLink href={`/cases/${next.id}`} buttonVariant="secondary">
                {pick({ en: "Next work →", ru: "Следующая работа →", zh: "下一个作品 →", tr: "Sonraki iş →", ar: "العمل التالي ←" }, language)}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Related Flagship Cases */}
      {relatedFlagship.length > 0 && (
        <Section background="primary" padding="lg">
          <h2 className="text-display-sm font-display text-text-primary mb-2">
            {pick({ en: "Related flagship cases", ru: "Связанные ключевые кейсы", zh: "相关旗舰案例", tr: "İlgili amiral gemisi vakalar", ar: "أبرز المشاريع ذات الصلة" }, language)}
          </h2>
          <p className="text-body-md text-text-secondary mb-8">
            {pick({ en: "Deep dives into similar projects", ru: "Детальные разборы похожих проектов", zh: "深入解析类似项目", tr: "Benzer projelere derinlemesine bakış", ar: "تحليلات معمّقة لمشاريع مشابهة" }, language)}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedFlagship.map((flagship, index) => (
              <AnimatedItem key={flagship.id} delay={index * 0.1}>
                <NextLink href={`/cases/${flagship.slug}`} className="block h-full group">
                  <TiltCard
                    variant="bordered"
                    padding="none"
                    tiltAmount={8}
                    noiseHoverOpacity={0.03}
                    className="h-full"
                  >
                    <div className="relative h-40 bg-bg-tertiary overflow-hidden rounded-t-2xl">
                      <div className="absolute top-4 left-4 z-10">
                        <CategoryBadge category={flagship.category} />
                      </div>
                      {flagship.artifactHint && (
                        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg border border-border bg-bg-primary/90 backdrop-blur-sm text-caption font-mono text-accent-primary">
                          {flagship.artifactHint[language]}
                        </div>
                      )}
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(10,10,10,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(10,10,10,0.05) 1px, transparent 1px)
                          `,
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-heading-md font-medium text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                        {flagship.title[language]}
                      </h3>
                      <p className="text-body-sm text-text-secondary line-clamp-2 mb-3">
                        {flagship.summary[language]}
                      </p>
                      {flagship.metrics && flagship.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {flagship.metrics.slice(0, 2).map((metric) => (
                            <MetricPill
                              key={`${flagship.id}-${metric.value}`}
                              label={metric.label[language]}
                              value={metric.value}
                              tone="primary"
                            />
                          ))}
                        </div>
                      )}
                      <span className="mt-4 inline-flex items-center text-body-sm text-accent-primary font-medium group-hover:gap-2 transition-all">
                        {t("cta.viewCase")}
                        <svg
                          className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </TiltCard>
                </NextLink>
              </AnimatedItem>
            ))}
          </div>
        </Section>
      )}

      {/* Related Micro Cases */}
      {relatedMicro.length > 0 && (
        <Section background="secondary" padding="lg">
          <h2 className="text-heading-lg font-medium text-text-primary mb-2">
            {pick({ en: "More in this category", ru: "Ещё в этой категории", zh: "此分类下更多案例", tr: "Bu kategoride daha fazlası", ar: "المزيد في هذه الفئة" }, language)}
          </h2>
          <p className="text-body-sm text-text-secondary mb-6">
            {pick({ en: "Other micro cases with similar focus", ru: "Другие микро-кейсы схожей тематики", zh: "其他方向相近的小型案例", tr: "Benzer odaklı diğer mikro vakalar", ar: "حالات مصغّرة أخرى بتركيز مشابه" }, language)}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedMicro.map((micro, index) => (
              <AnimatedItem key={micro.id} delay={index * 0.05}>
                <NextLink href={`/cases/${micro.id}`} className="block h-full group">
                  <motion.div
                    className="h-full"
                    whileHover={prefersReducedMotion ? {} : { y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Card
                      variant="bordered"
                      hover
                      padding="md"
                      className="h-full"
                    >
                      <h3 className="text-heading-sm font-medium text-text-primary mb-1 group-hover:text-accent-primary transition-colors line-clamp-2">
                        {micro.title[language]}
                      </h3>
                      <p className="text-caption text-text-muted mb-2">
                        {micro.what[language]}
                      </p>
                      <p className="text-body-sm text-text-secondary line-clamp-2">
                        {micro.outcome[language]}
                      </p>
                    </Card>
                  </motion.div>
                </NextLink>
              </AnimatedItem>
            ))}
          </div>
        </Section>
      )}

      {/* Back to all cases */}
      <Section background="primary" padding="md">
        <div className="text-center">
          <ButtonLink href="/cases" buttonVariant="ghost" className="group inline-flex items-center gap-2">
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {pick({ en: "Back to all cases", ru: "Назад ко всем кейсам", zh: "返回全部案例", tr: "Tüm vakalara dön", ar: "العودة إلى جميع المشاريع" }, language)}
          </ButtonLink>
        </div>
      </Section>

      {/* Universal bottom CTA */}
      <CaseBottomCTA />
    </>
  );
}
