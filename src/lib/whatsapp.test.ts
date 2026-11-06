// npm test runs this with node --test. Node 22.18+ strips the types without
// checking them, and nothing else checks them either: next build skips type
// errors in *.test.* files, and tsconfig.json excludes them only so that a bare
// `tsc` does not stop at the "./whatsapp.ts" import (TS5097). No dependency needed.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { WHATSAPP_NUMBER, WHATSAPP_URL } from "./whatsapp.ts";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const SELF = fileURLToPath(import.meta.url);

// The number WhatsApp banned in October 2026, written backwards so that this
// file does not itself contain it in any form the scan looks for.
const BANNED_DIGITS = [..."077081155"].reverse().join("");

/**
 * Text as a reader sees it. The repo writes no-break spaces and hyphens as
 * escapes in its sources and as entities in its pages, so JS escapes, URL
 * escapes and HTML entities are written out first, and full-width,
 * Arabic-Indic and Persian digits become ASCII.
 */
function plain(text: string): string {
  const char = (code: number) => (code <= 0x10ffff ? String.fromCodePoint(code) : " ");
  const url = (run: string) => {
    try {
      return decodeURIComponent(run);
    } catch {
      return " ";
    }
  };
  return text
    .replace(/\\u\{([\da-f]{1,6})\}|\\u([\da-f]{4})|\\x([\da-f]{2})/gi, (_, a, b, c) => char(parseInt(a ?? b ?? c, 16)))
    .replace(/(?:%[\da-f]{2})+/gi, url)
    .replace(/&#x([\da-f]{1,6});?|&#(\d{1,7});?/gi, (_, h, d) => char(h ? parseInt(h, 16) : Number(d)))
    .replace(/&[a-z][a-z\d]*;/gi, " ") // named entities: none of them stands for a digit
    .normalize("NFKC")
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

// Between two digits: up to four characters that are neither a letter nor a
// digit, whichever they are (spaces of every kind, dots, slashes, brackets,
// hyphens, dashes, minus signs, quotes, commas, invisible ones), or whole tags.
const SEP = String.raw`(?:[^\p{L}\p{N}]|<[^<>]*>){0,4}`;
const BANNED = new RegExp([...BANNED_DIGITS].join(SEP), "u");

// What the site is built and served from. messages/ does not exist today; it
// is listed so that next-intl message files are covered if they ever appear.
const SCANNED = ["src", "public", "messages"];
const TEXT = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".md", ".mdx", ".html", ".txt", ".css", ".svg", ".xml", ".webmanifest"]);

/** Text files under dir, as paths relative to the repo root. */
function textFiles(dir: string): string[] {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  return (readdirSync(abs, { recursive: true }) as string[])
    .map((p) => join(dir, p))
    // src/app/llms.txt/ is a directory: check the extension, then that it is a file.
    .filter((p) => TEXT.has(extname(p)) && statSync(join(ROOT, p)).isFile());
}

const texts = new Map<string, string>();

/** A file's text as a reader sees it (see plain), read once. */
function text(p: string): string {
  let t = texts.get(p);
  if (t === undefined) texts.set(p, (t = plain(readFileSync(join(ROOT, p), "utf8"))));
  return t;
}

test("the site's WhatsApp number is +996 709 927 895", () => {
  assert.equal(WHATSAPP_NUMBER, "996709927895");
  assert.equal(WHATSAPP_URL, "https://wa.me/996709927895");
});

test("the guard recognises the banned number however it is written", () => {
  const d = BANNED_DIGITS;
  const [a, b, c] = [d.slice(0, 3), d.slice(3, 6), d.slice(6)];
  const digitsFrom = (zero: number) => (s: string) => s.replace(/\d/g, (x) => String.fromCharCode(zero + Number(x)));
  const written = [
    `+996 ${a} ${b} ${c}`,
    `https://wa.me/996${d}`,
    `0${a} ${b.slice(0, 2)}-${b.slice(2)}${c.slice(0, 1)}-${c.slice(1)}`,
    `+996 (${a}) ${b}.${c}`,
    `+996\u00a0${a}\u00a0${b}\u2013${c}`,
    `0${a}&nbsp;${b}&nbsp;${c}`,
    // The escapes this repo's own sources and pages use, as they stand in the file.
    String.raw`"+996\u00a0${a}\u00a0${b}\u2011${c}"`,
    String.raw`"+996\u{a0}${a}\xa0${b} ${c}"`,
    `+996&#xa0;${a}&#160;${b}&#8209;${c}`,
    `tel:+996%20${a}%20${b}%20${c}`,
    // Other separators and markup between the groups.
    `${a}\u2212${b}\u2212${c}`,
    `${a}/${b}/${c}`,
    `+996 ${a} \u00b7 ${b} \u00b7 ${c}`,
    `${a}\u200b${b}\u200b${c}`,
    `<b>${a}</b> <span class="x">${b}</span>&nbsp;${c}`,
    `["${a}", "${b}", "${c}"]`,
    // Digits from other scripts.
    digitsFrom(0xff10)(`+996 ${a} ${b} ${c}`),
    digitsFrom(0x0660)(`+996 ${a} ${b} ${c}`),
    digitsFrom(0x06f0)(`+996 ${a} ${b} ${c}`),
  ];
  assert.deepEqual(written.filter((form) => !BANNED.test(plain(form))), []);
  assert.doesNotMatch(plain("+996 709 927 895"), BANNED);
  assert.doesNotMatch(plain(readFileSync(SELF, "utf8")), BANNED, "this file must not trip its own scan");
});

test("the banned number appears nowhere in src/, public/ or messages/", () => {
  const files = SCANNED.flatMap(textFiles);
  assert.ok(files.length > 100, `the scan found only ${files.length} files: is ROOT right?`);
  assert.deepEqual(files.filter((p) => BANNED.test(text(p))), []);
});

test("every WhatsApp link in src/ is built from src/lib/whatsapp.ts", () => {
  // Two separate constants are how the /contact card kept the banned number
  // after the floating button had been fixed.
  const link = /wa\.me\/|api\.whatsapp\.com\/send|whatsapp:\/\/send/i;
  const own = join("src", "lib", "whatsapp.ts");
  const hits = textFiles("src").filter((p) => p !== own && !p.endsWith(".test.ts") && link.test(text(p)));
  assert.deepEqual(hits, []);
});

test("no tel: link points at the WhatsApp number: it takes no calls", () => {
  // The number is on the WhatsApp Cloud API with no phone behind it, so a call
  // goes unanswered. The concept sites in public/demos/ used to offer one.
  const national = WHATSAPP_NUMBER.slice(-9);
  const calls = SCANNED.flatMap(textFiles).filter((p) =>
    [...text(p).matchAll(/tel:([+\d\s().-]*)/gi)].some(([, n]) => n.replace(/\D/g, "").endsWith(national)));
  assert.deepEqual(calls, []);
});

test("every wa.me link in public/ points at WHATSAPP_NUMBER", () => {
  // Static pages cannot import src/lib/whatsapp.ts; this keeps them in step with it.
  const stale = textFiles("public").filter((p) => [...text(p).matchAll(/wa\.me\/(\d+)/gi)].some(([, n]) => n !== WHATSAPP_NUMBER));
  assert.deepEqual(stale, []);
});
