import type { L } from "./i18n-text";
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
  question: L;
  answer: L;
}

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    category: "pricing",
    question: {
      en: "How does pricing work?",
      ru: "Как устроено ценообразование?",
      zh: "如何定价？",
      tr: "Fiyatlandırma nasıl işliyor?",
      ar: "كيف تعمل التسعيرة؟",
    },
    answer: {
      en: "We offer three package tiers with fixed scope and pricing. For custom projects, we do a paid discovery phase first, then provide a fixed-price proposal. No hourly billing surprises.",
      ru: "У нас три пакетных уровня с фиксированным объёмом и ценой. Для индивидуальных проектов сначала проводим платное исследование, затем даём предложение с фиксированной ценой. Никаких сюрпризов с почасовой оплатой.",
      zh: "我们提供三档套餐，范围和价格均固定。定制项目则先进行付费的探索阶段，再给出固定价格的方案。不会有按小时计费带来的意外。",
      tr: "Kapsamı ve fiyatı sabit üç paket seviyemiz var. Özel projelerde önce ücretli bir keşif fazı yürütür, ardından sabit fiyatlı bir teklif sunarız. Saat bazlı faturalamada sürpriz yok.",
      ar: "نقدّم ثلاث باقات بنطاق وسعر ثابتين. أما المشاريع المخصصة فنبدأ فيها بمرحلة اكتشاف مدفوعة، ثم نقدّم عرضًا بسعر ثابت. لا مفاجآت في الفوترة بالساعة.",
    },
  },
  {
    id: "faq-21",
    category: "pricing",
    question: {
      en: "How much does it cost to build a website?",
      ru: "Сколько стоит разработка сайта?",
      zh: "开发一个网站需要多少钱？",
      tr: "Bir web sitesi yaptırmak ne kadar tutar?",
      ar: "كم تكلفة تطوير موقع إلكتروني؟",
    },
    answer: {
      en: "A landing page or corporate website starts from $800 and takes 7–14 days, including design, development, SEO setup and deployment. An MVP with core product features starts from $3k and takes 3–6 weeks. You get a fixed price before work starts.",
      ru: "Лендинг или корпоративный сайт — от $800 и 7–14\u00A0дней, включая дизайн, разработку, настройку SEO и запуск. MVP с ключевыми функциями продукта — от $3k и 3–6\u00A0недель. Цена фиксируется до начала работ.",
      zh: "落地页或企业官网 $800 起，周期 7–14 天，包含设计、开发、SEO 配置和上线部署。具备核心功能的 MVP $3k 起，周期 3–6 周。开工前确定固定价格。",
      tr: "Açılış sayfası veya kurumsal site 800 $'dan başlar ve 7–14 gün sürer; tasarım, geliştirme, SEO kurulumu ve yayına alma dahildir. Temel ürün özelliklerine sahip bir MVP 3 bin $'dan başlar ve 3–6 hafta sürer. Fiyat iş başlamadan sabitlenir.",
      ar: "تبدأ صفحة الهبوط أو الموقع المؤسسي من $800 وتستغرق من 7 إلى 14 يومًا، وتشمل التصميم والتطوير وإعداد SEO والنشر. ويبدأ MVP بالميزات الأساسية للمنتج من $3k ويستغرق من 3 إلى 6 أسابيع. يُحدَّد السعر قبل بدء العمل.",
    },
  },
  {
    id: "faq-2",
    category: "timeline",
    question: {
      en: "What are typical timelines?",
      ru: "Какие типичные сроки?",
      zh: "通常的周期是多久？",
      tr: "Tipik süreler nelerdir?",
      ar: "ما الجداول الزمنية المعتادة؟",
    },
    answer: {
      en: "Landing pages: 7–14 days. MVPs: 3–6 weeks. Full products: 6–12+ weeks. Actual timeline depends on scope complexity and feedback cycles.",
      ru: "Лендинги: 7–14\u00A0дней. MVP: 3–6\u00A0недель. Полные продукты: 6–12+\u00A0недель. Реальные сроки зависят от сложности объёма и циклов обратной связи.",
      zh: "落地页：7–14 天。MVP：3–6 周。完整产品：6–12 周以上。实际周期取决于范围的复杂程度和反馈轮次。",
      tr: "Açılış sayfaları: 7–14 gün. MVP'ler: 3–6 hafta. Tam ürünler: 6–12+ hafta. Gerçek süre, kapsamın karmaşıklığına ve geri bildirim döngülerine bağlıdır.",
      ar: "صفحات الهبوط: من 7 إلى 14 يومًا. MVP: من 3 إلى 6 أسابيع. المنتجات الكاملة: من 6 إلى 12 أسبوعًا فأكثر. ويعتمد الجدول الفعلي على تعقيد النطاق ودورات الملاحظات.",
    },
  },
  {
    id: "faq-4",
    category: "legal",
    question: {
      en: "Do you sign NDAs?",
      ru: "Вы подписываете NDA?",
      zh: "你们会签署 NDA 吗？",
      tr: "NDA imzalıyor musunuz?",
      ar: "هل توقّعون اتفاقيات السرية (NDA)؟",
    },
    answer: {
      en: "Yes. We sign NDAs before any discovery work begins. Standard mutual NDA or your company's template — both work.",
      ru: "Да. Подписываем NDA до начала любой работы по исследованию. Стандартный взаимный NDA или шаблон вашей компании — оба варианта подходят.",
      zh: "会。在任何探索工作开始之前，我们就会签署 NDA。标准的双向 NDA 或贵公司的模板均可。",
      tr: "Evet. Herhangi bir keşif çalışması başlamadan önce NDA imzalarız. Standart karşılıklı NDA ya da şirketinizin şablonu — ikisi de olur.",
      ar: "نعم. نوقّع اتفاقيات السرية قبل بدء أي عمل في مرحلة الاكتشاف. اتفاقية سرية متبادلة قياسية أو نموذج شركتكم — كلاهما مقبول.",
    },
  },
  {
    id: "faq-5",
    category: "support",
    question: {
      en: "What about post-launch support?",
      ru: "Что насчёт поддержки после запуска?",
      zh: "上线后的支持怎么办？",
      tr: "Lansman sonrası destek nasıl?",
      ar: "ماذا عن الدعم بعد الإطلاق؟",
    },
    answer: {
      en: "All packages include a support period (2 weeks to 1 month depending on package). Beyond that, we offer monthly support retainers with SLAs.",
      ru: "Все пакеты включают период поддержки (от 2\u00A0недель до 1\u00A0месяца в зависимости от пакета). Далее предлагаем ежемесячные контракты поддержки с SLA.",
      zh: "所有套餐都包含一段支持期（根据套餐为 2 周至 1 个月）。此后，我们提供带 SLA 的按月支持服务。",
      tr: "Tüm paketler bir destek dönemi içerir (pakete göre 2 haftadan 1 aya kadar). Sonrasında SLA'li aylık destek sözleşmeleri sunuyoruz.",
      ar: "تشمل جميع الباقات فترة دعم (من أسبوعين إلى شهر بحسب الباقة). وبعد ذلك نقدّم عقود دعم شهرية بمستويات خدمة (SLA).",
    },
  },
  {
    id: "faq-6",
    category: "web3",
    question: {
      en: "What Web3 work do you do?",
      ru: "Какую Web3 работу вы делаете?",
      zh: "你们做哪些 Web3 工作？",
      tr: "Hangi Web3 işlerini yapıyorsunuz?",
      ar: "ما أعمال Web3 التي تنفذونها؟",
    },
    answer: {
      en: "Wallet integrations, token contracts (ERC-20, ERC-721, etc.), staking modules, DEX integrations, and Web3 frontend. We don't do smart contract audits ourselves but coordinate with audit firms.",
      ru: "Интеграции кошельков, токен-контракты (ERC-20, ERC-721 и др.), модули стейкинга, интеграции с DEX и Web3 фронтенд. Аудит смарт-контрактов сами не делаем, но координируем с аудиторскими фирмами.",
      zh: "钱包集成、代币合约（ERC-20、ERC-721 等）、质押模块、DEX 集成以及 Web3 前端。智能合约审计我们自己不做，但会与审计机构协调对接。",
      tr: "Cüzdan entegrasyonları, token kontratları (ERC-20, ERC-721 vb.), staking modülleri, DEX entegrasyonları ve Web3 frontend. Akıllı kontrat denetimlerini kendimiz yapmıyoruz ancak denetim firmalarıyla koordine ediyoruz.",
      ar: "تكامل المحافظ، وعقود التوكن (ERC-20 وERC-721 وغيرها)، ووحدات staking، وتكامل DEX، وواجهات Web3 الأمامية. ولا ننفذ تدقيق العقود الذكية بأنفسنا، لكننا ننسّق مع شركات التدقيق.",
    },
  },
  {
    id: "faq-7",
    category: "process",
    question: {
      en: "Can you do just a module, not a full project?",
      ru: "Можете сделать только модуль, не весь проект?",
      zh: "可以只做某个模块，而不是整个项目吗？",
      tr: "Tüm proje yerine sadece bir modül yapabilir misiniz?",
      ar: "هل يمكنكم تنفيذ وحدة واحدة فقط لا مشروع كامل؟",
    },
    answer: {
      en: "Yes. We often integrate specific modules (KYC, payments, Web3 features) into existing products. We'll need to assess your current architecture first.",
      ru: "Да. Мы часто интегрируем конкретные модули (KYC, платежи, Web3 фичи) в существующие продукты. Нужно будет сначала оценить вашу текущую архитектуру.",
      zh: "可以。我们经常将特定模块（KYC、支付、Web3 功能）集成到现有产品中。我们需要先评估您当前的架构。",
      tr: "Evet. Mevcut ürünlere sıklıkla belirli modüller (KYC, ödemeler, Web3 özellikleri) entegre ediyoruz. Önce mevcut mimarinizi değerlendirmemiz gerekir.",
      ar: "نعم. كثيرًا ما ندمج وحدات محددة (KYC، والمدفوعات، وميزات Web3) في منتجات قائمة. وسنحتاج أولًا إلى تقييم بنيتكم الحالية.",
    },
  },
  {
    id: "faq-8",
    category: "process",
    question: {
      en: "What if I don't have a spec?",
      ru: "Что если у меня нет спецификации?",
      zh: "如果我没有需求规格怎么办？",
      tr: "Spesifikasyonum yoksa ne olur?",
      ar: "ماذا لو لم تكن لدي مواصفات؟",
    },
    answer: {
      en: "That's what discovery is for. We help you clarify requirements, define scope, and create a spec during the discovery phase. Most projects start this way.",
      ru: "Для этого и нужно исследование. Мы помогаем уточнить требования, определить объём и создать спецификацию во время фазы исследования. Большинство проектов начинаются так.",
      zh: "这正是探索阶段的意义所在。我们会在探索阶段帮您梳理需求、界定范围并撰写规格说明。大多数项目都是这样开始的。",
      tr: "Keşif tam da bunun için. Keşif fazında gereksinimleri netleştirmenize, kapsamı belirlemenize ve spesifikasyon oluşturmanıza yardımcı oluruz. Projelerin çoğu böyle başlar.",
      ar: "هذا هو دور مرحلة الاكتشاف. نساعدكم على توضيح المتطلبات وتحديد النطاق وإعداد المواصفات خلالها. وتبدأ معظم المشاريع بهذه الطريقة.",
    },
  },
  {
    id: "faq-9",
    category: "quality",
    question: {
      en: "How do you ensure quality?",
      ru: "Как вы обеспечиваете качество?",
      zh: "你们如何保证质量？",
      tr: "Kaliteyi nasıl sağlıyorsunuz?",
      ar: "كيف تضمنون الجودة؟",
    },
    answer: {
      en: "Automated tests, code review on every PR, pre-deployment checklists, and staging environments. We don't ship untested code to production.",
      ru: "Автоматические тесты, код-ревью на каждом PR, чеклисты перед запуском и тестовые окружения. Мы не отправляем непротестированный код в продакшн.",
      zh: "自动化测试、每个 PR 都做代码评审、上线前检查清单以及预发布环境。我们不会把未经测试的代码发布到生产环境。",
      tr: "Otomatik testler, her PR'da kod incelemesi, dağıtım öncesi kontrol listeleri ve staging ortamları. Test edilmemiş kodu production'a göndermeyiz.",
      ar: "اختبارات آلية، ومراجعة الشيفرة عند كل PR، وقوائم تحقق قبل النشر، وبيئات staging. لا نرسل شيفرة غير مختبرة إلى الإنتاج.",
    },
  },
  {
    id: "faq-10",
    category: "general",
    question: {
      en: "Do you work with international clients?",
      ru: "Работаете ли вы с международными клиентами?",
      zh: "你们服务国际客户吗？",
      tr: "Uluslararası müşterilerle çalışıyor musunuz?",
      ar: "هل تعملون مع عملاء دوليين؟",
    },
    answer: {
      en: "Yes. We have offices in Bishkek, Dubai, Istanbul, Chicago and Shenzhen and work with clients globally. Remote-first, timezone-flexible, async-friendly.",
      ru: "Да. У нас офисы в Бишкеке, Дубае, Стамбуле, Чикаго и Шэньчжэне, работаем с клиентами по всему миру. Удалённо, гибко по часовым поясам, асинхронно.",
      zh: "是的。我们在比什凯克、迪拜、伊斯坦布尔、芝加哥和深圳设有办公室，服务全球客户。远程优先，时区灵活，支持异步协作。",
      tr: "Evet. Bişkek, Dubai, İstanbul, Chicago ve Shenzhen'de ofislerimiz var ve dünya genelinde müşterilerle çalışıyoruz. Uzaktan öncelikli, saat dilimine esnek, asenkron çalışmaya uygun.",
      ar: "نعم. لدينا مكاتب في بيشكيك ودبي وإسطنبول وشيكاغو وشنتشن، ونعمل مع عملاء حول العالم. عمل عن بُعد بالدرجة الأولى، ومرونة في المناطق الزمنية، وتواصل غير متزامن.",
    },
  },
  {
    id: "faq-11",
    category: "tech",
    question: {
      en: "What about mobile apps?",
      ru: "Что насчёт мобильных приложений?",
      zh: "移动应用呢？",
      tr: "Peki ya mobil uygulamalar?",
      ar: "ماذا عن تطبيقات الجوال؟",
    },
    answer: {
      en: "We focus on web products. For mobile, we build responsive web apps or PWAs. If you need native iOS/Android, we can recommend partners.",
      ru: "Мы фокусируемся на веб-продуктах. Для мобильных делаем адаптивные веб-приложения или PWA. Если нужен нативный iOS/Android, можем порекомендовать партнёров.",
      zh: "我们专注于 Web 产品。移动端我们会开发响应式 Web 应用或 PWA。如果您需要原生 iOS/Android 应用，我们可以推荐合作伙伴。",
      tr: "Odağımız web ürünleri. Mobil için responsive web uygulamaları veya PWA geliştiriyoruz. Yerel iOS/Android gerekiyorsa iş ortaklarımızı önerebiliriz.",
      ar: "نركّز على المنتجات الرقمية للويب. وللجوال نبني تطبيقات ويب متجاوبة أو PWA. وإن كنتم بحاجة إلى تطبيق أصلي لنظامَي iOS وAndroid، فيسعدنا أن نرشّح لكم شركاء.",
    },
  },
  {
    id: "faq-12",
    category: "process",
    question: {
      en: "How do you handle communication?",
      ru: "Как вы ведёте коммуникацию?",
      zh: "你们如何沟通？",
      tr: "İletişimi nasıl yürütüyorsunuz?",
      ar: "كيف تديرون التواصل؟",
    },
    answer: {
      en: "Weekly demos (recorded), async updates in Slack/Telegram, and a shared project board. You always know what's happening.",
      ru: "Еженедельные демо (с записью), асинхронные обновления в Slack/Telegram и общая доска проекта. Вы всегда знаете, что происходит.",
      zh: "每周演示（带录屏）、Slack/Telegram 异步更新，以及共享的项目看板。项目进展，您始终一目了然。",
      tr: "Haftalık demolar (kayıtlı), Slack/Telegram üzerinden asenkron güncellemeler ve ortak bir proje panosu. Neler olup bittiğini her zaman bilirsiniz.",
      ar: "عروض تجريبية أسبوعية (مسجّلة)، وتحديثات غير متزامنة عبر Slack أو Telegram، ولوحة مشروع مشتركة. ستعرفون دائمًا ما يجري في مشروعكم.",
    },
  },
  {
    id: "faq-13",
    category: "tech",
    question: {
      en: "What's your tech stack?",
      ru: "Какой у вас технологический стек?",
      zh: "你们的技术栈是什么？",
      tr: "Teknoloji yığınınız nedir?",
      ar: "ما هي حزمتكم التقنية؟",
    },
    answer: {
      en: "Frontend: React, Next.js, TypeScript. Backend: Node.js, Go, PostgreSQL. Web3: Solidity, ethers.js. Infrastructure: AWS, Vercel, Docker. We adapt to project needs.",
      ru: "Фронтенд: React, Next.js, TypeScript. Бэкенд: Node.js, Go, PostgreSQL. Web3: Solidity, ethers.js. Инфраструктура: AWS, Vercel, Docker. Адаптируемся под нужды проекта.",
      zh: "前端：React、Next.js、TypeScript。后端：Node.js、Go、PostgreSQL。Web3：Solidity、ethers.js。基础设施：AWS、Vercel、Docker。我们会根据项目需求灵活调整。",
      tr: "Frontend: React, Next.js, TypeScript. Backend: Node.js, Go, PostgreSQL. Web3: Solidity, ethers.js. Altyapı: AWS, Vercel, Docker. Projenin ihtiyaçlarına uyum sağlıyoruz.",
      ar: "الواجهة الأمامية: React وNext.js وTypeScript. الواجهة الخلفية: Node.js وGo وPostgreSQL. Web3: Solidity وethers.js. البنية التحتية: AWS وVercel وDocker. ونتكيّف مع احتياجات كل مشروع.",
    },
  },
  {
    id: "faq-14",
    category: "design",
    question: {
      en: "Do you do design or just development?",
      ru: "Вы делаете дизайн или только разработку?",
      zh: "你们做设计，还是只做开发？",
      tr: "Tasarım da yapıyor musunuz, yoksa yalnızca geliştirme mi?",
      ar: "هل تقدمون خدمات التصميم أم التطوير فقط؟",
    },
    answer: {
      en: "Both. We offer end-to-end: UX/UI design in Figma, design systems, and full implementation. You can also bring your own design.",
      ru: "И то, и другое. Мы предлагаем полный цикл: UX/UI дизайн в Figma, дизайн-системы и полную реализацию. Можете также прийти со своим дизайном.",
      zh: "两者都做。我们提供端到端服务：Figma 中的 UX/UI 设计、设计系统以及完整落地实现。您也可以带着自己的设计稿来合作。",
      tr: "İkisini de. Uçtan uca hizmet sunuyoruz: Figma'da UX/UI tasarımı, tasarım sistemleri ve eksiksiz uygulama. Kendi tasarımınızla da gelebilirsiniz.",
      ar: "الاثنين معًا. نقدّم دورة متكاملة: تصميم تجربة المستخدم وواجهته في Figma، وأنظمة التصميم، والتنفيذ الكامل. ويمكنكم أيضًا القدوم بتصميمكم الخاص.",
    },
  },
  {
    id: "faq-15",
    category: "process",
    question: {
      en: "What if I need changes during the project?",
      ru: "Что если мне нужны изменения во время проекта?",
      zh: "项目进行中需要修改怎么办？",
      tr: "Proje sırasında değişiklik gerekirse ne olur?",
      ar: "ماذا لو احتجت إلى تعديلات أثناء المشروع؟",
    },
    answer: {
      en: "Small adjustments within scope are expected. Larger changes go through a change request process — we document impact on timeline and cost, you decide.",
      ru: "Небольшие корректировки в рамках объёма ожидаемы. Более крупные изменения проходят через процесс запроса на изменение — документируем влияние на сроки и стоимость, вы решаете.",
      zh: "范围内的小调整属于正常情况。较大的改动会走变更请求流程——我们会记录其对工期和成本的影响，由您来决定。",
      tr: "Kapsam içindeki küçük düzenlemeler doğaldır. Daha büyük değişiklikler değişiklik talebi sürecinden geçer: süre ve maliyete etkisini belgeleriz, kararı siz verirsiniz.",
      ar: "التعديلات الصغيرة ضمن النطاق أمر متوقع. أما التغييرات الأكبر فتمرّ عبر آلية طلب تغيير: نوثّق أثرها على الجدول الزمني والتكلفة، والقرار لكم.",
    },
  },
  {
    id: "faq-16",
    category: "pricing",
    question: {
      en: "How do payments work?",
      ru: "Как работают платежи?",
      zh: "费用如何支付？",
      tr: "Ödemeler nasıl işliyor?",
      ar: "كيف تتم الدفعات؟",
    },
    answer: {
      en: "Milestone-based. Typically: 30% upfront, 30% at midpoint, 40% at delivery. For larger projects, we can do monthly billing tied to deliverables.",
      ru: "По вехам. Обычно: 30% аванс, 30% в середине, 40% при сдаче. Для крупных проектов можем делать ежемесячные платежи, привязанные к результатам.",
      zh: "按里程碑付款。通常为：启动时 30%，项目中期 30%，交付时 40%。对于大型项目，我们也可以按月结算，并与交付成果挂钩。",
      tr: "Aşama bazlı. Genellikle: %30 peşin, %30 yarı noktada, %40 teslimde. Daha büyük projelerde teslimatlara bağlı aylık faturalandırma yapabiliriz.",
      ar: "على أساس المراحل. عادةً: 30% مقدّمًا، و30% عند منتصف المشروع، و40% عند التسليم. وفي المشاريع الكبيرة يمكننا اعتماد فوترة شهرية مرتبطة بالمخرجات.",
    },
  },
  {
    id: "faq-17",
    category: "process",
    question: {
      en: "What happens if you miss a deadline?",
      ru: "Что если вы пропустите дедлайн?",
      zh: "如果你们错过了截止日期怎么办？",
      tr: "Teslim tarihini kaçırırsanız ne olur?",
      ar: "ماذا يحدث إذا تأخرتم عن الموعد النهائي؟",
    },
    answer: {
      en: "We commit to realistic timelines and communicate proactively if risks arise. If we miss due to our fault, we work extra hours at no cost. Hasn't happened yet.",
      ru: "Мы берём на себя реалистичные сроки и заранее сообщаем при возникновении рисков. Если пропускаем по нашей вине, работаем дополнительные часы без доплаты. Пока не случалось.",
      zh: "我们承诺切实可行的时间表，一旦出现风险会主动告知。若因我们的原因延期，我们会免费加班赶工。目前还没有发生过。",
      tr: "Gerçekçi takvimler taahhüt eder, risk ortaya çıkarsa proaktif olarak bilgilendiririz. Kendi hatamız yüzünden gecikirsek ek mesaiyi ücretsiz yaparız. Henüz yaşanmadı.",
      ar: "نلتزم بجداول زمنية واقعية ونُبادر بإبلاغكم إذا ظهرت مخاطر. وإذا كان التأخر بسببنا فنعمل ساعات إضافية دون أي تكلفة. ولم يحدث ذلك حتى الآن.",
    },
  },
  {
    id: "faq-18",
    category: "tech",
    question: {
      en: "Can you take over an existing codebase?",
      ru: "Можете ли вы взять на себя существующую кодовую базу?",
      zh: "你们可以接手现有的代码库吗？",
      tr: "Mevcut bir kod tabanını devralabilir misiniz?",
      ar: "هل يمكنكم تسلّم قاعدة شيفرة قائمة؟",
    },
    answer: {
      en: "Yes, after an assessment. We do a paid code review first to understand the state of the codebase, then propose a realistic plan.",
      ru: "Да, после оценки. Сначала делаем платный код-ревью, чтобы понять состояние кодовой базы, затем предлагаем реалистичный план.",
      zh: "可以，但需要先评估。我们会先做一次付费代码评审，了解代码库的现状，然后提出切实可行的方案。",
      tr: "Evet, bir değerlendirmenin ardından. Önce kod tabanının durumunu anlamak için ücretli bir kod incelemesi yapar, ardından gerçekçi bir plan öneririz.",
      ar: "نعم، بعد التقييم. نبدأ بمراجعة شيفرة مدفوعة لفهم حالة القاعدة البرمجية، ثم نقترح خطة واقعية.",
    },
  },
  {
    id: "faq-19",
    category: "support",
    question: {
      en: "Do you provide hosting?",
      ru: "Вы предоставляете хостинг?",
      zh: "你们提供托管服务吗？",
      tr: "Barındırma (hosting) sağlıyor musunuz?",
      ar: "هل توفّرون خدمة الاستضافة؟",
    },
    answer: {
      en: "We set up infrastructure on a cloud platform (AWS, Vercel, etc.). We can also manage it for you on a support retainer.",
      ru: "Мы настраиваем инфраструктуру на облачной платформе (AWS, Vercel и др.). Можем также управлять ею за вас по контракту поддержки.",
      zh: "我们会在云平台（AWS、Vercel 等）上搭建基础设施，也可以通过支持服务合约为您代为运维。",
      tr: "Altyapıyı bir bulut platformunda (AWS, Vercel vb.) kurarız. İsterseniz destek sözleşmesi kapsamında sizin adınıza yönetebiliriz.",
      ar: "نجهّز البنية التحتية على منصة سحابية (AWS وVercel وغيرهما)، ويمكننا إدارتها نيابةً عنكم ضمن عقد دعم دوري.",
    },
  },
  {
    id: "faq-20",
    category: "general",
    question: {
      en: "How do I get started?",
      ru: "Как начать?",
      zh: "如何开始合作？",
      tr: "Nasıl başlarım?",
      ar: "كيف أبدأ؟",
    },
    answer: {
      en: "Fill out the contact form or book a 45-minute scoping call. We'll discuss your project and provide an estimate within 24 hours.",
      ru: "Заполните контактную форму или запишитесь на 45-минутный созвон. Обсудим ваш проект и предоставим оценку в течение 24\u00A0часов.",
      zh: "填写联系表单，或预约一次 45 分钟的需求沟通电话。我们会和您讨论项目，并在 24 小时内提供报价。",
      tr: "İletişim formunu doldurun veya 45 dakikalık bir kapsam görüşmesi ayarlayın. Projenizi konuşur, 24 saat içinde bir teklif sunarız.",
      ar: "املأوا نموذج التواصل أو احجزوا مكالمة تحديد النطاق لمدة 45 دقيقة. سنناقش مشروعكم ونقدّم لكم تقديرًا خلال 24 ساعة.",
    },
  },
];

export function getFAQItems(limit?: number): FAQItem[] {
  if (limit) {
    return faqItems.slice(0, limit);
  }
  return faqItems;
}
