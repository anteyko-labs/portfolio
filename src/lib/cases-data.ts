import { Language } from "./translations";

export type CaseCategory = "web" | "product" | "web3" | "infrastructure";

export interface CaseMetric {
  label: { en: string; ru: string };
  value: string;
}

export interface QualityGate {
  name: { en: string; ru: string };
  passed: boolean;
}

export interface FlagshipCase {
  id: string;
  slug: string;
  category: CaseCategory;
  year: number;
  title: { en: string; ru: string };
  summary: { en: string; ru: string };
  metrics?: CaseMetric[];
  artifactHint?: { en: string; ru: string };
  industry: { en: string; ru: string };
  timeline: { en: string; ru: string };
  problem: { en: string; ru: string };
  constraints: { en: string[]; ru: string[] };
  solution: { en: string; ru: string };
  deliverables: { en: string[]; ru: string[] };
  techStack: string[];
  outcome: { en: string; ru: string };
  hardParts: { title: { en: string; ru: string }; description: { en: string; ru: string } }[];
  qualityGates?: QualityGate[];
}

export interface MicroCase {
  id: string;
  category: CaseCategory;
  title: { en: string; ru: string };
  what: { en: string; ru: string };
  outcome: { en: string; ru: string };
}

export const flagshipCases: FlagshipCase[] = [
  {
    id: "case-1",
    slug: "web3-l1-dex",
    category: "web3",
    year: 2025,
    title: {
      en: "Infrastructure-grade Web3: L1 + DEX delivery",
      ru: "Инфраструктурный Web3: L1 + DEX поставка",
    },
    summary: {
      en: "Architecture, testing discipline, release control. Focus: predictability, reproducibility, explainability.",
      ru: "Архитектура, тест-дисциплина, релиз-контроль. Фокус: предсказуемость, воспроизводимость, объяснимость.",
    },
    metrics: [
      { label: { en: "Integration scenarios", ru: "Сценариев интеграции" }, value: "47" },
      { label: { en: "Critical incidents at launch", ru: "Критичных инцидентов при запуске" }, value: "0" },
    ],
    artifactHint: { en: "IT-01…IT-05 catalog", ru: "Каталог IT-01…IT-05" },
    industry: { en: "Blockchain / DeFi", ru: "Блокчейн / DeFi" },
    timeline: { en: "4 months", ru: "4\u00A0месяца" },
    problem: {
      en: "The client needed a production-ready L1 blockchain with a DEX interface. Existing solutions were either too rigid or lacked the testing infrastructure required for a financial product.",
      ru: "Клиенту требовался готовый к продакшну L1 блокчейн с DEX-интерфейсом. Существующие решения были либо слишком жёсткими, либо не имели тестовой инфраструктуры, необходимой для финансового продукта.",
    },
    constraints: {
      en: [
        "Must handle 1000+ TPS on testnet before mainnet",
        "Full audit trail for all contract deployments",
        "Multi-region RPC failover required",
        "Team had limited blockchain experience",
      ],
      ru: [
        "Необходимо обрабатывать 1000+ TPS на тестнете до мейннета",
        "Полный аудит-трейл для всех деплоев контрактов",
        "Требуется мультирегиональный RPC failover",
        "Команда имела ограниченный опыт в блокчейне",
      ],
    },
    solution: {
      en: "Built a modular architecture with clear boundaries between consensus, execution, and interface layers. Created an integration test catalog (IT-01 through IT-05) covering wallet flows, swap mechanics, liquidity operations, and edge cases. Implemented pre-deployment verification system with automated checks.",
      ru: "Построили модульную архитектуру с чёткими границами между уровнями консенсуса, исполнения и интерфейса. Создали каталог интеграционных тестов (IT-01 - IT-05), покрывающий флоу кошельков, механики свопов, операции с ликвидностью и граничные случаи. Внедрили систему предеплойной верификации с автоматическими проверками.",
    },
    deliverables: {
      en: [
        "L1 node implementation with custom consensus",
        "DEX smart contracts (AMM + order book hybrid)",
        "Web interface with wallet integration",
        "Integration test suite (47 scenarios)",
        "Pre-deployment verification system",
        "Developer onboarding documentation",
        "RPC provider failover infrastructure",
      ],
      ru: [
        "Реализация L1 ноды с кастомным консенсусом",
        "Смарт-контракты DEX (гибрид AMM + ордербук)",
        "Веб-интерфейс с интеграцией кошельков",
        "Набор интеграционных тестов (47 сценариев)",
        "Система предеплойной верификации",
        "Документация для адаптации разработчиков",
        "Инфраструктура RPC failover",
      ],
    },
    techStack: ["Rust", "Solidity", "React", "TypeScript", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    outcome: {
      en: "Mainnet launched with zero critical incidents in first 3 months. Test suite caught 12 potential issues before they reached production. Onboarding time for new developers reduced from 2 weeks to 3 days.",
      ru: "Мейннет запущен без критических инцидентов в первые 3\u00A0месяца. Тестовый набор выявил 12\u00A0потенциальных проблем до продакшна. Время адаптации новых разработчиков сократилось с 2\u00A0недель до 3\u00A0дней.",
    },
    hardParts: [
      {
        title: { en: "Integration Test Catalog", ru: "Каталог интеграционных тестов" },
        description: {
          en: "Created IT-01 through IT-05 covering wallet connection edge cases, swap slippage scenarios, liquidity removal under load, and cross-chain bridge verification.",
          ru: "Создали IT-01 - IT-05, покрывающие граничные случаи подключения кошельков, сценарии slippage при свопах, удаление ликвидности под нагрузкой и верификацию кросс-чейн моста.",
        },
      },
      {
        title: { en: "RPC Provider Strategy", ru: "Стратегия RPC провайдеров" },
        description: {
          en: "Built automatic failover between 3 RPC providers with health checks, latency monitoring, and graceful degradation. Users never see connection errors.",
          ru: "Построили автоматический failover между 3 RPC провайдерами с проверками здоровья, мониторингом латентности и graceful degradation. Пользователи никогда не видят ошибок подключения.",
        },
      },
      {
        title: { en: "Wallet Compatibility Matrix", ru: "Матрица совместимости кошельков" },
        description: {
          en: "Documented and tested behavior across MetaMask, WalletConnect, Coinbase Wallet, and hardware wallets. Each has quirks; we handle them all.",
          ru: "Задокументировали и протестировали поведение на MetaMask, WalletConnect, Coinbase Wallet и аппаратных кошельках. У каждого свои особенности — мы обрабатываем все.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Unit tests", ru: "Юнит-тесты" }, passed: true },
      { name: { en: "Integration tests (IT-01–IT-05)", ru: "Интеграционные тесты (IT-01–IT-05)" }, passed: true },
      { name: { en: "Contract verification", ru: "Верификация контрактов" }, passed: true },
      { name: { en: "Testnet deployment", ru: "Деплой на тестнет" }, passed: true },
      { name: { en: "Wallet compatibility", ru: "Совместимость кошельков" }, passed: true },
      { name: { en: "Security audit", ru: "Аудит безопасности" }, passed: true },
    ],
  },
  {
    id: "case-2",
    slug: "utility-token-uae",
    category: "web3",
    year: 2025,
    title: {
      en: "Utility token for a real business (UAE)",
      ru: "Утилити-токен для реального бизнеса (ОАЭ)",
    },
    summary: {
      en: "Product logic + compliance-aware design: discounts, access, bonuses, staking without guarantees.",
      ru: "Продуктовая логика + дизайн с учётом compliance: скидки, доступ, бонусы, стейкинг без гарантий.",
    },
    metrics: [
      { label: { en: "Token holders (first month)", ru: "Держателей токена (первый месяц)" }, value: "2,400+" },
      { label: { en: "Compliance flags", ru: "Compliance-флагов" }, value: "0" },
    ],
    artifactHint: { en: "Compliance pack", ru: "Compliance‑пакет" },
    industry: { en: "Retail / Loyalty", ru: "Ретейл / Лояльность" },
    timeline: { en: "6 weeks", ru: "6\u00A0недель" },
    problem: {
      en: "A UAE-based retail group wanted to launch a loyalty token that provided real utility (discounts, early access, bonuses) while staying compliant with local regulations.",
      ru: "Ретейл-группа из ОАЭ хотела запустить токен лояльности с реальной утилити (скидки, ранний доступ, бонусы), соблюдая местное регулирование.",
    },
    constraints: {
      en: [
        "No investment promises — pure utility",
        "Must work with existing POS systems",
        "Non-technical stakeholders need admin access",
        "Arabic + English interface required",
      ],
      ru: [
        "Никаких инвестиционных обещаний — чистая утилити",
        "Должен работать с существующими POS системами",
        "Нетехническим стейкхолдерам нужен админ-доступ",
        "Требуется интерфейс на арабском + английском",
      ],
    },
    solution: {
      en: "Designed token mechanics that explicitly avoid yield/return language. Built staking as 'lock for benefits' not 'earn interest'. Created an admin dashboard for non-technical managers to adjust discount tiers and track usage.",
      ru: "Спроектировали механику токена, явно избегая языка доходности/возврата. Построили стейкинг как «блокировка для бенефитов», а не «заработок процентов». Создали админ-панель для нетехнических менеджеров для настройки скидочных уровней и отслеживания использования.",
    },
    deliverables: {
      en: [
        "ERC-20 utility token contract",
        "Staking contract (benefit-based, no yield)",
        "Admin dashboard",
        "POS integration API",
        "User web app (AR/EN)",
        "Compliance documentation",
      ],
      ru: [
        "ERC-20 контракт утилити-токена",
        "Контракт стейкинга (на основе бенефитов, без доходности)",
        "Админ-панель",
        "API для интеграции с POS",
        "Веб-приложение для пользователей (AR/EN)",
        "Документация по compliance",
      ],
    },
    techStack: ["Solidity", "Hardhat", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    outcome: {
      en: "Launched in 3 retail locations. 2,400+ token holders in first month. Zero compliance flags during legal review. Admin team manages token parameters without developer involvement.",
      ru: "Запущен в 3 точках ретейла. 2400+ держателей токена в первый месяц. Ноль compliance-флагов при юридической проверке. Админ-команда управляет параметрами токена без участия разработчиков.",
    },
    hardParts: [
      {
        title: { en: "Compliance-First Token Design", ru: "Compliance-first дизайн токена" },
        description: {
          en: "Every feature reviewed against UAE virtual asset guidelines. Staking described as 'commitment for access' not 'investment for return'.",
          ru: "Каждая функция проверена на соответствие UAE virtual asset guidelines. Стейкинг описан как «обязательство для доступа», а не «инвестиция для возврата».",
        },
      },
      {
        title: { en: "Non-Technical Admin Interface", ru: "Интерфейс для нетехнических админов" },
        description: {
          en: "Business managers can adjust discount tiers, pause features, and view analytics without touching code or contracts.",
          ru: "Бизнес-менеджеры могут настраивать уровни скидок, приостанавливать функции и смотреть аналитику без касания кода или контрактов.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Contract tests", ru: "Тесты контрактов" }, passed: true },
      { name: { en: "Compliance review", ru: "Compliance ревью" }, passed: true },
      { name: { en: "POS integration", ru: "Интеграция с POS" }, passed: true },
      { name: { en: "AR/EN localization", ru: "Локализация AR/EN" }, passed: true },
      { name: { en: "Admin UAT", ru: "UAT админки" }, passed: true },
    ],
  },
  {
    id: "case-3",
    slug: "enterprise-modules",
    category: "product",
    year: 2024,
    title: {
      en: "Enterprise modules: KYC / dashboard / private sale / security",
      ru: "Корпоративные модули: KYC / дашборд / private sale / безопасность",
    },
    summary: {
      en: "Building a digital perimeter around business processes and stakeholder requirements.",
      ru: "Сборка цифрового контура вокруг бизнес-процессов и стейкхолдерских требований.",
    },
    metrics: [
      { label: { en: "KYC applications processed", ru: "KYC заявок обработано" }, value: "800+" },
      { label: { en: "SOC 2 audit", ru: "SOC 2 аудит" }, value: "First pass" },
    ],
    artifactHint: { en: "KYC + Vesting flows", ru: "KYC + Vesting флоу" },
    industry: { en: "Fintech / Enterprise", ru: "Финтех / Энтерпрайз" },
    timeline: { en: "3 months", ru: "3\u00A0месяца" },
    problem: {
      en: "A fintech company needed to run a private token sale with proper KYC, investor dashboards, and security measures. Existing SaaS solutions didn't meet their compliance requirements.",
      ru: "Финтех-компании нужно было провести private token sale с надлежащим KYC, дашбордами для инвесторов и мерами безопасности. Существующие SaaS решения не соответствовали их требованиям compliance.",
    },
    constraints: {
      en: [
        "SOC 2 Type II compliance required",
        "Multi-jurisdiction KYC (US, EU, MENA)",
        "Real-time reporting for board meetings",
        "Integration with existing CRM",
      ],
      ru: [
        "Требуется соответствие SOC 2 Type II",
        "Мультиюрисдикционный KYC (US, EU, MENA)",
        "Отчётность в реальном времени для совета директоров",
        "Интеграция с существующей CRM",
      ],
    },
    solution: {
      en: "Built modular system: KYC module with multi-provider support, investor dashboard with real-time allocation tracking, private sale flow with vesting, and security layer with role-based access. All audit-logged.",
      ru: "Построили модульную систему: KYC модуль с поддержкой нескольких провайдеров, дашборд инвестора с отслеживанием аллокации в реальном времени, флоу private sale с вестингом и уровень безопасности с ролевым доступом. Всё с аудит-логами.",
    },
    deliverables: {
      en: [
        "KYC module (Jumio + Sumsub integration)",
        "Investor dashboard",
        "Private sale smart contracts",
        "Vesting schedule management",
        "Role-based admin system",
        "Audit logging infrastructure",
        "Security documentation",
      ],
      ru: [
        "KYC модуль (интеграция Jumio + Sumsub)",
        "Дашборд инвестора",
        "Смарт-контракты private sale",
        "Управление вестинг-расписанием",
        "Ролевая админ-система",
        "Инфраструктура аудит-логирования",
        "Документация по безопасности",
      ],
    },
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Solidity", "AWS", "Terraform"],
    outcome: {
      en: "Passed SOC 2 audit on first attempt. Processed 800+ KYC applications with 94% pass rate. Zero security incidents. Board reports generated in <5 seconds.",
      ru: "Прошли SOC 2 аудит с первой попытки. Обработано 800+ KYC заявок с 94% успешностью. Ноль инцидентов безопасности. Отчёты для совета директоров генерируются за <5 секунд.",
    },
    hardParts: [
      {
        title: { en: "Multi-Provider KYC", ru: "Мультипровайдерный KYC" },
        description: {
          en: "Abstracted KYC providers behind unified interface. If Jumio fails, falls back to Sumsub. Business logic unchanged.",
          ru: "Абстрагировали KYC провайдеров за единым интерфейсом. Если Jumio падает, переключаемся на Sumsub. Бизнес-логика не меняется.",
        },
      },
      {
        title: { en: "Audit Trail Architecture", ru: "Архитектура аудит-трейла" },
        description: {
          en: "Every action logged with actor, timestamp, IP, and state diff. Immutable append-only storage. Queryable for compliance reports.",
          ru: "Каждое действие логируется с актором, таймстампом, IP и диффом состояния. Иммутабельное append-only хранилище. Доступно для compliance-отчётов.",
        },
      },
      {
        title: { en: "Role-Based Security Model", ru: "Ролевая модель безопасности" },
        description: {
          en: "Granular permissions: viewer, analyst, manager, admin. Each role sees exactly what they need, nothing more.",
          ru: "Гранулярные права: viewer, analyst, manager, admin. Каждая роль видит ровно то, что нужно — ничего больше.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Unit tests", ru: "Юнит-тесты" }, passed: true },
      { name: { en: "KYC provider integration", ru: "Интеграция KYC провайдеров" }, passed: true },
      { name: { en: "Security audit", ru: "Аудит безопасности" }, passed: true },
      { name: { en: "SOC 2 checklist", ru: "Чеклист SOC 2" }, passed: true },
      { name: { en: "Audit trail verification", ru: "Верификация аудит-трейла" }, passed: true },
      { name: { en: "Role-based access tests", ru: "Тесты ролевого доступа" }, passed: true },
    ],
  },
  {
    id: "case-4",
    slug: "geo-heatmap-backend",
    category: "infrastructure",
    year: 2024,
    title: {
      en: "Geo/Heatmap backend: real-time aggregation",
      ru: "Гео/Heatmap бэкенд: агрегация в реальном времени",
    },
    summary: {
      en: "Density/presence aggregation, API, scaling.",
      ru: "Агрегация плотности/присутствия, API, масштабирование.",
    },
    metrics: [
      { label: { en: "Events/minute", ru: "Событий/мин" }, value: "150K" },
      { label: { en: "p95 latency", ru: "p95 латентность" }, value: "180ms" },
    ],
    artifactHint: { en: "Heatmap pipeline", ru: "Heatmap‑пайплайн" },
    industry: { en: "Location Intelligence", ru: "Локационная аналитика" },
    timeline: { en: "8 weeks", ru: "8\u00A0недель" },
    problem: {
      en: "Client needed to visualize foot traffic patterns across hundreds of locations in real-time. Existing solutions couldn't handle the data volume or provide the granularity needed.",
      ru: "Клиенту требовалось визуализировать паттерны пешеходного трафика по сотням локаций в реальном времени. Существующие решения не справлялись с объёмом данных и не обеспечивали нужную гранулярность.",
    },
    constraints: {
      en: [
        "100K+ events per minute peak load",
        "Sub-second query response time",
        "Historical data retention for 2 years",
        "API must be public (rate-limited)",
      ],
      ru: [
        "100K+ событий в минуту в пике",
        "Время ответа на запрос менее секунды",
        "Хранение исторических данных 2\u00A0года",
        "API должен быть публичным (с rate-limiting)",
      ],
    },
    solution: {
      en: "Built streaming pipeline with geo-resolution at multiple zoom levels. Pre-aggregated data into time buckets. Separated hot (recent) and cold (historical) storage. Implemented tiered caching with Redis.",
      ru: "Построили streaming-пайплайн с гео-разрешением на нескольких уровнях зума. Предагрегировали данные во временные бакеты. Разделили горячее (недавнее) и холодное (историческое) хранилище. Реализовали многоуровневое кеширование с Redis.",
    },
    deliverables: {
      en: [
        "Event ingestion pipeline",
        "Real-time aggregation engine",
        "Heatmap tile server",
        "REST API with OpenAPI spec",
        "Rate limiting and auth system",
        "Monitoring dashboards",
      ],
      ru: [
        "Пайплайн приёма событий",
        "Движок агрегации в реальном времени",
        "Сервер тайлов heatmap",
        "REST API с OpenAPI спецификацией",
        "Rate limiting и система аутентификации",
        "Дашборды мониторинга",
      ],
    },
    techStack: ["Go", "Apache Kafka", "ClickHouse", "Redis", "PostgreSQL", "Docker", "Kubernetes"],
    outcome: {
      en: "Handles 150K events/minute comfortably. 95th percentile query latency: 180ms. API serves 50+ third-party integrations. Reduced infrastructure cost 60% vs previous solution.",
      ru: "Уверенно обрабатывает 150K событий/минуту. 95-й перцентиль латентности запросов: 180мс. API обслуживает 50+ сторонних интеграций. Снижение затрат на инфраструктуру на 60% vs предыдущего решения.",
    },
    hardParts: [
      {
        title: { en: "Geo Resolution Strategy", ru: "Стратегия гео-разрешения" },
        description: {
          en: "H3 hexagonal grid for consistent aggregation across zoom levels. Pre-compute at multiple resolutions to avoid runtime calculations.",
          ru: "H3 гексагональная сетка для консистентной агрегации на всех уровнях зума. Предвычисление на нескольких разрешениях для избежания рантайм-вычислений.",
        },
      },
      {
        title: { en: "Hot/Cold Storage Split", ru: "Разделение горячего/холодного хранилища" },
        description: {
          en: "Last 24h in Redis for instant access. 30 days in ClickHouse for fast analytics. Beyond that: compressed in S3, queryable via Athena.",
          ru: "Последние 24\u00A0ч в Redis для мгновенного доступа. 30\u00A0дней в ClickHouse для быстрой аналитики. Старше: сжатое в S3, доступно через Athena.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Unit tests", ru: "Юнит-тесты" }, passed: true },
      { name: { en: "Load testing (150K events/min)", ru: "Нагрузочное тестирование (150K событий/мин)" }, passed: true },
      { name: { en: "Latency benchmarks", ru: "Бенчмарки латентности" }, passed: true },
      { name: { en: "API contract tests", ru: "Тесты API контрактов" }, passed: true },
      { name: { en: "Rate limiting verification", ru: "Проверка rate limiting" }, passed: true },
    ],
  },
  {
    id: "case-5",
    slug: "anti-refund-payment",
    category: "product",
    year: 2025,
    title: {
      en: "Anti-refund payment flow: deposit UX",
      ru: "Anti-refund платёжный флоу: депозит UX",
    },
    summary: {
      en: "Flow: link → terms → confirmation → payment as deposit → status lock.",
      ru: "Флоу: ссылка → условия → подтверждение → оплата как задаток → фиксация статуса.",
    },
    metrics: [
      { label: { en: "No-show rate", ru: "Неявки" }, value: "32% → 8%" },
      { label: { en: "Chargebacks", ru: "Чарджбэки" }, value: "-90%" },
    ],
    artifactHint: { en: "Deposit flow spec", ru: "Спек депозита" },
    industry: { en: "E-commerce / Services", ru: "E-commerce / Услуги" },
    timeline: { en: "4 weeks", ru: "4\u00A0недели" },
    problem: {
      en: "Service business had high no-show rate (30%+) and chargebacks from customers who changed their minds. Needed a booking flow that reduced both while remaining customer-friendly.",
      ru: "Сервисный бизнес имел высокий процент неявок (30%+) и чарджбэки от клиентов, которые передумали. Требовался флоу бронирования, который снизит оба показателя, оставаясь дружелюбным к клиентам.",
    },
    constraints: {
      en: [
        "Must be legally enforceable as deposit",
        "Can't feel hostile to customers",
        "Integration with Stripe required",
        "Mobile-first (70% traffic from phones)",
      ],
      ru: [
        "Должен быть юридически признаваем как задаток",
        "Не должен казаться враждебным клиентам",
        "Требуется интеграция со Stripe",
        "Mobile-first (70% трафика с телефонов)",
      ],
    },
    solution: {
      en: "Designed multi-step flow: clear terms presentation, explicit confirmation checkboxes, payment framed as 'deposit to secure your slot'. Built status system that locks booking after payment, with clear cancellation policy shown at every step.",
      ru: "Спроектировали многошаговый флоу: чёткое представление условий, явные чекбоксы подтверждения, оплата представлена как «задаток для фиксации слота». Построили систему статусов, которая блокирует бронирование после оплаты, с чёткой политикой отмены на каждом шаге.",
    },
    deliverables: {
      en: [
        "Booking flow (4-step)",
        "Terms acceptance with audit trail",
        "Stripe integration (deposits)",
        "Booking status system",
        "Admin panel for managing bookings",
        "Email notification templates",
      ],
      ru: [
        "Флоу бронирования (4 шага)",
        "Принятие условий с аудит-трейлом",
        "Интеграция Stripe (депозиты)",
        "Система статусов бронирования",
        "Админ-панель для управления бронированиями",
        "Шаблоны email-уведомлений",
      ],
    },
    techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Resend", "Vercel"],
    outcome: {
      en: "No-show rate dropped from 32% to 8%. Chargebacks reduced by 90%. Customer complaints about the process: zero. Booking completion rate improved 15%.",
      ru: "Процент неявок снизился с 32% до 8%. Чарджбэки сократились на 90%. Жалоб клиентов на процесс: ноль. Конверсия в завершённое бронирование выросла на 15%.",
    },
    hardParts: [
      {
        title: { en: "Legal-Friendly UX", ru: "Юридически корректный UX" },
        description: {
          en: "Each step designed with legal team. Terms are clear, not buried. Checkboxes are explicit, not pre-checked. Passes consumer protection review.",
          ru: "Каждый шаг спроектирован с юристами. Условия чёткие, не спрятаны. Чекбоксы явные, не предзаполненные. Проходит проверку защиты прав потребителей.",
        },
      },
      {
        title: { en: "Deposit vs Payment Framing", ru: "Фрейминг депозита vs платежа" },
        description: {
          en: "Careful language: 'deposit to secure' not 'pay now'. Reduces friction while maintaining commitment.",
          ru: "Аккуратный язык: «задаток для фиксации», а не «оплатите сейчас». Снижает трение, сохраняя обязательство.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "UX flow testing", ru: "Тестирование UX флоу" }, passed: true },
      { name: { en: "Stripe integration", ru: "Интеграция Stripe" }, passed: true },
      { name: { en: "Legal terms review", ru: "Юридическая проверка условий" }, passed: true },
      { name: { en: "Mobile responsiveness", ru: "Мобильная адаптивность" }, passed: true },
      { name: { en: "Email delivery tests", ru: "Тесты доставки email" }, passed: true },
    ],
  },
  {
    id: "case-6",
    slug: "wallet-rpc-evm-compatibility",
    category: "web3",
    year: 2025,
    title: {
      en: "Wallet and RPC Compatibility: EVM edge cases",
      ru: "Wallet и RPC совместимость: EVM граничные случаи",
    },
    summary: {
      en: "MetaMask, Rabby, signing flows, JSON-RPC correctness. One broken edge breaks the product.",
      ru: "MetaMask, Rabby, флоу подписания, корректность JSON-RPC. Один сломанный край ломает продукт.",
    },
    metrics: [
      { label: { en: "Wallet providers supported", ru: "Поддержанных кошельков" }, value: "8" },
      { label: { en: "Support tickets after launch", ru: "Тикетов поддержки после запуска" }, value: "0" },
    ],
    artifactHint: { en: "Wallet/RPC matrix", ru: "Wallet/RPC матрица" },
    industry: { en: "Web3 / DeFi", ru: "Web3 / DeFi" },
    timeline: { en: "5 weeks", ru: "5\u00A0недель" },
    problem: {
      en: "EVM dApp failed for a significant share of users: MetaMask worked, Rabby and others threw silent failures or wrong signing results. RPC responses differed by provider. No single test suite covered wallet + RPC matrix.",
      ru: "EVM dApp падал у заметной доли пользователей: MetaMask работал, Rabby и другие давали тихие сбои или неверные результаты подписания. Ответы RPC отличались по провайдерам. Не было единого набора тестов по матрице кошелёк + RPC.",
    },
    constraints: {
      en: [
        "Support MetaMask, Rabby, WalletConnect, injected wallets",
        "Correct handling of eth_sign vs personal_sign vs EIP-712",
        "JSON-RPC must match spec (chainId, gas, nonce edge cases)",
        "No user-facing errors on unsupported chains",
      ],
      ru: [
        "Поддержка MetaMask, Rabby, WalletConnect, инжектированных кошельков",
        "Корректная обработка eth_sign vs personal_sign vs EIP-712",
        "JSON-RPC должен соответствовать спекам (chainId, gas, nonce граничные случаи)",
        "Никаких пользовательских ошибок на неподдерживаемых сетях",
      ],
    },
    solution: {
      en: "Built a wallet compatibility matrix and RPC correctness checklist. Wrapped signing in a single abstraction with fallbacks per wallet type. Added provider-agnostic JSON-RPC tests (including error payloads). Documented edge cases and added E2E for MetaMask + Rabby on two chains.",
      ru: "Построили матрицу совместимости кошельков и чеклист корректности RPC. Обернули подписание в единую абстракцию с фоллбэками по типу кошелька. Добавили провайдер-независимые тесты JSON-RPC (включая error payloads). Задокументировали граничные случаи и добавили E2E для MetaMask + Rabby на двух сетях.",
    },
    deliverables: {
      en: [
        "Wallet abstraction layer (sign, send, switchChain)",
        "RPC correctness test suite (request/response + errors)",
        "Compatibility matrix: MetaMask, Rabby, WalletConnect",
        "E2E scenarios for main wallets on testnet/mainnet",
        "Runbook for new wallet onboarding",
      ],
      ru: [
        "Слой абстракции кошельков (sign, send, switchChain)",
        "Набор тестов корректности RPC (request/response + errors)",
        "Матрица совместимости: MetaMask, Rabby, WalletConnect",
        "E2E сценарии для основных кошельков на тестнете/мейннете",
        "Инструкция для добавления новых кошельков",
      ],
    },
    techStack: ["TypeScript", "ethers.js", "viem", "Playwright", "Hardhat"],
    outcome: {
      en: "Zero wallet-related support tickets after rollout. Rabby and MetaMask both pass full flow. New wallet added in 1 day using runbook.",
      ru: "Ноль тикетов поддержки по кошелькам после выката. Rabby и MetaMask проходят полный флоу. Новый кошелёк добавлен за 1 день по runbook.",
    },
    hardParts: [
      {
        title: { en: "Signing method divergence", ru: "Расхождение методов подписания" },
        description: {
          en: "eth_sign deprecated, personal_sign and EIP-712 differ by wallet. We normalized to a single API and mapped per wallet under the hood.",
          ru: "eth_sign устарел, personal_sign и EIP-712 различаются по кошелькам. Нормализовали к одному API и маппинг по кошельку под капотом.",
        },
      },
      {
        title: { en: "JSON-RPC correctness", ru: "Корректность JSON-RPC" },
        description: {
          en: "Some providers return extra fields or wrong error codes. We asserted on a minimal compliant subset and documented known deviations.",
          ru: "Часть провайдеров возвращает лишние поля или неверные коды ошибок. Зафиксировали минимальный compliant поднабор и задокументировали известные отклонения.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Wallet abstraction tests", ru: "Тесты абстракции кошельков" }, passed: true },
      { name: { en: "RPC correctness suite", ru: "Набор тестов корректности RPC" }, passed: true },
      { name: { en: "MetaMask E2E", ru: "E2E MetaMask" }, passed: true },
      { name: { en: "Rabby E2E", ru: "E2E Rabby" }, passed: true },
      { name: { en: "WalletConnect E2E", ru: "E2E WalletConnect" }, passed: true },
    ],
  },
  {
    id: "case-7",
    slug: "release-quality-verification-framework",
    category: "infrastructure",
    year: 2024,
    title: {
      en: "Release Quality System: Pre-deployment Verification Framework",
      ru: "Система качества релизов: фреймворк предеплойной верификации",
    },
    summary: {
      en: "7-phase checks, verification report. No deploy without a green report.",
      ru: "7 фаз проверок, отчёт верификации. Никакого деплоя без зелёного отчёта.",
    },
    metrics: [
      { label: { en: "Post-release rollbacks", ru: "Откатов после релиза" }, value: "0" },
      { label: { en: "Releases blocked with real issues", ru: "Релизов заблокировано с реальными багами" }, value: "2" },
    ],
    artifactHint: { en: "7-phase gate", ru: "7‑фазный контроль" },
    industry: { en: "DevOps / Quality", ru: "DevOps / Качество" },
    timeline: { en: "6 weeks", ru: "6\u00A0недель" },
    problem: {
      en: "Releases went out with regressions: env drift, missing migrations, broken integrations. Post-mortems showed the same gaps — no single gate that said 'ready' or 'not ready'.",
      ru: "Релизы выходили с регрессиями: рассинхронизация окружений, пропущенные миграции, сломанные интеграции. Постмортемы показывали одни и те же пробелы — не было единой проверки «готов / не готов».",
    },
    constraints: {
      en: [
        "Must run in CI and locally",
        "7 phases: build, unit, integration, contract, env, smoke, security checklist",
        "Verification report (PDF or artifact) required for every release",
        "No bypass without explicit override + audit trail",
      ],
      ru: [
        "Должно запускаться в CI и локально",
        "7 фаз: build, unit, integration, contract, env, smoke, security checklist",
        "Отчёт верификации (PDF или артефакт) обязателен для каждого релиза",
        "Нет обхода без явного override + аудит-трейл",
      ],
    },
    solution: {
      en: "Designed a 7-phase verification pipeline. Each phase produces pass/fail and evidence. Final step aggregates into a verification report (markdown + optional PDF). Deploy job reads report; red = block. Override requires reason and is logged.",
      ru: "Спроектировали 7-фазный пайплайн верификации. Каждая фаза даёт pass/fail и доказательства. Финальный шаг собирает отчёт верификации (markdown + опционально PDF). Deploy-джоба читает отчёт; красный = блок. Override требует причину и логируется.",
    },
    deliverables: {
      en: [
        "7-phase verification pipeline (configurable)",
        "Verification report generator (Markdown + PDF)",
        "CI integration (block deploy on red)",
        "Override workflow with audit log",
        "Runbook and phase documentation",
      ],
      ru: [
        "7-фазный пайплайн верификации (настраиваемый)",
        "Генератор отчёта верификации (Markdown + PDF)",
        "Интеграция в CI (блок деплоя при красном)",
        "Workflow override с аудит-логом",
        "Runbook и документация по фазам",
      ],
    },
    techStack: ["GitHub Actions", "Node.js", "Docker", "PostgreSQL", "puppeteer"],
    outcome: {
      en: "Zero post-release rollbacks in 4 months. Two releases blocked by the gate; both had real issues. Report is the single source of truth for release readiness.",
      ru: "Ноль откатов после релиза за 4\u00A0месяца. Два релиза заблокированы проверкой; в обоих были реальные проблемы. Отчёт — единый источник правды о готовности к релизу.",
    },
    hardParts: [
      {
        title: { en: "7-phase design", ru: "Дизайн 7 фаз" },
        description: {
          en: "Phases: build → unit → integration → contract (API/DB) → env parity → smoke → security checklist. Order and dependencies documented; each phase is independently runnable.",
          ru: "Фазы: build → unit → integration → contract (API/DB) → env parity → smoke → security checklist. Порядок и зависимости задокументированы; каждая фаза запускается отдельно.",
        },
      },
      {
        title: { en: "Verification report", ru: "Отчёт верификации" },
        description: {
          en: "Report includes phase results, timestamps, and evidence links. PDF generated for audit trail. Stored as pipeline artifact and required for deploy.",
          ru: "Отчёт включает результаты фаз, таймстампы и ссылки на доказательства. PDF генерируется для аудит-трейла. Хранится как артефакт пайплайна и обязателен для деплоя.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build verification", ru: "Верификация сборки" }, passed: true },
      { name: { en: "Unit tests", ru: "Юнит-тесты" }, passed: true },
      { name: { en: "Integration tests", ru: "Интеграционные тесты" }, passed: true },
      { name: { en: "Contract checks (API/DB)", ru: "Проверки контрактов (API/DB)" }, passed: true },
      { name: { en: "Environment parity", ru: "Паритет окружений" }, passed: true },
      { name: { en: "Smoke tests", ru: "Smoke тесты" }, passed: true },
      { name: { en: "Security checklist", ru: "Чеклист безопасности" }, passed: true },
    ],
  },
  {
    id: "case-8",
    slug: "startup-under-key-mvp-launch-support",
    category: "product",
    year: 2025,
    title: {
      en: "Startup Under Key: MVP → Launch → Support",
      ru: "Стартап под ключ: MVP → Запуск → Поддержка",
    },
    summary: {
      en: "End-to-end product delivery. One team from first commit to post-launch support.",
      ru: "Поставка продукта под ключ. Одна команда от первого коммита до пост-лаунч поддержки.",
    },
    metrics: [
      { label: { en: "Critical bugs at launch", ru: "Критических багов при запуске" }, value: "0" },
      { label: { en: "On-time delivery", ru: "Поставка в срок" }, value: "100%" },
    ],
    artifactHint: { en: "MVP → Launch playbook", ru: "MVP → Запуск playbook" },
    industry: { en: "SaaS / Startup", ru: "SaaS / Стартап" },
    timeline: { en: "5 months", ru: "5\u00A0месяцев" },
    problem: {
      en: "Founder had a clear vision but no technical co-founder. Needed a single partner to take the product from MVP to launch and then support for 3 months — no handoff to another team, no knowledge loss.",
      ru: "У основателя было чёткое видение, но не было технического сооснователя. Нужен был один партнёр, который доведёт продукт от MVP до запуска и затем поддержки 3\u00A0месяца — без передачи другой команде, без потери знаний.",
    },
    constraints: {
      en: [
        "Fixed scope per phase (MVP → Launch → Support)",
        "Weekly demos and async updates",
        "Full IP transfer at final milestone",
        "3 months post-launch support with SLA",
      ],
      ru: [
        "Фиксированный объём по фазам (MVP → Запуск → Поддержка)",
        "Еженедельные демо и асинхронные обновления",
        "Полная передача IP на финальной вехе",
        "3\u00A0месяца поддержки после запуска с SLA",
      ],
    },
    solution: {
      en: "Ran three phases with clear deliverables and sign-off. Phase 1: MVP (core flows, admin, staging). Phase 2: Launch (prod infra, monitoring, docs, handover). Phase 3: Support (bugfix SLA, small improvements, knowledge base). Same team throughout; no re-onboarding.",
      ru: "Провели три фазы с чёткими результатами и sign-off. Фаза\u00A01: MVP (ключевые сценарии, админка, тестовый сервер). Фаза\u00A02: Запуск (продакшн инфра, мониторинг, документация, передача). Фаза\u00A03: Поддержка (SLA по багам, мелкие доработки, база знаний). Одна команда на всём пути; без повторной адаптации.",
    },
    deliverables: {
      en: [
        "MVP: product + admin + staging deploy",
        "Launch: production, monitoring, runbooks, IP transfer",
        "Support: 3-month SLA, incident process, KB",
        "Weekly demo recordings and progress updates",
        "Technical documentation and handover session",
      ],
      ru: [
        "MVP: продукт + админка + запуск на тестовый сервер",
        "Запуск: продакшн, мониторинг, инструкции, передача IP",
        "Поддержка: 3-месячный SLA, процесс инцидентов, база знаний",
        "Записи еженедельных демо и обновления прогресса",
        "Техническая документация и сессия передачи",
      ],
    },
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Vercel", "AWS"],
    outcome: {
      en: "Launched on time. Zero critical bugs in first 6 weeks. Founder now runs the product with our docs and 3-month support buffer; extended support contract signed.",
      ru: "Запустились в срок. Ноль критических багов в первые 6\u00A0недель. Основатель управляет продуктом по нашим докам и 3-месячному буферу поддержки; подписан продлённый контракт поддержки.",
    },
    hardParts: [
      {
        title: { en: "Single team, no handoff", ru: "Одна команда, без передачи" },
        description: {
          en: "Keeping the same team from MVP to support avoided knowledge loss and context switching. Clear phase gates and sign-off kept scope under control.",
          ru: "Одна команда от MVP до поддержки исключила потерю знаний и смену контекста. Чёткие контрольные точки фаз и sign-off удерживали объём под контролем.",
        },
      },
      {
        title: { en: "Support SLA without scope creep", ru: "SLA поддержки без расползания объёма" },
        description: {
          en: "Support phase had defined SLA (response time, fix severity). New features were out of scope; we documented a change request process for post-Support work.",
          ru: "Фаза поддержки имела определённый SLA (время ответа, приоритет исправлений). Новые функции вне объёма; задокументировали процесс запроса изменений для работ после поддержки.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "MVP acceptance", ru: "Приёмка MVP" }, passed: true },
      { name: { en: "Staging deployment", ru: "Запуск на тестовый сервер" }, passed: true },
      { name: { en: "Production deployment", ru: "Запуск в продакшн" }, passed: true },
      { name: { en: "Monitoring setup", ru: "Настройка мониторинга" }, passed: true },
      { name: { en: "Documentation handover", ru: "Передача документации" }, passed: true },
      { name: { en: "IP transfer complete", ru: "Передача IP завершена" }, passed: true },
    ],
  },
  {
    id: "case-9",
    slug: "asset-tokenization-platform",
    category: "web3",
    year: 2023,
    title: {
      en: "Asset Tokenization Platform: Global Real Estate Fund",
      ru: "Платформа токенизации активов: Глобальный фонд недвижимости",
    },
    summary: {
      en: "Blockchain platform for tokenizing real estate across 12 countries with fractional ownership and regulatory compliance.",
      ru: "Блокчейн-платформа для токенизации недвижимости в 12 странах с долевым владением и соответствием регуляторным требованиям.",
    },
    metrics: [
      { label: { en: "Tokenized assets", ru: "Токенизированных активов" }, value: "$89M" },
      { label: { en: "Countries", ru: "Стран" }, value: "12" },
      { label: { en: "Users", ru: "Пользователей" }, value: "8.5K+" },
      { label: { en: "ROI", ru: "ROI" }, value: "156%" },
    ],
    artifactHint: { en: "Multi-jurisdiction compliance matrix", ru: "Матрица мультиюрисдикционного compliance" },
    industry: { en: "Real Estate / FinTech", ru: "Недвижимость / FinTech" },
    timeline: { en: "8 months", ru: "8\u00A0месяцев" },
    problem: {
      en: "A global real estate fund needed to democratize investment access. Traditional real estate investment required large capital, limiting participation to wealthy individuals. Cross-border compliance was a nightmare with 12 different regulatory frameworks.",
      ru: "Глобальному фонду недвижимости нужно было демократизировать доступ к инвестициям. Традиционные инвестиции в недвижимость требовали большого капитала, ограничивая участие состоятельными людьми. Кросс-граничный compliance был кошмаром с 12 разными регуляторными рамками.",
    },
    constraints: {
      en: [
        "12 different regulatory jurisdictions",
        "Real-time asset valuation required",
        "KYC/AML compliance for each country",
        "Fractional ownership down to $100",
      ],
      ru: [
        "12 разных регуляторных юрисдикций",
        "Требовалась оценка активов в реальном времени",
        "KYC/AML compliance для каждой страны",
        "Долевое владение от $100",
      ],
    },
    solution: {
      en: "Built a multi-chain tokenization platform on Ethereum and Polygon. Each property becomes an ERC-1400 security token with built-in compliance. Chainlink oracles feed real-time property valuations. IPFS stores property documents with on-chain verification hashes.",
      ru: "Построили мультичейн платформу токенизации на Ethereum и Polygon. Каждая недвижимость становится security-токеном ERC-1400 со встроенным compliance. Оракулы Chainlink поставляют оценки недвижимости в реальном времени. IPFS хранит документы с хешами верификации на цепочке.",
    },
    deliverables: {
      en: [
        "ERC-1400 security token contracts",
        "Multi-jurisdiction KYC/AML integration",
        "Real-time valuation oracle system",
        "Investor dashboard with portfolio tracking",
        "Admin panel for property management",
        "Secondary market trading module",
        "Automated dividend distribution",
        "Regulatory reporting automation",
      ],
      ru: [
        "Контракты security-токенов ERC-1400",
        "Мультиюрисдикционная интеграция KYC/AML",
        "Система оракулов оценки в реальном времени",
        "Дашборд инвестора с трекингом портфеля",
        "Админ-панель для управления объектами",
        "Модуль вторичного рынка",
        "Автоматическое распределение дивидендов",
        "Автоматизация регуляторной отчётности",
      ],
    },
    techStack: ["Ethereum", "Polygon", "Solidity", "React", "Node.js", "IPFS", "Chainlink"],
    outcome: {
      en: "$89M in tokenized real estate assets across 12 countries. 8,500+ investors gained access to institutional-grade real estate with investments starting at $100. 100% regulatory compliance maintained across all jurisdictions. Now available as TokenizeHub Enterprise platform.",
      ru: "$89M токенизированных активов недвижимости в 12 странах. 8,500+ инвесторов получили доступ к институциональной недвижимости с инвестициями от $100. 100% соответствие регуляторным требованиям во всех юрисдикциях. Теперь доступна как платформа TokenizeHub Enterprise.",
    },
    hardParts: [
      {
        title: { en: "Multi-jurisdiction Compliance", ru: "Мультиюрисдикционный Compliance" },
        description: {
          en: "Each country has different securities laws. We built a modular compliance engine that applies the right rules based on investor location and token type.",
          ru: "У каждой страны разные законы о ценных бумагах. Построили модульный движок compliance, применяющий правильные правила в зависимости от локации инвестора и типа токена.",
        },
      },
      {
        title: { en: "Real-time Valuation Oracles", ru: "Оракулы оценки в реальном времени" },
        description: {
          en: "Property values change. We integrated Chainlink with multiple appraisal data sources to provide daily NAV updates that investors can trust.",
          ru: "Стоимость недвижимости меняется. Интегрировали Chainlink с множеством источников оценочных данных для ежедневных обновлений NAV, которым инвесторы могут доверять.",
        },
      },
      {
        title: { en: "Secondary Market Liquidity", ru: "Ликвидность вторичного рынка" },
        description: {
          en: "Tokenized securities need trading. Built a compliant secondary market with transfer restrictions that automatically enforce holding periods and investor limits.",
          ru: "Токенизированным ценным бумагам нужна торговля. Построили compliant вторичный рынок с ограничениями на трансфер, автоматически применяющими периоды удержания и лимиты инвесторов.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Smart contract audit", ru: "Аудит смарт-контрактов" }, passed: true },
      { name: { en: "Compliance legal review", ru: "Юридическая проверка compliance" }, passed: true },
      { name: { en: "KYC/AML integration tests", ru: "Тесты интеграции KYC/AML" }, passed: true },
      { name: { en: "Oracle reliability tests", ru: "Тесты надёжности оракулов" }, passed: true },
      { name: { en: "Load testing (10K concurrent)", ru: "Нагрузочное тестирование (10K concurrent)" }, passed: true },
      { name: { en: "Security penetration testing", ru: "Тестирование на проникновение" }, passed: true },
    ],
  },
  {
    id: "case-10",
    slug: "multi-location-restaurant-management",
    category: "product",
    year: 2022,
    title: {
      en: "Multi-location Management System: Restaurant Chain Network",
      ru: "Система управления сетью: Ресторанная сеть",
    },
    summary: {
      en: "Integrated restaurant management ecosystem with POS, inventory, scheduling, and analytics across 47 locations with real-time sync.",
      ru: "Интегрированная экосистема управления рестораном с POS, инвентарём, расписанием и аналитикой для 47 локаций с синхронизацией в реальном времени.",
    },
    metrics: [
      { label: { en: "Locations managed", ru: "Управляемых локаций" }, value: "47" },
      { label: { en: "Efficiency increase", ru: "Рост эффективности" }, value: "+58%" },
      { label: { en: "Cost reduction", ru: "Снижение затрат" }, value: "-28%" },
      { label: { en: "Revenue growth", ru: "Рост выручки" }, value: "+15%" },
    ],
    artifactHint: { en: "Real-time sync architecture", ru: "Архитектура синхронизации в реальном времени" },
    industry: { en: "HoReCa / Retail", ru: "HoReCa / Ритейл" },
    timeline: { en: "6 months", ru: "6\u00A0месяцев" },
    problem: {
      en: "A growing restaurant chain operated 47 locations with disconnected systems. Each location had its own POS, inventory tracking was manual, staff scheduling was a spreadsheet nightmare, and HQ had no real-time visibility into operations.",
      ru: "Растущая ресторанная сеть управляла 47 локациями с разрозненными системами. У каждой локации был свой POS, инвентарь отслеживался вручную, расписание персонала было кошмаром в Excel, а штаб-квартира не имела видимости операций в реальном времени.",
    },
    constraints: {
      en: [
        "47 locations across 3 time zones",
        "189 existing POS terminals to integrate",
        "1,200+ staff members to onboard",
        "Zero downtime migration required",
      ],
      ru: [
        "47\u00A0локаций в 3\u00A0часовых поясах",
        "189 существующих POS-терминалов для интеграции",
        "1\u00A0200+ сотрудников для обучения",
        "Миграция без простоев",
      ],
    },
    solution: {
      en: "Built a unified management platform with real-time WebSocket synchronization. POS integration layer abstracts different terminal vendors. Centralized inventory with predictive ordering. AI-powered staff scheduling based on historical traffic patterns.",
      ru: "Построили унифицированную платформу управления с WebSocket-синхронизацией в реальном времени. Слой интеграции POS абстрагирует разных вендоров терминалов. Централизованный инвентарь с предиктивными заказами. AI-расписание персонала на основе исторических паттернов трафика.",
    },
    deliverables: {
      en: [
        "Unified POS integration layer",
        "Real-time inventory management",
        "AI-powered staff scheduling",
        "HQ analytics dashboard",
        "Mobile app for managers",
        "Predictive ordering system",
        "Customer loyalty integration",
        "Multi-location reporting",
      ],
      ru: [
        "Унифицированный слой интеграции POS",
        "Управление инвентарём в реальном времени",
        "AI-расписание персонала",
        "Аналитический дашборд для штаб-квартиры",
        "Мобильное приложение для менеджеров",
        "Система предиктивных заказов",
        "Интеграция программы лояльности",
        "Мультилокационная отчётность",
      ],
    },
    techStack: ["Vue.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS", "WebSockets"],
    outcome: {
      en: "58% efficiency increase through automation. 28% cost reduction via optimized inventory and scheduling. 15% revenue growth from better staffing during peak hours. All 47 locations now operate as a unified system. Now available as RestaurantOS Pro SaaS product.",
      ru: "58% рост эффективности через автоматизацию. 28% снижение затрат за счёт оптимизации инвентаря и расписания. 15% рост выручки от лучшего staffing в пиковые часы. Все 47 локаций теперь работают как единая система. Теперь доступен как SaaS-продукт RestaurantOS Pro.",
    },
    hardParts: [
      {
        title: { en: "Zero-downtime Migration", ru: "Миграция без простоев" },
        description: {
          en: "Restaurants can't stop serving customers. We migrated location by location during off-peak hours with instant rollback capability.",
          ru: "Рестораны не могут прекратить обслуживание. Мигрировали локацию за локацией в непиковые часы с возможностью мгновенного отката.",
        },
      },
      {
        title: { en: "Multi-vendor POS Integration", ru: "Интеграция мультивендорных POS" },
        description: {
          en: "47 locations had 5 different POS vendors. Built an abstraction layer that normalizes data from all systems into a unified format.",
          ru: "47 локаций имели 5 разных вендоров POS. Построили слой абстракции, нормализующий данные всех систем в единый формат.",
        },
      },
      {
        title: { en: "Real-time Sync at Scale", ru: "Синхронизация в реальном времени в масштабе" },
        description: {
          en: "189 terminals generating events simultaneously. WebSocket infrastructure with Redis pub/sub handles 50K+ events per minute.",
          ru: "189 терминалов генерируют события одновременно. WebSocket-инфраструктура с Redis pub/sub обрабатывает 50K+ событий в минуту.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "POS integration tests", ru: "Тесты интеграции POS" }, passed: true },
      { name: { en: "Load testing (50K events/min)", ru: "Нагрузочное тестирование (50K событий/мин)" }, passed: true },
      { name: { en: "Data migration verification", ru: "Верификация миграции данных" }, passed: true },
      { name: { en: "Offline mode testing", ru: "Тестирование офлайн-режима" }, passed: true },
      { name: { en: "UAT with location managers", ru: "UAT с менеджерами локаций" }, passed: true },
    ],
  },
  {
    id: "case-11",
    slug: "ai-accounting-system",
    category: "product",
    year: 2022,
    title: {
      en: "AI-Powered Accounting System: Fortune 500 Manufacturing",
      ru: "AI-система бухгалтерии: Fortune 500 Manufacturing",
    },
    summary: {
      en: "Enterprise AI accounting with automated document recognition, intelligent tax processing, and real-time insights across 23 subsidiaries.",
      ru: "Корпоративная AI-бухгалтерия с автоматическим распознаванием документов, интеллектуальной налоговой обработкой и аналитикой в реальном времени для 23 дочерних компаний.",
    },
    metrics: [
      { label: { en: "Processing accuracy", ru: "Точность обработки" }, value: "99.8%" },
      { label: { en: "Speed improvement", ru: "Ускорение" }, value: "6x" },
      { label: { en: "Annual savings", ru: "Годовая экономия" }, value: "$850K+" },
      { label: { en: "Documents/month", ru: "Документов/месяц" }, value: "50K+" },
    ],
    artifactHint: { en: "ML pipeline architecture", ru: "Архитектура ML-пайплайна" },
    industry: { en: "Manufacturing / Enterprise", ru: "Производство / Enterprise" },
    timeline: { en: "10 months", ru: "10\u00A0месяцев" },
    problem: {
      en: "A Fortune 500 manufacturer processed 50,000+ financial documents monthly across 23 subsidiaries. Manual data entry had 15% error rate, tax compliance was reactive, and month-end close took 12 days. They needed automation without losing accuracy.",
      ru: "Fortune\u00A0500 производитель обрабатывал 50\u00A0000+ финансовых документов ежемесячно в 23\u00A0дочерних компаниях. Ручной ввод данных имел 15% ошибок, налоговый compliance был реактивным, а закрытие месяца занимало 12\u00A0дней. Нужна была автоматизация без потери точности.",
    },
    constraints: {
      en: [
        "23 subsidiaries with different chart of accounts",
        "15+ document types (invoices, receipts, contracts)",
        "Multi-currency and multi-language support",
        "SOX compliance requirements",
      ],
      ru: [
        "23 дочерние компании с разными планами счетов",
        "15+ типов документов (счета, чеки, контракты)",
        "Мультивалютность и мультиязычность",
        "Требования SOX compliance",
      ],
    },
    solution: {
      en: "Deployed a custom ML pipeline: OCR extracts text, NLP classifies documents, and trained models extract structured data. Confidence scoring triggers human review only for edge cases. Real-time dashboards give CFO visibility across all subsidiaries.",
      ru: "Развернули кастомный ML-пайплайн: OCR извлекает текст, NLP классифицирует документы, обученные модели извлекают структурированные данные. Scoring уверенности запускает человеческую проверку только для граничных случаев. Реал-тайм дашборды дают CFO видимость по всем дочерним компаниям.",
    },
    deliverables: {
      en: [
        "Custom OCR pipeline for financial docs",
        "Document classification ML model",
        "Data extraction with confidence scoring",
        "Multi-subsidiary consolidation engine",
        "Tax compliance automation",
        "Real-time CFO dashboard",
        "Audit trail and SOX reporting",
        "ERP integration layer",
      ],
      ru: [
        "Кастомный OCR-пайплайн для финансовых документов",
        "ML-модель классификации документов",
        "Извлечение данных с оценкой уверенности",
        "Движок консолидации мультидочерних компаний",
        "Автоматизация налогового compliance",
        "Реал-тайм дашборд для CFO",
        "Аудит-трейл и отчётность SOX",
        "Слой интеграции с ERP",
      ],
    },
    techStack: ["Python", "TensorFlow", "Django", "PostgreSQL", "OCR", "AWS", "Kubernetes"],
    outcome: {
      en: "99.8% accuracy (up from 85% manual). 6x faster processing. $850K+ annual savings from reduced manual work. Month-end close reduced from 12 days to 3. Full SOX compliance maintained with automated audit trails. Now available as AccountingAI Professional SaaS product.",
      ru: "99,8% точность (было 85% вручную). 6x быстрее обработка. $850K+ годовой экономии от сокращения ручной работы. Закрытие месяца сократилось с 12\u00A0дней до 3. Полный SOX compliance с автоматизированными аудит-трейлами. Теперь доступен как SaaS-продукт AccountingAI Professional.",
    },
    hardParts: [
      {
        title: { en: "Document Variety Handling", ru: "Обработка разнообразия документов" },
        description: {
          en: "15+ document types, hundreds of vendor formats. We trained specialized models for each category and built a routing layer that picks the right model.",
          ru: "15+ типов документов, сотни форматов вендоров. Обучили специализированные модели для каждой категории и построили роутинг, выбирающий правильную модель.",
        },
      },
      {
        title: { en: "Confidence-based Human Loop", ru: "Human Loop на основе уверенности" },
        description: {
          en: "Not all documents can be auto-processed. Built a confidence threshold system where low-confidence extractions go to human review without blocking the pipeline.",
          ru: "Не все документы можно обработать автоматически. Построили систему порогов уверенности, где низкоуверенные извлечения идут на человеческую проверку без блокировки пайплайна.",
        },
      },
      {
        title: { en: "Multi-subsidiary Consolidation", ru: "Консолидация мультидочерних компаний" },
        description: {
          en: "23 subsidiaries with different accounting standards. Built a normalization layer that maps all charts of accounts to corporate standard for consolidated reporting.",
          ru: "23 дочерние компании с разными стандартами учёта. Построили слой нормализации, маппящий все планы счетов на корпоративный стандарт для консолидированной отчётности.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "ML model accuracy validation", ru: "Валидация точности ML-модели" }, passed: true },
      { name: { en: "OCR accuracy benchmarks", ru: "Бенчмарки точности OCR" }, passed: true },
      { name: { en: "SOX compliance audit", ru: "Аудит SOX compliance" }, passed: true },
      { name: { en: "ERP integration tests", ru: "Тесты интеграции с ERP" }, passed: true },
      { name: { en: "Performance testing (50K docs)", ru: "Тестирование производительности (50K документов)" }, passed: true },
    ],
  },
  {
    id: "case-12",
    slug: "analytics-pro-enterprise-bi",
    category: "product",
    year: 2021,
    title: {
      en: "AnalyticsPro Enterprise: BI Platform with Predictive Modeling",
      ru: "AnalyticsPro Enterprise: BI-платформа с предиктивным моделированием",
    },
    summary: {
      en: "Advanced analytics and reporting platform with real-time dashboards, predictive modeling, and enterprise data integration.",
      ru: "Продвинутая платформа аналитики и отчётности с дашбордами в реальном времени, предиктивным моделированием и корпоративной интеграцией данных.",
    },
    metrics: [
      { label: { en: "Data sources integrated", ru: "Интегрированных источников" }, value: "45+" },
      { label: { en: "Report generation time", ru: "Время генерации отчёта" }, value: "<3s" },
      { label: { en: "Prediction accuracy", ru: "Точность прогнозов" }, value: "94%" },
      { label: { en: "Active enterprise clients", ru: "Активных enterprise-клиентов" }, value: "12" },
    ],
    artifactHint: { en: "Data pipeline architecture", ru: "Архитектура data-пайплайна" },
    industry: { en: "Business Intelligence / SaaS", ru: "Business Intelligence / SaaS" },
    timeline: { en: "12 months", ru: "12\u00A0месяцев" },
    problem: {
      en: "Enterprise clients struggled with fragmented data across dozens of systems. Existing BI tools required weeks to build reports, couldn't handle real-time data, and lacked predictive capabilities. Executives made decisions on stale information.",
      ru: "Корпоративные клиенты боролись с фрагментированными данными в десятках систем. Существующие BI-инструменты требовали недель на построение отчётов, не справлялись с данными в реальном времени и не имели предиктивных возможностей. Руководители принимали решения на устаревшей информации.",
    },
    constraints: {
      en: [
        "45+ different data source types",
        "Sub-3-second report generation",
        "Role-based access for 500+ users",
        "On-premise and cloud deployment options",
      ],
      ru: [
        "45+ разных типов источников данных",
        "Генерация отчётов менее 3 секунд",
        "Ролевой доступ для 500+ пользователей",
        "Варианты развёртывания on-premise и cloud",
      ],
    },
    solution: {
      en: "Built a unified BI platform with pre-built connectors for 45+ data sources. Real-time streaming pipeline processes events as they happen. ML models provide sales forecasting, churn prediction, and anomaly detection. Drag-and-drop report builder lets business users self-serve.",
      ru: "Построили унифицированную BI-платформу с готовыми коннекторами к 45+ источникам данных. Стриминговый пайплайн в реальном времени обрабатывает события по мере поступления. ML-модели обеспечивают прогноз продаж, предсказание оттока и детекцию аномалий. Drag-and-drop конструктор отчётов позволяет бизнес-пользователям работать самостоятельно.",
    },
    deliverables: {
      en: [
        "45+ pre-built data connectors",
        "Real-time streaming data pipeline",
        "Drag-and-drop report builder",
        "Predictive ML models (sales, churn, anomaly)",
        "Mobile BI application",
        "Role-based access control",
        "Scheduled report distribution",
        "Custom dashboard templates",
      ],
      ru: [
        "45+ готовых коннекторов данных",
        "Стриминговый пайплайн данных в реальном времени",
        "Drag-and-drop конструктор отчётов",
        "Предиктивные ML-модели (продажи, отток, аномалии)",
        "Мобильное BI-приложение",
        "Ролевой контроль доступа",
        "Запланированная рассылка отчётов",
        "Кастомные шаблоны дашбордов",
      ],
    },
    techStack: ["Python", "Apache Kafka", "ClickHouse", "React", "D3.js", "scikit-learn", "Kubernetes", "Redis"],
    outcome: {
      en: "Platform serves 12 enterprise clients with 500+ active users. Reports that took days now generate in under 3 seconds. Predictive models achieve 94% accuracy on sales forecasting. Now available as AnalyticsPro Enterprise SaaS product.",
      ru: "Платформа обслуживает 12 enterprise-клиентов с 500+ активными пользователями. Отчёты, которые занимали дни, теперь генерируются менее чем за 3 секунды. Предиктивные модели достигают 94% точности в прогнозе продаж. Теперь доступна как SaaS-продукт AnalyticsPro Enterprise.",
    },
    hardParts: [
      {
        title: { en: "Universal Data Connector", ru: "Универсальный коннектор данных" },
        description: {
          en: "45+ source types with different APIs, schemas, and auth methods. Built an abstraction layer with plugin architecture that normalizes everything into a unified data model.",
          ru: "45+ типов источников с разными API, схемами и методами аутентификации. Построили слой абстракции с плагинной архитектурой, нормализующий всё в единую модель данных.",
        },
      },
      {
        title: { en: "Sub-3-second Query Performance", ru: "Производительность запросов менее 3 секунд" },
        description: {
          en: "Billions of rows, complex aggregations. ClickHouse columnar storage with pre-computed materialized views and intelligent query caching delivers consistent performance.",
          ru: "Миллиарды строк, сложные агрегации. Колоночное хранилище ClickHouse с предвычисленными материализованными представлениями и интеллектуальным кешированием запросов обеспечивает стабильную производительность.",
        },
      },
      {
        title: { en: "Self-service Report Builder", ru: "Self-service конструктор отчётов" },
        description: {
          en: "Business users aren't SQL experts. Drag-and-drop interface generates optimized queries behind the scenes. Visual query builder handles joins, filters, and aggregations.",
          ru: "Бизнес-пользователи не эксперты SQL. Drag-and-drop интерфейс генерирует оптимизированные запросы за кулисами. Визуальный конструктор запросов обрабатывает джойны, фильтры и агрегации.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Connector integration tests", ru: "Тесты интеграции коннекторов" }, passed: true },
      { name: { en: "Query performance benchmarks", ru: "Бенчмарки производительности запросов" }, passed: true },
      { name: { en: "ML model validation", ru: "Валидация ML-моделей" }, passed: true },
      { name: { en: "Load testing (1000 concurrent)", ru: "Нагрузочное тестирование (1000 concurrent)" }, passed: true },
      { name: { en: "Security audit", ru: "Аудит безопасности" }, passed: true },
    ],
  },
];

export const microCases: MicroCase[] = [
  {
    id: "micro-1",
    category: "infrastructure",
    title: { en: "Integration Test Catalog (IT-01…IT-05)", ru: "Каталог интеграционных тестов (IT-01…IT-05)" },
    what: { en: "Systematic test coverage for critical user flows", ru: "Систематическое покрытие критичных пользовательских флоу" },
    outcome: { en: "47 scenarios, 0 production bugs in covered areas", ru: "47 сценариев, 0 продакшн-багов в покрытых областях" },
  },
  {
    id: "micro-2",
    category: "infrastructure",
    title: { en: "Pre-deployment verification checks", ru: "Проверки верификации перед запуском" },
    what: { en: "Automated gates before production deploy", ru: "Автоматические проверки перед запуском в продакшн" },
    outcome: { en: "Caught 12 issues before they reached users", ru: "Выявлено 12 проблем до попадания к пользователям" },
  },
  {
    id: "micro-3",
    category: "infrastructure",
    title: { en: "Developer onboarding guide", ru: "Руководство по адаптации разработчиков" },
    what: { en: "Structured documentation for new team members", ru: "Структурированная документация для новых членов команды" },
    outcome: { en: "Onboarding time: 2 weeks → 3 days", ru: "Время адаптации: 2\u00A0недели → 3\u00A0дня" },
  },
  {
    id: "micro-4",
    category: "web3",
    title: { en: "Wallet compatibility debugging", ru: "Отладка совместимости кошельков" },
    what: { en: "Cross-wallet testing and edge case handling", ru: "Кросс-кошелёк тестирование и обработка граничных случаев" },
    outcome: { en: "Works on 8 wallet providers, 0 connection errors", ru: "Работает с 8 провайдерами кошельков, 0 ошибок подключения" },
  },
  {
    id: "micro-5",
    category: "infrastructure",
    title: { en: "RPC provider strategy", ru: "Стратегия RPC провайдеров" },
    what: { en: "Multi-provider failover with health monitoring", ru: "Мультипровайдерный failover с мониторингом здоровья" },
    outcome: { en: "99.99% uptime, transparent failover", ru: "99.99% аптайм, прозрачный failover" },
  },
  {
    id: "micro-6",
    category: "product",
    title: { en: "UX architecture v0", ru: "UX архитектура v0" },
    what: { en: "Information architecture and user flow mapping", ru: "Информационная архитектура и маппинг пользовательских флоу" },
    outcome: { en: "Clear foundation for UI decisions", ru: "Чёткая основа для UI решений" },
  },
  {
    id: "micro-7",
    category: "web",
    title: { en: "i18n EN/RU/DE", ru: "i18n EN/RU/DE" },
    what: { en: "Multi-language support with RTL consideration", ru: "Мультиязычная поддержка с учётом RTL" },
    outcome: { en: "3 languages, seamless switching", ru: "3 языка, бесшовное переключение" },
  },
  {
    id: "micro-8",
    category: "web",
    title: { en: "Locale persistence", ru: "Персистентность локали" },
    what: { en: "Remember user language preference", ru: "Запоминание языковых предпочтений пользователя" },
    outcome: { en: "Zero friction on return visits", ru: "Ноль трения при возвращении" },
  },
  {
    id: "micro-9",
    category: "web",
    title: { en: "Mobile navigation", ru: "Мобильная навигация" },
    what: { en: "Thumb-friendly navigation patterns", ru: "Навигация, удобная для большого пальца" },
    outcome: { en: "Mobile conversion +23%", ru: "Мобильная конверсия +23%" },
  },
  {
    id: "micro-10",
    category: "infrastructure",
    title: { en: "Release build discipline", ru: "Дисциплина релизных билдов" },
    what: { en: "Reproducible builds with version tracking", ru: "Воспроизводимые билды с трекингом версий" },
    outcome: { en: "Any version deployable in <5 min", ru: "Любая версия деплоится за <5 мин" },
  },
  {
    id: "micro-11",
    category: "infrastructure",
    title: { en: "Stub/metrics sanity checks", ru: "Sanity-проверки стабов/метрик" },
    what: { en: "Automated verification of test doubles", ru: "Автоматическая верификация тестовых дублёров" },
    outcome: { en: "No more false positives in tests", ru: "Больше нет ложноположительных в тестах" },
  },
  {
    id: "micro-12",
    category: "product",
    title: { en: "KYC module outline", ru: "Контур KYC модуля" },
    what: { en: "Multi-provider KYC abstraction layer", ru: "Абстракционный слой мультипровайдерного KYC" },
    outcome: { en: "Switch providers without code changes", ru: "Смена провайдеров без изменения кода" },
  },
  {
    id: "micro-13",
    category: "web3",
    title: { en: "Private sale flow draft", ru: "Драфт флоу private sale" },
    what: { en: "Investor onboarding with vesting", ru: "Онбординг инвесторов с вестингом" },
    outcome: { en: "800+ investors processed smoothly", ru: "800+ инвесторов обработано гладко" },
  },
  {
    id: "micro-14",
    category: "product",
    title: { en: "Security model for stakeholders", ru: "Модель безопасности для стейкхолдеров" },
    what: { en: "Role-based access with audit trails", ru: "Ролевой доступ с аудит-трейлами" },
    outcome: { en: "Passed SOC 2 audit first try", ru: "Прошли SOC 2 аудит с первой попытки" },
  },
  {
    id: "micro-15",
    category: "web3",
    title: { en: "Token utility model", ru: "Модель утилити токена" },
    what: { en: "Compliance-aware token mechanics design", ru: "Дизайн механик токена с учётом compliance" },
    outcome: { en: "Zero legal flags, real business value", ru: "Ноль юридических флагов, реальная бизнес-ценность" },
  },
  {
    id: "micro-16",
    category: "web3",
    title: { en: "Staking phrasing (no guarantees)", ru: "Формулировки стейкинга (без гарантий)" },
    what: { en: "Legal-safe staking copy and UX", ru: "Юридически безопасные тексты и UX стейкинга" },
    outcome: { en: "'Lock for benefits' not 'earn interest'", ru: "«Блокировка для бенефитов», не «заработок процентов»" },
  },
  {
    id: "micro-17",
    category: "product",
    title: { en: "Admin dashboard scope", ru: "Скоуп админ-дашборда" },
    what: { en: "Non-technical admin interface design", ru: "Дизайн интерфейса для нетехнических админов" },
    outcome: { en: "Business team self-serves 90% of needs", ru: "Бизнес-команда самостоятельно решает 90% задач" },
  },
  {
    id: "micro-18",
    category: "infrastructure",
    title: { en: "Event-based analytics plan", ru: "План event-based аналитики" },
    what: { en: "Structured event taxonomy and tracking", ru: "Структурированная таксономия событий и трекинг" },
    outcome: { en: "Actionable data from day one", ru: "Данные для действий с первого дня" },
  },
  {
    id: "micro-19",
    category: "product",
    title: { en: "Deposit payment UX", ru: "UX депозитных платежей" },
    what: { en: "Anti-refund booking flow", ru: "Флоу бронирования против чарджбэков" },
    outcome: { en: "No-shows: 32% → 8%, chargebacks: -90%", ru: "Неявки: 32% → 8%, чарджбэки: -90%" },
  },
  {
    id: "micro-20",
    category: "product",
    title: { en: "Scope control & change log", ru: "Контроль объёма и журнал изменений" },
    what: { en: "Systematic scope change management", ru: "Систематическое управление изменениями объёма" },
    outcome: { en: "No scope creep surprises", ru: "Никаких сюрпризов с расползанием объёма" },
  },
  {
    id: "micro-21",
    category: "product",
    title: { en: "Weekly demo rhythm", ru: "Ритм еженедельных демо" },
    what: { en: "Structured demo process with recordings", ru: "Структурированный процесс демо с записями" },
    outcome: { en: "Stakeholders always in sync", ru: "Заинтересованные стороны всегда в курсе" },
  },
  {
    id: "micro-22",
    category: "product",
    title: { en: "Investor docs structure (deck/one-pager)", ru: "Структура инвестор-доков (дек/one-pager)" },
    what: { en: "Template for pitch materials", ru: "Шаблон для pitch материалов" },
    outcome: { en: "Consistent, professional presentation", ru: "Консистентная, профессиональная презентация" },
  },
  {
    id: "micro-23",
    category: "infrastructure",
    title: { en: "Technical appendix structure", ru: "Структура технического приложения" },
    what: { en: "Architecture docs for due diligence", ru: "Архитектурная документация для due diligence" },
    outcome: { en: "Technical DD completed in 3 days", ru: "Технический DD завершён за 3\u00A0дня" },
  },
  {
    id: "micro-24",
    category: "infrastructure",
    title: { en: "DTO/API contract discipline", ru: "Дисциплина DTO/API контрактов" },
    what: { en: "Strict API versioning and contracts", ru: "Строгое версионирование API и контракты" },
    outcome: { en: "Zero breaking changes to clients", ru: "Ноль ломающих изменений для клиентов" },
  },
  {
    id: "micro-25",
    category: "infrastructure",
    title: { en: "Cache + DB split", ru: "Разделение кеша и БД" },
    what: { en: "Tiered storage architecture", ru: "Многоуровневая архитектура хранения" },
    outcome: { en: "95th percentile latency: 180ms", ru: "95-й перцентиль латентности: 180мс" },
  },
  {
    id: "micro-26",
    category: "infrastructure",
    title: { en: "Geo resolution strategy", ru: "Стратегия гео-разрешения" },
    what: { en: "H3 hexagonal grid for location data", ru: "H3 гексагональная сетка для локационных данных" },
    outcome: { en: "Consistent aggregation across zoom levels", ru: "Консистентная агрегация на всех уровнях зума" },
  },
  {
    id: "micro-27",
    category: "infrastructure",
    title: { en: "Read-only public APIs", ru: "Read-only публичные API" },
    what: { en: "Secure external API exposure", ru: "Безопасное раскрытие внешних API" },
    outcome: { en: "50+ integrations, zero incidents", ru: "50+ интеграций, ноль инцидентов" },
  },
  {
    id: "micro-28",
    category: "product",
    title: { en: "Technical storytelling (founder voice)", ru: "Технический сторителлинг (голос основателя)" },
    what: { en: "Clear technical communication", ru: "Понятная техническая коммуникация" },
    outcome: { en: "Investors understand the tech", ru: "Инвесторы понимают технологию" },
  },
  {
    id: "micro-29",
    category: "product",
    title: { en: "NDA-ready delivery", ru: "Поставка с готовностью к NDA" },
    what: { en: "Confidential project handling", ru: "Работа с конфиденциальными проектами" },
    outcome: { en: "Full IP protection, clear ownership", ru: "Полная защита IP, чёткое владение" },
  },
  {
    id: "micro-30",
    category: "product",
    title: { en: "Milestone-based delivery", ru: "Поставка по вехам" },
    what: { en: "Clear deliverables per phase", ru: "Чёткие deliverables по фазам" },
    outcome: { en: "Predictable progress, no surprises", ru: "Предсказуемый прогресс, без сюрпризов" },
  },
];

export function getCasesByCategory(category: CaseCategory | "all", cases: MicroCase[]): MicroCase[] {
  if (category === "all") return cases;
  return cases.filter((c) => c.category === category);
}

export function getFlagshipCaseBySlug(slug: string): FlagshipCase | undefined {
  return flagshipCases.find((c) => c.slug === slug);
}

export function getMicroCaseById(id: string): MicroCase | undefined {
  return microCases.find((c) => c.id === id);
}

// Get related flagship cases by category for micro case detail pages
export function getRelatedFlagshipCases(category: CaseCategory, limit = 2): FlagshipCase[] {
  return flagshipCases.filter((c) => c.category === category).slice(0, limit);
}
