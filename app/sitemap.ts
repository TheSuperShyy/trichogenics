import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const languages = {
  en: `${SITE.baseUrl}/`,
  he: `${SITE.baseUrl}/he/`,
};

/**
 * Sitemap with per-entry hreflang alternates. As pages are migrated they are
 * added here (driven by lib/routes.ts) so each new page auto-registers both
 * locale URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.baseUrl}/`, changeFrequency: "weekly", priority: 1, alternates: { languages } },
    { url: `${SITE.baseUrl}/he/`, changeFrequency: "weekly", priority: 1, alternates: { languages } },
  ];
}
