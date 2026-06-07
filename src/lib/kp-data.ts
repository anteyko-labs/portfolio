// Общие данные для всех КП — оплата, FAQ, гарантия, что входит и т.д.
// Если что-то нужно сделать template-specific — добавляй в kp-templates.ts.

import type { TemplateId } from './kp-templates';

export type ShowcaseCase = {
  title: string;
  url: string;
  description: string;
};

// Похожий проект по теме — показываем клиенту реальный кейс из портфолио.
// Можно сделать разные кейсы для разных шаблонов по мере накопления.
const TRM_CASE: ShowcaseCase = {
  title: 'TRM Oferta — регистрация и подписание оферты',
  url: 'https://www.anteyko.com/cases/trm-oferta-registration',
  description:
    'Юридически обязывающий цифровой акцепт без e-signature провайдера: PDF с кириллицей, печатью и подписью, аудит-трейл с защитой от подмены.',
};

export const SHOWCASE_CASES: Record<TemplateId, ShowcaseCase | null> = {
  courses: TRM_CASE,
  saas: TRM_CASE,
  mvp: TRM_CASE,
};

// Bilingual testimonials. `quote`, `author`, `role` carry both EN and RU so the
// home section (locale from URL) and KP pages (RU-only for now) read from the
// same source. `initials` are language-neutral.
export type LocalizedString = { en: string; ru: string };

export type Testimonial = {
  quote: LocalizedString;
  author: LocalizedString;
  role: LocalizedString;
  initials?: string;
};

// Реальные отзывы клиентов. Подтверждены клиентами в 2026.
// NDA-клиенты идентифицируются через должность + индустрию + город (без имени компании).
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      ru: 'До Anteyko мы собирали согласия учеников на бумаге и переживали о юридической силе цифровых акцептов — большинство IT-подрядчиков предлагали внешние сервисы ЭП за сотни долларов в месяц. Anteyko сделали свою архитектуру акцепта с аудит-трейлом и PDF с печатью директора, которая полностью соответствует Гражданскому кодексу КР, — за 2 недели. Бумажный процесс закрыли полностью.',
      en: 'Before Anteyko we collected student consents on paper and worried about the legal validity of digital acceptance — most IT contractors offered external e-signature services at hundreds of dollars per month. Anteyko built their own acceptance architecture with an audit trail and a PDF with the director\'s seal that fully complies with the Civil Code of the Kyrgyz Republic — in 2 weeks. The paper process is closed entirely.',
    },
    author: { ru: 'Адина Какешова', en: 'Adina Kakeshova' },
    role: { ru: 'Основатель, TRM, Бишкек', en: 'Founder, TRM, Bishkek' },
    initials: 'АК',
  },
  {
    quote: {
      ru: 'В 2023 Дубай только что закодифицировал VARA-регуляции, и нам нужно было запустить платформу токенизации до Q3 — с полным KYC/AML, ончейн-распределением токенов и аудит-трейлом. Большинство подрядчиков либо предлагали нерегулируемые DeFi-шаблоны из 2021 года, либо просили 6+ месяцев. Anteyko уложились в 12 недель, полностью соответствуя VARA. Private Sale стартовал в срок — без них этого не случилось бы.',
      en: 'In 2023 Dubai had just codified VARA regulations, and we needed to launch a tokenization platform by Q3 — with full KYC/AML, on-chain token distribution, and an audit trail. Most contractors either offered unregulated DeFi templates from 2021 or asked for 6+ months. Anteyko delivered in 12 weeks, fully VARA-compliant. The Private Sale launched on schedule — without them, it wouldn\'t have happened.',
    },
    author: { ru: 'Bazan', en: 'Bazan' },
    role: {
      ru: 'CEO, KUT Energy Investments, Dubai',
      en: 'CEO, KUT Energy Investments, Dubai',
    },
    initials: 'BZ',
  },
  {
    quote: {
      ru: 'Мы хотели кошелёк, который ощущается как банковское приложение — интуитивно как Revolut, но со встроенным трейдингом и аналитикой расходов. Trust Wallet и Coinbase Wallet слишком технические для нашей аудитории. Anteyko полностью спроектировали и реализовали 26+ экранов с UX уровня банковского приложения и спрятали под капотом non-custodial архитектуру с шифрованием. На App Store запустились без единого ревью-rejection.',
      en: 'We wanted a wallet that feels like a banking app — intuitive like Revolut, but with built-in trading and spending analytics. Trust Wallet and Coinbase Wallet are too technical for our audience. Anteyko designed and built 26+ screens with banking-app-grade UX and hid a non-custodial architecture with encryption under the hood. We launched on the App Store without a single review rejection.',
    },
    author: { ru: 'Alexander', en: 'Alexander' },
    role: {
      ru: 'CEO, KUT Resources AG, Zurich',
      en: 'CEO, KUT Resources AG, Zurich',
    },
    initials: 'AL',
  },
  {
    quote: {
      ru: 'Нам нужна была банковская платформа production-grade с нуля: транзакционный леджер с ACID-гарантиями, четыре платёжных провайдера за одним API, sub-200ms response time на агрегацию баланса. Команда Anteyko не просто написала код — они сделали инженерное решение архитектурного уровня: двойная запись, idempotency keys, JWT rotation, 87% покрытие тестами, всё вышло в продакшен без единого критического инцидента в первом квартале после запуска.',
      en: 'We needed a production-grade banking platform from scratch: a transactional ledger with ACID guarantees, four payment providers behind one API, sub-200ms response time on balance aggregation. The Anteyko team didn\'t just write code — they delivered an engineering solution at the architecture level: double-entry, idempotency keys, JWT rotation, 87% test coverage. Everything shipped to production without a single critical incident in the first quarter after launch.',
    },
    author: { ru: 'Aron', en: 'Aron' },
    role: {
      ru: 'CTO, fintech (под NDA), Hong Kong',
      en: 'CTO, fintech (under NDA), Hong Kong',
    },
    initials: 'AR',
  },
  {
    quote: {
      ru: 'Мы не знали точную себестоимость и маржу каждого ролла — цены на ингредиенты менялись, а считать руками в Excel было невозможно для меню из 50+ позиций. Anteyko построили систему где каждый рецепт автоматически пересчитывает себестоимость при изменении цены ингредиента, шеф видит свою часть, бухгалтер — свою, я как CFO — аналитику по всему. С первого месяца увидели где теряем маржу.',
      en: 'We didn\'t know the exact cost and margin of each roll — ingredient prices changed, and recalculating by hand in Excel was impossible for a 50+ item menu. Anteyko built a system where each recipe automatically recalculates cost when an ingredient price changes — the chef sees their part, the accountant sees theirs, and as CFO I see the analytics across everything. From the first month we saw where we were losing margin.',
    },
    author: { ru: 'Markel Bron', en: 'Markel Bron' },
    role: {
      ru: 'CFO, hospitality (под NDA), San Jose',
      en: 'CFO, hospitality (under NDA), San Jose',
    },
    initials: 'MB',
  },
];

export type PaymentTerm = {
  label: string;
  schedule: string;
};

export const PAYMENT_TERMS: PaymentTerm[] = [
  { label: 'Пакет «Старт»', schedule: '50% старт / 50% сдача' },
  { label: 'Пакеты «Бизнес» и «Премиум»', schedule: '30% старт / 40% после демо / 30% сдача' },
];

export const INCLUDED: string[] = [
  'Дизайн интерфейса под ваш бренд',
  'Разработка и тестирование',
  'Деплой на production-инфраструктуру',
  'Документация и передача проекта',
  'Базовое обучение работе с админкой',
  '1 месяц поддержки после сдачи',
];

export const NOT_INCLUDED: string[] = [
  'Комиссии платёжных систем (Stripe ~3%, PayBox ~2%)',
  'Хостинг ($0–25 / мес на Vercel в зависимости от нагрузки)',
  'Домен (~$10 / год)',
  'Контент: тексты, видео, изображения уроков',
  'Услуги маркетинга и трафика',
];

export const FROM_CLIENT: string[] = [
  'Контент проекта (тексты, материалы, медиа)',
  'Реквизиты для подключения Stripe / PayBox',
  'Доступы к существующим сервисам (домен, аналитика)',
  '1–2 часа созвонов в неделю на согласования',
  'Обратная связь по этапам в течение 1–2 рабочих дней',
];

export type FaqItem = {
  q: string;
  a: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'А если что-то сломается ночью?',
    a: 'Мониторинг 24/7 первый месяц. Критичные баги — реакция за 2 часа в рабочее время (Бишкек, GMT+6). Остальное — в течение рабочего дня.',
  },
  {
    q: 'Я не разработчик. Как обновлять контент?',
    a: 'Админка на Retool — работает как Google Таблицы. За 15 минут научим, остаётся видео-инструкция.',
  },
  {
    q: 'Чей код после сдачи?',
    a: 'Полностью ваш. Передаём GitHub-репозиторий, документацию и доступы ко всем сервисам.',
  },
  {
    q: 'Нужны доработки потом?',
    a: 'Час разработки — 3 000 сом / $35. Минимум 4 часа. Скидка 10% постоянным клиентам.',
  },
  {
    q: 'Работаете с НДС / документами?',
    a: 'Работаем как ИП КР. Выдаём акт, инвойс и договор. По запросу — счёт в USD.',
  },
  {
    q: 'Можно подписать NDA?',
    a: 'Конечно. У нас есть шаблон, подписываем до старта работ. Ваш контент остаётся вашим.',
  },
];

export const GUARANTEE_TITLE = 'Гарантия по срокам';

export const GUARANTEE_TEXT =
  'Если просрочиваем больше 5 рабочих дней по нашей вине — компенсируем 10% от стоимости пакета. Если задержка с вашей стороны (контент, доступы, согласования) — сдвигаем сроки без штрафа и без дополнительной оплаты.';

// Юридические реквизиты компании — отображаются мелким шрифтом в самом низу КП.
export const LEGAL_INFO = {
  name: 'ОсОО «Антейко»',
  inn: '01306202310152',
  city: 'г. Бишкек, Кыргызстан',
  bank: 'ОАО «Бакай Банк»',
  bik: '124029',
  account: '1240020001254942',
  accountCurrency: 'KGS',
};

// Контакты для клиента.
export const CONTACT_INFO = {
  email: 'labs@anteyko.com',
  telegram: '@Anteyko_labs',
  telegramUrl: 'https://t.me/Anteyko_labs',
  website: 'anteyko.com',
  websiteUrl: 'https://anteyko.com',
};
