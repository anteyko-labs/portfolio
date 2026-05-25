import Link from "next/link";

export function CaseBottomCTA() {
  return (
    <section className="border-t border-border/50 bg-bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-display-md font-display font-bold text-text-primary mb-4">
          Похожий проект?
        </h2>
        <p className="text-body-lg text-text-secondary mb-8">
          20 минут — обсудим вашу задачу, дадим честную оценку. Без обязательств.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            Получить оценку за 24 часа →
          </Link>
          <Link
            href="/cases"
            className="px-6 py-3 border border-border rounded-lg font-medium text-text-primary hover:bg-bg-tertiary transition"
          >
            Смотреть другие кейсы
          </Link>
        </div>
      </div>
    </section>
  );
}
