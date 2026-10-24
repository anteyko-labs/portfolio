import type { ServiceDetails } from "./types";

// Long-form content for: time-access, parking, cctv, carbon-credits.
// Must agree with the package cards in translations.ts (price, timeline, scope).
export const PART_C: ServiceDetails = {
  "time-access": {
    intro: {
      en: "Paper timesheets and separate access systems leave gaps: nobody knows exactly who came when, and payroll is assembled by hand. We connect turnstiles, readers and Face ID into one system that keeps shifts and timesheets and exports the timesheet for payroll calculation.",
      ru: "Бумажный табель и разрозненные системы доступа дают пробелы: непонятно, кто и когда пришёл, а зарплату считают вручную. Мы связываем турникеты, считыватели и Face ID в одну систему, которая ведёт смены и табель и выгружает его для расчёта зарплаты.",
      zh: "纸质考勤表和各自独立的门禁系统留下许多空白：谁何时到岗说不清，薪资只能手工汇总。我们把闸机、读卡器和人脸识别接入同一套系统，统一管理排班与考勤表，并导出考勤表用于薪资核算。",
      tr: "Kâğıt puantaj ve birbirinden kopuk geçiş sistemleri boşluk bırakır: kimin ne zaman geldiği belirsizdir, bordro elle hazırlanır. Turnikeleri, okuyucuları ve Face ID'yi vardiyaları ve puantajı tutan, puantajı bordro hesabı için dışa aktaran tek bir sisteme bağlıyoruz.",
      ar: "سجلات الدوام الورقية وأنظمة الدخول المنفصلة تترك ثغرات: لا أحد يعرف بدقة من حضر ومتى، وتُحسب الرواتب يدويًا. نربط البوابات الدوّارة والقارئات وبصمة الوجه في نظام واحد يدير الورديات وسجلات الدوام ويصدّر سجل الدوام لاحتساب الرواتب.",
    },
    stack: ["Wiegand / OSDP", "Face recognition SDK", "QR access", "Payroll export", "PostgreSQL", "Node.js", "Next.js", "React Native"],
    steps: [
      {
        title: { en: "Site survey", ru: "Обследование объектов", zh: "现场调研", tr: "Saha incelemesi", ar: "دراسة المواقع" },
        text: {
          en: "We review the sites, the turnstiles, readers and cameras already installed, how shifts work and how payroll is calculated now.",
          ru: "Изучаем объекты, уже установленные турникеты, считыватели и камеры, как устроены смены и как сейчас считается зарплата.",
          zh: "了解各个场所、现有的闸机、读卡器和摄像头，以及目前的排班方式和薪资计算方式。",
          tr: "Lokasyonları, mevcut turnike, okuyucu ve kameraları, vardiyaların işleyişini ve bordronun bugün nasıl hesaplandığını inceliyoruz.",
          ar: "ندرس المواقع والبوابات والقارئات والكاميرات المركّبة حاليًا، وطريقة عمل الورديات وكيفية احتساب الرواتب الآن.",
        },
      },
      {
        title: { en: "Zones, rules and roles", ru: "Зоны, правила и роли", zh: "区域、规则与角色", tr: "Bölgeler, kurallar, roller", ar: "المناطق والقواعد والأدوار" },
        text: {
          en: "We agree on access zones, shift and lateness rules, and who sees what: HR, managers, security and staff.",
          ru: "Согласуем зоны доступа, правила смен и опозданий, а также кто что видит: кадры, руководители, охрана и сотрудники.",
          zh: "确定通行区域、排班与迟到规则，以及人事、主管、安保和员工各自能看到哪些内容。",
          tr: "Geçiş bölgelerini, vardiya ve gecikme kurallarını ve kimin neyi göreceğini belirliyoruz: İK, yöneticiler, güvenlik ve çalışanlar.",
          ar: "نتفق على مناطق الدخول وقواعد الورديات والتأخير، ومن يرى ماذا: الموارد البشرية والمديرون والأمن والموظفون.",
        },
      },
      {
        title: { en: "Setup and integration", ru: "Настройка и интеграция", zh: "配置与集成", tr: "Kurulum ve entegrasyon", ar: "الإعداد والتكامل" },
        text: {
          en: "We connect the equipment, set up cards, QR and Face ID, build the panel and app, and configure the timesheet export for payroll.",
          ru: "Подключаем оборудование, настраиваем карты, QR и Face ID, делаем панель и приложение, настраиваем выгрузку табеля для расчёта зарплаты.",
          zh: "接入设备，配置门禁卡、二维码和人脸识别，开发管理后台与 App，并配置考勤表导出用于薪资核算。",
          tr: "Ekipmanı bağlıyor, kart, QR ve Face ID'yi ayarlıyor, paneli ve uygulamayı geliştiriyor, bordro için puantaj aktarımını yapılandırıyoruz.",
          ar: "نربط الأجهزة ونهيّئ البطاقات وQR وبصمة الوجه، ونبني اللوحة والتطبيق، ونضبط تصدير سجل الدوام لاحتساب الرواتب.",
        },
      },
      {
        title: { en: "Launch and training", ru: "Запуск и обучение", zh: "上线与培训", tr: "Devreye alma ve eğitim", ar: "الإطلاق والتدريب" },
        text: {
          en: "We run a test period alongside the old process, train HR and security, and hand over documentation.",
          ru: "Проводим тестовый период параллельно со старым порядком, обучаем кадровиков и охрану, передаём документацию.",
          zh: "与原有流程并行试运行一段时间，培训人事和安保人员，并移交文档。",
          tr: "Eski süreçle paralel bir deneme dönemi yürütüyor, İK ve güvenlik ekibini eğitiyor, dokümantasyonu teslim ediyoruz.",
          ar: "نشغّل فترة تجريبية بالتوازي مع الطريقة القديمة، وندرّب فريقي الموارد البشرية والأمن، ونسلّم التوثيق.",
        },
      },
    ],
    features: [
      {
        title: { en: "Several sites, one panel", ru: "Все объекты в одной панели", zh: "多场所统一后台", tr: "Tüm lokasyonlar tek panelde", ar: "كل المواقع في لوحة واحدة" },
        text: {
          en: "Offices, warehouses and branches in one system, with reports by site, department or employee.",
          ru: "Офисы, склады и филиалы в одной системе, отчёты по объекту, отделу или сотруднику.",
          zh: "办公室、仓库和分支机构在同一系统中，可按场所、部门或员工查看报表。",
          tr: "Ofisler, depolar ve şubeler tek sistemde; raporlar lokasyona, departmana veya çalışana göre.",
          ar: "المكاتب والمستودعات والفروع في نظام واحد، مع تقارير حسب الموقع أو القسم أو الموظف.",
        },
      },
      {
        title: { en: "Access by zone and time", ru: "Доступ по зонам и часам", zh: "按区域和时段授权", tr: "Bölge ve saate göre erişim", ar: "دخول حسب المنطقة والوقت" },
        text: {
          en: "Each person gets access only to the zones and hours their role requires.",
          ru: "Каждый проходит только в те зоны и в те часы, которые нужны по его роли.",
          zh: "每个人只能在其岗位所需的区域和时段内通行。",
          tr: "Herkes yalnızca rolünün gerektirdiği bölgelere ve saatlerde girebilir.",
          ar: "يحصل كل شخص على الدخول إلى المناطق والساعات التي يتطلبها دوره فقط.",
        },
      },
      {
        title: { en: "Night and rotating shifts", ru: "Ночные и сменные графики", zh: "夜班与轮班", tr: "Gece ve dönüşümlü vardiyalar", ar: "الورديات الليلية والمتناوبة" },
        text: {
          en: "Shifts that cross midnight, rotations and split shifts are counted correctly in the timesheet.",
          ru: "Смены через полночь, графики «сутки через трое» и разбитые смены корректно попадают в табель.",
          zh: "跨午夜的班次、轮班和分段班次都能在考勤表中正确计算。",
          tr: "Gece yarısını aşan, dönüşümlü ve bölünmüş vardiyalar puantajda doğru hesaplanır.",
          ar: "تُحتسب الورديات التي تتجاوز منتصف الليل والمتناوبة والمجزأة بشكل صحيح في سجل الدوام.",
        },
      },
      {
        title: { en: "Guest and contractor passes", ru: "Гостевые и временные пропуска", zh: "访客与外包人员通行证", tr: "Misafir ve yüklenici kartları", ar: "تصاريح الزوار والمقاولين" },
        text: {
          en: "Temporary QR or card passes that expire on their own, with every entry logged.",
          ru: "Временные пропуска по QR или карте, которые сами истекают в срок, каждый проход записан.",
          zh: "临时二维码或门禁卡通行证到期自动失效，每次通行都有记录。",
          tr: "Süresi kendiliğinden dolan geçici QR veya kart girişleri; her geçiş kayıt altında.",
          ar: "تصاريح مؤقتة عبر QR أو البطاقة تنتهي صلاحيتها تلقائيًا، مع تسجيل كل دخول.",
        },
      },
      {
        title: { en: "Alerts for managers", ru: "Уведомления руководителям", zh: "主管提醒", tr: "Yöneticilere bildirimler", ar: "تنبيهات للمديرين" },
        text: {
          en: "Managers are notified about lateness, absence or early leaving without opening reports.",
          ru: "Руководитель узнаёт об опозданиях, неявках и ранних уходах, не открывая отчёты.",
          zh: "主管无需打开报表即可收到迟到、缺勤或早退提醒。",
          tr: "Yöneticiler rapor açmadan gecikme, devamsızlık veya erken çıkışlardan haberdar olur.",
          ar: "يتلقى المديرون إشعارات بالتأخير والغياب والمغادرة المبكرة دون فتح التقارير.",
        },
      },
      {
        title: { en: "Requests in the app", ru: "Заявки в приложении", zh: "App 内申请", tr: "Uygulamadan talepler", ar: "الطلبات عبر التطبيق" },
        text: {
          en: "Staff see their hours and submit leave or timesheet corrections; managers approve them in the app.",
          ru: "Сотрудник видит свои часы и подаёт заявки на отгул или исправление табеля, руководитель согласует их в приложении.",
          zh: "员工可查看自己的工时并提交请假或考勤更正申请，主管在 App 中审批。",
          tr: "Çalışanlar saatlerini görür, izin veya puantaj düzeltme talebi gönderir; yöneticiler uygulamada onaylar.",
          ar: "يرى الموظف ساعاته ويقدّم طلبات الإجازة أو تصحيح السجل، ويوافق عليها المدير في التطبيق.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "Will it work with our existing turnstiles?",
          ru: "Подойдут ли наши текущие турникеты?",
          zh: "能用我们现有的闸机吗？",
          tr: "Mevcut turnikelerimizle çalışır mı?",
          ar: "هل سيعمل مع البوابات الدوّارة الموجودة لدينا؟",
        },
        a: {
          en: "In many cases, yes. We check the models and controllers during the survey. If the equipment supports a standard protocol or SDK, we connect it. If not, we suggest what to replace, and only what is actually needed.",
          ru: "Во многих случаях да. Модели и контроллеры проверяем на этапе обследования. Если оборудование поддерживает стандартный протокол или SDK, подключаем его. Если нет — подскажем, что заменить, и только то, что действительно нужно.",
          zh: "多数情况下可以。我们会在调研阶段检查设备型号和控制器。如果设备支持标准协议或 SDK，就直接接入；如果不支持，我们会建议更换哪些设备，只换确实需要换的。",
          tr: "Çoğu durumda evet. Modelleri ve kontrolörleri inceleme aşamasında kontrol ediyoruz. Ekipman standart bir protokolü veya SDK'yı destekliyorsa bağlıyoruz. Desteklemiyorsa neyin değişmesi gerektiğini söylüyoruz, yalnızca gerçekten gerekeni.",
          ar: "في كثير من الحالات نعم. نفحص الطرازات ووحدات التحكم خلال مرحلة الدراسة. إذا كانت الأجهزة تدعم بروتوكولًا قياسيًا أو SDK نربطها مباشرة، وإلا نقترح ما يجب استبداله، وفقط ما يلزم فعلًا.",
        },
      },
      {
        q: {
          en: "Can we keep cards and add Face ID?",
          ru: "Можно оставить карты и добавить Face ID?",
          zh: "能保留门禁卡并增加人脸识别吗？",
          tr: "Kartları koruyup Face ID ekleyebilir miyiz?",
          ar: "هل يمكن الإبقاء على البطاقات وإضافة بصمة الوجه؟",
        },
        a: {
          en: "Yes. Cards, QR and Face ID can work side by side: for example, Face ID at the main entrance and cards at the warehouse. All entries end up in one timesheet, whatever the method.",
          ru: "Да. Карты, QR и Face ID могут работать одновременно: например, Face ID на главном входе, а карты на складе. Все проходы попадают в один табель, каким бы способом ни прошёл сотрудник.",
          zh: "可以。门禁卡、二维码和人脸识别可以同时使用，例如主入口用人脸识别，仓库用门禁卡。无论采用哪种方式，所有通行记录都汇入同一张考勤表。",
          tr: "Evet. Kart, QR ve Face ID birlikte çalışabilir: örneğin ana girişte Face ID, depoda kart. Yöntem ne olursa olsun tüm geçişler tek bir puantajda toplanır.",
          ar: "نعم. يمكن أن تعمل البطاقات وQR وبصمة الوجه معًا: مثلًا بصمة الوجه عند المدخل الرئيسي والبطاقات في المستودع. وتصل كل عمليات الدخول إلى سجل دوام واحد أيًّا كانت الطريقة.",
        },
      },
      {
        q: {
          en: "How does the data get to payroll?",
          ru: "Как данные попадают в расчёт зарплаты?",
          zh: "数据如何进入薪资核算？",
          tr: "Veriler bordroya nasıl aktarılır?",
          ar: "كيف تصل البيانات إلى احتساب الرواتب؟",
        },
        a: {
          en: "The timesheet is exported in the agreed format, for example Excel or the format of your payroll system, on a schedule or on demand. Payroll uses hours, shifts and absences already checked in the panel, so nothing is retyped by hand.",
          ru: "Табель выгружается в согласованном формате — например, в Excel или в формате вашей зарплатной программы — по расписанию или по кнопке. Зарплата считается по часам, сменам и неявкам, уже проверенным в панели, поэтому ничего не приходится переносить вручную.",
          zh: "考勤表按约定格式导出（例如 Excel 或您所用薪资系统的格式），可定时导出，也可手动触发。薪资依据已在后台核对过的工时、班次和缺勤计算，无需手工重新录入。",
          tr: "Puantaj, belirlenen formatta (örneğin Excel veya bordro sisteminizin formatı) zamanlanmış olarak veya istendiğinde dışa aktarılır. Bordro, panelde önceden kontrol edilmiş saat, vardiya ve devamsızlıklara göre hesaplanır; hiçbir şey elle yeniden girilmez.",
          ar: "يُصدَّر سجل الدوام بالصيغة المتفق عليها، مثل Excel أو صيغة نظام الرواتب لديكم، وفق جدول زمني أو عند الطلب. وتُحسب الرواتب بناءً على الساعات والورديات والغيابات التي رُوجعت في اللوحة، فلا حاجة لإعادة إدخال أي شيء يدويًا.",
        },
      },
    ],
  },

  parking: {
    intro: {
      en: "A guard at the barrier and paper tickets mean queues, lost payments and no clear record of who parked. We set up number-plate recognition, barrier control, payments and subscriptions in one dashboard for business centres, residential complexes, malls, hotels and paid car parks.",
      ru: "Охранник у шлагбаума и бумажные талоны — это очереди, потерянные оплаты и никакого учёта, кто и когда парковался. Мы настраиваем распознавание номеров, управление шлагбаумом, оплату и абонементы в одной панели для бизнес-центров, ЖК, ТРЦ, отелей и платных парковок.",
      zh: "道闸旁的保安和纸质停车票意味着排队、漏收费用，也说不清谁停过车。我们为写字楼、住宅小区、购物中心、酒店和收费停车场搭建车牌识别、道闸控制、缴费与月卡，统一在一个后台管理。",
      tr: "Bariyerde bekleyen görevli ve kâğıt biletler; kuyruk, kaçan ödemeler ve kimin park ettiğine dair belirsizlik demektir. İş merkezleri, konut siteleri, AVM'ler, oteller ve ücretli otoparklar için plaka tanıma, bariyer kontrolü, ödeme ve abonelikleri tek panelde kuruyoruz.",
      ar: "وجود حارس عند الحاجز وتذاكر ورقية يعني طوابير ومدفوعات ضائعة وغياب سجل واضح لمن ركن سيارته. نُعدّ التعرّف على اللوحات والتحكم بالحاجز والدفع والاشتراكات في لوحة واحدة لمراكز الأعمال والمجمعات السكنية ومراكز التسوق والفنادق والمواقف المدفوعة.",
    },
    stack: ["ANPR", "ONVIF / RTSP", "Barrier controllers", "Card & QR payments", "PostgreSQL", "Node.js", "Next.js", "React Native"],
    steps: [
      {
        title: { en: "Site survey", ru: "Обследование парковки", zh: "现场调研", tr: "Otopark incelemesi", ar: "دراسة الموقف" },
        text: {
          en: "We look at entries and exits, lighting, existing barriers and cameras, and how payment and access work today.",
          ru: "Смотрим въезды и выезды, освещение, текущие шлагбаумы и камеры, как сейчас устроены оплата и доступ.",
          zh: "查看出入口、照明条件、现有道闸和摄像头，以及目前的缴费和通行方式。",
          tr: "Giriş ve çıkışları, aydınlatmayı, mevcut bariyer ve kameraları, ödeme ve erişimin bugün nasıl işlediğini inceliyoruz.",
          ar: "نتفقد المداخل والمخارج والإضاءة والحواجز والكاميرات الحالية، وكيف يعمل الدفع والدخول اليوم.",
        },
      },
      {
        title: { en: "Tariffs and access rules", ru: "Тарифы и правила доступа", zh: "收费与通行规则", tr: "Tarifeler ve erişim kuralları", ar: "التعرفة وقواعد الدخول" },
        text: {
          en: "We agree on hourly rates, subscriptions, resident and tenant lists, guest rules and who manages them.",
          ru: "Согласуем почасовые тарифы, абонементы, списки жильцов и арендаторов, правила для гостей и кто всем этим управляет.",
          zh: "确定按时计费、月卡、业主与租户名单、访客规则以及由谁来管理。",
          tr: "Saatlik tarifeleri, abonelikleri, sakin ve kiracı listelerini, misafir kurallarını ve bunları kimin yöneteceğini belirliyoruz.",
          ar: "نتفق على التعرفة بالساعة والاشتراكات وقوائم السكان والمستأجرين وقواعد الضيوف ومن يديرها.",
        },
      },
      {
        title: { en: "Setup and integration", ru: "Настройка и интеграция", zh: "配置与集成", tr: "Kurulum ve entegrasyon", ar: "الإعداد والتكامل" },
        text: {
          en: "We set up recognition cameras and barrier control, connect payments, and build the dashboard and mobile app.",
          ru: "Настраиваем камеры распознавания и управление шлагбаумом, подключаем оплату, делаем веб-панель и мобильное приложение.",
          zh: "配置车牌识别摄像头和道闸控制，接入支付，开发网页后台和移动应用。",
          tr: "Tanıma kameralarını ve bariyer kontrolünü ayarlıyor, ödemeleri bağlıyor, web panelini ve mobil uygulamayı geliştiriyoruz.",
          ar: "نهيّئ كاميرات التعرّف والتحكم بالحاجز، ونربط الدفع، ونبني لوحة التحكم وتطبيق الجوال.",
        },
      },
      {
        title: { en: "Launch and training", ru: "Запуск и обучение", zh: "上线与培训", tr: "Devreye alma ve eğitim", ar: "الإطلاق والتدريب" },
        text: {
          en: "We test entries and payments on site, train operators and administrators, and hand over documentation.",
          ru: "Проверяем въезды и оплату на месте, обучаем операторов и администраторов, передаём документацию.",
          zh: "现场测试车辆进出和缴费，培训操作员和管理员，并移交文档。",
          tr: "Giriş ve ödemeleri sahada test ediyor, operatörleri ve yöneticileri eğitiyor, dokümantasyonu teslim ediyoruz.",
          ar: "نختبر الدخول والدفع في الموقع، وندرّب المشغّلين والمسؤولين، ونسلّم التوثيق.",
        },
      },
    ],
    features: [
      {
        title: { en: "Guest passes from the app", ru: "Гостевой пропуск из приложения", zh: "App 内访客通行", tr: "Uygulamadan misafir girişi", ar: "تصريح ضيف من التطبيق" },
        text: {
          en: "A resident or tenant adds a guest's plate in the app, and the barrier opens for that car at the set time.",
          ru: "Жилец или арендатор вносит номер гостя в приложении, и шлагбаум откроется для этой машины в указанное время.",
          zh: "业主或租户在 App 中添加访客车牌，道闸会在设定时间内为该车抬杆。",
          tr: "Sakin veya kiracı misafirin plakasını uygulamaya ekler; bariyer o araç için belirlenen saatte açılır.",
          ar: "يضيف الساكن أو المستأجر لوحة الضيف في التطبيق، فيُفتح الحاجز لتلك السيارة في الوقت المحدد.",
        },
      },
      {
        title: { en: "Allowed and blocked lists", ru: "Белые и чёрные списки", zh: "白名单与黑名单", tr: "İzinli ve engelli listeler", ar: "قوائم السماح والحظر" },
        text: {
          en: "Allowed plates, blocked plates and a limit on cars per apartment or company.",
          ru: "Разрешённые и заблокированные номера, лимит машин на квартиру или компанию.",
          zh: "允许通行和禁止通行的车牌，以及每户或每家公司的车辆数量上限。",
          tr: "İzinli ve engelli plakalar, daire veya şirket başına araç sınırı.",
          ar: "لوحات مسموح بها وأخرى محظورة، وحدّ لعدد السيارات لكل شقة أو شركة.",
        },
      },
      {
        title: { en: "Manual opening and corrections", ru: "Ручное открытие и правки", zh: "手动抬杆与更正", tr: "Elle açma ve düzeltme", ar: "الفتح اليدوي والتصحيح" },
        text: {
          en: "The operator sees the entry photo, fixes a misread plate or opens the barrier from the panel or phone.",
          ru: "Оператор видит фото въезда, исправляет неверно считанный номер или открывает шлагбаум из панели или с телефона.",
          zh: "操作员可查看入场照片，更正识别错误的车牌，或通过后台或手机抬杆。",
          tr: "Operatör giriş fotoğrafını görür, yanlış okunan plakayı düzeltir veya bariyeri panelden ya da telefondan açar.",
          ar: "يرى المشغّل صورة الدخول، ويصحّح اللوحة المقروءة خطأً، أو يفتح الحاجز من اللوحة أو الهاتف.",
        },
      },
      {
        title: { en: "Several entries and zones", ru: "Несколько въездов и зон", zh: "多出入口与分区", tr: "Birden çok giriş ve bölge", ar: "مداخل ومناطق متعددة" },
        text: {
          en: "Separate entrances, levels and zones, each with separate rules and tariffs, all in one dashboard.",
          ru: "Отдельные въезды, уровни и зоны со своими правилами и тарифами — в одной панели.",
          zh: "不同的出入口、楼层和区域各有规则和收费标准，统一在一个后台管理。",
          tr: "Kendi kuralları ve tarifeleri olan ayrı girişler, katlar ve bölgeler; hepsi tek panelde.",
          ar: "مداخل وطوابق ومناطق منفصلة بقواعد وتعرفة خاصة بكل منها، وكلها في لوحة واحدة.",
        },
      },
      {
        title: { en: "Available spaces counter", ru: "Счётчик свободных мест", zh: "空余车位计数", tr: "Boş yer sayacı", ar: "عدّاد الأماكن الشاغرة" },
        text: {
          en: "The system counts cars inside and shows how many spaces are left, per zone or for the whole car park.",
          ru: "Система считает машины внутри и показывает, сколько мест осталось, — по зонам или по всей парковке.",
          zh: "系统统计场内车辆，按区域或整个停车场显示剩余车位。",
          tr: "Sistem içerideki araçları sayar ve kalan yer sayısını bölgeye göre veya tüm otopark için gösterir.",
          ar: "يحصي النظام السيارات في الداخل ويعرض عدد الأماكن المتبقية لكل منطقة أو للموقف كله.",
        },
      },
      {
        title: { en: "Subscription reminders", ru: "Напоминания об абонементе", zh: "月卡到期提醒", tr: "Abonelik hatırlatmaları", ar: "تذكيرات الاشتراك" },
        text: {
          en: "Users get a reminder before a subscription ends and can renew it in the app.",
          ru: "Перед окончанием абонемента пользователь получает напоминание и может продлить его в приложении.",
          zh: "月卡到期前用户会收到提醒，并可在 App 内续费。",
          tr: "Abonelik bitmeden önce kullanıcı hatırlatma alır ve uygulamadan yenileyebilir.",
          ar: "يتلقى المستخدم تذكيرًا قبل انتهاء الاشتراك ويمكنه تجديده من التطبيق.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "Will it work with our current barriers?",
          ru: "Подойдёт ли наш текущий шлагбаум?",
          zh: "能用我们现有的道闸吗？",
          tr: "Mevcut bariyerlerimizle çalışır mı?",
          ar: "هل سيعمل مع الحواجز الموجودة لدينا؟",
        },
        a: {
          en: "Usually, yes. Most barriers are controlled through a relay or controller that the system can connect to. We check this during the survey and say upfront if a camera or controller needs to be added.",
          ru: "Обычно да. Большинство шлагбаумов управляются через реле или контроллер, к которому подключается система. Это проверяем на обследовании и заранее говорим, если нужно добавить камеру или контроллер.",
          zh: "通常可以。大多数道闸通过继电器或控制器控制，系统可以与之对接。我们会在调研时确认，如需增加摄像头或控制器，会提前说明。",
          tr: "Genellikle evet. Çoğu bariyer, sistemin bağlanabildiği bir röle veya kontrolörle yönetilir. Bunu inceleme sırasında kontrol ediyor, kamera veya kontrolör eklemek gerekiyorsa baştan söylüyoruz.",
          ar: "عادةً نعم. يُتحكَّم في معظم الحواجز عبر مُرحِّل أو وحدة تحكم يمكن للنظام الاتصال بها. نتحقق من ذلك خلال الدراسة ونخبركم مسبقًا إن كانت هناك حاجة لإضافة كاميرا أو وحدة تحكم.",
        },
      },
      {
        q: {
          en: "Can residents pay from their phone?",
          ru: "Жильцы смогут платить с телефона?",
          zh: "业主可以用手机缴费吗？",
          tr: "Sakinler telefondan ödeme yapabilir mi?",
          ar: "هل يستطيع السكان الدفع من هواتفهم؟",
        },
        a: {
          en: "Yes. Payment works by card, by QR and in the app, for single visits and for subscriptions, with a fiscal receipt via online cash registers (KKM). Residents can also issue guest passes in the app instead of calling security.",
          ru: "Да. Оплата работает картой, по QR и в приложении — и за разовый заезд, и за абонемент, с фискальным чеком через онлайн-ККМ. Гостевой пропуск жилец тоже оформляет в приложении, без звонка охране.",
          zh: "可以。支持银行卡、二维码和 App 缴费，单次停车和月卡均可，并通过在线收银机（KKM）开具电子发票。业主还可以直接在 App 中为访客开通通行，无需联系保安。",
          tr: "Evet. Ödeme kartla, QR ile ve uygulamadan yapılabilir; hem tek seferlik giriş hem abonelik için; çevrim içi yazar kasa (KKM) üzerinden mali fiş kesilir. Sakinler güvenliği aramadan misafir girişini de uygulamadan oluşturabilir.",
          ar: "نعم. يعمل الدفع بالبطاقة وعبر QR ومن التطبيق، للزيارات المفردة وللاشتراكات، مع إيصال مالي عبر أجهزة الكاش الإلكترونية (KKM). ويمكن للساكن أيضًا إصدار تصريح ضيف من التطبيق بدلًا من الاتصال بالأمن.",
        },
      },
      {
        q: {
          en: "What if a plate isn't recognised?",
          ru: "Что если номер не распознался?",
          zh: "车牌没识别出来怎么办？",
          tr: "Plaka tanınmazsa ne olur?",
          ar: "ماذا لو لم تُقرأ اللوحة؟",
        },
        a: {
          en: "The operator gets the camera photo and can correct the number or open the barrier from the panel or phone. Every such action is recorded with the time and the person who did it.",
          ru: "Оператор получает фото с камеры и может исправить номер или открыть шлагбаум из панели или с телефона. Каждое такое действие записывается — со временем и именем того, кто его выполнил.",
          zh: "操作员会收到摄像头照片，可以更正车牌或通过后台、手机抬杆。每一次此类操作都会记录时间和操作人。",
          tr: "Operatör kameradan fotoğrafı alır; plakayı düzeltebilir veya bariyeri panelden ya da telefondan açabilir. Her işlem, zamanı ve yapan kişiyle birlikte kaydedilir.",
          ar: "يتلقى المشغّل صورة الكاميرا، ويمكنه تصحيح الرقم أو فتح الحاجز من اللوحة أو الهاتف. ويُسجَّل كل إجراء من هذا النوع مع وقته واسم من نفّذه.",
        },
      },
    ],
  },

  cctv: {
    intro: {
      en: "Cameras that only record to a box in the back room help little when something happens. We build IP video surveillance with live view, an archive searchable from phone and web, and alerts that arrive the moment an event is detected.",
      ru: "Камеры, которые просто пишут на регистратор в подсобке, мало помогают, когда что-то случилось. Мы делаем IP-видеонаблюдение с просмотром онлайн, архивом с поиском в телефоне и браузере и уведомлениями, которые приходят в момент события.",
      zh: "只把录像存进机房录像机的摄像头，在出事时帮不上多少忙。我们搭建 IP 视频监控：实时查看，在手机和网页上检索录像，事件一经检测即刻推送告警。",
      tr: "Sadece arka odadaki bir cihaza kayıt yapan kameralar, bir şey olduğunda pek işe yaramaz. Canlı izleme, telefondan ve web'den aranabilen bir arşiv ve olay algılandığı anda gelen uyarılarla IP video gözetim kuruyoruz.",
      ar: "الكاميرات التي تسجّل فقط على جهاز في غرفة خلفية لا تفيد كثيرًا عند وقوع حادث. نبني مراقبة بالفيديو عبر IP مع بث مباشر وأرشيف قابل للبحث من الهاتف والويب وتنبيهات تصل لحظة اكتشاف الحدث.",
    },
    stack: ["ONVIF", "RTSP", "NVR / DVR", "WebRTC / HLS", "Computer vision", "PostgreSQL", "Next.js", "React Native"],
    steps: [
      {
        title: { en: "Site survey", ru: "Обследование объекта", zh: "现场调研", tr: "Saha incelemesi", ar: "دراسة الموقع" },
        text: {
          en: "We review the premises, existing cameras and network, and agree which areas need coverage and what to detect.",
          ru: "Изучаем помещения, текущие камеры и сеть, согласуем, какие зоны нужно охватить и какие события отслеживать.",
          zh: "了解场所、现有摄像头和网络，确定需要覆盖的区域以及要检测的事件。",
          tr: "Mekânı, mevcut kameraları ve ağı inceliyor; hangi alanların kapsanacağını ve neyin algılanacağını belirliyoruz.",
          ar: "ندرس المكان والكاميرات والشبكة الحالية، ونتفق على المناطق التي تحتاج إلى تغطية والأحداث المطلوب رصدها.",
        },
      },
      {
        title: { en: "Equipment and scheme", ru: "Подбор оборудования и схема", zh: "设备选型与方案", tr: "Ekipman ve şema", ar: "الأجهزة والمخطط" },
        text: {
          en: "We select cameras and recorders for each area, plan archive storage and decide who gets access to which cameras.",
          ru: "Подбираем камеры и регистраторы под каждую зону, планируем хранение архива и решаем, кому доступны какие камеры.",
          zh: "为每个区域选择摄像头和录像机，规划录像存储，并确定谁能查看哪些摄像头。",
          tr: "Her alan için kamera ve kayıt cihazı seçiyor, arşiv depolamayı planlıyor, kimin hangi kameralara erişeceğini belirliyoruz.",
          ar: "نختار الكاميرات وأجهزة التسجيل لكل منطقة، ونخطط لتخزين الأرشيف، ونحدد من يصل إلى أي كاميرات.",
        },
      },
      {
        title: { en: "Setup and integration", ru: "Настройка и интеграция", zh: "配置与集成", tr: "Kurulum ve entegrasyon", ar: "الإعداد والتكامل" },
        text: {
          en: "We set up cameras and recorders, live view, archive and alerts, and connect access control or time tracking if needed.",
          ru: "Настраиваем камеры и регистраторы, онлайн-просмотр, архив и уведомления, при необходимости связываем со СКУД и УРВ.",
          zh: "配置摄像头和录像机、实时查看、录像存档与告警，如有需要再与门禁和考勤系统集成。",
          tr: "Kameraları ve kayıt cihazlarını, canlı izlemeyi, arşivi ve uyarıları ayarlıyor, gerekirse geçiş kontrolü ve mesai takibine bağlıyoruz.",
          ar: "نهيّئ الكاميرات وأجهزة التسجيل والبث المباشر والأرشيف والتنبيهات، ونربطها عند الحاجة بالتحكم في الدخول وتتبع الدوام.",
        },
      },
      {
        title: { en: "Launch and training", ru: "Запуск и обучение", zh: "上线与培训", tr: "Devreye alma ve eğitim", ar: "الإطلاق والتدريب" },
        text: {
          en: "We check every camera and alert, show staff how to search the archive, and hand over documentation.",
          ru: "Проверяем каждую камеру и уведомление, показываем сотрудникам, как искать в архиве, передаём документацию.",
          zh: "逐一检查每路摄像头和告警，教员工如何检索录像，并移交文档。",
          tr: "Her kamerayı ve uyarıyı kontrol ediyor, ekibe arşivde nasıl arama yapılacağını gösteriyor, dokümantasyonu teslim ediyoruz.",
          ar: "نتحقق من كل كاميرا وكل تنبيه، ونُري الموظفين كيفية البحث في الأرشيف، ونسلّم التوثيق.",
        },
      },
    ],
    features: [
      {
        title: { en: "All sites on one screen", ru: "Все объекты на одном экране", zh: "多场所一屏查看", tr: "Tüm alanlar tek ekranda", ar: "كل المواقع على شاشة واحدة" },
        text: {
          en: "Cameras from several offices, shops or warehouses in one app, grouped by site.",
          ru: "Камеры нескольких офисов, магазинов или складов в одном приложении, сгруппированные по объектам.",
          zh: "多个办公室、门店或仓库的摄像头集中在一个 App 中，按场所分组。",
          tr: "Birden çok ofis, mağaza veya deponun kameraları tek uygulamada, lokasyona göre gruplanmış.",
          ar: "كاميرات عدة مكاتب أو متاجر أو مستودعات في تطبيق واحد، مجمّعة حسب الموقع.",
        },
      },
      {
        title: { en: "Search by event", ru: "Поиск по событиям", zh: "按事件检索", tr: "Olaya göre arama", ar: "البحث حسب الحدث" },
        text: {
          en: "Jump to a motion, intrusion or line-crossing event in the archive instead of scrolling through hours of video.",
          ru: "Переход к событию движения, проникновения или пересечения линии в архиве — без перемотки часов видео.",
          zh: "直接跳转到录像中的移动、入侵或越线事件，无需拖动几个小时的视频。",
          tr: "Saatlerce video sarmak yerine arşivde hareket, izinsiz giriş veya çizgi geçme olayına doğrudan gidin.",
          ar: "انتقل مباشرة إلى حدث حركة أو تسلل أو عبور خط في الأرشيف بدلًا من تمرير ساعات من الفيديو.",
        },
      },
      {
        title: { en: "Alerts on a schedule", ru: "Уведомления по расписанию", zh: "按时段告警", tr: "Zamanlanmış uyarılar", ar: "تنبيهات حسب الجدول" },
        text: {
          en: "Alerts only for chosen zones and hours, for example the warehouse at night, so staff are not flooded.",
          ru: "Уведомления только по выбранным зонам и часам, например склад ночью, чтобы не заваливать сотрудников.",
          zh: "仅针对选定区域和时段推送告警，例如夜间的仓库，避免消息过多。",
          tr: "Uyarılar yalnızca seçilen bölgeler ve saatler için, örneğin gece depo; ekip bildirimlere boğulmaz.",
          ar: "تنبيهات للمناطق والساعات المختارة فقط، كالمستودع ليلًا، حتى لا يغرق الموظفون بالإشعارات.",
        },
      },
      {
        title: { en: "Access by role", ru: "Доступ по ролям", zh: "按角色授权", tr: "Role göre erişim", ar: "الوصول حسب الدور" },
        text: {
          en: "Owners see everything; managers and guards see only the sites and cameras assigned to them.",
          ru: "Руководство видит всё, управляющие и охрана — только свои объекты и камеры.",
          zh: "管理层可查看全部，店长和保安只能查看各自负责的场所和摄像头。",
          tr: "Yönetim her şeyi görür; müdürler ve güvenlik yalnızca kendi alanlarını ve kameralarını.",
          ar: "ترى الإدارة كل شيء، بينما يرى المديرون والحراس مواقعهم وكاميراتهم فقط.",
        },
      },
      {
        title: { en: "Camera offline alerts", ru: "Контроль работы камер", zh: "摄像头离线告警", tr: "Kamera bağlantı uyarısı", ar: "تنبيه انقطاع الكاميرا" },
        text: {
          en: "If a camera or recorder stops recording or loses connection, the responsible person is notified.",
          ru: "Если камера или регистратор перестали писать или пропала связь, ответственный получает уведомление.",
          zh: "摄像头或录像机停止录像或断开连接时，负责人会收到通知。",
          tr: "Bir kamera veya kayıt cihazı kaydı durdurursa ya da bağlantısı koparsa sorumlu kişiye bildirim gider.",
          ar: "إذا توقفت كاميرا أو جهاز تسجيل عن التسجيل أو انقطع الاتصال، يصل إشعار إلى الشخص المسؤول.",
        },
      },
      {
        title: { en: "Clip export", ru: "Выгрузка фрагментов", zh: "片段导出", tr: "Klip dışa aktarma", ar: "تصدير المقاطع" },
        text: {
          en: "Save a fragment of the archive as a file and share it in a few clicks.",
          ru: "Фрагмент архива можно сохранить файлом и отправить в пару кликов.",
          zh: "几步操作即可将录像片段保存为文件并分享。",
          tr: "Arşivden bir parçayı dosya olarak kaydedip birkaç tıklamayla paylaşın.",
          ar: "احفظ مقطعًا من الأرشيف كملف وشاركه بنقرات قليلة.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "Can you use our existing cameras?",
          ru: "Можно использовать наши текущие камеры?",
          zh: "能用我们现有的摄像头吗？",
          tr: "Mevcut kameralarımız kullanılabilir mi?",
          ar: "هل يمكن استخدام كاميراتنا الحالية؟",
        },
        a: {
          en: "Often, yes. IP cameras that support ONVIF or RTSP can usually be connected. We check each model during the survey and suggest replacing only the cameras that cannot give the picture or features you need.",
          ru: "Часто да. IP-камеры с поддержкой ONVIF или RTSP обычно подключаются. Каждую модель проверяем на обследовании и предлагаем заменить только те камеры, которые не дают нужной картинки или функций.",
          zh: "很多情况下可以。支持 ONVIF 或 RTSP 的 IP 摄像头通常都能接入。我们会在调研时逐一检查型号，只建议更换无法提供所需画面或功能的摄像头。",
          tr: "Çoğu zaman evet. ONVIF veya RTSP destekleyen IP kameralar genellikle bağlanabilir. Her modeli inceleme sırasında kontrol ediyor, yalnızca gereken görüntüyü veya özellikleri veremeyen kameraların değiştirilmesini öneriyoruz.",
          ar: "غالبًا نعم. يمكن عادةً ربط كاميرات IP التي تدعم ONVIF أو RTSP. نفحص كل طراز خلال الدراسة ونقترح استبدال الكاميرات التي لا تقدّم الصورة أو الميزات المطلوبة فقط.",
        },
      },
      {
        q: {
          en: "Where are recordings stored?",
          ru: "Где хранятся записи?",
          zh: "录像存储在哪里？",
          tr: "Kayıtlar nerede saklanıyor?",
          ar: "أين تُخزَّن التسجيلات؟",
        },
        a: {
          en: "On a recorder or server at the site, in the cloud, or both, as agreed. How long the archive is kept depends on the number of cameras, picture quality and disk size; we calculate this at the design stage.",
          ru: "На регистраторе или сервере на объекте, в облаке или и там, и там — как договоримся. Глубина архива зависит от числа камер, качества записи и объёма дисков; это рассчитываем на этапе проектирования.",
          zh: "可存储在现场的录像机或服务器上、云端，或两者兼有，按双方约定。录像保存时长取决于摄像头数量、画质和硬盘容量，我们会在方案设计阶段进行测算。",
          tr: "Anlaşmaya göre sahadaki bir kayıt cihazında veya sunucuda, bulutta ya da her ikisinde. Arşivin ne kadar tutulacağı kamera sayısına, görüntü kalitesine ve disk boyutuna bağlıdır; bunu tasarım aşamasında hesaplıyoruz.",
          ar: "على جهاز تسجيل أو خادم في الموقع، أو في السحابة، أو في كليهما، حسب الاتفاق. وتعتمد مدة الاحتفاظ بالأرشيف على عدد الكاميرات وجودة الصورة وسعة الأقراص، ونحسبها في مرحلة التصميم.",
        },
      },
      {
        q: {
          en: "Do we need face and plate recognition?",
          ru: "Нужно ли распознавание лиц и номеров?",
          zh: "需要人脸和车牌识别吗？",
          tr: "Yüz ve plaka tanımaya ihtiyacımız var mı?",
          ar: "هل نحتاج إلى التعرّف على الوجوه واللوحات؟",
        },
        a: {
          en: "Not always; it is optional. For many offices and shops, motion and line-crossing alerts are enough. Recognition makes sense at entrances, checkpoints and car parks, and it can be added later.",
          ru: "Не всегда, это опция. Многим офисам и магазинам хватает уведомлений о движении и пересечении линии. Распознавание имеет смысл на входах, КПП и парковках, и его можно добавить позже.",
          zh: "不一定，这是可选项。对许多办公室和门店来说，移动和越线告警就已足够。识别功能更适合入口、门岗和停车场，也可以以后再加。",
          tr: "Her zaman değil; isteğe bağlıdır. Birçok ofis ve mağaza için hareket ve çizgi geçme uyarıları yeterlidir. Tanıma; girişlerde, kontrol noktalarında ve otoparklarda anlamlıdır ve sonradan eklenebilir.",
          ar: "ليس دائمًا، فهي ميزة اختيارية. تكفي تنبيهات الحركة وعبور الخط كثيرًا من المكاتب والمتاجر. أما التعرّف فمفيد عند المداخل ونقاط التفتيش والمواقف، ويمكن إضافته لاحقًا.",
        },
      },
    ],
  },

  "carbon-credits": {
    intro: {
      en: "Carbon credits sell only when buyers trust the numbers behind them. We build platforms that collect emissions data, run MRV, keep a registry with a full change history, tokenize credits and let them be bought, sold and retired on a marketplace.",
      ru: "Карбоновые кредиты продаются, только когда покупатель доверяет цифрам за ними. Мы делаем платформы, которые собирают данные о выбросах, ведут MRV и реестр с полной историей изменений, токенизируют кредиты и дают покупать, продавать и погашать их на площадке.",
      zh: "只有买方信任背后的数据，碳信用才卖得出去。我们开发的平台可以采集排放数据、执行 MRV、维护带完整变更记录的登记簿、将碳信用代币化，并支持在交易市场上买卖和注销。",
      tr: "Karbon kredileri, alıcı arkasındaki rakamlara güvendiğinde satılır. Emisyon verisini toplayan, MRV yürüten, tam değişiklik geçmişiyle sicil tutan, kredileri tokenize eden ve pazar yerinde alım, satım ve iptal imkânı veren platformlar geliştiriyoruz.",
      ar: "لا تُباع أرصدة الكربون إلا عندما يثق المشتري بالأرقام التي تقف خلفها. نبني منصات تجمع بيانات الانبعاثات وتدير MRV وتحفظ سجلًا بتاريخ تغييرات كامل، وترمّز الأرصدة وتتيح شراءها وبيعها وإلغاءها في سوق للتداول.",
    },
    stack: ["Solidity", "EVM smart contracts", "IPFS", "IoT / API data ingestion", "PostgreSQL", "Node.js", "Next.js"],
    steps: [
      {
        title: { en: "Methodology and data", ru: "Методология и данные", zh: "方法学与数据", tr: "Metodoloji ve veri", ar: "المنهجية والبيانات" },
        text: {
          en: "We study the project type, the methodology it follows and where emissions data comes from: meters, sensors, files or other systems.",
          ru: "Разбираем тип проекта, методологию, по которой он работает, и откуда берутся данные о выбросах: счётчики, датчики, файлы, другие системы.",
          zh: "梳理项目类型、所采用的方法学，以及排放数据的来源：计量表、传感器、文件或其他系统。",
          tr: "Proje türünü, izlediği metodolojiyi ve emisyon verisinin nereden geldiğini inceliyoruz: sayaçlar, sensörler, dosyalar veya diğer sistemler.",
          ar: "ندرس نوع المشروع والمنهجية التي يتبعها ومصادر بيانات الانبعاثات: العدادات أو الحساسات أو الملفات أو الأنظمة الأخرى.",
        },
      },
      {
        title: { en: "Platform design", ru: "Проектирование платформы", zh: "平台设计", tr: "Platform tasarımı", ar: "تصميم المنصة" },
        text: {
          en: "We design the MRV flow, the registry model, roles for project owners, verifiers and buyers, and the on-chain part.",
          ru: "Проектируем процесс MRV, модель реестра, роли для владельцев проектов, верификаторов и покупателей, а также on-chain часть.",
          zh: "设计 MRV 流程、登记簿模型、项目方、核查机构与买方的角色，以及链上部分。",
          tr: "MRV akışını, sicil modelini, proje sahipleri, doğrulayıcılar ve alıcılar için rolleri ve zincir üstü kısmı tasarlıyoruz.",
          ar: "نصمّم مسار MRV ونموذج السجل وأدوار أصحاب المشاريع والمدققين والمشترين، والجزء الخاص بالسلسلة.",
        },
      },
      {
        title: { en: "Development and integrations", ru: "Разработка и интеграции", zh: "开发与集成", tr: "Geliştirme ve entegrasyon", ar: "التطوير والتكامل" },
        text: {
          en: "We build data collection, calculations, the registry, smart contracts and the marketplace, and connect the data sources.",
          ru: "Делаем сбор данных, расчёты, реестр, смарт-контракты и маркетплейс, подключаем источники данных.",
          zh: "开发数据采集、核算、登记簿、智能合约和交易市场，并接入各数据源。",
          tr: "Veri toplama, hesaplamalar, sicil, akıllı sözleşmeler ve pazar yerini geliştiriyor, veri kaynaklarını bağlıyoruz.",
          ar: "نبني جمع البيانات والحسابات والسجل والعقود الذكية والسوق، ونربط مصادر البيانات.",
        },
      },
      {
        title: { en: "Pilot and launch", ru: "Пилот и запуск", zh: "试点与上线", tr: "Pilot ve yayına alma", ar: "التجربة والإطلاق" },
        text: {
          en: "We run a pilot on real project data, prepare reports for verifiers, close the gaps and hand over documentation.",
          ru: "Проводим пилот на реальных данных проекта, готовим отчёты для верификаторов, закрываем пробелы и передаём документацию.",
          zh: "用真实项目数据开展试点，为核查机构准备报告，补齐缺口，并移交文档。",
          tr: "Gerçek proje verisiyle pilot yürütüyor, doğrulayıcılar için raporlar hazırlıyor, eksikleri kapatıyor ve dokümantasyonu teslim ediyoruz.",
          ar: "نجري تجربة على بيانات حقيقية للمشروع، ونُعدّ التقارير للمدققين، ونسدّ الثغرات، ونسلّم التوثيق.",
        },
      },
    ],
    features: [
      {
        title: { en: "Data from many sources", ru: "Данные из разных источников", zh: "多源数据采集", tr: "Çok kaynaklı veri", ar: "بيانات من مصادر متعددة" },
        text: {
          en: "Meter and sensor readings, file uploads and API imports, each stored with its source and time.",
          ru: "Показания счётчиков и датчиков, загрузка файлов и импорт по API — каждая запись с источником и временем.",
          zh: "计量表与传感器读数、文件上传和 API 导入，每条数据都记录来源和时间。",
          tr: "Sayaç ve sensör okumaları, dosya yüklemeleri ve API aktarımları; her kayıt kaynağı ve zamanıyla saklanır.",
          ar: "قراءات العدادات والحساسات ورفع الملفات والاستيراد عبر API، ويُحفظ كل سجل مع مصدره ووقته.",
        },
      },
      {
        title: { en: "Versioned calculations", ru: "Расчёты с версиями формул", zh: "带版本的核算", tr: "Sürümlü hesaplamalar", ar: "حسابات بإصدارات موثّقة" },
        text: {
          en: "Each calculation keeps its formula version and input data, so any figure can be rechecked later.",
          ru: "Каждый расчёт хранит версию формулы и исходные данные, поэтому любую цифру можно перепроверить позже.",
          zh: "每次核算都保存公式版本和输入数据，任何数字日后都可复核。",
          tr: "Her hesaplama formül sürümünü ve girdi verisini saklar; böylece her rakam sonradan yeniden kontrol edilebilir.",
          ar: "يحتفظ كل حساب بإصدار المعادلة وبيانات الإدخال، فيمكن إعادة التحقق من أي رقم لاحقًا.",
        },
      },
      {
        title: { en: "Unique serial numbers", ru: "Уникальные серийные номера", zh: "唯一序列号", tr: "Benzersiz seri numaraları", ar: "أرقام تسلسلية فريدة" },
        text: {
          en: "Every credit gets a serial number, so the same tonne cannot be sold or retired twice.",
          ru: "У каждого кредита свой серийный номер, поэтому одну и ту же тонну нельзя продать или погасить дважды.",
          zh: "每个碳信用都有序列号，同一吨不能被重复出售或注销。",
          tr: "Her kredinin bir seri numarası vardır; aynı ton iki kez satılamaz veya iptal edilemez.",
          ar: "يحصل كل رصيد على رقم تسلسلي، فلا يمكن بيع الطن نفسه أو إلغاؤه مرتين.",
        },
      },
      {
        title: { en: "Verifier workspace", ru: "Кабинет верификатора", zh: "核查机构工作台", tr: "Doğrulayıcı alanı", ar: "مساحة عمل المدقق" },
        text: {
          en: "Verifiers review data, evidence and calculations in one place and leave comments or approvals.",
          ru: "Верификатор смотрит данные, подтверждающие материалы и расчёты в одном месте и оставляет замечания или подтверждение.",
          zh: "核查人员在同一处审阅数据、佐证材料和核算结果，并留下意见或确认。",
          tr: "Doğrulayıcılar veriyi, kanıtları ve hesaplamaları tek yerde inceler, yorum veya onay bırakır.",
          ar: "يراجع المدققون البيانات والأدلة والحسابات في مكان واحد ويتركون ملاحظاتهم أو موافقتهم.",
        },
      },
      {
        title: { en: "Public retirement record", ru: "Публичная запись о погашении", zh: "公开注销记录", tr: "Herkese açık iptal kaydı", ar: "سجل إلغاء علني" },
        text: {
          en: "Each retirement gets a public record and a certificate that buyers can show to their stakeholders.",
          ru: "Каждое погашение получает публичную запись и сертификат, который покупатель может показать партнёрам и инвесторам.",
          zh: "每次注销都会生成公开记录和证书，买方可向相关方出示。",
          tr: "Her iptal, alıcıların paydaşlarına gösterebileceği herkese açık bir kayıt ve sertifika alır.",
          ar: "يحصل كل إلغاء على سجل علني وشهادة يمكن للمشتري عرضها على الأطراف المعنية.",
        },
      },
      {
        title: { en: "Evidence storage", ru: "Хранение подтверждений", zh: "佐证材料存储", tr: "Kanıt arşivi", ar: "حفظ الأدلة" },
        text: {
          en: "Photos, documents and lab reports are attached to the project and linked to the credits they support.",
          ru: "Фото, документы и лабораторные отчёты привязаны к проекту и к тем кредитам, которые они подтверждают.",
          zh: "照片、文件和检测报告挂在项目下，并与其支撑的碳信用关联。",
          tr: "Fotoğraflar, belgeler ve laboratuvar raporları projeye eklenir ve destekledikleri kredilere bağlanır.",
          ar: "تُرفق الصور والمستندات وتقارير المختبر بالمشروع وتُربط بالأرصدة التي تدعمها.",
        },
      },
    ],
    faq: [
      {
        q: {
          en: "Is the platform certified by Verra or Gold Standard?",
          ru: "Платформа сертифицирована Verra или Gold Standard?",
          zh: "平台获得 Verra 或 Gold Standard 认证了吗？",
          tr: "Platform Verra veya Gold Standard sertifikalı mı?",
          ar: "هل المنصة معتمدة من Verra أو Gold Standard؟",
        },
        a: {
          en: "No. We build the software. Credits are certified by the standard and the verifiers the project works with. The platform prepares data, calculations and reports in the format they ask for and keeps a full history for their review.",
          ru: "Нет. Мы разрабатываем программную часть. Кредиты сертифицирует стандарт и верификаторы, с которыми работает проект. Платформа готовит данные, расчёты и отчёты в нужном им формате и хранит полную историю для проверки.",
          zh: "没有。我们负责开发软件。碳信用由项目合作的标准机构和核查机构认证。平台按照他们要求的格式准备数据、核算和报告，并保留完整历史供其审查。",
          tr: "Hayır. Biz yazılımı geliştiriyoruz. Kredileri, projenin çalıştığı standart ve doğrulayıcılar sertifikalandırır. Platform veriyi, hesaplamaları ve raporları istedikleri formatta hazırlar ve inceleme için tam geçmişi saklar.",
          ar: "لا. نحن نطوّر البرمجيات. أما اعتماد الأرصدة فتتولاه جهة المعيار والمدققون الذين يعمل معهم المشروع. وتُعدّ المنصة البيانات والحسابات والتقارير بالصيغة التي يطلبونها وتحفظ تاريخًا كاملًا لمراجعتهم.",
        },
      },
      {
        q: {
          en: "Do we need blockchain at all?",
          ru: "Зачем здесь блокчейн?",
          zh: "一定要用区块链吗？",
          tr: "Blokzincir gerçekten gerekli mi?",
          ar: "هل نحتاج إلى البلوكتشين أصلًا؟",
        },
        a: {
          en: "Not for every step. MRV and the registry run on a regular database with a change history. Tokenization adds an on-chain record of issuance, transfer and retirement that buyers can check independently. We choose the network together.",
          ru: "Не для каждого шага. MRV и реестр работают на обычной базе данных с историей изменений. Токенизация добавляет on-chain запись о выпуске, передаче и погашении, которую покупатель может проверить сам. Сеть выбираем вместе.",
          zh: "并非每个环节都需要。MRV 和登记簿运行在带变更记录的常规数据库上。代币化则增加了发行、转让和注销的链上记录，买方可以独立核验。区块链网络由双方共同选择。",
          tr: "Her adım için değil. MRV ve sicil, değişiklik geçmişi olan standart bir veritabanında çalışır. Tokenizasyon; ihraç, transfer ve iptal için alıcıların bağımsız olarak kontrol edebileceği zincir üstü bir kayıt ekler. Ağı birlikte seçiyoruz.",
          ar: "ليس لكل خطوة. يعمل MRV والسجل على قاعدة بيانات عادية مع تاريخ للتغييرات. ويضيف الترميز سجلًا على السلسلة للإصدار والنقل والإلغاء يمكن للمشترين التحقق منه بأنفسهم. ونختار الشبكة معًا.",
        },
      },
      {
        q: {
          en: "Can it use the data we already collect?",
          ru: "Можно использовать данные, которые мы уже собираем?",
          zh: "能使用我们已经在采集的数据吗？",
          tr: "Hâlihazırda topladığımız veriler kullanılabilir mi?",
          ar: "هل يمكن استخدام البيانات التي نجمعها بالفعل؟",
        },
        a: {
          en: "Yes. We connect meters, sensors, spreadsheets or existing systems through files or APIs. At the first stage we map what data exists, what is missing and how to collect it regularly.",
          ru: "Да. Подключаем счётчики, датчики, таблицы или существующие системы через файлы или API. На первом этапе разбираем, какие данные уже есть, чего не хватает и как собирать их регулярно.",
          zh: "可以。我们通过文件或 API 接入计量表、传感器、表格或现有系统。在第一阶段梳理已有哪些数据、缺少哪些，以及如何定期采集。",
          tr: "Evet. Sayaçları, sensörleri, tabloları veya mevcut sistemleri dosya ya da API üzerinden bağlıyoruz. İlk aşamada hangi verinin olduğunu, neyin eksik olduğunu ve düzenli olarak nasıl toplanacağını çıkarıyoruz.",
          ar: "نعم. نربط العدادات والحساسات وجداول البيانات أو الأنظمة القائمة عبر الملفات أو API. وفي المرحلة الأولى نحدد البيانات المتوفرة والناقصة وكيفية جمعها بانتظام.",
        },
      },
    ],
  },
};
