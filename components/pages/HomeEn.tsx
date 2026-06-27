import { Hero } from "@/components/sections/Hero";
import { ResultsGallery } from "@/components/sections/ResultsGallery";
import { DoctorVideos } from "@/components/sections/DoctorVideos";
import { Mosaic } from "@/components/sections/Mosaic";
import { PressLogos } from "@/components/sections/PressLogos";
import { FeatureCare } from "@/components/sections/FeatureCare";
import { MethodSection } from "@/components/sections/MethodSection";
import { JourneyStatement } from "@/components/sections/JourneyStatement";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { AiAnalysisPromo } from "@/components/sections/AiAnalysisPromo";
import { MemberLogos } from "@/components/sections/MemberLogos";
import { Doctors } from "@/components/sections/Doctors";
import { Locations } from "@/components/sections/Locations";
import type { HomeContent } from "@/content/schema";

/**
 * English homepage composition — brand/clinic story, conversion-first.
 *
 * NOTE: Technology, StatsBand, Included, AiAnalysis (HairGen), Testimonials,
 * Faq and ConsultCta are temporarily removed ("for now"). Their
 * components + content remain — re-add the import + render line to restore.
 */
export function HomeEn({ content }: { content: HomeContent }) {
  return (
    <main id="main">
      <Hero hero={content.hero} />
      {content.beforeAfter ? (
        <ResultsGallery items={content.beforeAfter} eyebrow="Results" heading="Before & after" />
      ) : null}
      {/* Doctor videos — the real, persistent videos section (carries the single <h2>). On
          desktop with motion it's pulled up under the pinned results stage so it RISES into
          REAL RESULTS' place as that headline defocuses out (the hand-off reveal), then STAYS
          as a normal, watchable section (no longer trapped in the pin). On mobile / reduced
          motion it's just a standard section after the static results grid. */}
      <DoctorVideos />
      {/* Decorative WebGL interlude (client-only, code-split, reduced-motion gated). */}
      {content.mosaic ? <Mosaic content={content.mosaic} /> : null}
      {content.pressLogos ? <PressLogos logos={content.pressLogos} label="As featured in" /> : null}
      <FeatureCare />
      <MethodSection />
      <JourneyStatement />
      <VideoShowcase />
      <AiAnalysisPromo />
      {content.memberLogos ? (
        <MemberLogos logos={content.memberLogos} label="Proud members of:" />
      ) : null}
      {content.doctors ? <Doctors data={content.doctors} eyebrow="Your surgeons" /> : null}
      {content.locations ? <Locations data={content.locations} eyebrow="Our clinics" /> : null}
    </main>
  );
}
