// Общие данные для всех КП — оплата, FAQ, гарантия, что входит и т.д.
// Если что-то нужно сделать template-specific — добавляй в kp-templates.ts.

import type { TemplateId } from './kp-templates';
import type { L } from './i18n-text';

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
export type LocalizedString = L;

export type Testimonial = {
  quote: LocalizedString;
  author: LocalizedString;
  role: LocalizedString;
  // Initials follow the locale so the avatar shows АК in Russian and AK in
  // English — keeps the typography native to the reader's alphabet.
  initials?: LocalizedString;
};

// Реальные отзывы клиентов. Подтверждены клиентами в 2026.
// NDA-клиенты идентифицируются через должность + индустрию + город (без имени компании).
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      ru: 'До Anteyko мы собирали согласия учеников на бумаге и переживали о юридической силе цифровых акцептов — большинство IT-подрядчиков предлагали внешние сервисы ЭП за сотни долларов в месяц. Anteyko сделали свою архитектуру акцепта с аудит-трейлом и PDF с печатью директора, которая полностью соответствует Гражданскому кодексу КР, — за 2 недели. Бумажный процесс закрыли полностью.',
      zh: "在 Anteyko 之前，我们的学生同意书都是纸质收集的，而且一直担心电子确认的法律效力——大多数 IT 外包商推荐的是第三方电子签名服务，每月要花数百美元。Anteyko 自主设计了一套带审计追踪的确认架构，并生成加盖董事印章的 PDF，完全符合《吉尔吉斯共和国民法典》——只用了 2 周。纸质流程已彻底取消。",
      tr: "Anteyko'dan önce öğrenci onaylarını kâğıt üzerinde topluyor ve dijital kabulün hukuki geçerliliği konusunda endişe duyuyorduk; çoğu BT yüklenicisi ayda yüzlerce dolarlık harici e-imza hizmetleri öneriyordu. Anteyko, denetim izi (audit trail) ve müdürün mührünü taşıyan bir PDF içeren kendi onay mimarisini kurdu; bu mimari Kırgız Cumhuriyeti Medeni Kanunu'na tam uyumlu ve işi 2 haftada teslim ettiler. Kâğıt süreci tamamen kapandı.",
      ar: "قبل Anteyko كنا نجمع موافقات الطلاب على الورق، وكان يقلقنا مدى الصلاحية القانونية للقبول الرقمي، إذ عرضت علينا معظم شركات تقنية المعلومات خدمات توقيع إلكتروني خارجية بمئات الدولارات شهريًا. أما Anteyko فقد بنت بنية قبول خاصة بها مع سجل تدقيق وملف PDF بختم المدير، تتوافق تمامًا مع القانون المدني لجمهورية قرغيزستان، وذلك خلال أسبوعين. وأُغلقت العملية الورقية بالكامل.",
      en: 'Before Anteyko we collected student consents on paper and worried about the legal validity of digital acceptance — most IT contractors offered external e-signature services at hundreds of dollars per month. Anteyko built their own acceptance architecture with an audit trail and a PDF with the director\'s seal that fully complies with the Civil Code of the Kyrgyz Republic — in 2 weeks. The paper process is closed entirely.',
    },
    author: { ru: 'Адина Какешова', zh: "Adina Kakeshova", tr: "Adina Kakeshova", ar: "أدينا كاكيشوفا", en: 'Adina Kakeshova' },
    role: { ru: 'Основатель, TRM, Бишкек', zh: "创始人，TRM，比什凯克", tr: "Kurucu, TRM, Bişkek", ar: "المؤسِّسة، TRM، بيشكيك", en: 'Founder, TRM, Bishkek' },
    initials: { ru: 'АК', zh: "AK", tr: "AK", ar: "AK", en: 'AK' },
  },
  {
    quote: {
      ru: 'В 2023 Дубай только что закодифицировал VARA-регуляции, и нам нужно было запустить платформу токенизации до Q3 — с полным KYC/AML, ончейн-распределением токенов и аудит-трейлом. Большинство подрядчиков либо предлагали нерегулируемые DeFi-шаблоны из 2021 года, либо просили 6+ месяцев. Anteyko уложились в 12 недель, полностью соответствуя VARA. Private Sale стартовал в срок — без них этого не случилось бы.',
      zh: "2023 年，迪拜刚刚将 VARA 监管法规成文化，而我们需要在第三季度前上线一个代币化平台——具备完整的 KYC/AML、链上代币分发和审计追踪。大多数承包商要么提供 2021 年那种不合规的 DeFi 模板，要么要求 6 个月以上的工期。Anteyko 用 12 周完成交付，并完全符合 VARA 要求。Private Sale 按计划启动——没有他们，这件事不可能成功。",
      tr: "2023'te Dubai VARA düzenlemelerini yeni yasalaştırmıştı ve 3. çeyreğe kadar tam KYC/AML, zincir üstü token dağıtımı ve denetim izi içeren bir tokenizasyon platformu başlatmamız gerekiyordu. Çoğu yüklenici ya 2021'den kalma denetimsiz DeFi şablonları önerdi ya da 6 aydan fazla süre istedi. Anteyko 12 haftada, tamamen VARA uyumlu şekilde teslim etti. Private Sale zamanında başladı; onlar olmasaydı gerçekleşmezdi.",
      ar: "في عام 2023 كانت دبي قد أقرّت للتو لوائح VARA، وكنا بحاجة إلى إطلاق منصة للترميز قبل الربع الثالث، مع التحقق الكامل KYC/AML، وتوزيع الرموز على السلسلة، وسجل تدقيق. وقد عرضت معظم الشركات إما قوالب DeFi غير منظَّمة تعود إلى عام 2021، أو طلبت أكثر من 6 أشهر. أما Anteyko فسلّمت في 12 أسبوعًا وبامتثال كامل لـ VARA. وانطلق البيع الخاص في موعده، ومن دونهم ما كان ذلك ليحدث.",
      en: 'In 2023 Dubai had just codified VARA regulations, and we needed to launch a tokenization platform by Q3 — with full KYC/AML, on-chain token distribution, and an audit trail. Most contractors either offered unregulated DeFi templates from 2021 or asked for 6+ months. Anteyko delivered in 12 weeks, fully VARA-compliant. The Private Sale launched on schedule — without them, it wouldn\'t have happened.',
    },
    author: { ru: 'Bazan', zh: "Bazan", tr: "Bazan", ar: "بازان", en: 'Bazan' },
    role: {
      ru: 'CEO, KUT Energy Investments, Dubai',
      zh: "CEO，KUT Energy Investments，迪拜",
      tr: "CEO, KUT Energy Investments, Dubai",
      ar: "الرئيس التنفيذي، KUT Energy Investments، دبي",
      en: 'CEO, KUT Energy Investments, Dubai',
    },
    initials: { ru: 'BZ', zh: "BZ", tr: "BZ", ar: "BZ", en: 'BZ' },
  },
  {
    quote: {
      ru: 'Мы хотели кошелёк, который ощущается как банковское приложение — интуитивно как Revolut, но со встроенным трейдингом и аналитикой расходов. Trust Wallet и Coinbase Wallet слишком технические для нашей аудитории. Anteyko полностью спроектировали и реализовали 26+ экранов с UX уровня банковского приложения и спрятали под капотом non-custodial архитектуру с шифрованием. На App Store запустились без единого ревью-rejection.',
      zh: "我们想要一款用起来像银行应用的钱包——像 Revolut 一样直观，同时内置交易和消费分析。Trust Wallet 和 Coinbase Wallet 对我们的用户来说过于技术化。Anteyko 设计并开发了 26 个以上的界面，拥有银行级应用的用户体验，并在底层隐藏了带加密的非托管架构。我们在 App Store 上线时，没有遭遇一次审核被拒。",
      tr: "Bankacılık uygulaması gibi hissettiren bir cüzdan istiyorduk: Revolut kadar sezgisel, ama yerleşik alım satım ve harcama analitiğiyle. Trust Wallet ve Coinbase Wallet hedef kitlemiz için fazla teknik. Anteyko, bankacılık uygulaması kalitesinde UX'e sahip 26'dan fazla ekranı tasarlayıp geliştirdi ve kaputun altına şifrelemeli, non-custodial bir mimari gizledi. App Store'da tek bir ret yaşamadan yayına çıktık.",
      ar: "أردنا محفظة تبدو كتطبيق مصرفي، بديهية كما في Revolut، لكن مع تداول مدمج وتحليلات للإنفاق. فمحفظتا Trust Wallet وCoinbase Wallet أكثر تقنيةً مما يناسب جمهورنا. صمّمت Anteyko ونفّذت أكثر من 26 شاشة بتجربة استخدام بمستوى التطبيقات المصرفية، وأخفت تحت الغطاء بنية non-custodial مع تشفير. وأطلقنا التطبيق على App Store دون أي رفض واحد في المراجعة.",
      en: 'We wanted a wallet that feels like a banking app — intuitive like Revolut, but with built-in trading and spending analytics. Trust Wallet and Coinbase Wallet are too technical for our audience. Anteyko designed and built 26+ screens with banking-app-grade UX and hid a non-custodial architecture with encryption under the hood. We launched on the App Store without a single review rejection.',
    },
    author: { ru: 'Alexander', zh: "Alexander", tr: "Alexander", ar: "ألكسندر", en: 'Alexander' },
    role: {
      ru: 'CEO, KUT Resources AG, Zurich',
      zh: "CEO，KUT Resources AG，苏黎世",
      tr: "CEO, KUT Resources AG, Zürih",
      ar: "الرئيس التنفيذي، KUT Resources AG، زيورخ",
      en: 'CEO, KUT Resources AG, Zurich',
    },
    initials: { ru: 'AL', zh: "AL", tr: "AL", ar: "AL", en: 'AL' },
  },
  {
    quote: {
      ru: 'Нам нужна была банковская платформа production-grade с нуля: транзакционный леджер с ACID-гарантиями, четыре платёжных провайдера за одним API, sub-200ms response time на агрегацию баланса. Команда Anteyko не просто написала код — они сделали инженерное решение архитектурного уровня: двойная запись, idempotency keys, JWT rotation, 87% покрытие тестами, всё вышло в продакшен без единого критического инцидента в первом квартале после запуска.',
      zh: "我们需要从零搭建一个生产级的银行平台：具备 ACID 保证的交易账本、统一 API 之后的四家支付服务商、余额聚合响应时间低于 200 毫秒。Anteyko 团队不只是写代码——他们交付的是架构层面的工程方案：复式记账、幂等键、JWT 轮换、87% 的测试覆盖率。所有内容顺利上线生产，上线后的第一个季度没有出现任何一次严重事故。",
      tr: "Sıfırdan, production seviyesinde bir bankacılık platformuna ihtiyacımız vardı: ACID garantili bir işlem defteri (ledger), tek bir API arkasında dört ödeme sağlayıcı, bakiye toplamada 200 ms altı yanıt süresi. Anteyko ekibi yalnızca kod yazmadı; mimari seviyede bir mühendislik çözümü sundu: çift kayıt, idempotency key'ler, JWT rotasyonu, %87 test kapsamı. Her şey canlıya, lansmandan sonraki ilk çeyrekte tek bir kritik olay yaşanmadan çıktı.",
      ar: "كنا بحاجة إلى منصة مصرفية بمستوى الإنتاج من الصفر: دفتر معاملات بضمانات ACID، وأربعة مزوّدي دفع خلف API واحدة، وزمن استجابة أقل من 200 مللي ثانية لتجميع الأرصدة. لم يكتب فريق Anteyko شيفرة فحسب، بل قدّم حلًا هندسيًا على مستوى البنية: القيد المزدوج، ومفاتيح idempotency، وتدوير JWT، وتغطية اختبارات بنسبة 87%. وخرج كل شيء إلى الإنتاج دون حادث حرج واحد في الربع الأول بعد الإطلاق.",
      en: 'We needed a production-grade banking platform from scratch: a transactional ledger with ACID guarantees, four payment providers behind one API, sub-200ms response time on balance aggregation. The Anteyko team didn\'t just write code — they delivered an engineering solution at the architecture level: double-entry, idempotency keys, JWT rotation, 87% test coverage. Everything shipped to production without a single critical incident in the first quarter after launch.',
    },
    author: { ru: 'Aron', zh: "Aron", tr: "Aron", ar: "آرون", en: 'Aron' },
    role: {
      ru: 'CTO, fintech (под NDA), Hong Kong',
      zh: "CTO，金融科技公司（受 NDA 保护），香港",
      tr: "CTO, fintech (NDA kapsamında), Hong Kong",
      ar: "المدير التقني، شركة تقنية مالية (بموجب اتفاقية سرية)، هونغ كونغ",
      en: 'CTO, fintech (under NDA), Hong Kong',
    },
    initials: { ru: 'AR', zh: "AR", tr: "AR", ar: "AR", en: 'AR' },
  },
  {
    quote: {
      ru: 'Мы не знали точную себестоимость и маржу каждого ролла — цены на ингредиенты менялись, а считать руками в Excel было невозможно для меню из 50+ позиций. Anteyko построили систему где каждый рецепт автоматически пересчитывает себестоимость при изменении цены ингредиента, шеф видит свою часть, бухгалтер — свою, я как CFO — аналитику по всему. С первого месяца увидели где теряем маржу.',
      zh: "我们不清楚每个卷的确切成本和利润——食材价格不断变动，对于 50 多个品项的菜单，用 Excel 手工重新核算根本不可能。Anteyko 搭建了一套系统，只要食材价格变化，每道配方的成本就会自动重新计算——主厨看到自己负责的部分，会计看到会计的部分，而我作为 CFO 可以看到全局分析。从第一个月起，我们就看清了利润是在哪里流失的。",
      tr: "Her rulonun tam maliyetini ve marjını bilmiyorduk; malzeme fiyatları değişiyordu ve 50'den fazla kalemlik bir menüyü Excel'de elle yeniden hesaplamak imkânsızdı. Anteyko, bir malzemenin fiyatı değiştiğinde her reçetenin maliyetini otomatik yeniden hesaplayan bir sistem kurdu: şef kendi kısmını görüyor, muhasebeci kendisininkini, ben de CFO olarak her şeyin analitiğini. İlk aydan itibaren marjı nerede kaybettiğimizi görmeye başladık.",
      ar: "لم نكن نعرف التكلفة والهامش الدقيقين لكل رول، فأسعار المكونات كانت تتغير، وكان إعادة الحساب يدويًا في Excel مستحيلًا لقائمة طعام تضم أكثر من 50 صنفًا. بنت Anteyko نظامًا تعيد فيه كل وصفة حساب تكلفتها تلقائيًا عند تغيّر سعر أي مكوّن؛ يرى الطاهي حصته، ويرى المحاسب حصته، وأرى أنا بصفتي المدير المالي التحليلات الشاملة. ومنذ الشهر الأول عرفنا أين نخسر الهامش.",
      en: 'We didn\'t know the exact cost and margin of each roll — ingredient prices changed, and recalculating by hand in Excel was impossible for a 50+ item menu. Anteyko built a system where each recipe automatically recalculates cost when an ingredient price changes — the chef sees their part, the accountant sees theirs, and as CFO I see the analytics across everything. From the first month we saw where we were losing margin.',
    },
    author: { ru: 'Markel Bron', zh: "Markel Bron", tr: "Markel Bron", ar: "ماركل برون", en: 'Markel Bron' },
    role: {
      ru: 'CFO, hospitality (под NDA), San Jose',
      zh: "CFO，酒店餐饮业（受 NDA 保护），圣何塞",
      tr: "CFO, hospitality (NDA kapsamında), San Jose",
      ar: "المدير المالي، قطاع الضيافة (بموجب اتفاقية سرية)، سان خوسيه",
      en: 'CFO, hospitality (under NDA), San Jose',
    },
    initials: { ru: 'MB', zh: "MB", tr: "MB", ar: "MB", en: 'MB' },
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
