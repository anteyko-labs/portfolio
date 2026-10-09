import type { CaseCategory } from "./cases-data";

// Website & product showcase: concept sites (live, self-contained demos in
// /public/demos), production sites and studio projects captured from their
// repositories. Engineering deep-dives stay in cases-data.ts — the /cases
// catalog merges both sources (see catalog.ts).
//
// Adding a work: copy an object, change the fields. Images live in
// /public/images/showcase/<slug>/. A `demo` gets a live, auto-scrolling
// iframe preview; a `fullPage` screenshot pans on hover; a `gallery` of 2+
// screens plays as a slideshow on hover.

type L = { en: string; ru: string };

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
  /** The signature animation — such works get a highlighted card */
  signature?: L;
  summary: L;
  review: { en: string[]; ru: string[] };
  features: { title: L; text: L }[];
  tags: { en: string[]; ru: string[] };
  stack?: string[];
  /** Background, text, accent, second accent */
  palette: [string, string, string, string];
  fonts?: string;
}

const img = (slug: string, file: string) => `/images/showcase/${slug}/${file}`;

export const showcaseItems: ShowcaseItem[] = [
  {
    slug: "gran",
    signature: { en: "3D building assembles on scroll", ru: "3D-сборка здания по скроллу" },
    title: { en: "GRAN", ru: "ГРАНЬ" },
    client: { en: "Developer of monolithic residential districts", ru: "Девелопер монолитных кварталов" },
    status: "concept",
    category: "web",
    sphere: { en: "Real estate", ru: "Девелопмент" },
    format: { en: "Corporate website", ru: "Корпоративный сайт" },
    year: 2026,
    domain: "gran",
    demo: "/demos/gran/index.html",
    url: "/demos/gran/index.html",
    cover: img("gran", "cover.jpg"),
    summary: {
      en: "The whole first screen is driven by scroll: nine concrete bodies assemble into a building while the headline lines slide apart. The heroes wear a concrete texture with formwork seams — a metaphor for what the company does.",
      ru: "Ключевой эффект — первый экран, целиком завязанный на прокрутку: девять бетонных тел собираются в корпус, пока строки заголовка разъезжаются в стороны. Героям сайта назначена текстура бетона со швами опалубки — метафора того, чем занимается компания.",
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
    },
    features: [
      { title: { en: "Building assembled by scroll", ru: "Сборка корпуса по скроллу" }, text: { en: "Nine 3D bodies with a concrete texture form a building; the background shifts from graphite to light concrete.", ru: "Девять 3D-тел с фактурой бетона складываются в здание, фон переходит из графита в светлый бетон." } },
      { title: { en: "Monolith stages", ru: "Этапы монолита" }, text: { en: "A pinned cross‑section is poured floor by floor; the crane and counters move with the scroll.", ru: "Закреплённый разрез заливается поэтажно, кран и счётчики идут вместе с прокруткой." } },
      { title: { en: "A ruler instead of a progress bar", ru: "Линейка вместо прогресс-бара" }, text: { en: "Page position is shown as an elevation mark on a builder's staff.", ru: "Положение на странице показано как отметка высоты на строительной рейке." } },
    ],
    tags: { en: ["CSS 3D", "Scroll scene", "Procedural textures"], ru: ["CSS 3D", "Скролл-сцена", "Процедурные текстуры"] },
    palette: ["#121314", "#ECEAE4", "#FF5A1F", "#CBC9C3"],
    fonts: "Unbounded · Golos Text",
  },
  {
    slug: "paddock",
    title: { en: "Paddock Rent a Car", ru: "Paddock Rent a Car" },
    client: { en: "Premium car rental in Dubai", ru: "Прокат премиальных автомобилей в Дубае" },
    status: "live",
    category: "web",
    sphere: { en: "Car rental", ru: "Прокат авто" },
    format: { en: "Catalog with booking", ru: "Каталог с бронированием" },
    year: 2025,
    url: "https://paddockrentacar.com",
    embed: "https://paddockrentacar.com",
    domain: "paddockrentacar.com",
    cover: img("paddock", "cover.jpg"),
    fullPage: img("paddock", "full.jpg"),
    summary: {
      en: "A rental storefront where the car is the hero of every screen. The catalog filters by body type, brand and district, prices are shown per day, week and month, and booking is one tap away in WhatsApp.",
      ru: "Витрина проката, где машина — главный герой каждого экрана. Каталог фильтруется по типу, марке и району, цена сразу показана за день, неделю и месяц, а до брони — одно касание в WhatsApp.",
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
    },
    features: [
      { title: { en: "Catalog with three filters", ru: "Каталог с тремя фильтрами" }, text: { en: "Body type, brand and delivery location — picking a car takes seconds.", ru: "Тип кузова, марка и локация подачи — подбор занимает несколько секунд." } },
      { title: { en: "Price without a call", ru: "Цена без звонка" }, text: { en: "Daily, weekly and monthly rates are visible right on the car card.", ru: "Тарифы за день, неделю и месяц видны прямо в карточке автомобиля." } },
      { title: { en: "Booking in a messenger", ru: "Бронь в мессенджере" }, text: { en: "WhatsApp and phone are reachable from any screen, support in English and Russian.", ru: "WhatsApp и телефон доступны с любого экрана, поддержка на английском и русском." } },
    ],
    tags: { en: ["Catalog", "Filters", "Multi-currency"], ru: ["Каталог", "Фильтры", "Мультивалютность"] },
    palette: ["#0B0B0C", "#F4F1EA", "#E4252A", "#8C8A84"],
  },
  {
    slug: "lumo",
    signature: { en: "The phone assembles the UI", ru: "Телефон собирает интерфейс" },
    title: { en: "Lumo", ru: "Lumo" },
    client: { en: "Fintech wallet for freelancers and small teams", ru: "Финтех-кошелёк для фрилансеров и небольших команд" },
    status: "concept",
    category: "web",
    sphere: { en: "Fintech", ru: "Финтех" },
    format: { en: "Product landing page", ru: "Продуктовый лендинг" },
    year: 2026,
    domain: "lumo",
    demo: "/demos/lumo/index.html",
    url: "/demos/lumo/index.html",
    cover: img("lumo", "cover.jpg"),
    summary: {
      en: "The app literally assembles in front of you: the phone turns towards the viewer and floating interface cards drop into their slots on the screen. Not a single image — the whole UI is built in code and works.",
      ru: "Приложение буквально собирается на глазах: телефон разворачивается к зрителю, а летающие карточки интерфейса встают в свои слоты на экране. Ни одной картинки — весь интерфейс свёрстан кодом и работает.",
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
    },
    features: [
      { title: { en: "The phone assembles the UI", ru: "Телефон собирает интерфейс" }, text: { en: "Cards fly into the screen and become part of the app as you scroll.", ru: "Карточки влетают в экран и становятся частью приложения по мере прокрутки." } },
      { title: { en: "Live bento", ru: "Живое бенто" }, text: { en: "Converter, invoice stamp, card freeze — everything is clickable.", ru: "Конвертер, штамп на инвойсе, заморозка карты — всё можно нажать." } },
      { title: { en: "Card with a glare", ru: "Карта с бликом" }, text: { en: "The 3D card tilts towards the cursor, a highlight glides across the surface.", ru: "3D-карта наклоняется за курсором, блик движется по поверхности." } },
    ],
    tags: { en: ["Product landing", "UI in code", "3D scene"], ru: ["Продуктовый лендинг", "UI в коде", "3D-сцена"] },
    palette: ["#FAFAF7", "#0D0D10", "#C8FF3D", "#6B4DFF"],
    fonts: "Onest · JetBrains Mono",
  },
  {
    slug: "ferro",
    title: { en: "Ferro Nord", ru: "Ферро Норд" },
    client: { en: "Steel plant: rolled products, pipes, special alloys", ru: "Металлургический завод: прокат, трубы, спецсплавы" },
    status: "concept",
    category: "web",
    sphere: { en: "Metallurgy", ru: "Металлургия" },
    format: { en: "Corporate website", ru: "Корпоративный сайт" },
    year: 2026,
    domain: "ferro nord",
    demo: "/demos/ferro/index.html",
    url: "/demos/ferro/index.html",
    cover: img("ferro", "cover.jpg"),
    summary: {
      en: "All content obeys four columns with the weight on the right half. The first screen is presentational: a large headline, a brand mark made of rolled‑steel sections and a restrained intro — a simple move that adds authority.",
      ru: "Всё содержимое подчинено четырём колонкам с акцентом на правой половине. Первый экран презентационный: большой заголовок, фирменный знак из сечений проката и сдержанное интро — простой приём, который усиливает авторитет.",
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
    },
    features: [
      { title: { en: "Four-column grid", ru: "Сетка в четыре колонки" }, text: { en: "Visible guides and a constant emphasis on the right half of the screen.", ru: "Видимые направляющие и постоянный акцент на правой половине экрана." } },
      { title: { en: "Panel curtain", ru: "Занавес из панелей" }, text: { en: "One transition for every section and the mobile menu.", ru: "Единый переход между всеми секциями и в мобильном меню." } },
      { title: { en: "A drawing that draws itself", ru: "Чертёж, который рисуется" }, text: { en: "The profile section is redrawn when a catalog item is selected.", ru: "Сечение профиля перерисовывается при выборе позиции в каталоге." } },
    ],
    tags: { en: ["Swiss typography", "Grid", "SVG drawings"], ru: ["Швейцарская типографика", "Сетка", "SVG-чертежи"] },
    palette: ["#F4F3EF", "#0E0E0E", "#E63A12", "#8A8F94"],
    fonts: "Inter Tight · JetBrains Mono",
  },
  {
    slug: "kvant",
    signature: { en: "Zoom from wafer to a single die", ru: "Зум от пластины до кристалла" },
    title: { en: "Kvant·Lab", ru: "Квант·Лаб" },
    client: { en: "Microelectronics R&D and fabrication centre", ru: "Центр разработки и производства микроэлектроники" },
    status: "concept",
    category: "web",
    sphere: { en: "Microelectronics", ru: "Микроэлектроника" },
    format: { en: "Corporate website", ru: "Корпоративный сайт" },
    year: 2026,
    domain: "kvant·lab",
    demo: "/demos/kvant/index.html",
    url: "/demos/kvant/index.html",
    cover: img("kvant", "cover.jpg"),
    summary: {
      en: "Scrolling the first screen works like a microscope: from a wafer with hundreds of dies to a single die and further, to its layout. The headline decodes character by character, instrument readouts recalculate from millimetres to nanometres.",
      ru: "Прокрутка первого экрана работает как микроскоп: от пластины с сотнями кристаллов — к одному кристаллу и дальше, к его топологии. Заголовок расшифровывается посимвольно, приборные показания пересчитываются от миллиметров до нанометров.",
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
    },
    features: [
      { title: { en: "Zoom from wafer to traces", ru: "Зум от пластины к трассам" }, text: { en: "A canvas scene turns into SVG layout with light pulses running along the waveguides.", ru: "Canvas-сцена переходит в SVG-топологию, по волноводам бегут импульсы света." } },
      { title: { en: "Scroll-driven headline", ru: "Заголовок по скроллу" }, text: { en: "Text decodes character by character, strictly tied to scroll position.", ru: "Текст декодируется посимвольно строго по позиции прокрутки." } },
      { title: { en: "Process strip", ru: "Лента техпроцесса" }, text: { en: "Five operations with live diagrams in a pinned horizontal section.", ru: "Пять операций с живыми схемами в горизонтальной закреплённой секции." } },
    ],
    tags: { en: ["Canvas", "Deep tech", "Horizontal scroll"], ru: ["Canvas", "Deep tech", "Горизонтальный скролл"] },
    palette: ["#07080B", "#E9EEF3", "#3DF2E0", "#8B5CFF"],
    fonts: "Onest · JetBrains Mono",
  },
  {
    slug: "alatoo",
    signature: { en: "7-layer mountain parallax", ru: "Параллакс из семи хребтов" },
    title: { en: "Ala-Too Trek", ru: "Ала-Тоо Трек" },
    client: { en: "Trekking and horse expeditions in the mountains of Kyrgyzstan", ru: "Треккинг и конные экспедиции в горах Кыргызстана" },
    status: "concept",
    category: "web",
    sphere: { en: "Tourism", ru: "Туризм" },
    format: { en: "Tour operator website", ru: "Сайт туроператора" },
    year: 2026,
    domain: "ala-too trek",
    demo: "/demos/alatoo/index.html",
    url: "/demos/alatoo/index.html",
    cover: img("alatoo", "cover.jpg"),
    summary: {
      en: "Scrolling lifts the viewer from a spruce valley at dawn to a mountain pass at golden hour. Seven ridge layers move at different speeds, the headline sits between them and an altimeter climbs from 1,600 to 4,000 metres.",
      ru: "Прокрутка поднимает зрителя из еловой долины на рассвете к перевалу в золотой час. Семь слоёв хребтов движутся с разной скоростью, заголовок стоит между ними, счётчик высоты идёт от 1 600 до 4 000 метров.",
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
    },
    features: [
      { title: { en: "Ascent through layers", ru: "Подъём сквозь слои" }, text: { en: "Deep parallax of seven ridges with a shifting time of day.", ru: "Глубокий параллакс из семи хребтов со сменой времени суток." } },
      { title: { en: "Route on the map", ru: "Маршрут на карте" }, text: { en: "The line is drawn by scroll; elevation profile and day cards move in sync.", ru: "Линия рисуется скроллом, профиль высот и карточки дней идут синхронно." } },
      { title: { en: "A world without photos", ru: "Мир без фотографий" }, text: { en: "Every illustration is generated in code and reacts to the cursor.", ru: "Все иллюстрации сгенерированы кодом и реагируют на курсор." } },
    ],
    tags: { en: ["Parallax", "Vector illustration", "Route map"], ru: ["Параллакс", "Векторная иллюстрация", "Карта маршрута"] },
    palette: ["#12332E", "#F7F4EC", "#F2A33A", "#BFD9E6"],
    fonts: "Prata · Manrope",
  },
  {
    slug: "aera",
    signature: { en: "A whole day in one scroll", ru: "Сутки за один скролл" },
    title: { en: "AERA", ru: "АЭРА" },
    client: { en: "Turnkey wind and solar parks", ru: "Ветровые и солнечные парки под ключ" },
    status: "concept",
    category: "web",
    sphere: { en: "Energy", ru: "Энергетика" },
    format: { en: "Corporate website", ru: "Корпоративный сайт" },
    year: 2026,
    domain: "aera",
    demo: "/demos/aera/index.html",
    url: "/demos/aera/index.html",
    cover: img("aera", "cover.jpg"),
    summary: {
      en: "A full day passes in one scroll of the first screen: dawn, day, sunset and a starry night. The sun travels along an arc and the rotors speed up with the wind — the visitor sees solar generation hand over to wind.",
      ru: "За одну прокрутку первого экрана проходят сутки: рассвет, день, закат и ночь со звёздами. Солнце идёт по дуге, роторы ускоряются вместе с ветром — посетитель видит, как солнечная генерация передаёт смену ветровой.",
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
    },
    features: [
      { title: { en: "A day by scroll", ru: "Сутки по скроллу" }, text: { en: "Sky, sun, hills and turbines change from dawn to night.", ru: "Небо, солнце, холмы и турбины меняются от рассвета до ночи." } },
      { title: { en: "Wind field", ru: "Поле ветра" }, text: { en: "A thousand canvas streamlines react to the cursor and pause off‑screen.", ru: "Тысяча линий тока на canvas реагирует на курсор и ставится на паузу вне экрана." } },
      { title: { en: "Control panel", ru: "Диспетчерская панель" }, text: { en: "Gauges, a generation chart and a turbine matrix in real time.", ru: "Шкалы, график генерации и матрица турбин в реальном времени." } },
    ],
    tags: { en: ["Canvas", "Dashboard", "Glass UI"], ru: ["Canvas", "Дашборд", "Glass UI"] },
    palette: ["#EAF4FF", "#0B2A3C", "#19C2A0", "#FFD36B"],
    fonts: "Geologica · Manrope",
  },
  {
    slug: "meridian",
    signature: { en: "Routes drawn by scroll", ru: "Маршруты рисуются скроллом" },
    title: { en: "Meridian", ru: "Меридиан" },
    client: { en: "Multimodal container shipping across Eurasia", ru: "Мультимодальные контейнерные перевозки по Евразии" },
    status: "concept",
    category: "web",
    sphere: { en: "Logistics", ru: "Логистика" },
    format: { en: "Corporate website", ru: "Корпоративный сайт" },
    year: 2026,
    domain: "meridian",
    demo: "/demos/meridian/index.html",
    url: "/demos/meridian/index.html",
    cover: img("meridian", "cover.jpg"),
    summary: {
      en: "Poster graphics made of coloured container blocks. On a dotted map of Eurasia, scrolling lays down routes, cargo travels along them and a split‑flap board flips through destinations.",
      ru: "Плакатная графика из цветных блоков-контейнеров. На точечной карте Евразии прокрутка прокладывает маршруты, по ним едут грузы, а табло с перекидными символами перелистывает направления.",
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
    },
    features: [
      { title: { en: "Routes on the map", ru: "Маршруты на карте" }, text: { en: "Lines draw on scroll, containers travel the paths, hubs flash.", ru: "Линии рисуются по скроллу, контейнеры едут по путям, хабы вспыхивают." } },
      { title: { en: "Split-flap board", ru: "Перекидное табло" }, text: { en: "Characters flip to new destinations as the screen changes phase.", ru: "Символы перелистываются на новые направления при смене фазы экрана." } },
      { title: { en: "A horizontal train", ru: "Состав по горизонтали" }, text: { en: "The train section moves with vertical scroll, without hijacking the wheel.", ru: "Секция-поезд движется от вертикальной прокрутки, без перехвата колеса." } },
    ],
    tags: { en: ["Poster graphics", "SVG map", "Calculator"], ru: ["Плакатная графика", "SVG-карта", "Калькулятор"] },
    palette: ["#1437FF", "#FFFFFF", "#FFD400", "#0A0F2C"],
    fonts: "Unbounded · Onest",
  },
  {
    slug: "forma",
    title: { en: "Atelier Forma", ru: "Ателье Форма" },
    client: { en: "Solid-wood furniture workshop", ru: "Мануфактура мебели из массива" },
    status: "concept",
    category: "web",
    sphere: { en: "Interior", ru: "Интерьер" },
    format: { en: "Workshop website", ru: "Сайт мануфактуры" },
    year: 2026,
    domain: "atelier forma",
    demo: "/demos/forma/index.html",
    url: "/demos/forma/index.html",
    cover: img("forma", "cover.jpg"),
    summary: {
      en: "A quiet editorial site where a chair drawing assembles part by part as you scroll and turns from a line drawing into an oak object with texture and shadow. Motion is slow and soft; nothing bounces.",
      ru: "Тихий журнальный сайт, где чертёж стула по мере прокрутки собирается деталь за деталью и превращается из линейного рисунка в дубовый предмет с текстурой и тенью. Движение медленное и мягкое, ничего не подпрыгивает.",
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
    },
    features: [
      { title: { en: "Chair assembly", ru: "Сборка стула" }, text: { en: "An exploded drawing with callouts assembles into a finished piece on scroll.", ru: "Разнесённый чертёж с выносками собирается в готовый предмет по прокрутке." } },
      { title: { en: "Masked gallery", ru: "Галерея под масками" }, text: { en: "Still lifes reveal through clip-path with gentle parallax inside the frame.", ru: "Натюрморты раскрываются через clip-path с лёгким параллаксом внутри рамы." } },
      { title: { en: "Wood species switch", ru: "Смена породы" }, text: { en: "The sample changes tone and grain on hover or tap.", ru: "Образец меняет тон и текстуру древесины по наведению или касанию." } },
    ],
    tags: { en: ["Editorial layout", "SVG illustration", "Theme shifts"], ru: ["Редакционная вёрстка", "SVG-иллюстрация", "Смена темы"] },
    palette: ["#F3EDE3", "#2A1F1A", "#B5683C", "#8A977B"],
    fonts: "Cormorant Garamond · Manrope",
  },

  // ── Studio projects, captured from their repositories (2026-10) ──
  {
    slug: "kyrgyz-soul-travel",
    title: { en: "KyrgyzSoul Travel", ru: "KyrgyzSoul Travel" },
    client: { en: "Tour operator: cultural and adventure tours across Kyrgyzstan", ru: "Туроператор: культурные и приключенческие туры по Кыргызстану" },
    status: "live",
    category: "web",
    sphere: { en: "Tourism", ru: "Туризм" },
    format: { en: "Multilingual marketing website with a tour catalog", ru: "Мультиязычный сайт с каталогом туров" },
    year: 2026,
    url: "https://kyrgyz-soul-travel.vercel.app",
    embed: "https://kyrgyz-soul-travel.vercel.app",
    domain: "kyrgyz-soul-travel.vercel.app",
    cover: "/images/showcase/kyrgyz-soul-travel/cover.jpg",
    fullPage: "/images/showcase/kyrgyz-soul-travel/full.jpg",
    gallery: [
      { src: "/images/showcase/kyrgyz-soul-travel/screen-2.jpg", alt: { en: "KyrgyzSoul Travel — screen 2", ru: "KyrgyzSoul Travel — экран 2" } },
      { src: "/images/showcase/kyrgyz-soul-travel/screen-3.jpg", alt: { en: "KyrgyzSoul Travel — screen 3", ru: "KyrgyzSoul Travel — экран 3" } },
    ],
    mobile: "/images/showcase/kyrgyz-soul-travel/mobile.jpg",
    summary: { en: "A website for a Kyrgyz tour operator with six multi-day tours, each on its own page with a day-by-day itinerary, price per person and a booking request form. The site is available in English, Russian and German.", ru: "Сайт кыргызского туроператора с шестью многодневными турами: у каждого своя страница с программой по дням, ценой за человека и формой заявки. Сайт работает на английском, русском и немецком." },
    review: {
      en: [
        "The tour content came from the operator's own Word documents, and the itineraries were built to follow them closely. When a document merged two days into one, the site does the same.",
        "The visual style uses dark warm backgrounds, gold and deep teal accents, a Cormorant Garamond serif for headings and full-width landscape photos. Each tour page opens with a large hero showing the tour type, length, difficulty, season and starting price.",
      ],
      ru: [
        "Тексты туров взяты из Word-документов туроператора, и программы на сайте повторяют их точно, вплоть до объединённых дней, если так было в исходнике.",
        "Визуально сайт построен на тёплом тёмном фоне, золотых и глубоких бирюзовых акцентах, антикве Cormorant Garamond в заголовках и пейзажных фото во всю ширину. Каждая страница тура начинается с большого первого экрана, где указаны тип тура, длительность, сложность, сезон и цена «от».",
      ],
    },
    features: [
      { title: { en: "Tour catalog", ru: "Каталог туров" }, text: { en: "Six tours (cultural, classic, World Nomad Games, Kel-Suu routes, a winter tour) with cards showing duration, difficulty and price per person.", ru: "Шесть туров (познавательный, классический, к Всемирным играм кочевников, маршруты к Кель-Суу, зимний) в карточках с длительностью, сложностью и ценой за человека." } },
      { title: { en: "Three languages", ru: "Три языка" }, text: { en: "Localized routes for EN, RU and DE, with a language switch in the header, hreflang and canonical tags.", ru: "Отдельные адреса для EN, RU и DE, переключатель языка в шапке, теги hreflang и canonical." } },
      { title: { en: "Booking request", ru: "Заявка на тур" }, text: { en: "A form on every tour page with the tour pre-selected, WhatsApp number and consent checkbox, sent to a validated /api/booking endpoint.", ru: "Форма на странице каждого тура с уже выбранным туром, номером WhatsApp и согласием на обработку данных. Отправляется на /api/booking с проверкой полей." } },
    ],
    tags: { en: ["Next.js 14 (App Router)","TypeScript","Tailwind CSS"], ru: ["Next.js 14 (App Router)","TypeScript","Tailwind CSS"] },
    stack: ["Next.js 14 (App Router)","TypeScript","Tailwind CSS","Framer Motion","Vercel"],
    palette: ["#FAF9F6","#1C1917","#C9A96E","#0D4F4F"],
  },
  {
    slug: "asaki-sushi",
    stage: "radial-gradient(circle at 20% 25%, #FF4D4D 0%, transparent 40%), radial-gradient(circle at 85% 80%, #FFB199 0%, transparent 45%), linear-gradient(135deg, #2B0A0A 0%, #6E1111 55%, #C81E1E 100%)",
    decor: ["🍣", "🍱", "🥢", "🍙", "🍤", "🥟", "🍣", "🍵"],
    title: { en: "Asaki Sushi", ru: "Asaki Sushi" },
    client: { en: "A sushi bar in Bishkek with pickup and delivery", ru: "Суши-бар в Бишкеке с самовывозом и доставкой" },
    status: "live",
    category: "product",
    sphere: { en: "Food & delivery", ru: "Общепит и доставка" },
    format: { en: "Ordering PWA with owner cabinet", ru: "PWA для заказов с кабинетом владельца" },
    year: 2026,
    url: "https://asakisuhi.kg",
    domain: "asakisuhi.kg",
    cover: "/images/showcase/asaki-sushi/cover.jpg",
    phones: ["/images/showcase/asaki-sushi/phone-1.jpg","/images/showcase/asaki-sushi/phone-2.jpg","/images/showcase/asaki-sushi/phone-3.jpg"],
    summary: { en: "An installable web app for a sushi bar: menu with search and categories, cart and checkout, and a loyalty card that returns part of each order as points. Behind it sit an owner cabinet for orders, menu, delivery zones and push campaigns, and a staff screen for crediting points to dine-in guests.", ru: "Устанавливаемое веб-приложение суши-бара: меню с поиском и категориями, корзина и оформление заказа, карта лояльности, которая возвращает часть суммы баллами. За ним — кабинет владельца для заказов, меню, зон доставки и push-рассылок и экран персонала для начисления баллов гостям в зале." },
    review: {
      en: [
        "The guest side is a mobile-first PWA: the home screen shows opening hours, pickup and delivery options and a call to order, the menu is grouped by category with search, and the cart opens as a bottom sheet. Payment is on receipt only, in cash or by transfer, and the owner chooses which methods to offer. Delivery is enabled per zone, each with its own fee and minimum order; with no active zones the app offers pickup only.",
        "The owner manages everything from a cabinet: orders, menu and photos, delivery zones, customers, staff accounts, loyalty settings and push notifications sent through self-hosted Web Push. Staff and owners sign in by personal PIN, and the order history records who accepted each order. The app runs as a single instance per venue on Docker Compose with PostgreSQL and Caddy for HTTPS.",
      ],
      ru: [
        "Гостевая часть — PWA, рассчитанная на телефон: на главной часы работы, самовывоз и доставка и кнопка заказа, меню разбито по категориям и снабжено поиском, корзина открывается шторкой снизу. Оплата только при получении — наличными или переводом, какие способы предлагать, решает владелец. Доставка включается зонами со своей стоимостью и минимальной суммой; пока активных зон нет, доступен только самовывоз.",
        "Владелец управляет всем из кабинета: заказы, меню и фотографии, зоны доставки, клиенты, учётки сотрудников, настройки лояльности и push-уведомления через собственный Web Push. Сотрудники и владелец входят по личному PIN, а в истории заказа видно, кто его принял. Приложение работает отдельным инстансом на заведение: Docker Compose, PostgreSQL и Caddy для HTTPS.",
      ],
    },
    features: [
      { title: { en: "Menu, cart and checkout", ru: "Меню, корзина и оформление" }, text: { en: "Categories, search, a bottom-sheet cart and pickup or zone-based delivery with per-zone fee and minimum order.", ru: "Категории, поиск, корзина-шторка, самовывоз или доставка по зонам со своей ценой и минимальной суммой." } },
      { title: { en: "Points loyalty card", ru: "Карта лояльности с баллами" }, text: { en: "Part of each order returns as points; the card opens by phone and a code from the till, and staff credit points for dine-in orders.", ru: "Часть суммы заказа возвращается баллами; карта открывается по телефону и коду с кассы, персонал начисляет баллы за заказы в зале." } },
      { title: { en: "Owner cabinet and push", ru: "Кабинет владельца и push" }, text: { en: "Orders, menu, zones, customers, staff with personal PINs and push campaigns via self-hosted Web Push.", ru: "Заказы, меню, зоны, клиенты, сотрудники с личными PIN и push-рассылки через собственный Web Push." } },
    ],
    tags: { en: ["Next.js 16","React 19","TypeScript"], ru: ["Next.js 16","React 19","TypeScript"] },
    stack: ["Next.js 16","React 19","TypeScript","PostgreSQL","Drizzle ORM","Tailwind CSS 4","Web Push (VAPID)","Docker Compose","Caddy","Vitest","PGlite","Playwright"],
    palette: ["#F2EFEA","#151615","#F40A16","#C30811"],
  },
  {
    slug: "dream-hotel",
    signature: { en: "3D starfield on Three.js", ru: "3D звёздное небо на Three.js" },
    title: { en: "Dream Hotel", ru: "Dream Hotel" },
    client: { en: "A small hotel in Bishkek with two locations and breakfast included", ru: "Небольшой отель в Бишкеке на два адреса с завтраком в стоимости" },
    status: "built",
    category: "web",
    sphere: { en: "Hospitality", ru: "Гостиничный бизнес" },
    format: { en: "Hotel landing page with booking via WhatsApp", ru: "Лендинг отеля с бронированием через WhatsApp" },
    year: 2026,
    domain: "dream hotel",
    cover: "/images/showcase/dream-hotel/cover.jpg",
    gallery: [
      { src: "/images/showcase/dream-hotel/screen-2.jpg", alt: { en: "Dream Hotel — screen 2", ru: "Dream Hotel — экран 2" } },
      { src: "/images/showcase/dream-hotel/screen-3.jpg", alt: { en: "Dream Hotel — screen 3", ru: "Dream Hotel — экран 3" } },
    ],
    mobile: "/images/showcase/dream-hotel/mobile.jpg",
    summary: { en: "A one-page website for a Bishkek hotel that presents rooms, real photos, amenities, reviews and both addresses. Every booking button opens WhatsApp with a pre-filled message for the chosen room.", ru: "Одностраничный сайт отеля в Бишкеке: номера, реальные фото, удобства, отзывы и оба адреса. Любая кнопка бронирования открывает WhatsApp с уже заполненным сообщением под выбранный номер." },
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
    },
    features: [
      { title: { en: "Booking in one tap", ru: "Бронь в одно касание" }, text: { en: "Each room card and CTA opens WhatsApp with a pre-filled message for that room type, plus direct call links.", ru: "Каждая карточка номера открывает WhatsApp с готовым сообщением под этот тип номера; есть и прямой звонок." } },
      { title: { en: "3D starfield hero", ru: "Звёздный 3D-фон" }, text: { en: "An animated Three.js scene in the first screen, loaded client-side only so it doesn't slow down rendering.", ru: "Анимированная сцена на Three.js в первом экране; грузится только на клиенте и не тормозит рендер." } },
      { title: { en: "Real photos and SEO", ru: "Реальные фото и SEO" }, text: { en: "Gallery and room carousels use the hotel's own photos; Hotel JSON-LD, Open Graph and sitemap help it show up in search.", ru: "Галерея и карусели номеров — на собственных фото отеля; JSON-LD, Open Graph и sitemap помогают в поиске." } },
    ],
    tags: { en: ["Next.js","React","TypeScript"], ru: ["Next.js","React","TypeScript"] },
    stack: ["Next.js","React","TypeScript","Tailwind CSS","Framer Motion","Three.js","React Three Fiber","Vercel"],
    palette: ["#070B1A","#F0EEFF","#E8A598","#8B4FBE"],
  },
  {
    slug: "detailing-booking",
    title: { en: "BLIK", ru: "BLIK" },
    client: { en: "Own white-label SaaS product for car detailing studios", ru: "Собственный white-label SaaS для студий детейлинга" },
    status: "built",
    category: "product",
    sphere: { en: "Automotive services", ru: "Автосервис и детейлинг" },
    format: { en: "Online booking and CRM platform (multi-tenant SaaS, PWA)", ru: "Платформа онлайн-записи и CRM (мультитенантный SaaS, PWA)" },
    year: 2026,
    domain: "blik",
    cover: "/images/showcase/detailing-booking/cover.jpg",
    gallery: [
      { src: "/images/showcase/detailing-booking/screen-3.jpg", alt: { en: "BLIK — screen 3", ru: "BLIK — экран 3" } },
    ],
    mobile: "/images/showcase/detailing-booking/mobile.jpg",
    admin: [
      { src: "/images/showcase/detailing-booking/screen-2.jpg", title: { en: "Studio dashboard: today's bookings, no-shows, revenue", ru: "Дашборд студии: записи на сегодня, неявки, выручка" } },
    ],
    summary: { en: "BLIK is a white-label platform that gives a detailing studio its own online booking page, an admin panel and a client base. One deployment serves many studios, each with its own branding, services, staff and feature set.", ru: "BLIK — white-label платформа, которая даёт студии детейлинга собственную страницу онлайн-записи, админку и базу клиентов. Одна установка обслуживает много студий, у каждой свои бренд, услуги, мастера и набор функций." },
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
    },
    features: [
      { title: { en: "4-step online booking", ru: "Запись в 4 шага" }, text: { en: "Service, master, time slot, confirmation — free slots are calculated from working hours and existing bookings.", ru: "Услуга, мастер, время, подтверждение — свободные слоты считаются по графику работы и уже занятым записям." } },
      { title: { en: "Studio admin panel", ru: "Админка студии" }, text: { en: "Dashboard with today's bookings and no-shows, weekly calendar, services, staff and client history.", ru: "Дашборд с записями на сегодня и неявками, недельный календарь, услуги, персонал и история клиентов." } },
      { title: { en: "Multi-tenant with tariffs", ru: "Мультитенантность и тарифы" }, text: { en: "Each studio gets its own branding and domain; Starter/Pro/Enterprise features are switched by feature flags.", ru: "У каждой студии свой бренд и домен; возможности Starter/Pro/Enterprise включаются feature-флагами." } },
    ],
    tags: { en: ["Next.js","React","TypeScript"], ru: ["Next.js","React","TypeScript"] },
    stack: ["Next.js","React","TypeScript","Supabase (PostgreSQL)","NextAuth","next-intl","Tailwind CSS","Radix UI","Zod","Vitest","PWA","Vercel"],
    palette: ["#0A0A0B","#FFFFFF","#D4AF37","#F5D77A"],
  },
  {
    slug: "go-market",
    stage: "radial-gradient(circle at 18% 22%, #FFE45C 0%, transparent 38%), radial-gradient(circle at 86% 78%, #FF9F43 0%, transparent 42%), radial-gradient(circle at 80% 15%, #FF6B6B 0%, transparent 30%), linear-gradient(135deg, #C6F57A 0%, #63D471 55%, #2FB463 100%)",
    decor: ["🍎", "🥑", "🍋", "🥕", "🍇", "🍓", "🥦", "🍊", "🍌", "🥛", "🍞", "🧀"],
    title: { en: "Go Market", ru: "Go Market" },
    client: { en: "A grocery delivery service in Kyrgyzstan selling on instalments", ru: "Сервис доставки продуктов по Кыргызстану с оплатой в рассрочку" },
    status: "built",
    category: "product",
    sphere: { en: "Grocery e-commerce & fintech", ru: "Продуктовый e-commerce и финтех" },
    format: { en: "Grocery delivery PWA with staff cabinet", ru: "PWA доставки продуктов с рабочим кабинетом" },
    year: 2026,
    domain: "go market",
    cover: "/images/showcase/go-market/cover.jpg",
    phones: ["/images/showcase/go-market/phone-1.jpg","/images/showcase/go-market/phone-2.jpg"],
    admin: [
      { src: "/images/showcase/go-market/screen-2.jpg", title: { en: "Orders: live queue for the shift", ru: "Заказы: живая очередь смены" } },
      { src: "/images/showcase/go-market/screen-3.jpg", title: { en: "Catalog with stock and prices", ru: "Каталог с остатками и ценами" } },
    ],
    summary: { en: "A bilingual (Russian/Kyrgyz) grocery delivery PWA where customers pay through Cash2U instalments, built for low-cost Android phones and unstable mobile internet. A staff cabinet covers the whole order cycle from picking and amount confirmation to courier routes and payments.", ru: "Двуязычная (русский/кыргызский) PWA доставки продуктов с оплатой в рассрочку через Cash2U, рассчитанная на недорогие Android-смартфоны и нестабильный мобильный интернет. Рабочий кабинет закрывает весь цикл заказа — от сборки и подтверждения суммы до маршрута курьера и платежей." },
    review: {
      en: [
        "The storefront is server-rendered with a light bundle and can be installed to the home screen; customers sign in with a one-time SMS code and get web push notifications. Goods can be sold by the piece or by weight, so weighed items show an approximate price per 100 g. After picking, the order total is recalculated, the customer confirms the final amount, and only then is the instalment invoice issued with Cash2U over mutual TLS.",
        "The staff cabinet has separate roles for administrator, operator, picker and courier. It covers orders with a queue of those awaiting amount confirmation, a picking screen, courier routes, payments, the catalog with stock levels, categories, delivery zones and geography, banners, push campaigns, people and an audit log. The app is a standalone Next.js build on a server in Kyrgyzstan with managed PostgreSQL, chosen for latency and in-country data storage.",
      ],
      ru: [
        "Витрина рендерится на сервере, бандл лёгкий, приложение ставится на главный экран; вход по одноразовому SMS-коду, возврат клиентов через web push. Товары продаются поштучно и на вес, поэтому у весовых позиций показана ориентировочная цена за 100 г. После сборки сумма заказа пересчитывается, клиент подтверждает итог, и только после этого выставляется счёт на рассрочку в Cash2U по mTLS.",
        "В рабочем кабинете отдельные роли: администратор, оператор, сборщик и курьер. В нём заказы с очередью «ждут подтверждения суммы», экран сборки, маршрут курьера, платежи, каталог с остатками, категории, зоны доставки и география, баннеры, рассылки, люди и журнал действий. Приложение собрано как standalone-сборка Next.js и работает на сервере в Кыргызстане с управляемым PostgreSQL — ради задержки до базы и хранения данных внутри страны.",
      ],
    },
    features: [
      { title: { en: "Instalment checkout via Cash2U", ru: "Рассрочка через Cash2U" }, text: { en: "The invoice is issued only after picking and the customer's confirmation of the final amount, so weighed goods are billed exactly.", ru: "Счёт выставляется только после сборки и подтверждения итоговой суммы клиентом, поэтому весовой товар оплачивается точно." } },
      { title: { en: "Two languages, weak networks", ru: "Два языка и слабая сеть" }, text: { en: "Russian and Kyrgyz storefront, server rendering, offline page, SMS login and web push for budget Android phones.", ru: "Витрина на русском и кыргызском, серверный рендеринг, офлайн-страница, вход по SMS и web push для бюджетных Android." } },
      { title: { en: "Role-based staff cabinet", ru: "Кабинет с ролями" }, text: { en: "Administrator, operator, picker and courier each see their part: orders, picking, routes, payments, catalog and stock, zones.", ru: "Администратор, оператор, сборщик и курьер видят свою часть: заказы, сборку, маршруты, платежи, каталог и остатки, зоны." } },
    ],
    tags: { en: ["Next.js 16","React 19","TypeScript"], ru: ["Next.js 16","React 19","TypeScript"] },
    stack: ["Next.js 16","React 19","TypeScript","PostgreSQL","Drizzle ORM","Tailwind CSS 4","Konsta UI","Radix UI","zod","Web Push (VAPID)","Vitest","PGlite","Playwright"],
    palette: ["#F5F5F7","#1C1C1E","#0062CC","#00A700"],
  },
  {
    slug: "shoestreet",
    title: { en: "ShoeStreet", ru: "ShoeStreet" },
    client: { en: "Sneaker store in Bishkek selling original Nike, New Balance and Adidas", ru: "Магазин оригинальных кроссовок Nike, New Balance и Adidas в Бишкеке" },
    status: "built",
    category: "web",
    sphere: { en: "Retail / e-commerce", ru: "Розница / интернет-магазин" },
    format: { en: "Online store with admin panel", ru: "Интернет-магазин с админ-панелью" },
    year: 2026,
    domain: "shoestreet",
    cover: "/images/showcase/shoestreet/cover.jpg",
    gallery: [
      { src: "/images/showcase/shoestreet/screen-2.jpg", alt: { en: "ShoeStreet — screen 2", ru: "ShoeStreet — экран 2" } },
      { src: "/images/showcase/shoestreet/screen-3.jpg", alt: { en: "ShoeStreet — screen 3", ru: "ShoeStreet — экран 3" } },
    ],
    mobile: "/images/showcase/shoestreet/mobile.jpg",
    summary: { en: "An online sneaker store for Bishkek with a catalog by brand and model, product pages with per-size availability, cart, checkout and promo codes. The owner manages products, sizes, brands, delivery methods and orders in a built-in admin panel.", ru: "Интернет-магазин кроссовок для Бишкека: каталог по брендам и моделям, карточки с наличием по каждому размеру, корзина, оформление заказа и промокоды. Товары, размеры, бренды, способы доставки и заказы владелец ведёт во встроенной админ-панели." },
    review: {
      en: [
        "The storefront is built around how sneakers are actually sold: each pair has its own size grid where a size can be in stock, last pair, available to order or sold out. The catalog is split into in-stock, made-to-order and upcoming drops, with filters by brand, model and size, search with aliases for common misspellings, favorites and recently viewed items. A separate B2B page handles wholesale requests, and customers can subscribe to a restock notification for a missing size.",
        "Under the hood it is a Next.js 16 application with PostgreSQL via Prisma, validated API routes and a password-protected admin area. Uploaded product photos are converted to WebP with sharp. Online payment through the local Finik acquiring service is wired in behind a server flag with a built-in simulator, so it can be switched on without a rebuild. The site runs in Docker Compose behind nginx.",
      ],
      ru: [
        "Витрина устроена так, как на самом деле продают кроссовки: у каждой пары своя размерная сетка, где размер может быть в наличии, последней парой, под заказ или распродан. Каталог разделён на наличие, товары под заказ и ожидаемые поступления, есть фильтры по бренду, модели и размеру, поиск с учётом частых ошибок в названиях, избранное и недавно просмотренное. Отдельная страница B2B принимает оптовые заявки, а на отсутствующий размер можно подписаться и получить уведомление о поступлении.",
        "Технически это приложение на Next.js 16 с PostgreSQL через Prisma, валидацией всех API-запросов и закрытой паролем админкой. Загруженные фото товаров конвертируются в WebP через sharp. Онлайн-оплата через местный эквайринг Finik подключена за серверным флагом и имеет встроенный симулятор, поэтому включается без пересборки. Сайт работает в Docker Compose за nginx.",
      ],
    },
    features: [
      { title: { en: "Size-level stock", ru: "Наличие по размерам" }, text: { en: "Every size has its own status: in stock, last pair, to order or sold out, plus a restock request for missing sizes.", ru: "У каждого размера свой статус: в наличии, последняя пара, под заказ или нет, а на отсутствующий можно оставить заявку." } },
      { title: { en: "Catalog and search", ru: "Каталог и поиск" }, text: { en: "Brand and model pages with SEO-friendly URLs, size filters, sorting and search that understands alternative spellings.", ru: "Страницы брендов и моделей с понятными адресами, фильтр по размеру, сортировка и поиск, понимающий альтернативные написания." } },
      { title: { en: "Admin panel", ru: "Админ-панель" }, text: { en: "Products, photos, sizes, brands, promo codes, delivery methods, orders and feedback managed in one place.", ru: "Товары, фото, размеры, бренды, промокоды, способы доставки, заказы и отзывы в одном месте." } },
    ],
    tags: { en: ["Next.js 16","React 19","TypeScript"], ru: ["Next.js 16","React 19","TypeScript"] },
    stack: ["Next.js 16","React 19","TypeScript","Tailwind CSS 4","PostgreSQL","Prisma 7","Zod","sharp","Docker","nginx"],
    palette: ["#0d0d0d","#f5f0e8","#c9b89c","#25d366"],
  },
  {
    slug: "erp-garment",
    title: { en: "ERP Marking", ru: "ERP Маркировка" },
    client: { en: "A garment manufacturer selling on Wildberries", ru: "Швейное производство, продающее на Wildberries" },
    status: "built",
    category: "product",
    sphere: { en: "Garment manufacturing / product marking", ru: "Швейное производство / маркировка товаров" },
    format: { en: "Cloud ERP (PWA) with a local print agent", ru: "Облачная ERP (PWA) с локальным агентом печати" },
    year: 2026,
    domain: "erp marking",
    cover: "/images/showcase/erp-garment/cover.jpg",
    mobile: "/images/showcase/erp-garment/mobile.jpg",
    admin: [
      { src: "/images/showcase/erp-garment/screen-2.jpg", title: { en: "Product catalog and marking codes", ru: "Справочник изделий и коды маркировки" } },
      { src: "/images/showcase/erp-garment/screen-3.jpg", title: { en: "Label editor: DataMatrix + Wildberries", ru: "Редактор этикеток: DataMatrix + Wildberries" } },
    ],
    summary: { en: "A marking and shipping system for a garment factory. It handles Chestny Znak DataMatrix codes and Wildberries barcodes, prints labels on the shop floor and tracks every item from its box to the pallet and the marketplace shipment.", ru: "Система маркировки и отгрузки для швейного цеха. Работает с кодами DataMatrix «Честного знака» и штрихкодами Wildberries, печатает этикетки прямо в цеху и отслеживает каждое изделие по цепочке «короб → паллета → поставка на маркетплейс»." },
    review: {
      en: [
        "The system has two parts. A NestJS + PostgreSQL backend in the cloud holds the product catalog, marking-code pool, orders, shipments and reports. The React PWA runs in two modes: a desk cabinet for managers and a phone-friendly terminal for operators scanning boxes and pallets. A separate Rust agent on the shop PC drives Godex label printers over EZPL.",
        "Most of the work went into making the floor workflow hard to get wrong. Codes move from FREE to USED only when a label prints, SSCC codes for boxes and pallets get GS1 check digits, scans are checked against the expected box, and access is controlled by a role and permission matrix. The label editor lets the team lay out text, DataMatrix and barcodes on a given tape size and preview the result before printing.",
      ],
      ru: [
        "Система состоит из двух частей. В облаке работает бэкенд на NestJS и PostgreSQL: справочник изделий, пул кодов маркировки, заявки, поставки и отчёты. PWA на React открывается в двух режимах: кабинет за столом для менеджера и терминал (ТСД) на телефоне для оператора, который сканирует короба и паллеты. Отдельный агент на Rust стоит на компьютере в цеху и печатает на принтерах Godex через EZPL.",
        "Основная часть работы ушла на то, чтобы в цеху было трудно ошибиться. Код переходит из «свободен» в «использован» только при печати этикетки, коды SSCC для коробов и паллет получают контрольную цифру GS1, каждый скан сверяется с ожидаемым коробом, а доступ задаётся матрицей ролей и прав. В редакторе этикеток можно разложить текст, DataMatrix и штрихкод под размер ленты и проверить результат до печати.",
      ],
    },
    features: [
      { title: { en: "Marking codes", ru: "Коды маркировки" }, text: { en: "Import Chestny Znak codes from CSV and bind them to products by GTIN. The system tracks free and used counts per item and keeps unrecognized scans for review.", ru: "Импорт кодов «Честного знака» из CSV с привязкой к изделию по GTIN, учёт свободных и использованных кодов по каждому изделию, отдельный список неопознанных сканов." } },
      { title: { en: "Aggregation and shipping", ru: "Агрегация и отгрузка" }, text: { en: "Item → box → pallet → shipment hierarchy with SSCC codes, WB box barcodes, carrier and warehouse directories, and five report types with Excel export.", ru: "Иерархия «изделие → короб → паллета → поставка» с кодами SSCC, штрихкодами коробов WB, справочниками перевозчиков и складов и пятью видами отчётов с выгрузкой в Excel." } },
      { title: { en: "Shop-floor terminal", ru: "Терминал для цеха" }, text: { en: "A phone-friendly terminal mode for collecting codes, aggregation, pallets, verification, receiving and order scans, using a hardware scanner or the camera (zxing-wasm).", ru: "Режим терминала для телефона: сбор кодов, агрегация, паллеты, сверка, приёмка и сканирование по заявке. Сканирует аппаратным сканером или камерой (zxing-wasm)." } },
    ],
    tags: { en: ["NestJS","Prisma","PostgreSQL"], ru: ["NestJS","Prisma","PostgreSQL"] },
    stack: ["NestJS","Prisma","PostgreSQL","React 19","Vite","PWA (Workbox)","Rust (print agent)","EZPL / Godex","zxing-wasm","ExcelJS","Docker Compose"],
    palette: ["#ECEAE4","#22252A","#C2510C","#3F7D4E"],
  },
  {
    slug: "djal",
    stage: "radial-gradient(circle at 25% 20%, #FFB347 0%, transparent 40%), radial-gradient(circle at 80% 85%, #FF5E3A 0%, transparent 45%), linear-gradient(135deg, #1C0F08 0%, #5A2410 55%, #B8461B 100%)",
    decor: ["🍢", "🔥", "🥙", "🍅", "🧅", "🌶️", "🍢", "🥗"],
    title: { en: "Djal", ru: "Джал" },
    client: { en: "A chain of four shashlik cafes", ru: "Сеть из четырёх шашлычных" },
    status: "built",
    category: "product",
    sphere: { en: "Restaurants", ru: "Общепит" },
    format: { en: "Guest Wi-Fi portal, promos and feedback survey with admin panel", ru: "Wi-Fi портал, акции и опрос гостей с панелью управления" },
    year: 2026,
    domain: "djal",
    cover: "/images/showcase/djal/cover.jpg",
    phones: ["/images/showcase/djal/phone-1.jpg","/images/showcase/djal/phone-2.jpg"],
    admin: [
      { src: "/images/showcase/djal/screen-2.jpg", title: { en: "Survey dishes per branch", ru: "Блюда опроса по филиалам" } },
      { src: "/images/showcase/djal/screen-3.jpg", title: { en: "Guest responses and ratings", ru: "Ответы и оценки гостей" } },
    ],
    summary: { en: "A guest-facing web app for a cafe chain: guests reach it through the guest Wi-Fi captive portal or a QR code on the table, see the branch's promotions and leave a dish-by-dish quality review. Managers read the responses and run promotions, survey dishes and printable table QR cards from an admin panel.", ru: "Гостевое веб-приложение для сети кафе: гость попадает в него через captive-портал гостевого Wi-Fi или по QR-коду на столе, видит акции филиала и оставляет поблюдный отзыв о качестве. Управляющие читают ответы и ведут акции, список блюд опроса и печатные таблички с QR в панели управления." },
    review: {
      en: [
        "The client asked for no digital menu and no online ordering, so the product focuses on three guest screens: promotions, a survey and the Wi-Fi portal. The survey is available in Russian and Kyrgyz: the guest picks the dishes they had, rates each one, rates the visit overall and can add comments. The portal page works inside the restricted captive-portal browser, so fonts, images and scripts are all served from the app's own domain.",
        "The admin panel lives on a separate subdomain. Network admins see all branches, managers only the ones assigned to them, and that scoping is enforced in server actions. Admins upload promotion banners (resized with sharp), filter survey responses by branch, visit rating and dish, keep a per-branch list of survey dishes, and print an A4 fold-over table card with the branch QR code. Production runs on a VPS with a static IP behind Caddy, which the router walled garden requires.",
      ],
      ru: [
        "Цифровое меню и приём заказов заказчик исключил, поэтому продукт сосредоточен на трёх гостевых экранах: акции, опрос и Wi-Fi портал. Опрос на русском и кыргызском: гость выбирает блюда, оценивает каждое, ставит общую оценку визиту и может оставить комментарии. Страница портала работает во встроенном браузере captive-портала, поэтому шрифты, картинки и скрипты отдаются только с собственного домена.",
        "Панель управления вынесена на отдельный поддомен. Администратор сети видит все филиалы, менеджер — только назначенные, и это проверяется в server actions. В панели загружают баннеры акций (ресайз через sharp), фильтруют ответы по филиалу, оценке и блюду, ведут список блюд опроса для каждого филиала и печатают табличку-домик А4 с QR-кодом филиала. Прод работает на VPS со статическим IP за Caddy — этого требует walled garden роутеров.",
      ],
    },
    features: [
      { title: { en: "Captive Wi-Fi portal", ru: "Captive-портал Wi-Fi" }, text: { en: "The guest Wi-Fi login leads to the branch page with promotions and a link to the survey; a table QR code is the fallback route.", ru: "Вход в гостевой Wi-Fi ведёт на страницу филиала с акциями и ссылкой на опрос; QR-код на столе — запасной путь." } },
      { title: { en: "Dish-by-dish survey in two languages", ru: "Поблюдный опрос на двух языках" }, text: { en: "Russian and Kyrgyz; star ratings and comments per dish, an overall visit rating and how the guest heard about the cafe.", ru: "Русский и кыргызский; звёзды и отзыв по каждому блюду, общая оценка визита и откуда гость узнал о кафе." } },
      { title: { en: "Multi-branch admin panel", ru: "Панель для сети филиалов" }, text: { en: "Role-based access per branch, response filters, promo banners, survey dish lists and printable QR table cards.", ru: "Доступ по ролям и филиалам, фильтры ответов, баннеры акций, списки блюд опроса и печатные таблички с QR." } },
    ],
    tags: { en: ["Next.js 15","React 19","TypeScript"], ru: ["Next.js 15","React 19","TypeScript"] },
    stack: ["Next.js 15","React 19","TypeScript","PostgreSQL","Prisma","Tailwind CSS 4","iron-session","sharp","qrcode","Docker Compose","Caddy"],
    palette: ["#17181B","#F2EFEA","#EF5A2A","#F6A623"],
  },
  {
    slug: "anteyko-pwa",
    stage: "radial-gradient(circle at 20% 20%, #F4C27A 0%, transparent 40%), radial-gradient(circle at 85% 80%, #C98B4E 0%, transparent 45%), linear-gradient(135deg, #2A1A10 0%, #5B3A22 55%, #A8733F 100%)",
    decor: ["☕", "🥐", "🍰", "🧁", "☕", "🥯", "🍪", "🫖"],
    title: { en: "Anteyko Business PWA", ru: "Anteyko PWA для бизнеса" },
    client: { en: "Anteyko Labs' own product for small businesses: cafes, barbershops and shops", ru: "Собственный продукт Anteyko Labs для малого бизнеса: кафе, барбершопов и магазинов" },
    status: "built",
    category: "product",
    sphere: { en: "Small business, food & services", ru: "Малый бизнес, общепит и услуги" },
    format: { en: "Branded ordering and booking PWA template", ru: "Шаблон брендированной PWA для заказов и записи" },
    year: 2026,
    domain: "anteyko business pwa",
    cover: "/images/showcase/anteyko-pwa/cover.jpg",
    phones: ["/images/showcase/anteyko-pwa/phone-1.jpg","/images/showcase/anteyko-pwa/phone-2.jpg"],
    admin: [
      { src: "/images/showcase/anteyko-pwa/screen-3.jpg", title: { en: "Owner dashboard and incoming orders", ru: "Сводка владельца и входящие заказы" } },
      { src: "/images/showcase/anteyko-pwa/screen-2.jpg", title: { en: "Menu editor", ru: "Редактор меню" } },
    ],
    summary: { en: "A branded order and booking PWA delivered as a separate instance for each client, with its own brand, domain and database, and no aggregator commission or subscription. It is the product behind the studio's “Start” and “Turnkey” offers.", ru: "Брендированная PWA для заказов и записи, которая ставится каждому клиенту отдельным инстансом — со своим брендом, доменом и базой, без комиссии агрегатора и подписки. Это продукт, на котором построены предложения студии «Старт» и «Под ключ»." },
    review: {
      en: [
        "One codebase covers three niches. A cafe or shop gets a menu and an order flow, a barber or salon gets services with duration and time-slot booking. Orders and bookings are saved in the business's database and handed off to WhatsApp with a prepared message. The home screen shows opening hours, a primary action, promotions, a stamp-based loyalty card and a push subscription prompt.",
        "The owner cabinet, behind a PIN, shows monthly orders, revenue and the best-selling item, the order list with statuses, a menu and category editor, customers, push notifications and brand settings: name, tagline, accent colour, logo and cover. A separate staff screen adds loyalty stamps and redeems rewards. Tests run on in-memory PGlite, so no external database is needed.",
      ],
      ru: [
        "Одна кодовая база закрывает три ниши. Кафе или магазин получают меню и оформление заказа, барбершоп или салон — услуги с длительностью и запись на слот. Заказы и записи сохраняются в базе бизнеса и уходят в WhatsApp готовым сообщением. На главной — часы работы, основная кнопка, акции, карта лояльности со штампами и подписка на push.",
        "В кабинете владельца, закрытом PIN, — заказы и выручка за месяц и хит продаж, список заказов со статусами, редактор меню и категорий, клиенты, push-рассылки и настройки бренда: название, слоган, акцентный цвет, логотип и обложка. Отдельный экран персонала ставит штампы и выдаёт награды. Тесты гоняются на PGlite в памяти, внешняя база для них не нужна.",
      ],
    },
    features: [
      { title: { en: "One instance per client", ru: "Отдельный инстанс на клиента" }, text: { en: "Own brand, domain and database; the code is handed over to the client under the “Turnkey” agreement.", ru: "Свой бренд, домен и база; по договору «Под ключ» код передаётся клиенту." } },
      { title: { en: "Orders and slot booking", ru: "Заказы и запись на время" }, text: { en: "Menu ordering with pickup or delivery for cafes and shops, service booking by time slot for salons, both forwarded to WhatsApp.", ru: "Заказ из меню с самовывозом или доставкой для кафе и магазинов, запись на услугу по слотам для салонов, всё уходит в WhatsApp." } },
      { title: { en: "Loyalty stamps and push", ru: "Штампы лояльности и push" }, text: { en: "A stamp card opened by phone number, staff screen to add stamps and redeem rewards, and self-hosted Web Push campaigns.", ru: "Карта со штампами по номеру телефона, экран персонала для штампов и наград, push-рассылки через собственный Web Push." } },
    ],
    tags: { en: ["Next.js 16","React 19","TypeScript"], ru: ["Next.js 16","React 19","TypeScript"] },
    stack: ["Next.js 16","React 19","TypeScript","Neon Postgres","Drizzle ORM","Tailwind CSS 4","Vercel Blob","Web Push (VAPID)","Vitest","PGlite","Playwright"],
    palette: ["#0A0A0B","#F5F5F7","#C9904A","#4F46E5"],
  },
  {
    slug: "jocash-tender",
    title: { en: "JoCash Tender", ru: "JoCash Tender" },
    client: { en: "Company in Kyrgyzstan that bids in public and corporate procurement", ru: "Компания в Кыргызстане, участвующая в государственных и корпоративных закупках" },
    status: "built",
    category: "product",
    sphere: { en: "Public procurement / B2G", ru: "Госзакупки / B2G" },
    format: { en: "Internal web platform with scraper and API", ru: "Внутренняя веб-платформа со скрапером и API" },
    year: 2026,
    domain: "jocash tender",
    cover: "/images/showcase/jocash-tender/cover.jpg",
    admin: [
      { src: "/images/showcase/jocash-tender/screen-2.jpg", title: { en: "Tender card: status, assignee, comments", ru: "Карточка тендера: статус, ответственный, комментарии" } },
      { src: "/images/showcase/jocash-tender/screen-3.jpg", title: { en: "Scraper runs across procurement portals", ru: "Запуски сборщиков по порталам закупок" } },
    ],
    summary: { en: "An internal platform that collects new tenders from Kyrgyz procurement portals into one list and lets the team take each tender from discovery to a submitted bid. Tenders get statuses, owners, tags, comments and attached cost estimates, and the list exports to Excel or CSV.", ru: "Внутренняя платформа, которая собирает новые тендеры с киргизских порталов закупок в один список и позволяет команде вести каждый тендер от обнаружения до поданной заявки. У тендеров есть статусы, ответственные, теги, комментарии и прикреплённые сметы, а список выгружается в Excel или CSV." },
    review: {
      en: [
        "Instead of checking several procurement sites by hand, the team gets a single feed. Background scrapers for zakupki.gov.kg, zakupki.okmot.kg and tenders.kg run on a queue every four hours, normalize number, title, buyer, amount, deadline, region and category, and update records that already exist instead of duplicating them. A scraper screen shows each run with found, created and updated counts and lets an admin start a run manually.",
        "Inside the platform a tender moves through statuses from new and under review to bid submitted, won or lost. Each card keeps the link to the original, an assignee, tags, a comment thread, an audit history of changes and uploaded .xlsx estimates that are parsed and stored with edit history. Users have roles (manager, searcher, supplier), and new tenders can be announced by email or Telegram. The backend is NestJS with Prisma, PostgreSQL, BullMQ on Redis and S3-compatible file storage, with a Next.js frontend in a Turborepo monorepo.",
      ],
      ru: [
        "Вместо того чтобы вручную проверять несколько сайтов закупок, команда получает одну ленту. Фоновые скраперы для zakupki.gov.kg, zakupki.okmot.kg и tenders.kg работают через очередь каждые четыре часа, приводят к одному виду номер, название, заказчика, сумму, дедлайн, регион и категорию и обновляют уже известные записи, а не плодят дубли. На экране скрапера видно каждый запуск со счётчиками найденных, созданных и обновлённых тендеров, запуск можно сделать и вручную.",
        "Внутри платформы тендер проходит статусы от нового и рассматриваемого до поданной заявки, выигрыша или проигрыша. В карточке хранятся ссылка на оригинал, ответственный, теги, обсуждение, история изменений и загруженные сметы в .xlsx, которые разбираются и сохраняются с историей правок. У пользователей есть роли (менеджер, поисковик, поставщик), о новых тендерах можно оповещать по почте или в Telegram. Бэкенд написан на NestJS с Prisma, PostgreSQL, BullMQ на Redis и S3-совместимым хранилищем файлов, фронтенд на Next.js, всё собрано в монорепозиторий на Turborepo.",
      ],
    },
    features: [
      { title: { en: "Portal scrapers", ru: "Сбор с порталов" }, text: { en: "Scheduled collection from three procurement portals with deduplication and a run log.", ru: "Сбор с трёх порталов закупок по расписанию, без дублей и с журналом запусков." } },
      { title: { en: "Tender pipeline", ru: "Воронка тендеров" }, text: { en: "Statuses, assignees, tags, comments and a full audit history on every tender.", ru: "Статусы, ответственные, теги, комментарии и полная история изменений по каждому тендеру." } },
      { title: { en: "Estimates and export", ru: "Сметы и выгрузка" }, text: { en: "Upload and parse .xlsx estimates per tender; export the filtered list to Excel or CSV.", ru: "Загрузка и разбор смет в .xlsx по каждому тендеру, выгрузка отфильтрованного списка в Excel или CSV." } },
    ],
    tags: { en: ["Next.js 14","React 18","TypeScript"], ru: ["Next.js 14","React 18","TypeScript"] },
    stack: ["Next.js 14","React 18","TypeScript","Tailwind CSS","Zustand","NestJS 10","Prisma","PostgreSQL","BullMQ","Redis","MinIO / S3","Cheerio","ExcelJS","Turborepo"],
    palette: ["#ffffff","#111827","#2563eb","#dbeafe"],
  },
  {
    slug: "texi-driver",
    title: { en: "Driver Service", ru: "Driver Service" },
    client: { en: "Intercity transfer service between Bishkek, Almaty and other cities", ru: "Сервис междугородних поездок между Бишкеком, Алматы и другими городами" },
    status: "built",
    category: "web",
    sphere: { en: "Transportation", ru: "Пассажирские перевозки" },
    format: { en: "Multi-page website with online ride booking", ru: "Многостраничный сайт с онлайн-бронированием поездки" },
    year: 2025,
    domain: "driver service",
    cover: "/images/showcase/texi-driver/cover.jpg",
    gallery: [
      { src: "/images/showcase/texi-driver/screen-2.jpg", alt: { en: "Driver Service — screen 2", ru: "Driver Service — экран 2" } },
      { src: "/images/showcase/texi-driver/screen-3.jpg", alt: { en: "Driver Service — screen 3", ru: "Driver Service — экран 3" } },
    ],
    mobile: "/images/showcase/texi-driver/mobile.jpg",
    summary: { en: "A website for an intercity driver service: fleet classes, popular routes with prices, contacts and a three-step booking form. Available in Russian, Kyrgyz and English.", ru: "Сайт сервиса междугородних поездок: классы автомобилей, популярные маршруты с ценами, контакты и форма бронирования в три шага. Работает на русском, кыргызском и английском." },
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
    },
    features: [
      { title: { en: "3-step booking wizard", ru: "Бронирование в 3 шага" }, text: { en: "Route and date, vehicle class, passenger details — with a progress indicator and date/time pickers.", ru: "Маршрут и дата, класс авто, данные пассажира — с индикатором прогресса и выбором даты и времени." } },
      { title: { en: "3D fleet preview", ru: "3D-автопарк" }, text: { en: "Sedan, minivan and SUV are shown as interactive 3D models the customer can rotate.", ru: "Седан, минивэн и внедорожник показаны интерактивными 3D-моделями, которые можно вращать." } },
      { title: { en: "Three languages", ru: "Три языка" }, text: { en: "The whole interface switches between Russian, Kyrgyz and English.", ru: "Весь интерфейс переключается между русским, кыргызским и английским." } },
    ],
    tags: { en: ["React","TypeScript","Vite"], ru: ["React","TypeScript","Vite"] },
    stack: ["React","TypeScript","Vite","Tailwind CSS","React Router","i18next","Framer Motion","Sketchfab embeds","Telegram Bot API","Vercel"],
    palette: ["#000000","#FFFFFF","#F5D37D","#A37C1E"],
  },
  {
    slug: "anteyko-offer",
    title: { en: "Anteyko $500 App Offer", ru: "Оффер Anteyko: приложение за $500" },
    client: { en: "The studio's own sales offer: a business app (PWA) for $500", ru: "Собственный оффер студии: приложение для бизнеса (PWA) за $500" },
    status: "built",
    category: "product",
    sphere: { en: "Small business / sales", ru: "Малый бизнес / продажи" },
    format: { en: "Installable PWA offer with interactive demo", ru: "Устанавливаемое PWA-предложение с интерактивным демо" },
    year: 2026,
    domain: "anteyko $500 app offer",
    cover: "/images/showcase/anteyko-offer/cover.jpg",
    gallery: [
      { src: "/images/showcase/anteyko-offer/screen-2.jpg", alt: { en: "Anteyko $500 App Offer — screen 2", ru: "Оффер Anteyko — экран 2" } },
      { src: "/images/showcase/anteyko-offer/screen-3.jpg", alt: { en: "Anteyko $500 App Offer — screen 3", ru: "Оффер Anteyko — экран 3" } },
    ],
    mobile: "/images/showcase/anteyko-offer/mobile.jpg",
    summary: { en: "An offer page that is itself the product it sells: a PWA that installs on the phone's home screen and shows a small business what its own app would look like. Four tabs cover the offer, a live demo for a café, barbershop or shop, the package contents and a lead form that sends to WhatsApp.", ru: "Страница-оффер, которая сама является продаваемым продуктом: PWA ставится на экран «Домой» и показывает малому бизнесу, как будет выглядеть его приложение. Четыре вкладки — оффер, живое демо для кофейни, барбершопа или магазина, состав пакета и заявка с отправкой в WhatsApp." },
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
    },
    features: [
      { title: { en: "Installs like an app", ru: "Ставится как приложение" }, text: { en: "Web manifest, install prompt for Android and a step-by-step sheet for iOS; works offline via service worker.", ru: "Манифест, кнопка установки на Android и пошаговая подсказка для iOS; работает офлайн через service worker." } },
      { title: { en: "Interactive niche demo", ru: "Интерактивное демо по нишам" }, text: { en: "Café, barbershop and shop presets with their own menus and an order button.", ru: "Готовые примеры для кофейни, барбершопа и магазина со своим меню и кнопкой заказа." } },
      { title: { en: "Lead straight to WhatsApp", ru: "Заявка сразу в WhatsApp" }, text: { en: "The form gathers business type and needs and opens a pre-filled WhatsApp chat; Telegram as an alternative.", ru: "Форма собирает тип бизнеса и задачи и открывает чат WhatsApp с готовым текстом; Telegram — как альтернатива." } },
    ],
    tags: { en: ["HTML","CSS","JavaScript"], ru: ["HTML","CSS","JavaScript"] },
    stack: ["HTML","CSS","JavaScript","PWA","Service Worker","Web App Manifest"],
    palette: ["#08090A","#F7F8F8","#5E6AD2","#828FFF"],
  },
];

/** Everything that is actually shown on the site */
export const visibleShowcaseItems = showcaseItems.filter((s) => !s.hidden);

export function getShowcaseItem(slug: string): ShowcaseItem | undefined {
  return visibleShowcaseItems.find((s) => s.slug === slug);
}
