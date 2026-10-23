import type { ServiceDetails } from "./types";

export const PART_D: ServiceDetails = {
  "conference-av": {
    intro: {
      en: "In many meeting rooms the back rows strain to hear, remote participants get echo, and every call starts with ten minutes of cables. We select the equipment, install and tune it for the room, connect video calls and put the whole room on one control panel.",
      ru: "Во многих залах задние ряды плохо слышат докладчика, удалённые участники жалуются на эхо, а каждая встреча начинается с десяти минут возни с проводами. Мы подбираем оборудование, монтируем и настраиваем его под конкретный зал, подключаем видеосвязь и выводим управление на одну панель.",
      zh: "很多会议室后排听不清，远程参会者听到回声，每次开会前都要花十分钟接线。我们负责设备选型、按场地安装调试、接通视频会议，并把整个会议室的控制集中到一块面板上。",
      tr: "Birçok toplantı salonunda arka sıralar konuşmacıyı zor duyar, uzaktaki katılımcılar yankı duyar ve her toplantı on dakikalık kablo uğraşıyla başlar. Ekipmanı seçiyor, salona göre kurup ayarlıyor, görüntülü görüşmeyi bağlıyor ve tüm salonu tek kontrol paneline taşıyoruz.",
      ar: "في كثير من القاعات لا تسمع الصفوف الخلفية المتحدث جيدًا، ويشتكي المشاركون عن بُعد من الصدى، ويبدأ كل اجتماع بعشر دقائق من ترتيب الكابلات. نختار المعدات ونركّبها ونضبطها حسب القاعة، ونوصل مكالمات الفيديو، ونجمع التحكم بالقاعة كلها في لوحة واحدة.",
    },
    stack: ["DSP / audio processors", "Ceiling & column speakers", "Boundary and gooseneck mics", "Dante / AES67", "PTZ cameras", "Zoom Rooms / Microsoft Teams Rooms", "Control panel & tablet app"],
    steps: [
      {
        title: { en: "Room survey", ru: "Осмотр зала", zh: "场地勘察", tr: "Salon incelemesi", ar: "معاينة القاعة" },
        text: {
          en: "We look at the size, finishes and seating, check existing equipment and agree how the room is used: talks, round tables, calls.",
          ru: "Смотрим размеры, отделку и рассадку, проверяем текущее оборудование и договариваемся, как используется зал: доклады, круглые столы, созвоны.",
          zh: "查看面积、装修和座位布局，检查现有设备，并确认会议室的用途：演讲、圆桌讨论、视频会议。",
          tr: "Boyutlara, yüzeylere ve oturma düzenine bakıyor, mevcut ekipmanı kontrol ediyor ve salonun nasıl kullanılacağını netleştiriyoruz: sunum, yuvarlak masa, görüşme.",
          ar: "نطّلع على المساحة والتشطيبات وترتيب المقاعد، ونفحص المعدات الحالية، ونتفق على طريقة استخدام القاعة: عروض أو طاولات مستديرة أو مكالمات.",
        },
      },
      {
        title: { en: "Design and equipment list", ru: "Схема и подбор оборудования", zh: "方案与设备清单", tr: "Tasarım ve ekipman listesi", ar: "المخطط وقائمة المعدات" },
        text: {
          en: "We place speakers, microphones and cameras on a plan and send an equipment list with the estimate before anything is bought.",
          ru: "Расставляем колонки, микрофоны и камеры на плане и присылаем список оборудования со сметой до любых закупок.",
          zh: "在平面图上布置扬声器、麦克风和摄像头，采购前先发送设备清单和报价。",
          tr: "Hoparlör, mikrofon ve kameraları plan üzerinde yerleştiriyor, herhangi bir satın alımdan önce ekipman listesini ve maliyeti gönderiyoruz.",
          ar: "نوزّع السماعات والميكروفونات والكاميرات على المخطط، ونرسل قائمة المعدات مع التكلفة قبل أي شراء.",
        },
      },
      {
        title: { en: "Installation and tuning", ru: "Монтаж и настройка", zh: "安装与调试", tr: "Kurulum ve ayar", ar: "التركيب والضبط" },
        text: {
          en: "We install and cable the equipment, tune the sound for the room, set up echo cancellation and connect Zoom or Teams.",
          ru: "Монтируем и подключаем оборудование, настраиваем звук под зал, эхоподавление и подключаем Zoom или Teams.",
          zh: "安装并布线，按会议室调音，设置回声消除，接入 Zoom 或 Teams。",
          tr: "Ekipmanı kurup kablolarını çekiyor, sesi salona göre ayarlıyor, yankı engellemeyi kuruyor ve Zoom veya Teams'i bağlıyoruz.",
          ar: "نركّب المعدات ونمدّ الكابلات، ونضبط الصوت حسب القاعة وإلغاء الصدى، ونوصل Zoom أو Teams.",
        },
      },
      {
        title: { en: "Handover and training", ru: "Сдача и обучение", zh: "交付与培训", tr: "Teslim ve eğitim", ar: "التسليم والتدريب" },
        text: {
          en: "We run a test meeting with your team, show how to use the panel and hand over the wiring plan and settings.",
          ru: "Проводим тестовую встречу с вашей командой, показываем работу с панелью и передаём схему подключений и настройки.",
          zh: "与您的团队进行一次测试会议，演示面板操作，并交付接线图和配置说明。",
          tr: "Ekibinizle bir deneme toplantısı yapıyor, panelin kullanımını gösteriyor ve bağlantı şemasıyla ayarları teslim ediyoruz.",
          ar: "نجري اجتماعًا تجريبيًا مع فريقك، ونشرح استخدام اللوحة، ونسلّم مخطط التوصيلات والإعدادات.",
        },
      },
    ],
    features: [
      {
        title: { en: "Even sound in every row", ru: "Ровный звук на всех местах", zh: "每排音量均匀", tr: "Her sırada dengeli ses", ar: "صوت متساوٍ في كل صف" },
        text: {
          en: "Speakers are placed and tuned so the back rows hear as well as the front, without turning the volume up.",
          ru: "Колонки расставлены и настроены так, чтобы задние ряды слышали так же, как первые, без лишней громкости.",
          zh: "扬声器的位置和调音保证后排与前排听得一样清楚，无需调大音量。",
          tr: "Hoparlörler, arka sıralar ön sıralar kadar iyi duysun diye ses açmadan yerleştirilip ayarlanır.",
          ar: "تُوزَّع السماعات وتُضبط بحيث تسمع الصفوف الخلفية كالأمامية دون رفع الصوت.",
        },
      },
      {
        title: { en: "No echo on calls", ru: "Без эха на созвонах", zh: "通话无回声", tr: "Görüşmelerde yankı yok", ar: "بلا صدى في المكالمات" },
        text: {
          en: "Echo cancellation and noise reduction in the audio processor, so remote participants hear the speaker, not the room.",
          ru: "Эхоподавление и шумоподавление в аудиопроцессоре: удалённые участники слышат докладчика, а не гул зала.",
          zh: "音频处理器中的回声消除和降噪，让远程参会者听到的是发言人，而不是会场杂音。",
          tr: "Ses işlemcisinde yankı ve gürültü engelleme: uzaktaki katılımcılar salonu değil konuşmacıyı duyar.",
          ar: "إلغاء الصدى وتقليل الضوضاء في معالج الصوت، فيسمع المشاركون عن بُعد المتحدث لا ضجيج القاعة.",
        },
      },
      {
        title: { en: "Scenes in one tap", ru: "Сценарии в одно касание", zh: "一键切换场景", tr: "Tek dokunuşla senaryolar", ar: "سيناريوهات بلمسة واحدة" },
        text: {
          en: "Presentation, round table or video call: one button sets microphones, volume, camera and screen for the format.",
          ru: "«Доклад», «Круглый стол» или «Видеосвязь»: одна кнопка настраивает микрофоны, громкость, камеру и экран под формат.",
          zh: "演讲、圆桌或视频会议：一个按钮即可按形式设置麦克风、音量、摄像头和屏幕。",
          tr: "Sunum, yuvarlak masa veya görüntülü görüşme: tek düğme mikrofonları, sesi, kamerayı ve ekranı formata göre ayarlar.",
          ar: "عرض أو طاولة مستديرة أو مكالمة فيديو: زر واحد يضبط الميكروفونات والصوت والكاميرا والشاشة حسب الصيغة.",
        },
      },
      {
        title: { en: "Camera follows the speaker", ru: "Камера на говорящего", zh: "摄像头跟随发言人", tr: "Kamera konuşanı izler", ar: "الكاميرا تتبع المتحدث" },
        text: {
          en: "With a PTZ camera, presets switch the view to the active microphone, so remote participants see who is talking.",
          ru: "С PTZ-камерой пресеты переключают кадр на активный микрофон, и удалённые участники видят, кто говорит.",
          zh: "配合 PTZ 摄像头，预置位会把画面切到正在使用的麦克风，远程参会者能看到谁在发言。",
          tr: "PTZ kamerayla ön ayarlar görüntüyü etkin mikrofona çevirir; uzaktaki katılımcılar kimin konuştuğunu görür.",
          ar: "مع كاميرا PTZ تنقل الإعدادات المسبقة الصورة إلى الميكروفون النشط، فيرى المشاركون عن بُعد من يتحدث.",
        },
      },
      {
        title: { en: "Recording of meetings", ru: "Запись встреч", zh: "会议录制", tr: "Toplantı kaydı", ar: "تسجيل الاجتماعات" },
        text: {
          en: "Sound from the room, and video if needed, is recorded from the panel and saved where you agree.",
          ru: "Звук зала, а при необходимости и видео, записывается с панели и сохраняется туда, куда договоримся.",
          zh: "可在面板上录制会场声音，需要时也可录像，并保存到约定的位置。",
          tr: "Salonun sesi, gerekirse görüntüsü de panelden kaydedilir ve kararlaştırılan yere saklanır.",
          ar: "يُسجَّل صوت القاعة، والفيديو عند الحاجة، من اللوحة ويُحفظ في المكان المتفق عليه.",
        },
      },
      {
        title: { en: "Several rooms, one standard", ru: "Несколько залов, один стандарт", zh: "多间会议室统一标准", tr: "Birden çok salon, tek standart", ar: "عدة قاعات بمعيار واحد" },
        text: {
          en: "Meeting rooms and the main hall work the same way, so staff don't relearn the controls in each room.",
          ru: "Переговорные и большой зал устроены одинаково, и сотрудникам не нужно заново разбираться в каждой комнате.",
          zh: "小会议室和大会议厅操作方式一致，员工不必在每个房间重新学习。",
          tr: "Toplantı odaları ve ana salon aynı şekilde çalışır; çalışanlar her odada kontrolleri yeniden öğrenmez.",
          ar: "تعمل قاعات الاجتماعات والقاعة الكبرى بالطريقة نفسها، فلا يحتاج الموظفون إلى تعلّم التحكم من جديد في كل غرفة.",
        },
      },
    ],
    faq: [
      {
        q: { en: "Can you use the equipment we already have?", ru: "Можно ли использовать наше текущее оборудование?", zh: "能用我们现有的设备吗？", tr: "Mevcut ekipmanımızı kullanabilir misiniz?", ar: "هل يمكن استخدام معداتنا الحالية؟" },
        a: {
          en: "Often, yes. During the survey we check what you have and keep whatever works and fits the room. The equipment list then covers only what is missing.",
          ru: "Часто да. На осмотре проверяем, что у вас есть, и оставляем всё, что исправно и подходит залу. В смету попадает только недостающее.",
          zh: "通常可以。勘察时我们会检查现有设备，保留可用且适合场地的部分，清单中只列出缺少的设备。",
          tr: "Çoğu zaman evet. İnceleme sırasında elinizdekileri kontrol ediyor, çalışan ve salona uygun olanları koruyoruz. Listede yalnızca eksikler yer alır.",
          ar: "غالبًا نعم. نفحص أثناء المعاينة ما لديكم ونُبقي على كل ما يعمل ويناسب القاعة، فلا تشمل القائمة إلا ما ينقص.",
        },
      },
      {
        q: { en: "Will it work with Zoom and Teams?", ru: "Будет ли работать с Zoom и Teams?", zh: "能配合 Zoom 和 Teams 使用吗？", tr: "Zoom ve Teams ile çalışır mı?", ar: "هل يعمل مع Zoom وTeams؟" },
        a: {
          en: "Yes. We connect the room's microphones, speakers and camera so a call in Zoom or Teams uses them. If you use another platform, tell us at the survey.",
          ru: "Да. Подключаем микрофоны, колонки и камеру зала так, чтобы созвон в Zoom или Teams шёл через них. Если у вас другая платформа, скажите на осмотре.",
          zh: "可以。我们会连接会议室的麦克风、扬声器和摄像头，让 Zoom 或 Teams 通话直接使用它们。如使用其他平台，请在勘察时告诉我们。",
          tr: "Evet. Salonun mikrofonlarını, hoparlörlerini ve kamerasını Zoom veya Teams görüşmesi bunları kullanacak şekilde bağlıyoruz. Başka bir platform kullanıyorsanız incelemede söyleyin.",
          ar: "نعم. نوصل ميكروفونات القاعة وسماعاتها وكاميرتها بحيث تستخدمها مكالمات Zoom أو Teams. وإن كنتم تستخدمون منصة أخرى فأخبرونا أثناء المعاينة.",
        },
      },
      {
        q: { en: "What does the price depend on?", ru: "От чего зависит стоимость?", zh: "价格取决于什么？", tr: "Fiyat neye bağlı?", ar: "على ماذا يعتمد السعر؟" },
        a: {
          en: "On the size of the room, the number of seats and microphones, whether you need video calls and cameras, and how much existing equipment can stay. The price starts from $1k; the exact figure comes with the equipment list.",
          ru: "От размера зала, числа мест и микрофонов, нужны ли видеосвязь и камеры, и сколько текущего оборудования можно оставить. Стоимость — от $1k, точную сумму даём вместе со списком оборудования.",
          zh: "取决于会议室面积、座位和麦克风数量、是否需要视频会议和摄像头，以及现有设备能保留多少。$1k 起，准确金额随设备清单一起提供。",
          tr: "Salonun büyüklüğüne, koltuk ve mikrofon sayısına, görüntülü görüşme ve kamera gerekip gerekmediğine ve mevcut ekipmanın ne kadarının kalabileceğine. Fiyat 1 bin $'dan başlar; kesin tutarı ekipman listesiyle birlikte veriyoruz.",
          ar: "على مساحة القاعة وعدد المقاعد والميكروفونات، والحاجة إلى مكالمات الفيديو والكاميرات، ومقدار المعدات الحالية التي يمكن إبقاؤها. يبدأ السعر من $1k، ونقدّم المبلغ الدقيق مع قائمة المعدات.",
        },
      },
    ],
  },
};
