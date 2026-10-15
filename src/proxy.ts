import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the middleware entry to proxy.ts.
// 1. Scrapers, site downloaders, headless browsers and SEO crawlers get a 403 on
//    pages and on the /demos sites. Search engines, AI assistants' crawlers
//    (GPTBot, ClaudeBot, PerplexityBot…) and link-preview bots pass. Images and other files
//    are not filtered: the image optimizer fetches them internally without a
//    browser user agent.
// 2. Pages then go through next-intl for locale negotiation and the as-needed
//    prefix (/ru, /zh, /tr, /ar). API routes and files skip that step.
const intl = createMiddleware(routing);

const BLOCKED = new RegExp(
  [
    "curl", "wget", "httpie", "python", "aiohttp", "httpx", "scrapy", "go-http-client", "java/", "okhttp",
    "node-fetch", "axios", "undici", "libwww", "lwp::", "mechanize", "httrack", "webcopier", "webzip",
    "teleport", "offline explorer", "sitesucker", "website downloader", "headlesschrome", "phantomjs",
    "puppeteer", "playwright", "selenium", "imagesiftbot", "omgili", "ahrefsbot", "semrushbot", "mj12bot", "dotbot", "petalbot", "dataforseobot",
    "blexbot", "zoominfobot", "screaming frog",
  ].join("|"),
  "i"
);

const NOT_A_PAGE = /^\/(api|trpc|_next|_vercel)(\/|$)|\.[^/]+$/;

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ua = req.headers.get("user-agent") ?? "";
  const filtered = !NOT_A_PAGE.test(pathname) || pathname.startsWith("/demos/");
  if (filtered && (!ua.trim() || BLOCKED.test(ua))) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  if (NOT_A_PAGE.test(pathname)) return NextResponse.next();
  return intl(req);
}

export const config = {
  // everything except Next's own build assets and image optimizer
  matcher: "/((?!_next/static|_next/image).*)",
};
