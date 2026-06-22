/**
 * Single source of truth for organization / NAP / integration constants.
 * Consumed by content files, the SEO metadata builder, and the JSON-LD graph.
 * Keep these in sync with context.md §5.
 */
export const SITE = {
  baseUrl: "https://www.trichogenics.com",
  name: "Trichogenics",
  legalName: "Peretz Medical",
  email: "info@trichogenics.com",
  // E.164 for tel: links and schema; display variant for UI.
  phone: "+306984596522",
  phoneDisplay: "+30 698 459 6522",
  // WhatsApp click-to-chat (same number, no "+").
  whatsapp: "306984596522",
  credential: "American Board of Hair Restoration Surgery (ABHRS)",
  memberships: ["ISHRS", "World FUE Institute"],
  founders: ["Dr. Asi I. Peretz", "Dr. Eric Peretz"],
  locations: {
    greece: {
      id: "loc-gr",
      name: "Trichogenics — Thessaloniki",
      street: "Karatasou 1",
      locality: "Thessaloniki",
      country: "GR",
      countryName: "Greece",
    },
    israel: {
      id: "loc-il",
      name: "Trichogenics — Herzlia",
      street: "Hanadiv 71",
      locality: "Herzlia",
      country: "IL",
      countryName: "Israel",
    },
  },
  social: {
    instagram: "https://www.instagram.com/trichogenics/",
    tiktok: "https://www.tiktok.com/@trichogenics",
    youtube: "https://www.youtube.com/channel/UCIKQ5juVdDFqbAlLoMQSFGw",
    facebook: "https://www.facebook.com/Trichogenics/",
    trustpilot: "https://www.trustpilot.com/review/www.trichogenics.com",
  },
  integrations: {
    gtmId: "GTM-PP645VH",
    hubspot: {
      portalId: "49196064",
      region: "na1",
      heroFormId: "8899d5fd-dfd6-4a4d-b6cd-23da0bae4e23",
      analysisFormId: "1fc5118b-8d99-46cc-894f-1d445b099aad",
    },
    hairgen: {
      scriptSrc: "https://www.hairgen.ai/js/embed-1.js",
      token: "nCWUICWMk4YJTl4F",
    },
  },
} as const;

export type SiteConfig = typeof SITE;
