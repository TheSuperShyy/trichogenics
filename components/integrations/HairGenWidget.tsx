"use client";

import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * HairGen AI hair-analysis widget. Loads the embed script lazily and mounts the
 * widget into its root element. (If HairGen's embed expects different attribute
 * names, adjust here per their docs — the token/script are in lib/site.ts.)
 */
export function HairGenWidget() {
  return (
    <>
      <div
        id="hairgen-ai-widget-custom"
        data-token={SITE.integrations.hairgen.token}
        className="min-h-[420px] w-full"
      />
      <Script src={SITE.integrations.hairgen.scriptSrc} strategy="lazyOnload" />
    </>
  );
}
