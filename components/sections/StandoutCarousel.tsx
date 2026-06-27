import { Reveal } from "@/components/ui/Reveal";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import type { HomeContent } from "@/content/schema";

/**
 * "What makes us stand out" — the differentiator content rendered with the
 * circular-carousel design: a fanned deck of landscape feature images on one
 * side, the active differentiator (title + tag + description) with prev/next
 * arrows on the other, autoplaying through the five. Reuses the theme-agnostic
 * CircularTestimonials primitive (mapping title→name, tag→designation,
 * body→quote, image→src) with a landscape image deck and brand colours.
 */
export function StandoutCarousel({ data }: { data: NonNullable<HomeContent["standout"]> }) {
  const items = data.features.map((feature) => ({
    name: feature.title,
    designation: feature.tag ?? "",
    quote: feature.body,
    src: feature.image,
  }));

  return (
    <section id="why-trichogenics" className="scroll-mt-24 bg-sand-50 pb-12 pt-0">
      <div className="mx-auto w-full max-w-content px-gutter">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow font-semibold uppercase text-accent-700">{data.eyebrow}</p>
          <h2 className="mt-4 font-seed text-h2 font-normal text-brand-800">{data.heading}</h2>
          {data.intro ? <p className="mt-6 text-base text-ink-700">{data.intro}</p> : null}
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <CircularTestimonials
            testimonials={items}
            autoplay
            autoplayMs={8000}
            imageContainerClassName="aspect-[3/2] max-w-xl"
            contentClassName="md:min-h-[22rem] md:justify-center"
            wordReveal={false}
            colors={{
              name: "#071331", // brand-800
              designation: "#0A6A60", // accent-700 (teal)
              testimony: "#3A3F47", // ink-700
              arrowBackground: "#071331", // brand navy
              arrowForeground: "#FAFAF8", // sand-50
              arrowHoverBackground: "#12A594", // accent-500
            }}
            fontSizes={{ name: "1.75rem", designation: "0.8125rem", quote: "1.125rem" }}
          />
        </div>
      </div>
    </section>
  );
}
