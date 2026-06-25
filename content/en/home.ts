import type { HomeContent } from "@/content/schema";

/**
 * English homepage — brand/clinic story, conversion-first.
 * Copy is adapted faithfully from the clinic's own site; the legacy hero error
 * ("Dubai and Israel") is corrected to Greece & Israel throughout.
 * Media paths point to /media/* (transcoded assets / placeholders).
 */
export const homeEn: HomeContent = {
  meta: {
    title: "Hair Transplant Doctors Abroad: American Board Certified Clinic",
    description:
      "ABHRS-certified hair loss restoration clinic overseas. Hair restoration physicians abroad in the best countries for transplant: Greece & Israel.",
    canonicalPath: "/",
    ogImage: "/media/og/dr-asi-dr-eric.jpg",
  },

  hero: {
    eyebrow: "ABHRS Board-Certified Surgeons",
    h1: "Natural, lasting hair restoration that looks like you.",
    subhead:
      "By American board-certified surgeons in Greece & Israel, focused on patient safety and results that last.",
    ctaPrimary: { label: "Book a Free Consultation", href: "/book-a-consult/" },
    ctaSecondary: { label: "Free AI Hair Analysis", href: "#ai-analysis" },
    trust: ["ABHRS Diplomates", "ISHRS Members", "World FUE Institute", "Rated on Trustpilot"],
    media: {
      kind: "video",
      src: "/media/hero/hero-loop.mp4",
      poster: "/media/hero/hero-loop.jpg",
      alt: "Trichogenics board-certified surgeons performing a hair restoration procedure",
    },
  },

  pressLogos: [
    { name: "New York Post" },
    { name: "Yahoo" },
    { name: "Today" },
    { name: "Forbes" },
    { name: "Elle" },
    { name: "Women's Day" },
    { name: "SheFinds" },
    { name: "Brit+Co" },
  ],

  credentials: [
    { title: "ABHRS Diplomates", subtitle: "American Board of Hair Restoration Surgery" },
    { title: "ISHRS Members", subtitle: "Int'l Society of Hair Restoration Surgery" },
    { title: "World FUE Institute", subtitle: "Advanced follicular-unit extraction" },
    { title: "Doctors, not technicians", subtitle: "Your surgery is performed by the surgeons" },
  ],

  beforeAfter: [
    { name: "Luke", quote: "Meticulous care from start to finish.", image: "/media/results/bf1.jpg" },
    { name: "Costa", quote: "Worth the journey — they explained every step.", image: "/media/results/bf2.jpg" },
    { name: "Dean", quote: "The team pours real pride into their work.", image: "/media/results/bf3.jpg" },
    { name: "Aidan", quote: "10/10 — a credit to the profession.", image: "/media/results/bf4.jpg" },
    { name: "Fede", quote: "Incredibly well organised and caring.", image: "/media/results/bf-5.jpg" },
    { name: "Peter", quote: "In my opinion, the best clinic in Greece.", image: "/media/results/bf-6.jpg" },
  ],

  process: [
    { step: 1, title: "Free consultation", body: "Share photos and goals online or book a video call — our surgeons review your case directly." },
    { step: 2, title: "Personalised plan & quote", body: "A tailored graft plan, hairline design, and transparent, all-inclusive pricing." },
    { step: 3, title: "Travel & arrival", body: "Airport pickup, vetted accommodation, and a chauffeur to the clinic — handled for you." },
    { step: 4, title: "Your procedure", body: "Performed by the doctors using the Trivellini system — not delegated to technicians." },
    { step: 5, title: "Recovery & aftercare", body: "Detailed aftercare, direct access to your team, and follow-up at every milestone." },
    { step: 6, title: "Results at 12 months", body: "Density and a natural hairline that keep maturing through the first year." },
  ],

  whyChoose: {
    heading: "Why patients choose Trichogenics",
    features: [
      { title: "Surgeon-performed care", body: "Every graft is placed under the direct work of board-certified surgeons." },
      { title: "Latest technology", body: "Trivellini Mamba extraction and the ASH Omni 3 microscope for precise, gentle harvesting." },
      { title: "Natural by design", body: "Hairlines designed for your face and age — undetectable, not 'transplanted'." },
      { title: "End-to-end concierge", body: "Travel, stay, and aftercare coordinated so you can focus on your result." },
    ],
  },

  doctors: {
    heading: "Meet the surgeons",
    intro:
      "Our dedicated team of experts at Trichogenics combines advanced skill with personalized care to achieve transformative hair restoration results. With years of specialized training, each team member is committed to making your experience comfortable, professional, and focused on your unique needs.",
    people: [
      {
        name: "Dr. Asi Peretz",
        title: "Scientific Director & Co-Founder",
        credentials: ["Diplomate, ABHRS"],
        memberships: ["World FUE Institute", "ISHRS Patient Safety Committee"],
        bio: "Globally recognized hair restoration surgeon. Diplomate of the American Board of Hair Restoration Surgery (ABHRS). Fellow of the World FUE Institute and ISHRS Patient Safety Committee Member.",
        photo: "/media/team/dr-asi-peretz.jpg",
      },
      {
        name: "Dr. Eric Peretz",
        title: "Co-Founder",
        credentials: ["Diplomate, ABHRS"],
        memberships: ["World FUE Institute"],
        bio: "World renowned hair restoration surgeon. Diplomate of the American Board of Hair Restoration Surgery (ABHRS). Fellow of the World FUE Institute.",
        photo: "/media/team/dr-eric-peretz.jpg",
      },
    ],
  },

  technology: {
    heading: "Technology built for natural results",
    items: [
      { title: "Trivellini Mamba", body: "A leading extraction system that adapts to each follicle, reducing transection and protecting grafts." },
      { title: "ASH Omni 3 microscope", body: "High-magnification graft preparation for clean, viable follicular units." },
      { title: "Surgical AI method", body: "Data-guided planning that supports density and a balanced, age-appropriate hairline." },
    ],
  },

  stats: {
    items: [
      // TODO(content): confirm real figures with the clinic (see context.md §8).
      { value: "2M+", label: "Grafts placed" },
      { value: "1,500+", label: "Patients treated" },
      { value: "2", label: "Clinics: Greece & Israel" },
      { value: "4.9★", label: "Trustpilot rating" },
    ],
  },

  included: {
    heading: "What's included when you travel to us",
    body: "Hair restoration abroad should be reassuring, not stressful. Your package is coordinated end to end.",
    items: [
      "Surgeon-led consultation and hairline design",
      "Airport pickup and clinic chauffeur",
      "Vetted accommodation near the clinic",
      "The procedure, medication, and aftercare kit",
      "Structured follow-ups through your first year",
    ],
    cta: { label: "Book a Free Consultation", href: "/book-a-consult/" },
  },

  testimonials: {
    heading: "Real patients, real results",
    items: [
      { name: "Luke", quote: "Excellent care and attention to detail — Dr. Asi and Dr. Eric are friendly and meticulous about quality." },
      { name: "Costa", location: "Australia", quote: "After a year of research I chose Trichogenics for how clearly they explained the whole process. Worth the long journey." },
      { name: "Aidan", quote: "10/10, would give more if I could. Dr. Eric and the team are a credit to their profession." },
    ],
  },

  locations: {
    heading: "Two clinics, one standard of care",
    items: [
      {
        name: "Trichogenics — Thessaloniki",
        countryName: "Greece",
        address: "Karatasou 1, Thessaloniki",
      },
      {
        name: "Trichogenics — Herzlia",
        countryName: "Israel",
        address: "Hanadiv 71, Herzlia",
      },
    ],
  },

  faq: {
    heading: "Hair transplant FAQs",
    items: [
      {
        question: "Are your surgeons really board-certified?",
        answer:
          "Yes. Our founders are Diplomates of the American Board of Hair Restoration Surgery (ABHRS) and members of the ISHRS and World FUE Institute. Your procedure is performed by the surgeons themselves.",
      },
      {
        question: "Why have a hair transplant in Greece or Israel?",
        answer:
          "You get American board-certified standards at a fraction of US pricing, in two destinations that are among the best in the world for hair restoration — with travel and accommodation coordinated for you.",
      },
      {
        question: "Is the procedure painful?",
        answer:
          "The procedure is performed under local anaesthetic and most patients describe it as comfortable. You'll receive detailed aftercare and direct access to your team during recovery.",
      },
      {
        question: "How long until I see results?",
        answer:
          "New growth typically begins around 3–4 months, with most density and a maturing, natural hairline visible by 12 months.",
      },
      {
        question: "What does it cost, and what's included?",
        answer:
          "Pricing is transparent and all-inclusive — consultation, the procedure, medication, aftercare, and travel coordination. Your exact quote depends on the graft plan agreed at consultation.",
      },
    ],
  },
};
