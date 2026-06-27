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
import { StandoutCarousel } from "@/components/sections/StandoutCarousel";
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
      {/* Decorative WebGL interlude (client-only, code-split, reduced-motion gated) — now
          sits directly after the results slider, ahead of the doctor videos. */}
      {content.mosaic ? <Mosaic content={content.mosaic} /> : null}
      {/* Doctor videos — the real, persistent videos section (carries the single <h2>). A
          normal stacked section after the Mosaic. (The earlier rise-into-REAL-RESULTS
          hand-off was removed when the Mosaic took the slot right after the slider; the
          slider's trailing track was trimmed to match so no blank gap opens.) */}
      <DoctorVideos />
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
      {/* "What makes us stand out" — differentiators in the circular-carousel
          design (landscape image deck), directly after Meet the surgeons. (The
          earlier auto-advancing list `Standout` is kept in the repo for reuse.) */}
      {content.standout ? <StandoutCarousel data={content.standout} /> : null}
      {content.locations ? <Locations data={content.locations} eyebrow="Our clinics" /> : null}
    </main>
  );
}
