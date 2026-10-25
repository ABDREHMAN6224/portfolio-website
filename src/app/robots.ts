import type { MetadataRoute } from "next";
import { profile } from "@/content/site";

// Static export: metadata route handlers must be explicitly prerendered.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${profile.website}/sitemap.xml`,
    host: profile.website,
  };
}
