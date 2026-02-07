"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Language, translations, t as translate } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: typeof translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "anteyko-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let lang: Language = "en";
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored && (stored === "en" || stored === "ru")) {
        lang = stored;
      } else {
        const browserLang = navigator?.language?.toLowerCase() ?? "";
        if (browserLang.startsWith("ru")) {
          lang = "ru";
        }
      }
    } catch {
      // localStorage unavailable (Safari private, etc.)
    }
    setLanguageState(lang);
    document.documentElement.lang = lang;
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* quota / private browsing */ }
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key: string) => translate(key, language),
    [language]
  );

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{
          language: "en",
          setLanguage: () => {},
          t: (key: string) => translate(key, "en"),
          translations,
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translations,
      }}
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
