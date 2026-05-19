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
  icon: string;
  title: string;
  sub: string;
};

export type TimelineRow = {
  step: string;
  desc: string;
  sub: string;
};

export type KPTemplate = {
  id: TemplateId;
  title: string;
  titleLine2?: string;
  subtitle: string;
  features: FeatureCard[];
  plans: Plan[];
  timeline: TimelineRow[];
};

export const WHY_ITEMS = [
  {
    icon: '⌨',
    title: 'Опыт в Web2 и Web3',
    desc: 'Разрабатываем сложные системы от мобильных приложений до блокчейн-протоколов',
  },
  {
    icon: '🌐',
    title: 'Понимаем рынок СНГ',
    desc: 'Бишкек, Казахстан, Россия — знаем локальные платёжные решения',
  },
  {
    icon: '🛡',
    title: 'Фиксированная цена',
    desc: 'Договариваемся о стоимости до старта. Никаких сюрпризов в конце',
  },
  {
    icon: '🔄',
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
    { icon: '💬', title: 'Telegram бот', sub: 'Продажа и доставка уроков' },
    { icon: '💳', title: 'Приём оплат', sub: 'Stripe + локальные СНГ' },
    { icon: '🖥', title: 'Админ-панель', sub: 'Управление курсом' },
    { icon: '📊', title: 'Аналитика', sub: 'Прогресс каждого ученика' },
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
};

const SAAS: KPTemplate = {
  id: 'saas',
  title: 'MVP для вашего SaaS',
  titleLine2: 'от лендинга до биллинга',
  subtitle:
    'Готовый продукт под подписку: лендинг, авторизация, оплата через Stripe и личный кабинет. Запуск за 3–6 недель.',
  features: [
    { icon: '🚀', title: 'Лендинг', sub: 'Конверсионная страница' },
    { icon: '🔐', title: 'Авторизация', sub: 'Email + OAuth' },
    { icon: '💳', title: 'Биллинг', sub: 'Stripe Subscriptions' },
    { icon: '📈', title: 'Дашборд', sub: 'Личный кабинет' },
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
};

const MVP: KPTemplate = {
  id: 'mvp',
  title: 'MVP вашего продукта',
  titleLine2: 'fullstack за 4–8 недель',
  subtitle:
    'От идеи до работающего продукта: дизайн, фронтенд, бэкенд, авторизация и админка. Готовое решение, которое можно показать инвесторам и пользователям.',
  features: [
    { icon: '🎨', title: 'Дизайн', sub: 'UI/UX под продукт' },
    { icon: '⚛', title: 'Frontend', sub: 'React / Next.js' },
    { icon: '⚙', title: 'Backend', sub: 'API + база данных' },
    { icon: '🛠', title: 'Админка', sub: 'Управление контентом' },
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
