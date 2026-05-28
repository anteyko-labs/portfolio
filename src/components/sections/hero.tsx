"use client";

import { useRouter } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
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
    <section className="relative min-h-[92dvh] flex items-center justify-center overflow-hidden bg-black pt-24 pb-16">
      {/* Cinematic background video — slight downward shift so the figure anchors beneath the buttons,
          not under the headline. Poster gives an instant first paint. */}
      <video
        className="hero-video absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 62%" }}
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

      {/* Global veil: slight top darkening for header legibility, soft white fade at the bottom. */}
      <div className="hero-veil-dark absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Focused radial stage — softly darkens an elliptical pool under the text block so the
          subtitle and trust line stay readable even when the video plays bright frames behind them. */}
      <div className="hero-stage absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Restrained indigo halo behind the headline. */}
      <div
        className="absolute left-1/2 top-[34%] -translate-x-1/2 w-[52rem] max-w-[88vw] h-[20rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.18), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
          {/* Eyebrow pill — dark glass */}
          <div className="hero-reveal" style={delay(0.04)}>
            <span className="liquid-glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-caption font-mono uppercase tracking-[0.16em] text-white/85">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
              {taglineParts.map((part, i) => (
                <Fragment key={i}>
                  <span>{part}</span>
                  {i < taglineParts.length - 1 ? (
                    <span className="text-white/40">·</span>
                  ) : null}
                </Fragment>
              ))}
            </span>
          </div>

          {/* Headline — fluid clamp, two-layer shadow for legibility on bright video frames */}
          <h1
            className="hero-reveal hero-headline hero-text-shadow mt-6 font-display font-extrabold text-white text-balance"
            style={delay(0.12)}
          >
            <span className="text-accent-primary">{t("hero.titleAccent")}</span>{" "}
            <span className="text-white">{t("hero.titleRest")}</span>
          </h1>

          {/* Subtitle — narrower, fluid, soft shadow */}
          <p
            className="hero-reveal hero-subtitle hero-text-shadow mt-5 text-white/90 text-balance"
            style={delay(0.2)}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTAs — pulled closer to the content above */}
          <div
            className="hero-reveal mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            style={delay(0.28)}
          >
            <MagneticButton>
              <button
                type="button"
                onClick={() => router.push("/contact")}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-body-lg font-semibold bg-accent-primary text-white border border-accent-primary/70 shadow-glow-md hover:bg-accent-secondary hover:shadow-glow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {t("cta.primary")}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </MagneticButton>
            <MagneticButton>
              <button
                type="button"
                onClick={() => router.push("/cases")}
                className="liquid-glass-dark inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-body-lg font-medium text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {language === "en" ? "View our work" : "Смотреть кейсы"}
              </button>
            </MagneticButton>
          </div>

          {/* Trust line — close to CTAs, fluid, light shadow */}
          <div className="hero-reveal mt-6" style={delay(0.36)}>
            <p className="hero-trust hero-text-shadow text-white/85 flex items-center justify-center gap-2.5">
              <svg
                className="w-5 h-5 text-success shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
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
