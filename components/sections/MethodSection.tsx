import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { BlurReveal } from "@/components/ui/BlurReveal";
import { CountUp } from "@/components/ui/CountUp";
import LogoSpinnerMount from "@/components/media/LogoSpinnerMount";

/**
 * "The Trichogenics method" — seed.com ViaCap-style technology explainer: a large
 * rounded glass card with eyebrow + problem/solution heading + an outlined stat
 * card on the start side, and a central visual (placeholder for a future 3D/AI
 * graft render) flanked by two annotated callouts on the end side.
 */
export function MethodSection() {
  return (
    <section className="relative overflow-hidden bg-sand-50 py-12">
      {/* Full-bleed section background image (visible around the glass card). */}
      <Image src="/media/method/bg.jpg" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-sand-50/25" />

      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-gutter">
        {/* Glassmorphism card — floats up on scroll. The card itself is the
            motion element (animating a parent would break its backdrop-blur). */}
        <Reveal
          y={40}
          className="overflow-hidden rounded-[2.5rem] bg-white/40 shadow-lg ring-1 ring-white/50 backdrop-blur-2xl"
        >
          <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:gap-10 lg:p-16">
            {/* Start: eyebrow + heading + stat. Each line whispers up out of a
                soft blur, lightly staggered; the stat counts up on reveal. */}
            <div className="flex flex-col">
              <BlurReveal
                as="p"
                x={-64}
                duration={1.9}
                delay={0}
                className="flex items-center gap-2 text-eyebrow font-semibold uppercase text-accent-700"
              >
                <span className="h-2 w-2 rounded-pill bg-accent-500" />
                The Trichogenics method
              </BlurReveal>
              <BlurReveal
                as="h2"
                x={-64}
                duration={1.9}
                delay={0.14}
                className="mt-5 max-w-md font-seed text-h2 font-normal text-brand-800"
              >
                Most hair transplants stress the grafts. Ours protects every follicle.
              </BlurReveal>

              <BlurReveal
                as="div"
                x={-64}
                duration={1.9}
                delay={0.28}
                className="mt-8 flex max-w-md items-center justify-between gap-4 rounded-lg border border-brand-900/10 bg-white/60 p-5"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="rounded-pill border border-brand-900/15 px-2.5 py-0.5 text-xs font-semibold text-brand-800">
                    FUE &amp; DHI
                  </span>
                  <span className="text-sm font-medium text-brand-800">Natural-looking density°</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-pill bg-accent-500 text-white">
                    <ArrowUpIcon className="h-4 w-4" />
                  </span>
                  <span className="font-seed text-3xl font-semibold tabular-nums text-brand-800">
                    <CountUp value="95%+" duration={2.2} />
                  </span>
                </div>
              </BlurReveal>
              <BlurReveal as="p" x={-64} duration={1.9} delay={0.42} className="mt-4 text-sm text-ink-700/60">
                °With board-certified graft placement.
              </BlurReveal>
            </div>

            {/* End: visual + annotated callouts */}
            <div>
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
                {/* Outer callout */}
                <BlurReveal as="div" x={64} duration={1.9} delay={0.2} className="lg:self-start lg:text-end">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-800">Extraction</p>
                  <p className="mt-1 text-sm text-ink-700">
                    Follicular units are harvested individually with the Trivellini system, minimising damage.
                  </p>
                  <span className="mt-2 hidden h-px w-16 border-t border-dashed border-brand-900/30 lg:ms-auto lg:block" />
                </BlurReveal>

                {/* Central visual: the real-time 3D, drag-to-spin Trichogenics
                    mark (navy circle + centre strand, teal side strands).
                    Client-only (three.js, ssr:false) so it never touches the
                    SEO-critical server HTML. */}
                <div className="relative mx-auto flex h-[360px] w-[290px] items-center justify-center sm:h-[430px] sm:w-[350px] lg:h-[500px] lg:w-[400px]">
                  <div className="absolute -inset-6 rounded-full bg-accent-300/20 blur-3xl" />
                  <div
                    role="img"
                    aria-label="Interactive 3D Trichogenics emblem. Drag to spin it."
                    className="relative h-full w-full cursor-grab active:cursor-grabbing"
                  >
                    <LogoSpinnerMount />
                  </div>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[0.7rem] font-medium uppercase tracking-wide text-ink-700/45">
                    Drag to spin
                  </span>
                </div>

                {/* Inner callout */}
                <BlurReveal as="div" x={64} duration={1.9} delay={0.42} className="lg:self-end">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-800">Placement</p>
                  <p className="mt-1 text-sm text-ink-700">
                    Each graft is placed by the surgeons at the right angle and density for a natural hairline.
                  </p>
                  <span className="mt-2 hidden h-px w-16 border-t border-dashed border-brand-900/30 lg:block" />
                </BlurReveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
