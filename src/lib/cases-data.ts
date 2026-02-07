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
  imageUrl?: string;
  heroImage?: string;
  screenshots?: { src: string; alt: { en: string; ru: string } }[];
}

export interface MicroCase {
  id: string;
  category: CaseCategory;
  title: { en: string; ru: string };
  what: { en: string; ru: string };
  outcome: { en: string; ru: string };
}

// ORDERING RULE:
//   1. case-1 (web3-l1-dex / ArmaDEX) is PINNED at index 0 — always first.
//   2. New cases go at index 1 (right after case-1) so newest projects appear second.
//   3. Older cases follow in chronological order (newest → oldest).
const _flagshipCases: FlagshipCase[] = [
  {
    id: "case-13",
    slug: "trm-oferta-registration",
    category: "product",
    year: 2026,
    title: {
      en: "TRM Oferta: online registration and public offer acceptance (end\u2011to\u2011end)",
      ru: "TRM Oferta: онлайн\u2011регистрация и акцепт публичной оферты (end\u2011to\u2011end)",
    },
    summary: {
      en: "Full product flow: registration, public offer acceptance with audit trail, PDF proof with seal/signature, admin panel. Legally compliant, mobile\u2011first.",
      ru: "Полный продуктовый поток: регистрация, акцепт публичной оферты с аудит\u2011трейлом, PDF\u2011подтверждение с печатью/подписью, админка. Юридически корректно, mobile\u2011first.",
    },
    metrics: [
      { label: { en: "Steps in UX flow", ru: "Шагов в UX\u2011потоке" }, value: "3" },
      { label: { en: "Audit fields per record", ru: "Полей аудита на запись" }, value: "9+" },
    ],
    artifactHint: { en: "Offer acceptance + PDF", ru: "Акцепт оферты + PDF" },
    industry: { en: "EdTech / Legal", ru: "EdTech / Юридические услуги" },
    timeline: { en: "2\u00A0weeks", ru: "2\u00A0недели" },
    problem: {
      en: "An education company needed to collect legally binding offer acceptance from students (including minors with legal guardians) online, generate PDF confirmations with official seal and signature, and store a tamper\u2011proof audit trail\u00A0\u2014 all without manual paperwork.",
      ru: "Образовательной компании нужно было собирать юридически обязывающий акцепт оферты от учеников (включая несовершеннолетних с законными представителями) онлайн, генерировать PDF\u2011подтверждения с печатью и подписью директора и хранить аудит\u2011трейл\u00A0\u2014 всё без бумажной работы.",
    },
    constraints: {
      en: [
        "Must handle adult and minor registration flows differently",
        "Legal guardian must accept offer for minors (explicit checkbox + data)",
        "PDF must include Cyrillic text, official seal, and director signature",
        "Audit trail: IP, User\u2011Agent, timestamp, offer version, consent checkboxes",
        "Admin panel protected by HTTP Basic Auth",
        "Cloud PostgreSQL (Neon.tech) \u2014 no local file dependencies",
        "Mobile\u2011first: 70%+ traffic from phones",
      ],
      ru: [
        "Разные потоки регистрации для совершеннолетних и несовершеннолетних",
        "Законный представитель подписывает оферту за несовершеннолетнего (явный чекбокс + данные)",
        "PDF должен содержать кириллицу, печать и подпись директора",
        "Аудит\u2011трейл: IP, User\u2011Agent, timestamp, версия оферты, галочки согласия",
        "Админка защищена HTTP Basic Auth",
        "Облачная PostgreSQL (Neon.tech)\u00A0\u2014 без привязки к локальным файлам",
        "Mobile\u2011first: 70%+ трафика с телефонов",
      ],
    },
    solution: {
      en: "Built a 3\u2011step conversion flow: registration (with conditional fields for minors), offer review and acceptance (progressive disclosure of full text), and deposit instructions with WhatsApp deep\u2011link. Each step validates before proceeding. Backend stores full audit trail in cloud PostgreSQL, generates branded PDF with Cyrillic support, seal, and signature. Admin panel with Basic Auth for viewing records, downloading PDFs, and changing statuses.",
      ru: "Построили 3\u2011шаговый конверсионный поток: регистрация (с условными полями для несовершеннолетних), ознакомление и принятие оферты (progressive disclosure полного текста), инструкции по внесению задатка с deep\u2011link в WhatsApp. Каждый шаг валидируется перед переходом. Бэкенд хранит полный аудит\u2011трейл в облачной PostgreSQL, генерирует брендированный PDF с поддержкой кириллицы, печатью и подписью. Админка с Basic Auth для просмотра записей, скачивания PDF и смены статусов.",
    },
    deliverables: {
      en: [
        "3\u2011step registration + offer acceptance flow",
        "Conditional UX for adult vs minor registration",
        "PDF generation with Cyrillic, seal, and director signature",
        "Cloud PostgreSQL with full audit trail (9+ fields per record)",
        "Admin panel with HTTP Basic Auth",
        "WhatsApp deep\u2011link for deposit follow\u2011up",
        "Email notifications to admin (optional SMTP)",
        "Production deployment with public URL",
      ],
      ru: [
        "3\u2011шаговый поток регистрации + акцепт оферты",
        "Условный UX для совершеннолетних и несовершеннолетних",
        "Генерация PDF с кириллицей, печатью и подписью директора",
        "Облачная PostgreSQL с полным аудит\u2011трейлом (9+ полей на запись)",
        "Админка с HTTP Basic Auth",
        "Deep\u2011link WhatsApp для связи по задатку",
        "Email\u2011уведомления админу (опциональный SMTP)",
        "Деплой в продакшн с публичным URL",
      ],
    },
    techStack: ["Node.js", "Express", "PostgreSQL", "Neon.tech", "PDFKit", "Tailwind CSS", "Nodemailer"],
    outcome: {
      en: "Launched in production. All registrations go through the digital flow\u00A0\u2014 zero paper forms. Every acceptance has a tamper\u2011proof audit record. PDFs with seal and signature are generated instantly. Admin panel lets the team manage records without developer involvement.",
      ru: "Запущен в продакшн. Все регистрации идут через цифровой поток\u00A0\u2014 ноль бумажных форм. Каждый акцепт имеет аудит\u2011запись. PDF с печатью и подписью генерируются мгновенно. Админка позволяет команде управлять записями без участия разработчика.",
    },
    hardParts: [
      {
        title: { en: "Minor/guardian conditional flow", ru: "Условный поток для несовершеннолетних" },
        description: {
          en: "When student is under 18, the form dynamically adds guardian fields, a warning banner, and an explicit confirmation checkbox. The offer acceptance page also adds a separate guardian consent checkbox. All conditional data is stored in the audit trail.",
          ru: "Когда ученик младше 18, форма динамически добавляет поля представителя, предупреждающий баннер и явный чекбокс подтверждения. На странице оферты добавляется отдельный чекбокс согласия представителя. Все условные данные хранятся в аудит\u2011трейле.",
        },
      },
      {
        title: { en: "Cyrillic PDF with seal and signature", ru: "PDF с кириллицей, печатью и подписью" },
        description: {
          en: "Default PDFKit doesn\u2019t render Cyrillic. Embedded a TTF font with full RU support. Positioned the company seal and director signature as images with precise rotation, scale, and coordinates\u00A0\u2014 tuned through several iterations.",
          ru: "PDFKit по умолчанию не рендерит кириллицу. Встроили TTF\u2011шрифт с полной поддержкой RU. Позиционировали печать и подпись директора как изображения с точным поворотом, масштабом и координатами\u00A0\u2014 подобрали за несколько итераций.",
        },
      },
      {
        title: { en: "Tamper\u2011proof audit trail", ru: "Аудит\u2011трейл с защитой от подмены" },
        description: {
          en: "Each acceptance stores: full name, phone, guardian data (if minor), consent checkboxes, IP address, User\u2011Agent, timestamp, offer version, and record status. All fields are append\u2011only in PostgreSQL. Status changes are logged. Admin can view but not edit acceptance data.",
          ru: "Каждый акцепт хранит: ФИО, телефон, данные представителя (если несовершеннолетний), галочки согласия, IP\u2011адрес, User\u2011Agent, timestamp, версию оферты и статус записи. Все поля append\u2011only в PostgreSQL. Смены статуса логируются. Админ может просматривать, но не редактировать данные акцепта.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Adult flow E2E", ru: "E2E поток совершеннолетнего" }, passed: true },
      { name: { en: "Minor flow E2E", ru: "E2E поток несовершеннолетнего" }, passed: true },
      { name: { en: "PDF Cyrillic rendering", ru: "Рендеринг кириллицы в PDF" }, passed: true },
      { name: { en: "Audit trail completeness", ru: "Полнота аудит\u2011трейла" }, passed: true },
      { name: { en: "Admin auth security", ru: "Безопасность авторизации админки" }, passed: true },
    ],
    imageUrl: "/images/cases/trm-oferta/step1-adult.png",
    heroImage: "/images/cases/trm-oferta/step1-adult.png",
    screenshots: [
      {
        src: "/images/cases/trm-oferta/step1-adult.png",
        alt: {
          en: "Step 1: Adult registration form with name and phone fields",
          ru: "Шаг 1: Форма регистрации совершеннолетнего с полями ФИО и телефона",
        },
      },
      {
        src: "/images/cases/trm-oferta/step1-minor.png",
        alt: {
          en: "Step 1: Minor registration with guardian fields and warning banner",
          ru: "Шаг 1: Регистрация несовершеннолетнего с полями представителя и предупреждением",
        },
      },
      {
        src: "/images/cases/trm-oferta/step2-oferta.png",
        alt: {
          en: "Step 2: Public offer review and acceptance with checkbox",
          ru: "Шаг 2: Ознакомление и принятие публичной оферты с чекбоксом",
        },
      },
      {
        src: "/images/cases/trm-oferta/step3-deposit.png",
        alt: {
          en: "Step 3: Offer signed, record UUID, PDF download, WhatsApp contact",
          ru: "Шаг 3: Оферта подписана, номер записи (UUID), скачивание PDF, связь через WhatsApp",
        },
      },
    ],
  },
  {
    id: "case-1",
    slug: "web3-l1-dex",
    category: "web3",
    year: 2025,
    title: {
      en: "L1 blockchain with built\u2011in perpetual DEX (end\u2011to\u2011end)",
      ru: "L1 блокчейн со встроенной DEX перпетуалов (end\u2011to\u2011end)",
    },
    summary: {
      en: "Performance\u2011oriented Layer\u20111 on Rust with deterministic EVM, native token economics, on\u2011chain perpetual orderbook, privacy layer (Bulletproofs), and a full product suite: DEX UI, Explorer, Operator Panel, Faucet, SDK.",
      ru: "Производительный Layer\u20111 на Rust с детерминированным EVM, экономикой нативного токена, ончейн\u2011ордербуком перпетуалов, слоем приватности (Bulletproofs) и полным продуктовым контуром: DEX UI, Explorer, Operator Panel, Faucet, SDK.",
    },
    metrics: [
      { label: { en: "Rust core modules", ru: "Модулей ядра на Rust" }, value: "15+" },
      { label: { en: "Frontend apps shipped", ru: "Отправленных фронтенд\u2011приложений" }, value: "4" },
      { label: { en: "API endpoints", ru: "API\u2011эндпоинтов" }, value: "60+" },
    ],
    artifactHint: { en: "L1 node + 4 UIs + SDK", ru: "L1 нода + 4 UI + SDK" },
    industry: { en: "Blockchain / DeFi", ru: "Блокчейн / DeFi" },
    timeline: { en: "4\u00A0months", ru: "4\u00A0месяца" },
    problem: {
      en: "Trading latency and cost on general\u2011purpose L1s force perpetual DEX projects into off\u2011chain compromises that sacrifice verifiability. The partner needed a purpose\u2011built chain where the matching engine, margin logic, and settlement live at the protocol level\u00A0\u2014 with full EVM compatibility, a native token with hard\u2011capped economics, and governance that limits parameter changes to safe bounds.",
      ru: "Задержки и стоимость трейдинга на универсальных L1 вынуждают DEX\u2011проекты перпетуалов уходить офчейн, жертвуя верифицируемостью. Партнёру нужен был целевой блокчейн, где матчинг, маржинальная логика и расчёты живут на уровне протокола\u00A0\u2014 с полной EVM\u2011совместимостью, нативным токеном с жёсткой экономикой и governance, ограничивающим изменения параметров безопасными границами.",
    },
    constraints: {
      en: [
        "Deterministic execution: same input \u2192 same result (critical for batch replay and fraud proofs)",
        "EVM compatibility: MetaMask, ethers, Hardhat, Solidity contracts must work natively",
        "Native token accessible from EVM without ERC\u201120 wrapper (precompile 0x0a)",
        "Perpetual DEX logic at protocol level, not in smart contracts",
        "Privacy layer: shielded orders with cryptographic range proofs (Bulletproofs)",
        "Governance bounded by hard\u2011coded limits\u00A0\u2014 no arbitrary parameter overrides",
        "Full product suite: DEX terminal, block explorer, operator panel, faucet, SDK",
        "Detailed data under NDA\u00A0\u2014 portfolio shows architecture and capabilities",
      ],
      ru: [
        "Детерминированное исполнение: одинаковый вход \u2192 одинаковый результат (критично для replay и fraud proof)",
        "EVM\u2011совместимость: MetaMask, ethers, Hardhat, контракты Solidity работают нативно",
        "Нативный токен доступен из EVM без ERC\u201120 обёртки (прекомпайл 0x0a)",
        "Логика перпетуальной DEX на уровне протокола, а не в смарт\u2011контрактах",
        "Слой приватности: shielded\u2011ордера с криптографическими range proof (Bulletproofs)",
        "Изменения governance ограничены жёстко заданными лимитами\u00A0\u2014 без произвольных изменений",
        "Полный продуктовый контур: DEX\u2011терминал, эксплорер, панель оператора, faucet, SDK",
        "Детальные данные под NDA\u00A0\u2014 портфолио показывает архитектуру и возможности",
      ],
    },
    solution: {
      en: "Built a single\u2011binary Rust node integrating consensus, validator registry, governance, slashing, fee market, EVM executor (revm, EIP\u20111559/2930), native token state, DEX engine (orderbook, positions, trades, OHLC candles), privacy primitives (Bulletproofs), checkpoint sync, and hybrid storage. The node exposes HTTP API (60+ endpoints), JSON\u2011RPC (Ethereum\u2011compatible), and WebSocket (EVM subscriptions + DEX realtime streams). Shipped four Next.js applications: DEX trading terminal, public block explorer with contract verification, operator UI for node management/governance/staking, and testnet faucet. TypeScript SDK for third\u2011party integrations.",
      ru: "Построили Rust\u2011ноду в одном бинарнике: консенсус, реестр валидаторов, governance, слэшинг, fee market, EVM\u2011исполнитель (revm, EIP\u20111559/2930), состояние нативного токена, DEX\u2011движок (ордербук, позиции, сделки, OHLC\u2011свечи), криптопримитивы (Bulletproofs), checkpoint sync, гибридное хранилище. Нода предоставляет HTTP API (60+ эндпоинтов), JSON\u2011RPC (Ethereum\u2011совместимый) и WebSocket (EVM\u2011подписки + DEX realtime\u2011стримы). Отправили четыре Next.js приложения: DEX\u2011терминал, эксплорер с верификацией контрактов, Operator UI для управления нодой/governance/стейкинга и тестнет\u2011фаукнет. TypeScript SDK для сторонних интеграций.",
    },
    deliverables: {
      en: [
        "L1 node on Rust: consensus, validators, governance, slashing, fee market, sync",
        "Deterministic EVM executor (revm) with EIP\u20111559/2930 and native token precompile",
        "On\u2011chain perpetual DEX: orderbook, matching, positions, trades, OHLC, WebSocket streams",
        "Privacy layer with Bulletproofs for shielded orders",
        "Token economics: hard\u2011capped supply, epoch\u2011based emission, staking rewards",
        "DEX Trading UI (Next.js): terminal, charts, order forms, wallet integration",
        "Block Explorer: batches, transactions, contract verification, statistics, gas tracker",
        "Operator Panel: node status, governance, staking, fraud proof, sync, rolling updates",
        "Testnet Faucet with MetaMask integration",
        "TypeScript SDK for HTTP API and DEX integration",
        "Solidity contracts + Hardhat deployment scripts",
        "CI/CD, Prometheus/Grafana, OpenTelemetry, Nginx rate limiting",
      ],
      ru: [
        "L1 нода на Rust: консенсус, валидаторы, governance, слэшинг, fee market, синхронизация",
        "Детерминированный EVM\u2011исполнитель (revm) с EIP\u20111559/2930 и прекомпайлом нативного токена",
        "Ончейн DEX перпетуалов: ордербук, матчинг, позиции, сделки, OHLC, WebSocket\u2011стримы",
        "Слой приватности на Bulletproofs для shielded\u2011ордеров",
        "Токеномика: жёсткий supply cap, эмиссия по эпохам, награды за стейкинг",
        "DEX Trading UI (Next.js): терминал, графики, формы ордеров, интеграция кошельков",
        "Эксплорер: батчи, транзакции, верификация контрактов, статистика, gas tracker",
        "Operator Panel: статус ноды, governance, стейкинг, fraud proof, sync, rolling updates",
        "Тестнет\u2011фаукнет с интеграцией MetaMask",
        "TypeScript SDK для HTTP API и DEX\u2011интеграции",
        "Solidity\u2011контракты + скрипты деплоя Hardhat",
        "CI/CD, Prometheus/Grafana, OpenTelemetry, rate limiting Nginx",
      ],
    },
    techStack: [
      "Rust", "Tokio", "revm", "SQLx", "PostgreSQL",
      "Solidity", "Hardhat", "OpenZeppelin",
      "Next.js 14", "React 18", "Tailwind", "Zustand", "TanStack Query",
      "TypeScript", "ethers v6",
      "Prometheus", "Grafana", "OpenTelemetry",
      "Bulletproofs", "secp256k1", "blake3",
    ],
    outcome: {
      en: "Testnet Alpha deployed and running: 7 active validators, 1.6M+ finalized batches, 99%+ success rate. Full product suite operational: DEX terminal with realtime orderbook, block explorer with contract verification and gas tracker, operator panel with governance/staking/fraud proof controls, working faucet. Batches processed every ~2\u00A0seconds with sub\u2011250ms commit latency. Architecture, test coverage, and operational tooling at production\u2011grade level.",
      ru: "Testnet Alpha развёрнут и работает: 7 активных валидаторов, 1,6M+ финализированных батчей, 99%+ успешность. Полный продуктовый контур функционирует: DEX\u2011терминал с realtime\u2011ордербуком, эксплорер с верификацией контрактов и gas tracker, панель оператора с governance/стейкинг/fraud proof, рабочий фаукнет. Батчи каждые ~2\u00A0с с латентностью <250\u00A0мс. Архитектура, тесты и операционные инструменты на уровне продакшна.",
    },
    hardParts: [
      {
        title: { en: "Deterministic EVM with native token bridge", ru: "Детерминированный EVM с мостом нативного токена" },
        description: {
          en: "EVM execution must be fully deterministic for batch replay and fraud proofs. We run revm with EIP\u20111559/2930 support and expose the native token via a precompile at address 0x0a (balanceOf, transfer, totalSupply)\u00A0\u2014 no ERC\u201120 wrapper duplication. Every state transition is reproducible across nodes.",
          ru: "Исполнение EVM полностью детерминировано для replay батчей и fraud proof. Используем revm с EIP\u20111559/2930 и предоставляем нативный токен через прекомпайл по адресу 0x0a (balanceOf, transfer, totalSupply)\u00A0\u2014 без дублирования ERC\u201120. Каждый переход состояния воспроизводим на всех нодах.",
        },
      },
      {
        title: { en: "Protocol\u2011level perpetual DEX engine", ru: "DEX\u2011движок перпетуалов на уровне протокола" },
        description: {
          en: "Orderbook, matching, positions, margin calculations, and trade settlement live inside the node binary, finalized by the same consensus as regular transactions. WebSocket streams deliver realtime updates to the UI. Shielded orders use Bulletproofs for cryptographic range proofs.",
          ru: "Ордербук, матчинг, позиции, расчёт маржи и расчёты сделок живут внутри бинарника ноды и финализируются тем же консенсусом. WebSocket\u2011стримы доставляют realtime\u2011обновления в UI. Shielded\u2011ордера используют Bulletproofs для криптографических range proof.",
        },
      },
      {
        title: { en: "Governance within hard bounds", ru: "Governance в жёстких границах" },
        description: {
          en: "Protocol parameters can be changed through on\u2011chain proposals, but only within pre\u2011defined bounds hard\u2011coded into the node. Prevents governance attacks while preserving flexibility. Quorum 33%, regular >50%, critical >67%. Slashing is irreversible\u00A0\u2014 governance cannot rollback penalties.",
          ru: "Параметры протокола можно менять через ончейн\u2011предложения, но только в заранее вшитых границах. Предотвращает governance\u2011атаки, сохраняя гибкость. Кворум 33%, обычный порог >50%, критический >67%. Слэшинг необратим\u00A0\u2014 governance не может откатить штрафы.",
        },
      },
      {
        title: { en: "Four production\u2011grade frontends", ru: "Четыре фронтенда продакшн\u2011уровня" },
        description: {
          en: "DEX Trading UI with realtime charts, orderbook depth, and wallet connection. ArmaScan explorer with contract verification via solc, gas tracker with cost calculator, and data export. Operator Panel for node monitoring, governance, staking, fraud proof, sync, and rolling updates. Faucet with MetaMask auto\u2011fill and rate limiting.",
          ru: "DEX Trading UI с realtime\u2011графиками, глубиной стакана и подключением кошелька. Эксплорер ArmaScan с верификацией контрактов через solc, gas tracker с калькулятором стоимости и экспортом. Operator Panel для мониторинга ноды, governance, стейкинга, fraud proof, sync и rolling updates. Фаукнет с автозаполнением MetaMask и rate limiting.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Rust build (all features)", ru: "Сборка Rust (все фичи)" }, passed: true },
      { name: { en: "EVM determinism tests", ru: "Тесты детерминизма EVM" }, passed: true },
      { name: { en: "Consensus & finality tests", ru: "Тесты консенсуса и финалити" }, passed: true },
      { name: { en: "Governance / slashing invariants", ru: "Инварианты governance / слэшинга" }, passed: true },
      { name: { en: "DEX orderbook & margin rules", ru: "Ордербук DEX и маржинальные правила" }, passed: true },
      { name: { en: "Privacy / Bulletproofs correctness", ru: "Корректность Bulletproofs" }, passed: true },
      { name: { en: "Wallet compatibility (MetaMask, ethers)", ru: "Совместимость кошельков (MetaMask, ethers)" }, passed: true },
      { name: { en: "Testnet Alpha deployment", ru: "Деплой Testnet Alpha" }, passed: true },
    ],
    imageUrl: "/images/cases/armadex/dex-trading.png",
    heroImage: "/images/cases/armadex/operator-overview.png",
    screenshots: [
      { src: "/images/cases/armadex/dex-trading.png", alt: { en: "DEX Trading Terminal: orderbook, price chart, buy/sell forms, market list", ru: "DEX\u2011терминал: ордербук, ценовой график, формы покупки/продажи, список рынков" } },
      { src: "/images/cases/armadex/markets.png", alt: { en: "Markets: all trading pairs with price, volume, and action buttons", ru: "Рынки: торговые пары с ценой, объёмом и кнопками действий" } },
      { src: "/images/cases/armadex/explorer-blocks.png", alt: { en: "Block Explorer: batch list with hash, transactions, timestamp, status", ru: "Эксплорер: список батчей с хешем, транзакциями, временем и статусом" } },
      { src: "/images/cases/armadex/network-statistics.png", alt: { en: "Network Statistics: block height, TPS, total batches, success rate", ru: "Статистика сети: высота блока, TPS, всего батчей, процент успеха" } },
      { src: "/images/cases/armadex/gas-tracker.png", alt: { en: "Gas Tracker: gas price, average usage, network activity chart", ru: "Gas Tracker: цена газа, среднее использование, график активности" } },
      { src: "/images/cases/armadex/gas-calculator.png", alt: { en: "Gas Calculator: transaction type estimation and cost formula", ru: "Калькулятор газа: оценка типов транзакций и формула стоимости" } },
      { src: "/images/cases/armadex/verify-contract.png", alt: { en: "Verify Contract: Solidity source submission for bytecode verification", ru: "Верификация контракта: отправка Solidity\u2011кода для проверки байткода" } },
      { src: "/images/cases/armadex/developer-portal.png", alt: { en: "Developer Portal: Remix IDE, Faucet, RPC, Chain ID, deployment docs", ru: "Портал разработчика: Remix IDE, Faucet, RPC, Chain ID, доки деплоя" } },
      { src: "/images/cases/armadex/operator-overview.png", alt: { en: "Operator Panel: node overview, block height, role, latency, verification", ru: "Панель оператора: обзор ноды, высота блока, роль, латентность" } },
      { src: "/images/cases/armadex/dex-orderbook.png", alt: { en: "Operator DEX: price chart, asks/bids, last price, spread, depth", ru: "Ордербук DEX: график цены, asks/bids, последняя цена, спред, глубина" } },
      { src: "/images/cases/armadex/network-overview.png", alt: { en: "Network Overview: chain params, activity metrics, health status", ru: "Обзор сети: параметры чейна, метрики, статус здоровья" } },
      { src: "/images/cases/armadex/governance.png", alt: { en: "Governance: create proposals, validator management, voting", ru: "Governance: создание предложений, управление валидаторами, голосование" } },
      { src: "/images/cases/armadex/staking.png", alt: { en: "Staking: validators with stake, delegation, voting power", ru: "Стейкинг: валидаторы со стейком, делегированием, voting power" } },
      { src: "/images/cases/armadex/fraud-proof.png", alt: { en: "Fraud Proof: batch verification, valid/fraudulent counts", ru: "Fraud Proof: верификация батчей, счётчики валидных/мошеннических" } },
      { src: "/images/cases/armadex/sync-status.png", alt: { en: "Sync Status: progress, current height, latest checkpoint", ru: "Статус синхронизации: прогресс, текущая высота, чекпоинт" } },
      { src: "/images/cases/armadex/rolling-updates.png", alt: { en: "Rolling Updates: version management, admin auth", ru: "Rolling Updates: управление версиями, аутентификация" } },
      { src: "/images/cases/armadex/evm-registrations.png", alt: { en: "EVM Registrations: address\u2011to\u2011trader mapping, balances", ru: "EVM\u2011регистрации: маппинг адресов к трейдерам, балансы" } },
      { src: "/images/cases/armadex/register-validator.png", alt: { en: "Register Validator: ID, public key, stake, signature", ru: "Регистрация валидатора: ID, публичный ключ, стейк, подпись" } },
      { src: "/images/cases/armadex/faucet.png", alt: { en: "Faucet: request test tokens, MetaMask integration", ru: "Фаукнет: запрос тестовых токенов, интеграция MetaMask" } },
      { src: "/images/cases/armadex/recent-activity.png", alt: { en: "Explorer: recent activity, network info, stats", ru: "Эксплорер: активность, информация о сети, статистика" } },
      { src: "/images/cases/armadex/peer-network.png", alt: { en: "Peer Network: connected peers discovery and monitoring", ru: "Peer Network: обнаружение и мониторинг пиров" } },
    ],
  },
  {
    id: "case-2",
    slug: "utility-token-uae",
    category: "web3",
    year: 2025,
    title: {
      en: "Web3 Loyalty & Membership Platform: Token + NFT + Vouchers + Staking (UAE)",
      ru: "Web3 Loyalty & Membership Platform: Токен + NFT + Ваучеры + Стейкинг (ОАЭ)",
    },
    summary: {
      en: "Full-stack Web3 loyalty platform for a car rental business: utility token, NFT membership tiers (Bronze/Silver/Gold/Platinum), voucher system, staking with transparent reward logic, admin panel, and conversion-oriented landing pages.",
      ru: "Полноценная Web3\u2011платформа лояльности для бизнеса проката авто: утилити\u2011токен, NFT\u2011уровни членства (Bronze/Silver/Gold/Platinum), система ваучеров, стейкинг с прозрачной логикой начислений, админ\u2011панель и конверсионные лендинги.",
    },
    metrics: [
      { label: { en: "NFT membership tiers", ru: "NFT\u2011уровней членства" }, value: "4" },
      { label: { en: "Token holders", ru: "Держателей токена" }, value: "40K+" },
      { label: { en: "Tokens staked", ru: "Токенов в стейкинге" }, value: "15M+" },
      { label: { en: "NFTs minted", ru: "NFT отчеканено" }, value: "500+" },
    ],
    artifactHint: { en: "Security audit + deployment reports", ru: "Security\u2011аудит + деплой\u2011отчёты" },
    industry: { en: "Car Rental / Web3 Loyalty", ru: "Прокат авто / Web3\u2011лояльность" },
    timeline: { en: "10 weeks", ru: "10\u00A0недель" },
    problem: {
      en: "A UAE-based premium car rental company needed a loyalty and membership system that would increase LTV/retention through real utility (discounts, priority booking, exclusive access), not speculative token value. The solution had to work as a product: UX-first, clear scenarios, minimal 'crypto friction' for non-technical customers, while maintaining compliance with UAE virtual asset guidelines.",
      ru: "Премиальная компания проката авто из ОАЭ нуждалась в системе лояльности и членства, повышающей LTV/retention через реальную утилити (скидки, приоритетное бронирование, эксклюзивный доступ), а не спекулятивную стоимость токена. Решение должно работать как продукт: UX\u2011first, понятные сценарии, минимальные «крипто\u2011трения» для нетехнических клиентов, при соблюдении UAE virtual asset guidelines.",
    },
    constraints: {
      en: [
        "No investment promises — pure utility token, not a security",
        "NFT tiers must map to real-world benefits (car upgrades, restaurant discounts, concierge)",
        "Staking described as 'lock for benefits', never 'earn interest' — compliance-first wording",
        "Non-technical stakeholders (managers, admin team) need full operational control",
        "Mobile-first UX, minimizing Web3 complexity for end users",
        "BEP-20 on Binance Smart Chain — low gas fees for mass adoption",
        "Security audit artifacts and deployment readiness reports required before launch",
        "NDA: exact business metrics and partner identity are confidential",
      ],
      ru: [
        "Никаких инвестиционных обещаний — чистый утилити\u2011токен, не ценная бумага",
        "NFT\u2011уровни привязаны к реальным бенефитам (апгрейд авто, скидки в ресторане, консьерж)",
        "Стейкинг описан как «блокировка для бенефитов», а не «заработок процентов» — compliance\u2011first формулировки",
        "Нетехническим стейкхолдерам (менеджеры, админ\u2011команда) нужен полный операционный контроль",
        "Mobile\u2011first UX, минимизация Web3\u2011сложности для конечных пользователей",
        "BEP-20 на Binance Smart Chain — низкие gas fees для массового adoption",
        "Артефакты security\u2011аудита и отчёты готовности к деплою обязательны до запуска",
        "NDA: точные бизнес\u2011метрики и данные партнёра конфиденциальны",
      ],
    },
    solution: {
      en: "Built a full product loop: membership NFT tiers (Bronze → Platinum) with escalating real-world benefits, a voucher/coupon system tied to tier level, staking mechanics that reward commitment with access (not yield), a rich dashboard (overview, staking, rewards, NFT collection, transaction history, profile), admin panel with operational guides, conversion-optimized landing pages (hero, How It Works, Utility Ecosystem, Loyalty Tiers, NFT Marketplace, Tokenomics, Roadmap), and smart contracts with deployment/security audit documentation.",
      ru: "Построили полный продуктовый контур: NFT\u2011уровни членства (Bronze → Platinum) с нарастающими реальными бенефитами, систему ваучеров/купонов привязанную к уровню, стейкинг\u2011механику вознаграждающую commitment доступом (а не доходностью), развёрнутый дашборд (обзор, стейкинг, награды, NFT\u2011коллекция, история транзакций, профиль), админ\u2011панель с операционными гайдами, конверсионные лендинги (хиро, How It Works, Utility Ecosystem, Loyalty Tiers, NFT Marketplace, Tokenomics, Roadmap) и смарт\u2011контракты с документацией деплоя/security\u2011аудита.",
    },
    deliverables: {
      en: [
        "BEP-20 utility token smart contract (PADD-R)",
        "NFT membership contracts (4 tiers: Bronze/Silver/Gold/Platinum)",
        "Staking contract (benefit-based, transparent reward logic)",
        "Voucher/coupon system with NFT-gated access",
        "User dashboard (Overview, Stake, Rewards, NFTs, History, Profile)",
        "Public landing site (Hero, How It Works, Utility Ecosystem, Tiers, NFT Marketplace, Tokenomics, Roadmap)",
        "Wallet integration (MetaMask, BSC network switch)",
        "Admin panel with operational guides (ADMIN_PANEL_GUIDE, ADMIN_CAPABILITIES_REPORT)",
        "Security audit report (SECURITY_AUDIT_REPORT)",
        "Deployment & status reports (production readiness)",
        "Test scripts and contract verification utilities",
        "Simplified landing page for quick conversions",
      ],
      ru: [
        "BEP-20 смарт\u2011контракт утилити\u2011токена (PADD-R)",
        "NFT\u2011контракты членства (4 уровня: Bronze/Silver/Gold/Platinum)",
        "Контракт стейкинга (benefit\u2011based, прозрачная логика наград)",
        "Система ваучеров/купонов с NFT\u2011gated доступом",
        "Пользовательский дашборд (Обзор, Стейкинг, Награды, NFT, История, Профиль)",
        "Публичный лендинг (Хиро, How It Works, Utility Ecosystem, Tiers, NFT Marketplace, Tokenomics, Roadmap)",
        "Интеграция кошелька (MetaMask, переключение на BSC\u2011сеть)",
        "Админ\u2011панель с операционными гайдами (ADMIN_PANEL_GUIDE, ADMIN_CAPABILITIES_REPORT)",
        "Отчёт security\u2011аудита (SECURITY_AUDIT_REPORT)",
        "Отчёты деплоя и статуса (готовность к production)",
        "Тестовые скрипты и утилиты верификации контрактов",
        "Упрощённый лендинг для быстрых конверсий",
      ],
    },
    techStack: ["Solidity", "Hardhat", "OpenZeppelin", "Next.js", "React", "TypeScript", "Tailwind CSS", "ethers.js", "Binance Smart Chain (BEP-20)", "Node.js", "Web3"],
    outcome: {
      en: "Launched a production-ready Web3 loyalty platform with 40K+ token holders, 15M+ tokens staked, and 500+ NFTs minted. Four membership tiers with real-world utility (car upgrades, restaurant VIP, concierge, real estate access). Admin team operates the platform independently. Zero compliance flags during legal review. Full documentation-first approach: security audit, deployment reports, admin guides, and operational readiness artifacts.",
      ru: "Запустили production\u2011ready Web3\u2011платформу лояльности: 40K+ держателей токена, 15M+ токенов в стейкинге, 500+ NFT отчеканено. Четыре уровня членства с реальной утилити (апгрейд авто, VIP\u2011ресторан, консьерж, доступ к недвижимости). Админ\u2011команда управляет платформой самостоятельно. Ноль compliance\u2011флагов при юридической проверке. Documentation\u2011first подход: security\u2011аудит, отчёты деплоя, админ\u2011гайды и артефакты операционной готовности.",
    },
    hardParts: [
      {
        title: { en: "Compliance-First Token Design", ru: "Compliance\u2011first дизайн токена" },
        description: {
          en: "Every feature reviewed against UAE virtual asset guidelines (VARA). Token positioned as pure utility — discounts, access, membership — never as investment. Staking framed as 'commitment for access', not 'investment for return'. All user-facing copy audited for compliance.",
          ru: "Каждая функция проверена на соответствие UAE virtual asset guidelines (VARA). Токен позиционирован как чистая утилити — скидки, доступ, членство — никогда как инвестиция. Стейкинг описан как «обязательство для доступа», а не «инвестиция для возврата». Весь пользовательский текст проверен на compliance.",
        },
      },
      {
        title: { en: "NFT Tier System with Real-World Mapping", ru: "NFT\u2011система уровней с реальными бенефитами" },
        description: {
          en: "Designed 4 membership tiers (Bronze → Platinum) where each tier maps to concrete real-world benefits: car rental discounts, free rental hours, restaurant vouchers, chauffeur service, yacht trips, 5-star hotel stays. NFTs serve as verifiable proof of membership level.",
          ru: "Спроектировали 4 уровня членства (Bronze → Platinum), где каждый уровень привязан к конкретным реальным бенефитам: скидки на аренду, бесплатные часы проката, ваучеры в ресторан, услуги шофёра, яхт\u2011прогулки, проживание в 5\u2011звёздочных отелях. NFT служат верифицируемым доказательством уровня членства.",
        },
      },
      {
        title: { en: "UX-First Web3: Minimizing Crypto Friction", ru: "UX\u2011first Web3: минимизация крипто\u2011трений" },
        description: {
          en: "End users interact with familiar UI patterns (dashboard, staking calculator, reward tracking) while Web3 complexity (wallet connection, network switching, gas) is abstracted behind clear CTAs and guided flows. Non-technical managers operate the admin panel without touching code or contracts.",
          ru: "Конечные пользователи работают с привычными UI\u2011паттернами (дашборд, калькулятор стейкинга, трекинг наград), а Web3\u2011сложность (подключение кошелька, переключение сети, gas) абстрагирована за понятными CTA и guided flows. Нетехнические менеджеры управляют админ\u2011панелью без касания кода или контрактов.",
        },
      },
      {
        title: { en: "Production Readiness & Security Mindset", ru: "Production readiness и security\u2011мышление" },
        description: {
          en: "Not a demo project: security audit artifacts (SECURITY_AUDIT_REPORT), deployment status reports, admin capability documentation, and operational readiness checklists — the level of documentation expected from a team that ships to production.",
          ru: "Не демо\u2011проект: артефакты security\u2011аудита (SECURITY_AUDIT_REPORT), отчёты статуса деплоя, документация возможностей админки и чеклисты операционной готовности — уровень документации, который ожидают от команды, доводящей до production.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Smart contract tests", ru: "Тесты смарт\u2011контрактов" }, passed: true },
      { name: { en: "Security audit", ru: "Security\u2011аудит" }, passed: true },
      { name: { en: "Compliance review (VARA)", ru: "Compliance ревью (VARA)" }, passed: true },
      { name: { en: "Wallet integration (MetaMask + BSC)", ru: "Интеграция кошелька (MetaMask + BSC)" }, passed: true },
      { name: { en: "NFT minting pipeline", ru: "Пайплайн минтинга NFT" }, passed: true },
      { name: { en: "Staking flow E2E", ru: "Стейкинг\u2011flow E2E" }, passed: true },
      { name: { en: "Admin UAT", ru: "UAT админки" }, passed: true },
      { name: { en: "Deployment readiness", ru: "Готовность к деплою" }, passed: true },
    ],
    imageUrl: "/images/cases/padd-r/hero-landing.png",
    heroImage: "/images/cases/padd-r/hero-landing.png",
    screenshots: [
      { src: "/images/cases/padd-r/hero-landing.png", alt: { en: "PADD-R Landing — Hero section with 3D token visuals", ru: "PADD-R Лендинг — хиро\u2011секция с 3D\u2011визуализацией токенов" } },
      { src: "/images/cases/padd-r/about-how-it-works.png", alt: { en: "About Us metrics & How It Works flow (Buy → Stake → Rewards → Spend)", ru: "Метрики About Us и How It Works (Buy → Stake → Rewards → Spend)" } },
      { src: "/images/cases/padd-r/utility-ecosystem.png", alt: { en: "Utility Ecosystem — Car Rental, Restaurant, Concierge, Real Estate", ru: "Utility Ecosystem — Прокат авто, Ресторан, Консьерж, Недвижимость" } },
      { src: "/images/cases/padd-r/loyalty-tiers.png", alt: { en: "Loyalty Tiers — Bronze / Silver / Gold / Platinum with pricing", ru: "Уровни лояльности — Bronze / Silver / Gold / Platinum с ценами" } },
      { src: "/images/cases/padd-r/nft-marketplace.png", alt: { en: "NFT Marketplace — tier NFTs with rarity badges and trading", ru: "NFT Marketplace — NFT уровней с бейджами редкости и трейдинг" } },
      { src: "/images/cases/padd-r/tokenomics.png", alt: { en: "Tokenomics — Token Distribution chart and Token Information", ru: "Токеномика — диаграмма распределения и информация о токене" } },
      { src: "/images/cases/padd-r/dashboard-overview.png", alt: { en: "Dashboard Overview — Token Balance, Staked Amount, Current Tier, NFTs", ru: "Дашборд — Баланс токена, Стейкинг, Текущий тир, NFT" } },
      { src: "/images/cases/padd-r/stake-tokens.png", alt: { en: "Stake Tokens — Tier selection with Bronze/Silver/Gold/Platinum plans", ru: "Стейкинг — Выбор тира Bronze/Silver/Gold/Platinum" } },
      { src: "/images/cases/padd-r/staking-calculator.png", alt: { en: "Staking Calculator — estimated tier, vouchers, totals", ru: "Калькулятор стейкинга — оценка тира, ваучеры, итоги" } },
      { src: "/images/cases/padd-r/rewards-nfts.png", alt: { en: "Rewards — NFT Status Checker and earned tier NFTs", ru: "Награды — проверка статуса NFT и полученные NFT тиров" } },
      { src: "/images/cases/padd-r/nft-collection.png", alt: { en: "NFT Collection grid — Bronze, Silver, Gold, Platinum NFTs", ru: "Коллекция NFT — Bronze, Silver, Gold, Platinum" } },
      { src: "/images/cases/padd-r/transaction-history.png", alt: { en: "Transaction History — staking and reward records with stats", ru: "История транзакций — записи стейкинга и наград со статистикой" } },
      { src: "/images/cases/padd-r/profile-settings.png", alt: { en: "Profile Settings — wallet address, Account Stats, tier status", ru: "Настройки профиля — адрес кошелька, статистика аккаунта, статус тира" } },
    ],
  },
  {
    id: "case-10",
    slug: "multi-location-restaurant-management",
    category: "product",
    year: 2026,
    title: {
      en: "Restaurant Order & Inventory Management System (end\u2011to\u2011end)",
      ru: "Система учёта заказов и ингредиентов для ресторана (end\u2011to\u2011end)",
    },
    summary: {
      en: "Full-cycle restaurant management system: role-based access (Chef, Employee, Accountant, Owner), ingredient inventory with cost tracking, roll recipes with auto-calculated cost/margin, set composition with pricing, order management, supply/write-off logging, accounting with Excel export, analytics dashboards, and a full audit trail for every change.",
      ru: "Полноценная система управления рестораном: ролевой доступ (Шеф, Сотрудник, Бухгалтер, Владелец), учёт ингредиентов с себестоимостью, рецепты роллов с авторасчётом себестоимости/маржи, состав сетов с ценами, управление заказами, логирование поставок/списаний, бухгалтерия с выгрузкой в Excel, аналитические дашборды и полная история изменений.",
    },
    metrics: [
      { label: { en: "User roles (RBAC)", ru: "Ролей пользователей (RBAC)" }, value: "4" },
      { label: { en: "Managed entities", ru: "Управляемых сущностей" }, value: "6+" },
      { label: { en: "Auto-calculated metrics", ru: "Авторасчётных метрик" }, value: "5+" },
      { label: { en: "Export formats", ru: "Форматов выгрузки" }, value: "Excel + ZIP" },
    ],
    artifactHint: { en: "RBAC model + cost calculation engine", ru: "RBAC\u2011модель + движок расчёта себестоимости" },
    industry: { en: "HoReCa / Food Service", ru: "HoReCa / Общественное питание" },
    timeline: { en: "6 weeks", ru: "6\u00A0недель" },
    problem: {
      en: "A sushi restaurant needed a complete operational management system: track ingredient stock and cost, manage roll recipes with automatic cost/margin calculation, compose and price meal sets, handle orders with status tracking, log supplies and write-offs, provide accounting reports with Excel export, and separate access by role (Chef manages recipes, Accountant sees finances, Owner gets analytics). Everything had to work as one integrated system with a full audit trail.",
      ru: "Суши\u2011ресторану требовалась полноценная система операционного управления: учёт остатков и цен ингредиентов, управление рецептами роллов с автоматическим расчётом себестоимости/маржи, составление и ценообразование сетов, обработка заказов со статусами, логирование поставок и списаний, бухгалтерские отчёты с выгрузкой в Excel и разделение доступа по ролям (Шеф управляет рецептами, Бухгалтер видит финансы, Владелец получает аналитику). Всё должно работать как единая система с полной историей изменений.",
    },
    constraints: {
      en: [
        "4 distinct user roles with different permissions (Chef, Employee, Accountant, Owner)",
        "Auto-calculated cost/margin for every roll and set based on ingredient prices",
        "Real-time inventory tracking: ingredient stock, usage across recipes, cost per unit",
        "Full audit trail: who changed what, when, old value → new value",
        "Accounting module with date range filtering, Excel export, and ZIP backup",
        "Set pricing with composition-based cost calculation, discount %, and margin %",
        "NDA: exact business metrics and partner identity are confidential. Screenshots show a draft UI and partial functionality only — the production product is not disclosed per client agreement",
      ],
      ru: [
        "4 роли пользователей с разными правами (Шеф, Сотрудник, Бухгалтер, Владелец)",
        "Авторасчёт себестоимости/маржи для каждого ролла и сета на основе цен ингредиентов",
        "Учёт остатков в реальном времени: запасы ингредиентов, использование в рецептах, цена за единицу",
        "Полная история изменений: кто изменил что, когда, было → стало",
        "Модуль бухгалтерии с фильтрацией по датам, выгрузкой в Excel и ZIP\u2011бэкапами",
        "Ценообразование сетов с расчётом себестоимости по составу, % скидки и % маржи",
        "NDA: точные бизнес\u2011метрики и данные партнёра конфиденциальны. Скриншоты показывают черновой вид интерфейса и лишь часть функционала — конечный продукт не раскрывается по договорённости с заказчиком",
      ],
    },
    solution: {
      en: "Built an integrated restaurant management system with 6 core modules: (1) Ingredient Management — CRUD with stock levels, units, cost per unit, and cross-reference to all rolls using each ingredient; (2) Roll Recipes — recipe builder with ingredient composition, auto-calculated cost, selling price management; (3) Sets — multi-roll set compositions with automatic cost, retail price, discount %, margin %, and profit calculation per set; (4) Orders — order creation for individual rolls and sets with quantity, cost, status tracking, and comments; (5) Supplies & Write-offs — ingredient supply/write-off logging with history; (6) Accounting — financial summary (revenue, cost of goods, supplies, write-offs, salary, rent, profit), ingredient stock valuation, roll pricing management, and full Excel export with ZIP backup. Plus an Analytics module with per-roll sales and profit charts, and a Change History audit trail tracking every modification.",
      ru: "Построили интегрированную систему управления рестораном с 6 основными модулями: (1) Управление ингредиентами — CRUD с остатками, единицами измерения, ценой за единицу и перекрёстной ссылкой на все роллы; (2) Рецепты роллов — конструктор рецептов с составом ингредиентов, авторасчётом себестоимости, управлением продажной ценой; (3) Сеты — составные наборы из роллов с автоматическим расчётом себестоимости, розницы, % скидки, % маржи и прибыли; (4) Заказы — создание заказов на роллы и сеты с количеством, стоимостью, статусами и комментариями; (5) Поставки и списания — логирование поставок/списаний ингредиентов с историей; (6) Бухгалтерия — финансовая сводка (выручка, себестоимость, поставки, списания, зарплата, аренда, прибыль), оценка складских запасов, управление ценами роллов, выгрузка в Excel и ZIP\u2011бэкап. Плюс модуль Аналитики с графиками продаж и прибыли по роллам и История изменений с отслеживанием каждой модификации.",
    },
    deliverables: {
      en: [
        "Role-based authentication (Chef / Employee / Accountant / Owner)",
        "Ingredient management (CRUD, stock, cost, cross-recipe references)",
        "Roll recipe builder with auto-cost calculation",
        "Set composition engine (cost, retail, discount %, margin %, profit)",
        "Order management (rolls + sets, quantity, status, comments)",
        "Supply & write-off logging with operation history",
        "Accounting module (financial summary, ingredient valuation, pricing)",
        "Excel export and ZIP backup for all accounting data",
        "Analytics dashboard (sales by roll, profit by roll charts)",
        "Change history / audit trail (action, object, old → new, role)",
      ],
      ru: [
        "Ролевая аутентификация (Шеф / Сотрудник / Бухгалтер / Владелец)",
        "Управление ингредиентами (CRUD, остатки, себестоимость, перекрёстные ссылки)",
        "Конструктор рецептов роллов с авторасчётом себестоимости",
        "Движок составления сетов (себестоимость, розница, % скидки, % маржи, прибыль)",
        "Управление заказами (роллы + сеты, количество, статус, комментарии)",
        "Логирование поставок и списаний с историей операций",
        "Модуль бухгалтерии (финансовая сводка, оценка ингредиентов, ценообразование)",
        "Выгрузка в Excel и ZIP\u2011бэкап для всех бухгалтерских данных",
        "Аналитический дашборд (продажи и прибыль по роллам)",
        "История изменений / аудит\u2011трейл (действие, объект, было → стало, роль)",
      ],
    },
    techStack: ["Python", "Flask", "PostgreSQL", "HTML/CSS", "JavaScript", "Chart.js", "openpyxl"],
    outcome: {
      en: "Delivered a production-ready restaurant management system covering the full operational loop: ingredients → recipes → sets → orders → accounting → analytics. Four user roles with appropriate access control. Auto-calculated cost and margin for every product. Full audit trail for every change. Accounting with Excel export and ZIP backup. The system operates as a real business tool, not a demo — the owner sees profit/loss, the chef manages recipes, the accountant exports reports.",
      ru: "Поставили production\u2011ready систему управления рестораном, покрывающую полный операционный цикл: ингредиенты → рецепты → сеты → заказы → бухгалтерия → аналитика. Четыре роли пользователей с соответствующим контролем доступа. Авторасчёт себестоимости и маржи для каждого продукта. Полная история изменений. Бухгалтерия с выгрузкой в Excel и ZIP\u2011бэкапом. Система работает как реальный бизнес\u2011инструмент — владелец видит прибыль/убыток, шеф управляет рецептами, бухгалтер выгружает отчёты.",
    },
    hardParts: [
      {
        title: { en: "Auto-Calculated Cost & Margin Engine", ru: "Движок авторасчёта себестоимости и маржи" },
        description: {
          en: "Every roll's cost is calculated from its ingredient composition and current ingredient prices. Every set's cost aggregates its rolls. When an ingredient price changes, all dependent roll and set costs recalculate automatically. Margin, discount, and profit are always up to date.",
          ru: "Себестоимость каждого ролла считается из состава ингредиентов и их текущих цен. Себестоимость сета агрегирует роллы. При изменении цены ингредиента все зависимые роллы и сеты пересчитываются автоматически. Маржа, скидка и прибыль всегда актуальны.",
        },
      },
      {
        title: { en: "Role-Based Access with Business Logic", ru: "Ролевой доступ с бизнес\u2011логикой" },
        description: {
          en: "Not just 'admin vs user' — four distinct roles with real business meaning: Chef manages recipes/ingredients/sets, Employee handles orders/supplies, Accountant sees financial reports and exports, Owner gets analytics and full visibility. Each role sees a different navigation and different data.",
          ru: "Не просто «админ vs пользователь» — четыре роли с реальным бизнес\u2011смыслом: Шеф управляет рецептами/ингредиентами/сетами, Сотрудник обрабатывает заказы/поставки, Бухгалтер видит финансовые отчёты и выгружает данные, Владелец получает аналитику и полный обзор. Каждая роль видит свою навигацию и свои данные.",
        },
      },
      {
        title: { en: "Complete Audit Trail for Food Business", ru: "Полная история изменений для food\u2011бизнеса" },
        description: {
          en: "Every modification is logged with action type, object, name, details (old → new value), role, and optional comment. Critical for food businesses where recipe changes, price adjustments, and inventory movements must be traceable and accountable.",
          ru: "Каждая модификация логируется с типом действия, объектом, названием, деталями (было → стало), ролью и необязательным комментарием. Критично для food\u2011бизнеса, где изменения рецептов, корректировки цен и движение запасов должны быть отслеживаемы и подотчётны.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "RBAC access control tests", ru: "Тесты ролевого доступа" }, passed: true },
      { name: { en: "Cost calculation accuracy", ru: "Точность расчёта себестоимости" }, passed: true },
      { name: { en: "Excel export verification", ru: "Верификация выгрузки в Excel" }, passed: true },
      { name: { en: "Audit trail completeness", ru: "Полнота аудит\u2011трейла" }, passed: true },
      { name: { en: "Set margin calculation E2E", ru: "E2E\u2011расчёт маржи сетов" }, passed: true },
      { name: { en: "UAT with restaurant staff", ru: "UAT с персоналом ресторана" }, passed: true },
    ],
    imageUrl: "/images/cases/sushi-system/sets-cards.png",
    heroImage: "/images/cases/sushi-system/sets-cards.png",
    screenshots: [
      { src: "/images/cases/sushi-system/login-role.png", alt: { en: "Login — role selection (Chef, Employee, Accountant, Owner)", ru: "Вход — выбор роли (Шеф\u2011повар, Сотрудник, Бухгалтер, Владелец)" } },
      { src: "/images/cases/sushi-system/login-dropdown.png", alt: { en: "Login — role dropdown with 4 business roles", ru: "Вход — выпадающий список с 4 бизнес\u2011ролями" } },
      { src: "/images/cases/sushi-system/welcome-dashboard.png", alt: { en: "Welcome dashboard — Employee role with navigation to modules", ru: "Приветственная панель — роль Сотрудника с навигацией по модулям" } },
      { src: "/images/cases/sushi-system/accounting.png", alt: { en: "Accounting — financial summary, ingredient stock valuation, Excel export", ru: "Бухгалтерия — финансовая сводка, оценка запасов ингредиентов, выгрузка в Excel" } },
      { src: "/images/cases/sushi-system/pricing-table.png", alt: { en: "Roll pricing — cost, selling price, inline price editing", ru: "Цены роллов — себестоимость, продажная цена, inline\u2011редактирование цен" } },
      { src: "/images/cases/sushi-system/analytics.png", alt: { en: "Analytics — sales by roll and profit by roll bar charts", ru: "Аналитика — графики продаж и прибыли по роллам" } },
      { src: "/images/cases/sushi-system/change-history.png", alt: { en: "Change History — audit trail with action, object, old/new values, role", ru: "История изменений — аудит\u2011трейл с действием, объектом, было/стало, ролью" } },
      { src: "/images/cases/sushi-system/ingredients.png", alt: { en: "Ingredients — CRUD table with stock, unit, price, cross-recipe usage", ru: "Ингредиенты — CRUD\u2011таблица с остатками, единицами, ценой, использованием в рецептах" } },
      { src: "/images/cases/sushi-system/rolls-list.png", alt: { en: "Rolls — full list with selling prices and CRUD actions", ru: "Роллы — полный список с продажными ценами и CRUD\u2011действиями" } },
      { src: "/images/cases/sushi-system/rolls-add.png", alt: { en: "Rolls — continued list with 'Add roll' form", ru: "Роллы — продолжение списка с формой «Добавить ролл»" } },
      { src: "/images/cases/sushi-system/sets-cards.png", alt: { en: "Sets — composition cards with cost, retail, discount %, margin %, profit", ru: "Сеты — карточки составов с себестоимостью, розницей, скидкой %, маржей %, прибылью" } },
      { src: "/images/cases/sushi-system/orders.png", alt: { en: "Orders — order management with roll/set selection, quantity, comments", ru: "Заказы — управление заказами с выбором роллов/сетов, количеством, комментариями" } },
      { src: "/images/cases/sushi-system/supplies-writeoffs.png", alt: { en: "Supplies & Write-offs — ingredient supply/write-off logging with history", ru: "Поставки и списания — логирование поставок/списаний ингредиентов с историей" } },
    ],
  },
  {
    id: "case-9",
    slug: "asset-tokenization-platform",
    category: "web3",
    year: 2025,
    title: {
      en: "Tokenization & Digital Investment Platform (Dubai, UAE)",
      ru: "Платформа токенизации и цифровых инвестиций (Дубай, ОАЭ)",
    },
    summary: {
      en: "End-to-end digital investment platform and tokenization infrastructure: onboarding, KYC/verification, Private Sale module, investor dashboard, admin panel, and blockchain layer for token issuance — compliance-first architecture for a Dubai-based investment company.",
      ru: "End\u2011to\u2011end цифровая инвестиционная платформа и инфраструктура токенизации: онбординг, KYC/верификация, модуль Private Sale, кабинет инвестора, админ\u2011панель и блокчейн\u2011контур для выпуска токенов — compliance\u2011first архитектура для инвестиционной компании из Дубая.",
    },
    metrics: [
      { label: { en: "Platform modules", ru: "Модулей платформы" }, value: "6" },
      { label: { en: "User roles (RBAC)", ru: "Ролей пользователей (RBAC)" }, value: "3" },
      { label: { en: "KYC verification statuses", ru: "Статусов KYC\u2011верификации" }, value: "4" },
      { label: { en: "Compliance coverage", ru: "Покрытие compliance" }, value: "100%" },
    ],
    artifactHint: { en: "KYC flow + Private Sale spec + security architecture", ru: "KYC\u2011flow + спек Private Sale + архитектура безопасности" },
    industry: { en: "Investment / FinTech / Tokenization", ru: "Инвестиции / FinTech / Токенизация" },
    timeline: { en: "12 weeks", ru: "12\u00A0недель" },
    problem: {
      en: "A Dubai-based investment company (L.L.C) needed a controlled, transparent, and legally compliant entry point for investors: securely collect and store user data, conduct KYC/verification, provide access to Private Sale and digital products, and ensure transaction transparency with a full audit trail and role-based access control. The platform had to combine a web investment product, a Private Sale module, a blockchain layer for token issuance, and an operational admin panel — all under one roof.",
      ru: "Инвестиционная компания из Дубая (L.L.C) нуждалась в контролируемой, прозрачной и юридически compliant точке входа для инвесторов: безопасно собирать и хранить данные пользователей, проводить KYC/верификацию, давать доступ к Private Sale и цифровым продуктам, обеспечивать прозрачность транзакций с полным аудит\u2011трейлом и разграничением доступа по ролям. Платформа должна совмещать инвестиционный веб\u2011продукт, модуль Private Sale, блокчейн\u2011слой для выпуска токенов и операционную админ\u2011панель — всё в одном контуре.",
    },
    constraints: {
      en: [
        "UAE regulatory compliance — KYC as the core access gate",
        "Role-based access control (user / admin / ops) for all critical operations",
        "Private Sale must enforce limits, statuses, and safe state transitions",
        "Auditability & traceability for every sensitive action (who, when, what changed)",
        "Document upload/storage with access control and verification",
        "Investor-grade UX: dashboard, history, transparency — not a 'crypto demo'",
        "EVM-compatible blockchain layer for token issuance and management",
        "NDA: exact financial metrics and partner identity are confidential",
      ],
      ru: [
        "Соответствие регуляциям ОАЭ — KYC как ядро контроля доступа",
        "Разграничение доступа по ролям (user / admin / ops) для всех критических операций",
        "Private Sale обязан контролировать лимиты, статусы и безопасные переходы состояний",
        "Auditability & traceability для каждого чувствительного действия (кто, когда, что изменил)",
        "Загрузка/хранение документов с контролем доступа и верификацией",
        "Investor\u2011grade UX: дашборд, история, прозрачность — не «крипто\u2011демо»",
        "EVM\u2011совместимый блокчейн\u2011слой для выпуска и управления токенами",
        "NDA: точные финансовые метрики и данные партнёра конфиденциальны",
      ],
    },
    solution: {
      en: "Designed and built a 6-module digital investment platform: (1) Onboarding & Registration — user sign-up with validations, profile statuses, and progress flow; (2) KYC / Identity Verification — document collection, 4-status verification pipeline (pending → approved → rejected → resubmission), file upload with access control, full action logging; (3) Investor Dashboard — profile with verification statuses, available products/rounds, transaction history, participation management; (4) Private Sale Module — investor participation scenarios with conditions, limits, and safe state transitions, payment confirmation (manual/operator or integration), token allocation and accounting; (5) Admin Panel & Operations — user and KYC status management, request processing, product/round management, admin audit journal; (6) Blockchain Layer — EVM-compatible token issuance, integration with web product and sale processes.",
      ru: "Спроектировали и построили 6\u2011модульную цифровую инвестиционную платформу: (1) Онбординг и регистрация — регистрация с валидациями, статусы профиля, прогресс\u2011flow; (2) KYC / Identity Verification — сбор документов, 4\u2011статусный пайплайн верификации (pending → approved → rejected → resubmission), загрузка файлов с контролем доступа, полное логирование действий; (3) Кабинет инвестора — профиль со статусами верификации, доступные продукты/раунды, история транзакций, управление участием; (4) Модуль Private Sale — сценарии участия с условиями, лимитами и безопасными переходами состояний, подтверждение платежей, распределение/учёт токенов; (5) Админ\u2011панель и операции — управление пользователями и KYC\u2011статусами, обработка заявок, управление продуктами/раундами, журналирование; (6) Блокчейн\u2011слой — выпуск EVM\u2011совместимых токенов, интеграция с веб\u2011продуктом и процессами sale.",
    },
    deliverables: {
      en: [
        "Onboarding & registration flow with profile statuses",
        "KYC verification module (4-status pipeline + document upload)",
        "Investor dashboard (profile, products, history, participation)",
        "Private Sale module (limits, statuses, token allocation)",
        "Admin panel with operational guides and audit journal",
        "Role-based access control system (user / admin / ops)",
        "Blockchain token issuance contracts (EVM-compatible)",
        "Action logging and audit trail for all sensitive operations",
        "Stakeholder documentation (feature descriptions, roadmap, system structure)",
        "Production deployment and security hardening",
      ],
      ru: [
        "Онбординг и регистрация со статусами профиля",
        "Модуль KYC\u2011верификации (4\u2011статусный пайплайн + загрузка документов)",
        "Кабинет инвестора (профиль, продукты, история, участие)",
        "Модуль Private Sale (лимиты, статусы, распределение токенов)",
        "Админ\u2011панель с операционными гайдами и журналом аудита",
        "Система разграничения доступа по ролям (user / admin / ops)",
        "Контракты выпуска токенов на блокчейне (EVM\u2011совместимые)",
        "Логирование действий и аудит\u2011трейл для чувствительных операций",
        "Документация для стейкхолдеров (описание функций, roadmap, структура системы)",
        "Production\u2011деплой и security\u2011хардинг",
      ],
    },
    techStack: ["Solidity", "EVM-compatible networks", "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Hardhat"],
    outcome: {
      en: "Delivered an end-to-end investor flow: user → KYC → access → Private Sale participation → token accounting. Operational control via admin panel with full audit trail. Scalable foundation for new sale rounds, new products, and evolving compliance rules. Structured system documentation for stakeholders, investors, and partners. Platform operates as a working business system, not a demo.",
      ru: "Поставили end\u2011to\u2011end инвестиционный поток: пользователь → KYC → доступ → участие в Private Sale → учёт токенов. Операционный контроль через админ\u2011панель с полным аудит\u2011трейлом. Масштабируемая основа для новых раундов, новых продуктов и изменяющихся правил compliance. Структурированная документация системы для стейкхолдеров, инвесторов и партнёров. Платформа работает как бизнес\u2011система, а не демо.",
    },
    hardParts: [
      {
        title: { en: "Compliance-First Architecture: KYC as Access Core", ru: "Compliance\u2011first архитектура: KYC как ядро доступа" },
        description: {
          en: "KYC is not a 'checkbox' but the gateway to every platform feature. 4-status verification pipeline (pending/approved/rejected/resubmission) with document upload, access control, and full action logging. No investor reaches Private Sale without passing verification.",
          ru: "KYC — не «галочка», а ворота к каждой функции платформы. 4\u2011статусный пайплайн верификации (pending/approved/rejected/resubmission) с загрузкой документов, контролем доступа и полным логированием действий. Ни один инвестор не попадает в Private Sale без прохождения верификации.",
        },
      },
      {
        title: { en: "Private Sale with Safe State Transitions", ru: "Private Sale с безопасными переходами состояний" },
        description: {
          en: "Investor participation in sale rounds goes through controlled state machine: conditions check → limit validation → payment confirmation → token allocation. Protection against invalid states, duplicate requests, and limit violations. Each transition is logged and auditable.",
          ru: "Участие инвестора в раундах sale проходит через контролируемый state machine: проверка условий → валидация лимитов → подтверждение платежа → распределение токенов. Защита от некорректных состояний, повторных заявок и нарушения лимитов. Каждый переход логируется и проверяем.",
        },
      },
      {
        title: { en: "Investor-Grade UX over Blockchain Complexity", ru: "Investor\u2011grade UX поверх блокчейн\u2011сложности" },
        description: {
          en: "The platform is a business tool, not a crypto demo. Investor dashboard shows profile, verification status, available products, transaction history, and participation management — all without exposing blockchain complexity. Admin panel provides operational control, not 'developer console'.",
          ru: "Платформа — рабочий бизнес\u2011инструмент, а не крипто\u2011демо. Кабинет инвестора показывает профиль, статус верификации, доступные продукты, историю транзакций и управление участием — без раскрытия блокчейн\u2011сложности. Админ\u2011панель обеспечивает операционный контроль, а не «консоль разработчика».",
        },
      },
      {
        title: { en: "Auditability & Role-Based Security", ru: "Аудируемость и безопасность по ролям" },
        description: {
          en: "Every sensitive action is logged: who, when, what changed. Role-based access (user/admin/ops) protects critical operations. Document storage with permission boundaries. Principles of 'auditability & traceability' applied throughout — critical for investment platforms in regulated jurisdictions.",
          ru: "Каждое чувствительное действие логируется: кто, когда, что изменил. Разграничение доступа по ролям (user/admin/ops) защищает критические операции. Хранение документов с границами прав. Принципы «auditability & traceability» применены повсеместно — критично для инвестиционных платформ в регулируемых юрисдикциях.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Smart contract audit", ru: "Аудит смарт\u2011контрактов" }, passed: true },
      { name: { en: "KYC pipeline E2E tests", ru: "E2E\u2011тесты KYC\u2011пайплайна" }, passed: true },
      { name: { en: "Private Sale state machine tests", ru: "Тесты state machine Private Sale" }, passed: true },
      { name: { en: "RBAC access control verification", ru: "Проверка разграничения доступа RBAC" }, passed: true },
      { name: { en: "Audit trail completeness", ru: "Полнота аудит\u2011трейла" }, passed: true },
      { name: { en: "Security hardening review", ru: "Ревью security\u2011хардинга" }, passed: true },
      { name: { en: "Stakeholder documentation review", ru: "Ревью документации для стейкхолдеров" }, passed: true },
    ],
    imageUrl: "/images/cases/kut-energy/hero-landing.png",
    heroImage: "/images/cases/kut-energy/hero-landing.png",
    screenshots: [
      { src: "/images/cases/kut-energy/hero-landing.png", alt: { en: "Hero landing — 3D industrial scene with tokenized resource visualization (Gold, Tin, Polymetals)", ru: "Герой\u2011лендинг — 3D\u2011индустриальная сцена с визуализацией токенизированных ресурсов (Золото, Олово, Полиметаллы)" } },
      { src: "/images/cases/kut-energy/marquee-brand.png", alt: { en: "Scrolling brand marquee — 'Kut Energy' repeating banner section", ru: "Скроллинг\u2011маркиз бренда — секция с бегущей строкой «Kut Energy»" } },
      { src: "/images/cases/kut-energy/kut-token-section.png", alt: { en: "KUT Token section — CSTk utility token description with 3D organic shape", ru: "Секция KUT Token — описание утилити\u2011токена CSTk с 3D\u2011органической формой" } },
      { src: "/images/cases/kut-energy/assets-tokenization-chart.png", alt: { en: "Tokenization assets bubble chart — $17.5B total capitalization across 12+ resource types", ru: "Пузырьковая диаграмма активов для токенизации — $17.5 млрд общая капитализация по 12+ видам ресурсов" } },
      { src: "/images/cases/kut-energy/world-map-resources.png", alt: { en: "World map — mining locations with resource cards grid (Coal, Oil, Gold, Copper)", ru: "Карта мира — расположение месторождений с карточками ресурсов (Уголь, Нефть, Золото, Медь)" } },
      { src: "/images/cases/kut-energy/resource-cards-grid.png", alt: { en: "Resource cards grid (01–08) — Coal, Oil, Gold, Copper, Gas, Titanium, Silver, Uranium", ru: "Карточки ресурсов (01–08) — Уголь, Нефть, Золото, Медь, Газ, Титан, Серебро, Уран" } },
      { src: "/images/cases/kut-energy/token-features.png", alt: { en: "Token features — 24/7 trading, portability, storage, trackability, fractional ownership, no commissions", ru: "Особенности токена — торговля 24/7, переносимость, хранение, отслеживаемость, дробление, без комиссий" } },
      { src: "/images/cases/kut-energy/global-connections.png", alt: { en: "Global connections diagram — KUT Energy Investments L.L.C subsidiary network with ownership percentages", ru: "Диаграмма глобальных связей — сеть дочерних компаний KUT Energy Investments L.L.C с долями владения" } },
      { src: "/images/cases/kut-energy/news-blog.png", alt: { en: "News blog section — colorful article cards (New stocks, Silver assets, Zinc, Gold mines)", ru: "Секция блога новостей — цветные карточки статей (Новые акции, Серебряные активы, Цинк, Золотые шахты)" } },
      { src: "/images/cases/kut-energy/roadmap.png", alt: { en: "Roadmap — quarterly milestones Q2 2024 → Q2 2025 (audit, token launch, SEC licensing, expansion)", ru: "Дорожная карта — квартальные этапы Q2 2024 → Q2 2025 (аудит, запуск токена, лицензия SEC, расширение)" } },
      { src: "/images/cases/kut-energy/token-ecosystem.png", alt: { en: "Token ecosystem — exchange and platform placeholders with security lock icon", ru: "Экосистема токена — плейсхолдеры бирж и платформ с иконкой замка безопасности" } },
      { src: "/images/cases/kut-energy/contact-form.png", alt: { en: "Contact form — yellow CTA block with name, phone, email fields and strategy section", ru: "Контактная форма — жёлтый CTA\u2011блок с полями имя, телефон, почта и секция стратегии" } },
      { src: "/images/cases/kut-energy/footer-social.png", alt: { en: "Footer — 'Join us' call-to-action with X, LinkedIn, Telegram social links and 3D shape", ru: "Футер — призыв «Присоединяйтесь» с ссылками X, LinkedIn, Telegram и 3D\u2011формой" } },
      { src: "/images/cases/kut-energy/cabinet-login.png", alt: { en: "Investor login — KutToken branded cabinet entry with ID/password fields and 3D blob", ru: "Вход инвестора — брендированный вход в кабинет KutToken с полями ID/пароль и 3D\u2011объектом" } },
      { src: "/images/cases/kut-energy/investor-cabinet.png", alt: { en: "Investor cabinet — user profile with gold cover, documents section (contracts, stamps), avatar", ru: "Кабинет инвестора — профиль с золотой обложкой, секция документов (договоры, печати), аватар" } },
      { src: "/images/cases/kut-energy/cabinet-cover-edit.png", alt: { en: "Cover edit — upload and change cover photo with gold nugget banner", ru: "Редактирование обложки — загрузка и смена обложки с баннером золотого самородка" } },
      { src: "/images/cases/kut-energy/profile-edit-modal.png", alt: { en: "Profile edit modal — photo upload, personal info fields (name, surname, city, email, phone)", ru: "Модалка редактирования профиля — загрузка фото, поля личной информации (имя, фамилия, город, email, телефон)" } },
      { src: "/images/cases/kut-energy/add-document-form.png", alt: { en: "Add document form — PDF upload with user/type selection (contracts), branded 3D heart shape", ru: "Форма добавления документа — загрузка PDF с выбором пользователя/типа (договоры), брендированная 3D\u2011форма" } },
      { src: "/images/cases/kut-energy/how-to-acquire-tokens.png", alt: { en: "How to acquire tokens — exchanges section with crypto-themed illustrations", ru: "Как приобрести токены — секция бирж с крипто\u2011иллюстрациями" } },
      { src: "/images/cases/kut-energy/token-purchase-storage.png", alt: { en: "Token purchase flow — Kut acquires + Your Token + Where to store (wallets, exchange accounts)", ru: "Поток покупки токенов — Kut приобретает + Ваш Токен + Где хранить (кошельки, биржи)" } },
      { src: "/images/cases/kut-energy/technologies-globe.png", alt: { en: "Technologies — interactive globe with global network connections and percentage metrics", ru: "Технологии — интерактивный глобус с глобальными сетевыми соединениями и метриками в процентах" } },
      { src: "/images/cases/kut-energy/technologies-cards.png", alt: { en: "Technology cards (01–08) — CTM Overview, Directions, Business Model, CIFR, Country Roadmap, Digital Payments, SWIFT Replacement, Digital Ecosystems", ru: "Карточки технологий (01–08) — ЦТМ Обзор, Направления, Бизнес\u2011модель, ЦИФР, Дорожная карта страны, Цифровые платежи, Замена SWIFT, Цифровые экосистемы" } },
      { src: "/images/cases/kut-energy/sections-overview.png", alt: { en: "Sections overview — 6 platform sections (Agriculture, Construction, Energy, Healthcare, Ecology, Transport) with project counts", ru: "Обзор разделов — 6 секций платформы (Сельское хозяйство, Строительство, Энергетика, Здравоохранение, Экология, Транспорт) с количеством проектов" } },
    ],
  },
  {
    id: "case-3",
    slug: "enterprise-modules",
    category: "product",
    year: 2024,
    title: {
      en: "M7\u2011Finance: Banking App UI/UX Design & Frontend (end\u2011to\u2011end)",
      ru: "M7\u2011Finance: UI/UX дизайн и фронтенд банковского приложения (end\u2011to\u2011end)",
    },
    summary: {
      en: "Full-cycle UI/UX design and frontend development for a digital banking platform: research & competitive analysis, information architecture (mind map), wireframing, interactive prototyping, usability testing, and high-fidelity design — from user pain points to a production-ready financial dashboard with transactions, invoicing, multi-wallet management, and account settings.",
      ru: "Полный цикл UI/UX\u2011дизайна и фронтенд\u2011разработки цифровой банковской платформы: исследование и конкурентный анализ, информационная архитектура (mind map), вайрфрейминг, интерактивное прототипирование, юзабилити\u2011тестирование и high\u2011fidelity дизайн — от болей пользователей до production\u2011ready финансового дашборда с транзакциями, инвойсами, управлением кошельками и настройками аккаунта.",
    },
    metrics: [
      { label: { en: "Core modules", ru: "Основных модулей" }, value: "6" },
      { label: { en: "Design stages", ru: "Этапов дизайна" }, value: "4" },
      { label: { en: "UI screens delivered", ru: "Экранов UI" }, value: "20+" },
      { label: { en: "Auth methods", ru: "Методов авторизации" }, value: "Email + Google" },
    ],
    artifactHint: { en: "UX research + mind map + UI kit", ru: "UX\u2011исследование + mind map + UI\u2011кит" },
    industry: { en: "Fintech / Digital Banking", ru: "Финтех / Цифровой банкинг" },
    timeline: { en: "8 weeks", ru: "8\u00A0недель" },
    problem: {
      en: "Users often encounter frustration when navigating through banking apps with complex and confusing interfaces. This leads to difficulties in finding essential features, understanding the app's functionalities, and may deter users from using the app entirely. M7\u2011Finance needed a clean, intuitive banking interface that eliminates cognitive overload — from onboarding and authentication through daily financial operations (transactions, invoices, wallet management) to account settings. The product had to compete with established neobanks while providing a distinctive, user-friendly experience.",
      ru: "Пользователи часто сталкиваются с фрустрацией при навигации по банковским приложениям со сложным и запутанным интерфейсом. Это приводит к трудностям в поиске ключевых функций, понимании возможностей приложения и может вовсе отпугнуть пользователей. M7\u2011Finance нуждался в чистом, интуитивном банковском интерфейсе, устраняющем когнитивную перегрузку — от онбординга и аутентификации через ежедневные финансовые операции (транзакции, инвойсы, управление кошельками) до настроек аккаунта. Продукт должен конкурировать с устоявшимися необанками, обеспечивая отличительный и удобный пользовательский опыт.",
    },
    constraints: {
      en: [
        "Clear, concise labels for menus and buttons — no banking jargon",
        "Guided onboarding: introduce features step by step (tooltips, walkthroughs)",
        "4-stage design process: Research → Wireframing → Prototyping → High-fidelity design",
        "Information architecture validated via mind map before any visual design",
        "Mobile-first responsive approach for all 6 modules",
        "Competitive analysis of existing banking apps (trends, strengths, weaknesses)",
        "Usability testing with real users before handoff to development",
      ],
      ru: [
        "Понятные, лаконичные подписи для меню и кнопок — без банковского жаргона",
        "Поэтапный онбординг: знакомство с функциями шаг за шагом (тултипы, туры)",
        "4\u2011этапный процесс дизайна: исследование → вайрфрейминг → прототипирование → high\u2011fidelity дизайн",
        "Информационная архитектура валидирована через mind map до начала визуального дизайна",
        "Mobile\u2011first отзывчивый подход для всех 6 модулей",
        "Конкурентный анализ существующих банковских приложений (тренды, сильные/слабые стороны)",
        "Юзабилити\u2011тестирование с реальными пользователями перед передачей в разработку",
      ],
    },
    solution: {
      en: "Designed and built a complete digital banking platform through a structured 4-stage UX process: (1) Research & User Analysis — competitive analysis of existing banking apps, user surveys and interviews, identification of pain points and behavioral patterns; (2) Information Architecture & Wireframing — mind map covering the full user journey (Registration → Login → Activity/Statistics/Loan/Profile with sub-flows), low-fidelity wireframes for navigation paths and key functionalities; (3) Prototyping & Usability Testing — interactive prototypes tested with real users, feedback collection and iteration; (4) High-Fidelity Design — final UI for 6 core modules: Dashboard (balance overview, working capital charts, recent transactions, wallet cards, scheduled transfers), Transactions (searchable list with name/business, type, amount, date, invoice ID), Invoices (full CRUD with status badges — Paid/Pending/Unpaid, filters, invoice creation with line items and client details), My Wallets (card management with multiple bank cards, payment history, upcoming payments), Settings (account information editing with personal details, password management). Authentication includes Sign In and Sign Up flows with email/password and Google OAuth, 'Remember me' and 'Forgot password' features.",
      ru: "Спроектировали и построили полноценную цифровую банковскую платформу через структурированный 4\u2011этапный UX\u2011процесс: (1) Исследование и анализ пользователей — конкурентный анализ существующих банковских приложений, опросы и интервью, определение болей и поведенческих паттернов; (2) Информационная архитектура и вайрфрейминг — mind map полного пользовательского пути (Регистрация → Логин → Активность/Статистика/Кредит/Профиль с подпотоками), low\u2011fidelity вайрфреймы для навигации и ключевых функций; (3) Прототипирование и юзабилити\u2011тестирование — интерактивные прототипы протестированы с реальными пользователями, сбор обратной связи и итерации; (4) High\u2011fidelity дизайн — финальный UI для 6 модулей: Dashboard (обзор баланса, графики оборотного капитала, последние транзакции, карточки кошельков, запланированные переводы), Транзакции (поиск по имени/бизнесу, типу, сумме, дате, ID инвойса), Инвойсы (полный CRUD со статусными бейджами — Paid/Pending/Unpaid, фильтры, создание инвойса с позициями и данными клиента), Кошельки (управление картами, история платежей, предстоящие платежи), Настройки (редактирование личных данных, управление паролем). Аутентификация включает Sign In и Sign Up с email/паролем и Google OAuth, 'Запомнить меня' и 'Забыли пароль'.",
    },
    deliverables: {
      en: [
        "UX research report (competitive analysis, user interviews, pain points)",
        "Information architecture mind map (full user journey mapping)",
        "Low-fidelity wireframes for all 6 modules",
        "Interactive prototype for usability testing",
        "High-fidelity UI kit (components, typography, colors, spacing)",
        "Dashboard module (balance, charts, transactions, wallet cards, transfers)",
        "Transactions module (searchable list, filtering, invoice IDs)",
        "Invoices module (CRUD, status management, line items, client details)",
        "My Wallets module (multi-card management, payments, upcoming payments)",
        "Settings module (profile editing, password management)",
        "Authentication flows (Sign In / Sign Up / Google OAuth / password recovery)",
        "Design documentation and handoff assets for development",
      ],
      ru: [
        "UX\u2011исследование (конкурентный анализ, интервью, болевые точки)",
        "Mind map информационной архитектуры (маппинг полного пути пользователя)",
        "Low\u2011fidelity вайрфреймы для всех 6 модулей",
        "Интерактивный прототип для юзабилити\u2011тестирования",
        "High\u2011fidelity UI\u2011кит (компоненты, типографика, цвета, отступы)",
        "Модуль Dashboard (баланс, графики, транзакции, карточки кошельков, переводы)",
        "Модуль Транзакции (поисковый список, фильтрация, ID инвойсов)",
        "Модуль Инвойсы (CRUD, управление статусами, позиции, данные клиента)",
        "Модуль Кошельки (управление картами, история и предстоящие платежи)",
        "Модуль Настройки (редактирование профиля, управление паролем)",
        "Потоки аутентификации (Sign In / Sign Up / Google OAuth / восстановление пароля)",
        "Дизайн\u2011документация и ассеты для передачи в разработку",
      ],
    },
    techStack: ["Figma", "React", "Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "REST API"],
    outcome: {
      en: "Delivered a complete banking product from UX research to production-ready frontend: 6 fully designed modules (Dashboard, Transactions, Invoices, Wallets, Settings, Auth), 20+ high-fidelity screens, validated information architecture via mind map, and usability-tested prototypes. The design reduces cognitive overload with clear navigation, consistent visual language, and guided onboarding — addressing the core problem of complex banking UIs. The platform is positioned to compete with modern neobanks through intuitive UX and clean visual design.",
      ru: "Поставили полноценный банковский продукт от UX\u2011исследования до production\u2011ready фронтенда: 6 полностью спроектированных модулей (Dashboard, Транзакции, Инвойсы, Кошельки, Настройки, Авторизация), 20+ high\u2011fidelity экранов, валидированная информационная архитектура через mind map и прототипы, протестированные на пользователях. Дизайн снижает когнитивную перегрузку за счёт понятной навигации, единого визуального языка и пошагового онбординга — решая ключевую проблему сложных банковских интерфейсов. Платформа готова конкурировать с современными необанками благодаря интуитивному UX и чистому визуальному дизайну.",
    },
    hardParts: [
      {
        title: { en: "Information Architecture Before Pixels", ru: "Информационная архитектура до пикселей" },
        description: {
          en: "Built a comprehensive mind map covering the entire user journey: Registration (ID card, Insurance, Employment → Name, Email, Password, Socials) → Login → 4 main sections (Activity with Cards/Actions/Notifications/History, Statistics, Loan, Profile with Settings/Address/Transactions/Support Chat). This validated navigation structure before any visual design, preventing costly redesigns.",
          ru: "Построили комплексную mind map всего пользовательского пути: Регистрация (ID\u2011карта, Страховка, Трудоустройство → Имя, Email, Пароль, Соцсети) → Логин → 4 основных раздела (Активность с Картами/Действиями/Уведомлениями/Историей, Статистика, Кредит, Профиль с Настройками/Адресом/Транзакциями/Чатом поддержки). Это валидировало структуру навигации до начала визуального дизайна, предотвращая дорогостоящие редизайны.",
        },
      },
      {
        title: { en: "Financial Data Visualization Without Overload", ru: "Визуализация финансовых данных без перегрузки" },
        description: {
          en: "Dashboard packs dense financial data (total balance, spending, savings, working capital chart with income/expenses overlay, recent transactions, wallet cards, scheduled transfers) into a single view without overwhelming the user. Achieved through visual hierarchy: primary metrics in colored cards at top, interactive chart in the middle, secondary data in side panels.",
          ru: "Dashboard упаковывает плотные финансовые данные (общий баланс, расходы, накопления, график оборотного капитала с наложением доходов/расходов, последние транзакции, карточки кошельков, запланированные переводы) в один экран без перегрузки пользователя. Достигнуто через визуальную иерархию: основные метрики в цветных карточках сверху, интерактивный график в центре, вторичные данные в боковых панелях.",
        },
      },
      {
        title: { en: "Invoice System with Complete Business Logic", ru: "Система инвойсов с полной бизнес\u2011логикой" },
        description: {
          en: "Designed a full invoicing workflow: searchable list with status badges (Paid/Pending/Unpaid), creation form with company header, invoice/billing details, line items with quantity and rates, automatic subtotal/discount/tax/total calculation, client management, and Preview/Download/Send actions. Every state transition is visually clear and accessible.",
          ru: "Спроектировали полный workflow инвойсов: поисковый список со статусными бейджами (Paid/Pending/Unpaid), форма создания с хедером компании, реквизитами инвойса/выставления, позициями с количеством и ценами, автоматическим расчётом итогов/скидок/налогов/общей суммы, управлением клиентами и действиями Предпросмотр/Скачать/Отправить. Каждый переход состояния визуально понятен и доступен.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "UX research validation", ru: "Валидация UX\u2011исследования" }, passed: true },
      { name: { en: "Information architecture review", ru: "Ревью информационной архитектуры" }, passed: true },
      { name: { en: "Usability testing passed", ru: "Юзабилити\u2011тестирование пройдено" }, passed: true },
      { name: { en: "UI kit consistency audit", ru: "Аудит консистентности UI\u2011кита" }, passed: true },
      { name: { en: "Responsive design verification", ru: "Проверка адаптивного дизайна" }, passed: true },
      { name: { en: "Design handoff completeness", ru: "Полнота передачи дизайна" }, passed: true },
    ],
    imageUrl: "/images/cases/m7-finance/dashboard.png",
    heroImage: "/images/cases/m7-finance/dashboard.png",
    screenshots: [
      { src: "/images/cases/m7-finance/project-overview.png", alt: { en: "Project Overview — problem statement, solution approach, M7-finance brand, and 4-stage UX design process", ru: "Обзор проекта — постановка проблемы, подход к решению, бренд M7\u2011finance и 4\u2011этапный UX\u2011процесс дизайна" } },
      { src: "/images/cases/m7-finance/mind-map.png", alt: { en: "Mind map — information architecture: Registration → Login → Activity/Statistics/Loan/Profile with sub-flows", ru: "Mind map — информационная архитектура: Регистрация → Логин → Активность/Статистика/Кредит/Профиль с подпотоками" } },
      { src: "/images/cases/m7-finance/login.png", alt: { en: "Sign In — email/password authentication with Google OAuth, 'Remember for 30 Days', and 'Forgot password'", ru: "Вход — аутентификация email/пароль с Google OAuth, «Запомнить на 30 дней» и «Забыли пароль»" } },
      { src: "/images/cases/m7-finance/registration.png", alt: { en: "Sign Up — account creation with full name, email, password fields and Google OAuth option", ru: "Регистрация — создание аккаунта с полями имя, email, пароль и опцией Google OAuth" } },
      { src: "/images/cases/m7-finance/dashboard.png", alt: { en: "Dashboard — total balance/spending/savings cards, working capital chart (Income vs Expenses), recent transactions, wallet cards, scheduled transfers", ru: "Dashboard — карточки баланса/расходов/накоплений, график оборотного капитала (Доходы vs Расходы), последние транзакции, карточки кошельков, запланированные переводы" } },
      { src: "/images/cases/m7-finance/transactions.png", alt: { en: "Transactions — searchable transaction list with Name/Business, Type, Amount, Date, Invoice ID, and View action", ru: "Транзакции — поисковый список транзакций с Именем/Бизнесом, Типом, Суммой, Датой, ID инвойса и действием Просмотр" } },
      { src: "/images/cases/m7-finance/invoices.png", alt: { en: "Invoices — list view with search, 'Create Invoice' button, filters, and status badges (Paid/Pending/Unpaid)", ru: "Инвойсы — список с поиском, кнопкой «Создать инвойс», фильтрами и статусными бейджами (Оплачен/Ожидание/Не оплачен)" } },
      { src: "/images/cases/m7-finance/invoice-detail.png", alt: { en: "New Invoice — company header, invoice/billing details, line items (iPhone 13 Pro Max, Netflix), subtotal/discount/tax/total, client details, Preview/Download/Send", ru: "Новый инвойс — хедер компании, реквизиты, позиции (iPhone 13 Pro Max, Netflix), итого/скидка/налог/сумма, данные клиента, Предпросмотр/Скачать/Отправить" } },
      { src: "/images/cases/m7-finance/wallets.png", alt: { en: "My Wallets — bank card management (Universal Bank + Commercial Bank), balance with performance metrics, payments list (Payoneer, Remitly, Wise, PayPal), upcoming payments", ru: "Мои кошельки — управление банковскими картами (Universal Bank + Commercial Bank), баланс с метриками, список платежей (Payoneer, Remitly, Wise, PayPal), предстоящие платежи" } },
      { src: "/images/cases/m7-finance/settings.png", alt: { en: "Settings — account information with personal details (name, DOB, phone, email) and password management", ru: "Настройки — информация аккаунта с личными данными (имя, дата рождения, телефон, email) и управление паролем" } },
      { src: "/images/cases/m7-finance/settings-edit.png", alt: { en: "Settings (edit mode) — updated personal information with 'Update' button and editable fields", ru: "Настройки (режим редактирования) — обновлённые личные данные с кнопкой «Обновить» и редактируемыми полями" } },
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
    imageUrl: "/images/cases/thumbnails/heatmap.png",
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
    imageUrl: "/images/cases/thumbnails/fintech-deposit.png",
    heroImage: "/images/cases/deposit-ux/step1-start.png",
    screenshots: [
      { src: "/images/cases/deposit-ux/step1-start.png", alt: { en: "Step 1 — Start: trial lesson booking with clear how-it-works instructions", ru: "Шаг 1 — Старт: запись на пробный урок с понятными инструкциями «Как это работает»" } },
      { src: "/images/cases/deposit-ux/step2-terms.png", alt: { en: "Step 2 — Terms: deposit conditions with summary, full text, and explicit consent checkbox", ru: "Шаг 2 — Условия: условия депозита с кратким описанием, полным текстом и явным чекбоксом согласия" } },
      { src: "/images/cases/deposit-ux/step3-deposit-payment.png", alt: { en: "Step 3 — Deposit: payment summary with amount (1000 KGS) and purpose clearly stated", ru: "Шаг 3 — Депозит: сводка платежа с суммой (1000 KGS) и чётко указанным назначением" } },
      { src: "/images/cases/deposit-ux/step4-confirmation.png", alt: { en: "Step 4 — Confirmation: deposit received with receipt details and next-step CTAs", ru: "Шаг 4 — Подтверждение: депозит получен с деталями квитанции и CTA для следующих шагов" } },
      { src: "/images/cases/deposit-ux/step5-complete.png", alt: { en: "Step 5 — Complete: all done with next steps checklist and lesson link placeholder", ru: "Шаг 5 — Готово: всё завершено, чеклист следующих шагов и место для ссылки на урок" } },
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

// Pin ArmaDEX (case-1 / web3-l1-dex) to index 0; everything else keeps its order.
const PINNED_SLUG = "web3-l1-dex";
const _pinned = _flagshipCases.find((c) => c.slug === PINNED_SLUG);
const _rest = _flagshipCases.filter((c) => c.slug !== PINNED_SLUG);
export const flagshipCases: FlagshipCase[] = _pinned ? [_pinned, ..._rest] : _flagshipCases;

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
