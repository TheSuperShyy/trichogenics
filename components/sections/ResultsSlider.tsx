"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ResultsCards } from "./ResultsCards";
import type { HomeContent } from "@/content/schema";

type Items = NonNullable<HomeContent["beforeAfter"]>;

/**
 * Scroll-pinned horizontal results slider (ethicallifeworld.com "From our
 * community"-style, rebuilt on-brand). A tall scroll track pins an inner stage;
 * vertical page scroll drives a horizontal conveyor of before/after cards across
 * it. Each card tilts at the edges and straightens upright as it reaches centre,
 * scaling up + rising above its neighbours, over a giant ghost headline with a
 * soft brand glow behind the focused card. NOTHING here is the reference's lime/
 * gummy branding (brand locked) — navy band, teal/sky glow, borderless navy
 * cards with the testimonial overlaid on a gradient scrim (no glassy panel).
 *
 * Only transform/opacity animate (GPU; the track has a fixed height → no CLS).
 * The slider is desktop + motion-allowed only; on < lg, or under prefers-reduced-
 * motion at any size, the section falls back to the static <ResultsCards> grid.
 * The switch is pure CSS (motion-safe + lg variants), so server and client render
 * the same tree (no hydration mismatch). The real <h2> lives in the section
 * header (ResultsGallery); the giant word here is aria-hidden decoration.
 */
export function ResultsBody({ items }: { items: Items }) {
  return (
    <>
      {/* Static grid — mobile (any), and desktop only under reduced motion. Padded
          here since ResultsBody is now a full-width child of the section. */}
      <div className="mx-auto block w-full max-w-[1800px] px-gutter motion-safe:lg:hidden">
        <ResultsCards items={items.slice(0, 4)} />
      </div>
      {/* Slider — desktop + motion-allowed only; full-bleed (full viewport width). */}
      <SliderStage items={items.slice(0, 6)} />
    </>
  );
}

// Conveyor geometry. PITCH is large so ONE card sits alone in the middle with
// clear space, its neighbours pushed out to the edges. The tilt is an EASED fan
// (not a flat linear tilt) matching the reference's measured `rotate` values —
// upright at centre, then ramping ~0° → ±17.7° → ±27.6° → ±30° toward the edges,
// so the left/right cards lean decisively like the reference instead of flat.
const PITCH = 46; // vw between adjacent card centres (wider gap → more space around the centre card,
//                   neighbours pushed further to the edges). Spacing only — does NOT change conveyor
//                   speed (that's `centred`'s index mapping); raise for more breathing room.
const MAX_TILT = 30; // ±30° cap (the reference clamps at rotate(30deg))
const TILT_SPAN = 1.7; // cards reach the cap ~1.7 out → a steep, confident fan
const ARC_DROP = 18; // vh droop at one card out; applied as a QUADRATIC (∝ offset²) so
//                      the cards trace a smooth circular-style arc (flat at the centre
//                      peak, curving down steeper toward the edges) instead of a shallow
//                      straight "V". Raise for a deeper curve / lower side cards.
// Fraction of the pinned scroll spent on the INTRO REVEAL before the card conveyor
// starts (ethical-style section entrance): the giant ghost headline scales up and
// stands upright out of a perspective lean while the brand glow blooms; the cards are
// held FULLY OFF-SCREEN (not peeking at the edge) so the headline reveals on a clear
// stage, then they slide in. Raise for a longer/slower intro.
const INTRO_END = 0.16;
// Where the conveyor begins at INTRO_END: card 0 starts this many pitches off the lead
// edge. ≥ ~1.6 pushes it past the viewport corner (x = d·PITCH vw + y = d²·ARC_DROP vh),
// so nothing peeks in before the first card slides in. Clipped by the stage's overflow.
const CONVEYOR_START = -2;

// HAND-OFF to the doctor videos — REVEAL-FROM-BELOW, TIED TO THE CARDS. The videos are NOT trapped
// in this pinned stage; the real <DoctorVideos> section lives in normal flow right after this track
// and is pulled UP (negative margin, see DoctorVideos) so it RISES into the stage from below. The
// timing is now locked to the conveyor: the giant "REAL RESULTS" headline starts defocusing + fading
// the instant the 3rd card reaches centre and is 100% GONE by the LAST card's centre (see the
// `centred`-driven OUT transforms below); the cards run the FULL track, so the last card EXITS the
// trailing edge right at the end of the pin — and the videos section is pulled up by ~one viewport so
// it starts rising AS the last card leaves (they move together). The pin then releases into the
// videos and they simply STAY (watchable, never vanish).
const CARDS_END = 0.95; // conveyor runs the FULL track — the last card exits the trailing edge right
//                          at the end of the pin, so its exit coincides with the videos rising.

function SliderStage({ items }: { items: Items }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const dirSign = locale === "he" ? -1 : 1; // mirror the conveyor in RTL
  const count = items.length;

  // START the reveal EARLY to kill the blank band between the section header and the headline.
  // "start center" → progress hits 0 when the track's TOP edge reaches the viewport CENTRE (the
  // section is half-entered), not when it reaches the very top. So REAL RESULTS fades in + RISES
  // up into place WHILE the "Before & after" header is still scrolling off, instead of only after
  // the stage has fully pinned (which left ~one empty viewport below the header). The "end end"
  // anchor is unchanged, so the tail / hand-off to the videos stays put — only the entrance moves
  // earlier. Don't push the start past centre without also raising INTRO_END: the stage finishes
  // pinning at ~0.13 progress, and the cards must not begin (INTRO_END=0.16) before that.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end end"],
  });

  // Smooth the scroll-driven progress with a spring so the card conveyor GLIDES with a
  // little inertia/ease instead of rigidly tracking the scrollbar — the "smoother"
  // ethical feel. SOFTER spring (stiffness 90→55, damping 30→22) = more glide + a longer,
  // gentler catch-up lag (the cards keep easing into place for a beat after you stop
  // scrolling), still OVER-damped (ζ≈1.48, no overshoot/bounce). Only the cards use this;
  // the headline/glow intro stays on the raw progress so the title reveal scrubs tightly.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.0005,
  });

  // Card conveyor: held fully off-screen (CONVEYOR_START pitches off the lead edge)
  // through the intro reveal, then runs ALL THE WAY THROUGH — the last card passes
  // centre and EXITS the trailing edge by |CONVEYOR_START| pitches, so the stage is
  // clean (headline only) at BOTH ends and no half-cards linger in frame post-scroll
  // (symmetric to the entrance). Driven by the smoothed progress so the slide eases.
  const lastIndex = Math.max(count - 1, 1);
  const centred = useTransform(
    smooth,
    [INTRO_END, CARDS_END],
    [CONVEYOR_START, lastIndex - CONVEYOR_START],
  );

  // Card-tied fade window: the headline starts disappearing when the 3rd card (centred = fadeFrom)
  // reaches centre and is 100% GONE by the LAST card's centre (centred = fadeTo = lastIndex). Keyed
  // off `centred` (not a raw scroll fraction) so the title vanishes in LOCKSTEP with the conveyor —
  // and because `centred` is spring-smoothed, it tracks the *visible* cards exactly.
  const fadeFrom = Math.min(2, lastIndex - 1); // 3rd card (guarded for tiny counts)
  const fadeTo = lastIndex; // last card centred → headline 100% gone

  // Intro reveal → hold → DEFOCUS-OUT. The headline resolves out of an OVERSIZED, SOFT-BLURRED,
  // PERSPECTIVE-LEANED ghost — scaling DOWN (1.3→1), standing upright (rotateX 50→0), sharpening
  // (blur 12→0) and fading in FAST (opaque by ~0.03 so the stage never opens BLANK) — all on the RAW
  // scroll for a tight reveal. It then HOLDS solid + sharp, and DEFOCUSES OUT on `centred` (the CARD
  // position): rack-focus blur 0→24px + opacity 1→0 + a slight forward drift (scale →1.06) between
  // the 3rd and last card. Each animated prop is composed as in(raw) ∘ out(centred) — the reveal-in
  // and the card-tied out never overlap (out is flat until the 3rd card), so they multiply/add cleanly.
  const headlineOpacityIn = useTransform(scrollYProgress, [0, 0.03], [0, 1]);
  const headlineOpacityOut = useTransform(centred, [fadeFrom, fadeTo], [1, 0]);
  const headlineOpacity = useTransform(
    [headlineOpacityIn, headlineOpacityOut],
    (v) => (v[0] as number) * (v[1] as number),
  );
  const headlineScaleIn = useTransform(scrollYProgress, [0, INTRO_END], [1.3, 1]);
  const headlineScaleOut = useTransform(centred, [fadeFrom, fadeTo], [1, 1.06]);
  const headlineScale = useTransform(
    [headlineScaleIn, headlineScaleOut],
    (v) => (v[0] as number) * (v[1] as number),
  );
  const headlineRotateX = useTransform(scrollYProgress, [0, INTRO_END], [50, 0]);
  const headlineBlurIn = useTransform(scrollYProgress, [0, INTRO_END], [12, 0]);
  const headlineBlurOut = useTransform(centred, [fadeFrom, fadeTo], [0, 24]);
  const headlineBlurPx = useTransform(
    [headlineBlurIn, headlineBlurOut],
    (v) => (v[0] as number) + (v[1] as number),
  );
  const headlineFilter = useTransform(headlineBlurPx, (b) => `blur(${b}px)`);
  const glowOpacityIn = useTransform(scrollYProgress, [0, INTRO_END], [0, 1]);
  const glowOpacityOut = useTransform(centred, [fadeFrom, fadeTo], [1, 0]);
  const glowOpacity = useTransform(
    [glowOpacityIn, glowOpacityOut],
    (v) => (v[0] as number) * (v[1] as number),
  );
  const glowScale = useTransform(scrollYProgress, [0, INTRO_END * 1.4], [0.55, 1]);

  return (
    <div
      ref={trackRef}
      className="relative mt-10 hidden motion-safe:lg:block"
      // Scroll distance for: intro reveal → every card riding fully through (in AND out) → the
      // headline hold → its DEFOCUS-out hand-off as the videos section rises from below. No video
      // HOLD here any more (the videos now live in normal flow after this track), so the base is
      // smaller. The per-card term (66dvh, up from 54) sets the CONVEYOR SPEED — more dvh per card =
      // each card lingers longer crossing centre (slower, more deliberate "ethical" pass). Dynamic-
      // viewport unit so the pinned stage + scroll length track the real viewport on every screen.
      style={{ height: `${(count - 1) * 66 + 170}dvh` }}
    >
      <div className="sticky top-0 flex min-h-dvh items-center justify-center overflow-hidden">
        {/* Brand glow behind the focused card (teal/sky — NOT the reference lime).
            Tuned for the light section: a soft mint pool fading to transparent.
            Blooms open during the intro, then holds. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[66vmin] w-[66vmin] rounded-full blur-3xl"
          style={{
            x: "-50%",
            y: "-50%",
            scale: glowScale,
            opacity: glowOpacity,
            background:
              "radial-gradient(circle at center, rgba(18,165,148,0.24), rgba(95,211,192,0.12) 42%, rgba(250,250,248,0) 70%)",
          }}
        />

        {/* Giant ghost headline (decorative; real <h2> is in the section header).
            Resolves out of an oversized, soft, perspective-leaned ghost into a solid,
            sharp, upright title as the section enters. */}
        <motion.span
          aria-hidden
          className="pointer-events-none select-none text-center font-seed text-[clamp(5rem,20vw,19rem)] font-black uppercase leading-[0.82] tracking-tight text-brand-900 will-change-[transform,filter]"
          style={{
            opacity: headlineOpacity,
            scale: headlineScale,
            rotateX: headlineRotateX,
            filter: headlineFilter,
            transformPerspective: 1000,
          }}
        >
          Real
          <br />
          Results
        </motion.span>

        {/* Horizontal conveyor of before/after cards. */}
        {items.map((item, i) => (
          <SliderCard
            key={`${item.name}-${i}`}
            item={item}
            index={i}
            centred={centred}
            dirSign={dirSign}
          />
        ))}

        {/* NB: the doctor videos used to live HERE (crossfading into the pinned centre, then
            scrolling away). They now sit in normal flow as the real <DoctorVideos> section right
            after this track, pulled up so they RISE into this spot as the headline defocuses out
            — then they STAY (watchable, never trapped). See DoctorVideos + the HAND-OFF note. */}
      </div>
    </div>
  );
}

const RESULTS_HREF = "/hair-transplant-results/";

function SliderCard({
  item,
  index,
  centred,
  dirSign,
}: {
  item: Items[number];
  index: number;
  centred: MotionValue<number>;
  dirSign: number;
}) {
  // Signed distance (in card-units) of this card from the centre of the stage.
  const offset = useTransform(centred, (p) => index - p);

  // Slide horizontally (mirrored in RTL), tilt toward the edges + straighten at
  // centre, scale up + fade the far cards.
  const x = useTransform(offset, (d) => `${d * PITCH * dirSign}vw`);
  // Vertical arc (quadratic): cards droop below the centre proportional to the
  // SQUARE of their distance, so they trace a smooth curve (centre is the peak)
  // rather than a straight V — and the side cards sit decisively lower.
  const y = useTransform(offset, (d) => `${d * d * ARC_DROP}vh`);
  const rotate = useTransform(offset, (d) => {
    // Eased ramp to the ±30° cap (ease-out quad), matching the reference fan
    // shape rather than a flat per-card tilt: upright at centre, decisively
    // leaned by the time a card reaches the edge.
    const mag = MAX_TILT * (1 - Math.pow(1 - Math.min(Math.abs(d) / TILT_SPAN, 1), 2));
    return Math.sign(d) * mag * dirSign;
  });
  // Near-uniform size (the reference keeps every card the same size, `scale:none`,
  // and lets tilt + bleed create the hierarchy). A hair of falloff adds depth
  // without the awkward "small floating side card" look.
  const scale = useTransform(offset, (d) => Math.max(1 - Math.abs(d) * 0.05, 0.85));
  const opacity = useTransform(offset, (d) => {
    const a = Math.abs(d);
    if (a > 2.6) return 0;
    if (a > 2.2) return (2.6 - a) / 0.4;
    return 1;
  });
  const zIndex = useTransform(offset, (d) => Math.round(100 - Math.abs(d) * 10));
  // Keep far/invisible cards out of the focus + hit-test tree.
  const visibility = useTransform(opacity, (v) => (v > 0.05 ? "visible" : "hidden"));
  const pointerEvents = useTransform(offset, (d) => (Math.abs(d) < 1.2 ? "auto" : "none"));

  return (
    <motion.article
      style={{ left: "50%", top: "50%", x, y, rotate, scale, opacity, zIndex, visibility, pointerEvents }}
      transformTemplate={(_latest, generated) => `translate(-50%, -50%) ${generated}`}
      className="absolute w-[clamp(17rem,27vw,27rem)]"
    >
      {/* Borderless card (ethical-style): the before/after media fills the card
          edge-to-edge; the label chip + testimonial overlay sit on a bottom
          gradient scrim — no tinted panel, ring or padding frame. The whole card
          is the results link. */}
      <a
        href={RESULTS_HREF}
        aria-label={`View ${item.name}'s result`}
        className="group block overflow-hidden bg-brand-900 shadow-[0_28px_70px_-24px_rgba(7,19,49,0.5)] outline-none transition-shadow focus-visible:ring-4 focus-visible:ring-accent-500/70"
      >
        <div className="relative aspect-[2/3]">
          {item.video ? (
            <video
              aria-hidden
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={item.image}
              src={item.video}
            />
          ) : (
            <Image
              src={item.image}
              alt={`${item.name} — hair restoration before and after`}
              fill
              sizes="(max-width: 1280px) 27vw, 27rem"
              className="object-cover"
            />
          )}

          <span className="absolute end-3 top-3 rounded-pill bg-brand-900/70 px-3 py-1 text-[0.7rem] font-medium text-white">
            {item.label ?? "12-month result"}
          </span>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/90 via-brand-900/45 to-transparent px-4 pb-4 pt-20">
            {item.quote ? (
              <p className="text-pretty text-[1rem] font-semibold leading-snug text-white">
                “{item.quote}”
              </p>
            ) : null}
            <div className="mt-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-white/15 text-xs font-semibold text-white ring-1 ring-white/30">
                {initials(item.name)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-white">{item.name}</span>
                {item.location ? (
                  <span className="block truncate text-xs text-white/70">{item.location}</span>
                ) : null}
              </span>
              <span className="ms-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-white text-brand-900 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

/** Up to two initials from a display name (e.g. "Nick Y." -> "NY", "Luke" -> "L"). */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
