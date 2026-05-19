import type { IconId } from '@/app/kp/icons';

export type Currency = 'som' | 'usd';
export type TemplateId = 'courses' | 'saas' | 'mvp';

export type PlanFeature = { text: string; included: boolean };

export type Plan = {
  id: string;
  name: string;
  priceSom: number;
  time: string;
  featured: boolean;
  badge: string | null;
  features: PlanFeature[];
};

export type FeatureCard = {
  iconId: IconId;
  title: string;
  sub: string;
};

export type TimelineRow = {
  step: string;
  desc: string;
  sub: string;
};

export type TechItem = {
  name: string;
  note?: string;
};

export type TechCategory = {
  label: string;
  items: TechItem[];
};

export type KPTemplate = {
  id: TemplateId;
  title: string;
  titleLine2?: string;
  subtitle: string;
  features: FeatureCard[];
  plans: Plan[];
  timeline: TimelineRow[];
  techStack: TechCategory[];
  techPrinciples: string[];
};

export const WHY_ITEMS: { iconId: IconId; title: string; desc: string }[] = [
  {
    iconId: 'code',
    title: 'Опыт в Web2 и Web3',
    desc: 'Разрабатываем сложные системы от мобильных приложений до блокчейн-протоколов',
  },
  {
    iconId: 'globe',
    title: 'Понимаем рынок СНГ',
    desc: 'Бишкек, Казахстан, Россия — знаем локальные платёжные решения',
  },
  {
    iconId: 'shield',
    title: 'Фиксированная цена',
    desc: 'Договариваемся о стоимости до старта. Никаких сюрпризов в конце',
  },
  {
    iconId: 'refresh',
    title: 'Поддержка после сдачи',
    desc: 'Первый месяц поддержки включён в любой пакет',
  },
];

const COURSES: KPTemplate = {
  id: 'courses',
  title: 'Telegram-бот для продажи',
  titleLine2: 'и доставки онлайн-курсов',
  subtitle:
    'Полная автоматизация: от оплаты до последнего урока. Ваши ученики покупают, проходят курс и получают результат — без вашего участия.',
  features: [
    { iconId: 'message', title: 'Telegram бот', sub: 'Продажа и доставка уроков' },
    { iconId: 'credit-card', title: 'Приём оплат', sub: 'Stripe + локальные СНГ' },
    { iconId: 'monitor', title: 'Админ-панель', sub: 'Управление курсом' },
    { iconId: 'chart', title: 'Аналитика', sub: 'Прогресс каждого ученика' },
  ],
  plans: [
    {
      id: 'start',
      name: 'СТАРТ',
      priceSom: 120_000,
      time: '10–12 дней',
      featured: false,
      badge: null,
      features: [
        { text: 'Telegram бот + навигация', included: true },
        { text: 'Stripe оплата', included: true },
        { text: 'Прогресс пользователей', included: true },
        { text: 'Базовая аналитика', included: true },
        { text: 'Локальные СНГ платежи', included: false },
        { text: 'Кастомная админ-панель', included: false },
        { text: 'Детальная аналитика', included: false },
      ],
    },
    {
      id: 'business',
      name: 'БИЗНЕС',
      priceSom: 175_000,
      time: '14–18 дней',
      featured: true,
      badge: 'Рекомендуем',
      features: [
        { text: 'Telegram бот + навигация', included: true },
        { text: 'Stripe + PayBox (СНГ)', included: true },
        { text: 'Прогресс пользователей', included: true },
        { text: 'Аналитика через Metabase', included: true },
        { text: 'Админ-панель (Retool)', included: true },
        { text: 'Напоминания / cron-уведомления', included: true },
        { text: 'Кастомный дизайн панели', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'ПРЕМИУМ',
      priceSom: 330_000,
      time: '20–24 дня',
      featured: false,
      badge: null,
      features: [
        { text: 'Telegram бот + навигация', included: true },
        { text: 'Stripe + PayBox (СНГ)', included: true },
        { text: 'Прогресс пользователей', included: true },
        { text: 'Кастомная детальная аналитика', included: true },
        { text: 'Кастомная админ-панель', included: true },
        { text: 'Напоминания / cron-уведомления', included: true },
        { text: 'Retention-воронка + cohorts', included: true },
      ],
    },
  ],
  timeline: [
    { step: 'День 1', desc: 'Созвон и ТЗ', sub: 'фиксируем требования, структуру курса, логику оплат' },
    { step: 'Дни 2–5', desc: 'Разработка бота и бэкенда', sub: 'базовая навигация, оплата, доступ' },
    { step: 'Дни 6–12', desc: 'Админ-панель и аналитика', sub: 'управление контентом, дашборд' },
    { step: 'Финал', desc: 'Деплой + сдача', sub: 'передаём доступы, объясняем как пользоваться' },
  ],
  techStack: [
    {
      label: 'Bot & Frontend',
      items: [
        { name: 'Telegraf 4.x', note: 'TypeScript SDK для Telegram Bot API' },
        { name: 'Scenes & Sessions', note: 'многошаговые диалоги, состояние пользователя' },
        { name: 'Telegram Web App', note: 'опц. — интерактивные мини-приложения' },
      ],
    },
    {
      label: 'Backend & API',
      items: [
        { name: 'Node.js 22 LTS', note: 'ESM modules, native fetch' },
        { name: 'TypeScript 5.6 (strict)', note: 'noImplicitAny, end-to-end типы' },
        { name: 'Fastify 5', note: 'низколатентный HTTP-сервер' },
        { name: 'Zod', note: 'валидация input/output на каждой границе' },
        { name: 'BullMQ + Redis', note: 'отложенные задачи, cron, retries' },
      ],
    },
    {
      label: 'Payments',
      items: [
        { name: 'Stripe Checkout + Subscriptions', note: 'международные карты + рекуррентные платежи' },
        { name: 'PayBox API', note: 'локальные СНГ-платежи (KGS, KZT, RUB)' },
        { name: 'HMAC webhooks', note: 'идемпотентность + защита от подделки' },
        { name: 'Audit log', note: 'все денежные транзакции журналируются' },
      ],
    },
    {
      label: 'Data & Storage',
      items: [
        { name: 'PostgreSQL 16', note: 'Neon / Supabase, point-in-time recovery' },
        { name: 'Prisma ORM', note: 'миграции + type-safe queries' },
        { name: 'Redis 7', note: 'кеш, сессии, очереди' },
        { name: 'Cloudflare R2', note: 'медиафайлы курсов, S3-совместимое API' },
      ],
    },
    {
      label: 'Admin & Analytics',
      items: [
        { name: 'Retool', note: 'админка для контента и пользователей' },
        { name: 'Metabase', note: 'SQL-аналитика и кастомные дашборды' },
        { name: 'PostHog', note: 'event tracking, retention, funnels' },
      ],
    },
    {
      label: 'Infrastructure',
      items: [
        { name: 'Vercel', note: 'API endpoints + edge functions' },
        { name: 'Railway / Fly.io', note: 'long-running bot worker' },
        { name: 'GitHub Actions', note: 'CI/CD + preview environments' },
        { name: 'Encrypted env vars', note: 'Vercel + KMS, никаких секретов в коде' },
      ],
    },
    {
      label: 'Reliability & Security',
      items: [
        { name: 'Sentry', note: 'error tracking + performance' },
        { name: 'Structured logs (pino)', note: 'JSON-логи → Logtail / Datadog' },
        { name: 'Rate limiting', note: 'rate-limiter-flexible, защита от abuse' },
        { name: 'Uptime monitoring', note: 'BetterStack / UptimeRobot' },
      ],
    },
  ],
  techPrinciples: [
    'End-to-end типизация: TypeScript strict + Zod-схемы на границах API и БД',
    'Идемпотентные webhooks: повторная доставка от Stripe/PayBox не дублирует операции',
    'Transactional outbox: гарантированная доставка событий между сервисами',
    'Atomic deployments: zero-downtime + instant rollback на любой предыдущий релиз',
    'Migrations через Prisma: ни одного ручного UPDATE в production',
    'Tests: Vitest (unit + integration) + Playwright (E2E критичных флоу)',
  ],
};

const SAAS: KPTemplate = {
  id: 'saas',
  title: 'MVP для вашего SaaS',
  titleLine2: 'от лендинга до биллинга',
  subtitle:
    'Готовый продукт под подписку: лендинг, авторизация, оплата через Stripe и личный кабинет. Запуск за 3–6 недель.',
  features: [
    { iconId: 'rocket', title: 'Лендинг', sub: 'Конверсионная страница' },
    { iconId: 'lock', title: 'Авторизация', sub: 'Email + OAuth' },
    { iconId: 'credit-card', title: 'Биллинг', sub: 'Stripe Subscriptions' },
    { iconId: 'trending-up', title: 'Дашборд', sub: 'Личный кабинет' },
  ],
  plans: [
    {
      id: 'start',
      name: 'СТАРТ',
      priceSom: 250_000,
      time: '18–22 дня',
      featured: false,
      badge: null,
      features: [
        { text: 'Лендинг + dashboard', included: true },
        { text: 'Email/Password авторизация', included: true },
        { text: 'Stripe подписки (1 план)', included: true },
        { text: 'Базовая аналитика', included: true },
        { text: 'OAuth (Google/GitHub)', included: false },
        { text: 'Несколько тарифов и trial', included: false },
        { text: 'Кастомные интеграции', included: false },
      ],
    },
    {
      id: 'business',
      name: 'БИЗНЕС',
      priceSom: 450_000,
      time: '4–5 недель',
      featured: true,
      badge: 'Рекомендуем',
      features: [
        { text: 'Лендинг + dashboard', included: true },
        { text: 'Email + OAuth (Google/GitHub)', included: true },
        { text: 'Stripe — несколько тарифов + trial', included: true },
        { text: 'Команды / приглашения', included: true },
        { text: 'Админ-панель (Retool)', included: true },
        { text: 'Аналитика через Mixpanel', included: true },
        { text: 'Multi-tenant и white-label', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'ПРЕМИУМ',
      priceSom: 800_000,
      time: '6–8 недель',
      featured: false,
      badge: null,
      features: [
        { text: 'Все из БИЗНЕС', included: true },
        { text: 'Multi-tenant архитектура', included: true },
        { text: 'White-label кастомизация', included: true },
        { text: 'Webhooks + публичное API', included: true },
        { text: 'Кастомные интеграции (3 шт)', included: true },
        { text: 'Cohort-аналитика + retention', included: true },
        { text: 'SOC2-ready логирование', included: true },
      ],
    },
  ],
  timeline: [
    { step: 'Неделя 1', desc: 'ТЗ и дизайн', sub: 'фиксируем фичи, рисуем экраны, согласуем' },
    { step: 'Недели 2–3', desc: 'Auth + биллинг', sub: 'регистрация, Stripe, базовый dashboard' },
    { step: 'Недели 4–5', desc: 'Фичи продукта', sub: 'основной функционал, админка' },
    { step: 'Финал', desc: 'Деплой и сдача', sub: 'передаём доступы, документация, поддержка' },
  ],
  techStack: [
    {
      label: 'Frontend',
      items: [
        { name: 'Next.js 15 (App Router)', note: 'React Server Components + Streaming SSR' },
        { name: 'React 19', note: 'Suspense, transitions, Server Actions' },
        { name: 'TypeScript 5.6 (strict)', note: 'no any, end-to-end типы' },
        { name: 'Tailwind CSS v4', note: 'design tokens, no CSS-in-JS' },
        { name: 'shadcn/ui + Radix', note: 'accessible primitives (WCAG AA)' },
      ],
    },
    {
      label: 'Auth & Identity',
      items: [
        { name: 'NextAuth.js v5 (Auth.js)', note: 'Email + Google + GitHub OAuth' },
        { name: 'JWT + refresh tokens', note: 'rotating tokens, secure cookies' },
        { name: 'Argon2id', note: 'password hashing (memory-hard)' },
        { name: 'WebAuthn / Passkeys', note: 'опц. — passwordless login' },
      ],
    },
    {
      label: 'Backend & API',
      items: [
        { name: 'tRPC v11', note: 'end-to-end типизация без OpenAPI' },
        { name: 'Server Actions', note: 'безопасные мутации, no exposed endpoints' },
        { name: 'Zod', note: 'валидация input/output' },
        { name: 'Inngest / BullMQ', note: 'background jobs, retries, scheduling' },
      ],
    },
    {
      label: 'Billing',
      items: [
        { name: 'Stripe Subscriptions', note: 'metered + per-seat billing' },
        { name: 'Stripe Customer Portal', note: 'self-service для клиентов' },
        { name: 'Idempotent webhooks', note: 'HMAC verification + дедупликация' },
        { name: 'Proration & dunning', note: 'автообработка downgrades / failed cards' },
      ],
    },
    {
      label: 'Data & Storage',
      items: [
        { name: 'PostgreSQL 16', note: 'Supabase / Neon, point-in-time recovery' },
        { name: 'Prisma ORM', note: 'миграции + type-safe queries' },
        { name: 'Row Level Security (RLS)', note: 'multi-tenant изоляция на уровне БД' },
        { name: 'Redis 7', note: 'кеш, сессии, rate limits' },
        { name: 'Cloudflare R2 / S3', note: 'user uploads + CDN' },
      ],
    },
    {
      label: 'Analytics & Product',
      items: [
        { name: 'PostHog', note: 'product analytics, feature flags, A/B' },
        { name: 'Sentry', note: 'error tracking + Replay + RUM' },
        { name: 'Vercel Analytics', note: 'Core Web Vitals' },
        { name: 'Retool', note: 'internal tools для саппорта' },
      ],
    },
    {
      label: 'Infrastructure & DevOps',
      items: [
        { name: 'Vercel', note: 'frontend + API на edge' },
        { name: 'GitHub Actions', note: 'CI/CD + branch deployments' },
        { name: 'Preview environments', note: 'на каждый PR, с изолированной БД' },
        { name: 'Atomic deployments', note: 'instant rollback одним кликом' },
      ],
    },
    {
      label: 'Reliability & Security',
      items: [
        { name: 'OpenTelemetry traces', note: 'распределённая трассировка' },
        { name: 'Structured logs (pino)', note: 'JSON → Logtail / Datadog' },
        { name: 'Rate limiting (Redis)', note: 'sliding window per user/IP' },
        { name: 'CSP / Helmet', note: 'security headers' },
        { name: 'Secret rotation', note: 'регулярный ротейт API-ключей' },
      ],
    },
  ],
  techPrinciples: [
    'End-to-end типизация: TypeScript strict + tRPC + Zod — никакого any',
    'Multi-tenant safe by default: Row Level Security в Postgres на каждой таблице',
    'Идемпотентные webhooks: Stripe events дедуплицируются по event ID',
    'Audit log: каждое изменение критичных данных записывается с user_id + diff',
    'SOC2-ready: encryption at rest, access logs, retention policy с первого дня',
    'Tests: Vitest + Playwright + Stripe webhook signature tests + chaos tests',
    'Observability с первого дня: traces, structured logs, alerts на ключевые SLO',
  ],
};

const MVP: KPTemplate = {
  id: 'mvp',
  title: 'MVP вашего продукта',
  titleLine2: 'fullstack за 4–8 недель',
  subtitle:
    'От идеи до работающего продукта: дизайн, фронтенд, бэкенд, авторизация и админка. Готовое решение, которое можно показать инвесторам и пользователям.',
  features: [
    { iconId: 'brush', title: 'Дизайн', sub: 'UI/UX под продукт' },
    { iconId: 'atom', title: 'Frontend', sub: 'React / Next.js' },
    { iconId: 'gear', title: 'Backend', sub: 'API + база данных' },
    { iconId: 'wrench', title: 'Админка', sub: 'Управление контентом' },
  ],
  plans: [
    {
      id: 'start',
      name: 'СТАРТ',
      priceSom: 180_000,
      time: '3–4 недели',
      featured: false,
      badge: null,
      features: [
        { text: 'До 5 экранов', included: true },
        { text: 'Авторизация (email)', included: true },
        { text: 'База данных + API', included: true },
        { text: 'Базовая админка', included: true },
        { text: 'Интеграция платежей', included: false },
        { text: 'Кастомный дизайн', included: false },
        { text: 'Мобильная адаптация', included: false },
      ],
    },
    {
      id: 'business',
      name: 'БИЗНЕС',
      priceSom: 350_000,
      time: '5–6 недель',
      featured: true,
      badge: 'Рекомендуем',
      features: [
        { text: 'До 12 экранов', included: true },
        { text: 'Авторизация (email + OAuth)', included: true },
        { text: 'База данных + REST API', included: true },
        { text: 'Кастомный дизайн', included: true },
        { text: 'Мобильная адаптация', included: true },
        { text: 'Интеграция платежей', included: true },
        { text: 'Аналитика и события', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'ПРЕМИУМ',
      priceSom: 650_000,
      time: '7–8 недель',
      featured: false,
      badge: null,
      features: [
        { text: 'Без ограничения экранов', included: true },
        { text: 'Все типы авторизации', included: true },
        { text: 'API + админка (Retool)', included: true },
        { text: 'Кастомный дизайн', included: true },
        { text: 'Платежи (Stripe + PayBox)', included: true },
        { text: 'Аналитика (Mixpanel/Amplitude)', included: true },
        { text: 'Уведомления (email + push)', included: true },
      ],
    },
  ],
  timeline: [
    { step: 'Неделя 1', desc: 'Discovery и дизайн', sub: 'обсуждаем продукт, рисуем экраны' },
    { step: 'Недели 2–3', desc: 'Backend и API', sub: 'база, авторизация, основные эндпоинты' },
    { step: 'Недели 4–6', desc: 'Frontend и UI', sub: 'верстаем экраны, подключаем API' },
    { step: 'Финал', desc: 'Тестирование и сдача', sub: 'фиксим баги, передаём проект' },
  ],
  techStack: [
    {
      label: 'Frontend',
      items: [
        { name: 'Next.js 15 (App Router)', note: 'RSC + Streaming SSR' },
        { name: 'React 19 + TypeScript 5.6', note: 'strict mode, no any' },
        { name: 'Tailwind CSS v4', note: 'design tokens' },
        { name: 'Framer Motion', note: 'анимации и переходы' },
      ],
    },
    {
      label: 'Backend & API',
      items: [
        { name: 'Node.js 22 LTS', note: '' },
        { name: 'API Routes / tRPC', note: 'выбор по требованиям проекта' },
        { name: 'Zod', note: 'валидация на границах' },
        { name: 'Server Actions', note: 'безопасные мутации' },
      ],
    },
    {
      label: 'Auth',
      items: [
        { name: 'NextAuth.js v5', note: 'Email + OAuth (Google/GitHub)' },
        { name: 'JWT sessions', note: 'secure HTTP-only cookies' },
        { name: 'Argon2id', note: 'password hashing' },
      ],
    },
    {
      label: 'Data & Storage',
      items: [
        { name: 'PostgreSQL 16', note: 'Supabase / Neon' },
        { name: 'Prisma ORM', note: 'миграции + типы' },
        { name: 'Cloudinary / R2', note: 'медиа CDN' },
      ],
    },
    {
      label: 'Admin & Ops',
      items: [
        { name: 'Retool', note: 'админ-панель' },
        { name: 'Sentry', note: 'error tracking + performance' },
        { name: 'PostHog', note: 'product analytics' },
      ],
    },
    {
      label: 'Infrastructure',
      items: [
        { name: 'Vercel', note: 'frontend + API на edge' },
        { name: 'GitHub Actions', note: 'CI/CD + preview deploys' },
        { name: 'Preview environments', note: 'на каждый PR' },
      ],
    },
  ],
  techPrinciples: [
    'TypeScript strict end-to-end — никакого any',
    'Migrations через Prisma — атомарные деплои',
    'Структурированные логи + Sentry с первого дня',
    'Tests: Vitest (unit + integration) минимум',
    'Preview environments на каждый PR с изолированной БД',
    'Atomic deployments + instant rollback',
  ],
};

export const TEMPLATES: Record<TemplateId, KPTemplate> = {
  courses: COURSES,
  saas: SAAS,
  mvp: MVP,
};

export function getTemplate(id: string | undefined | null): KPTemplate {
  if (id && id in TEMPLATES) {
    return TEMPLATES[id as TemplateId];
  }
  return COURSES;
}

const SOM_PER_USD = 86;

export function formatPrice(priceSom: number, currency: Currency): string {
  if (currency === 'usd') {
    const usd = Math.round(priceSom / SOM_PER_USD / 10) * 10;
    return `$${usd.toLocaleString('en-US')}`;
  }
  return `${priceSom.toLocaleString('ru-RU')} сом`;
}

export function docId(client: string): string {
  if (!client) return 'KP-DRAFT';
  let hash = 0;
  for (let i = 0; i < client.length; i++) {
    hash = (hash * 31 + client.charCodeAt(i)) >>> 0;
  }
  const code = hash.toString(36).toUpperCase().slice(0, 6).padStart(6, '0');
  const year = new Date().getFullYear();
  return `KP-${year}-${code}`;
}
