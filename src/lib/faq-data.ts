export type FAQCategory =
  | "pricing"
  | "timeline"
  | "legal"
  | "support"
  | "web3"
  | "process"
  | "quality"
  | "tech"
  | "design"
  | "general";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: { en: string; ru: string };
  answer: { en: string; ru: string };
}

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    category: "pricing",
    question: {
      en: "How does pricing work?",
      ru: "Как устроено ценообразование?",
    },
    answer: {
      en: "We offer three package tiers with fixed scope and pricing. For custom projects, we do a paid discovery phase first, then provide a fixed-price proposal. No hourly billing surprises.",
      ru: "У нас три пакетных уровня с фиксированным объёмом и ценой. Для индивидуальных проектов сначала проводим платное исследование, затем даём предложение с фиксированной ценой. Никаких сюрпризов с почасовой оплатой.",
    },
  },
  {
    id: "faq-2",
    category: "timeline",
    question: {
      en: "What are typical timelines?",
      ru: "Какие типичные сроки?",
    },
    answer: {
      en: "Landing pages: 7–14 days. MVPs: 3–6 weeks. Full products: 6–12+ weeks. Actual timeline depends on scope complexity and feedback cycles.",
      ru: "Лендинги: 7–14\u00A0дней. MVP: 3–6\u00A0недель. Полные продукты: 6–12+\u00A0недель. Реальные сроки зависят от сложности объёма и циклов обратной связи.",
    },
  },
  {
    id: "faq-3",
    category: "legal",
    question: {
      en: "Who owns the code and design?",
      ru: "Кому принадлежит код и дизайн?",
    },
    answer: {
      en: "You do. Full IP transfer upon final payment. Source code, design files, documentation — everything is yours.",
      ru: "Вам. Полная передача IP после финального платежа. Исходный код, файлы дизайна, документация — всё ваше.",
    },
  },
  {
    id: "faq-4",
    category: "legal",
    question: {
      en: "Do you sign NDAs?",
      ru: "Вы подписываете NDA?",
    },
    answer: {
      en: "Yes. We sign NDAs before any discovery work begins. Standard mutual NDA or your company's template — both work.",
      ru: "Да. Подписываем NDA до начала любой работы по исследованию. Стандартный взаимный NDA или шаблон вашей компании — оба варианта подходят.",
    },
  },
  {
    id: "faq-5",
    category: "support",
    question: {
      en: "What about post-launch support?",
      ru: "Что насчёт поддержки после запуска?",
    },
    answer: {
      en: "All packages include a support period (2 weeks to 1 month depending on package). Beyond that, we offer monthly support retainers with SLAs.",
      ru: "Все пакеты включают период поддержки (от 2\u00A0недель до 1\u00A0месяца в зависимости от пакета). Далее предлагаем ежемесячные контракты поддержки с SLA.",
    },
  },
  {
    id: "faq-6",
    category: "web3",
    question: {
      en: "What Web3 work do you do?",
      ru: "Какую Web3 работу вы делаете?",
    },
    answer: {
      en: "Wallet integrations, token contracts (ERC-20, ERC-721, etc.), staking modules, DEX integrations, and Web3 frontend. We don't do smart contract audits ourselves but coordinate with audit firms.",
      ru: "Интеграции кошельков, токен-контракты (ERC-20, ERC-721 и др.), модули стейкинга, интеграции с DEX и Web3 фронтенд. Аудит смарт-контрактов сами не делаем, но координируем с аудиторскими фирмами.",
    },
  },
  {
    id: "faq-7",
    category: "process",
    question: {
      en: "Can you do just a module, not a full project?",
      ru: "Можете сделать только модуль, не весь проект?",
    },
    answer: {
      en: "Yes. We often integrate specific modules (KYC, payments, Web3 features) into existing products. We'll need to assess your current architecture first.",
      ru: "Да. Мы часто интегрируем конкретные модули (KYC, платежи, Web3 фичи) в существующие продукты. Нужно будет сначала оценить вашу текущую архитектуру.",
    },
  },
  {
    id: "faq-8",
    category: "process",
    question: {
      en: "What if I don't have a spec?",
      ru: "Что если у меня нет спецификации?",
    },
    answer: {
      en: "That's what discovery is for. We help you clarify requirements, define scope, and create a spec during the discovery phase. Most projects start this way.",
      ru: "Для этого и нужно исследование. Мы помогаем уточнить требования, определить объём и создать спецификацию во время фазы исследования. Большинство проектов начинаются так.",
    },
  },
  {
    id: "faq-9",
    category: "quality",
    question: {
      en: "How do you ensure quality?",
      ru: "Как вы обеспечиваете качество?",
    },
    answer: {
      en: "Automated tests, code review on every PR, pre-deployment checklists, and staging environments. We don't ship untested code to production.",
      ru: "Автоматические тесты, код-ревью на каждом PR, чеклисты перед запуском и тестовые окружения. Мы не отправляем непротестированный код в продакшн.",
    },
  },
  {
    id: "faq-10",
    category: "general",
    question: {
      en: "Do you work with international clients?",
      ru: "Работаете ли вы с международными клиентами?",
    },
    answer: {
      en: "Yes. We have offices in Bishkek, Dubai, Istanbul, Chicago and Shenzhen and work with clients globally. Remote-first, timezone-flexible, async-friendly.",
      ru: "Да. У нас офисы в Бишкеке, Дубае, Стамбуле, Чикаго и Шэньчжэне, работаем с клиентами по всему миру. Удалённо, гибко по часовым поясам, асинхронно.",
    },
  },
  {
    id: "faq-11",
    category: "tech",
    question: {
      en: "What about mobile apps?",
      ru: "Что насчёт мобильных приложений?",
    },
    answer: {
      en: "We focus on web products. For mobile, we build responsive web apps or PWAs. If you need native iOS/Android, we can recommend partners.",
      ru: "Мы фокусируемся на веб-продуктах. Для мобильных делаем адаптивные веб-приложения или PWA. Если нужен нативный iOS/Android, можем порекомендовать партнёров.",
    },
  },
  {
    id: "faq-12",
    category: "process",
    question: {
      en: "How do you handle communication?",
      ru: "Как вы ведёте коммуникацию?",
    },
    answer: {
      en: "Weekly demos (recorded), async updates in Slack/Telegram, and a shared project board. You always know what's happening.",
      ru: "Еженедельные демо (с записью), асинхронные обновления в Slack/Telegram и общая доска проекта. Вы всегда знаете, что происходит.",
    },
  },
  {
    id: "faq-13",
    category: "tech",
    question: {
      en: "What's your tech stack?",
      ru: "Какой у вас технологический стек?",
    },
    answer: {
      en: "Frontend: React, Next.js, TypeScript. Backend: Node.js, Go, PostgreSQL. Web3: Solidity, ethers.js. Infrastructure: AWS, Vercel, Docker. We adapt to project needs.",
      ru: "Фронтенд: React, Next.js, TypeScript. Бэкенд: Node.js, Go, PostgreSQL. Web3: Solidity, ethers.js. Инфраструктура: AWS, Vercel, Docker. Адаптируемся под нужды проекта.",
    },
  },
  {
    id: "faq-14",
    category: "design",
    question: {
      en: "Do you do design or just development?",
      ru: "Вы делаете дизайн или только разработку?",
    },
    answer: {
      en: "Both. We offer end-to-end: UX/UI design in Figma, design systems, and full implementation. You can also bring your own design.",
      ru: "И то, и другое. Мы предлагаем полный цикл: UX/UI дизайн в Figma, дизайн-системы и полную реализацию. Можете также прийти со своим дизайном.",
    },
  },
  {
    id: "faq-15",
    category: "process",
    question: {
      en: "What if I need changes during the project?",
      ru: "Что если мне нужны изменения во время проекта?",
    },
    answer: {
      en: "Small adjustments within scope are expected. Larger changes go through a change request process — we document impact on timeline and cost, you decide.",
      ru: "Небольшие корректировки в рамках объёма ожидаемы. Более крупные изменения проходят через процесс запроса на изменение — документируем влияние на сроки и стоимость, вы решаете.",
    },
  },
  {
    id: "faq-16",
    category: "pricing",
    question: {
      en: "How do payments work?",
      ru: "Как работают платежи?",
    },
    answer: {
      en: "Milestone-based. Typically: 30% upfront, 30% at midpoint, 40% at delivery. For larger projects, we can do monthly billing tied to deliverables.",
      ru: "По вехам. Обычно: 30% аванс, 30% в середине, 40% при сдаче. Для крупных проектов можем делать ежемесячные платежи, привязанные к результатам.",
    },
  },
  {
    id: "faq-17",
    category: "process",
    question: {
      en: "What happens if you miss a deadline?",
      ru: "Что если вы пропустите дедлайн?",
    },
    answer: {
      en: "We commit to realistic timelines and communicate proactively if risks arise. If we miss due to our fault, we work extra hours at no cost. Hasn't happened yet.",
      ru: "Мы берём на себя реалистичные сроки и заранее сообщаем при возникновении рисков. Если пропускаем по нашей вине, работаем дополнительные часы без доплаты. Пока не случалось.",
    },
  },
  {
    id: "faq-18",
    category: "tech",
    question: {
      en: "Can you take over an existing codebase?",
      ru: "Можете ли вы взять на себя существующую кодовую базу?",
    },
    answer: {
      en: "Yes, after an assessment. We do a paid code review first to understand the state of the codebase, then propose a realistic plan.",
      ru: "Да, после оценки. Сначала делаем платный код-ревью, чтобы понять состояние кодовой базы, затем предлагаем реалистичный план.",
    },
  },
  {
    id: "faq-19",
    category: "support",
    question: {
      en: "Do you provide hosting?",
      ru: "Вы предоставляете хостинг?",
    },
    answer: {
      en: "We set up infrastructure on your cloud account (AWS, Vercel, etc.). You own and control it. We can manage it for you on a support retainer.",
      ru: "Мы настраиваем инфраструктуру на вашем облачном аккаунте (AWS, Vercel и др.). Вы владеете и контролируете её. Можем управлять ею за вас по контракту поддержки.",
    },
  },
  {
    id: "faq-20",
    category: "general",
    question: {
      en: "How do I get started?",
      ru: "Как начать?",
    },
    answer: {
      en: "Fill out the contact form or book a 45-minute scoping call. We'll discuss your project and provide an estimate within 24 hours.",
      ru: "Заполните контактную форму или запишитесь на 45-минутный созвон. Обсудим ваш проект и предоставим оценку в течение 24\u00A0часов.",
    },
  },
];

export function getFAQItems(limit?: number): FAQItem[] {
  if (limit) {
    return faqItems.slice(0, limit);
  }
  return faqItems;
}
