import type { Language } from "@/lib/translations";

// Legal text, kept as data rather than JSX so that the Russian and the English
// version cannot drift apart structurally: both locales render the same list of
// sections through the same component. `{email}` and `{telegram}` are replaced
// by links at render time — writing the anchors inline would make the sentences
// unreadable here, which is where the accuracy of a policy is checked.
export type Block = { lead?: string; p: string } | { ul: string[] };

export type PolicySection = { title: string; blocks: Block[] };

export type PolicyCopy = {
  title: string;
  subtitle: string;
  updated: string;
  sections: PolicySection[];
};

const ru: PolicyCopy = {
  title: "Политика конфиденциальности",
  subtitle: "Как мы обращаемся с вашими данными",
  updated: "Последнее обновление: 17 сентября 2026",
  sections: [
    {
      title: "1. Кто мы",
      blocks: [
        {
          p: "ОсОО «Антейко» (ИНН 01306202310152), г. Бишкек, Кыргызстан. Email: {email}. Telegram: {telegram}.",
        },
      ],
    },
    {
      title: "2. Какие данные собираем",
      blocks: [
        {
          lead: "Технические (автоматически):",
          p: "IP-адрес (анонимизированный), user-agent, referer, страницы, время посещения, действия (клики, скроллы).",
        },
        {
          lead: "Аналитические (cookies):",
          p: "Google Analytics 4, Yandex.Metrica (с Webvisor), Sentry (error tracking), Vercel Analytics. Только после вашего согласия.",
        },
        {
          lead: "Контактные (от вас):",
          p: "имя, email, телефон, описание проекта — когда вы заполняете контактную форму или открываете коммерческое предложение.",
        },
        {
          lead: "Переписка (от вас):",
          p: "номер телефона или адрес, имя и текст сообщения — когда вы пишете нам в мессенджер, в чат на сайте или на почту.",
        },
      ],
    },
    {
      title: "3. Сообщения в мессенджерах и почте",
      blocks: [
        {
          p: "Когда вы пишете нам в WhatsApp, Telegram, в чат на сайте или на почту, мы получаем ваш номер телефона или адрес, имя, если вы его указали, и текст сообщения. Мы используем эти данные, чтобы ответить вам, уточнить задачу и вести работу по вашему обращению.",
        },
        {
          p: "Переписка хранится в нашей системе учёта обращений на нашем собственном сервере в Германии. Доступ к ней есть только у сотрудников Anteyko Labs.",
        },
      ],
    },
    {
      title: "4. Помощник на основе ИИ",
      blocks: [
        {
          p: "Чтобы отвечать быстрее, мы используем ИИ-помощника: он готовит краткое содержание переписки, черновики ответов для менеджера и первый автоматический ответ на ваше обращение. Для этого текст переписки передаётся поставщику модели, который обрабатывает его по нашему поручению.",
        },
        {
          p: "Автоматический ответ всегда помечен как автоматический, приходит один раз в начале разговора и не отправляется, если вам уже ответил человек. Дальше с вами работает менеджер.",
        },
      ],
    },
    {
      title: "5. Зачем собираем",
      blocks: [
        {
          ul: [
            "Улучшать UX сайта (Webvisor, A/B-тесты)",
            "Атрибутировать рекламные кампании (UTM, конверсии)",
            "Связываться с потенциальными клиентами (только если оставили заявку)",
            "Отвечать на ваши сообщения и вести работу по обращению",
            "Отслеживать ошибки и сбои (Sentry)",
          ],
        },
      ],
    },
    {
      title: "6. Кому передаём",
      blocks: [
        {
          p: "Только сервисам-обработчикам, которые работают по нашему поручению: Google, Yandex, Vercel, Sentry, Telegram — по сайту и аналитике; поставщику ИИ-модели — текст переписки для помощника из раздела 4; провайдеру серверов и почтовому провайдеру — для доставки писем.",
        },
        {
          p: "Третьим лицам в рекламных целях данные НЕ передаём и не продаём их.",
        },
      ],
    },
    {
      title: "7. Cookies",
      blocks: [
        {
          p: "Можете отключить в баннере при первом визите или в настройках браузера. GA4 и Yandex.Metrica не работают без вашего согласия (Consent Mode v2).",
        },
      ],
    },
    {
      title: "8. Хранение",
      blocks: [
        {
          p: "Аналитические данные — 14 месяцев (стандарт GA4). Контактные заявки — 3 года или до отзыва согласия. Переписка в мессенджерах и почте — 3 года с последнего сообщения или до вашего запроса на удаление.",
        },
      ],
    },
    {
      title: "9. Ваши права",
      blocks: [
        {
          ul: [
            "Запросить копию ваших данных",
            "Удалить ваши данные (forget request)",
            "Отозвать согласие на обработку",
            "Подать жалобу в надзорный орган",
          ],
        },
        { p: "Пишите на {email} — отвечаем в течение 30 дней." },
      ],
    },
    {
      title: "10. Удаление данных",
      blocks: [
        {
          p: "Напишите на {email} с темой «Удаление данных» и укажите номер телефона или адрес, с которого вы нам писали. Мы удалим переписку и контактные данные в течение 30 дней и подтвердим это письмом.",
        },
      ],
    },
    {
      title: "11. Дети",
      blocks: [
        {
          p: "Сайт не предназначен для лиц младше 16 лет. Данные не собираем сознательно.",
        },
      ],
    },
    {
      title: "12. Изменения",
      blocks: [
        {
          p: "Эта политика может меняться. Дата последнего обновления — вверху.",
        },
      ],
    },
  ],
};

const en: PolicyCopy = {
  title: "Privacy policy",
  subtitle: "How we handle your data",
  updated: "Last updated: 17 September 2026",
  sections: [
    {
      title: "1. Who we are",
      blocks: [
        {
          p: "Anteyko LLC (tax ID 01306202310152), Bishkek, Kyrgyzstan. Email: {email}. Telegram: {telegram}.",
        },
      ],
    },
    {
      title: "2. What we collect",
      blocks: [
        {
          lead: "Technical (automatically):",
          p: "IP address (anonymised), user agent, referer, pages, visit time, interactions (clicks, scrolls).",
        },
        {
          lead: "Analytics (cookies):",
          p: "Google Analytics 4, Yandex.Metrica (with Webvisor), Sentry (error tracking), Vercel Analytics. Only after your consent.",
        },
        {
          lead: "Contact details (from you):",
          p: "name, email, phone, project description — when you fill in the contact form or open a proposal.",
        },
        {
          lead: "Messages (from you):",
          p: "phone number or address, name and message text — when you write to us in a messenger, in the website chat or by email.",
        },
      ],
    },
    {
      title: "3. Messages in messengers and email",
      blocks: [
        {
          p: "When you write to us on WhatsApp, Telegram, in the website chat or by email, we receive your phone number or address, your name if you provided it, and the text of your message. We use this to reply to you, clarify your request and work on it.",
        },
        {
          p: "The conversation is stored in our own customer-conversation system on our own server in Germany. Only Anteyko Labs employees have access to it.",
        },
      ],
    },
    {
      title: "4. AI assistant",
      blocks: [
        {
          p: "To reply faster we use an AI assistant: it prepares a summary of the conversation, draft replies for our manager, and the first automatic reply to your message. For this, the text of the conversation is sent to the model provider, which processes it on our behalf.",
        },
        {
          p: "An automatic reply is always labelled as automatic, is sent once at the start of a conversation, and is not sent if a person has already replied to you. After that a manager continues the conversation.",
        },
      ],
    },
    {
      title: "5. Why we collect it",
      blocks: [
        {
          ul: [
            "To improve the website experience (Webvisor, A/B tests)",
            "To attribute advertising campaigns (UTM, conversions)",
            "To contact prospective clients (only if you submitted a request)",
            "To answer your messages and work on your request",
            "To track errors and failures (Sentry)",
          ],
        },
      ],
    },
    {
      title: "6. Who we share it with",
      blocks: [
        {
          p: "Only with service providers acting on our behalf: Google, Yandex, Vercel, Sentry, Telegram for the website and analytics; the AI model provider for the conversation text described in section 4; our server provider and our email provider for delivering messages.",
        },
        {
          p: "We do NOT share data with third parties for advertising and we do not sell it.",
        },
      ],
    },
    {
      title: "7. Cookies",
      blocks: [
        {
          p: "You can decline them in the banner on your first visit or in your browser settings. GA4 and Yandex.Metrica do not run without your consent (Consent Mode v2).",
        },
      ],
    },
    {
      title: "8. Retention",
      blocks: [
        {
          p: "Analytics data — 14 months (the GA4 standard). Contact requests — 3 years or until you withdraw consent. Messenger and email conversations — 3 years from the last message or until you ask us to delete them.",
        },
      ],
    },
    {
      title: "9. Your rights",
      blocks: [
        {
          ul: [
            "Request a copy of your data",
            "Delete your data (forget request)",
            "Withdraw your consent to processing",
            "Complain to a supervisory authority",
          ],
        },
        { p: "Write to {email} — we answer within 30 days." },
      ],
    },
    {
      title: "10. Data deletion",
      blocks: [
        {
          p: 'Write to {email} with the subject "Data deletion" and tell us the phone number or address you wrote to us from. We will delete the conversation and your contact details within 30 days and confirm it by email.',
        },
      ],
    },
    {
      title: "11. Children",
      blocks: [
        {
          p: "This website is not intended for anyone under 16. We do not knowingly collect their data.",
        },
      ],
    },
    {
      title: "12. Changes",
      blocks: [
        {
          p: "This policy may change. The date of the latest update is at the top.",
        },
      ],
    },
  ],
};

export const privacyCopy: Record<Language, PolicyCopy> = { en, ru };
