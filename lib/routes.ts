/**
 * URL parity + legacy redirect map for the SEO-safe cutover.
 *
 * `localizedPaths` is the canonical EN <-> HE URL map mirroring the live site
 * (HE uses "-he" suffixes and Hebrew slugs). As each page is migrated, copy its
 * entry into `routing.ts` `pathnames` (so next-intl emits the exact legacy URL)
 * and add it to `app/sitemap.ts`.
 *
 * `legacyRedirects` 301s old WordPress artifact URLs to their new home so no
 * legacy URL ever 404s. Extend this after crawling the live sitemap at launch.
 * (Keep `trailingSlash: true` in next.config so slash variants don't churn.)
 */

export const localizedPaths: Record<string, { en: string; he: string }> = {
  home: { en: "/", he: "/he/" },
  bookConsult: { en: "/book-a-consult/", he: "/book-a-consult/" },
  contact: { en: "/contact-trichogenics/", he: "/contact-trichogenics-he/" },
  team: {
    en: "/your-hair-transplant-team/",
    he: "/meet-your-expert-hair-transplant-team-he/",
  },
  results: { en: "/hair-transplant-results/", he: "/hair-transplant-results-he/" },
  journey: { en: "/hair-transplant-journey/", he: "/your-hair-transplant-journey-he/" },
  faqs: { en: "/hair-transplant-faqs/", he: "/he/" },
  processGuide: { en: "/the-hair-transplant-process-guide/", he: "/he/" },
  israel: { en: "/hair-transplant-israel/", he: "/he/" },
  blog: { en: "/trichogenics-hair-blog/", he: "/trichogenics-hair-blog-he/" },
};

type Redirect = { source: string; destination: string; permanent: boolean };

export const legacyRedirects: Redirect[] = [
  // WordPress feed / artifact URLs -> home (extend per live-site crawl at launch).
  { source: "/feed/", destination: "/", permanent: true },
  { source: "/comments/feed/", destination: "/", permanent: true },
  { source: "/home/", destination: "/", permanent: true },
];
