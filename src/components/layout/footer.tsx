"use client";

import NextLink from "next/link";
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
              <NextLink
                href="/"
                className="inline-block text-2xl font-display font-bold text-text-primary tracking-tight"
              >
                Anteyko
              </NextLink>
              <p className="mt-4 text-body-md text-text-secondary max-w-sm">
                {t("footer.tagline")}
              </p>
              <div className="mt-6 flex gap-3">
                <ButtonLink href="/contact" buttonVariant="primary" size="sm">
                  {t("cta.primary")}
                </ButtonLink>
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
                    className="text-body-sm text-text-secondary hover:text-text-primary transition-colors"
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
                      className={`px-3 py-1.5 text-caption font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
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
                      className={`px-3 py-1.5 text-caption font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
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
