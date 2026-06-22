import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import type { HomeContent } from "@/content/schema";

/** "What's included" — answers the top medical-travel objection (transparency). */
export function Included({ data }: { data: NonNullable<HomeContent["included"]> }) {
  return (
    <Section>
      <Container width="text">
        <Reveal className="rounded-xl border border-sand-200 bg-white p-8 shadow-sm sm:p-12">
          <h2 className="text-h2 text-brand-800">{data.heading}</h2>
          {data.body ? <p className="mt-3 text-lead text-ink-700">{data.body}</p> : null}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
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
          {data.cta ? (
            <a href={data.cta.href} className={buttonVariants({ size: "lg", className: "mt-9" })}>
              {data.cta.label}
            </a>
          ) : null}
        </Reveal>
      </Container>
    </Section>
  );
}
