/**
 * Отправка заявки в CRM (crm.anteyko.com), API-инбокс «Сайт и скраперы».
 *
 * Контракт и обоснования — в CRM-Anteyko/chatwoot/custom/docs/api-inbox.md.
 * Здесь повторены только те решения, которые нельзя понять по коду.
 */
import { createHash, createHmac } from "node:crypto";

const CRM_BASE = process.env.CRM_BASE_URL || "https://crm.anteyko.com";
const CRM_IDENT = process.env.CRM_INBOX_IDENTIFIER || "";
const CRM_HMAC_TOKEN = process.env.CRM_INBOX_HMAC_TOKEN || "";

/** Заявка не должна держать serverless-функцию дольше, чем не жалко. */
const TIMEOUT_MS = 8000;

export interface CrmLead {
  name: string;
  email: string;
  phone?: string;
  /** Текст, который увидит менеджер и по которому CRM посчитает AI-балл. */
  message: string;
}

/**
 * Метка источника на беседе. В API-инбокс «Сайт и скраперы» попадает всё, у
 * чего нет своего канала: эта форма, выхлоп скраперов и лиды с телефона. CRM
 * отвечает автоматически ТОЛЬКО на то, что помечено этой меткой, — человеку,
 * который сам нам написал. Скрапер такую метку не ставит и автоответа не
 * получит, что и требуется: ему мы не писали и писать первыми не будем.
 *
 * Значение читает Custom::AutoReplyPolicy на стороне CRM; менять его в одном
 * месте нельзя.
 */
export const WEBSITE_FORM_SOURCE = "website_form";

/** Убирает из объяснения CRM всё, что похоже на email или номер телефона. */
const scrub = (text: string) =>
  text.replace(/\S+@\S+/g, "…").replace(/\+?\d[\d\s().-]{5,}\d/g, "…").slice(0, 120);

/**
 * Текст ошибки уходит в логи Vercel и в Telegram. В path лежит
 * CRM_INBOX_IDENTIFIER, а он секрет, поэтому текст называет только шаг
 * (contacts, conversations или messages), код ответа и объяснение CRM.
 */
async function post(path: string, body: unknown): Promise<Record<string, unknown>> {
  const step = path.slice(path.lastIndexOf("/") + 1);
  let res: Response;
  try {
    res = await fetch(`${CRM_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (e) {
    // Не e.message: fetch вписывает туда сам URL («Failed to parse URL from …»).
    const { name, cause } = (e ?? {}) as { name?: string; cause?: { code?: string } };
    const why = name === "TimeoutError" ? `нет ответа за ${TIMEOUT_MS / 1000} с` : `сеть (${cause?.code || name || "ошибка"})`;
    throw new Error(`CRM ${step} → ${why}`);
  }
  if (!res.ok) {
    // «Phone number should be in e164 format» и подобное. Присланных значений
    // Chatwoot в объяснение не вставляет, но scrub не полагается на это.
    const why = await res.json().then((b) => b?.message || b?.error, () => undefined);
    throw new Error(`CRM ${step} → ${res.status}${typeof why === "string" && why ? ` (${scrub(why)})` : ""}`);
  }
  try {
    return await res.json();
  } catch {
    throw new Error(`CRM ${step} → ${res.status}, ответ не JSON`);
  }
}

/**
 * Телефон из формы → E.164, как его принимает CRM, или null.
 *
 * CRM (Chatwoot, Contact#phone_number) пускает только /\+[1-9]\d{1,14}\z/, а на
 * всё остальное отвечает 422 на создании контакта, и тогда в CRM не доходит
 * ничего: ни беседы, ни сообщения. Так 21.10.2026 потерялась заявка с сайта.
 * Поле в форме свободное, пишут «0700 123 456», «+996 (700) 12-34-56»,
 * «996700123456».
 *
 * Правила решены владельцем:
 * - без кода страны номер кыргызский: 0XXXXXXXXX или 9 цифр → +996XXXXXXXXX;
 * - 8 или 7 и ещё 10 цифр → +7 и эти 10 цифр (Россия, Казахстан);
 * - с «+» или «00» номер берётся как есть, если он похож на E.164;
 * - всё остальное, в том числе номер с добавочным и два номера в одном поле, —
 *   null. Такой номер в карточку не пишется, а уходит текстом в сообщение
 *   (см. submitLeadToCrm), так что он не теряется.
 */
export function toE164(raw?: string | null): string | null {
  if (!raw) return null;
  const text = raw
    .normalize("NFKC") // полноширинные ０-９ и ＋ → 0-9 и +
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660)) // арабские цифры
    .replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x06f0)); // персидские цифры
  // Слова вокруг номера не мешают («тел.: …», «… (WhatsApp)»). Внутри номера
  // это добавочный или второй номер: из «0700 123 45 доб. 2» вышел бы чужой.
  const core = text.match(/[+\d](?:[\s\S]*\d)?/)?.[0];
  if (!core || /[^\d+\s.()/\-\u2010-\u2015\u2212]/.test(core)) return null;
  let s = core.replace(/[^\d+]/g, "");
  if (s.startsWith("00")) s = `+${s.slice(2)}`;
  if (!s.startsWith("+")) {
    if (/^996\d{9,10}$/.test(s)) s = `+${s}`;
    else if (/^0\d{9}$/.test(s)) s = `+996${s.slice(1)}`;
    else if (/^\d{9}$/.test(s)) s = `+996${s}`;
    else if (/^[78]\d{10}$/.test(s)) s = `+7${s.slice(1)}`;
    else return null;
  }
  s = s.replace(/^\+9960(?=\d{9}$)/, "+996"); // «+996 0700 …»: лишний ноль после кода
  // После +996 ровно 9 цифр, после +7 ровно 10, и ноль первым не бывает ни там, ни там.
  if (s.startsWith("+996")) return /^\+996[1-9]\d{8}$/.test(s) ? s : null;
  if (s.startsWith("+7")) return /^\+7[1-9]\d{9}$/.test(s) ? s : null;
  // Строже, чем у CRM: якорь в начале и не меньше 7 цифр.
  return /^\+[1-9]\d{6,14}$/.test(s) ? s : null;
}

/**
 * Нормализация решает, склеятся ли две заявки от одного человека. Меняя её,
 * меняешь и все уже посчитанные source_id — отсюда версия в префиксе хеша.
 */
function normalize(email: string, phone?: string): string {
  const e = (email || "").trim().toLowerCase();
  if (e) return e;
  return (phone || "").replace(/[^\d+]/g, "");
}

export async function submitLeadToCrm(lead: CrmLead): Promise<{ conversationId: number } | null> {
  if (!CRM_IDENT) {
    console.error("❌ CRM_INBOX_IDENTIFIER missing — лид в CRM не уйдёт");
    return null;
  }

  const identifier = normalize(lead.email, lead.phone);
  if (!identifier) {
    console.error("❌ У заявки нет ни email, ни телефона — в CRM отправлять нечего");
    return null;
  }

  /**
   * source_id — хеш, а не сам контакт: Rails не пускает точку в динамический
   * сегмент маршрута, поэтому email в source_id даёт 404 на втором и третьем
   * запросах, а первый при этом проходит. Заодно PII не уезжает в логи nginx.
   */
  const sourceId = createHash("sha256").update(`anteyko:v1:${identifier}`).digest("hex");

  // Телефон едет в карточку только в E.164: любой другой формат CRM отклоняет
  // вместе со всей заявкой. Нераспознанный номер уходит в текст сообщения.
  const phone = toE164(lead.phone);
  const rawPhone = (lead.phone || "").replace(/\s+/g, " ").trim();
  const unrecognizedPhone = !phone && rawPhone
    ? (rawPhone.length > 64 ? `${rawPhone.slice(0, 64)}…` : rawPhone)
    : "";

  const contact = await post(`/public/api/v1/inboxes/${CRM_IDENT}/contacts`, {
    source_id: sourceId,
    identifier,
    name: lead.name || "Заявка с сайта",
    email: lead.email || undefined,
    // Телефон склеивает контакты: поиск идёт identifier → email → телефон, и
    // общий офисный номер из формы слил бы двух разных людей в один контакт.
    phone_number: phone ?? undefined,
    ...(CRM_HMAC_TOKEN && {
      identifier_hash: createHmac("sha256", CRM_HMAC_TOKEN).update(identifier).digest("hex"),
    }),
  });

  const sid = String(contact.source_id ?? sourceId);
  const conversation = await post(
    `/public/api/v1/inboxes/${CRM_IDENT}/contacts/${sid}/conversations`,
    // Публичный API беседы принимает только custom_attributes (см.
    // Public::Api::V1::Inboxes::ConversationsController#conversation_params),
    // поэтому метка едет здесь, а не в additional_attributes.
    { custom_attributes: { anteyko_source: WEBSITE_FORM_SOURCE } },
  );

  /**
   * Сообщение приходит как incoming — это несущее: Custom::LeadScorer собирает
   * транскрипт только из входящих, и заявка, попавшая исходящим, была бы
   * оценена как пустое обращение.
   */
  await post(
    `/public/api/v1/inboxes/${CRM_IDENT}/contacts/${sid}/conversations/${conversation.id}/messages`,
    {
      content: unrecognizedPhone
        ? `${lead.message}\n\nТелефон из формы (не распознан, в карточку не записан): ${unrecognizedPhone}`
        : lead.message,
    },
  );

  return { conversationId: Number(conversation.id) };
}
