"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Input, Textarea, Select, RadioGroup } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";

// ── Instant-contact channels ──────────────────────────────────────────────
// Single source of truth for the direct-contact buttons. When the founder
// shares the real WhatsApp number and the Cal.com booking link, update them
// here only — nothing else needs to change.
const CONTACT_EMAIL = "labs@anteyko.com";
const TELEGRAM_URL = "https://t.me/Anteyko_labs";
// TODO(needs_user): replace with the real WhatsApp number in wa.me/<digits>
// international format (no "+", no spaces). Until then the WhatsApp button is
// hidden so we never ship a dead/wrong link.
const WHATSAPP_NUMBER: string = "";
const WHATSAPP_URL: string = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "";
// TODO(needs_user): drop the Cal.com booking URL here (e.g.
// "https://cal.com/anteyko/20min"). While empty, the "Book a 20-min call"
// CTA falls back to a mailto link so the button always works.
const CALCOM_URL: string = "";
const BOOK_CALL_HREF =
  CALCOM_URL || `mailto:${CONTACT_EMAIL}?subject=Scoping%20Call%20Request`;
const BOOK_CALL_EXTERNAL = Boolean(CALCOM_URL);

const projectTypeOptions = (t: (k: string) => string) => [
  { value: "website", label: t("contact.form.projectTypes.website") },
  { value: "mvp", label: t("contact.form.projectTypes.mvp") },
  { value: "product", label: t("contact.form.projectTypes.product") },
  { value: "web3", label: t("contact.form.projectTypes.web3") },
];

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
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const requiredMessage = language === "en" ? "Required" : "Обязательное поле";

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
      nextErrors.email = language === "en" ? "Invalid email format" : "Неверный формат email";
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
      nextErrors.email = language === "en" ? "Invalid email format" : "Неверный формат email";
    }
    if (!formData.consent) {
      nextErrors.consent = language === "en" ? "Please accept to continue" : "Необходимо принять для продолжения";
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
    return (
      <Section background="primary" padding="xl">
        <div className="max-w-2xl mx-auto text-center" role="status" aria-live="polite" aria-atomic="true">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-display-sm font-display text-text-primary mb-4">
            {t("contact.success.title")}
          </h2>
          <p className="text-body-lg text-text-secondary mb-2">
            {t("contact.success.description")}
          </p>
          <p className="text-body-md text-accent-primary font-medium">
            {language === "en"
              ? "Check your email (including spam) — we\u2019ll confirm receipt within minutes."
              : "Проверьте почту (включая спам) — мы подтвердим получение в течение нескольких минут."}
          </p>
          <div className="mt-8 p-5 rounded-xl border border-accent-primary/20 bg-accent-primary/5">
            <p className="text-body-sm text-text-secondary">
              {language === "en"
                ? "Estimated response: within 24 hours. A real engineer will review your project — no bots, no templates."
                : "Ожидаемый ответ: в течение 24 часов. Живой инженер рассмотрит ваш проект — без ботов, без шаблонов."}
            </p>
          </div>
          <div className="mt-10 text-left rounded-2xl border border-border bg-bg-secondary/80 p-6">
            <p className="text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {t("contact.success.next")}
            </p>
            <Stepper items={translations.contact.nextSteps.items.map((item) => ({
              title: item.title[language],
              description: item.description[language],
            }))} />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/cases"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-white text-body-sm font-medium hover:bg-accent-secondary transition-colors"
            >
              {language === "en" ? "View our cases" : "Смотреть кейсы"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-border text-body-sm text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setStatus("idle")}
            >
              {language === "en" ? "Submit another request" : "Отправить ещё заявку"}
            </button>
          </div>
        </div>
      </Section>
    );
  }

  // ── Step transition animation ──
  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <>
      <PageHero
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        eyebrow={language === "en" ? "Contact" : "Контакты"}
      />

      <Section background="secondary" padding="lg">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-caption text-text-tertiary mb-2">
                <span>
                  {language === "en"
                    ? `Step ${step} of 2`
                    : `Шаг ${step} из 2`}
                </span>
                <span className="tabular-nums">{completion}%</span>
              </div>
              <div className="h-2 rounded-full bg-bg-tertiary overflow-hidden">
                <div
                  role="progressbar"
                  aria-valuenow={completion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-full bg-accent-primary transition-all duration-300 ease-out progress-shimmer"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            <form id="form" onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={formData.website} onChange={(e) => updateField("website", e.target.value)} />
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-6">
                    {/* Step 1 header */}
                    <div className="pb-2">
                      <h3 className="text-heading-md font-medium text-text-primary">
                        {language === "en" ? "Let\u2019s start with you" : "Начнём с вас"}
                      </h3>
                      <p className="text-body-sm text-text-tertiary mt-1">
                        {language === "en"
                          ? "So we know who to get back to."
                          : "Чтобы мы знали, кому ответить."}
                      </p>
                    </div>

                    <Input
                      label={t("contact.form.name")}
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      error={errors.name}
                    />

                    <Input
                      label={t("contact.form.email")}
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      error={errors.email}
                    />

                    <Input
                      label={language === "en" ? "Phone (optional)" : "Телефон (необязательно)"}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />

                    <Button type="button" variant="primary" size="lg" fullWidth onClick={handleContinue}>
                      {language === "en" ? "Continue" : "Продолжить"}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="space-y-6">
                    {/* Step 2 header */}
                    <div className="flex items-center justify-between pb-2">
                      <div>
                        <h3 className="text-heading-md font-medium text-text-primary">
                          {language === "en" ? "About the project" : "О проекте"}
                        </h3>
                        <p className="text-body-sm text-text-tertiary mt-1">
                          {language === "en"
                            ? "Help us understand the scope."
                            : "Помогите нам понять масштаб."}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-body-sm text-accent-primary hover:text-accent-secondary transition-colors"
                      >
                        {language === "en" ? "Back" : "Назад"}
                      </button>
                    </div>

                    <Select
                      label={t("contact.form.projectType")}
                      name="projectType"
                      options={projectTypeOptions(t).map((o) => ({ value: o.value, label: o.label }))}
                      placeholder={language === "en" ? "Select..." : "Выберите..."}
                      value={formData.projectType}
                      onChange={(e) => updateField("projectType", e.target.value)}
                      error={errors.projectType}
                    />

                    <fieldset>
                      <legend className="block text-body-sm font-medium text-text-secondary mb-3">
                        {t("contact.form.stage")}
                      </legend>
                      <RadioGroup name="stage" options={stageOptions(t)} value={formData.stage} onChange={(value) => updateField("stage", value)} columns={2} error={errors.stage} />
                    </fieldset>

                    <fieldset>
                      <legend className="block text-body-sm font-medium text-text-secondary mb-3">
                        {t("contact.form.timeline")}
                      </legend>
                      <RadioGroup name="timeline" options={timelineOptions(t)} value={formData.timeline} onChange={(value) => updateField("timeline", value)} columns={3} error={errors.timeline} />
                    </fieldset>

                    <fieldset>
                      <legend className="block text-body-sm font-medium text-text-secondary mb-3">
                        {t("contact.form.budget")}
                      </legend>
                      <RadioGroup name="budget" options={budgetOptions(t)} value={formData.budget} onChange={(value) => updateField("budget", value)} columns={2} error={errors.budget} />
                    </fieldset>

                    <Textarea
                      label={`${t("contact.form.message")} (${language === "en" ? "optional" : "необязательно"})`}
                      name="message"
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder={
                        language === "en"
                          ? "e.g., E-commerce platform for fashion brand with payment integration..."
                          : "Напр., E-commerce платформа для бренда одежды с интеграцией оплаты..."
                      }
                      error={errors.message}
                    />

                    {/* Consent checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={!!formData.consent}
                        onChange={(e) => updateField("consent", e.target.checked ? "yes" : "")}
                        className="mt-1 w-4 h-4 rounded border-border accent-accent-primary"
                      />
                      <span className={`text-body-sm ${errors.consent ? "text-error" : "text-text-tertiary"} group-hover:text-text-secondary transition-colors`}>
                        {language === "en"
                          ? "I agree to be contacted about my project. No spam, ever."
                          : "Я согласен на связь по моему проекту. Без спама, никогда."}
                      </span>
                    </label>

                    {status === "error" && (
                      <div className="p-4 rounded-xl border border-error/30 bg-error/5">
                        <p className="text-body-sm text-error">
                          {language === "en"
                            ? "Something went wrong. Please try again or email us at labs@anteyko.com"
                            : "Что-то пошло не так. Попробуйте снова или напишите нам на labs@anteyko.com"}
                        </p>
                      </div>
                    )}

                    {/* Value reminder */}
                    <div className="flex items-center gap-2 text-caption text-text-tertiary">
                      <svg className="w-4 h-4 text-accent-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>
                        {language === "en"
                          ? "You\u2019ll receive: detailed estimate, timeline, and next steps within 24h."
                          : "Вы получите: детальную оценку, сроки и следующие шаги в течение 24ч."}
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
                        : language === "en"
                          ? "Get my 24h estimate"
                          : "Получить оценку за 24 часа"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Book a call — always visible */}
            <div className="mt-8 p-4 rounded-xl bg-bg-tertiary/60 border border-border">
              <p className="text-body-sm text-text-secondary text-center mb-3">
                {language === "en"
                  ? "Prefer a call? Book a 20-minute scoping call."
                  : "Удобнее созвон? Забронируйте 20-минутный scoping call."}
              </p>
              <div className="flex justify-center">
                <a
                  href={BOOK_CALL_HREF}
                  {...(BOOK_CALL_EXTERNAL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary border border-border text-body-sm text-accent-primary font-medium hover:border-accent-primary/30 hover:text-accent-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t("cta.secondary")}
                </a>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Social proof */}
            <div className="rounded-2xl border border-accent-primary/20 bg-accent-primary/5 p-6">
              <div className="grid grid-cols-3 gap-4 text-center mb-5">
                <div>
                  <p className="text-heading-lg font-bold text-accent-primary">40+</p>
                  <p className="text-caption text-text-tertiary">{language === "en" ? "projects" : "проектов"}</p>
                </div>
                <div>
                  <p className="text-heading-lg font-bold text-accent-primary">5+</p>
                  <p className="text-caption text-text-tertiary">{language === "en" ? "years" : "лет"}</p>
                </div>
                <div>
                  <p className="text-heading-lg font-bold text-accent-primary">24h</p>
                  <p className="text-caption text-text-tertiary">{language === "en" ? "response" : "ответ"}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  language === "en" ? "Real engineers respond — no bots, no templates" : "Отвечают живые инженеры — без ботов, без шаблонов",
                  language === "en" ? "Clients in Dubai, Moscow, Bishkek" : "Клиенты в Дубае, Москве, Бишкеке",
                  language === "en" ? "NDA available on request" : "NDA по запросу",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-body-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What happens next */}
            <div className="rounded-2xl border border-border bg-bg-tertiary/60 p-6">
              <p className="text-caption uppercase tracking-wider text-text-tertiary mb-4">
                {translations.contact.nextSteps.title[language]}
              </p>
              <Stepper
                items={translations.contact.nextSteps.items.map((item) => ({
                  title: item.title[language],
                  description: item.description[language],
                }))}
              />
            </div>

            {/* Instant contact — reach a real engineer right now */}
            <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
              <p className="text-caption uppercase tracking-wider text-text-tertiary mb-1">
                {language === "en" ? "Prefer to message us now?" : "Хотите написать прямо сейчас?"}
              </p>
              <p className="text-body-sm text-text-tertiary mb-4">
                {language === "en"
                  ? "A real engineer replies — usually within hours."
                  : "Отвечает живой инженер — обычно в течение нескольких часов."}
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {/* Telegram */}
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent-primary text-white text-body-sm font-medium border border-accent-primary/50 shadow-glow-sm hover:bg-accent-secondary hover:shadow-glow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Telegram
                </a>

                {/* WhatsApp — rendered only when a real number is configured */}
                {WHATSAPP_URL && (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bg-elevated text-text-primary text-body-sm font-medium border border-border hover:border-border-hover hover:bg-bg-tertiary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                  >
                    <svg className="w-4 h-4 shrink-0 text-success" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                )}

                {/* Email */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bg-elevated text-text-primary text-body-sm font-medium border border-border hover:border-border-hover hover:bg-bg-tertiary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
