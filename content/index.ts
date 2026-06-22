import { HomeContent } from "./schema";
import { homeEn } from "./en/home";
import { homeHe } from "./he/home";

const byLocale: Record<string, HomeContent> = {
  en: homeEn,
  he: homeHe,
};

/** Returns the validated, typed homepage content for a locale (falls back to EN). */
export function getHomeContent(locale: string): HomeContent {
  const content = byLocale[locale] ?? homeEn;
  // Runtime validation catches content-shape errors (zod). Types are also
  // enforced at compile time via the `: HomeContent` annotation on each file.
  return HomeContent.parse(content);
}
