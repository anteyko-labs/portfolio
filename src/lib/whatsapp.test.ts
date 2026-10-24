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

// The number WhatsApp banned in October 2026, spelled digit by digit so that
// this file does not itself contain it in any form the scan looks for.
const BANNED_DIGITS = [5, 5, 1, 1, 8, 0, 7, 7, 0];
// Whatever people and markup put between digits: spaces (NBSP included), dots,
// brackets, hyphens and dashes, and the &nbsp; entity the HTML demos use.
const SEP = String.raw`(?:[\s.()\-\u2010-\u2015]|&nbsp;|&#160;)*`;
const BANNED = new RegExp(BANNED_DIGITS.join(SEP));

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

const read = (p: string) => readFileSync(join(ROOT, p), "utf8");

test("the site's WhatsApp number is +996 709 927 895", () => {
  assert.equal(WHATSAPP_NUMBER, "996709927895");
  assert.equal(WHATSAPP_URL, "https://wa.me/996709927895");
});

test("the guard recognises the banned number however it is written", () => {
  const d = BANNED_DIGITS.join("");
  const written = [
    `+996 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`,
    `https://wa.me/996${d}`,
    `0${d.slice(0, 3)} ${d.slice(3, 5)}-${d.slice(5, 7)}-${d.slice(7)}`,
    `+996 (${d.slice(0, 3)}) ${d.slice(3, 6)}.${d.slice(6)}`,
    `+996\u00a0${d.slice(0, 3)}\u00a0${d.slice(3, 6)}\u2013${d.slice(6)}`,
    `0${d.slice(0, 3)}&nbsp;${d.slice(3, 6)}&nbsp;${d.slice(6)}`,
  ];
  for (const form of written) assert.match(form, BANNED, form);
  assert.doesNotMatch("+996 709 927 895", BANNED);
  assert.doesNotMatch(readFileSync(SELF, "utf8"), BANNED, "this file must not trip its own scan");
});

test("the banned number appears nowhere in src/, public/ or messages/", () => {
  const files = SCANNED.flatMap(textFiles);
  assert.ok(files.length > 100, `the scan found only ${files.length} files: is ROOT right?`);
  assert.deepEqual(files.filter((p) => BANNED.test(read(p))), []);
});

test("every WhatsApp link in src/ is built from src/lib/whatsapp.ts", () => {
  // Two separate constants are how the /contact card kept the banned number
  // after the floating button had been fixed.
  const link = /wa\.me\/|api\.whatsapp\.com\/send|whatsapp:\/\/send/i;
  const own = join("src", "lib", "whatsapp.ts");
  const hits = textFiles("src").filter((p) => p !== own && !p.endsWith(".test.ts") && link.test(read(p)));
  assert.deepEqual(hits, []);
});
