import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/** Internal-link entry cards to the city/location guide pages (SEO equity). */
export function CityGuide({ data }: { data: NonNullable<HomeContent["cityGuide"]> }) {
  return (
    <section className="scroll-mt-28">
      <h2 className="text-h2 text-brand-800">{data.heading}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((city) => (
          <Reveal key={city.href}>
            <a
              href={city.href}
              className="flex items-center justify-between rounded-lg border border-sand-200 bg-white p-4 text-body font-medium text-brand-800 transition-colors hover:border-accent-300 hover:text-accent-700"
            >
              <span>{city.city}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 rtl:rotate-180" aria-hidden>
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
