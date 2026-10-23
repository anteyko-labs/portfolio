import type { ServiceDetails } from "./types";

// Long-form content for: branding, web3-addon, it-support, fintech.
// Must agree with the package cards in translations.ts (price, timeline, scope).
export const PART_B: ServiceDetails = {
  // ───────────── Branding: From $2k, 3–6 weeks ─────────────
  branding: {
    intro: {
      en: "A brand has to be clear before it is beautiful. We start with the market and the audience, define what the company stands for, and only then design the name, logo and visual style. You get a brandbook and templates your team can use right away.",
      ru: "Бренд сначала должен быть понятным, а уже потом красивым. Мы начинаем с рынка и аудитории, формулируем, за что стоит компания, и только после этого берёмся за название, логотип и стиль. На выходе — брендбук и шаблоны, с которыми команда работает сразу.",
      zh: "品牌要先清晰，再谈好看。我们从市场与受众入手，先明确公司的立场与价值，再设计名称、标志和视觉风格。最终交付品牌手册和模板，团队可以立即使用。",
      tr: "Bir marka güzel olmadan önce anlaşılır olmalı. Pazardan ve hedef kitleden başlıyor, şirketin neyi temsil ettiğini netleştiriyor, ancak ondan sonra isim, logo ve görsel stil üzerinde çalışıyoruz. Sonunda ekibinizin hemen kullanabileceği bir marka kitabı ve şablonlar teslim ediyoruz.",
      ar: "يجب أن تكون العلامة واضحة قبل أن تكون جميلة. نبدأ بالسوق والجمهور، ونحدد ما تمثّله الشركة، وبعد ذلك فقط نعمل على الاسم والشعار والأسلوب البصري. في النهاية تحصلون على دليل هوية وقوالب يستخدمها فريقكم مباشرة.",
    },
    stack: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Miro", "Notion"],
    steps: [
      {
        title: { en: "Research", ru: "Исследование", zh: "调研", tr: "Araştırma", ar: "البحث" },
        text: {
          en: "We study the market, competitors and audience: interviews, reviews, and how competitors speak and look.",
          ru: "Изучаем рынок, конкурентов и аудиторию: интервью, отзывы, как говорят и как выглядят конкуренты.",
          zh: "研究市场、竞品与受众：访谈、用户评价，以及竞品的表达方式与视觉形象。",
          tr: "Pazarı, rakipleri ve hedef kitleyi inceliyoruz: görüşmeler, yorumlar, rakiplerin nasıl konuştuğu ve göründüğü.",
          ar: "ندرس السوق والمنافسين والجمهور: مقابلات ومراجعات، وكيف يتحدث المنافسون وكيف يبدون.",
        },
      },
      {
        title: { en: "Strategy and positioning", ru: "Стратегия и позиционирование", zh: "战略与定位", tr: "Strateji ve konumlandırma", ar: "الاستراتيجية والتموضع" },
        text: {
          en: "We define positioning, values and the core message, and agree on them before any visual work starts.",
          ru: "Формулируем позиционирование, ценности и ключевое сообщение и согласуем их до начала визуальной работы.",
          zh: "明确定位、价值观与核心信息，并在开始视觉工作之前与您确认。",
          tr: "Konumlandırmayı, değerleri ve ana mesajı belirliyor, görsel çalışmaya başlamadan önce sizinle netleştiriyoruz.",
          ar: "نحدد التموضع والقيم والرسالة الأساسية، ونتفق عليها قبل بدء أي عمل بصري.",
        },
      },
      {
        title: { en: "Name and identity", ru: "Нейминг и айдентика", zh: "命名与视觉识别", tr: "İsim ve kimlik", ar: "الاسم والهوية" },
        text: {
          en: "We propose name options and logo concepts, then develop the chosen direction into a complete visual style.",
          ru: "Предлагаем варианты названия и концепции логотипа, затем развиваем выбранное направление в полный фирменный стиль.",
          zh: "提出命名方案与标志概念，再把选定的方向发展为完整的视觉风格。",
          tr: "İsim seçenekleri ve logo konseptleri sunuyor, seçilen yönü eksiksiz bir görsel stile dönüştürüyoruz.",
          ar: "نقترح خيارات للاسم ومفاهيم للشعار، ثم نطوّر الاتجاه المختار إلى أسلوب بصري متكامل.",
        },
      },
      {
        title: { en: "Brandbook and templates", ru: "Брендбук и шаблоны", zh: "品牌手册与模板", tr: "Marka kitabı ve şablonlar", ar: "دليل الهوية والقوالب" },
        text: {
          en: "We write down the rules and prepare templates. The brandbook and source files are delivered in working formats.",
          ru: "Описываем правила и готовим шаблоны. Брендбук и исходники передаём в рабочих форматах.",
          zh: "整理使用规范并制作模板。品牌手册与源文件以可编辑的格式交付。",
          tr: "Kuralları yazıya döküyor ve şablonları hazırlıyoruz. Marka kitabı ve kaynak dosyalar çalışılabilir formatlarda teslim edilir.",
          ar: "نوثّق القواعد ونجهّز القوالب. يُسلَّم دليل الهوية والملفات المصدرية بصيغ قابلة للعمل.",
        },
      },
    ],
    features: [
      {
        title: { en: "Positioning in one sentence", ru: "Позиционирование в одной фразе", zh: "一句话定位", tr: "Tek cümlede konumlandırma", ar: "التموضع في جملة واحدة" },
        text: {
          en: "A short statement of who you serve and why you, ready for the website, sales and hiring.",
          ru: "Короткая формулировка: для кого вы и почему именно вы — для сайта, продаж и найма.",
          zh: "一句简短的话说明您服务谁、为什么选您，可直接用于官网、销售与招聘。",
          tr: "Kime hizmet ettiğinizi ve neden siz olduğunuzu anlatan kısa bir ifade; site, satış ve işe alım için hazır.",
          ar: "عبارة قصيرة توضح لمن تعملون ولماذا أنتم، جاهزة للموقع والمبيعات والتوظيف.",
        },
      },
      {
        title: { en: "Tone of voice by example", ru: "Tone of voice на примерах", zh: "用示例说明语调", tr: "Örneklerle iletişim tonu", ar: "نبرة الخطاب بالأمثلة" },
        text: {
          en: "Not just adjectives: rules and before-and-after examples for site copy, posts and messages to clients.",
          ru: "Не набор прилагательных, а правила и примеры «до и после» для текстов сайта, постов и писем клиентам.",
          zh: "不只是几个形容词，而是规则加上前后对比示例，覆盖官网文案、帖子和客户沟通。",
          tr: "Sadece sıfatlar değil: site metinleri, gönderiler ve müşteri mesajları için kurallar ve önce-sonra örnekleri.",
          ar: "ليست مجرد صفات، بل قواعد وأمثلة قبل وبعد لنصوص الموقع والمنشورات والرسائل إلى العملاء.",
        },
      },
      {
        title: { en: "Name checks", ru: "Проверка названия", zh: "名称筛查", tr: "İsim kontrolü", ar: "فحص الاسم" },
        text: {
          en: "Before you choose, we check name options for domain availability and obvious overlaps in your markets.",
          ru: "До выбора проверяем варианты на доступность доменов и очевидные пересечения на ваших рынках.",
          zh: "在您做决定之前，我们会检查各个名称的域名可用性以及在目标市场中的明显重名。",
          tr: "Seçim yapmadan önce isim seçeneklerini alan adı uygunluğu ve pazarlarınızdaki belirgin çakışmalar açısından kontrol ediyoruz.",
          ar: "قبل الاختيار نفحص خيارات الاسم من حيث توفر النطاق والتشابه الواضح في أسواقكم.",
        },
      },
      {
        title: { en: "Logo at every size", ru: "Логотип в любом размере", zh: "适配各种尺寸的标志", tr: "Her boyutta logo", ar: "شعار بكل المقاسات" },
        text: {
          en: "Main logo, compact version and icon, tested from favicon to signage, on light and dark backgrounds.",
          ru: "Основной логотип, компактная версия и иконка — проверены от фавикона до вывески, на светлом и тёмном фоне.",
          zh: "主标志、简化版与图标，从网站图标到门头招牌都经过测试，适配浅色与深色背景。",
          tr: "Ana logo, kompakt sürüm ve simge; favicondan tabelaya kadar, açık ve koyu zeminlerde test edilir.",
          ar: "الشعار الرئيسي ونسخة مختصرة وأيقونة، مُختبرة من أيقونة المتصفح حتى اللافتة، على خلفيات فاتحة وداكنة.",
        },
      },
      {
        title: { en: "Colour and type system", ru: "Палитра и типографика", zh: "色彩与字体系统", tr: "Renk ve yazı sistemi", ar: "نظام الألوان والخطوط" },
        text: {
          en: "A palette with screen and print values, plus font pairs with clear rules for headings and body text.",
          ru: "Палитра с цифровыми и печатными значениями, шрифтовые пары и правила для заголовков и основного текста.",
          zh: "包含屏幕与印刷色值的配色方案，以及标题与正文的字体搭配和使用规则。",
          tr: "Ekran ve baskı değerleriyle bir renk paleti, başlıklar ve metin için kuralları belli yazı tipi eşleşmeleri.",
          ar: "لوحة ألوان بقيم للشاشة والطباعة، وأزواج خطوط بقواعد واضحة للعناوين والنص الأساسي.",
        },
      },
      {
        title: { en: "Works in several scripts", ru: "Стиль для разных языков", zh: "适配多种文字", tr: "Farklı alfabelerde çalışır", ar: "يعمل بعدة لغات" },
        text: {
          en: "We choose fonts and test the identity in Cyrillic and Latin and, if needed, in Arabic or Chinese.",
          ru: "Подбираем шрифты и проверяем стиль на кириллице и латинице, а при необходимости — на арабском или китайском.",
          zh: "选择字体，并在西里尔字母和拉丁字母中测试视觉识别，需要时也覆盖阿拉伯文或中文。",
          tr: "Yazı tiplerini seçiyor, kimliği Kiril ve Latin alfabelerinde, gerekirse Arapça veya Çince ile test ediyoruz.",
          ar: "نختار الخطوط ونختبر الهوية بالحروف السيريلية واللاتينية، وعند الحاجة بالعربية أو الصينية.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "How long does branding take and what does it cost?",
          ru: "Сколько длится брендинг и сколько стоит?",
          zh: "品牌建设需要多久、费用多少？",
          tr: "Marka kimliği çalışması ne kadar sürer ve ne kadar tutar?",
          ar: "كم يستغرق بناء العلامة وكم يكلّف؟",
        },
        a: {
          en: "Branding starts from $2k and takes 3–6 weeks. The range depends on whether you need naming, how many applications the brand must cover and how quickly feedback comes back. The price is fixed before work starts.",
          ru: "Брендинг — от $2k и 3–6 недель. Срок зависит от того, нужен ли нейминг, сколько носителей должен покрыть стиль и как быстро приходит обратная связь. Цена фиксируется до начала работ.",
          zh: "品牌建设 $2k 起，周期 3–6 周。具体取决于是否需要命名、品牌需要覆盖多少应用场景，以及反馈的速度。开工前确定固定价格。",
          tr: "Marka kimliği 2 bin $'dan başlar ve 3–6 hafta sürer. Süre; isimlendirme gerekip gerekmediğine, markanın kaç uygulamayı kapsayacağına ve geri bildirimlerin hızına bağlıdır. Fiyat iş başlamadan sabitlenir.",
          ar: "يبدأ بناء العلامة من $2k ويستغرق من 3 إلى 6 أسابيع. تعتمد المدة على الحاجة إلى التسمية، وعدد التطبيقات التي يجب أن تغطيها الهوية، وسرعة وصول الملاحظات. يُحدَّد السعر قبل بدء العمل.",
        },
      },
      {
        q: {
          en: "We already have a logo. Can you do only strategy or a refresh?",
          ru: "Логотип уже есть. Можно только стратегию или обновление стиля?",
          zh: "我们已经有标志了，可以只做战略或形象升级吗？",
          tr: "Zaten bir logomuz var. Sadece strateji veya yenileme yapabilir misiniz?",
          ar: "لدينا شعار بالفعل. هل يمكنكم العمل على الاستراتيجية أو التحديث فقط؟",
        },
        a: {
          en: "Yes. The scope is agreed at the start. We can work only on strategy and positioning, or refresh an existing identity. First we look at what you have and tell you honestly what is worth keeping.",
          ru: "Да. Объём согласуем на старте. Можно взять только стратегию и позиционирование или обновить существующий стиль. Сначала смотрим, что у вас уже есть, и честно говорим, что стоит сохранить.",
          zh: "可以。范围在项目开始时确定。我们可以只做战略与定位，也可以升级现有的视觉识别。我们会先看您现有的内容，并坦诚告诉您哪些值得保留。",
          tr: "Evet. Kapsam başta netleştirilir. Yalnızca strateji ve konumlandırma üzerinde çalışabilir ya da mevcut kimliği yenileyebiliriz. Önce elinizdekine bakar, neyin korunmaya değer olduğunu açıkça söyleriz.",
          ar: "نعم. يُتفق على النطاق في البداية. يمكننا العمل على الاستراتيجية والتموضع فقط، أو تحديث الهوية الحالية. نطّلع أولًا على ما لديكم ونقول بصراحة ما الذي يستحق الإبقاء عليه.",
        },
      },
      {
        q: {
          en: "Can you also build the website in the new style?",
          ru: "Можно ли сразу сделать сайт в новом стиле?",
          zh: "可以按新风格直接做网站吗？",
          tr: "Yeni stilde web sitesini de yapabilir misiniz?",
          ar: "هل يمكنكم أيضًا بناء الموقع بالأسلوب الجديد؟",
        },
        a: {
          en: "Yes. We design and develop websites, so the identity is tested on web screens from the start. The site is a separate project with its own scope and price, and the brandbook lets any team apply the style.",
          ru: "Да. Мы сами проектируем и разрабатываем сайты, поэтому стиль с самого начала проверяем на экранах. Сайт — отдельный проект со своим объёмом и ценой, а по брендбуку стиль сможет применять любая команда.",
          zh: "可以。我们本身就做网站设计与开发，所以视觉识别从一开始就会在网页上测试。网站是单独的项目，有独立的范围和报价；有了品牌手册，任何团队都能正确使用这套风格。",
          tr: "Evet. Web sitesi tasarlayıp geliştirdiğimiz için kimliği baştan ekranlarda test ediyoruz. Site, kendi kapsamı ve fiyatı olan ayrı bir projedir; marka kitabı sayesinde stili her ekip uygulayabilir.",
          ar: "نعم. نحن نصمم المواقع ونطوّرها، لذلك نختبر الهوية على الشاشات منذ البداية. الموقع مشروع منفصل بنطاق وسعر خاصين، ودليل الهوية يتيح لأي فريق تطبيق الأسلوب.",
        },
      },
    ],
  },

  // ───────────── Web3 Add-on: From $3k, modular ─────────────
  "web3-addon": {
    intro: {
      en: "Most products do not need their own blockchain. They need a few reliable pieces: wallet login, a token, staking or a swap. We build these modules into your existing product or a new one, and coordinate an independent audit of the contracts before launch.",
      ru: "Большинству продуктов не нужен собственный блокчейн. Им нужно несколько надёжных частей: вход через кошелёк, токен, стейкинг или обмен. Мы встраиваем такие модули в существующий или новый продукт и до запуска координируем независимый аудит контрактов.",
      zh: "大多数产品并不需要自己的区块链，而是需要几个可靠的模块：钱包登录、代币、质押或兑换。我们把这些模块集成到您的现有产品或新产品中，并在上线前协调独立的合约审计。",
      tr: "Çoğu ürünün kendi blockchain'ine ihtiyacı yoktur. İhtiyaç duyulan birkaç güvenilir parçadır: cüzdanla giriş, token, staking veya takas. Bu modülleri mevcut ya da yeni ürününüze entegre ediyor, yayından önce sözleşmelerin bağımsız denetimini koordine ediyoruz.",
      ar: "معظم المنتجات لا تحتاج إلى بلوكتشين خاص بها، بل إلى بضع وحدات موثوقة: تسجيل الدخول بالمحفظة أو رمز أو إيداع أو تبادل. نبني هذه الوحدات في منتجكم القائم أو الجديد، وننسّق تدقيقًا مستقلًا للعقود قبل الإطلاق.",
    },
    stack: ["Solidity", "Foundry", "Hardhat", "OpenZeppelin", "viem", "ethers.js", "wagmi", "WalletConnect"],
    steps: [
      {
        title: { en: "Architecture and scope", ru: "Архитектура и объём", zh: "架构与范围", tr: "Mimari ve kapsam", ar: "البنية والنطاق" },
        text: {
          en: "We decide what goes on-chain and what stays in your backend, choose the network and agree on modules.",
          ru: "Решаем, что идёт on-chain, а что остаётся в вашем бэкенде, выбираем сеть и согласуем модули.",
          zh: "确定哪些逻辑上链、哪些留在您的后端，选择网络并确认模块清单。",
          tr: "Neyin zincire gideceğine, neyin backend'inizde kalacağına karar veriyor, ağı seçiyor ve modülleri netleştiriyoruz.",
          ar: "نقرر ما يذهب إلى السلسلة وما يبقى في الواجهة الخلفية، ونختار الشبكة ونتفق على الوحدات.",
        },
      },
      {
        title: { en: "Contracts and tests", ru: "Контракты и тесты", zh: "合约与测试", tr: "Sözleşmeler ve testler", ar: "العقود والاختبارات" },
        text: {
          en: "We write contracts on proven libraries and cover them with tests, including edge cases and failure scenarios.",
          ru: "Пишем контракты на проверенных библиотеках и покрываем их тестами, включая граничные случаи и сценарии сбоев.",
          zh: "基于成熟的库编写合约，并用测试覆盖，包括边界情况与失败场景。",
          tr: "Sözleşmeleri kanıtlanmış kütüphanelerle yazıyor, uç durumlar ve hata senaryoları dahil testlerle kapsıyoruz.",
          ar: "نكتب العقود على مكتبات مجرَّبة ونغطيها بالاختبارات، بما في ذلك الحالات الحدّية وسيناريوهات الفشل.",
        },
      },
      {
        title: { en: "Product integration", ru: "Интеграция в продукт", zh: "集成到产品", tr: "Ürüne entegrasyon", ar: "الدمج في المنتج" },
        text: {
          en: "We connect wallets and contracts to your interface and backend and run the full flow on a testnet.",
          ru: "Подключаем кошельки и контракты к вашему интерфейсу и бэкенду и прогоняем весь сценарий в тестовой сети.",
          zh: "把钱包和合约接入您的界面与后端，并在测试网上跑通完整流程。",
          tr: "Cüzdanları ve sözleşmeleri arayüzünüze ve backend'inize bağlıyor, tüm akışı test ağında çalıştırıyoruz.",
          ar: "نربط المحافظ والعقود بواجهتكم وبالواجهة الخلفية، ونشغّل المسار كاملًا على شبكة اختبار.",
        },
      },
      {
        title: { en: "Audit and mainnet", ru: "Аудит и запуск", zh: "审计与主网上线", tr: "Denetim ve ana ağ", ar: "التدقيق والإطلاق" },
        text: {
          en: "We prepare materials for the auditors, fix their findings and deploy to mainnet with documentation.",
          ru: "Готовим материалы для аудиторов, исправляем замечания и разворачиваем контракты в основной сети с документацией.",
          zh: "为审计方准备材料，修复审计发现的问题，然后连同文档一起部署到主网。",
          tr: "Denetçiler için materyal hazırlıyor, bulgularını düzeltiyor ve belgelerle birlikte ana ağa dağıtıyoruz.",
          ar: "نجهّز المواد للمدققين، ونصلح ملاحظاتهم، وننشر على الشبكة الرئيسية مع التوثيق.",
        },
      },
    ],
    features: [
      {
        title: { en: "One module at a time", ru: "Модули по отдельности", zh: "按模块推进", tr: "Modül modül", ar: "وحدة تلو الأخرى" },
        text: {
          en: "Start with wallet login or a single token. Each module is scoped, built and launched on its own.",
          ru: "Можно начать со входа через кошелёк или одного токена. Каждый модуль оценивается, делается и запускается отдельно.",
          zh: "可以从钱包登录或单个代币开始。每个模块单独评估、开发和上线。",
          tr: "Cüzdanla giriş veya tek bir tokenla başlayabilirsiniz. Her modül ayrı ayrı kapsamlandırılır, geliştirilir ve yayına alınır.",
          ar: "يمكن البدء بتسجيل الدخول بالمحفظة أو برمز واحد. تُقدَّر كل وحدة وتُبنى وتُطلق بشكل مستقل.",
        },
      },
      {
        title: { en: "EVM networks", ru: "Сети EVM", zh: "EVM 网络", tr: "EVM ağları", ar: "شبكات EVM" },
        text: {
          en: "Ethereum, Polygon, BNB Chain, Arbitrum, Base and other EVM-compatible networks, chosen for your fees and audience.",
          ru: "Ethereum, Polygon, BNB Chain, Arbitrum, Base и другие EVM-совместимые сети — выбираем под комиссии и вашу аудиторию.",
          zh: "Ethereum、Polygon、BNB Chain、Arbitrum、Base 及其他兼容 EVM 的网络，根据手续费与受众来选择。",
          tr: "Ethereum, Polygon, BNB Chain, Arbitrum, Base ve diğer EVM uyumlu ağlar; ücretlere ve kitlenize göre seçilir.",
          ar: "Ethereum وPolygon وBNB Chain وArbitrum وBase وغيرها من الشبكات المتوافقة مع EVM، نختارها وفق الرسوم وجمهوركم.",
        },
      },
      {
        title: { en: "Sign in with a wallet", ru: "Вход через кошелёк", zh: "钱包签名登录", tr: "Cüzdanla giriş", ar: "الدخول بالمحفظة" },
        text: {
          en: "Login by wallet signature (SIWE), linked to user accounts in your existing system.",
          ru: "Авторизация по подписи кошелька (SIWE) с привязкой к аккаунтам в вашей текущей системе.",
          zh: "通过钱包签名（SIWE）登录，并与您现有系统中的用户账户关联。",
          tr: "Cüzdan imzasıyla giriş (SIWE), mevcut sisteminizdeki kullanıcı hesaplarına bağlı.",
          ar: "تسجيل الدخول بتوقيع المحفظة (SIWE) مع ربطه بحسابات المستخدمين في نظامكم الحالي.",
        },
      },
      {
        title: { en: "Roles and emergency pause", ru: "Роли и аварийная пауза", zh: "权限角色与紧急暂停", tr: "Roller ve acil durdurma", ar: "الأدوار والإيقاف الطارئ" },
        text: {
          en: "Access roles, a multisig for key actions and a pause switch for emergencies, configured at deployment.",
          ru: "Роли доступа, мультиподпись для ключевых действий и пауза на случай аварии — настраиваются при развёртывании.",
          zh: "访问角色、关键操作的多签，以及应急暂停开关，均在部署时配置好。",
          tr: "Erişim rolleri, kritik işlemler için çoklu imza ve acil durumlar için durdurma anahtarı; dağıtımda yapılandırılır.",
          ar: "أدوار وصول، وتوقيع متعدد للإجراءات الحساسة، ومفتاح إيقاف للطوارئ، تُضبط كلها عند النشر.",
        },
      },
      {
        title: { en: "On-chain events in your backend", ru: "События блокчейна в бэкенде", zh: "链上事件同步到后端", tr: "Zincir olayları backend'de", ar: "أحداث السلسلة في الواجهة الخلفية" },
        text: {
          en: "We index contract events so your backend and analytics see deposits, transfers and claims as they happen.",
          ru: "Индексируем события контрактов, чтобы бэкенд и аналитика видели депозиты, переводы и выплаты по мере их появления.",
          zh: "索引合约事件，让您的后端与数据分析实时看到存入、转账和领取。",
          tr: "Sözleşme olaylarını indeksliyoruz; backend'iniz ve analitiğiniz yatırma, transfer ve talepleri anında görür.",
          ar: "نفهرس أحداث العقود لتظهر الإيداعات والتحويلات والمطالبات للواجهة الخلفية والتحليلات فور حدوثها.",
        },
      },
      {
        title: { en: "Clear transaction UX", ru: "Понятные транзакции", zh: "清晰的交易体验", tr: "Anlaşılır işlem deneyimi", ar: "معاملات واضحة للمستخدم" },
        text: {
          en: "Clear transaction states, fee estimates and readable errors, so users understand what they are signing.",
          ru: "Понятные статусы транзакций, оценка комиссии и читаемые ошибки — пользователь видит, что именно подписывает.",
          zh: "清晰的交易状态、手续费预估和易懂的错误提示，让用户知道自己在签什么。",
          tr: "Net işlem durumları, ücret tahmini ve okunabilir hatalar; kullanıcı neyi imzaladığını bilir.",
          ar: "حالات معاملات واضحة وتقدير للرسوم ورسائل أخطاء مفهومة، ليعرف المستخدم ما الذي يوقّعه.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "Do you audit smart contracts yourselves?",
          ru: "Вы сами проводите аудит смарт-контрактов?",
          zh: "你们自己做智能合约审计吗？",
          tr: "Akıllı sözleşme denetimini kendiniz mi yapıyorsunuz?",
          ar: "هل تدققون العقود الذكية بأنفسكم؟",
        },
        a: {
          en: "No. An audit should be done by an independent firm, not by the team that wrote the code. We prepare the code and documentation, coordinate with the auditors, fix their findings and only then deploy to mainnet.",
          ru: "Нет. Аудит должна делать независимая компания, а не команда, которая писала код. Мы готовим код и документацию, координируем работу с аудиторами, исправляем их замечания и только после этого выходим в основную сеть.",
          zh: "不做。审计应当由独立机构完成，而不是写代码的团队。我们准备代码与文档、协调审计方、修复审计发现的问题，之后才部署到主网。",
          tr: "Hayır. Denetimi kodu yazan ekip değil, bağımsız bir firma yapmalıdır. Kodu ve belgeleri hazırlıyor, denetçilerle koordinasyonu yürütüyor, bulguları düzeltiyor ve ancak ondan sonra ana ağa çıkıyoruz.",
          ar: "لا. يجب أن تتولى التدقيق شركة مستقلة، لا الفريق الذي كتب الشيفرة. نحن نجهّز الشيفرة والتوثيق، وننسّق مع المدققين، ونصلح ملاحظاتهم، وبعدها فقط ننشر على الشبكة الرئيسية.",
        },
      },
      {
        q: {
          en: "How much does a Web3 module cost?",
          ru: "Сколько стоит Web3-модуль?",
          zh: "一个 Web3 模块要多少钱？",
          tr: "Bir Web3 modülü ne kadar tutar?",
          ar: "كم تكلّف وحدة Web3؟",
        },
        a: {
          en: "Modules start from $3k. Work is planned module by module: each one is estimated separately after we review your product and choose the network. Wallet integration is usually simpler than staking or a DEX integration.",
          ru: "Модули — от $3k. Работа планируется модульно: каждый модуль оцениваем отдельно, после того как посмотрим ваш продукт и выберем сеть. Интеграция кошелька обычно проще, чем стейкинг или подключение к DEX.",
          zh: "模块 $3k 起。工作按模块规划：在了解您的产品并选定网络后，每个模块单独估价。钱包集成通常比质押或 DEX 集成简单。",
          tr: "Modüller 3 bin $'dan başlar. İş modül modül planlanır: ürününüzü inceleyip ağı seçtikten sonra her modül ayrı fiyatlandırılır. Cüzdan entegrasyonu genellikle staking veya DEX entegrasyonundan daha basittir.",
          ar: "تبدأ الوحدات من $3k. يُخطَّط العمل وحدةً بوحدة: نقدّر كل وحدة على حدة بعد مراجعة منتجكم واختيار الشبكة. وعادةً ما يكون تكامل المحفظة أبسط من الإيداع أو التكامل مع DEX.",
        },
      },
      {
        q: {
          en: "Can you add Web3 to our existing product?",
          ru: "Можно добавить Web3 в наш текущий продукт?",
          zh: "可以在我们现有的产品中加入 Web3 吗？",
          tr: "Mevcut ürünümüze Web3 ekleyebilir misiniz?",
          ar: "هل يمكنكم إضافة Web3 إلى منتجنا الحالي؟",
        },
        a: {
          en: "Yes, this is the most common case. We first review your architecture, then connect wallets and contracts so that accounts, payments and data keep working. Parts of the product not touched by Web3 stay as they are.",
          ru: "Да, это самый частый случай. Сначала изучаем вашу архитектуру, затем подключаем кошельки и контракты так, чтобы аккаунты, платежи и данные продолжали работать. Части продукта, которые Web3 не касается, остаются как есть.",
          zh: "可以，这是最常见的情况。我们先了解您的架构，再接入钱包和合约，确保账户、支付和数据照常运行。与 Web3 无关的部分保持不变。",
          tr: "Evet, en yaygın durum budur. Önce mimarinizi inceliyor, ardından cüzdanları ve sözleşmeleri hesaplar, ödemeler ve veriler çalışmaya devam edecek şekilde bağlıyoruz. Web3'ün dokunmadığı kısımlar olduğu gibi kalır.",
          ar: "نعم، وهذه الحالة الأكثر شيوعًا. نراجع بنيتكم أولًا، ثم نربط المحافظ والعقود بحيث تستمر الحسابات والمدفوعات والبيانات في العمل. أما أجزاء المنتج التي لا يمسّها Web3 فتبقى كما هي.",
        },
      },
    ],
  },

  // ───────────── IT Support & Maintenance: by agreement, monthly ─────────────
  "it-support": {
    intro: {
      en: "A live product needs regular care: updates, backups, monitoring and small changes. We take this on monthly under an SLA, for products we built and for products made by another team. One team watches the system and is accountable for it.",
      ru: "Работающему продукту нужен регулярный уход: обновления, резервные копии, мониторинг и небольшие доработки. Мы берём это на себя ежемесячно по SLA — для продуктов, сделанных нами или другой командой. За систему отвечает одна команда.",
      zh: "在线运行的产品需要持续维护：更新、备份、监控和小幅改进。我们按月、依据 SLA 承担这些工作，无论产品由我们还是其他团队开发。由一个团队盯住系统并对其负责。",
      tr: "Canlı bir ürün düzenli bakım ister: güncellemeler, yedekler, izleme ve küçük geliştirmeler. Bunu, ister bizim ister başka bir ekibin geliştirdiği ürünler için, SLA kapsamında aylık olarak üstleniyoruz. Sistemi tek bir ekip izler ve sorumluluğunu taşır.",
      ar: "يحتاج المنتج العامل إلى عناية منتظمة: تحديثات ونسخ احتياطية ومراقبة وتطويرات صغيرة. نتولى ذلك شهريًا وفق SLA، سواء طوّرنا المنتج نحن أو فريق آخر. فريق واحد يراقب النظام ويتحمل مسؤوليته.",
    },
    stack: ["Prometheus", "Grafana", "Sentry", "UptimeRobot", "GitHub Actions", "Docker", "Terraform"],
    steps: [
      {
        title: { en: "Audit of the current state", ru: "Аудит текущего состояния", zh: "现状评估", tr: "Mevcut durum denetimi", ar: "تدقيق الوضع الحالي" },
        text: {
          en: "We review the code, infrastructure, access and backups, and list the risks to close first.",
          ru: "Смотрим код, инфраструктуру, доступы и резервные копии и составляем список рисков, которые нужно закрыть первыми.",
          zh: "检查代码、基础设施、访问权限与备份，列出需要优先解决的风险。",
          tr: "Kodu, altyapıyı, erişimleri ve yedekleri inceliyor, önce kapatılması gereken riskleri listeliyoruz.",
          ar: "نراجع الشيفرة والبنية التحتية والصلاحيات والنسخ الاحتياطية، ونضع قائمة بالمخاطر التي يجب معالجتها أولًا.",
        },
      },
      {
        title: { en: "SLA and hours budget", ru: "SLA и пакет часов", zh: "SLA 与工时包", tr: "SLA ve saat paketi", ar: "SLA وباقة الساعات" },
        text: {
          en: "We agree on response times, priorities, the hours budget and contact channels, and put them in the contract.",
          ru: "Согласуем сроки реакции, приоритеты, пакет часов и каналы связи и фиксируем их в договоре.",
          zh: "确定响应时间、优先级、工时包和沟通渠道，并写入合同。",
          tr: "Yanıt sürelerini, öncelikleri, saat paketini ve iletişim kanallarını belirleyip sözleşmeye yazıyoruz.",
          ar: "نتفق على أوقات الاستجابة والأولويات وباقة الساعات وقنوات التواصل، ونثبّتها في العقد.",
        },
      },
      {
        title: { en: "Monitoring setup", ru: "Подключение мониторинга", zh: "接入监控", tr: "İzleme kurulumu", ar: "إعداد المراقبة" },
        text: {
          en: "We set up monitoring, alerts and error tracking, so problems reach us directly, not only through users.",
          ru: "Настраиваем мониторинг, оповещения и отслеживание ошибок, чтобы о проблемах мы узнавали сами, а не только от пользователей.",
          zh: "配置监控、告警和错误追踪，让问题直接报到我们这里，而不只是靠用户反馈。",
          tr: "İzleme, uyarılar ve hata takibini kuruyoruz; sorunlar yalnızca kullanıcılardan değil, doğrudan bize ulaşır.",
          ar: "نُعدّ المراقبة والتنبيهات وتتبع الأخطاء، لتصلنا المشكلات مباشرة لا عبر المستخدمين فقط.",
        },
      },
      {
        title: { en: "Monthly cycle", ru: "Работа по месяцам", zh: "按月运行", tr: "Aylık döngü", ar: "الدورة الشهرية" },
        text: {
          en: "Fixes, updates and features go through one task queue; each month you get a report on uptime and work done.",
          ru: "Исправления, обновления и доработки идут через одну очередь задач; каждый месяц — отчёт по аптайму и выполненным работам.",
          zh: "修复、更新和功能迭代统一进入任务队列；每月提交可用性与工作报告。",
          tr: "Düzeltmeler, güncellemeler ve geliştirmeler tek bir iş kuyruğundan geçer; her ay çalışma süresi ve yapılan işler raporu gelir.",
          ar: "تمر الإصلاحات والتحديثات والتطويرات عبر قائمة مهام واحدة، وكل شهر تصلكم تقارير وقت التشغيل والأعمال المنجزة.",
        },
      },
    ],
    features: [
      {
        title: { en: "Incident priorities", ru: "Приоритеты инцидентов", zh: "故障分级", tr: "Olay öncelikleri", ar: "أولويات الحوادث" },
        text: {
          en: "Clear levels from service down to cosmetic, each with its own agreed response time.",
          ru: "Понятные уровни — от «сервис недоступен» до «косметика», у каждого свой согласованный срок реакции.",
          zh: "从服务中断到界面小问题分级明确，每一级都有约定的响应时间。",
          tr: "Hizmet kesintisinden küçük görsel kusura kadar net seviyeler; her birinin anlaşılmış bir yanıt süresi vardır.",
          ar: "مستويات واضحة من توقف الخدمة إلى العيوب الشكلية، لكل منها وقت استجابة متفق عليه.",
        },
      },
      {
        title: { en: "Restore tests", ru: "Проверка восстановления", zh: "恢复演练", tr: "Geri yükleme testleri", ar: "اختبار الاستعادة" },
        text: {
          en: "We do not just make backups: we restore them regularly to check that the data really comes back.",
          ru: "Не только делаем резервные копии, но и регулярно восстанавливаем их, чтобы убедиться, что данные действительно возвращаются.",
          zh: "不只做备份，还会定期进行恢复，确认数据真的能找回来。",
          tr: "Sadece yedek almıyoruz: verilerin gerçekten geri geldiğini görmek için yedekleri düzenli olarak geri yüklüyoruz.",
          ar: "لا نكتفي بأخذ النسخ الاحتياطية، بل نستعيدها بانتظام للتأكد من أن البيانات تعود فعلًا.",
        },
      },
      {
        title: { en: "Scheduled dependency updates", ru: "Обновление зависимостей", zh: "按计划更新依赖", tr: "Planlı bağımlılık güncellemeleri", ar: "تحديث التبعيات بجدول" },
        text: {
          en: "Libraries, frameworks and server packages are updated on a schedule and tested on staging first.",
          ru: "Библиотеки, фреймворки и серверные пакеты обновляем по графику и сначала проверяем на тестовом стенде.",
          zh: "库、框架和服务器软件包按计划更新，并先在预发布环境中测试。",
          tr: "Kütüphaneler, framework'ler ve sunucu paketleri plana göre güncellenir ve önce test ortamında denenir.",
          ar: "نحدّث المكتبات وأطر العمل وحزم الخوادم وفق جدول، ونختبرها أولًا على بيئة تجريبية.",
        },
      },
      {
        title: { en: "Access control", ru: "Контроль доступов", zh: "访问权限管理", tr: "Erişim kontrolü", ar: "إدارة الصلاحيات" },
        text: {
          en: "We keep a list of who has access to what and revoke access when people leave the project.",
          ru: "Ведём список, у кого к чему есть доступ, и отзываем доступы, когда люди уходят из проекта.",
          zh: "维护一份谁能访问什么的清单，人员离开项目时及时收回权限。",
          tr: "Kimin neye erişimi olduğunun listesini tutuyor, projeden ayrılanların erişimini kaldırıyoruz.",
          ar: "نحتفظ بقائمة بمن يملك الوصول إلى ماذا، ونسحب الصلاحيات عند مغادرة الأشخاص للمشروع.",
        },
      },
      {
        title: { en: "Incident write-ups", ru: "Разбор инцидентов", zh: "故障复盘", tr: "Olay sonrası analiz", ar: "تحليل الحوادث" },
        text: {
          en: "After a serious incident we describe what happened, why, and what we changed so it does not repeat.",
          ru: "После серьёзного сбоя описываем, что произошло, почему и что изменили, чтобы это не повторилось.",
          zh: "严重故障之后，我们会写明发生了什么、原因是什么，以及为避免再次发生做了哪些改动。",
          tr: "Ciddi bir olaydan sonra ne olduğunu, nedenini ve tekrarlanmaması için neyi değiştirdiğimizi yazıyoruz.",
          ar: "بعد أي عطل جسيم نوثّق ما حدث وسببه وما غيّرناه كي لا يتكرر.",
        },
      },
      {
        title: { en: "Up-to-date runbooks", ru: "Актуальная документация", zh: "持续更新的运维文档", tr: "Güncel işletim belgeleri", ar: "توثيق محدَّث" },
        text: {
          en: "Infrastructure, deployment and recovery steps are kept current, so the product does not depend on one person.",
          ru: "Описание инфраструктуры, деплоя и восстановления держим в актуальном виде — продукт не зависит от одного человека.",
          zh: "基础设施、部署与恢复步骤的文档始终保持最新，产品不依赖某一个人。",
          tr: "Altyapı, dağıtım ve kurtarma adımları güncel tutulur; ürün tek bir kişiye bağımlı kalmaz.",
          ar: "نحافظ على توثيق البنية التحتية والنشر وخطوات الاستعادة محدّثًا، فلا يعتمد المنتج على شخص واحد.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "Will you support a product built by another team?",
          ru: "Возьмёте на поддержку продукт, который делала другая команда?",
          zh: "其他团队开发的产品，你们也能接手运维吗？",
          tr: "Başka bir ekibin geliştirdiği ürüne destek verir misiniz?",
          ar: "هل تدعمون منتجًا طوّره فريق آخر؟",
        },
        a: {
          en: "Yes. We start with an audit of the code and infrastructure, then propose a realistic plan: what to fix first and what the monthly scope looks like. After that the product moves under the SLA.",
          ru: "Да. Начинаем с аудита кода и инфраструктуры, затем предлагаем реалистичный план: что исправить в первую очередь и каким будет ежемесячный объём работ. После этого продукт переходит на обслуживание по SLA.",
          zh: "可以。我们先评估代码与基础设施，再给出切实可行的方案：哪些问题先修、每月的工作范围是什么。之后产品转入 SLA 运维。",
          tr: "Evet. Kod ve altyapı denetimiyle başlıyor, ardından gerçekçi bir plan sunuyoruz: önce neyin düzeltileceği ve aylık kapsamın nasıl olacağı. Bundan sonra ürün SLA kapsamına geçer.",
          ar: "نعم. نبدأ بتدقيق الشيفرة والبنية التحتية، ثم نقترح خطة واقعية: ما الذي يُصلح أولًا وكيف يبدو نطاق العمل الشهري. بعد ذلك ينتقل المنتج إلى الدعم وفق SLA.",
        },
      },
      {
        q: {
          en: "How much does support cost?",
          ru: "Сколько стоит сопровождение?",
          zh: "运维服务怎么收费？",
          tr: "Destek ne kadar tutar?",
          ar: "كم تكلفة الدعم؟",
        },
        a: {
          en: "The price is set by agreement. It depends on the size of the system, the response times you need and the hours budget for feature work. We agree on it after the audit and put it in the contract.",
          ru: "Стоимость — по договорённости. Она зависит от размера системы, нужных вам сроков реакции и пакета часов на доработки. Согласуем её после аудита и фиксируем в договоре.",
          zh: "价格面议，取决于系统规模、您需要的响应时间以及功能迭代的工时包。我们在评估之后与您商定，并写入合同。",
          tr: "Fiyat anlaşmaya göre belirlenir. Sistemin büyüklüğüne, ihtiyaç duyduğunuz yanıt sürelerine ve geliştirmeler için saat paketine bağlıdır. Denetimden sonra netleştirip sözleşmeye yazarız.",
          ar: "يُحدَّد السعر بالاتفاق، ويعتمد على حجم النظام وأوقات الاستجابة التي تحتاجونها وباقة الساعات للتطويرات. نتفق عليه بعد التدقيق ونثبّته في العقد.",
        },
      },
      {
        q: {
          en: "What happens if something breaks at night?",
          ru: "Что будет, если что-то сломается ночью?",
          zh: "如果半夜出了故障怎么办？",
          tr: "Gece bir şey bozulursa ne olur?",
          ar: "ماذا يحدث إذا تعطل شيء ليلًا؟",
        },
        a: {
          en: "Monitoring and alerts run 24/7. The response time for each incident level is set in the SLA, so you know in advance how fast critical failures are handled and which issues wait until working hours.",
          ru: "Мониторинг и оповещения работают 24/7. Срок реакции для каждого уровня инцидента прописан в SLA, поэтому вы заранее знаете, как быстро разбираются критичные сбои и какие задачи ждут рабочего времени.",
          zh: "监控与告警 7×24 小时运行。每个故障级别的响应时间都写在 SLA 里，您事先就清楚严重故障多快处理、哪些问题会留到工作时间。",
          tr: "İzleme ve uyarılar 7/24 çalışır. Her olay seviyesi için yanıt süresi SLA'de belirlenir; kritik arızaların ne kadar hızlı ele alınacağını ve hangi işlerin mesai saatini bekleyeceğini önceden bilirsiniz.",
          ar: "تعمل المراقبة والتنبيهات على مدار الساعة. ووقت الاستجابة لكل مستوى من الحوادث محدد في SLA، فتعرفون مسبقًا مدى سرعة معالجة الأعطال الحرجة وما الذي ينتظر ساعات العمل.",
        },
      },
    ],
  },

  // ───────────── Fintech: From $3k, 4–10 weeks ─────────────
  fintech: {
    intro: {
      en: "In a financial product, every error is someone's money. We build payments, wallets, lending and banking products with the ledger, KYC/AML checks and anti-fraud designed in from the start, so the product is ready for security reviews and audit.",
      ru: "В финансовом продукте каждая ошибка — это чьи-то деньги. Мы делаем платежи, кошельки, кредитование и банковские продукты, где учётный реестр, KYC/AML и антифрод заложены с самого начала, — поэтому продукт готов к проверкам безопасности и аудиту.",
      zh: "在金融产品里，每一个错误都关乎别人的钱。我们开发支付、钱包、借贷与银行类产品，从一开始就把分类账、KYC/AML 检查和反欺诈设计进去，让产品随时可以接受安全审查与审计。",
      tr: "Finansal bir üründe her hata birinin parasıdır. Ödeme, cüzdan, kredi ve bankacılık ürünlerini defter, KYC/AML kontrolleri ve dolandırıcılık önleme baştan tasarıma dahil edilmiş şekilde geliştiriyoruz; böylece ürün güvenlik incelemelerine ve denetime hazır olur.",
      ar: "في المنتج المالي، كل خطأ يعني أموال شخص ما. نبني منتجات المدفوعات والمحافظ والإقراض والخدمات المصرفية مع دفتر الأستاذ وفحوصات KYC/AML ومكافحة الاحتيال مصممة منذ البداية، ليكون المنتج جاهزًا لمراجعات الأمان والتدقيق.",
    },
    stack: ["Go", "Node.js", "PostgreSQL", "Kafka", "Redis", "Docker", "Kubernetes", "HashiCorp Vault"],
    steps: [
      {
        title: { en: "Money flows and requirements", ru: "Потоки денег и требования", zh: "资金流与合规要求", tr: "Para akışları ve gereksinimler", ar: "تدفقات الأموال والمتطلبات" },
        text: {
          en: "Together with your compliance team, we map every money movement and the regulatory requirements of your market.",
          ru: "Вместе с вашими юристами или комплаенсом описываем каждое движение денег и требования регулятора на вашем рынке.",
          zh: "与您的合规或法务团队一起，梳理每一笔资金流动以及所在市场的监管要求。",
          tr: "Uyum ekibinizle birlikte her para hareketini ve pazarınızın düzenleyici gereksinimlerini çıkarıyoruz.",
          ar: "مع فريق الامتثال لديكم، نرسم كل حركة للأموال ومتطلبات الجهة التنظيمية في سوقكم.",
        },
      },
      {
        title: { en: "Ledger and architecture", ru: "Реестр и архитектура", zh: "分类账与架构", tr: "Defter ve mimari", ar: "دفتر الأستاذ والبنية" },
        text: {
          en: "We design the ledger, the account model and integrations with banks, payment gateways and KYC providers.",
          ru: "Проектируем учётный реестр, модель счетов и интеграции с банками, платёжными шлюзами и KYC-провайдерами.",
          zh: "设计分类账、账户模型，以及与银行、支付网关和 KYC 服务商的对接。",
          tr: "Defteri, hesap modelini ve bankalar, ödeme ağ geçitleri ve KYC sağlayıcılarıyla entegrasyonları tasarlıyoruz.",
          ar: "نصمم دفتر الأستاذ ونموذج الحسابات والتكامل مع البنوك وبوابات الدفع ومزوّدي KYC.",
        },
      },
      {
        title: { en: "Build and verify", ru: "Разработка и проверки", zh: "开发与验证", tr: "Geliştirme ve doğrulama", ar: "التطوير والتحقق" },
        text: {
          en: "We build flows with tests for amounts, currencies, retries and failures, then reconcile results on test data.",
          ru: "Делаем процессы с тестами на суммы, валюты, повторы и сбои, затем сверяем результаты на тестовых данных.",
          zh: "开发各业务流程，并针对金额、币种、重试和故障编写测试，再用测试数据进行对账。",
          tr: "Akışları tutarlar, para birimleri, yeniden denemeler ve hatalar için testlerle geliştiriyor, sonra test verisiyle mutabakat yapıyoruz.",
          ar: "نبني المسارات مع اختبارات للمبالغ والعملات وإعادة المحاولة والأعطال، ثم نطابق النتائج على بيانات اختبارية.",
        },
      },
      {
        title: { en: "Review and launch", ru: "Проверка и запуск", zh: "审查与上线", tr: "İnceleme ve yayın", ar: "المراجعة والإطلاق" },
        text: {
          en: "We prepare reports and logs for the audit, go through security checks and launch in stages.",
          ru: "Готовим отчёты и журналы для аудита, проходим проверки безопасности и запускаем продукт поэтапно.",
          zh: "准备审计所需的报表与日志，完成安全检查，并分阶段上线。",
          tr: "Denetim için raporları ve kayıtları hazırlıyor, güvenlik kontrollerinden geçiyor ve aşamalı olarak yayına alıyoruz.",
          ar: "نجهّز التقارير والسجلات للتدقيق، ونجتاز فحوصات الأمان، ونطلق المنتج على مراحل.",
        },
      },
    ],
    features: [
      {
        title: { en: "Double-entry ledger", ru: "Двойная запись", zh: "复式记账", tr: "Çift taraflı defter", ar: "القيد المزدوج" },
        text: {
          en: "Every operation is recorded as balanced entries, so balances can be recalculated and checked at any time.",
          ru: "Каждая операция записывается парными проводками — остатки можно пересчитать и проверить в любой момент.",
          zh: "每笔操作都以借贷平衡的分录记账，余额随时可以重算和核对。",
          tr: "Her işlem dengeli kayıtlar olarak tutulur; bakiyeler her an yeniden hesaplanıp kontrol edilebilir.",
          ar: "تُسجَّل كل عملية بقيود متوازنة، فيمكن إعادة احتساب الأرصدة والتحقق منها في أي وقت.",
        },
      },
      {
        title: { en: "No double charges", ru: "Без двойных списаний", zh: "防止重复扣款", tr: "Çift tahsilat yok", ar: "لا خصم مزدوج" },
        text: {
          en: "Idempotency keys and careful retry logic, so a network failure does not charge a customer twice.",
          ru: "Ключи идемпотентности и продуманная логика повторов: сбой сети не приводит к повторному списанию с клиента.",
          zh: "幂等键加上严谨的重试逻辑，网络故障不会导致客户被重复扣款。",
          tr: "İdempotans anahtarları ve dikkatli yeniden deneme mantığı; ağ hatası müşteriden iki kez tahsilata yol açmaz.",
          ar: "مفاتيح عدم التكرار ومنطق مدروس لإعادة المحاولة، فلا يؤدي عطل الشبكة إلى خصم المبلغ من العميل مرتين.",
        },
      },
      {
        title: { en: "Automatic reconciliation", ru: "Автоматическая сверка", zh: "自动对账", tr: "Otomatik mutabakat", ar: "مطابقة تلقائية" },
        text: {
          en: "Daily matching of your records against bank and gateway reports, with discrepancies flagged for review.",
          ru: "Ежедневная сверка ваших данных с отчётами банка и шлюза; расхождения помечаются для разбора.",
          zh: "每天将您的账目与银行和支付网关报表进行比对，差异会被标记出来待核查。",
          tr: "Kayıtlarınız her gün banka ve ağ geçidi raporlarıyla eşleştirilir; farklar inceleme için işaretlenir.",
          ar: "مطابقة يومية لسجلاتكم مع تقارير البنك وبوابة الدفع، مع تمييز الفروقات للمراجعة.",
        },
      },
      {
        title: { en: "Configurable anti-fraud rules", ru: "Настраиваемый антифрод", zh: "可配置的反欺诈规则", tr: "Ayarlanabilir dolandırıcılık kuralları", ar: "قواعد احتيال قابلة للضبط" },
        text: {
          en: "Limits, velocity checks and risk rules that your team can change without a new release.",
          ru: "Лимиты, проверки частоты операций и правила риска, которые команда меняет без нового релиза.",
          zh: "限额、频率检查和风险规则，团队无需发布新版本即可调整。",
          tr: "Ekibinizin yeni sürüm çıkarmadan değiştirebileceği limitler, sıklık kontrolleri ve risk kuralları.",
          ar: "حدود وفحوصات لتكرار العمليات وقواعد مخاطر يغيّرها فريقكم دون إصدار جديد.",
        },
      },
      {
        title: { en: "Audit trail", ru: "Журнал действий", zh: "操作审计日志", tr: "Denetim izi", ar: "سجل التدقيق" },
        text: {
          en: "Who changed what and when, for operations and settings. Records cannot be edited after the fact.",
          ru: "Кто, что и когда изменил — по операциям и настройкам. Записи нельзя исправить задним числом.",
          zh: "记录谁在何时修改了哪些操作和设置，记录事后无法篡改。",
          tr: "İşlemler ve ayarlar için kimin neyi ne zaman değiştirdiği. Kayıtlar sonradan düzenlenemez.",
          ar: "من غيّر ماذا ومتى، في العمليات والإعدادات. ولا يمكن تعديل السجلات بأثر رجعي.",
        },
      },
      {
        title: { en: "Data protection", ru: "Защита данных", zh: "数据保护", tr: "Veri koruma", ar: "حماية البيانات" },
        text: {
          en: "Personal data encrypted, secrets kept in a vault, role-based access. Card data stays with the gateway through tokenization.",
          ru: "Шифрование персональных данных, секреты в хранилище, доступ по ролям. Данные карт остаются у шлюза за счёт токенизации.",
          zh: "个人数据加密，密钥存于专用保管库，按角色授权。卡数据通过令牌化留在支付网关一侧。",
          tr: "Kişisel veriler şifrelenir, gizli anahtarlar kasada tutulur, erişim role göre verilir. Kart verileri tokenizasyonla ağ geçidinde kalır.",
          ar: "تشفير البيانات الشخصية، وحفظ الأسرار في خزنة، وصلاحيات حسب الدور. وتبقى بيانات البطاقات لدى بوابة الدفع عبر الترميز.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "Do you help with licences and the regulator?",
          ru: "Вы помогаете с лицензией и регулятором?",
          zh: "你们能协助办理牌照、对接监管吗？",
          tr: "Lisans ve düzenleyici konusunda yardımcı oluyor musunuz?",
          ar: "هل تساعدون في التراخيص والتعامل مع الجهة التنظيمية؟",
        },
        a: {
          en: "Obtaining a licence is a matter for you and your legal advisers. We build the product to the requirements they set: KYC/AML flows, data storage, and reports for the regulator and audit. We can work directly with your compliance team.",
          ru: "Получение лицензии — задача ваша и ваших юристов. Мы делаем продукт под требования, которые они определяют: процессы KYC/AML, хранение данных, отчёты для регулятора и аудита. Можем работать напрямую с вашим комплаенсом.",
          zh: "牌照申请由您和您的法律顾问负责。我们按照他们提出的要求构建产品：KYC/AML 流程、数据存储，以及面向监管与审计的报表。我们可以直接与您的合规团队对接。",
          tr: "Lisans almak sizin ve hukuk danışmanlarınızın konusudur. Ürünü onların belirlediği gereksinimlere göre geliştiriyoruz: KYC/AML süreçleri, veri saklama, düzenleyici ve denetim raporları. Uyum ekibinizle doğrudan çalışabiliriz.",
          ar: "الحصول على الترخيص مسؤوليتكم ومسؤولية مستشاريكم القانونيين. نحن نبني المنتج وفق المتطلبات التي يحددونها: مسارات KYC/AML وتخزين البيانات والتقارير للجهة التنظيمية والتدقيق. ويمكننا العمل مباشرة مع فريق الامتثال لديكم.",
        },
      },
      {
        q: {
          en: "How much does it cost and how long does it take?",
          ru: "Сколько это стоит и сколько занимает?",
          zh: "费用和周期是多少？",
          tr: "Ne kadar tutar ve ne kadar sürer?",
          ar: "كم يكلّف وكم يستغرق؟",
        },
        a: {
          en: "Fintech projects start from $3k and take 4–10 weeks. The lower end is usually a single integration, such as a payment gateway or KYC. The upper end is a product with a ledger, lending flows and reporting. The price is fixed after scoping.",
          ru: "Финтех-проекты — от $3k и 4–10 недель. Нижняя граница — обычно одна интеграция, например платёжный шлюз или KYC. Верхняя — продукт с учётным реестром, кредитными процессами и отчётностью. Цена фиксируется после определения объёма.",
          zh: "金融科技项目 $3k 起，周期 4–10 周。下限通常是单项对接，例如支付网关或 KYC；上限是包含分类账、借贷流程和报表的完整产品。范围确定后锁定价格。",
          tr: "Fintek projeleri 3 bin $'dan başlar ve 4–10 hafta sürer. Alt sınır genellikle ödeme ağ geçidi veya KYC gibi tek bir entegrasyondur. Üst sınır ise defter, kredi süreçleri ve raporlama içeren bir üründür. Fiyat kapsam belirlendikten sonra sabitlenir.",
          ar: "تبدأ مشاريع التكنولوجيا المالية من $3k وتستغرق من 4 إلى 10 أسابيع. الحد الأدنى عادةً تكامل واحد، مثل بوابة دفع أو KYC، والحد الأعلى منتج بدفتر أستاذ ومسارات إقراض وتقارير. يُحدَّد السعر بعد تحديد النطاق.",
        },
      },
      {
        q: {
          en: "Can you integrate with our bank or a local payment provider?",
          ru: "Подключите наш банк или местного платёжного провайдера?",
          zh: "可以对接我们的银行或本地支付服务商吗？",
          tr: "Bankamızla veya yerel bir ödeme sağlayıcısıyla entegre olabilir misiniz?",
          ar: "هل يمكنكم التكامل مع بنكنا أو مزوّد دفع محلي؟",
        },
        a: {
          en: "Yes, if the provider has an API or a documented protocol. We review their documentation at the start, set up a test environment with them, and build retries and reconciliation around the integration.",
          ru: "Да, если у провайдера есть API или описанный протокол обмена. На старте изучаем его документацию, вместе с ним настраиваем тестовую среду и строим вокруг интеграции повторы запросов и сверку.",
          zh: "可以，只要对方提供 API 或有文档的接口协议。我们在开始时研究其文档，与对方一起搭建测试环境，并围绕对接实现重试与对账机制。",
          tr: "Evet, sağlayıcının bir API'si veya belgelenmiş bir protokolü varsa. Başta belgelerini inceliyor, onlarla bir test ortamı kuruyor ve entegrasyonun etrafına yeniden deneme ve mutabakat mekanizmaları kuruyoruz.",
          ar: "نعم، إذا كان لدى المزوّد واجهة API أو بروتوكول موثّق. نراجع توثيقه في البداية، ونُعدّ معه بيئة اختبار، ونبني حول التكامل آليات إعادة المحاولة والمطابقة.",
        },
      },
    ],
  },
};
