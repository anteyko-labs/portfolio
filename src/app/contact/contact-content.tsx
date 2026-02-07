"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Input, Textarea, Select, RadioGroup } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";

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
  { value: "small", label: t("contact.form.budgets.small") },
  { value: "medium", label: t("contact.form.budgets.medium") },
  { value: "large", label: t("contact.form.budgets.large") },
  { value: "enterprise", label: t("contact.form.budgets.enterprise") },
];

const STORAGE_KEY = "anteyko-contact-form";

// Form field types
type FormField = "projectType" | "stage" | "timeline" | "budget" | "name" | "email" | "message" | "website";
const REQUIRED_FIELDS: readonly FormField[] = ["projectType", "stage", "timeline", "budget", "name", "email", "message"];

const initialFormState = {
  projectType: "",
  stage: "",
  timeline: "",
  budget: "",
  name: "",
  email: "",
  message: "",
  website: "", // honeypot
};

export function ContactContent() {
  const { t, translations, language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const requiredMessage = language === "en" ? "Required" : "Обязательное поле";
  const completion = useMemo(() => {
    const filled = REQUIRED_FIELDS.filter((field) => formData[field]).length;
    return Math.round((filled / REQUIRED_FIELDS.length) * 100);
  }, [formData]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as typeof formData;
          setFormData((prev) => ({ ...prev, ...parsed }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    REQUIRED_FIELDS.forEach((field) => {
      if (!formData[field]) nextErrors[field] = requiredMessage;
    });
    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = language === "en" ? "Invalid email format" : "Неверный формат email";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
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
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Section background="primary" padding="xl">
        <div className="max-w-2xl mx-auto text-center" role="status" aria-live="polite" aria-atomic="true">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-success"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-display-sm font-display text-text-primary mb-4">
            {t("contact.success.title")}
          </h2>
          <p className="text-body-lg text-text-secondary">
            {t("contact.success.description")}
          </p>
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
            <button
              type="button"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-accent-primary text-white text-body-sm font-medium hover:bg-accent-secondary transition-colors"
              onClick={() => setStatus("idle")}
            >
              {language === "en" ? "Submit another request" : "Отправить ещё заявку"}
            </button>
            <a
              href="mailto:hello@anteyko.com?subject=Scoping%20Call%20Request"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border text-body-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {t("cta.secondary")}
              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </Section>
    );
  }

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
            <div className="mb-6">
              <div className="flex items-center justify-between text-caption text-text-tertiary mb-2">
                <span>{t("contact.progressLabel")}</span>
                <span className="tabular-nums">{completion}%</span>
              </div>
                <div className="h-2 rounded-full bg-bg-tertiary overflow-hidden">
                <div
                  role="progressbar"
                  aria-valuenow={completion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300 ease-out"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            <form id="form" onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot - hidden from users */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={formData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                />
              </div>

              <Select
                label={t("contact.form.projectType")}
                name="projectType"
                options={projectTypeOptions(t).map((o) => ({
                  value: o.value,
                  label: o.label,
                }))}
                placeholder={language === "en" ? "Select..." : "Выберите..."}
                value={formData.projectType}
                onChange={(e) => updateField("projectType", e.target.value)}
                error={errors.projectType}
              />

              <fieldset>
                <legend className="block text-body-sm font-medium text-text-secondary mb-3">
                  {t("contact.form.stage")}
                </legend>
                <RadioGroup
                  name="stage"
                  options={stageOptions(t)}
                  value={formData.stage}
                  onChange={(value) => updateField("stage", value)}
                  columns={2}
                  error={errors.stage}
                />
              </fieldset>

              <fieldset>
                <legend className="block text-body-sm font-medium text-text-secondary mb-3">
                  {t("contact.form.timeline")}
                </legend>
                <RadioGroup
                  name="timeline"
                  options={timelineOptions(t)}
                  value={formData.timeline}
                  onChange={(value) => updateField("timeline", value)}
                  columns={3}
                  error={errors.timeline}
                />
              </fieldset>

              <fieldset>
                <legend className="block text-body-sm font-medium text-text-secondary mb-3">
                  {t("contact.form.budget")}
                </legend>
                <RadioGroup
                  name="budget"
                  options={budgetOptions(t)}
                  value={formData.budget}
                  onChange={(value) => updateField("budget", value)}
                  columns={4}
                  error={errors.budget}
                />
              </fieldset>

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

              <Textarea
                label={t("contact.form.message")}
                name="message"
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder={
                  language === "en"
                    ? "Describe your project, goals, and constraints..."
                    : "Опишите проект, цели и ограничения..."
                }
                error={errors.message}
              />

              {status === "error" && (
                <p className="text-body-sm text-error">
                  {t("common.error")}.{" "}
                  {language === "en"
                    ? "Please try again or email us directly."
                    : "Попробуйте снова или напишите нам на почту."}
                </p>
              )}

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
                  : t("contact.form.submit")}
              </Button>
            </form>

            <div className="mt-8 p-4 rounded-xl bg-bg-tertiary/60 border border-border">
              <p className="text-body-sm text-text-secondary text-center mb-3">
                {language === "en"
                  ? "Prefer a call? Book a 20-minute scoping call."
                  : "Удобнее созвон? Забронируйте 20-минутный scoping call."}
              </p>
              <div className="flex justify-center">
                <a
                  href="mailto:hello@anteyko.com?subject=Scoping%20Call%20Request"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary border border-border text-body-sm text-accent-primary font-medium hover:border-accent-primary/30 hover:text-accent-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t("cta.secondary")}
                  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
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

            <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
              <p className="text-caption uppercase tracking-wider text-text-tertiary mb-2">
                {language === "en" ? "Trust" : "Доверие"}
              </p>
              <p className="text-body-sm text-text-secondary">
                {t("hero.trustLine")}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
