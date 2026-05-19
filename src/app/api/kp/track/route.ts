import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

const COOLDOWN_MS = 5 * 60 * 1000; // 5 минут — не спамим в Telegram при перезагрузках
const recentNotifications = new Map<string, number>();

type TrackPayload = {
  slug?: string | null;
  client?: string;
  documentId?: string;
  template?: string;
  currency?: string;
  url?: string;
  referrer?: string | null;
};

const TEMPLATE_LABELS: Record<string, string> = {
  courses: 'Telegram-бот для курсов',
  saas: 'MVP SaaS',
  mvp: 'MVP стартапа',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatMessage(p: TrackPayload, ip: string, ua: string): string {
  const template = p.template ? (TEMPLATE_LABELS[p.template] ?? p.template) : '—';
  const lines = [
    '👀 <b>Клиент открыл КП</b>',
    '',
    `👤 Клиент: <b>${escapeHtml(p.client ?? '—')}</b>`,
    `📄 Документ: <code>${escapeHtml(p.documentId ?? '—')}</code>`,
    `📦 Шаблон: ${escapeHtml(template)}`,
    `💱 Валюта: ${escapeHtml(p.currency ?? '—')}`,
  ];
  if (p.slug) lines.push(`🔗 Slug: <code>${escapeHtml(p.slug)}</code>`);
  if (p.url) lines.push(`🌐 URL: ${escapeHtml(p.url)}`);
  if (p.referrer) lines.push(`↩️ С: ${escapeHtml(p.referrer)}`);
  if (ip) lines.push(`🖥 IP: <code>${escapeHtml(ip)}</code>`);
  if (ua) lines.push(`🤖 UA: ${escapeHtml(ua.slice(0, 120))}`);
  lines.push('');
  lines.push(
    `🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bishkek', dateStyle: 'short', timeStyle: 'short' })} (Бишкек)`
  );
  return lines.join('\n');
}

async function sendTelegram(text: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let payload: TrackPayload = {};
  try {
    payload = (await req.json()) as TrackPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '';
  const ua = req.headers.get('user-agent') || '';

  // Дроп ботов и preview-ботов (Telegram, Slack, WhatsApp превью-роботы)
  if (/bot|preview|crawler|spider|fetch|whatsapp|telegrambot|facebookexternalhit/i.test(ua)) {
    return NextResponse.json({ ok: true, skipped: 'bot' });
  }

  // Cooldown — один открыватель не спамит в Telegram при перезагрузках
  const cooldownKey = `${payload.slug ?? payload.documentId ?? 'anon'}|${ip}`;
  const now = Date.now();
  const last = recentNotifications.get(cooldownKey);
  if (last && now - last < COOLDOWN_MS) {
    return NextResponse.json({ ok: true, skipped: 'cooldown' });
  }
  recentNotifications.set(cooldownKey, now);

  // Простая очистка старых записей
  if (recentNotifications.size > 500) {
    for (const [k, v] of recentNotifications) {
      if (now - v > COOLDOWN_MS) recentNotifications.delete(k);
    }
  }

  const message = formatMessage(payload, ip, ua);
  const sent = await sendTelegram(message);

  console.log('[kp/track]', {
    slug: payload.slug,
    client: payload.client,
    documentId: payload.documentId,
    template: payload.template,
    ip,
    sent,
  });

  return NextResponse.json({ ok: true, sent });
}
