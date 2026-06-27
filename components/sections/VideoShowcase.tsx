"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const clips = [
  { src: "/media/video/clip-1.mp4", poster: "/media/video/clip-1.jpg", caption: "Hairline design" },
  { src: "/media/video/clip-2.mp4", poster: "/media/video/clip-2.jpg", caption: "Sterile preparation" },
  { src: "/media/video/clip-3.mp4", poster: "/media/video/clip-3.jpg", caption: "Graft preparation" },
  { src: "/media/video/clip-4.mp4", poster: "/media/video/clip-4.jpg", caption: "Surgical precision" },
  { src: "/media/video/clip-5.mp4", poster: "/media/video/clip-5.jpg", caption: "FUE extraction" },
  { src: "/media/video/clip-6.mp4", poster: "/media/video/clip-6.jpg", caption: "Doctor-performed surgery" },
];

/**
 * Video showcase — seed.com-style carousel of prep/expertise clips. Centred
 * heading, a large centred video with neighbours peeking, and a seed-style
 * control cluster: a mute toggle, the current clip's play/pause + caption pill,
 * and a thumbnail of the *next* clip (click to advance). The play-pill and the
 * next-thumbnail swap sides depending on which clip is showing. The centred clip
 * AUTOPLAYS (muted, per browser policy — the mute button enables sound); the
 * play/pause button can still pause it. Honours prefers-reduced-motion.
 */
export function VideoShowcase() {
  const locale = useLocale();
  const [emblaRef, embla] = useEmblaCarousel({
    align: "center",
    loop: true,
    direction: locale === "he" ? "rtl" : "ltr",
  });
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true); // muted so the centred clip can autoplay
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mutedRef = useRef(true);
  const reducedMotionRef = useRef(false);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  // Detect prefers-reduced-motion once (skip autoplay if set); mirror muted into
  // a ref so the autoplay effect can read it without restarting on mute toggle.
  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
  }, []);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  // On selection change: autoplay the centred clip (muted, per browser policy),
  // pause + rewind every other clip. Skips autoplay under reduced-motion.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === selected && !reducedMotionRef.current) {
        v.muted = mutedRef.current;
        v.currentTime = 0;
        const p = v.play();
        if (p && typeof p.then === "function") {
          p.then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else {
          setPlaying(true);
        }
      } else {
        v.pause();
        v.currentTime = 0;
        if (i === selected) setPlaying(false);
      }
    });
  }, [selected]);

  // Keep the mute state mirrored onto the video elements (without restarting).
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = muted;
    });
  }, [muted, selected]);

  const togglePlay = useCallback(() => {
    const v = videoRefs.current[selected];
    if (!v) return;
    if (v.paused) {
      v.muted = muted;
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [selected, muted]);

  const active = clips[selected] ?? clips[0]!;
  const prevIndex = (selected - 1 + clips.length) % clips.length;
  const nextIndex = (selected + 1) % clips.length;
  const prev = clips[prevIndex] ?? clips[0]!;
  const next = clips[nextIndex] ?? clips[0]!;

  return (
    <section className="bg-sand-50 pt-4 pb-3">
      <Container>
        {/* Centred header — seed-style */}
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Inside the clinic</Eyebrow>
          <h2 className="max-w-3xl text-h2 font-normal text-brand-800">
            Preparation and expertise, in motion
          </h2>
          <p className="max-w-xl text-base text-ink-700">
            A look inside the work, from hairline design and graft preparation to the precision of the
            procedure itself.
          </p>
        </Reveal>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {clips.map((clip, i) => (
              <div key={clip.src} className="min-w-0 shrink-0 grow-0 basis-[88%] px-3 sm:basis-[66%] lg:basis-[60%]">
                <div
                  className={cn(
                    "group relative aspect-video overflow-hidden rounded-xl bg-brand-900 shadow-xl transition-all duration-500",
                    i === selected ? "scale-100 opacity-100" : "scale-[0.92] opacity-45",
                  )}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    className="h-full w-full object-cover"
                    loop
                    playsInline
                    preload="metadata"
                    poster={clip.poster}
                    src={clip.src}
                  />
                  {i === selected ? (
                    <button
                      type="button"
                      aria-label="Fullscreen"
                      onClick={() => videoRefs.current[i]?.requestFullscreen?.()}
                      className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-pill bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
                    >
                      <ExpandIcon className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seed-style control cluster: mute · prev-clip · play+caption · next-clip */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-pill bg-sand-200 p-1">
            <button
              type="button"
              aria-label={muted ? "Unmute" : "Mute"}
              aria-pressed={muted}
              onClick={() => setMuted((m) => !m)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-brand-800 text-white transition-colors hover:bg-brand-700"
            >
              {muted ? <MutedIcon className="h-4 w-4" /> : <SoundIcon className="h-4 w-4" />}
            </button>

            {/* Left circle = previous clip */}
            <ThumbButton
              poster={prev.poster}
              label={`Previous clip: ${prev.caption}`}
              onClick={() => embla?.scrollPrev()}
            />

            {/* Current clip — play/pause + caption */}
            <div className="flex items-center gap-1.5 rounded-pill bg-white py-1 ps-1 pe-3.5 shadow-sm">
              <button
                type="button"
                aria-label={playing ? "Pause" : "Play"}
                onClick={togglePlay}
                className="inline-flex h-7 w-7 items-center justify-center rounded-pill text-brand-800 transition-colors hover:bg-sand-100"
              >
                {playing ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="h-3.5 w-3.5" />}
              </button>
              <span className="text-sm font-medium text-brand-800">{active.caption}</span>
            </div>

            {/* Right circle = next clip */}
            <ThumbButton
              poster={next.poster}
              label={`Next clip: ${next.caption}`}
              onClick={() => embla?.scrollNext()}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Small circular clip thumbnail used as a prev/next nav button (image, not arrow). */
function ThumbButton({
  poster,
  label,
  onClick,
}: {
  poster: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="h-9 w-9 shrink-0 overflow-hidden rounded-pill ring-2 ring-white transition-transform hover:scale-105 focus-visible:scale-105"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="h-full w-full object-cover" />
    </button>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

function SoundIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
      <path d="M16 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12" strokeLinecap="round" />
    </svg>
  );
}

function MutedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
      <path d="m17 9 4 6M21 9l-4 6" strokeLinecap="round" />
    </svg>
  );
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
