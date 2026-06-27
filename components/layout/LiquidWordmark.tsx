"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useScroll } from "motion/react";

type Pt = { fx: number; fy: number; sx: number; sy: number; r: number };

/**
 * Liquid / gooey brand wordmark for the footer bottom. A <canvas> draws solid
 * blobs sampled from the glyph outlines of `text`; an SVG gooey filter
 * (feGaussianBlur + alpha feColorMatrix, applied via CSS) merges overlapping
 * blobs into liquid letterforms. The filter works on a transparent background,
 * so it sits seamlessly on the navy footer (no opaque band, no seam).
 *
 * Scroll morphs the blobs from SCATTERED (loose band of microbe-like blobs) to
 * FORMED (the word) as the footer scrolls fully into view — driven off
 * `useScroll` via a ref the rAF loop reads, so React never re-renders per frame.
 * Reduced motion renders the word formed and static. The on-screen mark is
 * decorative (`aria-hidden`); an `sr-only` copy keeps the name accessible.
 */
export function LiquidWordmark({
  text = "Trichogenics",
  color = "#FAFAF8",
}: {
  text?: string;
  color?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: Pt[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let disposed = false;
    let displayT = reduce ? 1 : scrollYProgress.get();
    let targetT = displayT;

    // Deterministic PRNG: keeps the scatter stable across resamples (resize) so
    // blobs don't reshuffle, and avoids depending on Math.random for layout.
    let seed = 20260628;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    const sample = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const off = document.createElement("canvas");
      const octx = off.getContext("2d");
      if (!octx) return;

      // Resolved family (var() substituted) so canvas gets a real font name.
      const family =
        getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";

      // Size the word to ~90% of the band width, capped by height.
      const probe = 100;
      octx.font = `700 ${probe}px ${family}`;
      const probeW = octx.measureText(text).width || 1;
      let fontSize = ((w * 0.9) / probeW) * probe;
      fontSize = Math.min(fontSize, h * 0.86);

      octx.font = `700 ${fontSize}px ${family}`;
      const m = octx.measureText(text);
      const textW = m.width;
      const ascent = m.actualBoundingBoxAscent || fontSize * 0.72;
      const descent = m.actualBoundingBoxDescent || fontSize * 0.22;
      const textH = ascent + descent;

      off.width = Math.max(1, Math.ceil(textW));
      off.height = Math.max(1, Math.ceil(textH));
      octx.font = `700 ${fontSize}px ${family}`;
      octx.fillStyle = "#fff";
      octx.textBaseline = "alphabetic";
      octx.fillText(text, 0, ascent);

      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const step = Math.max(5, Math.round(fontSize / 13));
      const baseR = step * 0.62;
      const ox = (w - textW) / 2;
      const oy = (h - textH) / 2;

      seed = 20260628;
      const next: Pt[] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const alpha = data[(y * off.width + x) * 4 + 3] ?? 0;
          if (alpha > 128) {
            next.push({
              fx: ox + x,
              fy: oy + y,
              sx: rnd() * w,
              sy: h * 0.5 + (rnd() - 0.5) * h * 0.8,
              r: baseR * (0.85 + rnd() * 0.5),
            });
          }
        }
      }
      points = next;
    };

    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      const e = ease(Math.max(0, Math.min(1, displayT)));
      for (const p of points) {
        const x = p.sx + (p.fx - p.sx) * e;
        const y = p.sy + (p.fy - p.sy) * e;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      displayT += (targetT - displayT) * 0.14;
      draw();
      if (Math.abs(targetT - displayT) > 0.002) {
        raf = requestAnimationFrame(loop);
      } else {
        displayT = targetT;
        draw();
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(loop);
    };

    // Canvas text needs the brand font loaded before sampling.
    const ready =
      (document as Document & { fonts?: FontFaceSet }).fonts?.ready ??
      Promise.resolve();
    ready.then(() => {
      if (disposed) return;
      sample();
      draw();
    });

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        sample();
        draw();
      });
    };
    window.addEventListener("resize", onResize);

    let unsub = () => {};
    if (!reduce) {
      unsub = scrollYProgress.on("change", (v) => {
        targetT = v;
        kick();
      });
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      unsub();
    };
  }, [text, color, reduce, scrollYProgress]);

  return (
    <div className="relative w-full overflow-hidden">
      <span className="sr-only">{text}</span>
      <div ref={wrapRef} aria-hidden className="relative h-[clamp(4.5rem,15vw,12rem)] w-full">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
          style={{ filter: "url(#liquid-goo)" }}
        />
      </div>
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <defs>
          <filter
            id="liquid-goo"
            x="-15%"
            y="-30%"
            width="130%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
