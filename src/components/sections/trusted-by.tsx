"use client";

import { useLanguage } from "@/lib/language-context";
import {
  Web3Mark,
  FintechMark,
  SaasMark,
  StartupMark,
  EnterpriseMark,
  MobileMark,
} from "./trusted-logos";

const LOGOS = [
  { name: "Web3 / DeFi", id: "web3", Mark: Web3Mark },
  { name: "Fintech", id: "fintech", Mark: FintechMark },
  { name: "SaaS", id: "saas", Mark: SaasMark },
  { name: "Startups", id: "startups", Mark: StartupMark },
  { name: "Enterprise", id: "enterprise", Mark: EnterpriseMark },
  { name: "Mobile", id: "mobile", Mark: MobileMark },
];

export function TrustedBySection() {
  const { language } = useLanguage();
  const label =
    language === "en" ? "Trusted by teams in" : "Нам доверяют команды в";

  return (
    <section className="py-12 md:py-16 border-y border-border/50 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-caption text-text-tertiary uppercase tracking-widest mb-8">
          {label}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
          {LOGOS.map(({ name, id, Mark }) => (
            <div
              key={id}
              className="flex items-center gap-2.5 text-text-tertiary/70 hover:text-text-secondary transition-colors duration-300 grayscale hover:grayscale-0"
            >
              <Mark className="w-6 h-6 shrink-0" />
              <span className="text-body-md font-semibold tracking-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
