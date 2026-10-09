"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { TESTIMONIALS, type Testimonial } from "@/lib/kp-data";

// Reusing the verified TESTIMONIALS from kp-data.ts so the home page and KP
// pages share a single source of truth. quote/author/role are bilingual —
// resolved here by the locale from useLanguage(), driven by the URL prefix.

// Logo pairing is done HERE, not in kp-data.ts (that file is owned elsewhere).
// We match a testimonial to a public logo by detecting the company name inside
// the locale-neutral English role string (e.g. "Founder, TRM, Bishkek").
// Only companies with a real file in public/logos/ are matched — no invented
// logos. NDA-anonymous quotes (role contains "NDA") get a mono badge instead.
type LogoMatch = { src: string; label: string };
const LOGO_RULES: { match: RegExp; src: string; label: string }[] = [
  { match: /\bTRM\b/i, src: "/logos/trm.png", label: "TRM" },
  { match: /KUT Energy/i, src: "/logos/kut-energy.png", label: "KUT Energy Investments" },
  // The Zurich testimonial is explicitly about the KutWallet product, which has
  // a public logo even though the company name in the role is KUT Resources AG.
  { match: /KutWallet|KUT Resources/i, src: "/logos/kutwallet.png", label: "KutWallet" },
  { match: /M7[-\s]?Finance/i, src: "/logos/m7-finance.png", label: "M7-Finance" },
];

function logoFor(t: Testimonial): LogoMatch | null {
  const haystack = `${t.role.en} ${t.author.en}`;
  const rule = LOGO_RULES.find((r) => r.match.test(haystack));
  return rule ? { src: rule.src, label: rule.label } : null;
}

function isNda(t: Testimonial): boolean {
  return /\bNDA\b/i.test(`${t.role.en} ${t.role.ru}`);
}

export function TestimonialsSection() {
  const { language } = useLanguage();
  if (TESTIMONIALS.length === 0) return null;

  const lang: "en" | "ru" = language === "en" ? "en" : "ru";
  const heading =
    lang === "en"
      ? "What founders say about working with us"
      : "Что говорят основатели о работе с нами";
  const eyebrow =
    lang === "en" ? "Verified clients" : "Подтверждённые клиенты";

  return (
    <section className="py-20 md:py-28 bg-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-caption font-mono text-text-tertiary uppercase tracking-widest mb-3">
            {eyebrow}
          </p>
          <h2 className="text-display-md md:text-display-lg font-display font-bold text-text-primary text-balance max-w-3xl mx-auto">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, i) => {
            const logo = logoFor(t);
            const nda = isNda(t);
            return (
            <figure
              key={i}
              className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-bg-primary p-7 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <svg
                  className="w-7 h-7 text-accent-primary/70 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.5 6.5C6.5 6.5 4 9 4 12.5c0 3 2 5 4.5 5 1 0 1.5-.3 1.5-1 0-.5-.3-1-1-1.3-1.5-.6-2.3-1.5-2.3-3.2 0-2 1.5-3 3-3 .8 0 1.3-.4 1.3-1.2 0-.7-.5-1.3-1.5-1.3zm9 0c-3 0-5.5 2.5-5.5 6 0 3 2 5 4.5 5 1 0 1.5-.3 1.5-1 0-.5-.3-1-1-1.3-1.5-.6-2.3-1.5-2.3-3.2 0-2 1.5-3 3-3 .8 0 1.3-.4 1.3-1.2 0-.7-.5-1.3-1.5-1.3z" />
                </svg>
                {/* Verifiable signal: real client logo, else an NDA badge. */}
                {logo ? (
                  <Image
                    src={logo.src}
                    alt={`${logo.label} logo`}
                    width={160}
                    height={48}
                    style={{ width: "auto", height: "28px" }}
                    className="object-contain opacity-70 shrink-0"
                  />
                ) : nda ? (
                  <span className="shrink-0 rounded-md border border-border bg-bg-secondary px-2 py-1 font-mono text-[0.625rem] uppercase tracking-widest text-text-tertiary">
                    NDA
                  </span>
                ) : null}
              </div>
              <blockquote className="text-body-md text-text-secondary leading-relaxed flex-1">
                {t.quote[lang]}
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-2 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center text-body-sm font-semibold shrink-0">
                  {t.initials?.[lang] ?? t.author[lang].slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-body-sm font-semibold text-text-primary truncate">
                    {t.author[lang]}
                  </div>
                  <div className="text-caption text-text-tertiary truncate">
                    {t.role[lang]}
                  </div>
                </div>
              </figcaption>
            </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
