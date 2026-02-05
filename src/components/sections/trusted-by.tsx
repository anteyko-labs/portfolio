"use client";

import { useLanguage } from "@/lib/language-context";

const LOGOS = [
  { name: "Web3 / DeFi", id: "web3" },
  { name: "Fintech", id: "fintech" },
  { name: "SaaS", id: "saas" },
  { name: "Startups", id: "startups" },
  { name: "Enterprise", id: "enterprise" },
];

export function TrustedBySection() {
  const { language } = useLanguage();
  const label = language === "en" ? "Trusted by teams in" : "Нам доверяют команды в";

  return (
    <section className="py-12 md:py-16 border-y border-border/50 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-caption text-text-tertiary uppercase tracking-widest mb-8">
          {label}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {LOGOS.map((item) => (
            <span
              key={item.id}
              className="text-body-md font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
