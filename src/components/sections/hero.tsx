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

      {/* Cinematic dark veil — slight top darkening so the header reads, transparent middle for the
          video, and a soft fade-to-white at the bottom so the next light section meets us gracefully. */}
      <div className="hero-veil-dark absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Indigo halo behind the headline — a touch brighter on dark */}
      <div
        className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[60rem] max-w-[90vw] h-[24rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.22), transparent 65%)",
        }}
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

          {/* Headline — white on cinematic dark, with one indigo accent run */}
          <h1
            className="hero-reveal mt-7 font-display font-extrabold leading-[1.06] tracking-[-0.03em] text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] text-white text-balance"
            style={delay(0.12)}
          >
            <span className="text-accent-primary">{t("hero.titleAccent")}</span>{" "}
            <span className="text-white">{t("hero.titleRest")}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-reveal mt-6 text-body-lg md:text-[1.2rem] text-white/85 max-w-xl leading-relaxed text-balance"
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

          {/* Trust line */}
          <div className="hero-reveal mt-10" style={delay(0.36)}>
            <p className="text-body-md text-white/75 flex items-center justify-center gap-2.5">
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
