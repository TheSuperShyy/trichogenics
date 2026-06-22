import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Loads the per-request locale + UI-chrome messages (messages/<locale>.json).
// Page CONTENT (real marketing copy) lives in content/<locale>/* — not here.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && (routing.locales as readonly string[]).includes(requested)
      ? requested
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
