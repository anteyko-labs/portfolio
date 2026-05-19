#!/usr/bin/env node
import { randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(__dirname, '..', 'data', 'kp-clients.json');

const TEMPLATES = ['courses', 'saas', 'mvp'];
const CURRENCIES = ['som', 'usd'];
const BASE_URL = process.env.KP_BASE_URL || 'https://anteyko.com';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      out[key] = true;
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

function usage() {
  console.log(`
Usage:
  npm run kp:new -- --client "<имя>" [options]

Options:
  --client       Имя клиента / компании (обязательно)
  --template     courses | saas | mvp (default: courses)
  --currency     som | usd (default: som)
  --valid-days   Срок действия в днях (default: 14)
  --intro        Персональный вступительный текст (опц., до 500 символов)
  --note         Заметка только для тебя (опц.)
  --token        Свой кастомный токен вместо случайного (опц.)

Examples:
  npm run kp:new -- --client "ACME Corp" --template courses --currency som
  npm run kp:new -- --client "Asel" --template saas --currency usd --valid-days 21
  npm run kp:new -- --client "Алибек" --intro "Привет, Алибек. Это предложение для запуска вашего курса по фронтенду."
`);
}

const args = parseArgs(process.argv.slice(2));

if (args.help || !args.client || typeof args.client === 'boolean') {
  usage();
  process.exit(args.help ? 0 : 1);
}

const template = args.template ?? 'courses';
const currency = args.currency ?? 'som';

if (!TEMPLATES.includes(template)) {
  console.error(`❌ Unknown template "${template}". Use: ${TEMPLATES.join(', ')}`);
  process.exit(1);
}
if (!CURRENCIES.includes(currency)) {
  console.error(`❌ Unknown currency "${currency}". Use: ${CURRENCIES.join(', ')}`);
  process.exit(1);
}

const validDays = Number(args['valid-days'] ?? 14);
if (!Number.isFinite(validDays) || validDays < 1) {
  console.error(`❌ --valid-days must be a positive number`);
  process.exit(1);
}

const validUntil = new Date(Date.now() + validDays * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

const token = (typeof args.token === 'string' ? args.token : null) ??
  randomBytes(9).toString('base64url');

let data;
try {
  data = JSON.parse(readFileSync(FILE, 'utf8'));
} catch (e) {
  console.error(`❌ Failed to read ${FILE}:`, e.message);
  process.exit(1);
}

if (data[token]) {
  console.error(`❌ Token "${token}" already exists. Try again or use --token to set a custom one.`);
  process.exit(1);
}

data[token] = {
  client: args.client,
  currency,
  template,
  validUntil,
  ...(args.intro && typeof args.intro === 'string'
    ? { intro: args.intro.slice(0, 500) }
    : {}),
  ...(args.note && typeof args.note === 'string' ? { note: args.note } : {}),
};

writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');

const url = `${BASE_URL}/kp/${token}`;

console.log(`
✓ КП создано

  Клиент:   ${args.client}
  Шаблон:   ${template}
  Валюта:   ${currency}
  Действует до: ${validUntil}
  Token:    ${token}

  Ссылка клиенту:
  ${url}

  ⚠ Не забудь закоммитить data/kp-clients.json и запушить:
  git add data/kp-clients.json && git commit -m "feat: add kp ${token}" && git push
`);
