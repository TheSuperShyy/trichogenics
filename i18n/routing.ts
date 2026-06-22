import { defineRouting } from "next-intl/routing";

/**
 * Locale routing for Trichogenics.
 *
 * - `localePrefix: "as-needed"` keeps English at "/" and Hebrew at "/he/",
 *   matching the legacy URL shape exactly (SEO parity).
 * - `pathnames` maps each internal path to its real per-locale URL. The Hebrew
 *   site uses "-he" suffixes and URL-encoded Hebrew slugs; those are added here
 *   as the corresponding pages are migrated. The keys are the canonical internal
 *   paths used in <Link href> across the app.
 */
export const routing = defineRouting({
  locales: ["en", "he"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    // Future pages (scaffolded for parity as they are built):
    // "/your-hair-transplant-team": {
    //   en: "/your-hair-transplant-team",
    //   he: "/meet-your-expert-hair-transplant-team-he",
    // },
    // "/contact-trichogenics": {
    //   en: "/contact-trichogenics",
    //   he: "/contact-trichogenics-he",
    // },
  },
});

export type Locale = (typeof routing.locales)[number];
