import type { ServiceDetails } from "./types";

// Long-form content for: ai-bots, telegram-bots.
// Must agree with the package cards in translations.ts (price, timeline, scope).
export const PART_E: ServiceDetails = {
  "ai-bots": {
    intro: {
      en: "Sales and support teams answer the same questions every day, and leads get lost between messengers. We build a chatbot on a large language model that answers from your price list, FAQ and documents in Telegram, WhatsApp and website chat, qualifies leads and hands them to a manager.",
      ru: "Отделы продаж и поддержки каждый день отвечают на одни и те же вопросы, а заявки теряются между мессенджерами. Мы делаем чат-бота на большой языковой модели: он отвечает по вашему прайсу, FAQ и документам в Telegram, WhatsApp и чате на сайте, квалифицирует заявки и передаёт их менеджеру.",
      zh: "销售和客服团队每天都在回答相同的问题，线索也常在各个通讯软件之间流失。我们基于大语言模型打造聊天机器人：在 Telegram、WhatsApp 和网站聊天中依据您的价目表、FAQ 和文档作答，筛选线索并转交给经理。",
      tr: "Satış ve destek ekipleri her gün aynı soruları yanıtlar, talepler ise mesajlaşma uygulamaları arasında kaybolur. Büyük dil modeliyle çalışan bir sohbet botu geliştiriyoruz: Telegram, WhatsApp ve web sitesi sohbetinde fiyat listeniz, SSS ve belgelerinizden yanıt verir, talepleri nitelendirir ve yöneticiye aktarır.",
      ar: "تجيب فرق المبيعات والدعم عن الأسئلة نفسها كل يوم، وتضيع الطلبات بين تطبيقات المراسلة. نبني روبوت محادثة على نموذج لغوي كبير يجيب من قائمة أسعارك والأسئلة الشائعة ومستنداتك عبر Telegram وWhatsApp ودردشة الموقع، ويؤهّل الطلبات ويحيلها إلى المدير.",
    },
    stack: ["OpenAI API (ChatGPT)", "LLM", "RAG / vector search", "Telegram Bot API", "WhatsApp Business API", "Node.js", "PostgreSQL", "AnteykoCRM"],
    steps: [
      {
        title: { en: "Scenarios and knowledge", ru: "Сценарии и база знаний", zh: "场景与知识库", tr: "Senaryolar ve bilgi tabanı", ar: "السيناريوهات وقاعدة المعرفة" },
        text: {
          en: "We collect your price list, FAQ and documents, and agree which questions the bot answers and when it calls a manager.",
          ru: "Собираем ваш прайс, FAQ и документы, договариваемся, на какие вопросы отвечает бот и когда он зовёт менеджера.",
          zh: "收集您的价目表、FAQ 和文档，确定机器人回答哪些问题、何时转接经理。",
          tr: "Fiyat listenizi, SSS'nizi ve belgelerinizi topluyor, botun hangi soruları yanıtlayacağını ve ne zaman yöneticiyi çağıracağını belirliyoruz.",
          ar: "نجمع قائمة أسعارك والأسئلة الشائعة والمستندات، ونتفق على الأسئلة التي يجيب عنها الروبوت ومتى يستدعي المدير.",
        },
      },
      {
        title: { en: "Bot setup", ru: "Настройка бота", zh: "机器人配置", tr: "Bot kurulumu", ar: "إعداد الروبوت" },
        text: {
          en: "We connect the language model to your knowledge base and set the tone of answers and the questions for qualifying leads.",
          ru: "Подключаем языковую модель к вашей базе знаний, настраиваем тон ответов и вопросы для квалификации заявок.",
          zh: "将语言模型接入您的知识库，设定回答语气以及筛选线索时要问的问题。",
          tr: "Dil modelini bilgi tabanınıza bağlıyor, yanıtların üslubunu ve talepleri nitelendirme sorularını ayarlıyoruz.",
          ar: "نربط النموذج اللغوي بقاعدة معرفتك، ونضبط أسلوب الإجابات والأسئلة التي تُستخدم لتأهيل الطلبات.",
        },
      },
      {
        title: { en: "Channels and CRM", ru: "Каналы и CRM", zh: "渠道与 CRM", tr: "Kanallar ve CRM", ar: "القنوات وCRM" },
        text: {
          en: "We connect Telegram, WhatsApp and website chat, and set up handoff to managers and sending leads to AnteykoCRM.",
          ru: "Подключаем Telegram, WhatsApp и чат на сайте, настраиваем передачу менеджерам и отправку заявок в AnteykoCRM.",
          zh: "接入 Telegram、WhatsApp 和网站聊天，配置转接经理以及将线索发送到 AnteykoCRM。",
          tr: "Telegram, WhatsApp ve web sitesi sohbetini bağlıyor, yöneticilere aktarımı ve taleplerin AnteykoCRM'e gönderilmesini ayarlıyoruz.",
          ar: "نربط Telegram وWhatsApp ودردشة الموقع، ونضبط التحويل إلى المديرين وإرسال الطلبات إلى AnteykoCRM.",
        },
      },
      {
        title: { en: "Testing and launch", ru: "Тесты и запуск", zh: "测试与上线", tr: "Test ve yayın", ar: "الاختبار والإطلاق" },
        text: {
          en: "We test the bot on real customer questions, improve weak answers, launch it and walk your team through the dashboard.",
          ru: "Проверяем бота на реальных вопросах клиентов, дорабатываем слабые ответы, запускаем и показываем команде панель.",
          zh: "用真实的客户问题测试机器人，改进不理想的回答，正式上线，并带团队熟悉数据面板。",
          tr: "Botu gerçek müşteri sorularıyla test ediyor, zayıf yanıtları iyileştiriyor, yayına alıyor ve ekibinize paneli tanıtıyoruz.",
          ar: "نختبر الروبوت على أسئلة حقيقية من العملاء، ونحسّن الإجابات الضعيفة، ثم نطلقه ونعرّف فريقك على لوحة التحكم.",
        },
      },
    ],
    features: [
      {
        title: { en: "Answers from your documents", ru: "Ответы по вашим документам", zh: "依据您的文档作答", tr: "Belgelerinizden yanıtlar", ar: "إجابات من مستنداتك" },
        text: {
          en: "The bot answers from your price list, FAQ and documents, and the knowledge base is updated when prices or terms change.",
          ru: "Бот отвечает по вашему прайсу, FAQ и документам, а базу знаний обновляют, когда меняются цены или условия.",
          zh: "机器人依据您的价目表、FAQ 和文档作答，价格或条件变化时可更新知识库。",
          tr: "Bot fiyat listeniz, SSS ve belgelerinizden yanıt verir; fiyatlar veya koşullar değiştiğinde bilgi tabanı güncellenir.",
          ar: "يجيب الروبوت من قائمة أسعارك والأسئلة الشائعة والمستندات، وتُحدَّث قاعدة المعرفة عند تغيّر الأسعار أو الشروط.",
        },
      },
      {
        title: { en: "One bot, three channels", ru: "Один бот — три канала", zh: "一个机器人，三个渠道", tr: "Tek bot, üç kanal", ar: "روبوت واحد وثلاث قنوات" },
        text: {
          en: "The same bot works in Telegram, WhatsApp and the website chat, with one shared knowledge base.",
          ru: "Один и тот же бот работает в Telegram, WhatsApp и чате на сайте — с общей базой знаний.",
          zh: "同一个机器人在 Telegram、WhatsApp 和网站聊天中工作，共用一套知识库。",
          tr: "Aynı bot Telegram, WhatsApp ve web sitesi sohbetinde ortak bir bilgi tabanıyla çalışır.",
          ar: "يعمل الروبوت نفسه في Telegram وWhatsApp ودردشة الموقع، بقاعدة معرفة مشتركة.",
        },
      },
      {
        title: { en: "Lead qualification", ru: "Квалификация заявок", zh: "线索筛选", tr: "Talep nitelendirme", ar: "تأهيل الطلبات" },
        text: {
          en: "The bot asks clarifying questions about the need, timing and contacts, so the manager gets a lead with answers already collected.",
          ru: "Бот задаёт уточняющие вопросы о задаче, сроках и контактах, и менеджер получает заявку с уже собранными ответами.",
          zh: "机器人会询问需求、时间和联系方式等问题，经理拿到的线索已附带收集好的信息。",
          tr: "Bot ihtiyaç, zaman ve iletişim bilgileri hakkında sorular sorar; yönetici yanıtları toplanmış bir talep alır.",
          ar: "يطرح الروبوت أسئلة توضيحية عن الحاجة والتوقيت وبيانات التواصل، فيتلقى المدير طلبًا بإجابات جاهزة.",
        },
      },
      {
        title: { en: "Handoff to a manager", ru: "Передача менеджеру", zh: "转接经理", tr: "Yöneticiye aktarma", ar: "التحويل إلى المدير" },
        text: {
          en: "When a customer asks for a person or the bot is unsure, the conversation goes to a manager with the full history.",
          ru: "Если клиент просит живого человека или бот не уверен в ответе, диалог переходит к менеджеру со всей историей.",
          zh: "当客户要求人工服务或机器人没有把握时，对话会连同完整记录转给经理。",
          tr: "Müşteri bir insanla görüşmek istediğinde veya bot emin olmadığında, konuşma tüm geçmişiyle yöneticiye geçer.",
          ar: "عندما يطلب العميل شخصًا حقيقيًا أو لا يكون الروبوت متأكدًا، تنتقل المحادثة إلى المدير مع سجلها الكامل.",
        },
      },
      {
        title: { en: "Leads in AnteykoCRM", ru: "Заявки в AnteykoCRM", zh: "线索进入 AnteykoCRM", tr: "Talepler AnteykoCRM'de", ar: "الطلبات في AnteykoCRM" },
        text: {
          en: "Every lead and conversation is saved in AnteykoCRM, so the team sees the history and status of each customer.",
          ru: "Каждая заявка и каждый диалог сохраняются в AnteykoCRM: команда видит историю и статус по каждому клиенту.",
          zh: "每条线索和对话都保存在 AnteykoCRM 中，团队可以看到每位客户的历史和状态。",
          tr: "Her talep ve konuşma AnteykoCRM'e kaydedilir; ekip her müşterinin geçmişini ve durumunu görür.",
          ar: "يُحفَظ كل طلب وكل محادثة في AnteykoCRM، فيرى الفريق سجل كل عميل وحالته.",
        },
      },
      {
        title: { en: "Questions and conversions", ru: "Вопросы и конверсия", zh: "问题与转化", tr: "Sorular ve dönüşümler", ar: "الأسئلة والتحويلات" },
        text: {
          en: "A dashboard shows what customers ask, how the bot answers and how many conversations turn into leads.",
          ru: "Панель показывает, о чём спрашивают клиенты, как отвечает бот и сколько диалогов превращаются в заявки.",
          zh: "数据面板展示客户在问什么、机器人如何回答，以及有多少对话转化为线索。",
          tr: "Panel, müşterilerin ne sorduğunu, botun nasıl yanıt verdiğini ve kaç konuşmanın talebe dönüştüğünü gösterir.",
          ar: "تعرض لوحة التحكم ما يسأل عنه العملاء، وكيف يجيب الروبوت، وكم محادثة تتحول إلى طلب.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "What if the bot doesn't know the answer?",
          ru: "Что если бот не знает ответа?",
          zh: "机器人不知道答案怎么办？",
          tr: "Bot cevabı bilmezse ne olur?",
          ar: "ماذا لو لم يعرف الروبوت الإجابة؟",
        },
        a: {
          en: "The bot answers from the knowledge it is given: your price list, FAQ and documents. If a question falls outside that or the bot is unsure, it is set up to hand the conversation to a manager rather than guess. Such questions show up in the dashboard, so the knowledge base can be extended.",
          ru: "Бот отвечает по тем знаниям, которые ему дали: прайсу, FAQ и документам. Если вопрос выходит за их рамки или бот не уверен, он настроен передать диалог менеджеру, а не угадывать. Такие вопросы видны в панели, и по ним можно дополнить базу знаний.",
          zh: "机器人依据提供给它的知识作答：您的价目表、FAQ 和文档。如果问题超出范围或机器人没有把握，它会按设定把对话转给经理，而不是去猜。这类问题会显示在数据面板中，便于补充知识库。",
          tr: "Bot kendisine verilen bilgilerden yanıt verir: fiyat listeniz, SSS ve belgeleriniz. Soru bunların dışında kalırsa veya bot emin değilse, tahmin yürütmek yerine konuşmayı yöneticiye aktaracak şekilde ayarlanır. Bu sorular panelde görünür, böylece bilgi tabanı genişletilebilir.",
          ar: "يجيب الروبوت من المعرفة التي زُوّد بها: قائمة أسعارك والأسئلة الشائعة والمستندات. وإذا خرج السؤال عن ذلك أو لم يكن الروبوت متأكدًا، فهو مضبوط لتحويل المحادثة إلى المدير بدل التخمين. وتظهر هذه الأسئلة في لوحة التحكم لتوسيع قاعدة المعرفة.",
        },
      },
      {
        q: {
          en: "Which model does the bot run on?",
          ru: "На какой модели работает бот?",
          zh: "机器人用的是哪个模型？",
          tr: "Bot hangi modelle çalışıyor?",
          ar: "على أي نموذج يعمل الروبوت؟",
        },
        a: {
          en: "We choose the model for the task: ChatGPT or another LLM, depending on the languages, the quality of answers you need and the cost. API usage of the model is billed by the provider by volume; we help estimate it before launch.",
          ru: "Модель подбираем под задачу: ChatGPT или другую LLM — в зависимости от языков, нужного качества ответов и стоимости. Использование API модели оплачивается провайдеру по объёму; мы помогаем заранее оценить эти расходы.",
          zh: "我们根据任务选择模型：ChatGPT 或其他大语言模型，取决于语言、所需的回答质量和成本。模型的 API 使用费由服务商按用量计费，我们会在上线前帮您估算。",
          tr: "Modeli işe göre seçiyoruz: diller, ihtiyaç duyulan yanıt kalitesi ve maliyete bağlı olarak ChatGPT veya başka bir LLM. Modelin API kullanımı sağlayıcı tarafından hacme göre faturalandırılır; yayından önce bunu tahmin etmenize yardımcı oluyoruz.",
          ar: "نختار النموذج حسب المهمة: ChatGPT أو نموذج لغوي آخر، وفقًا للغات وجودة الإجابات المطلوبة والتكلفة. ويُحتسب استخدام واجهة API للنموذج من قِبل المزوّد حسب الحجم، ونساعدكم في تقديره قبل الإطلاق.",
        },
      },
      {
        q: {
          en: "Will the bot replace our managers?",
          ru: "Бот заменит менеджеров?",
          zh: "机器人会取代我们的经理吗？",
          tr: "Bot yöneticilerimizin yerini alacak mı?",
          ar: "هل سيحل الروبوت محل مديرينا؟",
        },
        a: {
          en: "No. It takes on the repeated questions and the first qualification of leads. Managers receive leads with the answers already collected and the conversation history in AnteykoCRM, and handle deals and complex cases themselves.",
          ru: "Нет. Он берёт на себя повторяющиеся вопросы и первичную квалификацию заявок. Менеджеры получают заявки с уже собранными ответами и историей диалога в AnteykoCRM, а сделки и сложные случаи ведут сами.",
          zh: "不会。它承担重复性问题和线索的初步筛选。经理在 AnteykoCRM 中收到附带已收集信息和对话记录的线索，成交和复杂情况仍由经理亲自处理。",
          tr: "Hayır. Tekrarlanan soruları ve taleplerin ilk nitelendirmesini üstlenir. Yöneticiler, yanıtları toplanmış ve konuşma geçmişi AnteykoCRM'de olan talepleri alır; satışları ve karmaşık durumları kendileri yönetir.",
          ar: "لا. فهو يتولى الأسئلة المتكررة والتأهيل الأولي للطلبات. ويتلقى المديرون الطلبات مع الإجابات المجمّعة وسجل المحادثة في AnteykoCRM، ويتولون بأنفسهم الصفقات والحالات المعقدة.",
        },
      },
    ],
  },

  "telegram-bots": {
    intro: {
      en: "For a cafe, shop, salon or course, a separate app is often too much to start with. A Telegram bot covers the basics in a messenger customers already use: catalogue, orders or bookings, online payment with a fiscal receipt and notifications. Orders and contacts go to AnteykoCRM.",
      ru: "Кафе, магазину, салону или курсам отдельное приложение на старте часто не по силам. Telegram-бот закрывает главное в мессенджере, которым клиенты уже пользуются: каталог, заказ или запись, онлайн-оплата с фискальным чеком и уведомления. Заказы и контакты попадают в AnteykoCRM.",
      zh: "对于咖啡馆、商店、美容院或课程来说，起步阶段单独开发 App 往往负担太重。Telegram 机器人在客户已经在用的通讯软件里解决核心需求：目录、下单或预约、带电子发票的在线支付以及通知。订单和联系人进入 AnteykoCRM。",
      tr: "Bir kafe, mağaza, salon veya kurs için başlangıçta ayrı bir uygulama çoğu zaman fazla gelir. Telegram botu, müşterilerin zaten kullandığı mesajlaşma uygulamasında temel ihtiyaçları karşılar: katalog, sipariş veya randevu, mali fişli çevrim içi ödeme ve bildirimler. Siparişler ve kişiler AnteykoCRM'e düşer.",
      ar: "بالنسبة لمقهى أو متجر أو صالون أو دورة تدريبية، غالبًا ما يكون التطبيق المستقل عبئًا كبيرًا في البداية. يغطي روبوت Telegram الأساسيات داخل تطبيق المراسلة الذي يستخدمه العملاء أصلًا: كتالوج وطلب أو حجز ودفع إلكتروني مع إيصال مالي وإشعارات. وتصل الطلبات وجهات الاتصال إلى AnteykoCRM.",
    },
    stack: ["Telegram Bot API", "Node.js", "PostgreSQL", "Online payments", "KKM fiscal receipts", "Admin panel", "AnteykoCRM"],
    steps: [
      {
        title: { en: "Scenario and menu", ru: "Сценарий и меню", zh: "流程与菜单", tr: "Senaryo ve menü", ar: "السيناريو والقائمة" },
        text: {
          en: "We agree on the menu, the catalogue and the order or booking flow, step by step from the first message to payment.",
          ru: "Согласуем меню, каталог и сценарий заказа или записи — по шагам, от первого сообщения до оплаты.",
          zh: "确定菜单、目录以及下单或预约流程，从第一条消息到付款逐步梳理。",
          tr: "Menüyü, kataloğu ve sipariş ya da randevu akışını ilk mesajdan ödemeye kadar adım adım belirliyoruz.",
          ar: "نتفق على القائمة والكتالوج ومسار الطلب أو الحجز خطوة بخطوة، من أول رسالة حتى الدفع.",
        },
      },
      {
        title: { en: "Catalogue and payment", ru: "Каталог и оплата", zh: "目录与支付", tr: "Katalog ve ödeme", ar: "الكتالوج والدفع" },
        text: {
          en: "We build the bot, fill in the catalogue, connect online payment with fiscal receipts via KKM and set up notifications.",
          ru: "Собираем бота, наполняем каталог, подключаем онлайн-оплату с фискальными чеками через ККМ и настраиваем уведомления.",
          zh: "开发机器人、填充目录，接入通过 KKM 开具电子发票的在线支付，并配置通知。",
          tr: "Botu geliştiriyor, kataloğu dolduruyor, KKM üzerinden mali fişli çevrim içi ödemeyi bağlıyor ve bildirimleri ayarlıyoruz.",
          ar: "نبني الروبوت ونملأ الكتالوج، ونربط الدفع الإلكتروني مع الإيصالات المالية عبر KKM، ونضبط الإشعارات.",
        },
      },
      {
        title: { en: "Admin panel and CRM", ru: "Админка и CRM", zh: "后台与 CRM", tr: "Yönetim paneli ve CRM", ar: "لوحة الإدارة وCRM" },
        text: {
          en: "We set up the admin panel for orders and content and connect orders and contacts to AnteykoCRM.",
          ru: "Делаем админ-панель для заказов и контента, подключаем передачу заказов и контактов в AnteykoCRM.",
          zh: "搭建订单与内容管理后台，并将订单和联系人接入 AnteykoCRM。",
          tr: "Siparişler ve içerik için yönetim panelini kuruyor, siparişleri ve kişileri AnteykoCRM'e bağlıyoruz.",
          ar: "نُعدّ لوحة الإدارة للطلبات والمحتوى، ونربط الطلبات وجهات الاتصال بـ AnteykoCRM.",
        },
      },
      {
        title: { en: "Testing and launch", ru: "Тесты и запуск", zh: "测试与上线", tr: "Test ve yayın", ar: "الاختبار والإطلاق" },
        text: {
          en: "We place test orders and payments, fix the details, launch the bot and show your team how to work with it.",
          ru: "Проводим тестовые заказы и оплаты, правим детали, запускаем бота и показываем команде, как с ним работать.",
          zh: "进行测试下单和支付，完善细节，正式上线，并教团队如何使用。",
          tr: "Test siparişleri ve ödemeleri yapıyor, ayrıntıları düzeltiyor, botu yayına alıyor ve ekibinize nasıl kullanılacağını gösteriyoruz.",
          ar: "نجري طلبات ومدفوعات تجريبية، ونصلح التفاصيل، ثم نطلق الروبوت ونُري فريقك كيف يعمل معه.",
        },
      },
    ],
    features: [
      {
        title: { en: "Catalogue and menu", ru: "Каталог и меню", zh: "目录与菜单", tr: "Katalog ve menü", ar: "الكتالوج والقائمة" },
        text: {
          en: "Products or services with photos, prices and categories, browsed with buttons right in the chat.",
          ru: "Товары или услуги с фото, ценами и категориями — клиент листает их кнопками прямо в чате.",
          zh: "带图片、价格和分类的商品或服务，客户直接在聊天中通过按钮浏览。",
          tr: "Fotoğraf, fiyat ve kategorileriyle ürünler veya hizmetler; sohbet içinde butonlarla gezilir.",
          ar: "منتجات أو خدمات بالصور والأسعار والفئات، يتصفحها العميل بالأزرار داخل المحادثة مباشرة.",
        },
      },
      {
        title: { en: "Orders and bookings", ru: "Заказ и запись", zh: "下单与预约", tr: "Sipariş ve randevu", ar: "الطلب والحجز" },
        text: {
          en: "The customer picks a product or a time slot, leaves contacts and gets a confirmation in the bot.",
          ru: "Клиент выбирает товар или время, оставляет контакты и получает подтверждение в боте.",
          zh: "客户选择商品或时间段，留下联系方式，并在机器人中收到确认。",
          tr: "Müşteri bir ürün veya saat seçer, iletişim bilgilerini bırakır ve botta onay alır.",
          ar: "يختار العميل منتجًا أو موعدًا، ويترك بيانات التواصل، ويتلقى تأكيدًا في الروبوت.",
        },
      },
      {
        title: { en: "Payment with a receipt", ru: "Оплата с чеком", zh: "支付并开票", tr: "Fişli ödeme", ar: "الدفع مع إيصال" },
        text: {
          en: "Online payment inside the order flow, with a fiscal receipt issued through online cash registers (KKM).",
          ru: "Онлайн-оплата прямо в сценарии заказа, с фискальным чеком через онлайн-ККМ.",
          zh: "在下单流程中在线支付，并通过在线收银机（KKM）开具电子发票。",
          tr: "Sipariş akışı içinde çevrim içi ödeme; mali fiş çevrim içi yazar kasa (KKM) üzerinden kesilir.",
          ar: "دفع إلكتروني داخل مسار الطلب، مع إيصال مالي يصدر عبر أجهزة الكاش الإلكترونية (KKM).",
        },
      },
      {
        title: { en: "Notifications and mailings", ru: "Уведомления и рассылки", zh: "通知与群发", tr: "Bildirimler ve toplu mesajlar", ar: "الإشعارات والرسائل الجماعية" },
        text: {
          en: "Order statuses, booking reminders and mailings about offers to the bot's customers.",
          ru: "Статусы заказов, напоминания о записи и рассылки об акциях клиентам бота.",
          zh: "订单状态、预约提醒，以及向机器人用户群发优惠信息。",
          tr: "Sipariş durumları, randevu hatırlatmaları ve botun müşterilerine kampanya mesajları.",
          ar: "حالات الطلبات وتذكيرات الحجز ورسائل جماعية بالعروض لعملاء الروبوت.",
        },
      },
      {
        title: { en: "Admin panel", ru: "Админ-панель", zh: "管理后台", tr: "Yönetim paneli", ar: "لوحة الإدارة" },
        text: {
          en: "Your team edits the catalogue, prices and texts and processes orders without a developer.",
          ru: "Ваша команда сама меняет каталог, цены и тексты и обрабатывает заказы — без разработчика.",
          zh: "您的团队无需开发人员即可修改目录、价格和文案，并处理订单。",
          tr: "Ekibiniz kataloğu, fiyatları ve metinleri düzenler ve siparişleri geliştiriciye ihtiyaç duymadan işler.",
          ar: "يعدّل فريقك الكتالوج والأسعار والنصوص ويعالج الطلبات دون الحاجة إلى مطوّر.",
        },
      },
      {
        title: { en: "Orders in AnteykoCRM", ru: "Заказы в AnteykoCRM", zh: "订单进入 AnteykoCRM", tr: "Siparişler AnteykoCRM'de", ar: "الطلبات في AnteykoCRM" },
        text: {
          en: "Every order and contact is saved in AnteykoCRM, so each customer's history is in one place.",
          ru: "Каждый заказ и контакт сохраняется в AnteykoCRM, и история каждого клиента собрана в одном месте.",
          zh: "每个订单和联系人都保存在 AnteykoCRM 中，每位客户的记录集中在一处。",
          tr: "Her sipariş ve kişi AnteykoCRM'e kaydedilir; her müşterinin geçmişi tek bir yerde toplanır.",
          ar: "يُحفَظ كل طلب وكل جهة اتصال في AnteykoCRM، فيجتمع سجل كل عميل في مكان واحد.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "Why a bot and not an app?",
          ru: "Почему бот, а не приложение?",
          zh: "为什么选机器人而不是 App？",
          tr: "Neden uygulama değil de bot?",
          ar: "لماذا روبوت وليس تطبيقًا؟",
        },
        a: {
          en: "A bot is faster and cheaper to launch: customers install nothing, and there is no app store review. It suits a first version for testing demand. If the business grows, the orders and customer base in AnteykoCRM remain and can be used for an app later.",
          ru: "Бота быстрее и дешевле запустить: клиентам ничего не нужно устанавливать, нет проверки в сторах. Это хороший первый шаг, чтобы проверить спрос. Если бизнес вырастет, заказы и клиентская база в AnteykoCRM сохранятся, и на них можно будет опереться при запуске приложения.",
          zh: "机器人上线更快、成本更低：客户无需安装任何东西，也不用经过应用商店审核。它很适合作为验证需求的第一版。业务发展后，AnteykoCRM 中的订单和客户数据依然保留，之后开发 App 时也能继续使用。",
          tr: "Bot daha hızlı ve daha düşük maliyetle yayına alınır: müşteriler hiçbir şey yüklemez, mağaza incelemesi de yoktur. Talebi test etmek için iyi bir ilk sürümdür. İşletme büyürse AnteykoCRM'deki siparişler ve müşteri tabanı yerinde kalır, ileride bir uygulama için kullanılabilir.",
          ar: "إطلاق الروبوت أسرع وأقل تكلفة: لا يثبّت العملاء أي شيء، ولا توجد مراجعة في متاجر التطبيقات. وهو مناسب كنسخة أولى لاختبار الطلب. وإذا نما النشاط، تبقى الطلبات وقاعدة العملاء في AnteykoCRM ويمكن الاستفادة منها لاحقًا عند إطلاق تطبيق.",
        },
      },
      {
        q: {
          en: "How does payment work?",
          ru: "Как работает оплата?",
          zh: "支付是怎么进行的？",
          tr: "Ödeme nasıl çalışıyor?",
          ar: "كيف يعمل الدفع؟",
        },
        a: {
          en: "The customer pays online right in the order flow, without leaving Telegram for a separate site. After payment, a fiscal receipt is issued through online cash registers (KKM), and the order with its payment status appears in the admin panel and AnteykoCRM.",
          ru: "Клиент оплачивает онлайн прямо в сценарии заказа, не переходя на отдельный сайт. После оплаты формируется фискальный чек через онлайн-ККМ, а заказ со статусом оплаты появляется в админ-панели и в AnteykoCRM.",
          zh: "客户直接在下单流程中在线付款，无需跳转到单独的网站。付款后通过在线收银机（KKM）开具电子发票，带支付状态的订单会出现在管理后台和 AnteykoCRM 中。",
          tr: "Müşteri, ayrı bir siteye geçmeden sipariş akışı içinde çevrim içi öder. Ödemeden sonra çevrim içi yazar kasa (KKM) üzerinden mali fiş kesilir; ödeme durumuyla birlikte sipariş yönetim panelinde ve AnteykoCRM'de görünür.",
          ar: "يدفع العميل إلكترونيًا داخل مسار الطلب مباشرة، دون الانتقال إلى موقع منفصل. وبعد الدفع يصدر إيصال مالي عبر أجهزة الكاش الإلكترونية (KKM)، ويظهر الطلب مع حالة الدفع في لوحة الإدارة وفي AnteykoCRM.",
        },
      },
      {
        q: {
          en: "Can we edit the catalogue ourselves?",
          ru: "Сможем ли мы сами менять каталог?",
          zh: "我们可以自己修改目录吗？",
          tr: "Kataloğu kendimiz düzenleyebilir miyiz?",
          ar: "هل يمكننا تعديل الكتالوج بأنفسنا؟",
        },
        a: {
          en: "Yes. Products, prices, photos and bot texts are edited in the admin panel without a developer. Your team processes orders there too and can launch mailings to customers when there is a new offer.",
          ru: "Да. Товары, цены, фото и тексты бота меняются в админ-панели без разработчика. Там же команда обрабатывает заказы и может запустить рассылку клиентам, когда появляется новая акция.",
          zh: "可以。商品、价格、图片和机器人文案都可以在管理后台中修改，无需开发人员。团队也在后台处理订单，有新优惠时还可以向客户发起群发。",
          tr: "Evet. Ürünler, fiyatlar, fotoğraflar ve bot metinleri yönetim panelinden geliştiriciye gerek kalmadan düzenlenir. Ekibiniz siparişleri de orada işler ve yeni bir kampanya olduğunda müşterilere toplu mesaj gönderebilir.",
          ar: "نعم. تُعدَّل المنتجات والأسعار والصور ونصوص الروبوت من لوحة الإدارة دون مطوّر. ومن هناك أيضًا يعالج فريقك الطلبات، ويمكنه إرسال رسائل جماعية للعملاء عند وجود عرض جديد.",
        },
      },
    ],
  },
};
