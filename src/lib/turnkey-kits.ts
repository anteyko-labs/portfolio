import type { L } from "@/lib/i18n-text";
import type { PackageId } from "@/lib/service-slugs";

// Turnkey hardware kits from the commercial offer (КП, November 2026).
// Hardware prices are Delta (delta.kg) retail, November 2026; lines with
// `est: true` are average market prices, refined after the site survey.
// Prices are in Kyrgyz som — these kits are sold and installed in Kyrgyzstan.

export interface KitLine {
  /** Model names are not translated; generic items are */
  name: L | string;
  qty: number;
  price: number;
  est?: boolean;
}

export interface Kit {
  id: string;
  /** The service page this kit belongs to, if there is one */
  packageId?: PackageId;
  title: L;
  forWhom: L;
  /** "approx" → «≈ 35 000 сом», "from" → «от 100 000 сом» */
  priceKind: "approx" | "from";
  price: number;
  total: number;
  lines: KitLine[];
  note: L;
}

const install = (ru: string, en: string, zh: string, tr: string, ar: string): L => ({ ru, en, zh, tr, ar });

export const KITS: Kit[] = [
  {
    id: "security-start",
    packageId: "cctv",
    title: { ru: "Безопасность Старт", en: "Security Start", zh: "安防入门套装", tr: "Güvenlik Başlangıç", ar: "باقة الأمان الأساسية" },
    forWhom: {
      ru: "Магазин, офис, кафе, частный дом, небольшой склад",
      en: "Shop, office, café, private house, small warehouse",
      zh: "商店、办公室、咖啡馆、私宅、小型仓库",
      tr: "Mağaza, ofis, kafe, müstakil ev, küçük depo",
      ar: "متجر، مكتب، مقهى، منزل خاص، مستودع صغير",
    },
    priceKind: "approx",
    price: 35000,
    total: 34830,
    lines: [
      { name: "IP-камера 2 Мп HiLook IPC-B121H-UC (PoE, 30 м ИК)", qty: 4, price: 1990 },
      { name: "NVR HiLook NVR-104H-D (4 ch, H.265+)", qty: 1, price: 3380 },
      { name: install("Диск 512 ГБ под архив (≈ 7–10 дней)", "512 GB archive drive (≈ 7–10 days)", "512 GB 存储硬盘（约 7–10 天）", "512 GB arşiv diski (≈ 7–10 gün)", "قرص أرشيف 512 جيجابايت (≈ 7–10 أيام)"), qty: 1, price: 3500, est: true },
      { name: install("PoE-коммутатор на 4–8 портов", "4–8 port PoE switch", "4–8 口 PoE 交换机", "4–8 portlu PoE switch", "محوّل PoE بـ 4–8 منافذ"), qty: 1, price: 2500, est: true },
      { name: install("Кабель, коннекторы, крепёж", "Cable, connectors, mounts", "线缆、接头、支架", "Kablo, konnektör, montaj parçaları", "كابلات وموصلات وحوامل"), qty: 1, price: 4500, est: true },
      { name: install("Монтаж, настройка, просмотр с телефона", "Installation, setup, phone viewing", "安装、调试、手机查看", "Kurulum, ayar, telefondan izleme", "التركيب والضبط والمشاهدة من الهاتف"), qty: 1, price: 13000 },
    ],
    note: {
      ru: "Видно всё с телефона, запись круглосуточно. «Стандарт»: 8 камер + диск 2 ТБ (≈ 30 дней) — ≈ 65 000 сом.",
      en: "See everything from your phone, 24/7 recording. “Standard”: 8 cameras + 2 TB (≈ 30 days) — ≈ 65,000 KGS.",
      zh: "手机随时查看，全天候录像。“标准版”：8 个摄像头 + 2 TB（约 30 天）— 约 65,000 索姆。",
      tr: "Her şey telefondan görünür, 7/24 kayıt. “Standart”: 8 kamera + 2 TB (≈ 30 gün) — ≈ 65.000 KGS.",
      ar: "كل شيء على هاتفك وتسجيل على مدار الساعة. «القياسية»: 8 كاميرات + 2 تيرابايت (≈ 30 يومًا) — ≈ 65,000 سوم.",
    },
  },
  {
    id: "smart-parking",
    packageId: "parking",
    title: { ru: "Умная парковка", en: "Smart Parking", zh: "智能停车", tr: "Akıllı Otopark", ar: "الموقف الذكي" },
    forWhom: {
      ru: "Платные стоянки, рынки, ТЦ, автобазы, ЖК — как на парковке «Акжол»",
      en: "Paid car parks, markets, malls, depots, residential complexes — like the Akzhol car park",
      zh: "收费停车场、市场、商场、车队基地、住宅小区——如 Akzhol 停车场",
      tr: "Ücretli otoparklar, pazarlar, AVM'ler, araç üsleri, siteler — Akjol otoparkındaki gibi",
      ar: "المواقف المدفوعة والأسواق والمراكز التجارية والقواعد والمجمعات السكنية — كما في موقف «أكجول»",
    },
    priceKind: "approx",
    price: 300000,
    total: 301000,
    lines: [
      { name: "ANPR Dahua DHI-ITC215-PW6M (2 MP, 2.7–13.5 mm)", qty: 2, price: 34650 },
      { name: "Hikvision DS-TMG320 (220 V, IP54)", qty: 2, price: 31610 },
      { name: "Hikvision DS-TMG001-3D (3.6–6 m)", qty: 2, price: 9180 },
      { name: install("Кабель, коробки, монтаж и пусконаладка", "Cable, boxes, installation and commissioning", "线缆、接线盒、安装与调试", "Kablo, kutular, kurulum ve devreye alma", "الكابلات والعلب والتركيب والتشغيل"), qty: 1, price: 30000, est: true },
      { name: install("Наше ПО: тарифы, оплата QR/картой, экран оплаты, белый/чёрный списки, Telegram-бот, отчёты", "Our software: tariffs, QR/card payment, payment screen, white/black lists, Telegram bot, reports", "我们的软件：计费、二维码/银行卡支付、缴费屏、黑白名单、Telegram 机器人、报表", "Yazılımımız: tarifeler, QR/kart ödeme, ödeme ekranı, beyaz/kara liste, Telegram botu, raporlar", "برنامجنا: التعرفة والدفع بـ QR/البطاقة وشاشة الدفع والقوائم البيضاء/السوداء وروبوت Telegram والتقارير"), qty: 1, price: 120000 },
    ],
    note: {
      ru: "Шлагбаум сам открывается своим и после оплаты. Опции: экран оплаты (от 25 000), ПК-сервер (от 35 000), онлайн-ККМ и принтер чеков, радар под стрелу DS-TMG035 (13 700/шт.).",
      en: "The barrier opens itself for regulars and after payment. Options: payment screen (from 25,000), server PC (from 35,000), online KKM and receipt printer, DS-TMG035 safety radar (13,700 each).",
      zh: "道闸对白名单车辆和付款后自动抬杆。选配：缴费屏（25,000 起）、服务器电脑（35,000 起）、在线收银机与小票打印机、DS-TMG035 防砸雷达（每台 13,700）。",
      tr: "Bariyer kayıtlı araçlara ve ödemeden sonra kendiliğinden açılır. Seçenekler: ödeme ekranı (25.000'den), sunucu PC (35.000'den), online KKM ve fiş yazıcı, DS-TMG035 güvenlik radarı (adet 13.700).",
      ar: "يفتح الحاجز تلقائيًا للسيارات المسجّلة وبعد الدفع. خيارات: شاشة دفع (من 25,000)، حاسوب خادم (من 35,000)، جهاز KKM وطابعة إيصالات، رادار أمان DS-TMG035 (13,700 للقطعة).",
    },
  },
  {
    id: "time-tracking",
    packageId: "time-access",
    title: { ru: "Учёт рабочего времени", en: "Time Tracking", zh: "考勤管理", tr: "Mesai Takibi", ar: "تتبّع الدوام" },
    forWhom: {
      ru: "Офисы, цеха, магазины, клиники, автосервисы",
      en: "Offices, workshops, shops, clinics, car services",
      zh: "办公室、车间、商店、诊所、汽修店",
      tr: "Ofisler, atölyeler, mağazalar, klinikler, oto servisler",
      ar: "المكاتب والورش والمتاجر والعيادات ومراكز صيانة السيارات",
    },
    priceKind: "approx",
    price: 90000,
    total: 91240,
    lines: [
      { name: "Face ID Hikvision DS-K1T343MX", qty: 1, price: 9240 },
      { name: "MikroTik hAP ax² (VPN)", qty: 1, price: 9000, est: true },
      { name: install("Монтаж, настройка, подключение к сети", "Installation, setup, network", "安装、调试、联网", "Kurulum, ayar, ağ bağlantısı", "التركيب والضبط والربط بالشبكة"), qty: 1, price: 3000, est: true },
      { name: install("Наше ПО: приход/уход, опоздания, табель, отчёт в Excel и Telegram", "Our software: check-in/out, lateness, timesheet, Excel and Telegram reports", "我们的软件：签到/签退、迟到、考勤表、Excel 与 Telegram 报表", "Yazılımımız: giriş/çıkış, gecikmeler, puantaj, Excel ve Telegram raporu", "برنامجنا: الحضور والانصراف والتأخير وكشف الدوام وتقارير Excel وTelegram"), qty: 1, price: 70000 },
    ],
    note: {
      ru: "Отметиться за коллегу нельзя — только по лицу. Утром владелец видит в Telegram, кто опоздал. Второй вход — +12 000 сом.",
      en: "No one can clock in for a colleague — face only. In the morning the owner sees in Telegram who was late. A second entrance is +12,000 KGS.",
      zh: "只能刷脸，无法代打卡。老板早上在 Telegram 里就能看到谁迟到了。第二个入口 +12,000 索姆。",
      tr: "Arkadaşı yerine giriş yapılamaz — yalnızca yüzle. Sahibi sabah Telegram'da kimin geç kaldığını görür. İkinci giriş +12.000 KGS.",
      ar: "لا يمكن تسجيل الحضور نيابةً عن زميل — بالوجه فقط. يرى المالك صباحًا في Telegram من تأخّر. مدخل ثانٍ +12,000 سوم.",
    },
  },
  {
    id: "turnstile-economy",
    packageId: "time-access",
    title: { ru: "СКУД с турникетом — эконом", en: "Turnstile access — Economy", zh: "闸机门禁 — 经济版", tr: "Turnikeli geçiş — Ekonomik", ar: "دخول بالبوابة الدوّارة — اقتصادية" },
    forWhom: {
      ru: "Школы, колледжи, общежития, предприятия",
      en: "Schools, colleges, dormitories, factories",
      zh: "学校、学院、宿舍、企业",
      tr: "Okullar, kolejler, yurtlar, işletmeler",
      ar: "المدارس والكليات والمساكن والمنشآت",
    },
    priceKind: "approx",
    price: 150000,
    total: 151230,
    lines: [
      { name: "Dahua DHI-ASGG100BL (tripod)", qty: 1, price: 35250 },
      { name: "Face ID Hikvision DS-K1T342MWX-E1", qty: 2, price: 12750 },
      { name: "Hikvision DS-KAB6", qty: 2, price: 2740 },
      { name: install("Монтаж, кабель, пусконаладка", "Installation, cable, commissioning", "安装、布线、调试", "Kurulum, kablo, devreye alma", "التركيب والكابلات والتشغيل"), qty: 1, price: 15000, est: true },
      { name: install("Наше ПО: доступ по лицу, журнал, уведомления родителям/руководству", "Our software: face access, log, alerts to parents/management", "我们的软件：刷脸通行、日志、通知家长/管理层", "Yazılımımız: yüzle geçiş, kayıt, velilere/yönetime bildirim", "برنامجنا: الدخول بالوجه والسجل وإشعارات للأهل/الإدارة"), qty: 1, price: 70000 },
    ],
    note: {
      ru: "Проход только по лицу — без карт, которые теряют и передают. Родитель получает в Telegram: «Ребёнок пришёл в 08:02».",
      en: "Entry by face only — no cards to lose or pass on. Parents get a Telegram message: “Your child arrived at 08:02”.",
      zh: "仅刷脸通行，没有会丢失或转借的卡。家长在 Telegram 收到：“孩子 08:02 到校”。",
      tr: "Yalnızca yüzle geçiş — kaybolan ya da devredilen kart yok. Veli Telegram'da “Çocuğunuz 08:02'de geldi” mesajı alır.",
      ar: "الدخول بالوجه فقط — لا بطاقات تضيع أو تُعار. يتلقى الوالد في Telegram: «وصل طفلك الساعة 08:02».",
    },
  },
  {
    id: "turnstile-business",
    packageId: "time-access",
    title: { ru: "СКУД с турникетом — бизнес", en: "Turnstile access — Business", zh: "闸机门禁 — 商务版", tr: "Turnikeli geçiş — İş", ar: "دخول بالبوابة الدوّارة — أعمال" },
    forWhom: {
      ru: "Бизнес-центры, университеты, банки, госучреждения",
      en: "Business centres, universities, banks, government offices",
      zh: "写字楼、大学、银行、政府机构",
      tr: "İş merkezleri, üniversiteler, bankalar, kamu kurumları",
      ar: "مراكز الأعمال والجامعات والبنوك والجهات الحكومية",
    },
    priceKind: "approx",
    price: 225000,
    total: 223500,
    lines: [
      { name: "Hikvision DS-K3B211LX-M (speed gate)", qty: 1, price: 102520 },
      { name: "Face ID Hikvision DS-K1T342MWX-E1", qty: 2, price: 12750 },
      { name: "Hikvision DS-KAB6", qty: 2, price: 2740 },
      { name: install("Монтаж, кабель, пусконаладка", "Installation, cable, commissioning", "安装、布线、调试", "Kurulum, kablo, devreye alma", "التركيب والكابلات والتشغيل"), qty: 1, price: 20000, est: true },
      { name: install("Наше ПО: доступ по лицу, гостевые пропуска, зоны, отчёты", "Our software: face access, guest passes, zones, reports", "我们的软件：刷脸通行、访客通行证、区域、报表", "Yazılımımız: yüzle geçiş, misafir kartları, bölgeler, raporlar", "برنامجنا: الدخول بالوجه وتصاريح الضيوف والمناطق والتقارير"), qty: 1, price: 70000 },
    ],
    note: {
      ru: "Быстрый проход без касания, гостевой пропуск отправляется ссылкой. Каждый следующий проход — от 130 000 сом.",
      en: "Fast touch-free entry; a guest pass is sent as a link. Each additional lane from 130,000 KGS.",
      zh: "无接触快速通行，访客通行证以链接发送。每增加一条通道 130,000 索姆起。",
      tr: "Temassız hızlı geçiş, misafir kartı bağlantıyla gönderilir. Her ek geçiş 130.000 KGS'den.",
      ar: "دخول سريع دون لمس، ويُرسل تصريح الضيف كرابط. كل ممر إضافي من 130,000 سوم.",
    },
  },
  {
    id: "smart-hotel",
    title: { ru: "Умная гостиница", en: "Smart Hotel", zh: "智能酒店", tr: "Akıllı Otel", ar: "الفندق الذكي" },
    forWhom: {
      ru: "Гостиницы, хостелы, апартаменты, общежития",
      en: "Hotels, hostels, apartments, dormitories",
      zh: "酒店、青旅、公寓、宿舍",
      tr: "Oteller, hosteller, apart daireler, yurtlar",
      ar: "الفنادق والنُزل والشقق الفندقية والمساكن",
    },
    priceKind: "from",
    price: 100000,
    total: 100000,
    lines: [
      { name: install("Умный замок на номер (карта / код / телефон)", "Smart room lock (card / code / phone)", "客房智能锁（卡/密码/手机）", "Oda akıllı kilidi (kart / kod / telefon)", "قفل ذكي للغرفة (بطاقة / رمز / هاتف)"), qty: 10, price: 7000, est: true },
      { name: install("Энкодер карт для ресепшена + 100 карт", "Reception card encoder + 100 cards", "前台发卡器 + 100 张卡", "Resepsiyon kart kodlayıcı + 100 kart", "مشفّر بطاقات للاستقبال + 100 بطاقة"), qty: 1, price: 8000, est: true },
      { name: install("Установка замков", "Lock installation", "门锁安装", "Kilit montajı", "تركيب الأقفال"), qty: 10, price: 1200, est: true },
      { name: install("ПО: ключ на срок брони, журнал открытий", "Software: key valid for the booking, opening log", "软件：按入住期发钥匙、开门日志", "Yazılım: rezervasyon süresince anahtar, açılış kaydı", "البرنامج: مفتاح لمدة الحجز وسجل الفتح"), qty: 1, price: 10000 },
    ],
    note: {
      ru: "Ключ сам «сгорает» при выезде, замки не меняют при потере карты, видно, кто открывал номер. Опции: Wi-Fi для гостей, камеры в коридорах, свет без карты выключается.",
      en: "The key expires at check-out, no lock changes when a card is lost, and you see who opened each room. Options: guest Wi-Fi, corridor cameras, power off without a card.",
      zh: "退房时钥匙自动失效，丢卡无需换锁，可查看谁开过房门。选配：访客 Wi-Fi、走廊摄像头、无卡断电节能。",
      tr: "Anahtar çıkışta kendiliğinden geçersiz olur, kart kaybolunca kilit değişmez, odayı kimin açtığı görünür. Seçenekler: misafir Wi-Fi, koridor kameraları, kartsız elektrik kesme.",
      ar: "ينتهي المفتاح تلقائيًا عند المغادرة، ولا حاجة لتغيير الأقفال عند ضياع البطاقة، وترى من فتح الغرفة. خيارات: Wi-Fi للضيوف، كاميرات الممرات، فصل الكهرباء دون بطاقة.",
    },
  },
  {
    id: "conference-sound",
    packageId: "conference-av",
    title: { ru: "Звук для конференц-зала", en: "Conference Room Sound", zh: "会议室扩声", tr: "Konferans Salonu Ses", ar: "صوت قاعة المؤتمرات" },
    forWhom: {
      ru: "Конференц-залы, переговорные, актовые залы, вузы",
      en: "Conference and meeting rooms, assembly halls, universities",
      zh: "会议厅、会议室、礼堂、高校",
      tr: "Konferans ve toplantı salonları, konferans salonları, üniversiteler",
      ar: "قاعات المؤتمرات والاجتماعات والقاعات الكبرى والجامعات",
    },
    priceKind: "from",
    price: 120000,
    total: 120000,
    lines: [
      { name: install("Микшер-усилитель с Bluetooth/USB", "Mixer amplifier with Bluetooth/USB", "带蓝牙/USB 的调音功放", "Bluetooth/USB'li mikser amfi", "مكبّر مازج مع Bluetooth/USB"), qty: 1, price: 25000, est: true },
      { name: install("Настенные/потолочные колонки", "Wall/ceiling speakers", "壁挂/吸顶音箱", "Duvar/tavan hoparlörleri", "سماعات جدارية/سقفية"), qty: 4, price: 8000, est: true },
      { name: install("Радиомикрофоны (2 ручных)", "Wireless mics (2 handheld)", "无线麦克风（2 支手持）", "Kablosuz mikrofon (2 el tipi)", "ميكروفونات لاسلكية (2 يدوية)"), qty: 1, price: 18000, est: true },
      { name: install("Конференц-микрофоны на стол", "Table conference mics", "桌面会议话筒", "Masa konferans mikrofonları", "ميكروفونات مؤتمرات مكتبية"), qty: 1, price: 30000, est: true },
      { name: install("Кабель, крепёж, монтаж, настройка", "Cable, mounts, installation, tuning", "线缆、支架、安装、调试", "Kablo, montaj, kurulum, ayar", "الكابلات والحوامل والتركيب والضبط"), qty: 1, price: 15000, est: true },
    ],
    note: {
      ru: "Последний ряд слышит докладчика без «фона» и свиста. Опции: проектор/экран, видеоконференции (Zoom), запись заседаний.",
      en: "The back row hears the speaker without hum or feedback. Options: projector/screen, video calls (Zoom), meeting recording.",
      zh: "最后一排也能听清，无底噪和啸叫。选配：投影/幕布、视频会议（Zoom）、会议录制。",
      tr: "Son sıra konuşmacıyı uğultu ve çınlama olmadan duyar. Seçenekler: projeksiyon/perde, görüntülü toplantı (Zoom), kayıt.",
      ar: "يسمع الصف الأخير المتحدث دون ضجيج أو صفير. خيارات: جهاز عرض/شاشة، مؤتمرات فيديو (Zoom)، تسجيل الاجتماعات.",
    },
  },
  {
    id: "background-music",
    packageId: "conference-av",
    title: { ru: "Фоновая музыка", en: "Background Music", zh: "背景音乐", tr: "Fon Müziği", ar: "الموسيقى الخلفية" },
    forWhom: {
      ru: "Кафе, рестораны, кофейни, магазины, фитнес",
      en: "Cafés, restaurants, coffee shops, stores, gyms",
      zh: "咖啡馆、餐厅、商店、健身房",
      tr: "Kafeler, restoranlar, kahveciler, mağazalar, spor salonları",
      ar: "المقاهي والمطاعم والمتاجر والنوادي الرياضية",
    },
    priceKind: "from",
    price: 45000,
    total: 45000,
    lines: [
      { name: install("Трансляционный усилитель с зонами", "Zoned PA amplifier", "分区广播功放", "Bölgeli anons amfisi", "مكبّر بث متعدد المناطق"), qty: 1, price: 15000, est: true },
      { name: install("Потолочные колонки", "Ceiling speakers", "吸顶音箱", "Tavan hoparlörleri", "سماعات سقفية"), qty: 6, price: 3000, est: true },
      { name: install("Кабель, монтаж, настройка", "Cable, installation, tuning", "线缆、安装、调试", "Kablo, kurulum, ayar", "الكابلات والتركيب والضبط"), qty: 1, price: 12000, est: true },
    ],
    note: {
      ru: "Музыка по зонам (зал и терраса отдельно), управление с телефона, объявления в микрофон.",
      en: "Music by zone (hall and terrace separately), phone control, microphone announcements.",
      zh: "分区播放（大厅与露台分开），手机控制，可用话筒广播。",
      tr: "Bölgelere göre müzik (salon ve teras ayrı), telefondan kontrol, mikrofonla anons.",
      ar: "موسيقى حسب المناطق (الصالة والشرفة بشكل منفصل)، تحكّم من الهاتف، إعلانات بالميكروفون.",
    },
  },
];

export const kitsFor = (id: string) => KITS.filter((k) => k.packageId === id);

/** Smaller services from the offer, each with a starting price in som */
export const EXTRA_SERVICES: { title: L; text: L; from?: number; monthly?: boolean }[] = [
  {
    title: { ru: "Видеодомофон для подъезда / ЖК", en: "Video intercom for entrances", zh: "楼宇可视对讲", tr: "Apartman görüntülü diyafon", ar: "انتركم بالفيديو للمداخل" },
    text: { ru: "Открытие двери с телефона, фото звонившего, ключи жильцам.", en: "Open the door from your phone, caller photo, keys for residents.", zh: "手机开门、来访者照片、住户钥匙。", tr: "Kapıyı telefondan açma, arayanın fotoğrafı, sakinlere anahtar.", ar: "فتح الباب من الهاتف وصورة الزائر ومفاتيح للسكان." },
    from: 35000,
  },
  {
    title: { ru: "Wi-Fi для гостей", en: "Guest Wi-Fi", zh: "访客 Wi-Fi", tr: "Misafir Wi-Fi", ar: "Wi-Fi للضيوف" },
    text: { ru: "MikroTik и точки доступа, вход по SMS или странице с рекламой заведения.", en: "MikroTik and access points, login by SMS or a branded splash page.", zh: "MikroTik 与无线 AP，短信或品牌广告页登录。", tr: "MikroTik ve erişim noktaları, SMS veya markalı sayfayla giriş.", ar: "MikroTik ونقاط وصول، الدخول عبر SMS أو صفحة إعلانية للمنشأة." },
    from: 25000,
  },
  {
    title: { ru: "Подсчёт посетителей", en: "Visitor counting", zh: "客流统计", tr: "Ziyaretçi sayımı", ar: "عدّ الزوار" },
    text: { ru: "Камера-счётчик Hikvision: сколько людей зашло, в какие часы, конверсия ТЦ и магазина.", en: "Hikvision counting camera: how many came in, at what hours, store conversion.", zh: "海康客流摄像头：进店人数、时段、转化率。", tr: "Hikvision sayım kamerası: kaç kişi, hangi saatlerde, mağaza dönüşümü.", ar: "كاميرا عدّ Hikvision: كم شخصًا دخل وفي أي ساعات ونسبة التحويل." },
    from: 63000,
  },
  {
    title: { ru: "Тревожная кнопка и охранная сигнализация", en: "Panic button and intruder alarm", zh: "紧急按钮与防盗报警", tr: "Panik butonu ve alarm", ar: "زر الطوارئ وإنذار السرقة" },
    text: { ru: "Датчики движения и открытия, сигнал сразу в Telegram.", en: "Motion and door sensors, alert straight to Telegram.", zh: "移动与门磁传感器，警报直达 Telegram。", tr: "Hareket ve açılma sensörleri, uyarı anında Telegram'a.", ar: "حساسات الحركة والفتح، والتنبيه فورًا إلى Telegram." },
    from: 20000,
  },
  {
    title: { ru: "Электронная очередь", en: "Electronic queue", zh: "电子排队", tr: "Elektronik sıra", ar: "نظام الطابور الإلكتروني" },
    text: { ru: "Талоны, табло, озвучивание — для ЦОН, клиник, банков, сервисов.", en: "Tickets, display, voice calls — for service centres, clinics, banks.", zh: "取号、显示屏、语音叫号——适用于政务中心、诊所、银行。", tr: "Bilet, ekran, sesli çağrı — hizmet merkezleri, klinikler, bankalar için.", ar: "تذاكر وشاشة ونداء صوتي — لمراكز الخدمات والعيادات والبنوك." },
    from: 40000,
  },
  {
    title: { ru: "Рекламные экраны (Digital Signage)", en: "Digital signage", zh: "数字标牌", tr: "Dijital ekranlar", ar: "الشاشات الإعلانية الرقمية" },
    text: { ru: "Меню в кафе, расписание в вузе, реклама в ТЦ — меняется удалённо.", en: "Café menus, university timetables, mall ads — updated remotely.", zh: "咖啡馆菜单、高校课表、商场广告——远程更新。", tr: "Kafe menüsü, üniversite programı, AVM reklamı — uzaktan güncellenir.", ar: "قوائم المقاهي وجداول الجامعات وإعلانات المراكز — تُحدَّث عن بُعد." },
    from: 30000,
  },
  {
    title: { ru: "Резервное питание (ИБП)", en: "Backup power (UPS)", zh: "备用电源（UPS）", tr: "Yedek güç (UPS)", ar: "طاقة احتياطية (UPS)" },
    text: { ru: "Камеры, шлагбаумы и сервер работают при отключении света.", en: "Cameras, barriers and server keep running during power cuts.", zh: "停电时摄像头、道闸和服务器照常运行。", tr: "Elektrik kesildiğinde kameralar, bariyerler ve sunucu çalışır.", ar: "تستمر الكاميرات والحواجز والخادم في العمل عند انقطاع الكهرباء." },
    from: 15000,
  },
  {
    title: { ru: "Абонентское обслуживание", en: "Maintenance plan", zh: "包年维护", tr: "Bakım aboneliği", ar: "خدمة صيانة شهرية" },
    text: { ru: "Проверка системы, чистка камер, обновления ПО, выезд при сбое в тот же день.", en: "System checks, camera cleaning, software updates, same-day visit on failure.", zh: "系统巡检、摄像头清洁、软件更新，故障当天上门。", tr: "Sistem kontrolü, kamera temizliği, yazılım güncelleme, arızada aynı gün servis.", ar: "فحص النظام وتنظيف الكاميرات وتحديث البرامج وزيارة في اليوم نفسه عند العطل." },
    from: 5000,
    monthly: true,
  },
  {
    title: { ru: "Контроль транспорта на базе", en: "Fleet yard control", zh: "车队场站管控", tr: "Araç üssü kontrolü", ar: "مراقبة المركبات في القاعدة" },
    text: { ru: "Журнал рейсов по номерам, время на территории, отчёт водителям и диспетчеру.", en: "Trip log by plate, time on site, reports for drivers and dispatch.", zh: "按车牌记录趟次、在场时长，司机与调度报表。", tr: "Plakaya göre sefer kaydı, sahada geçen süre, sürücü ve dispeçer raporu.", ar: "سجل الرحلات حسب اللوحة ومدة البقاء وتقارير للسائقين والمرسِل." },
    from: 50000,
  },
  {
    title: { ru: "Интеграция «всё в одном»", en: "All-in-one integration", zh: "一体化集成", tr: "Hepsi bir arada entegrasyon", ar: "تكامل شامل" },
    text: { ru: "Камеры, СКУД, парковка, касса и бот в одной панели — для ТЦ, рынков, вузов.", en: "Cameras, access control, parking, till and bot in one panel — for malls, markets, universities.", zh: "摄像头、门禁、停车、收银和机器人统一在一个后台——适合商场、市场、高校。", tr: "Kameralar, geçiş kontrolü, otopark, kasa ve bot tek panelde — AVM, pazar, üniversiteler için.", ar: "الكاميرات والتحكم في الدخول والموقف والصندوق والروبوت في لوحة واحدة — للمراكز والأسواق والجامعات." },
  },
];

/** camera → software → barrier → payment & receipt → Telegram */
export const SYSTEM_FLOW: L[] = [
  { ru: "Камера узнаёт машину", en: "Camera reads the plate", zh: "摄像头识别车辆", tr: "Kamera aracı tanır", ar: "الكاميرا تتعرّف على السيارة" },
  { ru: "Программа решает", en: "Software decides", zh: "软件判断", tr: "Yazılım karar verir", ar: "البرنامج يقرّر" },
  { ru: "Шлагбаум открывается", en: "Barrier opens", zh: "道闸抬起", tr: "Bariyer açılır", ar: "الحاجز يفتح" },
  { ru: "Оплата и чек", en: "Payment and receipt", zh: "付款与小票", tr: "Ödeme ve fiş", ar: "الدفع والإيصال" },
  { ru: "Уведомление в Telegram", en: "Telegram alert", zh: "Telegram 通知", tr: "Telegram bildirimi", ar: "إشعار في Telegram" },
];
