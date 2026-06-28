import { SITE } from "./site";
import type { FaqItem } from "@/content/schema";

/**
 * JSON-LD @graph builder. Reproduces the legacy node graph with the SAME stable
 * @ids (#org, #loc-gr, #loc-il, the Dr. Asi Person id, #website) so Google can
 * reconcile the migration — plus a NEW FAQPage built from page content.
 */

const B = SITE.baseUrl;
const ORG_ID = `${B}/#org`;
const WEBSITE_ID = `${B}/#website`;
const GR_ID = `${B}/#${SITE.locations.greece.id}`;
const IL_ID = `${B}/#${SITE.locations.israel.id}`;
const PERSON_ID = `${B}/your-hair-transplant-team/#asi-peretz`;

function organization() {
  return {
    "@type": ["Organization", "MedicalBusiness"],
    "@id": ORG_ID,
    name: SITE.name,
    url: `${B}/`,
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: [
      { "@type": "Country", name: "Greece" },
      { "@type": "Country", name: "Israel" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Patient Inquiries",
      email: SITE.email,
      telephone: SITE.phone,
      availableLanguage: ["en", "he"],
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certification",
      name: SITE.credential,
    },
    sameAs: [
      SITE.social.instagram,
      SITE.social.facebook,
      SITE.social.youtube,
      SITE.social.tiktok,
    ],
  };
}

type ClinicLoc = {
  name: string;
  street: string;
  locality: string;
  country: string;
};

function clinic(loc: ClinicLoc, id: string) {
  return {
    "@type": ["LocalBusiness", "MedicalClinic"],
    "@id": id,
    name: loc.name,
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.locality,
      addressCountry: loc.country,
    },
    telephone: SITE.phone,
  };
}

function person() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Dr. Asi I. Peretz",
    honorificPrefix: "Dr.",
    jobTitle: "Hair Restoration Surgeon",
    email: SITE.email,
    worksFor: { "@id": ORG_ID },
    affiliation: [{ "@id": GR_ID }, { "@id": IL_ID }],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Certification",
      name: "Diplomate, American Board of Hair Restoration Surgery (ABHRS)",
    },
    memberOf: [
      { "@type": "Organization", name: "World FUE Institute" },
      { "@type": "Organization", name: "International Society of Hair Restoration Surgery (ISHRS)" },
    ],
  };
}

function website(locale: string) {
  const isHe = locale === "he";
  const url = `${B}/${isHe ? "he/" : ""}`;
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url,
    name: SITE.name,
    inLanguage: isHe ? "he-IL" : "en-US",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function webPage(url: string, name: string, description: string, locale: string) {
  return {
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: locale === "he" ? "he-IL" : "en-US",
  };
}

function breadcrumb(url: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: url }],
  };
}

// Flatten a FAQ answer (intro + any price-tier rows + closing paragraph) into the
// single plain-text string the FAQPage Answer node expects, so the rich on-page
// cost answers are reproduced in full for search engines.
function faqAnswerText(q: FaqItem): string {
  const parts = [q.answer];
  if (q.priceList?.length) {
    parts.push(q.priceList.map((p) => `${p.grafts}: ${p.price}`).join("; "));
  }
  if (q.answerCont) parts.push(q.answerCont);
  return parts.join(" ");
}

function faqPage(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: faqAnswerText(q) },
    })),
  };
}

export function buildGraph({
  locale,
  canonicalPath,
  name,
  description,
  faq,
}: {
  locale: string;
  canonicalPath: string;
  name: string;
  description: string;
  faq?: FaqItem[];
}) {
  const url = `${B}${canonicalPath}`;
  const graph: object[] = [
    organization(),
    clinic(SITE.locations.greece, GR_ID),
    clinic(SITE.locations.israel, IL_ID),
    person(),
    website(locale),
    webPage(url, name, description, locale),
    breadcrumb(url),
  ];
  if (faq?.length) {
    graph.push(faqPage(faq));
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
