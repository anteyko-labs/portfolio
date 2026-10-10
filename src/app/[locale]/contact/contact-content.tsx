"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Input, Textarea, Select, RadioGroup } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link as NextLink } from "@/i18n/navigation";
import { CalEmbed } from "@/components/ui/cal-embed";
import { CountUp, DrawCheck, EASE } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import {
  ContactHeroScene,
  FormProgress,
  LiveDesk,
  ModeTabs,
  NextStepsFlow,
  SuccessBurst,
} from "@/components/misc-anim/contact-anim";

// ── Instant-contact channels ──────────────────────────────────────────────
// Single source of truth for the direct-contact buttons. The Cal.com booking
// link lives in the CalEmbed component (src/components/ui/cal-embed.tsx).
const CONTACT_EMAIL = "labs@anteyko.com";
const TELEGRAM_URL = "https://t.me/Anteyko_labs";
// WhatsApp number in wa.me/<digits> international format (no "+", no spaces).
// While empty, the WhatsApp button is hidden so we never ship a dead/wrong link.
const WHATSAPP_NUMBER: string = "996551180770";
const WHATSAPP_URL: string = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "";

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
  // Contact mode toggle: the async brief (primary funnel — feeds the 24h
  // estimate + Telegram hot-lead pipeline) vs. booking a call right now.
  const [contactMode, setContactMode] = useState<"form" | "call">("form");
  const reduced = useReducedMotion();
  const en = language === "en";

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
            {language === "en"
              ? "Check your email (including spam) — we\u2019ll confirm receipt within minutes."
              : "Проверьте почту (включая спам) — мы подтвердим получение в течение нескольких минут."}
          </motion.p>
          <motion.div {...reveal(3)} className="mt-8 p-5 rounded-xl border border-accent-primary/20 bg-accent-primary/5">
            <p className="text-body-sm text-text-secondary">
              {language === "en"
                ? "Estimated response: within 24 hours. A real engineer will review your project — no bots, no templates."
                : "Ожидаемый ответ: в течение 24 часов. Живой инженер рассмотрит ваш проект — без ботов, без шаблонов."}
            </p>
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
              {language === "en" ? "View our cases" : "Смотреть кейсы"}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </NextLink>
            <button
              type="button"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-border text-body-sm text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setStatus("idle")}
            >
              {language === "en" ? "Submit another request" : "Отправить ещё заявку"}
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
        eyebrow={language === "en" ? "Contact" : "Контакты"}
        align="left"
        rightSlot={<ContactHeroScene en={en} />}
      />

      <Section background="secondary" padding="lg" className="relative overflow-hidden">
        <div aria-hidden="true" className="ms-orb pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
        <div aria-hidden="true" className="ms-orb pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-fuchsia-300/15 blur-3xl" style={{ animationDelay: "-7s" }} />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div className="min-w-0">
            {/* Mode toggle: async brief (default) vs. book a call now */}
            <ModeTabs
              label={en ? "How to reach us" : "Как связаться"}
              value={contactMode}
              onChange={setContactMode}
              options={[
                { value: "form", label: language === "en" ? "Send a brief" : "Оставить заявку", icon: "brief" },
                { value: "call", label: language === "en" ? "Book a call" : "Забронировать звонок", icon: "call" },
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
              className="ms-rim rounded-3xl border border-border bg-bg-primary p-5 shadow-[0_30px_80px_-40px_rgba(79,70,229,0.35)] sm:p-8"
            >
            {/* Progress bar */}
            <FormProgress step={step} completion={completion} en={en} />

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
                      <h3 className="text-heading-md font-medium text-text-primary">
                        {language === "en" ? "Let\u2019s start with you" : "Начнём с вас"}
                      </h3>
                      <p className="text-body-sm text-text-tertiary mt-1">
                        {language === "en"
                          ? "So we know who to get back to."
                          : "Чтобы мы знали, кому ответить."}
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
                        label={language === "en" ? "Phone (optional)" : "Телефон (необязательно)"}
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                    </div>

                    <Button type="button" variant="primary" size="lg" fullWidth onClick={handleContinue}>
                      {language === "en" ? "Continue" : "Продолжить"}
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

                    <div className="ms-field">
                      <Select
                        label={t("contact.form.projectType")}
                        name="projectType"
                        options={projectTypeOptions(t).map((o) => ({ value: o.value, label: o.label }))}
                        placeholder={language === "en" ? "Select..." : "Выберите..."}
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
                  <h3 className="text-heading-md font-medium text-text-primary">
                    {language === "en"
                      ? "Book a 45-min scoping call"
                      : "Забронируйте scoping-звонок на 45 мин"}
                  </h3>
                  <p className="text-body-sm text-text-tertiary mt-1">
                    {language === "en"
                      ? "Pick a slot that works for you — we’ll talk through your project and next steps."
                      : "Выберите удобный слот — обсудим ваш проект и следующие шаги."}
                  </p>
                </div>
                <CalEmbed />
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6 min-w-0">
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
              <LiveDesk en={en} />
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                {[
                  { v: "40+", l: language === "en" ? "projects" : "проектов" },
                  { v: "5+", l: language === "en" ? "years" : "лет" },
                  { v: "24h", l: language === "en" ? "response" : "ответ" },
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
                  language === "en" ? "Real engineers respond — no bots, no templates" : "Отвечают живые инженеры — без ботов, без шаблонов",
                  language === "en" ? "Clients in Dubai, Moscow, Bishkek" : "Клиенты в Дубае, Москве, Бишкеке",
                  language === "en" ? "NDA available on request" : "NDA по запросу",
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

            {/* Instant contact — reach a real engineer right now */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="rounded-3xl border border-border bg-bg-primary p-6 shadow-[0_20px_60px_-40px_rgba(79,70,229,0.4)]"
            >
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
                  className="ms-msg group inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-accent-primary to-violet-600 text-white text-body-sm font-medium border border-accent-primary/50 shadow-glow-sm hover:bg-accent-secondary hover:shadow-glow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                >
                  <svg className="ms-ico-fly w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Telegram
                  <span aria-hidden="true" className="ms-arrow">↗</span>
                </a>

                {/* WhatsApp — rendered only when a real number is configured */}
                {WHATSAPP_URL && (
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ms-msg group inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bg-elevated text-text-primary text-body-sm font-medium border border-border hover:border-border-hover hover:bg-bg-tertiary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                  >
                    <svg className="ms-ico-ring w-4 h-4 shrink-0 text-success" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                    <span aria-hidden="true" className="ms-arrow">↗</span>
                  </a>
                )}

                {/* Email */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="ms-msg group inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bg-elevated text-text-primary text-body-sm font-medium border border-border hover:border-border-hover hover:bg-bg-tertiary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                >
                  <svg className="ms-ico-mail w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                    <span className="truncate">{CONTACT_EMAIL}</span>
                  <span aria-hidden="true" className="ms-arrow">→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
