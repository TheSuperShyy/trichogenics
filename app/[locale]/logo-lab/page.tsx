import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import LogoSpinnerMount from "@/components/media/LogoSpinnerMount";

/**
 * /logo-lab — INTERNAL PREVIEW ONLY for the 3D logo spinner.
 *
 * Deliberately kept out of production SEO:
 *  - `robots: noindex, nofollow` (not indexed)
 *  - not present in app/sitemap.ts
 *  - not linked from any nav or page
 *  - the 3D component is client-only (ssr:false), so nothing here ships to the
 *    real homepage. This route is just so the spinner can be eyeballed locally.
 */
export const metadata: Metadata = {
  title: "Logo 3D — internal preview",
  robots: { index: false, follow: false },
};

export default async function LogoLabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Dev-only: this preview must never be reachable in production.
  if (process.env.NODE_ENV === "production") notFound();

  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-sand-50 to-sand-200 p-8">
      <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-500">
        Preview · unlinked · noindex
      </p>
      <div className="h-[70vh] w-full max-w-3xl cursor-grab active:cursor-grabbing">
        <LogoSpinnerMount />
      </div>
      <p className="text-sm text-ink-500">Drag to spin · auto-rotates</p>
    </main>
  );
}
