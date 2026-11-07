import type { CaseCategory } from "./cases-data";
import type { L, Language } from "./i18n-text";

// Website & product showcase: concept sites (live, self-contained demos in
// /public/demos), production sites and studio projects captured from their
// repositories. Engineering deep-dives stay in cases-data.ts — the /cases
// catalog merges both sources (see catalog.ts).
//
// Adding a work: copy an object, change the fields. Images live in
// /public/images/showcase/<slug>/. A `demo` gets a live, auto-scrolling
// iframe preview; a `fullPage` screenshot pans on hover; a `gallery` of 2+
// screens plays as a slideshow on hover.


/** live — public site in production · built — delivered project, shown from screenshots · concept — studio concept site */
export type ShowcaseStatus = "live" | "built" | "concept";

export interface ShowcaseItem {
  slug: string;
  title: L;
  client: L;
  status: ShowcaseStatus;
  category: CaseCategory;
  sphere: L;
  format: L;
  year: number;
  /** Where "Open site" leads. Omitted when the project has no public URL today. */
  url?: string;
  /** Caption in the browser-chrome address bar */
  domain: string;
  /** Same-origin page used for the live preview and the in-page viewer */
  demo?: string;
  /** External site that allows framing — shown live in the viewer on the case page */
  embed?: string;
  /** Kept in the data but not shown anywhere (broken demo, unfinished, etc.) */
  hidden?: boolean;
  /** First screen, 1600×1000 */
  cover?: string;
  /** Full-height page screenshot — panned on hover */
  fullPage?: string;
  /** Additional desktop screens (cover is prepended automatically) */
  gallery?: { src: string; alt: L }[];
  /** Phone screenshot, 390×844 */
  mobile?: string;
  /** Back-office screens, shown in their own section on the case page */
  admin?: { src: string; title: L }[];
  /** Mobile-first products: 2–3 phone screens shown as a fanned stack on the card */
  phones?: string[];
  /** CSS background of the phone stage (decor only — the project's palette stays as is) */
  stage?: string;
  /** Emoji floating around the phones, e.g. produce for a grocery app */
  decor?: string[];
  /** The case page opens with the card's animated scene (client-scenes.tsx) instead of the screenshot viewer */
  heroScene?: boolean;
  /** The signature animation — such works get a highlighted card */
  signature?: L;
  /** Key figures under the title (3–4), e.g. { value: "42", label: { … "screens" } } — counted up on the case page */
  metrics?: { value: string; label: L }[];
  summary: L;
  review: Record<Language, string[]>;
  features: { title: L; text: L }[];
  tags: Record<Language, string[]>;
  stack?: string[];
  /** Background, text, accent, second accent */
  palette: [string, string, string, string];
  fonts?: string;
}

const img = (slug: string, file: string) => `/images/showcase/${slug}/${file}`;

export const showcaseItems: ShowcaseItem[] = [
  {
    slug: "gran",
    signature: { en: "3D building assembles on scroll", ru: "3D-сборка здания по скроллу", zh: "3D 建筑随滚动组装", tr: "Kaydırdıkça 3D bina kurulur", ar: "مبنى ثلاثي الأبعاد يتركّب مع التمرير" },
    title: { en: "GRAN", ru: "ГРАНЬ", zh: "GRAN", tr: "GRAN", ar: "GRAN" },
    client: { en: "Developer of monolithic residential districts", ru: "Девелопер монолитных кварталов", zh: "整体现浇住宅街区开发商", tr: "Monolitik konut mahallelerinin geliştiricisi", ar: "مطوّر أحياء سكنية خرسانية متجانسة" },
    status: "concept",
    category: "web",
    sphere: { en: "Real estate", ru: "Девелопмент", zh: "房地产", tr: "Gayrimenkul", ar: "تطوير عقاري" },
    format: { en: "Corporate website", ru: "Корпоративный сайт", zh: "企业官网", tr: "Kurumsal web sitesi", ar: "موقع الشركة" },
    year: 2026,
    domain: "gran",
    demo: "/demos/gran/index.html",
    url: "/demos/gran/index.html",
    cover: img("gran", "cover.jpg"),
    summary: {
      en: "The whole first screen is driven by scroll: nine concrete bodies assemble into a building while the headline lines slide apart. The heroes wear a concrete texture with formwork seams — a metaphor for what the company does.",
      ru: "Ключевой эффект — первый экран, целиком завязанный на прокрутку: девять бетонных тел собираются в корпус, пока строки заголовка разъезжаются в стороны. Героям сайта назначена текстура бетона со швами опалубки — метафора того, чем занимается компания.",
      zh: "整个首屏由滚动驱动：九个混凝土体块组装成一栋建筑，同时标题的各行向两侧滑开。主角们披着带模板接缝的混凝土质感——这正是对公司业务的隐喻。",
      tr: "Tüm ilk ekran kaydırmayla yönetiliyor: başlık satırları iki yana açılırken dokuz beton gövde bir binaya dönüşüyor. Sitenin kahramanlarına kalıp derzleri olan bir beton dokusu verildi; şirketin yaptığı işin metaforu.",
      ar: "الشاشة الأولى كلها مرتبطة بالتمرير: تسعة أجسام خرسانية تتجمّع لتشكّل مبنى بينما تنزاح أسطر العنوان جانبًا. وقد أُلبس أبطال الموقع ملمس الخرسانة بخطوط قوالب الصب، وهو استعارة لما تفعله الشركة.",
    },
    review: {
      en: [
        "The site opens with material, not a photo of a house. Slabs, towers, an arch and a prism are built in CSS 3D and covered with a procedural concrete texture: formwork seams and tie holes are visible, and light is recalculated per face normal. As the visitor scrolls, the scattered bodies snap into place and form a building, while the background lightens from graphite to concrete.",
        "Instead of a progress bar there is a builder's ruler with an elevation mark. The same idea continues in the “Monolith stages” section: a building cross‑section is poured floor by floor, a tower crane rises with the mark, and the cubic‑metre counter and stage description change in sync.",
        "The palette rests on graphite and grey; the signal orange appears rarely — a button, one cube, lit windows on the project facades. The site feels heavy and coherent, and you still want to scroll to the end.",
      ],
      ru: [
        "Сайт начинается не с фотографии дома, а с материала. Плиты, башни, арка и призма собраны на CSS 3D и покрыты процедурной фактурой бетона: видны швы опалубки и отверстия от тяжей, свет пересчитывается по нормали каждой грани. Пока посетитель листает, разбросанные тела встают на места и складываются в здание, а фон светлеет от графита до бетона.",
        "Вместо привычной полосы прогресса — строительная линейка с отметкой высоты. Тот же приём продолжается в секции «Этапы монолита»: разрез здания заливается этаж за этажом, башенный кран поднимается вместе с отметкой, счётчик кубометров и описание этапа меняются синхронно.",
        "Палитра держится на графите и сером, оранжевый сигнальный цвет появляется редко: кнопка, один куб, горящие окна на фасадах объектов. Поэтому сайт ощущается тяжёлым и цельным — и при этом его хочется долистать до конца.",
      ],
      zh: ["网站从材料而不是房子的照片开始。板、塔、拱和棱柱都用 CSS 3D 构建，并覆盖程序生成的混凝土纹理：模板接缝和对拉螺栓孔清晰可见，光线按每个面的法线重新计算。随着访客滚动，散落的体块各归其位，拼合成一栋建筑，同时背景从石墨色渐变为混凝土色。", "页面没有进度条，取而代之的是带标高刻度的施工标尺。同样的思路延续到“整体现浇施工阶段”板块：建筑剖面逐层浇筑，塔吊随刻度升高，立方米计数器和阶段说明同步变化。", "配色以石墨色和灰色为基调，信号橙色很少出现——一个按钮、一个立方体、项目立面上亮起的窗户。网站给人厚重而统一的感觉，让人依然想一路滚动到底。"],
      tr: ["Site, bir ev fotoğrafıyla değil malzemeyle açılıyor. Döşemeler, kuleler, bir kemer ve bir prizma CSS 3D ile kuruldu ve prosedürel bir beton dokusuyla kaplandı: kalıp derzleri ve bağlantı delikleri görünüyor, ışık her yüzün normaline göre yeniden hesaplanıyor. Ziyaretçi kaydırdıkça dağınık gövdeler yerine oturup bir bina oluşturuyor, arka plan ise grafitten betona doğru açılıyor.", "İlerleme çubuğu yerine yükseklik işaretli bir inşaat cetveli var. Aynı fikir “Monolit aşamaları” bölümünde sürüyor: bina kesiti kat kat dökülüyor, kule vinç işaretle birlikte yükseliyor, metreküp sayacı ve aşama açıklaması eş zamanlı değişiyor.", "Palet grafit ve griye dayanıyor; sinyal turuncusu nadiren beliriyor: bir düğme, tek bir küp, proje cephelerindeki yanan pencereler. Site ağır ve bütünlüklü hissettiriyor, yine de sonuna kadar kaydırmak istiyorsunuz."],
      ar: ["لا يبدأ الموقع بصورة بيت، بل بالمادة نفسها. ألواح وأبراج وقوس ومنشور مبنية بتقنية CSS 3D ومكسوّة بملمس خرساني مولَّد برمجيًا: تظهر خطوط قوالب الصب وفتحات الشدّ، وتُعاد حسابات الإضاءة وفق اتجاه كل وجه. ومع تمرير الزائر تستقر الأجسام المتناثرة في أماكنها وتشكّل مبنى، بينما تصبح الخلفية أفتح تدريجيًا من لون الغرافيت إلى لون الخرسانة.", "بدلًا من شريط التقدّم هناك مسطرة بنّاء بعلامة ارتفاع. وتستمر الفكرة ذاتها في قسم «مراحل الخرسانة المصبوبة»: يُصبّ مقطع المبنى طابقًا بعد طابق، ويرتفع الرافع البرجي مع العلامة، ويتغير عدّاد الأمتار المكعبة ووصف المرحلة بتزامن تام.", "تقوم لوحة الألوان على الغرافيت والرمادي، ويظهر البرتقالي التحذيري نادرًا: زر، ومكعب واحد، ونوافذ مضاءة في واجهات المشاريع. فيبدو الموقع ثقيلًا ومتماسكًا، ومع ذلك يشدّك التمرير حتى النهاية."],
    },
    features: [
      { title: { en: "Building assembled by scroll", ru: "Сборка корпуса по скроллу", zh: "随滚动组装的建筑", tr: "Kaydırmayla kurulan bina", ar: "مبنى يتركّب بالتمرير" }, text: { en: "Nine 3D bodies with a concrete texture form a building; the background shifts from graphite to light concrete.", ru: "Девять 3D-тел с фактурой бетона складываются в здание, фон переходит из графита в светлый бетон.", zh: "九个带混凝土质感的 3D 体块组合成一栋建筑，背景从石墨色渐变为浅色混凝土。", tr: "Beton dokulu dokuz 3D gövde bir bina oluşturuyor; arka plan grafitten açık betona geçiyor.", ar: "تسعة أجسام ثلاثية الأبعاد بملمس خرساني تشكّل مبنى، وتنتقل الخلفية من الغرافيت إلى الخرسانة الفاتحة." } },
      { title: { en: "Monolith stages", ru: "Этапы монолита", zh: "整体现浇施工阶段", tr: "Monolit aşamaları", ar: "مراحل الخرسانة المصبوبة" }, text: { en: "A pinned cross‑section is poured floor by floor; the crane and counters move with the scroll.", ru: "Закреплённый разрез заливается поэтажно, кран и счётчики идут вместе с прокруткой.", zh: "固定的剖面图逐层浇筑，塔吊和计数器随滚动同步移动。", tr: "Sabitlenmiş bir kesit kat kat dökülüyor; vinç ve sayaçlar kaydırmayla birlikte hareket ediyor.", ar: "مقطع مثبّت يُصبّ طابقًا بعد طابق، وتتحرك الرافعة والعدّادات مع التمرير." } },
      { title: { en: "A ruler instead of a progress bar", ru: "Линейка вместо прогресс-бара", zh: "用标尺代替进度条", tr: "İlerleme çubuğu yerine cetvel", ar: "مسطرة بدلًا من شريط التقدّم" }, text: { en: "Page position is shown as an elevation mark on a builder's staff.", ru: "Положение на странице показано как отметка высоты на строительной рейке.", zh: "页面位置以建筑标尺上的标高刻度来呈现。", tr: "Sayfadaki konum, inşaat cetvelinde bir kot işareti olarak gösteriliyor.", ar: "يظهر موضع الصفحة كعلامة ارتفاع على قائمة قياس البنّائين." } },
    ],
    tags: { en: ["CSS 3D", "Scroll scene", "Procedural textures"], ru: ["CSS 3D", "Скролл-сцена", "Процедурные текстуры"], zh: ["CSS 3D", "滚动场景", "程序化纹理"], tr: ["CSS 3D", "Kaydırma sahnesi", "Prosedürel dokular"], ar: ["CSS 3D", "مشهد التمرير", "ملمس مولَّد برمجيًا"] },
    palette: ["#121314", "#ECEAE4", "#FF5A1F", "#CBC9C3"],
    fonts: "Unbounded · Golos Text",
  },
  {
    slug: "paddock",
    title: { en: "Paddock Rent a Car", ru: "Paddock Rent a Car", zh: "Paddock Rent a Car", tr: "Paddock Rent a Car", ar: "Paddock Rent a Car" },
    client: { en: "Premium car rental in Dubai", ru: "Прокат премиальных автомобилей в Дубае", zh: "迪拜高端租车", tr: "Dubai'de premium araç kiralama", ar: "تأجير السيارات الفاخرة في دبي" },
    status: "live",
    category: "web",
    sphere: { en: "Car rental", ru: "Прокат авто", zh: "租车", tr: "Araç kiralama", ar: "تأجير سيارات" },
    format: { en: "Catalog with booking", ru: "Каталог с бронированием", zh: "支持预订的车型目录", tr: "Rezervasyonlu katalog", ar: "كتالوج مع الحجز" },
    year: 2025,
    url: "https://paddockrentacar.com",
    embed: "https://paddockrentacar.com",
    domain: "paddockrentacar.com",
    cover: img("paddock", "cover.jpg"),
    fullPage: img("paddock", "full.jpg"),
    summary: {
      en: "A rental storefront where the car is the hero of every screen. The catalog filters by body type, brand and district, prices are shown per day, week and month, and booking is one tap away in WhatsApp.",
      ru: "Витрина проката, где машина — главный герой каждого экрана. Каталог фильтруется по типу, марке и району, цена сразу показана за день, неделю и месяц, а до брони — одно касание в WhatsApp.",
      zh: "一个以车为主角的租车展示页，每一屏都是车。目录可按车身类型、品牌和区域筛选，日租、周租、月租价格一目了然，预订只需在 WhatsApp 中轻点一下。",
      tr: "Her ekranın kahramanının araba olduğu bir kiralama vitrini. Katalog kasa tipine, markaya ve bölgeye göre filtreleniyor, fiyatlar günlük, haftalık ve aylık gösteriliyor, rezervasyon ise WhatsApp'ta tek dokunuş uzakta.",
      ar: "واجهة تأجير تكون فيها السيارة بطلة كل شاشة. يمكن تصفية الكتالوج حسب نوع الهيكل والعلامة والمنطقة، وتُعرض الأسعار لليوم والأسبوع والشهر، والحجز على بُعد لمسة واحدة عبر WhatsApp.",
    },
    review: {
      en: [
        "The first screen works like a presentation: a background video, a short headline and a “find a car” button. From there the site walks through classes — supercars, luxury, SUVs, convertibles, budget — and the cards in every collection are built the same way, so comparing is easy.",
        "A card answers questions before they are asked: model year, seats, engine and three rates in dirhams. Filtering by district and emirate removes the tourist's main question — where will the car be delivered.",
        "Trust is built from facts, not adjectives: ratings on Google, Tripadvisor and Yandex, customer photos, and a detailed block on driver requirements, mileage and insurance.",
      ],
      ru: [
        "Первый экран работает как презентация: фоновое видео, короткий заголовок и кнопка подбора автомобиля. Дальше сайт ведёт по классам — суперкары, люкс, внедорожники, кабриолеты, бюджетные модели — и в каждой подборке карточки устроены одинаково, поэтому сравнивать легко.",
        "Карточка отвечает на вопросы до того, как их задали: год выпуска, число мест, двигатель и три тарифа в дирхамах. Фильтр по району и эмирату снимает главный вопрос туриста — куда подадут машину.",
        "Доверие собрано из фактов, а не из прилагательных: оценки на Google, Tripadvisor и Яндексе, фотографии клиентов, подробный блок с требованиями к водителю, пробегом и страховкой.",
      ],
      zh: ["首屏就像一场演示：背景视频、简短的标题和一个“找车”按钮。之后网站按车型类别依次展开——超跑、豪华车、SUV、敞篷车、经济型——每个合集中的卡片结构完全一致，对比起来很轻松。", "卡片会在问题被问出之前就给出答案：出厂年份、座位数、发动机，以及三档迪拉姆价格。按区域和酋长国筛选，解决了游客最关心的问题——车会送到哪里。", "信任建立在事实而非形容词之上：Google、Tripadvisor 和 Yandex 上的评分、客户照片，以及关于驾驶员要求、里程和保险的详细说明。"],
      tr: ["İlk ekran bir sunum gibi çalışıyor: arka plan videosu, kısa bir başlık ve “araç bul” düğmesi. Sonrasında site sınıflar arasında geziniyor (süper otomobiller, lüks, SUV'lar, üstü açıklar, ekonomik modeller) ve her koleksiyondaki kartlar aynı şekilde kurulduğu için karşılaştırma kolay.", "Kart, sorular sorulmadan önce yanıt veriyor: model yılı, koltuk sayısı, motor ve dirhem cinsinden üç tarife. Bölge ve emirliğe göre filtreleme, turistin asıl sorusunu ortadan kaldırıyor: araç nereye teslim edilecek.", "Güven sıfatlarla değil gerçeklerle kuruluyor: Google, Tripadvisor ve Yandex puanları, müşteri fotoğrafları ve sürücü koşulları, kilometre ve sigorta hakkında ayrıntılı bir blok."],
      ar: ["تعمل الشاشة الأولى كعرض تقديمي: فيديو في الخلفية، وعنوان قصير، وزر «ابحث عن سيارة». ومن هناك يستعرض الموقع الفئات: سيارات خارقة، وفاخرة، ودفع رباعي، ومكشوفة، واقتصادية، وتُبنى البطاقات في كل مجموعة بالطريقة نفسها لتسهيل المقارنة.", "تجيب البطاقة عن الأسئلة قبل أن تُطرح: سنة الصنع، وعدد المقاعد، والمحرك، وثلاث تعرفات بالدرهم. ويزيل الفلتر حسب المنطقة والإمارة السؤال الرئيسي للسائح: أين ستُسلَّم السيارة.", "تُبنى الثقة على الوقائع لا على الصفات: تقييمات على Google وTripadvisor وYandex، وصور العملاء، وقسم مفصّل عن اشتراطات السائق والمسافة المقطوعة والتأمين."],
    },
    features: [
      { title: { en: "Catalog with three filters", ru: "Каталог с тремя фильтрами", zh: "三重筛选的车型目录", tr: "Üç filtreli katalog", ar: "كتالوج بثلاثة فلاتر" }, text: { en: "Body type, brand and delivery location — picking a car takes seconds.", ru: "Тип кузова, марка и локация подачи — подбор занимает несколько секунд.", zh: "按车身类型、品牌和取车地点筛选——几秒钟就能选好车。", tr: "Kasa tipi, marka ve teslimat noktası: araç seçmek birkaç saniye sürüyor.", ar: "نوع الهيكل والعلامة وموقع التسليم، واختيار السيارة يستغرق ثوانٍ." } },
      { title: { en: "Price without a call", ru: "Цена без звонка", zh: "价格无需打电话问", tr: "Arama yapmadan fiyat", ar: "السعر دون اتصال" }, text: { en: "Daily, weekly and monthly rates are visible right on the car card.", ru: "Тарифы за день, неделю и месяц видны прямо в карточке автомобиля.", zh: "日租、周租和月租价格直接显示在车辆卡片上。", tr: "Günlük, haftalık ve aylık tarifeler doğrudan araç kartında görünüyor.", ar: "التعرفات اليومية والأسبوعية والشهرية ظاهرة مباشرة على بطاقة السيارة." } },
      { title: { en: "Booking in a messenger", ru: "Бронь в мессенджере", zh: "在即时通讯中预订", tr: "Mesajlaşma uygulamasında rezervasyon", ar: "الحجز عبر تطبيق مراسلة" }, text: { en: "WhatsApp and phone are reachable from any screen, support in English and Russian.", ru: "WhatsApp и телефон доступны с любого экрана, поддержка на английском и русском.", zh: "任何界面都能一键联系 WhatsApp 和电话，提供英语和俄语支持。", tr: "WhatsApp ve telefon her ekrandan erişilebilir, destek İngilizce ve Rusça.", ar: "WhatsApp والهاتف متاحان من أي شاشة، مع دعم بالإنجليزية والروسية." } },
    ],
    tags: { en: ["Catalog", "Filters", "Multi-currency"], ru: ["Каталог", "Фильтры", "Мультивалютность"], zh: ["车型目录", "筛选", "多币种"], tr: ["Katalog", "Filtreler", "Çoklu para birimi"], ar: ["الكتالوج", "الفلاتر", "تعدد العملات"] },
    palette: ["#0B0B0C", "#F4F1EA", "#E4252A", "#8C8A84"],
  },
  {
    slug: "akmou",
    title: { en: "AKMOU", ru: "AKMOU", zh: "AKMOU", tr: "AKMOU", ar: "AKMOU" },
    client: { en: "A garment factory in Bishkek producing for European labels", ru: "Швейная фабрика в Бишкеке, которая шьёт для европейских марок", zh: "比什凯克一家为欧洲品牌代工的服装工厂", tr: "Avrupa markaları için üretim yapan Bişkek'teki bir hazır giyim fabrikası", ar: "مصنع ملابس في بيشكيك ينتج لعلامات أزياء أوروبية" },
    status: "live",
    category: "web",
    sphere: { en: "Fashion manufacturing", ru: "Fashion-производство", zh: "服装制造", tr: "Moda üretimi", ar: "تصنيع الأزياء" },
    format: { en: "B2B showcase with a catalog, buyer accounts and an admin panel", ru: "B2B-витрина с каталогом, кабинетом байера и админкой", zh: "带产品目录、买家账户和管理后台的 B2B 展示网站", tr: "Katalog, alıcı hesabı ve yönetim paneli olan B2B vitrin sitesi", ar: "واجهة B2B مع كتالوج وحسابات للمشترين ولوحة إدارة" },
    year: 2026,
    url: "https://www.akmou.com",
    domain: "akmou.com",
    cover: "/images/showcase/akmou/cover.jpg",
    heroScene: true,
    admin: [
      { src: "/images/showcase/akmou/admin-1.jpg", title: { en: "Model editor: photos and texts in four languages", ru: "Карточка модели: фото и тексты на четырёх языках", zh: "款式编辑：照片与四种语言的文案", tr: "Model düzenleyici: fotoğraflar ve dört dilde metinler", ar: "محرّر الموديل: الصور والنصوص بأربع لغات" } },
      { src: "/images/showcase/akmou/admin-2.jpg", title: { en: "Media library: photos, video and PDF", ru: "Медиатека: фото, видео и PDF", zh: "媒体库：照片、视频和 PDF", tr: "Medya kütüphanesi: fotoğraf, video ve PDF", ar: "مكتبة الوسائط: صور وفيديو وPDF" } },
    ],
    signature: { en: "Photos pull into focus", ru: "Кадры наводятся на резкость", zh: "画面随滚动对焦", tr: "Kareler kaydırınca netleşiyor", ar: "الصور تتّضح مع التمرير" },
    metrics: [
      { value: "4", label: { en: "content languages in every field", ru: "языка контента в каждом поле", zh: "种内容语言，覆盖每个字段", tr: "her alanda içerik dili", ar: "لغات للمحتوى في كل حقل" } },
      { value: "10", label: { en: "home-page block types", ru: "типов блоков на главной", zh: "种首页区块类型", tr: "ana sayfa blok türü", ar: "أنواع لأقسام الصفحة الرئيسية" } },
      { value: "683", label: { en: "studio shots sorted for the catalog", ru: "студийных снимка разобрано для каталога", zh: "张棚拍照片为目录筛选", tr: "katalog için ayıklanan stüdyo çekimi", ar: "صورة استوديو فُرزت للكتالوج" } },
      { value: "11", label: { en: "admin panel sections", ru: "разделов в админке", zh: "个后台模块", tr: "yönetim paneli bölümü", ar: "قسمًا في لوحة الإدارة" } },
    ],
    summary: {
      en: "A B2B showcase for the AKMOU garment factory aimed at European labels: the factory's own shoot and film on the home page, a WhiteLabel catalog with a request button on every model, and an admin panel where all content is kept in four languages.",
      ru: "B2B-витрина швейной фабрики AKMOU для европейских марок: съёмка и фильм фабрики на главной, каталог WhiteLabel с запросом на каждой модели и админка, где весь контент ведётся на четырёх языках.",
      zh: "为 AKMOU 服装工厂打造、面向欧洲品牌的 B2B 展示网站：首页是工厂自己的拍摄与影片，WhiteLabel 目录中每款都可直接询价，所有内容在后台以四种语言维护。",
      tr: "AKMOU hazır giyim fabrikası için Avrupa markalarına yönelik bir B2B vitrin: ana sayfada fabrikanın kendi çekimi ve filmi, her modelde talep düğmesi olan WhiteLabel kataloğu ve tüm içeriğin dört dilde yönetildiği bir yönetim paneli.",
      ar: "واجهة B2B لمصنع الملابس AKMOU موجّهة إلى العلامات الأوروبية: تصوير المصنع وفيلمه في الصفحة الرئيسية، وكتالوج WhiteLabel مع زر طلب لكل موديل، ولوحة إدارة يُدار فيها كل المحتوى بأربع لغات.",
    },
    review: {
      en: [
        "A white page and small Montserrat capitals — colour comes only from photos and video. The client's vertical film became a first screen of three clips side by side, each slowed to half speed and looped forward and back so there is no seam. Frames pull out of a blur as they scroll in, and under the pointer neighbouring shots drift out of focus.",
        "Next.js 15, Prisma and PostgreSQL. Every text is stored in EN, RU, DE and PL at once, the home page is assembled from ten block types, and a European buyer requests a model with one button — the inquiry lands in the admin panel tagged with that model.",
      ],
      ru: [
        "Белая страница и мелкий капс Montserrat — цвет дают только фото и видео. Вертикальный фильм клиента стал первым экраном из трёх роликов рядом: каждый замедлен вдвое и закольцован вперёд-назад, поэтому склейки не видно. Кадры проявляются из размытия при прокрутке, а под курсором соседние снимки уходят из фокуса.",
        "Next.js 15, Prisma и PostgreSQL. Каждый текст хранится сразу на EN, RU, DE и PL, главная собирается из десяти типов блоков, а байер из Европы запрашивает модель одной кнопкой — заявка приходит в админку с пометкой модели.",
      ],
      zh: [
        "白色页面、小号 Montserrat 大写字母——色彩只来自照片和视频。客户竖拍的影片变成了由三段并排短片组成的首屏，每段都放慢至半速并正放倒放循环，看不出衔接。图片在滚动进入时由模糊变清晰，鼠标悬停时相邻照片会虚化。",
        "技术栈为 Next.js 15、Prisma 和 PostgreSQL。每段文字同时以 EN、RU、DE、PL 存储，首页由十种区块拼装而成，欧洲买家一键即可询问某款服装——询价会带着款式标记进入管理后台。",
      ],
      tr: [
        "Beyaz bir sayfa ve küçük Montserrat büyük harfleri — renk yalnızca fotoğraf ve videodan geliyor. Müşterinin dikey filmi yan yana üç klipten oluşan bir ilk ekrana dönüştü; her biri yarı hıza düşürüldü ve ileri-geri döngüye alındı, ek yeri görünmüyor. Kareler kaydırdıkça bulanıklıktan netleşiyor, imlecin altında ise komşu kareler flulaşıyor.",
        "Next.js 15, Prisma ve PostgreSQL. Her metin aynı anda EN, RU, DE ve PL olarak saklanıyor, ana sayfa on blok türünden kuruluyor ve Avrupalı alıcı bir modeli tek düğmeyle talep ediyor — talep, modelle işaretlenmiş olarak yönetim paneline düşüyor.",
      ],
      ar: [
        "صفحة بيضاء وأحرف Montserrat كبيرة بحجم صغير، واللون يأتي من الصور والفيديو وحدهما. تحوّل فيلم العميل العمودي إلى شاشة أولى من ثلاثة مقاطع متجاورة، كل منها مُبطّأ إلى نصف السرعة ويدور ذهابًا وإيابًا فلا يظهر موضع الوصل. تخرج الصور من الضبابية عند التمرير، وتحت المؤشر تفقد الصور المجاورة حدّتها.",
        "Next.js 15 وPrisma وPostgreSQL. يُخزَّن كل نص بـ EN وRU وDE وPL دفعة واحدة، وتُركَّب الصفحة الرئيسية من عشرة أنواع من الأقسام، ويطلب المشتري الأوروبي الموديل بزر واحد فيصل الطلب إلى لوحة الإدارة موسومًا بالموديل.",
      ],
    },
    features: [
      { title: { en: "Home page from ten block types", ru: "Главная из десяти типов блоков", zh: "由十种区块组成的首页", tr: "On blok türünden ana sayfa", ar: "صفحة رئيسية من عشرة أنواع من الأقسام" }, text: { en: "Two-frame cover, chessboard, photo with text, triptych, wide frame, featured models, line sheet, social and more. The client changes media, order and visibility with arrows in the admin panel.", ru: "Обложка из двух кадров, шахматка, фото с текстом, триптих, широкий кадр, избранные модели, линшит, соцсети и другие. Клиент меняет медиа, порядок и видимость блоков стрелками в админке.", zh: "双画面封面、棋盘格、图文、三联画、通栏大图、精选款式、产品线手册、社交媒体等。客户在后台用箭头调整区块的媒体、顺序和显示状态。", tr: "İki kareli kapak, dama tahtası, metinli fotoğraf, triptik, geniş kare, öne çıkan modeller, line sheet, sosyal medya ve diğerleri. Müşteri medyayı, sırayı ve görünürlüğü yönetim panelinde oklarla değiştiriyor.", ar: "غلاف بلقطتين، ورقعة شطرنج، وصورة مع نص، وثلاثية، ولقطة عريضة، وموديلات مختارة، وline sheet، ووسائل التواصل وغيرها. يغيّر العميل الوسائط والترتيب والظهور بالأسهم في لوحة الإدارة." } },
      { title: { en: "Four languages in every field", ru: "Четыре языка в каждом поле", zh: "每个字段四种语言", tr: "Her alanda dört dil", ar: "أربع لغات في كل حقل" }, text: { en: "EN, RU, DE and PL live in one database row, a missing translation falls back to English, and the admin panel marks an empty language with a dot. The site interface has 163 strings in each language.", ru: "EN, RU, DE и PL хранятся в одной строке базы, недостающий перевод подменяется английским, а в админке пустой язык отмечен точкой. Интерфейс сайта — 163 строки на каждом языке.", zh: "EN、RU、DE 和 PL 存于数据库的同一行，缺失的译文自动回退为英文，后台以圆点标出未填写的语言。网站界面每种语言各有 163 条文案。", tr: "EN, RU, DE ve PL aynı veritabanı satırında duruyor, eksik çevirinin yerine İngilizcesi gösteriliyor, yönetim panelinde boş dil bir noktayla işaretleniyor. Site arayüzünde her dilde 163 metin var.", ar: "تُحفَظ EN وRU وDE وPL في سجل واحد من قاعدة البيانات، وتحلّ الإنجليزية محل الترجمة الناقصة، وتُعلّم لوحة الإدارة اللغة الفارغة بنقطة. وتضم واجهة الموقع 163 نصًا بكل لغة." } },
      { title: { en: "Buyer account", ru: "Кабинет байера", zh: "买家账户", tr: "Alıcı hesabı", ar: "حساب المشتري" }, text: { en: "Sign-up with admin approval, orders with statuses, history and documents, and GDPR export and deletion requests that the admin carries out from the panel.", ru: "Регистрация с одобрением админом, заказы со статусами, историей и документами, запросы на выгрузку и удаление данных по GDPR, которые админ исполняет из панели.", zh: "注册需经管理员审核，订单带有状态、历史记录和文件，GDPR 数据导出与删除请求由管理员在后台执行。", tr: "Yönetici onaylı kayıt; durum, geçmiş ve belgelerle siparişler; yöneticinin panelden yerine getirdiği GDPR veri dışa aktarma ve silme talepleri.", ar: "تسجيل بموافقة المدير، وطلبات بحالاتها وسجلّها ومستنداتها، وطلبات تصدير البيانات وحذفها وفق GDPR ينفّذها المدير من اللوحة." } },
    ],
    tags: { en: ["Next.js 15", "Prisma", "PostgreSQL"], ru: ["Next.js 15", "Prisma", "PostgreSQL"], zh: ["Next.js 15", "Prisma", "PostgreSQL"], tr: ["Next.js 15", "Prisma", "PostgreSQL"], ar: ["Next.js 15", "Prisma", "PostgreSQL"] },
    stack: ["Next.js 15", "Prisma", "PostgreSQL", "next-intl", "React 19", "TypeScript", "Tailwind CSS 4", "Vercel Blob", "sharp", "Zod", "jose (JWT)"],
    palette: ["#FFFFFF", "#0A0A0A", "#A98A66", "#5A1A20"],
    fonts: "Montserrat",
  },
  {
    slug: "lumo",
    signature: { en: "The phone assembles the UI", ru: "Телефон собирает интерфейс", zh: "手机自己拼出界面", tr: "Arayüzü telefon kuruyor", ar: "الهاتف يركّب الواجهة" },
    title: { en: "Lumo", ru: "Lumo", zh: "Lumo", tr: "Lumo", ar: "Lumo" },
    client: { en: "Fintech wallet for freelancers and small teams", ru: "Финтех-кошелёк для фрилансеров и небольших команд", zh: "面向自由职业者和小团队的金融科技钱包", tr: "Serbest çalışanlar ve küçük ekipler için fintech cüzdanı", ar: "محفظة تقنية مالية للمستقلين والفرق الصغيرة" },
    status: "concept",
    category: "web",
    sphere: { en: "Fintech", ru: "Финтех", zh: "金融科技", tr: "Fintech", ar: "التقنية المالية" },
    format: { en: "Product landing page", ru: "Продуктовый лендинг", zh: "产品落地页", tr: "Ürün açılış sayfası", ar: "صفحة هبوط للمنتج" },
    year: 2026,
    domain: "lumo",
    demo: "/demos/lumo/index.html",
    url: "/demos/lumo/index.html",
    cover: img("lumo", "cover.jpg"),
    summary: {
      en: "The app literally assembles in front of you: the phone turns towards the viewer and floating interface cards drop into their slots on the screen. Not a single image — the whole UI is built in code and works.",
      ru: "Приложение буквально собирается на глазах: телефон разворачивается к зрителю, а летающие карточки интерфейса встают в свои слоты на экране. Ни одной картинки — весь интерфейс свёрстан кодом и работает.",
      zh: "应用就在眼前真正“组装”起来：手机转向观众，悬浮的界面卡片落入屏幕上各自的位置。没有一张图片——整个 UI 都由代码构建，而且真实可用。",
      tr: "Uygulama tam anlamıyla gözünüzün önünde kuruluyor: telefon izleyiciye dönüyor, süzülen arayüz kartları ekrandaki yerlerine düşüyor. Tek bir görsel yok; arayüzün tamamı kodla kuruldu ve çalışıyor.",
      ar: "يتركّب التطبيق حرفيًا أمام عينيك: يدور الهاتف نحو المشاهد وتسقط بطاقات الواجهة العائمة في أماكنها على الشاشة. لا صورة واحدة، فالواجهة كلها مبنية بالشيفرة وتعمل فعليًا.",
    },
    review: {
      en: [
        "The first screen is a pinned scene with a phone in perspective. On scroll it rotates, the account, invoice and notification cards fly inside, the screen pages through “Accounts → Invoice → Card”, and the headline changes word by word.",
        "The feature grid is a bento, and every tile is a small working product: the converter calculates at demo rates, an invoice gets a “Paid” stamp with a thud, the card frosts over when frozen.",
        "A light base, lime and violet accents, and one dark security section with rotating rings and a lock that clicks shut. Pricing toggles between monthly and yearly with numbers recalculated on the fly.",
      ],
      ru: [
        "Первый экран — закреплённая сцена с телефоном в перспективе. При прокрутке он поворачивается, карточки счёта, инвойса и уведомления влетают внутрь, экран листается «Счета → Инвойс → Карта», а заголовок меняется слово за словом.",
        "Сетка возможностей собрана как бенто, и каждая плитка — маленький работающий продукт: конвертер считает по демо-курсам, на инвойс со стуком ставится штамп «Оплачен», карта покрывается инеем, когда её замораживают.",
        "Светлая база, лайм и фиолетовый в акцентах, одна тёмная секция про безопасность с вращающимися кольцами и защёлкивающимся замком. Тарифы переключаются между месяцем и годом с пересчётом цифр на лету.",
      ],
      zh: ["首屏是一个固定的场景，里面是透视角度的手机。滚动时手机旋转，账户、发票和通知卡片飞入屏幕，屏幕依次翻过“账户 → 发票 → 银行卡”，标题则逐词变化。", "功能网格采用便当式布局，每个格子都是一个可运行的小产品：换算器按演示汇率计算，发票会“砰”地盖上“已支付”印章，冻结银行卡时卡面会结霜。", "浅色基底，青柠绿与紫罗兰点缀，另有一个深色的安全板块，带旋转光环和咔嗒锁上的锁。定价可在月付和年付之间切换，数字即时重新计算。"],
      tr: ["İlk ekran, perspektifte bir telefon bulunan sabitlenmiş bir sahne. Kaydırdıkça telefon dönüyor, hesap, fatura ve bildirim kartları içeri uçuyor, ekran “Hesaplar → Fatura → Kart” sayfalarını çeviriyor, başlık kelime kelime değişiyor.", "Özellik ızgarası bir bento ve her kutucuk küçük çalışan bir ürün: dönüştürücü demo kurlarla hesaplıyor, faturaya gümbürtüyle “Ödendi” damgası vuruluyor, kart dondurulunca buzlanıyor.", "Açık bir zemin, lime ve mor vurgular ve dönen halkalarla, tık diye kapanan bir kilit içeren tek koyu güvenlik bölümü. Fiyatlandırma aylık ve yıllık arasında geçiş yapıyor, rakamlar anında yeniden hesaplanıyor."],
      ar: ["الشاشة الأولى مشهد مثبّت يضم هاتفًا بمنظور ثلاثي الأبعاد. وعند التمرير يدور الهاتف، وتطير بطاقات الحساب والفاتورة والإشعار إلى الداخل، وتتنقل الشاشة عبر «الحسابات ← الفاتورة ← البطاقة»، ويتغير العنوان كلمةً كلمة.", "شبكة الميزات على طراز البينتو، وكل بلاطة منتج صغير يعمل: المحوّل يحسب بأسعار تجريبية، والفاتورة تُختم بعبارة «مدفوعة» بصوت ارتطام، والبطاقة يغطيها الصقيع عند تجميدها.", "قاعدة فاتحة بلمسات من الليموني والبنفسجي، وقسم واحد داكن للأمان بحلقات دوّارة وقفل ينغلق بنقرة. وتبدّل الأسعار بين الشهري والسنوي مع إعادة حساب الأرقام فورًا."],
    },
    features: [
      { title: { en: "The phone assembles the UI", ru: "Телефон собирает интерфейс", zh: "手机自己拼出界面", tr: "Arayüzü telefon kuruyor", ar: "الهاتف يركّب الواجهة" }, text: { en: "Cards fly into the screen and become part of the app as you scroll.", ru: "Карточки влетают в экран и становятся частью приложения по мере прокрутки.", zh: "卡片飞入屏幕，随滚动成为应用的一部分。", tr: "Kartlar ekrana uçuyor ve kaydırdıkça uygulamanın parçası oluyor.", ar: "تطير البطاقات إلى الشاشة وتصبح جزءًا من التطبيق مع التمرير." } },
      { title: { en: "Live bento", ru: "Живое бенто", zh: "可交互的便当格", tr: "Canlı bento", ar: "بينتو حيّ" }, text: { en: "Converter, invoice stamp, card freeze — everything is clickable.", ru: "Конвертер, штамп на инвойсе, заморозка карты — всё можно нажать.", zh: "换算器、发票印章、冻结银行卡——所有元素都可以点击。", tr: "Dönüştürücü, fatura damgası, kart dondurma: her şeye tıklanabiliyor.", ar: "المحوّل، وختم الفاتورة، وتجميد البطاقة، وكل شيء قابل للنقر." } },
      { title: { en: "Card with a glare", ru: "Карта с бликом", zh: "带反光的银行卡", tr: "Yansımalı kart", ar: "بطاقة بوميض لامع" }, text: { en: "The 3D card tilts towards the cursor, a highlight glides across the surface.", ru: "3D-карта наклоняется за курсором, блик движется по поверхности.", zh: "3D 银行卡随光标倾斜，高光在表面上滑过。", tr: "3D kart imlece doğru eğiliyor, yüzeyde bir parıltı kayıyor.", ar: "تميل البطاقة ثلاثية الأبعاد نحو المؤشر، وينساب لمعان على سطحها." } },
    ],
    tags: { en: ["Product landing", "UI in code", "3D scene"], ru: ["Продуктовый лендинг", "UI в коде", "3D-сцена"], zh: ["产品落地页", "代码构建的 UI", "3D 场景"], tr: ["Ürün açılış sayfası", "Kodla UI", "3D sahne"], ar: ["صفحة هبوط للمنتج", "واجهة بالشيفرة", "مشهد ثلاثي الأبعاد"] },
    palette: ["#FAFAF7", "#0D0D10", "#C8FF3D", "#6B4DFF"],
    fonts: "Onest · JetBrains Mono",
  },
  {
    slug: "ferro",
    title: { en: "Ferro Nord", ru: "Ферро Норд", zh: "Ferro Nord", tr: "Ferro Nord", ar: "Ferro Nord" },
    client: { en: "Steel plant: rolled products, pipes, special alloys", ru: "Металлургический завод: прокат, трубы, спецсплавы", zh: "钢铁厂：轧材、管材、特种合金", tr: "Çelik fabrikası: haddelenmiş ürünler, borular, özel alaşımlar", ar: "مصنع صلب: منتجات مدرفلة وأنابيب وسبائك خاصة" },
    status: "concept",
    category: "web",
    sphere: { en: "Metallurgy", ru: "Металлургия", zh: "冶金", tr: "Metalurji", ar: "التعدين والصلب" },
    format: { en: "Corporate website", ru: "Корпоративный сайт", zh: "企业官网", tr: "Kurumsal web sitesi", ar: "موقع الشركة" },
    year: 2026,
    domain: "ferro nord",
    demo: "/demos/ferro/index.html",
    url: "/demos/ferro/index.html",
    cover: img("ferro", "cover.jpg"),
    summary: {
      en: "All content obeys four columns with the weight on the right half. The first screen is presentational: a large headline, a brand mark made of rolled‑steel sections and a restrained intro — a simple move that adds authority.",
      ru: "Всё содержимое подчинено четырём колонкам с акцентом на правой половине. Первый экран презентационный: большой заголовок, фирменный знак из сечений проката и сдержанное интро — простой приём, который усиливает авторитет.",
      zh: "所有内容都遵循四列网格，重心落在右半边。首屏很有展示感：大标题、由轧钢型材截面构成的品牌标志，以及克制的引言——一个简单的手法，却增添了权威感。",
      tr: "Tüm içerik, ağırlığı sağ yarıda olan dört sütuna bağlı. İlk ekran sunum havasında: büyük bir başlık, haddelenmiş çelik kesitlerinden oluşan bir marka işareti ve ölçülü bir giriş; otorite katan basit bir hamle.",
      ar: "كل المحتوى يخضع لأربعة أعمدة مع ثقل على النصف الأيمن. الشاشة الأولى عرض تقديمي: عنوان كبير، وشعار مكوَّن من مقاطع الصلب المدرفل، ومقدمة رصينة، وهي حيلة بسيطة تضفي هيبة.",
    },
    review: {
      en: [
        "The grid guides are visible across the page, and they are not decoration: indices and captions live in the left columns, content in the right. The mark of four profiles slowly rotates in the background with a molten gradient running through it, and on scroll the profiles fly out into the columns and line up.",
        "The section transition is a curtain of four vertical panels with an offset. The same gesture closes the first screen, opens the dark section and drives the mobile menu, so the site reads as one system.",
        "In “Product range” the section drawing is redrawn stroke by stroke when you pick a profile — outline, hatching, dimension lines — while the spec table changes beside it. The production chain from ore to shipping “melts” along the scroll.",
      ],
      ru: [
        "Направляющие сетки видны на всей странице, и это не украшение: в левых колонках живут индексы и подписи, в правых — содержание. Знак из четырёх профилей медленно вращается в фоне, по нему проходит расплавленный градиент, а при прокрутке профили разлетаются по колонкам и встают в ряд.",
        "Переход между секциями — занавес из четырёх вертикальных панелей со сдвигом. Один и тот же жест закрывает первый экран, открывает тёмную секцию и работает в мобильном меню, поэтому сайт читается как единая система.",
        "В «Сортаменте» чертёж сечения перерисовывается штрихом при выборе профиля — контур, штриховка, размерные линии, — а таблица характеристик сменяется рядом. Производственная цепочка от руды до отгрузки «плавится» вдоль прокрутки.",
      ],
      zh: ["网格参考线贯穿整个页面，而且不只是装饰：索引和说明文字在左侧列，正文内容在右侧列。由四种型材构成的标志在背景中缓缓旋转，熔融渐变从中流过；滚动时，这些型材飞入各列并排成一排。", "板块之间的转场是由四块竖向面板错位构成的幕布。同一个动作既用来收起首屏、展开深色板块，也驱动移动端菜单，使整个网站像一个统一的系统。", "在“产品系列”中，选择一种型材时，截面图会一笔一画地重新绘制——轮廓、剖面线、尺寸线——旁边的规格表同步切换。从矿石到发货的生产链条随着滚动“熔化”流动。"],
      tr: ["Izgara kılavuzları sayfa boyunca görünüyor ve süs değil: indeksler ve alt yazılar sol sütunlarda, içerik sağda yer alıyor. Dört profilden oluşan işaret arka planda yavaşça dönüyor, içinden erimiş bir gradyan geçiyor; kaydırınca profiller sütunlara dağılıp sıraya diziliyor.", "Bölüm geçişi, ofsetli dört dikey panelden oluşan bir perde. Aynı hareket ilk ekranı kapatıyor, koyu bölümü açıyor ve mobil menüyü yönetiyor; böylece site tek bir sistem gibi okunuyor.", "“Ürün gamı” bölümünde bir profil seçtiğinizde kesit çizimi çizgi çizgi yeniden çiziliyor (kontur, tarama, ölçü çizgileri), yanındaki özellik tablosu da değişiyor. Cevherden sevkiyata üretim zinciri kaydırma boyunca “eriyor”."],
      ar: ["تظهر خطوط الشبكة الإرشادية في أنحاء الصفحة، وهي ليست زينة: الفهارس والتسميات في الأعمدة اليسرى، والمحتوى في اليمنى. يدور شعار الملامح الأربعة ببطء في الخلفية وتمرّ عبره تدرّجات لونية كالمعدن المصهور، وعند التمرير تنطلق الملامح إلى الأعمدة وتصطف.", "الانتقال بين الأقسام ستارة من أربع ألواح عمودية بإزاحة متدرجة. وتغلق الحركة نفسها الشاشة الأولى وتفتح القسم الداكن وتشغّل القائمة في الجوال، فيُقرأ الموقع كنظام واحد.", "في «تشكيلة المنتجات» يُعاد رسم المقطع الهندسي خطًّا بخط عند اختيار الملمح: الحدود، والتظليل، وخطوط الأبعاد، بينما يتغير جدول المواصفات بجانبه. وتنصهر سلسلة الإنتاج من الخام إلى الشحن مع التمرير."],
    },
    features: [
      { title: { en: "Four-column grid", ru: "Сетка в четыре колонки", zh: "四列网格", tr: "Dört sütunlu ızgara", ar: "شبكة من أربعة أعمدة" }, text: { en: "Visible guides and a constant emphasis on the right half of the screen.", ru: "Видимые направляющие и постоянный акцент на правой половине экрана.", zh: "可见的参考线，以及始终偏向屏幕右半部分的视觉重心。", tr: "Görünür kılavuzlar ve ekranın sağ yarısına sürekli vurgu.", ar: "خطوط إرشادية ظاهرة وتركيز دائم على النصف الأيمن من الشاشة." } },
      { title: { en: "Panel curtain", ru: "Занавес из панелей", zh: "面板幕布", tr: "Panel perdesi", ar: "ستارة من الألواح" }, text: { en: "One transition for every section and the mobile menu.", ru: "Единый переход между всеми секциями и в мобильном меню.", zh: "所有板块和移动端菜单共用同一种转场。", tr: "Tüm bölümler ve mobil menü için tek bir geçiş.", ar: "انتقال واحد لكل الأقسام وللقائمة في الجوال." } },
      { title: { en: "A drawing that draws itself", ru: "Чертёж, который рисуется", zh: "会自己绘制的图纸", tr: "Kendini çizen çizim", ar: "رسم هندسي يرسم نفسه" }, text: { en: "The profile section is redrawn when a catalog item is selected.", ru: "Сечение профиля перерисовывается при выборе позиции в каталоге.", zh: "选中目录项时，型材截面图会重新绘制。", tr: "Katalogdan bir kalem seçildiğinde profil kesiti yeniden çiziliyor.", ar: "يُعاد رسم مقطع الملمح عند اختيار عنصر من الكتالوج." } },
    ],
    tags: { en: ["Swiss typography", "Grid", "SVG drawings"], ru: ["Швейцарская типографика", "Сетка", "SVG-чертежи"], zh: ["瑞士风格排版", "网格", "SVG 图纸"], tr: ["İsviçre tipografisi", "Izgara", "SVG çizimler"], ar: ["الطباعة السويسرية", "الشبكة", "رسومات SVG"] },
    palette: ["#F4F3EF", "#0E0E0E", "#E63A12", "#8A8F94"],
    fonts: "Inter Tight · JetBrains Mono",
  },
  {
    slug: "kvant",
    signature: { en: "Zoom from wafer to a single die", ru: "Зум от пластины до кристалла", zh: "从晶圆缩放到单个晶粒", tr: "Plakadan tek bir çipe zoom", ar: "تكبير من الرقاقة إلى شريحة واحدة" },
    title: { en: "Kvant·Lab", ru: "Квант·Лаб", zh: "Kvant·Lab", tr: "Kvant·Lab", ar: "Kvant·Lab" },
    client: { en: "Microelectronics R&D and fabrication centre", ru: "Центр разработки и производства микроэлектроники", zh: "微电子研发与制造中心", tr: "Mikroelektronik Ar-Ge ve üretim merkezi", ar: "مركز بحث وتطوير وتصنيع للإلكترونيات الدقيقة" },
    status: "concept",
    category: "web",
    sphere: { en: "Microelectronics", ru: "Микроэлектроника", zh: "微电子", tr: "Mikroelektronik", ar: "الإلكترونيات الدقيقة" },
    format: { en: "Corporate website", ru: "Корпоративный сайт", zh: "企业官网", tr: "Kurumsal web sitesi", ar: "موقع الشركة" },
    year: 2026,
    domain: "kvant·lab",
    demo: "/demos/kvant/index.html",
    url: "/demos/kvant/index.html",
    cover: img("kvant", "cover.jpg"),
    summary: {
      en: "Scrolling the first screen works like a microscope: from a wafer with hundreds of dies to a single die and further, to its layout. The headline decodes character by character, instrument readouts recalculate from millimetres to nanometres.",
      ru: "Прокрутка первого экрана работает как микроскоп: от пластины с сотнями кристаллов — к одному кристаллу и дальше, к его топологии. Заголовок расшифровывается посимвольно, приборные показания пересчитываются от миллиметров до нанометров.",
      zh: "首屏滚动就像显微镜：从布满数百个晶粒的晶圆，到单个晶粒，再深入到它的版图。标题逐字符解码，仪器读数从毫米一路换算到纳米。",
      tr: "İlk ekranı kaydırmak mikroskop gibi çalışıyor: yüzlerce çip içeren bir plakadan tek bir çipe ve daha öteye, yerleşim planına (layout) iniliyor. Başlık karakter karakter çözülüyor, cihaz göstergeleri milimetreden nanometreye yeniden hesaplanıyor.",
      ar: "يعمل تمرير الشاشة الأولى كمجهر: من رقاقة تضم مئات الشرائح إلى شريحة واحدة، ثم أبعد إلى مخططها. يُفكّ العنوان حرفًا حرفًا، وتُعاد حسابات قراءات الأجهزة من المليمترات إلى النانومترات.",
    },
    review: {
      en: [
        "A dark interface with a blueprint grid, hairlines and monospaced labels. The wafer is drawn on canvas: dies flash with scanning patterns, then the camera straightens and zooms into one of them, and the traces start drawing themselves.",
        "The process flow is a horizontal strip of five operations, each with its own looping cross‑section: lithography, etching, doping, metallisation, inspection. The strip moves with vertical scroll while a rail on top fills up.",
        "The only light section — the “clean room” — expands from a rounded panel to full screen. The contract-manufacturing request form is styled as a terminal, the one place where the site allows itself to play.",
      ],
      ru: [
        "Тёмный интерфейс с сеткой чертежа, тонкими линиями и моноширинными подписями. Пластина нарисована на canvas: кристаллы вспыхивают сканирующими узорами, затем камера выпрямляется и наезжает на один из них, а трассы начинают рисовать сами себя.",
        "Техпроцесс показан горизонтальной лентой из пяти операций. У каждой — свой зацикленный разрез: литография, травление, легирование, металлизация, контроль. Лента едет от вертикальной прокрутки, рейка сверху заполняется.",
        "Единственная светлая секция — «чистая комната» — раскрывается из скруглённой панели на весь экран. Форма заявки на контрактное производство оформлена как терминал, и это единственное место, где сайт позволяет себе игру.",
      ],
      zh: ["深色界面，配蓝图网格、发丝线和等宽字体标签。晶圆绘制在 canvas 上：晶粒闪现扫描图案，随后镜头摆正并推近其中一个，走线开始自己绘制。", "工艺流程是一条横向的五道工序长带，每道工序都有各自循环播放的截面图：光刻、刻蚀、掺杂、金属化、检测。长带随垂直滚动移动，顶部的导轨逐渐填满。", "唯一的浅色板块——“洁净室”——从圆角面板展开为全屏。代工需求表单被设计成终端的样子，这是网站唯一允许自己玩一把的地方。"],
      tr: ["Çizim ızgarası, ince çizgiler ve tek aralıklı etiketlerle koyu bir arayüz. Plaka canvas üzerinde çizildi: çipler tarama desenleriyle yanıp sönüyor, ardından kamera düzeliyor ve birine yaklaşıyor, hatlar kendi kendilerini çizmeye başlıyor.", "Üretim akışı, her biri kendi döngüsel kesitine sahip beş işlemden oluşan yatay bir şerit: litografi, aşındırma, katkılama, metalizasyon, denetim. Şerit dikey kaydırmayla ilerlerken üstteki ray doluyor.", "Tek açık bölüm olan “temiz oda”, yuvarlatılmış bir panelden tam ekrana genişliyor. Fason üretim talep formu terminal gibi tasarlandı; sitenin kendine oyun payı tanıdığı tek yer."],
      ar: ["واجهة داكنة بشبكة مخططات هندسية وخطوط رفيعة وتسميات بخط أحادي المسافة. رُسمت الرقاقة على canvas: تومض الشرائح بأنماط المسح، ثم تعتدل الكاميرا وتقترب من إحداها، وتبدأ المسارات برسم نفسها.", "سير العملية شريط أفقي من خمس عمليات، لكل منها مقطعها المتكرر: الطباعة الضوئية، والحفر، والتطعيم، والمعدنة، والفحص. يتحرك الشريط مع التمرير العمودي بينما يمتلئ مسار علوي.", "القسم الفاتح الوحيد، «الغرفة النظيفة»، يتمدد من لوحة بزوايا مستديرة إلى ملء الشاشة. ونموذج طلب التصنيع التعاقدي مصمَّم كطرفية، وهو المكان الوحيد الذي يسمح فيه الموقع لنفسه بالمرح."],
    },
    features: [
      { title: { en: "Zoom from wafer to traces", ru: "Зум от пластины к трассам", zh: "从晶圆缩放到走线", tr: "Plakadan hatlara zoom", ar: "تكبير من الرقاقة إلى المسارات" }, text: { en: "A canvas scene turns into SVG layout with light pulses running along the waveguides.", ru: "Canvas-сцена переходит в SVG-топологию, по волноводам бегут импульсы света.", zh: "canvas 场景切换为 SVG 版图，光脉冲沿波导奔跑。", tr: "Bir canvas sahnesi SVG yerleşim planına dönüşüyor, dalga kılavuzları boyunca ışık darbeleri koşuyor.", ar: "يتحول مشهد canvas إلى مخطط SVG، وتجري نبضات الضوء على طول الموجّهات الموجية." } },
      { title: { en: "Scroll-driven headline", ru: "Заголовок по скроллу", zh: "滚动驱动的标题", tr: "Kaydırmayla yönetilen başlık", ar: "عنوان مرتبط بالتمرير" }, text: { en: "Text decodes character by character, strictly tied to scroll position.", ru: "Текст декодируется посимвольно строго по позиции прокрутки.", zh: "文字逐字符解码，严格绑定滚动位置。", tr: "Metin karakter karakter çözülüyor, kaydırma konumuna sıkı sıkıya bağlı.", ar: "يُفكّ النص حرفًا حرفًا، مرتبطًا بدقة بموضع التمرير." } },
      { title: { en: "Process strip", ru: "Лента техпроцесса", zh: "工艺长带", tr: "Süreç şeridi", ar: "شريط العملية" }, text: { en: "Five operations with live diagrams in a pinned horizontal section.", ru: "Пять операций с живыми схемами в горизонтальной закреплённой секции.", zh: "固定的横向板块中，五道工序配有实时示意图。", tr: "Sabitlenmiş yatay bir bölümde canlı şemalarla beş işlem.", ar: "خمس عمليات بمخططات حيّة في قسم أفقي مثبّت." } },
    ],
    tags: { en: ["Canvas", "Deep tech", "Horizontal scroll"], ru: ["Canvas", "Deep tech", "Горизонтальный скролл"], zh: ["Canvas", "深科技", "横向滚动"], tr: ["Canvas", "Deep tech", "Yatay kaydırma"], ar: ["Canvas", "التقنية العميقة", "التمرير الأفقي"] },
    palette: ["#07080B", "#E9EEF3", "#3DF2E0", "#8B5CFF"],
    fonts: "Onest · JetBrains Mono",
  },
  {
    slug: "alatoo",
    signature: { en: "7-layer mountain parallax", ru: "Параллакс из семи хребтов", zh: "七层山脉视差", tr: "7 katmanlı dağ paralaksı", ar: "بارالاكس من سبع سلاسل جبلية" },
    title: { en: "Ala-Too Trek", ru: "Ала-Тоо Трек", zh: "Ala-Too Trek", tr: "Ala-Too Trek", ar: "Ala-Too Trek" },
    client: { en: "Trekking and horse expeditions in the mountains of Kyrgyzstan", ru: "Треккинг и конные экспедиции в горах Кыргызстана", zh: "吉尔吉斯斯坦山区的徒步与骑马探险", tr: "Kırgızistan dağlarında trekking ve atlı keşif turları", ar: "رحلات المشي الطويل والاستكشاف على ظهور الخيل في جبال قرغيزستان" },
    status: "concept",
    category: "web",
    sphere: { en: "Tourism", ru: "Туризм", zh: "旅游", tr: "Turizm", ar: "السياحة" },
    format: { en: "Tour operator website", ru: "Сайт туроператора", zh: "旅行社网站", tr: "Tur operatörü sitesi", ar: "موقع منظّم رحلات" },
    year: 2026,
    domain: "ala-too trek",
    demo: "/demos/alatoo/index.html",
    url: "/demos/alatoo/index.html",
    cover: img("alatoo", "cover.jpg"),
    summary: {
      en: "Scrolling lifts the viewer from a spruce valley at dawn to a mountain pass at golden hour. Seven ridge layers move at different speeds, the headline sits between them and an altimeter climbs from 1,600 to 4,000 metres.",
      ru: "Прокрутка поднимает зрителя из еловой долины на рассвете к перевалу в золотой час. Семь слоёв хребтов движутся с разной скоростью, заголовок стоит между ними, счётчик высоты идёт от 1 600 до 4 000 метров.",
      zh: "滚动把观众从黎明时分的云杉山谷，带到黄金时刻的山口。七层山脊以不同速度移动，标题置于其间，海拔表从 1,600 米攀升到 4,000 米。",
      tr: "Kaydırma, izleyiciyi şafaktaki bir ladin vadisinden altın saatteki bir dağ geçidine çıkarıyor. Yedi sırt katmanı farklı hızlarda hareket ediyor, başlık bunların arasında duruyor ve yükseklik göstergesi 1.600 metreden 4.000 metreye tırmanıyor.",
      ar: "يرفع التمرير المشاهد من وادٍ تكسوه أشجار التنوب عند الفجر إلى ممر جبلي في الساعة الذهبية. تتحرك سبع طبقات من السلاسل الجبلية بسرعات مختلفة، ويقف العنوان بينها، ويصعد مقياس الارتفاع من 1600 إلى 4000 متر.",
    },
    review: {
      en: [
        "There is not a single photo on the site — the whole world is vector‑drawn and generated procedurally: ridges with aerial perspective, spruces, clouds, yurts with smoke, a line of riders. The palette flows from a cold morning into a warm evening; the scene passes through the clouds and ends above them.",
        "The main section after the first screen is “The route day by day”. The route line is drawn by scroll across a contour map, overnight stops light up, the marker on the elevation profile moves in sync and day cards replace each other.",
        "Sections are divided by ridge silhouettes and a geometric ornament. A seasons calendar suggests when to go, and the tour request is set in a night scene with a glowing yurt.",
      ],
      ru: [
        "На сайте нет ни одной фотографии — весь мир нарисован вектором и собран процедурно: хребты с воздушной перспективой, ели, облака, юрты с дымом, цепочка всадников. Палитра перетекает из холодного утра в тёплый вечер, сцена проходит сквозь облака и заканчивается над ними.",
        "Главная секция после первого экрана — «Маршрут день за днём». Линия маршрута рисуется прокруткой по карте с горизонталями, точки ночёвок загораются, маркер на профиле высот движется синхронно, карточки дней сменяют друг друга.",
        "Секции разделены силуэтами хребтов и геометрическим орнаментом. Календарь сезонов подсказывает, когда ехать, а заявка на тур оформлена ночной сценой со светящейся юртой.",
      ],
      zh: ["网站上没有一张照片——整个世界都用矢量绘制并程序化生成：带大气透视的山脊、云杉、云朵、冒着炊烟的毡房、一列骑手。色调从清冷的早晨流转到温暖的傍晚；场景穿过云层，最终停在云端之上。", "首屏之后的主要板块是“逐日路线”。路线随滚动绘制在等高线地图上，过夜营地依次亮起，海拔剖面上的标记同步移动，每日卡片依次更替。", "各板块以山脊剪影和几何纹样分隔。季节日历提示最佳出行时间，而旅行申请则安排在夜景之中，一座毡房亮着灯。"],
      tr: ["Sitede tek bir fotoğraf yok; tüm dünya vektörle çizildi ve prosedürel olarak üretildi: hava perspektifli sırtlar, ladinler, bulutlar, dumanı tüten yurtlar, bir atlı dizisi. Palet soğuk bir sabahtan sıcak bir akşama akıyor; sahne bulutların içinden geçiyor ve onların üstünde bitiyor.", "İlk ekrandan sonraki ana bölüm “Gün gün rota”. Rota çizgisi kaydırmayla bir kontur haritası üzerine çiziliyor, konaklama noktaları yanıyor, yükseklik profilindeki işaret eş zamanlı hareket ediyor ve gün kartları birbirinin yerini alıyor.", "Bölümler sırt silüetleri ve geometrik bir süslemeyle ayrılıyor. Mevsim takvimi ne zaman gidileceğini öneriyor, tur talebi ise parlayan bir yurtla gece sahnesinde yer alıyor."],
      ar: ["لا توجد على الموقع صورة فوتوغرافية واحدة، فالعالم كله مرسوم بالمتجهات ومولَّد برمجيًا: سلاسل جبلية بمنظور جوي، وأشجار تنوب، وغيوم، وخيام يورت يتصاعد منها الدخان، وصف من الفرسان. تنساب لوحة الألوان من صباح بارد إلى مساء دافئ، ويعبر المشهد الغيوم وينتهي فوقها.", "القسم الرئيسي بعد الشاشة الأولى هو «المسار يومًا بيوم». يُرسم خط المسار بالتمرير على خريطة كنتورية، وتضيء محطات المبيت، ويتحرك المؤشر على مخطط الارتفاعات بتزامن، وتتبدل بطاقات الأيام.", "تفصل الأقسامَ ظلالُ السلاسل الجبلية وزخرفة هندسية. ويقترح تقويم المواسم الوقت المناسب للسفر، ويأتي طلب الرحلة في مشهد ليلي بخيمة يورت متوهجة."],
    },
    features: [
      { title: { en: "Ascent through layers", ru: "Подъём сквозь слои", zh: "穿越层层山峦的攀升", tr: "Katmanlardan yükseliş", ar: "صعود عبر الطبقات" }, text: { en: "Deep parallax of seven ridges with a shifting time of day.", ru: "Глубокий параллакс из семи хребтов со сменой времени суток.", zh: "七层山脊的深度视差，伴随一天中时间的变换。", tr: "Günün saati değişen, yedi sırtlı derin paralaks.", ar: "بارالاكس عميق من سبع سلاسل جبلية مع تغيّر وقت اليوم." } },
      { title: { en: "Route on the map", ru: "Маршрут на карте", zh: "地图上的路线", tr: "Haritada rota", ar: "المسار على الخريطة" }, text: { en: "The line is drawn by scroll; elevation profile and day cards move in sync.", ru: "Линия рисуется скроллом, профиль высот и карточки дней идут синхронно.", zh: "线条随滚动绘制；海拔剖面和每日卡片同步移动。", tr: "Çizgi kaydırmayla çiziliyor; yükseklik profili ve gün kartları eş zamanlı ilerliyor.", ar: "يُرسم الخط بالتمرير، ويتحرك مخطط الارتفاعات وبطاقات الأيام بتزامن." } },
      { title: { en: "A world without photos", ru: "Мир без фотографий", zh: "没有照片的世界", tr: "Fotoğrafsız bir dünya", ar: "عالم بلا صور فوتوغرافية" }, text: { en: "Every illustration is generated in code and reacts to the cursor.", ru: "Все иллюстрации сгенерированы кодом и реагируют на курсор.", zh: "所有插画均由代码生成，并会响应光标。", tr: "Her illüstrasyon kodla üretiliyor ve imlece tepki veriyor.", ar: "كل الرسوم مولَّدة بالشيفرة وتتفاعل مع المؤشر." } },
    ],
    tags: { en: ["Parallax", "Vector illustration", "Route map"], ru: ["Параллакс", "Векторная иллюстрация", "Карта маршрута"], zh: ["视差", "矢量插画", "路线地图"], tr: ["Paralaks", "Vektör illüstrasyon", "Rota haritası"], ar: ["البارالاكس", "رسوم المتجهات", "خريطة المسار"] },
    palette: ["#12332E", "#F7F4EC", "#F2A33A", "#BFD9E6"],
    fonts: "Prata · Manrope",
  },
  {
    slug: "aera",
    signature: { en: "A whole day in one scroll", ru: "Сутки за один скролл", zh: "一次滚动，度过一整天", tr: "Tek kaydırmada bir gün", ar: "يوم كامل في تمريرة واحدة" },
    title: { en: "AERA", ru: "АЭРА", zh: "AERA", tr: "AERA", ar: "AERA" },
    client: { en: "Turnkey wind and solar parks", ru: "Ветровые и солнечные парки под ключ", zh: "风电与光伏电站交钥匙工程", tr: "Anahtar teslim rüzgâr ve güneş parkları", ar: "محطات رياح وطاقة شمسية جاهزة للتشغيل" },
    status: "concept",
    category: "web",
    sphere: { en: "Energy", ru: "Энергетика", zh: "能源", tr: "Enerji", ar: "الطاقة" },
    format: { en: "Corporate website", ru: "Корпоративный сайт", zh: "企业官网", tr: "Kurumsal web sitesi", ar: "موقع الشركة" },
    year: 2026,
    domain: "aera",
    demo: "/demos/aera/index.html",
    url: "/demos/aera/index.html",
    cover: img("aera", "cover.jpg"),
    summary: {
      en: "A full day passes in one scroll of the first screen: dawn, day, sunset and a starry night. The sun travels along an arc and the rotors speed up with the wind — the visitor sees solar generation hand over to wind.",
      ru: "За одну прокрутку первого экрана проходят сутки: рассвет, день, закат и ночь со звёздами. Солнце идёт по дуге, роторы ускоряются вместе с ветром — посетитель видит, как солнечная генерация передаёт смену ветровой.",
      zh: "首屏的一次滚动就走完一整天：黎明、白天、日落和繁星之夜。太阳沿弧线运行，风轮随风加速——访客亲眼看到光伏发电把接力棒交给风电。",
      tr: "İlk ekranın tek bir kaydırmasında koca bir gün geçiyor: şafak, gündüz, gün batımı ve yıldızlı gece. Güneş bir yay boyunca ilerliyor, rotorlar rüzgârla hızlanıyor; ziyaretçi güneş enerjisi üretiminin nöbeti rüzgâra devrettiğini görüyor.",
      ar: "يمرّ يوم كامل في تمريرة واحدة للشاشة الأولى: فجر، ونهار، وغروب، وليل مرصّع بالنجوم. تسير الشمس على قوس وتتسارع الريش مع الرياح، فيرى الزائر كيف يسلّم توليد الطاقة الشمسية المناوبة لطاقة الرياح.",
    },
    review: {
      en: [
        "A light, airy site built on sky gradients and glass panels. Behind the headline is a wind field on canvas: about a thousand thin streamlines bend around the cursor and change colour with the time of day.",
        "The night of the first screen flows into the park's control panel: wind and power gauges, a CO₂ counter, a generation chart with a crosshair and a matrix of forty turbines. The panel is honestly labelled as a demo simulation.",
        "Then the page brightens again — a new dawn opens the design, construction and operations sections. Park mini‑maps are drawn procedurally, and the six project stages sit on a line driven by scroll.",
      ],
      ru: [
        "Светлый, воздушный сайт на градиентах неба и стеклянных панелях. За заголовком — поле ветра на canvas: около тысячи тонких линий тока огибают курсор и меняют цвет по времени суток.",
        "Ночь первого экрана перетекает в диспетчерскую панель парка: шкалы ветра и мощности, счётчик CO₂, график генерации с перекрестием и матрица из сорока турбин. Панель честно подписана как демо-симуляция.",
        "Дальше страница снова светлеет — новый рассвет открывает разделы про проектирование, строительство и эксплуатацию. Мини-карты парков нарисованы процедурно, шесть этапов проекта выстроены на линии, которую ведёт прокрутка.",
      ],
      zh: ["一个明亮通透的网站，建立在天空渐变和玻璃面板之上。标题后方是 canvas 上的风场：约一千条纤细的流线绕着光标弯曲，并随一天中的时间变换颜色。", "首屏的夜晚流入电站的控制面板：风速与功率仪表、CO₂ 计数器、带十字准线的发电曲线图，以及四十台风机组成的矩阵。面板坦率地标注为演示模拟。", "随后页面再次亮起——新的黎明开启设计、建设和运营板块。电站迷你地图为程序生成，项目的六个阶段排列在由滚动驱动的一条线上。"],
      tr: ["Gökyüzü gradyanları ve cam panellerle kurulmuş, aydınlık ve ferah bir site. Başlığın arkasında canvas üzerinde bir rüzgâr alanı var: yaklaşık bin ince akım çizgisi imlecin etrafında kıvrılıyor ve günün saatine göre renk değiştiriyor.", "İlk ekranın gecesi, parkın kontrol paneline akıyor: rüzgâr ve güç göstergeleri, CO₂ sayacı, artı imleçli bir üretim grafiği ve kırk türbinlik bir matris. Panel, dürüstçe demo simülasyon olarak etiketlenmiş.", "Sonra sayfa yeniden aydınlanıyor; yeni bir şafak tasarım, inşaat ve işletme bölümlerini açıyor. Park mini haritaları prosedürel olarak çizildi, altı proje aşaması ise kaydırmayla yönetilen bir çizgi üzerinde diziliyor."],
      ar: ["موقع خفيف ومنعش مبني على تدرّجات السماء والألواح الزجاجية. وخلف العنوان حقل رياح على canvas: نحو ألف خط انسياب رفيع تنحني حول المؤشر وتغيّر لونها بحسب وقت اليوم.", "ينساب ليل الشاشة الأولى إلى لوحة تحكم المحطة: مقاييس الرياح والقدرة، وعدّاد CO₂، ومخطط التوليد مع شبكة مؤشر، ومصفوفة من أربعين توربينًا. وقد وُسمت اللوحة بصدق على أنها محاكاة تجريبية.", "ثم تزداد الصفحة إشراقًا من جديد: فجر جديد يفتتح أقسام التصميم والإنشاء والتشغيل. رُسمت الخرائط المصغّرة للمحطات برمجيًا، وتصطف مراحل المشروع الست على خط يقوده التمرير."],
    },
    features: [
      { title: { en: "A day by scroll", ru: "Сутки по скроллу", zh: "随滚动流转的一天", tr: "Kaydırmayla bir gün", ar: "يوم كامل بالتمرير" }, text: { en: "Sky, sun, hills and turbines change from dawn to night.", ru: "Небо, солнце, холмы и турбины меняются от рассвета до ночи.", zh: "天空、太阳、山丘和风机从黎明到夜晚不断变化。", tr: "Gökyüzü, güneş, tepeler ve türbinler şafaktan geceye değişiyor.", ar: "تتغير السماء والشمس والتلال والتوربينات من الفجر إلى الليل." } },
      { title: { en: "Wind field", ru: "Поле ветра", zh: "风场", tr: "Rüzgâr alanı", ar: "حقل الرياح" }, text: { en: "A thousand canvas streamlines react to the cursor and pause off‑screen.", ru: "Тысяча линий тока на canvas реагирует на курсор и ставится на паузу вне экрана.", zh: "一千条 canvas 流线响应光标，移出屏幕时自动暂停。", tr: "Canvas üzerindeki bin akım çizgisi imlece tepki veriyor ve ekran dışında duruyor.", ar: "ألف خط انسياب على canvas تتفاعل مع المؤشر وتتوقف مؤقتًا خارج الشاشة." } },
      { title: { en: "Control panel", ru: "Диспетчерская панель", zh: "控制面板", tr: "Kontrol paneli", ar: "لوحة التحكم" }, text: { en: "Gauges, a generation chart and a turbine matrix in real time.", ru: "Шкалы, график генерации и матрица турбин в реальном времени.", zh: "实时显示的仪表、发电曲线图和风机矩阵。", tr: "Göstergeler, üretim grafiği ve türbin matrisi gerçek zamanlı.", ar: "مقاييس ومخطط توليد ومصفوفة توربينات في الوقت الفعلي." } },
    ],
    tags: { en: ["Canvas", "Dashboard", "Glass UI"], ru: ["Canvas", "Дашборд", "Glass UI"], zh: ["Canvas", "仪表盘", "玻璃质感 UI"], tr: ["Canvas", "Dashboard", "Glass UI"], ar: ["Canvas", "لوحة المؤشرات", "واجهة زجاجية"] },
    palette: ["#EAF4FF", "#0B2A3C", "#19C2A0", "#FFD36B"],
    fonts: "Geologica · Manrope",
  },
  {
    slug: "meridian",
    signature: { en: "Routes drawn by scroll", ru: "Маршруты рисуются скроллом", zh: "随滚动绘制的路线", tr: "Kaydırmayla çizilen rotalar", ar: "مسارات تُرسم بالتمرير" },
    title: { en: "Meridian", ru: "Меридиан", zh: "Meridian", tr: "Meridian", ar: "Meridian" },
    client: { en: "Multimodal container shipping across Eurasia", ru: "Мультимодальные контейнерные перевозки по Евразии", zh: "横跨欧亚大陆的多式联运集装箱运输", tr: "Avrasya genelinde multimodal konteyner taşımacılığı", ar: "شحن حاويات متعدد الوسائط عبر أوراسيا" },
    status: "concept",
    category: "web",
    sphere: { en: "Logistics", ru: "Логистика", zh: "物流", tr: "Lojistik", ar: "الخدمات اللوجستية" },
    format: { en: "Corporate website", ru: "Корпоративный сайт", zh: "企业官网", tr: "Kurumsal web sitesi", ar: "موقع الشركة" },
    year: 2026,
    domain: "meridian",
    demo: "/demos/meridian/index.html",
    url: "/demos/meridian/index.html",
    cover: img("meridian", "cover.jpg"),
    summary: {
      en: "Poster graphics made of coloured container blocks. On a dotted map of Eurasia, scrolling lays down routes, cargo travels along them and a split‑flap board flips through destinations.",
      ru: "Плакатная графика из цветных блоков-контейнеров. На точечной карте Евразии прокрутка прокладывает маршруты, по ним едут грузы, а табло с перекидными символами перелистывает направления.",
      zh: "由彩色集装箱块构成的海报式图形。在欧亚大陆的点阵地图上，滚动铺设路线，货物沿线行进，翻牌式信息板依次翻出目的地。",
      tr: "Renkli konteyner bloklarından oluşan poster grafikleri. Noktalı bir Avrasya haritasında kaydırma rotaları döşüyor, yükler bu rotalar boyunca ilerliyor ve çevrilebilir harfli bir pano varış noktalarını çeviriyor.",
      ar: "رسومات بأسلوب الملصقات من كتل حاويات ملوّنة. على خريطة منقّطة لأوراسيا يرسم التمرير المسارات، وتسير الشحنات عليها، وتقلّب لوحة الإعلانات ذات الحروف الدوّارة الوجهات.",
    },
    review: {
      en: [
        "Cobalt, white and signal yellow, big numerals and thick rules — the site looks like a poster and reads at a glance. The headline words are stacked and slide into frame as coloured blocks.",
        "The “Shipping” section moves horizontally with ordinary vertical scroll: a locomotive pulls five wagon cards — rail, road, sea, warehouse, customs. The wheels turn in proportion to the offset.",
        "A transit calculator estimates time by route and cargo type, and tracking shows a shipment as a strip of seven events. Both blocks are labelled as demos but built the way they would work on a production site.",
      ],
      ru: [
        "Кобальт, белый и сигнальный жёлтый, крупные цифры и толстые линейки — сайт выглядит как плакат и читается с первого взгляда. Слова заголовка сложены штабелем и заезжают в кадр цветными блоками.",
        "Раздел «Перевозки» едет по горизонтали от обычной вертикальной прокрутки: локомотив тянет пять вагонов-карточек — железная дорога, авто, море, склад, таможня. Колёса крутятся пропорционально сдвигу.",
        "Калькулятор сроков считает транзит по направлению и типу груза, трекинг показывает рейс как ленту из семи событий. Оба блока подписаны как демо, но устроены так, как работали бы на боевом сайте.",
      ],
      zh: ["钴蓝、白色和信号黄，大号数字和粗线条——网站像一张海报，一眼就能读懂。标题文字上下堆叠，作为彩色块滑入画面。", "“运输”板块在普通垂直滚动下横向移动：一台机车牵引着五节车厢卡片——铁路、公路、海运、仓储、清关。车轮转动与位移成比例。", "运输时效计算器按线路和货物类型估算时间，货物追踪则把一票货运呈现为七个事件组成的长条。两个模块都标注为演示，但按真实上线网站的方式构建。"],
      tr: ["Kobalt, beyaz ve sinyal sarısı, iri rakamlar ve kalın çizgiler: site bir poster gibi görünüyor ve bir bakışta okunuyor. Başlık kelimeleri üst üste dizilmiş, renkli bloklar halinde kadraja kayıyor.", "“Taşımacılık” bölümü, sıradan dikey kaydırmayla yatay ilerliyor: bir lokomotif beş vagon kartını çekiyor (demiryolu, karayolu, deniz, depo, gümrük). Tekerlekler kayma miktarıyla orantılı dönüyor.", "Bir transit hesaplayıcı rotaya ve yük tipine göre süreyi tahmin ediyor, takip ise bir sevkiyatı yedi olaylık bir şerit olarak gösteriyor. Her iki blok da demo olarak etiketlenmiş, ancak gerçek bir sitede çalışacakları şekilde kurulmuş."],
      ar: ["الكوبالت والأبيض والأصفر التحذيري، وأرقام كبيرة وخطوط سميكة، فيبدو الموقع كملصق ويُقرأ بنظرة واحدة. كلمات العنوان مكدّسة وتنزلق إلى الإطار ككتل ملوّنة.", "يتحرك قسم «الشحن» أفقيًا مع التمرير العمودي المعتاد: قاطرة تسحب خمس بطاقات عربات، هي السكك الحديدية والطرق والبحر والمستودع والجمارك. وتدور العجلات بما يتناسب مع الإزاحة.", "تقدّر حاسبة العبور المدة بحسب المسار ونوع الشحنة، ويعرض التتبع الشحنة كشريط من سبعة أحداث. وكلا القسمين موسوم بأنه تجريبي، لكنه مبني كما لو كان يعمل على موقع إنتاجي."],
    },
    features: [
      { title: { en: "Routes on the map", ru: "Маршруты на карте", zh: "地图上的路线", tr: "Haritada rotalar", ar: "المسارات على الخريطة" }, text: { en: "Lines draw on scroll, containers travel the paths, hubs flash.", ru: "Линии рисуются по скроллу, контейнеры едут по путям, хабы вспыхивают.", zh: "线条随滚动绘制，集装箱沿路径行进，枢纽闪烁亮起。", tr: "Çizgiler kaydırmayla çiziliyor, konteynerler yollarda ilerliyor, merkezler yanıp sönüyor.", ar: "تُرسم الخطوط بالتمرير، وتسير الحاويات على المسارات، وتومض المراكز." } },
      { title: { en: "Split-flap board", ru: "Перекидное табло", zh: "翻牌信息板", tr: "Çevrilebilir harfli pano", ar: "لوحة الحروف الدوّارة" }, text: { en: "Characters flip to new destinations as the screen changes phase.", ru: "Символы перелистываются на новые направления при смене фазы экрана.", zh: "屏幕切换阶段时，字符翻转成新的目的地。", tr: "Ekran faz değiştirdikçe karakterler yeni varış noktalarına dönüyor.", ar: "تنقلب الحروف إلى وجهات جديدة عند تغيّر طور الشاشة." } },
      { title: { en: "A horizontal train", ru: "Состав по горизонтали", zh: "横向行驶的列车", tr: "Yatay tren", ar: "قطار أفقي" }, text: { en: "The train section moves with vertical scroll, without hijacking the wheel.", ru: "Секция-поезд движется от вертикальной прокрутки, без перехвата колеса.", zh: "列车板块随垂直滚动移动，不会劫持滚轮。", tr: "Tren bölümü, kaydırma tekerleğini ele geçirmeden dikey kaydırmayla ilerliyor.", ar: "يتحرك قسم القطار مع التمرير العمودي دون الاستيلاء على عجلة الفأرة." } },
    ],
    tags: { en: ["Poster graphics", "SVG map", "Calculator"], ru: ["Плакатная графика", "SVG-карта", "Калькулятор"], zh: ["海报式图形", "SVG 地图", "计算器"], tr: ["Poster grafikleri", "SVG harita", "Hesaplayıcı"], ar: ["رسومات الملصقات", "خريطة SVG", "حاسبة"] },
    palette: ["#1437FF", "#FFFFFF", "#FFD400", "#0A0F2C"],
    fonts: "Unbounded · Onest",
  },
  {
    slug: "forma",
    title: { en: "Atelier Forma", ru: "Ателье Форма", zh: "Atelier Forma", tr: "Atelier Forma", ar: "Atelier Forma" },
    client: { en: "Solid-wood furniture workshop", ru: "Мануфактура мебели из массива", zh: "实木家具工坊", tr: "Masif ahşap mobilya atölyesi", ar: "ورشة أثاث من الخشب الصلب" },
    status: "concept",
    category: "web",
    sphere: { en: "Interior", ru: "Интерьер", zh: "室内设计", tr: "İç mekân", ar: "التصميم الداخلي" },
    format: { en: "Workshop website", ru: "Сайт мануфактуры", zh: "工坊网站", tr: "Atölye web sitesi", ar: "موقع الورشة" },
    year: 2026,
    domain: "atelier forma",
    demo: "/demos/forma/index.html",
    url: "/demos/forma/index.html",
    cover: img("forma", "cover.jpg"),
    summary: {
      en: "A quiet editorial site where a chair drawing assembles part by part as you scroll and turns from a line drawing into an oak object with texture and shadow. Motion is slow and soft; nothing bounces.",
      ru: "Тихий журнальный сайт, где чертёж стула по мере прокрутки собирается деталь за деталью и превращается из линейного рисунка в дубовый предмет с текстурой и тенью. Движение медленное и мягкое, ничего не подпрыгивает.",
      zh: "一个安静的杂志风网站：随着滚动，椅子的图纸一个部件一个部件地组装起来，从线稿变成带纹理和阴影的橡木实物。动效缓慢而柔和，没有任何弹跳。",
      tr: "Kaydırdıkça bir sandalye çiziminin parça parça kurulduğu, çizgi çizimden doku ve gölgeli bir meşe nesneye dönüştüğü sakin, editoryal bir site. Hareket yavaş ve yumuşak; hiçbir şey zıplamıyor.",
      ar: "موقع تحريري هادئ يتركّب فيه رسم كرسي قطعةً قطعة مع التمرير، ويتحول من رسم خطي إلى قطعة من خشب البلوط بملمس وظل. الحركة بطيئة وناعمة، ولا شيء يقفز.",
    },
    review: {
      en: [
        "A large serif with italic accents, wide margins, hairline rules and paper grain. Instead of a photo shoot there are still lifes drawn in SVG: a chair, a table, a console and a lamp stand in arched frames on tinted walls.",
        "The collections gallery opens with slow masks and inner parallax. In “Materials” the sample re‑tints to the chosen species — oak, walnut, ash, elm.",
        "The whole page smoothly changes theme between sections: paper, clay, espresso, sage. Workshop figures are set in large italics, and the request form invites you not to “leave your contacts” but to come and see how furniture is made.",
      ],
      ru: [
        "Крупная антиква с курсивными акцентами, широкие поля, тонкие линейки и бумажное зерно. Вместо фотосъёмки — натюрморты, нарисованные в SVG: стул, стол, консоль и лампа стоят в арочных рамах на тонированных стенах.",
        "Галерея коллекций открывается медленными масками с внутренним параллаксом. В разделе «Материалы» образец перекрашивается под выбранную породу — дуб, орех, ясень, карагач.",
        "Вся страница плавно меняет тему между секциями: бумага, глина, эспрессо, шалфей. Цифры мастерской набраны большим курсивом, а форма заявки приглашает не «оставить контакты», а приехать посмотреть, как делают мебель.",
      ],
      zh: ["醒目的衬线字体搭配斜体点缀，宽阔的页边距、发丝线和纸张颗粒感。没有拍摄实物，而是用 SVG 绘制的静物：椅子、桌子、边柜和台灯，立在着色墙面上的拱形画框中。", "系列画廊以缓慢的遮罩和内部视差展开。在“材质”中，样品会随所选树种重新着色——橡木、胡桃木、白蜡木、榆木。", "整个页面在各板块之间平滑切换主题：纸色、陶土色、浓缩咖啡色、鼠尾草绿。工坊数据以大号斜体呈现，而申请表单邀请您的不是“留下联系方式”，而是亲自来看看家具是怎么做出来的。"],
      tr: ["İtalik vurgulu iri bir serif, geniş kenar boşlukları, ince çizgiler ve kâğıt greni. Fotoğraf çekimi yerine SVG ile çizilmiş natürmortlar var: bir sandalye, bir masa, bir konsol ve bir lamba, renkli duvarlar önündeki kemerli çerçevelerde duruyor.", "Koleksiyon galerisi yavaş maskeler ve iç paralaksla açılıyor. “Malzemeler” bölümünde örnek, seçilen türe göre yeniden renkleniyor: meşe, ceviz, dişbudak, karaağaç.", "Sayfanın tamamı bölümler arasında yumuşakça tema değiştiriyor: kâğıt, kil, espresso, adaçayı. Atölye rakamları iri italiklerle dizilmiş, talep formu ise “iletişim bilgilerinizi bırakmaya” değil, gelip mobilyaların nasıl yapıldığını görmeye davet ediyor."],
      ar: ["خط سيريف كبير بلمسات مائلة، وهوامش واسعة، وخطوط رفيعة، وحبيبات ورق. وبدلًا من جلسة تصوير هناك لوحات طبيعة صامتة مرسومة بـ SVG: كرسي وطاولة ووحدة كونسول ومصباح داخل إطارات مقوّسة على جدران ملوّنة.", "يُفتح معرض المجموعات بأقنعة بطيئة وبارالاكس داخلي. وفي «المواد» تتبدل ألوان العينة بحسب نوع الخشب المختار: بلوط، وجوز، ودردار أبيض، وبقان.", "تغيّر الصفحة كلها سمتها بسلاسة بين الأقسام: ورق، وطين، وإسبريسو، ومريمية. وأرقام الورشة بخط مائل كبير، ونموذج الطلب لا يدعوك إلى «ترك بياناتك»، بل إلى الحضور ومشاهدة كيف يُصنع الأثاث."],
    },
    features: [
      { title: { en: "Chair assembly", ru: "Сборка стула", zh: "椅子组装", tr: "Sandalye montajı", ar: "تركيب الكرسي" }, text: { en: "An exploded drawing with callouts assembles into a finished piece on scroll.", ru: "Разнесённый чертёж с выносками собирается в готовый предмет по прокрутке.", zh: "带标注的爆炸图纸，随滚动组装成完整的成品。", tr: "Çıkma çizgilerle patlatılmış bir çizim, kaydırmayla bitmiş bir parçaya dönüşüyor.", ar: "رسم تفصيلي مفكَّك مع تسميات يتركّب في قطعة نهائية مع التمرير." } },
      { title: { en: "Masked gallery", ru: "Галерея под масками", zh: "遮罩画廊", tr: "Maskeli galeri", ar: "معرض بأقنعة" }, text: { en: "Still lifes reveal through clip-path with gentle parallax inside the frame.", ru: "Натюрморты раскрываются через clip-path с лёгким параллаксом внутри рамы.", zh: "静物通过 clip-path 揭示，画框内带有轻柔的视差。", tr: "Natürmortlar clip-path ile açılıyor, çerçevenin içinde hafif bir paralaks var.", ar: "تنكشف لوحات الطبيعة الصامتة عبر clip-path مع بارالاكس خفيف داخل الإطار." } },
      { title: { en: "Wood species switch", ru: "Смена породы", zh: "树种切换", tr: "Ağaç türü değişimi", ar: "تبديل نوع الخشب" }, text: { en: "The sample changes tone and grain on hover or tap.", ru: "Образец меняет тон и текстуру древесины по наведению или касанию.", zh: "悬停或点按时，样品的色调和纹理随之变化。", tr: "Örnek, üzerine gelindiğinde veya dokunulduğunda tonunu ve damarını değiştiriyor.", ar: "تتغير درجة لون العينة وعروقها عند التمرير فوقها أو لمسها." } },
    ],
    tags: { en: ["Editorial layout", "SVG illustration", "Theme shifts"], ru: ["Редакционная вёрстка", "SVG-иллюстрация", "Смена темы"], zh: ["杂志式排版", "SVG 插画", "主题切换"], tr: ["Editoryal düzen", "SVG illüstrasyon", "Tema geçişleri"], ar: ["تخطيط تحريري", "رسوم SVG", "تحولات السمة"] },
    palette: ["#F3EDE3", "#2A1F1A", "#B5683C", "#8A977B"],
    fonts: "Cormorant Garamond · Manrope",
  },

  // ── Studio projects, captured from their repositories (2026-10) ──
  {
    slug: "kyrgyz-soul-travel",
    title: { en: "KyrgyzSoul Travel", ru: "KyrgyzSoul Travel", zh: "KyrgyzSoul Travel", tr: "KyrgyzSoul Travel", ar: "KyrgyzSoul Travel" },
    client: { en: "Tour operator: cultural and adventure tours across Kyrgyzstan", ru: "Туроператор: культурные и приключенческие туры по Кыргызстану", zh: "旅行社：吉尔吉斯斯坦全境文化与探险之旅", tr: "Tur operatörü: Kırgızistan genelinde kültürel ve macera turları", ar: "منظّم رحلات: جولات ثقافية ومغامرات في أنحاء قرغيزستان" },
    status: "live",
    category: "web",
    sphere: { en: "Tourism", ru: "Туризм", zh: "旅游", tr: "Turizm", ar: "السياحة" },
    format: { en: "Multilingual marketing website with a tour catalog", ru: "Мультиязычный сайт с каталогом туров", zh: "带旅行目录的多语言营销网站", tr: "Tur kataloglu çok dilli pazarlama sitesi", ar: "موقع تسويقي متعدد اللغات مع كتالوج للرحلات" },
    year: 2026,
    url: "https://kyrgyz-soul-travel.vercel.app",
    embed: "https://kyrgyz-soul-travel.vercel.app",
    domain: "kyrgyz-soul-travel.vercel.app",
    cover: "/images/showcase/kyrgyz-soul-travel/cover.jpg",
    fullPage: "/images/showcase/kyrgyz-soul-travel/full.jpg",
    gallery: [
      { src: "/images/showcase/kyrgyz-soul-travel/screen-2.jpg", alt: { en: "KyrgyzSoul Travel — screen 2", ru: "KyrgyzSoul Travel — экран 2", zh: "KyrgyzSoul Travel — 第 2 屏", tr: "KyrgyzSoul Travel — ekran 2", ar: "KyrgyzSoul Travel — الشاشة 2" } },
      { src: "/images/showcase/kyrgyz-soul-travel/screen-3.jpg", alt: { en: "KyrgyzSoul Travel — screen 3", ru: "KyrgyzSoul Travel — экран 3", zh: "KyrgyzSoul Travel — 第 3 屏", tr: "KyrgyzSoul Travel — ekran 3", ar: "KyrgyzSoul Travel — الشاشة 3" } },
    ],
    mobile: "/images/showcase/kyrgyz-soul-travel/mobile.jpg",
    summary: { en: "A website for a Kyrgyz tour operator with six multi-day tours, each on its own page with a day-by-day itinerary, price per person and a booking request form. The site is available in English, Russian and German.", ru: "Сайт кыргызского туроператора с шестью многодневными турами: у каждого своя страница с программой по дням, ценой за человека и формой заявки. Сайт работает на английском, русском и немецком.", zh: "一家吉尔吉斯旅行社的网站，包含六条多日行程，每条行程都有独立页面，附逐日行程安排、人均价格和预订申请表单。网站提供英语、俄语和德语版本。", tr: "Her biri kendi sayfasında gün gün program, kişi başı fiyat ve rezervasyon talep formu bulunan altı çok günlü turu olan bir Kırgız tur operatörü sitesi. Site İngilizce, Rusça ve Almanca olarak sunuluyor.", ar: "موقع لمنظّم رحلات قرغيزي يضم ست رحلات متعددة الأيام، لكل منها صفحة خاصة ببرنامج يوم بيوم وسعر للفرد ونموذج طلب حجز. الموقع متاح بالإنجليزية والروسية والألمانية." },
    review: {
      en: [
        "The tour content came from the operator's own Word documents, and the itineraries were built to follow them closely. When a document merged two days into one, the site does the same.",
        "The visual style uses dark warm backgrounds, gold and deep teal accents, a Cormorant Garamond serif for headings and full-width landscape photos. Each tour page opens with a large hero showing the tour type, length, difficulty, season and starting price.",
      ],
      ru: [
        "Тексты туров взяты из Word-документов туроператора, и программы на сайте повторяют их точно, вплоть до объединённых дней, если так было в исходнике.",
        "Визуально сайт построен на тёплом тёмном фоне, золотых и глубоких бирюзовых акцентах, антикве Cormorant Garamond в заголовках и пейзажных фото во всю ширину. Каждая страница тура начинается с большого первого экрана, где указаны тип тура, длительность, сложность, сезон и цена «от».",
      ],
      zh: ["行程内容来自旅行社自己的 Word 文档，行程安排严格按照文档编写。如果文档把两天合并为一天，网站也同样处理。", "视觉风格采用深暖色背景、金色与深青色点缀，标题使用 Cormorant Garamond 衬线字体，并配有通栏风景照片。每个行程页面都以大幅首图开场，展示行程类型、时长、难度、季节和起步价。"],
      tr: ["Tur içerikleri operatörün kendi Word belgelerinden geldi ve programlar onlara yakından uyularak hazırlandı. Bir belge iki günü tek güne birleştirdiyse, site de aynısını yapıyor.", "Görsel stil koyu sıcak arka planlar, altın ve derin petrol mavisi vurgular, başlıklarda Cormorant Garamond serif yazı tipi ve tam genişlikte manzara fotoğrafları kullanıyor. Her tur sayfası; tur tipini, süreyi, zorluk seviyesini, sezonu ve başlangıç fiyatını gösteren büyük bir hero ile açılıyor."],
      ar: ["جاء محتوى الرحلات من مستندات Word الخاصة بالمنظّم، وبُنيت البرامج لتتبعها بدقة. وعندما دمج المستند يومين في يوم واحد، فعل الموقع الأمر نفسه.", "يعتمد الطابع البصري على خلفيات داكنة دافئة، ولمسات من الذهبي والأزرق المخضر العميق، وخط Cormorant Garamond ذي الزوائد للعناوين، وصور مناظر طبيعية بعرض الشاشة كاملًا. وتبدأ كل صفحة رحلة بشاشة افتتاحية كبيرة تعرض نوع الرحلة ومدتها ودرجة صعوبتها وموسمها وسعرها الابتدائي."],
    },
    features: [
      { title: { en: "Tour catalog", ru: "Каталог туров", zh: "旅行目录", tr: "Tur kataloğu", ar: "كتالوج الرحلات" }, text: { en: "Six tours (cultural, classic, World Nomad Games, Kel-Suu routes, a winter tour) with cards showing duration, difficulty and price per person.", ru: "Шесть туров (познавательный, классический, к Всемирным играм кочевников, маршруты к Кель-Суу, зимний) в карточках с длительностью, сложностью и ценой за человека.", zh: "六条行程（文化之旅、经典之旅、世界游牧民族运动会、Kel-Suu 线路、冬季之旅），卡片展示时长、难度和人均价格。", tr: "Süre, zorluk ve kişi başı fiyatı gösteren kartlarla altı tur (kültürel, klasik, Dünya Göçebe Oyunları, Kel-Suu rotaları, bir kış turu).", ar: "ست رحلات (ثقافية، وكلاسيكية، وألعاب البدو العالمية، ومسارات كل-سو، ورحلة شتوية) في بطاقات تعرض المدة ودرجة الصعوبة وسعر الفرد." } },
      { title: { en: "Three languages", ru: "Три языка", zh: "三种语言", tr: "Üç dil", ar: "ثلاث لغات" }, text: { en: "Localized routes for EN, RU and DE, with a language switch in the header, hreflang and canonical tags.", ru: "Отдельные адреса для EN, RU и DE, переключатель языка в шапке, теги hreflang и canonical.", zh: "为 EN、RU 和 DE 提供本地化路由，页眉设有语言切换，并配置 hreflang 和 canonical 标签。", tr: "EN, RU ve DE için yerelleştirilmiş rotalar; üstbilgide dil değiştirici, hreflang ve canonical etiketleri.", ar: "مسارات محلية للإنجليزية EN والروسية RU والألمانية DE، مع مبدّل لغة في الترويسة ووسوم hreflang وcanonical." } },
      { title: { en: "Booking request", ru: "Заявка на тур", zh: "预订申请", tr: "Rezervasyon talebi", ar: "طلب الحجز" }, text: { en: "A form on every tour page with the tour pre-selected, WhatsApp number and consent checkbox, sent to a validated /api/booking endpoint.", ru: "Форма на странице каждого тура с уже выбранным туром, номером WhatsApp и согласием на обработку данных. Отправляется на /api/booking с проверкой полей.", zh: "每个行程页面都有一份表单，已预选该行程，含 WhatsApp 号码和同意复选框，提交至经过校验的 /api/booking 接口。", tr: "Her tur sayfasında tur önceden seçili gelen, WhatsApp numarası ve onay kutusu içeren bir form; doğrulamalı bir /api/booking uç noktasına gönderiliyor.", ar: "نموذج في صفحة كل رحلة مع اختيار الرحلة مسبقًا، ورقم WhatsApp، ومربع الموافقة، يُرسَل إلى نقطة النهاية /api/booking بعد التحقق من صحته." } },
    ],
    tags: { en: ["Next.js 14 (App Router)","TypeScript","Tailwind CSS"], ru: ["Next.js 14 (App Router)","TypeScript","Tailwind CSS"], zh: ["Next.js 14 (App Router)", "TypeScript", "Tailwind CSS"], tr: ["Next.js 14 (App Router)", "TypeScript", "Tailwind CSS"], ar: ["Next.js 14 (App Router)", "TypeScript", "Tailwind CSS"] },
    stack: ["Next.js 14 (App Router)","TypeScript","Tailwind CSS","Framer Motion","Vercel"],
    palette: ["#FAF9F6","#1C1917","#C9A96E","#0D4F4F"],
  },
  {
    slug: "asaki-sushi",
    stage: "radial-gradient(circle at 20% 25%, #FF4D4D 0%, transparent 40%), radial-gradient(circle at 85% 80%, #FFB199 0%, transparent 45%), linear-gradient(135deg, #2B0A0A 0%, #6E1111 55%, #C81E1E 100%)",
    decor: ["🍣", "🍱", "🥢", "🍙", "🍤", "🥟", "🍣", "🍵"],
    title: { en: "Asaki Sushi", ru: "Asaki Sushi", zh: "Asaki Sushi", tr: "Asaki Sushi", ar: "Asaki Sushi" },
    client: { en: "A sushi bar in Bishkek with pickup and delivery", ru: "Суши-бар в Бишкеке с самовывозом и доставкой", zh: "比什凯克的寿司吧，支持自取和外送", tr: "Bişkek'te gel-al ve teslimat hizmeti sunan bir suşi barı", ar: "بار سوشي في بيشكيك مع الاستلام والتوصيل" },
    status: "live",
    category: "product",
    sphere: { en: "Food & delivery", ru: "Общепит и доставка", zh: "餐饮与外送", tr: "Yeme-içme ve teslimat", ar: "المطاعم والتوصيل" },
    format: { en: "Ordering PWA with owner cabinet", ru: "PWA для заказов с кабинетом владельца", zh: "带店主后台的点餐 PWA", tr: "Sahip paneli olan sipariş PWA'sı", ar: "PWA للطلبات مع لوحة المالك" },
    year: 2026,
    url: "https://asakisuhi.kg",
    domain: "asakisuhi.kg",
    cover: "/images/showcase/asaki-sushi/cover.jpg",
    phones: ["/images/showcase/asaki-sushi/phone-1.jpg","/images/showcase/asaki-sushi/phone-2.jpg","/images/showcase/asaki-sushi/phone-3.jpg"],
    summary: { en: "An installable web app for a sushi bar: menu with search and categories, cart and checkout, and a loyalty card that returns part of each order as points. Behind it sit an owner cabinet for orders, menu, delivery zones and push campaigns, and a staff screen for crediting points to dine-in guests.", ru: "Устанавливаемое веб-приложение суши-бара: меню с поиском и категориями, корзина и оформление заказа, карта лояльности, которая возвращает часть суммы баллами. За ним — кабинет владельца для заказов, меню, зон доставки и push-рассылок и экран персонала для начисления баллов гостям в зале.", zh: "一款寿司吧的可安装 Web 应用：带搜索和分类的菜单、购物车与结账，以及把每单一部分金额以积分返还的会员卡。后台包括管理订单、菜单、配送区域和推送活动的店主后台，以及为堂食顾客累积积分的员工界面。", tr: "Bir suşi barı için yüklenebilir web uygulaması: arama ve kategorili menü, sepet ve ödeme adımı, her siparişin bir kısmını puan olarak geri veren bir sadakat kartı. Arkasında siparişler, menü, teslimat bölgeleri ve push kampanyaları için bir sahip paneli, salondaki misafirlere puan yüklemek için de bir personel ekranı yer alıyor.", ar: "تطبيق ويب قابل للتثبيت لبار سوشي: قائمة طعام مع بحث وفئات، وسلة وإتمام الطلب، وبطاقة ولاء تعيد جزءًا من كل طلب على شكل نقاط. وخلفه لوحة للمالك للطلبات والقائمة ومناطق التوصيل والحملات عبر الإشعارات push، وشاشة للموظفين لإضافة النقاط لضيوف الصالة." },
    review: {
      en: [
        "The guest side is a mobile-first PWA: the home screen shows opening hours, pickup and delivery options and a call to order, the menu is grouped by category with search, and the cart opens as a bottom sheet. Payment is on receipt only, in cash or by transfer, and the owner chooses which methods to offer. Delivery is enabled per zone, each with its own fee and minimum order; with no active zones the app offers pickup only.",
        "The owner manages everything from a cabinet: orders, menu and photos, delivery zones, customers, staff accounts, loyalty settings and push notifications sent through self-hosted Web Push. Staff and owners sign in by personal PIN, and the order history records who accepted each order. The app runs as a single instance per venue on Docker Compose with PostgreSQL and Caddy for HTTPS.",
      ],
      ru: [
        "Гостевая часть — PWA, рассчитанная на телефон: на главной часы работы, самовывоз и доставка и кнопка заказа, меню разбито по категориям и снабжено поиском, корзина открывается шторкой снизу. Оплата только при получении — наличными или переводом, какие способы предлагать, решает владелец. Доставка включается зонами со своей стоимостью и минимальной суммой; пока активных зон нет, доступен только самовывоз.",
        "Владелец управляет всем из кабинета: заказы, меню и фотографии, зоны доставки, клиенты, учётки сотрудников, настройки лояльности и push-уведомления через собственный Web Push. Сотрудники и владелец входят по личному PIN, а в истории заказа видно, кто его принял. Приложение работает отдельным инстансом на заведение: Docker Compose, PostgreSQL и Caddy для HTTPS.",
      ],
      zh: ["顾客端是移动优先的 PWA：首页展示营业时间、自取与外送方式和下单入口，菜单按分类分组并支持搜索，购物车以底部抽屉形式展开。仅支持收货时付款，现金或转账，由店主选择提供哪些方式。外送按区域开通，每个区域有各自的配送费和起送金额；没有启用的区域时，应用只提供自取。", "店主在后台统一管理一切：订单、菜单和照片、配送区域、客户、员工账号、会员设置，以及通过自建 Web Push 发送的推送通知。员工和店主通过个人 PIN 登录，订单历史会记录是谁接的单。应用以每家门店一个独立实例的方式运行，部署在 Docker Compose 上，搭配 PostgreSQL 和用于 HTTPS 的 Caddy。"],
      tr: ["Misafir tarafı mobil öncelikli bir PWA: ana ekranda çalışma saatleri, gel-al ve teslimat seçenekleri ile sipariş çağrısı yer alıyor, menü kategorilere göre gruplanmış ve aranabilir, sepet alttan bir panel olarak açılıyor. Ödeme yalnızca teslimatta, nakit veya havale ile; hangi yöntemlerin sunulacağını sahip seçiyor. Teslimat bölge bazında etkinleştiriliyor, her bölgenin kendi ücreti ve minimum siparişi var; aktif bölge yoksa uygulama yalnızca gel-al sunuyor.", "Sahip her şeyi bir panelden yönetiyor: siparişler, menü ve fotoğraflar, teslimat bölgeleri, müşteriler, personel hesapları, sadakat ayarları ve kendi barındırdığımız Web Push üzerinden gönderilen push bildirimleri. Personel ve sahip kişisel PIN ile giriş yapıyor, sipariş geçmişi her siparişi kimin kabul ettiğini kaydediyor. Uygulama, mekân başına tek bir örnek olarak Docker Compose üzerinde PostgreSQL ve HTTPS için Caddy ile çalışıyor."],
      ar: ["جانب الضيف هو PWA مصمَّم للجوال أولًا: تعرض الشاشة الرئيسية ساعات العمل وخيارات الاستلام والتوصيل ودعوة للطلب، وتُجمَّع القائمة حسب الفئات مع بحث، وتُفتح السلة كورقة سفلية. الدفع عند الاستلام فقط، نقدًا أو بالتحويل، ويختار المالك الطرق المتاحة. يُفعَّل التوصيل لكل منطقة على حدة برسومها وحدّها الأدنى للطلب؛ وعند عدم وجود مناطق نشطة يقدّم التطبيق الاستلام فقط.", "يدير المالك كل شيء من لوحة واحدة: الطلبات، والقائمة والصور، ومناطق التوصيل، والعملاء، وحسابات الموظفين، وإعدادات الولاء، وإشعارات push المرسلة عبر Web Push مستضاف ذاتيًا. يسجّل الموظفون والمالك الدخول برمز PIN شخصي، ويوثّق سجل الطلبات من قَبِل كل طلب. ويعمل التطبيق كنسخة مستقلة لكل منشأة على Docker Compose مع PostgreSQL وCaddy لـ HTTPS."],
    },
    features: [
      { title: { en: "Menu, cart and checkout", ru: "Меню, корзина и оформление", zh: "菜单、购物车与结账", tr: "Menü, sepet ve ödeme", ar: "القائمة والسلة وإتمام الطلب" }, text: { en: "Categories, search, a bottom-sheet cart and pickup or zone-based delivery with per-zone fee and minimum order.", ru: "Категории, поиск, корзина-шторка, самовывоз или доставка по зонам со своей ценой и минимальной суммой.", zh: "分类、搜索、底部抽屉式购物车，以及自取或按区域外送，每个区域有独立的配送费和起送金额。", tr: "Kategoriler, arama, alttan açılan sepet ve bölge bazlı ücret ile minimum siparişi olan gel-al veya teslimat.", ar: "فئات، وبحث، وسلة بورقة سفلية، واستلام أو توصيل حسب المنطقة برسوم وحد أدنى للطلب لكل منطقة." } },
      { title: { en: "Points loyalty card", ru: "Карта лояльности с баллами", zh: "积分会员卡", tr: "Puanlı sadakat kartı", ar: "بطاقة ولاء بالنقاط" }, text: { en: "Part of each order returns as points; the card opens by phone and a code from the till, and staff credit points for dine-in orders.", ru: "Часть суммы заказа возвращается баллами; карта открывается по телефону и коду с кассы, персонал начисляет баллы за заказы в зале.", zh: "每单一部分金额以积分返还；会员卡通过手机号和收银台验证码开通，员工可为堂食订单累积积分。", tr: "Her siparişin bir kısmı puan olarak geri dönüyor; kart telefon ve kasadan alınan kodla açılıyor, personel salon siparişleri için puan yüklüyor.", ar: "يعود جزء من كل طلب على شكل نقاط؛ وتُفتح البطاقة برقم الهاتف ورمز من الصندوق، ويضيف الموظفون النقاط لطلبات الصالة." } },
      { title: { en: "Owner cabinet and push", ru: "Кабинет владельца и push", zh: "店主后台与推送", tr: "Sahip paneli ve push", ar: "لوحة المالك وإشعارات push" }, text: { en: "Orders, menu, zones, customers, staff with personal PINs and push campaigns via self-hosted Web Push.", ru: "Заказы, меню, зоны, клиенты, сотрудники с личными PIN и push-рассылки через собственный Web Push.", zh: "订单、菜单、区域、客户、持个人 PIN 的员工，以及通过自建 Web Push 发送的推送活动。", tr: "Siparişler, menü, bölgeler, müşteriler, kişisel PIN'li personel ve kendi barındırdığımız Web Push ile push kampanyaları.", ar: "الطلبات والقائمة والمناطق والعملاء والموظفون برموز PIN شخصية، وحملات push عبر Web Push مستضاف ذاتيًا." } },
    ],
    tags: { en: ["Next.js 16","React 19","TypeScript"], ru: ["Next.js 16","React 19","TypeScript"], zh: ["Next.js 16", "React 19", "TypeScript"], tr: ["Next.js 16", "React 19", "TypeScript"], ar: ["Next.js 16", "React 19", "TypeScript"] },
    stack: ["Next.js 16","React 19","TypeScript","PostgreSQL","Drizzle ORM","Tailwind CSS 4","Web Push (VAPID)","Docker Compose","Caddy","Vitest","PGlite","Playwright"],
    palette: ["#F2EFEA","#151615","#F40A16","#C30811"],
  },
  {
    slug: "dream-hotel",
    signature: { en: "3D starfield on Three.js", ru: "3D звёздное небо на Three.js", zh: "基于 Three.js 的 3D 星空", tr: "Three.js ile 3D yıldız alanı", ar: "سماء نجوم ثلاثية الأبعاد على Three.js" },
    title: { en: "Dream Hotel", ru: "Dream Hotel", zh: "Dream Hotel", tr: "Dream Hotel", ar: "Dream Hotel" },
    client: { en: "A small hotel in Bishkek with two locations and breakfast included", ru: "Небольшой отель в Бишкеке на два адреса с завтраком в стоимости", zh: "比什凯克的小型酒店，两家门店，含早餐", tr: "Bişkek'te iki lokasyonlu, kahvaltı dahil küçük bir otel", ar: "فندق صغير في بيشكيك بفرعين وإفطار مشمول" },
    status: "built",
    category: "web",
    sphere: { en: "Hospitality", ru: "Гостиничный бизнес", zh: "酒店业", tr: "Konaklama", ar: "الضيافة" },
    format: { en: "Hotel landing page with booking via WhatsApp", ru: "Лендинг отеля с бронированием через WhatsApp", zh: "支持通过 WhatsApp 预订的酒店落地页", tr: "WhatsApp üzerinden rezervasyonlu otel açılış sayfası", ar: "صفحة هبوط للفندق مع الحجز عبر WhatsApp" },
    year: 2026,
    domain: "dream hotel",
    cover: "/images/showcase/dream-hotel/cover.jpg",
    gallery: [
      { src: "/images/showcase/dream-hotel/screen-2.jpg", alt: { en: "Dream Hotel — screen 2", ru: "Dream Hotel — экран 2", zh: "Dream Hotel — 第 2 屏", tr: "Dream Hotel — ekran 2", ar: "Dream Hotel — الشاشة 2" } },
      { src: "/images/showcase/dream-hotel/screen-3.jpg", alt: { en: "Dream Hotel — screen 3", ru: "Dream Hotel — экран 3", zh: "Dream Hotel — 第 3 屏", tr: "Dream Hotel — ekran 3", ar: "Dream Hotel — الشاشة 3" } },
    ],
    mobile: "/images/showcase/dream-hotel/mobile.jpg",
    summary: { en: "A one-page website for a Bishkek hotel that presents rooms, real photos, amenities, reviews and both addresses. Every booking button opens WhatsApp with a pre-filled message for the chosen room.", ru: "Одностраничный сайт отеля в Бишкеке: номера, реальные фото, удобства, отзывы и оба адреса. Любая кнопка бронирования открывает WhatsApp с уже заполненным сообщением под выбранный номер.", zh: "比什凯克一家酒店的单页网站，展示客房、真实照片、设施、评价以及两处地址。每个预订按钮都会打开 WhatsApp，并自动填入所选客房的消息。", tr: "Odaları, gerçek fotoğrafları, olanakları, yorumları ve her iki adresi tanıtan, Bişkek'teki bir otel için tek sayfalık web sitesi. Her rezervasyon düğmesi, seçilen oda için önceden doldurulmuş bir mesajla WhatsApp'ı açıyor.", ar: "موقع من صفحة واحدة لفندق في بيشكيك يعرض الغرف وصورًا حقيقية والمرافق والتقييمات والعنوانين. يفتح كل زر حجز WhatsApp مع رسالة معبّأة مسبقًا للغرفة المختارة." },
    review: {
      en: [
        "The site is built around one action: booking a room. The hero states the price and the main advantage (breakfast included), and then the page walks the guest through room cards with photo carousels, a gallery of the actual hotel, amenities, reviews and the two locations. A floating WhatsApp button stays on screen on every section.",
        "The visual concept is a night sky: a Three.js starfield in the hero, deep navy and purple tones with rose-gold accents, and a serif headline font. Scroll animations are done with Framer Motion and trigger once, so the page stays calm while browsing.",
        "Under the hood it is a Next.js App Router project with all hotel data kept in one constants file, so prices and rooms are edited in one place. SEO is set up properly: Open Graph tags, Hotel JSON-LD structured data, sitemap and robots.txt.",
      ],
      ru: [
        "Сайт построен вокруг одного действия — забронировать номер. На первом экране сразу цена и главное преимущество (завтрак включён), дальше гость листает карточки номеров с фото-каруселью, галерею реальных снимков отеля, удобства, отзывы и два адреса. Плавающая кнопка WhatsApp видна на любом экране.",
        "Визуальная идея — ночное небо: звёздное 3D-поле на Three.js в первом экране, глубокий тёмно-синий и фиолетовый с акцентами цвета розового золота и антиквенный шрифт в заголовках. Анимации при скролле сделаны на Framer Motion и срабатывают один раз, поэтому страница не утомляет.",
        "Технически это Next.js (App Router), где все данные отеля лежат в одном файле констант — цены и номера меняются в одном месте. SEO настроено полноценно: Open Graph, разметка Hotel в JSON-LD, sitemap и robots.txt.",
      ],
      zh: ["网站围绕一个动作构建：预订客房。首屏直接给出价格和核心优势（含早餐），随后页面引导住客浏览带照片轮播的客房卡片、酒店实拍图库、设施、评价和两处位置。悬浮的 WhatsApp 按钮在每个板块都停留在屏幕上。", "视觉概念是夜空：首屏是 Three.js 星空，深海军蓝与紫色调搭配玫瑰金点缀，标题使用衬线字体。滚动动画由 Framer Motion 实现且只触发一次，因此浏览时页面保持平静。", "技术上这是一个 Next.js App Router 项目，所有酒店数据都存放在一个常量文件中，价格和客房只需在一处修改。SEO 也配置完善：Open Graph 标签、Hotel JSON-LD 结构化数据、sitemap 和 robots.txt。"],
      tr: ["Site tek bir eylemin etrafında kurulu: oda rezervasyonu. Hero fiyatı ve ana avantajı (kahvaltı dahil) söylüyor, ardından sayfa misafiri fotoğraf karusellı oda kartlarından, otelin gerçek fotoğraflarından oluşan bir galeriden, olanaklardan, yorumlardan ve iki lokasyondan geçiriyor. Yüzen bir WhatsApp düğmesi her bölümde ekranda kalıyor.", "Görsel konsept bir gece gökyüzü: hero'da Three.js ile yıldız alanı, gül altını vurgularla koyu lacivert ve mor tonlar ve serif bir başlık yazı tipi. Kaydırma animasyonları Framer Motion ile yapıldı ve bir kez tetikleniyor; böylece sayfa gezinirken sakin kalıyor.", "Kaputun altında bir Next.js App Router projesi var; tüm otel verileri tek bir sabitler dosyasında tutuluyor, fiyatlar ve odalar tek yerden düzenleniyor. SEO düzgünce kurulmuş: Open Graph etiketleri, Hotel JSON-LD yapılandırılmış verisi, sitemap ve robots.txt."],
      ar: ["بُني الموقع حول إجراء واحد: حجز غرفة. تعلن الشاشة الأولى السعر والميزة الرئيسية (الإفطار مشمول)، ثم تقود الصفحة الضيف عبر بطاقات الغرف مع معارض صور دوّارة، ومعرض لصور الفندق الفعلية، والمرافق، والتقييمات، والموقعين. ويبقى زر WhatsApp عائمًا على الشاشة في كل قسم.", "الفكرة البصرية سماء ليلية: حقل نجوم على Three.js في الشاشة الأولى، وألوان كحلي عميق وبنفسجي مع لمسات من الذهبي الوردي، وخط سيريف للعناوين. وأُنجزت حركات التمرير بـ Framer Motion وتعمل مرة واحدة، فتبقى الصفحة هادئة أثناء التصفح.", "تقنيًا هو مشروع Next.js بنظام App Router، تُحفظ فيه كل بيانات الفندق في ملف ثوابت واحد، فتُعدَّل الأسعار والغرف في مكان واحد. وقد أُعدّ تحسين محركات البحث بإتقان: وسوم Open Graph، وبيانات Hotel المنظَّمة بصيغة JSON-LD، وsitemap وrobots.txt."],
    },
    features: [
      { title: { en: "Booking in one tap", ru: "Бронь в одно касание", zh: "一键预订", tr: "Tek dokunuşla rezervasyon", ar: "حجز بلمسة واحدة" }, text: { en: "Each room card and CTA opens WhatsApp with a pre-filled message for that room type, plus direct call links.", ru: "Каждая карточка номера открывает WhatsApp с готовым сообщением под этот тип номера; есть и прямой звонок.", zh: "每张客房卡片和 CTA 都会打开 WhatsApp，并自动填入该房型的消息，另有直接拨号链接。", tr: "Her oda kartı ve CTA, o oda tipi için önceden doldurulmuş bir mesajla WhatsApp'ı açıyor; ayrıca doğrudan arama bağlantıları var.", ar: "تفتح كل بطاقة غرفة وكل زر دعوة إلى الإجراء WhatsApp برسالة معبّأة مسبقًا لنوع الغرفة، مع روابط اتصال مباشر." } },
      { title: { en: "3D starfield hero", ru: "Звёздный 3D-фон", zh: "3D 星空首屏", tr: "3D yıldız alanlı hero", ar: "خلفية نجوم ثلاثية الأبعاد" }, text: { en: "An animated Three.js scene in the first screen, loaded client-side only so it doesn't slow down rendering.", ru: "Анимированная сцена на Three.js в первом экране; грузится только на клиенте и не тормозит рендер.", zh: "首屏中的 Three.js 动画场景，仅在客户端加载，不拖慢渲染。", tr: "İlk ekranda animasyonlu bir Three.js sahnesi; yalnızca istemci tarafında yüklendiği için render'ı yavaşlatmıyor.", ar: "مشهد متحرك على Three.js في الشاشة الأولى، يُحمَّل على جانب العميل فقط حتى لا يُبطئ العرض." } },
      { title: { en: "Real photos and SEO", ru: "Реальные фото и SEO", zh: "真实照片与 SEO", tr: "Gerçek fotoğraflar ve SEO", ar: "صور حقيقية وSEO" }, text: { en: "Gallery and room carousels use the hotel's own photos; Hotel JSON-LD, Open Graph and sitemap help it show up in search.", ru: "Галерея и карусели номеров — на собственных фото отеля; JSON-LD, Open Graph и sitemap помогают в поиске.", zh: "图库和客房轮播均使用酒店自己的照片；Hotel JSON-LD、Open Graph 和 sitemap 有助于在搜索中展示。", tr: "Galeri ve oda karuselleri otelin kendi fotoğraflarını kullanıyor; Hotel JSON-LD, Open Graph ve sitemap aramalarda görünmesine yardımcı oluyor.", ar: "يعتمد المعرض ومعارض الغرف الدوّارة على صور الفندق نفسه؛ وتساعد بيانات Hotel بصيغة JSON-LD وOpen Graph وsitemap على الظهور في نتائج البحث." } },
    ],
    tags: { en: ["Next.js","React","TypeScript"], ru: ["Next.js","React","TypeScript"], zh: ["Next.js", "React", "TypeScript"], tr: ["Next.js", "React", "TypeScript"], ar: ["Next.js", "React", "TypeScript"] },
    stack: ["Next.js","React","TypeScript","Tailwind CSS","Framer Motion","Three.js","React Three Fiber","Vercel"],
    palette: ["#070B1A","#F0EEFF","#E8A598","#8B4FBE"],
  },
  {
    slug: "detailing-booking",
    title: { en: "BLIK", ru: "BLIK", zh: "BLIK", tr: "BLIK", ar: "BLIK" },
    client: { en: "Own white-label SaaS product for car detailing studios", ru: "Собственный white-label SaaS для студий детейлинга", zh: "面向汽车美容店的自有白标 SaaS 产品", tr: "Detailing stüdyoları için kendi white-label SaaS ürünümüz", ar: "منتج SaaS خاص بعلامة بيضاء لاستوديوهات العناية بالسيارات" },
    status: "built",
    category: "product",
    sphere: { en: "Automotive services", ru: "Автосервис и детейлинг", zh: "汽车服务", tr: "Otomotiv hizmetleri", ar: "خدمات السيارات" },
    format: { en: "Online booking and CRM platform (multi-tenant SaaS, PWA)", ru: "Платформа онлайн-записи и CRM (мультитенантный SaaS, PWA)", zh: "在线预约与 CRM 平台（多租户 SaaS，PWA）", tr: "Online rezervasyon ve CRM platformu (multi-tenant SaaS, PWA)", ar: "منصة حجز عبر الإنترنت وإدارة علاقات العملاء (SaaS متعدد المستأجرين، PWA)" },
    year: 2026,
    domain: "blik",
    cover: "/images/showcase/detailing-booking/cover.jpg",
    gallery: [
      { src: "/images/showcase/detailing-booking/screen-3.jpg", alt: { en: "BLIK — screen 3", ru: "BLIK — экран 3", zh: "BLIK — 第 3 屏", tr: "BLIK — ekran 3", ar: "BLIK — الشاشة 3" } },
    ],
    mobile: "/images/showcase/detailing-booking/mobile.jpg",
    admin: [
      { src: "/images/showcase/detailing-booking/screen-2.jpg", title: { en: "Studio dashboard: today's bookings, no-shows, revenue", ru: "Дашборд студии: записи на сегодня, неявки, выручка", zh: "门店仪表盘：今日预约、爽约、营收", tr: "Stüdyo paneli: bugünün rezervasyonları, gelmeyenler, gelir", ar: "لوحة الاستوديو: حجوزات اليوم، وحالات عدم الحضور، والإيرادات" } },
    ],
    summary: { en: "BLIK is a white-label platform that gives a detailing studio its own online booking page, an admin panel and a client base. One deployment serves many studios, each with its own branding, services, staff and feature set.", ru: "BLIK — white-label платформа, которая даёт студии детейлинга собственную страницу онлайн-записи, админку и базу клиентов. Одна установка обслуживает много студий, у каждой свои бренд, услуги, мастера и набор функций.", zh: "BLIK 是一个白标平台，为汽车美容店提供专属的在线预约页面、管理后台和客户库。一次部署即可服务多家门店，每家门店拥有自己的品牌、服务项目、员工和功能集。", tr: "BLIK, bir detailing stüdyosuna kendi online rezervasyon sayfasını, bir yönetim panelini ve bir müşteri tabanını sunan white-label bir platform. Tek bir kurulum, her biri kendi markasına, hizmetlerine, personeline ve özellik setine sahip birçok stüdyoya hizmet veriyor.", ar: "BLIK منصة بعلامة بيضاء تمنح استوديو العناية بالسيارات صفحة حجز خاصة عبر الإنترنت ولوحة إدارة وقاعدة عملاء. يخدم نشر واحد استوديوهات كثيرة، لكل منها هويتها وخدماتها وموظفوها ومجموعة ميزاتها." },
    review: {
      en: [
        "The product has three faces: a marketing landing that sells the platform, a public booking flow for the studio's customers, and an admin panel for the studio. A customer picks a service, a master and a free time slot in four steps; the studio sees bookings on a dashboard and a weekly calendar, manages services, staff and clients.",
        "The design is dark with gold accents and glass cards, a Cormorant Garamond serif for headings and Manrope for text. The interface works in Russian, Kyrgyz and English and installs on a phone as a PWA.",
        "Engineering-wise it is a multi-tenant Next.js app on Supabase: the tenant is resolved from the domain, features are gated per tariff (Starter / Pro / Enterprise) via feature flags, and a unique index prevents double booking of the same master and time. There is a read-only demo mode with mock data that works without a database, Telegram reminders via cron, Zod validation and Vitest unit tests.",
      ],
      ru: [
        "У продукта три части: лендинг, который продаёт саму платформу, публичная запись для клиентов студии и админка для владельца. Клиент за четыре шага выбирает услугу, мастера и свободное время; студия видит записи на дашборде и в недельном календаре, ведёт услуги, персонал и клиентов.",
        "Дизайн тёмный, с золотыми акцентами и «стеклянными» карточками; заголовки набраны антиквой Cormorant Garamond, текст — Manrope. Интерфейс доступен на русском, кыргызском и английском и ставится на телефон как PWA.",
        "Технически это мультитенантное приложение на Next.js и Supabase: студия определяется по домену, функции включаются по тарифу (Starter / Pro / Enterprise) через feature-флаги, а уникальный индекс в базе не даёт записать двух клиентов к одному мастеру на одно время. Есть демо-режим только для чтения на моковых данных, который работает без базы, напоминания в Telegram по крону, валидация на Zod и юнит-тесты на Vitest.",
      ],
      zh: ["产品有三个面向：推广平台的营销落地页、门店客户使用的公开预约流程，以及门店使用的管理后台。客户通过四步选好服务、技师和空闲时段；门店在仪表盘和周历中查看预约，并管理服务、员工和客户。", "设计为深色底，搭配金色点缀和玻璃质感卡片，标题使用 Cormorant Garamond 衬线字体，正文使用 Manrope。界面支持俄语、吉尔吉斯语和英语，并可作为 PWA 安装到手机上。", "工程方面，这是一个基于 Supabase 的多租户 Next.js 应用：租户由域名识别，功能按套餐（Starter / Pro / Enterprise）通过功能开关控制，并由唯一索引防止同一技师同一时间被重复预约。另有无需数据库即可运行、使用模拟数据的只读演示模式，通过 cron 发送 Telegram 提醒，以及 Zod 校验和 Vitest 单元测试。"],
      tr: ["Ürünün üç yüzü var: platformu satan bir pazarlama açılış sayfası, stüdyonun müşterileri için herkese açık bir rezervasyon akışı ve stüdyo için bir yönetim paneli. Müşteri dört adımda bir hizmet, bir usta ve boş bir zaman dilimi seçiyor; stüdyo rezervasyonları bir panoda ve haftalık takvimde görüyor, hizmetleri, personeli ve müşterileri yönetiyor.", "Tasarım altın vurgulu ve cam kartlı koyu bir tema; başlıklarda Cormorant Garamond serif, metinde Manrope kullanılıyor. Arayüz Rusça, Kırgızca ve İngilizce çalışıyor ve telefona PWA olarak kurulabiliyor.", "Mühendislik tarafında Supabase üzerinde çalışan multi-tenant bir Next.js uygulaması: tenant alan adından çözümleniyor, özellikler tarifeye göre (Starter / Pro / Enterprise) feature flag'lerle kapatılıp açılıyor ve benzersiz bir indeks aynı usta ve saat için çifte rezervasyonu engelliyor. Veritabanı olmadan çalışan, sahte verili salt okunur bir demo modu, cron ile Telegram hatırlatmaları, Zod doğrulaması ve Vitest birim testleri var."],
      ar: ["للمنتج ثلاثة وجوه: صفحة هبوط تسويقية تبيع المنصة، ومسار حجز عام لعملاء الاستوديو، ولوحة إدارة للاستوديو. يختار العميل الخدمة والفني والموعد الشاغر في أربع خطوات؛ ويرى الاستوديو الحجوزات على لوحة المؤشرات وفي تقويم أسبوعي، ويدير الخدمات والموظفين والعملاء.", "التصميم داكن بلمسات ذهبية وبطاقات زجاجية، بخط Cormorant Garamond للعناوين وManrope للنصوص. تعمل الواجهة بالروسية والقرغيزية والإنجليزية، وتُثبَّت على الهاتف كـ PWA.", "هندسيًا هو تطبيق Next.js متعدد المستأجرين على Supabase: يُحدَّد المستأجر من النطاق، وتُفعَّل الميزات حسب الباقة (Starter / Pro / Enterprise) عبر أعلام الميزات، ويمنع فهرس فريد الحجز المزدوج لنفس الفني والوقت. وهناك وضع تجريبي للقراءة فقط ببيانات وهمية يعمل بلا قاعدة بيانات، وتذكيرات عبر Telegram بالجدولة، والتحقق عبر Zod، واختبارات وحدة بـ Vitest."],
    },
    features: [
      { title: { en: "4-step online booking", ru: "Запись в 4 шага", zh: "4 步在线预约", tr: "4 adımda online rezervasyon", ar: "حجز عبر الإنترنت في 4 خطوات" }, text: { en: "Service, master, time slot, confirmation — free slots are calculated from working hours and existing bookings.", ru: "Услуга, мастер, время, подтверждение — свободные слоты считаются по графику работы и уже занятым записям.", zh: "服务、技师、时段、确认——空闲时段根据工作时间和已有预约自动计算。", tr: "Hizmet, usta, zaman dilimi, onay; boş saatler çalışma saatlerinden ve mevcut rezervasyonlardan hesaplanıyor.", ar: "الخدمة، والفني، والموعد، والتأكيد، وتُحسب المواعيد الشاغرة من ساعات العمل والحجوزات القائمة." } },
      { title: { en: "Studio admin panel", ru: "Админка студии", zh: "门店管理后台", tr: "Stüdyo yönetim paneli", ar: "لوحة إدارة الاستوديو" }, text: { en: "Dashboard with today's bookings and no-shows, weekly calendar, services, staff and client history.", ru: "Дашборд с записями на сегодня и неявками, недельный календарь, услуги, персонал и история клиентов.", zh: "仪表盘展示今日预约和爽约，另有周历、服务项目、员工和客户历史。", tr: "Bugünün rezervasyonları ve gelmeyenleri gösteren pano, haftalık takvim, hizmetler, personel ve müşteri geçmişi.", ar: "لوحة مؤشرات بحجوزات اليوم وحالات عدم الحضور، وتقويم أسبوعي، والخدمات والموظفون وسجل العملاء." } },
      { title: { en: "Multi-tenant with tariffs", ru: "Мультитенантность и тарифы", zh: "多租户与套餐", tr: "Tarifeli multi-tenant yapı", ar: "تعدد المستأجرين مع الباقات" }, text: { en: "Each studio gets its own branding and domain; Starter/Pro/Enterprise features are switched by feature flags.", ru: "У каждой студии свой бренд и домен; возможности Starter/Pro/Enterprise включаются feature-флагами.", zh: "每家门店拥有自己的品牌和域名；Starter/Pro/Enterprise 的功能由功能开关控制。", tr: "Her stüdyo kendi markasını ve alan adını alıyor; Starter/Pro/Enterprise özellikleri feature flag'lerle açılıp kapanıyor.", ar: "لكل استوديو هويته ونطاقه؛ وتُفعَّل ميزات Starter وPro وEnterprise بأعلام الميزات." } },
    ],
    tags: { en: ["Next.js","React","TypeScript"], ru: ["Next.js","React","TypeScript"], zh: ["Next.js", "React", "TypeScript"], tr: ["Next.js", "React", "TypeScript"], ar: ["Next.js", "React", "TypeScript"] },
    stack: ["Next.js","React","TypeScript","Supabase (PostgreSQL)","NextAuth","next-intl","Tailwind CSS","Radix UI","Zod","Vitest","PWA","Vercel"],
    palette: ["#0A0A0B","#FFFFFF","#D4AF37","#F5D77A"],
  },
  {
    slug: "go-market",
    stage: "radial-gradient(circle at 18% 22%, #FFE45C 0%, transparent 38%), radial-gradient(circle at 86% 78%, #FF9F43 0%, transparent 42%), radial-gradient(circle at 80% 15%, #FF6B6B 0%, transparent 30%), linear-gradient(135deg, #C6F57A 0%, #63D471 55%, #2FB463 100%)",
    decor: ["🍎", "🥑", "🍋", "🥕", "🍇", "🍓", "🥦", "🍊", "🍌", "🥛", "🍞", "🧀"],
    title: { en: "Go Market", ru: "Go Market", zh: "Go Market", tr: "Go Market", ar: "Go Market" },
    client: { en: "A grocery delivery service in Kyrgyzstan selling on instalments", ru: "Сервис доставки продуктов по Кыргызстану с оплатой в рассрочку", zh: "吉尔吉斯斯坦的生鲜配送服务，支持分期付款", tr: "Kırgızistan'da taksitle satış yapan bir market teslimat servisi", ar: "خدمة توصيل بقالة في قرغيزستان تبيع بالتقسيط" },
    status: "built",
    category: "product",
    sphere: { en: "Grocery e-commerce & fintech", ru: "Продуктовый e-commerce и финтех", zh: "生鲜电商与金融科技", tr: "Market e-ticareti ve fintech", ar: "تجارة إلكترونية للبقالة وتقنية مالية" },
    format: { en: "Grocery delivery PWA with staff cabinet", ru: "PWA доставки продуктов с рабочим кабинетом", zh: "带员工后台的生鲜配送 PWA", tr: "Personel panelli market teslimat PWA'sı", ar: "PWA لتوصيل البقالة مع لوحة للموظفين" },
    year: 2026,
    domain: "go market",
    cover: "/images/showcase/go-market/cover.jpg",
    phones: ["/images/showcase/go-market/phone-1.jpg","/images/showcase/go-market/phone-2.jpg"],
    admin: [
      { src: "/images/showcase/go-market/screen-2.jpg", title: { en: "Orders: live queue for the shift", ru: "Заказы: живая очередь смены", zh: "订单：当班实时队列", tr: "Siparişler: vardiya için canlı kuyruk", ar: "الطلبات: طابور مباشر للمناوبة" } },
      { src: "/images/showcase/go-market/screen-3.jpg", title: { en: "Catalog with stock and prices", ru: "Каталог с остатками и ценами", zh: "带库存和价格的商品目录", tr: "Stok ve fiyatlı katalog", ar: "كتالوج بالمخزون والأسعار" } },
    ],
    summary: { en: "A bilingual (Russian/Kyrgyz) grocery delivery PWA where customers pay through Cash2U instalments, built for low-cost Android phones and unstable mobile internet. A staff cabinet covers the whole order cycle from picking and amount confirmation to courier routes and payments.", ru: "Двуязычная (русский/кыргызский) PWA доставки продуктов с оплатой в рассрочку через Cash2U, рассчитанная на недорогие Android-смартфоны и нестабильный мобильный интернет. Рабочий кабинет закрывает весь цикл заказа — от сборки и подтверждения суммы до маршрута курьера и платежей.", zh: "一款双语（俄语/吉尔吉斯语）的生鲜配送 PWA，顾客可通过 Cash2U 分期付款，专为低价 Android 手机和不稳定的移动网络打造。员工后台覆盖订单的完整流程，从拣货、金额确认到骑手路线和付款。", tr: "Müşterilerin Cash2U taksitleriyle ödeme yaptığı, düşük maliyetli Android telefonlar ve kararsız mobil internet için geliştirilmiş iki dilli (Rusça/Kırgızca) bir market teslimat PWA'sı. Bir personel paneli, toplama ve tutar onayından kurye rotalarına ve ödemelere kadar tüm sipariş döngüsünü kapsıyor.", ar: "PWA ثنائية اللغة (الروسية والقرغيزية) لتوصيل البقالة، يدفع فيها العملاء بالتقسيط عبر Cash2U، ومصممة لهواتف Android الاقتصادية وللإنترنت المتقطع على الجوال. وتغطي لوحة الموظفين دورة الطلب كاملة، من التجهيز وتأكيد المبلغ إلى مسارات المندوبين والمدفوعات." },
    review: {
      en: [
        "The storefront is server-rendered with a light bundle and can be installed to the home screen; customers sign in with a one-time SMS code and get web push notifications. Goods can be sold by the piece or by weight, so weighed items show an approximate price per 100 g. After picking, the order total is recalculated, the customer confirms the final amount, and only then is the instalment invoice issued with Cash2U over mutual TLS.",
        "The staff cabinet has separate roles for administrator, operator, picker and courier. It covers orders with a queue of those awaiting amount confirmation, a picking screen, courier routes, payments, the catalog with stock levels, categories, delivery zones and geography, banners, push campaigns, people and an audit log. The app is a standalone Next.js build on a server in Kyrgyzstan with managed PostgreSQL, chosen for latency and in-country data storage.",
      ],
      ru: [
        "Витрина рендерится на сервере, бандл лёгкий, приложение ставится на главный экран; вход по одноразовому SMS-коду, возврат клиентов через web push. Товары продаются поштучно и на вес, поэтому у весовых позиций показана ориентировочная цена за 100 г. После сборки сумма заказа пересчитывается, клиент подтверждает итог, и только после этого выставляется счёт на рассрочку в Cash2U по mTLS.",
        "В рабочем кабинете отдельные роли: администратор, оператор, сборщик и курьер. В нём заказы с очередью «ждут подтверждения суммы», экран сборки, маршрут курьера, платежи, каталог с остатками, категории, зоны доставки и география, баннеры, рассылки, люди и журнал действий. Приложение собрано как standalone-сборка Next.js и работает на сервере в Кыргызстане с управляемым PostgreSQL — ради задержки до базы и хранения данных внутри страны.",
      ],
      zh: ["前台商城采用服务端渲染，包体轻量，可安装到主屏幕；顾客通过一次性短信验证码登录，并接收 Web 推送通知。商品可按件或按重量销售，称重商品会显示每 100 克的大致价格。拣货完成后会重新计算订单总额，由顾客确认最终金额，随后才通过双向 TLS 在 Cash2U 开具分期账单。", "员工后台设有管理员、客服、拣货员和骑手等独立角色。涵盖订单（含待确认金额队列）、拣货界面、骑手路线、付款、带库存的商品目录、分类、配送区域与地理信息、横幅、推送活动、人员以及审计日志。应用是部署在吉尔吉斯斯坦服务器上的独立 Next.js 构建，使用托管 PostgreSQL，选择这一方案是出于延迟和数据境内存储的考虑。"],
      tr: ["Vitrin sunucu tarafında render ediliyor, hafif bir paket kullanıyor ve ana ekrana eklenebiliyor; müşteriler tek kullanımlık SMS koduyla giriş yapıyor ve web push bildirimleri alıyor. Ürünler adetle veya tartıyla satılabiliyor; tartılan ürünlerde 100 g başına yaklaşık fiyat gösteriliyor. Toplamadan sonra sipariş tutarı yeniden hesaplanıyor, müşteri nihai tutarı onaylıyor ve taksit faturası ancak ondan sonra Cash2U ile karşılıklı TLS üzerinden düzenleniyor.", "Personel panelinde yönetici, operatör, toplayıcı ve kurye için ayrı roller var. Tutar onayı bekleyenlerin kuyruğunu içeren siparişleri, toplama ekranını, kurye rotalarını, ödemeleri, stok seviyeli kataloğu, kategorileri, teslimat bölgelerini ve coğrafyayı, bannerları, push kampanyalarını, kişileri ve bir denetim günlüğünü kapsıyor. Uygulama, Kırgızistan'daki bir sunucuda yönetilen PostgreSQL ile bağımsız bir Next.js derlemesi olarak çalışıyor; gecikme ve verilerin ülke içinde saklanması için bu tercih yapıldı."],
      ar: ["المتجر يُعرض من الخادم بحزمة خفيفة ويمكن تثبيته على الشاشة الرئيسية؛ يسجّل العملاء الدخول برمز SMS لمرة واحدة ويتلقون إشعارات web push. وتُباع السلع بالقطعة أو بالوزن، فتعرض المنتجات الموزونة سعرًا تقريبيًا لكل 100 غ. وبعد التجهيز يُعاد حساب إجمالي الطلب، ويؤكد العميل المبلغ النهائي، ثم فقط تصدر فاتورة التقسيط مع Cash2U عبر mTLS.", "تضم لوحة الموظفين أدوارًا منفصلة للمدير والمشغّل ومجهّز الطلبات والمندوب. وتغطي الطلبات مع طابور بانتظار تأكيد المبلغ، وشاشة تجهيز، ومسارات المندوبين، والمدفوعات، والكتالوج بمستويات المخزون، والفئات، ومناطق التوصيل والجغرافيا، واللافتات، وحملات push، والأشخاص، وسجل تدقيق. والتطبيق إصدار Next.js مستقل على خادم في قرغيزستان مع PostgreSQL مُدار، اختير لسرعة الاستجابة ولتخزين البيانات داخل البلد."],
    },
    features: [
      { title: { en: "Instalment checkout via Cash2U", ru: "Рассрочка через Cash2U", zh: "通过 Cash2U 分期结账", tr: "Cash2U ile taksitli ödeme", ar: "الدفع بالتقسيط عبر Cash2U" }, text: { en: "The invoice is issued only after picking and the customer's confirmation of the final amount, so weighed goods are billed exactly.", ru: "Счёт выставляется только после сборки и подтверждения итоговой суммы клиентом, поэтому весовой товар оплачивается точно.", zh: "账单仅在拣货并由顾客确认最终金额后开具，因此称重商品能精确计费。", tr: "Fatura yalnızca toplamadan ve müşterinin nihai tutarı onaylamasından sonra düzenleniyor; böylece tartılan ürünler tam tutarıyla faturalanıyor.", ar: "لا تصدر الفاتورة إلا بعد التجهيز وتأكيد العميل للمبلغ النهائي، فتُحاسَب السلع الموزونة بدقة." } },
      { title: { en: "Two languages, weak networks", ru: "Два языка и слабая сеть", zh: "双语言，弱网络", tr: "İki dil, zayıf ağlar", ar: "لغتان وشبكات ضعيفة" }, text: { en: "Russian and Kyrgyz storefront, server rendering, offline page, SMS login and web push for budget Android phones.", ru: "Витрина на русском и кыргызском, серверный рендеринг, офлайн-страница, вход по SMS и web push для бюджетных Android.", zh: "俄语和吉尔吉斯语商城、服务端渲染、离线页面、短信登录，以及面向低端 Android 手机的 Web 推送。", tr: "Bütçe dostu Android telefonlar için Rusça ve Kırgızca vitrin, sunucu tarafı render, çevrimdışı sayfa, SMS ile giriş ve web push.", ar: "متجر بالروسية والقرغيزية، وعرض من الخادم، وصفحة دون اتصال، وتسجيل دخول عبر SMS، وweb push لهواتف Android الاقتصادية." } },
      { title: { en: "Role-based staff cabinet", ru: "Кабинет с ролями", zh: "基于角色的员工后台", tr: "Rol tabanlı personel paneli", ar: "لوحة موظفين بأدوار" }, text: { en: "Administrator, operator, picker and courier each see their part: orders, picking, routes, payments, catalog and stock, zones.", ru: "Администратор, оператор, сборщик и курьер видят свою часть: заказы, сборку, маршруты, платежи, каталог и остатки, зоны.", zh: "管理员、客服、拣货员和骑手各自查看自己负责的部分：订单、拣货、路线、付款、商品目录与库存、区域。", tr: "Yönetici, operatör, toplayıcı ve kurye kendi payına düşeni görüyor: siparişler, toplama, rotalar, ödemeler, katalog ve stok, bölgeler.", ar: "يرى المدير والمشغّل ومجهّز الطلبات والمندوب كلٌّ حصته: الطلبات والتجهيز والمسارات والمدفوعات والكتالوج والمخزون والمناطق." } },
    ],
    tags: { en: ["Next.js 16","React 19","TypeScript"], ru: ["Next.js 16","React 19","TypeScript"], zh: ["Next.js 16", "React 19", "TypeScript"], tr: ["Next.js 16", "React 19", "TypeScript"], ar: ["Next.js 16", "React 19", "TypeScript"] },
    stack: ["Next.js 16","React 19","TypeScript","PostgreSQL","Drizzle ORM","Tailwind CSS 4","Konsta UI","Radix UI","zod","Web Push (VAPID)","Vitest","PGlite","Playwright"],
    palette: ["#F5F5F7","#1C1C1E","#0062CC","#00A700"],
  },
  {
    slug: "avtodom",
    title: { en: "Avtodom", ru: "Avtodom", zh: "Avtodom", tr: "Avtodom", ar: "Avtodom" },
    client: { en: "An oil-change station with a motor-oil shop", ru: "Точка замены масла с магазином автомасел", zh: "一家带机油商店的换油站", tr: "Motor yağı mağazası olan bir yağ değişim noktası", ar: "محطة لتغيير الزيت مع متجر لزيوت المحركات" },
    status: "built",
    category: "product",
    sphere: { en: "Car service / oil change", ru: "Автосервис / замена масла", zh: "汽车服务 / 换油", tr: "Oto servis / yağ değişimi", ar: "خدمة السيارات / تغيير الزيت" },
    format: { en: "Accounting PWA for the till, warehouse and owner, with a Telegram bot", ru: "Учётная PWA для кассы, склада и владельца с Телеграм-ботом", zh: "面向收银台、仓库和老板的记账 PWA，附 Telegram 机器人", tr: "Kasa, depo ve işletme sahibi için Telegram botlu muhasebe PWA'sı", ar: "تطبيق PWA محاسبي للصندوق والمستودع والمالك مع بوت Telegram" },
    year: 2026,
    domain: "avtodom",
    signature: { en: "Oil-change log from every receipt", ru: "Масляная книжка из каждого чека", zh: "每张小票自动写入换油记录", tr: "Her fişten yağ değişim defteri", ar: "سجل تغيير الزيت من كل إيصال" },
    metrics: [
      { value: "1 670", label: { en: "automated tests, server and client", ru: "автотестов на сервере и клиенте", zh: "项服务端与客户端自动化测试", tr: "sunucu ve istemci otomatik testi", ar: "اختبارًا آليًا للخادم والعميل" } },
      { value: "196", label: { en: "recorded architecture decisions", ru: "записанных архитектурных решений", zh: "条已记录的架构决策", tr: "kayıtlı mimari karar", ar: "قرارًا معماريًا موثقًا" } },
      { value: "263", label: { en: "server API routes", ru: "маршрута серверного API", zh: "个服务端 API 路由", tr: "sunucu API rotası", ar: "مسارًا في واجهة الخادم" } },
      { value: "95", label: { en: "event types in owner's Telegram feed", ru: "событий в телеграм-ленте владельца", zh: "类老板 Telegram 推送事件", tr: "sahibin Telegram akışında olay", ar: "نوع حدث في موجز المالك" } },
    ],
    cover: "/images/showcase/avtodom/cover.jpg",
    heroScene: true,
    admin: [
      { src: "/images/showcase/avtodom/screen-2.jpg", title: { en: "Till: an oil change with the car's history", ru: "Касса: замена масла с историей машины", zh: "收银台：带车辆历史的换油单", tr: "Kasa: aracın geçmişiyle yağ değişimi", ar: "الصندوق: تغيير زيت مع سجل السيارة" } },
      { src: "/images/showcase/avtodom/screen-3.jpg", title: { en: "Customer car's oil-change log", ru: "Масляная книжка машины клиента", zh: "客户车辆的换油记录本", tr: "Müşteri aracının yağ değişim defteri", ar: "سجل تغيير الزيت لسيارة العميل" } },
      { src: "/images/showcase/avtodom/screen-4.jpg", title: { en: "Shift, cash accounts and staff earnings", ru: "Смена, кассы и заработок сотрудников", zh: "班次、资金账户与员工收入", tr: "Vardiya, kasalar ve personel kazancı", ar: "الوردية والصناديق وأرباح الموظفين" } },
    ],
    summary: { en: "An accounting system for an oil-change station with a motor-oil shop: till, warehouse, customers with an electronic oil-change log, staff pay and the owner's daily profit. It runs on the till PC, the warehouse laptop and the owner's phone, and the till keeps selling without internet.", ru: "Учётная система для точки замены масла и магазина автомасел: касса, склад, клиенты с электронной масляной книжкой, расчёт сотрудников и прибыль владельца за день. Работает на моноблоке кассы, ноутбуке склада и телефоне владельца, а касса продаёт и без интернета.", zh: "为换油站及机油商店打造的记账系统：收银、仓库、带电子换油记录本的客户档案、员工结算以及老板的每日利润。它运行在收银一体机、仓库笔记本和老板的手机上，断网时收银台也能继续销售。", tr: "Motor yağı mağazası olan bir yağ değişim noktası için muhasebe sistemi: kasa, depo, elektronik yağ değişim defterli müşteriler, personel hesabı ve sahibin günlük kârı. Kasadaki bilgisayarda, depo dizüstüsünde ve sahibin telefonunda çalışıyor; kasa internet olmadan da satış yapıyor.", ar: "نظام محاسبة لمحطة تغيير زيت مع متجر لزيوت المحركات: الصندوق والمستودع والعملاء مع سجل إلكتروني لتغيير الزيت وحساب أجور الموظفين وربح المالك اليومي. يعمل على حاسوب الصندوق وحاسوب المستودع المحمول وهاتف المالك، ويواصل الصندوق البيع دون إنترنت." },
    review: {
      en: [
        "The server is Rust (Axum, SQLx) on PostgreSQL 16; one React PWA serves the till, the warehouse and the owner's phone. Money is stored in whole tyiyn and oil in millilitres, so a canister and oil poured by the litre come from the same stock, and stock and cost are always the sum of movements. Around the core sit a Telegram bot, WhatsApp messages, Optima bank QR payments, supplier-invoice photo parsing and print stations for receipts, oil-log stickers and labels.",
        "Posted documents cannot be edited or deleted: 48 tables are protected by database triggers, a mistake is fixed with a reversal, and repeating an operation with the same op_id never creates a duplicate. The till first puts every receipt into a queue on the device, so sales do not stop when the connection drops. The rules live in 40 specifications and 196 ADRs and are checked by about 1,700 automated tests, 250 of them end-to-end in the browser.",
      ],
      ru: [
        "Сервер на Rust (Axum, SQLx) с PostgreSQL 16, одно PWA на React работает на кассе, на складе и в телефоне владельца. Деньги хранятся в целых тыйынах, масло — в миллилитрах: канистра и розлив списываются с одного остатка, а остаток и себестоимость всегда равны сумме движений. Вокруг ядра — Телеграм-бот, сообщения в WhatsApp, QR-оплата банка Optima, разбор фото накладных и станции печати чеков, наклеек книжки и этикеток.",
        "Проведённый документ нельзя изменить или удалить: 48 таблиц защищены триггерами базы, ошибку исправляет сторно, а повтор операции с тем же op_id не создаёт дубль. Касса сначала кладёт чек в очередь на устройстве, поэтому продажа не останавливается при обрыве связи. Правила записаны в 40 спецификациях и 196 ADR, их проверяют около 1 700 автотестов, из них 250 — сквозные в браузере.",
      ],
      zh: [
        "服务端采用 Rust（Axum、SQLx）和 PostgreSQL 16，同一个 React PWA 同时用于收银台、仓库和老板的手机。金额以整数提因（tyiyn）存储，机油以毫升计量：整桶销售和按升散装从同一库存扣减，库存和成本始终等于各项变动之和。核心之外还有 Telegram 机器人、WhatsApp 消息、Optima 银行二维码收款、供应商发票照片识别，以及打印小票、换油记录贴纸和商品标签的打印站。",
        "已过账的单据无法修改或删除：48 张数据表由数据库触发器保护，错误通过冲销单据更正，使用相同 op_id 重复提交的操作不会产生重复记录。收银台先把每张小票放进设备上的队列，因此断网时销售也不会中断。业务规则写在 40 份规格说明和 196 条 ADR 中，并由约 1,700 个自动化测试校验，其中 250 个是浏览器端到端测试。",
      ],
      tr: [
        "Sunucu Rust (Axum, SQLx) ve PostgreSQL 16 üzerinde; tek bir React PWA kasada, depoda ve sahibin telefonunda çalışıyor. Para tam tyiyn, yağ mililitre olarak saklanıyor: bidonla ve litreyle açık satış aynı stoktan düşüyor, stok ve maliyet her zaman hareketlerin toplamına eşit. Çekirdeğin etrafında bir Telegram botu, WhatsApp mesajları, Optima bankası QR ödemeleri, tedarikçi faturası fotoğraflarının okunması ve fiş, defter etiketi ve ürün etiketi baskı istasyonları yer alıyor.",
        "Kaydedilmiş bir belge değiştirilemiyor ve silinemiyor: 48 tablo veritabanı tetikleyicileriyle korunuyor, hata ters kayıtla düzeltiliyor ve aynı op_id ile tekrarlanan işlem kopya oluşturmuyor. Kasa her fişi önce cihazdaki bir kuyruğa koyuyor; bu yüzden bağlantı kopsa da satış durmuyor. Kurallar 40 spesifikasyon ve 196 ADR'de yazılı; bunları 250'si tarayıcıda uçtan uca olmak üzere yaklaşık 1.700 otomatik test denetliyor.",
      ],
      ar: [
        "الخادم مكتوب بلغة Rust (Axum وSQLx) مع PostgreSQL 16، وتطبيق PWA واحد بـ React يعمل على الصندوق وفي المستودع وعلى هاتف المالك. تُخزَّن الأموال بوحدات التيين الصحيحة والزيت بالمليلتر: فالعبوة والزيت المسكوب باللتر يُخصمان من المخزون نفسه، ويساوي المخزون والتكلفة دائمًا مجموع الحركات. وحول النواة بوت Telegram ورسائل WhatsApp ومدفوعات QR من بنك Optima وقراءة صور فواتير الموردين ومحطات لطباعة الإيصالات وملصقات السجل وبطاقات الأسعار.",
        "لا يمكن تعديل المستند المُرحَّل أو حذفه: 48 جدولًا محمية بمشغّلات قاعدة البيانات، ويُصحَّح الخطأ بقيد عكسي، ولا يُنشئ تكرار العملية بالمعرّف op_id نفسه نسخة مكررة. يضع الصندوق كل إيصال أولًا في طابور على الجهاز، لذلك لا يتوقف البيع عند انقطاع الاتصال. القواعد مدوّنة في 40 مواصفة و196 قرارًا معماريًا (ADR)، ويتحقق منها نحو 1,700 اختبار آلي، منها 250 اختبارًا شاملًا في المتصفح.",
      ],
    },
    features: [
      { title: { en: "Oil-change till", ru: "Касса для замены масла", zh: "换油收银台", tr: "Yağ değişimi kasası", ar: "صندوق لتغيير الزيت" }, text: { en: "Canister or oil by the litre, service type, master and his rate, customer, car and mileage in one receipt. The barcode scanner works as a keyboard, a second screen shows the bank QR and takes the customer's signature for a debt, and receipts queue on the device when offline.", ru: "Канистра или розлив в литрах, вид замены, мастер и его ставка, клиент, машина и пробег — в одном чеке. Сканер штрихкодов работает как клавиатура, второй экран показывает QR банка и принимает подпись клиента за долг, без сети чеки копятся в очереди устройства.", zh: "整桶或按升散装、服务类型、技师及其提成、客户、车辆和里程，全部在一张小票中完成。扫码枪以键盘模式工作，第二块屏幕显示银行二维码并采集客户的赊账签名，断网时小票在设备队列中排队。", tr: "Bidon ya da litreyle açık yağ, hizmet türü, usta ve ücreti, müşteri, araç ve kilometre tek fişte. Barkod okuyucu klavye gibi çalışıyor, ikinci ekran banka QR'ını gösterip borç için müşteri imzasını alıyor, internet yokken fişler cihazdaki kuyrukta bekliyor.", ar: "العبوة أو الزيت باللتر ونوع الخدمة والفني وأجره والعميل والسيارة وعدد الكيلومترات في إيصال واحد. يعمل ماسح الباركود كلوحة مفاتيح، وتعرض الشاشة الثانية رمز QR البنكي وتأخذ توقيع العميل على الدين، ومن دون اتصال تنتظر الإيصالات في طابور الجهاز." } },
      { title: { en: "Electronic oil-change log", ru: "Электронная масляная книжка", zh: "电子换油记录本", tr: "Elektronik yağ değişim defteri", ar: "سجل إلكتروني لتغيير الزيت" }, text: { en: "Every service receipt writes the oil, filters, mileage and next change into the car's log; old paper records can be added by hand. The log prints as stickers on the till printer, and customers see their cars, reminders and loyalty points in the Telegram bot.", ru: "Каждый чек «в сервис» записывает в книжку машины масло, фильтры, пробег и следующую замену; старые записи из тетради вносятся вручную. Книжка печатается наклейками на чековом принтере, а клиент видит свои машины, напоминания и баллы в Телеграм-боте.", zh: "每张维修小票都会把机油、滤芯、里程和下次更换写入车辆记录本；旧的纸质记录可手动补录。记录本可在小票打印机上打印成贴纸，客户在 Telegram 机器人中查看自己的车辆、提醒和积分。", tr: "Her servis fişi yağı, filtreleri, kilometreyi ve bir sonraki değişimi aracın defterine yazıyor; eski kâğıt kayıtlar elle ekleniyor. Defter fiş yazıcısında etiket olarak basılıyor, müşteri araçlarını, hatırlatmaları ve puanlarını Telegram botunda görüyor.", ar: "كل إيصال خدمة يكتب في سجل السيارة الزيت والفلاتر وعدد الكيلومترات والتغيير التالي، وتُضاف السجلات الورقية القديمة يدويًا. يُطبع السجل ملصقات على طابعة الإيصالات، ويرى العميل سياراته والتذكيرات ونقاط الولاء في بوت Telegram." } },
      { title: { en: "Owner's money and profit", ru: "Деньги и прибыль владельца", zh: "老板的资金与利润", tr: "Sahibin parası ve kârı", ar: "أموال المالك وأرباحه" }, text: { en: "Shifts and cash accounts, master and cashier pay, expenses, debts and reconciliation acts, profit by day and period. Admins get 35 separate permissions and never receive cost or margin from the server; the owner gets a phone dashboard and a Telegram feed of 95 event types.", ru: "Смены и кассы, расчёт мастеров и кассиров, расходы, долги и акты сверки, прибыль за день и период. У администраторов 35 отдельных прав, себестоимость и маржу сервер им не отдаёт; владельцу — сводка на телефоне и лента из 95 видов событий в Телеграме.", zh: "班次与资金账户、技师和收银员结算、费用、欠款与对账单、按日和按期间的利润。管理员有 35 项独立权限，服务端从不向其返回成本和毛利；老板则有手机端概览和包含 95 类事件的 Telegram 推送。", tr: "Vardiyalar ve kasalar, usta ve kasiyer ödemeleri, giderler, borçlar ve mutabakat tutanakları, günlük ve dönemlik kâr. Yöneticilerin 35 ayrı yetkisi var ve sunucu onlara maliyet ve marj göndermiyor; sahibe telefonda özet ve 95 olay türlü bir Telegram akışı.", ar: "الورديات والصناديق وأجور الفنيين وأمناء الصندوق والمصروفات والديون ومحاضر المطابقة والربح باليوم والفترة. للمسؤولين 35 صلاحية منفصلة ولا يرسل لهم الخادم التكلفة أو الهامش أبدًا، وللمالك لوحة على الهاتف وموجز Telegram بـ 95 نوعًا من الأحداث." } },
    ],
    tags: { en: ["Rust","PostgreSQL","React"], ru: ["Rust","PostgreSQL","React"], zh: ["Rust", "PostgreSQL", "React"], tr: ["Rust", "PostgreSQL", "React"], ar: ["Rust", "PostgreSQL", "React"] },
    stack: ["Rust","PostgreSQL 16","React 19","Axum","SQLx","TypeScript","Vite","Tailwind CSS 4","PWA (Workbox, IndexedDB)","Playwright","Telegram Bot API","WhatsApp Cloud API","Docker Compose","Caddy"],
    palette: ["#F1F5F9","#0F172A","#0284C7","#047857"],
  },
  {
    slug: "anarmarket",
    signature: { en: "Invoice photo → Microinvest request", ru: "Фото накладной → заявка в Microinvest", zh: "发票照片 → Microinvest 采购单", tr: "Fatura fotoğrafı → Microinvest talebi", ar: "صورة الفاتورة ← طلب في Microinvest" },
    stage: "radial-gradient(circle at 20% 22%, #F2C14E 0%, transparent 38%), radial-gradient(circle at 84% 80%, #7BB661 0%, transparent 42%), radial-gradient(circle at 82% 14%, #E8553A 0%, transparent 30%), linear-gradient(135deg, #3A0D14 0%, #6B1A26 55%, #A8323F 100%)",
    decor: ["🥔", "🧅", "🥕", "🍅", "🥒", "🍋", "🥚", "🧈", "🌾", "🫒", "🧽", "🧻"],
    title: { en: "AnarMarket", ru: "Анар Маркет", zh: "AnarMarket", tr: "AnarMarket", ar: "AnarMarket" },
    client: { en: "A wholesale supplier of food and household goods for restaurants, cafés and private buyers in Bishkek", ru: "Оптовый поставщик продуктов и хозтоваров для ресторанов, кафе и частных покупателей в Бишкеке", zh: "比什凯克一家为餐厅、咖啡馆和个人买家供应食品与日用品的批发商", tr: "Bişkek'te restoranlara, kafelere ve bireysel alıcılara gıda ve ev ürünleri sağlayan bir toptancı", ar: "مورّد جملة للمواد الغذائية والسلع المنزلية للمطاعم والمقاهي والمشترين الأفراد في بيشكيك" },
    status: "built",
    category: "product",
    sphere: { en: "Wholesale trade / HoReCa", ru: "Оптовая торговля / HoReCa", zh: "批发贸易 / 餐饮业", tr: "Toptan ticaret / HoReCa", ar: "تجارة الجملة / قطاع الضيافة" },
    format: { en: "PWA storefront, staff panel and a Microinvest sync agent", ru: "PWA-витрина, панель сотрудников и агент связи с Microinvest", zh: "PWA 商城、员工后台与 Microinvest 同步代理", tr: "PWA vitrin, personel paneli ve Microinvest senkronizasyon ajanı", ar: "متجر PWA ولوحة للموظفين ووكيل مزامنة مع Microinvest" },
    year: 2026,
    domain: "anarmarket",
    cover: "/images/showcase/anarmarket/cover.jpg",
    heroScene: true,
    phones: ["/images/showcase/anarmarket/phone-1.jpg", "/images/showcase/anarmarket/phone-2.jpg", "/images/showcase/anarmarket/phone-3.jpg"],
    admin: [
      { src: "/images/showcase/anarmarket/admin-1.jpg", title: { en: "Order: weight from the Microinvest sale, overweight flagged", ru: "Заказ: вес из продажи Microinvest и перевес", zh: "订单：重量取自 Microinvest 销售单，超重已标记", tr: "Sipariş: ağırlık Microinvest satışından, fazla ağırlık işaretli", ar: "الطلب: الوزن من بيع Microinvest مع تمييز الوزن الزائد" } },
      { src: "/images/showcase/anarmarket/admin-2.jpg", title: { en: "Supplier invoice photo parsed by AI", ru: "Фото накладной поставщика, разобранное ИИ", zh: "AI 解析的供应商发票照片", tr: "Yapay zekânın okuduğu tedarikçi faturası fotoğrafı", ar: "صورة فاتورة المورّد بعد تحليلها بالذكاء الاصطناعي" } },
      { src: "/images/showcase/anarmarket/admin-3.jpg", title: { en: "Customer balance: payment terms and overdue invoices", ru: "Расчёты покупателя: отсрочка и просрочка", zh: "客户结算：账期与逾期发票", tr: "Müşteri hesabı: vade ve gecikmiş faturalar", ar: "حساب العميل: مهلة السداد والفواتير المتأخرة" } },
    ],
    metrics: [
      { value: "22", label: { en: "staff panel sections", ru: "раздела в панели", zh: "个后台功能模块", tr: "panel bölümü", ar: "قسمًا في لوحة الموظفين" } },
      { value: "51", label: { en: "data models", ru: "модель данных", zh: "个数据模型", tr: "veri modeli", ar: "نموذج بيانات" } },
      { value: "196", label: { en: "API routes", ru: "маршрутов API", zh: "个 API 路由", tr: "API rotası", ar: "مسارًا في API" } },
      { value: "380", label: { en: "automated tests", ru: "автотестов", zh: "项自动化测试", tr: "otomatik test", ar: "اختبارًا آليًا" } },
    ],
    summary: { en: "An order intake system for a wholesale supplier of food and household goods: a PWA storefront for restaurants and private buyers, a staff panel, a courier app and a WhatsApp/Telegram bot. Orders reach the client's Microinvest accounting system through an agent, and the final amount follows the actual weight from the warehouse.", ru: "Система приёма заказов для оптового поставщика продуктов и хозтоваров: PWA-витрина для заведений и частных покупателей, панель сотрудников, приложение курьера и бот в WhatsApp и Telegram. Заказы уходят в учётную систему клиента Microinvest через агента, а итог считается по фактическому весу со склада.", zh: "为食品与日用品批发商打造的订单接收系统：面向餐厅和个人买家的 PWA 商城、员工后台、骑手应用以及 WhatsApp/Telegram 机器人。订单通过代理写入客户的 Microinvest 记账系统，最终金额按仓库实际称重计算。", tr: "Gıda ve ev ürünleri toptancısı için bir sipariş alma sistemi: restoranlar ve bireysel alıcılar için PWA vitrin, personel paneli, kurye uygulaması ve WhatsApp/Telegram botu. Siparişler bir ajan aracılığıyla müşterinin Microinvest muhasebe sistemine gidiyor, nihai tutar depodaki gerçek ağırlığa göre hesaplanıyor.", ar: "نظام لاستقبال الطلبات لمورّد جملة للمواد الغذائية والسلع المنزلية: متجر PWA للمطاعم والمشترين الأفراد، ولوحة للموظفين، وتطبيق للمندوب، وبوت في WhatsApp وTelegram. تصل الطلبات إلى نظام المحاسبة Microinvest لدى العميل عبر وكيل، ويُحسب المبلغ النهائي حسب الوزن الفعلي في المستودع." },
    review: {
      en: [
        "A TypeScript monorepo: rules for money, discounts, debts and weight tolerance live in a separate tested package, the server is NestJS with PostgreSQL, and the storefront, staff panel and courier app are one React PWA. An agent on the client's PC connects out to the server over a versioned protocol and opens no inbound ports; it writes each order into Microinvest as a customer order per department. Microinvest stays the source of truth for goods, stock and weight, while buyers, orders and debts are kept on our side.",
        "Weight was the hardest part: the warehouse never packs exactly what was ordered, so the total comes from the Microinvest sale, the invoice is recalculated and overweight beyond tolerance is flagged to the manager. Debts follow each buyer's payment terms, with reconciliation acts and opening balances carried over from Microinvest. AI parses lists from WhatsApp and Telegram and photos of supplier invoices, products are matched by code, and if the model is unavailable the list is parsed by rules.",
      ],
      ru: [
        "Монорепозиторий на TypeScript: правила денег, скидок, долгов и допуска по весу вынесены в отдельный пакет с тестами, сервер — NestJS с PostgreSQL, а витрина, панель и приложение курьера — одна PWA на React. Агент на компьютере клиента сам ходит на сервер по версионированному протоколу и не открывает входящих портов, а каждый заказ записывает в Microinvest «Клиентским заказом» по отделам. Microinvest остаётся источником правды для товаров, остатков и веса, а покупатели, заказы и долги живут у нас.",
        "Сложнее всего — вес: склад кладёт не ровно заказанное, поэтому итог берётся из продажи Microinvest, накладная пересчитывается, а перевес сверх допуска отмечается менеджеру. Долги считаются по отсрочке каждого покупателя, с актом сверки и переносом сальдо из Microinvest. ИИ разбирает списки из WhatsApp и Telegram и фото накладных, товар подбирает код, а если модель недоступна, список разбирается правилами.",
      ],
      zh: [
        "项目是一个 TypeScript monorepo：金额、折扣、欠款和称重容差的规则放在独立且有测试的包中，服务端为 NestJS + PostgreSQL，商城、员工后台和骑手应用是同一个 React PWA。客户电脑上的代理通过带版本号的协议主动连接服务器，不开放任何入站端口，并把每个订单按部门写入 Microinvest 的“客户订单”。商品、库存和重量以 Microinvest 为准，买家、订单和欠款则保存在我们这边。",
        "最难的是重量：仓库不会按订单精确装货，因此最终金额取自 Microinvest 的销售单，发票随之重算，超出容差的超重会提示给经理。欠款按每位买家的账期计算，支持对账单，并可从 Microinvest 迁移期初余额。AI 解析来自 WhatsApp 和 Telegram 的清单以及供应商发票照片，商品由代码匹配；模型不可用时，清单由规则解析。",
      ],
      tr: [
        "TypeScript monorepo: para, indirim, borç ve ağırlık toleransı kuralları testli ayrı bir pakette, sunucu PostgreSQL ile NestJS, vitrin, personel paneli ve kurye uygulaması ise tek bir React PWA. Müşterinin bilgisayarındaki ajan, sürümlü bir protokolle sunucuya kendisi bağlanıyor, gelen port açmıyor ve her siparişi Microinvest'e departman bazında müşteri siparişi olarak yazıyor. Ürünler, stok ve ağırlık için doğruluk kaynağı Microinvest; alıcılar, siparişler ve borçlar ise bizde tutuluyor.",
        "En zor kısım ağırlıktı: depo hiçbir zaman tam sipariş edilen miktarı koymuyor, bu yüzden toplam Microinvest satışından alınıyor, fatura yeniden hesaplanıyor ve toleransı aşan fazla ağırlık yöneticiye işaretleniyor. Borçlar her alıcının vadesine göre hesaplanıyor; mutabakat belgeleri ve Microinvest'ten aktarılan açılış bakiyeleri var. Yapay zekâ WhatsApp ve Telegram'dan gelen listeleri ve tedarikçi faturası fotoğraflarını okuyor, ürünleri kod eşleştiriyor; model erişilemezse liste kurallarla ayrıştırılıyor.",
      ],
      ar: [
        "المشروع مستودع موحّد بلغة TypeScript: قواعد المبالغ والخصومات والديون وهامش الوزن في حزمة مستقلة مغطاة بالاختبارات، والخادم NestJS مع PostgreSQL، أما المتجر ولوحة الموظفين وتطبيق المندوب فهي تطبيق PWA واحد بـ React. يتصل وكيل على حاسوب العميل بالخادم بنفسه عبر بروتوكول بإصدارات ولا يفتح أي منافذ واردة، ويسجّل كل طلب في Microinvest كـ«طلب عميل» لكل قسم. يبقى Microinvest المرجع للسلع والمخزون والوزن، بينما يُحفظ المشترون والطلبات والديون لدينا.",
        "أصعب ما في المشروع هو الوزن: المستودع لا يجهّز الكمية المطلوبة بالضبط، لذلك يؤخذ المجموع من عملية البيع في Microinvest، وتُعاد حسبة الفاتورة، ويُنبَّه المدير إلى الوزن الزائد عن الهامش. تُحسب الديون حسب مهلة السداد لكل مشترٍ، مع كشوف مطابقة وأرصدة افتتاحية منقولة من Microinvest. يحلّل الذكاء الاصطناعي القوائم الواردة من WhatsApp وTelegram وصور فواتير الموردين، ويطابق الكود السلع، وإذا تعذّر الوصول إلى النموذج تُحلَّل القائمة بالقواعد.",
      ],
    },
    features: [
      { title: { en: "Per-department orders in Microinvest", ru: "Заказ по отделам в Microinvest", zh: "按部门写入 Microinvest 的订单", tr: "Microinvest'te departman bazlı sipariş", ar: "طلبات حسب القسم في Microinvest" }, text: { en: "An order is split by department database; the agent writes a customer order for each and brings back the weight from the sale, and overweight beyond tolerance is shown to the manager.", ru: "Заказ делится по отделам-базам, агент пишет по каждому «Клиентский заказ» и приносит вес из продажи, а перевес сверх допуска виден менеджеру.", zh: "订单按部门数据库拆分，代理为每个部门写入客户订单并带回销售单中的重量，超出容差的超重会显示给经理。", tr: "Sipariş departman veritabanlarına bölünüyor; ajan her biri için müşteri siparişi yazıp satıştaki ağırlığı geri getiriyor, toleransı aşan fazla ağırlık yöneticiye gösteriliyor.", ar: "يُقسَّم الطلب حسب قاعدة بيانات كل قسم، ويكتب الوكيل لكلٍّ منها «طلب عميل» ويعيد الوزن من عملية البيع، ويظهر للمدير الوزن الزائد عن الهامش." } },
      { title: { en: "AI parsing of lists and invoices", ru: "ИИ-разбор списков и накладных", zh: "AI 解析清单与发票", tr: "Listelerin ve faturaların yapay zekâyla okunması", ar: "تحليل القوائم والفواتير بالذكاء الاصطناعي" }, text: { en: "A list from a messenger becomes a draft order and an invoice photo becomes a supplier request; products are matched by code, and rules take over when the AI fails.", ru: "Список из мессенджера становится черновиком заказа, фото накладной — заявкой поставщику; товар подбирает код, а при сбое ИИ список разбирают правила.", zh: "来自即时通讯的清单变成订单草稿，发票照片变成供应商采购单；商品由代码匹配，AI 失败时由规则接手解析。", tr: "Mesajlaşma uygulamasından gelen liste sipariş taslağına, fatura fotoğrafı tedarikçi talebine dönüşüyor; ürünleri kod eşleştiriyor, yapay zekâ başarısız olursa kurallar devreye giriyor.", ar: "تتحول القائمة الواردة من تطبيق المراسلة إلى مسودة طلب، وصورة الفاتورة إلى طلب للمورّد؛ ويطابق الكود السلع، وعند تعثّر الذكاء الاصطناعي تتولى القواعد التحليل." } },
      { title: { en: "Debts, payment terms and reconciliation", ru: "Долги, отсрочка и акты сверки", zh: "欠款、账期与对账", tr: "Borçlar, vadeler ve mutabakat", ar: "الديون ومهل السداد والمطابقة" }, text: { en: "Each buyer has their own payment term and discount; the panel shows overdue invoices, takes partial payments and exports reconciliation acts to PDF and Excel.", ru: "У каждого покупателя своя отсрочка и скидка; панель показывает просроченные накладные, принимает оплаты частями и выгружает акт сверки в PDF и Excel.", zh: "每位买家有各自的账期和折扣；后台显示逾期发票，接受分期付款，并可将对账单导出为 PDF 和 Excel。", tr: "Her alıcının kendi vadesi ve indirimi var; panel gecikmiş faturaları gösteriyor, kısmi ödemeleri kabul ediyor ve mutabakat belgelerini PDF ve Excel olarak dışa aktarıyor.", ar: "لكل مشترٍ مهلة سداد وخصم خاصان به؛ وتعرض اللوحة الفواتير المتأخرة، وتقبل الدفعات الجزئية، وتصدّر كشوف المطابقة بصيغتي PDF وExcel." } },
    ],
    tags: { en: ["NestJS", "React 19", "PostgreSQL"], ru: ["NestJS", "React 19", "PostgreSQL"], zh: ["NestJS", "React 19", "PostgreSQL"], tr: ["NestJS", "React 19", "PostgreSQL"], ar: ["NestJS", "React 19", "PostgreSQL"] },
    stack: ["NestJS 11", "React 19", "PostgreSQL (Neon)", "Prisma 7", "TypeScript", "pnpm monorepo", "Vite 6", "PWA (Workbox)", "Web Push (VAPID)", "zod 4", "Leaflet / OpenStreetMap", "ExcelJS", "PDFKit", "Node SEA agent (.exe)", "MS SQL (Microinvest)", "OpenRouter + Gemini", "WhatsApp Cloud API", "Telegram Bot API", "Vitest", "Jest", "Vercel"],
    palette: ["#F7F6F2", "#2A1A1D", "#6B1A26", "#4F7A2F"],
    fonts: "Lora / Manrope",
  },
  {
    slug: "shoestreet",
    title: { en: "ShoeStreet", ru: "ShoeStreet", zh: "ShoeStreet", tr: "ShoeStreet", ar: "ShoeStreet" },
    client: { en: "Sneaker store in Bishkek selling original Nike, New Balance and Adidas", ru: "Магазин оригинальных кроссовок Nike, New Balance и Adidas в Бишкеке", zh: "比什凯克的球鞋店，销售正品 Nike、New Balance 和 Adidas", tr: "Bişkek'te orijinal Nike, New Balance ve Adidas satan sneaker mağazası", ar: "متجر أحذية رياضية أصلية من Nike وNew Balance وAdidas في بيشكيك" },
    status: "built",
    category: "web",
    sphere: { en: "Retail / e-commerce", ru: "Розница / интернет-магазин", zh: "零售 / 电商", tr: "Perakende / e-ticaret", ar: "التجزئة / التجارة الإلكترونية" },
    format: { en: "Online store with admin panel", ru: "Интернет-магазин с админ-панелью", zh: "带管理后台的在线商店", tr: "Yönetim panelli online mağaza", ar: "متجر إلكتروني مع لوحة إدارة" },
    year: 2026,
    domain: "shoestreet",
    cover: "/images/showcase/shoestreet/cover.jpg",
    gallery: [
      { src: "/images/showcase/shoestreet/screen-2.jpg", alt: { en: "ShoeStreet — screen 2", ru: "ShoeStreet — экран 2", zh: "ShoeStreet — 第 2 屏", tr: "ShoeStreet — ekran 2", ar: "ShoeStreet — الشاشة 2" } },
      { src: "/images/showcase/shoestreet/screen-3.jpg", alt: { en: "ShoeStreet — screen 3", ru: "ShoeStreet — экран 3", zh: "ShoeStreet — 第 3 屏", tr: "ShoeStreet — ekran 3", ar: "ShoeStreet — الشاشة 3" } },
    ],
    mobile: "/images/showcase/shoestreet/mobile.jpg",
    summary: { en: "An online sneaker store for Bishkek with a catalog by brand and model, product pages with per-size availability, cart, checkout and promo codes. The owner manages products, sizes, brands, delivery methods and orders in a built-in admin panel.", ru: "Интернет-магазин кроссовок для Бишкека: каталог по брендам и моделям, карточки с наличием по каждому размеру, корзина, оформление заказа и промокоды. Товары, размеры, бренды, способы доставки и заказы владелец ведёт во встроенной админ-панели.", zh: "面向比什凯克的球鞋在线商店，提供按品牌和型号划分的目录、显示各尺码库存的商品页、购物车、结账和优惠码。店主可在内置管理后台中管理商品、尺码、品牌、配送方式和订单。", tr: "Bişkek için marka ve modele göre kataloğu, beden bazında stok gösteren ürün sayfaları, sepeti, ödeme adımı ve promosyon kodları olan bir online sneaker mağazası. Sahip; ürünleri, bedenleri, markaları, teslimat yöntemlerini ve siparişleri yerleşik bir yönetim panelinden yönetiyor.", ar: "متجر إلكتروني للأحذية الرياضية لبيشكيك، فيه كتالوج حسب العلامة والطراز، وصفحات منتجات بتوفر كل مقاس، وسلة وإتمام طلب ورموز ترويجية. ويدير المالك المنتجات والمقاسات والعلامات وطرق التوصيل والطلبات في لوحة إدارة مدمجة." },
    review: {
      en: [
        "The storefront is built around how sneakers are actually sold: each pair has its own size grid where a size can be in stock, last pair, available to order or sold out. The catalog is split into in-stock, made-to-order and upcoming drops, with filters by brand, model and size, search with aliases for common misspellings, favorites and recently viewed items. A separate B2B page handles wholesale requests, and customers can subscribe to a restock notification for a missing size.",
        "Under the hood it is a Next.js 16 application with PostgreSQL via Prisma, validated API routes and a password-protected admin area. Uploaded product photos are converted to WebP with sharp. Online payment through the local Finik acquiring service is wired in behind a server flag with a built-in simulator, so it can be switched on without a rebuild. The site runs in Docker Compose behind nginx.",
      ],
      ru: [
        "Витрина устроена так, как на самом деле продают кроссовки: у каждой пары своя размерная сетка, где размер может быть в наличии, последней парой, под заказ или распродан. Каталог разделён на наличие, товары под заказ и ожидаемые поступления, есть фильтры по бренду, модели и размеру, поиск с учётом частых ошибок в названиях, избранное и недавно просмотренное. Отдельная страница B2B принимает оптовые заявки, а на отсутствующий размер можно подписаться и получить уведомление о поступлении.",
        "Технически это приложение на Next.js 16 с PostgreSQL через Prisma, валидацией всех API-запросов и закрытой паролем админкой. Загруженные фото товаров конвертируются в WebP через sharp. Онлайн-оплата через местный эквайринг Finik подключена за серверным флагом и имеет встроенный симулятор, поэтому включается без пересборки. Сайт работает в Docker Compose за nginx.",
      ],
      zh: ["商城围绕球鞋真实的销售方式构建：每双鞋都有自己的尺码表，每个尺码可处于有货、最后一双、可预订或售罄状态。目录分为现货、定制预订和即将发售三类，可按品牌、型号和尺码筛选，搜索支持常见拼写错误的别名，另有收藏和最近浏览。独立的 B2B 页面处理批发申请，顾客还可以为缺货尺码订阅到货通知。", "技术上这是一个 Next.js 16 应用，通过 Prisma 使用 PostgreSQL，API 路由均经过校验，管理区由密码保护。上传的商品照片通过 sharp 转换为 WebP。通过本地 Finik 收单服务的在线支付以服务端开关接入，并带有内置模拟器，因此无需重新构建即可启用。网站运行在 nginx 之后的 Docker Compose 中。"],
      tr: ["Vitrin, sneaker'ların gerçekte nasıl satıldığı etrafında kurulu: her çiftin kendi beden ızgarası var ve bir beden stokta, son çift, sipariş üzerine veya tükendi olabiliyor. Katalog stokta olanlar, sipariş üzerine yapılanlar ve yaklaşan drop'lar olarak ayrılıyor; marka, model ve bedene göre filtreler, sık yapılan yazım hataları için takma adlı arama, favoriler ve son görüntülenenler bulunuyor. Ayrı bir B2B sayfası toptan taleplerini karşılıyor, müşteriler eksik bir beden için stok bildirimine abone olabiliyor.", "Kaputun altında, Prisma üzerinden PostgreSQL kullanan, doğrulamalı API rotaları ve şifre korumalı bir yönetim alanı olan bir Next.js 16 uygulaması var. Yüklenen ürün fotoğrafları sharp ile WebP'ye dönüştürülüyor. Yerel Finik sanal pos hizmeti üzerinden online ödeme, yerleşik bir simülatörle birlikte bir sunucu bayrağının arkasına bağlandı; böylece yeniden derleme gerekmeden açılabiliyor. Site, nginx arkasında Docker Compose üzerinde çalışıyor."],
      ar: ["بُني المتجر على الطريقة التي تُباع بها الأحذية الرياضية فعلًا: لكل زوج شبكة مقاسات خاصة به، قد يكون فيها المقاس متوفرًا، أو آخر زوج، أو متاحًا بالطلب، أو نافدًا. وينقسم الكتالوج إلى المتوفر والمتاح بالطلب والإصدارات القادمة، مع فلاتر حسب العلامة والطراز والمقاس، وبحث يتعرف على الأسماء البديلة والأخطاء الإملائية الشائعة، والمفضلة، وما شوهد مؤخرًا. وتتولى صفحة B2B مستقلة طلبات الجملة، ويمكن للعملاء الاشتراك في إشعار بتوفر مقاس غير متاح.", "تقنيًا هو تطبيق Next.js 16 مع PostgreSQL عبر Prisma، ومسارات API مُتحقَّق منها، ومنطقة إدارة محمية بكلمة مرور. تُحوَّل صور المنتجات المرفوعة إلى WebP بواسطة sharp. وقد رُبط الدفع عبر الإنترنت من خلال خدمة Finik المحلية لقبول المدفوعات خلف علم على الخادم مع محاكٍ مدمج، فيمكن تفعيله دون إعادة بناء. ويعمل الموقع على Docker Compose خلف nginx."],
    },
    features: [
      { title: { en: "Size-level stock", ru: "Наличие по размерам", zh: "尺码级库存", tr: "Beden bazında stok", ar: "المخزون حسب المقاس" }, text: { en: "Every size has its own status: in stock, last pair, to order or sold out, plus a restock request for missing sizes.", ru: "У каждого размера свой статус: в наличии, последняя пара, под заказ или нет, а на отсутствующий можно оставить заявку.", zh: "每个尺码都有自己的状态：有货、最后一双、可预订或售罄，缺货尺码还可提交到货提醒。", tr: "Her bedenin kendi durumu var: stokta, son çift, sipariş üzerine veya tükendi; eksik bedenler için ayrıca stok talebi.", ar: "لكل مقاس حالته: متوفر، أو آخر زوج، أو بالطلب، أو نافد، مع طلب إشعار بتوفر المقاسات الناقصة." } },
      { title: { en: "Catalog and search", ru: "Каталог и поиск", zh: "目录与搜索", tr: "Katalog ve arama", ar: "الكتالوج والبحث" }, text: { en: "Brand and model pages with SEO-friendly URLs, size filters, sorting and search that understands alternative spellings.", ru: "Страницы брендов и моделей с понятными адресами, фильтр по размеру, сортировка и поиск, понимающий альтернативные написания.", zh: "品牌和型号页面采用利于 SEO 的 URL，支持尺码筛选、排序，以及能识别不同拼写的搜索。", tr: "SEO dostu URL'li marka ve model sayfaları, beden filtreleri, sıralama ve alternatif yazımları anlayan arama.", ar: "صفحات للعلامات والطرازات بروابط صديقة لمحركات البحث، وفلاتر المقاسات، والفرز، وبحث يفهم الكتابات البديلة." } },
      { title: { en: "Admin panel", ru: "Админ-панель", zh: "管理后台", tr: "Yönetim paneli", ar: "لوحة الإدارة" }, text: { en: "Products, photos, sizes, brands, promo codes, delivery methods, orders and feedback managed in one place.", ru: "Товары, фото, размеры, бренды, промокоды, способы доставки, заказы и отзывы в одном месте.", zh: "商品、照片、尺码、品牌、优惠码、配送方式、订单和反馈，一站式管理。", tr: "Ürünler, fotoğraflar, bedenler, markalar, promosyon kodları, teslimat yöntemleri, siparişler ve geri bildirimler tek yerden yönetiliyor.", ar: "المنتجات والصور والمقاسات والعلامات والرموز الترويجية وطرق التوصيل والطلبات والملاحظات، كلها تُدار في مكان واحد." } },
    ],
    tags: { en: ["Next.js 16","React 19","TypeScript"], ru: ["Next.js 16","React 19","TypeScript"], zh: ["Next.js 16", "React 19", "TypeScript"], tr: ["Next.js 16", "React 19", "TypeScript"], ar: ["Next.js 16", "React 19", "TypeScript"] },
    stack: ["Next.js 16","React 19","TypeScript","Tailwind CSS 4","PostgreSQL","Prisma 7","Zod","sharp","Docker","nginx"],
    palette: ["#0d0d0d","#f5f0e8","#c9b89c","#25d366"],
  },
  {
    slug: "erp-garment",
    title: { en: "ERP Marking", ru: "ERP Маркировка", zh: "ERP Marking", tr: "ERP Marking", ar: "ERP Marking" },
    client: { en: "A garment manufacturer selling on Wildberries", ru: "Швейное производство, продающее на Wildberries", zh: "在 Wildberries 上销售的服装制造商", tr: "Wildberries'te satış yapan bir hazır giyim üreticisi", ar: "مصنع ملابس يبيع على Wildberries" },
    status: "built",
    category: "product",
    sphere: { en: "Garment manufacturing / product marking", ru: "Швейное производство / маркировка товаров", zh: "服装制造 / 商品标识", tr: "Hazır giyim üretimi / ürün işaretleme", ar: "تصنيع الملابس / وسم المنتجات" },
    format: { en: "Cloud ERP (PWA) with a local print agent", ru: "Облачная ERP (PWA) с локальным агентом печати", zh: "带本地打印代理的云端 ERP（PWA）", tr: "Yerel yazdırma ajanlı bulut ERP (PWA)", ar: "نظام ERP سحابي (PWA) مع وكيل طباعة محلي" },
    year: 2026,
    domain: "erp marking",
    cover: "/images/showcase/erp-garment/cover.jpg",
    mobile: "/images/showcase/erp-garment/mobile.jpg",
    admin: [
      { src: "/images/showcase/erp-garment/screen-2.jpg", title: { en: "Product catalog and marking codes", ru: "Справочник изделий и коды маркировки", zh: "商品目录与标识码", tr: "Ürün kataloğu ve işaretleme kodları", ar: "دليل المنتجات ورموز الوسم" } },
      { src: "/images/showcase/erp-garment/screen-3.jpg", title: { en: "Label editor: DataMatrix + Wildberries", ru: "Редактор этикеток: DataMatrix + Wildberries", zh: "标签编辑器：DataMatrix + Wildberries", tr: "Etiket editörü: DataMatrix + Wildberries", ar: "محرر الملصقات: DataMatrix + Wildberries" } },
    ],
    summary: { en: "A marking and shipping system for a garment factory. It handles Chestny Znak DataMatrix codes and Wildberries barcodes, prints labels on the shop floor and tracks every item from its box to the pallet and the marketplace shipment.", ru: "Система маркировки и отгрузки для швейного цеха. Работает с кодами DataMatrix «Честного знака» и штрихкодами Wildberries, печатает этикетки прямо в цеху и отслеживает каждое изделие по цепочке «короб → паллета → поставка на маркетплейс».", zh: "为服装工厂打造的标识与发货系统。它处理 Chestny Znak 的 DataMatrix 码和 Wildberries 条码，在车间现场打印标签，并追踪每件商品从箱子到托盘再到平台发货的全过程。", tr: "Bir hazır giyim fabrikası için işaretleme ve sevkiyat sistemi. Chestny Znak DataMatrix kodlarını ve Wildberries barkodlarını işliyor, üretim sahasında etiket basıyor ve her ürünü kutusundan palete ve pazaryeri sevkiyatına kadar takip ediyor.", ar: "نظام وسم وشحن لمصنع ملابس. يتعامل مع رموز DataMatrix الخاصة بنظام «تشيستني زناك» وباركودات Wildberries، ويطبع الملصقات في أرضية المصنع، ويتتبع كل قطعة من علبتها إلى المنصّة النقالة وصولًا إلى شحنة السوق الإلكتروني." },
    review: {
      en: [
        "The system has two parts. A NestJS + PostgreSQL backend in the cloud holds the product catalog, marking-code pool, orders, shipments and reports. The React PWA runs in two modes: a desk cabinet for managers and a phone-friendly terminal for operators scanning boxes and pallets. A separate Rust agent on the shop PC drives Godex label printers over EZPL.",
        "Most of the work went into making the floor workflow hard to get wrong. Codes move from FREE to USED only when a label prints, SSCC codes for boxes and pallets get GS1 check digits, scans are checked against the expected box, and access is controlled by a role and permission matrix. The label editor lets the team lay out text, DataMatrix and barcodes on a given tape size and preview the result before printing.",
      ],
      ru: [
        "Система состоит из двух частей. В облаке работает бэкенд на NestJS и PostgreSQL: справочник изделий, пул кодов маркировки, заявки, поставки и отчёты. PWA на React открывается в двух режимах: кабинет за столом для менеджера и терминал (ТСД) на телефоне для оператора, который сканирует короба и паллеты. Отдельный агент на Rust стоит на компьютере в цеху и печатает на принтерах Godex через EZPL.",
        "Основная часть работы ушла на то, чтобы в цеху было трудно ошибиться. Код переходит из «свободен» в «использован» только при печати этикетки, коды SSCC для коробов и паллет получают контрольную цифру GS1, каждый скан сверяется с ожидаемым коробом, а доступ задаётся матрицей ролей и прав. В редакторе этикеток можно разложить текст, DataMatrix и штрихкод под размер ленты и проверить результат до печати.",
      ],
      zh: ["系统分为两部分。云端的 NestJS + PostgreSQL 后端存放商品目录、标识码池、订单、发货和报表。React PWA 有两种运行模式：供经理使用的桌面后台，以及供操作员扫描箱子和托盘的手机友好型终端。车间电脑上运行一个独立的 Rust 代理，通过 EZPL 驱动 Godex 标签打印机。", "大部分工作都用在了让车间流程“很难出错”上。标识码只有在标签打印时才会从 FREE 变为 USED，箱子和托盘的 SSCC 码带有 GS1 校验位，每次扫描都会与预期的箱子核对，访问权限由角色与权限矩阵控制。标签编辑器让团队可以在指定的标签纸尺寸上排布文字、DataMatrix 和条码，并在打印前预览效果。"],
      tr: ["Sistem iki parçadan oluşuyor. Bulutta çalışan NestJS + PostgreSQL backend; ürün kataloğunu, işaretleme kodu havuzunu, siparişleri, sevkiyatları ve raporları tutuyor. React PWA iki modda çalışıyor: yöneticiler için masaüstü panel ve kutu ile paletleri tarayan operatörler için telefona uygun bir terminal. Atölye bilgisayarındaki ayrı bir Rust ajanı, Godex etiket yazıcılarını EZPL üzerinden yönetiyor.", "Emeğin çoğu, saha iş akışında hata yapmayı zorlaştırmaya gitti. Kodlar FREE'den USED'a yalnızca etiket basıldığında geçiyor, kutu ve paletler için SSCC kodları GS1 kontrol hanelerini alıyor, taramalar beklenen kutuya göre kontrol ediliyor ve erişim bir rol ve izin matrisiyle denetleniyor. Etiket editörü, ekibin metni, DataMatrix'i ve barkodları belirli bir bant boyutunda yerleştirmesine ve basmadan önce sonucu önizlemesine imkân veriyor."],
      ar: ["يتكون النظام من جزأين. خلفية NestJS وPostgreSQL في السحابة تحتفظ بدليل المنتجات ومجموعة رموز الوسم والطلبات والشحنات والتقارير. وتعمل PWA بـ React بوضعين: لوحة مكتبية للمديرين وطرفية ملائمة للهاتف للمشغّلين الذين يمسحون العلب والمنصّات. ويدير وكيل مستقل بلغة Rust على حاسوب المصنع طابعات الملصقات Godex عبر EZPL.", "ذهب معظم الجهد إلى جعل سير العمل في أرضية المصنع يصعب الخطأ فيه. تنتقل الرموز من FREE إلى USED فقط عند طباعة الملصق، وتحصل رموز SSCC للعلب والمنصّات على أرقام تحقق GS1، ويُدقَّق كل مسح مقابل العلبة المتوقعة، ويُضبط الوصول بمصفوفة أدوار وصلاحيات. ويتيح محرر الملصقات للفريق تنسيق النص وDataMatrix والباركود على مقاس شريط محدد ومعاينة النتيجة قبل الطباعة."],
    },
    features: [
      { title: { en: "Marking codes", ru: "Коды маркировки", zh: "标识码", tr: "İşaretleme kodları", ar: "رموز الوسم" }, text: { en: "Import Chestny Znak codes from CSV and bind them to products by GTIN. The system tracks free and used counts per item and keeps unrecognized scans for review.", ru: "Импорт кодов «Честного знака» из CSV с привязкой к изделию по GTIN, учёт свободных и использованных кодов по каждому изделию, отдельный список неопознанных сканов.", zh: "从 CSV 导入 Chestny Znak 码，并按 GTIN 绑定到商品。系统按商品统计空闲和已用数量，并保留无法识别的扫描记录以供复核。", tr: "Chestny Znak kodlarını CSV'den içe aktarın ve GTIN ile ürünlere bağlayın. Sistem her kalem için boş ve kullanılmış sayıları izliyor, tanınmayan taramaları inceleme için saklıyor.", ar: "استيراد رموز «تشيستني زناك» من CSV وربطها بالمنتجات حسب GTIN. يتتبع النظام أعداد الرموز الحرة والمستخدمة لكل صنف، ويحتفظ بعمليات المسح غير المعروفة للمراجعة." } },
      { title: { en: "Aggregation and shipping", ru: "Агрегация и отгрузка", zh: "聚合与发货", tr: "Agregasyon ve sevkiyat", ar: "التجميع والشحن" }, text: { en: "Item → box → pallet → shipment hierarchy with SSCC codes, WB box barcodes, carrier and warehouse directories, and five report types with Excel export.", ru: "Иерархия «изделие → короб → паллета → поставка» с кодами SSCC, штрихкодами коробов WB, справочниками перевозчиков и складов и пятью видами отчётов с выгрузкой в Excel.", zh: "商品 → 箱 → 托盘 → 发货的层级结构，含 SSCC 码、WB 箱条码、承运商和仓库目录，以及五类可导出到 Excel 的报表。", tr: "SSCC kodları, WB kutu barkodları, taşıyıcı ve depo rehberleri ile Excel dışa aktarımlı beş rapor türü içeren ürün → kutu → palet → sevkiyat hiyerarşisi.", ar: "تسلسل هرمي «قطعة ← علبة ← منصّة نقالة ← شحنة» برموز SSCC وباركودات علب WB ودلائل الناقلين والمستودعات، وخمسة أنواع من التقارير مع التصدير إلى Excel." } },
      { title: { en: "Shop-floor terminal", ru: "Терминал для цеха", zh: "车间终端", tr: "Üretim sahası terminali", ar: "طرفية أرضية المصنع" }, text: { en: "A phone-friendly terminal mode for collecting codes, aggregation, pallets, verification, receiving and order scans, using a hardware scanner or the camera (zxing-wasm).", ru: "Режим терминала для телефона: сбор кодов, агрегация, паллеты, сверка, приёмка и сканирование по заявке. Сканирует аппаратным сканером или камерой (zxing-wasm).", zh: "手机友好的终端模式，用于采集标识码、聚合、托盘、核对、收货和订单扫描，支持硬件扫码枪或摄像头（zxing-wasm）。", tr: "Kod toplama, agregasyon, paletler, doğrulama, teslim alma ve sipariş taramaları için telefona uygun bir terminal modu; donanım tarayıcı veya kamera (zxing-wasm) kullanıyor.", ar: "وضع طرفية ملائم للهاتف لجمع الرموز والتجميع والمنصّات والتحقق والاستلام ومسح الطلبات، بماسح مادي أو بالكاميرا (zxing-wasm)." } },
    ],
    tags: { en: ["NestJS","Prisma","PostgreSQL"], ru: ["NestJS","Prisma","PostgreSQL"], zh: ["NestJS", "Prisma", "PostgreSQL"], tr: ["NestJS", "Prisma", "PostgreSQL"], ar: ["NestJS", "Prisma", "PostgreSQL"] },
    stack: ["NestJS","Prisma","PostgreSQL","React 19","Vite","PWA (Workbox)","Rust (print agent)","EZPL / Godex","zxing-wasm","ExcelJS","Docker Compose"],
    palette: ["#ECEAE4","#22252A","#C2510C","#3F7D4E"],
  },
  {
    slug: "djal",
    stage: "radial-gradient(circle at 25% 20%, #FFB347 0%, transparent 40%), radial-gradient(circle at 80% 85%, #FF5E3A 0%, transparent 45%), linear-gradient(135deg, #1C0F08 0%, #5A2410 55%, #B8461B 100%)",
    decor: ["🍢", "🔥", "🥙", "🍅", "🧅", "🌶️", "🍢", "🥗"],
    title: { en: "Djal", ru: "Джал", zh: "Djal", tr: "Djal", ar: "Djal" },
    client: { en: "A chain of four shashlik cafes", ru: "Сеть из четырёх шашлычных", zh: "四家烤肉店组成的连锁", tr: "Dört şaşlık kafesinden oluşan bir zincir", ar: "سلسلة من أربعة مطاعم شاشليك" },
    status: "built",
    category: "product",
    sphere: { en: "Restaurants", ru: "Общепит", zh: "餐饮", tr: "Restoranlar", ar: "المطاعم" },
    format: { en: "Guest Wi-Fi portal, promos and feedback survey with admin panel", ru: "Wi-Fi портал, акции и опрос гостей с панелью управления", zh: "访客 Wi-Fi 门户、促销活动与反馈问卷，附管理后台", tr: "Misafir Wi-Fi portalı, promosyonlar ve yönetim panelli geri bildirim anketi", ar: "بوابة Wi-Fi للضيوف وعروض واستبيان آراء مع لوحة إدارة" },
    year: 2026,
    domain: "djal",
    cover: "/images/showcase/djal/cover.jpg",
    phones: ["/images/showcase/djal/phone-1.jpg","/images/showcase/djal/phone-2.jpg"],
    admin: [
      { src: "/images/showcase/djal/screen-2.jpg", title: { en: "Survey dishes per branch", ru: "Блюда опроса по филиалам", zh: "各分店的问卷菜品", tr: "Şube başına anket yemekleri", ar: "أطباق الاستبيان لكل فرع" } },
      { src: "/images/showcase/djal/screen-3.jpg", title: { en: "Guest responses and ratings", ru: "Ответы и оценки гостей", zh: "顾客回复与评分", tr: "Misafir yanıtları ve puanları", ar: "ردود الضيوف وتقييماتهم" } },
    ],
    summary: { en: "A guest-facing web app for a cafe chain: guests reach it through the guest Wi-Fi captive portal or a QR code on the table, see the branch's promotions and leave a dish-by-dish quality review. Managers read the responses and run promotions, survey dishes and printable table QR cards from an admin panel.", ru: "Гостевое веб-приложение для сети кафе: гость попадает в него через captive-портал гостевого Wi-Fi или по QR-коду на столе, видит акции филиала и оставляет поблюдный отзыв о качестве. Управляющие читают ответы и ведут акции, список блюд опроса и печатные таблички с QR в панели управления.", zh: "一款面向顾客的连锁咖啡馆 Web 应用：顾客通过访客 Wi-Fi 的 captive 门户或桌上的二维码进入，查看分店的促销活动，并逐道菜品留下品质评价。经理在管理后台查看回复，管理促销、问卷菜品和可打印的桌牌二维码卡片。", tr: "Bir kafe zinciri için misafirlere yönelik web uygulaması: misafirler misafir Wi-Fi captive portalı veya masadaki QR kodu üzerinden ulaşıyor, şubenin promosyonlarını görüyor ve yemek bazında kalite değerlendirmesi bırakıyor. Yöneticiler yanıtları okuyor, promosyonları, anket yemeklerini ve yazdırılabilir masa QR kartlarını yönetim panelinden yönetiyor.", ar: "تطبيق ويب موجّه للضيوف لسلسلة مقاهٍ: يصل إليه الضيوف عبر بوابة Wi-Fi المقيِّدة للضيوف أو برمز QR على الطاولة، فيطّلعون على عروض الفرع ويتركون تقييمًا لجودة كل طبق على حدة. ويقرأ المديرون الردود ويديرون العروض وأطباق الاستبيان وبطاقات الطاولات QR القابلة للطباعة من لوحة الإدارة." },
    review: {
      en: [
        "The client asked for no digital menu and no online ordering, so the product focuses on three guest screens: promotions, a survey and the Wi-Fi portal. The survey is available in Russian and Kyrgyz: the guest picks the dishes they had, rates each one, rates the visit overall and can add comments. The portal page works inside the restricted captive-portal browser, so fonts, images and scripts are all served from the app's own domain.",
        "The admin panel lives on a separate subdomain. Network admins see all branches, managers only the ones assigned to them, and that scoping is enforced in server actions. Admins upload promotion banners (resized with sharp), filter survey responses by branch, visit rating and dish, keep a per-branch list of survey dishes, and print an A4 fold-over table card with the branch QR code. Production runs on a VPS with a static IP behind Caddy, which the router walled garden requires.",
      ],
      ru: [
        "Цифровое меню и приём заказов заказчик исключил, поэтому продукт сосредоточен на трёх гостевых экранах: акции, опрос и Wi-Fi портал. Опрос на русском и кыргызском: гость выбирает блюда, оценивает каждое, ставит общую оценку визиту и может оставить комментарии. Страница портала работает во встроенном браузере captive-портала, поэтому шрифты, картинки и скрипты отдаются только с собственного домена.",
        "Панель управления вынесена на отдельный поддомен. Администратор сети видит все филиалы, менеджер — только назначенные, и это проверяется в server actions. В панели загружают баннеры акций (ресайз через sharp), фильтруют ответы по филиалу, оценке и блюду, ведут список блюд опроса для каждого филиала и печатают табличку-домик А4 с QR-кодом филиала. Прод работает на VPS со статическим IP за Caddy — этого требует walled garden роутеров.",
      ],
      zh: ["客户明确不要电子菜单和在线点单，因此产品聚焦于三个面向顾客的页面：促销活动、问卷和 Wi-Fi 门户。问卷支持俄语和吉尔吉斯语：顾客选择自己点过的菜品，逐一评分，给这次到店整体打分，并可补充评论。门户页面能在受限的 captive 门户浏览器中运行，因此字体、图片和脚本全部由应用自己的域名提供。", "管理后台部署在独立的子域名上。连锁管理员可查看所有分店，经理只能查看分配给自己的分店，这一权限范围在 server actions 中强制执行。管理员可以上传促销横幅（通过 sharp 调整尺寸），按分店、到店评分和菜品筛选问卷回复，为每家分店维护问卷菜品列表，并打印带分店二维码的 A4 折叠桌牌。生产环境运行在带静态 IP 的 VPS 上，前置 Caddy，这是路由器 walled garden 的要求。"],
      tr: ["Müşteri dijital menü ve online sipariş istemedi; bu yüzden ürün üç misafir ekranına odaklanıyor: promosyonlar, bir anket ve Wi-Fi portalı. Anket Rusça ve Kırgızca sunuluyor: misafir yediği yemekleri seçiyor, her birini puanlıyor, ziyareti genel olarak puanlıyor ve yorum ekleyebiliyor. Portal sayfası kısıtlı captive portal tarayıcısında çalışıyor; bu yüzden yazı tipleri, görseller ve betikler uygulamanın kendi alan adından sunuluyor.", "Yönetim paneli ayrı bir alt alan adında yer alıyor. Ağ yöneticileri tüm şubeleri, müdürler yalnızca kendilerine atanmış şubeleri görüyor ve bu kapsam sunucu eylemlerinde zorunlu kılınıyor. Yöneticiler promosyon bannerlarını yüklüyor (sharp ile yeniden boyutlandırılıyor), anket yanıtlarını şubeye, ziyaret puanına ve yemeğe göre filtreliyor, şube başına anket yemekleri listesi tutuyor ve şubenin QR koduyla A4 katlamalı bir masa kartı yazdırıyor. Üretim, yönlendiricinin walled garden'ının gerektirdiği şekilde Caddy arkasında, statik IP'li bir VPS üzerinde çalışıyor."],
      ar: ["لم يطلب العميل قائمة رقمية ولا طلبات عبر الإنترنت، فركّز المنتج على ثلاث شاشات للضيف: العروض، والاستبيان، وبوابة Wi-Fi. الاستبيان متاح بالروسية والقرغيزية: يختار الضيف الأطباق التي تناولها، ويقيّم كل واحد منها، ويقيّم الزيارة إجمالًا، ويمكنه إضافة تعليقات. وتعمل صفحة البوابة داخل متصفح البوابة المقيِّدة المحدود، لذا تُقدَّم الخطوط والصور والسكربتات كلها من نطاق التطبيق نفسه.", "تقع لوحة الإدارة على نطاق فرعي منفصل. يرى مديرو الشبكة جميع الفروع، ولا يرى المديرون إلا الفروع المسندة إليهم، ويُفرض هذا النطاق في إجراءات الخادم. يرفع المديرون لافتات العروض (بتغيير حجمها عبر sharp)، ويصفّون ردود الاستبيان حسب الفرع وتقييم الزيارة والطبق، ويحتفظون بقائمة أطباق الاستبيان لكل فرع، ويطبعون بطاقة طاولة مطوية بحجم A4 عليها رمز QR الخاص بالفرع. ويعمل الإنتاج على VPS بعنوان IP ثابت خلف Caddy، وهذا ما يشترطه الحاجز المسموح (walled garden) في الموجّه."],
    },
    features: [
      { title: { en: "Captive Wi-Fi portal", ru: "Captive-портал Wi-Fi", zh: "Captive Wi-Fi 门户", tr: "Captive Wi-Fi portalı", ar: "بوابة Wi-Fi المقيِّدة" }, text: { en: "The guest Wi-Fi login leads to the branch page with promotions and a link to the survey; a table QR code is the fallback route.", ru: "Вход в гостевой Wi-Fi ведёт на страницу филиала с акциями и ссылкой на опрос; QR-код на столе — запасной путь.", zh: "登录访客 Wi-Fi 后跳转到分店页面，展示促销活动和问卷链接；桌上的二维码是备用入口。", tr: "Misafir Wi-Fi girişi, promosyonlar ve ankete bağlantı içeren şube sayfasına yönlendiriyor; masadaki QR kodu yedek yol.", ar: "يقود تسجيل الدخول إلى Wi-Fi الضيوف إلى صفحة الفرع بعروضها ورابط الاستبيان؛ ورمز QR على الطاولة مسار بديل." } },
      { title: { en: "Dish-by-dish survey in two languages", ru: "Поблюдный опрос на двух языках", zh: "双语逐菜品问卷", tr: "İki dilde yemek bazlı anket", ar: "استبيان لكل طبق بلغتين" }, text: { en: "Russian and Kyrgyz; star ratings and comments per dish, an overall visit rating and how the guest heard about the cafe.", ru: "Русский и кыргызский; звёзды и отзыв по каждому блюду, общая оценка визита и откуда гость узнал о кафе.", zh: "支持俄语和吉尔吉斯语；每道菜品有星级评分和评论，另有到店整体评分，以及顾客是如何得知这家咖啡馆的。", tr: "Rusça ve Kırgızca; yemek başına yıldız puanı ve yorum, genel ziyaret puanı ve misafirin kafeyi nereden duyduğu.", ar: "بالروسية والقرغيزية؛ تقييم بالنجوم وتعليق لكل طبق، وتقييم عام للزيارة، وسؤال عن كيفية معرفة الضيف بالمقهى." } },
      { title: { en: "Multi-branch admin panel", ru: "Панель для сети филиалов", zh: "多分店管理后台", tr: "Çok şubeli yönetim paneli", ar: "لوحة إدارة متعددة الفروع" }, text: { en: "Role-based access per branch, response filters, promo banners, survey dish lists and printable QR table cards.", ru: "Доступ по ролям и филиалам, фильтры ответов, баннеры акций, списки блюд опроса и печатные таблички с QR.", zh: "按分店划分的基于角色的访问控制、回复筛选、促销横幅、问卷菜品列表和可打印的二维码桌牌。", tr: "Şube bazında rol tabanlı erişim, yanıt filtreleri, promosyon bannerları, anket yemek listeleri ve yazdırılabilir QR masa kartları.", ar: "وصول حسب الدور والفرع، وفلاتر للردود، ولافتات العروض، وقوائم أطباق الاستبيان، وبطاقات طاولات QR قابلة للطباعة." } },
    ],
    tags: { en: ["Next.js 15","React 19","TypeScript"], ru: ["Next.js 15","React 19","TypeScript"], zh: ["Next.js 15", "React 19", "TypeScript"], tr: ["Next.js 15", "React 19", "TypeScript"], ar: ["Next.js 15", "React 19", "TypeScript"] },
    stack: ["Next.js 15","React 19","TypeScript","PostgreSQL","Prisma","Tailwind CSS 4","iron-session","sharp","qrcode","Docker Compose","Caddy"],
    palette: ["#17181B","#F2EFEA","#EF5A2A","#F6A623"],
  },
  {
    slug: "anteyko-pwa",
    stage: "radial-gradient(circle at 20% 20%, #F4C27A 0%, transparent 40%), radial-gradient(circle at 85% 80%, #C98B4E 0%, transparent 45%), linear-gradient(135deg, #2A1A10 0%, #5B3A22 55%, #A8733F 100%)",
    decor: ["☕", "🥐", "🍰", "🧁", "☕", "🥯", "🍪", "🫖"],
    title: { en: "Anteyko Business PWA", ru: "Anteyko PWA для бизнеса", zh: "Anteyko 商业 PWA", tr: "Anteyko Business PWA", ar: "Anteyko Business PWA" },
    client: { en: "Anteyko Labs' own product for small businesses: cafes, barbershops and shops", ru: "Собственный продукт Anteyko Labs для малого бизнеса: кафе, барбершопов и магазинов", zh: "Anteyko Labs 面向小微企业的自有产品：咖啡馆、理发店和商店", tr: "Anteyko Labs'in küçük işletmeler (kafeler, berberler ve mağazalar) için kendi ürünü", ar: "منتج Anteyko Labs الخاص للمشاريع الصغيرة: المقاهي ومحال الحلاقة والمتاجر" },
    status: "built",
    category: "product",
    sphere: { en: "Small business, food & services", ru: "Малый бизнес, общепит и услуги", zh: "小微企业，餐饮与服务", tr: "Küçük işletme, yeme-içme ve hizmetler", ar: "المشاريع الصغيرة والمطاعم والخدمات" },
    format: { en: "Branded ordering and booking PWA template", ru: "Шаблон брендированной PWA для заказов и записи", zh: "品牌化点单与预约 PWA 模板", tr: "Markalı sipariş ve rezervasyon PWA şablonu", ar: "قالب PWA بهوية تجارية للطلبات والحجز" },
    year: 2026,
    domain: "anteyko business pwa",
    cover: "/images/showcase/anteyko-pwa/cover.jpg",
    phones: ["/images/showcase/anteyko-pwa/phone-1.jpg","/images/showcase/anteyko-pwa/phone-2.jpg"],
    admin: [
      { src: "/images/showcase/anteyko-pwa/screen-3.jpg", title: { en: "Owner dashboard and incoming orders", ru: "Сводка владельца и входящие заказы", zh: "店主总览与新订单", tr: "Sahip panosu ve gelen siparişler", ar: "ملخص المالك والطلبات الواردة" } },
      { src: "/images/showcase/anteyko-pwa/screen-2.jpg", title: { en: "Menu editor", ru: "Редактор меню", zh: "菜单编辑器", tr: "Menü editörü", ar: "محرر القائمة" } },
    ],
    summary: { en: "A branded order and booking PWA delivered as a separate instance for each client, with its own brand, domain and database, and no aggregator commission or subscription. It is the product behind the studio's “Start” and “Turnkey” offers.", ru: "Брендированная PWA для заказов и записи, которая ставится каждому клиенту отдельным инстансом — со своим брендом, доменом и базой, без комиссии агрегатора и подписки. Это продукт, на котором построены предложения студии «Старт» и «Под ключ».", zh: "一款品牌化的点单与预约 PWA，为每位客户部署独立实例，拥有各自的品牌、域名和数据库，没有平台抽成，也无需订阅。它是工作室“入门版”和“交钥匙”两款方案背后的产品。", tr: "Her müşteri için kendi markası, alan adı ve veritabanıyla ayrı bir örnek olarak teslim edilen, aracı komisyonu ve abonelik gerektirmeyen markalı bir sipariş ve rezervasyon PWA'sı. Stüdyonun “Start” ve “Turnkey” tekliflerinin arkasındaki ürün.", ar: "PWA بهوية تجارية للطلبات والحجز تُسلَّم لكل عميل كنسخة مستقلة، بعلامته ونطاقه وقاعدة بياناته الخاصة، دون عمولة وسيط أو اشتراك. وهي المنتج الذي تقوم عليه عروض الاستوديو «ابدأ» و«جاهز للتشغيل»." },
    review: {
      en: [
        "One codebase covers three niches. A cafe or shop gets a menu and an order flow, a barber or salon gets services with duration and time-slot booking. Orders and bookings are saved in the business's database and handed off to WhatsApp with a prepared message. The home screen shows opening hours, a primary action, promotions, a stamp-based loyalty card and a push subscription prompt.",
        "The owner cabinet, behind a PIN, shows monthly orders, revenue and the best-selling item, the order list with statuses, a menu and category editor, customers, push notifications and brand settings: name, tagline, accent colour, logo and cover. A separate staff screen adds loyalty stamps and redeems rewards. Tests run on in-memory PGlite, so no external database is needed.",
      ],
      ru: [
        "Одна кодовая база закрывает три ниши. Кафе или магазин получают меню и оформление заказа, барбершоп или салон — услуги с длительностью и запись на слот. Заказы и записи сохраняются в базе бизнеса и уходят в WhatsApp готовым сообщением. На главной — часы работы, основная кнопка, акции, карта лояльности со штампами и подписка на push.",
        "В кабинете владельца, закрытом PIN, — заказы и выручка за месяц и хит продаж, список заказов со статусами, редактор меню и категорий, клиенты, push-рассылки и настройки бренда: название, слоган, акцентный цвет, логотип и обложка. Отдельный экран персонала ставит штампы и выдаёт награды. Тесты гоняются на PGlite в памяти, внешняя база для них не нужна.",
      ],
      zh: ["同一套代码库覆盖三类业务场景。咖啡馆或商店获得菜单和下单流程，理发店或美容院获得带时长的服务项目和时段预约。订单和预约保存在商家自己的数据库中，并以预填好的消息转交给 WhatsApp。首页展示营业时间、主要操作、促销活动、集章式会员卡和推送订阅提示。", "店主后台由 PIN 保护，展示当月订单、营收和最畅销商品，带状态的订单列表，菜单与分类编辑器，客户，推送通知以及品牌设置：名称、标语、主题色、Logo 和封面。另有独立的员工界面用于盖章和兑换奖励。测试运行在内存中的 PGlite 上，因此无需外部数据库。"],
      tr: ["Tek bir kod tabanı üç nişi kapsıyor. Bir kafe veya mağaza menü ve sipariş akışı alıyor, bir berber veya salon süreli hizmetler ve zaman dilimi rezervasyonu. Siparişler ve rezervasyonlar işletmenin veritabanına kaydediliyor ve hazır bir mesajla WhatsApp'a aktarılıyor. Ana ekranda çalışma saatleri, ana eylem, promosyonlar, damga tabanlı bir sadakat kartı ve push abonelik daveti yer alıyor.", "PIN arkasındaki sahip paneli; aylık siparişleri, geliri ve en çok satan ürünü, durumlarıyla sipariş listesini, menü ve kategori editörünü, müşterileri, push bildirimlerini ve marka ayarlarını (ad, slogan, vurgu rengi, logo ve kapak) gösteriyor. Ayrı bir personel ekranı sadakat damgası ekliyor ve ödülleri kullandırıyor. Testler bellek içi PGlite üzerinde çalışıyor, bu yüzden harici bir veritabanına gerek yok."],
      ar: ["قاعدة شيفرة واحدة تخدم ثلاثة قطاعات. يحصل المقهى أو المتجر على قائمة ومسار طلب، ويحصل الحلاق أو الصالون على خدمات بمدة وحجز بفترات زمنية. تُحفظ الطلبات والحجوزات في قاعدة بيانات النشاط وتُحال إلى WhatsApp برسالة جاهزة. وتعرض الشاشة الرئيسية ساعات العمل وإجراءً رئيسيًا والعروض وبطاقة ولاء بالأختام وطلب الاشتراك في إشعارات push.", "تعرض لوحة المالك، المحمية برمز PIN، طلبات الشهر والإيرادات والصنف الأكثر مبيعًا، وقائمة الطلبات بحالاتها، ومحرر القائمة والفئات، والعملاء، وإشعارات push، وإعدادات العلامة: الاسم والشعار النصي واللون المميز والشعار الرسومي وصورة الغلاف. وتضيف شاشة موظفين مستقلة أختام الولاء وتصرف المكافآت. وتعمل الاختبارات على PGlite في الذاكرة، فلا حاجة إلى قاعدة بيانات خارجية."],
    },
    features: [
      { title: { en: "One instance per client", ru: "Отдельный инстанс на клиента", zh: "每位客户一个实例", tr: "Müşteri başına bir örnek", ar: "نسخة مستقلة لكل عميل" }, text: { en: "Its own brand, domain and database for each client.", ru: "Свой бренд, домен и база у каждого клиента.", zh: "每位客户都有独立的品牌、域名和数据库。", tr: "Her müşteri için ayrı marka, alan adı ve veritabanı.", ar: "هوية ونطاق وقاعدة بيانات مستقلة لكل عميل." } },
      { title: { en: "Orders and slot booking", ru: "Заказы и запись на время", zh: "订单与时段预约", tr: "Siparişler ve zaman dilimi rezervasyonu", ar: "الطلبات والحجز بالمواعيد" }, text: { en: "Menu ordering with pickup or delivery for cafes and shops, service booking by time slot for salons, both forwarded to WhatsApp.", ru: "Заказ из меню с самовывозом или доставкой для кафе и магазинов, запись на услугу по слотам для салонов, всё уходит в WhatsApp.", zh: "为咖啡馆和商店提供支持自取或外送的菜单点单，为美容院提供按时段预约服务，二者都会转发到 WhatsApp。", tr: "Kafeler ve mağazalar için gel-al veya teslimatlı menü siparişi, salonlar için zaman dilimiyle hizmet rezervasyonu; ikisi de WhatsApp'a yönlendiriliyor.", ar: "طلب من القائمة مع استلام أو توصيل للمقاهي والمتاجر، وحجز الخدمات بفترات زمنية للصالونات، وكلاهما يُحال إلى WhatsApp." } },
      { title: { en: "Loyalty stamps and push", ru: "Штампы лояльности и push", zh: "会员集章与推送", tr: "Sadakat damgaları ve push", ar: "أختام الولاء وإشعارات push" }, text: { en: "A stamp card opened by phone number, staff screen to add stamps and redeem rewards, and self-hosted Web Push campaigns.", ru: "Карта со штампами по номеру телефона, экран персонала для штампов и наград, push-рассылки через собственный Web Push.", zh: "通过手机号开通的集章卡、供员工盖章并兑换奖励的界面，以及通过自建 Web Push 发送的推送活动。", tr: "Telefon numarasıyla açılan bir damga kartı, damga eklemek ve ödül kullandırmak için personel ekranı ve kendi barındırdığımız Web Push kampanyaları.", ar: "بطاقة أختام تُفتح برقم الهاتف، وشاشة للموظفين لإضافة الأختام وصرف المكافآت، وحملات push عبر Web Push مستضاف ذاتيًا." } },
    ],
    tags: { en: ["Next.js 16","React 19","TypeScript"], ru: ["Next.js 16","React 19","TypeScript"], zh: ["Next.js 16", "React 19", "TypeScript"], tr: ["Next.js 16", "React 19", "TypeScript"], ar: ["Next.js 16", "React 19", "TypeScript"] },
    stack: ["Next.js 16","React 19","TypeScript","Neon Postgres","Drizzle ORM","Tailwind CSS 4","Vercel Blob","Web Push (VAPID)","Vitest","PGlite","Playwright"],
    palette: ["#0A0A0B","#F5F5F7","#C9904A","#4F46E5"],
  },
  {
    slug: "jocash-tender",
    title: { en: "JoCash Tender", ru: "JoCash Tender", zh: "JoCash Tender", tr: "JoCash Tender", ar: "JoCash Tender" },
    client: { en: "Company in Kyrgyzstan that bids in public and corporate procurement", ru: "Компания в Кыргызстане, участвующая в государственных и корпоративных закупках", zh: "参与政府和企业采购投标的吉尔吉斯斯坦公司", tr: "Kamu ve kurumsal ihalelere teklif veren, Kırgızistan'da bir şirket", ar: "شركة في قرغيزستان تشارك في المشتريات الحكومية وشركات القطاع الخاص" },
    status: "built",
    category: "product",
    sphere: { en: "Public procurement / B2G", ru: "Госзакупки / B2G", zh: "政府采购 / B2G", tr: "Kamu ihaleleri / B2G", ar: "المشتريات العامة / B2G" },
    format: { en: "Internal web platform with scraper and API", ru: "Внутренняя веб-платформа со скрапером и API", zh: "带爬虫和 API 的内部 Web 平台", tr: "Scraper ve API'li dahili web platformu", ar: "منصة ويب داخلية مع أداة استخراج بيانات وAPI" },
    year: 2026,
    domain: "jocash tender",
    cover: "/images/showcase/jocash-tender/cover.jpg",
    admin: [
      { src: "/images/showcase/jocash-tender/screen-2.jpg", title: { en: "Tender card: status, assignee, comments", ru: "Карточка тендера: статус, ответственный, комментарии", zh: "招标卡片：状态、负责人、评论", tr: "İhale kartı: durum, sorumlu, yorumlar", ar: "بطاقة المناقصة: الحالة والمسؤول والتعليقات" } },
      { src: "/images/showcase/jocash-tender/screen-3.jpg", title: { en: "Scraper runs across procurement portals", ru: "Запуски сборщиков по порталам закупок", zh: "各采购门户的爬虫运行记录", tr: "İhale portallarında çalışan scraper'lar", ar: "تشغيل أدوات الاستخراج عبر بوابات المشتريات" } },
    ],
    summary: { en: "An internal platform that collects new tenders from Kyrgyz procurement portals into one list and lets the team take each tender from discovery to a submitted bid. Tenders get statuses, owners, tags, comments and attached cost estimates, and the list exports to Excel or CSV.", ru: "Внутренняя платформа, которая собирает новые тендеры с киргизских порталов закупок в один список и позволяет команде вести каждый тендер от обнаружения до поданной заявки. У тендеров есть статусы, ответственные, теги, комментарии и прикреплённые сметы, а список выгружается в Excel или CSV.", zh: "一个内部平台，将吉尔吉斯斯坦各采购门户上的新招标汇总到一个列表，让团队把每个招标从发现一直推进到提交投标。招标带有状态、负责人、标签、评论和附加的成本估算，列表可导出为 Excel 或 CSV。", tr: "Kırgızistan ihale portallarındaki yeni ihaleleri tek bir listede toplayan ve ekibin her ihaleyi keşiften sunulan teklife kadar götürmesini sağlayan dahili bir platform. İhalelere durum, sahip, etiket, yorum ve ekli maliyet tahminleri atanıyor, liste Excel veya CSV'ye aktarılabiliyor.", ar: "منصة داخلية تجمع المناقصات الجديدة من بوابات المشتريات القرغيزية في قائمة واحدة، وتتيح للفريق متابعة كل مناقصة من اكتشافها إلى تقديم العطاء. تحصل المناقصات على حالات ومسؤولين ووسوم وتعليقات وتقديرات تكلفة مرفقة، وتُصدَّر القائمة إلى Excel أو CSV." },
    review: {
      en: [
        "Instead of checking several procurement sites by hand, the team gets a single feed. Background scrapers for zakupki.gov.kg, zakupki.okmot.kg and tenders.kg run on a queue every four hours, normalize number, title, buyer, amount, deadline, region and category, and update records that already exist instead of duplicating them. A scraper screen shows each run with found, created and updated counts and lets an admin start a run manually.",
        "Inside the platform a tender moves through statuses from new and under review to bid submitted, won or lost. Each card keeps the link to the original, an assignee, tags, a comment thread, an audit history of changes and uploaded .xlsx estimates that are parsed and stored with edit history. Users have roles (manager, searcher, supplier), and new tenders can be announced by email or Telegram. The backend is NestJS with Prisma, PostgreSQL, BullMQ on Redis and S3-compatible file storage, with a Next.js frontend in a Turborepo monorepo.",
      ],
      ru: [
        "Вместо того чтобы вручную проверять несколько сайтов закупок, команда получает одну ленту. Фоновые скраперы для zakupki.gov.kg, zakupki.okmot.kg и tenders.kg работают через очередь каждые четыре часа, приводят к одному виду номер, название, заказчика, сумму, дедлайн, регион и категорию и обновляют уже известные записи, а не плодят дубли. На экране скрапера видно каждый запуск со счётчиками найденных, созданных и обновлённых тендеров, запуск можно сделать и вручную.",
        "Внутри платформы тендер проходит статусы от нового и рассматриваемого до поданной заявки, выигрыша или проигрыша. В карточке хранятся ссылка на оригинал, ответственный, теги, обсуждение, история изменений и загруженные сметы в .xlsx, которые разбираются и сохраняются с историей правок. У пользователей есть роли (менеджер, поисковик, поставщик), о новых тендерах можно оповещать по почте или в Telegram. Бэкенд написан на NestJS с Prisma, PostgreSQL, BullMQ на Redis и S3-совместимым хранилищем файлов, фронтенд на Next.js, всё собрано в монорепозиторий на Turborepo.",
      ],
      zh: ["团队不必再手动查看多个采购网站，而是获得统一的信息流。针对 zakupki.gov.kg、zakupki.okmot.kg 和 tenders.kg 的后台爬虫每四小时通过队列运行一次，对编号、标题、采购方、金额、截止日期、地区和类别进行标准化，并更新已有记录而不是重复创建。爬虫界面会显示每次运行的发现、新建和更新数量，管理员也可以手动启动运行。", "在平台内，招标会经历从新建、审核中到已投标、中标或未中标的各种状态。每张卡片保存原文链接、负责人、标签、评论讨论、变更审计历史，以及上传的 .xlsx 估算表，这些表格会被解析并连同编辑历史一起保存。用户有多种角色（经理、检索员、供应商），新招标可通过邮件或 Telegram 通知。后端采用 NestJS，搭配 Prisma、PostgreSQL、基于 Redis 的 BullMQ 以及兼容 S3 的文件存储，前端为 Next.js，整体位于 Turborepo monorepo 中。"],
      tr: ["Birkaç ihale sitesini elle kontrol etmek yerine ekip tek bir akış alıyor. zakupki.gov.kg, zakupki.okmot.kg ve tenders.kg için arka plan scraper'ları dört saatte bir kuyrukta çalışıyor; numara, başlık, alıcı, tutar, son tarih, bölge ve kategoriyi normalleştiriyor, mevcut kayıtları kopyalamak yerine güncelliyor. Bir scraper ekranı her çalıştırmayı bulunan, oluşturulan ve güncellenen sayılarıyla gösteriyor ve yöneticinin elle çalıştırmasına imkân veriyor.", "Platformun içinde bir ihale; yeni ve incelemede durumundan teklif sunuldu, kazanıldı veya kaybedildi durumlarına kadar ilerliyor. Her kart özgün ilana bağlantıyı, bir sorumluyu, etiketleri, bir yorum akışını, değişikliklerin denetim geçmişini ve ayrıştırılıp düzenleme geçmişiyle saklanan yüklenmiş .xlsx tahminlerini tutuyor. Kullanıcıların rolleri var (yönetici, arayıcı, tedarikçi) ve yeni ihaleler e-posta veya Telegram ile duyurulabiliyor. Backend; Prisma, PostgreSQL, Redis üzerinde BullMQ ve S3 uyumlu dosya depolamalı NestJS, frontend ise Turborepo monorepo içinde Next.js."],
      ar: ["بدلًا من تفقّد عدة مواقع مشتريات يدويًا، يحصل الفريق على موجز واحد. تعمل أدوات استخراج في الخلفية لمواقع zakupki.gov.kg وzakupki.okmot.kg وtenders.kg عبر طابور كل أربع ساعات، فتوحّد الرقم والعنوان والجهة المشترية والمبلغ والموعد النهائي والمنطقة والفئة، وتحدّث السجلات الموجودة بدلًا من تكرارها. وتعرض شاشة الاستخراج كل تشغيل بأعداد المناقصات التي وُجدت وأُنشئت وحُدّثت، ويمكن للمدير بدء تشغيل يدويًا.", "داخل المنصة تمرّ المناقصة بحالات من جديدة وقيد المراجعة إلى عطاء مقدَّم، ثم فوز أو خسارة. وتحتفظ كل بطاقة برابط المصدر الأصلي، ومسؤول، ووسوم، وسلسلة تعليقات، وسجل تدقيق للتغييرات، وتقديرات .xlsx مرفوعة يجري تحليلها وحفظها مع سجل التعديلات. للمستخدمين أدوار (مدير، وباحث، ومورّد)، ويمكن الإعلان عن المناقصات الجديدة بالبريد الإلكتروني أو Telegram. الواجهة الخلفية NestJS مع Prisma وPostgreSQL وBullMQ على Redis وتخزين ملفات متوافق مع S3، والواجهة الأمامية Next.js في مستودع واحد بنظام Turborepo."],
    },
    features: [
      { title: { en: "Portal scrapers", ru: "Сбор с порталов", zh: "门户爬虫", tr: "Portal scraper'ları", ar: "أدوات استخراج البوابات" }, text: { en: "Scheduled collection from three procurement portals with deduplication and a run log.", ru: "Сбор с трёх порталов закупок по расписанию, без дублей и с журналом запусков.", zh: "按计划从三个采购门户采集，支持去重并带有运行日志。", tr: "Üç ihale portalından tekilleştirme ve çalıştırma günlüğüyle zamanlanmış toplama.", ar: "جمع مجدول من ثلاث بوابات مشتريات مع إزالة التكرار وسجل بالتشغيلات." } },
      { title: { en: "Tender pipeline", ru: "Воронка тендеров", zh: "招标流水线", tr: "İhale hattı", ar: "مسار المناقصات" }, text: { en: "Statuses, assignees, tags, comments and a full audit history on every tender.", ru: "Статусы, ответственные, теги, комментарии и полная история изменений по каждому тендеру.", zh: "每个招标都有状态、负责人、标签、评论和完整的审计历史。", tr: "Her ihalede durumlar, sorumlular, etiketler, yorumlar ve eksiksiz denetim geçmişi.", ar: "حالات ومسؤولون ووسوم وتعليقات وسجل تدقيق كامل لكل مناقصة." } },
      { title: { en: "Estimates and export", ru: "Сметы и выгрузка", zh: "估算与导出", tr: "Tahminler ve dışa aktarım", ar: "التقديرات والتصدير" }, text: { en: "Upload and parse .xlsx estimates per tender; export the filtered list to Excel or CSV.", ru: "Загрузка и разбор смет в .xlsx по каждому тендеру, выгрузка отфильтрованного списка в Excel или CSV.", zh: "按招标上传并解析 .xlsx 估算表；将筛选后的列表导出到 Excel 或 CSV。", tr: "İhale başına .xlsx tahminlerini yükleyin ve ayrıştırın; filtrelenmiş listeyi Excel veya CSV'ye aktarın.", ar: "رفع تقديرات .xlsx وتحليلها لكل مناقصة؛ وتصدير القائمة المصفّاة إلى Excel أو CSV." } },
    ],
    tags: { en: ["Next.js 14","React 18","TypeScript"], ru: ["Next.js 14","React 18","TypeScript"], zh: ["Next.js 14", "React 18", "TypeScript"], tr: ["Next.js 14", "React 18", "TypeScript"], ar: ["Next.js 14", "React 18", "TypeScript"] },
    stack: ["Next.js 14","React 18","TypeScript","Tailwind CSS","Zustand","NestJS 10","Prisma","PostgreSQL","BullMQ","Redis","MinIO / S3","Cheerio","ExcelJS","Turborepo"],
    palette: ["#ffffff","#111827","#2563eb","#dbeafe"],
  },
  {
    slug: "texi-driver",
    title: { en: "Driver Service", ru: "Driver Service", zh: "Driver Service", tr: "Driver Service", ar: "Driver Service" },
    client: { en: "Intercity transfer service between Bishkek, Almaty and other cities", ru: "Сервис междугородних поездок между Бишкеком, Алматы и другими городами", zh: "比什凯克、阿拉木图及其他城市之间的城际接送服务", tr: "Bişkek, Almatı ve diğer şehirler arasında şehirlerarası transfer hizmeti", ar: "خدمة رحلات بين المدن تربط بيشكيك وألماتي ومدنًا أخرى" },
    status: "built",
    category: "web",
    sphere: { en: "Transportation", ru: "Пассажирские перевозки", zh: "交通运输", tr: "Ulaşım", ar: "النقل" },
    format: { en: "Multi-page website with online ride booking", ru: "Многостраничный сайт с онлайн-бронированием поездки", zh: "带在线订车功能的多页面网站", tr: "Online yolculuk rezervasyonlu çok sayfalı web sitesi", ar: "موقع متعدد الصفحات مع حجز الرحلات عبر الإنترنت" },
    year: 2025,
    domain: "driver service",
    cover: "/images/showcase/texi-driver/cover.jpg",
    gallery: [
      { src: "/images/showcase/texi-driver/screen-2.jpg", alt: { en: "Driver Service — screen 2", ru: "Driver Service — экран 2", zh: "Driver Service — 第 2 屏", tr: "Driver Service — ekran 2", ar: "Driver Service — الشاشة 2" } },
      { src: "/images/showcase/texi-driver/screen-3.jpg", alt: { en: "Driver Service — screen 3", ru: "Driver Service — экран 3", zh: "Driver Service — 第 3 屏", tr: "Driver Service — ekran 3", ar: "Driver Service — الشاشة 3" } },
    ],
    mobile: "/images/showcase/texi-driver/mobile.jpg",
    summary: { en: "A website for an intercity driver service: fleet classes, popular routes with prices, contacts and a three-step booking form. Available in Russian, Kyrgyz and English.", ru: "Сайт сервиса междугородних поездок: классы автомобилей, популярные маршруты с ценами, контакты и форма бронирования в три шага. Работает на русском, кыргызском и английском.", zh: "一家城际司机服务的网站：车型等级、带价格的热门线路、联系方式和三步预订表单。支持俄语、吉尔吉斯语和英语。", tr: "Şehirlerarası şoför hizmeti için bir web sitesi: araç sınıfları, fiyatlı popüler rotalar, iletişim bilgileri ve üç adımlı rezervasyon formu. Rusça, Kırgızca ve İngilizce sunuluyor.", ar: "موقع لخدمة سائقين بين المدن: فئات المركبات، والمسارات الشائعة بأسعارها، ومعلومات الاتصال، ونموذج حجز من ثلاث خطوات. متاح بالروسية والقرغيزية والإنجليزية." },
    review: {
      en: [
        "The site sells comfortable intercity rides, mainly Bishkek–Almaty and trips across Kyrgyzstan. The home page leads with a full-screen photo and two actions — book a ride or see the fleet; separate pages cover vehicles, routes with duration and starting price, and contacts.",
        "Booking is a three-step wizard: route and date/time, vehicle class, then passenger details. The fleet page shows interactive 3D car models (sedan, minivan, SUV) embedded from Sketchfab, so a customer can rotate the car before choosing a class.",
        "The visual style is black with a gold gradient and Montserrat type. It is a Vite + React SPA with React Router, i18next for three languages, Framer Motion for transitions and date/time pickers in the form; booking requests are sent to the operator's Telegram.",
      ],
      ru: [
        "Сайт продаёт комфортные междугородние поездки — в первую очередь Бишкек–Алматы и маршруты по Кыргызстану. Главная начинается с полноэкранного фото и двух действий: забронировать поездку или посмотреть автопарк; отдельные страницы — транспорт, маршруты с длительностью и ценой «от», контакты.",
        "Бронирование — мастер из трёх шагов: маршрут и дата/время, класс автомобиля, данные пассажира. На странице автопарка встроены интерактивные 3D-модели машин (седан, минивэн, внедорожник) со Sketchfab — машину можно покрутить до выбора класса.",
        "Стиль — чёрный фон, золотой градиент и шрифт Montserrat. Это SPA на Vite и React с React Router, i18next для трёх языков, Framer Motion для анимаций и выбором даты/времени в форме; заявки уходят оператору в Telegram.",
      ],
      zh: ["网站销售舒适的城际出行服务，主要是比什凯克—阿拉木图以及吉尔吉斯斯坦境内的行程。首页以全屏照片开场，并提供两个操作——预订行程或查看车队；其他页面分别介绍车辆、含时长和起步价的线路以及联系方式。", "预订是三步向导：线路与日期/时间、车型等级、乘客信息。车队页面展示从 Sketchfab 嵌入的可交互 3D 车型（轿车、小型厢式车、SUV），客户在选择车型等级前就可以旋转查看车辆。", "视觉风格为黑色搭配金色渐变和 Montserrat 字体。它是基于 Vite + React 的 SPA，使用 React Router、支持三种语言的 i18next、用于转场的 Framer Motion，以及表单中的日期/时间选择器；预订请求会发送到运营人员的 Telegram。"],
      tr: ["Site rahat şehirlerarası yolculukları satıyor; ağırlıklı olarak Bişkek–Almatı ve Kırgızistan içi seferler. Ana sayfa tam ekran bir fotoğraf ve iki eylemle açılıyor: yolculuk rezervasyonu veya araç filosunu görmek. Ayrı sayfalar araçları, süre ve başlangıç fiyatıyla rotaları ve iletişim bilgilerini kapsıyor.", "Rezervasyon üç adımlı bir sihirbaz: rota ve tarih/saat, araç sınıfı, ardından yolcu bilgileri. Filo sayfası Sketchfab'den gömülmüş etkileşimli 3D araç modelleri (sedan, minivan, SUV) gösteriyor; böylece müşteri sınıf seçmeden önce aracı döndürebiliyor.", "Görsel stil, altın gradyanlı siyah ve Montserrat yazı tipi. React Router, üç dil için i18next, geçişler için Framer Motion ve formda tarih/saat seçicilerin olduğu bir Vite + React SPA; rezervasyon talepleri operatörün Telegram'ına gönderiliyor."],
      ar: ["يبيع الموقع رحلات مريحة بين المدن، أبرزها بيشكيك–ألماتي والرحلات داخل قرغيزستان. تتصدر الصفحة الرئيسية صورة بملء الشاشة وإجراءان: احجز رحلة أو تصفّح الأسطول؛ وتغطي صفحات منفصلة المركبات، والمسارات بمدتها وسعرها الابتدائي، والتواصل.", "الحجز معالج من ثلاث خطوات: المسار والتاريخ والوقت، ثم فئة المركبة، ثم بيانات الركاب. وتعرض صفحة الأسطول نماذج ثلاثية الأبعاد تفاعلية للسيارات (سيدان، ومينيفان، وSUV) مدمجة من Sketchfab، فيستطيع العميل تدوير السيارة قبل اختيار الفئة.", "النمط البصري أسود مع تدرّج ذهبي وخط Montserrat. وهو تطبيق SPA بـ Vite وReact مع React Router، وi18next للغات الثلاث، وFramer Motion للانتقالات، وأدوات اختيار التاريخ والوقت في النموذج؛ وتُرسَل طلبات الحجز إلى Telegram الخاص بالمشغّل."],
    },
    features: [
      { title: { en: "3-step booking wizard", ru: "Бронирование в 3 шага", zh: "3 步预订向导", tr: "3 adımlı rezervasyon sihirbazı", ar: "معالج حجز من 3 خطوات" }, text: { en: "Route and date, vehicle class, passenger details — with a progress indicator and date/time pickers.", ru: "Маршрут и дата, класс авто, данные пассажира — с индикатором прогресса и выбором даты и времени.", zh: "线路与日期、车型等级、乘客信息——带进度指示器和日期/时间选择器。", tr: "Rota ve tarih, araç sınıfı, yolcu bilgileri; ilerleme göstergesi ve tarih/saat seçicilerle.", ar: "المسار والتاريخ، وفئة المركبة، وبيانات الراكب، مع مؤشر تقدّم وأدوات اختيار التاريخ والوقت." } },
      { title: { en: "3D fleet preview", ru: "3D-автопарк", zh: "3D 车队预览", tr: "3D filo önizlemesi", ar: "معاينة الأسطول بالأبعاد الثلاثة" }, text: { en: "Sedan, minivan and SUV are shown as interactive 3D models the customer can rotate.", ru: "Седан, минивэн и внедорожник показаны интерактивными 3D-моделями, которые можно вращать.", zh: "轿车、小型厢式车和 SUV 以可交互的 3D 模型呈现，客户可以旋转查看。", tr: "Sedan, minivan ve SUV, müşterinin döndürebildiği etkileşimli 3D modeller olarak gösteriliyor.", ar: "تُعرض السيدان والمينيفان والـ SUV كنماذج ثلاثية الأبعاد تفاعلية يمكن للعميل تدويرها." } },
      { title: { en: "Three languages", ru: "Три языка", zh: "三种语言", tr: "Üç dil", ar: "ثلاث لغات" }, text: { en: "The whole interface switches between Russian, Kyrgyz and English.", ru: "Весь интерфейс переключается между русским, кыргызским и английским.", zh: "整个界面可在俄语、吉尔吉斯语和英语之间切换。", tr: "Arayüzün tamamı Rusça, Kırgızca ve İngilizce arasında geçiş yapıyor.", ar: "تتبدل الواجهة كلها بين الروسية والقرغيزية والإنجليزية." } },
    ],
    tags: { en: ["React","TypeScript","Vite"], ru: ["React","TypeScript","Vite"], zh: ["React", "TypeScript", "Vite"], tr: ["React", "TypeScript", "Vite"], ar: ["React", "TypeScript", "Vite"] },
    stack: ["React","TypeScript","Vite","Tailwind CSS","React Router","i18next","Framer Motion","Sketchfab embeds","Telegram Bot API","Vercel"],
    palette: ["#000000","#FFFFFF","#F5D37D","#A37C1E"],
  },
  {
    slug: "anteyko-offer",
    title: { en: "Anteyko $500 App Offer", ru: "Оффер Anteyko: приложение за $500", zh: "Anteyko 500 美元应用方案", tr: "Anteyko 500 $ Uygulama Teklifi", ar: "عرض Anteyko: تطبيق بـ 500 دولار" },
    client: { en: "The studio's own sales offer: a business app (PWA) for $500", ru: "Собственный оффер студии: приложение для бизнеса (PWA) за $500", zh: "工作室自己的销售方案：500 美元的商业应用（PWA）", tr: "Stüdyonun kendi satış teklifi: 500 $'a bir işletme uygulaması (PWA)", ar: "عرض المبيعات الخاص بالاستوديو: تطبيق للأعمال (PWA) بـ 500 دولار" },
    status: "built",
    category: "product",
    sphere: { en: "Small business / sales", ru: "Малый бизнес / продажи", zh: "小微企业 / 销售", tr: "Küçük işletme / satış", ar: "المشاريع الصغيرة / المبيعات" },
    format: { en: "Installable PWA offer with interactive demo", ru: "Устанавливаемое PWA-предложение с интерактивным демо", zh: "附交互式演示的可安装 PWA 方案", tr: "Etkileşimli demolu, yüklenebilir PWA teklifi", ar: "عرض PWA قابل للتثبيت مع عرض تجريبي تفاعلي" },
    year: 2026,
    domain: "anteyko $500 app offer",
    cover: "/images/showcase/anteyko-offer/cover.jpg",
    gallery: [
      { src: "/images/showcase/anteyko-offer/screen-2.jpg", alt: { en: "Anteyko $500 App Offer — screen 2", ru: "Оффер Anteyko — экран 2", zh: "Anteyko 500 美元应用方案 — 第 2 屏", tr: "Anteyko 500 $ Uygulama Teklifi — ekran 2", ar: "عرض Anteyko — الشاشة 2" } },
      { src: "/images/showcase/anteyko-offer/screen-3.jpg", alt: { en: "Anteyko $500 App Offer — screen 3", ru: "Оффер Anteyko — экран 3", zh: "Anteyko 500 美元应用方案 — 第 3 屏", tr: "Anteyko 500 $ Uygulama Teklifi — ekran 3", ar: "عرض Anteyko — الشاشة 3" } },
    ],
    mobile: "/images/showcase/anteyko-offer/mobile.jpg",
    summary: { en: "An offer page that is itself the product it sells: a PWA that installs on the phone's home screen and shows a small business what its own app would look like. Four tabs cover the offer, a live demo for a café, barbershop or shop, the package contents and a lead form that sends to WhatsApp.", ru: "Страница-оффер, которая сама является продаваемым продуктом: PWA ставится на экран «Домой» и показывает малому бизнесу, как будет выглядеть его приложение. Четыре вкладки — оффер, живое демо для кофейни, барбершопа или магазина, состав пакета и заявка с отправкой в WhatsApp.", zh: "一个本身就是所售产品的方案页面：这是一个可安装到手机主屏幕的 PWA，向小微企业展示它们自己的应用会是什么样子。四个标签页分别是方案介绍、面向咖啡馆、理发店或商店的实时演示、套餐内容，以及发送至 WhatsApp 的线索表单。", tr: "Sattığı ürünün kendisi olan bir teklif sayfası: telefonun ana ekranına kurulan ve küçük bir işletmeye kendi uygulamasının nasıl görüneceğini gösteren bir PWA. Dört sekme; teklifi, bir kafe, berber veya mağaza için canlı bir demoyu, paket içeriğini ve WhatsApp'a gönderen bir başvuru formunu kapsıyor.", ar: "صفحة عرض هي بحد ذاتها المنتج الذي تبيعه: PWA تُثبَّت على الشاشة الرئيسية للهاتف وتُري صاحب المشروع الصغير كيف سيبدو تطبيقه الخاص. أربع تبويبات تغطي العرض، وعرضًا تجريبيًا حيًّا لمقهى أو صالون حلاقة أو متجر، ومحتويات الباقة، ونموذج طلب يُرسَل إلى WhatsApp." },
    review: {
      en: [
        "The idea is 'show, don't tell': instead of describing a mobile app, the page behaves like one. It has a bottom tab bar, an install button (with a separate iOS instruction sheet) and an offline-capable service worker; on desktop it is framed in a phone mockup.",
        "The demo tab switches between three niches with their own menu, categories and an order button, so the owner of a café or barbershop can try the experience their customers would get. The tariff tab lists what's included and a countdown to the end of the intake; the lead form collects the business type and needs and opens WhatsApp with a ready message.",
        "It is deliberately built without a framework: plain HTML, CSS and ~200 lines of JavaScript, a web manifest and a cache-first service worker. The design follows a restrained dark interface with Inter and JetBrains Mono and an indigo accent.",
      ],
      ru: [
        "Принцип — «покажи, а не рассказывай»: вместо описания мобильного приложения страница сама ведёт себя как приложение. Нижняя панель вкладок, кнопка установки (с отдельной подсказкой для iOS) и service worker для работы офлайн; на десктопе всё показано в рамке телефона.",
        "Во вкладке демо можно переключить нишу — кофейня, барбершоп или магазин — со своим меню, категориями и кнопкой заказа, и владелец бизнеса сразу видит, что получат его клиенты. Во вкладке тарифа — состав пакета и таймер до закрытия набора, а форма заявки собирает тип бизнеса и задачи и открывает WhatsApp с готовым сообщением.",
        "Сделано намеренно без фреймворков: чистые HTML, CSS и около 200 строк JavaScript, манифест и service worker с кешированием. Дизайн — сдержанный тёмный интерфейс на Inter и JetBrains Mono с индиго-акцентом.",
      ],
      zh: ["理念是“展示，而非讲述”：页面不是描述一款移动应用，而是直接表现得像一款应用。它有底部标签栏、安装按钮（另有单独的 iOS 安装指引）和支持离线的 service worker；在桌面端则嵌在手机样机框中。", "演示标签页可在三种业态之间切换，各有自己的菜单、分类和下单按钮，咖啡馆或理发店的老板可以亲自体验自己的顾客将获得的感受。套餐标签页列出包含的内容和报名截止倒计时；线索表单收集业务类型和需求，并打开带预填消息的 WhatsApp。", "它刻意不使用框架：纯 HTML、CSS 和约 200 行 JavaScript，外加 web manifest 和缓存优先的 service worker。设计采用克制的深色界面，搭配 Inter 和 JetBrains Mono 字体及靛蓝色点缀。"],
      tr: ["Fikir “anlatma, göster”: mobil uygulamayı tarif etmek yerine sayfa bir uygulama gibi davranıyor. Alt sekme çubuğu, bir kurulum düğmesi (ayrı bir iOS talimat sayfasıyla) ve çevrimdışı çalışabilen bir service worker var; masaüstünde bir telefon mockup'ının içinde gösteriliyor.", "Demo sekmesi, her biri kendi menüsü, kategorileri ve sipariş düğmesi olan üç niş arasında geçiş yapıyor; böylece bir kafe veya berber sahibi müşterilerinin yaşayacağı deneyimi deneyebiliyor. Tarife sekmesi nelerin dahil olduğunu ve başvuru dönemi bitimine geri sayımı listeliyor; başvuru formu işletme türünü ve ihtiyaçları toplayıp hazır bir mesajla WhatsApp'ı açıyor.", "Bilerek framework kullanılmadan yapıldı: sade HTML, CSS ve yaklaşık 200 satır JavaScript, bir web manifest ve önce önbelleği kullanan bir service worker. Tasarım, Inter ve JetBrains Mono ile çivit mavisi bir vurgu içeren ölçülü bir koyu arayüzü izliyor."],
      ar: ["الفكرة «أرِ ولا تَصِف»: بدلًا من وصف تطبيق جوال، تتصرف الصفحة كتطبيق. فيها شريط تبويبات سفلي، وزر تثبيت (مع ورقة تعليمات مستقلة لنظام iOS)، وservice worker يعمل دون اتصال؛ وعلى سطح المكتب تظهر داخل إطار هاتف.", "يتنقل تبويب العرض التجريبي بين ثلاثة قطاعات، لكل منها قائمتها وفئاتها وزر طلبها، فيستطيع صاحب المقهى أو صالون الحلاقة تجربة ما سيحصل عليه عملاؤه. ويسرد تبويب الباقة ما تشمله مع عدّ تنازلي لانتهاء باب التسجيل؛ ويجمع نموذج الطلب نوع النشاط والاحتياجات ويفتح WhatsApp برسالة جاهزة.", "بُنيت عمدًا دون إطار عمل: HTML وCSS عادية ونحو 200 سطر من JavaScript، وملف manifest وservice worker بالتخزين المؤقت أولًا. والتصميم واجهة داكنة رصينة بخطي Inter وJetBrains Mono ولمسة نيلية."],
    },
    features: [
      { title: { en: "Installs like an app", ru: "Ставится как приложение", zh: "像应用一样安装", tr: "Uygulama gibi kuruluyor", ar: "يُثبَّت كتطبيق" }, text: { en: "Web manifest, install prompt for Android and a step-by-step sheet for iOS; works offline via service worker.", ru: "Манифест, кнопка установки на Android и пошаговая подсказка для iOS; работает офлайн через service worker.", zh: "Web manifest、Android 安装提示和 iOS 分步指引；通过 service worker 支持离线使用。", tr: "Web manifest, Android için kurulum istemi ve iOS için adım adım bir sayfa; service worker sayesinde çevrimdışı çalışıyor.", ar: "ملف manifest للويب، وطلب تثبيت لنظام Android، وورقة تعليمات خطوة بخطوة لنظام iOS؛ ويعمل دون اتصال عبر service worker." } },
      { title: { en: "Interactive niche demo", ru: "Интерактивное демо по нишам", zh: "按业态切换的交互式演示", tr: "Etkileşimli niş demosu", ar: "عرض تجريبي تفاعلي حسب القطاع" }, text: { en: "Café, barbershop and shop presets with their own menus and an order button.", ru: "Готовые примеры для кофейни, барбершопа и магазина со своим меню и кнопкой заказа.", zh: "咖啡馆、理发店和商店预设，各有自己的菜单和下单按钮。", tr: "Kendi menüleri ve sipariş düğmesi olan kafe, berber ve mağaza ön ayarları.", ar: "قوالب جاهزة للمقهى وصالون الحلاقة والمتجر بقوائمها الخاصة وزر طلب." } },
      { title: { en: "Lead straight to WhatsApp", ru: "Заявка сразу в WhatsApp", zh: "线索直达 WhatsApp", tr: "Başvuru doğrudan WhatsApp'a", ar: "الطلب مباشرة إلى WhatsApp" }, text: { en: "The form gathers business type and needs and opens a pre-filled WhatsApp chat; Telegram as an alternative.", ru: "Форма собирает тип бизнеса и задачи и открывает чат WhatsApp с готовым текстом; Telegram — как альтернатива.", zh: "表单收集业务类型和需求，并打开预填好内容的 WhatsApp 对话；Telegram 作为备选。", tr: "Form işletme türünü ve ihtiyaçları topluyor ve önceden doldurulmuş bir WhatsApp sohbeti açıyor; alternatif olarak Telegram.", ar: "يجمع النموذج نوع النشاط والاحتياجات ويفتح محادثة WhatsApp معبّأة مسبقًا؛ وTelegram بديل." } },
    ],
    tags: { en: ["HTML","CSS","JavaScript"], ru: ["HTML","CSS","JavaScript"], zh: ["HTML", "CSS", "JavaScript"], tr: ["HTML", "CSS", "JavaScript"], ar: ["HTML", "CSS", "JavaScript"] },
    stack: ["HTML","CSS","JavaScript","PWA","Service Worker","Web App Manifest"],
    palette: ["#08090A","#F7F8F8","#5E6AD2","#828FFF"],
  },
];

/** Everything that is actually shown on the site */
export const visibleShowcaseItems = showcaseItems.filter((s) => !s.hidden);

export function getShowcaseItem(slug: string): ShowcaseItem | undefined {
  return visibleShowcaseItems.find((s) => s.slug === slug);
}
