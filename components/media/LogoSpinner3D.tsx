"use client";

/**
 * Real-time 3D, freewheeling Trichogenics mark — vanilla three.js.
 *
 * The 2D logo is traced to ONE SVG (public/media/brand/logo-mark.svg) and extruded
 * into a true 3D mesh at runtime, then spun like a free-floating object: it idles
 * with a gentle baseline rotation, and a drag/flick imparts angular momentum that
 * freewheels and slowly winds back down to the idle — full 360° on every axis, not
 * a camera orbit clamped to a tilt band.
 *
 * Spin model (custom, replacing OrbitControls): the camera is fixed and the mesh
 * group itself is rotated via `rotateOnWorldAxis` on the world X/Y axes, so there's
 * no gimbal lock and no polar clamp — it can tumble end-over-end and keep going.
 * Angular velocity (vx, vy) is driven by pointer drag, decays by FRICTION each
 * frame after release (the freewheel), and converges toward a small idle Y-spin so
 * it's always alive, "not only when clicked."
 *
 * Two-tone is done by COLOUR ONLY on the single clean geometry (no re-tracing): the
 * traced path yields 5 sub-shapes — the two circle arcs (which touch the outer
 * edges) + the centre strand (dead-centre) get `colorMain`; the two interior,
 * off-centre side strands get `colorAccent`.
 *
 * Deliberately plain three.js, not @react-three/fiber: R3F globally augments
 * JSX.IntrinsicElements, which breaks the app's polymorphic <Container as={...}>
 * typing. Mounted via next/dynamic `ssr:false` (LogoSpinnerMount) so three.js
 * never runs on the server / never ships to SEO-critical pages.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

export default function LogoSpinner3D({
  src = "/media/brand/logo-mark.svg",
  colorMain = "#071331", // brand navy — circle + centre strand
  colorAccent = "#12A594", // accent teal — side strands
}: {
  src?: string;
  colorMain?: string;
  colorAccent?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.set(0, 0, 600);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.touchAction = "none"; // let us own touch drags (no page scroll)
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(300, 400, 500);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9bb7d4, 0.5);
    fill.position.set(-400, -200, -300);
    scene.add(fill);

    // Respect the project motion rule: the idle baseline spin runs only when motion
    // is allowed. Drag-to-spin (and its freewheel after release) stays available to
    // everyone — it's user-initiated, not ambient motion.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Freewheel spin state -------------------------------------------------
    const X_AXIS = new THREE.Vector3(1, 0, 0);
    const Y_AXIS = new THREE.Vector3(0, 1, 0);
    const FRICTION = 0.95; // per-frame momentum decay after release (the freewheel)
    const IDLE_VY = 0.0035; // gentle baseline Y-spin (rad/frame) so it's never dead
    const DRAG_SENS = 0.006; // pointer px -> rad/frame
    const MAX_V = 0.4; // cap a hard flick so it can't spin into a blur
    const idleVy = prefersReduced ? 0 : IDLE_VY;

    let logo: THREE.Group | null = null;
    let vx = 0; // angular velocity about world X (vertical drag -> tumble)
    let vy = idleVy; // angular velocity about world Y (horizontal drag -> spin)
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let activePointer: number | null = null;

    const clamp = (v: number) => Math.max(-MAX_V, Math.min(MAX_V, v));

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      activePointer = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
      vx = 0; // catch the spinning mark on grab
      vy = 0;
      renderer.domElement.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== activePointer) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      vy = clamp(dx * DRAG_SENS);
      vx = clamp(dy * DRAG_SENS);
      // Apply immediately so the drag tracks the pointer 1:1 (the animate loop only
      // integrates velocity when NOT dragging, so this never double-applies).
      if (logo) {
        logo.rotateOnWorldAxis(Y_AXIS, vy);
        logo.rotateOnWorldAxis(X_AXIS, vx);
      }
    };

    const endDrag = (e: PointerEvent) => {
      if (e.pointerId !== activePointer) return;
      dragging = false;
      activePointer = null;
      // velocity from the last move is kept -> the flick freewheels.
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", endDrag);
    renderer.domElement.addEventListener("pointercancel", endDrag);

    let disposed = false;
    let raf = 0;
    const disposables: { dispose: () => void }[] = [];

    const makeMat = (c: string) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(c),
        metalness: 0.35,
        roughness: 0.35,
        // The y-flip below uses a negative scale, which inverts triangle winding;
        // DoubleSide keeps both faces drawn so the mark never culls to invisible
        // when it tumbles to show its back.
        side: THREE.DoubleSide,
      });

    new SVGLoader().load(src, (data) => {
      if (disposed) return;

      const matMain = makeMat(colorMain);
      const matAccent = makeMat(colorAccent);
      disposables.push(matMain, matAccent);

      const settings: THREE.ExtrudeGeometryOptions = {
        depth: 18,
        bevelEnabled: true,
        bevelThickness: 2.4,
        bevelSize: 1.6,
        bevelSegments: 4,
        steps: 1,
      };

      // Pass 1: build every sub-shape's geometry + record its x-extent.
      const parts: { geometry: THREE.ExtrudeGeometry; minX: number; maxX: number }[] = [];
      for (const path of data.paths) {
        for (const shape of SVGLoader.createShapes(path)) {
          const geometry = new THREE.ExtrudeGeometry(shape, settings);
          geometry.computeBoundingBox();
          disposables.push(geometry);
          const bb = geometry.boundingBox!;
          parts.push({ geometry, minX: bb.min.x, maxX: bb.max.x });
        }
      }

      const allMinX = Math.min(...parts.map((p) => p.minX));
      const allMaxX = Math.max(...parts.map((p) => p.maxX));
      const totalW = allMaxX - allMinX || 1;
      const centerX = (allMinX + allMaxX) / 2;

      // Pass 2: colour by role. Circle arcs touch the outer edges; the centre
      // strand sits on the centre line — both = main tone. Everything else
      // (the off-centre side strands) = accent tone.
      const group = new THREE.Group();
      for (const p of parts) {
        const cx = (p.minX + p.maxX) / 2;
        const touchesEdge = p.minX <= allMinX + 0.04 * totalW || p.maxX >= allMaxX - 0.04 * totalW;
        const isCentered = Math.abs(cx - centerX) < 0.08 * totalW;
        group.add(new THREE.Mesh(p.geometry, touchesEdge || isCentered ? matMain : matAccent));
      }
      group.scale.y = -1; // SVG space is y-down — flip upright

      // Re-centre the geometry inside a parent pivot so all rotation happens about
      // the mark's true centre (the child carries the offset; the pivot spins).
      const box = new THREE.Box3().setFromObject(group);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);
      group.position.sub(center);

      const pivot = new THREE.Group();
      pivot.add(group);
      scene.add(pivot);
      logo = pivot;

      const maxDim = Math.max(size.x, size.y, size.z) || 100;
      const dist = maxDim / 2 / Math.tan((camera.fov * Math.PI) / 360);
      camera.position.set(0, 0, dist * 1.7);
      camera.near = dist / 100;
      camera.far = dist * 100;
      camera.updateProjectionMatrix();
    });

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (logo && !dragging) {
        // Freewheel: momentum decays toward the idle baseline (vy) / toward rest (vx).
        vx *= FRICTION;
        vy = vy * FRICTION + idleVy * (1 - FRICTION);
        logo.rotateOnWorldAxis(Y_AXIS, vy);
        logo.rotateOnWorldAxis(X_AXIS, vx);
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    // ResizeObserver fires immediately with the current size (fixing a 0-height
    // canvas at mount) and on every container resize.
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", endDrag);
      renderer.domElement.removeEventListener("pointercancel", endDrag);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [src, colorMain, colorAccent]);

  return <div ref={mountRef} className="h-full w-full" />;
}
