"use client";

import Script from "next/script";
import { useCallback, useRef } from "react";
import { SITE } from "@/lib/site";

declare global {
  interface Window {
    hbspt?: {
      forms: { create: (opts: Record<string, unknown>) => void };
    };
  }
}

/**
 * HubSpot form embed (portal 49196064). Loads the v2 embed script lazily and
 * creates the form into a target div. Keeping the official embed preserves
 * HubSpot's validation, spam protection, and CRM wiring.
 */
export function HubSpotForm({ formId, className }: { formId: string; className?: string }) {
  const targetId = `hs-${formId}`;
  const created = useRef(false);

  const create = useCallback(() => {
    if (created.current || !window.hbspt) return;
    window.hbspt.forms.create({
      portalId: SITE.integrations.hubspot.portalId,
      region: SITE.integrations.hubspot.region,
      formId,
      target: `#${targetId}`,
    });
    created.current = true;
  }, [formId, targetId]);

  return (
    <>
      <div id={targetId} className={className}>
        <p className="text-center text-sm text-ink-700/50">Loading form…</p>
      </div>
      <Script
        src="//js.hsforms.net/forms/embed/v2.js"
        strategy="lazyOnload"
        onReady={create}
        onLoad={create}
      />
    </>
  );
}
