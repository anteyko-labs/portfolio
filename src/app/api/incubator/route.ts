import { NextRequest, NextResponse } from "next/server";

// Applications to the IT incubator (/incubator). Students, not clients, so they
// skip the CRM and go to their own Telegram chat and, when it is set up, to a
// Google Sheet through an Apps Script web app (docs/incubator.md).
//
// Env:
//   INCUBATOR_TELEGRAM_CHAT_ID  chat for applications; falls back to TELEGRAM_CHAT_ID
//   INCUBATOR_SHEET_URL         Apps Script /exec URL that appends a row (optional)
//   TELEGRAM_BOT_TOKEN          the site's existing bot

const BOT = process.env.TELEGRAM_BOT_TOKEN || "";
const CHAT = process.env.INCUBATOR_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID || "";
const SHEET = process.env.INCUBATOR_SHEET_URL || "";

const INTERESTS: Record<string, string> = {
  architecture: "Системная архитектура",
  devops: "DevOps",
  mvp: "MVP / продукт",
};
const LEVELS: Record<string, string> = {
  zero: "С нуля",
  basics: "Знаю основы",
  projects: "Есть свои проекты",
  work: "Уже работал(а)",
};
const JOB: Record<string, string> = {
  yes: "Да, ищет работу или стажировку",
  later: "Позже",
  no: "Нет, пока учится",
};

const FIELDS = ["name", "telegram", "phone", "university", "course", "specialty", "level", "job", "goals", "portfolio", "heard", "src"] as const;
type Field = (typeof FIELDS)[number];
export type IncubatorApplication = Record<Field, string> & { interests: string[] };

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function parse(body: Record<string, unknown>): IncubatorApplication {
  const out = {} as IncubatorApplication;
  for (const f of FIELDS) out[f] = clip(body[f], f === "goals" ? 1500 : 200);
  out.telegram = out.telegram.replace(/^https?:\/\/t\.me\//i, "").replace(/^@?/, out.telegram ? "@" : "");
  out.interests = Array.isArray(body.interests) ? body.interests.filter((i): i is string => typeof i === "string" && i in INTERESTS) : [];
  return out;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function telegramText(a: IncubatorApplication): string {
  const L: string[] = ["🎓 <b>Заявка в IT-инкубатор</b>", ""];
  const row = (k: string, v: string) => v && L.push(`<b>${k}:</b> ${esc(v)}`);
  row("Имя", a.name);
  row("Telegram", a.telegram);
  row("Телефон", a.phone);
  row("Вуз", a.university);
  row("Курс", a.course);
  row("Специальность", a.specialty);
  row("Направления", a.interests.map((i) => INTERESTS[i]).join(", "));
  row("Уровень", LEVELS[a.level] ?? a.level);
  row("Работа", JOB[a.job] ?? a.job);
  row("Портфолио", a.portfolio);
  row("Откуда узнал", a.heard);
  if (a.goals) L.push("", "<b>Ожидания:</b>", esc(a.goals));
  L.push("", `📍 src: ${esc(a.src || "—")}`);
  L.push(`🕐 ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Bishkek", dateStyle: "short", timeStyle: "short" })} (Бишкек)`);
  return L.join("\n");
}

async function toTelegram(text: string): Promise<boolean> {
  if (!BOT || !CHAT) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    return res.ok;
  } catch (e) {
    console.error("incubator: telegram error", e);
    return false;
  }
}

async function toSheet(a: IncubatorApplication): Promise<boolean> {
  if (!SHEET) return false;
  try {
    // Apps Script answers POST with a 302 to the result; fetch follows it.
    const res = await fetch(SHEET, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        ...a,
        interests: a.interests.map((i) => INTERESTS[i]).join(", "),
        level: LEVELS[a.level] ?? a.level,
        job: JOB[a.job] ?? a.job,
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("incubator: sheet error", e);
    return false;
  }
}

// Soft per-instance limit: 5 applications per IP per 10 minutes
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

  // Honeypot and a minimum fill time (bots submit instantly)
  if (clip(body.website, 200) || (typeof body.elapsed === "number" && body.elapsed < 2500)) {
    return NextResponse.json({ success: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const a = parse(body);
  if (!a.name || (!a.telegram && !a.phone) || !a.university || body.consent !== true) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // The full application is always in the Vercel logs, so nothing is lost if both channels fail
  console.log("incubator application", JSON.stringify(a));

  const [tg, sheet] = await Promise.all([toTelegram(telegramText(a)), toSheet(a)]);
  if (!tg && !sheet) console.warn("incubator: not delivered to Telegram or Sheet, see the log line above");

  return NextResponse.json({ success: true });
}
