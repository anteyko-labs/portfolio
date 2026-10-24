import type { L } from "@/lib/i18n-text";

// Visible SEO text block at the bottom of the home page. Plain, readable prose
// about what the studio does and where, with links to the service pages.
// Facts only: services, prices and timelines come from src/lib/translations.ts.

export type SeoLink = { href: string; label: L };
export type SeoSection = { title: L; text: L; links: SeoLink[] };

export const HOME_SEO: { title: L; intro: L; sections: SeoSection[]; outro: L } = {
  title: {
    en: "Website and app development in Bishkek",
    ru: "Разработка сайтов и приложений в Бишкеке",
    zh: "比什凯克网站与应用开发",
    tr: "Bişkek'te web sitesi ve uygulama geliştirme",
    ar: "تطوير المواقع والتطبيقات في بيشكيك",
  },
  intro: {
    en: "Anteyko is a web studio and IT company with an office in Bishkek and teams in Dubai, Istanbul, Chicago and Shenzhen. We take a project from idea and design through development, launch and support, working with businesses in Kyrgyzstan and abroad. Scope, price and timeline are agreed before work starts, and the project moves in milestones so you see results at every step.",
    ru: "Anteyko — веб-студия и IT-компания с офисом в Бишкеке и командами в Дубае, Стамбуле, Чикаго и Шэньчжэне. Мы ведём проект целиком: от идеи и дизайна до разработки, запуска и поддержки, и работаем с бизнесом как в Кыргызстане, так и за рубежом. Объём работ, стоимость и сроки согласуем до старта, а дальше движемся по этапам, чтобы вы видели результат на каждом шаге.",
    zh: "Anteyko 是一家在比什凯克设有办公室的网站工作室和 IT 公司，团队还分布在迪拜、伊斯坦布尔、芝加哥和深圳。我们承接从创意、设计到开发、上线和后续支持的完整项目，服务吉尔吉斯斯坦本地及海外企业。工作范围、价格和周期在开工前确定，项目按阶段推进，让您每一步都能看到成果。",
    tr: "Anteyko, Bişkek'te ofisi, Dubai, İstanbul, Chicago ve Shenzhen'de ekipleri bulunan bir web stüdyosu ve yazılım şirketidir. Projeyi fikir ve tasarımdan geliştirme, yayına alma ve desteğe kadar uçtan uca yürütüyor; Kırgızistan'daki ve yurt dışındaki işletmelerle çalışıyoruz. Kapsam, fiyat ve süre işe başlamadan önce netleşir; proje aşamalar hâlinde ilerler ve her adımda sonucu görürsünüz.",
    ar: "Anteyko استوديو ويب وشركة تقنية لها مكتب في بيشكيك وفرق عمل في دبي وإسطنبول وشيكاغو وشنتشن. نتولى المشروع كاملًا من الفكرة والتصميم إلى التطوير والإطلاق والدعم، ونعمل مع الشركات في قيرغيزستان وخارجها. نتفق على نطاق العمل والسعر والمدة قبل البدء، ثم نتقدم على مراحل لتروا النتيجة في كل خطوة.",
  },
  sections: [
    {
      title: {
        en: "Websites and web services",
        ru: "Сайты и веб-сервисы",
        zh: "网站与 Web 服务",
        tr: "Web siteleri ve web servisleri",
        ar: "المواقع وخدمات الويب",
      },
      text: {
        en: "Website development in Bishkek starts with your business goal, not a template. A landing page or corporate site takes 7–14 days and starts from $800, including design, responsive layout, basic SEO setup and analytics. To test an idea we build an MVP in a few weeks, and for startups we can take on the whole product, from prototype to launch.",
        ru: "Создание сайтов у нас начинается с задачи бизнеса, а не с шаблона. Лендинг или корпоративный сайт делаем за 7–14 дней, стоимость — от $800: дизайн, адаптивная вёрстка, базовая SEO-настройка и аналитика. Чтобы проверить идею, собираем MVP за несколько недель, а для стартапа можем взять на себя весь продукт — от прототипа до запуска.",
        zh: "我们在比什凯克做网站开发，从您的业务目标出发，而不是套用模板。落地页或企业官网 7–14 天完成，$800 起，包含设计、响应式布局、基础 SEO 配置和数据分析。想验证想法，我们可以在几周内做出 MVP；对于初创团队，我们也能承担从原型到上线的整个产品。",
        tr: "Bişkek'te web sitesi geliştirmeye şablondan değil, işletmenizin hedefinden başlıyoruz. Açılış sayfası veya kurumsal site 7–14 günde hazır olur ve 800 $'dan başlar; tasarım, responsive arayüz, temel SEO kurulumu ve analitik dahildir. Bir fikri test etmek için birkaç haftada MVP çıkarıyor, girişimler için ise prototipten yayına kadar ürünün tamamını üstlenebiliyoruz.",
        ar: "يبدأ تطوير المواقع لدينا في بيشكيك من هدف عملكم لا من قالب جاهز. ننجز صفحة الهبوط أو الموقع المؤسسي خلال 7–14 يومًا ابتداءً من $800، ويشمل ذلك التصميم والواجهة المتجاوبة وإعداد SEO الأساسي والتحليلات. ولاختبار فكرة نبني نموذجًا أوليًا (MVP) خلال أسابيع قليلة، ويمكننا تولي المنتج كاملًا للشركات الناشئة من النموذج حتى الإطلاق.",
      },
      links: [
        {
          href: "/services/launch-site",
          label: { en: "landing page or corporate site", ru: "разработка лендинга и сайта", zh: "落地页与企业官网", tr: "açılış sayfası ve kurumsal site", ar: "صفحة هبوط أو موقع مؤسسي" },
        },
        {
          href: "/services/mvp-sprint",
          label: { en: "MVP in a few weeks", ru: "MVP за несколько недель", zh: "几周内完成 MVP", tr: "birkaç haftada MVP", ar: "نموذج MVP خلال أسابيع" },
        },
        {
          href: "/services/startup-under-key",
          label: { en: "turnkey startup product", ru: "стартап под ключ", zh: "创业产品交钥匙开发", tr: "anahtar teslim startup ürünü", ar: "منتج ناشئ جاهز بالكامل" },
        },
      ],
    },
    {
      title: {
        en: "Mobile apps, Telegram bots and AI assistants",
        ru: "Мобильные приложения, Telegram-боты и AI-ассистенты",
        zh: "移动应用、Telegram 机器人与 AI 助手",
        tr: "Mobil uygulamalar, Telegram botları ve yapay zekâ asistanları",
        ar: "تطبيقات الجوال وروبوتات Telegram والمساعدات الذكية",
      },
      text: {
        en: "We build mobile apps for iOS and Android on a single codebase, with backend and store publishing included. A Telegram bot can replace a first app: catalogue, orders, bookings and payments right in the chat. An AI chatbot for business answers customers from your price list and documents, qualifies requests and passes leads to a manager in AnteykoCRM.",
        ru: "Разработка мобильных приложений для iOS и Android ведётся на одной кодовой базе — вместе с бэкендом и публикацией в сторах. Telegram-бот можно заказать от\u00A0$500, и он способен заменить первое приложение: каталог, заказы, запись и оплата прямо в мессенджере. Чат-бот для бизнеса на базе AI отвечает клиентам по вашему прайсу и документам, квалифицирует заявки и передаёт их менеджеру в AnteykoCRM.",
        zh: "我们基于同一套代码开发 iOS 和 Android 移动应用，包含后端和应用商店上架。Telegram 机器人可以替代第一个 App：商品目录、下单、预约和付款都在聊天中完成。面向企业的 AI 聊天机器人根据您的价目表和文档回答客户问题、筛选需求，并把线索转给 AnteykoCRM 中的负责人。",
        tr: "iOS ve Android için mobil uygulamaları tek kod tabanıyla, backend ve mağaza yayını dahil geliştiriyoruz. Bir Telegram botu ilk uygulamanın yerini tutabilir: katalog, sipariş, randevu ve ödeme doğrudan sohbette. İşletmeler için yapay zekâ destekli sohbet botu, müşterilere fiyat listeniz ve belgelerinize göre yanıt verir, talepleri değerlendirir ve AnteykoCRM'deki yöneticiye aktarır.",
        ar: "نطوّر تطبيقات الجوال لنظامي iOS وAndroid بقاعدة شيفرة واحدة، مع الواجهة الخلفية والنشر في المتاجر. ويمكن لروبوت Telegram أن يحل محل التطبيق الأول: كتالوج وطلبات وحجوزات ودفع داخل المحادثة مباشرة. أما روبوت المحادثة الذكي للأعمال فيجيب العملاء وفق قائمة أسعاركم ومستنداتكم، ويفرز الطلبات ويحوّلها إلى المدير في AnteykoCRM.",
      },
      links: [
        {
          href: "/services/mobile-apps",
          label: { en: "mobile app development", ru: "разработка мобильного приложения", zh: "移动应用开发", tr: "mobil uygulama geliştirme", ar: "تطوير تطبيقات الجوال" },
        },
        {
          href: "/services/telegram-bots",
          label: { en: "Telegram bot", ru: "Telegram-бот", zh: "Telegram 机器人", tr: "Telegram botu", ar: "روبوت Telegram" },
        },
        {
          href: "/services/ai-chatbots",
          label: { en: "AI chatbot for business", ru: "AI-ассистент для бизнеса", zh: "企业 AI 聊天机器人", tr: "işletmeler için yapay zekâ botu", ar: "روبوت محادثة ذكي للأعمال" },
        },
      ],
    },
    {
      title: {
        en: "Business systems: access control, parking, CCTV and conference AV",
        ru: "Системы для бизнеса: УРВ и СКУД, парковка, видеонаблюдение и акустика",
        zh: "企业系统：考勤门禁、停车、视频监控与会议音视频",
        tr: "İşletme sistemleri: geçiş kontrolü, otopark, video gözetim ve toplantı AV",
        ar: "أنظمة للأعمال: التحكم في الدخول والمواقف والمراقبة وقاعات المؤتمرات",
      },
      text: {
        en: "Beyond software, we set up systems for offices, warehouses and business centres in Bishkek. Time tracking and access control connect turnstiles, cards and Face ID with timesheets and payroll; a parking system recognises number plates, controls barriers and takes payments. We install IP video surveillance with live view and alerts on your phone, and fit conference rooms with audio and video conferencing.",
        ru: "Кроме софта, мы внедряем системы для офисов, складов и бизнес-центров в Бишкеке. УРВ и СКУД связывают турникеты, карты и Face ID с табелем и зарплатой, а система парковки распознаёт номера, управляет шлагбаумами и принимает оплату. Видеонаблюдение для бизнеса строим на IP-камерах с просмотром и уведомлениями в телефоне, а переговорные и конференц-залы оснащаем звуком и видеосвязью.",
        zh: "除了软件，我们还为办公室、仓库和商务中心部署系统。考勤与门禁把闸机、门卡和人脸识别与考勤表和工资打通；停车管理系统识别车牌、控制道闸并收取费用。我们安装可在手机上实时查看和接收提醒的 IP 视频监控，并为会议室配置音响和视频会议设备。",
        tr: "Yazılımın yanı sıra ofisler, depolar ve iş merkezleri için sistemler kuruyoruz. Mesai takibi ve geçiş kontrolü turnikeleri, kartları ve Face ID'yi puantaj ve maaşla birleştirir; otopark sistemi plakaları tanır, bariyerleri yönetir ve ödeme alır. Telefondan canlı izleme ve bildirim sunan IP video gözetim kuruyor, toplantı salonlarını ses ve video konferans sistemleriyle donatıyoruz.",
        ar: "إلى جانب البرمجيات، نركّب أنظمة للمكاتب والمستودعات ومراكز الأعمال. يربط نظام تتبع الدوام والتحكم في الدخول البوابات الدوارة والبطاقات وFace ID بسجل الحضور والرواتب، ويتعرف نظام المواقف على اللوحات ويتحكم في الحواجز ويستقبل المدفوعات. كما نركّب مراقبة بالفيديو عبر كاميرات IP مع العرض المباشر والتنبيهات على الهاتف، ونجهّز قاعات الاجتماعات بالصوت ومؤتمرات الفيديو.",
      },
      links: [
        {
          href: "/services/time-tracking-access-control",
          label: { en: "time tracking and access control", ru: "СКУД и учёт рабочего времени", zh: "考勤与门禁系统", tr: "mesai takibi ve geçiş kontrolü", ar: "تتبع الدوام والتحكم في الدخول" },
        },
        {
          href: "/services/parking-system",
          label: { en: "parking system", ru: "система парковки", zh: "停车管理系统", tr: "otopark sistemi", ar: "نظام إدارة المواقف" },
        },
        {
          href: "/services/video-surveillance",
          label: { en: "video surveillance", ru: "видеонаблюдение", zh: "视频监控", tr: "video gözetim", ar: "المراقبة بالفيديو" },
        },
        {
          href: "/services/conference-room-audio",
          label: { en: "conference room audio", ru: "акустика для конференц-зала", zh: "会议室音视频", tr: "toplantı salonu ses sistemi", ar: "صوتيات قاعات المؤتمرات" },
        },
      ],
    },
    {
      title: {
        en: "Branding, fintech, Web3 and IT support",
        ru: "Брендинг, финтех, Web3 и IT-сопровождение",
        zh: "品牌、金融科技、Web3 与 IT 运维",
        tr: "Marka, fintek, Web3 ve BT desteği",
        ar: "العلامة التجارية والتكنولوجيا المالية وWeb3 والدعم التقني",
      },
      text: {
        en: "Alongside software development in Kyrgyzstan, we build brands: positioning, logo, visual identity and brand book. For fintech we build payments, wallets and lending products with regulatory requirements and audits in mind, and we add Web3 modules or carbon-credit platforms when the product needs them. After launch we keep things running: monitoring, updates and improvements under an agreed SLA.",
        ru: "Помимо разработки ПО в Кыргызстане, мы создаём бренды: позиционирование, логотип, фирменный стиль и брендбук. В финтехе делаем платежи, кошельки и кредитные продукты с учётом требований регулятора и аудита, а при необходимости добавляем Web3-модули или платформу для карбоновых кредитов. После запуска берём продукт на сопровождение: мониторинг, обновления и доработки по SLA.",
        zh: "我们在吉尔吉斯斯坦的软件开发还包括品牌建设：从定位到标志、视觉识别和品牌手册。在金融科技领域，我们按照监管和审计要求开发支付、钱包和信贷产品；产品需要时，还可加入 Web3 模块或碳信用平台。上线后我们按 SLA 负责运维：监控、更新和持续优化。",
        tr: "Kırgızistan'daki yazılım geliştirme çalışmalarımız marka kimliğini de kapsar: konumlandırmadan logoya ve marka kılavuzuna kadar. Fintek alanında ödeme, cüzdan ve kredi ürünlerini düzenleyici gereklilikler ve denetimler gözetilerek geliştiriyor, gerektiğinde Web3 modülleri veya karbon kredisi platformları ekliyoruz. Yayından sonra ürünü SLA kapsamında izliyor, güncelliyor ve geliştiriyoruz.",
        ar: "يشمل تطوير البرمجيات لدينا في قيرغيزستان بناء العلامة التجارية أيضًا: من التموضع إلى الشعار والهوية ودليل العلامة. وفي التكنولوجيا المالية نطوّر حلول الدفع والمحافظ والإقراض مع مراعاة متطلبات الجهات الرقابية والتدقيق، ونضيف وحدات Web3 أو منصات أرصدة الكربون عند الحاجة. وبعد الإطلاق نتولى الدعم: المراقبة والتحديثات والتحسينات وفق اتفاقية مستوى الخدمة.",
      },
      links: [
        {
          href: "/services/branding",
          label: { en: "branding", ru: "разработка бренда", zh: "品牌建设", tr: "marka kimliği", ar: "بناء العلامة التجارية" },
        },
        {
          href: "/services/fintech",
          label: { en: "fintech development", ru: "финтех-решения", zh: "金融科技开发", tr: "fintek çözümleri", ar: "حلول التكنولوجيا المالية" },
        },
        {
          href: "/services/web3-addon",
          label: { en: "Web3 modules", ru: "Web3-модули", zh: "Web3 模块", tr: "Web3 modülleri", ar: "وحدات Web3" },
        },
        {
          href: "/services/carbon-credits",
          label: { en: "carbon credit platform", ru: "платформа карбоновых кредитов", zh: "碳信用平台", tr: "karbon kredisi platformu", ar: "منصة أرصدة الكربون" },
        },
        {
          href: "/services/it-support",
          label: { en: "IT support", ru: "сопровождение IT-решений", zh: "IT 系统运维", tr: "BT destek ve bakım", ar: "دعم الحلول التقنية" },
        },
      ],
    },
  ],
  outro: {
    en: "Tell us about your task — we'll suggest a solution and agree on scope, price and timeline before work begins.",
    ru: "Расскажите о своей задаче — мы предложим решение и согласуем объём, стоимость и сроки ещё до начала работ.",
    zh: "告诉我们您的需求，我们会提出解决方案，并在开工前与您确定范围、价格和周期。",
    tr: "Bize ihtiyacınızı anlatın; bir çözüm önerelim, kapsamı, fiyatı ve süreyi işe başlamadan netleştirelim.",
    ar: "أخبرونا بمهمتكم، وسنقترح حلًا ونتفق معكم على النطاق والسعر والمدة قبل بدء العمل.",
  },
};
