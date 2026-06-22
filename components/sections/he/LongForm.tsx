import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/** Renders the HE long-form prose sections (each an <h2>/<h3> anchor for the ToC). */
export function LongForm({ sections }: { sections: NonNullable<HomeContent["sections"]> }) {
  return (
    <div className="flex flex-col gap-12">
      {sections.map((sec) => {
        const Heading = sec.level === 3 ? "h3" : "h2";
        return (
          <Reveal key={sec.id} as="section">
            <section id={sec.id} className="scroll-mt-28">
              <Heading className="text-h2 text-brand-800">{sec.heading}</Heading>
              {sec.paragraphs?.map((p, i) => (
                <p key={i} className="mt-4 text-body leading-8 text-ink-700">
                  {p}
                </p>
              ))}
              {sec.bullets?.length ? (
                <ul className="mt-5 space-y-2.5">
                  {sec.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-body text-ink-700">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-accent-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          </Reveal>
        );
      })}
    </div>
  );
}
