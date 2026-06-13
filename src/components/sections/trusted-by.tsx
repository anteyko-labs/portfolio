"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

// Logos approved for public display. NDA clients are represented by the
// follow-up line (industry + count) rather than fake silhouettes.
// `dark: true` wraps the logo in a dark capsule — used for brands whose
// official wordmark is white and only reads on dark backgrounds.
// Heights are tuned so each mark carries similar visual weight on the row.
const LOGOS: {
  name: string;
  src: string;
  /** Target render height in CSS px — the row's visual scale knob. */
  h: number;
  dark?: boolean;
}[] = [
  { name: "TRM", src: "/logos/trm.png", h: 64 },
  { name: "KutWallet", src: "/logos/kutwallet.png", h: 64 },
  { name: "KUT Energy Investments", src: "/logos/kut-energy.png", h: 64 },
  { name: "M7-Finance", src: "/logos/m7-finance.png", h: 64 },
  { name: "ArmaDEX", src: "/logos/armadex.png", h: 48, dark: true },
];

export function TrustedBySection() {
  const { language } = useLanguage();
  const heading =
    language === "en" ? "Trusted by" : "Нам доверяют";
  const ndaLine =
    language === "en"
      ? "15 flagship case studies below — and 40+ products shipped to production, many under NDA."
      : "15 флагманских кейсов ниже — и 40+ продуктов, выпущенных в прод, большинство под NDA.";

  return (
    <section className="py-14 md:py-20 border-y border-border/50 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-caption font-mono text-text-tertiary uppercase tracking-widest mb-10">
          {heading}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-8 md:gap-x-10 lg:gap-x-12 mb-8 max-w-6xl mx-auto">
          {LOGOS.map(({ name, src, h, dark }) => (
            <div
              key={name}
              className={
                dark
                  ? "rounded-xl bg-text-primary px-4 py-2.5 opacity-85 hover:opacity-100 transition-opacity duration-300 flex items-center"
                  : "opacity-70 hover:opacity-100 transition-opacity duration-300 flex items-center"
              }
              title={name}
            >
              <Image
                src={src}
                alt={`${name} logo`}
                width={480}
                height={160}
                style={{ width: "auto", height: `${h}px` }}
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <p className="text-center text-body-sm text-text-tertiary max-w-2xl mx-auto">
          {ndaLine}
        </p>
      </div>
    </section>
  );
}
