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
 * intros as click-to-load lite-youtube facades: a featured welcome video large on the
 * start side, with the two supporting clips stacked on the end side.
 *
 * This is the REAL, persistent videos section on EVERY screen (it carries the single
 * real <h2>). It is a plain stacked section: the Mosaic interlude now sits directly after
 * the results slider, so the doctor videos follow the Mosaic in normal flow. (It used to
 * be pulled up under the pinned slider to "rise into REAL RESULTS' place" as that headline
 * defocused — that hand-off was dropped when the Mosaic took the post-slider slot.)
 * Content comes from the shared doctorVideos.data module.
 */
export function DoctorVideos() {
  return (
    <section className="relative bg-sand-50 pb-section pt-12">
      <Container>
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>{DOCTOR_VIDEOS_EYEBROW}</Eyebrow>
          <h2 className="max-w-3xl text-h2 font-normal text-brand-800">{DOCTOR_VIDEOS_HEADING}</h2>
          <p className="max-w-xl text-base text-ink-700">{DOCTOR_VIDEOS_SUBHEAD}</p>
        </Reveal>

        {/* Video cluster: featured welcome video large on the start side (spans two of three
            columns), the two supporting clips stacked on the end side. The 2:1 width split keeps
            the stacked pair roughly the featured's height. Collapses to one column on mobile
            (featured, then the two clips). */}
        <Reveal className="mx-auto mt-8 grid max-w-5xl gap-3 sm:gap-4 lg:grid-cols-3 lg:items-start">
          {/* Featured — start side */}
          <div className="lg:col-span-2">
            <YouTube id={DOCTOR_VIDEOS_FEATURED.id} title={DOCTOR_VIDEOS_FEATURED.title} className="shadow-xl" />
          </div>
          {/* Supporting — stacked, end side */}
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
            {DOCTOR_VIDEOS_SUPPORTING.map((v) => (
              <YouTube key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
