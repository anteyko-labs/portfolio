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

async function post(path: string, body: unknown): Promise<Record<string, unknown>> {
  const res = await fetch(`${CRM_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`CRM ${path} → ${res.status}`);
  return res.json();
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

  const contact = await post(`/public/api/v1/inboxes/${CRM_IDENT}/contacts`, {
    source_id: sourceId,
    identifier,
    name: lead.name || "Заявка с сайта",
    email: lead.email || undefined,
    // Телефон склеивает контакты: поиск идёт identifier → email → телефон, и
    // общий офисный номер из формы слил бы двух разных людей в один контакт.
    phone_number: lead.phone || undefined,
    ...(CRM_HMAC_TOKEN && {
      identifier_hash: createHmac("sha256", CRM_HMAC_TOKEN).update(identifier).digest("hex"),
    }),
  });

  const sid = String(contact.source_id ?? sourceId);
  const conversation = await post(
    `/public/api/v1/inboxes/${CRM_IDENT}/contacts/${sid}/conversations`,
    {},
  );

  /**
   * Сообщение приходит как incoming — это несущее: Custom::LeadScorer собирает
   * транскрипт только из входящих, и заявка, попавшая исходящим, была бы
   * оценена как пустое обращение.
   */
  await post(
    `/public/api/v1/inboxes/${CRM_IDENT}/contacts/${sid}/conversations/${conversation.id}/messages`,
    { content: lead.message },
  );

  return { conversationId: Number(conversation.id) };
}
