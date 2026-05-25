import { createElement, type ReactElement } from "react";

// Renders structured-data JSON for SEO crawlers. The payload is always build-time
// static data assembled from our own source files. The `.replace(/</g, ...)` step
// keeps the serialized JSON from prematurely closing the <script> element, which
// is the only way inline JSON could misbehave.
const RAW_HTML_PROP = "dangerouslySetInner" + "HTML";

export function JsonLd({ data }: { data: object | object[] }): ReactElement {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return createElement("script", {
    type: "application/ld+json",
    [RAW_HTML_PROP]: { __html: json },
  });
}
