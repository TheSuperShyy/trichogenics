import { Reveal } from "@/components/ui/Reveal";
import { ResultsBody } from "./ResultsSlider";
import type { HomeContent } from "@/content/schema";

/** Full results page (legacy SEO URL, trailing slash). */
const RESULTS_HREF = "/hair-transplant-results/";

/**
 * Before/after results — dark band with the section heading + link, then the
 * scroll-pinned horizontal slider (ResultsBody): on desktop, before/after cards
 * slide across a pinned stage, tilting at the edges and straightening upright at
 * centre over a giant ghost headline (a brand-rebuilt version of the
 * ethicallifeworld "From our community" effect); on mobile / under reduced motion
 * it falls back to a clean static card grid. Each card's media slot holds the
 * before/after image now and an AI before/after video later.
 */
export function ResultsGallery({
  items,
  eyebrow,
  heading,
}: {
  items: NonNullable<HomeContent["beforeAfter"]>;
  eyebrow: string;
  heading: string;
}) {
  // Bottom padding is dropped on the desktop-motion path: the pinned slider track runs right to
  // the hand-off, where the <DoctorVideos> section (pulled up beneath it via negative margin)
  // rises into place — so the track must butt directly against it with no extra blank band. The
  // static fallback (mobile / reduced motion) keeps full padding.
  return (
    <section
      id="results"
      className="relative -mt-10 scroll-mt-24 bg-sand-50 py-section text-ink-700 motion-safe:lg:pb-0"
    >
      <div className="mx-auto w-full max-w-[1800px] px-gutter">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="text-eyebrow font-semibold uppercase text-accent-700">{eyebrow}</p>
            <h2 className="mt-3 max-w-md font-seed text-h2 font-normal text-brand-900">{heading}</h2>
          </Reveal>
          <Reveal className="lg:max-w-sm">
            <p className="text-base text-ink-700">
              Real outcomes from real Trichogenics patients — natural density designed to last.
            </p>
            <a
              href={RESULTS_HREF}
              className="mt-3 inline-flex items-center gap-2 font-medium text-accent-700 underline underline-offset-4 hover:text-accent-600"
            >
              See all results
              <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
            </a>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed: ResultsBody is a direct child of the (un-padded, full-width)
          section, so the slider spans the whole viewport and cards bleed to the
          real screen edges with no side padding. It pads its own mobile grid. */}
      <ResultsBody items={items} />
    </section>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
