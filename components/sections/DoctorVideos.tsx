import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { YouTube } from "@/components/media/YouTube";
import {
  DOCTOR_VIDEOS_EYEBROW,
  DOCTOR_VIDEOS_HEADING,
  DOCTOR_VIDEOS_SUBHEAD,
  DOCTOR_VIDEOS_FEATURED,
  DOCTOR_VIDEOS_SUPPORTING,
} from "./doctorVideos.data";

/**
 * "Meet the Best Hair Transplantation Doctors Overseas" — the clinic's own YouTube
 * intros as click-to-load lite-youtube facades: a compact featured welcome video with
 * two supporting clips below (deliberately small-scale proportions).
 *
 * This is the REAL, persistent videos section on EVERY screen (it carries the single
 * real <h2>). On desktop with motion it's pulled UP under the scroll-pinned results
 * stage (negative margin + z-10) so it RISES into view to "take REAL RESULTS' place"
 * as that giant headline defocuses out — the hand-off reveal — and then it simply STAYS
 * as normal, watchable, fully-interactive content (it is no longer trapped inside the
 * pin, so it never scrolls away / vanishes mid-reveal, which the previous in-pin version
 * did). On mobile / reduced motion the pinned slider isn't rendered, so the motion-safe:lg
 * utilities are inert and this is just a standard section after the static results grid.
 * Content comes from the shared doctorVideos.data module.
 */
export function DoctorVideos() {
  return (
    // motion-safe:lg:-mt pulls this up under the pinned results track (~one viewport) so it starts
    // rising into the stage from below RIGHT AS the last result card leaves centre + REAL RESULTS
    // finishes vanishing — they move together; z-10 paints it over the (now-empty) bottom of that
    // stage. Both are inert on mobile / reduced motion (no pinned slider there), where this is a
    // normal stacked section. The -mt amount is the lever for WHEN the rise begins (more = earlier).
    <section className="relative bg-sand-50 py-section motion-safe:lg:z-10 motion-safe:lg:-mt-[100dvh]">
      <Container>
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>{DOCTOR_VIDEOS_EYEBROW}</Eyebrow>
          <h2 className="max-w-2xl text-h3 font-normal text-brand-800">{DOCTOR_VIDEOS_HEADING}</h2>
          <p className="max-w-md text-sm text-ink-700">{DOCTOR_VIDEOS_SUBHEAD}</p>
        </Reveal>

        {/* Compact video cluster: narrower max width + tighter gaps so the whole section reads at a
            smaller, more modest scale (minimized proportions). */}
        <Reveal className="mx-auto mt-8 grid max-w-3xl gap-3 sm:gap-4">
          <YouTube id={DOCTOR_VIDEOS_FEATURED.id} title={DOCTOR_VIDEOS_FEATURED.title} className="shadow-xl" />
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {DOCTOR_VIDEOS_SUPPORTING.map((v) => (
              <YouTube key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
