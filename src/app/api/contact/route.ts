import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

export interface ContactSubmission {
  projectType: string;
  stage: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  message: string;
}

function formatTelegramMessage(s: ContactSubmission): string {
  const lines = [
    `🔔 *Новая заявка с anteyko.com*`,
    ``,
    `👤 *Имя:* ${escapeMarkdown(s.name)}`,
    `📧 *Email:* ${escapeMarkdown(s.email)}`,
  ];

  if (s.projectType) lines.push(`📦 *Тип проекта:* ${escapeMarkdown(s.projectType)}`);
  if (s.stage) lines.push(`🚀 *Стадия:* ${escapeMarkdown(s.stage)}`);
  if (s.timeline) lines.push(`⏱ *Сроки:* ${escapeMarkdown(s.timeline)}`);
  if (s.budget) lines.push(`💰 *Бюджет:* ${escapeMarkdown(s.budget)}`);

  if (s.message) {
    lines.push(``);
    lines.push(`💬 *Сообщение:*`);
    lines.push(escapeMarkdown(s.message));
  }

  lines.push(``);
  lines.push(`🕐 ${new Date().toISOString()}`);

  return lines.join("\n");
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

async function sendTelegram(text: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram credentials not configured");
    return false;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "MarkdownV2",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram API error:", err);
    return false;
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot: if this field is filled, treat as spam
    if (body.website && String(body.website).trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { projectType, stage, timeline, budget, name, email, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const submission: ContactSubmission = {
      projectType: String(projectType || ""),
      stage: String(stage || ""),
      timeline: String(timeline || ""),
      budget: String(budget || ""),
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message || "").trim(),
    };

    // Log to Vercel Function Logs as backup
    console.log("📩 New lead:", JSON.stringify(submission));

    // Send to Telegram
    const sent = await sendTelegram(formatTelegramMessage(submission));

    if (!sent) {
      console.warn("Telegram delivery failed, but lead is logged above");
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
