"use client";

import { Link } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";

export function CaseBottomCTA() {
  const { language } = useLanguage();

  return (
    <section className="border-t border-border/50 bg-bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-display-md font-display font-bold text-text-primary mb-4">
          {language === "en" ? "Similar project?" : "Похожий проект?"}
        </h2>
        <p className="text-body-lg text-text-secondary mb-8">
          {language === "en"
            ? "20 minutes — we'll discuss your task and give an honest assessment. No strings attached."
            : "45 минут — обсудим вашу задачу, дадим честную оценку. Без обязательств."}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            {language === "en"
              ? "Get an estimate in 24 hours →"
              : "Получить оценку за 24 часа →"}
          </Link>
          <Link
            href="/cases"
            className="px-6 py-3 border border-border rounded-lg font-medium text-text-primary hover:bg-bg-tertiary transition"
          >
            {language === "en" ? "See other cases" : "Смотреть другие кейсы"}
          </Link>
        </div>
      </div>
    </section>
  );
}
