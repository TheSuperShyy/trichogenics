import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonVariants } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import type { HomeContent } from "@/content/schema";

/**
 * FAQ — two-column editorial layout: a sticky heading (plus an optional
 * supporting line + consult CTA, so a conversion action stays beside the
 * questions) on the start side, and the card accordion on the end side. The
 * accordion answers also feed the FAQPage JSON-LD in the SEO layer
 * (lib/schema.ts). `id="faq"` is the target of the header/footer "FAQ" anchor.
 *
 * `intro`/`cta` are passed per-locale (English copy from HomeEn) rather than
 * hardcoded, so the shared component carries no English onto the HE landing —
 * HE renders heading + accordion only.
 */
export function Faq({
  data,
  eyebrow,
  intro,
  cta,
}: {
  data: NonNullable<HomeContent["faq"]>;
  eyebrow?: string;
  intro?: string;
  cta?: { note?: string; label: string; href: string };
}) {
  return (
    <Section id="faq">
      <Container width="text" className="max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2 className="mt-3 text-h2 font-semibold text-brand-900">{data.heading}</h2>
            {intro ? <p className="mt-4 max-w-md text-body text-ink-700/80">{intro}</p> : null}
            {cta ? (
              <div className="mt-8 hidden lg:block">
                {cta.note ? <p className="text-sm font-medium text-brand-800">{cta.note}</p> : null}
                <a
                  href={cta.href}
                  className={buttonVariants({ variant: "primary", size: "md", className: "mt-3" })}
                >
                  {cta.label}
                </a>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.05}>
            <Accordion items={data.items} />
            {cta ? (
              <div className="mt-8 lg:hidden">
                <a href={cta.href} className={buttonVariants({ variant: "primary", size: "md" })}>
                  {cta.label}
                </a>
              </div>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
