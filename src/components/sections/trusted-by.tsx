"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

// Logos approved for public display. NDA clients are represented by the
// follow-up line (industry + count) rather than fake silhouettes.
// `dark: true` wraps the logo in a dark capsule — used for brands whose
// official wordmark is white and only reads on dark backgrounds.
const LOGOS: {
  name: string;
  src: string;
  w: number;
  h: number;
  dark?: boolean;
}[] = [
  { name: "TRM", src: "/logos/trm.png", w: 96, h: 40 },
  { name: "KutWallet", src: "/logos/kutwallet.png", w: 120, h: 44 },
  { name: "KUT Energy Investments", src: "/logos/kut-energy.png", w: 80, h: 56 },
  { name: "M7-Finance", src: "/logos/m7-finance.png", w: 130, h: 44 },
  { name: "ArmaDEX", src: "/logos/armadex.png", w: 130, h: 44, dark: true },
];

export function TrustedBySection() {
  const { language } = useLanguage();
  const heading =
    language === "en" ? "Trusted by" : "Нам доверяют";
  const ndaLine =
    language === "en"
      ? "and 40+ products in production across fintech, hospitality and banking — many under NDA."
      : "и 40+ продуктов в проде в fintech, hospitality и банкинге — большая часть под NDA.";

  return (
    <section className="py-14 md:py-20 border-y border-border/50 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-caption font-mono text-text-tertiary uppercase tracking-widest mb-10">
          {heading}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-14 mb-8 max-w-4xl mx-auto">
          {LOGOS.map(({ name, src, w, h, dark }) => (
            <div
              key={name}
              className={
                dark
                  ? "rounded-xl bg-text-primary px-5 py-3 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  : "opacity-70 hover:opacity-100 transition-opacity duration-300"
              }
              title={name}
            >
              <Image
                src={src}
                alt={`${name} logo`}
                width={w * 2}
                height={h * 2}
                style={{ width: `${w}px`, height: "auto", maxHeight: `${h}px` }}
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
