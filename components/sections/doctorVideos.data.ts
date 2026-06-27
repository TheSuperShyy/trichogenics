/**
 * "Meet the Best Hair Transplantation Doctors Overseas" video content — shared by
 * the in-pin reveal (ResultsSlider, desktop + motion) and the static fallback
 * section (DoctorVideos, mobile / reduced-motion). Single source of truth so the
 * two render paths never drift.
 *
 * The heading is reproduced verbatim from the live WordPress site (SEO keyword
 * parity); the IDs are Trichogenics' own channel uploads. Plain data only (no JSX)
 * so it is safe to import into the client-side slider bundle.
 */
export const DOCTOR_VIDEOS_EYEBROW = "Watch";
export const DOCTOR_VIDEOS_HEADING = "Meet the Best Hair Transplantation Doctors Overseas";
export const DOCTOR_VIDEOS_SUBHEAD =
  "Doctors, not technicians — hear from the ABHRS-certified surgeons who perform every procedure themselves.";

export const DOCTOR_VIDEOS_FEATURED = {
  id: "S_ZTPZ6u-zY",
  title: "Welcome to Trichogenics — meet Dr. Asi & Dr. Eric Peretz",
} as const;

export const DOCTOR_VIDEOS_SUPPORTING = [
  { id: "OjOBmVC4mc0", title: "The Trivellini implanter — manual, rotating & oscillating modes" },
  { id: "EvSqm2N5dz4", title: "Oral vs. topical finasteride, explained by our doctors" },
] as const;
