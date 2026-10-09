import type { MetadataRoute } from "next";

import { projects } from "@/content/data";
import { CONTENT_UPDATED_AT, SITE_URL } from "@/lib/constants";

const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/servicos", priority: 0.9 },
  { path: "/projetos", priority: 0.8 },
  { path: "/sobre", priority: 0.7 },
  { path: "/contato", priority: 0.8 },
  { path: "/privacidade", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map(({ path, priority }) => ({
      url: `${SITE_URL}${path === "/" ? "/" : path}`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...projects.items.map((item) => ({
      url: `${SITE_URL}/projetos/${item.slug}`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
