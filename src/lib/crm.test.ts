// npm test runs this with node --test. Node 22.18+ strips the types without
// checking them, and nothing else checks them either: next build skips type
// errors in *.test.* files, and tsconfig.json excludes them only so that a bare
// `tsc` does not stop at the "./crm.ts" import (TS5097). No dependency needed.
//
// No request leaves the process: fetch is mocked in every test that sends, and
// CRM_BASE_URL points at the reserved .test domain, which never resolves.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const IDENT = "inbox-ident-secret";
process.env.CRM_INBOX_IDENTIFIER = IDENT;
process.env.CRM_BASE_URL = "https://crm.test";
delete process.env.CRM_INBOX_HMAC_TOKEN;
// crm.ts reads the environment when it loads, so it is imported after the setup above.
const { toE164, submitLeadToCrm } = await import("./crm.ts");

// Chatwoot's Contact#phone_number format, verbatim. Ruby's \z is JS's $ without the m flag.
const CHATWOOT_PHONE = /\+[1-9]\d{1,14}$/;

const recognised: Record<string, [string, string][]> = {
  "+996 with spaces, brackets and dashes": [
    ["+996 700 123 456", "+996700123456"],
    ["+996 (700) 12-34-56", "+996700123456"],
    ["+996-555-12-34-56", "+996555123456"],
    ["+996700123456", "+996700123456"],
    ["\u00a0+996\u00a0555\u00a0123\u00a0456\u00a0", "+996555123456"], // NBSP from a copy-paste
    ["+996 0700 123 456", "+996700123456"], // the trunk 0 kept after the country code
  ],
  "national format with 0": [
    ["0700 123 456", "+996700123456"], // the 21.10.2026 shape
    ["0700123456", "+996700123456"],
    ["(0555) 12-34-56", "+996555123456"],
    ["0 (312) 12-34-56", "+996312123456"], // Bishkek landline
    ["0312/12-34-56", "+996312123456"],
  ],
  "9 digits without a code": [
    ["700 123 456", "+996700123456"],
    ["555123456", "+996555123456"],
    ["996 123 456", "+996996123456"], // MegaCom's 99x range, not a country code
  ],
  "996 without the plus": [
    ["996700123456", "+996700123456"],
    ["996 700 123 456", "+996700123456"],
    ["996 0700 123 456", "+996700123456"],
  ],
  "00 instead of the plus": [
    ["00996700123456", "+996700123456"],
    ["00 996 (700) 123-456", "+996700123456"],
    ["00 7 912 345 67 89", "+79123456789"],
    ["001 415 555 0100", "+14155550100"],
  ],
  "full-width, Arabic-Indic and Persian digits": [
    ["０７００ １２３ ４５６", "+996700123456"],
    ["＋９９６\u3000７００\u3000１２３\u3000４５６", "+996700123456"], // full-width plus and ideographic spaces
    ["٠٧٠٠١٢٣٤٥٦", "+996700123456"],
    ["+٩٩٦ ٧٠٠ ١٢٣ ٤٥٦", "+996700123456"],
    ["۰۷۰۰۱۲۳۴۵۶", "+996700123456"],
  ],
  "+7 and 8: Russia and Kazakhstan": [
    ["8 (912) 345-67-89", "+79123456789"],
    ["89123456789", "+79123456789"],
    ["+7 912 345 67 89", "+79123456789"],
    ["7 912 345-67-89", "+79123456789"],
    ["+7 (912) 345\u201367\u201389", "+79123456789"], // en dashes from a word processor
    ["8 800 555 35 35", "+78005553535"],
    ["+7 777 123 45 67", "+77771234567"],
    ["8 701 123 45 67", "+77011234567"],
  ],
  "other countries, written with +": [
    ["+1 (415) 555-0100", "+14155550100"],
    ["+90 532 123 45 67", "+905321234567"],
    ["+86 138 0013 8000", "+8613800138000"],
    ["+44 20 7946 0958", "+442079460958"],
    ["+971 50 123 4567", "+971501234567"],
    ["+84 912 345 678", "+84912345678"], // +8 and 10 digits is Vietnam, not a mistyped +7
  ],
  "a number with words around it": [
    ["tel: +996 700 123 456", "+996700123456"],
    ["0700 123 456 (WhatsApp)", "+996700123456"],
  ],
};

const unrecognised: [string, string][] = [
  ["", "empty"],
  ["   ", "spaces only"],
  ["+", "a lone plus"],
  ["123", "too short for anything"],
  ["telegram @someone", "no digits"],
  ["пишите в телеграм", "no digits, Cyrillic"],
  ["+996 700 123 45", "+996 one digit short"],
  ["+996 700 123 4567", "+996 one digit long"],
  ["0700 123 45", "national one digit short"],
  ["070 123 456", "9 digits that start with the trunk 0"],
  ["+996 012 345 678", "+996 followed by 0"],
  ["+7 912 345 67 8", "+7 one digit short"],
  ["8 912 345 67 8", "8 and only 9 digits"],
  ["+7 012 345 67 89", "+7 followed by 0"],
  ["912 345 67 89", "Russian without 8 or +7: 10 digits, country unknown"],
  ["05321234567", "Turkish national format: 11 digits after 0, country unknown"],
  ["+0 700 123 456", "country code 0"],
  ["+12345", "too short for E.164"],
  ["+1234567890123456", "16 digits, longer than E.164 allows"],
  ["0700 123 456, 0555 123 456", "two numbers in one field"],
  ["+996 700 123 456 / +996 555 123 456", "two international numbers"],
  ["+1 415 555 0100 +1 415 555 0101", "two numbers with a + in the middle"],
  ["0700 123 45 доб. 2", "an extension whose digit would complete someone else's number"],
  ["0700 123 456 #2", "an extension after #"],
  ["+1 (415) 555-0100 ext. 12", "an extension in English"],
];

for (const [group, rows] of Object.entries(recognised)) {
  test(`toE164: ${group}`, () => {
    for (const [raw, want] of rows) assert.equal(toE164(raw), want, JSON.stringify(raw));
  });
}

test("toE164: garbage and incomplete numbers give null", () => {
  for (const [raw, why] of unrecognised) assert.equal(toE164(raw), null, `${JSON.stringify(raw)}: ${why}`);
  assert.equal(toE164(undefined), null);
  assert.equal(toE164(null), null);
});

test("toE164 never returns a number the CRM would refuse, and is idempotent", () => {
  // A seeded generator keeps the run reproducible: digits mixed with what people type around them.
  let seed = 2026_10_21;
  const next = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31;
  const alphabet = "0123456789000777888999+ ()-.\u00a0０٧۷x";
  const inputs = [
    ...Object.values(recognised).flat().map(([raw]) => raw),
    ...unrecognised.map(([raw]) => raw),
    ...Array.from({ length: 5000 }, () =>
      Array.from({ length: 1 + Math.floor(next() * 20) }, () => alphabet[Math.floor(next() * alphabet.length)]).join("")),
  ];
  let accepted = 0;
  for (const raw of inputs) {
    const got = toE164(raw);
    if (got === null) continue;
    accepted++;
    assert.match(got, CHATWOOT_PHONE, JSON.stringify(raw));
    assert.match(got, /^\+[1-9]\d{6,14}$/, JSON.stringify(raw));
    assert.equal(toE164(got), got, `not idempotent for ${JSON.stringify(raw)}`);
  }
  assert.ok(accepted > 100, `only ${accepted} inputs were recognised: the generator is not exercising toE164`);
});

type Call = { path: string; body: Record<string, unknown> };

/** A CRM that checks phone_number the way Chatwoot does and records every request. */
function fakeCrm() {
  const calls: Call[] = [];
  const fetch = async (url: string | URL, init?: RequestInit) => {
    const path = new URL(String(url)).pathname;
    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    calls.push({ path, body });
    const reply = (status: number, payload: unknown) =>
      new Response(JSON.stringify(payload), { status, headers: { "Content-Type": "application/json" } });
    if (path.endsWith("/contacts")) {
      if (body.phone_number !== undefined && !CHATWOOT_PHONE.test(String(body.phone_number))) {
        return reply(422, { message: "Phone number should be in e164 format", attributes: ["phone_number"] });
      }
      return reply(200, { source_id: body.source_id, id: 7 });
    }
    if (path.endsWith("/conversations")) return reply(200, { id: 42 });
    return reply(200, { id: 1, content: body.content });
  };
  return { calls, fetch };
}

const lead = (phone?: string) => ({ name: "Тест", email: "Lead@Example.com ", phone, message: "Заявка с сайта" });
const MESSAGE_NOTE = "Телефон из формы (не распознан, в карточку не записан): ";

test("the 21.10.2026 lead: a national-format phone now reaches the CRM", async (t) => {
  const crm = fakeCrm();
  t.mock.method(globalThis, "fetch", crm.fetch);
  assert.deepEqual(await submitLeadToCrm(lead("0700 123 456")), { conversationId: 42 });
  assert.deepEqual(crm.calls.map((c) => c.path.split("/").pop()), ["contacts", "conversations", "messages"]);
  assert.equal(crm.calls[0].body.phone_number, "+996700123456");
  assert.equal(crm.calls[2].body.content, "Заявка с сайта", "a recognised phone adds nothing to the message");
});

test("every recognised shape is sent in E.164 and accepted", async (t) => {
  const crm = fakeCrm();
  t.mock.method(globalThis, "fetch", crm.fetch);
  for (const [raw, want] of Object.values(recognised).flat()) {
    crm.calls.length = 0;
    assert.deepEqual(await submitLeadToCrm(lead(raw)), { conversationId: 42 }, JSON.stringify(raw));
    assert.equal(crm.calls[0].body.phone_number, want, JSON.stringify(raw));
  }
});

test("an unrecognised phone stays out of the card and goes into the message", async (t) => {
  const crm = fakeCrm();
  t.mock.method(globalThis, "fetch", crm.fetch);
  assert.deepEqual(await submitLeadToCrm(lead("  0700 123 45\n доб. 2 ")), { conversationId: 42 });
  assert.equal("phone_number" in crm.calls[0].body, false);
  assert.equal(crm.calls[2].body.content, `Заявка с сайта\n\n${MESSAGE_NOTE}0700 123 45 доб. 2`);
});

test("a long unrecognised phone is cut to 64 characters in the message", async (t) => {
  const crm = fakeCrm();
  t.mock.method(globalThis, "fetch", crm.fetch);
  await submitLeadToCrm(lead("звоните ".repeat(20)));
  const content = String(crm.calls[2].body.content);
  assert.equal(content, `Заявка с сайта\n\n${MESSAGE_NOTE}${"звоните ".repeat(20).slice(0, 64)}…`);
});

test("no phone: the request contract is unchanged", async (t) => {
  const crm = fakeCrm();
  t.mock.method(globalThis, "fetch", crm.fetch);
  await submitLeadToCrm(lead());
  const [contact, conversation, message] = crm.calls;
  const sourceId = createHash("sha256").update("anteyko:v1:lead@example.com").digest("hex");
  assert.equal(contact.path, `/public/api/v1/inboxes/${IDENT}/contacts`);
  assert.deepEqual(contact.body, { source_id: sourceId, identifier: "lead@example.com", name: "Тест", email: "Lead@Example.com " });
  assert.equal(conversation.path, `/public/api/v1/inboxes/${IDENT}/contacts/${sourceId}/conversations`);
  assert.deepEqual(conversation.body, { custom_attributes: { anteyko_source: "website_form" } });
  assert.equal(message.path, `/public/api/v1/inboxes/${IDENT}/contacts/${sourceId}/conversations/42/messages`);
  assert.deepEqual(message.body, { content: "Заявка с сайта" });
});
