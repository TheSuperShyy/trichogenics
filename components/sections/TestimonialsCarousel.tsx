import { Reveal } from "@/components/ui/Reveal";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import type { HomeContent } from "@/content/schema";

/**
 * Patient testimonials — a circular carousel of real patient portraits with
 * their quotes, sitting after "Meet the surgeons" as social proof. Feeds the
 * theme-agnostic CircularTestimonials primitive brand colours (navy text, teal
 * arrow hover). Only testimonials that carry a portrait are shown.
 *
 * (Distinct from the older card-grid `Testimonials` component, which is kept for
 * reuse.)
 */
export function TestimonialsCarousel({
  data,
  eyebrow,
}: {
  data: NonNullable<HomeContent["testimonials"]>;
  eyebrow: string;
}) {
  const items = data.items.flatMap((t) =>
    t.image
      ? [
          {
            quote: t.quote,
            name: t.name,
            designation: t.designation ?? t.location ?? "Verified patient",
            src: t.image,
          },
        ]
      : [],
  );
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="scroll-mt-24 bg-sand-50 py-section">
      <div className="mx-auto w-full max-w-content px-gutter">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow font-semibold uppercase text-accent-700">{eyebrow}</p>
          <h2 className="mt-4 font-seed text-h2 font-normal text-brand-800">{data.heading}</h2>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <CircularTestimonials
            testimonials={items}
            autoplay
            colors={{
              name: "#071331", // brand-800
              designation: "#0A6A60", // accent-700
              testimony: "#3A3F47", // ink-700
              arrowBackground: "#071331", // brand navy
              arrowForeground: "#FAFAF8", // sand-50
              arrowHoverBackground: "#12A594", // accent-500 (teal)
            }}
            fontSizes={{ name: "1.5rem", designation: "0.95rem", quote: "1.25rem" }}
          />
        </div>
      </div>
    </section>
  );
}
