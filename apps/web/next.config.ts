import { resolve } from "node:path";

import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Frame-Options", value: "DENY" },
];

const selfHostingConfig: Partial<NextConfig> =
  process.env.VERCEL === "1"
    ? {}
    : {
        output: "standalone",
        outputFileTracingRoot: resolve(process.cwd(), "../.."),
      };

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...selfHostingConfig,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;