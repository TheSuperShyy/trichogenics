"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import type { MosaicContent } from "@/content/schema";

/**
 * Vanilla three.js mosaic scene, ported ~1:1 from the lab prototype
 * (public/lab/podium-mosaic.html). Autoplaying video tiles start clustered near
 * the centre and scatter into a spread mosaic as `progress` goes 0 → 1.
 *
 * This component is the ONLY place three.js is imported, and it is loaded via
 * next/dynamic({ ssr: false }) from MosaicSection — so three stays out of the
 * initial bundle and the server-rendered HTML (per the project's SEO rule). It is
 * mounted only on motion-safe desktop (its track is display:none otherwise) and
 * only once its stage nears the viewport (useInView in MosaicSection), so the six
 * clips never eager-load at hydration. The background white→navy and the
 * zoom-through intro line live in the DOM (MosaicSection), not here; this canvas is
 * transparent (alpha) and aria-hidden (purely decorative).
 *
 * The render loop reads the framer-motion `progress` MotionValue each frame and is
 * gated by an IntersectionObserver, which ALSO pauses the video decoders whenever
 * the stage scrolls off-screen — so the GPU and the six decode pipelines do no work
 * while the section is out of view.
 */

// Per-tile from→to geometry (cycled if the clip count differs). Ported verbatim
// from the lab: small + behind at centre → larger + spread across the frame.
const LAYOUT = [
  { from: { x: -0.3, y: 0.2, z: -1.0, s: 0.55, r: 0.05 }, to: { x: -3.5, y: 0.7, z: -0.4, s: 2.05, r: -0.04 } },
  { from: { x: 0.2, y: 0.0, z: -1.2, s: 0.55, r: -0.04 }, to: { x: 0.1, y: 1.7, z: -1.1, s: 2.3, r: 0.02 } },
  { from: { x: 0.3, y: -0.2, z: -0.8, s: 0.55, r: 0.03 }, to: { x: 3.4, y: 1.0, z: -0.7, s: 1.95, r: 0.05 } },
  { from: { x: -0.2, y: 0.1, z: -1.4, s: 0.55, r: -0.02 }, to: { x: -2.8, y: -1.6, z: -1.5, s: 2.15, r: 0.03 } },
  { from: { x: 0.1, y: -0.1, z: -1.1, s: 0.55, r: 0.04 }, to: { x: 0.7, y: -1.8, z: -0.3, s: 2.4, r: -0.03 } },
  { from: { x: 0.0, y: 0.3, z: -1.6, s: 0.55, r: -0.05 }, to: { x: 3.0, y: -1.4, z: -1.8, s: 2.0, r: 0.04 } },
];

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

type Tile = {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  video: HTMLVideoElement;
  onPause: () => void;
  layout: (typeof LAYOUT)[number];
};

export default function MosaicCanvas({
  progress,
  tiles,
}: {
  progress: MotionValue<number>;
  tiles: MosaicContent["tiles"];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setPixelRatio(dpr());
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight || 1,
      0.1,
      100,
    );
    camera.position.set(0, 0, 7.5);

    // Hidden pool that holds the actual <video> elements (muted/looping). Browsers
    // need them attached to keep decoding; they're 1px and invisible.
    const pool = document.createElement("div");
    pool.setAttribute("aria-hidden", "true");
    pool.style.cssText =
      "position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;";
    container.appendChild(pool);

    const geometry = new THREE.PlaneGeometry(1.78, 1.0);
    const items: Tile[] = [];

    // Set by the IntersectionObserver below. The video decoders only ever run while
    // the stage is genuinely on-screen; everything that resumes playback checks this.
    let intersecting = false;

    tiles.forEach((tile, i) => {
      const layout = LAYOUT[i % LAYOUT.length];
      if (!layout) return;

      const video = document.createElement("video");
      video.src = tile.src;
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      // preload="none": nothing fetches until we play(), and we only play while the
      // stage is on-screen (the IO below). Combined with the mount-gating in
      // MosaicSection, the clips never eager-load. Honours the project's video rule.
      video.preload = "none";
      video.crossOrigin = "anonymous";
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      pool.appendChild(video);

      // Self-heal: if a browser pauses a clip while the stage is genuinely visible,
      // resume it. Gated on `intersecting` so it never fights the deliberate pause we
      // do (pauseAll) when the section scrolls off-screen.
      const onPause = () => {
        if (intersecting && !document.hidden) void video.play().catch(() => {});
      };
      video.addEventListener("pause", onPause);

      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      items.push({ mesh, video, onPause, layout });
    });

    const playAll = () => items.forEach((it) => void it.video.play().catch(() => {}));
    const pauseAll = () => items.forEach((it) => it.video.pause());

    // First user gesture unlocks any clips the autoplay policy held back (muted
    // autoplay usually needs none, so this is a belt-and-suspenders fallback).
    const unlock = () => {
      if (intersecting) playAll();
    };
    const unlockEvents: (keyof WindowEventMap)[] = ["pointerdown", "touchstart", "keydown", "wheel"];
    unlockEvents.forEach((e) => window.addEventListener(e, unlock, { once: true }));

    let raf = 0;
    let running = false;

    const render = () => {
      const p = progress.get();
      for (let i = 0; i < items.length; i++) {
        const { mesh, layout } = items[i]!;
        const lp = clamp((p - i * 0.05) / 0.72, 0, 1);
        const e = easeInOut(lp);
        mesh.position.set(
          lerp(layout.from.x, layout.to.x, e),
          lerp(layout.from.y, layout.to.y, e),
          lerp(layout.from.z, layout.to.z, e),
        );
        const s = lerp(layout.from.s, layout.to.s, e);
        mesh.scale.set(s, s, 1);
        mesh.rotation.z = lerp(layout.from.r, layout.to.r, e);
        mesh.material.opacity = Math.min(1, lp * 1.6);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    // start/stop drive BOTH the GPU loop and the video decoders together, so nothing
    // decodes while the stage is off-screen (the big battery/CPU win).
    const start = () => {
      if (running) return;
      running = true;
      playAll();
      raf = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      pauseAll();
    };

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(dpr());
      renderer.setSize(w, h, false);
    };
    // ResizeObserver catches container size changes (dvh / mobile URL bar / late
    // first layout) that a window 'resize' misses; the window listener still covers
    // device-pixel-ratio changes (e.g. dragging across monitors).
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    window.addEventListener("resize", onResize);

    // The render loop no longer force-plays every frame, so explicitly resume on tab
    // return — but only if the stage is still on-screen.
    const onVisibility = () => {
      if (!document.hidden && intersecting) playAll();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Run the GPU loop AND the decoders only while the stage is on-screen.
    const io = new IntersectionObserver(
      (entries) => {
        intersecting = !!entries[0]?.isIntersecting;
        if (intersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(container);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      unlockEvents.forEach((e) => window.removeEventListener(e, unlock));
      items.forEach(({ mesh, video, onPause }) => {
        video.removeEventListener("pause", onPause);
        mesh.material.map?.dispose();
        mesh.material.dispose();
        video.pause();
        video.removeAttribute("src");
        video.load();
        video.remove();
      });
      geometry.dispose();
      // forceContextLoss releases the underlying WebGL context immediately and
      // deterministically. dispose() alone leaves the context for non-deterministic
      // GC, which leaks a context per remount (Strict-Mode double-invoke, HMR, route
      // re-entry) until the browser's ~16-context cap → black canvas. Order: lose the
      // context, then dispose tracked objects, then detach the canvas.
      renderer.forceContextLoss();
      renderer.dispose();
      renderer.domElement.remove();
      pool.remove();
    };
  }, [progress, tiles]);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden />;
}
