"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";

export const CONSENT_KEY = "anteyko_cookie_consent";

/**
 * Событие, которым баннер сообщает остальной странице, что посетитель ответил.
 * Нужно тому, что обязано дождаться ответа, но не должно опрашивать
 * localStorage в цикле, — например чату поддержки (`CrmWidget`).
 */
export const CONSENT_EVENT = "anteyko:consent";

// Consent is the one dialog every visitor sees before anything else, so it is
// also the one place where a hardcoded language is most visible. The link goes
// through the locale-aware Link: a Russian visitor must land on /ru/privacy.
const COPY = {
  en: {
    title: "Cookies and analytics",
    body: "We use cookies for analytics and to improve the experience. You can accept all or only the necessary ones. Details are in our ",
    policy: "privacy policy",
    all: "Accept all",
    necessary: "Necessary only",
  },
  ru: {
    title: "Cookies и аналитика",
    body: "Используем cookies для аналитики и улучшения UX. Можете принять все или только необходимые. Подробнее — в ",
    policy: "политике конфиденциальности",
    all: "Принять все",
    necessary: "Только необходимые",
  },
} as const;

export function CookieConsent() {
  const [shown, setShown] = useState(false);
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.en;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setShown(true);
  }, []);

  const accept = (mode: "all" | "necessary") => {
    localStorage.setItem(CONSENT_KEY, mode);
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "consent_update",
        analytics_storage: mode === "all" ? "granted" : "denied",
        ad_storage: mode === "all" ? "granted" : "denied",
        ad_user_data: mode === "all" ? "granted" : "denied",
        ad_personalization: mode === "all" ? "granted" : "denied",
      });
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setShown(false);
  };

  if (!shown) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-4 left-4 right-4 md:right-auto md:max-w-md z-[10000] bg-bg-secondary border border-border rounded-2xl p-5 shadow-2xl"
    >
      <h2
        id="cookie-consent-title"
        className="text-sm font-semibold mb-2 text-text-primary"
      >
        {copy.title}
      </h2>
      <p className="text-xs text-text-secondary mb-4 leading-relaxed">
        {copy.body}
        <Link href="/privacy" className="underline">
          {copy.policy}
        </Link>
        .
      </p>
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => accept("all")}
          className="flex-1 min-w-[120px] px-3 py-2 bg-accent-primary text-white text-xs font-medium rounded-lg hover:opacity-90 transition"
        >
          {copy.all}
        </button>
        <button
          type="button"
          onClick={() => accept("necessary")}
          className="flex-1 min-w-[120px] px-3 py-2 border border-border text-text-primary text-xs font-medium rounded-lg hover:bg-bg-tertiary transition"
        >
          {copy.necessary}
        </button>
      </div>
    </div>
  );
}
