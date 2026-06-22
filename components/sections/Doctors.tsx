import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/** Where the cards link — the full team page (legacy SEO URL, trailing slash). */
const TEAM_HREF = "/your-hair-transplant-team/";

/**
 * Surgeons — seed.com advisory-board style: a two-column header (heading on the
 * start side, intro on the end side) above a row of portrait cards that show
 * only the name + title. Each card links to the full team page.
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
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2 text-brand-800">{data.heading}</h2>
          </Reveal>
          {data.intro ? (
            <Reveal className="lg:self-end">
              <p className="text-base text-ink-700">{data.intro}</p>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-10">
          {data.people.map((doc, i) => (
            <Reveal key={doc.name} delay={i * 0.08} className="w-full sm:w-[19rem]">
              <a href={TEAM_HREF} className="group block" aria-label={`${doc.name} — ${doc.title}`}>
                {doc.photo ? (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand-200">
                    <Image
                      src={doc.photo}
                      alt={doc.name}
                      fill
                      sizes="(min-width: 640px) 19rem, 100vw"
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
      </Container>
    </Section>
  );
}
