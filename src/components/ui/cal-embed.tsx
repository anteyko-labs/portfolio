"use client";

import { useEffect } from "react";

// Cal.com exposes a global `Cal` function once its embed bootstrap runs. The
// embed API ships no first-party types, so we keep the typing loose but
// contained to this module — the rest of the app stays strict.
interface CalGlobal {
  (...args: unknown[]): void;
  ns: Record<string, (...args: unknown[]) => void>;
  loaded?: boolean;
  config?: { forwardQueryParams?: boolean };
}

declare global {
  interface Window {
    Cal?: CalGlobal;
  }
}

const CAL_NAMESPACE = "45min";
const CAL_LINK = "anteyko-labs/45min";
const CAL_ORIGIN = "https://app.cal.com";
const CAL_EMBED_SRC = "https://app.cal.com/embed/embed.js";
const ELEMENT_ID = "my-cal-inline-45min";

// Standard Cal.com embed bootstrap (the official IIFE) translated to a typed,
// idempotent loader. When `window.Cal` already exists we reuse it instead of
// injecting a second <script>, so the inline embed survives React re-mounts
// (e.g. StrictMode in dev).
function ensureCalLoaded(): CalGlobal {
  const w = window as Window & typeof globalThis;
  if (w.Cal) return w.Cal;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  (function (C: any, A: string, L: string) {
    const p = function (a: any, ar: any) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        // eslint-disable-next-line prefer-rest-params
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            // eslint-disable-next-line prefer-rest-params
            p(api, arguments);
          } as any;
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
  })(w, CAL_EMBED_SRC, "init");
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return w.Cal as unknown as CalGlobal;
}

/**
 * Renders Cal.com's official inline embed for the "45min" event type under the
 * "anteyko-labs" team. Loads the embed script with a plain loader (no
 * @calcom/embed-react dependency) and mounts the booking calendar into a
 * fixed-id container. Light-styled to match the contact page.
 */
export function CalEmbed() {
  useEffect(() => {
    const Cal = ensureCalLoaded();

    Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    Cal.ns[CAL_NAMESPACE]("inline", {
      elementOrSelector: `#${ELEMENT_ID}`,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: CAL_LINK,
    });
    Cal.ns[CAL_NAMESPACE]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <div
      id={ELEMENT_ID}
      className="w-full min-h-[620px] rounded-2xl overflow-hidden"
      style={{ overflow: "scroll" }}
    />
  );
}
