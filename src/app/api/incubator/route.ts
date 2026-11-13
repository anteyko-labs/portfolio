import { NextRequest, NextResponse } from "next/server";

// Applications to the IT incubator (/incubator). Students, not clients, so they
// skip the CRM and go to their own Telegram group and, when it is set up, to a
// Google Sheet through an Apps Script web app.
//
// Env:
//   INCUBATOR_TELEGRAM_CHAT_ID  group for applications (default: the incubator group below)
//   INCUBATOR_SHEET_URL         Apps Script /exec URL that appends a row (optional)
//   TELEGRAM_BOT_TOKEN          the site's existing bot
//   TELEGRAM_CHAT_ID            the site's lead chat, used only if the group is unreachable

// Telegram group "tt" for incubator applications. A chat ID is not a secret;
// it lives here because the Vercel env of this project is not editable by
// everyone who maintains the page.
const INCUBATOR_GROUP_ID = "-5413215005";

const BOT = process.env.TELEGRAM_BOT_TOKEN || "";
const CHAT = process.env.INCUBATOR_TELEGRAM_CHAT_ID || INCUBATOR_GROUP_ID;
const FALLBACK_CHAT = process.env.TELEGRAM_CHAT_ID || "";
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

type TgResult = { ok: boolean; migrateTo?: number; error?: string };

async function send(chatId: string | number, text: string): Promise<TgResult> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok && data.ok !== false, migrateTo: data.parameters?.migrate_to_chat_id, error: data.description };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

async function toTelegram(text: string): Promise<boolean> {
  if (!BOT) return false;
  let r = await send(CHAT, text);
  // A basic group gets a new ID when Telegram upgrades it to a supergroup
  if (!r.ok && r.migrateTo) {
    console.warn(`incubator: group moved to ${r.migrateTo}, update INCUBATOR_GROUP_ID`);
    r = await send(r.migrateTo, text);
  }
  if (r.ok) return true;
  console.error("incubator: group unreachable:", r.error);
  // Bot removed from the group or similar: keep the lead in the site's lead chat
  if (FALLBACK_CHAT && FALLBACK_CHAT !== CHAT) {
    return (await send(FALLBACK_CHAT, `⚠️ Группа инкубатора недоступна (${esc(r.error ?? "?")}), заявка пришла сюда.\n\n${text}`)).ok;
  }
  return false;
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
