"use client";

import { useEffect } from "react";

// Sections, plus cards: a catalog grid is one tall section holding dozens of animated cards
const SELECTOR = "main section, main article, footer";

/**
 * Marks every page section that is out of view with data-offscreen="true";
 * globals.css pauses all CSS animations inside it. A phone otherwise keeps
 * dozens of infinite loops running on content nobody can see.
 */
export function OffscreenPause() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.removeAttribute("data-offscreen");
          else e.target.setAttribute("data-offscreen", "true");
        }
      },
      { rootMargin: "200px 0px" }
    );
    const seen = new Set<Element>();
    const scan = () => {
      // Drop sections that left the page so the observer doesn't keep them alive
      for (const el of seen) {
        if (!el.isConnected) {
          io.unobserve(el);
          seen.delete(el);
        }
      }
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };
    scan();
    // Client navigation swaps sections without remounting the layout
    let t = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(scan, 150);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(t);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
