"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "anteyko_cookie_consent";

export function CookieConsent() {
  const [shown, setShown] = useState(false);

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
        Cookies и аналитика
      </h2>
      <p className="text-xs text-text-secondary mb-4 leading-relaxed">
        Используем cookies для аналитики и улучшения UX. Можете принять все или
        только необходимые. Подробнее — в{" "}
        <a href="/privacy" className="underline">
          политике конфиденциальности
        </a>
        .
      </p>
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => accept("all")}
          className="flex-1 min-w-[120px] px-3 py-2 bg-accent-primary text-white text-xs font-medium rounded-lg hover:opacity-90 transition"
        >
          Принять все
        </button>
        <button
          type="button"
          onClick={() => accept("necessary")}
          className="flex-1 min-w-[120px] px-3 py-2 border border-border text-text-primary text-xs font-medium rounded-lg hover:bg-bg-tertiary transition"
        >
          Только необходимые
        </button>
      </div>
    </div>
  );
}
