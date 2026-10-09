import type { MetadataRoute } from "next";

import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
