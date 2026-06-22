"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Toggles EN <-> HE while staying on the equivalent page. usePathname() returns
 * the locale-agnostic internal path, so router.replace with the target locale
 * resolves to that locale's URL (per the routing.ts pathnames map).
 */
export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const target = locale === "he" ? "en" : "he";
  const label = locale === "he" ? "English" : "עברית";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: target })}
      aria-label={`Switch to ${target === "he" ? "Hebrew" : "English"}`}
      className={cn(
        "text-sm font-medium transition-colors",
        tone === "light" ? "text-white/90 hover:text-white" : "text-brand-700 hover:text-accent-700",
      )}
    >
      {label}
    </button>
  );
}
