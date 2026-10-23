import type { ServiceDetails } from "./types";

// Long-form content for: launch-site, mvp-sprint, startup-key, mobile-app.
// Must agree with the package cards in translations.ts (price, timeline, scope).
export const PART_A: ServiceDetails = {
  "launch-site": {
    intro: {
      en: "A landing page or corporate site for a product launch, a new offer or a company that needs a clear presence online. We handle design, development and deployment: in 7–14 days you get a working site, ready for traffic and ads.",
      ru: "Лендинг или корпоративный сайт для запуска продукта, нового предложения или компании, которой нужна понятная витрина в сети. Берём на себя дизайн, разработку и запуск: через 7–14 дней у вас работающий сайт, готовый к трафику и рекламе.",
      zh: "为产品发布、新业务推广，或需要清晰线上形象的公司打造落地页或企业官网。我们负责设计、开发与上线部署，7–14 天内交付可运行的网站，随时可以承接流量与广告投放。",
      tr: "Ürün lansmanı, yeni bir teklif ya da internette net bir vitrine ihtiyaç duyan şirketler için açılış sayfası veya kurumsal site. Tasarım, geliştirme ve yayına almayı biz üstleniyoruz: 7–14 gün içinde trafiğe ve reklama hazır, çalışan bir site.",
      ar: "صفحة هبوط أو موقع مؤسسي لإطلاق منتج أو عرض جديد، أو لشركة تحتاج إلى حضور واضح على الإنترنت. نتولى التصميم والتطوير والنشر، لتحصلوا خلال 7–14 يومًا على موقع يعمل وجاهز لاستقبال الزيارات والإعلانات.",
    },
    stack: ["Figma", "Next.js", "React", "TypeScript", "Tailwind CSS", "Headless CMS", "Vercel", "Google Analytics"],
    steps: [
      {
        title: { en: "Brief and structure", ru: "Бриф и структура", zh: "需求与结构", tr: "Brif ve yapı", ar: "الموجز والهيكل" },
        text: {
          en: "We agree on goals, audience and pages, then build the site structure and the key message for each block.",
          ru: "Договариваемся о целях, аудитории и страницах, затем собираем структуру сайта и главный посыл каждого блока.",
          zh: "明确目标、受众与页面，然后搭建网站结构，并确定每个区块的核心信息。",
          tr: "Hedefleri, kitleyi ve sayfaları netleştiriyor, ardından site yapısını ve her bloğun ana mesajını oluşturuyoruz.",
          ar: "نتفق على الأهداف والجمهور والصفحات، ثم نبني هيكل الموقع والرسالة الأساسية لكل قسم.",
        },
      },
      {
        title: { en: "Design in Figma", ru: "Дизайн в Figma", zh: "Figma 设计", tr: "Figma'da tasarım", ar: "التصميم في Figma" },
        text: {
          en: "Desktop and mobile layouts in Figma. You review them and leave comments before development starts.",
          ru: "Макеты для компьютера и телефона в Figma. Вы смотрите их и оставляете комментарии до начала разработки.",
          zh: "在 Figma 中完成桌面端与移动端设计稿。开发开始前，您可以审阅并留下意见。",
          tr: "Masaüstü ve mobil tasarımlar Figma'da hazırlanır. Geliştirme başlamadan önce inceleyip yorum bırakırsınız.",
          ar: "تصاميم لسطح المكتب والجوال في Figma. تراجعونها وتضيفون ملاحظاتكم قبل بدء التطوير.",
        },
      },
      {
        title: { en: "Development and CMS", ru: "Разработка и CMS", zh: "开发与 CMS", tr: "Geliştirme ve CMS", ar: "التطوير ونظام المحتوى" },
        text: {
          en: "We build the site on Next.js, connect a CMS if needed and test it on different screens and browsers.",
          ru: "Собираем сайт на Next.js, при необходимости подключаем CMS и проверяем на разных экранах и в браузерах.",
          zh: "基于 Next.js 开发网站，按需接入 CMS，并在不同屏幕和浏览器上测试。",
          tr: "Siteyi Next.js ile geliştiriyor, gerekirse CMS bağlıyor ve farklı ekran ve tarayıcılarda test ediyoruz.",
          ar: "نبني الموقع على Next.js، ونربط نظام إدارة المحتوى عند الحاجة، ونختبره على شاشات ومتصفحات مختلفة.",
        },
      },
      {
        title: { en: "Launch, SEO, analytics", ru: "Запуск, SEO, аналитика", zh: "上线、SEO 与分析", tr: "Yayın, SEO, analitik", ar: "الإطلاق وSEO والتحليلات" },
        text: {
          en: "Domain, SSL and deployment. We set up meta tags, sitemap and analytics, then hand over access and documentation.",
          ru: "Домен, SSL и деплой. Настраиваем мета-теги, карту сайта и аналитику, передаём доступы и документацию.",
          zh: "配置域名、SSL 并部署上线。设置元标签、站点地图与数据分析，然后移交访问权限和文档。",
          tr: "Alan adı, SSL ve deploy. Meta etiketleri, site haritasını ve analitiği kuruyor, erişimleri ve belgeleri teslim ediyoruz.",
          ar: "النطاق وشهادة SSL والنشر. نضبط الوسوم الوصفية وخريطة الموقع والتحليلات، ثم نسلّم بيانات الوصول والتوثيق.",
        },
      },
    ],
    features: [
      {
        title: { en: "Mobile-first layout", ru: "Сначала мобильная версия", zh: "移动优先布局", tr: "Önce mobil düzen", ar: "تصميم يبدأ بالجوال" },
        text: {
          en: "Every block is designed for phones first, then adapted to tablets and desktops.",
          ru: "Каждый блок сначала продумываем для телефона, затем адаптируем под планшеты и компьютеры.",
          zh: "每个区块先按手机设计，再适配平板和桌面端。",
          tr: "Her blok önce telefon için tasarlanır, ardından tablet ve masaüstüne uyarlanır.",
          ar: "نصمم كل قسم للهاتف أولًا، ثم نكيّفه للأجهزة اللوحية وأجهزة الكمبيوتر.",
        },
      },
      {
        title: { en: "Fast loading", ru: "Быстрая загрузка", zh: "快速加载", tr: "Hızlı yükleme", ar: "تحميل سريع" },
        text: {
          en: "Optimized images, fonts and code, so pages open quickly for visitors and search engines.",
          ru: "Оптимизированные изображения, шрифты и код: страницы быстро открываются и для посетителей, и для поисковиков.",
          zh: "优化图片、字体与代码，页面对访客和搜索引擎都能快速打开。",
          tr: "Optimize edilmiş görseller, fontlar ve kod sayesinde sayfalar hem ziyaretçiler hem arama motorları için hızlı açılır.",
          ar: "صور وخطوط وشيفرة محسّنة، لتفتح الصفحات بسرعة للزوار ولمحركات البحث.",
        },
      },
      {
        title: { en: "Technical SEO", ru: "Техническое SEO", zh: "技术 SEO", tr: "Teknik SEO", ar: "SEO التقني" },
        text: {
          en: "Meta tags, Open Graph, sitemap.xml, robots.txt and clean URLs are set up before launch.",
          ru: "Мета-теги, Open Graph, sitemap.xml, robots.txt и понятные URL настраиваем до запуска.",
          zh: "上线前配置好元标签、Open Graph、sitemap.xml、robots.txt 和简洁的 URL。",
          tr: "Meta etiketler, Open Graph, sitemap.xml, robots.txt ve temiz URL'ler yayından önce kurulur.",
          ar: "نضبط الوسوم الوصفية وOpen Graph وsitemap.xml وrobots.txt والروابط الواضحة قبل الإطلاق.",
        },
      },
      {
        title: { en: "Request forms", ru: "Формы заявок", zh: "咨询表单", tr: "Talep formları", ar: "نماذج الطلبات" },
        text: {
          en: "Contact and request forms with notifications by email or in a messenger.",
          ru: "Формы обратной связи и заявок с уведомлениями на почту или в мессенджер.",
          zh: "联系与咨询表单，通过邮件或即时通讯工具发送通知。",
          tr: "E-posta veya mesajlaşma uygulaması üzerinden bildirim gönderen iletişim ve talep formları.",
          ar: "نماذج تواصل وطلبات مع إشعارات عبر البريد الإلكتروني أو تطبيق مراسلة.",
        },
      },
      {
        title: { en: "Goals in analytics", ru: "Цели в аналитике", zh: "转化目标追踪", tr: "Analitikte hedefler", ar: "أهداف في التحليلات" },
        text: {
          en: "Analytics with goals on key actions: form submissions and clicks on buttons and contacts.",
          ru: "Аналитика с целями на ключевые действия: отправку форм, клики по кнопкам и контактам.",
          zh: "为关键行为设置分析目标：表单提交、按钮点击和联系方式点击。",
          tr: "Önemli eylemler için hedefli analitik: form gönderimleri, buton ve iletişim tıklamaları.",
          ar: "تحليلات بأهداف للإجراءات الأساسية: إرسال النماذج والنقر على الأزرار ووسائل التواصل.",
        },
      },
      {
        title: { en: "Editing without developers", ru: "Правки без разработчика", zh: "无需开发即可编辑", tr: "Geliştiricisiz düzenleme", ar: "تعديل دون مطوّر" },
        text: {
          en: "With the CMS option, you change texts, images and pages yourself, without writing code.",
          ru: "С опцией CMS вы сами меняете тексты, картинки и страницы, без программирования.",
          zh: "选择 CMS 选项后，您可以自行修改文字、图片和页面，无需写代码。",
          tr: "CMS seçeneğiyle metinleri, görselleri ve sayfaları kod yazmadan kendiniz değiştirirsiniz.",
          ar: "مع خيار نظام إدارة المحتوى، تعدّلون النصوص والصور والصفحات بأنفسكم دون كتابة شيفرة.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "Can I edit the site myself?",
          ru: "Смогу ли я сам редактировать сайт?",
          zh: "我可以自己编辑网站吗？",
          tr: "Siteyi kendim düzenleyebilir miyim?",
          ar: "هل يمكنني تعديل الموقع بنفسي؟",
        },
        a: {
          en: "Yes, if you choose the CMS option. You edit texts, images and pages in a simple admin interface. We hand over access and documentation that explains how it works. Without a CMS, content changes go through us.",
          ru: "Да, если выбрать опцию с CMS. Тексты, картинки и страницы меняются в простой админке. Мы передаём доступы и документацию, где описано, как всё устроено. Без CMS правки контента вносим мы.",
          zh: "可以，只要选择 CMS 选项。您可以在简洁的后台中修改文字、图片和页面。我们会移交访问权限和使用说明文档。如果不接入 CMS，内容修改由我们完成。",
          tr: "Evet, CMS seçeneğini tercih ederseniz. Metinleri, görselleri ve sayfaları basit bir yönetim arayüzünden düzenlersiniz. Erişimleri ve nasıl çalıştığını anlatan belgeleri teslim ediyoruz. CMS olmadan içerik değişikliklerini biz yaparız.",
          ar: "نعم، إذا اخترتم خيار نظام إدارة المحتوى. تعدّلون النصوص والصور والصفحات من لوحة إدارة بسيطة. نسلّمكم بيانات الوصول وتوثيقًا يشرح طريقة العمل. ومن دون نظام إدارة محتوى، نتولى نحن تعديلات المحتوى.",
        },
      },
      {
        q: {
          en: "What do you need from me to start?",
          ru: "Что нужно от меня для старта?",
          zh: "开始前需要我提供什么？",
          tr: "Başlamak için sizden ne gerekiyor?",
          ar: "ماذا تحتاجون مني للبدء؟",
        },
        a: {
          en: "A short brief: what the business does, who the site is for and what visitors should do on it. A logo, texts and photos help if you have them. If not, we agree on the structure and the content needed on the first call.",
          ru: "Короткий бриф: чем занимается бизнес, для кого сайт и какое действие должен сделать посетитель. Логотип, тексты и фото помогут, если они есть. Если нет, на первом созвоне согласуем структуру и нужный контент.",
          zh: "一份简短需求：业务内容、网站面向谁、希望访客完成什么操作。如果已有标志、文案和照片会更好；如果没有，我们会在第一次沟通中确定结构和所需内容。",
          tr: "Kısa bir brif: işletmenin ne yaptığı, sitenin kime yönelik olduğu ve ziyaretçinin ne yapması gerektiği. Logo, metin ve fotoğraflarınız varsa işimizi kolaylaştırır. Yoksa ilk görüşmede yapıyı ve gereken içeriği birlikte belirleriz.",
          ar: "موجز قصير: ما الذي يقدمه النشاط، ولمن الموقع، وما الإجراء المطلوب من الزائر. يفيدنا الشعار والنصوص والصور إن توفرت. وإن لم تتوفر، نتفق في المكالمة الأولى على الهيكل والمحتوى المطلوب.",
        },
      },
      {
        q: {
          en: "What happens after launch?",
          ru: "Что происходит после запуска?",
          zh: "上线之后呢？",
          tr: "Yayından sonra ne oluyor?",
          ar: "ماذا يحدث بعد الإطلاق؟",
        },
        a: {
          en: "The site is live on the domain with SSL, analytics and documentation. If you later need changes or new pages, we agree on them separately. Ongoing support is also available as a monthly retainer.",
          ru: "Сайт работает на домене с SSL, аналитикой и документацией. Если позже понадобятся правки или новые страницы, согласуем их отдельно. Постоянную поддержку можно оформить ежемесячным контрактом.",
          zh: "网站已在域名上运行，配有 SSL、数据分析和文档。之后如需修改或新增页面，我们单独商定。也可以按月签订持续支持服务。",
          tr: "Site; SSL, analitik ve belgelerle alan adında yayında olur. Sonradan değişiklik veya yeni sayfa gerekirse bunları ayrıca planlarız. Sürekli destek için aylık bir sözleşme de mümkündür.",
          ar: "يعمل الموقع على النطاق مع شهادة SSL والتحليلات والتوثيق. وإذا احتجتم لاحقًا إلى تعديلات أو صفحات جديدة، نتفق عليها بشكل منفصل. ويتوفر أيضًا دعم مستمر بعقد شهري.",
        },
      },
    ],
  },

  "mvp-sprint": {
    intro: {
      en: "An MVP is the smallest working version of a product that real users can try. In 3–6 weeks we design and build the core features, an admin panel and the infrastructure, so you can test the idea and show a working product to investors.",
      ru: "MVP — минимальная работающая версия продукта, которую уже можно дать реальным пользователям. За 3–6 недель проектируем и собираем ключевые функции, админ-панель и инфраструктуру, чтобы вы проверили идею и показали инвесторам живой продукт.",
      zh: "MVP 是可以交给真实用户试用的最小可用产品。我们在 3–6 周内完成核心功能、管理后台和基础设施的设计与开发，帮助您验证想法，并向投资人展示一个真正能用的产品。",
      tr: "MVP, gerçek kullanıcıların deneyebileceği en küçük çalışan ürün sürümüdür. 3–6 hafta içinde temel özellikleri, yönetim panelini ve altyapıyı tasarlayıp geliştiriyoruz; böylece fikrinizi test eder, yatırımcılara çalışan bir ürün gösterirsiniz.",
      ar: "الـ MVP هو أصغر نسخة عاملة من المنتج يمكن أن يجربها مستخدمون حقيقيون. خلال 3–6 أسابيع نصمم ونبني الميزات الأساسية ولوحة الإدارة والبنية التحتية، لتختبروا فكرتكم وتعرضوا على المستثمرين منتجًا يعمل فعلًا.",
    },
    stack: ["Figma", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS", "OpenAPI"],
    steps: [
      {
        title: { en: "Scope and priorities", ru: "Объём и приоритеты", zh: "范围与优先级", tr: "Kapsam ve öncelikler", ar: "النطاق والأولويات" },
        text: {
          en: "We define the main user scenario and cut the feature list to what is needed to test the idea.",
          ru: "Определяем главный пользовательский сценарий и сокращаем список функций до того, что нужно для проверки идеи.",
          zh: "确定核心用户场景，把功能清单精简到验证想法所必需的部分。",
          tr: "Ana kullanıcı senaryosunu belirliyor, özellik listesini fikri test etmek için gerekenlere indiriyoruz.",
          ar: "نحدد سيناريو المستخدم الأساسي ونختصر قائمة الميزات إلى ما يلزم لاختبار الفكرة.",
        },
      },
      {
        title: { en: "UX/UI design", ru: "UX/UI-дизайн", zh: "UX/UI 设计", tr: "UX/UI tasarımı", ar: "تصميم UX/UI" },
        text: {
          en: "User flows and screens in Figma. We agree on them before coding, so the build goes without surprises.",
          ru: "Пользовательские сценарии и экраны в Figma. Согласуем их до разработки, чтобы обойтись без сюрпризов.",
          zh: "在 Figma 中完成用户流程和界面，开发前确认，避免中途出现意外。",
          tr: "Kullanıcı akışları ve ekranlar Figma'da. Kodlamadan önce onaylıyoruz, böylece geliştirme sürprizsiz ilerler.",
          ar: "مسارات المستخدم والشاشات في Figma. نعتمدها قبل البرمجة، كي يسير التطوير دون مفاجآت.",
        },
      },
      {
        title: { en: "Development and demos", ru: "Разработка и демо", zh: "开发与演示", tr: "Geliştirme ve demolar", ar: "التطوير والعروض" },
        text: {
          en: "Frontend, backend and admin panel are built in short iterations. Weekly demos show progress on a staging server.",
          ru: "Фронтенд, бэкенд и админку делаем короткими итерациями. На еженедельных демо показываем прогресс на тестовом сервере.",
          zh: "前端、后端和管理后台按短周期迭代开发，每周在预发布环境中演示进展。",
          tr: "Frontend, backend ve yönetim paneli kısa döngülerle geliştirilir. Haftalık demolarda ilerlemeyi staging sunucusunda gösteririz.",
          ar: "نبني الواجهة الأمامية والخلفية ولوحة الإدارة على دورات قصيرة، ونعرض التقدم أسبوعيًا على خادم الاختبار.",
        },
      },
      {
        title: { en: "Launch and support", ru: "Запуск и поддержка", zh: "上线与支持", tr: "Yayın ve destek", ar: "الإطلاق والدعم" },
        text: {
          en: "Production deploy, API documentation and handover. For 2 weeks after launch we fix bugs and answer questions.",
          ru: "Деплой на боевой сервер, документация API и передача проекта. 2 недели после запуска исправляем ошибки и отвечаем на вопросы.",
          zh: "部署到生产环境，提供 API 文档并完成交接。上线后 2 周内修复问题、解答疑问。",
          tr: "Production deploy, API dokümantasyonu ve devir. Yayından sonraki 2 hafta hataları düzeltir, soruları yanıtlarız.",
          ar: "النشر على بيئة الإنتاج وتوثيق API والتسليم. ولمدة أسبوعين بعد الإطلاق نصلح الأخطاء ونجيب عن الأسئلة.",
        },
      },
    ],
    features: [
      {
        title: { en: "Core scenario first", ru: "Сначала главный сценарий", zh: "核心场景优先", tr: "Önce ana senaryo", ar: "السيناريو الأساسي أولًا" },
        text: {
          en: "The build focuses on the one path that proves the idea: sign-up, the key action and its result.",
          ru: "В фокусе — путь, который доказывает идею: регистрация, ключевое действие и его результат.",
          zh: "开发聚焦于能证明想法的那条路径：注册、关键操作及其结果。",
          tr: "Geliştirme, fikri kanıtlayan yola odaklanır: kayıt, temel eylem ve sonucu.",
          ar: "يركّز البناء على المسار الذي يثبت الفكرة: التسجيل، والإجراء الأساسي، ونتيجته.",
        },
      },
      {
        title: { en: "Accounts and roles", ru: "Аккаунты и роли", zh: "账户与角色", tr: "Hesaplar ve roller", ar: "الحسابات والأدوار" },
        text: {
          en: "Registration, login and separate access levels for users and administrators.",
          ru: "Регистрация, вход и разные уровни доступа для пользователей и администраторов.",
          zh: "注册、登录，以及用户和管理员的不同访问权限。",
          tr: "Kayıt, giriş ve kullanıcılar ile yöneticiler için ayrı erişim seviyeleri.",
          ar: "التسجيل وتسجيل الدخول ومستويات وصول منفصلة للمستخدمين والمسؤولين.",
        },
      },
      {
        title: { en: "Admin panel", ru: "Админ-панель", zh: "管理后台", tr: "Yönetim paneli", ar: "لوحة الإدارة" },
        text: {
          en: "Your team manages users, content and data without touching the code or the database.",
          ru: "Команда управляет пользователями, контентом и данными, не трогая код и базу данных.",
          zh: "团队无需接触代码或数据库，即可管理用户、内容和数据。",
          tr: "Ekibiniz kullanıcıları, içeriği ve verileri koda veya veritabanına dokunmadan yönetir.",
          ar: "يدير فريقكم المستخدمين والمحتوى والبيانات دون المساس بالشيفرة أو قاعدة البيانات.",
        },
      },
      {
        title: { en: "Documented API", ru: "Описанный API", zh: "有文档的 API", tr: "Belgelenmiş API", ar: "API موثّق" },
        text: {
          en: "The API is described in OpenAPI, so a mobile app or new developers can connect later.",
          ru: "API описан в OpenAPI: позже к нему легко подключить мобильное приложение или новых разработчиков.",
          zh: "API 采用 OpenAPI 描述，日后便于接入移动应用或新的开发人员。",
          tr: "API, OpenAPI ile tanımlanır; ileride bir mobil uygulama veya yeni geliştiriciler kolayca bağlanabilir.",
          ar: "يُوصف الـ API بمعيار OpenAPI، ليسهل لاحقًا ربط تطبيق جوال أو انضمام مطورين جدد.",
        },
      },
      {
        title: { en: "Two environments", ru: "Два окружения", zh: "两套环境", tr: "İki ortam", ar: "بيئتان منفصلتان" },
        text: {
          en: "Staging for testing changes, production for real users. Updates go to staging first.",
          ru: "Тестовое окружение для проверки изменений, боевое — для реальных пользователей. Обновления сначала идут на тест.",
          zh: "预发布环境用于测试改动，生产环境面向真实用户。更新先发布到预发布环境。",
          tr: "Değişiklikleri test etmek için staging, gerçek kullanıcılar için production. Güncellemeler önce staging'e gider.",
          ar: "بيئة اختبار لتجربة التغييرات وبيئة إنتاج للمستخدمين الحقيقيين. تذهب التحديثات إلى الاختبار أولًا.",
        },
      },
      {
        title: { en: "Room to grow", ru: "Запас для роста", zh: "预留扩展空间", tr: "Büyümeye hazır", ar: "قابلية للتوسع" },
        text: {
          en: "The structure lets you add features after validation without rewriting the core.",
          ru: "Структура позволяет добавлять функции после проверки идеи, не переписывая основу.",
          zh: "架构支持在验证之后继续添加功能，无需重写核心部分。",
          tr: "Yapı, doğrulamadan sonra çekirdeği yeniden yazmadan yeni özellikler eklemeye imkân verir.",
          ar: "تتيح البنية إضافة ميزات بعد اختبار الفكرة دون إعادة كتابة الأساس.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "What fits into an MVP?",
          ru: "Что входит в MVP?",
          zh: "MVP 包含哪些内容？",
          tr: "MVP'ye neler sığar?",
          ar: "ما الذي يتضمنه الـ MVP؟",
        },
        a: {
          en: "The core features needed to test the main hypothesis. On the first call we split the list into what is needed at launch and what can wait. The scope is fixed before work starts; larger changes go through a change request.",
          ru: "Ключевые функции, которые нужны для проверки главной гипотезы. На первом созвоне делим список на то, что нужно к запуску, и то, что подождёт. Объём фиксируем до старта, крупные изменения проходят через запрос на изменение.",
          zh: "验证核心假设所需的关键功能。第一次沟通时，我们会把功能清单分为上线必需和可以延后两部分。范围在开工前确定，较大的变更通过变更申请流程处理。",
          tr: "Ana hipotezi test etmek için gereken temel özellikler. İlk görüşmede listeyi yayın için gerekenler ve bekleyebilecekler olarak ayırırız. Kapsam işe başlamadan sabitlenir; büyük değişiklikler değişiklik talebiyle ilerler.",
          ar: "الميزات الأساسية اللازمة لاختبار الفرضية الرئيسية. في المكالمة الأولى نقسم القائمة إلى ما يلزم للإطلاق وما يمكن تأجيله. يُثبَّت النطاق قبل بدء العمل، وتمر التغييرات الكبيرة عبر طلب تغيير.",
        },
      },
      {
        q: {
          en: "Can development continue after the MVP?",
          ru: "Можно ли продолжить разработку после MVP?",
          zh: "MVP 之后可以继续开发吗？",
          tr: "MVP'den sonra geliştirme devam edebilir mi?",
          ar: "هل يمكن مواصلة التطوير بعد الـ MVP؟",
        },
        a: {
          en: "Yes. The MVP comes with infrastructure, API documentation and handover docs, so the next stage can continue with us or with another team. After validation, the product can grow into a full build with integrations and scaling.",
          ru: "Да. MVP сдаётся с инфраструктурой, документацией API и передаточной документацией, поэтому следующий этап можно продолжить с нами или с другой командой. После проверки идеи продукт можно развить до полной сборки с интеграциями и масштабированием.",
          zh: "可以。MVP 交付时附带基础设施、API 文档和交接文档，下一阶段可以继续由我们或其他团队开发。验证完成后，产品可以发展为包含集成与扩展能力的完整版本。",
          tr: "Evet. MVP; altyapı, API dokümantasyonu ve devir belgeleriyle teslim edilir, bu yüzden sonraki aşama bizimle veya başka bir ekiple sürebilir. Doğrulamadan sonra ürün, entegrasyonlar ve ölçeklemeyle tam bir ürüne dönüşebilir.",
          ar: "نعم. يُسلَّم الـ MVP مع البنية التحتية وتوثيق API ووثائق التسليم، لذا يمكن مواصلة المرحلة التالية معنا أو مع فريق آخر. وبعد اختبار الفكرة، يمكن تطوير المنتج إلى نسخة كاملة بتكاملات وقابلية للتوسع.",
        },
      },
      {
        q: {
          en: "What do the 2 weeks of support include?",
          ru: "Что входит в 2\u00A0недели поддержки?",
          zh: "2 周支持包含什么？",
          tr: "2 haftalık destek neleri kapsar?",
          ar: "ماذا يشمل أسبوعا الدعم؟",
        },
        a: {
          en: "For 2 weeks after launch we fix bugs, help with deployment issues and answer your team's questions about the product. After that, support can continue under a monthly retainer if you need it.",
          ru: "2 недели после запуска исправляем ошибки, помогаем с вопросами по серверу и деплою и отвечаем на вопросы команды по продукту. Дальше поддержку можно продолжить по ежемесячному контракту, если она нужна.",
          zh: "上线后 2 周内，我们修复问题、协助处理部署相关事项，并解答团队对产品的疑问。之后如有需要，可以按月签订支持服务。",
          tr: "Yayından sonraki 2 hafta boyunca hataları düzeltir, deploy sorunlarında yardım eder ve ekibinizin ürünle ilgili sorularını yanıtlarız. Sonrasında gerekirse destek aylık bir sözleşmeyle devam edebilir.",
          ar: "خلال أسبوعين بعد الإطلاق نصلح الأخطاء ونساعد في مسائل النشر ونجيب عن أسئلة فريقكم حول المنتج. وبعد ذلك يمكن مواصلة الدعم بعقد شهري عند الحاجة.",
        },
      },
    ],
  },

  "startup-key": {
    intro: {
      en: "A full product build for funded startups and companies launching a new digital product. We start with discovery and architecture, then design, develop, integrate and launch, with security and future scale in mind. The timeline is 6–12+ weeks, depending on scope.",
      ru: "Полная сборка продукта для профинансированных стартапов и компаний, которые запускают новый цифровой продукт. Начинаем с исследования и архитектуры, затем проектируем, разрабатываем, подключаем интеграции и запускаем, с учётом безопасности и будущего роста. Срок — 6–12+ недель в зависимости от объёма.",
      zh: "面向已获融资的初创公司和推出新数字产品的企业，提供完整的产品构建。我们从需求探索和架构设计开始，再到设计、开发、集成和上线，全程考虑安全与未来扩展。周期为 6–12+ 周，视范围而定。",
      tr: "Yatırım almış startup'lar ve yeni bir dijital ürün çıkaran şirketler için eksiksiz ürün geliştirme. Keşif ve mimariyle başlıyor, ardından güvenliği ve gelecekteki ölçeği gözeterek tasarlıyor, geliştiriyor, entegre ediyor ve yayına alıyoruz. Süre, kapsama göre 6–12+ haftadır.",
      ar: "بناء منتج متكامل للشركات الناشئة الممولة وللشركات التي تطلق منتجًا رقميًا جديدًا. نبدأ بالاستكشاف والبنية المعمارية، ثم نصمم ونطوّر وننفذ التكاملات ونطلق المنتج، مع مراعاة الأمان والتوسع مستقبلًا. المدة 6–12+ أسبوعًا حسب النطاق.",
    },
    stack: ["Figma", "Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "Docker", "AWS"],
    steps: [
      {
        title: { en: "Discovery and architecture", ru: "Исследование и архитектура", zh: "需求探索与架构", tr: "Keşif ve mimari", ar: "الاستكشاف والبنية المعمارية" },
        text: {
          en: "We study the business, users and constraints, then fix the scope, the architecture and a plan by stages.",
          ru: "Разбираемся в бизнесе, пользователях и ограничениях, затем фиксируем объём, архитектуру и план по этапам.",
          zh: "深入了解业务、用户和约束条件，然后确定范围、架构和分阶段计划。",
          tr: "İşi, kullanıcıları ve kısıtları inceliyor, ardından kapsamı, mimariyi ve aşamalı planı netleştiriyoruz.",
          ar: "ندرس النشاط والمستخدمين والقيود، ثم نثبّت النطاق والبنية المعمارية وخطة العمل على مراحل.",
        },
      },
      {
        title: { en: "Design system", ru: "Дизайн-система", zh: "设计系统", tr: "Tasarım sistemi", ar: "نظام التصميم" },
        text: {
          en: "Components, styles and key screens in Figma, so the interface stays consistent as the product grows.",
          ru: "Компоненты, стили и ключевые экраны в Figma, чтобы интерфейс оставался цельным по мере роста продукта.",
          zh: "在 Figma 中建立组件、样式和关键界面，让产品在扩展过程中保持界面一致。",
          tr: "Figma'da bileşenler, stiller ve ana ekranlar; ürün büyüdükçe arayüz tutarlı kalır.",
          ar: "مكونات وأنماط وشاشات أساسية في Figma، لتبقى الواجهة متناسقة مع نمو المنتج.",
        },
      },
      {
        title: { en: "Development and integrations", ru: "Разработка и интеграции", zh: "开发与集成", tr: "Geliştirme ve entegrasyonlar", ar: "التطوير والتكاملات" },
        text: {
          en: "Full-stack development in iterations with weekly demos. We connect the external services the product needs.",
          ru: "Полная разработка итерациями с еженедельными демо. Подключаем внешние сервисы, которые нужны продукту.",
          zh: "按迭代进行全栈开发，每周演示进展，并接入产品所需的外部服务。",
          tr: "Haftalık demolarla döngüler halinde full-stack geliştirme. Ürünün ihtiyaç duyduğu dış servisleri bağlıyoruz.",
          ar: "تطوير متكامل على دورات مع عروض أسبوعية، ونربط الخدمات الخارجية التي يحتاجها المنتج.",
        },
      },
      {
        title: { en: "Audit, launch, support", ru: "Аудит, запуск, поддержка", zh: "审计、上线与支持", tr: "Denetim, yayın, destek", ar: "التدقيق والإطلاق والدعم" },
        text: {
          en: "Security audit, CI/CD and production launch. Then 1 month of support and a plan for what comes next.",
          ru: "Аудит безопасности, CI/CD и запуск в продакшн. Затем 1 месяц поддержки и план дальнейшего развития.",
          zh: "安全审计、CI/CD 与生产上线。随后提供 1 个月支持，以及后续发展计划。",
          tr: "Güvenlik denetimi, CI/CD ve production yayını. Ardından 1 ay destek ve sonraki adımlar için bir plan.",
          ar: "تدقيق أمني وCI/CD وإطلاق على بيئة الإنتاج، ثم شهر من الدعم وخطة للمرحلة التالية.",
        },
      },
    ],
    features: [
      {
        title: { en: "Architecture for growth", ru: "Архитектура под рост", zh: "面向增长的架构", tr: "Büyümeye uygun mimari", ar: "بنية تستوعب النمو" },
        text: {
          en: "Data model and services are designed so that load and new features can grow without rebuilding the core.",
          ru: "Модель данных и сервисы проектируем так, чтобы нагрузка и новые функции росли без переделки основы.",
          zh: "数据模型和服务的设计让负载与新功能可以持续增长，而无需重建核心。",
          tr: "Veri modeli ve servisler, yük ve yeni özellikler çekirdeği yeniden kurmadan büyüyebilecek şekilde tasarlanır.",
          ar: "نصمم نموذج البيانات والخدمات بحيث يمكن زيادة الحمل والميزات دون إعادة بناء الأساس.",
        },
      },
      {
        title: { en: "Third-party integrations", ru: "Внешние интеграции", zh: "第三方集成", tr: "Dış entegrasyonlar", ar: "تكاملات خارجية" },
        text: {
          en: "Payment systems, CRM, ERP and other services with an API, connected and documented.",
          ru: "Платёжные системы, CRM, ERP и другие сервисы с API — подключены и описаны в документации.",
          zh: "支付系统、CRM、ERP 及其他提供 API 的服务，完成对接并写入文档。",
          tr: "Ödeme sistemleri, CRM, ERP ve API sunan diğer servisler bağlanır ve belgelenir.",
          ar: "أنظمة الدفع وCRM وERP وغيرها من الخدمات التي توفر API، مربوطة وموثقة.",
        },
      },
      {
        title: { en: "Automated releases", ru: "Автоматические релизы", zh: "自动化发布", tr: "Otomatik sürümler", ar: "إصدارات مؤتمتة" },
        text: {
          en: "CI/CD pipelines run tests and deploy changes, so releases are routine and predictable.",
          ru: "CI/CD прогоняет тесты и выкатывает изменения, поэтому релизы проходят спокойно и предсказуемо.",
          zh: "CI/CD 流水线自动运行测试并部署变更，让发布成为可预期的日常工作。",
          tr: "CI/CD hatları testleri çalıştırır ve değişiklikleri yayına alır; sürümler rutin ve öngörülebilir olur.",
          ar: "تشغّل مسارات CI/CD الاختبارات وتنشر التغييرات، فتصبح الإصدارات روتينية ويمكن توقعها.",
        },
      },
      {
        title: { en: "Security audit", ru: "Аудит безопасности", zh: "安全审计", tr: "Güvenlik denetimi", ar: "تدقيق أمني" },
        text: {
          en: "Before launch we check access control, data storage and dependencies, and fix what we find.",
          ru: "Перед запуском проверяем права доступа, хранение данных и зависимости и исправляем найденное.",
          zh: "上线前检查访问控制、数据存储和依赖项，并修复发现的问题。",
          tr: "Yayından önce erişim kontrolünü, veri depolamayı ve bağımlılıkları kontrol eder, bulduklarımızı düzeltiriz.",
          ar: "قبل الإطلاق نفحص صلاحيات الوصول وتخزين البيانات والاعتماديات، ونصلح ما نجده.",
        },
      },
      {
        title: { en: "Monitoring and logs", ru: "Мониторинг и логи", zh: "监控与日志", tr: "İzleme ve loglar", ar: "المراقبة والسجلات" },
        text: {
          en: "Error tracking, logs and alerts make problems visible before users report them.",
          ru: "Отслеживание ошибок, логи и оповещения показывают проблемы раньше, чем о них напишут пользователи.",
          zh: "错误追踪、日志和告警让问题在用户反馈之前就被发现。",
          tr: "Hata takibi, loglar ve uyarılar sorunları kullanıcılar bildirmeden önce görünür kılar.",
          ar: "تتبع الأخطاء والسجلات والتنبيهات يكشف المشكلات قبل أن يبلّغ عنها المستخدمون.",
        },
      },
      {
        title: { en: "Technical documentation", ru: "Техническая документация", zh: "技术文档", tr: "Teknik belgeler", ar: "التوثيق التقني" },
        text: {
          en: "Architecture, API, deployment and operations are documented for your team and future developers.",
          ru: "Архитектура, API, деплой и эксплуатация описаны для вашей команды и будущих разработчиков.",
          zh: "架构、API、部署和运维均有文档，便于您的团队和后续开发人员使用。",
          tr: "Mimari, API, deploy ve operasyon; ekibiniz ve gelecekteki geliştiriciler için belgelenir.",
          ar: "البنية المعمارية والـ API والنشر والتشغيل موثقة لفريقكم وللمطورين مستقبلًا.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "How is this different from the MVP Sprint?",
          ru: "Чем это отличается от MVP-спринта?",
          zh: "这和 MVP 冲刺有什么区别？",
          tr: "MVP Sprint'ten farkı nedir?",
          ar: "ما الفرق بين هذا وسباق MVP؟",
        },
        a: {
          en: "An MVP tests one idea with core features. Startup Under Key is a full product: discovery, a design system, complex features, integrations, CI/CD, a security audit and 1 month of support. It suits products that already have funding or a clear business need.",
          ru: "MVP проверяет одну идею на ключевых функциях. «Стартап под ключ» — полный продукт: исследование, дизайн-система, сложные функции, интеграции, CI/CD, аудит безопасности и 1 месяц поддержки. Подходит, когда у продукта уже есть финансирование или понятная бизнес-задача.",
          zh: "MVP 用核心功能验证一个想法。创业项目交钥匙则是完整产品：需求探索、设计系统、复杂功能、系统集成、CI/CD、安全审计以及 1 个月支持。适合已有融资或业务需求明确的产品。",
          tr: "MVP, tek bir fikri temel özelliklerle test eder. Startup Under Key ise eksiksiz bir üründür: keşif, tasarım sistemi, karmaşık özellikler, entegrasyonlar, CI/CD, güvenlik denetimi ve 1 ay destek. Yatırımı veya net bir iş ihtiyacı olan ürünler için uygundur.",
          ar: "الـ MVP يختبر فكرة واحدة بميزات أساسية. أما «شركة ناشئة جاهزة للتشغيل» فهي منتج كامل: استكشاف ونظام تصميم وميزات معقدة وتكاملات وCI/CD وتدقيق أمني وشهر من الدعم. تناسب المنتجات التي لديها تمويل أو حاجة عمل واضحة.",
        },
      },
      {
        q: {
          en: "Why is the timeline 6–12+ weeks?",
          ru: "Почему срок 6–12+\u00A0недель?",
          zh: "为什么周期是 6–12+ 周？",
          tr: "Süre neden 6–12+ hafta?",
          ar: "لماذا المدة 6–12+ أسبوعًا؟",
        },
        a: {
          en: "The final timeline depends on the scope, the number of integrations and feedback cycles. After discovery we fix the scope, the stages and the price, so you know the dates before development starts.",
          ru: "Итоговый срок зависит от объёма, количества интеграций и циклов обратной связи. После исследования фиксируем объём, этапы и цену, поэтому сроки известны до начала разработки.",
          zh: "最终周期取决于范围、集成数量和反馈周期。需求探索结束后，我们会确定范围、阶段和价格，让您在开发开始前就清楚时间安排。",
          tr: "Nihai süre kapsama, entegrasyon sayısına ve geri bildirim döngülerine bağlıdır. Keşiften sonra kapsamı, aşamaları ve fiyatı sabitleriz; böylece tarihleri geliştirme başlamadan bilirsiniz.",
          ar: "تعتمد المدة النهائية على النطاق وعدد التكاملات ودورات الملاحظات. بعد الاستكشاف نثبّت النطاق والمراحل والسعر، لتعرفوا المواعيد قبل بدء التطوير.",
        },
      },
      {
        q: {
          en: "What happens after launch?",
          ru: "Что происходит после запуска?",
          zh: "上线之后呢？",
          tr: "Yayından sonra ne oluyor?",
          ar: "ماذا يحدث بعد الإطلاق؟",
        },
        a: {
          en: "1 month of support is included: bug fixes, monitoring and help with the first releases. You also get technical documentation and a support plan. After that, support can continue under a monthly retainer.",
          ru: "В пакет входит 1 месяц поддержки: исправление ошибок, мониторинг и помощь с первыми релизами. Вы также получаете техническую документацию и план поддержки. Дальше поддержку можно продолжить по ежемесячному контракту.",
          zh: "包含 1 个月支持：修复问题、系统监控，并协助完成首批版本发布。您还会获得技术文档和支持方案。之后可以按月签订持续支持服务。",
          tr: "1 aylık destek dahildir: hata düzeltmeleri, izleme ve ilk sürümlerde yardım. Ayrıca teknik belgeler ve bir destek planı alırsınız. Sonrasında destek aylık bir sözleşmeyle devam edebilir.",
          ar: "يشمل العرض شهرًا من الدعم: إصلاح الأخطاء والمراقبة والمساعدة في الإصدارات الأولى. كما تحصلون على التوثيق التقني وخطة دعم. وبعد ذلك يمكن مواصلة الدعم بعقد شهري.",
        },
      },
    ],
  },

  "mobile-app": {
    intro: {
      en: "An app for iOS and Android built from one codebase, for delivery, booking, loyalty or marketplace businesses. We design the screens, build the app and the backend with an admin panel, connect push notifications and payments, and release to both stores in 6–10 weeks.",
      ru: "Приложение для iOS и Android на одной кодовой базе — для доставки, бронирования, программ лояльности или маркетплейса. Проектируем экраны, разрабатываем приложение и бэкенд с админкой, подключаем push-уведомления и оплату и публикуем в оба стора за 6–10 недель.",
      zh: "一套代码同时覆盖 iOS 与 Android，适用于外卖配送、预订、会员积分或交易平台类业务。我们设计界面、开发应用及带管理后台的后端，接入推送通知与支付，并在 6–10 周内上架两大应用商店。",
      tr: "Teslimat, rezervasyon, sadakat veya pazar yeri işletmeleri için tek kod tabanından iOS ve Android uygulaması. Ekranları tasarlıyor, uygulamayı ve yönetim panelli backend'i geliştiriyor, push bildirimleri ile ödemeleri bağlıyor ve 6–10 hafta içinde iki mağazada yayınlıyoruz.",
      ar: "تطبيق لنظامي iOS وAndroid من قاعدة شيفرة واحدة، لأنشطة التوصيل والحجز وبرامج الولاء والأسواق الإلكترونية. نصمم الشاشات ونطوّر التطبيق والواجهة الخلفية مع لوحة الإدارة، ونربط الإشعارات والمدفوعات، وننشره في المتجرين خلال 6–10 أسابيع.",
    },
    stack: ["Figma", "React Native", "Flutter", "TypeScript", "Node.js", "PostgreSQL", "Firebase Cloud Messaging"],
    steps: [
      {
        title: { en: "Scenarios and design", ru: "Сценарии и дизайн", zh: "场景与设计", tr: "Senaryolar ve tasarım", ar: "السيناريوهات والتصميم" },
        text: {
          en: "We map user scenarios and design screens for iOS and Android in Figma, following each platform's guidelines.",
          ru: "Описываем пользовательские сценарии и рисуем экраны под iOS и Android в Figma с учётом правил каждой платформы.",
          zh: "梳理用户场景，在 Figma 中按各平台规范设计 iOS 与 Android 界面。",
          tr: "Kullanıcı senaryolarını çıkarıyor, her platformun kurallarına uyarak iOS ve Android ekranlarını Figma'da tasarlıyoruz.",
          ar: "نرسم سيناريوهات المستخدم ونصمم شاشات iOS وAndroid في Figma وفق إرشادات كل منصة.",
        },
      },
      {
        title: { en: "App and backend", ru: "Приложение и бэкенд", zh: "应用与后端", tr: "Uygulama ve backend", ar: "التطبيق والواجهة الخلفية" },
        text: {
          en: "One codebase for both platforms, plus backend, API and admin panel. You test builds on a real phone during development.",
          ru: "Одна кодовая база для обеих платформ, плюс бэкенд, API и админка. Сборки вы проверяете на своём телефоне прямо в процессе.",
          zh: "一套代码覆盖两个平台，同时开发后端、API 和管理后台。开发期间您可以在真机上试用测试版本。",
          tr: "İki platform için tek kod tabanı, ayrıca backend, API ve yönetim paneli. Geliştirme sırasında sürümleri gerçek telefonda test edersiniz.",
          ar: "قاعدة شيفرة واحدة للمنصتين، إضافة إلى الواجهة الخلفية والـ API ولوحة الإدارة. تجرّبون النسخ على هاتف حقيقي أثناء التطوير.",
        },
      },
      {
        title: { en: "Push and payments", ru: "Push и оплата", zh: "推送与支付", tr: "Push ve ödemeler", ar: "الإشعارات والمدفوعات" },
        text: {
          en: "We connect push notifications and payments, then test the app on real iOS and Android devices.",
          ru: "Подключаем push-уведомления и оплату, затем тестируем приложение на реальных устройствах iOS и Android.",
          zh: "接入推送通知与支付，然后在真实的 iOS 和 Android 设备上测试应用。",
          tr: "Push bildirimlerini ve ödemeleri bağlıyor, ardından uygulamayı gerçek iOS ve Android cihazlarda test ediyoruz.",
          ar: "نربط الإشعارات الفورية والمدفوعات، ثم نختبر التطبيق على أجهزة iOS وAndroid حقيقية.",
        },
      },
      {
        title: { en: "Store release", ru: "Публикация в сторах", zh: "应用商店上架", tr: "Mağaza yayını", ar: "النشر في المتاجر" },
        text: {
          en: "We prepare store listings, submit to App Store and Google Play review and handle reviewers' comments.",
          ru: "Готовим страницы в сторах, отправляем приложение на модерацию в App Store и Google Play и отвечаем на замечания.",
          zh: "准备商店页面，提交 App Store 与 Google Play 审核，并处理审核意见。",
          tr: "Mağaza sayfalarını hazırlıyor, App Store ve Google Play incelemesine gönderiyor ve gelen yorumları ele alıyoruz.",
          ar: "نجهّز صفحات المتجر، ونرسل التطبيق لمراجعة App Store وGoogle Play، ونتعامل مع ملاحظات المراجعين.",
        },
      },
    ],
    features: [
      {
        title: { en: "One codebase", ru: "Одна кодовая база", zh: "一套代码", tr: "Tek kod tabanı", ar: "قاعدة شيفرة واحدة" },
        text: {
          en: "iOS and Android share most of the code, so new features reach both platforms at once.",
          ru: "iOS и Android используют общий код, поэтому новые функции появляются на обеих платформах одновременно.",
          zh: "iOS 与 Android 共用大部分代码，新功能可同时上线两个平台。",
          tr: "iOS ve Android kodun büyük kısmını paylaşır; yeni özellikler iki platforma aynı anda gelir.",
          ar: "تتشارك iOS وAndroid معظم الشيفرة، فتصل الميزات الجديدة إلى المنصتين في الوقت نفسه.",
        },
      },
      {
        title: { en: "Native look and feel", ru: "Привычное поведение", zh: "原生体验", tr: "Doğal kullanım hissi", ar: "تجربة أصيلة" },
        text: {
          en: "Navigation, gestures and system elements follow the conventions of each platform.",
          ru: "Навигация, жесты и системные элементы работают так, как привыкли пользователи каждой платформы.",
          zh: "导航、手势和系统元素均遵循各平台的使用习惯。",
          tr: "Gezinme, hareketler ve sistem öğeleri her platformun alışkanlıklarına uyar.",
          ar: "التنقل والإيماءات وعناصر النظام تتبع أعراف كل منصة.",
        },
      },
      {
        title: { en: "Push notifications", ru: "Push-уведомления", zh: "推送通知", tr: "Push bildirimleri", ar: "الإشعارات الفورية" },
        text: {
          en: "Order statuses, reminders and promotions, sent automatically or from the admin panel.",
          ru: "Статусы заказов, напоминания и акции — автоматически или вручную из админки.",
          zh: "订单状态、提醒和促销信息，可自动发送或从管理后台手动发送。",
          tr: "Sipariş durumları, hatırlatmalar ve kampanyalar; otomatik ya da yönetim panelinden gönderilir.",
          ar: "حالات الطلبات والتذكيرات والعروض، تُرسل تلقائيًا أو من لوحة الإدارة.",
        },
      },
      {
        title: { en: "In-app payments", ru: "Оплата в приложении", zh: "应用内支付", tr: "Uygulama içi ödeme", ar: "الدفع داخل التطبيق" },
        text: {
          en: "Card payments through a payment provider, with payment statuses visible in the admin panel.",
          ru: "Оплата картой через платёжного провайдера, статусы платежей видны в админке.",
          zh: "通过支付服务商实现银行卡支付，支付状态可在管理后台查看。",
          tr: "Ödeme sağlayıcısı üzerinden kartla ödeme; ödeme durumları yönetim panelinde görünür.",
          ar: "الدفع بالبطاقة عبر مزوّد دفع، مع ظهور حالات الدفع في لوحة الإدارة.",
        },
      },
      {
        title: { en: "Admin panel", ru: "Админ-панель", zh: "管理后台", tr: "Yönetim paneli", ar: "لوحة الإدارة" },
        text: {
          en: "Manage users, orders, content and notifications from a web panel, without developers.",
          ru: "Пользователи, заказы, контент и рассылки управляются из веб-панели, без разработчиков.",
          zh: "通过网页后台管理用户、订单、内容和通知，无需开发人员介入。",
          tr: "Kullanıcılar, siparişler, içerik ve bildirimler geliştirici olmadan web panelinden yönetilir.",
          ar: "إدارة المستخدمين والطلبات والمحتوى والإشعارات من لوحة ويب، دون الحاجة إلى مطورين.",
        },
      },
      {
        title: { en: "Usage analytics", ru: "Аналитика использования", zh: "使用数据分析", tr: "Kullanım analitiği", ar: "تحليلات الاستخدام" },
        text: {
          en: "Installs, active users and key actions in one place, so you see how the app is used.",
          ru: "Установки, активные пользователи и ключевые действия в одном месте — видно, как используют приложение.",
          zh: "安装量、活跃用户和关键行为集中呈现，清楚了解应用的使用情况。",
          tr: "Kurulumlar, aktif kullanıcılar ve önemli eylemler tek yerde; uygulamanın nasıl kullanıldığını görürsünüz.",
          ar: "مرات التثبيت والمستخدمون النشطون والإجراءات الأساسية في مكان واحد، لتروا كيف يُستخدم التطبيق.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "React Native or Flutter?",
          ru: "React Native или Flutter?",
          zh: "选 React Native 还是 Flutter？",
          tr: "React Native mi, Flutter mı?",
          ar: "React Native أم Flutter؟",
        },
        a: {
          en: "Both build iOS and Android apps from one codebase. We choose based on the product: the device features it needs, the integrations and who will maintain it later. We explain the choice before development starts.",
          ru: "Оба позволяют собрать приложение для iOS и Android на одной кодовой базе. Выбираем под продукт: какие функции устройства нужны, какие интеграции и кто будет поддерживать приложение дальше. Объясняем выбор до начала разработки.",
          zh: "两者都能用一套代码构建 iOS 和 Android 应用。我们根据产品来选择：需要哪些设备功能、涉及哪些集成，以及后续由谁维护。开发开始前，我们会说明选择理由。",
          tr: "İkisi de tek kod tabanından iOS ve Android uygulaması geliştirmeyi sağlar. Seçimi ürüne göre yaparız: hangi cihaz özellikleri ve entegrasyonlar gerekiyor, uygulamanın bakımını sonra kim yapacak. Seçimi geliştirme başlamadan önce açıklarız.",
          ar: "كلاهما يتيح بناء تطبيق iOS وAndroid من قاعدة شيفرة واحدة. نختار حسب المنتج: ميزات الجهاز المطلوبة والتكاملات ومن سيتولى صيانة التطبيق لاحقًا. ونشرح سبب الاختيار قبل بدء التطوير.",
        },
      },
      {
        q: {
          en: "Who publishes the app in the stores?",
          ru: "Кто публикует приложение в сторах?",
          zh: "谁负责把应用上架到商店？",
          tr: "Uygulamayı mağazalarda kim yayınlıyor?",
          ar: "من ينشر التطبيق في المتاجر؟",
        },
        a: {
          en: "We do. We prepare screenshots, descriptions and builds, submit the app to App Store and Google Play and respond to reviewers' comments. You will need developer accounts in both stores, and we help set them up.",
          ru: "Мы. Готовим скриншоты, описания и сборки, отправляем приложение в App Store и Google Play и отвечаем на замечания модерации. Понадобятся аккаунты разработчика в обоих сторах — поможем их настроить.",
          zh: "由我们负责。我们准备截图、描述和安装包，提交到 App Store 与 Google Play，并回复审核意见。您需要在两个商店都有开发者账号，我们会协助完成设置。",
          tr: "Biz yayınlıyoruz. Ekran görüntülerini, açıklamaları ve sürümleri hazırlıyor, uygulamayı App Store ve Google Play'e gönderiyor, inceleme yorumlarını yanıtlıyoruz. Her iki mağazada geliştirici hesabı gerekir; kurulumunda yardımcı oluruz.",
          ar: "نحن. نجهّز لقطات الشاشة والأوصاف ونسخ التطبيق، ونرسله إلى App Store وGoogle Play، ونرد على ملاحظات المراجعة. ستحتاجون إلى حسابات مطوّر في المتجرين، ونساعدكم في إعدادها.",
        },
      },
      {
        q: {
          en: "Do I need a separate backend?",
          ru: "Нужен ли отдельный бэкенд?",
          zh: "需要另外准备后端吗？",
          tr: "Ayrı bir backend gerekiyor mu?",
          ar: "هل أحتاج إلى واجهة خلفية منفصلة؟",
        },
        a: {
          en: "No. The backend, API and admin panel are part of the package. If you already have a backend or an existing system, we can connect the app to it after we review its API.",
          ru: "Нет. Бэкенд, API и админ-панель входят в пакет. Если у вас уже есть бэкенд или рабочая система, можем подключить приложение к ней после того, как изучим её API.",
          zh: "不需要。后端、API 和管理后台都包含在套餐中。如果您已有后端或现有系统，我们在评估其 API 后可以将应用对接上去。",
          tr: "Hayır. Backend, API ve yönetim paneli pakete dahildir. Zaten bir backend'iniz veya mevcut bir sisteminiz varsa, API'sini inceledikten sonra uygulamayı ona bağlayabiliriz.",
          ar: "لا. الواجهة الخلفية والـ API ولوحة الإدارة جزء من الباقة. وإذا كان لديكم نظام قائم أو واجهة خلفية، يمكننا ربط التطبيق بها بعد مراجعة الـ API الخاص بها.",
        },
      },
    ],
  },
};
