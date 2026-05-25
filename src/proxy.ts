import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the middleware entry to proxy.ts. This handles locale
// negotiation and the as-needed /ru prefix. The matcher skips API routes,
// Next internals, and files with an extension (favicon, og images served as
// files, etc.).
export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
