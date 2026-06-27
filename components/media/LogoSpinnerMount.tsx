"use client";

/**
 * Client-only mount for the 3D logo. `next/dynamic` with `ssr:false` is only
 * allowed inside a Client Component, so this thin wrapper isolates it: three.js
 * is never imported on the server, keeping it out of SEO-critical HTML/bundles.
 */

import dynamic from "next/dynamic";

const LogoSpinner3D = dynamic(() => import("./LogoSpinner3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-ink-700/50">
      Loading 3D…
    </div>
  ),
});

/** Brand-coloured defaults live in LogoSpinner3D; props here let a call site override. */
export default function LogoSpinnerMount(props: {
  src?: string;
  colorMain?: string;
  colorAccent?: string;
}) {
  return <LogoSpinner3D {...props} />;
}
