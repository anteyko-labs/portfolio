"use client";

import { useState } from "react";
import { pick, type Language } from "@/lib/i18n-text";
import { useLanguage } from "@/lib/language-context";
import { Section, AnimatedItem } from "@/components/ui/section";
import { CategoryBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/link";
import { PageHero } from "@/components/sections/page-hero";
import { ScrollSpyRail } from "@/components/ui/scrollspy-rail";
import { Lightbox } from "@/components/ui/lightbox";
import Image from "next/image";
import type { FlagshipCase } from "@/lib/cases-data";
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
function CaseSummaryRail({ caseItem, language, t }: { caseItem: FlagshipCase; language: Language; t: (key: string) => string }) {
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
            {pick({ en: "Timeline", ru: "Сроки", zh: "周期", tr: "Takvim", ar: "المدة الزمنية" }, language)}
          </p>
          <p className="text-body-sm text-text-primary font-medium">
            {caseItem.timeline[language]}
          </p>
        </div>

        {/* Industry */}
        <div>
          <p className="text-caption text-text-tertiary uppercase tracking-wider mb-1">
            {pick({ en: "Industry", ru: "Индустрия", zh: "行业", tr: "Sektör", ar: "القطاع" }, language)}
          </p>
          <p className="text-body-sm text-text-primary">
            {caseItem.industry[language]}
          </p>
        </div>

        {/* Metrics */}
        {caseItem.metrics && caseItem.metrics.length > 0 && (
          <div>
            <p className="text-caption text-text-tertiary uppercase tracking-wider mb-2">
              {pick({ en: "Key metrics", ru: "Ключевые метрики", zh: "关键指标", tr: "Temel metrikler", ar: "المؤشرات الرئيسية" }, language)}
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

export function CaseDetailContent({
  caseItem,
  prevCase,
  nextCase,
  related,
}: {
  caseItem: FlagshipCase;
  /** Neighbours in the flagship list and same-category cases, picked on the server */
  prevCase: FlagshipCase | null;
  nextCase: FlagshipCase | null;
  related: FlagshipCase[];
}) {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const hasScreenshots = caseItem.screenshots && caseItem.screenshots.length > 0;
  const isL1 = caseItem.slug === "web3-l1-dex";

  const scrollItems = [
    { id: "case-summary", label: pick({ en: "Summary", ru: "Сводка", zh: "概要", tr: "Özet", ar: "ملخص" }, language) },
    { id: "case-problem", label: pick({ en: "Problem", ru: "Задача", zh: "问题", tr: "Sorun", ar: "المشكلة" }, language) },
    { id: "case-constraints", label: pick({ en: "Constraints", ru: "Ограничения", zh: "约束条件", tr: "Kısıtlar", ar: "القيود" }, language) },
    ...(isL1 ? [{ id: "case-how", label: pick({ en: "How it works", ru: "Как устроено", zh: "运作方式", tr: "Nasıl çalışır", ar: "آلية العمل" }, language) }] : []),
    { id: "case-solution", label: pick({ en: "Solution", ru: "Решение", zh: "解决方案", tr: "Çözüm", ar: "الحل" }, language) },
    { id: "case-deliverables", label: pick({ en: "Deliverables", ru: "Результаты", zh: "交付成果", tr: "Teslimatlar", ar: "المخرجات" }, language) },
    ...(hasScreenshots ? [{ id: "case-screenshots", label: pick({ en: "Screenshots", ru: "Скриншоты", zh: "截图", tr: "Ekran görüntüleri", ar: "لقطات الشاشة" }, language) }] : []),
    { id: "case-artifacts", label: pick({ en: "Artifacts", ru: "Артефакты", zh: "交付物", tr: "Çıktılar", ar: "المستندات والملفات" }, language) },
    { id: "case-quality", label: pick({ en: "Quality gates", ru: "Гейты качества", zh: "质量关卡", tr: "Kalite kapıları", ar: "بوابات الجودة" }, language) },
    { id: "case-tech", label: pick({ en: "Tech stack", ru: "Стек", zh: "技术栈", tr: "Teknoloji yığını", ar: "التقنيات المستخدمة" }, language) },
    { id: "case-outcome", label: pick({ en: "Outcome", ru: "Результат", zh: "成果", tr: "Sonuç", ar: "النتيجة" }, language) },
    { id: "case-hardparts", label: pick({ en: "Hard parts", ru: "Сложные задачи", zh: "技术难点", tr: "Zor noktalar", ar: "التحديات الصعبة" }, language) },
  ];

  // Dynamic artifacts based on case content
  const getArtifactsForCase = (): { title: string; subtitle: string; tone?: "primary" | "success" | "warning" }[] => {
    const baseArtifacts = [
      {
        title: caseItem.artifactHint?.[language] ?? (pick({ en: "Delivery checklist", ru: "Чеклист поставки", zh: "交付清单", tr: "Teslimat kontrol listesi", ar: "قائمة مراجعة التسليم" }, language)),
        subtitle: pick({ en: "Artifact", ru: "Артефакт", zh: "交付物", tr: "Çıktı", ar: "الملف" }, language),
        tone: "primary" as const,
      },
      {
        title: pick({ en: "Verification report", ru: "Отчёт верификации", zh: "验证报告", tr: "Doğrulama raporu", ar: "تقرير التحقق" }, language),
        subtitle: pick({ en: "Release gate", ru: "Гейт релиза", zh: "发布关卡", tr: "Yayın kapısı", ar: "بوابة الإصدار" }, language),
        tone: "success" as const,
      },
    ];

    // Case-specific artifacts
    const caseArtifacts: Record<string, { title: string; subtitle: string; tone?: "primary" | "success" | "warning" }[]> = {
      "web3-l1-dex": [
        { title: pick({ en: "The blockchain", ru: "Сам блокчейн", zh: "区块链本体", tr: "Blokzincirin kendisi", ar: "البلوكتشين نفسها" }, language), subtitle: pick({ en: "Trades final in ~0.2 s", ru: "Сделки окончательны за ~0,2 с", zh: "交易约 0.2 秒即最终确认", tr: "İşlemler ~0,2 sn'de kesinleşir", ar: "تُحسم الصفقات نهائيًا في نحو 0.2 ثانية" }, language), tone: "primary" },
        { title: pick({ en: "Built-in exchange", ru: "Встроенная биржа", zh: "内置交易所", tr: "Yerleşik borsa", ar: "منصة تداول مدمجة" }, language), subtitle: pick({ en: "Fair order, no cutting in line", ru: "Честный порядок, без «влезания»", zh: "公平排序，杜绝插队", tr: "Adil sıralama, kuyruğa atlama yok", ar: "ترتيب عادل دون تجاوز الدور" }, language), tone: "success" },
        { title: pick({ en: "4 apps", ru: "4 приложения", zh: "4 个应用", tr: "4 uygulama", ar: "4 تطبيقات" }, language), subtitle: pick({ en: "Trading, explorer, control panel, faucet", ru: "Торговля, обозреватель, панель, кран", zh: "交易终端、浏览器、控制面板、水龙头", tr: "İşlem, gezgin, kontrol paneli, faucet", ar: "التداول، المستكشف، لوحة التحكم، صنبور الرموز" }, language), tone: "warning" },
        { title: pick({ en: "Developer kits", ru: "Наборы для разработчиков", zh: "开发者工具包", tr: "Geliştirici kitleri", ar: "حزم المطوّرين" }, language), subtitle: "TypeScript · Python · Rust", tone: "primary" },
      ],
      "utility-token-uae": [
        { title: pick({ en: "Security Audit Report", ru: "Отчёт security\u2011аудита", zh: "安全审计报告", tr: "Güvenlik Denetimi Raporu", ar: "تقرير التدقيق الأمني" }, language), subtitle: "SECURITY_AUDIT_REPORT", tone: "success" },
        { title: pick({ en: "NFT Tier Contracts", ru: "NFT\u2011контракты уровней", zh: "NFT 等级合约", tr: "NFT Seviye Kontratları", ar: "عقود مستويات NFT" }, language), subtitle: "Bronze / Silver / Gold / Platinum", tone: "primary" },
        { title: pick({ en: "Admin Panel Guide", ru: "Гайд админ\u2011панели", zh: "管理后台指南", tr: "Yönetim Paneli Kılavuzu", ar: "دليل لوحة الإدارة" }, language), subtitle: "ADMIN_CAPABILITIES_REPORT", tone: "warning" },
        { title: pick({ en: "Deployment Reports", ru: "Отчёты деплоя", zh: "部署报告", tr: "Dağıtım Raporları", ar: "تقارير النشر" }, language), subtitle: pick({ en: "Production readiness", ru: "Готовность к production", zh: "生产就绪度", tr: "Production hazırlığı", ar: "الجاهزية للإنتاج" }, language), tone: "primary" },
        { title: pick({ en: "Staking Flow Spec", ru: "Спека стейкинг\u2011flow", zh: "质押流程规范", tr: "Staking Akışı Spesifikasyonu", ar: "مواصفات مسار التخزين (Staking)" }, language), subtitle: pick({ en: "Benefit-based, no yield", ru: "Benefit\u2011based, без доходности", zh: "基于权益，无收益承诺", tr: "Fayda odaklı, getirisiz", ar: "قائم على المزايا، دون عائد" }, language), tone: "success" },
        { title: pick({ en: "Voucher System Docs", ru: "Документация ваучеров", zh: "优惠券系统文档", tr: "Kupon Sistemi Dokümanları", ar: "وثائق نظام القسائم" }, language), subtitle: pick({ en: "NFT-gated access", ru: "NFT\u2011gated доступ", zh: "NFT 门控访问", tr: "NFT ile erişim", ar: "وصول مقيّد بـ NFT" }, language), tone: "warning" },
      ],
      "enterprise-modules": [
        { title: "KYC Flow Diagram", subtitle: "Jumio + Sumsub", tone: "primary" },
        { title: pick({ en: "Audit trail schema", ru: "Схема аудит-трейла", zh: "审计追踪架构", tr: "Denetim izi şeması", ar: "مخطط سجل التدقيق" }, language), subtitle: "SOC 2", tone: "success" },
        { title: pick({ en: "Role matrix", ru: "Матрица ролей", zh: "角色矩阵", tr: "Rol matrisi", ar: "مصفوفة الأدوار" }, language), subtitle: "RBAC", tone: "warning" },
      ],
      "geo-heatmap-backend": [
        { title: "H3 Resolution spec", subtitle: "Geo grid", tone: "primary" },
        { title: "API OpenAPI spec", subtitle: "REST v1", tone: "success" },
        { title: pick({ en: "Cache strategy doc", ru: "Доки по кешу", zh: "缓存策略文档", tr: "Önbellek stratejisi dokümanı", ar: "وثيقة استراتيجية التخزين المؤقت" }, language), subtitle: "Redis + ClickHouse", tone: "warning" },
      ],
      "anti-refund-payment": [
        { title: pick({ en: "Deposit flow spec", ru: "Спек депозитного флоу", zh: "充值流程规范", tr: "Depozito akışı spesifikasyonu", ar: "مواصفات مسار الإيداع" }, language), subtitle: "4 steps", tone: "primary" },
        { title: pick({ en: "Legal terms template", ru: "Шаблон юр. условий", zh: "法律条款模板", tr: "Hukuki şartlar şablonu", ar: "قالب الشروط القانونية" }, language), subtitle: "Consumer protection", tone: "success" },
      ],
      "wallet-rpc-evm-compatibility": [
        { title: "Wallet compatibility matrix", subtitle: "MetaMask, Rabby, WC", tone: "primary" },
        { title: "RPC correctness suite", subtitle: "JSON-RPC tests", tone: "success" },
        { title: pick({ en: "Onboarding runbook", ru: "Runbook онбординга", zh: "上手运维手册", tr: "Onboarding runbook'u", ar: "دليل التشغيل لإعداد المستخدمين" }, language), subtitle: "New wallets", tone: "warning" },
      ],
      "release-quality-verification-framework": [
        { title: "7-phase gate spec", subtitle: "Build → Security", tone: "primary" },
        { title: pick({ en: "Verification report template", ru: "Шаблон отчёта верификации", zh: "验证报告模板", tr: "Doğrulama raporu şablonu", ar: "قالب تقرير التحقق" }, language), subtitle: "MD + PDF", tone: "success" },
        { title: pick({ en: "Override workflow", ru: "Workflow override", zh: "例外审批流程", tr: "Override iş akışı", ar: "مسار التجاوز (Override)" }, language), subtitle: "Audit trail", tone: "warning" },
      ],
      "startup-under-key-mvp-launch-support": [
        { title: "MVP → Launch playbook", subtitle: "3 phases", tone: "primary" },
        { title: pick({ en: "Support SLA doc", ru: "Доки SLA поддержки", zh: "支持 SLA 文档", tr: "Destek SLA dokümanı", ar: "وثيقة SLA للدعم" }, language), subtitle: "3 months", tone: "success" },
        { title: pick({ en: "IP transfer checklist", ru: "Чеклист передачи IP", zh: "IP 转让清单", tr: "IP devri kontrol listesi", ar: "قائمة مراجعة نقل الملكية الفكرية" }, language), subtitle: "Full ownership", tone: "warning" },
      ],
      "multi-location-restaurant-management": [
        { title: pick({ en: "RBAC Model (4 roles)", ru: "RBAC\u2011модель (4 роли)", zh: "RBAC 模型（4 种角色）", tr: "RBAC Modeli (4 rol)", ar: "نموذج RBAC (4 أدوار)" }, language), subtitle: pick({ en: "Chef / Employee / Accountant / Owner", ru: "Шеф / Сотрудник / Бухгалтер / Владелец", zh: "厨师 / 员工 / 会计 / 店主", tr: "Şef / Çalışan / Muhasebeci / Sahip", ar: "الشيف / الموظف / المحاسب / المالك" }, language), tone: "primary" },
        { title: pick({ en: "Cost Calculation Engine", ru: "Движок расчёта себестоимости", zh: "成本核算引擎", tr: "Maliyet Hesaplama Motoru", ar: "محرّك احتساب التكلفة" }, language), subtitle: pick({ en: "Ingredients → Rolls → Sets", ru: "Ингредиенты → Роллы → Сеты", zh: "食材 → 卷 → 套餐", tr: "Malzemeler → Rulolar → Setler", ar: "المكوّنات ← الرولات ← المجموعات" }, language), tone: "success" },
        { title: pick({ en: "Accounting Module", ru: "Модуль бухгалтерии", zh: "会计模块", tr: "Muhasebe Modülü", ar: "وحدة المحاسبة" }, language), subtitle: "Excel + ZIP export", tone: "warning" },
        { title: pick({ en: "Audit Trail System", ru: "Система аудит\u2011трейла", zh: "审计追踪系统", tr: "Denetim İzi Sistemi", ar: "نظام سجل التدقيق" }, language), subtitle: pick({ en: "Action / Object / Old→New / Role", ru: "Действие / Объект / Было→Стало / Роль", zh: "操作 / 对象 / 旧值→新值 / 角色", tr: "Eylem / Nesne / Eski→Yeni / Rol", ar: "الإجراء / الكائن / القديم←الجديد / الدور" }, language), tone: "primary" },
        { title: pick({ en: "Analytics Dashboard", ru: "Дашборд аналитики", zh: "数据分析看板", tr: "Analitik Paneli", ar: "لوحة التحليلات" }, language), subtitle: "Chart.js", tone: "success" },
      ],
      "asset-tokenization-platform": [
        { title: pick({ en: "KYC Verification Pipeline", ru: "Пайплайн KYC\u2011верификации", zh: "KYC 验证流水线", tr: "KYC Doğrulama Hattı", ar: "مسار التحقق KYC" }, language), subtitle: pick({ en: "4-status flow", ru: "4\u2011статусный flow", zh: "4 状态流转", tr: "4 durumlu akış", ar: "مسار بأربع حالات" }, language), tone: "primary" },
        { title: pick({ en: "Private Sale State Machine", ru: "State machine Private Sale", zh: "私募状态机", tr: "Private Sale Durum Makinesi", ar: "آلة الحالات لـ Private Sale" }, language), subtitle: pick({ en: "Limits + safe transitions", ru: "Лимиты + безопасные переходы", zh: "额度限制 + 安全流转", tr: "Limitler + güvenli geçişler", ar: "حدود + انتقالات آمنة" }, language), tone: "success" },
        { title: pick({ en: "RBAC Access Control", ru: "RBAC\u2011контроль доступа", zh: "RBAC 访问控制", tr: "RBAC Erişim Kontrolü", ar: "التحكم في الوصول RBAC" }, language), subtitle: "User / Admin / Ops", tone: "warning" },
        { title: pick({ en: "Audit Trail System", ru: "Система аудит\u2011трейла", zh: "审计追踪系统", tr: "Denetim İzi Sistemi", ar: "نظام سجل التدقيق" }, language), subtitle: pick({ en: "Who, when, what", ru: "Кто, когда, что", zh: "谁、何时、做了什么", tr: "Kim, ne zaman, ne", ar: "من، ومتى، وماذا" }, language), tone: "primary" },
        { title: pick({ en: "Token Issuance Contracts", ru: "Контракты выпуска токенов", zh: "代币发行合约", tr: "Token İhraç Kontratları", ar: "عقود إصدار الرموز" }, language), subtitle: "EVM\u2011compatible", tone: "success" },
        { title: pick({ en: "Stakeholder Documentation", ru: "Документация для стейкхолдеров", zh: "干系人文档", tr: "Paydaş Dokümantasyonu", ar: "وثائق أصحاب المصلحة" }, language), subtitle: pick({ en: "Features + roadmap + system", ru: "Функции + roadmap + система", zh: "功能 + 路线图 + 系统", tr: "Özellikler + yol haritası + sistem", ar: "الميزات + خارطة الطريق + النظام" }, language), tone: "warning" },
      ],
      "trm-oferta-registration": [
        { title: pick({ en: "3-step UX flow", ru: "3-шаговый UX-поток", zh: "3 步 UX 流程", tr: "3 adımlı UX akışı", ar: "مسار UX من 3 خطوات" }, language), subtitle: pick({ en: "Registration → Offer → Deposit", ru: "Регистрация → Оферта → Задаток", zh: "注册 → 要约 → 定金", tr: "Kayıt → Teklif → Depozito", ar: "التسجيل ← العرض ← الدفعة المقدّمة" }, language), tone: "primary" },
        { title: pick({ en: "PDF with seal & signature", ru: "PDF с печатью и подписью", zh: "带印章与签名的 PDF", tr: "Mühür ve imzalı PDF", ar: "ملف PDF بالختم والتوقيع" }, language), subtitle: "PDFKit + Cyrillic TTF", tone: "success" },
        { title: pick({ en: "Audit trail schema", ru: "Схема аудит-трейла", zh: "审计追踪架构", tr: "Denetim izi şeması", ar: "مخطط سجل التدقيق" }, language), subtitle: pick({ en: "9+ fields per record", ru: "9+ полей на запись", zh: "每条记录 9+ 个字段", tr: "Kayıt başına 9+ alan", ar: "9+ حقول لكل سجل" }, language), tone: "warning" },
        { title: pick({ en: "Admin panel", ru: "Админка", zh: "管理后台", tr: "Yönetim paneli", ar: "لوحة الإدارة" }, language), subtitle: "HTTP Basic Auth", tone: "primary" },
      ],
    };

    return caseArtifacts[caseItem.slug] ?? baseArtifacts;
  };

  const artifacts = getArtifactsForCase();

  // Use dynamic quality gates from case data, or fallback to default
  const defaultQualityGates = [
    { name: { en: "Build", ru: "Сборка", zh: "构建", tr: "Derleme", ar: "البناء" }, passed: true },
    { name: { en: "Unit tests", ru: "Юнит-тесты", zh: "单元测试", tr: "Birim testleri", ar: "اختبارات الوحدة" }, passed: true },
    { name: { en: "Integration", ru: "Интеграция", zh: "集成测试", tr: "Entegrasyon", ar: "التكامل" }, passed: true },
    { name: { en: "Contract checks", ru: "Проверки контрактов", zh: "合约检查", tr: "Kontrat kontrolleri", ar: "فحوصات العقود" }, passed: true },
    { name: { en: "Env parity", ru: "Паритет окружений", zh: "环境一致性", tr: "Ortam eşitliği", ar: "تطابق البيئات" }, passed: true },
    { name: { en: "Smoke", ru: "Smoke тесты", zh: "冒烟测试", tr: "Smoke", ar: "اختبار Smoke" }, passed: true },
    { name: { en: "Security checklist", ru: "Чеклист безопасности", zh: "安全检查清单", tr: "Güvenlik kontrol listesi", ar: "قائمة مراجعة الأمان" }, passed: true },
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
        eyebrow={pick({ en: "Case Study", ru: "Кейс", zh: "案例研究", tr: "Vaka Çalışması", ar: "دراسة حالة" }, language)}
        backLink={{ href: "/cases", label: pick({ en: "All Cases", ru: "Все кейсы", zh: "全部案例", tr: "Tüm projeler", ar: "جميع المشاريع" }, language) }}
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
              caption={pick({ en: "project metrics", ru: "метрики проекта", zh: "项目指标", tr: "proje metrikleri", ar: "مؤشرات المشروع" }, language)}
              live={pick({ en: "live", ru: "live", zh: "已上线", tr: "canlı", ar: "مباشر" }, language)}
            />
          ) : undefined
        }
      />

      <Section background="primary" padding="none" id="case-summary-meta">
        <div className="max-w-5xl py-8 md:py-10">
          <CaseMetaStrip
            items={[
              { label: pick({ en: "Year", ru: "Год", zh: "年份", tr: "Yıl", ar: "السنة" }, language), value: String(caseItem.year), icon: "calendar" },
              { label: pick({ en: "Industry", ru: "Индустрия", zh: "行业", tr: "Sektör", ar: "القطاع" }, language), value: caseItem.industry[language], icon: "building" },
              { label: pick({ en: "Timeline", ru: "Сроки", zh: "周期", tr: "Takvim", ar: "المدة الزمنية" }, language), value: caseItem.timeline[language], icon: "timer" },
            ]}
          />
        </div>
      </Section>

      {/* Problem */}
      <Section background="secondary" padding="lg" id="case-problem">
        <div className="max-w-5xl">
          <CaseHeading index={chapter("case-problem")} kicker={pick({ en: "Context", ru: "Контекст", zh: "背景", tr: "Bağlam", ar: "السياق" }, language)} title={pick({ en: "Problem", ru: "Задача", zh: "问题", tr: "Sorun", ar: "المشكلة" }, language)} />
          <CaseProblem text={caseItem.problem[language]} />
        </div>
      </Section>

      {/* Constraints */}
      <Section background="primary" padding="lg" id="case-constraints" className="overflow-x-clip">
        <div className="max-w-5xl">
          <CaseHeading index={chapter("case-constraints")} kicker={pick({ en: "Boundaries", ru: "Рамки", zh: "边界", tr: "Sınırlar", ar: "الحدود" }, language)} title={pick({ en: "Constraints", ru: "Ограничения", zh: "约束条件", tr: "Kısıtlar", ar: "القيود" }, language)} />
          <CaseConstraints items={caseItem.constraints[language]} />
        </div>
      </Section>

      {isL1 && <L1CaseScenes />}

      {/* Solution */}
      <Section background="secondary" padding="lg" id="case-solution" className="overflow-x-clip">
        <div className="max-w-4xl">
          <CaseHeading index={chapter("case-solution")} kicker={pick({ en: "Approach", ru: "Подход", zh: "方法", tr: "Yaklaşım", ar: "المنهج" }, language)} title={pick({ en: "Solution", ru: "Решение", zh: "解决方案", tr: "Çözüm", ar: "الحل" }, language)} />
          <CaseSolution intro={solution.intro} steps={solution.steps} />
        </div>
      </Section>

      {/* Deliverables */}
      <Section background="primary" padding="lg" id="case-deliverables" className="overflow-x-clip">
        <div className="max-w-4xl">
          <CaseHeading index={chapter("case-deliverables")} kicker={pick({ en: "Shipped", ru: "Поставлено", zh: "已交付", tr: "Teslim edildi", ar: "ما سلّمناه" }, language)} title={pick({ en: "Deliverables", ru: "Результаты", zh: "交付成果", tr: "Teslimatlar", ar: "المخرجات" }, language)} />
          <CaseDeliverables items={caseItem.deliverables[language]} label={pick({ en: "shipped", ru: "поставлено", zh: "已交付", tr: "teslim edildi", ar: "تم تسليمه" }, language)} />
        </div>
      </Section>

      {/* Screenshots / UX Flow */}
      {hasScreenshots && (
        <Section background="secondary" padding="lg" id="case-screenshots">
          <div className="max-w-5xl">
            <CaseHeading
              index={chapter("case-screenshots")}
              kicker={pick({ en: "Interface", ru: "Интерфейс", zh: "界面", tr: "Arayüz", ar: "الواجهة" }, language)}
              title={pick({ en: "Screenshots / UX Flow", ru: "Скриншоты / UX‑поток", zh: "截图 / UX 流程", tr: "Ekran Görüntüleri / UX Akışı", ar: "لقطات الشاشة / مسار UX" }, language)}
              subtitle={
                pick({ en: "Step-by-step walkthrough of the product interface", ru: "Пошаговый обзор интерфейса продукта", zh: "产品界面分步演示", tr: "Ürün arayüzünün adım adım turu", ar: "جولة خطوة بخطوة في واجهة المنتج" }, language)
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
                          aria-label={`${pick({ en: "View fullscreen", ru: "Открыть на весь экран", zh: "全屏查看", tr: "Tam ekran görüntüle", ar: "عرض بملء الشاشة" }, language)}: ${screenshot.alt[language]}`}
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
                              {pick({ en: "Fullscreen", ru: "На весь экран", zh: "全屏", tr: "Tam ekran", ar: "ملء الشاشة" }, language)}
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
            kicker={pick({ en: "Documents", ru: "Документы", zh: "文档", tr: "Belgeler", ar: "المستندات" }, language)}
            title={pick({ en: "Artifacts", ru: "Артефакты", zh: "交付物", tr: "Çıktılar", ar: "المستندات والملفات" }, language)}
            subtitle={pick({ en: "Documents and deliverables from the project", ru: "Документы и результаты проекта", zh: "项目文档与交付成果", tr: "Projeye ait belgeler ve teslimatlar", ar: "مستندات المشروع ومخرجاته" }, language)}
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
            kicker={pick({ en: "Release", ru: "Релиз", zh: "发布", tr: "Yayın", ar: "الإصدار" }, language)}
            title={pick({ en: "Verification / Quality gates", ru: "Верификация / гейты качества", zh: "验证 / 质量关卡", tr: "Doğrulama / Kalite kapıları", ar: "التحقق / بوابات الجودة" }, language)}
            subtitle={pick({ en: `${qualityGates.length}-phase checklist before release`, ru: `${qualityGates.length}-фазный чеклист перед релизом`, zh: `发布前 ${qualityGates.length} 阶段检查清单`, tr: `yayın öncesi ${qualityGates.length} aşamalı kontrol listesi`, ar: `قائمة مراجعة من ${qualityGates.length} مراحل قبل الإصدار` }, language)}
          />
          <QualityGatesRun
            gates={qualityGates.map((g) => ({ name: g.name[language], passed: g.passed }))}
            label={`release-verify · ${caseItem.slug}`}
          />
        </div>
      </Section>

      {/* Tech stack */}
      <Section background="secondary" padding="lg" id="case-tech" className="overflow-hidden">
        <div className="max-w-5xl">
          <CaseHeading index={chapter("case-tech")} kicker={pick({ en: "Tools", ru: "Инструменты", zh: "工具", tr: "Araçlar", ar: "الأدوات" }, language)} title={pick({ en: "Tech stack", ru: "Стек технологий", zh: "技术栈", tr: "Teknoloji yığını", ar: "التقنيات المستخدمة" }, language)} />
          <CaseTechStack items={caseItem.techStack} />
        </div>
      </Section>

      {/* Outcome */}
      <Section background="primary" padding="lg" id="case-outcome" className="overflow-x-clip">
        <div className="max-w-5xl">
          <CaseHeading index={chapter("case-outcome")} kicker={pick({ en: "Impact", ru: "Эффект", zh: "影响", tr: "Etki", ar: "الأثر" }, language)} title={pick({ en: "Outcome", ru: "Результат", zh: "成果", tr: "Sonuç", ar: "النتيجة" }, language)} />
          <CaseOutcome text={caseItem.outcome[language]} label={caseItem.industry[language]} />
        </div>
      </Section>

      {/* Hard parts we solved */}
      <Section background="secondary" padding="lg" id="case-hardparts" className="overflow-x-clip">
        <div className="max-w-4xl">
          <CaseHeading
            index={chapter("case-hardparts")}
            kicker={pick({ en: "Engineering", ru: "Инженерия", zh: "工程", tr: "Mühendislik", ar: "الهندسة" }, language)}
            title={pick({ en: "Hard parts we solved", ru: "Сложные задачи, которые мы решили", zh: "我们攻克的难点", tr: "Çözdüğümüz zor noktalar", ar: "التحديات الصعبة التي حللناها" }, language)}
          />
          <CaseHardParts items={caseItem.hardParts.map((hp) => ({ title: hp.title[language], description: hp.description[language] }))} />
        </div>
      </Section>

      {/* CTA */}
      <Section background="primary" padding="lg">
        <div className="mx-auto max-w-4xl">
          <CaseCtaGlow>
            <p className="mx-auto mb-8 max-w-xl font-brand text-xl font-medium leading-snug tracking-[-0.01em] text-text-primary md:text-2xl">
              {pick({ en: "Have a similar project? Get an estimate or book a call.", ru: "Похожий проект? Получите оценку или запишитесь на звонок.", zh: "有类似项目？获取报价或预约通话。", tr: "Benzer bir projeniz mi var? Teklif alın veya görüşme planlayın.", ar: "لديك مشروع مماثل؟ احصل على تقدير أو احجز مكالمة." }, language)}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/contact" buttonVariant="primary" size="lg">
                {t("cta.primary")}
              </ButtonLink>
              <ButtonLink href="/cases" buttonVariant="secondary" size="lg">
                {pick({ en: "View all cases", ru: "Все кейсы", zh: "查看全部案例", tr: "Tüm vakaları gör", ar: "عرض جميع المشاريع" }, language)}
              </ButtonLink>
            </div>
          </CaseCtaGlow>
        </div>
      </Section>

      {/* Related Cases */}
      {(() => {
        if (related.length === 0) return null;
        return (
          <Section background="primary" padding="lg" className="!pt-0">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 font-brand text-2xl font-semibold tracking-[-0.02em] text-text-primary md:text-3xl">
                {pick({ en: "Related Cases", ru: "Похожие кейсы", zh: "相关案例", tr: "İlgili projeler", ar: "حالات ذات صلة" }, language)}
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
            <CaseNavLink href={`/cases/${prevCase.slug}`} dir="prev" kicker={pick({ en: "Previous", ru: "Предыдущий", zh: "上一个", tr: "Önceki", ar: "السابق" }, language)} title={prevCase.title[language]} />
          ) : (
            <div />
          )}
          {nextCase ? (
            <CaseNavLink href={`/cases/${nextCase.slug}`} dir="next" kicker={pick({ en: "Next", ru: "Следующий", zh: "下一个", tr: "Sonraki", ar: "التالي" }, language)} title={nextCase.title[language]} />
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
