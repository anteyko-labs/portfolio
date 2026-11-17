import Script from "next/script";

/**
 * Meta Pixel. It is mounted only on the ad landing (/lead), not site-wide:
 * the ads lead there, and the rest of the site stays free of a third-party
 * tracker.
 *
 * A visitor who picked «Только необходимые» in the cookie banner gets
 * fbq('consent','revoke'): the pixel loads but sends nothing.
 * CONSENT_KEY is repeated here, not imported: cookie-consent is a client
 * module, and this one renders on the server.
 * The `Lead` event is sent by the form after a successful submit (trackLead).
 */
export const META_PIXEL_ID = "1449114910109115";

const CONSENT_KEY = "anteyko_cookie_consent"; // = CONSENT_KEY in cookie-consent.tsx

const INIT =
  "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
  "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;" +
  "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;" +
  "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}" +
  "(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');" +
  `try{if(localStorage.getItem(${JSON.stringify(CONSENT_KEY)})==="necessary")fbq('consent','revoke');}catch(e){}` +
  `fbq('init',${JSON.stringify(META_PIXEL_ID)});fbq('track','PageView');`;

export function MetaPixel() {
  return (
    <>
      {/* The ID is a constant, no user input: safe injection */}
      <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: INIT }} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

type Fbq = (...args: unknown[]) => void;

/** Sends the Meta `Lead` event; does nothing if the pixel is not loaded. */
export function trackLead(params: Record<string, string>): void {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  try {
    fbq?.("track", "Lead", params);
  } catch {
    /* blocked by an extension */
  }
}
