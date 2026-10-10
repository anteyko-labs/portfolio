"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";

type Phase = "idle" | "in" | "out";

const WORD = { en: "Cases", ru: "Кейсы", zh: "案例", tr: "Projeler", ar: "المشاريع" };

/**
 * "Portal" page transition: any link with [data-portal] opens a dark circle
 * from the click point, the page changes underneath, then the curtain slides up.
 */
export function PortalTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const target = useRef<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[data-portal]") as HTMLAnchorElement | null;
      if (!a || reduce) return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      // next-intl paths are locale-free: strip the /ru, /zh… prefix the Link rendered
      const path = a.getAttribute("href")!.replace(/^\/(ru|zh|tr|ar)(?=\/|$)/, "") || "/";
      target.current = path;
      setOrigin({ x: (e.clientX / window.innerWidth) * 100 || 50, y: (e.clientY / window.innerHeight) * 100 || 50 });
      setPhase("in");
      window.setTimeout(() => router.push(path), 720);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // the new page has rendered — lift the curtain
  useEffect(() => {
    if (phase !== "in" || !target.current || pathname !== target.current) return;
    window.scrollTo(0, 0);
    const a = window.setTimeout(() => setPhase("out"), 160);
    const b = window.setTimeout(() => {
      setPhase("idle");
      target.current = null;
    }, 1200);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [pathname, phase]);

  if (phase === "idle") return null;
  return (
    <div
      className={`portal-curtain portal-curtain--${phase}`}
      style={{ ["--x" as string]: origin.x + "%", ["--y" as string]: origin.y + "%" }}
      aria-hidden="true"
    >
      <span className="portal-curtain__ring" />
      <span className="portal-curtain__ring portal-curtain__ring--2" />
      <span className="portal-curtain__word">
        <span>{pick(WORD, language)}</span>
      </span>
    </div>
  );
}
