"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/link";
import { ArtifactCard } from "@/components/ui/artifact-card";
import { MetricPill } from "@/components/ui/metric-pill";
import { PageHero } from "@/components/sections/page-hero";
import { ScrollSpyRail } from "@/components/ui/scrollspy-rail";
import { Lightbox } from "@/components/ui/lightbox";
import Image from "next/image";
import type { FlagshipCase } from "@/lib/cases-data";
import { flagshipCases } from "@/lib/cases-data";
import NextLink from "next/link";
import { CaseBottomCTA } from "@/components/case-bottom-cta";

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

  const scrollItems = [
    { id: "case-summary", label: language === "en" ? "Summary" : "Сводка" },
    { id: "case-problem", label: language === "en" ? "Problem" : "Задача" },
    { id: "case-constraints", label: language === "en" ? "Constraints" : "Ограничения" },
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
        { title: language === "en" ? "L1 Rust Node" : "L1 нода на Rust", subtitle: language === "en" ? "15+ core modules" : "15+ модулей ядра", tone: "primary" },
        { title: language === "en" ? "DEX Engine" : "DEX\u2011движок", subtitle: language === "en" ? "Orderbook + Bulletproofs" : "Ордербук + Bulletproofs", tone: "success" },
        { title: language === "en" ? "4 Frontend Apps" : "4 фронтенда", subtitle: "DEX UI, Explorer, Operator, Faucet", tone: "warning" },
        { title: "TypeScript SDK", subtitle: language === "en" ? "HTTP API + DEX integration" : "HTTP API + DEX\u2011интеграция", tone: "primary" },
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
  const passedCount = qualityGates.filter((g) => g.passed).length;

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
          caseItem.metrics && caseItem.metrics.length > 0 ? (
            <div className="space-y-4">
              {/* Mobile: horizontal compact metrics */}
              <div className="flex flex-wrap gap-3 lg:hidden">
                {caseItem.metrics.slice(0, 4).map((metric) => (
                  <div key={`hero-mobile-${metric.value}`} className="bg-bg-secondary/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border flex items-baseline gap-2">
                    <span className="text-heading-sm text-accent-primary font-bold tabular-nums">{metric.value}</span>
                    <span className="text-caption text-text-secondary">{metric.label[language]}</span>
                  </div>
                ))}
              </div>
              {/* Desktop: vertical stacked metrics */}
              <div className="hidden lg:block space-y-4">
                {caseItem.metrics.slice(0, 3).map((metric) => (
                  <div key={`hero-right-${metric.value}`} className="bg-bg-secondary/80 backdrop-blur-sm p-4 rounded-xl border border-border shadow-glow-sm">
                    <p className="text-display-xs text-accent-primary font-bold tabular-nums">{metric.value}</p>
                    <p className="text-body-sm text-text-secondary">{metric.label[language]}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : undefined
        }
      />

      <Section background="primary" padding="none" id="case-summary-meta">
        <div className="max-w-4xl px-0 lg:px-12 py-8">
          <AnimatedItem>
            <div className="flex flex-wrap gap-6 text-body-sm text-text-muted">
              <span>
                <strong className="text-text-secondary">
                  {language === "en" ? "Year" : "Год"}:{" "}
                </strong>
                {caseItem.year}
              </span>
              <span>
                <strong className="text-text-secondary">
                  {language === "en" ? "Industry" : "Индустрия"}:{" "}
                </strong>
                {caseItem.industry[language]}
              </span>
              <span>
                <strong className="text-text-secondary">
                  {language === "en" ? "Timeline" : "Сроки"}:{" "}
                </strong>
                {caseItem.timeline[language]}
              </span>
            </div>
          </AnimatedItem>
        </div>
      </Section>

      {/* Problem */}
      <Section background="secondary" padding="lg" id="case-problem">
        <div className="max-w-3xl">
          <SectionHeader
            title={language === "en" ? "Problem" : "Задача"}
            animate={false}
          />
          <AnimatedItem>
            <p className="text-body-lg text-text-secondary">
              {caseItem.problem[language]}
            </p>
          </AnimatedItem>
        </div>
      </Section>

      {/* Constraints */}
      <Section background="primary" padding="lg" id="case-constraints">
        <div className="max-w-3xl">
          <SectionHeader
            title={language === "en" ? "Constraints" : "Ограничения"}
            animate={false}
          />
          <AnimatedItem>
            <ul className="space-y-3">
              {caseItem.constraints[language].map((c) => (
                <li
                  key={`constraint-${c.slice(0, 30).replace(/\s+/g, '-')}`}
                  className="flex items-start gap-3 text-body-md text-text-secondary"
                >
                  <span className="text-accent-primary mt-1">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </AnimatedItem>
        </div>
      </Section>

      {/* Solution */}
      <Section background="secondary" padding="lg" id="case-solution">
        <div className="max-w-4xl">
          <SectionHeader
            title={language === "en" ? "Solution" : "Решение"}
            animate={false}
          />
          {(() => {
            const solutionText = caseItem.solution[language];

            // Section label keywords (handles regular hyphen, non-breaking hyphen \u2011, and space)
            const LABELS = [
              "DESIGN", "FRONTEND", "BACKEND",
              "ФРОНТЕНД", "БЭКЕНД", "ДИЗАЙН",
              "iOS[\\s\\-\u2011]APP", "iOS[\\s\\-\u2011]ПРИЛОЖЕНИЕ",
              "CHEF EXPERIENCE", "ОПЫТ ПОВАРА",
              "API[\\s\\-\u2011]LAYER", "API[\\s\\-\u2011]СЛОЙ",
            ];
            const labelGroup = LABELS.join("|");
            // Match: LABEL (optional parenthetical): — preceded by ". " or start of string
            const sectionRe = new RegExp(
              `(?:^|[.!]\\s+)((?:${labelGroup})(?:\\s*\\([^)]*\\))?)\\s*:\\s*`,
              "gi"
            );

            // Collect all match positions
            const allMatches: { heading: string; fullMatchStart: number; bodyStart: number }[] = [];
            let m;
            while ((m = sectionRe.exec(solutionText)) !== null) {
              allMatches.push({
                heading: m[1].trim(),
                fullMatchStart: m.index,
                bodyStart: m.index + m[0].length,
              });
            }

            if (allMatches.length >= 2) {
              // Extract intro (text before first section label)
              const firstLabelStart = allMatches[0].fullMatchStart;
              let intro = "";
              if (firstLabelStart > 0) {
                intro = solutionText.slice(0, firstLabelStart).replace(/[.\s]+$/, "").trim();
              }

              // Extract each section body (from bodyStart to the next label's fullMatchStart)
              const parts = allMatches.map((match, i) => {
                const bodyEnd = i + 1 < allMatches.length
                  ? allMatches[i + 1].fullMatchStart
                  : solutionText.length;
                let body = solutionText.slice(match.bodyStart, bodyEnd).replace(/[.\s]+$/, "").trim();
                // Remove trailing period-space before next section
                body = body.replace(/\.\s*$/, "").trim();
                return { heading: match.heading, body: body + "." };
              });

              // Icons for section headings
              const sectionIcon = (heading: string) => {
                const h = heading.toUpperCase();
                if (h.includes("DESIGN") || h.includes("ДИЗАЙН")) return "🎨";
                if (h.includes("FRONTEND") || h.includes("ФРОНТЕНД")) return "⚛️";
                if (h.includes("BACKEND") || h.includes("БЭКЕНД")) return "⚙️";
                if (h.includes("IOS")) return "📱";
                if (h.includes("CHEF") || h.includes("ПОВАР")) return "👨‍🍳";
                if (h.includes("API")) return "🔌";
                return "📦";
              };

              return (
                <div className="space-y-5">
                  {intro && (
                    <AnimatedItem>
                      <p className="text-body-lg text-text-primary font-medium">{intro}.</p>
                    </AnimatedItem>
                  )}
                  <div className="grid gap-4">
                    {parts.map((part, i) => (
                      <AnimatedItem key={i} delay={i * 0.08}>
                        <div className="rounded-xl border border-border bg-bg-primary/60 p-5 md:p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary/10 text-base" aria-hidden="true">{sectionIcon(part.heading)}</span>
                            <h3 className="text-heading-sm font-semibold text-text-primary uppercase tracking-wider">
                              {part.heading}
                            </h3>
                          </div>
                          <p className="text-body-md text-text-secondary leading-relaxed">
                            {part.body}
                          </p>
                        </div>
                      </AnimatedItem>
                    ))}
                  </div>
                </div>
              );
            }

            // Fallback: split long text into readable paragraphs (4 sentences each)
            const sentences = solutionText.split(/(?<=\.)\s+/);
            if (sentences.length <= 5) {
              return (
                <AnimatedItem>
                  <p className="text-body-lg text-text-secondary leading-relaxed">{solutionText}</p>
                </AnimatedItem>
              );
            }

            const paragraphs: string[] = [];
            for (let i = 0; i < sentences.length; i += 4) {
              paragraphs.push(sentences.slice(i, i + 4).join(" "));
            }

            return (
              <div className="space-y-4">
                {paragraphs.map((para, i) => (
                  <AnimatedItem key={i} delay={i * 0.06}>
                    <p className="text-body-lg text-text-secondary leading-relaxed">{para}</p>
                  </AnimatedItem>
                ))}
              </div>
            );
          })()}
        </div>
      </Section>

      {/* Deliverables */}
      <Section background="primary" padding="lg" id="case-deliverables">
        <div className="max-w-3xl">
          <SectionHeader
            title={language === "en" ? "Deliverables" : "Результаты"}
            animate={false}
          />
          <AnimatedItem>
            <ul className="grid sm:grid-cols-2 gap-2">
              {caseItem.deliverables[language].map((d) => (
                <li
                  key={`deliverable-${d.slice(0, 30).replace(/\s+/g, '-')}`}
                  className="flex items-start gap-2 text-body-md text-text-secondary"
                >
                  <svg
                    className="w-5 h-5 text-success shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </AnimatedItem>
        </div>
      </Section>

      {/* Screenshots / UX Flow */}
      {hasScreenshots && (
        <Section background="secondary" padding="lg" id="case-screenshots">
          <div className="max-w-5xl">
            <SectionHeader
              title={language === "en" ? "Screenshots / UX Flow" : "Скриншоты / UX\u2011поток"}
              subtitle={
                language === "en"
                  ? "Step-by-step walkthrough of the product interface"
                  : "Пошаговый обзор интерфейса продукта"
              }
              animate={false}
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
      <Section background={hasScreenshots ? "primary" : "secondary"} padding="lg" id="case-artifacts">
        <div className="max-w-3xl">
          <SectionHeader
            title={language === "en" ? "Artifacts" : "Артефакты"}
            subtitle={language === "en" ? "Documents and deliverables from the project" : "Документы и результаты проекта"}
            animate={false}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {artifacts.map((artifact, index) => (
              <AnimatedItem key={`artifact-${artifact.title.replace(/\s+/g, '-').toLowerCase()}-${artifact.subtitle?.replace(/\s+/g, '-').toLowerCase() ?? 'default'}`} delay={index * 0.05}>
                <ArtifactCard
                  title={artifact.title}
                  subtitle={artifact.subtitle}
                  tone={artifact.tone}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                />
              </AnimatedItem>
            ))}
          </div>
        </div>
      </Section>

      {/* Quality gates - Interactive checklist */}
      <Section background="primary" padding="lg" id="case-quality">
        <div className="max-w-3xl">
          <SectionHeader
            title={language === "en" ? "Verification / Quality gates" : "Верификация / гейты качества"}
            subtitle={language === "en" ? `${qualityGates.length}-phase checklist before release` : `${qualityGates.length}-фазный чеклист перед релизом`}
            animate={false}
          />
          <div className="rounded-2xl border border-border bg-bg-secondary p-6 relative overflow-hidden">
            {/* Background dot grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(10,10,10,0.05) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }} />
            <div className="relative space-y-3">
              {qualityGates.map((gate, index) => (
                <AnimatedItem key={`gate-${gate.name.en.slice(0, 20).replace(/\s+/g, '-')}`} delay={index * 0.04}>
                  <div className={`flex items-center gap-4 p-4 rounded-xl bg-bg-tertiary/60 border border-border transition-colors group ${gate.passed ? 'hover:border-success/30' : 'hover:border-warning/30'}`}>
                    {/* Checkbox indicator */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${gate.passed ? 'bg-success/20 border border-success/40 group-hover:bg-success/30' : 'bg-warning/20 border border-warning/40 group-hover:bg-warning/30'}`}>
                      {gate.passed ? (
                        <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    {/* Gate info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-caption text-text-tertiary font-mono">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-body-md text-text-primary font-medium">{gate.name[language]}</span>
                      </div>
                    </div>
                    {/* Status */}
                    <span className={`px-2 py-1 rounded-md text-caption font-medium ${gate.passed ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                      {gate.passed
                        ? (language === "en" ? "Pass" : "Пройден")
                        : (language === "en" ? "Skipped" : "Пропущен")}
                    </span>
                  </div>
                </AnimatedItem>
              ))}
            </div>
            {/* Summary footer */}
            <div className="relative mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-body-sm text-text-secondary">
                {passedCount === qualityGates.length
                  ? (language === "en" ? "All gates passed" : "Все гейты пройдены")
                  : (language === "en" ? `${passedCount} of ${qualityGates.length} gates passed` : `${passedCount} из ${qualityGates.length} гейтов пройдено`)}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-heading-sm font-display ${passedCount === qualityGates.length ? 'text-success' : 'text-warning'}`}>
                  {passedCount}/{qualityGates.length}
                </span>
                {passedCount === qualityGates.length ? (
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Tech stack */}
      <Section background="secondary" padding="lg" id="case-tech">
        <div className="max-w-3xl">
          <SectionHeader
            title={language === "en" ? "Tech stack" : "Стек технологий"}
            animate={false}
          />
          <AnimatedItem>
            <div className="flex flex-wrap gap-2">
              {caseItem.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-bg-tertiary border border-border text-body-sm text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedItem>
        </div>
      </Section>

      {/* Outcome */}
      <Section background="primary" padding="lg" id="case-outcome">
        <div className="max-w-3xl">
          <SectionHeader
            title={language === "en" ? "Outcome" : "Результат"}
            animate={false}
          />
          <AnimatedItem>
            <p className="text-body-lg text-text-secondary">
              {caseItem.outcome[language]}
            </p>
          </AnimatedItem>
        </div>
      </Section>

      {/* Hard parts we solved */}
      <Section background="secondary" padding="lg" id="case-hardparts">
        <div className="max-w-3xl">
          <SectionHeader
            title={
              language === "en"
                ? "Hard parts we solved"
                : "Сложные задачи, которые мы решили"
            }
            animate={false}
          />
          <div className="space-y-6">
            {caseItem.hardParts.map((hp, i) => (
              <AnimatedItem key={`hardpart-${hp.title.en.slice(0, 20).replace(/\s+/g, '-')}`} delay={i * 0.05}>
                <Card variant="bordered" padding="md">
                  <h3 className="text-heading-sm font-medium text-text-primary mb-2">
                    {hp.title[language]}
                  </h3>
                  <p className="text-body-md text-text-secondary">
                    {hp.description[language]}
                  </p>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="primary" padding="lg">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedItem>
            <p className="text-body-lg text-text-secondary mb-8">
              {language === "en"
                ? "Have a similar project? Get an estimate or book a call."
                : "Похожий проект? Получите оценку или запишитесь на звонок."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" buttonVariant="primary" size="lg">
                {t("cta.primary")}
              </ButtonLink>
              <ButtonLink href="/cases" buttonVariant="secondary" size="lg">
                {language === "en" ? "View all cases" : "Все кейсы"}
              </ButtonLink>
            </div>
          </AnimatedItem>
        </div>
      </Section>

      {/* Navigation between cases */}
      {/* Related Cases */}
      {(() => {
        const related = flagshipCases
          .filter((c) => c.id !== caseItem.id && c.category === caseItem.category)
          .slice(0, 3);
        if (related.length === 0) return null;
        return (
          <Section background="primary" padding="lg">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-heading-lg font-display text-text-primary mb-6">
                {language === "en" ? "Related Cases" : "Похожие кейсы"}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {related.map((rc) => (
                  <NextLink key={rc.id} href={`/cases/${rc.slug}`} className="group block">
                    <div className="rounded-xl border border-border bg-bg-secondary/60 p-5 hover:border-accent-primary/30 hover:bg-bg-secondary transition-all h-full">
                      <CategoryBadge category={rc.category} size="sm" />
                      <h3 className="text-heading-sm font-medium text-text-primary mt-3 mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                        {rc.title[language]}
                      </h3>
                      <p className="text-body-sm text-text-secondary line-clamp-2">{rc.summary[language]}</p>
                    </div>
                  </NextLink>
                ))}
              </div>
            </div>
          </Section>
        );
      })()}

      <Section background="secondary" padding="md">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-4xl mx-auto">
          {/* Previous case */}
          {prevCase ? (
            <NextLink href={`/cases/${prevCase.slug}`} className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-tertiary/50 hover:border-accent-primary/30 transition-colors w-full sm:max-w-[45%]">
              <svg className="w-5 h-5 text-text-tertiary group-hover:text-accent-primary transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="min-w-0">
                <p className="text-caption text-text-tertiary mb-1">
                  {language === "en" ? "Previous" : "Предыдущий"}
                </p>
                <p className="text-body-sm text-text-primary font-medium truncate group-hover:text-accent-primary transition-colors">
                  {prevCase.title[language]}
                </p>
              </div>
            </NextLink>
          ) : (
            <div />
          )}

          {/* Next case */}
          {nextCase ? (
            <NextLink href={`/cases/${nextCase.slug}`} className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-tertiary/50 hover:border-accent-primary/30 transition-colors w-full sm:max-w-[45%] sm:ml-auto text-right">
              <div className="min-w-0">
                <p className="text-caption text-text-tertiary mb-1">
                  {language === "en" ? "Next" : "Следующий"}
                </p>
                <p className="text-body-sm text-text-primary font-medium truncate group-hover:text-accent-primary transition-colors">
                  {nextCase.title[language]}
                </p>
              </div>
              <svg className="w-5 h-5 text-text-tertiary group-hover:text-accent-primary transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NextLink>
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
