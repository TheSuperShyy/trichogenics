import { z } from "zod";

/**
 * Typed content contract for the homepages. EN and HE are independent SEO
 * documents — they share this schema but populate different optional sections
 * (EN = brand/clinic story; HE = long-form Israeli-SEO landing). Real copy lives
 * in content/<locale>/*; generic UI strings live in messages/<locale>.json.
 */

const Cta = z.object({ label: z.string(), href: z.string() });

const MediaRef = z.object({
  kind: z.enum(["video", "stock3d", "image"]),
  src: z.string(), // path under /media (transcoded) — placeholders allowed for now
  poster: z.string().optional(),
  alt: z.string(),
});

const Meta = z.object({
  title: z.string(),
  description: z.string(),
  canonicalPath: z.string(), // e.g. "/" or "/he/"
  ogImage: z.string(),
});

const Hero = z.object({
  eyebrow: z.string().optional(),
  h1: z.string(),
  subhead: z.string(),
  ctaPrimary: Cta,
  ctaSecondary: Cta.optional(),
  trust: z.array(z.string()).optional(), // inline trust strip items
  media: MediaRef,
});

const PressLogo = z.object({
  name: z.string(),
  src: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});
const Credential = z.object({ title: z.string(), subtitle: z.string().optional() });
const BeforeAfter = z.object({
  name: z.string(),
  location: z.string().optional(),
  quote: z.string().optional(),
  label: z.string().optional(), // small pill, e.g. "12-month result"
  image: z.string(),
  video: z.string().optional(), // AI before/after video (overrides image when set)
});
const ProcessStep = z.object({ step: z.number(), title: z.string(), body: z.string() });
const Feature = z.object({ title: z.string(), body: z.string(), icon: z.string().optional() });
const DoctorBio = z.object({
  name: z.string(),
  title: z.string(),
  credentials: z.array(z.string()),
  memberships: z.array(z.string()).optional(),
  bio: z.string(),
  photo: z.string().optional(),
  videoId: z.string().optional(), // YouTube id
});
const TechItem = z.object({
  title: z.string(),
  body: z.string(),
  image: z.string().optional(),
  alt: z.string().optional(),
});
// Standout — the "what makes us different" feature list: an auto-advancing,
// click/keyboard-selectable set of differentiators, each paired with an image
// shown alongside the active item. `icon` is a key into the section's inline
// icon set (optional); `alt` falls back to `title` when omitted.
const StandoutFeature = z.object({
  title: z.string(),
  tag: z.string().optional(), // short label shown under the title in the carousel design
  body: z.string(),
  image: z.string(),
  alt: z.string().optional(),
  icon: z.string().optional(),
});
const Standout = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  intro: z.string().optional(),
  features: z.array(StandoutFeature).min(1),
});
const Stat = z.object({ value: z.string(), label: z.string() });
const Included = z.object({
  heading: z.string(),
  body: z.string().optional(),
  items: z.array(z.string()),
  cta: Cta.optional(),
});
const Testimonial = z.object({
  name: z.string(),
  location: z.string().optional(),
  designation: z.string().optional(), // shown under the name in the testimonials carousel
  quote: z.string(),
  image: z.string().optional(), // patient portrait for the circular carousel
  videoId: z.string().optional(),
});
const LocationInfo = z.object({
  name: z.string(),
  countryName: z.string(),
  address: z.string(),
  mapsUrl: z.string().optional(),
  image: z.string().optional(), // still establishing shot for the card header
  video: z.string().optional(), // looping cinemagraph; `poster` is its still/LCP
  poster: z.string().optional(), // poster for the video + reduced-motion fallback
});
const FaqItem = z.object({
  question: z.string(),
  answer: z.string(),
  // Optional price-tier rows (graft count -> price range) rendered as a small
  // definition list, plus a closing paragraph — for the longer cost answers.
  // Both also fold into the FAQPage JSON-LD answer text (lib/schema.ts).
  priceList: z.array(z.object({ grafts: z.string(), price: z.string() })).optional(),
  answerCont: z.string().optional(),
});

// Blog teaser — "latest posts" cards linking to the legacy /post/<slug>/ URLs
// (internal-link SEO). `date` is a display string (e.g. "March 23, 2026").
const BlogPost = z.object({
  title: z.string(),
  href: z.string(),
  category: z.string().optional(),
  categoryHref: z.string().optional(),
  author: z.string().optional(),
  date: z.string().optional(),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  alt: z.string().optional(),
});
const Blog = z.object({
  eyebrow: z.string().optional(),
  heading: z.string(),
  posts: z.array(BlogPost).min(1),
  cta: Cta.optional(),
});

// Mosaic — a decorative, scroll-driven WebGL interlude: autoplaying video tiles
// scatter from a cluster into a mosaic while a "deeper look" line zooms through.
// Content is just the tile clip list + the intro copy; the scene's from→to tile
// geometry is component config (not content). `emphasis` is appended to `heading`
// in italic (e.g. heading "Here is a deeper look into" + emphasis "our work.").
const MosaicTile = z.object({ src: z.string(), alt: z.string().optional() });
const Mosaic = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  emphasis: z.string().optional(),
  tiles: z.array(MosaicTile).min(1),
});

// HE long-form helpers
const TocItem = z.object({ id: z.string(), label: z.string() });
const ProseSection = z.object({
  id: z.string(),
  heading: z.string(),
  level: z.union([z.literal(2), z.literal(3)]).optional(),
  paragraphs: z.array(z.string()).optional(),
  bullets: z.array(z.string()).optional(),
});
const Comparison = z.object({
  heading: z.string(),
  columns: z.tuple([z.string(), z.string(), z.string()]), // [label, Israel, Turkey]
  rows: z.array(z.tuple([z.string(), z.string(), z.string()])),
  note: z.string().optional(),
});
const Checklist = z.object({ heading: z.string(), items: z.array(z.string()) });
const CityGuideLink = z.object({ city: z.string(), href: z.string() });

export const HomeContent = z.object({
  meta: Meta,
  hero: Hero,

  // EN brand-story sections (optional so HE can omit them)
  pressLogos: z.array(PressLogo).optional(),
  // "Proud members of:" — professional credential badges (same logo shape as
  // pressLogos, but rendered in full colour rather than as muted press marks).
  memberLogos: z.array(PressLogo).optional(),
  credentials: z.array(Credential).optional(),
  beforeAfter: z.array(BeforeAfter).optional(),
  mosaic: Mosaic.optional(),
  process: z.array(ProcessStep).optional(),
  whyChoose: z.object({ heading: z.string(), features: z.array(Feature) }).optional(),
  standout: Standout.optional(),
  doctors: z
    .object({ heading: z.string(), intro: z.string().optional(), people: z.array(DoctorBio) })
    .optional(),
  technology: z.object({ heading: z.string(), items: z.array(TechItem) }).optional(),
  stats: z.object({ heading: z.string().optional(), items: z.array(Stat) }).optional(),
  included: Included.optional(),
  testimonials: z.object({ heading: z.string(), items: z.array(Testimonial) }).optional(),
  locations: z.object({ heading: z.string(), items: z.array(LocationInfo) }).optional(),

  // HE long-form sections (optional so EN can omit them)
  toc: z.array(TocItem).optional(),
  sections: z.array(ProseSection).optional(),
  comparison: Comparison.optional(),
  checklist: Checklist.optional(),
  cityGuide: z.object({ heading: z.string(), items: z.array(CityGuideLink) }).optional(),
  summary: z.object({ heading: z.string(), paragraphs: z.array(z.string()) }).optional(),

  // shared
  faq: z.object({ heading: z.string(), items: z.array(FaqItem) }).optional(),
  blog: Blog.optional(),
});

export type HomeContent = z.infer<typeof HomeContent>;
export type MosaicContent = z.infer<typeof Mosaic>;
export type StandoutContent = z.infer<typeof Standout>;
export type FaqItem = z.infer<typeof FaqItem>;
export type Testimonial = z.infer<typeof Testimonial>;
export type DoctorBio = z.infer<typeof DoctorBio>;
