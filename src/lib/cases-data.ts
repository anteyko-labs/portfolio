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
  /** Screenshot display mode: "desktop" (16/10, 2 cols) | "mobile" (9/19, 3-4 cols). Default: "desktop" */
  screenshotLayout?: "desktop" | "mobile";
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
        title: { en: "Legally binding digital acceptance without e\u2011signature provider", ru: "Юридически обязывающий цифровой акцепт без провайдера электронной подписи" },
        description: {
          en: "Kyrgyz civil law (Article 396 of the Civil Code of the Kyrgyz Republic) allows acceptance of a public offer through 'conclusive actions' — but the burden of proof lies with the company. We built an evidence bundle that holds up in court without an external e-signature service: each acceptance captures 9+ forensic fields (IP, User-Agent, timestamp with NTP sync, offer version hash, explicit consent checkboxes, guardian data if minor), generates a PDF with company seal and director signature as the legal confirmation document, and stores everything in an append-only PostgreSQL table with row-level immutability (no UPDATE/DELETE on acceptance records, enforced by database trigger). The system produces a complete 'proof of acceptance' artifact that satisfies both the client's legal counsel and the requirements of Article 393 of the Civil Code of the Kyrgyz Republic.",
          ru: "Гражданский кодекс Кыргызской Республики (ст. 396 ГК КР) допускает акцепт публичной оферты через «конклюдентные действия» — но бремя доказывания лежит на компании. Мы построили доказательный пакет, который выдерживает суд без внешнего сервиса электронной подписи: каждый акцепт фиксирует 9+ криминалистических полей (IP, User\u2011Agent, timestamp с NTP\u2011синхронизацией, хеш версии оферты, явные чекбоксы согласия, данные представителя при несовершеннолетии), генерирует PDF с печатью и подписью директора как юридический подтверждающий документ и хранит всё в append\u2011only таблице PostgreSQL с row\u2011level immutability (запрет UPDATE/DELETE на записях акцепта, через триггер БД). Система выдаёт полный артефакт «подтверждение акцепта», удовлетворяющий юристов заказчика и требования ст. 393 ГК КР.",
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
    imageUrl: "/images/cases/trm-oferta/step1-adult.jpg",
    heroImage: "/images/cases/trm-oferta/step1-adult.jpg",
    screenshots: [
      {
        src: "/images/cases/trm-oferta/step1-adult.jpg",
        alt: {
          en: "Step 1: Adult registration — age toggle, full name, phone number",
          ru: "Шаг 1: Регистрация совершеннолетнего — выбор возраста, ФИО, телефон",
        },
      },
      {
        src: "/images/cases/trm-oferta/step2-oferta-collapsed.jpg",
        alt: {
          en: "Step 2: Public offer preview — company info, acceptance checkbox",
          ru: "Шаг 2: Превью публичной оферты — данные компании, чекбокс принятия",
        },
      },
      {
        src: "/images/cases/trm-oferta/step2-oferta-expanded.jpg",
        alt: {
          en: "Step 2: Public offer full text expanded — scrollable legal document",
          ru: "Шаг 2: Полный текст оферты развёрнут — прокручиваемый юридический документ",
        },
      },
      {
        src: "/images/cases/trm-oferta/step3-signed-adult.jpg",
        alt: {
          en: "Step 3: Offer signed — confirmation, record UUID, PDF download, student data summary",
          ru: "Шаг 3: Оферта подписана — подтверждение, номер записи (UUID), скачивание PDF, сводка данных",
        },
      },
      {
        src: "/images/cases/trm-oferta/step1-minor.jpg",
        alt: {
          en: "Step 1: Minor registration — guardian fields, warning banner, consent checkbox",
          ru: "Шаг 1: Регистрация несовершеннолетнего — поля представителя, предупреждение, чекбокс согласия",
        },
      },
      {
        src: "/images/cases/trm-oferta/step2-oferta-minor.jpg",
        alt: {
          en: "Step 2: Minor offer — expanded text, dual consent checkboxes (student + guardian)",
          ru: "Шаг 2: Оферта несовершеннолетнего — развёрнутый текст, двойной чекбокс (ученик + представитель)",
        },
      },
      {
        src: "/images/cases/trm-oferta/step3-signed-minor.jpg",
        alt: {
          en: "Step 3: Minor offer signed — confirmation with student and guardian data, PDF download",
          ru: "Шаг 3: Оферта несовершеннолетнего подписана — подтверждение с данными ученика и представителя, PDF",
        },
      },
      {
        src: "/images/cases/trm-oferta/admin-panel.jpg",
        alt: {
          en: "Admin panel: signed offers table — date, student, phone, guardian, status, actions (PDF, approve, reject)",
          ru: "Админ‑панель: таблица подписанных оферт — дата, ученик, телефон, представитель, статус, действия (PDF, подтвердить, отклонить)",
        },
      },
    ],
  },
  {
    id: "case-1",
    slug: "web3-l1-dex",
    category: "web3",
    year: 2025, // development 2025–2026
    title: {
      en: "L1 blockchain with built\u2011in perpetual DEX (end\u2011to\u2011end)",
      ru: "L1 блокчейн со встроенной DEX перпетуалов (end\u2011to\u2011end)",
    },
    summary: {
      en: "Performance\u2011oriented Layer\u20111 on Rust with deterministic EVM, native token economics, on\u2011chain perpetual orderbook, privacy layer (Bulletproofs), and a full product suite: DEX UI, Explorer, Operator Panel, Faucet, SDK.",
      ru: "Производительный Layer\u20111 на Rust с детерминированным EVM, экономикой нативного токена, ончейн\u2011ордербуком перпетуалов, слоем приватности (Bulletproofs) и полным продуктовым контуром: DEX UI, Explorer, Operator Panel, Faucet, SDK.",
    },
    metrics: [
      { label: { en: "Rust core modules", ru: "Модулей ядра на Rust" }, value: "25+" },
      { label: { en: "Frontend apps shipped", ru: "Отправленных фронтенд\u2011приложений" }, value: "4" },
      { label: { en: "API endpoints", ru: "API\u2011эндпоинтов" }, value: "90+" },
    ],
    artifactHint: { en: "L1 node + 4 UIs + 2 SDKs", ru: "L1 нода + 4 UI + 2 SDK" },
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
      en: "Built a single\u2011binary Rust node (25+ core modules) integrating consensus, validator registry, governance, slashing, fee market, EVM executor (revm, EIP\u20111559/2930 + BN256 pairing precompiles EIP\u2011196/197 for full Ethereum precompile compatibility), native token state, DEX engine (orderbook, positions, trades, OHLC candles), privacy primitives (Bulletproofs), checkpoint sync, and hybrid storage. The node exposes 90+ HTTP endpoints, JSON\u2011RPC (Ethereum\u2011compatible), and WebSocket (EVM subscriptions + DEX realtime streams). Shipped four Next.js applications: DEX trading terminal, public block explorer with contract verification, operator UI for node management/governance/staking, and testnet faucet. Two TypeScript SDKs: @armadex/sdk (explorer/contracts) + DEX SDK (trading integration).",
      ru: "Построили Rust\u2011ноду в одном бинарнике (25+ модулей ядра): консенсус, реестр валидаторов, governance, слэшинг, fee market, EVM\u2011исполнитель (revm, EIP\u20111559/2930 + прекомпайлы BN256 pairing EIP\u2011196/197 для полной совместимости с прекомпайлами Ethereum), состояние нативного токена, DEX\u2011движок (ордербук, позиции, сделки, OHLC\u2011свечи), криптопримитивы (Bulletproofs), checkpoint sync, гибридное хранилище. Нода предоставляет 90+ HTTP\u2011эндпоинтов, JSON\u2011RPC (Ethereum\u2011совместимый) и WebSocket (EVM\u2011подписки + DEX realtime\u2011стримы). Отправили четыре Next.js приложения: DEX\u2011терминал, эксплорер с верификацией контрактов, Operator UI для управления нодой/governance/стейкинга и тестнет\u2011фаукнет. Два TypeScript SDK: @armadex/sdk (эксплорер/контракты) + DEX SDK (трейдинг\u2011интеграция).",
    },
    deliverables: {
      en: [
        "L1 node on Rust: 25+ core modules, consensus, validators, governance, slashing, fee market, sync (62 integration test suites)",
        "Deterministic EVM executor (revm) with EIP\u20111559/2930 and native token precompile",
        "On\u2011chain perpetual DEX: orderbook, matching, positions, trades, OHLC, WebSocket streams",
        "Privacy layer with Bulletproofs for shielded orders",
        "Token economics: hard\u2011capped supply, epoch\u2011based emission, staking rewards",
        "DEX Trading UI (Next.js): terminal, charts, order forms, wallet integration",
        "Block Explorer: batches, transactions, contract verification, statistics, gas tracker",
        "Operator Panel: node status, governance, staking, fraud proof, sync, rolling updates",
        "Testnet Faucet with MetaMask integration",
        "2 TypeScript SDKs: @armadex/sdk (explorer/contracts) + DEX SDK (trading integration)",
        "Solidity contracts + Hardhat deployment scripts",
        "CI/CD, Prometheus/Grafana, OpenTelemetry, Nginx rate limiting (77 automation scripts, 28 documentation files)",
      ],
      ru: [
        "L1 нода на Rust: 25+ модулей ядра, консенсус, валидаторы, governance, слэшинг, fee market, синхронизация (62 интеграционных теста)",
        "Детерминированный EVM\u2011исполнитель (revm) с EIP\u20111559/2930 и прекомпайлом нативного токена",
        "Ончейн DEX перпетуалов: ордербук, матчинг, позиции, сделки, OHLC, WebSocket\u2011стримы",
        "Слой приватности на Bulletproofs для shielded\u2011ордеров",
        "Токеномика: жёсткий supply cap, эмиссия по эпохам, награды за стейкинг",
        "DEX Trading UI (Next.js): терминал, графики, формы ордеров, интеграция кошельков",
        "Эксплорер: батчи, транзакции, верификация контрактов, статистика, gas tracker",
        "Operator Panel: статус ноды, governance, стейкинг, fraud proof, sync, rolling updates",
        "Тестнет\u2011фаукнет с интеграцией MetaMask",
        "2 TypeScript SDK: @armadex/sdk (эксплорер/контракты) + DEX SDK (трейдинг\u2011интеграция)",
        "Solidity\u2011контракты + скрипты деплоя Hardhat",
        "CI/CD, Prometheus/Grafana, OpenTelemetry, rate limiting Nginx (77 скриптов автоматизации, 28 файлов документации)",
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
      en: "Testnet Alpha deployed and running: 7 active validators, 1.6M+ finalized batches (as of testnet alpha), 99%+ success rate. Full product suite operational across 90+ API endpoints: DEX terminal with realtime orderbook, block explorer with contract verification and gas tracker, operator panel with governance/staking/fraud proof controls, working faucet. Batches processed every ~2\u00A0seconds with sub\u2011250ms commit latency. 62 integration test suites, 77 automation scripts, 28 documentation files. Architecture, test coverage, and operational tooling at production\u2011grade level.",
      ru: "Testnet Alpha развёрнут и работает: 7 активных валидаторов, 1,6M+ финализированных батчей (на момент testnet alpha), 99%+ успешность. Полный продуктовый контур функционирует через 90+ API\u2011эндпоинтов: DEX\u2011терминал с realtime\u2011ордербуком, эксплорер с верификацией контрактов и gas tracker, панель оператора с governance/стейкинг/fraud proof, рабочий фаукнет. Батчи каждые ~2\u00A0с с латентностью <250\u00A0мс. 62 интеграционных теста, 77 скриптов автоматизации, 28 файлов документации. Архитектура, тесты и операционные инструменты на уровне продакшна.",
    },
    hardParts: [
      {
        title: { en: "Deterministic EVM with native token bridge", ru: "Детерминированный EVM с мостом нативного токена" },
        description: {
          en: "EVM execution must be fully deterministic for batch replay and fraud proofs. We run revm with EIP\u20111559/2930 support, BN256 pairing precompiles (EIP\u2011196/197) for full Ethereum precompile compatibility, and expose the native token via a custom precompile at address 0x0a (balanceOf, transfer, totalSupply)\u00A0\u2014 no ERC\u201120 wrapper duplication. Every state transition is reproducible across nodes.",
          ru: "Исполнение EVM полностью детерминировано для replay батчей и fraud proof. Используем revm с EIP\u20111559/2930, прекомпайлами BN256 pairing (EIP\u2011196/197) для полной совместимости с прекомпайлами Ethereum и предоставляем нативный токен через кастомный прекомпайл по адресу 0x0a (balanceOf, transfer, totalSupply)\u00A0\u2014 без дублирования ERC\u201120. Каждый переход состояния воспроизводим на всех нодах.",
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
        title: { en: "Staking Rewards Without 'Guaranteed Returns' (Regulatory Minefield)", ru: "Стейкинг\u2011награды без «гарантированных доходов» (регуляторное минное поле)" },
        description: {
          en: "UAE's VARA regulations classify tokens promising returns as securities — which triggers a completely different (and prohibitively expensive) licensing regime. We designed the staking mechanic as a 'commitment for access' model: users lock tokens to unlock tier benefits (discounts, priority, experiences), not to earn yield. Every UI label, tooltip, and contract function was reviewed with the client's legal counsel to ensure zero language could be interpreted as 'investment return.' The smart contract's reward distribution function was renamed from 'claimReward' to 'redeemBenefit' and emits events that explicitly reference 'loyalty benefit' — not 'yield' or 'interest.' This distinction kept the project within utility token classification under VARA guidelines.",
          ru: "Регуляции VARA (ОАЭ) классифицируют токены с обещанием доходности как ценные бумаги — что запускает совершенно другой (и непомерно дорогой) лицензионный режим. Мы спроектировали стейкинг\u2011механику как модель «обязательство для доступа»: пользователи блокируют токены для разблокировки тир\u2011привилегий (скидки, приоритет, впечатления), а не для заработка yield. Каждый лейбл в UI, тултип и функция контракта были проверены с юристами заказчика, чтобы ни одна формулировка не могла быть интерпретирована как «инвестиционный доход». Функция распределения наград в смарт\u2011контракте была переименована с 'claimReward' на 'redeemBenefit' и эмитит события с формулировкой 'loyalty benefit' — не 'yield' и не 'interest'. Это различие удержало проект в рамках классификации utility\u2011токена по VARA.",
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
        title: { en: "Cascading Inventory Reconciliation Across 3 Entity Layers", ru: "Каскадная рекончиляция запасов через 3 слоя сущностей" },
        description: {
          en: "Inventory is consumed at three levels simultaneously: ingredients are used in rolls, rolls are composed into sets, and sets/rolls are sold through orders. When an ingredient supply arrives or a write-off is logged, the system must (1) update ingredient stock, (2) recalculate available production capacity for every roll using that ingredient, (3) flag sets containing those rolls if stock falls below minimum threshold, and (4) block order creation for out-of-stock items — all within a single database transaction to prevent phantom stock. We solved this with PostgreSQL triggers that cascade through the dependency graph (ingredient → roll_ingredient → roll → set_roll → set) and a materialized 'availability' view that the order creation endpoint checks atomically.",
          ru: "Запасы потребляются на трёх уровнях одновременно: ингредиенты используются в роллах, роллы составляются в сеты, сеты/роллы продаются через заказы. Когда приходит поставка ингредиента или фиксируется списание, система должна (1) обновить остаток ингредиента, (2) пересчитать доступную производственную мощность для каждого ролла с этим ингредиентом, (3) пометить сеты с этими роллами если остаток ниже минимального порога, (4) заблокировать создание заказа для товаров not\u2011in\u2011stock — всё в рамках одной транзакции БД для предотвращения фантомных остатков. Решили через PostgreSQL\u2011триггеры, каскадирующие по графу зависимостей (ingredient → roll_ingredient → roll → set_roll → set) и материализованное представление «availability», которое эндпоинт создания заказа проверяет атомарно.",
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
    year: 2023,
    title: {
      en: "Tokenization & Digital Investment Platform (Dubai, UAE)",
      ru: "Платформа токенизации и цифровых инвестиций (Дубай, ОАЭ)",
    },
    summary: {
      en: "End-to-end digital investment platform and tokenization infrastructure built at the peak of Dubai's crypto-hub momentum: onboarding, KYC/verification fully aligned with VARA's codified Virtual Assets Regulations (February 2023), Private Sale module with on\u2011chain token allocation, investor dashboard, admin panel with full audit trail, and Solidity 0.8 smart contracts on Polygon PoS — compliance-first architecture for a Dubai-based investment company capitalizing on the 2023 RWA tokenization wave.",
      ru: "End\u2011to\u2011end цифровая инвестиционная платформа и инфраструктура токенизации, построенная на пике крипто\u2011хаб импульса Дубая: онбординг, KYC/верификация в полном соответствии с кодифицированными Virtual Assets Regulations VARA (февраль 2023), модуль Private Sale с ончейн\u2011распределением токенов, кабинет инвестора, админ\u2011панель с полным аудит\u2011трейлом и смарт\u2011контракты Solidity 0.8 на Polygon PoS — compliance\u2011first архитектура для инвестиционной компании из Дубая, входящей в волну токенизации реальных активов (RWA) 2023 года.",
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
      en: "In 2023 Dubai had cemented its position as the world's leading virtual assets jurisdiction — VARA published its comprehensive Virtual Assets and Related Activities Regulations in February 2023, giving the market the first fully codified rulebook in the region. Investment companies across the emirate now had clear compliance targets but needed production-grade digital infrastructure to meet them. A Dubai-based investment company (L.L.C) operating in real-world asset (RWA) tokenization — the dominant blockchain narrative of 2023, with BlackRock, Hamilton Lane, and Siemens entering the space — needed a controlled, transparent, and legally compliant entry point for international investors: securely collect and store user data, conduct KYC/verification meeting both UAE federal AML/CFT requirements and the newly codified VARA guidelines, provide access to Private Sale rounds with on-chain token allocation, and ensure transaction transparency with a full audit trail and role-based access control. Most tokenization platforms in the MENA region were either unregulated DeFi frontends carried over from the 2021\u20112022 cycle or over-engineered enterprise solutions with 6+ month delivery timelines and pre-2023 compliance assumptions. The client needed a production-grade platform combining a web investment product, a Private Sale module, an EVM-compatible blockchain layer for ERC-20 token issuance on Polygon PoS (chosen for sub-cent gas fees critical for investor onboarding UX), and an operational admin panel — delivered in 12 weeks to meet the Q3 2023 Private Sale launch deadline.",
      ru: "В 2023 году Дубай закрепил позицию ведущей мировой юрисдикции виртуальных активов — VARA опубликовал исчерпывающие Virtual Assets and Related Activities Regulations в феврале 2023, предоставив рынку первый полностью кодифицированный свод правил в регионе. Инвестиционные компании по всему эмирату теперь имели чёткие compliance\u2011цели, но нуждались в production\u2011grade цифровой инфраструктуре для их соответствия. Инвестиционная компания из Дубая (L.L.C), работающая в сфере токенизации реальных активов (RWA) — доминирующего блокчейн\u2011нарратива 2023 года, куда вошли BlackRock, Hamilton Lane и Siemens — нуждалась в контролируемой, прозрачной и юридически compliant точке входа для международных инвесторов: безопасно собирать и хранить данные пользователей, проводить KYC/верификацию, соответствующую как федеральным AML/CFT требованиям ОАЭ, так и свежекодифицированным руководствам VARA, предоставлять доступ к раундам Private Sale с ончейн\u2011распределением токенов и обеспечивать прозрачность транзакций с полным аудит\u2011трейлом и разграничением доступа по ролям. Большинство платформ токенизации в регионе MENA были либо нерегулируемыми DeFi\u2011фронтендами из цикла 2021\u20112022, либо перегруженными enterprise\u2011решениями с таймлайном 6+ месяцев и compliance\u2011допущениями до\u20112023 года. Клиенту требовалась production\u2011grade платформа, совмещающая инвестиционный веб\u2011продукт, модуль Private Sale, EVM\u2011совместимый блокчейн\u2011слой для выпуска ERC\u201120 токенов на Polygon PoS (выбран за sub\u2011cent gas fees, критичные для UX онбординга инвесторов), и операционную админ\u2011панель — с поставкой за 12 недель к дедлайну запуска Private Sale в Q3 2023.",
    },
    constraints: {
      en: [
        "UAE AML/CFT compliance + full alignment with VARA Virtual Assets Regulations (codified February 2023)",
        "KYC as the core access gate — no platform feature available before identity verification",
        "Role-based access control (user / admin / ops) for all critical operations",
        "Private Sale must enforce limits, statuses, and safe state transitions with idempotent operations",
        "Auditability & traceability for every sensitive action (who, when, what changed, from which IP)",
        "Document upload/storage with AES\u2011256 encryption at rest, per\u2011user KMS keys, and access control",
        "Investor-grade UX: dashboard, history, transparency — not a 'crypto demo'",
        "Polygon PoS for token issuance (sub\u2011cent gas fees, EVM\u2011compatible, Ethereum security via checkpoints)",
        "12\u2011week hard deadline for Q3 2023 Private Sale launch",
        "NDA: exact financial metrics and partner identity are confidential",
      ],
      ru: [
        "Соответствие AML/CFT ОАЭ + полная согласованность с Virtual Assets Regulations VARA (кодифицированы февраль 2023)",
        "KYC как ядро контроля доступа — ни одна функция платформы недоступна без верификации личности",
        "Разграничение доступа по ролям (user / admin / ops) для всех критических операций",
        "Private Sale обязан контролировать лимиты, статусы и безопасные идемпотентные переходы состояний",
        "Auditability & traceability для каждого чувствительного действия (кто, когда, что изменил, с какого IP)",
        "Загрузка/хранение документов с AES\u2011256 шифрованием at rest, per\u2011user ключами KMS и контролем доступа",
        "Investor\u2011grade UX: дашборд, история, прозрачность — не «крипто\u2011демо»",
        "Polygon PoS для выпуска токенов (sub\u2011cent gas fees, EVM\u2011совместимость, безопасность Ethereum через checkpoints)",
        "Жёсткий дедлайн 12 недель к запуску Private Sale в Q3 2023",
        "NDA: точные финансовые метрики и данные партнёра конфиденциальны",
      ],
    },
    solution: {
      en: "Designed and built a 6-module digital investment platform on React\u00A018 + Next.js\u00A013 (App Router) frontend and Node.js\u00A018\u00A0LTS + PostgreSQL\u00A015 backend, with Solidity\u00A00.8.19 smart contracts deployed on Polygon PoS via Hardhat: (1) Onboarding & Registration — user sign-up with progressive validation via Zod schemas (shared between client and server), profile status state machine, and step-by-step progress flow with email verification (Nodemailer + AWS SES); (2) KYC / Identity Verification — multi-document collection supporting Emirates ID, EU passports, and US driver's licenses, 4-status verification pipeline (pending → approved → rejected → resubmission) with Prisma ORM state transitions, file upload to S3 with AES-256 encryption at rest via AWS KMS, EXIF metadata stripping, perceptual hash duplicate detection, and full action logging with IP and User-Agent capture; (3) Investor Dashboard — Next.js 13 App Router with React Server Components for initial data load, client components with SWR for real-time availability counters, profile verification statuses, transaction history with CSV export, and participation management; (4) Private Sale Module — investor participation scenarios with conditions, configurable per-round limits, and idempotent state transitions (XState v4 state machine on backend), payment confirmation (manual operator flow or webhook integration), ERC-20 token allocation triggered by confirmed payment with on-chain settlement via ethers.js v6; (5) Admin Panel & Operations — protected by JWT + RBAC middleware (3 roles: user/admin/ops), user and KYC status management, request processing queue with assignment, product/round CRUD with soft-delete, admin audit journal with immutable append-only PostgreSQL table; (6) Blockchain Layer — Solidity 0.8.19 ERC-20 token contract with OpenZeppelin 4.9 (AccessControl, Pausable, ERC20Snapshot for dividend distribution), deployed on Polygon PoS mainnet via Hardhat with deterministic deployment (CREATE2), verified on Polygonscan, integrated with web platform via ethers.js v6 provider with typed contract bindings (TypeChain).",
      ru: "Спроектировали и построили 6\u2011модульную цифровую инвестиционную платформу на React\u00A018 + Next.js\u00A013 (App Router) фронтенде и Node.js\u00A018\u00A0LTS + PostgreSQL\u00A015 бэкенде, со смарт\u2011контрактами Solidity\u00A00.8.19, развёрнутыми на Polygon PoS через Hardhat: (1) Онбординг и регистрация — регистрация с прогрессивной валидацией через Zod\u2011схемы (shared между клиентом и сервером), state machine статусов профиля, пошаговый прогресс\u2011flow с email\u2011верификацией (Nodemailer + AWS SES); (2) KYC / Identity Verification — сбор мультиформатных документов (Emirates ID, паспорта ЕС, водительские права США), 4\u2011статусный пайплайн верификации (pending → approved → rejected → resubmission) с переходами состояний через Prisma ORM, загрузка файлов в S3 с AES\u2011256 шифрованием at rest через AWS KMS, удаление EXIF\u2011метаданных, детекция дубликатов по перцептуальному хешу и полное логирование действий с фиксацией IP и User\u2011Agent; (3) Кабинет инвестора — Next.js 13 App Router с React Server Components для начальной загрузки данных, клиентские компоненты с SWR для real\u2011time счётчиков доступности, статусы верификации профиля, история транзакций с CSV\u2011экспортом и управление участием; (4) Модуль Private Sale — сценарии участия с условиями, настраиваемыми лимитами по раундам и идемпотентными переходами состояний (XState v4 state machine на бэкенде), подтверждение платежей (ручной flow оператора или webhook\u2011интеграция), распределение ERC\u201120 токенов по подтверждённым платежам с ончейн\u2011расчётом через ethers.js v6; (5) Админ\u2011панель и операции — защищена JWT + RBAC\u2011мидлварой (3 роли: user/admin/ops), управление пользователями и KYC\u2011статусами, очередь обработки заявок с назначением, CRUD продуктов/раундов с soft\u2011delete, журнал аудита с immutable append\u2011only таблицей PostgreSQL; (6) Блокчейн\u2011слой — Solidity 0.8.19 ERC\u201120 контракт с OpenZeppelin 4.9 (AccessControl, Pausable, ERC20Snapshot для распределения дивидендов), развёрнут на Polygon PoS mainnet через Hardhat с детерминированным деплоем (CREATE2), верифицирован на Polygonscan, интегрирован с веб\u2011платформой через ethers.js v6 провайдер с типизированными биндингами контрактов (TypeChain).",
    },
    deliverables: {
      en: [
        "Onboarding & registration flow with email verification (Nodemailer + AWS SES) and profile status state machine",
        "KYC verification module (4-status pipeline, S3 document upload with AES-256/KMS encryption, EXIF stripping, perceptual hash duplicate detection)",
        "Investor dashboard (Next.js 13 App Router + RSC: profile, products, transaction history with CSV export, real-time availability via SWR)",
        "Private Sale module (XState v4 state machine, configurable per-round limits, idempotent transitions, on-chain ERC-20 token allocation via ethers.js v6)",
        "Admin panel with RBAC (3 roles), request processing queue, product/round CRUD, and immutable audit journal",
        "Solidity 0.8.19 ERC-20 token contract (OpenZeppelin 4.9: AccessControl, Pausable, ERC20Snapshot) deployed on Polygon PoS via Hardhat",
        "JWT authentication with refresh token rotation, bcrypt password hashing, and express-rate-limit",
        "Action logging and audit trail for all sensitive operations (append-only PostgreSQL table with IP, User-Agent, timestamp)",
        "Stakeholder documentation (feature descriptions, roadmap, system architecture diagrams)",
        "Production deployment on AWS (EC2 + RDS + S3 + CloudFront) with Docker, Nginx reverse proxy, and SSL termination",
      ],
      ru: [
        "Онбординг и регистрация с email\u2011верификацией (Nodemailer + AWS SES) и state machine статусов профиля",
        "Модуль KYC\u2011верификации (4\u2011статусный пайплайн, загрузка документов в S3 с AES\u2011256/KMS шифрованием, удаление EXIF, детекция дубликатов по перцептуальному хешу)",
        "Кабинет инвестора (Next.js 13 App Router + RSC: профиль, продукты, история транзакций с CSV\u2011экспортом, real\u2011time доступность через SWR)",
        "Модуль Private Sale (XState v4 state machine, настраиваемые лимиты по раундам, идемпотентные переходы, ончейн\u2011распределение ERC\u201120 токенов через ethers.js v6)",
        "Админ\u2011панель с RBAC (3 роли), очередь обработки заявок, CRUD продуктов/раундов и immutable журнал аудита",
        "Solidity 0.8.19 ERC\u201120 контракт (OpenZeppelin 4.9: AccessControl, Pausable, ERC20Snapshot), развёрнут на Polygon PoS через Hardhat",
        "JWT\u2011аутентификация с ротацией refresh\u2011токенов, bcrypt\u2011хеширование паролей и express\u2011rate\u2011limit",
        "Логирование действий и аудит\u2011трейл (append\u2011only таблица PostgreSQL с IP, User\u2011Agent, timestamp)",
        "Документация для стейкхолдеров (описание функций, roadmap, диаграммы архитектуры)",
        "Production\u2011деплой на AWS (EC2 + RDS + S3 + CloudFront) с Docker, Nginx reverse proxy и SSL termination",
      ],
    },
    techStack: ["Solidity 0.8.19", "OpenZeppelin 4.9", "Hardhat", "ethers.js v6", "TypeChain", "Polygon PoS", "React 18", "Next.js 13 (App Router)", "TypeScript 5.0", "Zod", "SWR", "Tailwind CSS 3.3", "Three.js", "React Three Fiber", "Node.js 18 LTS", "Express", "Prisma", "PostgreSQL 15", "XState v4", "Sharp", "AWS S3", "AWS KMS", "AWS SES", "CloudFront", "Docker", "Nginx"],
    outcome: {
      en: "Delivered in 12 weeks to meet the Q3 2023 Private Sale deadline. End-to-end investor flow operational: user → KYC (4-status pipeline with encrypted document storage) → access → Private Sale participation (XState-driven state machine with idempotent transitions) → on-chain ERC-20 token allocation on Polygon PoS. Smart contract (Solidity 0.8.19 + OpenZeppelin 4.9) deployed and verified on Polygonscan, handling token minting with AccessControl role separation. KYC document pipeline processes uploads from 12+ countries with AES-256 encryption, perceptual hash duplicate detection, and append-only audit records. Admin panel with RBAC gives the operations team full control over user statuses, sale rounds, and compliance journal — without developer involvement. Next.js 13 App Router with React Server Components reduced dashboard initial load by 40% compared to the client-only SPA approach. Platform served as the operational backbone for the client's first tokenized asset offering under the newly codified VARA regulations, handling investor onboarding through Private Sale close. Scalable architecture (Prisma + PostgreSQL 15 + S3 + Docker) designed to support subsequent sale rounds and regulatory evolution. Per NDA, the exact raise amount and investor count remain confidential.",
      ru: "Поставлено за 12 недель к дедлайну Private Sale в Q3 2023. End\u2011to\u2011end инвестиционный поток работает: пользователь → KYC (4\u2011статусный пайплайн с зашифрованным хранением документов) → доступ → участие в Private Sale (XState\u2011driven state machine с идемпотентными переходами) → ончейн\u2011распределение ERC\u201120 токенов на Polygon PoS. Смарт\u2011контракт (Solidity 0.8.19 + OpenZeppelin 4.9) развёрнут и верифицирован на Polygonscan, обрабатывает минтинг токенов с разделением ролей через AccessControl. KYC\u2011пайплайн документов обрабатывает загрузки из 12+ стран с AES\u2011256 шифрованием, детекцией дубликатов по перцептуальному хешу и append\u2011only аудит\u2011записями. Админ\u2011панель с RBAC даёт операционной команде полный контроль над статусами пользователей, раундами sale и compliance\u2011журналом — без участия разработчика. Next.js 13 App Router с React Server Components сократил начальную загрузку дашборда на 40% по сравнению с client\u2011only SPA подходом. Платформа стала операционным фундаментом первого токенизированного предложения активов клиента в рамках свежекодифицированных регуляций VARA, обслуживая онбординг инвесторов до закрытия Private Sale. Масштабируемая архитектура (Prisma + PostgreSQL 15 + S3 + Docker) спроектирована для поддержки последующих раундов sale и регуляторной эволюции. По NDA точный объём привлечения и количество инвесторов конфиденциальны.",
    },
    hardParts: [
      {
        title: { en: "Compliance-First Architecture Aligned with VARA's Codified Regulations", ru: "Compliance\u2011first архитектура в соответствии с кодифицированными регуляциями VARA" },
        description: {
          en: "Building a tokenization platform in Dubai in 2023 came with a clear advantage over the previous year's ambiguity: VARA published its comprehensive Virtual Assets and Related Activities Regulations in February 2023, providing the first fully codified compliance framework in the GCC. We designed the platform to satisfy every applicable VARA requirement from day one — not retrofitting compliance after launch. KYC is not a 'checkbox' but the access gateway to every platform feature. The 4-status verification pipeline (pending → approved → rejected → resubmission) is implemented as a Prisma-managed state machine with transition guards: only an operator with 'ops' role can approve, rejection requires a mandatory reason field, and resubmission resets the pipeline while preserving the previous submission's audit record. Every document upload goes through file type validation (reject executables disguised as images via magic byte inspection), EXIF metadata stripping (privacy protection), perceptual hash computation (phash library — detects re-uploads of previously rejected documents even if cropped or resized), AES-256-GCM encryption at rest with per-user keys derived from AWS KMS, and access control where only the document owner and the assigned KYC reviewer can view files. This architecture satisfies both UAE federal AML/CFT requirements and VARA's Virtual Asset Service Provider (VASP) licensing conditions — the client used the platform's compliance documentation as supporting evidence in their VARA license application.",
          ru: "Строить платформу токенизации в Дубае в 2023 году давало чёткое преимущество перед неопределённостью предыдущего года: VARA опубликовал исчерпывающие Virtual Assets and Related Activities Regulations в феврале 2023, предоставив первый полностью кодифицированный compliance\u2011фреймворк в GCC. Мы спроектировали платформу для удовлетворения каждого применимого требования VARA с первого дня — без ретрофиттинга compliance после запуска. KYC — не «галочка», а ворота доступа к каждой функции платформы. 4\u2011статусный пайплайн верификации (pending → approved → rejected → resubmission) реализован как Prisma\u2011управляемый state machine с transition guards: только оператор с ролью 'ops' может одобрить, отклонение требует обязательного поля причины, resubmission сбрасывает пайплайн, сохраняя аудит\u2011запись предыдущей подачи. Каждая загрузка документа проходит валидацию типа файла (отклонение исполняемых файлов через magic byte inspection), удаление EXIF\u2011метаданных (защита приватности), вычисление перцептуального хеша (phash — детектирует повторные загрузки отклонённых документов, даже обрезанных или масштабированных), AES\u2011256\u2011GCM шифрование at rest с per\u2011user ключами из AWS KMS, и контроль доступа: только владелец документа и назначенный KYC\u2011ревьюер видят файлы. Архитектура удовлетворяет как федеральные AML/CFT требования ОАЭ, так и условия лицензирования VARA для провайдеров виртуальных активов (VASP) — клиент использовал compliance\u2011документацию платформы как подтверждающие материалы в заявке на лицензию VARA.",
        },
      },
      {
        title: { en: "Private Sale State Machine with Idempotent On\u2011Chain Settlement", ru: "State machine Private Sale с идемпотентным ончейн\u2011расчётом" },
        description: {
          en: "Investor participation in sale rounds goes through an XState v4-driven state machine with 7 states: Eligible → Applied → PaymentPending → PaymentConfirmed → TokenAllocated → Settled → Completed. Each transition has explicit guards: Eligible checks KYC status + accreditation level + round availability; Applied validates against per-investor and per-round hard caps; PaymentConfirmed triggers ERC-20 token minting via ethers.js v6 (Contract.mint() with typed bindings from TypeChain and nonce management to prevent double-minting). All transitions are idempotent — retrying a failed transition produces the same result without side effects. The state machine is serialized to PostgreSQL 15 (via Prisma) with optimistic locking (version field) to prevent race conditions when operators process concurrent requests. On-chain settlement uses Polygon PoS for sub-cent gas costs (~$0.001 per mint in 2023), making it economically viable to settle each investor's allocation individually rather than batching — improving auditability. The smart contract uses OpenZeppelin 4.9 AccessControl with MINTER_ROLE separated from DEFAULT_ADMIN_ROLE, so the platform's backend wallet can mint tokens but cannot change contract permissions.",
          ru: "Участие инвестора в раундах sale проходит через XState v4\u2011driven state machine с 7 состояниями: Eligible → Applied → PaymentPending → PaymentConfirmed → TokenAllocated → Settled → Completed. Каждый переход имеет явные guards: Eligible проверяет KYC\u2011статус + уровень аккредитации + доступность раунда; Applied валидирует per\u2011investor и per\u2011round hard caps; PaymentConfirmed триггерит минтинг ERC\u201120 через ethers.js v6 (Contract.mint() с типизированными биндингами из TypeChain и управлением nonce для предотвращения двойного минтинга). Все переходы идемпотентны — повтор неудавшегося перехода производит тот же результат без побочных эффектов. State machine сериализуется в PostgreSQL 15 (через Prisma) с optimistic locking (поле version) для предотвращения race conditions при конкурентной обработке заявок операторами. Ончейн\u2011расчёт использует Polygon PoS за sub\u2011cent gas (~$0.001 за минт в 2023), что делает экономически целесообразным индивидуальный расчёт по каждому инвестору вместо батчинга — улучшая аудитируемость. Смарт\u2011контракт использует OpenZeppelin 4.9 AccessControl с MINTER_ROLE, отделённой от DEFAULT_ADMIN_ROLE, так что бэкенд\u2011кошелёк платформы может минтить токены, но не может менять разрешения контракта.",
        },
      },
      {
        title: { en: "Investor-Grade UX: TradFi Patterns over Blockchain Complexity", ru: "Investor\u2011grade UX: TradFi\u2011паттерны поверх блокчейн\u2011сложности" },
        description: {
          en: "The target investors were HNWIs and institutional allocators accustomed to private banking portals — not DeFi power users. In 2023, with RWA tokenization attracting institutional capital (BlackRock's tokenized fund announcement set the tone), the UX bar was especially high. The platform UX deliberately mimics traditional investment dashboards: portfolio view with fiat-denominated values (USD/AED), transaction history with familiar 'pending/confirmed/settled' statuses, document cabinet with contract stamps and signatures, and a profile page that resembles a private bank's client area. Blockchain interactions are abstracted completely — investors never see wallet addresses, gas fees, or transaction hashes. Token allocation appears as a line item in their portfolio with a dollar value. The admin panel follows the same principle: operators manage sale rounds, process KYC requests, and approve allocations through a familiar CRUD interface — not a 'developer console'. Built with Next.js 13 App Router — the most significant React framework shift of 2023 — leveraging React Server Components for zero-JS initial dashboard renders (investor profile, KYC status, and portfolio data load server-side), with client components using SWR only for real-time counters and polling. Tailwind CSS 3.3 for rapid UI iteration, Zod for shared validation schemas between client and server. The 3D illustrations on the landing page (globe, resource visualizations) use Three.js with React Three Fiber — a deliberate premium visual signal for investors evaluating the platform's credibility.",
          ru: "Целевые инвесторы — HNWI и институциональные аллокаторы, привыкшие к порталам private banking, а не DeFi power\u2011users. В 2023 году, когда токенизация RWA привлекала институциональный капитал (анонс токенизированного фонда BlackRock задал тон), планка UX была особенно высокой. UX платформы намеренно имитирует традиционные инвестиционные дашборды: портфельный вид с фиатными значениями (USD/AED), история транзакций со знакомыми статусами 'ожидание/подтверждён/рассчитан', документный кабинет с печатями и подписями контрактов, страница профиля, напоминающая клиентскую зону private bank. Блокчейн\u2011взаимодействия полностью абстрагированы — инвесторы никогда не видят адреса кошельков, gas fees или хеши транзакций. Распределение токенов отображается как строка в портфеле с долларовой стоимостью. Админ\u2011панель следует тому же принципу: операторы управляют раундами sale, обрабатывают KYC\u2011заявки и одобряют распределения через привычный CRUD\u2011интерфейс, а не «консоль разработчика». Построено на Next.js 13 App Router — самом значительном сдвиге React\u2011фреймворков 2023 года — с использованием React Server Components для zero\u2011JS начальных рендеров дашборда (профиль инвестора, KYC\u2011статус и данные портфеля загружаются серверно), с клиентскими компонентами на SWR только для real\u2011time счётчиков и поллинга. Tailwind CSS 3.3 для быстрой итерации UI, Zod для shared\u2011валидационных схем между клиентом и сервером. 3D\u2011иллюстрации на лендинге (глобус, визуализации ресурсов) используют Three.js с React Three Fiber — намеренный премиальный визуальный сигнал для инвесторов, оценивающих репутацию платформы.",
        },
      },
      {
        title: { en: "Multi-Jurisdiction Document Pipeline with Tamper Detection", ru: "Мультиюрисдикционный документооборот с детекцией подмены" },
        description: {
          en: "KYC documents arrive from 12+ countries with different ID formats (UAE Emirates ID, EU passport, US driver's license, GCC national IDs). In 2023, with Dubai fully established as the world's virtual assets capital and VARA licensing attracting crypto companies globally, the investor base was geographically diverse from day one. Each upload goes through a 5-stage pipeline: (1) magic byte inspection — reject executables disguised as images by checking file headers against declared MIME type, not relying on file extension; (2) EXIF metadata stripping via Sharp (remove geolocation, device info) for investor privacy before storage; (3) perceptual hash computation (phash) stored in PostgreSQL — on each new upload, compare against the hash database to detect re-uploads of previously rejected documents (even if cropped, rotated, or quality-reduced); (4) AES-256-GCM encryption at rest using per-user data encryption keys (DEK) wrapped by AWS KMS customer master key (CMK) — envelope encryption pattern; (5) fine-grained access control: only the document owner and the specifically assigned KYC reviewer (ops role) can view raw files — any access by admin role creates an immutable audit event with IP, timestamp, and reason field. Documents are stored in S3 with versioning and MFA-delete enabled; any object replacement triggers a CloudWatch alarm → SNS → compliance team email. The pipeline processed 500+ document uploads during the first Private Sale round and passed the client's external security audit (conducted by a Dubai-based CISO consultancy) on the first review.",
          ru: "KYC\u2011документы приходят из 12+ стран с разными форматами ID (Emirates ID ОАЭ, паспорт ЕС, водительские права США, национальные ID стран GCC). В 2023 году, когда Дубай окончательно утвердился как мировая столица виртуальных активов и лицензирование VARA привлекало крипто\u2011компании со всего мира, база инвесторов была географически разнообразна с первого дня. Каждая загрузка проходит 5\u2011стадийный пайплайн: (1) magic byte inspection — отклонение исполняемых файлов, замаскированных под изображения, через проверку заголовков файла, а не расширения; (2) удаление EXIF\u2011метаданных через Sharp (геолокация, информация об устройстве) для защиты приватности инвесторов; (3) вычисление перцептуального хеша (phash), хранимого в PostgreSQL — при каждой новой загрузке сравнение с базой хешей для детекции повторных загрузок отклонённых документов (даже обрезанных, повёрнутых или со сниженным качеством); (4) AES\u2011256\u2011GCM шифрование at rest через per\u2011user data encryption keys (DEK), обёрнутые customer master key (CMK) AWS KMS — паттерн envelope encryption; (5) гранулярный контроль доступа: только владелец документа и конкретно назначенный KYC\u2011ревьюер (роль ops) могут видеть raw\u2011файлы — любой доступ роли admin создаёт immutable audit\u2011событие с IP, timestamp и обязательным полем причины. Документы хранятся в S3 с версионированием и MFA\u2011delete; любая замена объекта триггерит CloudWatch alarm → SNS → email compliance\u2011команде. Пайплайн обработал 500+ загрузок документов за первый раунд Private Sale и прошёл внешний security\u2011аудит заказчика (проведённый CISO\u2011консалтингом из Дубая) с первого раза.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build (frontend + backend + contracts)", ru: "Сборка (фронтенд + бэкенд + контракты)" }, passed: true },
      { name: { en: "Solidity 0.8.19 contract audit (Hardhat tests + manual review)", ru: "Аудит контрактов Solidity 0.8.19 (Hardhat\u2011тесты + ручной ревью)" }, passed: true },
      { name: { en: "Polygonscan contract verification", ru: "Верификация контракта на Polygonscan" }, passed: true },
      { name: { en: "KYC pipeline E2E tests (12+ document formats)", ru: "E2E\u2011тесты KYC\u2011пайплайна (12+ форматов документов)" }, passed: true },
      { name: { en: "XState v4 Private Sale state machine invariants", ru: "Инварианты XState v4 state machine Private Sale" }, passed: true },
      { name: { en: "RBAC access control verification (3 roles)", ru: "Проверка RBAC (3 роли)" }, passed: true },
      { name: { en: "Audit trail completeness & immutability", ru: "Полнота и иммутабельность аудит\u2011трейла" }, passed: true },
      { name: { en: "Document encryption pipeline (AES\u2011256\u2011GCM + KMS)", ru: "Пайплайн шифрования документов (AES\u2011256\u2011GCM + KMS)" }, passed: true },
      { name: { en: "External security audit (Dubai CISO consultancy)", ru: "Внешний security\u2011аудит (CISO\u2011консалтинг Дубай)" }, passed: true },
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
    id: "case-14",
    slug: "kut-wallet-crypto",
    category: "product",
    year: 2023,
    title: {
      en: "KutWallet: Multi‑Asset Crypto Wallet with Integrated Exchange (iOS, end‑to‑end)",
      ru: "KutWallet: мультиактивный криптокошелёк со встроенной биржей (iOS, end‑to‑end)",
    },
    summary: {
      en: "Full\u2011cycle mobile crypto wallet for iOS: non\u2011custodial key management with AES\u2011256\u2011GCM encryption, 4\u2011digit PIN + Face\u00A0ID biometric auth, 3\u2011step onboarding with value\u2011driven storytelling, multi\u2011asset portfolio dashboard with real\u2011time price feeds (BTC, ETH, LTC, XRP), built\u2011in exchange with interactive candlestick charts and Buy/Sell flow, spending analytics with category\u2011segmented donut chart, QR\u2011code scanner for instant P2P transfers, multi\u2011currency fiat settings with 6+ currencies, OAuth social login (Google, Apple\u00A0ID), 4\u2011digit OTP email verification, and a Node.js/PostgreSQL backend with WebSocket price streaming and CoinGecko aggregation.",
      ru: "Полноценный мобильный криптокошелёк для iOS: некастодиальное управление ключами с AES\u2011256\u2011GCM\u2011шифрованием, 4\u2011значный PIN + биометрия Face\u00A0ID, 3\u2011шаговый онбординг с ценностным сторителлингом, мультиактивный дашборд портфеля с ценами в реальном времени (BTC, ETH, LTC, XRP), встроенная биржа с интерактивными свечными графиками и потоком Buy/Sell, аналитика расходов с сегментированной donut\u2011диаграммой, QR\u2011сканер для мгновенных P2P\u2011переводов, мультивалютные фиатные настройки (6+ валют), OAuth\u2011вход (Google, Apple\u00A0ID), OTP\u2011верификация email и Node.js/PostgreSQL бэкенд с WebSocket\u2011стримингом цен и агрегацией CoinGecko.",
    },
    metrics: [
      { label: { en: "UI screens designed & built", ru: "Экранов UI спроектировано и построено" }, value: "26+" },
      { label: { en: "Supported cryptocurrencies", ru: "Поддерживаемых криптовалют" }, value: "5+" },
      { label: { en: "Fiat currencies supported", ru: "Поддерживаемых фиатных валют" }, value: "6+" },
      { label: { en: "Auth layers (PIN + Bio + OTP)", ru: "Уровней аутентификации (PIN + Bio + OTP)" }, value: "3" },
    ],
    artifactHint: { en: "iOS wallet + exchange + analytics", ru: "iOS\u2011кошелёк + биржа + аналитика" },
    industry: { en: "FinTech / Crypto / Blockchain", ru: "FinTech / Крипто / Блокчейн" },
    timeline: { en: "10\u00A0weeks", ru: "10\u00A0недель" },
    problem: {
      en: "A fintech startup needed a production\u2011grade mobile crypto wallet that combined portfolio management, real\u2011time exchange, and spending analytics in a single app\u00A0\u2014 without the fragmented UX of existing solutions where users juggle separate apps for holding, trading, and tracking. The key product constraint: the wallet had to feel as intuitive as a traditional banking app (familiar patterns\u00A0\u2014 PIN entry, Face\u00A0ID, card\u2011like balance view) while delivering crypto\u2011native functionality (multi\u2011chain asset management, on\u2011ramp/off\u2011ramp exchange with live candlestick charts, QR\u2011code P2P transfers, and blockchain transaction history). The target audience\u00A0\u2014 crypto\u2011curious users migrating from TradFi apps\u00A0\u2014 demanded zero\u2011friction onboarding (3 screens max before value demonstration), bank\u2011grade security without password fatigue, and a spending analytics layer that bridges crypto holdings with real\u2011world purchasing patterns. Existing wallets in 2023 (Trust Wallet, Coinbase Wallet, MetaMask Mobile) were either too technical for mainstream users or lacked integrated exchange and analytics. The client needed a competitive differentiator in UX quality and feature density.",
      ru: "Финтех\u2011стартапу требовался production\u2011ready мобильный криптокошелёк, объединяющий управление портфелем, биржу в реальном времени и аналитику расходов в одном приложении\u00A0\u2014 без фрагментированного UX существующих решений, где пользователи переключаются между отдельными приложениями для хранения, трейдинга и трекинга. Ключевое продуктовое ограничение: кошелёк должен ощущаться так же интуитивно, как банковское приложение (знакомые паттерны\u00A0\u2014 ввод PIN, Face\u00A0ID, баланс в стиле карты), при этом предоставляя крипто\u2011нативную функциональность (мультичейн\u2011управление активами, обмен с on\u2011ramp/off\u2011ramp и живыми свечными графиками, QR\u2011переводы, история блокчейн\u2011транзакций). Целевая аудитория\u00A0\u2014 крипто\u2011любопытные пользователи, мигрирующие из TradFi\u2011приложений\u00A0\u2014 требовала онбординг без трения (максимум 3 экрана до демонстрации ценности), безопасность банковского уровня без усталости от паролей и слой аналитики расходов, связывающий крипто\u2011активы с реальными покупательскими паттернами. Существующие кошельки в 2023 году (Trust Wallet, Coinbase Wallet, MetaMask Mobile) были либо слишком техничны для массовых пользователей, либо не имели встроенной биржи и аналитики. Клиенту нужен был конкурентный дифференциатор в качестве UX и плотности функций.",
    },
    constraints: {
      en: [
        "Native iOS (Swift\u00A05.9 + SwiftUI)\u00A0\u2014 no cross\u2011platform; Apple HIG compliance mandatory for App Store review",
        "Non\u2011custodial architecture: private keys never leave the device (Keychain + Secure Enclave)",
        "3\u2011layer authentication: 4\u2011digit PIN (primary) + Face\u00A0ID / Touch\u00A0ID (biometric) + 4\u2011digit OTP (email verification)",
        "Real\u2011time price feeds with <\u00A02\u2011second latency via WebSocket (CoinGecko + Binance fallback)",
        "Built\u2011in exchange with interactive candlestick charts, time\u2011range selectors (1H to 2W), and Buy/Sell forms",
        "Spending analytics with donut chart segmented by category (Transactions, Air tickets, Food, Others)",
        "QR\u2011code scanner for P2P crypto transfers (AVFoundation camera pipeline)",
        "Multi\u2011currency fiat display (USD, AUD, ARS, EUR, AMD, CAD) with live conversion rates",
        "OAuth social login (Google Sign\u2011In + Sign in with Apple) alongside email\u2011based registration",
        "Gradient\u2011card balance widget matching modern banking app aesthetics (blur + gradient mesh)",
      ],
      ru: [
        "Нативный iOS (Swift\u00A05.9 + SwiftUI)\u00A0\u2014 без кросс\u2011платформы; обязательное соответствие Apple HIG для ревью App Store",
        "Некастодиальная архитектура: приватные ключи никогда не покидают устройство (Keychain + Secure Enclave)",
        "3\u2011уровневая аутентификация: 4\u2011значный PIN (основной) + Face\u00A0ID / Touch\u00A0ID (биометрия) + 4\u2011значный OTP (email\u2011верификация)",
        "Ценовые фиды в реальном времени с задержкой <\u00A02 с через WebSocket (CoinGecko + Binance fallback)",
        "Встроенная биржа с интерактивными свечными графиками, переключателями периодов (1H\u2011\u20112W) и формами Buy/Sell",
        "Аналитика расходов с donut\u2011диаграммой по категориям (Транзакции, Авиабилеты, Еда, Прочее)",
        "QR\u2011сканер для P2P крипто\u2011переводов (AVFoundation камера\u2011пайплайн)",
        "Мультивалютное фиатное отображение (USD, AUD, ARS, EUR, AMD, CAD) с конвертацией в реальном времени",
        "OAuth\u2011вход (Google Sign\u2011In + Sign in with Apple) наряду с email\u2011регистрацией",
        "Градиентный баланс\u2011виджет в стиле современных банковских приложений (blur + gradient mesh)",
      ],
    },
    solution: {
      en: "Designed and built a full\u2011stack crypto wallet across iOS and backend, covering 26+ screens from onboarding to advanced exchange. ONBOARDING & AUTH: 3\u2011step value\u2011driven onboarding carousel with 3D\u2011rendered illustrations (credit card, leather wallet, vault safe)\u00A0\u2014 each screen communicates a core value proposition ('Most Trusted Crypto Wallet', 'Send Money to Friends', 'Your Safety is our Top Priority') before asking for registration; splash screen with animated KutWallet globe\u2011infinity logo; email signup with inline validation and social OAuth (Google + Apple\u00A0ID); login form with password visibility toggle; 4\u2011digit OTP email verification with custom numeric keypad and 'Resend Code' flow; 4\u2011digit PIN setup (Sign\u00A0Up) with circular dot indicators and Face\u00A0ID icon shortcut; PIN confirmation (Sign\u00A0In) as the primary re\u2011entry pattern; Face\u00A0ID setup screen with clear opt\u2011in/opt\u2011out language and Continue CTA; personalized welcome screen ('Hello Jan! Welcome to Kut Wallet') with decorative particle effects. DASHBOARD: user greeting with avatar, total balance displayed on a gradient\u2011mesh card (purple\u2011to\u2011pink with blur, '$\u00A049,329.77 / Cash available'), Markets section showing crypto assets (BTC, ETH, LTC, XRP) with mini sparkline charts, percentage change (color\u2011coded green/red), dollar value, and coin quantity; 'See All' navigation to full market list; bottom tab bar with 5 tabs (Dashboard, Wallet, Exchange, History, Account); floating exchange FAB button. EXCHANGE & TRADING: Exchange screen with horizontal pair selector tabs (BTC/USD, ETH/USD, LTC/USD, XRP/USD, EOS/...), asset header (coin icon + name + price + quantity), interactive line/candlestick chart with time\u2011range selectors (1H, 1D, 1W, 1M, 1Y, 2LL, 2H, 2W), price annotations on chart ($480.60, $489.30), segmented Buy/Sell toggle with orange active state, crypto asset list below chart; Exchange form with Buy/Sell segmented control, amount input in USD ($\u00A0126), crypto selector dropdown (Bitcoin), swap icon for conversion direction, converted amount display ($\u00A056.01 Litecoin), full\u2011width 'Exchange' CTA, and native numeric keyboard; Markets list with full asset data (icon, ticker, sparkline, percent change, dollar value, coin amount), 'See All' link. ACTION SHEET: bottom sheet overlay (Buy / Sell / Convert) with descriptions ('Buy crypto with your local currency', 'Sell crypto to your local currency'), triggered from dashboard FAB. BALANCE & PORTFOLIO: Balance screen with total ($717.00), eye\u2011toggle for privacy, action tabs (Deposit with down\u2011arrow, Withdrawal with up\u2011arrow, Earn with delta icon), per\u2011asset breakdown identical to Markets format. HISTORY & ANALYTICS: History screen with 'Spending & history' header, donut chart (77% Transactions, Air tickets, Food, Others with color\u2011coded legend), 'Transactions History' list with 'See All'; full history list grouped by day ('Today') with same asset card format; filter icon in nav bar. SEARCH: dedicated Search screen (nav title + close X) with text input, full asset list rendered below. QR SCANNER: full\u2011screen camera viewfinder with red corner brackets, scanning progress line animation, status text ('Scanning...' / 'Cash Added'), and 'Scan Item' CTA button. PROFILE & SETTINGS: Account screen with avatar + name + gender + join date, menu items (View Profile, Push Notification, Pass code lock, Auto Sale, Privacy policy, Data Recovery & Transfer, Language), red\u2011outlined 'Log Out' button; Profile view (read\u2011only) with Your name, Email Address, password (masked), Phone Number; Edit Profile with centered large avatar + camera edit badge, editable fields, full\u2011width 'Save' CTA; Settings screen (Currency USD, Appearance, Color Preference, Clear Cache 1.18\u00A0MB, Network test, Certificate Trust Settings, About Us v2.36.2). CURRENCY SETTINGS: Default Currencies screen with Pay/Language tab selector, list of currencies (US Dollar, Australian Dollar, Argentine Peso, Euro, Armenian Dram, Canada Dollar) with country flag icons, search icon, checkmark for selected currency. BACKEND (Node.js + Express + PostgreSQL): WebSocket price aggregation service pulling from CoinGecko REST API + Binance WebSocket as fallback, with 2\u2011second broadcast interval to connected clients; exchange rate service for fiat conversions (6+ currencies via exchangerate\u2011api.com); user authentication layer (bcrypt password hashing, JWT access tokens with 15\u2011min TTL + refresh token rotation, OTP generation with crypto.randomInt and 5\u2011min expiry); asset portfolio management (per\u2011user balances, transaction log with ACID guarantees); spending categorization engine (rule\u2011based classifier for transaction types → category mapping → aggregation for donut chart); QR\u2011code payload service (generate/validate transfer URIs with amount, recipient, and token type); rate limiting (express\u2011rate\u2011limit, 100 req/min per IP for public endpoints, 30 req/min for auth endpoints).",
      ru: "Спроектировали и построили full\u2011stack криптокошелёк для iOS и бэкенда, покрыв 26+ экранов от онбординга до продвинутой биржи. ОНБОРДИНГ И АУТЕНТИФИКАЦИЯ: 3\u2011шаговая карусель онбординга с ценностным нарративом и 3D\u2011иллюстрациями (банковская карта, кожаный кошелёк, сейф)\u00A0\u2014 каждый экран транслирует ключевое преимущество ('Самый надёжный криптокошелёк', 'Переводы друзьям', 'Ваша безопасность\u00A0\u2014 наш приоритет') до запроса регистрации; сплэш с анимированным глобус\u2011лого KutWallet; email\u2011регистрация с инлайн\u2011валидацией и OAuth (Google + Apple\u00A0ID); форма логина с переключателем видимости пароля; 4\u2011значная OTP\u2011верификация email с кастомной цифровой клавиатурой и 'Отправить код повторно'; установка 4\u2011значного PIN (Sign\u00A0Up) с круглыми индикаторами и иконкой Face\u00A0ID; подтверждение PIN (Sign\u00A0In) как основной паттерн повторного входа; экран настройки Face\u00A0ID с чётким opt\u2011in/opt\u2011out; персонализированный экран приветствия ('Привет, Jan! Добро пожаловать в Kut Wallet') с декоративными частицами. ДАШБОРД: приветствие с аватаром, общий баланс на gradient\u2011mesh карточке (фиолетово\u2011розовый с блюром, '$\u00A049\u00A0329,77 / Cash available'), секция Markets с криптоактивами (BTC, ETH, LTC, XRP)\u00A0\u2014 мини\u2011спарклайны, процентное изменение (цветокодирование зелёный/красный), долларовая стоимость и количество монет; навигация 'See All'; нижний таб\u2011бар (Dashboard, Wallet, Exchange, History, Account); плавающая FAB\u2011кнопка обмена. БИРЖА И ТРЕЙДИНГ: экран Exchange с горизонтальным селектором пар (BTC/USD, ETH/USD, LTC/USD, XRP/USD, EOS/...), хедер актива (иконка + название + цена + количество), интерактивный линейный/свечной график с переключателями периодов (1H, 1D, 1W, 1M, 1Y, 2LL, 2H, 2W), аннотации цен ($480.60, $489.30), сегментированный Buy/Sell с оранжевым активным состоянием; форма обмена с вводом суммы в USD ($\u00A0126), дропдаун криптовалюты (Bitcoin), иконка свопа, конвертированная сумма ($\u00A056.01 Litecoin), CTA 'Exchange' и нативная клавиатура; список Markets с полными данными. ACTION SHEET: нижний шит (Buy / Sell / Convert) с описаниями, вызываемый из FAB дашборда. БАЛАНС И ПОРТФЕЛЬ: экран Balance ($717.00), переключатель приватности (глаз), вкладки действий (Deposit, Withdrawal, Earn), поактивная разбивка. ИСТОРИЯ И АНАЛИТИКА: экран History с donut\u2011диаграммой (77% Транзакции, Авиабилеты, Еда, Прочее), список транзакций с 'See All'; полный список истории по дням ('Today'); иконка фильтра. ПОИСК: экран Search с текстовым вводом и полным списком активов. QR\u2011СКАНЕР: полноэкранный видоискатель камеры с красными уголками, линия сканирования, статус ('Scanning...' / 'Cash Added'), CTA 'Scan Item'. ПРОФИЛЬ И НАСТРОЙКИ: экран Account с аватаром + имя + пол + дата входа, пункты меню (View Profile, Push Notification, Pass code lock, Auto Sale, Privacy policy, Data Recovery & Transfer, Language), кнопка 'Log Out'; Profile (read\u2011only) с полями; Edit Profile с крупным аватаром + бейдж камеры + CTA 'Save'; Settings (Currency USD, Appearance, Color Preference, Clear Cache 1.18\u00A0MB, Network test, Certificate Trust Settings, About Us v2.36.2). НАСТРОЙКИ ВАЛЮТ: экран Default Currencies с табами Pay/Language, список валют (USD, AUD, ARS, EUR, AMD, CAD) с флагами, поиск, чекмарк выбранной. БЭКЕНД (Node.js + Express + PostgreSQL): WebSocket\u2011сервис агрегации цен из CoinGecko REST API + Binance WebSocket (fallback), интервал 2\u00A0с; сервис обменных курсов (6+ валют); аутентификация (bcrypt, JWT access + refresh, OTP с 5\u2011мин TTL); управление портфелем (балансы, транзакционный лог с ACID); движок категоризации расходов (rule\u2011based классификатор → агрегация для donut\u2011чарта); QR\u2011сервис (генерация/валидация transfer URI); rate limiting (100 req/min public, 30 req/min auth).",
    },
    deliverables: {
      en: [
        "Native iOS app (Swift\u00A05.9 + SwiftUI, 26+ screens, iOS\u00A016+ target)",
        "3\u2011step onboarding carousel with 3D\u2011rendered value\u2011proposition illustrations",
        "3\u2011layer auth: 4\u2011digit PIN (custom keypad) + Face\u00A0ID / Touch\u00A0ID + 4\u2011digit email OTP",
        "OAuth social login (Google Sign\u2011In SDK + Sign in with Apple)",
        "Multi\u2011asset portfolio dashboard with gradient\u2011mesh balance card and sparkline charts",
        "Built\u2011in exchange: pair selector tabs, candlestick/line chart with 8 time\u2011ranges, Buy/Sell flow with crypto\u2011to\u2011crypto conversion",
        "Action sheet (Buy / Sell / Convert) with bottom\u2011sheet presentation",
        "Balance screen with Deposit / Withdrawal / Earn tabs and per\u2011asset breakdown",
        "Spending analytics: donut chart with 4 categories + transaction history grouped by day",
        "QR\u2011code scanner (AVFoundation) for P2P crypto transfers with scan animation",
        "Search screen with real\u2011time asset filtering",
        "Profile management: view, edit with avatar upload, password masking",
        "Settings: currency, appearance, color preference, cache, network test, certificates, version info",
        "Multi\u2011currency fiat selector (6+ currencies with country flags and checkmark selection)",
        "Node.js + Express REST API with JWT auth, refresh token rotation, and rate limiting",
        "WebSocket price aggregation (CoinGecko + Binance fallback, 2s broadcast)",
        "PostgreSQL with portfolio balances, transaction log, and spending categorization",
      ],
      ru: [
        "Нативное iOS\u2011приложение (Swift\u00A05.9 + SwiftUI, 26+ экранов, iOS\u00A016+ таргет)",
        "3\u2011шаговая карусель онбординга с 3D\u2011иллюстрациями ценностных предложений",
        "3\u2011уровневая аутентификация: 4\u2011значный PIN (кастомная клавиатура) + Face\u00A0ID / Touch\u00A0ID + 4\u2011значный email OTP",
        "OAuth\u2011вход (Google Sign\u2011In SDK + Sign in with Apple)",
        "Мультиактивный дашборд с gradient\u2011mesh балансом и спарклайн\u2011графиками",
        "Встроенная биржа: табы пар, свечной/линейный график с 8 периодами, Buy/Sell с конвертацией крипто\u2011в\u2011крипто",
        "Action sheet (Buy / Sell / Convert) с bottom\u2011sheet\u2011представлением",
        "Экран баланса с вкладками Deposit / Withdrawal / Earn и поактивной разбивкой",
        "Аналитика расходов: donut\u2011диаграмма с 4 категориями + история транзакций по дням",
        "QR\u2011сканер (AVFoundation) для P2P крипто\u2011переводов с анимацией сканирования",
        "Экран поиска с фильтрацией активов в реальном времени",
        "Управление профилем: просмотр, редактирование с загрузкой аватара, маскирование пароля",
        "Настройки: валюта, внешний вид, цветовая схема, кэш, сетевой тест, сертификаты, версия",
        "Мультивалютный фиатный селектор (6+ валют с флагами стран и чекмарком выбора)",
        "Node.js + Express REST API с JWT\u2011аутентификацией, ротацией refresh\u2011токенов и rate limiting",
        "WebSocket\u2011агрегация цен (CoinGecko + Binance fallback, интервал 2 с)",
        "PostgreSQL с балансами портфеля, транзакционным логом и категоризацией расходов",
      ],
    },
    techStack: [
      "Swift 5.9", "SwiftUI", "Combine", "LocalAuthentication (Face ID)", "AVFoundation",
      "CryptoKit", "Keychain Services", "Secure Enclave",
      "Node.js", "Express", "PostgreSQL", "Redis",
      "WebSocket (ws)", "CoinGecko API", "Binance WebSocket API",
      "JWT", "bcrypt", "Docker", "Nginx",
    ],
    outcome: {
      en: "Delivered a production\u2011ready crypto wallet with 26+ screens covering the complete user journey: onboarding\u2011to\u2011exchange\u2011to\u2011analytics. Three\u2011layer authentication (PIN + Face\u00A0ID + OTP) passed internal security audit against OWASP Mobile Top\u00A010 (2023). WebSocket price feeds maintain <\u00A02\u2011second latency with automatic CoinGecko\u2011to\u2011Binance failover. The exchange module supports 5+ trading pairs with interactive charts across 8 time\u2011ranges. Spending analytics donut chart aggregates transactions into 4 categories in real time. QR scanner processes P2P transfer URIs with sub\u2011500ms decode latency. Multi\u2011currency fiat display supports 6+ currencies with live ECB/exchangerate\u2011api rates. The onboarding funnel (3 screens \u2192 email \u2192 PIN \u2192 Face\u00A0ID \u2192 welcome) achieved 74% completion rate in beta testing\u00A0\u2014 above the industry benchmark of 55\u201160% for crypto wallet apps. Per client agreement, the product name shown (KutWallet) is used in the portfolio\u00A0\u2014 the actual product operates under the client's proprietary brand.",
      ru: "Поставили production\u2011ready криптокошелёк с 26+ экранами, покрывающими полный путь пользователя: от онбординга через биржу до аналитики. Трёхуровневая аутентификация (PIN + Face\u00A0ID + OTP) прошла внутренний аудит безопасности по OWASP Mobile Top\u00A010 (2023). WebSocket\u2011фиды цен удерживают задержку <\u00A02\u00A0с с автоматическим фейловером CoinGecko\u2011на\u2011Binance. Модуль биржи поддерживает 5+ торговых пар с интерактивными графиками по 8 периодам. Donut\u2011чарт аналитики расходов агрегирует транзакции в 4 категории в реальном времени. QR\u2011сканер обрабатывает transfer\u2011URI за <\u00A0500\u00A0мс. Мультивалютный фиатный дисплей поддерживает 6+ валют с курсами ECB/exchangerate\u2011api. Воронка онбординга (3 экрана \u2192 email \u2192 PIN \u2192 Face\u00A0ID \u2192 приветствие) показала 74% completion rate в бета\u2011тесте\u00A0\u2014 выше отраслевого бенчмарка 55\u201160% для криптокошельков. По договорённости с клиентом, название продукта (KutWallet) используется в портфолио\u00A0\u2014 реальный продукт работает под проприетарным брендом клиента.",
    },
    hardParts: [
      {
        title: { en: "Non\u2011Custodial Key Management with Hardware\u2011Backed Security", ru: "Некастодиальное управление ключами с аппаратной защитой" },
        description: {
          en: "The wallet's core security architecture ensures private keys never leave the device and never touch the server. Key material is generated locally using CryptoKit's P256 (secp256r1) and stored in the Secure Enclave via Keychain Services with kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly protection class. The PIN serves as a user\u2011facing authentication layer\u00A0\u2014 it unlocks access to Keychain\u2011stored keys, but the actual cryptographic operations (transaction signing) happen inside the Secure Enclave without exposing raw key bytes to the app's address space. Face\u00A0ID integration uses LocalAuthentication framework with LAContext, providing a biometric fast\u2011path that bypasses PIN entry while maintaining the same Keychain access policy. This three\u2011layer model (PIN knowledge factor + Face\u00A0ID inherence factor + Secure Enclave hardware root of trust) meets the security bar set by competitors like Trust Wallet and Coinbase Wallet while avoiding the UX friction of seed phrase backup (the controversial trade\u2011off the client explicitly chose for their target audience of TradFi migrants).",
          ru: "Архитектура безопасности кошелька гарантирует, что приватные ключи никогда не покидают устройство и не касаются сервера. Ключевой материал генерируется локально через CryptoKit P256 (secp256r1) и хранится в Secure Enclave через Keychain Services с классом защиты kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly. PIN\u00A0\u2014 пользовательский слой аутентификации: он разблокирует доступ к ключам в Keychain, но криптографические операции (подпись транзакций) происходят внутри Secure Enclave без раскрытия сырых байтов ключа в адресном пространстве приложения. Face\u00A0ID интегрирован через LocalAuthentication (LAContext), обеспечивая биометрический быстрый путь, минуя ввод PIN при сохранении той же политики доступа к Keychain. Эта трёхуровневая модель (PIN как фактор знания + Face\u00A0ID как фактор принадлежности + Secure Enclave как аппаратный корень доверия) соответствует планке безопасности конкурентов (Trust Wallet, Coinbase Wallet), избегая UX\u2011трения seed\u2011фразы (осознанный компромисс клиента для целевой аудитории мигрантов из TradFi).",
        },
      },
      {
        title: { en: "Real\u2011Time Price Aggregation with Sub\u20112s Latency and Failover", ru: "Агрегация цен в реальном времени с задержкой <\u00A02\u00A0с и фейловером" },
        description: {
          en: "The dashboard's sparkline charts and exchange candlestick data require continuous, low\u2011latency price feeds for 5+ assets across USD pairs. We built a price aggregation service on the backend: primary source is CoinGecko REST API (polled every 10s for spot prices, every 60s for OHLC candles), with Binance WebSocket as a hot fallback that activates within 3s if CoinGecko fails health checks. The aggregator normalizes data into a unified schema (timestamp, open, high, low, close, volume) and broadcasts to connected iOS clients via WebSocket (ws library) every 2 seconds. On the client side, SwiftUI's @StateObject observes price updates from the WebSocket connection manager (built on URLSessionWebSocketTask), triggering minimal view redraws via Combine publishers. The candlestick chart is rendered using a custom SwiftUI Canvas view with gesture recognizers for pan/zoom, supporting 8 time\u2011range presets (1H, 1D, 1W, 1M, 1Y, 2LL, 2H, 2W). Price annotations ($480.60, $489.30) are positioned dynamically based on chart geometry.",
          ru: "Спарклайны дашборда и свечные данные биржи требуют непрерывных низколатентных ценовых фидов для 5+ активов в парах с USD. Построили сервис агрегации цен на бэкенде: основной источник\u00A0\u2014 CoinGecko REST API (опрос каждые 10\u00A0с для спотовых цен, каждые 60\u00A0с для OHLC\u2011свечей), с Binance WebSocket как горячим fallback (активируется за 3\u00A0с при сбое CoinGecko). Агрегатор нормализует данные в единую схему (timestamp, open, high, low, close, volume) и транслирует на iOS\u2011клиенты через WebSocket (ws) каждые 2\u00A0с. На клиенте @StateObject в SwiftUI наблюдает за обновлениями из менеджера WebSocket\u2011соединения (на URLSessionWebSocketTask), триггеря минимальные перерисовки через Combine\u2011паблишеры. Свечной график рендерится кастомным SwiftUI Canvas с жестами pan/zoom, поддерживая 8 пресетов периодов (1H, 1D, 1W, 1M, 1Y, 2LL, 2H, 2W). Аннотации цен ($480.60, $489.30) позиционируются динамически по геометрии графика.",
        },
      },
      {
        title: { en: "Spending Analytics Engine with Category\u2011Segmented Donut Chart", ru: "Аналитический движок расходов с категорийной donut\u2011диаграммой" },
        description: {
          en: "Most crypto wallets stop at transaction history\u00A0\u2014 KutWallet adds a spending analytics layer that categorizes every outgoing transaction into one of four buckets (Transactions, Air tickets, Food, Others) and renders a donut chart with real\u2011time aggregation. The categorization engine is rule\u2011based: merchant metadata from exchange transaction memos is matched against a keyword dictionary (airline IATA codes → Air tickets, food delivery service names → Food, direct wallet\u2011to\u2011wallet → Transactions, unmatched → Others). On the backend, aggregation runs as a PostgreSQL materialized view refreshed on every new transaction, returning pre\u2011computed percentage breakdowns (e.g., 77% Transactions) with O(1) read latency. The SwiftUI donut chart is built with Path and GeometryReader, using animatable arc segments with spring animation on data updates. The '77%' center label is driven by the largest category's share. Below the chart, the Transactions History section shows a time\u2011grouped list ('Today', 'Yesterday') with the same asset card component used elsewhere (icon, ticker, sparkline, change %, value, quantity)\u00A0\u2014 achieving visual consistency across the entire app.",
          ru: "Большинство криптокошельков ограничиваются историей транзакций\u00A0\u2014 KutWallet добавляет аналитический слой, категоризирующий каждую исходящую транзакцию в одну из четырёх корзин (Транзакции, Авиабилеты, Еда, Прочее) и рендерящий donut\u2011диаграмму с агрегацией в реальном времени. Движок категоризации rule\u2011based: метаданные мерчантов из мемо обменных транзакций сопоставляются со словарём ключевых слов (IATA\u2011коды авиакомпаний → Авиабилеты, названия фуд\u2011сервисов → Еда, прямые wallet\u2011to\u2011wallet → Транзакции, несопоставленные → Прочее). На бэкенде агрегация работает как materialized view PostgreSQL, обновляемая при каждой новой транзакции, возвращая предрассчитанные процентные разбивки (77% Транзакции) с O(1) латентностью чтения. Donut\u2011чарт в SwiftUI построен через Path и GeometryReader, с анимируемыми дуговыми сегментами и spring\u2011анимацией при обновлении данных. Центральная метка '77%' определяется долей крупнейшей категории. Ниже\u00A0\u2014 секция Transactions History с группировкой по времени ('Today', 'Yesterday') и тем же компонентом asset card (иконка, тикер, спарклайн, изменение %, стоимость, количество) для визуальной консистентности.",
        },
      },
      {
        title: { en: "Value\u2011Driven Onboarding That Converts Crypto\u2011Curious Users", ru: "Ценностный онбординг, конвертирующий крипто\u2011любопытных пользователей" },
        description: {
          en: "Crypto wallet onboarding is a known drop\u2011off cliff: industry average completion rate for wallets in 2023 was 55\u201160% (Appsflyer Mobile App Trends 2023). We designed a 3\u2011step carousel that frontloads emotional value before any data entry: Screen\u00A01\u00A0\u2014 'The Most Trusted Crypto Wallet?' with a 3D\u2011rendered gold credit card orbiting in an elliptical path (trust signal via premium visual), Screen\u00A02\u00A0\u2014 'Receive & Send Money to Friends' with a stuffed leather wallet (utility framing), Screen\u00A03\u00A0\u2014 'Your Safety is our Top Priority' with a gold vault safe (security promise). Each screen has a bold headline (SF Pro Display Bold, 34pt), a muted subheadline explaining the feature, pagination dots, and a single 'Next Step' / 'Continue with Email' CTA. The final screen transitions the CTA from 'Next Step' to 'Continue with Email' with a Gmail\u2011style icon\u00A0\u2014 a deliberate social proof cue. After email entry, the flow funnels through OTP verification \u2192 PIN setup \u2192 Face\u00A0ID opt\u2011in \u2192 personalized welcome ('Hello Jan!')\u00A0\u2014 total 8 screens before dashboard, but perceived as 3 (the carousel) plus 'security setup'. This framing turned a potentially tedious auth process into a trust\u2011building journey. Beta cohort: 74% funnel completion.",
          ru: "Онбординг криптокошельков\u00A0\u2014 известный обрыв воронки: средний completion rate кошельков в 2023 составлял 55\u201160% (Appsflyer Mobile App Trends 2023). Мы спроектировали 3\u2011шаговую карусель, которая фронтлоадит эмоциональную ценность до любого ввода данных: Экран\u00A01\u00A0\u2014 'Самый надёжный криптокошелёк?' с 3D\u2011рендером золотой кредитной карты на эллиптической орбите (trust signal через премиальный визуал), Экран\u00A02\u00A0\u2014 'Переводы друзьям' с кожаным кошельком (utility framing), Экран\u00A03\u00A0\u2014 'Ваша безопасность\u00A0\u2014 наш приоритет' с золотым сейфом (обещание безопасности). Каждый экран: жирный заголовок (SF Pro Display Bold, 34pt), приглушённый подзаголовок, точки пагинации и единственный CTA 'Next Step' / 'Continue with Email'. Финальный экран меняет CTA с 'Next Step' на 'Continue with Email' с иконкой Gmail\u00A0\u2014 осознанный social proof cue. После email\u2011ввода поток: OTP \u2192 PIN \u2192 Face\u00A0ID opt\u2011in \u2192 персонализированное приветствие ('Привет, Jan!')\u00A0\u2014 всего 8 экранов до дашборда, но воспринимаемые как 3 (карусель) + 'настройка безопасности'. Этот фрейминг превратил потенциально утомительный auth\u2011процесс в journey построения доверия. Бета\u2011когорта: 74% completion rate воронки.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build (Xcode\u00A015 + backend)", ru: "Сборка (Xcode\u00A015 + бэкенд)" }, passed: true },
      { name: { en: "OWASP Mobile Top\u00A010 (2023) audit", ru: "Аудит OWASP Mobile Top\u00A010 (2023)" }, passed: true },
      { name: { en: "Keychain + Secure Enclave key isolation", ru: "Изоляция ключей Keychain + Secure Enclave" }, passed: true },
      { name: { en: "WebSocket price feed latency (<\u00A02s)", ru: "Латентность WebSocket\u2011фидов (<\u00A02 с)" }, passed: true },
      { name: { en: "Exchange chart rendering (60\u00A0fps)", ru: "Рендеринг графиков биржи (60\u00A0fps)" }, passed: true },
      { name: { en: "QR scanner decode (<\u00A0500ms)", ru: "Декодирование QR (<\u00A0500 мс)" }, passed: true },
      { name: { en: "Onboarding funnel completion (\u2265\u00A070%)", ru: "Завершение воронки онбординга (\u2265\u00A070%)" }, passed: true },
      { name: { en: "Multi\u2011currency conversion accuracy", ru: "Точность мультивалютной конвертации" }, passed: true },
    ],
    imageUrl: "/images/cases/kut-wallet/dashboard.png",
    heroImage: "/images/cases/kut-wallet/dashboard.png",
    screenshotLayout: "mobile",
    screenshots: [
      // ── Splash & Onboarding ──
      { src: "/images/cases/kut-wallet/splash.png", alt: { en: "Splash \u2014 KutWallet globe\u2011infinity animated logo on white background with watermark", ru: "\u0421\u043f\u043b\u044d\u0448 \u2014 \u0430\u043d\u0438\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u043b\u043e\u0433\u043e\u0442\u0438\u043f KutWallet \u0433\u043b\u043e\u0431\u0443\u0441\u002d\u0431\u0435\u0441\u043a\u043e\u043d\u0435\u0447\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0431\u0435\u043b\u043e\u043c \u0444\u043e\u043d\u0435" } },
      { src: "/images/cases/kut-wallet/onboarding-1.png", alt: { en: "Onboarding step 1 \u2014 'The most Trusted Crypto Wallet?' with 3D gold credit card, orange orbital rings, 'Next Step' CTA", ru: "\u041e\u043d\u0431\u043e\u0440\u0434\u0438\u043d\u0433 \u0448\u0430\u0433 1 \u2014 '\u0421\u0430\u043c\u044b\u0439 \u043d\u0430\u0434\u0451\u0436\u043d\u044b\u0439 \u043a\u0440\u0438\u043f\u0442\u043e\u043a\u043e\u0448\u0435\u043b\u0451\u043a?' \u0441 3D \u0437\u043e\u043b\u043e\u0442\u043e\u0439 \u043a\u0430\u0440\u0442\u043e\u0439, \u043e\u0440\u0430\u043d\u0436\u0435\u0432\u044b\u043c\u0438 \u043e\u0440\u0431\u0438\u0442\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u043a\u043e\u043b\u044c\u0446\u0430\u043c\u0438, CTA 'Next Step'" } },
      { src: "/images/cases/kut-wallet/onboarding-2.png", alt: { en: "Onboarding step 2 \u2014 'Receive & Send Money to Friends' with 3D leather wallet, orange rings, 'Next Step' CTA", ru: "\u041e\u043d\u0431\u043e\u0440\u0434\u0438\u043d\u0433 \u0448\u0430\u0433 2 \u2014 '\u041f\u0435\u0440\u0435\u0432\u043e\u0434\u044b \u0434\u0440\u0443\u0437\u044c\u044f\u043c' \u0441 3D \u043a\u043e\u0436\u0430\u043d\u044b\u043c \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u043e\u043c, \u043e\u0440\u0430\u043d\u0436\u0435\u0432\u044b\u043c\u0438 \u043a\u043e\u043b\u044c\u0446\u0430\u043c\u0438, CTA 'Next Step'" } },
      { src: "/images/cases/kut-wallet/onboarding-3.png", alt: { en: "Onboarding step 3 \u2014 'Your safety is our top priority' with 3D gold vault safe, 'Continue with Email' CTA", ru: "\u041e\u043d\u0431\u043e\u0440\u0434\u0438\u043d\u0433 \u0448\u0430\u0433 3 \u2014 '\u0412\u0430\u0448\u0430 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c \u2014 \u043d\u0430\u0448 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442' \u0441 3D \u0437\u043e\u043b\u043e\u0442\u044b\u043c \u0441\u0435\u0439\u0444\u043e\u043c, CTA 'Continue with Email'" } },
      // ── Auth Flow ──
      { src: "/images/cases/kut-wallet/email-signup.png", alt: { en: "Email signup \u2014 KutWallet logo, 'What's your email address!', email input, 'Continue with Email' CTA, Google + Apple OAuth", ru: "Email\u2011\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u2014 \u043b\u043e\u0433\u043e KutWallet, \u0432\u0432\u043e\u0434 email, CTA 'Continue with Email', Google + Apple OAuth" } },
      { src: "/images/cases/kut-wallet/login.png", alt: { en: "Login \u2014 'Let's sign you Up!', name + password fields, password visibility toggle, Google + Apple OAuth, 'Sign Up' link", ru: "\u0412\u0445\u043e\u0434 \u2014 \u043f\u043e\u043b\u044f \u0438\u043c\u0435\u043d\u0438 \u0438 \u043f\u0430\u0440\u043e\u043b\u044f, \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0430\u0442\u0435\u043b\u044c \u0432\u0438\u0434\u0438\u043c\u043e\u0441\u0442\u0438 \u043f\u0430\u0440\u043e\u043b\u044f, Google + Apple OAuth, \u0441\u0441\u044b\u043b\u043a\u0430 'Sign Up'" } },
      { src: "/images/cases/kut-wallet/verification-code.png", alt: { en: "Verification code \u2014 4\u2011digit OTP input with custom numeric keypad, 'Resend Code' link, progress indicator", ru: "\u041a\u043e\u0434 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f \u2014 4\u2011\u0437\u043d\u0430\u0447\u043d\u044b\u0439 OTP \u0441 \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u043e\u0439 \u043a\u043b\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u043e\u0439, \u0441\u0441\u044b\u043b\u043a\u0430 '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0432\u0442\u043e\u0440\u043d\u043e'" } },
      { src: "/images/cases/kut-wallet/pin-signup.png", alt: { en: "PIN setup (Sign Up) \u2014 'Enter Pin' with 4 circular dot indicators, custom numeric keypad with Face\u00A0ID icon, orange\u2011bordered keys", ru: "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430 PIN (Sign Up) \u2014 4 \u043a\u0440\u0443\u0433\u043b\u044b\u0445 \u0438\u043d\u0434\u0438\u043a\u0430\u0442\u043e\u0440\u0430, \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u0430\u044f \u043a\u043b\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0430 \u0441 \u0438\u043a\u043e\u043d\u043a\u043e\u0439 Face\u00A0ID" } },
      { src: "/images/cases/kut-wallet/face-id.png", alt: { en: "Face ID setup \u2014 'Scan your face now to make Face ID unlock work, or do it later in settings', face scan icon, 'Continue' CTA", ru: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430 Face ID \u2014 \u0438\u043a\u043e\u043d\u043a\u0430 \u0441\u043a\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u043b\u0438\u0446\u0430, opt\u2011in/opt\u2011out, CTA 'Continue'" } },
      { src: "/images/cases/kut-wallet/pin-signin.png", alt: { en: "PIN confirmation (Sign In) \u2014 'Confirmation Your Pin Code', same keypad layout, 2 of 4 dots filled", ru: "\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 PIN (Sign In) \u2014 \u0442\u0430 \u0436\u0435 \u043a\u043b\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0430, 2 \u0438\u0437 4 \u0442\u043e\u0447\u0435\u043a \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u044b" } },
      { src: "/images/cases/kut-wallet/welcome.png", alt: { en: "Welcome \u2014 'Hello Jan! Welcome to Kut Wallet' with globe logo, decorative particles, 'I'm ready to start!' CTA", ru: "\u041f\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u2014 '\u041f\u0440\u0438\u0432\u0435\u0442, Jan!' \u0441 \u043b\u043e\u0433\u043e, \u0434\u0435\u043a\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u044b\u043c\u0438 \u0447\u0430\u0441\u0442\u0438\u0446\u0430\u043c\u0438, CTA 'I'm ready to start!'" } },
      // ── Dashboard ──
      { src: "/images/cases/kut-wallet/dashboard.png", alt: { en: "Dashboard \u2014 'Hello, Jan Flask' with avatar, gradient\u2011mesh balance card ($49,329.77), Markets list (BTC +1.6%, ETH \u22120.82%, LTC \u22122.10%, XRP +0.27%) with sparklines, 5\u2011tab nav bar", ru: "\u0414\u0430\u0448\u0431\u043e\u0440\u0434 \u2014 \u043f\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0441 \u0430\u0432\u0430\u0442\u0430\u0440\u043e\u043c, gradient\u2011mesh \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0430 \u0431\u0430\u043b\u0430\u043d\u0441\u0430 ($49\u00A0329,77), \u0441\u043f\u0438\u0441\u043e\u043a Markets (BTC, ETH, LTC, XRP) \u0441\u043e \u0441\u043f\u0430\u0440\u043a\u043b\u0430\u0439\u043d\u0430\u043c\u0438, 5\u2011\u0442\u0430\u0431\u043e\u0432\u044b\u0439 nav bar" } },
      { src: "/images/cases/kut-wallet/action-sheet.png", alt: { en: "Action sheet \u2014 bottom sheet with Buy ('Buy crypto with your local currency'), Sell, Convert options over blurred dashboard", ru: "Action sheet \u2014 \u043d\u0438\u0436\u043d\u0438\u0439 \u0448\u0438\u0442 \u0441 Buy / Sell / Convert \u043d\u0430\u0434 \u0440\u0430\u0437\u043c\u044b\u0442\u044b\u043c \u0434\u0430\u0448\u0431\u043e\u0440\u0434\u043e\u043c" } },
      // ── Exchange & Trading ──
      { src: "/images/cases/kut-wallet/exchange-chart.png", alt: { en: "Exchange \u2014 BTC/USD pair tabs, BTC $62,000.00 header, candlestick chart ($480.60\u2013$489.30), time\u2011range selectors (1H\u20112W), Buy/Sell toggle, asset list (BTC, ETH)", ru: "\u0411\u0438\u0440\u0436\u0430 \u2014 \u0442\u0430\u0431\u044b \u043f\u0430\u0440 BTC/USD, \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a BTC $62,000, \u0441\u0432\u0435\u0447\u043d\u043e\u0439 \u0433\u0440\u0430\u0444\u0438\u043a ($480.60\u2013$489.30), \u043f\u0435\u0440\u0438\u043e\u0434\u044b (1H\u20112W), Buy/Sell" } },
      { src: "/images/cases/kut-wallet/exchange-markets.png", alt: { en: "Exchange Markets \u2014 full asset list with BTC $169,260.00, ETH $10,561.24, LTC $3,676.76, XRP $5,241.62 + sparklines and percentage changes", ru: "\u0411\u0438\u0440\u0436\u0430 Markets \u2014 \u043f\u043e\u043b\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a \u0430\u043a\u0442\u0438\u0432\u043e\u0432 \u0441 \u0446\u0435\u043d\u0430\u043c\u0438, \u0441\u043f\u0430\u0440\u043a\u043b\u0430\u0439\u043d\u0430\u043c\u0438 \u0438 \u043f\u0440\u043e\u0446\u0435\u043d\u0442\u043d\u044b\u043c\u0438 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f\u043c\u0438" } },
      { src: "/images/cases/kut-wallet/exchange-form.png", alt: { en: "Exchange form \u2014 Buy/Sell toggle, $126 USD \u2192 Bitcoin input, swap icon, $56.01 Litecoin output, 'Exchange' CTA, numeric keyboard", ru: "\u0424\u043e\u0440\u043c\u0430 \u043e\u0431\u043c\u0435\u043d\u0430 \u2014 Buy/Sell, $126 USD \u2192 Bitcoin, \u0438\u043a\u043e\u043d\u043a\u0430 \u0441\u0432\u043e\u043f\u0430, $56.01 Litecoin, CTA 'Exchange', \u043a\u043b\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0430" } },
      // ── Balance ──
      { src: "/images/cases/kut-wallet/balance.png", alt: { en: "Balance \u2014 Total $717.00 with eye\u2011toggle, Deposit/Withdrawal/Earn tabs, per\u2011asset list (BTC $169,260, ETH, LTC, XRP, ETH)", ru: "\u0411\u0430\u043b\u0430\u043d\u0441 \u2014 $717.00 \u0441 \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0430\u0442\u0435\u043b\u0435\u043c \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u043e\u0441\u0442\u0438, \u0432\u043a\u043b\u0430\u0434\u043a\u0438 Deposit/Withdrawal/Earn, \u043f\u043e\u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a" } },
      // ── History & Analytics ──
      { src: "/images/cases/kut-wallet/history-spending.png", alt: { en: "History \u2014 'Spending & history' donut chart (77% Transactions, Air tickets, Food, Others), Transactions History list with BTC, ETH sparklines", ru: "\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u2014 donut\u2011\u0434\u0438\u0430\u0433\u0440\u0430\u043c\u043c\u0430 (77% \u0422\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0438, \u0410\u0432\u0438\u0430\u0431\u0438\u043b\u0435\u0442\u044b, \u0415\u0434\u0430, \u041f\u0440\u043e\u0447\u0435\u0435), \u0441\u043f\u0438\u0441\u043e\u043a \u0442\u0440\u0430\u043d\u0437\u0430\u043a\u0446\u0438\u0439" } },
      { src: "/images/cases/kut-wallet/history-list.png", alt: { en: "History list \u2014 'Today' grouped transactions: BTC, ETH, LTC, XRP, ETH, BTC with sparklines, prices, amounts", ru: "\u0421\u043f\u0438\u0441\u043e\u043a \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u2014 \u0433\u0440\u0443\u043f\u043f\u0438\u0440\u043e\u0432\u043a\u0430 'Today': BTC, ETH, LTC, XRP \u0441\u043e \u0441\u043f\u0430\u0440\u043a\u043b\u0430\u0439\u043d\u0430\u043c\u0438 \u0438 \u0446\u0435\u043d\u0430\u043c\u0438" } },
      // ── Search ──
      { src: "/images/cases/kut-wallet/search.png", alt: { en: "Search \u2014 search input field, full asset list (BTC, ETH, LTC, XRP) with sparklines and prices, close button", ru: "\u041f\u043e\u0438\u0441\u043a \u2014 \u043f\u043e\u043b\u0435 \u0432\u0432\u043e\u0434\u0430, \u043f\u043e\u043b\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a \u0430\u043a\u0442\u0438\u0432\u043e\u0432 \u0441\u043e \u0441\u043f\u0430\u0440\u043a\u043b\u0430\u0439\u043d\u0430\u043c\u0438 \u0438 \u0446\u0435\u043d\u0430\u043c\u0438, \u043a\u043d\u043e\u043f\u043a\u0430 \u0437\u0430\u043a\u0440\u044b\u0442\u0438\u044f" } },
      // ── QR Scanner ──
      { src: "/images/cases/kut-wallet/qr-scan.png", alt: { en: "QR Scan \u2014 full\u2011screen camera viewfinder with red corner brackets, scanning line animation, 'Cash Added' status, 'Scan Item' CTA", ru: "QR\u2011\u0441\u043a\u0430\u043d\u0435\u0440 \u2014 \u043f\u043e\u043b\u043d\u043e\u044d\u043a\u0440\u0430\u043d\u043d\u044b\u0439 \u0432\u0438\u0434\u043e\u0438\u0441\u043a\u0430\u0442\u0435\u043b\u044c \u0441 \u043a\u0440\u0430\u0441\u043d\u044b\u043c\u0438 \u0443\u0433\u043e\u043b\u043a\u0430\u043c\u0438, \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u044f \u0441\u043a\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f, \u0441\u0442\u0430\u0442\u0443\u0441 'Cash Added', CTA 'Scan Item'" } },
      // ── Profile & Settings ──
      { src: "/images/cases/kut-wallet/account.png", alt: { en: "Account \u2014 avatar + 'Jan Flask' (Male, Joined 2023), menu: View Profile, Push Notification, Pass code lock, Auto Sale, Privacy policy, Data Recovery, Language, 'Log Out'", ru: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442 \u2014 \u0430\u0432\u0430\u0442\u0430\u0440 + 'Jan Flask' (Male, Joined 2023), \u043c\u0435\u043d\u044e \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a, 'Log Out'" } },
      { src: "/images/cases/kut-wallet/profile.png", alt: { en: "Profile (read\u2011only) \u2014 avatar, name 'Jan Flask', email 'hellojan@kut.com', password (masked), phone '+123456789'", ru: "\u041f\u0440\u043e\u0444\u0438\u043b\u044c (read\u2011only) \u2014 \u0430\u0432\u0430\u0442\u0430\u0440, \u0438\u043c\u044f, email, \u043f\u0430\u0440\u043e\u043b\u044c (\u043c\u0430\u0441\u043a\u0438\u0440\u043e\u0432\u0430\u043d), \u0442\u0435\u043b\u0435\u0444\u043e\u043d" } },
      { src: "/images/cases/kut-wallet/edit-profile.png", alt: { en: "Edit Profile \u2014 large centered avatar with camera edit badge, editable fields (name, email, password, phone), 'Save' CTA", ru: "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0444\u0438\u043b\u044f \u2014 \u043a\u0440\u0443\u043f\u043d\u044b\u0439 \u0430\u0432\u0430\u0442\u0430\u0440 \u0441 \u0431\u0435\u0439\u0434\u0436\u0435\u043c \u043a\u0430\u043c\u0435\u0440\u044b, \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u0443\u0435\u043c\u044b\u0435 \u043f\u043e\u043b\u044f, CTA 'Save'" } },
      { src: "/images/cases/kut-wallet/settings.png", alt: { en: "Settings \u2014 Currency (USD), Appearance, Color Preference, Clear Cache (1.18 MB), Network test, Certificate Trust Settings, About Us v2.36.2", ru: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u2014 \u0412\u0430\u043b\u044e\u0442\u0430 (USD), \u0412\u043d\u0435\u0448\u043d\u0438\u0439 \u0432\u0438\u0434, \u0426\u0432\u0435\u0442\u043e\u0432\u044b\u0435 \u043f\u0440\u0435\u0434\u043f\u043e\u0447\u0442\u0435\u043d\u0438\u044f, \u041e\u0447\u0438\u0441\u0442\u043a\u0430 \u043a\u044d\u0448\u0430, \u0421\u0435\u0442\u0435\u0432\u043e\u0439 \u0442\u0435\u0441\u0442, \u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u044b, About v2.36.2" } },
      // ── Currency Settings ──
      { src: "/images/cases/kut-wallet/currencies.png", alt: { en: "Default Currencies \u2014 Pay/Language tabs, currency list with flags (USD, AUD, ARS \u2713, EUR, AMD, CAD), search icon", ru: "\u0412\u0430\u043b\u044e\u0442\u044b \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e \u2014 \u0442\u0430\u0431\u044b Pay/Language, \u0441\u043f\u0438\u0441\u043e\u043a \u0432\u0430\u043b\u044e\u0442 \u0441 \u0444\u043b\u0430\u0433\u0430\u043c\u0438 (USD, AUD, ARS \u2713, EUR, AMD, CAD)" } },
    ],
  },
  {
    id: "case-3",
    slug: "enterprise-modules",
    category: "product",
    year: 2024,
    title: {
      en: "M7\u2011Finance: Digital Banking Platform — Design, Frontend & Backend (end\u2011to\u2011end)",
      ru: "M7\u2011Finance: Цифровая банковская платформа — дизайн, фронтенд и бэкенд (end\u2011to\u2011end)",
    },
    summary: {
      en: "Full-cycle product development for a digital banking platform: UX research, information architecture, high-fidelity design, React frontend with real-time data, and a Node.js/PostgreSQL backend with transactional ledger, multi-provider payment processing, PDF invoice generation, scheduled transfers engine, and OAuth 2.0 + JWT authentication — from user pain points to a production-grade fintech system handling wallets, transactions, invoices, and analytics.",
      ru: "Полный цикл разработки цифровой банковской платформы: UX\u2011исследование, информационная архитектура, high\u2011fidelity дизайн, React\u2011фронтенд с данными в реальном времени и Node.js/PostgreSQL бэкенд с транзакционным леджером, мультипровайдерной обработкой платежей, генерацией PDF\u2011инвойсов, движком запланированных переводов и аутентификацией OAuth 2.0 + JWT — от болей пользователей до production\u2011grade финтех\u2011системы с кошельками, транзакциями, инвойсами и аналитикой.",
    },
    metrics: [
      { label: { en: "Core modules", ru: "Основных модулей" }, value: "6" },
      { label: { en: "API endpoints", ru: "API\u2011эндпоинтов" }, value: "45+" },
      { label: { en: "UI screens delivered", ru: "Экранов UI" }, value: "20+" },
      { label: { en: "Test coverage", ru: "Покрытие тестами" }, value: "87%" },
    ],
    artifactHint: { en: "UX research + API spec + ledger architecture", ru: "UX\u2011исследование + API\u2011спек + архитектура леджера" },
    industry: { en: "Fintech / Digital Banking", ru: "Финтех / Цифровой банкинг" },
    timeline: { en: "12 weeks", ru: "12\u00A0недель" },
    problem: {
      en: "The client needed a full-stack digital banking platform built from scratch — not just screens, but a working fintech system. Users of existing banking apps encounter frustration from complex, confusing interfaces, making it hard to find features, track spending, manage invoices, and handle multi-wallet operations. M7\u2011Finance required both an intuitive, neobank-grade UI and a robust backend: transactional ledger with double-entry accounting, multi-provider payment integration (Payoneer, Remitly, Wise, PayPal), real-time balance aggregation across multiple cards and wallets, a complete invoicing engine with PDF generation and email delivery, scheduled/recurring transfers, and an authentication system meeting banking-grade security standards (OAuth 2.0, JWT rotation, bcrypt, rate limiting). The product had to handle financial data with ACID guarantees while delivering sub-200ms API response times.",
      ru: "Заказчику требовалась full\u2011stack цифровая банковская платформа с нуля — не просто экраны, а работающая финтех\u2011система. Пользователи существующих банковских приложений сталкиваются с фрустрацией от сложных интерфейсов, затрудняющих поиск функций, отслеживание расходов, управление инвойсами и мульти\u2011кошелёк операции. M7\u2011Finance требовал как интуитивный UI уровня необанка, так и надёжный бэкенд: транзакционный леджер с двойной записью, мультипровайдерную интеграцию платежей (Payoneer, Remitly, Wise, PayPal), агрегацию балансов в реальном времени по нескольким картам и кошелькам, полноценный движок инвойсов с генерацией PDF и email\u2011доставкой, запланированные/рекуррентные переводы и систему аутентификации банковского уровня безопасности (OAuth 2.0, ротация JWT, bcrypt, rate limiting). Продукт должен обрабатывать финансовые данные с ACID\u2011гарантиями при времени ответа API менее 200 мс.",
    },
    constraints: {
      en: [
        "ACID-compliant transactional ledger — every financial operation must be atomic and auditable",
        "Sub-200ms P95 API response time for dashboard aggregation queries",
        "Banking-grade auth: OAuth 2.0 + JWT with refresh token rotation, bcrypt password hashing, IP-based rate limiting",
        "Multi-provider payment abstraction (Payoneer, Remitly, Wise, PayPal) behind unified interface",
        "Server-side PDF invoice generation without browser dependency (@react-pdf/renderer)",
        "Scheduled transfers engine with cron-based execution and failure retry with exponential backoff",
        "Information architecture validated via mind map before any visual design",
        "Usability testing with real users before frontend handoff",
        "Mobile-first responsive approach for all 6 modules",
      ],
      ru: [
        "ACID\u2011совместимый транзакционный леджер — каждая финансовая операция должна быть атомарной и проверяемой",
        "Время ответа API менее 200 мс (P95) для агрегационных запросов дашборда",
        "Аутентификация банковского уровня: OAuth 2.0 + JWT с ротацией refresh\u2011токенов, bcrypt, rate limiting по IP",
        "Мультипровайдерная абстракция платежей (Payoneer, Remitly, Wise, PayPal) за единым интерфейсом",
        "Серверная генерация PDF\u2011инвойсов без зависимости от браузера (@react\u2011pdf/renderer)",
        "Движок запланированных переводов с cron\u2011исполнением и повторными попытками с экспоненциальным откатом",
        "Информационная архитектура валидирована через mind map до начала визуального дизайна",
        "Юзабилити\u2011тестирование с реальными пользователями перед передачей фронтенда",
        "Mobile\u2011first отзывчивый подход для всех 6 модулей",
      ],
    },
    solution: {
      en: "Designed, engineered, and deployed a full-stack digital banking platform across three parallel workstreams. DESIGN: 4-stage UX process — competitive research of 12 neobanks, mind map of the complete user journey, wireframes, interactive prototypes tested with 15 users, and a 200+ component high-fidelity UI kit. FRONTEND (Next.js 14 + TypeScript): server-side rendering for SEO and initial load performance, React Query for cache-first data fetching with optimistic mutations, Zustand for client state, Chart.js with custom financial chart plugins (candlestick overlays, income/expense comparison), responsive layouts tested on 8 viewport breakpoints, and skeleton loading states for every data-driven view. BACKEND (Node.js + Express + PostgreSQL): transactional ledger using double-entry bookkeeping pattern (every debit has a matching credit, enforced at the database level via CHECK constraints and triggers), Prisma ORM with raw SQL for complex financial aggregations (working capital over time, spending by category, balance reconciliation), multi-provider payment integration abstracted behind a Strategy pattern (Payoneer/Remitly/Wise/PayPal adapters with unified webhook handling), PDF invoice generation via @react-pdf/renderer (server-side React components compiled directly to PDF without a browser — lightweight, fast, and production-stable; company header, line items, automatic subtotal/discount/tax/total, client billing details), scheduled transfers engine using Bull queue with Redis-backed job persistence (cron scheduling, retry with exponential backoff, dead-letter queue for failed transfers), and a complete auth system: bcrypt password hashing (cost factor 12), JWT access tokens (15min TTL) with HttpOnly refresh tokens (7-day rotation), Google OAuth 2.0 via Passport.js, Helmet.js for HTTP security headers (CSP, HSTS, X-Frame-Options), IP-based rate limiting (express-rate-limit + Redis sliding window), and CSRF protection. Structured logging via Pino (JSON logs with request correlation IDs, latency tracking, and log levels for audit trail compliance). API layer: 45+ RESTful endpoints organized by domain (auth, users, wallets, transactions, invoices, transfers, analytics), input validation via Zod schemas, standardized error responses, request correlation IDs for distributed tracing, and Swagger/OpenAPI documentation auto-generated from route decorators.",
      ru: "Спроектировали, разработали и задеплоили full\u2011stack цифровую банковскую платформу по трём параллельным направлениям. ДИЗАЙН: 4\u2011этапный UX\u2011процесс — конкурентный анализ 12 необанков, mind map полного пользовательского пути, вайрфреймы, интерактивные прототипы протестированные с 15 пользователями, high\u2011fidelity UI\u2011кит из 200+ компонентов. ФРОНТЕНД (Next.js 14 + TypeScript): SSR для SEO и начальной загрузки, React Query с cache\u2011first стратегией и оптимистичными мутациями, Zustand для клиентского состояния, Chart.js с кастомными финансовыми плагинами (candlestick\u2011оверлеи, сравнение доходов/расходов), адаптивные макеты протестированные на 8 контрольных точках, skeleton\u2011состояния загрузки для каждого data\u2011driven экрана. БЭКЕНД (Node.js + Express + PostgreSQL): транзакционный леджер на основе двойной записи (каждый дебет имеет парный кредит, контролируется на уровне БД через CHECK\u2011constraint и триггеры), Prisma ORM с raw SQL для сложных финансовых агрегаций (оборотный капитал за период, расходы по категориям, рекончиляция балансов), мультипровайдерная интеграция платежей за паттерном Strategy (адаптеры Payoneer/Remitly/Wise/PayPal с унифицированной обработкой вебхуков), генерация PDF\u2011инвойсов через @react\u2011pdf/renderer (серверные React\u2011компоненты компилируются напрямую в PDF без браузера — легковесно, быстро и production\u2011stable; хедер компании, позиции, автоматический расчёт подитога/скидки/налога/итого, реквизиты клиента), движок запланированных переводов на Bull queue с Redis\u2011персистенцией (cron\u2011расписание, повторы с экспоненциальным откатом, dead\u2011letter queue для сбойных переводов), полная система аутентификации: bcrypt (cost factor 12), JWT access\u2011токены (15 мин TTL) с HttpOnly refresh\u2011токенами (7\u2011дневная ротация), Google OAuth 2.0 через Passport.js, Helmet.js для HTTP security headers (CSP, HSTS, X\u2011Frame\u2011Options), rate limiting по IP (express\u2011rate\u2011limit + Redis sliding window), CSRF\u2011защита. Структурированное логирование через Pino (JSON\u2011логи с correlation ID, трекинг латентности и уровни логов для compliance аудит\u2011трейла). API\u2011слой: 45+ RESTful эндпоинтов по доменам (auth, users, wallets, transactions, invoices, transfers, analytics), валидация через Zod\u2011схемы, стандартизированные ошибки, correlation ID для распределённого трейсинга, Swagger/OpenAPI из декораторов маршрутов.",
    },
    deliverables: {
      en: [
        "UX research report (12-app competitive analysis, 15-user interviews, pain point matrix)",
        "Information architecture mind map (full user journey with sub-flows)",
        "200+ component high-fidelity UI kit (Figma → code handoff with tokens)",
        "Next.js 14 frontend with SSR, React Query, Zustand, Chart.js financial visualizations",
        "Node.js + Express REST API (45+ endpoints, Zod validation, Swagger docs)",
        "PostgreSQL transactional ledger (double-entry bookkeeping, CHECK constraints, triggers)",
        "Multi-provider payment integration (Payoneer, Remitly, Wise, PayPal — Strategy pattern)",
        "PDF invoice engine (@react-pdf/renderer, automatic calculations, S3 storage, email delivery)",
        "Scheduled transfers engine (Bull queue + Redis, cron, retry with backoff, DLQ)",
        "Auth system (JWT rotation, Google OAuth 2.0, bcrypt, Helmet.js, rate limiting, CSRF)",
        "Structured logging (Pino JSON logs, correlation IDs, latency tracking, audit compliance)",
        "Wallet management (multi-card CRUD, balance aggregation, payment categorization)",
        "CI/CD pipeline (GitHub Actions, Docker, automated test suite — 87% coverage)",
      ],
      ru: [
        "UX\u2011исследование (анализ 12 приложений, интервью с 15 пользователями, матрица болей)",
        "Mind map информационной архитектуры (полный путь пользователя с подпотоками)",
        "High\u2011fidelity UI\u2011кит из 200+ компонентов (Figma → код с токенами)",
        "Next.js 14 фронтенд с SSR, React Query, Zustand, Chart.js финансовые визуализации",
        "Node.js + Express REST API (45+ эндпоинтов, Zod\u2011валидация, Swagger\u2011документация)",
        "PostgreSQL транзакционный леджер (двойная запись, CHECK\u2011constraints, триггеры)",
        "Мультипровайдерная интеграция платежей (Payoneer, Remitly, Wise, PayPal — паттерн Strategy)",
        "Движок PDF\u2011инвойсов (@react\u2011pdf/renderer, автоматические расчёты, S3\u2011хранилище, email\u2011доставка)",
        "Движок запланированных переводов (Bull queue + Redis, cron, retry с откатом, DLQ)",
        "Система аутентификации (ротация JWT, Google OAuth 2.0, bcrypt, Helmet.js, rate limiting, CSRF)",
        "Структурированное логирование (Pino JSON\u2011логи, correlation ID, трекинг латентности, audit compliance)",
        "Управление кошельками (мульти\u2011карта CRUD, агрегация балансов, категоризация платежей)",
        "CI/CD пайплайн (GitHub Actions, Docker, автоматизированные тесты — 87% покрытие)",
      ],
    },
    techStack: ["Next.js 14", "TypeScript", "React Query", "Zustand", "Tailwind CSS", "Chart.js", "Node.js", "Express", "PostgreSQL", "Prisma", "Redis", "Bull Queue", "@react-pdf/renderer", "JWT", "OAuth 2.0", "Passport.js", "Helmet.js", "Pino", "Zod", "Docker", "GitHub Actions", "Swagger"],
    outcome: {
      en: "Delivered a production-grade full-stack banking platform: 6 modules (Dashboard, Transactions, Invoices, Wallets, Settings, Auth), 20+ screens, 45+ API endpoints, PostgreSQL ledger with double-entry integrity, multi-provider payment processing, PDF invoice generation, scheduled transfers with queue-based reliability, and banking-grade auth. API response time P95 < 180ms. Test coverage 87%. Dashboard aggregates real-time data from wallets, transactions, and scheduled transfers into a single view without cognitive overload. The invoicing system handles the complete lifecycle: create → line items → calculate → preview → send → track status (Paid/Pending/Unpaid). Zero financial data inconsistencies in production.",
      ru: "Поставили production\u2011grade full\u2011stack банковскую платформу: 6 модулей (Dashboard, Транзакции, Инвойсы, Кошельки, Настройки, Авторизация), 20+ экранов, 45+ API\u2011эндпоинтов, PostgreSQL\u2011леджер с целостностью двойной записи, мультипровайдерная обработка платежей, генерация PDF\u2011инвойсов, запланированные переводы с очередью для надёжности и аутентификация банковского уровня. Время ответа API P95 < 180 мс. Покрытие тестами 87%. Dashboard агрегирует данные в реальном времени из кошельков, транзакций и переводов в единый экран без когнитивной перегрузки. Система инвойсов обрабатывает полный жизненный цикл: создание → позиции → расчёт → предпросмотр → отправка → отслеживание статуса (Paid/Pending/Unpaid). Ноль несогласованностей финансовых данных в продакшне.",
    },
    hardParts: [
      {
        title: { en: "Double-Entry Ledger with ACID Guarantees", ru: "Леджер с двойной записью и ACID\u2011гарантиями" },
        description: {
          en: "Every financial operation (deposit, withdrawal, transfer, invoice payment) is recorded as a pair of ledger entries: debit and credit. PostgreSQL CHECK constraints enforce that every transaction batch sums to zero. Database triggers auto-update wallet balances after each committed transaction. This eliminates phantom balances and ensures the system is always reconcilable — the same approach used by production banking cores.",
          ru: "Каждая финансовая операция (депозит, списание, перевод, оплата инвойса) записывается как пара леджерных записей: дебет и кредит. CHECK\u2011constraint PostgreSQL гарантирует, что каждый батч транзакций суммируется в ноль. Триггеры базы данных автоматически обновляют баланс кошельков после коммита. Это исключает фантомные балансы и обеспечивает постоянную рекончиляцию — тот же подход, что и в продакшн банковских ядрах.",
        },
      },
      {
        title: { en: "Multi-Provider Payment Abstraction (Strategy Pattern)", ru: "Мультипровайдерная абстракция платежей (паттерн Strategy)" },
        description: {
          en: "Payoneer, Remitly, Wise, and PayPal each have different APIs, webhook formats, and settlement timelines. We built a PaymentProvider interface with adapter classes per provider: initiate(), confirm(), webhook(), refund(). Adding a new provider means implementing one adapter — zero changes to business logic. Webhook signatures are verified cryptographically per provider. Failed webhooks are retried via dead-letter queue with exponential backoff.",
          ru: "Payoneer, Remitly, Wise и PayPal имеют разные API, форматы вебхуков и таймлайны расчётов. Построили интерфейс PaymentProvider с адаптерами для каждого провайдера: initiate(), confirm(), webhook(), refund(). Добавление нового провайдера — один адаптер, ноль изменений в бизнес\u2011логике. Подписи вебхуков верифицируются криптографически по каждому провайдеру. Сбойные вебхуки ретраятся через dead\u2011letter queue с экспоненциальным откатом.",
        },
      },
      {
        title: { en: "Server-Side PDF Generation Without Browser Dependency", ru: "Серверная генерация PDF без зависимости от браузера" },
        description: {
          en: "Invoice PDFs are built using @react-pdf/renderer — React components that compile directly to PDF on the server without spawning a headless browser. This eliminates Chrome/Chromium dependency, reduces memory footprint from ~300MB to ~40MB per generation, and cuts render time from ~3s to ~200ms. The same component tree defines both the in-app preview and the PDF output, ensuring visual consistency. The engine handles: company header with branding, invoice/billing details, dynamic line items with per-line rates and quantities, automatic subtotal/discount/tax/total calculation, client details block, and unique invoice number generation (sequential with check digit). Generated PDFs are stored in S3 with pre-signed URLs (15-min expiry) for secure download and emailed to clients via SES.",
          ru: "PDF\u2011инвойсы строятся через @react\u2011pdf/renderer — React\u2011компоненты компилируются напрямую в PDF на сервере без запуска headless\u2011браузера. Это устраняет зависимость от Chrome/Chromium, снижает потребление памяти с ~300 МБ до ~40 МБ на генерацию и сокращает время рендеринга с ~3 с до ~200 мс. Одно и то же дерево компонентов определяет как превью в приложении, так и PDF — обеспечивая визуальную консистентность. Движок обрабатывает: хедер компании с брендингом, реквизиты инвойса/выставления, динамические позиции с ценами и количествами, автоматический расчёт подитога/скидки/налога/итого, блок данных клиента и генерацию уникального номера инвойса (последовательная с контрольной цифрой). Сгенерированные PDF хранятся в S3 с pre\u2011signed URL (15\u2011минутный срок) для безопасного скачивания и отправляются клиентам через SES.",
        },
      },
      {
        title: { en: "Scheduled Transfers with Queue-Based Reliability", ru: "Запланированные переводы с надёжностью на очередях" },
        description: {
          en: "Recurring and scheduled transfers run on Bull queue backed by Redis. Each transfer job carries idempotency key to prevent double-execution. Failed transfers retry with exponential backoff (1s → 2s → 4s → 8s, max 5 retries). After max retries, jobs move to dead-letter queue and trigger admin notification. The scheduler supports cron expressions for flexible recurrence patterns (weekly, monthly, custom). Transfer status is reflected in real-time on the dashboard via WebSocket push.",
          ru: "Рекуррентные и запланированные переводы работают на Bull queue с Redis\u2011бэкендом. Каждый job содержит idempotency key для предотвращения двойного исполнения. Сбойные переводы ретраятся с экспоненциальным откатом (1с → 2с → 4с → 8с, макс. 5 попыток). После исчерпания — dead\u2011letter queue и уведомление администратору. Планировщик поддерживает cron\u2011выражения для гибких паттернов повторения (еженедельно, ежемесячно, кастом). Статус переводов отражается в реальном времени на дашборде через WebSocket\u2011push.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build", ru: "Сборка" }, passed: true },
      { name: { en: "Ledger reconciliation tests", ru: "Тесты рекончиляции леджера" }, passed: true },
      { name: { en: "Payment provider integration E2E", ru: "E2E интеграция платёжных провайдеров" }, passed: true },
      { name: { en: "Invoice PDF generation accuracy", ru: "Точность генерации PDF\u2011инвойсов" }, passed: true },
      { name: { en: "Auth security audit (OWASP)", ru: "Аудит безопасности аутентификации (OWASP)" }, passed: true },
      { name: { en: "Load testing (P95 < 200ms)", ru: "Нагрузочное тестирование (P95 < 200 мс)" }, passed: true },
      { name: { en: "Usability testing passed", ru: "Юзабилити\u2011тестирование пройдено" }, passed: true },
      { name: { en: "87% test coverage gate", ru: "Порог покрытия тестами 87%" }, passed: true },
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
    id: "case-7",
    slug: "local-food-delivery-platform",
    category: "product",
    year: 2021,
    title: {
      en: "LocalFood: Peer\u2011to\u2011Peer Home\u2011Cooked Food Delivery Platform (iOS + Backend)",
      ru: "LocalFood: P2P\u2011платформа доставки домашней еды от соседей (iOS + бэкенд)",
    },
    summary: {
      en: "Full-cycle mobile platform connecting home chefs with local food lovers: native iOS app (Swift/SwiftUI) with dual-role architecture (Chef & Customer), real-time order tracking with map integration, multi-step registration with OTP verification, geo-filtered food feed with recommendations, cart & checkout with pickup/delivery options, MIR card payment processing, kitchen quality verification via photo/video, push notifications, and a Node.js/PostgreSQL backend with geospatial queries, WebSocket order updates, and S3 media pipeline.",
      ru: "Полноценная мобильная платформа, связывающая домашних поваров с любителями еды по соседству: нативное iOS\u2011приложение (Swift/SwiftUI) с двухролевой архитектурой (Повар и Пользователь), отслеживание заказов в реальном времени с интеграцией карт, многошаговая регистрация с OTP\u2011верификацией, гео\u2011фильтрованная лента блюд с рекомендациями, корзина и чекаут с опциями самовывоза/доставки, обработка платежей картами МИР, верификация качества кухни через фото/видео, push\u2011уведомления и Node.js/PostgreSQL бэкенд с геопространственными запросами, WebSocket\u2011обновлениями заказов и S3 медиа\u2011пайплайном.",
    },
    metrics: [
      { label: { en: "UI screens designed", ru: "Экранов UI" }, value: "40+" },
      { label: { en: "User roles", ru: "Ролей пользователей" }, value: "2 (Chef + Customer)" },
      { label: { en: "Registration steps", ru: "Шагов регистрации" }, value: "4" },
      { label: { en: "Order statuses tracked", ru: "Статусов заказа" }, value: "6" },
    ],
    artifactHint: { en: "iOS app + real-time tracking + geo-feed", ru: "iOS\u2011приложение + трекинг + гео\u2011лента" },
    industry: { en: "FoodTech / Marketplace / Delivery", ru: "FoodTech / Маркетплейс / Доставка" },
    timeline: { en: "14 weeks", ru: "14\u00A0недель" },
    problem: {
      en: "A Moscow-based client wanted to launch a peer-to-peer food marketplace — a platform where home chefs could sell their dishes to neighbors, with real-time delivery tracking, quality verification, and payment processing. Existing food delivery apps (Yandex.Eda, Delivery Club) cater to restaurants, not individuals. The client needed a two-sided marketplace with distinct experiences for chefs (menu management, order processing, kitchen verification) and customers (geo-based discovery, cart, checkout with pickup/delivery, order tracking on map). The platform had to handle geospatial search (find chefs within 50–1000m radius), OTP-based dual verification (phone + email), MIR payment card processing, real-time order status updates via WebSocket, photo/video kitchen verification for food safety compliance, and map-based delivery routing with ETA calculation. Per client agreement, the app name and logo shown are changed from the original.",
      ru: "Заказчик из Москвы хотел запустить P2P\u2011маркетплейс еды — платформу, где домашние повара могут продавать блюда соседям с отслеживанием доставки в реальном времени, верификацией качества и обработкой платежей. Существующие приложения доставки (Яндекс.Еда, Delivery Club) обслуживают рестораны, а не частных лиц. Клиенту требовался двусторонний маркетплейс с раздельным опытом для поваров (управление меню, обработка заказов, верификация кухни) и покупателей (гео\u2011поиск, корзина, чекаут с самовывозом/доставкой, трекинг на карте). Платформа должна обрабатывать геопространственный поиск (повара в радиусе 50–1000 м), двойную OTP\u2011верификацию (телефон + email), приём карт МИР, обновления статуса заказа через WebSocket, фото/видео\u2011верификацию кухни для контроля санитарных условий и маршрутизацию доставки на карте с расчётом ETA. По договорённости с заказчиком, название и логотип приложения на скриншотах изменены.",
    },
    constraints: {
      en: [
        "Native iOS (Swift 5 + SwiftUI) — no cross-platform compromises for a premium feel",
        "Dual-role architecture: same app, different experience for Chef and Customer",
        "4-step registration with dual OTP verification (SMS + email)",
        "Geospatial food feed: PostGIS radius queries (50m–1000m) with distance chips",
        "Real-time order tracking: WebSocket status updates + MapKit route rendering with ETA",
        "MIR card payment processing (Russian payment system integration)",
        "Kitchen verification: photo + live video stream for food safety compliance",
        "Push notifications for order lifecycle (ready, in transit, payment failed)",
        "App name and logo changed per client NDA agreement",
      ],
      ru: [
        "Нативный iOS (Swift 5 + SwiftUI) — без кросс\u2011платформенных компромиссов ради премиального ощущения",
        "Двухролевая архитектура: одно приложение, разный опыт для Повара и Пользователя",
        "4\u2011шаговая регистрация с двойной OTP\u2011верификацией (SMS + email)",
        "Геопространственная лента: PostGIS\u2011запросы по радиусу (50 м – 1000 м) с чипами расстояния",
        "Отслеживание заказов в реальном времени: WebSocket + рендеринг маршрута MapKit с ETA",
        "Приём платежей картами МИР (интеграция с российской платёжной системой)",
        "Верификация кухни: фото + видеотрансляция для контроля санитарных условий",
        "Push\u2011уведомления по жизненному циклу заказа (готов, в пути, ошибка оплаты)",
        "Название и логотип приложения изменены по договорённости с заказчиком (NDA)",
      ],
    },
    solution: {
      en: "Designed and built a full-stack two-sided food marketplace across iOS and backend. iOS APP (Swift 5 + SwiftUI): dual-role onboarding — at registration Step 1, user chooses Chef or Customer, defining their entire navigation tree; 4-step registration flow (role selection → personal data with bio/DOB/gender → contact info with phone/email/address with geolocation → dual OTP verification for both phone and email); personalized geo-filtered food feed with recommendation carousel (featured dish with chef avatar, rating, price, one-tap add to cart), search with advanced filters (distance radius chips 50–1000m, price range slider, sort order, food type tags — Meat, Salad, Appetizer, Pastry, Side, Soup, Drinks, Grill); dish detail screen with full-bleed hero photo, chef badge, rating with review count, description, ingredients, category tags, and 'More from this chef' section; cart with item management (quantity +/−, favorites, delete), line-item breakdown and total; checkout with segmented control for Pickup vs Delivery (pickup shows chef address + map link, delivery shows user address + delivery fee calculation), saved MIR payment cards with add/remove, order summary with service fee breakdown; 6-stage order tracking on live map (Pending → Accepted → Cooking → In Transit → Delivered → Completed) with real-time driver position via WebSocket, route rendering with ETA (e.g. '32 min, 27.6 km'), and order detail overlay; payment error screen with retry flow and support contact; push notification center with order status updates and payment failure alerts. CHEF EXPERIENCE: profile with rating, bio, menu management, 'Add dish' form (photo upload, name, description, ingredients, tags, price), order management (incoming orders with Accept/Reject, order detail with item list and 'Start cooking' action), kitchen quality verification (photo of kitchen/products for sanitary inspection + live camera stream), media gallery (uploaded photos + video for transparency). BACKEND (Node.js + Express + PostgreSQL + PostGIS): geospatial queries via PostGIS (ST_DWithin for radius search, ST_Distance for distance calculation, spatial index on chef locations for sub-50ms query time at 100K+ records), WebSocket server (Socket.IO) for real-time order status push and delivery driver location updates, S3 media pipeline (dish photos, chef avatars, kitchen verification photos/videos — upload via pre-signed URLs, Sharp-based image resizing to 3 breakpoints, CloudFront CDN for delivery), MIR payment gateway integration (tokenized card storage, 3-D Secure, idempotent charge requests), OTP service (SMS via SMS.RU provider + email via Nodemailer/SES, 6-digit codes with 90-second TTL and rate limiting), order state machine (Pending → Accepted → Cooking → Ready → InTransit → Delivered, with compensating transitions for cancellation/refund), recommendation engine (collaborative filtering based on order history + geo-proximity scoring), and structured logging via Pino with request tracing.",
      ru: "Спроектировали и построили full\u2011stack двусторонний маркетплейс еды для iOS и бэкенда. iOS\u2011ПРИЛОЖЕНИЕ (Swift 5 + SwiftUI): двухролевой онбординг — на Шаге 1 регистрации пользователь выбирает Повар или Пользователь, определяя всё дерево навигации; 4\u2011шаговый flow регистрации (выбор роли → личные данные с био/датой рождения/полом → контакты с телефоном/email/адресом с геолокацией → двойная OTP\u2011верификация телефона и email); персонализированная гео\u2011фильтрованная лента с каруселью рекомендаций (фитчер\u2011блюдо с аватаром повара, рейтингом, ценой, добавлением в корзину одним нажатием), поиск с расширенными фильтрами (чипы радиуса 50–1000 м, слайдер цены, сортировка, теги типа блюда — Мясное, Салат, Закуска, Выпечка, Гарнир, Суп, Напитки, Гриль); детальный экран блюда с full\u2011bleed фото, бейджем повара, рейтингом с количеством отзывов, описанием, составом, тегами категорий и секцией «Ещё блюда от этого повара»; корзина с управлением (количество +/−, избранное, удаление), разбивкой по позициям и итогом; чекаут с сегментированным контролом Самовывоз/Доставка (самовывоз показывает адрес повара + ссылку на карту, доставка — адрес пользователя + расчёт стоимости доставки), сохранённые карты МИР с добавлением/удалением, сводка заказа с разбивкой сервисного сбора; 6\u2011стадийный трекинг заказа на живой карте (Ожидание → Принят → Готовка → В пути → Доставлен → Завершён) с позицией курьера в реальном времени через WebSocket, рендеринг маршрута с ETA (например, «32 мин, 27.6 км»), оверлей деталей заказа; экран ошибки оплаты с retry и контактом поддержки; центр push\u2011уведомлений со статусами заказов и алертами ошибок оплаты. ОПЫТ ПОВАРА: профиль с рейтингом, био, управление меню, форма «Добавить блюдо» (загрузка фото, название, описание, состав, теги, цена), управление заказами (входящие с Принять/Отклонить, детали заказа с позициями и действием «Готовить»), верификация качества кухни (фото кухни/продуктов для санитарной проверки + видеотрансляция с камеры), медиа\u2011галерея (загруженные фото + видео для прозрачности). БЭКЕНД (Node.js + Express + PostgreSQL + PostGIS): геопространственные запросы через PostGIS (ST_DWithin для поиска по радиусу, ST_Distance для расчёта расстояния, пространственный индекс на локациях поваров — менее 50 мс на 100K+ записей), WebSocket\u2011сервер (Socket.IO) для push статуса заказа и позиции курьера, S3 медиа\u2011пайплайн (фото блюд, аватары поваров, фото/видео верификации кухни — загрузка через pre\u2011signed URL, ресайзинг через Sharp в 3 брейкпоинта, CDN через CloudFront), интеграция платёжного шлюза МИР (токенизированное хранение карт, 3\u2011D Secure, идемпотентные charge\u2011запросы), OTP\u2011сервис (SMS через SMS.RU + email через Nodemailer/SES, 6\u2011значные коды с TTL 90 секунд и rate limiting), state machine заказов (Pending → Accepted → Cooking → Ready → InTransit → Delivered, с компенсирующими переходами для отмены/возврата), рекомендательный движок (коллаборативная фильтрация по истории заказов + скоринг по гео\u2011близости), структурированное логирование через Pino с трейсингом запросов.",
    },
    deliverables: {
      en: [
        "Native iOS app (Swift 5 + SwiftUI, dual-role: Chef & Customer)",
        "4-step registration with dual OTP (phone SMS + email verification)",
        "Geo-filtered food feed with recommendation carousel and advanced filters",
        "Dish detail, chef profile, and 'More from chef' discovery",
        "Cart with quantity management, favorites, and line-item totals",
        "Checkout with Pickup/Delivery toggle, MIR card management, service fee breakdown",
        "6-stage real-time order tracking on live map (WebSocket + MapKit + ETA)",
        "Payment error handling with retry flow",
        "Push notification center (order ready, in transit, payment failed)",
        "Chef: menu CRUD (photo, description, ingredients, tags, price)",
        "Chef: order management (accept/reject, detail, 'start cooking')",
        "Chef: kitchen verification (photo + live video stream for sanitary compliance)",
        "Node.js + Express REST API with PostGIS geospatial queries",
        "WebSocket server (Socket.IO) for real-time order/driver updates",
        "S3 media pipeline (pre-signed upload, Sharp resizing, CloudFront CDN)",
        "MIR payment gateway (tokenized cards, 3-D Secure, idempotent charges)",
        "OTP service (SMS.RU + SES, rate limiting, 90s TTL)",
      ],
      ru: [
        "Нативное iOS\u2011приложение (Swift 5 + SwiftUI, две роли: Повар и Пользователь)",
        "4\u2011шаговая регистрация с двойным OTP (SMS + email\u2011верификация)",
        "Гео\u2011фильтрованная лента с каруселью рекомендаций и расширенными фильтрами",
        "Детали блюда, профиль повара, раздел «Ещё блюда от повара»",
        "Корзина с управлением количеством, избранным и итогами",
        "Чекаут с Самовывоз/Доставка, управление картами МИР, разбивка сборов",
        "6\u2011стадийный трекинг заказа на живой карте (WebSocket + MapKit + ETA)",
        "Обработка ошибок оплаты с retry",
        "Центр push\u2011уведомлений (заказ готов, в пути, ошибка оплаты)",
        "Повар: CRUD меню (фото, описание, состав, теги, цена)",
        "Повар: управление заказами (принять/отклонить, детали, «готовить»)",
        "Повар: верификация кухни (фото + видеотрансляция для санитарного контроля)",
        "Node.js + Express REST API с PostGIS геопространственными запросами",
        "WebSocket\u2011сервер (Socket.IO) для обновлений заказа/курьера",
        "S3 медиа\u2011пайплайн (pre\u2011signed upload, Sharp ресайзинг, CloudFront CDN)",
        "Платёжный шлюз МИР (токенизация карт, 3\u2011D Secure, идемпотентные charge)",
        "OTP\u2011сервис (SMS.RU + SES, rate limiting, TTL 90 с)",
      ],
    },
    techStack: ["Swift 5", "SwiftUI", "MapKit", "CoreLocation", "Node.js", "Express", "PostgreSQL", "PostGIS", "Socket.IO", "Redis", "AWS S3", "CloudFront", "Sharp", "MIR Payment Gateway", "SMS.RU", "Pino", "Docker", "Nginx"],
    outcome: {
      en: "Delivered a production-ready two-sided food marketplace: 40+ iOS screens covering the complete user journey from onboarding to order delivery, dual-role architecture (Chef manages menu/orders/verification, Customer discovers/orders/tracks), real-time map tracking with WebSocket-driven status updates and ETA, PostGIS-powered geospatial discovery (sub-50ms on 100K+ chef records), MIR payment processing with 3-D Secure, kitchen quality verification via photo and live video stream. The platform handles the full order lifecycle with 6 tracked statuses, push notifications at every transition, and error handling with retry flows. Per client agreement, the app was delivered under a pseudonym (LocalFood) with a neutral logo — the actual product operates under the client's brand in Moscow.",
      ru: "Поставили production\u2011ready двусторонний маркетплейс еды: 40+ iOS\u2011экранов, покрывающих полный путь пользователя от онбординга до доставки, двухролевая архитектура (Повар управляет меню/заказами/верификацией, Пользователь ищет/заказывает/отслеживает), трекинг на карте в реальном времени с WebSocket\u2011обновлениями и ETA, PostGIS\u2011поиск по геолокации (менее 50 мс на 100K+ записей поваров), приём карт МИР с 3\u2011D Secure, верификация качества кухни через фото и видеотрансляцию. Платформа обрабатывает полный жизненный цикл заказа с 6 отслеживаемыми статусами, push\u2011уведомлениями на каждом переходе и обработкой ошибок с retry. По договорённости с заказчиком, приложение поставлено под псевдонимом (LocalFood) с нейтральным логотипом — реальный продукт работает под брендом клиента в Москве.",
    },
    hardParts: [
      {
        title: { en: "Dual-Role Architecture in a Single App", ru: "Двухролевая архитектура в одном приложении" },
        description: {
          en: "Chef and Customer share authentication and core infrastructure but have entirely different navigation trees, screens, and data flows. Role is selected at registration Step 1 and defines the app's behavior: Customers see a geo-feed, cart, checkout, and tracking; Chefs see menu management, order queue, kitchen verification, and a chef-specific profile. Implemented via SwiftUI's NavigationView with role-conditional root views, @EnvironmentObject for role state propagation, and a shared data layer (CoreData for offline cache + URLSession API sync). Choosing SwiftUI over UIKit in 2021 was a deliberate forward-thinking decision — the framework was mature enough on iOS 14+ for this scope, while giving us declarative UI composition and significantly faster iteration cycles.",
          ru: "Повар и Пользователь разделяют аутентификацию и базовую инфраструктуру, но имеют полностью разные деревья навигации, экраны и потоки данных. Роль выбирается на Шаге 1 регистрации и определяет поведение приложения: Пользователи видят гео\u2011ленту, корзину, чекаут и трекинг; Повара — управление меню, очередь заказов, верификацию кухни и профиль повара. Реализовано через NavigationView SwiftUI с role\u2011conditional корневыми экранами, @EnvironmentObject для пропагации состояния роли и общим слоем данных (CoreData для офлайн\u2011кэша + URLSession API sync). Выбор SwiftUI вместо UIKit в 2021 году был осознанным forward\u2011thinking решением — фреймворк был достаточно зрелым на iOS 14+ для этого скоупа, при этом давал декларативную композицию UI и значительно более быстрые итерации.",
        },
      },
      {
        title: { en: "PostGIS Geospatial Search with Sub-50ms Performance", ru: "PostGIS геопространственный поиск с производительностью менее 50 мс" },
        description: {
          en: "Food discovery is driven by proximity — users see dishes from chefs within a configurable radius (50m to 1000m). Implemented via PostGIS: chef locations stored as geography(POINT, 4326), spatial GIST index, and ST_DWithin for radius filtering. Distance chips in the filter UI map directly to SQL parameters. At 100K+ chef records, queries return in under 50ms. Combined with collaborative filtering (order history + proximity score) for the recommendation carousel.",
          ru: "Поиск еды основан на близости — пользователи видят блюда от поваров в настраиваемом радиусе (50 м – 1000 м). Реализовано через PostGIS: локации поваров хранятся как geography(POINT, 4326), пространственный GIST\u2011индекс, ST_DWithin для фильтрации по радиусу. Чипы расстояния в UI фильтра напрямую маппятся в SQL\u2011параметры. На 100K+ записей поваров запросы возвращаются менее чем за 50 мс. Совмещено с коллаборативной фильтрацией (история заказов + скоринг по близости) для карусели рекомендаций.",
        },
      },
      {
        title: { en: "Real-Time Order Tracking with 6-Stage State Machine", ru: "Трекинг заказов в реальном времени с 6\u2011стадийным state machine" },
        description: {
          en: "Order lifecycle: Pending → Accepted → Cooking → Ready/InTransit → Delivered → Completed. Each transition triggers a WebSocket event (via Socket.IO) that updates the customer's map view in real-time: driver location pin animates along the route, ETA recalculates, and the status banner changes. MapKit renders the route polyline with distance and time overlay ('32 min, 27.6 km'). Compensating transitions handle cancellation (refund via MIR gateway) and payment failure (retry screen with support contact). Chef receives push notification on new order and can Accept/Reject from the notification or the orders screen.",
          ru: "Жизненный цикл заказа: Ожидание → Принят → Готовка → Готов/В пути → Доставлен → Завершён. Каждый переход триггерит WebSocket\u2011событие (через Socket.IO), обновляющее карту клиента в реальном времени: пин курьера анимируется по маршруту, ETA пересчитывается, статусный баннер меняется. MapKit рендерит полилинию маршрута с оверлеем расстояния и времени («32 мин, 27.6 км»). Компенсирующие переходы обрабатывают отмену (возврат через шлюз МИР) и ошибку оплаты (экран retry с контактом поддержки). Повар получает push на новый заказ и может Принять/Отклонить из уведомления или экрана заказов.",
        },
      },
      {
        title: { en: "Kitchen Verification for Food Safety Compliance", ru: "Верификация кухни для санитарного соответствия" },
        description: {
          en: "Before a chef can start receiving orders, they must pass kitchen verification: upload photos of their kitchen and products (reviewed by the platform's moderation team), and optionally start a live camera stream for real-time inspection. The verification flow uses the device camera (AVFoundation) for photo capture and HLS for live streaming to a moderation dashboard. Media is uploaded to S3 via pre-signed URLs, resized via Sharp, and served via CloudFront. This feature was a regulatory requirement from the client to demonstrate food safety diligence.",
          ru: "Прежде чем повар начнёт принимать заказы, он должен пройти верификацию кухни: загрузить фото кухни и продуктов (проверяются модерацией платформы) и опционально запустить видеотрансляцию с камеры для инспекции в реальном времени. Flow верификации использует камеру устройства (AVFoundation) для фото и HLS для стриминга на дашборд модерации. Медиа загружается в S3 через pre\u2011signed URL, ресайзится через Sharp и раздаётся через CloudFront. Эта функция была регуляторным требованием клиента для демонстрации ответственности за безопасность еды.",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build (Xcode + backend)", ru: "Сборка (Xcode + бэкенд)" }, passed: true },
      { name: { en: "PostGIS query performance (<50ms)", ru: "Производительность PostGIS\u2011запросов (<50 мс)" }, passed: true },
      { name: { en: "WebSocket order tracking E2E", ru: "E2E\u2011тестирование WebSocket\u2011трекинга" }, passed: true },
      { name: { en: "MIR payment integration tests", ru: "Тесты интеграции платежей МИР" }, passed: true },
      { name: { en: "OTP delivery verification (SMS + email)", ru: "Верификация доставки OTP (SMS + email)" }, passed: true },
      { name: { en: "Dual-role navigation audit", ru: "Аудит двухролевой навигации" }, passed: true },
      { name: { en: "Media pipeline (upload → resize → CDN)", ru: "Медиа\u2011пайплайн (загрузка → ресайз → CDN)" }, passed: true },
      { name: { en: "UAT with Moscow test group", ru: "UAT с тестовой группой в Москве" }, passed: true },
    ],
    imageUrl: "/images/cases/localfood/feed-main.png",
    screenshotLayout: "mobile",
    screenshots: [
      // ── Onboarding & Auth ──
      { src: "/images/cases/localfood/onboarding.png", alt: { en: "Onboarding — 'Order delicious food from neighbors' welcome screen with LocalFood branding", ru: "Онбординг — приветственный экран «Заказывайте вкусную еду от соседей» с брендингом LocalFood" } },
      { src: "/images/cases/localfood/login.png", alt: { en: "Login — email/phone + password authentication with 'Sign up' link", ru: "Вход — аутентификация email/телефон + пароль со ссылкой «Зарегистрируйтесь»" } },
      { src: "/images/cases/localfood/otp-phone.png", alt: { en: "OTP — phone number verification with 6-digit code entry and 1:27 resend timer", ru: "OTP — верификация номера телефона, ввод 6\u2011значного кода с таймером повторной отправки 1:27" } },
      { src: "/images/cases/localfood/otp-email.png", alt: { en: "OTP — email verification with 6-digit code sent to example@mail.ru", ru: "OTP — верификация email, 6\u2011значный код отправлен на example@mail.ru" } },
      // ── Registration (4 steps) ──
      { src: "/images/cases/localfood/reg-step1-role.png", alt: { en: "Registration Step 1 — role selection: Chef (with chef hat icon) or Customer (with utensils icon)", ru: "Регистрация Шаг 1 — выбор роли: Повар (иконка поварского колпака) или Пользователь (иконка приборов)" } },
      { src: "/images/cases/localfood/reg-step2-personal.png", alt: { en: "Registration Step 2 — personal data: first name, last name, about me bio, date of birth, gender", ru: "Регистрация Шаг 2 — личные данные: имя, фамилия, «расскажите о себе», дата рождения, пол" } },
      { src: "/images/cases/localfood/reg-step3-contacts.png", alt: { en: "Registration Step 3 — contact info: phone or email, address with geolocation pin, password", ru: "Регистрация Шаг 3 — контактные данные: телефон или почта, адрес с геолокацией, пароль" } },
      { src: "/images/cases/localfood/reg-step4-verify.png", alt: { en: "Registration Step 4 — email OTP verification during registration flow", ru: "Регистрация Шаг 4 — OTP\u2011верификация email в потоке регистрации" } },
      { src: "/images/cases/localfood/reg-step4-phone.png", alt: { en: "Registration Step 4 — phone OTP verification during registration flow", ru: "Регистрация Шаг 4 — OTP\u2011верификация телефона в потоке регистрации" } },
      // ── Food Feed & Discovery ──
      { src: "/images/cases/localfood/feed-main.png", alt: { en: "Main feed — delivery address, recommendation carousel (Caesar Salad 249₽), search, chef cards with ratings", ru: "Главная лента — адрес доставки, карусель рекомендаций (Салат Цезарь 249₽), поиск, карточки поваров с рейтингами" } },
      { src: "/images/cases/localfood/feed-cart-badge.png", alt: { en: "Feed with cart badge — floating cart button showing 2184₽ / 2 items", ru: "Лента с бейджем корзины — плавающая кнопка корзины 2184₽ / 2 позиции" } },
      { src: "/images/cases/localfood/feed-order-status.png", alt: { en: "Feed with active order banner — Order #160924 'Awaiting pickup' with 'On map' button", ru: "Лента с баннером активного заказа — Заказ №160924 «Ожидает получения» с кнопкой «На карте»" } },
      { src: "/images/cases/localfood/filters.png", alt: { en: "Filters — distance chips (50–1000m), price range slider (120–1100₽), sort by price, food type tags", ru: "Фильтры — чипы расстояния (50–1000 м), слайдер цены (120–1100₽), сортировка по цене, теги типов блюд" } },
      { src: "/images/cases/localfood/dish-detail.png", alt: { en: "Dish detail — full photo, chef badge (4.8★), 141 reviews, description, ingredients, tags, 'More from chef'", ru: "Детали блюда — полное фото, бейдж повара (4.8★), 141 оценка, описание, состав, теги, «Ещё от повара»" } },
      { src: "/images/cases/localfood/dish-detail-alt.png", alt: { en: "Dish detail (alternate) — same layout with different dish, showing add-to-cart 249₽ button", ru: "Детали блюда (альтернативный) — тот же макет с другим блюдом, кнопка добавления 249₽" } },
      { src: "/images/cases/localfood/chef-profile.png", alt: { en: "Chef profile — avatar, username, 4.8★ rating, 'About me' bio, menu list with prices and add buttons", ru: "Профиль повара — аватар, юзернейм, рейтинг 4.8★, «Обо мне», список меню с ценами и кнопками добавления" } },
      // ── Cart & Checkout ──
      { src: "/images/cases/localfood/cart.png", alt: { en: "Cart — items with photos, prices, quantity controls (−/+), favorites, delete, 2 items total 596₽", ru: "Корзина — позиции с фото, ценами, управление количеством (−/+), избранное, удаление, 2 позиции 596₽" } },
      { src: "/images/cases/localfood/checkout-pickup.png", alt: { en: "Checkout (Pickup) — pickup/delivery toggle, chef address on map, MIR cards, 2 items 596₽ + 49₽ service = 645₽", ru: "Чекаут (Самовывоз) — переключатель самовывоз/доставка, адрес повара на карте, карты МИР, 596₽ + сбор 49₽ = 645₽" } },
      { src: "/images/cases/localfood/checkout-delivery.png", alt: { en: "Checkout (Delivery) — delivery selected, user address, MIR cards, 596₽ + 49₽ service + 120₽ delivery = 765₽", ru: "Чекаут (Доставка) — доставка выбрана, адрес пользователя, карты МИР, 596₽ + сбор 49₽ + доставка 120₽ = 765₽" } },
      { src: "/images/cases/localfood/payment-error.png", alt: { en: "Payment error — red screen 'Order #52120120 payment failed' with Retry button and support contact", ru: "Ошибка оплаты — красный экран «Заказ №52120120 не удалось оплатить» с кнопкой Повторить и контактом поддержки" } },
      // ── Order Tracking ──
      { src: "/images/cases/localfood/order-tracking-pending.png", alt: { en: "Order tracking — map with route, 'Awaiting pickup' status, 32 min ETA, 27.6 km, order details overlay", ru: "Трекинг заказа — карта с маршрутом, статус «Ожидает получения», ETA 32 мин, 27.6 км, оверлей деталей" } },
      { src: "/images/cases/localfood/order-tracking-enroute.png", alt: { en: "Order tracking — 'In transit' status with live driver position on map route", ru: "Трекинг заказа — статус «В пути» с позицией курьера на маршруте карты" } },
      { src: "/images/cases/localfood/order-tracking-deliver.png", alt: { en: "Order tracking — chef view: 'Deliver the dish to the customer' instruction with map", ru: "Трекинг заказа — вид повара: инструкция «Доставьте блюда заказчику» с картой" } },
      { src: "/images/cases/localfood/order-delivered.png", alt: { en: "Order delivered — status 'Delivered', items list with 'Repeat order' button", ru: "Заказ доставлен — статус «Доставлен», список позиций с кнопкой «Повторить заказ»" } },
      // ── Account & Settings ──
      { src: "/images/cases/localfood/account-menu.png", alt: { en: "Account menu — Profile, Addresses, Notifications, Settings + 'Become a chef' CTA, Logout/Support", ru: "Меню аккаунта — Профиль, Адреса, Уведомления, Настройки + CTA «Стать поваром», Выйти/Поддержка" } },
      { src: "/images/cases/localfood/payment-cards.png", alt: { en: "Payment data — saved MIR cards (····7289, ····3212) with delete/confirm actions, 'Add card' button", ru: "Платёжные данные — сохранённые карты МИР (····7289, ····3212) с удалением/подтверждением, кнопка «Добавить карту»" } },
      { src: "/images/cases/localfood/payment-add-card.png", alt: { en: "Add payment method — card number, name, MM/YY, CVV fields with 'Add' button", ru: "Добавление платёжного метода — номер карты, имя и фамилия, ММ/ГГ, CVV с кнопкой «Добавить»" } },
      { src: "/images/cases/localfood/notifications.png", alt: { en: "Notifications — 'Your order is ready' (×2), 'Payment failed' alerts with order numbers and timestamps", ru: "Уведомления — «Ваш заказ готов» (×2), «Не удалось оплатить» с номерами заказов и временем" } },
      { src: "/images/cases/localfood/address-list.png", alt: { en: "Address list — saved delivery address (Moscow, pl. Lenina 11) with edit icon, 'New address' button", ru: "Список адресов — сохранённый адрес (Москва, пл. Ленина 11) с иконкой редактирования, кнопка «Новый адрес»" } },
      { src: "/images/cases/localfood/address-map.png", alt: { en: "Address map — full map view with route (32 min / 27.6 km), delivery address input, apartment/floor fields, 'Detect location'", ru: "Карта адреса — полная карта с маршрутом (32 мин / 27.6 км), ввод адреса доставки, квартира/этаж, «Определить местоположение»" } },
      { src: "/images/cases/localfood/user-profile-edit.png", alt: { en: "Profile edit — avatar upload, name, surname, username, bio, DOB, gender, email/phone, password", ru: "Редактирование профиля — загрузка аватара, имя, фамилия, юзернейм, «обо мне», дата рождения, пол, контакты, пароль" } },
      // ── Chef Experience ──
      { src: "/images/cases/localfood/chef-profile-view.png", alt: { en: "Chef profile (own view) — avatar, name, rating 4.8★, 'Edit' button, 'My orders' badge, bio, menu with 'Add dish'", ru: "Профиль повара (свой) — аватар, имя, рейтинг 4.8★, кнопка «Изменить», бейдж «Мои заказы», био, меню с «Добавить блюдо»" } },
      { src: "/images/cases/localfood/chef-orders.png", alt: { en: "Chef orders — incoming order #160924 (1265₽, 'Delivered') with food thumbnails, Accept/Reject buttons", ru: "Заказы повара — входящий заказ №160924 (1265₽, «Доставлен») с превью блюд, кнопки Принять/Отклонить" } },
      { src: "/images/cases/localfood/chef-order-detail.png", alt: { en: "Chef order detail — Order #160924 'Accepted', item list (Caesar ×2, beef, crab salad) with 'Start cooking' button", ru: "Детали заказа повара — Заказ №160924 «Принят», список позиций (Цезарь ×2, шашлык, крабовый салат) с кнопкой «Готовить»" } },
      { src: "/images/cases/localfood/chef-kitchen-verify.png", alt: { en: "Kitchen verification — 'Photograph kitchen and products for quality and sanitary assessment' with photo/upload buttons", ru: "Верификация кухни — «Сфотографируйте кухню и продукты для определения качества и санитарных условий» с кнопками фото/загрузки" } },
      { src: "/images/cases/localfood/chef-camera-stream.png", alt: { en: "Camera stream — 'Prepare camera, products and start broadcast' with camera preview window", ru: "Видеотрансляция — «Подготовьте камеру, продукты и включите трансляцию» с окном камеры" } },
      { src: "/images/cases/localfood/chef-media-gallery.png", alt: { en: "Media gallery — uploaded photos grid + video section with play button, 'Order ready' action", ru: "Медиа\u2011галерея — сетка загруженных фото + секция видео с кнопкой воспроизведения, действие «Заказ готов»" } },
      { src: "/images/cases/localfood/dish-chef-view.png", alt: { en: "Dish (chef view) — same detail screen but with delete icon and 'Edit' button instead of add-to-cart", ru: "Блюдо (вид повара) — тот же экран, но с иконкой удаления и кнопкой «Редактировать» вместо добавления в корзину" } },
      { src: "/images/cases/localfood/dish-edit.png", alt: { en: "Edit dish — photo upload area, name field, description, ingredients, tags, price, 'Save' button", ru: "Редактирование блюда — область загрузки фото, название, описание, состав, теги, цена, кнопка «Сохранить»" } },
      { src: "/images/cases/localfood/dish-create.png", alt: { en: "Create dish — empty form with photo placeholder, name, description, ingredients fields, 'Save' button", ru: "Создание блюда — пустая форма с плейсхолдером фото, название, описание, состав, кнопка «Сохранить»" } },
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
        title: { en: "Chargeback-Resistant Payment Architecture", ru: "Платёжная архитектура, устойчивая к чарджбэкам" },
        description: {
          en: "Standard card payments allow chargebacks within 120 days — the client was losing 8-12% of revenue to fraudulent refund claims. We designed a deposit-based payment architecture: (1) the charge is classified as a 'deposit' (not 'purchase') with explicit pre-authorization, making it harder to dispute under card network rules; (2) each transaction stores a signed consent artifact (timestamp + IP + explicit checkbox + terms version hash) that serves as evidence in chargeback disputes; (3) the payment amount is split: non-refundable deposit portion (booking fee) + refundable service portion, clearly displayed before confirmation; (4) webhook-based reconciliation with the payment gateway catches state mismatches within 30 seconds. After deployment, chargeback rate dropped from ~10% to under 1.5%.",
          ru: "Стандартные карточные платежи допускают чарджбэки в течение 120 дней — клиент терял 8–12% выручки из\u2011за мошеннических заявлений на возврат. Мы спроектировали депозитную платёжную архитектуру: (1) списание классифицируется как «задаток» (не «покупка») с явной предавторизацией, затрудняя оспаривание по правилам карточных сетей; (2) каждая транзакция сохраняет подписанный артефакт согласия (timestamp + IP + явный чекбокс + хеш версии условий), служащий доказательством при спорах; (3) сумма разделена: невозвратный депозит (бронирование) + возвратная сервисная часть, чётко отображённая до подтверждения; (4) webhook\u2011рекончиляция с платёжным шлюзом ловит расхождения состояний в течение 30 секунд. После деплоя чарджбэк\u2011рейт снизился с ~10% до менее 1.5%.",
        },
      },
      {
        title: { en: "Idempotent Payment Flow with Double-Charge Prevention", ru: "Идемпотентный платёжный флоу с защитой от двойного списания" },
        description: {
          en: "Users on flaky mobile connections tap 'Pay' multiple times, or the browser refreshes mid-payment. Without idempotency, this creates duplicate charges. We implemented: (1) client-side generates a unique idempotency key (UUID v4) before the first payment attempt; (2) backend stores the key in Redis with a 24-hour TTL — subsequent requests with the same key return the original result without re-charging; (3) a distributed lock (Redlock) prevents race conditions when two identical requests arrive within milliseconds; (4) if the payment gateway confirms but our webhook handler crashes before recording, a reconciliation cron (every 5 minutes) catches orphaned payments and syncs state. Zero double-charges in production across 15K+ transactions.",
          ru: "Пользователи на нестабильных мобильных соединениях нажимают «Оплатить» несколько раз, или браузер обновляется во время оплаты. Без идемпотентности это создаёт дублирующие списания. Мы реализовали: (1) клиент генерирует уникальный idempotency key (UUID v4) перед первой попыткой; (2) бэкенд сохраняет ключ в Redis с TTL 24 часа — повторные запросы с тем же ключом возвращают исходный результат без повторного списания; (3) распределённая блокировка (Redlock) предотвращает race condition когда два идентичных запроса приходят в миллисекундах; (4) если шлюз подтвердил оплату, но webhook\u2011обработчик упал до записи — рекончиляционный cron (каждые 5 минут) ловит «осиротевшие» платежи и синхронизирует состояние. Ноль двойных списаний в продакшне на 15K+ транзакций.",
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
    imageUrl: "/images/cases/deposit-ux/step3-deposit-payment.png",
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
          en: "Some providers return extra fields or wrong error codes. We asserted on a minimal compliant subset and documented known deviations. Built a normalization layer that strips non-standard fields, coerces hex values to consistent casing, and maps provider-specific error codes to our internal error taxonomy — so the application layer never sees raw provider quirks.",
          ru: "Часть провайдеров возвращает лишние поля или неверные коды ошибок. Зафиксировали минимальный compliant поднабор и задокументировали известные отклонения. Построили слой нормализации, который удаляет нестандартные поля, приводит hex\u2011значения к единообразному регистру и маппит провайдер\u2011специфичные коды ошибок в нашу внутреннюю таксономию — чтобы слой приложения никогда не видел сырых провайдерских артефактов.",
        },
      },
      {
        title: { en: "Automated Cross-Wallet Regression Suite", ru: "Автоматизированный кросс\u2011кошельковый регрессионный сьют" },
        description: {
          en: "Manual testing across 8 wallets × 3 networks × 4 signing methods = 96 combinations per release. We built a Playwright-based test harness that automates wallet interactions via browser extension injection: MetaMask and Rabby are installed as unpacked extensions, test scripts programmatically approve transactions and sign messages, and assertion checks verify the on-chain result matches the expected state. The suite runs in CI on every PR and catches regressions that manual QA would miss — like Rabby silently changing its EIP-712 domain separator encoding in a minor update, which would have broken typed data signing for 15% of users.",
          ru: "Ручное тестирование на 8 кошельках × 3 сети × 4 метода подписания = 96 комбинаций на каждый релиз. Построили тестовый фреймворк на Playwright, автоматизирующий взаимодействие с кошельками через инъекцию browser\u2011расширений: MetaMask и Rabby устанавливаются как unpacked\u2011расширения, тестовые скрипты программно подтверждают транзакции и подписывают сообщения, assertion\u2011проверки верифицируют что on\u2011chain результат соответствует ожидаемому состоянию. Сьют запускается в CI на каждый PR и ловит регрессии, которые ручной QA пропустит — например, Rabby тихо изменил кодирование domain separator EIP\u2011712 в минорном обновлении, что сломало бы типизированное подписание для 15% пользователей.",
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
    id: "case-15",
    slug: "tripwise-travel-platform",
    category: "web",
    year: 2022,
    title: {
      en: "Tripwise: Travel Discovery & Booking Platform (full\u2011cycle web product)",
      ru: "Tripwise: платформа поиска и бронирования путешествий (full\u2011cycle веб\u2011продукт)",
    },
    summary: {
      en: "Full-cycle travel discovery and booking platform: immersive hero with real\u2011time accommodation search (location autocomplete, date pickers, guest selector), curated destination catalog with per\u2011trip pricing and duration, 3\u2011step booking funnel, tour marketplace with 8+ global destinations, client testimonial carousel with social proof, tour guide directory with specialization tags, newsletter capture, and a responsive landing page built on Next.js\u00A012 + Tailwind\u00A0CSS\u00A03 with Framer\u00A0Motion micro\u2011interactions \u2014 designed as the public\u2011facing acquisition layer for a B2C travel startup entering the European and Asian markets.",
      ru: "Full\u2011cycle платформа поиска и бронирования путешествий: иммерсивный герой с поиском жилья в реальном времени (автокомплит локаций, дейтпикеры, селектор гостей), курированный каталог направлений с ценами и длительностью, 3\u2011шаговая воронка бронирования, маркетплейс туров с 8+ глобальными направлениями, карусель отзывов с социальным доказательством, каталог гидов со специализацией, захват email для рассылки и адаптивный лендинг на Next.js\u00A012 + Tailwind\u00A0CSS\u00A03 с микроинтеракциями Framer\u00A0Motion \u2014 спроектирован как публичный acquisition\u2011слой для B2C\u2011стартапа, выходящего на европейский и азиатский рынки.",
    },
    metrics: [
      { label: { en: "Sections on landing", ru: "Секций на лендинге" }, value: "8" },
      { label: { en: "Tour destinations", ru: "Направлений туров" }, value: "8+" },
      { label: { en: "Lighthouse Performance", ru: "Lighthouse Performance" }, value: "96" },
    ],
    artifactHint: { en: "Landing + search + booking funnel", ru: "Лендинг + поиск + воронка бронирования" },
    industry: { en: "Travel / Tourism / Marketplace", ru: "Путешествия / Туризм / Маркетплейс" },
    timeline: { en: "6\u00A0weeks", ru: "6\u00A0недель" },
    problem: {
      en: "A B2C travel startup preparing for the post\u2011COVID\u20112022 tourism rebound needed a high\u2011conversion landing page and booking entry\u2011point that would compete visually with Booking.com and Airbnb while remaining lightweight enough for mobile\u2011first audiences in emerging markets (Southeast Asia, MENA, Southern Europe). The founder's thesis: travelers decide within 8 seconds whether a travel site is trustworthy \u2014 so the hero section had to deliver an emotional punch (immersive destination imagery, aspirational copy) while simultaneously providing functional utility (real\u2011time search with accommodation type, dates, and guest count). Existing template\u2011based travel sites looked generic and failed to convert because they buried the search below the fold, lacked social proof, and loaded slowly on 3G connections. The platform needed: (1) a visually stunning hero with integrated search bar, (2) a curated destination catalog with transparent pricing, (3) a clear 3\u2011step booking explanation to reduce friction, (4) a tour marketplace with global destinations and per\u2011person pricing, (5) client testimonials for trust, (6) a tour guide directory to humanize the brand, and (7) newsletter capture for retention marketing. All of this had to score 90+ on Lighthouse, render correctly on devices from iPhone\u00A0SE to 4K monitors, and ship in 6 weeks before the summer 2022 booking season peak.",
      ru: "B2C\u2011стартап в сфере путешествий, готовящийся к постковидному туристическому восстановлению 2022 года, нуждался в высококонверсионном лендинге и точке входа для бронирования, которая визуально конкурировала бы с Booking.com и Airbnb, оставаясь лёгкой для mobile\u2011first аудитории в развивающихся рынках (Юго\u2011Восточная Азия, MENA, Южная Европа). Тезис основателя: путешественники решают за 8 секунд, доверяют ли они сайту \u2014 поэтому герой\u2011секция должна была произвести эмоциональный удар (иммерсивные фото, вдохновляющий копирайт) и одновременно предоставить функциональную утилиту (поиск с типом жилья, датами и количеством гостей). Существующие шаблонные тревел\u2011сайты выглядели генерически и не конвертировали: прятали поиск ниже fold, не имели социального доказательства и медленно грузились на 3G. Платформа требовала: (1) визуально впечатляющий герой с интегрированной строкой поиска, (2) курированный каталог направлений с прозрачными ценами, (3) понятное 3\u2011шаговое объяснение бронирования, (4) маркетплейс туров с глобальными направлениями и ценами per\u2011person, (5) отзывы клиентов для доверия, (6) каталог гидов для гуманизации бренда, (7) захват email для retention\u2011маркетинга. Всё это должно набирать 90+ на Lighthouse, корректно рендериться от iPhone\u00A0SE до 4K\u2011мониторов и быть поставлено за 6 недель до пика летнего сезона бронирований 2022.",
    },
    constraints: {
      en: [
        "Lighthouse Performance \u2265 90 (critical for SEO and mobile UX in emerging markets)",
        "Mobile\u2011first: 70%+ expected traffic from smartphones on 3G/4G connections",
        "Hero search bar must be above the fold on all viewports (375px \u2013 2560px)",
        "Image\u2011heavy design (\u2265 15 high\u2011res photos) without sacrificing load time",
        "8\u2011section landing page with smooth scroll and section\u2011based navigation",
        "Client testimonials with real avatars and wave\u2011shaped color backgrounds",
        "Tour guide directory with specialization badges and bio cards",
        "Newsletter capture integrated into the page flow (not a popup)",
        "Ship before summer 2022 peak booking season (6\u2011week deadline)",
      ],
      ru: [
        "Lighthouse Performance \u2265 90 (критично для SEO и мобильного UX на развивающихся рынках)",
        "Mobile\u2011first: 70%+ ожидаемого трафика со смартфонов на 3G/4G",
        "Поисковая строка в герое обязательно above the fold на всех вьюпортах (375px \u2013 2560px)",
        "Дизайн с обилием изображений (\u2265 15 hi\u2011res фото) без жертвы скоростью загрузки",
        "8\u2011секционный лендинг с плавным скроллом и навигацией по секциям",
        "Отзывы клиентов с реальными аватарами и волнообразными цветными фонами",
        "Каталог гидов с бейджами специализации и карточками биографий",
        "Захват email для рассылки интегрирован в поток страницы (не попап)",
        "Поставка до пика летнего сезона бронирований 2022 (дедлайн 6 недель)",
      ],
    },
    solution: {
      en: "Designed and built an 8\u2011section high\u2011conversion travel landing page with Next.js\u00A012 (SSG for maximum performance), React\u00A018, TypeScript\u00A04.7, and Tailwind\u00A0CSS\u00A03, deployed on Vercel Edge Network. HERO SECTION: full\u2011viewport aerial photograph of Maldives overwater bungalows with gradient\u2011overlay glassmorphism text panel ('Explore the beauty of nature / Discover the new you'), category chips (Beaches | Mountains | Activities), subheadline with aspiration copy, 'Explore Destinations' CTA with arrow icon, and a sticky bottom search bar with 4 fields \u2014 Accommodation (location autocomplete via Mapbox Geocoding API with debounced requests), Check\u2011in / Check\u2011out (custom date pickers with flatpickr, range validation), Guests ('2 adults' dropdown), and a bright orange 'Search' button. The search bar is implemented as a CSS\u00A0Grid responsive strip that collapses to a stacked layout on mobile. BEST DESTINATIONS: section with 3\u2011column card grid (responsive to 1\u2011column on mobile), each card featuring a rounded\u2011corner destination photo (Next.js Image with blur placeholder from LQIP), city name + country, price in USD, trip duration badge with send\u2011icon, and hover\u2011lift animation (Framer\u00A0Motion scale + shadow). 3\u2011STEP BOOKING FLOW: split\u2011layout section \u2014 left column with 3 steps (Choose Destination with map icon, Make Payment with NFC icon, Reach Airport on Selected Date with bus icon), each step with an orange/red icon badge; right column with a featured trip card ('Trip To India', Taj Mahal photo, '01\u201106 May | by sviss', social icons, '77 people going' counter) and a floating 'Ongoing' status badge with circular progress indicator ('40% completed'). TOP TOURS MARKETPLACE: 4\u00D72 grid of tour cards (8 destinations: Burj Khalifa, Shibuya Japan, Sydney NSW, Danu Beratan Temple, Om Beach, Praga Beach, Yokohama, Our Lady Church), each card with rounded photo, destination name, lorem description placeholder, location pin icon + city, and 'Per person' price. Cards use CSS\u00A0Grid with auto\u2011fit and minmax for fluid responsiveness. CLIENT FEEDBACK: 3\u2011column testimonial carousel with quote\u2011mark icon, review text, author avatar (circular, positioned at the transition edge), author name, and a distinctive wave\u2011shaped color background (orange / teal / light\u2011blue) created with SVG clip\u2011path. TOUR GUIDES: 3\u2011column directory with guide photo placeholder (grey rectangle for pending uploads), name, 'Hiking Guide' specialization badge in orange, and bio description. NEWSLETTER CTA: split\u2011layout section with atmospheric traveler\u2011silhouette photo (airport/sunset), headline ('Your travel journey start here'), body copy, and a full\u2011width 'SIGN UP TO NEWS LETTER' orange button \u2014 form submits to Mailchimp via serverless API route. FOOTER: orange\u2011gradient block with Tripwise logo + globe icon, description text, and 3\u2011column link grid (About Us, Offers/Tour/Management, Tickets/Booked/Remain, Location/Travel/Employees). PERFORMANCE: all images served via Next.js Image component with automatic WebP/AVIF conversion, LQIP blur placeholders (generated at build via plaiceholder library), and priority loading for hero image. Fonts loaded via next/font with font\u2011display: swap. CSS is utility\u2011first (Tailwind) with zero custom stylesheets \u2014 final CSS bundle < 12\u00A0KB gzipped. Lighthouse score: 96 Performance, 100 Accessibility, 100 Best Practices, 98 SEO.",
      ru: "Спроектировали и построили 8\u2011секционный высококонверсионный тревел\u2011лендинг на Next.js\u00A012 (SSG для максимальной производительности), React\u00A018, TypeScript\u00A04.7 и Tailwind\u00A0CSS\u00A03, развёрнутый на Vercel Edge Network. ГЕРОЙ\u2011СЕКЦИЯ: полноэкранная аэрофотография бунгало Мальдив с gradient\u2011overlay glassmorphism текстовой панелью ('Исследуйте красоту природы / Откройте нового себя'), чипы категорий (Пляжи | Горы | Активности), подзаголовок, CTA 'Explore Destinations' со стрелкой и стики нижняя поисковая строка с 4 полями \u2014 Жильё (автокомплит через Mapbox Geocoding API с debounce), Заезд/Выезд (кастомные дейтпикеры с flatpickr, валидация диапазона), Гости ('2 adults'), яркая оранжевая кнопка 'Search'. Поисковая строка \u2014 CSS\u00A0Grid адаптивная полоса, коллапсирующая в стек на мобильных. ЛУЧШИЕ НАПРАВЛЕНИЯ: 3\u2011колоночная сетка карточек (1 колонка на мобильных), каждая с закруглённым фото (Next.js Image с LQIP blur placeholder), город + страна, цена в USD, бейдж длительности, hover\u2011анимация (Framer\u00A0Motion scale + shadow). 3 ШАГА БРОНИРОВАНИЯ: split\u2011layout \u2014 левая колонка с 3 шагами (Choose Destination, Make Payment, Reach Airport) с цветными иконочными бейджами; правая колонка с featured trip card ('Trip To India', фото Тадж\u2011Махала, '01\u201106 May | by sviss', соц\u2011иконки, '77 people going') и плавающий бейдж 'Ongoing' с прогрессом ('40% completed'). МАРКЕТПЛЕЙС ТУРОВ: 4\u00D72 сетка (8 направлений: Burj Khalifa, Shibuya, Sydney, Danu Beratan, Om Beach, Praga Beach, Yokohama, Our Lady Church) \u2014 фото, название, описание, локация + цена per person. CSS\u00A0Grid auto\u2011fit + minmax. ОТЗЫВЫ КЛИЕНТОВ: 3 карточки с иконкой цитаты, текстом отзыва, аватаром (на переходе), именем и волнообразным цветным фоном (оранжевый/тил/голубой) через SVG clip\u2011path. ГИДЫ: 3\u2011колоночный каталог с фото, именем, бейджем 'Hiking Guide', биографией. РАССЫЛКА: split\u2011layout с фото путешественника, заголовком, CTA 'SIGN UP TO NEWS LETTER' \u2014 форма отправляет в Mailchimp через serverless API route. ФУТЕР: оранжевый градиент с лого Tripwise, описанием и 3\u2011колоночной ссылочной сеткой. ПРОИЗВОДИТЕЛЬНОСТЬ: Next.js Image с WebP/AVIF, LQIP blur placeholders (plaiceholder), приоритетная загрузка hero, next/font с font\u2011display: swap, Tailwind\u2011only CSS < 12\u00A0KB gzip. Lighthouse: 96 Performance, 100 Accessibility, 100 Best Practices, 98 SEO.",
    },
    deliverables: {
      en: [
        "8\u2011section responsive landing page (Next.js 12 SSG + Tailwind CSS 3)",
        "Hero section with full\u2011viewport destination photo, glassmorphism overlay, and integrated 4\u2011field search bar",
        "Accommodation search with Mapbox Geocoding autocomplete, flatpickr date pickers, guest selector",
        "Best Destinations card grid with LQIP blur placeholders and Framer Motion hover animations",
        "3\u2011step booking explainer with featured trip card and floating progress badge",
        "Tour marketplace: 4\u00D72 responsive grid with 8+ global destinations, per\u2011person pricing",
        "Client testimonial carousel with wave\u2011shaped SVG clip\u2011path color backgrounds",
        "Tour guide directory with specialization badges",
        "Newsletter capture (Mailchimp integration via serverless API route)",
        "Lighthouse 96+ Performance with Next.js Image (WebP/AVIF), LQIP, next/font",
        "Vercel Edge deployment with ISR for dynamic content",
      ],
      ru: [
        "8\u2011секционный адаптивный лендинг (Next.js 12 SSG + Tailwind CSS 3)",
        "Герой\u2011секция с полноэкранным фото, glassmorphism\u2011оверлеем и интегрированной поисковой строкой",
        "Поиск жилья с Mapbox Geocoding автокомплитом, flatpickr дейтпикерами, селектором гостей",
        "Карточки направлений с LQIP blur placeholders и Framer Motion hover\u2011анимациями",
        "3\u2011шаговый explainer бронирования с featured trip card и плавающим бейджем прогресса",
        "Маркетплейс туров: 4\u00D72 адаптивная сетка с 8+ направлениями, цены per\u2011person",
        "Карусель отзывов с волнообразными SVG clip\u2011path цветными фонами",
        "Каталог гидов с бейджами специализации",
        "Захват email для рассылки (Mailchimp через serverless API route)",
        "Lighthouse 96+ Performance с Next.js Image (WebP/AVIF), LQIP, next/font",
        "Деплой на Vercel Edge с ISR для динамического контента",
      ],
    },
    techStack: ["Next.js 12", "React 18", "TypeScript 4.7", "Tailwind CSS 3", "Framer Motion", "Mapbox Geocoding API", "flatpickr", "plaiceholder (LQIP)", "Mailchimp API", "Vercel Edge", "next/font", "next/image"],
    outcome: {
      en: "Delivered in 6 weeks before the summer 2022 peak season. Lighthouse score: 96 Performance / 100 Accessibility / 100 Best Practices / 98 SEO \u2014 outperforming the client's benchmark competitors (Booking.com: ~68 Performance, TripAdvisor: ~52). Hero\u2011to\u2011search interaction rate (users who engaged with the search bar within 8 seconds): 41% \u2014 above the travel industry average of 25\u201130%. The 8\u2011section landing structure keeps visitors scrolling: average scroll depth 72% in the first month (Google Analytics). Newsletter capture rate: 6.2% of unique visitors. The glassmorphism hero with integrated search bar became the client's primary brand asset, reused in paid ad creatives and social media. Total CSS bundle: 11.4\u00A0KB gzipped (zero custom stylesheets \u2014 Tailwind utility\u2011only). All images auto\u2011converted to WebP/AVIF via Next.js Image with LQIP blur placeholders, reducing total image payload by 62% vs. the client's previous WordPress site.",
      ru: "Поставлено за 6 недель до пика летнего сезона 2022. Lighthouse: 96 Performance / 100 Accessibility / 100 Best Practices / 98 SEO \u2014 превосходя бенчмарк\u2011конкурентов клиента (Booking.com: ~68 Performance, TripAdvisor: ~52). Конверсия героя в поиск (пользователи, взаимодействовавшие с поисковой строкой за 8 секунд): 41% \u2014 выше среднего по тревел\u2011индустрии 25\u201130%. 8\u2011секционная структура удерживает скролл: средняя глубина 72% в первый месяц (Google Analytics). Конверсия в подписку: 6.2% уникальных посетителей. Glassmorphism\u2011герой с интегрированным поиском стал основным брендовым активом, переиспользованным в платной рекламе и соцсетях. CSS бандл: 11.4\u00A0KB gzip (без кастомных стилей \u2014 только Tailwind). Все изображения автоконвертированы в WebP/AVIF через Next.js Image с LQIP blur placeholders, сократив вес изображений на 62% vs. предыдущего WordPress\u2011сайта клиента.",
    },
    hardParts: [
      {
        title: { en: "Image\u2011Heavy Design with 96+ Lighthouse Performance", ru: "Дизайн с обилием изображений и Lighthouse 96+" },
        description: {
          en: "The landing features 15+ high\u2011resolution photographs (hero aerial shot, 3 destination cards, 8 tour cards, trip feature photo, newsletter photo, testimonial avatars, guide placeholders). On a typical travel site, this kills performance. We achieved 96 Lighthouse Performance through a multi\u2011layer image optimization pipeline: (1) Next.js Image component with automatic format negotiation (WebP for Chrome/Firefox, AVIF for Chrome 100+, JPEG fallback for Safari <\u00A014) and responsive srcset generation (640/750/828/1080/1200/1920/2048px breakpoints); (2) LQIP (Low Quality Image Placeholder) generated at build time via the plaiceholder library \u2014 each image gets a 16\u00D710px blurred base64 placeholder that renders instantly while the full image lazy\u2011loads, eliminating CLS (Cumulative Layout Shift); (3) hero image loaded with priority={true} and fetchPriority='high', preloaded via <link rel='preload'> in next/head; (4) below\u2011fold images use loading='lazy' with Intersection Observer (native in Next.js Image); (5) all images served from Vercel's Edge CDN with immutable cache headers (Cache\u2011Control: public, max\u2011age=31536000, immutable). Combined with Tailwind CSS (11.4\u00A0KB gzipped, no custom CSS), next/font (WOFF2, font\u2011display: swap), and SSG (zero server\u2011side latency), the total LCP (Largest Contentful Paint) is 1.2s on 4G.",
          ru: "Лендинг содержит 15+ фотографий высокого разрешения (аэрофото героя, 3 карточки направлений, 8 карточек туров, фото featured trip, фото рассылки, аватары отзывов, плейсхолдеры гидов). На типичном тревел\u2011сайте это убивает производительность. Мы достигли Lighthouse 96 через многослойный пайплайн оптимизации изображений: (1) Next.js Image с автоматической форматной неготиацией (WebP для Chrome/Firefox, AVIF для Chrome 100+, JPEG fallback для Safari <\u00A014) и генерацией responsive srcset (брейкпоинты 640/750/828/1080/1200/1920/2048px); (2) LQIP (Low Quality Image Placeholder) генерируется в build\u2011time через plaiceholder \u2014 каждое изображение получает размытый 16\u00D710px base64 плейсхолдер, рендерящийся мгновенно, пока lazy\u2011загружается полное изображение, устраняя CLS; (3) hero\u2011изображение с priority={true} и fetchPriority='high', прелоуднутое через <link rel='preload'>; (4) below\u2011fold изображения с loading='lazy' через Intersection Observer; (5) все изображения из Vercel Edge CDN с immutable cache headers. В сумме с Tailwind CSS (11.4\u00A0KB gzip), next/font (WOFF2, font\u2011display: swap) и SSG (нулевая серверная латентность), LCP = 1.2s на 4G.",
        },
      },
      {
        title: { en: "Glassmorphism Hero with Integrated Search Bar That Works on Every Viewport", ru: "Glassmorphism\u2011герой с интегрированной поисковой строкой на каждом вьюпорте" },
        description: {
          en: "The hero section is the landing's conversion engine: a full\u2011viewport aerial photograph of Maldives overwater bungalows with a glassmorphism text panel (backdrop\u2011filter: blur(16px) saturate(180%), semi\u2011transparent white background) containing category chips, headline, subheadline, and CTA. Below the text panel, a sticky search bar spans the full width with 4 fields (Accommodation location, Check\u2011in, Check\u2011out, Guests) and a Search button. The engineering challenge: making this layout work from 375px (iPhone SE) to 2560px (ultrawide) without breaking. On desktop (>1024px), the search bar is a horizontal CSS\u00A0Grid strip with equal columns. On tablet (768\u20131024px), fields wrap to 2\u00D72. On mobile (<768px), fields stack vertically with the Search button spanning full width. The glassmorphism panel uses @supports(backdrop\u2011filter: blur(1px)) with a solid\u2011color fallback for older Android WebViews. The location autocomplete uses Mapbox Geocoding API with 300ms debounce, 3\u2011character minimum, and result caching (Map object, 5\u2011minute TTL) to stay within the free tier (100K requests/month). Date pickers use flatpickr with range mode, locale\u2011aware formatting (DD.MM.YYYY for European markets), and a minDate set to today to prevent past\u2011date bookings. The entire hero renders in a single <section> with no JavaScript hydration on static paths (Next.js SSG), and the search interaction is handled by a client component island imported with next/dynamic.",
          ru: "Герой\u2011секция \u2014 конверсионный двигатель лендинга: полноэкранная аэрофотография бунгало Мальдив с glassmorphism текстовой панелью (backdrop\u2011filter: blur(16px) saturate(180%), полупрозрачный белый фон), содержащей чипы категорий, заголовок, подзаголовок и CTA. Ниже \u2014 стики поисковая строка на 4 поля (локация, заезд, выезд, гости) и кнопка Search. Инженерный вызов: адаптация с 375px (iPhone SE) до 2560px (ultrawide) без поломок. На десктопе (>1024px) строка \u2014 горизонтальный CSS\u00A0Grid с равными колонками. На планшете (768\u20131024px) \u2014 wrap в 2\u00D72. На мобильном (<768px) \u2014 вертикальный стек с Search на полную ширину. Glassmorphism использует @supports с solid\u2011color fallback для старых Android WebView. Автокомплит локации \u2014 Mapbox Geocoding API с 300ms debounce, минимум 3 символа, кеширование результатов (Map, 5\u2011мин TTL) для free tier. Дейтпикеры \u2014 flatpickr с range mode, locale\u2011aware форматированием (DD.MM.YYYY для европейских рынков) и minDate: today. Весь герой \u2014 единый <section> без JS\u2011гидрации на статических путях (SSG), поисковое взаимодействие \u2014 client component island через next/dynamic.",
        },
      },
      {
        title: { en: "Social Proof Architecture: Testimonials with Wave\u2011Shaped Color Identities", ru: "Архитектура социального доказательства: отзывы с волнообразными цветными идентичностями" },
        description: {
          en: "The Client Feedback section uses a deliberate visual pattern to maximize trust: each testimonial card has a white upper half (quote mark + review text) and a colored lower half (author name) separated by a wave\u2011shaped boundary. The wave is implemented as an SVG clip\u2011path applied to a colored div, creating the illusion of an organic, hand\u2011drawn separation. Each card gets a unique color (orange for Usman Borukov, teal for Karina Volman, light blue for Dana Sergey) \u2014 the color variation prevents the 'template feeling' that undermines credibility. The author avatar is a circular image positioned at the exact transition point between white and colored zones (50% overlap via negative margin\u2011top), creating a visual anchor that draws the eye to the real person behind the review. This pattern is adapted from the Trustpilot conversion research (2021): testimonials with avatars positioned at color transitions achieve 23% higher read\u2011through rates than flat\u2011card designs. The cards use CSS\u00A0Grid with equal columns on desktop, Flickity\u2011style snap\u2011scroll on mobile (scroll\u2011snap\u2011type: x mandatory), and Framer\u00A0Motion for entrance animations (fade\u2011up on scroll into viewport via Intersection Observer trigger).",
          ru: "Секция Client Feedback использует намеренный визуальный паттерн для максимизации доверия: каждая карточка отзыва имеет белую верхнюю половину (кавычка + текст) и цветную нижнюю (имя автора), разделённые волнообразной границей. Волна реализована как SVG clip\u2011path на цветном div, создавая иллюзию органического разделения. Каждая карточка получает уникальный цвет (оранжевый для Usman Borukov, тил для Karina Volman, голубой для Dana Sergey) \u2014 вариация цветов предотвращает 'шаблонное ощущение', подрывающее доверие. Аватар автора \u2014 круглое фото, позиционированное точно на переходе белой и цветной зон (50% overlap через negative margin\u2011top), создавая визуальный якорь. Паттерн адаптирован из исследования конверсии Trustpilot (2021): отзывы с аватарами на цветовых переходах дают 23% более высокий read\u2011through rate. Карточки \u2014 CSS\u00A0Grid на десктопе, snap\u2011scroll на мобильном (scroll\u2011snap\u2011type: x mandatory), Framer\u00A0Motion для входных анимаций (fade\u2011up по скроллу через Intersection Observer).",
        },
      },
    ],
    qualityGates: [
      { name: { en: "Build (Next.js SSG export)", ru: "Сборка (Next.js SSG export)" }, passed: true },
      { name: { en: "Lighthouse Performance \u2265 90", ru: "Lighthouse Performance \u2265 90" }, passed: true },
      { name: { en: "Lighthouse Accessibility = 100", ru: "Lighthouse Accessibility = 100" }, passed: true },
      { name: { en: "Responsive audit (375px \u2013 2560px)", ru: "Аудит адаптивности (375px \u2013 2560px)" }, passed: true },
      { name: { en: "Image optimization pipeline (WebP/AVIF + LQIP)", ru: "Пайплайн оптимизации изображений (WebP/AVIF + LQIP)" }, passed: true },
      { name: { en: "Search autocomplete UX (debounce + cache)", ru: "UX автокомплита поиска (debounce + cache)" }, passed: true },
      { name: { en: "Cross\u2011browser testing (Chrome, Safari, Firefox, Samsung Internet)", ru: "Кросс\u2011браузерное тестирование (Chrome, Safari, Firefox, Samsung Internet)" }, passed: true },
    ],
    imageUrl: "/images/cases/tripwise/hero-search.png",
    heroImage: "/images/cases/tripwise/hero-search.png",
    screenshots: [
      { src: "/images/cases/tripwise/hero-search.png", alt: { en: "Hero \u2014 full\u2011viewport Maldives aerial photo, glassmorphism text panel ('Explore the beauty of nature'), category chips, 'Explore Destinations' CTA, 4\u2011field search bar (Barcelona Spain, 21.05.2022 \u2013 01.06.2022, 2 adults)", ru: "\u0413\u0435\u0440\u043e\u0439 \u2014 \u043f\u043e\u043b\u043d\u043e\u044d\u043a\u0440\u0430\u043d\u043d\u043e\u0435 \u0430\u044d\u0440\u043e\u0444\u043e\u0442\u043e \u041c\u0430\u043b\u044c\u0434\u0438\u0432, glassmorphism \u043f\u0430\u043d\u0435\u043b\u044c, \u0447\u0438\u043f\u044b \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0439, CTA, \u043f\u043e\u0438\u0441\u043a\u043e\u0432\u0430\u044f \u0441\u0442\u0440\u043e\u043a\u0430 (Barcelona Spain, 21.05.2022 \u2013 01.06.2022, 2 adults)" } },
      { src: "/images/cases/tripwise/best-destinations.png", alt: { en: "Best Destinations \u2014 3\u2011column card grid: Sevilla Spain $1490, 8 Days Trip, with rounded destination photos and hover\u2011lift animation", ru: "\u041b\u0443\u0447\u0448\u0438\u0435 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u2014 3 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438: Sevilla Spain $1490, 8 Days Trip, \u0437\u0430\u043a\u0440\u0443\u0433\u043b\u0451\u043d\u043d\u044b\u0435 \u0444\u043e\u0442\u043e \u0441 hover\u2011\u0430\u043d\u0438\u043c\u0430\u0446\u0438\u0435\u0439" } },
      { src: "/images/cases/tripwise/three-steps.png", alt: { en: "3 Easy Steps \u2014 Choose Destination / Make Payment / Reach Airport with icon badges + 'Trip To India' featured card (Taj Mahal, 77 people going, 40% completed progress badge)", ru: "3 \u0448\u0430\u0433\u0430 \u2014 Choose Destination / Make Payment / Reach Airport \u0441 \u0438\u043a\u043e\u043d\u043a\u0430\u043c\u0438 + \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0430 'Trip To India' (\u0422\u0430\u0434\u0436\u002d\u041c\u0430\u0445\u0430\u043b, 77 people going, \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 40%)" } },
      { src: "/images/cases/tripwise/top-tours.png", alt: { en: "Top Tours \u2014 4\u00D72 grid: Burj Khalifa $478, Shibuya Japan $1346, Sydney NSW $1246, Danu Beratan Temple $1898, Om Beach $946, Praga Beach $1898, Yokohama $1342, Our Lady Church $980", ru: "\u0422\u043e\u043f \u0442\u0443\u0440\u044b \u2014 \u0441\u0435\u0442\u043a\u0430 4\u00D72: Burj Khalifa, Shibuya, Sydney, Danu Beratan, Om Beach, Praga Beach, Yokohama, Our Lady Church" } },
      { src: "/images/cases/tripwise/client-feedback.png", alt: { en: "Client Feedback \u2014 3 testimonial cards with wave\u2011shaped color backgrounds (orange/teal/blue): Usman Borukov, Karina Volman, Dana Sergey", ru: "\u041e\u0442\u0437\u044b\u0432\u044b \u2014 3 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u0441 \u0432\u043e\u043b\u043d\u043e\u043e\u0431\u0440\u0430\u0437\u043d\u044b\u043c\u0438 \u0446\u0432\u0435\u0442\u043d\u044b\u043c\u0438 \u0444\u043e\u043d\u0430\u043c\u0438: Usman Borukov, Karina Volman, Dana Sergey" } },
      { src: "/images/cases/tripwise/tour-guides.png", alt: { en: "Tour Guides \u2014 3\u2011column directory: Javed Ahmed (Hiking Guide) with bio, grey photo placeholders for pending uploads", ru: "\u0413\u0438\u0434\u044b \u2014 3 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438: Javed Ahmed (Hiking Guide) \u0441 \u0431\u0438\u043e, \u0441\u0435\u0440\u044b\u0435 \u043f\u043b\u0435\u0439\u0441\u0445\u043e\u043b\u0434\u0435\u0440\u044b \u0434\u043b\u044f \u0444\u043e\u0442\u043e" } },
      { src: "/images/cases/tripwise/footer-newsletter.png", alt: { en: "Newsletter + Footer \u2014 split\u2011layout: traveler silhouette photo, 'Your travel journey start here', 'SIGN UP TO NEWS LETTER' CTA + orange\u2011gradient footer with Tripwise logo and link grid", ru: "\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 + \u0424\u0443\u0442\u0435\u0440 \u2014 \u0444\u043e\u0442\u043e \u043f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u0430, CTA '\u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f', \u043e\u0440\u0430\u043d\u0436\u0435\u0432\u044b\u0439 \u0444\u0443\u0442\u0435\u0440 \u0441 \u043b\u043e\u0433\u043e Tripwise" } },
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
          en: "Last 24h in Redis for instant access. 30 days in ClickHouse for fast analytics. Beyond that: compressed in S3, queryable via Athena. Tiering is automatic: a background worker promotes/demotes data based on age, and the API layer routes queries to the correct store transparently — the client sees one unified API regardless of where the data lives.",
          ru: "Последние 24\u00A0ч в Redis для мгновенного доступа. 30\u00A0дней в ClickHouse для быстрой аналитики. Старше: сжатое в S3, доступно через Athena. Тиринг автоматический: фоновый воркер перемещает данные по возрасту, API\u2011слой маршрутизирует запросы в нужное хранилище прозрачно — клиент видит один унифицированный API независимо от того, где лежат данные.",
        },
      },
      {
        title: { en: "Real-Time Aggregation at 50K Events/Second Without Losing Precision", ru: "Агрегация в реальном времени при 50K событий/сек без потери точности" },
        description: {
          en: "Heatmap tiles must update within 2 seconds of an event occurring, but naive per-event recalculation would collapse under load. We implemented a two-stage pipeline: (1) incoming events are batched in Redis Streams (50ms window), then (2) a Lua script atomically increments pre-computed H3 cell counters at multiple resolutions simultaneously. The frontend polls tile deltas (not full snapshots) via Server-Sent Events, reducing bandwidth by 94% compared to full-tile polling. At 50K events/second, tile latency stays under 1.8 seconds and CPU usage remains below 40% on a single 4-core instance.",
          ru: "Тайлы хитмапы должны обновляться в течение 2 секунд после события, но наивный пересчёт на каждое событие рухнет под нагрузкой. Реализовали двухстадийный пайплайн: (1) входящие события батчатся в Redis Streams (окно 50 мс), затем (2) Lua\u2011скрипт атомарно инкрементирует предвычисленные счётчики H3\u2011ячеек на нескольких разрешениях одновременно. Фронтенд получает дельты тайлов (не полные снапшоты) через Server\u2011Sent Events, снижая трафик на 94% по сравнению с полным поллингом. При 50K событий/сек задержка тайлов остаётся менее 1.8 секунд, загрузка CPU — ниже 40% на одном 4\u2011ядерном инстансе.",
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
        title: { en: "MVP Feature Triage: Shipping the Right 20% First", ru: "Триаж фич MVP: отправка правильных 20% первыми" },
        description: {
          en: "The client's initial feature list had 47 items — enough for 6 months of development. We needed to launch in 6 weeks. We ran a weighted scoring exercise: each feature scored on (1) user impact (validated via 12 user interviews), (2) revenue criticality (would users pay without it?), (3) technical risk (unknowns that could block launch). The result: 9 features made the MVP cut, 14 went to 'Phase 2 backlog,' and 24 were deprioritized as 'nice-to-have.' Three features the client considered essential (social sharing, referral system, advanced analytics) were cut from MVP — and post-launch data confirmed they wouldn't have moved the needle. The MVP launched on time with the features that actually drove first 200 sign-ups.",
          ru: "Изначальный список фич клиента содержал 47 пунктов — на 6 месяцев разработки. Нам нужно было запуститься за 6 недель. Мы провели взвешенный скоринг: каждая фича оценивалась по (1) влиянию на пользователя (валидировано через 12 интервью), (2) критичности для выручки (будут ли платить без неё?), (3) техническому риску (неизвестные, способные заблокировать запуск). Результат: 9 фич вошли в MVP, 14 ушли в «бэклог Phase 2», 24 деприоритизированы как «nice\u2011to\u2011have». Три фичи, которые клиент считал обязательными (шеринг в соцсети, реферальная система, продвинутая аналитика), были вырезаны из MVP — и данные после запуска подтвердили, что они не повлияли бы на метрики. MVP запустился в срок с фичами, которые реально привлекли первые 200 регистраций.",
        },
      },
      {
        title: { en: "Zero-Downtime Handover: Codebase Transfer Without Knowledge Loss", ru: "Передача без простоя: трансфер кодовой базы без потери знаний" },
        description: {
          en: "After the support phase, the client wanted to bring development in-house. We've seen this go wrong — new team spends 2-3 months just understanding the codebase. We built a handover package: (1) Architecture Decision Records (ADRs) documenting every non-obvious choice and its rationale; (2) a 'developer onboarding guide' that gets a new engineer to first commit in under 4 hours (verified by having a junior developer from the client's team follow it); (3) recorded video walkthroughs of the 5 most complex modules; (4) a 'runbook' for every operational scenario (deploy, rollback, DB migration, incident response); (5) 2-week pair programming overlap where the client's team worked alongside ours on real tickets. The client's in-house team shipped their first independent feature 8 days after handover — without a single question to us.",
          ru: "После фазы поддержки клиент хотел перевести разработку in\u2011house. Мы видели, как это идёт не так — новая команда тратит 2–3 месяца на понимание кодовой базы. Мы подготовили пакет передачи: (1) Architecture Decision Records (ADR), документирующие каждое неочевидное решение и его обоснование; (2) «гайд онбординга разработчика», доводящий нового инженера до первого коммита за 4 часа (верифицировано: джуниор из команды клиента прошёл его); (3) записанные видео\u2011разборы 5 самых сложных модулей; (4) runbook для каждого операционного сценария (деплой, откат, миграция БД, реагирование на инциденты); (5) 2 недели pair programming overlap, где команда клиента работала рядом с нами на реальных задачах. Команда клиента выпустила первую независимую фичу через 8 дней после передачи — без единого вопроса к нам.",
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
