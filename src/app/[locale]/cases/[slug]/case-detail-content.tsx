"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Section, AnimatedItem } from "@/components/ui/section";
import { CategoryBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/link";
import { PageHero } from "@/components/sections/page-hero";
import { ScrollSpyRail } from "@/components/ui/scrollspy-rail";
import { Lightbox } from "@/components/ui/lightbox";
import Image from "next/image";
import type { FlagshipCase } from "@/lib/cases-data";
import { flagshipCases } from "@/lib/cases-data";
import { CaseBottomCTA } from "@/components/case-bottom-cta";
import { L1CaseScenes } from "@/components/cases-catalog/l1-case-scenes";
import { L1Terminal } from "@/components/cases-catalog/l1-terminal";
import { CaseHeroMetrics } from "@/components/case-anim/hero-metrics";
import { QualityGatesRun } from "@/components/case-anim/quality-gates-run";
import { CaseHeading } from "@/components/case-anim/primitives";
import {
  CaseArtifacts,
  CaseConstraints,
  CaseCtaGlow,
  CaseDeliverables,
  CaseHardParts,
  CaseMetaStrip,
  CaseNavLink,
  CaseOutcome,
  CaseProblem,
  CaseSolution,
  CaseTechStack,
  RelatedCaseCard,
  type SolutionStep,
} from "@/components/case-anim/case-sections";

// Sticky Summary Rail component
function CaseSummaryRail({ caseItem, language, t }: { caseItem: FlagshipCase; language: "en" | "ru"; t: (key: string) => string }) {
  return (
    <aside className="hidden 2xl:block fixed top-28 right-8 w-72 z-40">
      <div className="rounded-2xl border border-border bg-bg-secondary/95 backdrop-blur-sm p-5 space-y-4">
        {/* Category */}
        <div>
          <CategoryBadge category={caseItem.category} size="sm" />
        </div>

        {/* Timeline */}
        <div>
          <p className="text-caption text-text-tertiary uppercase tracking-wider mb-1">
            {language === "en" ? "Timeline" : "Сроки"}
          </p>
          <p className="text-body-sm text-text-primary font-medium">
            {caseItem.timeline[language]}
          </p>
        </div>

        {/* Industry */}
        <div>
          <p className="text-caption text-text-tertiary uppercase tracking-wider mb-1">
            {language === "en" ? "Industry" : "Индустрия"}
          </p>
          <p className="text-body-sm text-text-primary">
            {caseItem.industry[language]}
          </p>
        </div>

        {/* Metrics */}
        {caseItem.metrics && caseItem.metrics.length > 0 && (
          <div>
            <p className="text-caption text-text-tertiary uppercase tracking-wider mb-2">
              {language === "en" ? "Key metrics" : "Ключевые метрики"}
            </p>
            <div className="space-y-2">
              {caseItem.metrics.slice(0, 3).map((metric) => (
                <div key={`rail-metric-${metric.value}`} className="flex items-baseline justify-between">
                  <span className="text-caption text-text-secondary">{metric.label[language]}</span>
                  <span className="text-body-sm text-accent-primary font-medium tabular-nums">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-border pt-4">
          <ButtonLink href="/contact" buttonVariant="primary" size="sm" className="w-full justify-center">
            {t("cta.primary")}
          </ButtonLink>
          <ButtonLink href="/contact" buttonVariant="outline" size="sm" className="w-full justify-center mt-2">
            {t("cta.secondary")}
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}

export function CaseDetailContent({ caseItem }: { caseItem: FlagshipCase }) {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Get prev/next cases for navigation
  const currentIndex = flagshipCases.findIndex((c) => c.id === caseItem.id);
  const prevCase = currentIndex > 0 ? flagshipCases[currentIndex - 1] : null;
  const nextCase = currentIndex < flagshipCases.length - 1 ? flagshipCases[currentIndex + 1] : null;

  const hasScreenshots = caseItem.screenshots && caseItem.screenshots.length > 0;
  const isL1 = caseItem.slug === "web3-l1-dex";

  const scrollItems = [
    { id: "case-summary", label: language === "en" ? "Summary" : "Сводка" },
    { id: "case-problem", label: language === "en" ? "Problem" : "Задача" },
    { id: "case-constraints", label: language === "en" ? "Constraints" : "Ограничения" },
    ...(isL1 ? [{ id: "case-how", label: language === "en" ? "How it works" : "Как устроено" }] : []),
    { id: "case-solution", label: language === "en" ? "Solution" : "Решение" },
    { id: "case-deliverables", label: language === "en" ? "Deliverables" : "Результаты" },
    ...(hasScreenshots ? [{ id: "case-screenshots", label: language === "en" ? "Screenshots" : "Скриншоты" }] : []),
    { id: "case-artifacts", label: language === "en" ? "Artifacts" : "Артефакты" },
    { id: "case-quality", label: language === "en" ? "Quality gates" : "Гейты качества" },
    { id: "case-tech", label: language === "en" ? "Tech stack" : "Стек" },
    { id: "case-outcome", label: language === "en" ? "Outcome" : "Результат" },
    { id: "case-hardparts", label: language === "en" ? "Hard parts" : "Сложные задачи" },
  ];

  // Dynamic artifacts based on case content
  const getArtifactsForCase = (): { title: string; subtitle: string; tone?: "primary" | "success" | "warning" }[] => {
    const baseArtifacts = [
      {
        title: caseItem.artifactHint?.[language] ?? (language === "en" ? "Delivery checklist" : "Чеклист поставки"),
        subtitle: language === "en" ? "Artifact" : "Артефакт",
        tone: "primary" as const,
      },
      {
        title: language === "en" ? "Verification report" : "Отчёт верификации",
        subtitle: language === "en" ? "Release gate" : "Гейт релиза",
        tone: "success" as const,
      },
    ];

    // Case-specific artifacts
    const caseArtifacts: Record<string, { title: string; subtitle: string; tone?: "primary" | "success" | "warning" }[]> = {
      "web3-l1-dex": [
        { title: language === "en" ? "The blockchain" : "Сам блокчейн", subtitle: language === "en" ? "Trades final in ~0.2 s" : "Сделки окончательны за ~0,2 с", tone: "primary" },
        { title: language === "en" ? "Built-in exchange" : "Встроенная биржа", subtitle: language === "en" ? "Fair order, no cutting in line" : "Честный порядок, без «влезания»", tone: "success" },
        { title: language === "en" ? "4 apps" : "4 приложения", subtitle: language === "en" ? "Trading, explorer, control panel, faucet" : "Торговля, обозреватель, панель, кран", tone: "warning" },
        { title: language === "en" ? "Developer kits" : "Наборы для разработчиков", subtitle: "TypeScript · Python · Rust", tone: "primary" },
      ],
      "utility-token-uae": [
        { title: language === "en" ? "Security Audit Report" : "Отчёт security\u2011аудита", subtitle: "SECURITY_AUDIT_REPORT", tone: "success" },
        { title: language === "en" ? "NFT Tier Contracts" : "NFT\u2011контракты уровней", subtitle: "Bronze / Silver / Gold / Platinum", tone: "primary" },
        { title: language === "en" ? "Admin Panel Guide" : "Гайд админ\u2011панели", subtitle: "ADMIN_CAPABILITIES_REPORT", tone: "warning" },
        { title: language === "en" ? "Deployment Reports" : "Отчёты деплоя", subtitle: language === "en" ? "Production readiness" : "Готовность к production", tone: "primary" },
        { title: language === "en" ? "Staking Flow Spec" : "Спека стейкинг\u2011flow", subtitle: language === "en" ? "Benefit-based, no yield" : "Benefit\u2011based, без доходности", tone: "success" },
        { title: language === "en" ? "Voucher System Docs" : "Документация ваучеров", subtitle: language === "en" ? "NFT-gated access" : "NFT\u2011gated доступ", tone: "warning" },
      ],
      "enterprise-modules": [
        { title: "KYC Flow Diagram", subtitle: "Jumio + Sumsub", tone: "primary" },
        { title: language === "en" ? "Audit trail schema" : "Схема аудит-трейла", subtitle: "SOC 2", tone: "success" },
        { title: language === "en" ? "Role matrix" : "Матрица ролей", subtitle: "RBAC", tone: "warning" },
      ],
      "geo-heatmap-backend": [
        { title: "H3 Resolution spec", subtitle: "Geo grid", tone: "primary" },
        { title: "API OpenAPI spec", subtitle: "REST v1", tone: "success" },
        { title: language === "en" ? "Cache strategy doc" : "Доки по кешу", subtitle: "Redis + ClickHouse", tone: "warning" },
      ],
      "anti-refund-payment": [
        { title: language === "en" ? "Deposit flow spec" : "Спек депозитного флоу", subtitle: "4 steps", tone: "primary" },
        { title: language === "en" ? "Legal terms template" : "Шаблон юр. условий", subtitle: "Consumer protection", tone: "success" },
      ],
      "wallet-rpc-evm-compatibility": [
        { title: "Wallet compatibility matrix", subtitle: "MetaMask, Rabby, WC", tone: "primary" },
        { title: "RPC correctness suite", subtitle: "JSON-RPC tests", tone: "success" },
        { title: language === "en" ? "Onboarding runbook" : "Runbook онбординга", subtitle: "New wallets", tone: "warning" },
      ],
      "release-quality-verification-framework": [
        { title: "7-phase gate spec", subtitle: "Build → Security", tone: "primary" },
        { title: language === "en" ? "Verification report template" : "Шаблон отчёта верификации", subtitle: "MD + PDF", tone: "success" },
        { title: language === "en" ? "Override workflow" : "Workflow override", subtitle: "Audit trail", tone: "warning" },
      ],
      "startup-under-key-mvp-launch-support": [
        { title: "MVP → Launch playbook", subtitle: "3 phases", tone: "primary" },
        { title: language === "en" ? "Support SLA doc" : "Доки SLA поддержки", subtitle: "3 months", tone: "success" },
        { title: language === "en" ? "IP transfer checklist" : "Чеклист передачи IP", subtitle: "Full ownership", tone: "warning" },
      ],
      "multi-location-restaurant-management": [
        { title: language === "en" ? "RBAC Model (4 roles)" : "RBAC\u2011модель (4 роли)", subtitle: language === "en" ? "Chef / Employee / Accountant / Owner" : "Шеф / Сотрудник / Бухгалтер / Владелец", tone: "primary" },
        { title: language === "en" ? "Cost Calculation Engine" : "Движок расчёта себестоимости", subtitle: language === "en" ? "Ingredients → Rolls → Sets" : "Ингредиенты → Роллы → Сеты", tone: "success" },
        { title: language === "en" ? "Accounting Module" : "Модуль бухгалтерии", subtitle: "Excel + ZIP export", tone: "warning" },
        { title: language === "en" ? "Audit Trail System" : "Система аудит\u2011трейла", subtitle: language === "en" ? "Action / Object / Old→New / Role" : "Действие / Объект / Было→Стало / Роль", tone: "primary" },
        { title: language === "en" ? "Analytics Dashboard" : "Дашборд аналитики", subtitle: "Chart.js", tone: "success" },
      ],
      "asset-tokenization-platform": [
        { title: language === "en" ? "KYC Verification Pipeline" : "Пайплайн KYC\u2011верификации", subtitle: language === "en" ? "4-status flow" : "4\u2011статусный flow", tone: "primary" },
        { title: language === "en" ? "Private Sale State Machine" : "State machine Private Sale", subtitle: language === "en" ? "Limits + safe transitions" : "Лимиты + безопасные переходы", tone: "success" },
        { title: language === "en" ? "RBAC Access Control" : "RBAC\u2011контроль доступа", subtitle: "User / Admin / Ops", tone: "warning" },
        { title: language === "en" ? "Audit Trail System" : "Система аудит\u2011трейла", subtitle: language === "en" ? "Who, when, what" : "Кто, когда, что", tone: "primary" },
        { title: language === "en" ? "Token Issuance Contracts" : "Контракты выпуска токенов", subtitle: "EVM\u2011compatible", tone: "success" },
        { title: language === "en" ? "Stakeholder Documentation" : "Документация для стейкхолдеров", subtitle: language === "en" ? "Features + roadmap + system" : "Функции + roadmap + система", tone: "warning" },
      ],
      "trm-oferta-registration": [
        { title: language === "en" ? "3-step UX flow" : "3-шаговый UX-поток", subtitle: language === "en" ? "Registration → Offer → Deposit" : "Регистрация → Оферта → Задаток", tone: "primary" },
        { title: language === "en" ? "PDF with seal & signature" : "PDF с печатью и подписью", subtitle: "PDFKit + Cyrillic TTF", tone: "success" },
        { title: language === "en" ? "Audit trail schema" : "Схема аудит-трейла", subtitle: language === "en" ? "9+ fields per record" : "9+ полей на запись", tone: "warning" },
        { title: language === "en" ? "Admin panel" : "Админка", subtitle: "HTTP Basic Auth", tone: "primary" },
      ],
    };

    return caseArtifacts[caseItem.slug] ?? baseArtifacts;
  };

  const artifacts = getArtifactsForCase();

  // Use dynamic quality gates from case data, or fallback to default
  const defaultQualityGates = [
    { name: { en: "Build", ru: "Сборка" }, passed: true },
    { name: { en: "Unit tests", ru: "Юнит-тесты" }, passed: true },
    { name: { en: "Integration", ru: "Интеграция" }, passed: true },
    { name: { en: "Contract checks", ru: "Проверки контрактов" }, passed: true },
    { name: { en: "Env parity", ru: "Паритет окружений" }, passed: true },
    { name: { en: "Smoke", ru: "Smoke тесты" }, passed: true },
    { name: { en: "Security checklist", ru: "Чеклист безопасности" }, passed: true },
  ];
  const qualityGates = caseItem.qualityGates ?? defaultQualityGates;


  // Solution → pipeline steps: labelled parts ("DESIGN: … FRONTEND: …") when present,
  // otherwise the text split into sentences (short) or groups of three sentences.
  const solutionText = caseItem.solution[language];
  const solution = (() => {
    const LABELS = [
      "DESIGN", "FRONTEND", "BACKEND",
      "ФРОНТЕНД", "БЭКЕНД", "ДИЗАЙН",
      "iOS[\\s\\-‑]APP", "iOS[\\s\\-‑]ПРИЛОЖЕНИЕ",
      "CHEF EXPERIENCE", "ОПЫТ ПОВАРА",
      "API[\\s\\-‑]LAYER", "API[\\s\\-‑]СЛОЙ",
    ];
    const sectionRe = new RegExp(`(?:^|[.!]\\s+)((?:${LABELS.join("|")})(?:\\s*\\([^)]*\\))?)\\s*:\\s*`, "gi");
    const matches: { heading: string; start: number; body: number }[] = [];
    let m;
    while ((m = sectionRe.exec(solutionText)) !== null) {
      matches.push({ heading: m[1].trim(), start: m.index, body: m.index + m[0].length });
    }
    if (matches.length >= 2) {
      const intro = matches[0].start > 0 ? solutionText.slice(0, matches[0].start).replace(/[.\s]+$/, "").trim() : "";
      const steps: SolutionStep[] = matches.map((match, i) => {
        const end = i + 1 < matches.length ? matches[i + 1].start : solutionText.length;
        const body = solutionText.slice(match.body, end).replace(/[.\s]+$/, "").trim();
        return { heading: match.heading, body: body + "." };
      });
      return { intro: intro ? intro + "." : undefined, steps };
    }
    // merge tiny fragments (e.g. after abbreviations) back into the previous sentence
    const sentences = solutionText.split(/(?<=\.)\s+/).reduce<string[]>((acc, cur) => {
      if (acc.length && (cur.length < 25 || acc[acc.length - 1].length < 25)) acc[acc.length - 1] += " " + cur;
      else acc.push(cur);
      return acc;
    }, []);
    const per = sentences.length <= 6 ? 1 : 3;
    const steps: SolutionStep[] = [];
    for (let i = 0; i < sentences.length; i += per) steps.push({ body: sentences.slice(i, i + per).join(" ") });
    return { intro: undefined, steps };
  })();

  // Running chapter numbers for the section headings
  const chapterIds = scrollItems.map((s) => s.id).filter((id) => id !== "case-summary" && id !== "case-how");
  const chapter = (id: string) => chapterIds.indexOf(id) + 1;
  const en = language === "en";

  return (
    <>
      {/* Sticky summary rail on the right (xl+) */}
      <CaseSummaryRail caseItem={caseItem} language={language} t={t} />

      {/* Scrollspy navigation on the left */}
      <ScrollSpyRail items={scrollItems} mode="fixed" position="left" />

      {/* Hero / Summary */}
      <PageHero
        title={caseItem.title[language]}
        subtitle={caseItem.summary[language]}
        eyebrow={language === "en" ? "Case Study" : "Кейс"}
        backLink={{ href: "/cases", label: language === "en" ? "All Cases" : "Все кейсы" }}
        backgroundImage={caseItem.heroImage}
        rightSlot={
          isL1 ? (
            <div className="space-y-3 rounded-2xl bg-[#0F0A2A] p-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <L1Terminal active />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(caseItem.metrics ?? []).slice(0, 4).map((metric) => (
                  <div key={`hero-l1-${metric.value}`} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white">
                    <p className="font-brand text-xl font-semibold tabular-nums">{metric.value}</p>
                    <p className="text-[11px] leading-tight text-white/55">{metric.label[language]}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : caseItem.metrics && caseItem.metrics.length > 0 ? (
            <CaseHeroMetrics
              metrics={caseItem.metrics.map((m) => ({ value: m.value, label: m.label[language] }))}
              caption={en ? "project metrics" : "метрики проекта"}
              live={en ? "live" : "live"}
            />
          ) : undefined
        }
      />

      <Section background="primary" padding="none" id="case-summary-meta">
        <div className="max-w-5xl py-8 md:py-10">
          <CaseMetaStrip
            items={[
              { label: en ? "Year" : "Год", value: String(caseItem.year), icon: "calendar" },
              { label: en ? "Industry" : "Индустрия", value: caseItem.industry[language], icon: "building" },
              { label: en ? "Timeline" : "Сроки", value: caseItem.timeline[language], icon: "timer" },
            ]}
          />
        </div>
      </Section>

      {/* Problem */}
      <Section background="secondary" padding="lg" id="case-problem">
        <div className="max-w-5xl">
          <CaseHeading index={chapter("case-problem")} kicker={en ? "Context" : "Контекст"} title={en ? "Problem" : "Задача"} />
          <CaseProblem text={caseItem.problem[language]} />
        </div>
      </Section>

      {/* Constraints */}
      <Section background="primary" padding="lg" id="case-constraints" className="overflow-x-clip">
        <div className="max-w-5xl">
          <CaseHeading index={chapter("case-constraints")} kicker={en ? "Boundaries" : "Рамки"} title={en ? "Constraints" : "Ограничения"} />
          <CaseConstraints items={caseItem.constraints[language]} />
        </div>
      </Section>

      {isL1 && <L1CaseScenes en={language === "en"} />}

      {/* Solution */}
      <Section background="secondary" padding="lg" id="case-solution" className="overflow-x-clip">
        <div className="max-w-4xl">
          <CaseHeading index={chapter("case-solution")} kicker={en ? "Approach" : "Подход"} title={en ? "Solution" : "Решение"} />
          <CaseSolution intro={solution.intro} steps={solution.steps} />
        </div>
      </Section>

      {/* Deliverables */}
      <Section background="primary" padding="lg" id="case-deliverables" className="overflow-x-clip">
        <div className="max-w-4xl">
          <CaseHeading index={chapter("case-deliverables")} kicker={en ? "Shipped" : "Поставлено"} title={en ? "Deliverables" : "Результаты"} />
          <CaseDeliverables items={caseItem.deliverables[language]} label={en ? "shipped" : "поставлено"} />
        </div>
      </Section>

      {/* Screenshots / UX Flow */}
      {hasScreenshots && (
        <Section background="secondary" padding="lg" id="case-screenshots">
          <div className="max-w-5xl">
            <CaseHeading
              index={chapter("case-screenshots")}
              kicker={en ? "Interface" : "Интерфейс"}
              title={language === "en" ? "Screenshots / UX Flow" : "Скриншоты / UX‑поток"}
              subtitle={
                language === "en"
                  ? "Step-by-step walkthrough of the product interface"
                  : "Пошаговый обзор интерфейса продукта"
              }
            />
            {(() => {
              const isMobileLayout = caseItem.screenshotLayout === "mobile";
              const gridCols = isMobileLayout
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2";
              const aspectClass = isMobileLayout
                ? "aspect-[9/19]"
                : "aspect-[16/10]";
              const objectClass = isMobileLayout
                ? "object-contain"
                : "object-cover object-top";
              const bgClass = isMobileLayout
                ? "bg-bg-primary"
                : "bg-white";

              return (
                <div className={`grid ${gridCols} gap-4 md:gap-6`}>
                  {caseItem.screenshots!.map((screenshot, index) => (
                    <AnimatedItem key={`screenshot-${index}`} delay={Math.min(index * 0.04, 0.5)}>
                      <div className="group rounded-2xl border border-border bg-bg-tertiary/40 overflow-hidden transition-all hover:border-accent-primary/30 hover:shadow-lg hover:shadow-accent-primary/5">
                        {/* Step indicator */}
                        <div className={`px-3 ${isMobileLayout ? "pt-3 pb-1.5" : "px-5 pt-4 pb-2"} flex items-center gap-2`}>
                          <span className={`inline-flex items-center justify-center ${isMobileLayout ? "w-5 h-5 text-[10px]" : "w-7 h-7 text-caption"} rounded-lg bg-accent-primary/15 text-accent-primary font-bold font-mono shrink-0`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className={`${isMobileLayout ? "text-[11px] leading-tight" : "text-body-sm"} text-text-secondary line-clamp-1`}>
                            {screenshot.alt[language]}
                          </p>
                        </div>
                        {/* Screenshot image — click to open fullscreen */}
                        <button
                          type="button"
                          onClick={() => openLightbox(index)}
                          className={`block relative ${aspectClass} ${isMobileLayout ? "mx-2 mb-2" : "mx-3 mb-3"} rounded-xl overflow-hidden border border-border/50 ${bgClass} cursor-zoom-in`}
                          style={{ width: isMobileLayout ? "calc(100% - 1rem)" : "calc(100% - 1.5rem)" }}
                          aria-label={`${language === "en" ? "View fullscreen" : "Открыть на весь экран"}: ${screenshot.alt[language]}`}
                        >
                          <Image
                            src={screenshot.src}
                            alt={screenshot.alt[language]}
                            fill
                            loading={index < 8 ? "eager" : "lazy"}
                            className={`${objectClass} transition-transform duration-500 group-hover:scale-[1.02]`}
                            sizes={isMobileLayout ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" : "(max-width: 768px) 100vw, 50vw"}
                          />
                          {/* Fullscreen hint overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-black/60 backdrop-blur-sm text-white text-caption px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                              </svg>
                              {language === "en" ? "Fullscreen" : "На весь экран"}
                            </span>
                          </div>
                        </button>
                      </div>
                    </AnimatedItem>
                  ))}
                </div>
              );
            })()}
          </div>
        </Section>
      )}

      {/* Artifacts */}
      <Section background={hasScreenshots ? "primary" : "secondary"} padding="lg" id="case-artifacts" className="overflow-x-clip">
        <div className="max-w-5xl">
          <CaseHeading
            index={chapter("case-artifacts")}
            kicker={en ? "Documents" : "Документы"}
            title={language === "en" ? "Artifacts" : "Артефакты"}
            subtitle={language === "en" ? "Documents and deliverables from the project" : "Документы и результаты проекта"}
          />
          <CaseArtifacts items={artifacts} />
        </div>
      </Section>

      {/* Quality gates — a live verification run */}
      <Section background="primary" padding="lg" id="case-quality" className="section-dark overflow-hidden">
        <div aria-hidden="true" className="section-halo" style={{ ["--halo-y" as string]: "60%" }} />
        <div className="max-w-4xl">
          <CaseHeading
            index={chapter("case-quality")}
            kicker={en ? "Release" : "Релиз"}
            title={language === "en" ? "Verification / Quality gates" : "Верификация / гейты качества"}
            subtitle={language === "en" ? `${qualityGates.length}-phase checklist before release` : `${qualityGates.length}-фазный чеклист перед релизом`}
          />
          <QualityGatesRun
            gates={qualityGates.map((g) => ({ name: g.name[language], passed: g.passed }))}
            en={en}
            label={`release-verify · ${caseItem.slug}`}
          />
        </div>
      </Section>

      {/* Tech stack */}
      <Section background="secondary" padding="lg" id="case-tech" className="overflow-hidden">
        <div className="max-w-5xl">
          <CaseHeading index={chapter("case-tech")} kicker={en ? "Tools" : "Инструменты"} title={language === "en" ? "Tech stack" : "Стек технологий"} />
          <CaseTechStack items={caseItem.techStack} />
        </div>
      </Section>

      {/* Outcome */}
      <Section background="primary" padding="lg" id="case-outcome" className="overflow-x-clip">
        <div className="max-w-5xl">
          <CaseHeading index={chapter("case-outcome")} kicker={en ? "Impact" : "Эффект"} title={language === "en" ? "Outcome" : "Результат"} />
          <CaseOutcome text={caseItem.outcome[language]} label={caseItem.industry[language]} />
        </div>
      </Section>

      {/* Hard parts we solved */}
      <Section background="secondary" padding="lg" id="case-hardparts" className="overflow-x-clip">
        <div className="max-w-4xl">
          <CaseHeading
            index={chapter("case-hardparts")}
            kicker={en ? "Engineering" : "Инженерия"}
            title={language === "en" ? "Hard parts we solved" : "Сложные задачи, которые мы решили"}
          />
          <CaseHardParts items={caseItem.hardParts.map((hp) => ({ title: hp.title[language], description: hp.description[language] }))} />
        </div>
      </Section>

      {/* CTA */}
      <Section background="primary" padding="lg">
        <div className="mx-auto max-w-4xl">
          <CaseCtaGlow>
            <p className="mx-auto mb-8 max-w-xl font-brand text-xl font-medium leading-snug tracking-[-0.01em] text-text-primary md:text-2xl">
              {language === "en"
                ? "Have a similar project? Get an estimate or book a call."
                : "Похожий проект? Получите оценку или запишитесь на звонок."}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/contact" buttonVariant="primary" size="lg">
                {t("cta.primary")}
              </ButtonLink>
              <ButtonLink href="/cases" buttonVariant="secondary" size="lg">
                {language === "en" ? "View all cases" : "Все кейсы"}
              </ButtonLink>
            </div>
          </CaseCtaGlow>
        </div>
      </Section>

      {/* Related Cases */}
      {(() => {
        const related = flagshipCases
          .filter((c) => c.id !== caseItem.id && c.category === caseItem.category)
          .slice(0, 3);
        if (related.length === 0) return null;
        return (
          <Section background="primary" padding="lg" className="!pt-0">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 font-brand text-2xl font-semibold tracking-[-0.02em] text-text-primary md:text-3xl">
                {language === "en" ? "Related Cases" : "Похожие кейсы"}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {related.map((rc, i) => (
                  <RelatedCaseCard key={rc.id} href={`/cases/${rc.slug}`} index={i}>
                    <CategoryBadge category={rc.category} size="sm" />
                    <h3 className="mb-2 mt-3 line-clamp-2 text-heading-sm font-medium text-text-primary transition-colors group-hover:text-accent-primary">
                      {rc.title[language]}
                    </h3>
                    <p className="line-clamp-2 text-body-sm text-text-secondary">{rc.summary[language]}</p>
                  </RelatedCaseCard>
                ))}
              </div>
            </div>
          </Section>
        );
      })()}

      {/* Navigation between cases */}
      <Section background="secondary" padding="md" className="overflow-x-clip">
        <div className="mx-auto flex max-w-4xl flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          {prevCase ? (
            <CaseNavLink href={`/cases/${prevCase.slug}`} dir="prev" kicker={language === "en" ? "Previous" : "Предыдущий"} title={prevCase.title[language]} />
          ) : (
            <div />
          )}
          {nextCase ? (
            <CaseNavLink href={`/cases/${nextCase.slug}`} dir="next" kicker={language === "en" ? "Next" : "Следующий"} title={nextCase.title[language]} />
          ) : (
            <div />
          )}
        </div>
      </Section>

      {/* Universal bottom CTA */}
      <CaseBottomCTA />

      {/* Fullscreen lightbox for screenshots */}
      {hasScreenshots && (
        <Lightbox
          images={caseItem.screenshots!.map((s) => ({ src: s.src, alt: s.alt[language] }))}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
