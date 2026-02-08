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
      en: "40+ projects delivered. Dubai & Kyrgyzstan. Milestone-based. NDA on request.",
      ru: "40+ проектов. Дубай и Кыргызстан. Работаем по этапам. NDA по запросу.",
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
        startingPrice: { en: "From $3k", ru: "От $3k" },
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
        startingPrice: { en: "From $10k", ru: "От $10k" },
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
        startingPrice: { en: "From $30k", ru: "От $30k" },
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
    title: { en: "We build products that work after launch", ru: "Мы строим продукты, которые работают после запуска" },
    subtitle: {
      en: "Engineering studio from Bishkek and Dubai. 40+ products. From MVP to L1 blockchain.",
      ru: "Инженерная студия из Бишкека и Дубая. 40+ продуктов. От MVP до L1 блокчейна.",
    },
    story: {
      why: {
        en: "We started Anteyko because we were tired of agencies that ship code and disappear. No one owned the outcome \u2014 the design team blamed the developers, the developers blamed the specs, and the client got a product that looked good in a demo but broke in production. We wanted to build a studio where engineers own the result, not just the task.",
        ru: "Мы основали Anteyko, потому что устали от агентств, которые сдают код и исчезают. Никто не отвечал за результат \u2014 дизайнеры винили разработчиков, разработчики \u2014 спецификации, а клиент получал продукт, который отлично выглядел на демо, но ломался в продакшне. Мы хотели построить студию, где инженеры отвечают за результат, а не просто закрывают задачи.",
      },
      how: {
        en: "Every project we take gets the same treatment: architecture review before the first line of code, automated tests that run on every commit, a 7-phase release checklist before any deploy, and a handover package that lets your team take over without a single \u201Cwhat does this do?\u201D. We\u2019ve shipped a Layer-1 blockchain with a built-in DEX, a real-time P2P food delivery platform, a tokenization platform for a Dubai investment company, and a banking app with a double-entry ledger \u2014 all with zero post-launch critical failures.",
        ru: "Каждый проект получает одинаковый подход: ревью архитектуры до первой строки кода, автотесты на каждый коммит, 7\u2011фазный чеклист релиза перед каждым деплоем и пакет передачи, который позволяет вашей команде подхватить проект без единого \u00ABа что это делает?\u00BB. Мы запустили L1 блокчейн со встроенной DEX, P2P\u2011платформу доставки еды в реальном времени, платформу токенизации для инвестиционной компании из Дубая и банковское приложение с леджером двойной записи \u2014 всё с нулём критических сбоев после запуска.",
      },
      who: {
        en: "Our clients are founders who need their first product built right, CTOs who need extra firepower for a complex sprint, and enterprises digitizing operations. We work across fintech, Web3, FoodTech, SaaS, and e-commerce \u2014 in Kyrgyzstan, Dubai, Moscow, and remotely with teams worldwide.",
        ru: "Наши клиенты \u2014 основатели, которым нужен первый продукт, построенный правильно, CTO, которым нужна дополнительная огневая мощь на сложный спринт, и компании, цифровизирующие операции. Работаем в финтехе, Web3, FoodTech, SaaS и e\u2011commerce \u2014 в Кыргызстане, Дубае, Москве и удалённо с командами по всему миру.",
      },
    },
    values: {
      title: { en: "How we think", ru: "Как мы думаем" },
      items: [
        {
          title: { en: "Clarity over cleverness", ru: "Ясность важнее хитрости" },
          description: {
            en: "We write code that a new engineer can understand in 30 minutes, not 3 days. Every non-obvious decision is documented in an Architecture Decision Record with the reasoning, alternatives considered, and trade-offs accepted.",
            ru: "Мы пишем код, который новый инженер поймёт за 30 минут, а не за 3 дня. Каждое неочевидное решение документируется в Architecture Decision Record с обоснованием, рассмотренными альтернативами и принятыми компромиссами.",
          },
          evidence: {
            en: "Result: one client\u2019s in-house team shipped their first feature 8 days after our handover \u2014 without asking us a single question.",
            ru: "Результат: in\u2011house команда клиента выпустила первую фичу через 8 дней после передачи \u2014 без единого вопроса к нам.",
          },
        },
        {
          title: { en: "Predictability over promises", ru: "Предсказуемость важнее обещаний" },
          description: {
            en: "We don\u2019t say \u201C2 months, probably.\u201D We break the project into phases with explicit scope gates, deliver working increments every 1\u20132 weeks, and flag risks the moment we see them \u2014 not when the deadline is missed.",
            ru: "Мы не говорим \u00AB2 месяца, наверное\u00BB. Разбиваем проект на фазы с явными контрольными точками, поставляем рабочие инкременты каждые 1\u20112 недели и сигнализируем о рисках в момент обнаружения \u2014 а не когда дедлайн сорван.",
          },
          evidence: {
            en: "Result: zero missed deadlines on fixed-scope projects in the last 18 months.",
            ru: "Результат: ноль сорванных дедлайнов на проектах с фиксированным объёмом за последние 18 месяцев.",
          },
        },
        {
          title: { en: "Speed with quality gates", ru: "Скорость с контролем качества" },
          description: {
            en: "Fast doesn\u2019t mean sloppy. Every release passes a 7-phase automated verification pipeline: build, unit tests, integration tests, contract checks, environment parity, smoke tests, and security checklist. If it\u2019s red, it doesn\u2019t ship.",
            ru: "Быстро \u2014 не значит небрежно. Каждый релиз проходит 7\u2011фазный автоматизированный пайплайн верификации: сборка, юнит\u2011тесты, интеграционные тесты, проверки контрактов, паритет окружений, smoke\u2011тесты, чеклист безопасности. Если красный \u2014 не деплоим.",
          },
          evidence: {
            en: "Result: zero post-launch rollbacks across all projects in the past 12 months.",
            ru: "Результат: ноль откатов после запуска по всем проектам за последние 12 месяцев.",
          },
        },
        {
          title: { en: "Ownership, not outsourcing", ru: "Ответственность, а не аутсорс" },
          description: {
            en: "We don\u2019t just execute tickets. We challenge requirements that don\u2019t make sense, suggest cheaper alternatives when they exist, flag architectural risks before they become production incidents, and push back on deadlines that would compromise quality.",
            ru: "Мы не просто закрываем тикеты. Мы оспариваем требования, которые не имеют смысла, предлагаем более дешёвые альтернативы когда они есть, сигнализируем об архитектурных рисках до того, как они станут инцидентами, и отстаиваем качество когда дедлайны его компрометируют.",
          },
          evidence: {
            en: "Result: saved a client $40K by replacing a planned microservices architecture with a modular monolith that covered 100% of their actual requirements.",
            ru: "Результат: сэкономили клиенту $40K, заменив запланированную микросервисную архитектуру модульным монолитом, который покрыл 100% реальных требований.",
          },
        },
      ],
    },
    metrics: [
      { value: "40+", label: { en: "products shipped", ru: "продуктов запущено" } },
      { value: "5+", label: { en: "years in delivery", ru: "лет в поставке" } },
      { value: "24h", label: { en: "response time", ru: "время ответа" } },
      { value: "0", label: { en: "failed launches", ru: "провальных запусков" } },
    ],
    industries: {
      title: { en: "Industries we know", ru: "Индустрии, которые мы знаем" },
      items: [
        { name: { en: "FinTech / Banking", ru: "FinTech / Банкинг" }, count: "3", icon: "bank" },
        { name: { en: "Web3 / DeFi / Tokenization", ru: "Web3 / DeFi / Токенизация" }, count: "4", icon: "chain" },
        { name: { en: "FoodTech / Marketplace", ru: "FoodTech / Маркетплейс" }, count: "3", icon: "cart" },
        { name: { en: "Enterprise / SaaS", ru: "Enterprise / SaaS" }, count: "3", icon: "building" },
      ],
    },
    toolchain: {
      title: { en: "How we guarantee quality", ru: "Как мы гарантируем качество" },
      items: [
        {
          title: { en: "Automated testing", ru: "Автоматизированное тестирование" },
          description: { en: "Every commit triggers unit, integration, and contract tests. Average coverage across projects: 85%+.", ru: "Каждый коммит запускает юнит\u2011, интеграционные и контрактные тесты. Среднее покрытие: 85%+." },
        },
        {
          title: { en: "7-phase release gates", ru: "7\u2011фазный контроль релизов" },
          description: { en: "No code reaches production without passing all 7 verification stages. Zero post-launch rollbacks in 12 months.", ru: "Ни один код не попадает в прод без прохождения всех 7 стадий верификации. Ноль откатов за 12 месяцев." },
        },
        {
          title: { en: "Documentation-first handover", ru: "Передача через документацию" },
          description: { en: "ADRs, runbooks, video walkthroughs, onboarding guide. Your team ships independently within days, not months.", ru: "ADR, инструкции, видео\u2011разборы, гайд онбординга. Ваша команда работает самостоятельно за дни, не месяцы." },
        },
        {
          title: { en: "Production monitoring", ru: "Мониторинг продакшна" },
          description: { en: "Prometheus metrics, error budgets, alerting pipelines, and incident response runbooks \u2014 included by default.", ru: "Метрики Prometheus, бюджет ошибок, пайплайны алертинга и runbook\u2011и реагирования \u2014 включены по умолчанию." },
        },
      ],
    },
    geography: {
      title: { en: "Bishkek. Dubai. Your timezone.", ru: "Бишкек. Дубай. Ваш часовой пояс." },
      description: {
        en: "Core team in Bishkek (GMT+6) and Dubai (GMT+4). Clients in Moscow, Bishkek, Dubai, and across 5+ countries. We operate async-first with daily standups adapted to your timezone \u2014 whether you\u2019re in New York or Singapore.",
        ru: "Основная команда в Бишкеке (GMT+6) и Дубае (GMT+4). Клиенты в Москве, Бишкеке, Дубае и 5+ странах. Работаем async\u2011first с ежедневными стендапами, адаптированными под ваш часовой пояс \u2014 будь вы в Нью\u2011Йорке или Сингапуре.",
      },
    },
    closingCta: {
      en: "Every great product starts with a conversation. Tell us what you\u2019re building.",
      ru: "Каждый великий продукт начинается с разговора. Расскажите, что вы строите.",
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
        micro: { en: "Up to $5k", ru: "До $5k" },
        small: { en: "$5k – $15k", ru: "$5k – $15k" },
        medium: { en: "$15k – $30k", ru: "$15k – $30k" },
        large: { en: "$30k – $75k", ru: "$30k – $75k" },
        enterprise: { en: "$75k – $200k", ru: "$75k – $200k" },
        custom: { en: "$200k+", ru: "$200k+" },
        unsure: { en: "Let\u2019s discuss", ru: "Обсудим" },
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
