import type { MetadataRoute } from "next";
import { PIECES } from "@/data/horde";

const BASE = "https://horde-m.agency.ng";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/download`, changeFrequency: "monthly", priority: 0.8 },
    ...PIECES.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
