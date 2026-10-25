import type { MetadataRoute } from "next";
import { profile } from "@/content/site";

// Static export: metadata route handlers must be explicitly prerendered.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${profile.website}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
