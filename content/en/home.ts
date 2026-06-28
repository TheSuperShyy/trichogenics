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

  // "As featured in" — logos migrated from the live trichogenics.com press strip
  // (assets in public/media/press/). width/height = intrinsic ratio for next/image.
  pressLogos: [
    { name: "New York Post", src: "/media/press/new-york-post.webp", width: 600, height: 92 },
    { name: "Yahoo", src: "/media/press/yahoo.webp", width: 768, height: 191 },
    { name: "Today", src: "/media/press/today.webp", width: 768, height: 576 },
    { name: "Forbes", src: "/media/press/forbes.webp", width: 450, height: 118 },
    { name: "Elle", src: "/media/press/elle-transparent.webp", width: 300, height: 108 },
    { name: "Women's Day", src: "/media/press/womens-day.webp", width: 768, height: 147 },
    { name: "SheFinds", src: "/media/press/shefinds.webp", width: 150, height: 136 },
    { name: "Brit+Co", src: "/media/press/brit-co.webp", width: 450, height: 74 },
  ],

  // "Proud members of:" — professional certification badges from the live site
  // (assets in public/media/members/, full-colour transparent WebP).
  memberLogos: [
    { name: "American Board of Hair Restoration Surgery (ABHRS)", src: "/media/members/abhrs.webp", width: 322, height: 180 },
    { name: "International Society of Hair Restoration Surgery (ISHRS)", src: "/media/members/ishrs.webp", width: 276, height: 166 },
    { name: "World FUE Institute", src: "/media/members/worldfue.webp", width: 438, height: 194 },
  ],

  credentials: [
    { title: "ABHRS Diplomates", subtitle: "American Board of Hair Restoration Surgery" },
    { title: "ISHRS Members", subtitle: "Int'l Society of Hair Restoration Surgery" },
    { title: "World FUE Institute", subtitle: "Advanced follicular-unit extraction" },
    { title: "Doctors, not technicians", subtitle: "Your surgery is performed by the surgeons" },
  ],

  beforeAfter: [
    { name: "Luke", quote: "Meticulous care from start to finish.", image: "/media/results/bf1.jpg" },
    { name: "Costa", quote: "Worth the journey. They explained every step.", image: "/media/results/bf2.jpg" },
    { name: "Dean", quote: "The team pours real pride into their work.", image: "/media/results/bf3.jpg" },
    { name: "Aidan", quote: "10/10. A credit to the profession.", image: "/media/results/bf4.jpg" },
    { name: "Fede", quote: "Incredibly well organised and caring.", image: "/media/results/bf-5.jpg" },
    { name: "Peter", quote: "In my opinion, the best clinic in Greece.", image: "/media/results/bf-6.jpg" },
  ],

  // Decorative WebGL interlude after the doctors/YouTube section — autoplaying clinic
  // clips scatter into a mosaic as the line zooms through. Copy is editable here; the
  // tile geometry lives in the component. Reuses the existing transcoded clip-*.mp4.
  mosaic: {
    eyebrow: "A closer look",
    heading: "Here is a deeper look into",
    emphasis: "our work.",
    tiles: [
      { src: "/media/video/clip-1.mp4", alt: "Inside the Trichogenics clinic" },
      { src: "/media/video/clip-3.mp4", alt: "Trichogenics surgeons at work" },
      { src: "/media/video/clip-5.mp4", alt: "Hair restoration procedure detail" },
      { src: "/media/video/clip-2.mp4", alt: "The Trichogenics clinic environment" },
      { src: "/media/video/clip-6.mp4", alt: "Consultation and graft planning" },
      { src: "/media/video/clip-4.mp4", alt: "Patient care at Trichogenics" },
    ],
  },

  process: [
    { step: 1, title: "Free consultation", body: "Share photos and goals online or book a video call. Our surgeons review your case directly." },
    { step: 2, title: "Personalised plan & quote", body: "A tailored graft plan, hairline design, and transparent, all-inclusive pricing." },
    { step: 3, title: "Travel & arrival", body: "Airport pickup, vetted accommodation, and a chauffeur to the clinic, all handled for you." },
    { step: 4, title: "Your procedure", body: "Performed by the doctors using the Trivellini system, not delegated to technicians." },
    { step: 5, title: "Recovery & aftercare", body: "Detailed aftercare, direct access to your team, and follow-up at every milestone." },
    { step: 6, title: "Results at 12 months", body: "Density and a natural hairline that keep maturing through the first year." },
  ],

  whyChoose: {
    heading: "Why patients choose Trichogenics",
    features: [
      { title: "Surgeon-performed care", body: "Every graft is placed under the direct work of board-certified surgeons." },
      { title: "Latest technology", body: "Trivellini Mamba extraction and the ASH Omni 3 microscope for precise, gentle harvesting." },
      { title: "Natural by design", body: "Hairlines designed for your face and age. Undetectable, not 'transplanted'." },
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
        photo: "/media/team/dr-asi-peretz-2026.jpg",
      },
      {
        name: "Dr. Eric Peretz",
        title: "Co-Founder",
        credentials: ["Diplomate, ABHRS"],
        memberships: ["World FUE Institute"],
        bio: "World renowned hair restoration surgeon. Diplomate of the American Board of Hair Restoration Surgery (ABHRS). Fellow of the World FUE Institute.",
        photo: "/media/team/dr-eric-peretz-2026.jpg",
      },
    ],
  },

  standout: {
    eyebrow: "Why Trichogenics",
    heading: "What makes Trichogenics stand out as a hair transplant clinic overseas?",
    intro:
      "At Trichogenics, only highly skilled doctors perform your hair transplant from start to finish. You will never be treated by a technician or nurse. Every step of your procedure is handled by expert surgeons to ensure the highest level of care, precision, and results.",
    features: [
      {
        title: "Top techniques",
        tag: "FUE & DHI",
        body: "We use advanced Follicular Unit Extraction (FUE) and Direct Hair Implantation with Choi pens to deliver natural-looking results with minimal scarring. These minimally invasive techniques mean a quick recovery while helping you achieve the hair you want.",
        image: "/media/standout/top-techniques.jpg",
        alt: "Trichogenics surgeons performing a follicular unit extraction",
        icon: "technique",
      },
      {
        title: "Skilled surgeons",
        tag: "ABHRS · WFI · ISHRS",
        body: "Our doctors are highly trained, experienced members of the International Society of Hair Restoration Surgery, the American Board of Hair Restoration Surgery (ABHRS), and the World FUE Institute (WFI), so every procedure meets international standards of excellence.",
        image: "/media/standout/skilled-surgeons.jpg",
        alt: "Dr. Asi and Dr. Eric Peretz, Trichogenics' co-founding surgeons",
        icon: "surgeon",
      },
      {
        title: "Patient care",
        tag: "Concierge experience",
        body: "We focus on your comfort and happiness from start to finish. Every step, from consultation to post-operative care, is designed with you in mind. Our surgeons personally oversee your recovery through in-person and virtual visits, so you are looked after at every stage. Experience a luxury getaway in Greece with the added benefit of restored hair.",
        image: "/media/standout/patient-care.jpg",
        alt: "A Trichogenics surgeon planning a patient's hairline",
        icon: "care",
      },
      {
        title: "Great results",
        tag: "Proven outcomes",
        body: "Hundreds of happy patients say we helped them get affordable hair transplants that look amazing. Their transformations are a testament to our commitment to excellence.",
        image: "/media/standout/great-results.jpg",
        alt: "A Trichogenics patient's hair transplant before and after",
        icon: "results",
      },
      {
        title: "State-of-the-art equipment",
        tag: "Trivellini · ASH 3",
        body: "We use some of the latest technology in hair restoration, such as an ASH 3 microscope to separate grafts and the Trivellini extraction machine to harvest follicles, one of the best in the market.",
        image: "/media/standout/equipment.jpg",
        alt: "The Trivellini extraction system used at Trichogenics",
        icon: "equipment",
      },
    ],
  },

  technology: {
    heading:
      "Why a follicular unit restoration clinic abroad delivers advanced technology and results",
    items: [
      {
        title: "Trivellini Mamba",
        body: "A leading extraction system that adapts to each follicle in real time, reducing transection and protecting grafts for higher survival and density.",
        image: "/media/standout/equipment.jpg",
        alt: "The Trivellini Mamba extraction system used at Trichogenics",
      },
      {
        title: "ASH Omni 3 Microscope",
        body: "Advanced magnification technology used to inspect and refine grafts, guaranteeing only the healthiest follicles are transplanted.",
        image: "/media/technology/omni-device.jpg",
        alt: "The ASH Omni 3 microscope used at Trichogenics for graft preparation",
      },
      {
        title: "Surgical AI method",
        body: "Data-guided planning that supports density and a balanced, age-appropriate hairline designed around your face.",
        image: "/media/technology/surgical-ai.jpg",
        alt: "AI-assisted follicular unit detection mapping grafts across the donor area",
      },
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
      { name: "Luke", designation: "Verified patient", quote: "Excellent care and attention to detail. Dr. Asi and Dr. Eric are friendly and meticulous about quality.", image: "/media/results/luke.jpg" },
      { name: "Costa", location: "Australia", designation: "Verified patient · Australia", quote: "After a year of research I chose Trichogenics for how clearly they explained the whole process. Worth the long journey.", image: "/media/results/costa.jpg" },
      { name: "Dean", designation: "Verified patient", quote: "The team pours real pride into their work, and it shows in the result.", image: "/media/results/dean.jpg" },
      { name: "Aidan", designation: "Verified patient", quote: "10/10, would give more if I could. Dr. Eric and the team are a credit to their profession.", image: "/media/results/aidan.jpg" },
      { name: "Fede", designation: "Verified patient", quote: "Incredibly well organised and caring from start to finish.", image: "/media/results/fede.jpg" },
      { name: "Peter", designation: "Verified patient", quote: "In my opinion, the best clinic in Greece.", image: "/media/results/peter.jpg" },
    ],
  },

  locations: {
    heading: "Two clinics, one standard of care",
    items: [
      {
        name: "Trichogenics Thessaloniki",
        countryName: "Greece",
        address: "Karatasou 1, Thessaloniki",
        video: "/media/locations/thessaloniki-coast.mp4",
        poster: "/media/locations/thessaloniki-coast.jpg",
      },
      {
        name: "Trichogenics Herzlia",
        countryName: "Israel",
        address: "Hanadiv 71, Herzlia",
        video: "/media/locations/herzliya-marina.mp4",
        poster: "/media/locations/herzliya-marina.jpg",
      },
    ],
  },

  faq: {
    heading: "Hair Transplant in Thessaloniki, Greece and Israel: FAQs",
    items: [
      {
        question: "Is Greece good for hair transplants?",
        answer:
          "Yes, Greece is highly regarded for hair transplants due to its combination of skilled surgeons, modern hair clinics, and competitive pricing. The focus on advanced techniques ensures high success rates and natural-looking results. Many patients choose Greece for its reputation for professionalism and quality in the field of hair restoration.",
      },
      {
        question: "What's the best country to get a hair transplant?",
        answer:
          "Greece is a top choice for hair transplants. This is due to its modern clinics and skilled professionals. Clinics like Trichogenics focus on carefully handling hair follicles during extraction and implantation. This helps maximize survival rates and achieve great results.",
      },
      {
        question: "How much do 3,000 hair grafts cost?",
        answer: "In Greece, the cost of 3,000 hair grafts typically ranges from €5,000 to €7,000.",
      },
      {
        question: "How much is 4,000 grafts?",
        answer:
          "A 4,000-graft hair transplant in Greece costs around €6,000 to €8,000, depending on the clinic and procedure complexity. Clinics specializing in advanced methods ensure the donor area is treated carefully to preserve its appearance while maintaining high success rates for the transplant.",
      },
      {
        question: "How much is 5,000 grafts?",
        answer:
          "For 5,000 grafts, you can expect to pay between €7,000 and €10,000 in Greece. At Trichogenics we focus on precision and care to ensure the highest survival rate for transplanted hair follicles, resulting in excellent value and patient satisfaction. However, we don't recommend transplanting such a high number of grafts in a single session. A skilled surgeon should achieve optimal density and coverage with fewer grafts, ensuring a safer procedure and better overall outcome.",
      },
      {
        question: "What is the cost of a hair transplant in Greece?",
        answer:
          "The best hair transplant in Greece cost depends on the number of grafts and the techniques used:",
        priceList: [
          { grafts: "1,500 grafts", price: "€3,000 – €5,500" },
          { grafts: "3,000 grafts", price: "€5,000 – €7,000" },
          { grafts: "5,000 grafts", price: "€7,000 – €10,000" },
        ],
        answerCont:
          "With competitive pricing and advanced care, Greece is a leading destination for hair restoration. Clinics aim to create a natural-looking result. They also work to keep the donor area healthy. Their goal is to maximize the survival rate of transplanted hair follicles.",
      },
      {
        question: "What do 2,000 grafts look like?",
        answer:
          "A 2,000-graft hair transplant typically provides moderate coverage for areas experiencing thinning or baldness. The appearance and effectiveness depend on factors such as the patient's hair characteristics (e.g., thickness, color, and texture) and the size of the treatment area.",
      },
    ],
  },

  blog: {
    eyebrow: "From the blog",
    heading: "Explore Hair Restoration Tips & Insights",
    posts: [
      {
        title: "Facial Hair Transplant Surgery: Procedure Overview",
        href: "/post/facial-hair-transplant-surgery/",
        category: "Hair Transplant",
        categoryHref: "/post/category/hair-transplant/",
        author: "Asi Peretz",
        date: "March 23, 2026",
        excerpt:
          "Facial hair transplant surgery can improve beard density and fix patchy areas. See how it works, the benefits, and the long-term results.",
        image: "/media/journey/main.jpg",
        alt: "A Trichogenics surgeon marking a patient's hairline before surgery",
      },
      {
        title: "Where Does the Hair Come From for Hair Transplants?",
        href: "/post/where-does-the-hair-come-from-for-hair-transplants/",
        category: "Hair Transplant",
        categoryHref: "/post/category/hair-transplant/",
        author: "Asi Peretz",
        date: "March 22, 2026",
        excerpt:
          "Hair used in a transplant comes from your own permanent donor area. Here is how the donor zone is chosen and why the results last.",
        image: "/media/video/clip-1.jpg",
        alt: "A Trichogenics surgeon outlining the donor area at the back of the scalp",
      },
      {
        title: "Hair Transplant Expenses: How Much Is a Hair Transplant",
        href: "/post/hair-transplant-expenses/",
        category: "Hair Transplant",
        categoryHref: "/post/category/hair-transplant/",
        author: "Asi Peretz",
        date: "March 14, 2026",
        excerpt:
          "Wondering about hair transplant expenses? See average costs, what affects pricing, and how to plan based on your hair loss and goals.",
        image: "/media/feature/main.jpg",
        alt: "Trichogenics board-certified surgeons performing a procedure",
      },
    ],
    cta: { label: "Read more on the blog", href: "/trichogenics-hair-blog/" },
  },
};
