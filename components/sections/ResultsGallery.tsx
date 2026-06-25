import { Reveal } from "@/components/ui/Reveal";
import { ResultsCards } from "./ResultsCards";
import type { HomeContent } from "@/content/schema";

/** Full results page (legacy SEO URL, trailing slash). */
const RESULTS_HREF = "/hair-transplant-results/";

/**
 * Before/after results — seed.com-style section: a dark band with a heading on
 * the start side, a short description + link on the end side, and a row of
 * rounded-rectangle cards. Each card's media slot holds the before/after image
 * now and an AI-generated before/after video later (set `video` in content).
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
  const cards = items.slice(0, 4);

  return (
    <section id="results" data-nav-theme="dark" className="relative -mt-10 scroll-mt-24 bg-brand-900 py-section text-white">
      <div className="mx-auto w-full max-w-[1800px] px-gutter">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="text-eyebrow font-semibold uppercase text-accent-300">{eyebrow}</p>
            <h2 className="mt-3 max-w-md font-seed text-h2 font-normal text-white">{heading}</h2>
          </Reveal>
          <Reveal className="lg:max-w-sm">
            <p className="text-base text-sky-100/80">
              Real outcomes from real Trichogenics patients — natural density designed to last.
            </p>
            <a
              href={RESULTS_HREF}
              className="mt-3 inline-flex items-center gap-2 font-medium text-accent-300 underline underline-offset-4 hover:text-accent-100"
            >
              See all results
              <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
            </a>
          </Reveal>
        </div>

        <ResultsCards items={cards} />
      </div>
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
