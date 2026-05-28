"use client";

import { useRouter } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Fragment, type CSSProperties } from "react";

// CSS-only staggered reveal via --reveal-delay. Content is visible by default
// (opacity:1) and only animates when motion is allowed — never stuck invisible.
const delay = (s: number): CSSProperties =>
  ({ "--reveal-delay": `${s}s` } as CSSProperties);

export function HeroSection() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const tagline = t("hero.tagline");
  const taglineParts = tagline.split(/\s*·\s*/);

  return (
    <section className="relative min-h-[92dvh] flex items-center justify-center overflow-hidden bg-bg-primary pt-24 pb-16">
      {/* Cinematic background video — muted, looped, with poster fallback for fast first paint */}
      <video
        className="hero-video absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Light-cinematic veil — a radial vignette that turns the dark video into a misty white centre
          for the headline while letting the video shimmer through the edges. */}
      <div className="hero-veil absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Subtle tech grid — radial fade toward centre for an airy feel */}
      <div
        className="absolute inset-0 page-hero-grid pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 0%, transparent 80%)",
        }}
      />

      {/* Soft indigo halo behind the headline — restrained brand accent */}
      <div
        className="absolute left-1/2 top-[28%] -translate-x-1/2 w-[60rem] max-w-[90vw] h-[24rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79,70,229,0.10), transparent 65%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
          {/* Eyebrow pill — liquid glass over the cinematic veil */}
          <div className="hero-reveal" style={delay(0.04)}>
            <span className="liquid-glass-light inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-caption font-mono uppercase tracking-[0.16em] text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
              {taglineParts.map((part, i) => (
                <Fragment key={i}>
                  <span>{part}</span>
                  {i < taglineParts.length - 1 ? (
                    <span className="text-text-muted">·</span>
                  ) : null}
                </Fragment>
              ))}
            </span>
          </div>

          {/* Headline — balanced size, near-black + single indigo accent line */}
          <h1
            className="hero-reveal mt-7 font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] text-text-primary text-balance"
            style={delay(0.12)}
          >
            <span className="text-accent-primary">{t("hero.titleAccent")}</span>{" "}
            <span className="text-text-primary">{t("hero.titleRest")}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-reveal mt-6 text-body-lg md:text-[1.2rem] text-text-secondary max-w-xl leading-relaxed text-balance"
            style={delay(0.2)}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div
            className="hero-reveal mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
            style={delay(0.28)}
          >
            <MagneticButton>
              <Button
                variant="primary"
                size="lg"
                className="font-semibold"
                onClick={() => router.push("/contact")}
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                }
                iconPosition="right"
              >
                {t("cta.primary")}
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/cases")}
                className="liquid-glass-light"
              >
                {language === "en" ? "View our work" : "Смотреть кейсы"}
              </Button>
            </MagneticButton>
          </div>

          {/* Trust line */}
          <div className="hero-reveal mt-10" style={delay(0.36)}>
            <p className="text-body-md text-text-secondary flex items-center justify-center gap-2.5">
              <svg
                className="w-5 h-5 text-success shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {t("hero.trustLine")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
