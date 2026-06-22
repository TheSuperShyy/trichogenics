import { Hero } from "@/components/sections/Hero";
import { ResultsGallery } from "@/components/sections/ResultsGallery";
import { FeatureCare } from "@/components/sections/FeatureCare";
import { MethodSection } from "@/components/sections/MethodSection";
import { JourneyStatement } from "@/components/sections/JourneyStatement";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { AiAnalysisPromo } from "@/components/sections/AiAnalysisPromo";
import { Doctors } from "@/components/sections/Doctors";
import type { HomeContent } from "@/content/schema";

/**
 * English homepage composition — brand/clinic story, conversion-first.
 *
 * NOTE: Technology, StatsBand, Included, AiAnalysis (HairGen), Testimonials,
 * Locations, Faq and ConsultCta are temporarily removed ("for now"). Their
 * components + content remain — re-add the import + render line to restore.
 */
export function HomeEn({ content }: { content: HomeContent }) {
  return (
    <main id="main">
      <Hero hero={content.hero} />
      {content.beforeAfter ? (
        <ResultsGallery items={content.beforeAfter} eyebrow="Results" heading="Before & after" />
      ) : null}
      <FeatureCare />
      <MethodSection />
      <JourneyStatement />
      <VideoShowcase />
      <AiAnalysisPromo />
      {content.doctors ? <Doctors data={content.doctors} eyebrow="Your surgeons" /> : null}
    </main>
  );
}
