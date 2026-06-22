import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { TableOfContents } from "@/components/sections/he/TableOfContents";
import { LongForm } from "@/components/sections/he/LongForm";
import { ComparisonTable } from "@/components/sections/he/ComparisonTable";
import { Checklist } from "@/components/sections/he/Checklist";
import { CityGuide } from "@/components/sections/he/CityGuide";
import { Summary } from "@/components/sections/he/Summary";
import { AiAnalysis } from "@/components/sections/AiAnalysis";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { ConsultCta } from "@/components/sections/ConsultCta";
import type { HomeContent } from "@/content/schema";

/** Hebrew homepage composition — long-form Israeli-SEO landing (RTL). */
export function HomeHe({ content }: { content: HomeContent }) {
  return (
    <main id="main">
      <Hero hero={content.hero} />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            {content.toc ? (
              <aside className="hidden lg:block">
                <TableOfContents items={content.toc} />
              </aside>
            ) : null}
            <div className="flex max-w-prose-he flex-col gap-12">
              {content.sections ? <LongForm sections={content.sections} /> : null}
              {content.comparison ? <ComparisonTable data={content.comparison} /> : null}
              {content.checklist ? <Checklist data={content.checklist} /> : null}
              {content.cityGuide ? <CityGuide data={content.cityGuide} /> : null}
            </div>
          </div>
        </Container>
      </Section>

      <AiAnalysis
        eyebrow="ניתוח חינם"
        title="ניתוח שיער חינם ב-AI תוך דקות"
        intro="רוצים להבין מדוע אתם מאבדים שיער? קבלו ניתוח מבוסס AI של הקרקפת ובריאות השיער — ללא עלות."
      />

      {content.testimonials ? (
        <Testimonials
          data={content.testimonials}
          eyebrow="ביקורות"
          reviewsLabel="קראו את כל הביקורות ב-Trustpilot ←"
        />
      ) : null}

      {content.faq ? <Faq data={content.faq} /> : null}

      {content.summary ? (
        <Section tone="muted">
          <Container width="text">
            <Summary
              data={content.summary}
              cta={{ label: content.hero.ctaPrimary.label, href: content.hero.ctaPrimary.href }}
            />
          </Container>
        </Section>
      ) : null}

      <ConsultCta />
    </main>
  );
}
