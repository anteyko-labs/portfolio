"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion, useKeyboardNavigation, useFocusTrap } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

const navItems = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/cases", key: "cases" },
  { href: "/process", key: "process" },
  { href: "/faq", key: "faq" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

export function Header() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useFocusTrap(isMobileMenuOpen);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape & restore focus
  useKeyboardNavigation(() => {
    setIsMobileMenuOpen(false);
    menuTriggerRef.current?.focus();
  });

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en");
  };

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={clsx(
              "flex items-center justify-between transition-all duration-300",
              isScrolled ? "h-14 md:h-16" : "h-18 md:h-22"
            )}
          >
            {/* Logo */}
            <NextLink
              href="/"
              className="relative z-10 flex items-center"
            >
              <Image
                src="/images/anteyko-logo.png"
                alt="Anteyko"
                width={100}
                height={24}
                className="h-5 w-auto brightness-90 hover:brightness-100 transition-all"
                priority
              />
            </NextLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NextLink
                  key={item.key}
                  href={item.href}
                  className={clsx(
                    "px-4 py-2 text-body-sm font-medium rounded-lg",
                    "text-text-secondary hover:text-text-primary",
                    "transition-all duration-200 hover:-translate-y-0.5",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  )}
                >
                  {t(`nav.${item.key}`)}
                </NextLink>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={clsx(
                  "px-3 py-2 text-body-sm font-medium rounded-lg",
                  "text-text-secondary hover:text-text-primary",
                  "border border-border hover:border-border-hover",
                  "transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                )}
                aria-label={`Switch to ${language === "en" ? "Russian" : "English"}`}
              >
                {language === "en" ? "RU" : "EN"}
              </button>

              {/* CTA — магнитный эффект как в hero */}
              <MagneticButton className="inline-flex">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push("/contact")}
                >
                  {t("cta.primary")}
                </Button>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={menuTriggerRef}
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 -mr-2.5 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-lg"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-50 bg-bg-primary/90 backdrop-blur-xl lg:hidden"
              onClick={() => {
                setIsMobileMenuOpen(false);
                menuTriggerRef.current?.focus();
              }}
            />

            {/* Menu Content */}
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-bg-secondary border-l border-border lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      menuTriggerRef.current?.focus();
                    }}
                    className="p-2.5 -mr-2.5 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary rounded-lg"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <NextLink
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={clsx(
                          "block px-4 py-3 text-heading-md font-medium rounded-xl",
                          "text-text-primary hover:bg-bg-tertiary",
                          "transition-colors duration-200",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
                        )}
                      >
                        {t(`nav.${item.key}`)}
                      </NextLink>
                    </motion.div>
                  ))}
                </nav>

                {/* Actions */}
                <div className="mt-auto space-y-4">
                  {/* Language Toggle */}
                  <button
                    onClick={toggleLanguage}
                    className={clsx(
                      "w-full px-4 py-3 text-body-md font-medium rounded-xl",
                      "text-text-secondary hover:text-text-primary",
                      "border border-border hover:border-border-hover",
                      "transition-all duration-200",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
                    )}
                    aria-label={language === "en" ? "Switch to Russian" : "Переключить на английский"}
                  >
                    {language === "en" ? "Русский" : "English"}
                  </button>

                  {/* CTAs */}
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/contact");
                    }}
                  >
                    {t("cta.primary")}
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/contact");
                    }}
                  >
                    {t("cta.secondary")}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
