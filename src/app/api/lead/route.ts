import { NextRequest, NextResponse } from "next/server";
import { submitLeadToCrm } from "@/lib/crm";
import { NEEDS, SPHERES } from "@/lib/lead-options";

// Leads from the ad landing /lead (Meta ads → business owners).
// Same delivery as /api/contact: CRM first, Telegram as a backup, the full
// lead in the Vercel logs in case both fail. The form has no email field, so
// the CRM contact is keyed by phone.

const BOT = process.env.TELEGRAM_BOT_TOKEN || "";
const CHAT = process.env.TELEGRAM_CHAT_ID || "";

const TRACK_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "src"] as const;

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

interface Lead {
  name: string;
  phone: string;
  company: string;
  sphere: string;
  need: string;
  track: Record<string, string>;
  landing: string;
  referrer: string;
}

function parse(body: Record<string, unknown>): Lead {
  const raw = (body.track && typeof body.track === "object" ? body.track : {}) as Record<string, unknown>;
  const track: Record<string, string> = {};
  for (const k of TRACK_KEYS) {
    const v = clip(raw[k], 200);
    if (v) track[k] = v;
  }
  return {
    name: clip(body.name, 120),
    phone: clip(body.phone, 24),
    company: clip(body.company, 160),
    sphere: clip(body.sphere, 60),
    need: clip(body.need, 80),
    track,
    landing: clip(body.landing, 300),
    referrer: clip(body.referrer, 300),
  };
}

function crmText(l: Lead): string {
  const L = ["Заявка с рекламного лендинга anteyko.com/lead", ""];
  L.push(`Сфера бизнеса: ${l.sphere}`);
  L.push(`Что беспокоит: ${l.need}`);
  if (l.company) L.push(`Компания: ${l.company}`);
  const utm = Object.entries(l.track).map(([k, v]) => `${k}=${v}`);
  if (utm.length) L.push("", `UTM: ${utm.join(" · ")}`);
  if (l.referrer) L.push(`Откуда пришёл: ${l.referrer}`);
  return L.join("\n");
}

function telegramText(l: Lead): string {
  const L = ["🎯 Заявка с рекламы (anteyko.com/lead)", ""];
  L.push(`👤 Имя: ${l.name}`);
  L.push(`📱 Телефон: ${l.phone}`);
  if (l.company) L.push(`🏢 Компания: ${l.company}`);
  L.push(`📦 Сфера: ${l.sphere}`);
  L.push(`❗ Беспокоит: ${l.need}`);
  if (Object.keys(l.track).length) {
    const t = l.track;
    L.push("", `📡 UTM: ${t.utm_source || t.src || "—"} / ${t.utm_medium || "—"} / ${t.utm_campaign || "—"}`);
    const extra = [t.utm_content && `content=${t.utm_content}`, t.utm_term && `term=${t.utm_term}`].filter(Boolean);
    if (extra.length) L.push(`   ${extra.join(" · ")}`);
  }
  L.push("", `🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Bishkek", dateStyle: "short", timeStyle: "short" })} (Бишкек)`);
  return L.join("\n");
}

async function sendTelegram(text: string): Promise<boolean> {
  if (!BOT || !CHAT) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT, text, disable_web_page_preview: true }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Soft per-instance limit: 5 leads per IP per 10 minutes
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot and a minimum fill time: bots get a fake success
  if (clip(body.website, 200) || (typeof body.elapsed === "number" && body.elapsed < 2500)) {
    return NextResponse.json({ success: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const lead = parse(body);
  const digits = lead.phone.replace(/\D/g, "").length;
  const known = (list: readonly string[], v: string) => list.includes(v);
  if (!lead.name || digits < 9 || digits > 15 || !known(SPHERES, lead.sphere) || !known(NEEDS, lead.need) || body.consent !== true) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  console.log("📩 Lead (/lead):", JSON.stringify(lead));

  const [crm, telegram] = await Promise.allSettled([
    submitLeadToCrm({ name: lead.name, email: "", phone: lead.phone, message: crmText(lead) }),
    sendTelegram(telegramText(lead)),
  ]);
  const tgOk = telegram.status === "fulfilled" && telegram.value;

  if (!(crm.status === "fulfilled" && crm.value)) {
    const reason =
      crm.status === "rejected" ? (crm.reason instanceof Error ? crm.reason.message : "неизвестная ошибка") : "не настроено";
    console.error("❌ CRM: заявка /lead не доехала —", reason);
    await sendTelegram(
      tgOk
        ? `⚠️ Заявка выше от ${lead.name} (${lead.phone}) НЕ попала в CRM: ${reason}. Заведите её вручную.`
        : `⚠️ Заявка от ${lead.name} (${lead.phone}) НЕ попала в CRM: ${reason}. Полный текст в логах Vercel.`,
    );
  }

  return NextResponse.json({ success: true });
}
