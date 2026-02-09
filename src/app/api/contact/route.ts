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
    `🔔 Новая заявка с anteyko.com`,
    ``,
    `👤 Имя: ${s.name}`,
    `📧 Email: ${s.email}`,
  ];

  if (s.projectType) lines.push(`📦 Тип проекта: ${s.projectType}`);
  if (s.stage) lines.push(`🚀 Стадия: ${s.stage}`);
  if (s.timeline) lines.push(`⏱ Сроки: ${s.timeline}`);
  if (s.budget) lines.push(`💰 Бюджет: ${s.budget}`);

  if (s.message) {
    lines.push(``);
    lines.push(`💬 Сообщение:`);
    lines.push(s.message);
  }

  lines.push(``);
  lines.push(`🕐 ${new Date().toISOString()}`);

  return lines.join("\n");
}

async function sendTelegram(text: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("❌ Telegram credentials missing. BOT_TOKEN:", !!TELEGRAM_BOT_TOKEN, "CHAT_ID:", !!TELEGRAM_CHAT_ID);
    return false;
  }

  console.log("📤 Sending to Telegram, chat_id:", TELEGRAM_CHAT_ID);

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
      console.warn("⚠️ Telegram delivery failed — lead logged above");
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
