#!/usr/bin/env node
// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver…) that the site's
// pages changed, so they recrawl within hours instead of days. Bing's index also
// feeds ChatGPT search and Copilot. Runs from .github/workflows/indexnow.yml after
// every successful production deploy; safe to run by hand: `node scripts/indexnow.mjs`.
//
// The key is public by design: IndexNow checks ownership by fetching
// https://www.anteyko.com/<key>.txt, which lives in public/.

const SITE = "https://www.anteyko.com";
const KEY = "6a1357065aa35833088e8d760b2f794a";

const res = await fetch(`${SITE}/sitemap.xml`);
if (!res.ok) throw new Error(`sitemap.xml: HTTP ${res.status}`);
const xml = await res.text();
const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))];
urls.push(`${SITE}/llms.txt`, `${SITE}/llms-full.txt`);

const ping = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "www.anteyko.com", key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});

// 200 = accepted, 202 = accepted, key check pending
console.log(`IndexNow: ${ping.status} ${ping.statusText} for ${urls.length} URLs`);
if (ping.status !== 200 && ping.status !== 202) {
  console.error(await ping.text());
  process.exit(1);
}
