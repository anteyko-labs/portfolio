import { Language } from "./translations";

// Bilingual string used across the blog (mirrors the {en,ru} shape used by
// cases-data.ts so consumers stay consistent: value[language]).
export type Localized = { [K in Language]: string };
export type LocalizedList = { [K in Language]: string[] };

// A post body is an ordered list of sections. Each section has a heading and a
// list of paragraphs. Kept deliberately simple/typed — no markdown parser, the
// article page just maps headings to <h2> and paragraphs to <p>.
export interface BlogSection {
  heading: Localized;
  paragraphs: LocalizedList;
}

export interface BlogPost {
  slug: string;
  title: Localized;
  excerpt: Localized;
  /** ISO date (YYYY-MM-DD). Used for sorting + Article datePublished. */
  date: string;
  tags: string[];
  body: BlogSection[];
}

// Posts are authored as genuine thought-leadership grounded in the studio's real
// approach (see /about and /process): 4-phase, milestone-based delivery; the four
// principles Clarity / Predictability / Speed / Ownership; verification gates before
// release; full repo + IP ownership from day one; and a team that ships Web2 and
// Web3 in one loop. No client names, no invented metrics, no awards — claims are
// kept general and defensible.
const _posts: BlogPost[] = [
  {
    slug: "shipping-an-mvp-in-4-weeks",
    title: {
      en: "Shipping an MVP in four weeks without cutting the corners that matter",
      ru: "Как выпустить MVP за четыре недели, не срезая то, что действительно важно",
      zh: "四周交付 MVP，却不牺牲真正重要的环节",
      tr: "Önemli olan köşeleri kesmeden dört haftada MVP teslim etmek",
      ar: "إطلاق MVP في أربعة أسابيع دون التفريط فيما يهم",
    },
    excerpt: {
      en: "A four-week MVP is a scoping discipline, not a heroics sprint. Here is how a fixed delivery loop, weekly milestones, and a release gate let you move fast and still ship something you can build on.",
      ru: "MVP за четыре недели — это дисциплина скоупа, а не геройский спринт. Рассказываем, как фиксированный цикл поставки, недельные майлстоуны и гейт релиза позволяют двигаться быстро и при этом выпускать продукт, на котором можно строить дальше.",
      zh: "四周 MVP 靠的是范围管理的纪律，而不是拼命冲刺。固定的交付闭环、每周里程碑和发布关卡，让您既能快速推进，又能交付可以继续构建的成果。",
      tr: "Dört haftalık bir MVP, kahramanlık sprint'i değil, bir kapsam disiplinidir. Sabit bir teslimat döngüsü, haftalık kilometre taşları ve bir yayın kapısı, hızlı hareket ederken üzerine inşa edebileceğiniz bir şey teslim etmenizi nasıl sağlar, anlatıyoruz.",
      ar: "MVP في أربعة أسابيع هو انضباط في تحديد النطاق، وليس سباق بطولات فردية. إليك كيف تتيح لك دورة تسليم ثابتة ومراحل أسبوعية وبوابة إصدار أن تتحرك بسرعة وتُطلق مع ذلك منتجًا يمكنك البناء عليه.",
    },
    date: "2026-04-28",
    tags: ["MVP", "Delivery", "Product"],
    body: [
      {
        heading: {
          en: "Four weeks is a constraint, not a promise of less",
          ru: "Четыре недели — это ограничение, а не обещание сделать меньше",
          zh: "四周是一种约束，并不意味着做得更少",
          tr: "Dört hafta bir kısıttır, daha azının vaadi değil",
          ar: "الأسابيع الأربعة قيد وليست وعدًا بالأقل",
        },
        paragraphs: {
          en: [
            "Most teams hear “MVP in four weeks” and assume the only way to hit it is to skip the boring parts: tests, environments, documentation, a real release. We treat the deadline the opposite way. The four weeks are fixed; what flexes is scope. The first job is not to write code, it is to decide what the smallest honest version of the product is — the thinnest slice that a real user can actually use and that you can keep building on afterwards.",
            "That framing changes every conversation. Instead of arguing about whether a feature is “nice to have,” you ask a sharper question: does this belong in the first usable slice, or in the next milestone? A constraint forces that decision early, while it is still cheap to make.",
          ],
          ru: [
            "Большинство команд слышат «MVP за четыре недели» и решают, что единственный способ уложиться — пропустить скучное: тесты, окружения, документацию, нормальный релиз. Мы относимся к сроку наоборот. Четыре недели зафиксированы; гибким остаётся скоуп. Первая задача — не писать код, а решить, какой самый маленький честный вариант продукта возможен: тончайший срез, которым реально пользуется живой пользователь и на котором потом можно строить дальше.",
            "Такая рамка меняет каждый разговор. Вместо спора о том, «приятная» ли это фича, вы задаёте более точный вопрос: это часть первого работающего среза или следующего майлстоуна? Ограничение заставляет принять решение рано, пока оно ещё дёшево.",
          ],
          zh: ["大多数团队听到“四周做出 MVP”，就以为只能跳过那些枯燥的部分：测试、环境、文档、正式发布。我们的做法恰恰相反。四周是固定的，可以弹性调整的是范围。首要任务不是写代码，而是确定产品最小而诚实的版本——真实用户能够真正使用、且之后可以持续构建的最薄的一层。", "这种思路会改变每一次讨论。与其争论某个功能是不是“锦上添花”，不如问一个更尖锐的问题：它应该进入第一个可用版本，还是留给下一个里程碑？约束迫使我们尽早做出这个决定，此时代价仍然很小。"],
          tr: ["Çoğu ekip “dört haftada MVP” lafını duyunca buna ulaşmanın tek yolunun sıkıcı kısımları atlamak olduğunu varsayar: testler, ortamlar, dokümantasyon, gerçek bir yayın. Biz son tarihe tam tersi yaklaşırız. Dört hafta sabittir; esneyen şey kapsamdır. İlk iş kod yazmak değil, ürünün en küçük dürüst sürümünün ne olduğuna karar vermektir — gerçek bir kullanıcının gerçekten kullanabileceği ve sonrasında üzerine inşa etmeye devam edebileceğiniz en ince dilim.", "Bu çerçeve her konuşmayı değiştirir. Bir özelliğin “olsa iyi olur” olup olmadığını tartışmak yerine daha keskin bir soru sorarsınız: bu, ilk kullanılabilir dilime mi ait, yoksa bir sonraki kilometre taşına mı? Bir kısıt bu kararı erken, henüz vermesi ucuzken almaya zorlar."],
          ar: ["تسمع معظم الفرق عبارة «MVP في أربعة أسابيع» فتفترض أن السبيل الوحيد لتحقيقها هو تجاوز الأجزاء المملة: الاختبارات والبيئات والتوثيق وإصدار حقيقي. نحن نتعامل مع الموعد النهائي بعكس ذلك. الأسابيع الأربعة ثابتة، والمرن هو النطاق. أول مهمة ليست كتابة الشيفرة، بل تحديد أصغر نسخة صادقة من المنتج — أرقّ شريحة يستطيع مستخدم حقيقي استخدامها فعلًا ويمكنك مواصلة البناء عليها بعد ذلك.", "هذا الإطار يغيّر كل نقاش. فبدلًا من الجدل حول ما إذا كانت الميزة «مرغوبة فقط»، تطرح سؤالًا أدق: هل تنتمي هذه الميزة إلى أول شريحة قابلة للاستخدام أم إلى المرحلة التالية؟ القيد يفرض اتخاذ هذا القرار مبكرًا، حين يكون ثمنه لا يزال زهيدًا."],
        },
      },
      {
        heading: {
          en: "Weekly milestones turn a month into four checkpoints",
          ru: "Недельные майлстоуны превращают месяц в четыре контрольные точки",
          zh: "每周里程碑把一个月拆成四个检查点",
          tr: "Haftalık kilometre taşları bir ayı dört kontrol noktasına çevirir",
          ar: "المراحل الأسبوعية تحوّل الشهر إلى أربع نقاط مراجعة",
        },
        paragraphs: {
          en: [
            "A four-week build is not one long sprint toward a single reveal at the end. We split it into weekly milestones, each with a concrete deliverable you can look at and react to. A typical shape: week one locks scope and a clickable shape of the core flow; weeks two and three build that flow end to end against real data; week four is hardening and the release.",
            "The point of the weekly cadence is that the project never disappears into a black box. Each milestone is a moment where the direction can be corrected for the cost of a few days, not a few weeks. If something we assumed turns out to be wrong, we find out at the next checkpoint — not at launch.",
          ],
          ru: [
            "Сборка за четыре недели — это не один длинный спринт ради единственного раскрытия в конце. Мы делим её на недельные майлстоуны, у каждого — конкретный результат, который можно посмотреть и на который можно отреагировать. Типичная форма: первая неделя фиксирует скоуп и кликабельную форму основного потока; вторая и третья собирают этот поток от начала до конца на реальных данных; четвёртая — укрепление и релиз.",
            "Смысл недельного ритма в том, что проект никогда не исчезает в чёрном ящике. Каждый майлстоун — момент, когда направление можно скорректировать ценой нескольких дней, а не нескольких недель. Если какое-то наше предположение оказалось неверным, мы узнаём об этом на следующей контрольной точке, а не на запуске.",
          ],
          zh: ["四周的开发不是朝着最后一次揭晓冲刺的一场长跑。我们把它拆分成每周的里程碑，每个都有具体的交付物，供您查看并反馈。典型节奏是：第一周锁定范围，并给出核心流程的可点击雏形；第二、三周基于真实数据端到端构建该流程；第四周进行加固并发布。", "每周节奏的意义在于，项目永远不会消失在黑箱里。在每个里程碑，方向的纠偏只需花几天，而不是几周。如果我们的某个假设被证明是错的，会在下一个检查点发现——而不是上线时。"],
          tr: ["Dört haftalık bir geliştirme, sonunda tek bir açılışa doğru koşulan uzun bir sprint değildir. Bunu, her biri bakıp tepki verebileceğiniz somut bir teslimata sahip haftalık kilometre taşlarına böleriz. Tipik bir düzen: birinci hafta kapsamı ve çekirdek akışın tıklanabilir halini sabitler; ikinci ve üçüncü haftalar bu akışı gerçek veriyle uçtan uca kurar; dördüncü hafta sağlamlaştırma ve yayındır.", "Haftalık ritmin amacı, projenin asla bir kara kutuya dönüşmemesidir. Her kilometre taşı, yönün birkaç haftaya değil birkaç günün maliyetine düzeltilebileceği bir andır. Varsaydığımız bir şey yanlış çıkarsa bunu bir sonraki kontrol noktasında öğreniriz — lansmanda değil."],
          ar: ["بناء الأسابيع الأربعة ليس سباقًا طويلًا نحو كشف واحد في النهاية. نقسّمه إلى مراحل أسبوعية، لكل منها مخرج ملموس يمكنك رؤيته والتفاعل معه. الشكل المعتاد: الأسبوع الأول يثبّت النطاق وهيكلًا تفاعليًا للمسار الأساسي؛ الأسبوعان الثاني والثالث يبنيان هذا المسار من البداية إلى النهاية على بيانات حقيقية؛ والأسبوع الرابع للتحصين والإصدار.", "جوهر الإيقاع الأسبوعي أن المشروع لا يتحول أبدًا إلى صندوق أسود. كل مرحلة لحظة يمكن فيها تصحيح الاتجاه بكلفة أيام قليلة لا أسابيع. وإن تبيّن أن افتراضًا لدينا كان خاطئًا، نكتشف ذلك عند نقطة المراجعة التالية — لا عند الإطلاق."],
        },
      },
      {
        heading: {
          en: "Speed without a release gate is just debt with a deadline",
          ru: "Скорость без гейта релиза — это просто долг со сроком",
          zh: "没有发布关卡的速度，只是带着截止日期的技术债",
          tr: "Yayın kapısı olmayan hız, son tarihli borçtan başka bir şey değildir",
          ar: "السرعة دون بوابة إصدار ليست سوى دَين بموعد استحقاق",
        },
        paragraphs: {
          en: [
            "The fastest way to miss a four-week deadline is to ship something on day twenty-eight that nobody can deploy with confidence. So the release itself is a defined step, not an afterthought. Before an MVP goes out, it passes a short verification checklist: the build is clean, the core flow works against a production-like environment, the obvious security basics are in place, and a smoke pass confirms the happy path actually runs where users will hit it.",
            "This is the difference between speed and recklessness. A release gate does not slow a four-week build down — it is what makes the four-week number trustworthy, because “done” means “running,” not “it worked on my machine.”",
          ],
          ru: [
            "Самый быстрый способ сорвать срок в четыре недели — выкатить на двадцать восьмой день что-то, что никто не решается задеплоить. Поэтому сам релиз — это определённый шаг, а не то, о чём вспоминают в последний момент. Прежде чем MVP уходит наружу, он проходит короткий чеклист верификации: сборка чистая, основной поток работает в окружении, близком к production, базовая безопасность на месте, а smoke-проход подтверждает, что счастливый сценарий действительно запускается там, где на него попадут пользователи.",
            "В этом и разница между скоростью и безрассудством. Гейт релиза не замедляет сборку за четыре недели — именно он делает цифру «четыре недели» заслуживающей доверия, потому что «готово» означает «работает», а не «у меня на машине заработало».",
          ],
          zh: ["错过四周截止日期最快的方式，就是在第二十八天交出一个没人敢放心部署的东西。所以发布本身是一个明确定义的步骤，而不是事后补上的环节。MVP 上线之前，必须通过一份简短的验证清单：构建干净、核心流程在类生产环境下可用、基本的安全措施到位，并通过冒烟测试确认主流程确实能在用户使用的环境中跑通。", "这就是速度与鲁莽的区别。发布关卡不会拖慢四周的开发——恰恰是它让“四周”这个数字值得信赖，因为“完成”意味着“已在运行”，而不是“在我机器上能跑”。"],
          tr: ["Dört haftalık bir son tarihi kaçırmanın en hızlı yolu, yirmi sekizinci günde kimsenin güvenle dağıtamayacağı bir şey teslim etmektir. Bu yüzden yayın, sonradan akla gelen bir şey değil, tanımlı bir adımdır. Bir MVP çıkmadan önce kısa bir doğrulama kontrol listesinden geçer: derleme temizdir, çekirdek akış production benzeri bir ortamda çalışır, bariz güvenlik temelleri yerindedir ve bir smoke geçişi mutlu yolun kullanıcıların karşılaşacağı yerde gerçekten çalıştığını doğrular.", "Hız ile pervasızlık arasındaki fark budur. Yayın kapısı dört haftalık bir geliştirmeyi yavaşlatmaz — dört hafta rakamını güvenilir kılan şey odur, çünkü “bitti”, “benim makinemde çalıştı” değil, “çalışıyor” demektir."],
          ar: ["أسرع طريق لتفويت موعد الأسابيع الأربعة هو تسليم شيء في اليوم الثامن والعشرين لا يستطيع أحد نشره بثقة. لذلك يكون الإصدار نفسه خطوة محددة وليس فكرة لاحقة. قبل خروج أي MVP يجتاز قائمة تحقق قصيرة: البناء نظيف، والمسار الأساسي يعمل في بيئة مشابهة للإنتاج، والأساسيات الأمنية البديهية موجودة، واختبار Smoke يؤكد أن المسار الأمثل يعمل فعلًا حيث سيصل إليه المستخدمون.", "هذا هو الفرق بين السرعة والتهور. بوابة الإصدار لا تبطّئ بناء الأسابيع الأربعة — بل هي ما يجعل الرقم أربعة جديرًا بالثقة، لأن «انتهى» تعني «يعمل»، لا «اشتغل على جهازي»."],
        },
      },
      {
        heading: {
          en: "Build the MVP so the next version is cheap",
          ru: "Делайте MVP так, чтобы следующая версия была дешёвой",
          zh: "把 MVP 做成下一个版本成本很低的样子",
          tr: "MVP'yi bir sonraki sürüm ucuz olacak şekilde kurun",
          ar: "ابنِ الـ MVP بحيث تكون النسخة التالية رخيصة",
        },
        paragraphs: {
          en: [
            "A good MVP is not a throwaway prototype. The whole reason to be disciplined about scope is so that the slice you ship is a foundation, not a dead end. That means the architecture choices made under time pressure should still make sense at the next milestone: clear boundaries, real data, and no shortcuts that you would have to tear out to add the second feature.",
            "Four weeks is enough to learn whether an idea has legs. It is also enough to leave behind a codebase you would be comfortable handing to anyone — including yourself, three months from now, when the MVP has earned its second version.",
          ],
          ru: [
            "Хороший MVP — это не одноразовый прототип. Весь смысл дисциплины по скоупу в том, чтобы выпущенный срез был фундаментом, а не тупиком. Это значит, что архитектурные решения, принятые под давлением сроков, должны оставаться осмысленными на следующем майлстоуне: понятные границы, реальные данные и никаких костылей, которые придётся выдирать, чтобы добавить вторую фичу.",
            "Четырёх недель достаточно, чтобы понять, есть ли у идеи будущее. Их же достаточно, чтобы оставить после себя код, который не стыдно передать кому угодно — включая вас самих через три месяца, когда MVP заслужит свою вторую версию.",
          ],
          zh: ["好的 MVP 不是用完即弃的原型。对范围保持克制的全部意义，就在于您交付的这一小块是基础，而不是死胡同。这意味着在时间压力下做出的架构选择，到了下一个里程碑依然成立：边界清晰、使用真实数据，没有任何需要拆掉才能添加第二个功能的捷径。", "四周足以验证一个想法是否可行，也足以留下一份您愿意交给任何人的代码库——包括三个月后、MVP 赢得第二个版本时的您自己。"],
          tr: ["İyi bir MVP, at ve çıkar prototip değildir. Kapsam konusunda disiplinli olmanın tüm sebebi, teslim ettiğiniz dilimin çıkmaz sokak değil temel olmasıdır. Bu, zaman baskısı altında yapılan mimari seçimlerin bir sonraki kilometre taşında da anlamlı kalması demektir: net sınırlar, gerçek veri ve ikinci özelliği eklemek için söküp atmanız gereken kestirmeler yok.", "Dört hafta, bir fikrin ayakta durup durmadığını öğrenmeye yeter. Aynı zamanda, kendiniz dahil herkese rahatça devredebileceğiniz bir kod tabanı bırakmaya da yeter — üç ay sonra MVP ikinci sürümünü hak ettiğinde."],
          ar: ["الـ MVP الجيد ليس نموذجًا أوليًا للتخلّص منه. السبب الكامل للانضباط في النطاق هو أن تكون الشريحة التي تُطلقها أساسًا لا طريقًا مسدودًا. وهذا يعني أن القرارات المعمارية التي اتُّخذت تحت ضغط الوقت ينبغي أن تبقى منطقية في المرحلة التالية: حدود واضحة، وبيانات حقيقية، ولا اختصارات تضطر إلى اقتلاعها لإضافة الميزة الثانية.", "أربعة أسابيع كافية لمعرفة ما إذا كانت الفكرة قابلة للحياة. وكافية أيضًا لترك قاعدة شيفرة تطمئن إلى تسليمها لأي شخص — بمن فيهم أنت نفسك بعد ثلاثة أشهر، حين يكسب الـ MVP نسخته الثانية."],
        },
      },
    ],
  },
  {
    slug: "web2-and-web3-in-one-delivery-loop",
    title: {
      en: "Running Web2 and Web3 in one delivery loop",
      ru: "Web2 и Web3 в одном цикле поставки",
      zh: "在同一个交付闭环中运行 Web2 与 Web3",
      tr: "Web2 ve Web3'ü tek bir teslimat döngüsünde yürütmek",
      ar: "تشغيل Web2 وWeb3 في دورة تسليم واحدة",
    },
    excerpt: {
      en: "On-chain and off-chain are not two projects. When the same team runs product UX and smart contracts inside one milestone cadence, the seams between them stop being where things break.",
      ru: "On-chain и off-chain — это не два проекта. Когда одна команда ведёт продуктовый UX и смарт-контракты внутри одного ритма майлстоунов, стыки между ними перестают быть местом, где всё ломается.",
      zh: "链上与链下不是两个项目。当同一团队以同一套里程碑节奏同时负责产品 UX 与智能合约，两者之间的接缝就不再是出问题的地方。",
      tr: "Zincir üstü ve zincir dışı iki ayrı proje değildir. Aynı ekip ürün UX'ini ve akıllı kontratları tek bir kilometre taşı ritminde yürüttüğünde, aralarındaki dikişler işlerin bozulduğu yer olmaktan çıkar.",
      ar: "ما على السلسلة وما خارجها ليسا مشروعين. حين يدير الفريق نفسه تجربة المنتج والعقود الذكية ضمن إيقاع مراحل واحد، تتوقف نقاط الالتقاء بينهما عن كونها موضع الأعطال.",
    },
    date: "2026-04-14",
    tags: ["Web3", "Web2", "Architecture"],
    body: [
      {
        heading: {
          en: "The seam is where most Web3 products fail",
          ru: "Стык — вот где чаще всего ломаются Web3-продукты",
          zh: "接缝处是多数 Web3 产品失败的地方",
          tr: "Çoğu Web3 ürünü dikişte başarısız olur",
          ar: "نقطة الالتقاء هي حيث تفشل معظم منتجات Web3",
        },
        paragraphs: {
          en: [
            "A lot of Web3 work is split down the middle: one team writes the smart contracts, another builds the app and the backend, and they meet somewhere near the deadline. The trouble is that the hardest parts of a real product live exactly on the seam between them — wallet onboarding, signing flows, how the interface behaves while a transaction is pending, what the user sees when a chain is slow or a node disagrees.",
            "When those two halves are owned by different teams with different incentives, the seam is where assumptions quietly diverge. We run them as one delivery loop instead. The same milestone cadence covers the on-chain logic and the off-chain product, so the integration is never a surprise that gets discovered late.",
          ],
          ru: [
            "Много работы в Web3 разрезано посередине: одна команда пишет смарт-контракты, другая делает приложение и бэкенд, и встречаются они где-то у дедлайна. Проблема в том, что самые сложные части настоящего продукта живут именно на стыке между ними — онбординг кошелька, потоки подписи, поведение интерфейса, пока транзакция в ожидании, что видит пользователь, когда сеть медленная или нода не согласна.",
            "Когда этими двумя половинами владеют разные команды с разными интересами, стык становится местом, где предположения тихо расходятся. Мы ведём их как один цикл поставки. Один ритм майлстоунов покрывает и on-chain логику, и off-chain продукт, поэтому интеграция никогда не становится сюрпризом, который обнаруживают поздно.",
          ],
          zh: ["很多 Web3 工作被从中间劈开：一个团队写智能合约，另一个团队做应用和后端，到截止日期前才碰头。问题在于，真实产品最难的部分恰恰就在两者的接缝上——钱包引导、签名流程、交易待确认时界面的表现，以及链变慢或节点意见不一致时用户看到什么。", "当这两半由激励不同的团队分别负责，接缝处的假设就会悄悄出现分歧。我们则把它们作为同一个交付闭环来运行。同一套里程碑节奏同时覆盖链上逻辑与链下产品，集成就不会成为很晚才被发现的意外。"],
          tr: ["Web3 işlerinin büyük kısmı ortadan ikiye bölünür: bir ekip akıllı kontratları yazar, bir diğeri uygulamayı ve backend'i kurar ve ikisi son tarihe yakın bir yerde buluşur. Sorun şu ki gerçek bir ürünün en zor kısımları tam da bu iki yarının arasındaki dikişte yatar — cüzdan onboarding'i, imza akışları, bir işlem beklemedeyken arayüzün davranışı, zincir yavaşladığında veya bir node aynı fikirde olmadığında kullanıcının gördüğü şey.", "Bu iki yarı farklı teşviklere sahip farklı ekiplerin elindeyse, varsayımlar dikişte sessizce birbirinden ayrışır. Biz bunları bunun yerine tek bir teslimat döngüsü olarak yürütürüz. Aynı kilometre taşı ritmi hem zincir üstü mantığı hem de zincir dışı ürünü kapsar; böylece entegrasyon geç fark edilen bir sürpriz olmaz."],
          ar: ["كثير من أعمال Web3 تُشطر إلى نصفين: فريق يكتب العقود الذكية، وآخر يبني التطبيق والـ Backend، ويلتقيان قرب الموعد النهائي. المشكلة أن أصعب أجزاء المنتج الحقيقي تقع بالضبط عند نقطة الالتقاء — إعداد المحفظة، ومسارات التوقيع، وسلوك الواجهة أثناء انتظار المعاملة، وما يراه المستخدم حين تبطؤ السلسلة أو تختلف العقد.", "وحين يملك النصفين فريقان بحوافز مختلفة، تتباعد الافتراضات بصمت عند نقطة الالتقاء. نحن ندير النصفين كدورة تسليم واحدة. الإيقاع نفسه يغطي المنطق على السلسلة والمنتج خارجها، فلا يكون التكامل مفاجأة تُكتشف متأخرًا."],
        },
      },
      {
        heading: {
          en: "One team, two surfaces, the same standard of done",
          ru: "Одна команда, две поверхности, один стандарт готовности",
          zh: "一个团队，两个层面，同一套“完成”标准",
          tr: "Tek ekip, iki yüzey, aynı “bitti” standardı",
          ar: "فريق واحد، وواجهتان، ومعيار الإنجاز نفسه",
        },
        paragraphs: {
          en: [
            "Treating on-chain and off-chain as one system does not mean blurring them — it means holding both to the same definition of done. A smart contract is not finished because it compiles; a screen is not finished because it renders. Both are finished when they work together against a production-like environment and survive the same verification pass.",
            "In practice that looks like a stack where a typed SDK or API layer sits between the contracts and the product, so the app talks to a stable surface instead of reaching into chain details everywhere. The contracts can evolve, the UI can evolve, and the seam between them is a contract you can actually test.",
          ],
          ru: [
            "Относиться к on-chain и off-chain как к одной системе — не значит их смешивать. Это значит держать обе части под одним определением готовности. Смарт-контракт не готов, потому что компилируется; экран не готов, потому что отрисовался. Обе части готовы, когда работают вместе в окружении, близком к production, и проходят одну и ту же верификацию.",
            "На практике это выглядит как стек, где типизированный SDK или API-слой стоит между контрактами и продуктом, чтобы приложение общалось со стабильной поверхностью, а не лезло в детали блокчейна повсюду. Контракты могут развиваться, UI может развиваться, а стык между ними — это контракт, который реально можно тестировать.",
          ],
          zh: ["把链上与链下视为一个系统，并不意味着混为一谈——而是用同一个“完成”的定义来要求两者。智能合约编译通过不算完成；界面渲染出来也不算完成。只有当它们在类生产环境中协同工作、并通过同一轮验证，才算完成。", "实践中，这表现为在合约与产品之间设置一层类型化的 SDK 或 API，让应用面对稳定的接口，而不是到处直接触碰链上细节。合约可以演进，UI 也可以演进，而两者之间的接缝是一份真正可以测试的契约。"],
          tr: ["Zincir üstü ve zincir dışını tek bir sistem olarak ele almak, onları birbirine karıştırmak demek değildir — ikisini de aynı “bitti” tanımına tabi tutmak demektir. Bir akıllı kontrat derlendiği için bitmiş sayılmaz; bir ekran render olduğu için bitmiş sayılmaz. İkisi de production benzeri bir ortamda birlikte çalıştığında ve aynı doğrulama geçişinden sağ çıktığında biter.", "Pratikte bu, kontratlarla ürün arasında tipli bir SDK veya API katmanının durduğu bir yığın anlamına gelir; böylece uygulama her yerde zincir ayrıntılarına uzanmak yerine kararlı bir yüzeyle konuşur. Kontratlar evrilebilir, UI evrilebilir ve aralarındaki dikiş gerçekten test edebileceğiniz bir sözleşmedir."],
          ar: ["التعامل مع ما على السلسلة وخارجها كنظام واحد لا يعني خلط حدودهما، بل إخضاعهما لتعريف الإنجاز نفسه. العقد الذكي لا يكتمل لأنه يُترجَم بنجاح، والشاشة لا تكتمل لأنها تظهر. يكتمل كلاهما حين يعملان معًا في بيئة مشابهة للإنتاج ويجتازان فحص التحقق نفسه.", "عمليًا يبدو ذلك كحزمة تقنية تقع فيها طبقة SDK أو API مُنمَّطة بين العقود والمنتج، فيتعامل التطبيق مع واجهة مستقرة بدل الغوص في تفاصيل السلسلة في كل مكان. يمكن للعقود أن تتطور، وللواجهة أن تتطور، وتبقى نقطة الالتقاء بينهما عقدًا يمكنك اختباره فعلًا."],
        },
      },
      {
        heading: {
          en: "Verification has to cross the chain boundary",
          ru: "Верификация должна пересекать границу блокчейна",
          zh: "验证必须跨越链的边界",
          tr: "Doğrulama zincir sınırını aşmalıdır",
          ar: "يجب أن يعبر التحقق حدود السلسلة",
        },
        paragraphs: {
          en: [
            "Off-chain code gets a deploy and a fix loop that takes minutes. On-chain code does not — a mistake that ships can be permanent and public. That asymmetry is the reason a release gate for a Web3 product cannot stop at the app. The checks have to cover the boundary: that the contract behaves as specified, that the app handles the states a real chain produces, and that wallet compatibility holds across the clients people actually use.",
            "Running both sides in one loop is what makes that possible. The team that wrote the signing flow is the team that knows which failure states the contract can return, so the verification pass tests the system as users will meet it — not each half in isolation.",
          ],
          ru: [
            "Off-chain код получает деплой и цикл исправлений за минуты. On-chain код — нет: ошибка, которая уехала, может быть необратимой и публичной. Эта асимметрия — причина, по которой гейт релиза для Web3-продукта не может заканчиваться на приложении. Проверки должны покрывать границу: что контракт ведёт себя по спецификации, что приложение обрабатывает состояния, которые порождает реальная сеть, и что совместимость кошельков держится на тех клиентах, которыми реально пользуются.",
            "Именно ведение обеих сторон в одном цикле делает это возможным. Команда, написавшая поток подписи, — это та же команда, что знает, какие состояния ошибок может вернуть контракт, поэтому верификация тестирует систему так, как её встретят пользователи, а не каждую половину по отдельности.",
          ],
          zh: ["链下代码的部署和修复循环只需几分钟。链上代码则不然——一旦上线的错误可能是永久且公开的。这种不对称，正是 Web3 产品的发布关卡不能止步于应用层的原因。检查必须覆盖这条边界：合约的行为符合规范，应用能处理真实链会产生的各种状态，钱包兼容性在人们实际使用的客户端上都成立。", "在同一个闭环里运行两侧，才使这一切成为可能。写出签名流程的团队，也最清楚合约可能返回哪些失败状态，因此验证环节测试的是用户将遇到的完整系统，而不是各自孤立的两半。"],
          tr: ["Zincir dışı kodun dağıtım ve düzeltme döngüsü dakikalar sürer. Zincir üstü kodunki sürmez — yayına çıkan bir hata kalıcı ve herkese açık olabilir. Bu asimetri, bir Web3 ürünü için yayın kapısının uygulamada duramamasının nedenidir. Kontroller sınırı kapsamalıdır: kontratın belirtildiği gibi davrandığını, uygulamanın gerçek bir zincirin ürettiği durumları ele aldığını ve cüzdan uyumluluğunun insanların gerçekten kullandığı istemcilerde geçerli olduğunu.", "Her iki tarafı tek döngüde yürütmek bunu mümkün kılan şeydir. İmza akışını yazan ekip, kontratın hangi hata durumlarını döndürebileceğini bilen ekiptir; bu yüzden doğrulama geçişi sistemi kullanıcıların karşılaşacağı şekilde test eder — her yarıyı tek başına değil."],
          ar: ["الشيفرة خارج السلسلة تحظى بدورة نشر وإصلاح تستغرق دقائق. أما الشيفرة على السلسلة فلا — فالخطأ الذي يُطلق قد يكون دائمًا وعلنيًا. هذا التفاوت هو سبب ألا تتوقف بوابة الإصدار في منتج Web3 عند التطبيق. يجب أن تغطي الفحوصات الحدّ الفاصل: أن يتصرف العقد كما هو مواصفًا، وأن يتعامل التطبيق مع الحالات التي تنتجها سلسلة حقيقية، وأن يصمد توافق المحافظ عبر العملاء الذين يستخدمهم الناس فعلًا.", "تشغيل الجانبين في دورة واحدة هو ما يجعل ذلك ممكنًا. فالفريق الذي كتب مسار التوقيع هو الفريق الذي يعرف حالات الفشل التي قد يُرجعها العقد، فيختبر التحقق النظام كما سيلقاه المستخدمون — لا كل نصف على حدة."],
        },
      },
      {
        heading: {
          en: "The payoff is a product, not a pile of parts",
          ru: "Результат — продукт, а не куча деталей",
          zh: "回报是一个产品，而不是一堆零件",
          tr: "Kazanç, bir parça yığını değil, bir üründür",
          ar: "العائد منتج واحد وليس كومة قطع",
        },
        paragraphs: {
          en: [
            "When the same loop carries both surfaces, you stop shipping “a contract and an app that talk to each other” and start shipping one product. Onboarding feels like a normal sign-up even though a wallet is involved. A pending transaction has a designed state instead of a spinner that lies. The off-chain experience hides the parts of the chain that should be hidden and surfaces the parts that should be visible.",
            "Web3 does not have to feel like Web3 to the person using it. Running both halves in one delivery loop is the most reliable way we have found to make on-chain power feel like an ordinary, trustworthy product.",
          ],
          ru: [
            "Когда один цикл несёт обе поверхности, вы перестаёте выпускать «контракт и приложение, которые общаются друг с другом», и начинаете выпускать один продукт. Онбординг ощущается как обычная регистрация, хотя в нём участвует кошелёк. У транзакции в ожидании есть продуманное состояние, а не спиннер, который врёт. Off-chain опыт прячет те части блокчейна, которые должны быть скрыты, и показывает те, которые должны быть видны.",
            "Web3 не обязан ощущаться как Web3 для того, кто им пользуется. Ведение обеих половин в одном цикле поставки — самый надёжный найденный нами способ сделать так, чтобы сила on-chain ощущалась как обычный продукт, которому можно доверять.",
          ],
          zh: ["当同一个闭环承载两个层面，您交付的就不再是“互相对话的合约和应用”，而是一个完整的产品。尽管涉及钱包，引导流程依然像普通注册。待确认的交易有精心设计的状态，而不是一个说谎的加载转圈。链下体验隐藏该隐藏的链上细节，展示该展示的部分。", "对使用者来说，Web3 不必有 Web3 的样子。把两半放在同一个交付闭环里运行，是我们发现的、让链上能力呈现为一款普通且值得信赖的产品的最可靠方式。"],
          tr: ["Aynı döngü her iki yüzeyi de taşıdığında, “birbiriyle konuşan bir kontrat ve bir uygulama” teslim etmeyi bırakıp tek bir ürün teslim etmeye başlarsınız. Cüzdan işin içinde olsa da onboarding sıradan bir kayıt gibi hissettirir. Bekleyen bir işlemin, yalan söyleyen bir spinner yerine tasarlanmış bir durumu vardır. Zincir dışı deneyim zincirin gizlenmesi gereken kısımlarını gizler, görünür olması gerekenlerini öne çıkarır.", "Web3, onu kullanan kişiye Web3 gibi hissettirmek zorunda değildir. Her iki yarıyı tek bir teslimat döngüsünde yürütmek, zincir üstü gücü sıradan ve güvenilir bir ürün gibi hissettirmek için bulduğumuz en güvenilir yoldur."],
          ar: ["حين تحمل الدورة نفسها الواجهتين، تتوقف عن تسليم «عقد وتطبيق يتحدثان إلى بعضهما» وتبدأ بتسليم منتج واحد. يبدو التأهيل كتسجيل عادي رغم وجود محفظة. وللمعاملة المعلقة حالة مصمَّمة بدل مؤشر دوران يكذب. وتُخفي التجربة خارج السلسلة ما ينبغي إخفاؤه من السلسلة وتُظهر ما ينبغي ظهوره.", "لا يجب أن يبدو Web3 كـ Web3 لمن يستخدمه. وتشغيل النصفين في دورة تسليم واحدة هو أوثق طريقة وجدناها لجعل قوة السلسلة تبدو كمنتج عادي جدير بالثقة."],
        },
      },
    ],
  },
  {
    slug: "milestone-delivery-beats-fixed-bid-black-boxes",
    title: {
      en: "Why milestone delivery and repo access beat fixed-bid black boxes",
      ru: "Почему поставка по майлстоунам и доступ к репозиторию лучше fixed-bid чёрного ящика",
      zh: "为什么里程碑交付加仓库权限，胜过固定总价的黑箱",
      tr: "Neden kilometre taşı teslimatı ve depo erişimi sabit bedelli kara kutulardan üstündür",
      ar: "لماذا يتفوق التسليم بالمراحل والوصول إلى المستودع على العقود الثابتة ذات الصندوق الأسود",
    },
    excerpt: {
      en: "A fixed-bid contract feels safe and quietly transfers all the risk to you. Milestone-based delivery with repo access from day one is the opposite trade: you see the work as it happens and you own it at every step.",
      ru: "Контракт с фиксированной ценой кажется безопасным и тихо перекладывает весь риск на вас. Поставка по майлстоунам с доступом к репозиторию с первого дня — противоположная сделка: вы видите работу по мере её появления и владеете ею на каждом шаге.",
      zh: "固定总价合同看似安全，却悄悄把所有风险转嫁给您。里程碑交付加第一天起的仓库权限则是相反的交换：您能实时看到工作进展，并在每一步都拥有它。",
      tr: "Sabit bedelli sözleşme güvenli hissettirir ve tüm riski sessizce size aktarır. İlk günden depo erişimli, kilometre taşı bazlı teslimat bunun tam tersi bir takastır: işi olurken görürsünüz ve her adımda sahibi sizsiniz.",
      ar: "العقد بسعر ثابت يبدو آمنًا لكنه ينقل المخاطر كلها إليك بهدوء. أما التسليم القائم على المراحل مع الوصول إلى المستودع منذ اليوم الأول فهو الصفقة المعاكسة: ترى العمل أثناء حدوثه وتملكه في كل خطوة.",
    },
    date: "2026-03-31",
    tags: ["Delivery", "Ownership", "Process"],
    body: [
      {
        heading: {
          en: "A fixed bid prices the unknown by hiding it",
          ru: "Фиксированная цена закладывает неизвестность, пряча её",
          zh: "固定总价靠隐藏未知来定价",
          tr: "Sabit bedel, bilinmeyeni gizleyerek fiyatlar",
          ar: "السعر الثابت يسعّر المجهول بإخفائه",
        },
        paragraphs: {
          en: [
            "A single fixed price for a whole project looks like the safe option: you know the number up front. But software projects rarely know everything up front, so that number has to absorb every unknown that has not been discovered yet. The vendor either pads the bid to cover the risk, or protects the margin later by pushing back on anything that looks like scope. Both directions quietly work against you.",
            "The deeper problem is what the fixed bid does to visibility. Once the price is set, the incentive is to disappear and reappear at the deadline with a finished thing. You find out whether it matches what you needed at the worst possible moment to change course.",
          ],
          ru: [
            "Единая фиксированная цена за весь проект выглядит как безопасный вариант: вы знаете число заранее. Но проекты в разработке редко знают всё заранее, поэтому это число вынуждено впитать каждую ещё не обнаруженную неизвестность. Подрядчик либо закладывает запас, чтобы покрыть риск, либо потом защищает маржу, отбиваясь от всего, что похоже на расширение скоупа. Оба направления тихо работают против вас.",
            "Более глубокая проблема — в том, что фиксированная цена делает с прозрачностью. Как только цена зафиксирована, появляется стимул исчезнуть и вернуться к дедлайну с готовой вещью. Соответствует ли она тому, что вам было нужно, вы узнаёте в худший момент для смены курса.",
          ],
          zh: ["给整个项目一个固定价格，看起来是稳妥的选择：您一开始就知道数字。但软件项目很少能一开始就了解一切，所以这个数字必须吸收所有尚未发现的未知。供应商要么抬高报价来覆盖风险，要么事后靠拒绝一切看似范围外的需求来保护利润。两种方向都在悄悄对您不利。", "更深层的问题在于固定总价对可见性的影响。价格一旦敲定，激励就变成消失，然后在截止日期带着一个成品重新出现。您在最糟糕的时刻才发现它是否符合需求，那时已很难改变方向。"],
          tr: ["Tüm proje için tek bir sabit fiyat güvenli seçenek gibi görünür: rakamı baştan bilirsiniz. Ancak yazılım projeleri nadiren her şeyi baştan bilir; bu yüzden o rakam henüz keşfedilmemiş her bilinmeyeni emmek zorundadır. Satıcı ya riski karşılamak için teklifi şişirir ya da marjını sonradan kapsam gibi görünen her şeyi reddederek korur. İki yön de sessizce aleyhinize çalışır.", "Daha derin sorun, sabit bedelin görünürlüğe ne yaptığıdır. Fiyat belirlendikten sonra teşvik, ortadan kaybolup son tarihte bitmiş bir şeyle ortaya çıkmaktır. İhtiyacınızı karşılayıp karşılamadığını, rotayı değiştirmek için en kötü olası anda öğrenirsiniz."],
          ar: ["سعر ثابت واحد لمشروع كامل يبدو الخيار الآمن: تعرف الرقم مسبقًا. لكن مشاريع البرمجيات نادرًا ما تعرف كل شيء مسبقًا، فيضطر هذا الرقم إلى استيعاب كل مجهول لم يُكتشف بعد. إما أن يضخّم المورّد العرض لتغطية المخاطر، أو يحمي هامشه لاحقًا بالاعتراض على كل ما يشبه توسعًا في النطاق. وكلا الاتجاهين يعمل ضدك بصمت.", "والمشكلة الأعمق هي أثر السعر الثابت على الشفافية. فبمجرد تحديد السعر، يصبح الحافز هو الاختفاء ثم الظهور عند الموعد بشيء منجز. وتكتشف ما إذا كان يطابق حاجتك في أسوأ لحظة ممكنة لتغيير المسار."],
        },
      },
      {
        heading: {
          en: "Milestones price risk in small, visible increments",
          ru: "Майлстоуны закладывают риск маленькими видимыми шагами",
          zh: "里程碑以小而可见的增量为风险定价",
          tr: "Kilometre taşları riski küçük, görünür artışlarla fiyatlar",
          ar: "المراحل تسعّر المخاطر بزيادات صغيرة مرئية",
        },
        paragraphs: {
          en: [
            "Milestone-based delivery makes a different trade. Instead of one big bet, the project moves through defined steps, each with a deliverable you can see and approve before the next one starts. Risk is priced in small increments, and after every milestone you have a real decision: continue, adjust, or stop — having already received something concrete.",
            "This is the same discipline we use to keep projects predictable: scope is decided at the start of each step, and the end of the step is an artifact, not a status update. It is harder to hide a problem when every week ends with something you can actually look at.",
          ],
          ru: [
            "Поставка по майлстоунам делает другую сделку. Вместо одной большой ставки проект движется через определённые шаги, у каждого — результат, который вы можете увидеть и принять до начала следующего. Риск закладывается маленькими шагами, и после каждого майлстоуна у вас есть реальное решение: продолжать, корректировать или остановиться, уже получив на руки что-то конкретное.",
            "Это та же дисциплина, которой мы держим проекты предсказуемыми: скоуп определяется в начале каждого шага, а конец шага — это артефакт, а не апдейт статуса. Спрятать проблему труднее, когда каждая неделя заканчивается чем-то, на что реально можно посмотреть.",
          ],
          zh: ["里程碑交付做的是另一种交换。项目不是一次大赌注，而是经过一个个定义清晰的步骤，每一步都有可以查看、批准后才进入下一步的交付物。风险以小增量定价，每个里程碑之后，您都面临一次真正的决定：继续、调整还是停止——而且手里已经拿到了实实在在的东西。", "这正是我们保持项目可预期的同一套纪律：每一步开始时确定范围，每一步结束时产出的是成果物，而不是状态汇报。当每周结束时都有可以真正查看的东西，问题就更难被藏起来。"],
          tr: ["Kilometre taşı bazlı teslimat farklı bir takas yapar. Tek bir büyük bahis yerine proje, her biri bir sonrakine başlamadan önce görüp onaylayabileceğiniz teslimatı olan tanımlı adımlardan geçer. Risk küçük artışlarla fiyatlanır ve her kilometre taşından sonra gerçek bir kararınız olur: devam, ayarlama ya da durdurma — üstelik somut bir şey almış olarak.", "Projeleri öngörülebilir tutmak için kullandığımız disiplin de budur: kapsam her adımın başında belirlenir ve adımın sonu bir durum güncellemesi değil, bir çıktıdır. Her hafta gerçekten bakabileceğiniz bir şeyle bittiğinde bir sorunu saklamak daha zordur."],
          ar: ["التسليم القائم على المراحل يعقد صفقة مختلفة. فبدل رهان كبير واحد، يمضي المشروع عبر خطوات محددة، لكل منها مخرج يمكنك رؤيته واعتماده قبل بدء التالية. تُسعَّر المخاطر بزيادات صغيرة، وبعد كل مرحلة يكون أمامك قرار حقيقي: المتابعة أو التعديل أو التوقف — وقد تسلّمت شيئًا ملموسًا بالفعل.", "هذا هو الانضباط نفسه الذي نستخدمه لإبقاء المشاريع قابلة للتنبؤ: يُحدَّد النطاق في بداية كل خطوة، وتنتهي الخطوة بمخرج لا بتحديث حالة. ومن الأصعب إخفاء مشكلة حين ينتهي كل أسبوع بشيء يمكنك النظر إليه فعلًا."],
        },
      },
      {
        heading: {
          en: "Repo access from day one is what makes it real",
          ru: "Доступ к репозиторию с первого дня — вот что делает это настоящим",
          zh: "第一天起的仓库权限，让一切变得真实",
          tr: "İlk günden depo erişimi işi gerçek kılar",
          ar: "الوصول إلى المستودع منذ اليوم الأول هو ما يجعل الأمر حقيقيًا",
        },
        paragraphs: {
          en: [
            "Milestones only deliver on their promise if you can actually see the work, so we give repository access from day one. Not a demo build at the end, not a zip file on handover — the real repository, from the first commit. You can watch the history accumulate, ask your own engineers to look, and know at any moment that the thing being built exists and is yours.",
            "This also kills the worst failure mode of outsourced software: the handover where the code finally arrives and turns out to be undocumented, untested, or impossible to run. When you have had access throughout, there is no dramatic handover — ownership was never on the other side of a wall.",
          ],
          ru: [
            "Майлстоуны выполняют своё обещание, только если вы реально видите работу, поэтому мы даём доступ к репозиторию с первого дня. Не демо-сборку в конце, не zip-архив при передаче — настоящий репозиторий, с первого коммита. Вы видите, как накапливается история, можете попросить своих инженеров посмотреть и в любой момент знаете, что то, что строится, существует и принадлежит вам.",
            "Это убивает и худший сценарий провала в аутсорсе: передачу, когда код наконец приезжает и оказывается недокументированным, непротестированным или незапускаемым. Когда у вас был доступ всё время, никакой драматичной передачи нет — владение никогда не находилось по ту сторону стены.",
          ],
          zh: ["只有您真正看得到工作，里程碑才能兑现承诺，所以我们从第一天起就提供代码仓库权限。不是最后才给的演示版本，也不是移交时的一个压缩包——而是真实的仓库，从第一次提交开始。您可以看着提交历史不断累积，请自己的工程师来审阅，并随时确信正在构建的东西真实存在且属于您。", "这也消除了外包软件最糟糕的失败模式：移交时代码终于到手，却发现没有文档、没有测试，或根本无法运行。当您全程拥有访问权限，就不会有戏剧性的移交——所有权从来不在一堵墙的另一边。"],
          tr: ["Kilometre taşları ancak işi gerçekten görebiliyorsanız vaadini yerine getirir; bu yüzden ilk günden depo erişimi veririz. Sonda bir demo derlemesi değil, teslimde bir zip dosyası değil — ilk commit'ten itibaren gerçek depo. Geçmişin birikmesini izleyebilir, kendi mühendislerinizden bakmalarını isteyebilir ve inşa edilen şeyin var olduğunu ve sizin olduğunu her an bilebilirsiniz.", "Bu aynı zamanda dış kaynaklı yazılımın en kötü hata modunu da ortadan kaldırır: kodun sonunda geldiği, ancak dokümansız, testsiz ya da çalıştırılması imkânsız çıktığı teslim anı. Baştan sona erişiminiz olduğunda dramatik bir teslim olmaz — mülkiyet hiçbir zaman bir duvarın öbür tarafında değildi."],
          ar: ["لا تفي المراحل بوعدها إلا إن استطعت رؤية العمل فعلًا، ولذلك نمنح الوصول إلى المستودع منذ اليوم الأول. ليس نسخة تجريبية في النهاية، ولا ملف zip عند التسليم — بل المستودع الحقيقي منذ أول commit. يمكنك مشاهدة السجل يتراكم، وأن تطلب من مهندسيك الاطلاع عليه، وأن تعلم في أي لحظة أن ما يُبنى موجود وأنه ملكك.", "وهذا يقضي أيضًا على أسوأ أنماط فشل البرمجيات المُسندة للخارج: تسليم تصل فيه الشيفرة أخيرًا فتتبين غير موثقة أو غير مختبرة أو يستحيل تشغيلها. وحين يكون وصولك متاحًا طوال الوقت، لا يوجد تسليم درامي — فالملكية لم تكن يومًا خلف جدار."],
        },
      },
      {
        heading: {
          en: "Ownership is a property of how you work, not a clause",
          ru: "Владение — это свойство того, как вы работаете, а не пункт договора",
          zh: "所有权取决于你如何工作，而不是一纸条款",
          tr: "Mülkiyet bir maddeyi değil, çalışma biçimini ifade eder",
          ar: "الملكية صفة في طريقة العمل وليست بندًا",
        },
        paragraphs: {
          en: [
            "Plenty of contracts say you own the code. That sentence is worth very little if the code shows up only at the end, in a state you cannot independently verify. Real ownership is the ability to take the project somewhere else and keep going — and that ability is built up step by step, through visible milestones and a repository you have held the whole time.",
            "Fixed-bid black boxes ask you to trade visibility for the comfort of a single number. Milestone delivery with day-one repo access offers the opposite: you give up the illusion that everything is knowable in advance, and in return you get a project you can see, steer, and own at every step. That is the trade we think is actually safe.",
          ],
          ru: [
            "Множество договоров говорят, что код принадлежит вам. Эта фраза стоит немного, если код появляется только в конце, в состоянии, которое вы не можете независимо проверить. Настоящее владение — это возможность забрать проект в другое место и продолжить, а эта возможность набирается шаг за шагом: через видимые майлстоуны и репозиторий, который был у вас всё время.",
            "Fixed-bid чёрные ящики предлагают обменять прозрачность на комфорт единственного числа. Поставка по майлстоунам с доступом к репозиторию с первого дня предлагает обратное: вы отказываетесь от иллюзии, что всё можно знать заранее, а взамен получаете проект, который видите, которым управляете и владеете на каждом шаге. Именно эту сделку мы считаем по-настоящему безопасной.",
          ],
          zh: ["很多合同都写着代码归您所有。但如果代码只在最后才出现，且处于您无法独立验证的状态，这句话就没多大价值。真正的所有权，是能把项目带到别处继续推进——而这种能力是一步一步建立起来的，靠的是可见的里程碑，和您始终持有的代码仓库。", "固定总价的黑箱要求您用可见性来换取单一数字带来的安心。带第一天起仓库权限的里程碑交付则相反：您放弃“一切都能提前预知”的幻觉，换来一个每一步都看得见、掌得了舵、拥有得了的项目。我们认为这才是真正安全的交换。"],
          tr: ["Birçok sözleşme kodun sizin olduğunu söyler. Kod yalnızca sonda, bağımsız olarak doğrulayamayacağınız bir halde gelirse bu cümlenin değeri çok azdır. Gerçek mülkiyet, projeyi başka bir yere götürüp devam edebilme yeteneğidir ve bu yetenek adım adım, görünür kilometre taşları ve baştan beri elinizde tuttuğunuz bir depo aracılığıyla oluşur.", "Sabit bedelli kara kutular, görünürlüğü tek bir rakamın rahatlığıyla takas etmenizi ister. Kilometre taşı teslimatı ve ilk gün depo erişimi ise tersini sunar: her şeyin önceden bilinebileceği yanılsamasından vazgeçersiniz ve karşılığında görebileceğiniz, yönlendirebileceğiniz ve her adımda sahip olabileceğiniz bir proje elde edersiniz. Bizce gerçekten güvenli olan takas budur."],
          ar: ["كثير من العقود تنص على أنك تملك الشيفرة. لكن هذه الجملة قليلة القيمة إن وصلت الشيفرة في النهاية فقط، بحالة لا تستطيع التحقق منها بشكل مستقل. الملكية الحقيقية هي القدرة على نقل المشروع إلى مكان آخر ومواصلة العمل — وهذه القدرة تُبنى خطوة بخطوة، عبر مراحل مرئية ومستودع في حوزتك طوال الوقت.", "العقود الثابتة ذات الصندوق الأسود تطلب منك مقايضة الشفافية براحة الرقم الواحد. أما التسليم بالمراحل مع الوصول إلى المستودع منذ اليوم الأول فيقدّم العكس: تتخلى عن وهم أن كل شيء معلوم مسبقًا، وتحصل في المقابل على مشروع تراه وتوجّهه وتملكه في كل خطوة. هذه هي الصفقة التي نراها آمنة حقًا."],
        },
      },
    ],
  },
];

// Newest first — the index and metadata rely on this ordering.
export const blogPosts: BlogPost[] = [..._posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
