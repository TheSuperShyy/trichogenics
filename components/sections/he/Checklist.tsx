import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

export function Checklist({ data }: { data: NonNullable<HomeContent["checklist"]> }) {
  return (
    <section id="choose" className="scroll-mt-28">
      <h2 className="text-h2 text-brand-800">{data.heading}</h2>
      <Reveal className="mt-6 rounded-lg border border-sand-200 bg-white p-6 shadow-sm sm:p-8">
        <ul className="space-y-4">
          {data.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-accent-50 text-accent-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5" aria-hidden>
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-body text-ink-700">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
