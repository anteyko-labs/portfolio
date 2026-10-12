import { NextRequest, NextResponse } from "next/server";
import { submitLeadToCrm } from "@/lib/crm";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

export interface ContactSubmission {
  projectType: string;
  stage: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  utm?: Record<string, string>;
  referer?: string;
}

const HOT_LEAD_BUDGETS = new Set(["medium", "large", "enterprise", "custom"]);

// Human-readable labels for form values
const PROJECT_TYPES: Record<string, string> = {
  website: "Сайт / Лендинг",
  mvp: "MVP",
  product: "Полный продукт",
  web3: "Web3 модуль",
  mobile: "Мобильное приложение",
  branding: "Брендинг",
  fintech: "Финтех",
  access: "УРВ и СКУД",
  carbon: "Карбоновые кредиты",
  support: "Сопровождение IT",
};

const STAGES: Record<string, string> = {
  idea: "Только идея",
  design: "Есть дизайн",
  mvp: "Есть MVP",
  launch: "Нужна помощь с запуском",
};

const TIMELINES: Record<string, string> = {
  urgent: "Срочно (2 недели)",
  normal: "1–2 месяца",
  relaxed: "3+ месяца",
};

const BUDGETS: Record<string, string> = {
  micro: "До $1k",
  small: "$1k – $3k",
  medium: "$3k – $5k",
  large: "$5k – $10k",
  enterprise: "$10k – $25k",
  custom: "$25k+",
  unsure: "Обсудим",
};

function label(map: Record<string, string>, key: string): string {
  return map[key] || key;
}

function formatTelegramMessage(s: ContactSubmission): string {
  const isHotLead = s.budget && HOT_LEAD_BUDGETS.has(s.budget);

  const lines: string[] = [];

  if (isHotLead) {
    lines.push(`🔥 ГОРЯЧИЙ ЛИД`);
    lines.push(`🔥 Горячая заявка с anteyko.com`);
  } else {
    lines.push(`🔔 Новая заявка с anteyko.com`);
  }

  lines.push(``);
  lines.push(`👤 Имя: ${s.name}`);
  lines.push(`📧 Email: ${s.email}`);
  if (s.phone) lines.push(`📱 Телефон: ${s.phone}`);

  if (s.projectType) lines.push(`📦 Тип проекта: ${label(PROJECT_TYPES, s.projectType)}`);
  if (s.stage) lines.push(`🚀 Стадия: ${label(STAGES, s.stage)}`);
  if (s.timeline) lines.push(`⏱ Сроки: ${label(TIMELINES, s.timeline)}`);
  if (s.budget) lines.push(`💰 Бюджет: ${label(BUDGETS, s.budget)}`);

  if (s.message) {
    lines.push(``);
    lines.push(`💬 Сообщение:`);
    lines.push(s.message);
  }

  if (s.utm && Object.keys(s.utm).length > 0) {
    const source = s.utm.utm_source || "—";
    const medium = s.utm.utm_medium || "—";
    const campaign = s.utm.utm_campaign || "—";
    lines.push(``);
    lines.push(`📡 UTM: ${source} / ${medium} / ${campaign}`);

    const extras: string[] = [];
    if (s.utm.utm_content) extras.push(`content=${s.utm.utm_content}`);
    if (s.utm.utm_term) extras.push(`term=${s.utm.utm_term}`);
    if (s.utm.gclid) extras.push(`gclid=${s.utm.gclid}`);
    if (s.utm.fbclid) extras.push(`fbclid=${s.utm.fbclid}`);
    if (extras.length > 0) {
      lines.push(`   ${extras.join(" · ")}`);
    }
  }

  if (s.referer) {
    lines.push(``);
    lines.push(`↩️ С: ${s.referer}`);
  }

  lines.push(``);
  lines.push(`🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Bishkek", dateStyle: "short", timeStyle: "short" })} (Бишкек)`);

  return lines.join("\n");
}

/**
 * Текст заявки для CRM. Отличается от телеграмного намеренно: это сообщение
 * приходит в CRM как входящее ОТ КЛИЕНТА, его читает менеджер и по нему
 * Custom::LeadScorer считает AI-балл. Поэтому здесь нет эмодзи-шапки «новая
 * заявка» и есть все поля брифа: бюджет, сроки и тип проекта — ровно те
 * признаки, по которым идёт скоринг.
 */
function formatCrmMessage(s: ContactSubmission): string {
  const lines: string[] = ["Заявка с сайта anteyko.com", ""];

  if (s.projectType) lines.push(`Тип проекта: ${label(PROJECT_TYPES, s.projectType)}`);
  if (s.stage) lines.push(`Стадия: ${label(STAGES, s.stage)}`);
  if (s.timeline) lines.push(`Сроки: ${label(TIMELINES, s.timeline)}`);
  if (s.budget) lines.push(`Бюджет: ${label(BUDGETS, s.budget)}`);

  if (s.message) {
    lines.push("", "Сообщение клиента:", s.message);
  }

  if (s.utm && Object.keys(s.utm).length > 0) {
    const parts = Object.entries(s.utm).map(([k, v]) => `${k}=${v}`);
    lines.push("", `UTM: ${parts.join(" · ")}`);
  }

  if (s.referer) lines.push(`Страница: ${s.referer}`);

  return lines.join("\n");
}

async function sendTelegram(text: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("❌ Telegram credentials missing. BOT_TOKEN:", !!TELEGRAM_BOT_TOKEN, "CHAT_ID:", !!TELEGRAM_CHAT_ID);
    return false;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Telegram API error:", res.status, JSON.stringify(data));
      return false;
    }

    console.log("✅ Telegram message sent, message_id:", data.result?.message_id);
    return true;
  } catch (err) {
    console.error("❌ Telegram fetch error:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot: if this field is filled, treat as spam
    if (body.website && String(body.website).trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { projectType, stage, timeline, budget, name, email, phone, message, utm } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Parse UTM from payload (sanitize: only string values, known keys)
    const allowedUtmKeys = new Set([
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "fbclid",
    ]);
    let sanitizedUtm: Record<string, string> | undefined;
    if (utm && typeof utm === "object" && !Array.isArray(utm)) {
      const entries: [string, string][] = [];
      for (const [key, value] of Object.entries(utm as Record<string, unknown>)) {
        if (allowedUtmKeys.has(key) && typeof value === "string" && value.trim() !== "") {
          entries.push([key, value.slice(0, 200)]);
        }
      }
      if (entries.length > 0) {
        sanitizedUtm = Object.fromEntries(entries);
      }
    }

    // Capture referer from headers
    const refererHeader = request.headers.get("referer") || undefined;

    const submission: ContactSubmission = {
      projectType: String(projectType || ""),
      stage: String(stage || ""),
      timeline: String(timeline || ""),
      budget: String(budget || ""),
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || "").trim(),
      message: String(message || "").trim(),
      utm: sanitizedUtm,
      referer: refererHeader,
    };

    // Log to Vercel Function Logs as backup
    console.log("📩 New lead:", JSON.stringify(submission));

    // CRM — основной адресат: там заявка получает AI-балл, ответственного,
    // место в воронке и SLA-таймер. Telegram оставлен намеренно как страховка
    // на время перехода: пока путь в CRM не проверен на живых заявках, снимать
    // работающий канал доставки нельзя. Убрать вторым шагом.
    //
    // allSettled, а не await по очереди: отказ одного адресата не должен
    // лишать заявку второго. Ни один из них не влияет на ответ посетителю —
    // заявка уже написана человеком, и наш даунтайм не его проблема. Именно
    // поэтому оба результата только логируются.
    const [crm, telegram] = await Promise.allSettled([
      submitLeadToCrm({
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        message: formatCrmMessage(submission),
      }),
      sendTelegram(formatTelegramMessage(submission)),
    ]);

    if (crm.status === "fulfilled" && crm.value) {
      console.log("✅ CRM: беседа", crm.value.conversationId);
    } else {
      const reason = crm.status === "rejected" ? crm.reason : "не настроено";
      console.error("❌ CRM: заявка не доехала —", reason, "| лид залогирован выше");
    }

    if (telegram.status !== "fulfilled" || !telegram.value) {
      console.warn("⚠️ Telegram: не доставлено — лид залогирован выше");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Contact form error:", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
