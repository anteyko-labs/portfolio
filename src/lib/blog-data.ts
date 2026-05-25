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
    },
    excerpt: {
      en: "A four-week MVP is a scoping discipline, not a heroics sprint. Here is how a fixed delivery loop, weekly milestones, and a release gate let you move fast and still ship something you can build on.",
      ru: "MVP за четыре недели — это дисциплина скоупа, а не геройский спринт. Рассказываем, как фиксированный цикл поставки, недельные майлстоуны и гейт релиза позволяют двигаться быстро и при этом выпускать продукт, на котором можно строить дальше.",
    },
    date: "2026-04-28",
    tags: ["MVP", "Delivery", "Product"],
    body: [
      {
        heading: {
          en: "Four weeks is a constraint, not a promise of less",
          ru: "Четыре недели — это ограничение, а не обещание сделать меньше",
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
        },
      },
      {
        heading: {
          en: "Weekly milestones turn a month into four checkpoints",
          ru: "Недельные майлстоуны превращают месяц в четыре контрольные точки",
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
        },
      },
      {
        heading: {
          en: "Speed without a release gate is just debt with a deadline",
          ru: "Скорость без гейта релиза — это просто долг со сроком",
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
        },
      },
      {
        heading: {
          en: "Build the MVP so the next version is cheap",
          ru: "Делайте MVP так, чтобы следующая версия была дешёвой",
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
        },
      },
    ],
  },
  {
    slug: "web2-and-web3-in-one-delivery-loop",
    title: {
      en: "Running Web2 and Web3 in one delivery loop",
      ru: "Web2 и Web3 в одном цикле поставки",
    },
    excerpt: {
      en: "On-chain and off-chain are not two projects. When the same team runs product UX and smart contracts inside one milestone cadence, the seams between them stop being where things break.",
      ru: "On-chain и off-chain — это не два проекта. Когда одна команда ведёт продуктовый UX и смарт-контракты внутри одного ритма майлстоунов, стыки между ними перестают быть местом, где всё ломается.",
    },
    date: "2026-04-14",
    tags: ["Web3", "Web2", "Architecture"],
    body: [
      {
        heading: {
          en: "The seam is where most Web3 products fail",
          ru: "Стык — вот где чаще всего ломаются Web3-продукты",
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
        },
      },
      {
        heading: {
          en: "One team, two surfaces, the same standard of done",
          ru: "Одна команда, две поверхности, один стандарт готовности",
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
        },
      },
      {
        heading: {
          en: "Verification has to cross the chain boundary",
          ru: "Верификация должна пересекать границу блокчейна",
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
        },
      },
      {
        heading: {
          en: "The payoff is a product, not a pile of parts",
          ru: "Результат — продукт, а не куча деталей",
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
        },
      },
    ],
  },
  {
    slug: "milestone-delivery-beats-fixed-bid-black-boxes",
    title: {
      en: "Why milestone delivery and repo access beat fixed-bid black boxes",
      ru: "Почему поставка по майлстоунам и доступ к репозиторию лучше fixed-bid чёрного ящика",
    },
    excerpt: {
      en: "A fixed-bid contract feels safe and quietly transfers all the risk to you. Milestone-based delivery with repo access from day one is the opposite trade: you see the work as it happens and you own it at every step.",
      ru: "Контракт с фиксированной ценой кажется безопасным и тихо перекладывает весь риск на вас. Поставка по майлстоунам с доступом к репозиторию с первого дня — противоположная сделка: вы видите работу по мере её появления и владеете ею на каждом шаге.",
    },
    date: "2026-03-31",
    tags: ["Delivery", "Ownership", "Process"],
    body: [
      {
        heading: {
          en: "A fixed bid prices the unknown by hiding it",
          ru: "Фиксированная цена закладывает неизвестность, пряча её",
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
        },
      },
      {
        heading: {
          en: "Milestones price risk in small, visible increments",
          ru: "Майлстоуны закладывают риск маленькими видимыми шагами",
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
        },
      },
      {
        heading: {
          en: "Repo access from day one is what makes it real",
          ru: "Доступ к репозиторию с первого дня — вот что делает это настоящим",
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
        },
      },
      {
        heading: {
          en: "Ownership is a property of how you work, not a clause",
          ru: "Владение — это свойство того, как вы работаете, а не пункт договора",
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
