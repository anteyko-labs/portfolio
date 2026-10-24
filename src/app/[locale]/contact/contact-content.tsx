"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick, type Language } from "@/lib/i18n-text";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Input, Textarea, Select, RadioGroup } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link as NextLink } from "@/i18n/navigation";
import { CalEmbed } from "@/components/ui/cal-embed";
import { CountUp, DrawCheck, EASE } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import {
  FormProgress,
  LiveDesk,
  ModeTabs,
  NextStepsFlow,
  SuccessBurst,
  LiveBrief,
  SendFlight,
  ReplyCountdown,
  ChannelLinks,
} from "@/components/misc-anim/contact-anim";
import { INTL_LOCALE } from "@/lib/i18n-text";

// ── Instant-contact channels ──────────────────────────────────────────────
// Single source of truth for the direct-contact buttons. The Cal.com booking
// link lives in the CalEmbed component (src/components/ui/cal-embed.tsx).
const CONTACT_EMAIL = "labs@anteyko.com";
const TELEGRAM_URL = "https://t.me/Anteyko_labs";
// WhatsApp number in wa.me/<digits> international format (no "+", no spaces).
// While empty, the WhatsApp button is hidden so we never ship a dead/wrong link.
const WHATSAPP_NUMBER: string = "996551180770";
const WHATSAPP_URL: string = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "";
// "996551180770" → "+996 551 180 770"
const formatPhone = (n: string) => (n ? `+${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 9)} ${n.slice(9)}` : "");

const projectTypeOptions = (t: (k: string) => string) => [
  { value: "website", label: t("contact.form.projectTypes.website") },
  { value: "mvp", label: t("contact.form.projectTypes.mvp") },
  { value: "product", label: t("contact.form.projectTypes.product") },
  { value: "web3", label: t("contact.form.projectTypes.web3") },
  { value: "mobile", label: t("contact.form.projectTypes.mobile") },
  { value: "branding", label: t("contact.form.projectTypes.branding") },
  { value: "fintech", label: t("contact.form.projectTypes.fintech") },
  { value: "access", label: t("contact.form.projectTypes.access") },
  { value: "ai", label: t("contact.form.projectTypes.ai") },
  { value: "telegram", label: t("contact.form.projectTypes.telegram") },
  { value: "parking", label: t("contact.form.projectTypes.parking") },
  { value: "cctv", label: t("contact.form.projectTypes.cctv") },
  { value: "av", label: t("contact.form.projectTypes.av") },
  { value: "carbon", label: t("contact.form.projectTypes.carbon") },
  { value: "support", label: t("contact.form.projectTypes.support") },
];

// /contact?package=<service id> (from Pricing and service pages) preselects the project type
const PACKAGE_TO_TYPE: Record<string, string> = {
  "launch-site": "website",
  "mvp-sprint": "mvp",
  "startup-key": "product",
  "web3-addon": "web3",
  "mobile-app": "mobile",
  branding: "branding",
  fintech: "fintech",
  "time-access": "access",
  "ai-bots": "ai",
  "telegram-bots": "telegram",
  parking: "parking",
  cctv: "cctv",
  "conference-av": "av",
  "carbon-credits": "carbon",
  "it-support": "support",
};

const stageOptions = (t: (k: string) => string) => [
  { value: "idea", label: t("contact.form.stages.idea") },
  { value: "design", label: t("contact.form.stages.design") },
  { value: "mvp", label: t("contact.form.stages.mvp") },
  { value: "launch", label: t("contact.form.stages.launch") },
];

const timelineOptions = (t: (k: string) => string) => [
  { value: "urgent", label: t("contact.form.timelines.urgent") },
  { value: "normal", label: t("contact.form.timelines.normal") },
  { value: "relaxed", label: t("contact.form.timelines.relaxed") },
];

const budgetOptions = (t: (k: string) => string) => [
  { value: "micro", label: t("contact.form.budgets.micro") },
  { value: "small", label: t("contact.form.budgets.small") },
  { value: "medium", label: t("contact.form.budgets.medium") },
  { value: "large", label: t("contact.form.budgets.large") },
  { value: "enterprise", label: t("contact.form.budgets.enterprise") },
  { value: "custom", label: t("contact.form.budgets.custom") },
  { value: "unsure", label: t("contact.form.budgets.unsure") },
];

const labelOf = (opts: { value: string; label: string }[], v: string) => opts.find((o) => o.value === v)?.label ?? "";

const STORAGE_KEY = "anteyko-contact-form";

type FormField = "projectType" | "stage" | "timeline" | "budget" | "name" | "email" | "phone" | "message" | "website" | "consent";
const STEP1_FIELDS: readonly FormField[] = ["name", "email"];
const STEP2_FIELDS: readonly FormField[] = ["projectType", "stage", "timeline", "budget"];
const ALL_REQUIRED: readonly FormField[] = ["name", "email", "projectType", "stage", "timeline", "budget", "consent"];

const initialFormState = {
  projectType: "",
  stage: "",
  timeline: "",
  budget: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "", // honeypot
  consent: "",
};

export function ContactContent() {
  const { t, translations, language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sentAt, setSentAt] = useState(0);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  // Contact mode toggle: the async brief (primary funnel — feeds the 24h
  // estimate + Telegram hot-lead pipeline) vs. booking a call right now.
  const [contactMode, setContactMode] = useState<"form" | "call">("form");
  const reduced = useReducedMotion();

  const requiredMessage = pick({ en: "Required", ru: "Обязательное поле", zh: "必填", tr: "Zorunlu alan", ar: "حقل مطلوب" }, language);

  const completion = useMemo(() => {
    const filled = ALL_REQUIRED.filter((field) => formData[field]).length;
    return Math.round((filled / ALL_REQUIRED.length) * 100);
  }, [formData]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as typeof formData;
          setFormData((prev) => ({ ...prev, ...parsed }));
          // If step 1 fields are filled, go to step 2
          if (parsed.name && parsed.email) setStep(2);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch { /* localStorage unavailable */ }
    const fromPackage = PACKAGE_TO_TYPE[new URLSearchParams(window.location.search).get("package") ?? ""];
    if (fromPackage) setFormData((prev) => ({ ...prev, projectType: fromPackage }));
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); } catch { /* quota / private */ }
  }, [formData]);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name) nextErrors.name = requiredMessage;
    if (!formData.email) nextErrors.email = requiredMessage;
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = pick({ en: "Invalid email format", ru: "Неверный формат email", zh: "邮箱格式无效", tr: "Geçersiz e-posta biçimi", ar: "صيغة البريد الإلكتروني غير صحيحة" }, language);
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleContinue = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    ALL_REQUIRED.forEach((field) => {
      if (!formData[field]) nextErrors[field] = requiredMessage;
    });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = pick({ en: "Invalid email format", ru: "Неверный формат email", zh: "邮箱格式无效", tr: "Geçersiz e-posta biçimi", ar: "صيغة البريد الإلكتروني غير صحيحة" }, language);
    }
    if (!formData.consent) {
      nextErrors.consent = pick({ en: "Please accept to continue", ru: "Необходимо принять для продолжения", zh: "请勾选同意后继续", tr: "Devam etmek için lütfen onaylayın", ar: "يرجى الموافقة للمتابعة" }, language);
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // If step 1 fields have errors, go back to step 1
      if (nextErrors.name || nextErrors.email) setStep(1);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15_000);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          projectType: formData.projectType,
          stage: formData.stage,
          timeline: formData.timeline,
          budget: formData.budget,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          website: formData.website,
        }),
      });
      clearTimeout(timeoutId);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }
      setSentAt(Date.now());
      setStatus("success");
      setFormData(initialFormState);
      setStep(1);
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    } catch {
      setStatus("error");
    }
  };

  // ── Success state ──
  if (status === "success") {
    const reveal = (i: number) => ({
      initial: reduced ? false : { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.45 + i * 0.1, ease: EASE },
    });
    return (
      <Section background="primary" padding="xl" className="relative overflow-hidden">
        <div aria-hidden="true" className="ms-orb pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[620px] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-300/25 via-indigo-300/20 to-fuchsia-300/20 blur-3xl" />
        <div className="relative max-w-2xl mx-auto text-center" role="status" aria-live="polite" aria-atomic="true">
          <SuccessBurst />
          <motion.h2 {...reveal(0)} className="text-display-sm font-display text-text-primary mb-4">
            {t("contact.success.title")}
          </motion.h2>
          <motion.p {...reveal(1)} className="text-body-lg text-text-secondary mb-2">
            {t("contact.success.description")}
          </motion.p>
          <motion.p {...reveal(2)} className="text-body-md text-accent-primary font-medium">
            {pick({ en: "Check your email (including spam) — we\u2019ll confirm receipt within minutes.", ru: "Проверьте почту (включая спам) — мы подтвердим получение в течение нескольких минут.", zh: "请查收邮件（包括垃圾邮件箱）——我们会在几分钟内确认收到。", tr: "E-postanızı (spam klasörü dahil) kontrol edin — alındığını birkaç dakika içinde onaylayacağız.", ar: "تحقّق من بريدك الإلكتروني (بما في ذلك البريد غير الهام) — سنؤكد الاستلام خلال دقائق." }, language)}
          </motion.p>
          <motion.div {...reveal(3)} className="mt-8">
            <ReplyCountdown
              sentAt={sentAt || Date.now()}
              locale={INTL_LOCALE[language]}
              labels={{
                until: pick({ en: "Estimate by", ru: "Оценка до", zh: "报价截止", tr: "Teklif şu tarihe kadar:", ar: "التقدير قبل" }, language),
                stages: [
                  pick({ en: "Request received", ru: "Заявка получена", zh: "已收到需求", tr: "Talep alındı", ar: "تم استلام الطلب" }, language),
                  pick({ en: "Engineer reviewing", ru: "Инженер изучает", zh: "工程师评估中", tr: "Mühendis inceliyor", ar: "المهندس يراجع" }, language),
                  pick({ en: "Estimate sent", ru: "Оценка отправлена", zh: "报价已发送", tr: "Teklif gönderildi", ar: "تم إرسال التقدير" }, language),
                ],
              }}
            />
          </motion.div>
          <motion.div {...reveal(4)} className="mt-10 text-left rounded-2xl border border-border bg-bg-secondary/80 p-6">
            <p className="text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {t("contact.success.next")}
            </p>
            <NextStepsFlow items={translations.contact.nextSteps.items.map((item) => ({
              title: item.title[language],
              description: item.description[language],
            }))} />
          </motion.div>
          <motion.div {...reveal(5)} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <NextLink
              href="/cases"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-white text-body-sm font-medium hover:bg-accent-secondary transition-colors"
            >
              {pick({ en: "View our cases", ru: "Смотреть кейсы", zh: "查看我们的案例", tr: "Projelerimizi görün", ar: "اطّلع على حالاتنا" }, language)}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </NextLink>
            <button
              type="button"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-border text-body-sm text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setStatus("idle")}
            >
              {pick({ en: "Submit another request", ru: "Отправить ещё заявку", zh: "再提交一份需求", tr: "Yeni bir talep gönder", ar: "إرسال طلب آخر" }, language)}
            </button>
          </motion.div>
        </div>
      </Section>
    );
  }

  // ── Step transition animation ──
  // Forward (1 → 2) slides in from the right, going back slides in from the left.
  const stepVariants = {
    enter: (dir: number) => (reduced ? { opacity: 0 } : { opacity: 0, x: 48 * dir, filter: "blur(6px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) => (reduced ? { opacity: 0 } : { opacity: 0, x: -48 * dir, filter: "blur(6px)" }),
  };
  const stepDir = step === 2 ? 1 : -1;
  const stepTransition = { duration: reduced ? 0.15 : 0.38, ease: EASE };

  return (
    <>
      <PageHero
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        eyebrow={pick({ en: "Contact", ru: "Контакты", zh: "联系我们", tr: "İletişim", ar: "تواصل معنا" }, language)}
        align="left"
        rightSlot={<ChannelLinks telegram={TELEGRAM_URL} whatsapp={WHATSAPP_URL} email={CONTACT_EMAIL} phone={formatPhone(WHATSAPP_NUMBER)} />}
      />

      <Section background="secondary" padding="lg" className="relative overflow-hidden">
        <div aria-hidden="true" className="ms-orb pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
        <div aria-hidden="true" className="ms-orb pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-fuchsia-300/15 blur-3xl" style={{ animationDelay: "-7s" }} />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div className="min-w-0">
            {/* Mode toggle: async brief (default) vs. book a call now */}
            <ModeTabs
              label={pick({ en: "How to reach us", ru: "Как связаться", zh: "联系方式", tr: "Bize nasıl ulaşırsınız", ar: "كيف تصل إلينا" }, language)}
              value={contactMode}
              onChange={setContactMode}
              options={[
                { value: "form", label: pick({ en: "Send a brief", ru: "Оставить заявку", zh: "提交需求简述", tr: "Brief gönderin", ar: "أرسل ملخص المشروع" }, language), icon: "brief" },
                { value: "call", label: pick({ en: "Book a call", ru: "Забронировать звонок", zh: "预约通话", tr: "Görüşme planlayın", ar: "احجز مكالمة" }, language), icon: "call" },
              ]}
            />

            <AnimatePresence mode="wait" initial={false}>
            {contactMode === "form" ? (
            <motion.div
              key="mode-form"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="ms-rim relative rounded-3xl border border-border bg-bg-primary p-5 shadow-[0_30px_80px_-40px_rgba(79,70,229,0.35)] sm:p-8"
            >
            <AnimatePresence>
              {status === "sending" && (
                <SendFlight label={pick({ en: "Sending your brief…", ru: "Отправляем заявку…", zh: "正在发送您的需求…", tr: "Brief gönderiliyor…", ar: "جارٍ إرسال طلبك…" }, language)} />
              )}
            </AnimatePresence>
            {/* Progress bar */}
            <FormProgress step={step} completion={completion} />

            <form id="form" onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={formData.website} onChange={(e) => updateField("website", e.target.value)} />
              </div>

              <AnimatePresence mode="wait" custom={stepDir} initial={false}>
                {step === 1 ? (
                  <motion.div key="step1" custom={stepDir} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={stepTransition} className="ms-rise space-y-6">
                    {/* Step 1 header */}
                    <div className="pb-2">
                      <h2 className="text-heading-md font-medium text-text-primary">
                        {pick({ en: "Let\u2019s start with you", ru: "Начнём с вас", zh: "先从您开始", tr: "Önce sizinle başlayalım", ar: "لنبدأ بك" }, language)}
                      </h2>
                      <p className="text-body-sm text-text-tertiary mt-1">
                        {pick({ en: "So we know who to get back to.", ru: "Чтобы мы знали, кому ответить.", zh: "方便我们知道该联系谁。", tr: "Size kime dönmemiz gerektiğini bilelim.", ar: "لنعرف من نردّ عليه." }, language)}
                      </p>
                    </div>

                    <div className="ms-field">
                      <Input
                        label={t("contact.form.name")}
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        error={errors.name}
                      />
                    </div>

                    <div className="ms-field">
                      <Input
                        label={t("contact.form.email")}
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        error={errors.email}
                      />
                    </div>

                    <div className="ms-field">
                      <Input
                        label={pick({ en: "Phone (optional)", ru: "Телефон (необязательно)", zh: "电话（选填）", tr: "Telefon (isteğe bağlı)", ar: "الهاتف (اختياري)" }, language)}
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                    </div>

                    <Button type="button" variant="primary" size="lg" fullWidth onClick={handleContinue}>
                      {pick({ en: "Continue", ru: "Продолжить", zh: "继续", tr: "Devam", ar: "متابعة" }, language)}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="step2" custom={stepDir} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={stepTransition} className="ms-rise space-y-6">
                    {/* Step 2 header */}
                    <div className="flex items-center justify-between pb-2">
                      <div>
                        <h2 className="text-heading-md font-medium text-text-primary">
                          {pick({ en: "About the project", ru: "О проекте", zh: "项目信息", tr: "Proje hakkında", ar: "عن المشروع" }, language)}
                        </h2>
                        <p className="text-body-sm text-text-tertiary mt-1">
                          {pick({ en: "Help us understand the scope.", ru: "Помогите нам понять масштаб.", zh: "帮助我们了解项目规模。", tr: "Kapsamı anlamamıza yardımcı olun.", ar: "ساعدنا في فهم نطاق المشروع." }, language)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-body-sm text-accent-primary hover:text-accent-secondary transition-colors"
                      >
                        {pick({ en: "Back", ru: "Назад", zh: "返回", tr: "Geri", ar: "رجوع" }, language)}
                      </button>
                    </div>

                    <div className="ms-field">
                      <Select
                        label={t("contact.form.projectType")}
                        name="projectType"
                        options={projectTypeOptions(t).map((o) => ({ value: o.value, label: o.label }))}
                        placeholder={pick({ en: "Select...", ru: "Выберите...", zh: "请选择...", tr: "Seçin...", ar: "اختر..." }, language)}
                        value={formData.projectType}
                        onChange={(e) => updateField("projectType", e.target.value)}
                        error={errors.projectType}
                      />
                    </div>

                    <fieldset className="ms-field">
                      <legend className="block text-body-sm font-medium text-text-secondary mb-3">
                        {t("contact.form.stage")}
                      </legend>
                      <RadioGroup name="stage" options={stageOptions(t)} value={formData.stage} onChange={(value) => updateField("stage", value)} columns={2} error={errors.stage} />
                    </fieldset>

                    <fieldset className="ms-field">
                      <legend className="block text-body-sm font-medium text-text-secondary mb-3">
                        {t("contact.form.timeline")}
                      </legend>
                      <RadioGroup name="timeline" options={timelineOptions(t)} value={formData.timeline} onChange={(value) => updateField("timeline", value)} columns={3} error={errors.timeline} />
                    </fieldset>

                    <fieldset className="ms-field">
                      <legend className="block text-body-sm font-medium text-text-secondary mb-3">
                        {t("contact.form.budget")}
                      </legend>
                      <RadioGroup name="budget" options={budgetOptions(t)} value={formData.budget} onChange={(value) => updateField("budget", value)} columns={2} error={errors.budget} />
                    </fieldset>

                    <div className="ms-field">
                      <Textarea
                        label={`${t("contact.form.message")} (${pick({ en: "optional", ru: "необязательно", zh: "选填", tr: "isteğe bağlı", ar: "اختياري" }, language)})`}
                        name="message"
                        value={formData.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        placeholder={
                          pick({ en: "e.g., E-commerce platform for fashion brand with payment integration...", ru: "Напр., E-commerce платформа для бренда одежды с интеграцией оплаты...", zh: "例如：为时尚品牌打造的电商平台，含支付集成...", tr: "Örn., ödeme entegrasyonlu moda markası için e-ticaret platformu...", ar: "مثال: منصة تجارة إلكترونية لعلامة أزياء مع تكامل الدفع..." }, language)
                        }
                        error={errors.message}
                      />
                    </div>

                    {/* Consent checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={!!formData.consent}
                        onChange={(e) => updateField("consent", e.target.checked ? "yes" : "")}
                        className="mt-1 w-4 h-4 rounded border-border accent-accent-primary"
                      />
                      <span className={`text-body-sm ${errors.consent ? "text-error" : "text-text-tertiary"} group-hover:text-text-secondary transition-colors`}>
                        {pick({ en: "I agree to be contacted about my project. No spam, ever.", ru: "Я согласен на связь по моему проекту. Без спама, никогда.", zh: "我同意就我的项目与我联系。绝无垃圾信息。", tr: "Projemle ilgili benimle iletişime geçilmesini kabul ediyorum. Asla spam yok.", ar: "أوافق على التواصل معي بشأن مشروعي. دون رسائل مزعجة، أبدًا." }, language)}
                      </span>
                    </label>

                    {status === "error" && (
                      <div className="p-4 rounded-xl border border-error/30 bg-error/5">
                        <p className="text-body-sm text-error">
                          {pick({ en: "Something went wrong. Please try again or email us at labs@anteyko.com", ru: "Что-то пошло не так. Попробуйте снова или напишите нам на labs@anteyko.com", zh: "出了点问题。请重试，或发送邮件至 labs@anteyko.com", tr: "Bir şeyler ters gitti. Lütfen tekrar deneyin veya bize labs@anteyko.com adresinden yazın", ar: "حدث خطأ ما. يرجى المحاولة مجددًا أو مراسلتنا على labs@anteyko.com" }, language)}
                        </p>
                      </div>
                    )}

                    {/* Value reminder */}
                    <div className="flex items-center gap-2 text-caption text-text-tertiary">
                      <svg className="w-4 h-4 text-accent-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>
                        {pick({ en: "You\u2019ll receive: detailed estimate, timeline, and next steps within 24h.", ru: "Вы получите: детальную оценку, сроки и следующие шаги в течение 24ч.", zh: "您将收到：详细报价、时间表和后续步骤，24 小时内送达。", tr: "Alacaklarınız: ayrıntılı teklif, takvim ve sonraki adımlar — 24 saat içinde.", ar: "ستتلقى: تقديرًا مفصّلًا، والجدول الزمني، والخطوات التالية خلال 24 ساعة." }, language)}
                      </span>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={status === "sending"}
                      disabled={status === "sending"}
                    >
                      {status === "sending"
                        ? t("contact.form.submitting")
                        : pick({ en: "Get my 24h estimate", ru: "Получить оценку за 24 часа", zh: "获取我的 24 小时报价", tr: "24 saatlik teklifimi al", ar: "احصل على تقديري خلال 24 ساعة" }, language)}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
            </motion.div>
            ) : (
              /* Book-a-call panel — the Cal.com inline embed */
              <motion.div
                key="mode-call"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="ms-rim rounded-3xl border border-border bg-bg-primary p-5 shadow-[0_30px_80px_-40px_rgba(79,70,229,0.35)] sm:p-8"
              >
                <div className="pb-4">
                  <h2 className="text-heading-md font-medium text-text-primary">
                    {pick({ en: "Book a 45-min scoping call", ru: "Забронируйте scoping-звонок на 45 мин", zh: "预约 45 分钟需求沟通会", tr: "45 dakikalık kapsam görüşmesi planlayın", ar: "احجز مكالمة لتحديد النطاق مدتها 45 دقيقة" }, language)}
                  </h2>
                  <p className="text-body-sm text-text-tertiary mt-1">
                    {pick({ en: "Pick a slot that works for you — we’ll talk through your project and next steps.", ru: "Выберите удобный слот — обсудим ваш проект и следующие шаги.", zh: "选择适合您的时间段——我们将聊聊您的项目和后续步骤。", tr: "Size uygun bir saat seçin — projenizi ve sonraki adımları birlikte konuşalım.", ar: "اختر الموعد المناسب لك — سنناقش مشروعك والخطوات التالية." }, language)}
                  </p>
                </div>
                <CalEmbed />
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6 min-w-0">
            {contactMode === "form" && (
              <LiveBrief
                title={pick({ en: "Your brief", ru: "Ваша заявка", zh: "您的需求", tr: "Brief'iniz", ar: "طلبك" }, language)}
                draftLabel={pick({ en: "Filling in…", ru: "Заполняется…", zh: "填写中…", tr: "Dolduruluyor…", ar: "قيد التعبئة…" }, language)}
                readyLabel={pick({ en: "Ready to send", ru: "Готова к отправке", zh: "可以发送", tr: "Göndermeye hazır", ar: "جاهز للإرسال" }, language)}
                completion={completion}
                rows={[
                  { key: "name", label: t("contact.form.name"), value: formData.name },
                  { key: "email", label: "Email", value: formData.email },
                  { key: "projectType", label: t("contact.form.projectType"), value: labelOf(projectTypeOptions(t), formData.projectType) },
                  { key: "stage", label: t("contact.form.stage"), value: labelOf(stageOptions(t), formData.stage) },
                  { key: "timeline", label: t("contact.form.timeline"), value: labelOf(timelineOptions(t), formData.timeline) },
                  { key: "budget", label: t("contact.form.budget"), value: labelOf(budgetOptions(t), formData.budget) },
                ]}
              />
            )}
            {/* Social proof */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B14] p-6 text-white shadow-[0_30px_70px_-35px_rgba(15,15,40,0.8)]"
            >
              <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-70" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
                style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
              />
              <LiveDesk />
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                {[
                  { v: "70+", l: pick({ en: "projects", ru: "проектов", zh: "个项目", tr: "proje", ar: "مشروع" }, language) },
                  { v: "7+", l: pick({ en: "years", ru: "лет", zh: "年", tr: "yıl", ar: "سنوات" }, language) },
                  { v: "24h", l: pick({ en: "response", ru: "ответ", zh: "响应", tr: "yanıt", ar: "الرد" }, language) },
                ].map((stat, i) => (
                  <div key={stat.v} className={i > 0 ? "border-l border-white/10" : ""}>
                    <p className="font-brand text-3xl font-semibold tabular-nums home-gradient-text">
                      <CountUp value={stat.v} />
                    </p>
                    <p className="mt-1 text-caption text-white/55">{stat.l}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                {[
                  pick({ en: "Real engineers respond — no bots, no templates", ru: "Отвечают живые инженеры — без ботов, без шаблонов", zh: "由真人工程师回复——没有机器人，没有模板", tr: "Gerçek mühendisler yanıtlar — bot yok, şablon yok", ar: "يردّ عليك مهندسون حقيقيون — دون روبوتات ودون قوالب جاهزة" }, language),
                  pick({ en: "Clients in Dubai, Moscow, Bishkek", ru: "Клиенты в Дубае, Москве, Бишкеке", zh: "客户遍布迪拜、莫斯科、比什凯克", tr: "Dubai, Moskova, Bişkek'te müşteriler", ar: "عملاء في دبي وموسكو وبيشكيك" }, language),
                  pick({ en: "NDA available on request", ru: "NDA по запросу", zh: "可按需签署 NDA", tr: "İstek üzerine NDA", ar: "اتفاقية NDA متاحة عند الطلب" }, language),
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2.5"
                    initial={reduced ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: EASE }}
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <DrawCheck delay={0.4 + i * 0.12} className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-body-sm text-white/75">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What happens next */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="rounded-3xl border border-border bg-bg-primary p-6 shadow-[0_20px_60px_-40px_rgba(79,70,229,0.4)]"
            >
              <p className="text-caption uppercase tracking-wider text-text-tertiary mb-5">
                {translations.contact.nextSteps.title[language]}
              </p>
              <NextStepsFlow
                items={translations.contact.nextSteps.items.map((item) => ({
                  title: item.title[language],
                  description: item.description[language],
                }))}
              />
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
