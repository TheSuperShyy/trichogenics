"use client";

/**
 * Real-time 3D, drag-to-spin Trichogenics mark — vanilla three.js.
 *
 * The 2D logo is traced to ONE SVG (public/media/brand/logo-mark.svg) and extruded
 * into a true 3D mesh at runtime, then auto-rotated with OrbitControls so it can be
 * grabbed and spun like a pin.
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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(300, 400, 500);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9bb7d4, 0.5);
    fill.position.set(-400, -200, -300);
    scene.add(fill);

    // Respect the project motion rule: auto-spin only when motion is allowed.
    // Drag-to-spin stays available to everyone (it's user-initiated, not motion).
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = !prefersReduced;
    controls.autoRotateSpeed = 1.8;
    controls.minPolarAngle = Math.PI / 2 - 0.7;
    controls.maxPolarAngle = Math.PI / 2 + 0.7;

    let disposed = false;
    let raf = 0;
    const disposables: { dispose: () => void }[] = [];

    const makeMat = (c: string) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(c),
        metalness: 0.35,
        roughness: 0.35,
        // The y-flip below uses a negative scale, which inverts triangle winding;
        // DoubleSide keeps both faces drawn so the mark never culls to invisible.
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
      const logo = new THREE.Group();
      for (const p of parts) {
        const cx = (p.minX + p.maxX) / 2;
        const touchesEdge = p.minX <= allMinX + 0.04 * totalW || p.maxX >= allMaxX - 0.04 * totalW;
        const isCentered = Math.abs(cx - centerX) < 0.08 * totalW;
        logo.add(new THREE.Mesh(p.geometry, touchesEdge || isCentered ? matMain : matAccent));
      }
      logo.scale.y = -1; // SVG space is y-down — flip upright

      const box = new THREE.Box3().setFromObject(logo);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);
      logo.position.sub(center);
      scene.add(logo);

      const maxDim = Math.max(size.x, size.y, size.z) || 100;
      const dist = maxDim / 2 / Math.tan((camera.fov * Math.PI) / 360);
      camera.position.set(0, 0, dist * 1.7);
      camera.near = dist / 100;
      camera.far = dist * 100;
      camera.updateProjectionMatrix();
      controls.update();
    });

    const animate = () => {
      raf = requestAnimationFrame(animate);
      controls.update();
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
      controls.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [src, colorMain, colorAccent]);

  return <div ref={mountRef} className="h-full w-full" />;
}
