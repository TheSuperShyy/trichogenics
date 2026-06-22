import type { Metadata } from "next";
import { SITE } from "./site";

type MetaInput = {
  title: string;
  description: string;
  canonicalPath: string; // "/" or "/he/"
  ogImage: string;
};

/**
 * Builds a Next Metadata object that reproduces the legacy SEO exactly:
 * absolute trailing-slash canonical, en/he/x-default hreflang alternates, OG +
 * Twitter, and the legacy robots directive. Relative paths resolve against
 * metadataBase to absolute URLs.
 */
export function buildMetadata({
  locale,
  meta,
}: {
  locale: string;
  meta: MetaInput;
}): Metadata {
  const isHe = locale === "he";
  return {
    metadataBase: new URL(SITE.baseUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonicalPath,
      languages: {
        en: "/",
        he: "/he/",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: isHe ? "he_IL" : "en_US",
      alternateLocale: isHe ? "en_US" : "he_IL",
      title: meta.title,
      description: meta.description,
      url: meta.canonicalPath,
      images: [{ url: meta.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}
