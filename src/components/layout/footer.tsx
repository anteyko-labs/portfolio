"use client";

import { Link as NextLink } from "@/i18n/navigation";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { ButtonLink } from "@/components/ui/link";

const navLinks = [
  { href: "/services", key: "services" },
  { href: "/cases", key: "cases" },
  { href: "/process", key: "process" },
  { href: "/faq", key: "faq" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

export function Footer() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <NextLink href="/" className="inline-block" data-logo="footer">
                <Image
                  src="/images/anteyko-logo.png"
                  alt="Anteyko"
                  width={100}
                  height={24}
                  className="h-5 w-auto invert opacity-90 hover:opacity-100 transition-opacity"
                />
              </NextLink>
              <p className="mt-4 text-body-md text-text-secondary max-w-sm">
                {t("footer.tagline")}
              </p>
              <div className="mt-6 flex gap-3">
                <ButtonLink href="/contact" buttonVariant="primary" size="sm">
                  {t("cta.primary")}
                </ButtonLink>
              </div>
              {/* Social links */}
              <div className="mt-5 flex items-center gap-3">
                <a href="https://github.com/anteyko-labs" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-11 h-11 rounded-lg border border-border bg-bg-tertiary/50 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-border-hover transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/anteyko" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-lg border border-border bg-bg-tertiary/50 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-border-hover transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://t.me/anteyko_labs" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-11 h-11 rounded-lg border border-border bg-bg-tertiary/50 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-border-hover transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-3">
              <h3 className="text-heading-sm font-medium text-text-primary mb-4">
                {language === "en" ? "Navigation" : "Навигация"}
              </h3>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <NextLink
                    key={link.key}
                    href={link.href}
                    className="text-body-sm text-text-secondary hover:text-text-primary transition-colors py-1.5"
                  >
                    {t(`nav.${link.key}`)}
                  </NextLink>
                ))}
              </nav>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-4">
              <h3 className="text-heading-sm font-medium text-text-primary mb-4">
                {language === "en" ? "Contact" : "Контакты"}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-caption text-text-secondary mb-1">Email</p>
                  <a
                    href="mailto:labs@anteyko.com"
                    className="text-body-sm text-text-secondary hover:text-accent-primary transition-colors"
                  >
                    labs@anteyko.com
                  </a>
                </div>
                <div>
                  <p className="text-caption text-text-secondary mb-1">
                    {language === "en" ? "Location" : "Локация"}
                  </p>
                  <p className="text-body-sm text-text-secondary">
                    {language === "en"
                      ? "Bishkek, Kyrgyzstan"
                      : "Бишкек, Кыргызстан"}
                  </p>
                  <p className="text-body-sm text-text-secondary">
                    {language === "en"
                      ? "Dubai, UAE"
                      : "Дубай, ОАЭ"}
                  </p>
                </div>
                {/* Language Switcher */}
                <div className="pt-2">
                  <p className="text-caption text-text-secondary mb-2">
                    {language === "en" ? "Language" : "Язык"}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLanguage("en")}
                      aria-label="English"
                      className={`px-4 py-2.5 text-body-sm font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
                        language === "en"
                          ? "bg-accent-glow text-accent-primary border border-accent-primary/30"
                          : "text-text-secondary hover:text-text-primary border border-border hover:border-border-hover"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage("ru")}
                      aria-label="Русский"
                      className={`px-4 py-2.5 text-body-sm font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
                        language === "ru"
                          ? "bg-accent-glow text-accent-primary border border-accent-primary/30"
                          : "text-text-secondary hover:text-text-primary border border-border hover:border-border-hover"
                      }`}
                    >
                      RU
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction hints (StrategiQ-style) */}
        <div className="py-3 border-t border-border/50">
          <p className="text-center text-caption text-text-tertiary tracking-widest uppercase">
            Scroll · Hover · Click
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-text-secondary">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <NextLink
              href="/privacy"
              className="text-caption text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded"
            >
              {t("footer.links.privacy")}
            </NextLink>
            <NextLink
              href="/terms"
              className="text-caption text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded"
            >
              {t("footer.links.terms")}
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
