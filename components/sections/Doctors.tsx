import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/** Where the cards link — the full team page (legacy SEO URL, trailing slash). */
const TEAM_HREF = "/your-hair-transplant-team/";

/**
 * Surgeons — a two-column split: the text (eyebrow + heading + intro) on the
 * start side, the surgeon portrait cards (photo + name + title, each linking to
 * the full team page) on the end side. The split fills the width so the section
 * reads without large empty side gutters.
 */
export function Doctors({
  data,
  eyebrow,
}: {
  data: NonNullable<HomeContent["doctors"]>;
  eyebrow: string;
}) {
  return (
    <Section id="doctors">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text — start side */}
          <Reveal className="max-w-xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2 text-brand-800">{data.heading}</h2>
            {data.intro ? <p className="mt-5 text-base text-ink-700">{data.intro}</p> : null}
          </Reveal>

          {/* Portraits — end side */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {data.people.map((doc, i) => (
              <Reveal key={doc.name} delay={i * 0.08}>
                <a href={TEAM_HREF} className="group block" aria-label={`${doc.name}, ${doc.title}`}>
                  {doc.photo ? (
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand-200">
                      <Image
                        src={doc.photo}
                        alt={doc.name}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 45vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : null}
                  <h3 className="mt-4 text-base font-medium text-brand-800 transition-colors group-hover:text-accent-700">
                    {doc.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-accent-700">{doc.title}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
