"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { LANGUAGES, LANGUAGE_LABELS, pick } from "@/lib/i18n-text";

const LABEL = { en: "Language", ru: "Язык", zh: "语言", tr: "Dil", ar: "اللغة" };

function Globe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true" className={className}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M1.5 8h13M8 1.5c2 2 2.6 4 2.6 6.5S10 12.5 8 14.5M8 1.5C6 3.5 5.4 5.5 5.4 8S6 12.5 8 14.5" />
    </svg>
  );
}

/** Desktop: globe button with a dropdown of the five site languages. */
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={pick(LABEL, language)}
        className={clsx(
          "inline-flex items-center gap-2 px-3 py-2 text-body-sm font-medium rounded-lg",
          "text-text-secondary hover:text-text-primary",
          "border border-border hover:border-border-hover",
          "transition-all duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
        )}
      >
        <Globe className={clsx("h-4 w-4 transition-transform duration-700", open && "rotate-180")} />
        {LANGUAGE_LABELS[language].short}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={pick(LABEL, language)}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute end-0 top-[calc(100%+10px)] z-50 min-w-[190px] rounded-2xl border border-border bg-bg-primary p-1.5 shadow-xl shadow-black/10"
          >
            {LANGUAGES.map((l, i) => (
              <motion.li
                key={l}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.035, duration: 0.3 }}
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={l === language}
                  lang={l}
                  onClick={() => {
                    setOpen(false);
                    if (l !== language) setLanguage(l);
                  }}
                  className={clsx(
                    "flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-start text-body-sm transition-colors",
                    l === language ? "bg-text-primary text-white" : "text-text-primary hover:bg-bg-secondary"
                  )}
                >
                  <span>{LANGUAGE_LABELS[l].name}</span>
                  <span className="font-mono text-[11px] opacity-60">{LANGUAGE_LABELS[l].short}</span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobile menu: all languages as a row of pills. */
export function LanguageSwitcherInline() {
  const { language, setLanguage } = useLanguage();
  return (
    <div role="group" aria-label={pick(LABEL, language)} className="grid grid-cols-5 gap-2">
      {LANGUAGES.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === language}
          onClick={() => l !== language && setLanguage(l)}
          className={clsx(
            "rounded-xl border px-2 py-3 text-body-sm font-medium transition-colors",
            l === language
              ? "border-text-primary bg-text-primary text-white"
              : "border-border text-text-secondary hover:border-border-hover hover:text-text-primary"
          )}
        >
          {LANGUAGE_LABELS[l].short}
        </button>
      ))}
    </div>
  );
}
