import type { NextConfig } from "next";

// Baseline security + RUM headers applied to every response.
// CSP is intentionally omitted: the env-gated inline GTM / Yandex.Metrika
// bootstrap scripts in layout.tsx would require a nonce/hash pipeline, and a
// misconfigured CSP silently breaks analytics. Revisit if/when CSP is needed.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Allow cross-origin Resource Timing so real-user-monitoring (RUM) can read
  // timing details for our assets. Audit flagged this as missing on the CDN.
  { key: "Timing-Allow-Origin", value: "*" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
