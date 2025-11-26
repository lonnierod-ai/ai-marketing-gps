// src/app/robots.ts
import type { MetadataRoute } from "next";

const baseUrl = "https://www.aimarketinggps.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"], // keep private API endpoints out of Google
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
