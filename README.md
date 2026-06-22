# Trichogenics

Modern, bilingual (EN/HE) rebuild of trichogenics.com — Next.js App Router,
premium motion-rich design, built to preserve the existing SEO and increase
consultation conversions.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · next-intl
(EN at `/`, HE at `/he/`) · Framer Motion · Embla · HubSpot / GTM / HairGen.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000  (EN)  ·  /he/  (HE, RTL)
npm run build        # production build (TS strict + lint + zod content validation)
npm run lint
npm run typecheck
npm run placeholders # regenerate branded placeholder media (sharp)
npm run transcode    # collections/ masters -> public/media/ (requires ffmpeg)
```

## Content & media

- Page copy lives in `content/en/*` and `content/he/*` (typed, zod-validated).
  EN and HE are **independent SEO documents**, not translations.
- UI strings live in `messages/{en,he}.json`.
- Org / NAP / integration IDs live once in `lib/site.ts`.
- Master media stays in `/collections/` (git-ignored); only optimized assets in
  `public/media/` are served. Drop the final AI hero video at
  `public/media/hero/hero-loop.mp4` and set `hero.media.kind = "video"`.

## Deploy (staging-first)

1. Push the repo to GitHub.
2. Import the project in **Vercel** (it auto-detects Next.js). Create a
   **staging** project — do not point production DNS at it yet.
3. No required env vars (integration IDs are in `lib/site.ts`). Optionally move
   them to env later; see `.env.example`.
4. Every PR gets a preview URL — review **both** `/` and `/he/`.
5. Pre-cutover SEO checklist:
   - `trailingSlash: true` stays on; verify every legacy URL → 200/301 (never 404)
     against `lib/routes.ts` (extend `legacyRedirects` after crawling the live
     sitemap).
   - Validate structured data in Google's Rich Results Test (Organization, both
     MedicalClinic locations, Person, BreadcrumbList, FAQPage).
   - Submit `/sitemap.xml` in Search Console; monitor 2–4 weeks before DNS cutover.

## Open content items (before launch)

Real Israel-vs-Turkey prices, financing details, results stats, Trustpilot
business-unit id, and the final/AI hero video.
