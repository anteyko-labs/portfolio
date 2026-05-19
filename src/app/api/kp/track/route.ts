import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

const OPEN_COOLDOWN_MS = 5 * 60 * 1000;   // open: 5 минут
const CLICK_COOLDOWN_MS = 60 * 1000;      // click: 1 минута на один target
const recentNotifications = new Map<string, number>();

type TrackEvent = 'open' | 'click';
type ClickTarget = 'plan' | 'footer' | 'sticky';

type TrackPayload = {
  event?: TrackEvent;
  target?: ClickTarget;
  planId?: string | null;
  planName?: string | null;
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

const TARGET_LABELS: Record<ClickTarget, string> = {
  plan: 'кнопка пакета',
  footer: 'кнопка в футере',
  sticky: 'sticky-кнопка',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatOpenMessage(p: TrackPayload, ip: string, ua: string): string {
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

function formatClickMessage(p: TrackPayload): string {
  const target = p.target ? TARGET_LABELS[p.target] : 'неизвестно';
  const lines = [
    '🖱 <b>Клик в КП → Telegram</b>',
    '',
    `👤 Клиент: <b>${escapeHtml(p.client ?? '—')}</b>`,
    `📄 Документ: <code>${escapeHtml(p.documentId ?? '—')}</code>`,
    `🎯 Цель: ${escapeHtml(target)}`,
  ];
  if (p.target === 'plan' && p.planName) {
    lines.push(`📦 Пакет: <b>${escapeHtml(p.planName)}</b> (${escapeHtml(p.planId ?? '')})`);
  }
  if (p.slug) lines.push(`🔗 Slug: <code>${escapeHtml(p.slug)}</code>`);
  lines.push('');
  lines.push(
    `🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Bishkek', dateStyle: 'short', timeStyle: 'short' })} (Бишкек)`
  );
  lines.push('');
  lines.push('<i>Клиент должен сейчас писать в Telegram. Если не пришло — возможно передумал.</i>');
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

  const event: TrackEvent = payload.event === 'click' ? 'click' : 'open';

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '';
  const ua = req.headers.get('user-agent') || '';

  if (/bot|preview|crawler|spider|fetch|whatsapp|telegrambot|facebookexternalhit/i.test(ua)) {
    return NextResponse.json({ ok: true, skipped: 'bot' });
  }

  const cooldownMs = event === 'click' ? CLICK_COOLDOWN_MS : OPEN_COOLDOWN_MS;
  const cooldownKey =
    event === 'click'
      ? `click|${payload.slug ?? payload.documentId ?? 'anon'}|${payload.target ?? ''}|${payload.planId ?? ''}|${ip}`
      : `open|${payload.slug ?? payload.documentId ?? 'anon'}|${ip}`;

  const now = Date.now();
  const last = recentNotifications.get(cooldownKey);
  if (last && now - last < cooldownMs) {
    return NextResponse.json({ ok: true, skipped: 'cooldown' });
  }
  recentNotifications.set(cooldownKey, now);

  if (recentNotifications.size > 500) {
    for (const [k, v] of recentNotifications) {
      if (now - v > OPEN_COOLDOWN_MS) recentNotifications.delete(k);
    }
  }

  const message =
    event === 'click' ? formatClickMessage(payload) : formatOpenMessage(payload, ip, ua);
  const sent = await sendTelegram(message);

  console.log(`[kp/track:${event}]`, {
    slug: payload.slug,
    client: payload.client,
    documentId: payload.documentId,
    target: payload.target,
    planId: payload.planId,
    ip,
    sent,
  });

  return NextResponse.json({ ok: true, sent });
}
