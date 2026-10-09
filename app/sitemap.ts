import type { MetadataRoute } from "next";

import { cases } from "@/content/data";
import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...cases.items.map((item) => ({
      url: `${SITE_URL}/cases/${item.slug}`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/curriculo`, lastModified: CONTENT_UPDATED_AT, priority: 0.5 },
  ];
}
