export type Language = "en" | "ru";

export const translations = {
  // Navigation
  nav: {
    home: { en: "Home", ru: "Главная" },
    services: { en: "Services", ru: "Услуги" },
    cases: { en: "Cases", ru: "Кейсы" },
    process: { en: "Process", ru: "Процесс" },
    faq: { en: "FAQ", ru: "FAQ" },
    about: { en: "About", ru: "О нас" },
    contact: { en: "Contact", ru: "Контакты" },
  },

  // CTAs
  cta: {
    primary: {
      en: "Get an estimate in 24\u00A0hours",
      ru: "Получить оценку за 24\u00A0часа",
    },
    secondary: {
      en: "Book a 20-min scoping call",
      ru: "Звонок на 20\u00A0минут",
    },
    viewCase: { en: "View case", ru: "Смотреть кейс" },
    viewAll: { en: "View all", ru: "Смотреть все" },
    finalLine1: { en: "We don't want briefs.", ru: "Нам не нужны брифы." },
    finalLine2: { en: "We want problems. That's where the magic happens.", ru: "Нам нужны задачи. Там и рождается результат." },
    finalAction: { en: "Get an estimate in 24\u00A0hours", ru: "Получить оценку за 24\u00A0часа" },
    learnMore: { en: "Learn more", ru: "Подробнее" },
    getStarted: { en: "Get started", ru: "Начать" },
    sendRequest: { en: "Send request", ru: "Отправить заявку" },
  },

  // Hero
  hero: {
    tagline: {
      en: "Build · Ship · Iterate",
      ru: "Собираем · Запускаем · Улучшаем",
    },
    title: {
      en: "End-to-end development: websites, MVPs, and complex startup products.",
      ru: "Разработка под ключ: сайты, MVP и сложные стартап-продукты.",
    },
    titleAccent: {
      en: "End-to-end development:",
      ru: "Разработка под ключ:",
    },
    titleRest: {
      en: "websites, MVPs, and complex startup products.",
      ru: "сайты, MVP и сложные стартап\u2011продукты.",
    },
    heroMetric: {
      en: "24h",
      ru: "24\u00A0ч",
    },
    heroMetricLabel: {
      en: "estimate response",
      ru: "ответ по оценке",
    },
    subtitle: {
      en: "Design, frontend, backend, admin panels, integrations, infrastructure, and launch. Web2 + Web3 — in one delivery loop.",
      ru: "Дизайн, фронтенд, backend, админ-панели, интеграции, инфраструктура и запуск. Web2 + Web3 — в одном цикле поставки.",
    },
    trustLine: {
      en: "Milestone-based delivery. Transparent updates. NDA on request.",
      ru: "Работаем по этапам. Прозрачная отчётность. NDA по запросу.",
    },
  },

  // What we build
  whatWeBuild: {
    title: { en: "What we build", ru: "Что мы делаем" },
    items: [
      {
        title: { en: "Websites & landing pages", ru: "Сайты и лендинги" },
        description: {
          en: "High-converting pages with clear UX, fast load, and SEO.",
          ru: "Конверсионные страницы с понятным UX, быстрой загрузкой и SEO.",
        },
      },
      {
        title: { en: "MVP & startup products", ru: "MVP и стартап-продукты" },
        description: {
          en: "From idea to working product in weeks, not months.",
          ru: "От идеи до работающего продукта за недели, не месяцы.",
        },
      },
      {
        title: { en: "Web3 modules & integrations", ru: "Web3 модули и интеграции" },
        description: {
          en: "Wallets, tokens, smart contracts, DeFi modules.",
          ru: "Кошельки, токены, смарт-контракты, DeFi модули.",
        },
      },
    ],
  },

  // Why us
  whyUs: {
    title: { en: "Why teams choose us", ru: "Почему выбирают нас" },
    statsLine: { en: "40+ projects · 5+ years", ru: "40+\u00A0проектов · 5+\u00A0лет" },
    items: [
      {
        title: { en: "End-to-end delivery", ru: "Полный цикл" },
        description: {
          en: "One partner from design to deployment. No vendor juggling.",
          ru: "Один партнёр от дизайна до деплоя. Без жонглирования подрядчиками.",
        },
      },
      {
        title: { en: "Engineering discipline", ru: "Инженерная дисциплина" },
        description: {
          en: "Tests, release checklists, documented decisions. Not cowboy coding.",
          ru: "Тесты, чеклисты релизов, документированные решения. Не код «на коленке».",
        },
      },
      {
        title: { en: "Product thinking", ru: "Продуктовое мышление" },
        description: {
          en: "We track KPIs and funnels, not just ship features.",
          ru: "Отслеживаем KPI и воронки, а не просто отгружаем фичи.",
        },
      },
      {
        title: { en: "Transparent process", ru: "Прозрачный процесс" },
        description: {
          en: "Weekly demos, async updates, no surprises.",
          ru: "Еженедельные демо, асинхронные обновления, без сюрпризов.",
        },
      },
      {
        title: { en: "Speed with quality gates", ru: "Скорость с контролем качества" },
        description: {
          en: "Scoped delivery, not endless sprints. Ship fast, ship right.",
          ru: "Чёткие границы поставки, не бесконечные спринты. Быстро и качественно.",
        },
      },
    ],
  },

  // Packages
  packages: {
    title: { en: "Packages", ru: "Пакеты услуг" },
    subtitle: {
      en: "Clear scope. Fixed timeline. Predictable outcomes.",
      ru: "Чёткий объём. Фиксированные сроки. Предсказуемый результат.",
    },
    compareTitle: {
      en: "Compare packages",
      ru: "Сравнение пакетов",
    },
    compareSubtitle: {
      en: "A quick view of speed, depth, risk control and support.",
      ru: "Быстрый взгляд на скорость, глубину, контроль рисков и поддержку.",
    },
    scopeTitle: {
      en: "Scope summary",
      ru: "Сводка по пакету",
    },
    scopeSubtitle: {
      en: "What you get at this level",
      ru: "Что входит в этот уровень",
    },
    items: [
      {
        id: "launch-site",
        title: { en: "Launch Site", ru: "Быстрый старт" },
        timeline: { en: "7–14 days", ru: "7–14\u00A0дней" },
        description: {
          en: "Landing page or corporate site that converts. Design, development, deployment.",
          ru: "Лендинг или корпоративный сайт, который конвертирует. Дизайн, разработка, запуск.",
        },
        forWhom: {
          en: "For founders launching a product, agencies needing a fast turnkey site.",
          ru: "Для основателей, запускающих продукт, агентств, которым нужен быстрый сайт под ключ.",
        },
        deliverables: {
          en: [
            "Responsive design (Figma)",
            "Next.js / React implementation",
            "CMS integration (optional)",
            "SEO setup & analytics",
            "Deployment & SSL",
          ],
          ru: [
            "Адаптивный дизайн (Figma)",
            "Реализация на Next.js / React",
            "Интеграция CMS (опционально)",
            "SEO и аналитика",
            "Деплой и SSL",
          ],
        },
        result: {
          en: "Live site with source code, CMS access, and documentation.",
          ru: "Работающий сайт с исходниками, доступом к CMS и документацией.",
        },
      },
      {
        id: "mvp-sprint",
        title: { en: "MVP Sprint", ru: "MVP-спринт" },
        timeline: { en: "3–6 weeks", ru: "3–6\u00A0недель" },
        description: {
          en: "Working product with core features. Validate your idea with real users.",
          ru: "Работающий продукт с ключевыми фичами. Проверьте идею на реальных пользователях.",
        },
        forWhom: {
          en: "For startups testing market fit, founders preparing for investment rounds.",
          ru: "Для стартапов, тестирующих product-market fit, основателей перед раундом.",
        },
        deliverables: {
          en: [
            "UX/UI design",
            "Frontend + Backend",
            "Admin panel",
            "API documentation",
            "Staging & production deploy",
            "2 weeks post-launch support",
          ],
          ru: [
            "UX/UI дизайн",
            "Фронтенд + Бэкенд",
            "Админ-панель",
            "Документация API",
            "Тестовый и боевой сервер",
            "2\u00A0недели поддержки после запуска",
          ],
        },
        result: {
          en: "Production-ready MVP with source code, infrastructure, and handover docs.",
          ru: "MVP, готовый к запуску, с исходниками, инфраструктурой и документацией.",
        },
      },
      {
        id: "startup-key",
        title: { en: "Startup Under Key", ru: "Стартап под ключ" },
        timeline: { en: "6–12+ weeks", ru: "6–12+\u00A0недель" },
        description: {
          en: "Full product build with complex features, integrations, and scale considerations.",
          ru: "Полная сборка продукта со сложными фичами, интеграциями и учётом масштабирования.",
        },
        forWhom: {
          en: "For funded startups, enterprises building new digital products.",
          ru: "Для профинансированных стартапов, компаний, создающих новые цифровые продукты.",
        },
        deliverables: {
          en: [
            "Discovery & architecture",
            "Design system",
            "Full-stack development",
            "Third-party integrations",
            "DevOps & CI/CD",
            "Security audit",
            "1 month post-launch support",
          ],
          ru: [
            "Исследование и архитектура",
            "Дизайн-система",
            "Полная разработка",
            "Интеграции с внешними сервисами",
            "DevOps и CI/CD",
            "Аудит безопасности",
            "1\u00A0месяц поддержки после запуска",
          ],
        },
        result: {
          en: "Scalable product with full ownership transfer, technical docs, and support plan.",
          ru: "Масштабируемый продукт с полной передачей прав, тех. документацией и планом поддержки.",
        },
      },
      {
        id: "web3-addon",
        title: { en: "Web3 Add-on", ru: "Web3-модуль" },
        timeline: { en: "Modular", ru: "Модульно" },
        description: {
          en: "Blockchain modules for existing or new products. Wallets, tokens, DeFi.",
          ru: "Блокчейн-модули для существующих или новых продуктов. Кошельки, токены, DeFi.",
        },
        forWhom: {
          en: "For teams adding Web3 to existing products or building crypto-native apps.",
          ru: "Для команд, добавляющих Web3 в существующие продукты или создающих крипто-нативные приложения.",
        },
        deliverables: {
          en: [
            "Wallet integration (MetaMask, WalletConnect, etc.)",
            "Token contracts (ERC-20, ERC-721, etc.)",
            "Staking / vesting modules",
            "DEX integration",
            "Smart contract audit coordination",
          ],
          ru: [
            "Интеграция кошельков (MetaMask, WalletConnect и др.)",
            "Токен-контракты (ERC-20, ERC-721 и др.)",
            "Модули стейкинга / вестинга",
            "Интеграция с DEX",
            "Координация аудита смарт-контрактов",
          ],
        },
        result: {
          en: "Working Web3 features integrated into your product with documentation.",
          ru: "Работающие Web3 фичи, интегрированные в ваш продукт, с документацией.",
        },
      },
    ],
  },

  // Process
  process: {
    title: { en: "How we work", ru: "Как мы работаем" },
    subtitle: {
      en: "Four phases. Clear deliverables. No black boxes.",
      ru: "Четыре фазы. Чёткие результаты. Никаких чёрных ящиков.",
    },
    steps: [
      {
        number: "01",
        title: { en: "Discovery & Scope", ru: "Исследование и объём" },
        duration: { en: "3–5 days", ru: "3–5\u00A0дней" },
        description: {
          en: "We understand your goals, constraints, and success criteria. Map risks, define scope.",
          ru: "Понимаем цели, ограничения и критерии успеха. Карта рисков, определение объёма работ.",
        },
        deliverables: {
          en: [
            "Project brief with KPIs",
            "Risk assessment",
            "Technical approach",
            "Timeline & milestones",
            "Fixed-scope proposal",
          ],
          ru: [
            "Бриф проекта с KPI",
            "Оценка рисков",
            "Технический подход",
            "График и вехи",
            "Предложение с фиксированным объёмом",
          ],
        },
      },
      {
        number: "02",
        title: { en: "Design & Architecture", ru: "Дизайн и архитектура" },
        duration: { en: "1–2 weeks", ru: "1–2\u00A0недели" },
        description: {
          en: "Create UX flows, visual design, and technical architecture. Validate before coding.",
          ru: "Создаём UX-сценарии, визуальный дизайн и техническую архитектуру. Проверяем до кода.",
        },
        deliverables: {
          en: [
            "Wireframes & user flows",
            "UI design in Figma",
            "Design system components",
            "Architecture diagram",
            "API contracts (draft)",
            "Prioritized backlog",
          ],
          ru: [
            "Вайрфреймы и пользовательские сценарии",
            "UI-дизайн в Figma",
            "Компоненты дизайн-системы",
            "Схема архитектуры",
            "Контракты API (черновик)",
            "Приоритизированный бэклог",
          ],
        },
      },
      {
        number: "03",
        title: { en: "Build & QA", ru: "Разработка и тестирование" },
        duration: { en: "Varies", ru: "Зависит от объёма" },
        description: {
          en: "Iterative development with weekly demos. Tests, code review, continuous integration.",
          ru: "Итеративная разработка с еженедельными демо. Тесты, код-ревью, непрерывная интеграция.",
        },
        deliverables: {
          en: [
            "Working code in staging",
            "Weekly demo recordings",
            "Test coverage reports",
            "Release checklists",
            "Progress updates (async)",
          ],
          ru: [
            "Рабочий код на тестовом сервере",
            "Записи еженедельных демо",
            "Отчёты о покрытии тестами",
            "Чеклисты релизов",
            "Обновления прогресса (асинхронно)",
          ],
        },
      },
      {
        number: "04",
        title: { en: "Launch & Support", ru: "Запуск и поддержка" },
        duration: { en: "1–4 weeks", ru: "1–4\u00A0недели" },
        description: {
          en: "Production deploy, monitoring setup, knowledge transfer. Optional ongoing support.",
          ru: "Запуск в продакшн, настройка мониторинга, передача знаний. Опционально — постоянная поддержка.",
        },
        deliverables: {
          en: [
            "Production deployment",
            "Monitoring & alerts",
            "Technical documentation",
            "Handover session",
            "Support SLA (optional)",
          ],
          ru: [
            "Запуск в продакшн",
            "Мониторинг и оповещения",
            "Техническая документация",
            "Сессия передачи",
            "SLA поддержки (опционально)",
          ],
        },
      },
    ],
  },

  // Cases
  cases: {
    title: { en: "Selected work", ru: "Избранные работы" },
    subtitle: {
      en: "Real projects. Real outcomes. Names changed for NDA compliance.",
      ru: "Реальные проекты. Реальные результаты. Имена изменены согласно NDA.",
    },
    scenariosCount: { en: "47 scenarios", ru: "47 сценариев" },
    filterAll: { en: "All", ru: "Все" },
    filterWeb: { en: "Web", ru: "Веб" },
    filterProduct: { en: "Product", ru: "Продукт" },
    filterWeb3: { en: "Web3", ru: "Web3" },
    filterInfra: { en: "Infrastructure", ru: "Инфраструктура" },
    featured: { en: "Featured cases", ru: "Ключевые кейсы" },
    keyCases: { en: "Key case studies", ru: "Ключевые кейсы" },
    micro: { en: "More work", ru: "Другие работы" },
  },

  // FAQ
  faq: {
    title: { en: "Frequently asked questions", ru: "Частые вопросы" },
    subtitle: {
      en: "Straight answers. No fluff.",
      ru: "Прямые ответы. Без воды.",
    },
    viewAll: { en: "View all FAQ", ru: "Все вопросы" },
    searchPlaceholder: {
      en: "Search by topic or keyword...",
      ru: "Поиск по теме или ключевому слову...",
    },
    categories: {
      all: { en: "All", ru: "Все" },
      pricing: { en: "Pricing", ru: "Цена" },
      timeline: { en: "Timeline", ru: "Сроки" },
      legal: { en: "Legal", ru: "Юр." },
      support: { en: "Support", ru: "Поддержка" },
      web3: { en: "Web3", ru: "Web3" },
      process: { en: "Process", ru: "Процесс" },
      quality: { en: "Quality", ru: "Качество" },
      tech: { en: "Tech", ru: "Тех." },
      design: { en: "Design", ru: "Дизайн" },
      general: { en: "General", ru: "Общее" },
    },
    copyLink: { en: "Copy link", ru: "Скопировать ссылку" },
    copied: { en: "Copied", ru: "Скопировано" },
  },

  // About
  about: {
    title: { en: "About Anteyko", ru: "Об Anteyko" },
    subtitle: {
      en: "CTO-grade engineering meets product delivery.",
      ru: "Инженерия уровня CTO + продуктовая поставка.",
    },
    story: {
      en: `We're a technical studio that builds products, not just features. Founded by engineers who've shipped at scale, we bring discipline from enterprise tech to startup speed.

Our approach: treat every project like we're building it for ourselves. That means proper architecture, real tests, and decisions we can defend.

We work with founders, product teams, and enterprises across Kyrgyzstan, Dubai, and globally. Remote-first, timezone-flexible, async-friendly.`,
      ru: `Мы — техническая студия, которая создаёт продукты, а не просто функции. Основана инженерами с опытом масштабных запусков, мы привносим дисциплину из корпоративных проектов в скорость стартапов.

Наш подход: относиться к каждому проекту так, будто строим его для себя. Это значит правильная архитектура, настоящие тесты и решения, которые можно обосновать.

Работаем с основателями, продуктовыми командами и компаниями в Кыргызстане, Дубае и по всему миру. Удалённо, гибко по часовым поясам, асинхронно.`,
    },
    values: {
      title: { en: "What we stand for", ru: "Наши принципы" },
      items: [
        {
          title: { en: "Clarity over cleverness", ru: "Ясность важнее хитрости" },
          description: {
            en: "Code that anyone can understand and maintain.",
            ru: "Код, который любой может понять и поддерживать.",
          },
          evidence: {
            en: "Architecture notes + ADRs for every critical decision.",
            ru: "Архитектурные заметки и ADR для ключевых решений.",
          },
        },
        {
          title: { en: "Predictability over promises", ru: "Предсказуемость важнее обещаний" },
          description: {
            en: "Realistic timelines. No hero mode.",
            ru: "Реалистичные сроки. Без «героического режима».",
          },
          evidence: {
            en: "Milestone planning with explicit scope gates.",
            ru: "Планирование по вехам с контрольными точками.",
          },
        },
        {
          title: { en: "Speed with quality gates", ru: "Скорость с контролем качества" },
          description: {
            en: "Fast doesn't mean sloppy. We have checklists.",
            ru: "Быстро — не значит небрежно. У нас есть чеклисты.",
          },
          evidence: {
            en: "Verification report before every release.",
            ru: "Отчёт верификации перед каждым релизом.",
          },
        },
      ],
    },
    metrics: [
      { value: "40+", label: { en: "projects shipped", ru: "проектов запущено" } },
      { value: "5+", label: { en: "years in delivery", ru: "лет в поставке" } },
      { value: "24h", label: { en: "estimate response", ru: "ответ по оценке" } },
    ],
    toolchain: {
      title: { en: "Quality & delivery stack", ru: "Стек качества и поставки" },
      items: [
        {
          title: { en: "Test discipline", ru: "Тест‑дисциплина" },
          description: { en: "Integration catalog + regression coverage.", ru: "Каталог интеграций + регресс." },
        },
        {
          title: { en: "Release gates", ru: "Контроль релизов" },
          description: { en: "7-phase verification report before deploy.", ru: "7‑фазный отчёт перед запуском." },
        },
        {
          title: { en: "Docs & handover", ru: "Документация и передача" },
          description: { en: "Runbooks, ADRs, onboarding notes.", ru: "Инструкции, ADR, материалы для адаптации." },
        },
        {
          title: { en: "Monitoring", ru: "Мониторинг" },
          description: { en: "Alerts, error budgets, incident flow.", ru: "Оповещения, бюджет ошибок, управление инцидентами." },
        },
      ],
    },
    geography: {
      title: { en: "Where we work", ru: "Где мы работаем" },
      description: {
        en: "Based in Bishkek, Kyrgyzstan. Active in Dubai, UAE. Serving clients globally.",
        ru: "Базируемся в Бишкеке, Кыргызстан. Активны в Дубае, ОАЭ. Работаем с клиентами по всему миру.",
      },
    },
  },

  // Contact
  contact: {
    title: { en: "Let's talk", ru: "Давайте поговорим" },
    subtitle: {
      en: "Tell us about your project. We'll get back within 24 hours.",
      ru: "Расскажите о проекте. Ответим в течение 24\u00A0часов.",
    },
    progressLabel: { en: "Brief completion", ru: "Заполнение брифа" },
    nextSteps: {
      title: { en: "What happens next", ru: "Что будет дальше" },
      items: [
        {
          title: { en: "We review your brief", ru: "Мы изучаем бриф" },
          description: { en: "Assess scope, risks, and timeline.", ru: "Оцениваем объём, риски и сроки." },
        },
        {
          title: { en: "We send an estimate", ru: "Мы отправляем оценку" },
          description: { en: "Usually within 24 hours.", ru: "Обычно в течение 24\u00A0часов." },
        },
        {
          title: { en: "Optional scoping call", ru: "Опциональный созвон" },
          description: { en: "Align on priorities and next steps.", ru: "Синхронизируем приоритеты и шаги." },
        },
      ],
    },
    form: {
      projectType: { en: "Project type", ru: "Тип проекта" },
      projectTypes: {
        website: { en: "Website / Landing", ru: "Сайт / Лендинг" },
        mvp: { en: "MVP", ru: "MVP" },
        product: { en: "Full product", ru: "Полный продукт" },
        web3: { en: "Web3 module", ru: "Web3 модуль" },
      },
      stage: { en: "Current stage", ru: "Текущий этап" },
      stages: {
        idea: { en: "Just an idea", ru: "Только идея" },
        design: { en: "Have design", ru: "Есть дизайн" },
        mvp: { en: "Have MVP", ru: "Есть MVP" },
        launch: { en: "Need launch help", ru: "Нужна помощь с запуском" },
      },
      timeline: { en: "Timeline", ru: "Сроки" },
      timelines: {
        urgent: { en: "2 weeks", ru: "2\u00A0недели" },
        normal: { en: "1–2 months", ru: "1–2\u00A0месяца" },
        relaxed: { en: "3+ months", ru: "3+ месяца" },
      },
      budget: { en: "Budget range", ru: "Бюджет" },
      budgets: {
        small: { en: "$5k – $15k", ru: "$5k – $15k" },
        medium: { en: "$15k – $50k", ru: "$15k – $50k" },
        large: { en: "$50k – $150k", ru: "$50k – $150k" },
        enterprise: { en: "$150k+", ru: "$150k+" },
      },
      name: { en: "Name", ru: "Имя" },
      email: { en: "Email", ru: "Email" },
      message: { en: "Tell us about your project", ru: "Расскажите о проекте" },
      submit: { en: "Send request", ru: "Отправить заявку" },
      submitting: { en: "Sending...", ru: "Отправляем..." },
    },
    success: {
      title: { en: "Request received", ru: "Заявка получена" },
      description: {
        en: "We'll review your project and get back within 24 hours with next steps.",
        ru: "Мы рассмотрим ваш проект и ответим в течение 24\u00A0часов с дальнейшими шагами.",
      },
      next: {
        en: "What you can expect next",
        ru: "Что дальше",
      },
    },
  },

  // Footer
  footer: {
    tagline: {
      en: "End-to-end product development. Web2 + Web3.",
      ru: "Продуктовая разработка под ключ. Web2 + Web3.",
    },
    copyright: {
      en: "© 2021–2026 Anteyko. All rights reserved.",
      ru: "© 2021–2026 Anteyko. Все права защищены.",
    },
    links: {
      privacy: { en: "Privacy", ru: "Конфиденциальность" },
      terms: { en: "Terms", ru: "Условия" },
    },
  },

  // Common
  common: {
    loading: { en: "Loading...", ru: "Загрузка..." },
    error: { en: "Something went wrong", ru: "Что-то пошло не так" },
    back: { en: "Back", ru: "Назад" },
    next: { en: "Next", ru: "Далее" },
    close: { en: "Close", ru: "Закрыть" },
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(
  key: string,
  lang: Language
): string {
  const keys = key.split(".");
  let value: unknown = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  if (value && typeof value === "object" && lang in value) {
    return (value as Record<string, string>)[lang];
  }

  return key;
}
