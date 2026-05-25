"use client";

import React, { createContext, useContext, useCallback, ReactNode } from "react";
import { useLocale } from "next-intl";
import { Language, translations, t as translate } from "./translations";
import { usePathname, useRouter } from "@/i18n/navigation";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: typeof translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// The active locale now comes from the URL (next-intl), not localStorage — so the
// server renders the correct language per /[locale] route and crawlers see it.
// The public API (language / setLanguage / t / translations) is unchanged, so the
// 20+ existing consumers keep working without edits.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useLocale() as Language;
  const pathname = usePathname();
  const router = useRouter();

  const setLanguage = useCallback(
    (lang: Language) => {
      // Switch locale while staying on the same path; next-intl applies the
      // as-needed prefix (en stays unprefixed, ru is served under /ru).
      router.replace(pathname, { locale: lang });
    },
    [pathname, router]
  );

  const t = useCallback((key: string) => translate(key, locale), [locale]);

  return (
    <LanguageContext.Provider
      value={{ language: locale, setLanguage, t, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
