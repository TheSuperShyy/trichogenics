import type { MosaicContent } from "@/content/schema";

/**
 * No-WebGL fallback for the Mosaic interlude. Rendered on the server, before
 * hydration, and for prefers-reduced-motion users — so the intro copy is always
 * present in the SSR HTML (SEO) and reduced-motion users get a calm, static brand
 * band instead of the scroll-driven scene. No autoplay video, no animation.
 */
export function MosaicStatic({ content }: { content: MosaicContent }) {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center bg-brand-900 px-gutter py-section text-center text-white">
      <div className="max-w-3xl">
        <p className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-white/60">
          {content.eyebrow}
        </p>
        <p className="mt-4 font-seed text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.04] tracking-tight">
          {content.heading}
          {content.emphasis ? (
            <>
              {" "}
              <em className="italic">{content.emphasis}</em>
            </>
          ) : null}
        </p>
      </div>
    </section>
  );
}
