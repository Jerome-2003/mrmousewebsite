import type { MetadataRoute } from "next";
import { PIECES, SITE } from "@/data/horde";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/download`, changeFrequency: "monthly", priority: 0.8 },
    ...PIECES.map((p) => ({
      url: `${SITE.url}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
