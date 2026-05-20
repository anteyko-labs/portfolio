# anteyko.com — Audit findings & implementation plan

Source: full audit на 2026-05-20 перед запуском трафика. Цель — максимизировать
доверие и конверсию холодного трафика.

---

## Audit #1 — Home, KP, contact, technical (DONE)

### What's already good
- **Performance**: TTFB 86ms, FCP 732ms, CLS = 0 — A+
- **Структура главной**: 10 секций с понятным flow
- **SEO basics**: sitemap, robots.txt, 40+ кейсов индексируются
- **КП**: реквизиты, инвойс, трекинг, FAQ, гарантия — сильнее 95% студий СНГ
- **Контакт-форма**: honeypot + Telegram backend (нет 500-х на serverless)
- **Бренд**: custom cursor, marquee, logo fusion — современный стиль

### 🚨 CRITICAL (фиксить ДО трафика)

| # | Issue | Impact | Fix |
|---|---|---|---|
| 1 | **Hydration error #418 на /kp** — `new Date()` в `kp-content.tsx` даёт mismatch SSR/client | Console error видна всем, потенциальное «дергание» при гидрации | Вынести `today` / `validUntilFormatted` в `useState + useEffect` или `suppressHydrationWarning` |
| 2 | **H1 на главной слипся в HTML** — `<span>Разработка</span><span>под</span>...` без пробелов между span'ами | Google индексирует «Разработкаподключ» одним словом — потеря в SEO ranking | Добавить `{' '}` между span'ами в JSX, или использовать `word-spacing` вместо `margin-right` |
| 3 | **«для Екатерина»** в pre-filled сообщениях Telegram (родительный падеж сломан) | Непрофессионально для русскоязычного клиента | Заменить «для X» на нейтральное «(клиент: X)» — работает с любым именем |
| 4 | **Mobile horizontal scroll ~14px** (390px viewport, document 404px) | Видна полоса прокрутки вправо на iPhone | Найти overflowing element, добавить `overflow-x: hidden` на body |
| 5 | **TrustedBy без логотипов** — только текстовые категории «Web3 / DeFi · Fintech · SaaS» | Слабый trust signal, выглядит как филлер | Добавить 4–6 реальных лого (или силуэты по NDA с подписью), либо заменить на 3 отзыва |
| 21 | **Privacy Policy сломается при включении аналитики** — сейчас написано «We do not use cookies for tracking», но мы планируем GA4/Yandex/Sentry | GDPR + 152-ФЗ нарушение в момент включения GTM | Переписать `src/app/privacy/page.tsx` полностью ДО включения трекеров |
| 22 | **history.replaceState на ВСЕХ страницах** — URL мутирует на `/cases/<random>` через ~100ms | Атрибуция GA/Ads сломана + canonical SEO + share-links | Ограничить mutation роутом `/cases/*` или использовать prefetch без replaceState |
| 23 | **`/cases` редиректит на случайный кейс** — нет index-страницы | SEO loss, плохой UX через nav-меню | Сделать `/cases` real grid page со всеми кейсами |
| 24 | **JS bundle 1.2 MB decoded на всех страницах** — route-splitting не работает | Low TBT/INP, Lighthouse Performance < 90 | Dynamic import тяжёлых компонент (motion, three, carousel) с `next/dynamic` |
| 25 | **SPA-редирект на части кейсов** — `/cases/trm-oferta-registration` → `/services`, `/cases/kut-wallet-crypto` → `/contact`, `/cases/local-food-delivery-platform` → `/kp/YG7cUuFU03iF` | Paid traffic на эти кейсы уходит сразу | Тот же fix что #22 — ограничить `history.replaceState` или убрать race condition в роутере |
| 26 | **Нет bottom-CTA на 15 кейсах** — клиент уходит без contextual next step | Потеря лидов после прочтения 2000+ слов | Один универсальный `<CaseFooterCTA>` блок «Похожий проект? Звонок на 20 мин →» |
| 27 | **5 кейсов слишком тонкие** — geo-heatmap (488), analytics-pro (584), ai-accounting (593), wallet-rpc-evm (667), startup-under-key (771) | Невозможно закрыть лида тонкой страницей | Расширить до 1200+ слов + 5+ метрик + 4+ скриншота |
| 28 | **0–1 метрика на 3 кейсах** — multi-location-restaurant (0), trm-oferta (1), utility-token-uae (1) | Case study без чисел = press release | Backfill «3 metrics minimum» правило |
| 29 | **6/15 кейсов без года** — multi-location, trm-oferta, local-food, analytics-pro, web3-l1 имеют артефакты парсинга | Кейс выглядит «не пойми когда» — клиент думает «давно/не свежее» | Stamp каждый кейс реальным годом проекта |
| 30 | **Enterprise-modules: NEXT.JS + Next.js дублируется в CAPS** | Выглядит как баг даты-источника | Нормализовать tech stack labels в `cases-data.ts` |

### ⚠️ HIGH (сильно влияет на конверсию)

| # | Issue | Fix |
|---|---|---|
| 6 | Нет отзывов клиентов нигде (TESTIMONIALS пустой) | Заполнить 3–5 реальных отзыва в `src/lib/kp-data.ts` + добавить на главную |
| 7 | На КП 0 изображений (только текст) | 1–2 скриншота из похожих кейсов или мокап Telegram-бота сверху |
| 8 | Final CTA дублирует hero — «Получить оценку за 24 часа» в обоих местах | Переписать footer CTA с другим angle: «Бесплатная 30-мин консультация» или «Скачать playbook» |
| 9 | Кейсы со слипшимися метаданными — «Web32025», «Продукт2026» | Та же fix как для H1 — пробелы между категорией и годом |
| 10 | Email/телефон спрятаны в КП (только Telegram заметный CTA) | Альтернативный CTA «Написать на email» рядом с «Обсудить проект» |

### 📋 MEDIUM

| # | Issue | Fix |
|---|---|---|
| 11 | Цветовой контраст `#888` на белом — 3.5:1, ниже WCAG AA 4.5:1 | Поднять до `#666` или `#555` для featureSub/planTime/timeline subtitle |
| 12 | Recommended-пакет не выделен на мобильной (3 одинаковые карточки в столбик) | На мобильной добавить scale/shadow для featured плана |
| 13 | USD-цены без указания курса конвертации | Подпись «(по курсу 86 сом/$, на дату КП)» рядом с ценами |
| 14 | Skip-link `188×40px`, чуть меньше 44px touch target | Поднять height до 44px |
| 15 | Hero eyebrow «24ч ответ по оценке» дублирует CTA «Получить оценку за 24 часа» | Убрать один |

### 🎨 LOW (cosmetics)

| # | Issue | Fix |
|---|---|---|
| 16 | ID документа `KP-2026-LRLXXL-INV-BUSINESS` длинноват | Укоротить до `KP-2026-LRL/B` или подобного |
| 17 | PDF-печать FAQ — `+` иконки могут оставаться в принт-режиме | Убедиться что `noPrint` применяется к ::after `+` |
| 18 | У `/kp` нет Schema.org (для главной есть Organization) | Не критично для noindex, но добавить `Service`/`Offer` JSON-LD |
| 19 | Final CTA H2 слишком длинный («Нам не нужны брифы. Нам нужны задачи...») | Сделать H3 или укоротить — это не главный заголовок секции |
| 20 | Contact-форма после рефакторинга может потерять поля projectType/budget/timeline | Проверить что Telegram-уведомления приходят с полным контекстом, добавить недостающие поля |

---

## Audit #2 — Pending

### Cases audit (15 pages) — DONE

#### Pattern-level findings (системные проблемы)

1. **Нет CTA в конце кейсов** — после 2000+ слов клиент уходит без contextual next step. Нет «Обсудить похожий проект» или «Звонок на 20 мин».
2. **Templated structure но неравномерное наполнение** — у 11/15 кейсов скелет одинаковый, но H2 «Задача», «Решение», «Результаты» возвращают пустоту в `innerText` — content есть в DOM, но heading↔paragraph linkage сломан. Цифр результатов варьируется от **0** до 16.
3. **🚨 SPA redirect bug** — на первом hit для `/cases/trm-oferta-registration` редирект на `/services`, для `/cases/kut-wallet-crypto` — на `/contact`, для `/cases/local-food-delivery-platform` — на **`/kp/YG7cUuFU03iF`**! Paid traffic на эти кейсы будет уходить, не дочитав. Связано с `history.replaceState` багом из Lighthouse-аудита.

#### Per-case findings

| # | Slug | Words | Numbers | Imgs | Year | Top issue |
|---|---|---|---|---|---|---|
| 1 | web3-l1-dex | 1196 | 6 | 24 | 2025 | Пустой Задача/Решение в innerText; слипшиеся Web3 термины |
| 2 | trm-oferta-registration | 975 | **1** | 11 | none | **Только 1 метрика**; fragile route (redirected на первый load) |
| 3 | utility-token-uae | 1106 | **1** | 16 | 2025 | Только 1 метрика; слипшиеся `mReward`, `mBenefit` |
| 4 | multi-location-restaurant-management | 1221 | **0** | 16 | none | **0 метрик** — это не case study, это press release |
| 5 | asset-tokenization-platform | 2528 | 5 | **26** | 2024 | Сильнейший кейс. Слабость: нет bottom CTA |
| 6 | kut-wallet-crypto | 2566 | 10 | **29** | 2023 | Сильный. Но unstable URL (редирект на первый hit) |
| 7 | enterprise-modules (M7-Finance) | 1646 | 5 | 14 | 2024 | **Tech stack дублируется в CAPS** (NEXT.JS + Next.js); no NDA note |
| 8 | local-food-delivery-platform | 2379 | 5 | **42** | none | Сильный визуал; год "2012" артефакт парсинга, реальный год отсутствует |
| 9 | anti-refund-payment | 813 | 15 | 8 | 2025 | Тонкий контент, но 15 метрик; нет NDA note для sensitive vertical |
| 10 | wallet-rpc-evm-compatibility | **667** | 1 | **2** | 2025 | **Самый тонкий + минимум визуала** — Web3-покупатель самый дорогой посетитель, его не закрыть |
| 11 | tripwise-travel-platform | 1704 | 16 | 10 | 2022 | Цифры ломаются "8\n\nСек" — broken visual rendering |
| 12 | geo-heatmap-backend | **488** | 7 | **2** | 2024 | **Самая короткая страница**, 2 картинки на backend-infra кейс |
| 13 | startup-under-key-mvp-launch-support | 771 | 5 | 2 | 2025 | Тонкий, almost no visual proof |
| 14 | ai-accounting-system | 593 | 8 | 2 | 2022 | Тонкий для Fortune-500 claim; нужен NDA wording; 2 imgs |
| 15 | analytics-pro-enterprise-bi | 584 | 5 | 2 | none | Тонкий в BI category; нет года; numbers repeat |

#### Top 5 cases для приоритетной доработки

1. **`geo-heatmap-backend`** (488 слов, 2 imgs) — расширить до 1200-1500 слов + добавить architecture diagram
2. **`analytics-pro-enterprise-bi`** (584 слова) — Enterprise BI 584 слова подрывает positioning. Год, скриншоты дашбордов, 3-5 quantified outcomes
3. **`multi-location-restaurant-management`** (1221 слов, **0 метрик**) — case study без чисел = press release
4. **`ai-accounting-system`** (593 слова) — claim "Fortune 500" deserves 1500+ слов + NDA-anonymized client story
5. **`wallet-rpc-evm-compatibility`** (667 слов, 2 imgs) — Web3 buyer = highest-value visitor

#### 🚨 NEW CRITICAL #25: SPA redirect bug на части кейсов
**Импакт**: paid traffic на эти кейсы редиректится через ~100ms, клиент думает «сайт сломан», уходит.
- `/cases/trm-oferta-registration` → `/services`
- `/cases/kut-wallet-crypto` → `/contact`
- `/cases/local-food-delivery-platform` → `/kp/YG7cUuFU03iF` (!)

Скорее всего тот же `history.replaceState` баг что в основном Lighthouse-аудите (#22).

#### Рекомендации к реализации

1. **Универсальный bottom-CTA блок** на всех 15 кейсах — «Похожий проект? Звонок на 20 мин →» (один компонент, шипнуть один раз)
2. **Fix слипшихся слов в spans** — homepage H1 + Web3 case terms (`aMask`, `bSocket`, `nZeppelin`, `tConnect`, `mReward`). Per-character анимация должна emit'ить `&nbsp;` или использовать `word-spacing` чтобы `innerText` сохранял пробелы
3. **Investigate SPA redirect bug** на `/cases/*` — race condition в client-side роутере
4. **Mandate "3 metrics minimum"** для каждого кейса; backfill `multi-location-restaurant-management` (0 метрик!), `trm-oferta-registration` (1 метрика)
5. **Год + NDA note** на каждом кейсе — 6 из 15 без года, Fortune-500/M7-Finance/AnalyticsPro нуждаются в «Client anonymized under NDA»

### A/B hero value-prop variants — DONE

Подготовлены 3 варианта под разные психологические триггеры.

#### Вариант A — Pain-driven
- **Eyebrow:** Без слитых дедлайнов и переписывания с нуля
- **H1:** Подберём команду, которая доведёт проект до прода — а не бросит на 60%.
- **Subtitle:** Если предыдущие подрядчики срывали сроки, поднимали бюджет в 2 раза или сдавали код, который страшно открыть — забираем проект и закрываем по этапам.
- **CTA 1:** Разобрать мой проект
- **CTA 2:** Посмотреть кейсы
- **Trust line:** 40+ запущенных продуктов. Фиксируем сроки в договоре. Доступ к репозиторию с первого дня. NDA по запросу.
- **Лучше для:** ремаркетинга, email-сиквенсов, ниши «спасения проектов после неудач»

#### Вариант B — Outcome-driven
- **Eyebrow:** От идеи до прода за 4–8 недель
- **H1:** MVP за 4 недели. Оплата по спринтам. Полная передача ключей.
- **Subtitle:** Дизайн, фронт, бэк, инфраструктура и запуск — в одном спринт-цикле. Фиксируем объём перед стартом, выкатываем рабочую версию каждые 2 недели.
- **CTA 1:** Рассчитать бюджет
- **CTA 2:** Этапы работы
- **Trust line:** Web2 и Web3 под одной командой. Stripe, PostgreSQL, Next.js, Solidity. Передаём репозиторий, доступы и документацию на финале.
- **Лучше для:** аудитории с финансированием, B2B-сегмента, старших клиентов

#### Вариант C — Proof/Speed-driven ⭐ РЕКОМЕНДУЕТСЯ ЗАПУСКАТЬ ПЕРВЫМ
- **Eyebrow:** 40+ продуктов в проде · Бишкек + Дубай
- **H1:** Студия, которая запустила 40+ продуктов — от MVP до Web3-платформ.
- **Subtitle:** 5 лет, две базы, один цикл поставки. Дадим оценку проекта и техническое видение за 24 часа после брифа.
- **CTA 1:** Получить оценку за 24ч
- **CTA 2:** Кейсы и стек
- **Trust line:** Работаем с фаундерами в СНГ и ОАЭ. TypeScript, Node.js, EVM. Этапная оплата. NDA по запросу.
- **Лучше для:** холодного трафика с Google Search, Instagram, Telegram (т.е. для **запуска**)

#### План A/B-теста
- **Неделя 1–2:** Вариант C против текущего hero (baseline)
- **Неделя 3–4:** Победитель против Варианта B (Outcome)
- **Неделя 5–6:** Победитель против Варианта A (Pain) — для ремаркетинга
- **Метрика оценки:** CTR на primary CTA + конверсия в заполненный бриф
- **Не смотреть на:** bounce rate (всегда высокий у студий разработки)

### Lighthouse all pages — DONE

#### Метрики по страницам (cold-load на быстром канале)

| Page | TTFB | FCP | DCL | Load | CLS | JS decoded | Errors |
|---|---|---|---|---|---|---|---|
| `/` (home) | 136ms | 500ms | 450ms | 575ms | 0.0016 | 2.05 MB | 0 |
| `/services` | 91ms | 556ms | 529ms | 621ms | 0.0016 | 1.17 MB | 0 |
| `/cases` | 87ms | 592ms | 546ms | **1483ms** | 0.0016 | 1.22 MB | 0 |
| `/cases/trm-oferta-registration` | 86ms | 512ms | 473ms | 1598ms | 0.0016 | 1.22 MB | 0 |
| `/contact` | 88ms | 160ms | 113ms | 259ms | 0.0016 | 1.07 MB | 0 |
| `/faq` | 93ms | 556ms | 500ms | 1458ms | — | 1.22 MB | 0 |
| `/kp/YG7cUuFU03iF` | 89ms | 160ms | 116ms | 227ms | — | 1.22 MB | **1** (React #418) |

#### 🚨 NEW CRITICAL #22: `history.replaceState` переписывает URL на любой странице
**Описание**: На `/contact`, `/faq`, `/services`, `/kp/*` через ~100ms после загрузки `location.pathname` мутирует на `/cases/<random-slug>` (наблюдались `kut-wallet-crypto`, `enterprise-modules`, `local-food-delivery-platform`, `asset-tokenization-platform`, `multi-location-restaurant-management`, `utility-token-uae`).

**Что ломается**:
- ❌ GA/Yandex `page_view` приходит с чужим URL — **конверсии не атрибутируются**
- ❌ Back/forward navigation
- ❌ Share-link (клиент копирует ссылку с чужим slug)
- ❌ Canonical SEO — Google индексирует мутировавший URL
- ❌ Direct links на `/kp/*` после открытия становятся непредсказуемыми

**Скорее всего**: глобальный `CasesCarousel`-компонент делает `history.replaceState` для preloaded slug-ов (preload-стратегия для быстрого открытия следующего кейса). Это работает только если он рендерится только на `/cases/*`.

**Fix**: ограничить `history.replaceState` только страницами `/cases/*`, либо использовать prefetch без изменения URL.

**Приоритет**: P0 — БЛОКЕР запуска трафика. Без фикса любая платная реклама будет работать вхолостую.

#### 🚨 NEW CRITICAL #23: `/cases` редиректит на `/cases/[random-slug]`
Нет реальной index-страницы со списком кейсов. **SEO loss** — Google не может проиндексировать витрину кейсов как отдельную страницу. Также — пользователь который ткнул «Кейсы» в меню оказывается в случайном кейсе вместо листинга.

**Fix**: сделать `/cases` server-rendered grid страницу со всеми 15+ кейсами и фильтрами.

#### 🚨 NEW CRITICAL #24: JS bundle 1.2 MB decoded на всех страницах
Route-based splitting **не работает** — одни и те же ~1.07–1.22 MB грузятся даже на легкой `/contact`. На главной 2 MB из-за анимаций. Это бьёт TBT/INP и Lighthouse Performance score.

**Цель**: ≤ 350 KB gzip first-load.
**Fix**: dynamic import тяжёлых компонент (CasesCarousel, motion-эффекты, three.js, custom-cursor) с `next/dynamic` + `ssr: false` для clientside-only.

#### Дополнительные находки
- **42 `<img>` на /kp без preload для hero** — hero пустой 1-2 сек до hydration
- **6-7 woff2 шрифтов без preload** — забирает ~150ms FCP
- **Контраст**: параграфы на главной используют `lab(.../0.7)` — полупрозрачные на тёмном фоне, часто <4.5:1
- **Timing-Allow-Origin** не выставлен на CDN — мешает RUM (real user monitoring)

#### Что мешает достичь Lighthouse 90+
- **Performance**: hydration mismatch на /kp + JS не сплитится + LCP не репортится
- **Accessibility**: возможный contrast fail на полупрозрачных текстах
- **SEO**: `/cases` редирект, `history.replaceState` ломает canonical, мета-описания 136–650 chars (рекомендация 120–160)
- **Best Practices**: React error #418 на /kp снимает баллы автоматом

#### Топ-5 fixes для запуска (impact × effort)

| # | Fix | Effort | Priority |
|---|---|---|---|
| 1 | Убрать `history.replaceState` из глобального CasesCarousel (или ограничить роутом `/cases/*`) | 1–2 ч | **P0 БЛОКЕР** |
| 2 | Hydration mismatch на `/kp/*` (`new Date()` в render) | 2–4 ч | **P0** |
| 3 | Route-based code splitting + dynamic import тяжёлых компонент (1.2 MB → ≤400 KB) | 4–8 ч | **P1** |
| 4 | `<link rel="preload">` для hero image + основного font weight + `Timing-Allow-Origin: *` на CDN | 1 ч | **P1** |
| 5 | Сделать `/cases` index-страницу + проверить контраст `text/70` против WCAG AA | 2–3 ч | **P2** |

### Analytics readiness checklist — DONE

**Starting point**: в `layout.tsx` НЕТ ни одного аналитического скрипта (чистый старт). В `privacy/page.tsx` явно написано «We do not use cookies for tracking» — **этот текст нужно переписать ДО включения любого трекера** (иначе нарушение собственной политики).

#### Stack рекомендованный
- **GTM** (`GTM-XXXXXXX`) как единая точка входа — проксирует GA4 / Ads / Meta Pixel / LinkedIn
- **GA4** (`G-XXXXXXXXXX`) — main analytics
- **Yandex.Metrica** + Webvisor 2.0 (критично для СНГ-трафика)
- **Vercel Analytics + Speed Insights** (бесплатно, real Web Vitals)
- **Sentry** для `/api/contact` и `/api/kp/track` (сейчас только `console.error`)
- **PostHog** (опц., session recordings + feature flags)
- **Cookie consent banner** (Cookieyes / Cookiebot) + **Consent Mode v2**

#### События для трекинга (топ по impact)
| Event | Триггер | Impact |
|---|---|---|
| `contact_form_submit` | после успешного POST `/api/contact` | **CRITICAL** — main goal |
| `kp_view` | open КП по slug | **CRITICAL** |
| `kp_plan_click` | клик на пакет | **CRITICAL** |
| `kp_invoice_download` | скачивание счёта | High |
| `case_study_view` + `case_study_scroll_50` | engagement на кейсе | High |
| `cta_click_telegram` | любой клик в Telegram | High |
| `contact_form_step_complete` | переход между шагами Stepper | Medium |
| `outbound_click`, `404_error` | техника | Medium |

#### Conversions с value (для Google Ads оптимизации)
1. `contact_form_submit` — $200
2. `kp_plan_click` — $500
3. `kp_invoice_download` — $300
4. `cta_click_telegram` (только `location=kp`) — $100
5. `contact_form_step_complete` (step=2) — $20 (micro)

#### UTM-стандарт
`?utm_source=...&utm_medium=...&utm_campaign=...&utm_content=...&utm_term=...` — готовые шаблоны для Google Ads / Instagram / Telegram / Email / LinkedIn в полном отчёте агента.

UTM нужно парсить в `/api/contact/route.ts` и добавлять в Telegram-уведомление, чтобы понимать источник лида сразу при получении.

#### Воронки (GA4 Explore)
1. **Cold traffic**: `/` → `/cases` → case_study_view → `/contact` → submit
2. **Warm (КП)**: kp_view → kp_plan_click → cta_click_telegram
3. **Cases**: `/cases` → case_view → scroll_50 → `/contact` → submit

#### Audiences для ретаргета
- Visited cases, no contact (30 дней)
- KP opened, no plan click (14 дней)
- High-engagement (3+ pages, 90+ sec)
- Form abandoners (7 дней, hot для Meta retarget)

#### KPI benchmarks для B2B dev-агентства
- Conversion rate cold paid → form submit: **1.5–3%**
- CPL search: **$25–$80**, Instagram: **$40–$120**, Telegram СНГ: **$15–$50**
- Lead → Discovery call: **30–50%**
- Discovery → Signed contract: **15–25%**
- LTV / CAC: **≥ 3**

#### Hot lead detection
В `/api/contact/route.ts` добавить флаг `🔥 Hot lead` в Telegram-уведомление если `budget ∈ {medium, large, enterprise, custom}`.

#### 🔴 NEW CRITICAL: Privacy Policy сломается
`src/app/privacy/page.tsx` сейчас декларирует «We do not use cookies for tracking». ДО запуска аналитики **переписать полностью** — иначе GDPR/152-ФЗ нарушение.

#### Файлы, которые нужно править
- `src/app/layout.tsx` — GTM, Vercel Analytics, cookie banner, SPA page_view
- `src/app/contact/contact-content.tsx` — dataLayer push на submit + UTM из sessionStorage
- `src/app/api/contact/route.ts` — Measurement Protocol, UTM в Telegram, Sentry, hot-lead флаг
- `src/app/api/kp/track/route.ts` — Sentry, UTM extraction
- `src/app/kp/kp-content.tsx` — dataLayer events (дублируют POST в `/api/kp/track`)
- `src/app/kp/[slug]/invoice/[plan]/print-button.tsx` — `kp_invoice_download` event
- `src/app/cases/[slug]/page.tsx` — `case_study_view` + scroll tracker
- `src/app/privacy/page.tsx` — переписать полностью
- `src/lib/analytics.ts` — создать (типизированный `trackEvent`)
- `package.json` — добавить `@vercel/analytics`, `@vercel/speed-insights`, `@sentry/nextjs`

#### Pre-launch (топ-10 ДО первой платной ссылки)
1. GTM контейнер опубликован, тег срабатывает (GTM Preview Mode)
2. GA4 видит `page_view` в Realtime
3. `contact_form_submit` срабатывает при тесте
4. `kp_view` и `kp_plan_click` работают
5. Yandex.Metrica Webvisor записывает сессии
6. Sentry получает тестовую ошибку
7. Cookie consent работает, GTM не грузит до accept
8. Privacy Policy переписана
9. UTM-шаблоны зафиксированы в Notion
10. Google Ads ↔ GA4 связаны, conversion импортирован

#### Приоритет внедрения
- **Этап 1 (must-have)**: GTM + GA4 + Cookie consent + Privacy Policy переписать + 5 critical событий + UTM в Telegram + GA4↔Ads link + Sentry
- **Этап 2 (неделя 1)**: Yandex.Metrica + Vercel Speed Insights + воронка 1 + 2 ретаргет-аудитории + остальные события + server-side Measurement Protocol
- **Этап 3 (месяц 1)**: PostHog + session recordings + полные воронки + Consent Mode v2 + lead scoring + CRM webhook + Looker Studio dashboard

---

## Implementation plan

После завершения всех 4 pending-аудитов заполняется единый план: всё ранжируется
по impact × effort и реализуется поэтапно.

### 🚨 Stage 0 — БЛОКЕРЫ ЗАПУСКА ТРАФИКА (нельзя без них)

Каждый из этих фиксов — потенциальный «деньги в трубу» если запустить трафик без него.

| # | Fix | Why blocker | Effort |
|---|---|---|---|
| **B1** | `history.replaceState` → ограничить только роутом `/cases/*` (или убрать race condition) | Ломает GA атрибуцию, canonical SEO, share-links + редиректит paid traffic с кейсов на случайные страницы | 1–2 ч |
| **B2** | Hydration error #418 на `/kp/*` — вынести `new Date()` в useEffect | React error → re-render, потеря интерактивности на момент гидрации | 2–4 ч |
| **B3** | Fix слипшихся слов в spans (homepage H1 + Web3-термины в кейсах) | Google индексирует «Разработкаподключ», `aMask`, `mReward` — потеря SEO ranking на основные ключи | 2 ч |
| **B4** | Pre-filled Telegram «для X» → «(клиент: X)» | Сейчас «для Екатерина» — некорректное склонение, выглядит непрофессионально | 5 мин |
| **B5** | Mobile horizontal scroll (~14px на 390px viewport) | Видимая полоса прокрутки на iPhone — UX-проблема | 30 мин |
| **B6** | Privacy Policy переписать ДО включения аналитики | GDPR + 152-ФЗ нарушение в момент включения GTM | 2 ч |
| **B7** | `/cases` сделать real index page (сейчас редиректит) | SEO loss + плохой UX через nav-меню | 2–3 ч |

**Стейдж 0 total: ~12–15 часов работы. БЕЗ него — не запускать платный трафик.**

### Stage 1 — High-impact content (после блокеров)

| # | Fix | Why important |
|---|---|---|
| H1 | TrustedBy: реальные логотипы (или silhouette+NDA, или заменить на 3 отзыва) | Сейчас filler-категории — слабый trust signal |
| H2 | Заполнить TESTIMONIALS — 3-5 реальных отзывов | Нет вообще нигде на сайте |
| H3 | Bottom-CTA на 15 кейсах — universal component «Похожий проект? Звонок на 20 мин →» | Лиды теряются после 2000 слов чтения |
| H4 | Backfill 5 тонких кейсов (geo-heatmap, analytics-pro, ai-accounting, wallet-rpc, startup-under-key) до 1200+ слов | Невозможно закрыть лида тонкой страницей |
| H5 | «3 metrics minimum» — добавить цифры в multi-location-restaurant (0!), trm-oferta (1), utility-token (1) | Case study без чисел = press release |
| H6 | Год + NDA note на 6 кейсов где их нет | Кейсы выглядят «не пойми когда», NDA-claims без формулировки |
| H7 | На КП — добавить 1-2 скриншота результата | Сейчас 0 изображений, чисто текст |
| H8 | Email + альтернативный канал в КП (рядом с Telegram-кнопкой) | B2B клиент может не пользоваться Telegram |
| H9 | Final CTA на главной — переписать с другим angle, не дублировать hero | Сейчас «Получить оценку за 24 часа» 2 раза |
| H10 | A/B-тест hero — запустить Вариант C (Proof/Speed-driven) против baseline | Подготовлен, готов к тесту |

### Stage 2 — конверсия второго порядка (Medium)

| # | Fix |
|---|---|
| M1 | Цветовой контраст — поднять с `#888` до `#666`/`#555` (WCAG AA) |
| M2 | Recommended-пакет визуально выделить на мобильной (scale/shadow) |
| M3 | USD-цены — подпись «(по курсу 86 сом/$, на дату КП)» |
| M4 | Skip-link поднять до 44×44px |
| M5 | Hero eyebrow «24ч ответ» — убрать дубликат (есть в CTA) |
| M6 | Enterprise-modules — нормализовать tech stack labels (NEXT.JS дубликат) |
| M7 | Tripwise — fix broken visual rendering цифр («8\n\nСек») |
| M8 | Параграфы на главной с `lab(.../0.7)` — проверить контраст вручную |

### Stage 3 — performance & SEO (после Stage 0-1)

| # | Fix | Effort |
|---|---|---|
| P1 | Dynamic import тяжёлых компонент (motion, three, CasesCarousel, CustomCursor) → 1.2 MB → ≤400 KB | 4–8 ч |
| P2 | `<link rel="preload">` для hero image + основного font weight | 1 ч |
| P3 | `Timing-Allow-Origin: *` на CDN-домене для RUM | 30 мин |
| P4 | Мета-описания нормализовать в диапазон 120–160 chars (сейчас 136–650) | 1 ч |
| P5 | Schema.org для кейсов (CreativeWork / Article) | 2 ч |
| P6 | OG-images для каждого кейса (сейчас один общий) | 3 ч |

### Stage 4 — analytics setup (после переписки Privacy Policy)

#### Этап 4.1 — must-have для запуска
1. GTM контейнер + GA4 + Cookie consent banner (Russian + English)
2. Vercel Analytics + Speed Insights
3. Sentry для `/api/contact` и `/api/kp/track`
4. 5 critical events: `contact_form_submit`, `kp_view`, `kp_plan_click`, `cta_click_telegram`, `page_view` (SPA)
5. UTM-парсинг в `/api/contact` + добавление в Telegram-уведомление
6. GA4 conversions: `contact_form_submit` ($200), `kp_plan_click` ($500)
7. Google Ads ↔ GA4 linking
8. Hot-lead флаг `🔥` в Telegram при budget ≥ small

#### Этап 4.2 — неделя 1 после запуска
1. Yandex.Metrica + Webvisor (СНГ-трафик)
2. Voronka 1 в GA4 Explore + ретаргет-аудитории (visited cases no contact / KP opened no click)
3. Остальные события (case_study_view, case_study_scroll_50, kp_invoice_download, outbound_click)
4. Server-side Measurement Protocol в `/api/contact` (защита от ad-blockers)

#### Этап 4.3 — месяц 1
1. PostHog + session recordings
2. Полные 3 воронки + 4 audiences
3. Consent Mode v2 + DPA-документы
4. CRM webhook из `/api/contact` (HubSpot Free / Pipedrive)
5. Looker Studio dashboard: CPL по каналам, ROAS, conversion rate

### Stage 5 — polish (Low priority)

| # | Fix |
|---|---|
| L1 | ID документа КП укоротить (`KP-2026-LRLXXL-INV-BUSINESS` → `KP-2026-LRL/B`) |
| L2 | PDF-печать FAQ — `+` иконки могут оставаться (CSS noPrint) |
| L3 | `/kp` — добавить Schema.org Service/Offer JSON-LD |
| L4 | Final CTA H2 длинный — сделать H3 или укоротить |
| L5 | Contact-форма — проверить поля projectType/budget/timeline в Telegram |

---

## Summary: total scope

- **Blockers (Stage 0)**: ~12–15 часов — нельзя запускать трафик без них
- **High-impact (Stage 1)**: ~20–30 часов + контент-сбор (отзывы, реальные лого, доработка 5 кейсов)
- **Medium (Stage 2)**: ~8–10 часов
- **Performance & SEO (Stage 3)**: ~12–15 часов
- **Analytics 4.1 (must-have)**: ~10–15 часов
- **Polish + analytics 4.2/4.3**: ~20–30 часов

**Total до устойчивого запуска платного трафика: 60–80 часов работы.**

**Minimum viable launch (Stage 0 + Stage 4.1 + 2-3 пункта из Stage 1)**: ~30 часов.

---

_Last updated: 2026-05-20_
