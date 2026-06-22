import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import type { HomeContent } from "@/content/schema";

export function Testimonials({
  data,
  eyebrow,
  reviewsLabel,
}: {
  data: NonNullable<HomeContent["testimonials"]>;
  eyebrow: string;
  reviewsLabel: string;
}) {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={data.heading} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {data.items.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i * 0.06}
              className="flex h-full flex-col gap-4 rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5 text-accent-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <StarIcon key={s} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="text-body text-ink-700">“{item.quote}”</blockquote>
              <footer className="mt-auto text-sm font-semibold text-brand-800">
                {item.name}
                {item.location ? (
                  <span className="font-normal text-ink-700/70"> · {item.location}</span>
                ) : null}
              </footer>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <a
            href={SITE.social.trustpilot}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent-700 underline underline-offset-4 hover:text-accent-600"
          >
            {reviewsLabel}
          </a>
        </div>
      </Container>
    </Section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 22l1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}
