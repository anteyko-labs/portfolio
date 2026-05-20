import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata = {
  title: "Политика конфиденциальности",
  description:
    "Как Anteyko Labs собирает, обрабатывает и хранит ваши данные. Cookies, аналитика, права субъектов данных.",
};

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <Section background="primary" padding="xl">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Политика конфиденциальности"
            subtitle="Как мы обращаемся с вашими данными"
            align="center"
            animate={false}
          />

          <div className="prose prose-invert prose-zinc max-w-none mt-12 text-body-md text-text-secondary">
            <p className="text-text-tertiary text-body-sm">
              Последнее обновление: 20 мая 2026
            </p>

            <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
              1. Кто мы
            </h2>
            <p>
              ОсОО «Антейко» (ИНН 01306202310152), г. Бишкек, Кыргызстан.
              <br />
              Email:{" "}
              <a
                href="mailto:labs@anteyko.com"
                className="text-accent-primary hover:text-accent-secondary"
              >
                labs@anteyko.com
              </a>
              . Telegram:{" "}
              <a
                href="https://t.me/Anteyko_labs"
                className="text-accent-primary hover:text-accent-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Anteyko_labs
              </a>
              .
            </p>

            <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
              2. Какие данные собираем
            </h2>
            <p>
              <strong className="text-text-primary">
                Технические (автоматически):
              </strong>{" "}
              IP-адрес (анонимизированный), user-agent, referer, страницы, время
              посещения, действия (клики, скроллы).
            </p>
            <p>
              <strong className="text-text-primary">
                Аналитические (cookies):
              </strong>{" "}
              Google Analytics 4, Yandex.Metrica (с Webvisor), Sentry (error
              tracking), Vercel Analytics. Только после вашего согласия.
            </p>
            <p>
              <strong className="text-text-primary">Контактные (от вас):</strong>{" "}
              имя, email, телефон, описание проекта — когда вы заполняете
              контактную форму или открываете коммерческое предложение.
            </p>

            <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
              3. Зачем собираем
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Улучшать UX сайта (Webvisor, A/B-тесты)</li>
              <li>Атрибутировать рекламные кампании (UTM, конверсии)</li>
              <li>
                Связываться с потенциальными клиентами (только если оставили
                заявку)
              </li>
              <li>Отслеживать ошибки и сбои (Sentry)</li>
            </ul>

            <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
              4. Кому передаём
            </h2>
            <p>
              Только сервисам-обработчикам (Google, Yandex, Vercel, Sentry,
              Telegram). Все они подписали DPA (Data Processing Agreements) с
              нами. Третьим лицам в рекламных целях НЕ передаём.
            </p>

            <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
              5. Cookies
            </h2>
            <p>
              Можете отключить в баннере при первом визите или в настройках
              браузера. GA4 и Yandex.Metrica не работают без вашего согласия
              (Consent Mode v2).
            </p>

            <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
              6. Хранение
            </h2>
            <p>
              Аналитические данные — 14 месяцев (стандарт GA4). Контактные
              заявки — 3 года или до отзыва согласия.
            </p>

            <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
              7. Ваши права
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Запросить копию ваших данных</li>
              <li>Удалить ваши данные (forget request)</li>
              <li>Отозвать согласие на обработку</li>
              <li>Подать жалобу в надзорный орган</li>
            </ul>
            <p className="mt-4">
              Пишите на{" "}
              <a
                href="mailto:labs@anteyko.com"
                className="text-accent-primary hover:text-accent-secondary"
              >
                labs@anteyko.com
              </a>{" "}
              — отвечаем в течение 30 дней.
            </p>

            <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
              8. Дети
            </h2>
            <p>
              Сайт не предназначен для лиц младше 16 лет. Данные не собираем
              сознательно.
            </p>

            <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
              9. Изменения
            </h2>
            <p>
              Эта политика может меняться. Дата последнего обновления — вверху.
            </p>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
