import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

/**
 * Trichogenics design system — seed.com-inspired, on-brand (navy + light blue),
 * premium/clinical. Tokens: brand (navy), sky (brand light-blue wash), accent
 * (teal, conversion), sand (warm neutrals), ink (text), + semantic colors.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF1F6",
          100: "#D5DCE8",
          200: "#AEBED1",
          300: "#7E92AE",
          400: "#4E647F",
          500: "#2A3F5C",
          600: "#16294A",
          700: "#0D1E3C",
          800: "#071331", // brand navy
          900: "#040B1E",
        },
        sky: {
          50: "#F2F8FC",
          100: "#E1EFF8",
          200: "#C9E1F1",
          300: "#9BC2E0", // existing brand light-blue (decorative only)
          400: "#6FA4CE",
          500: "#4886B6",
          600: "#356A95",
        },
        accent: {
          50: "#E8F7F4",
          100: "#CFF0EA",
          300: "#5FD3C0",
          500: "#12A594", // primary CTA
          600: "#0E8678", // hover
          700: "#0A6A60", // accent text on white (AA)
        },
        sand: {
          50: "#FAFAF8", // page background
          100: "#F4F4F0",
          200: "#E8E8E2",
        },
        ink: {
          700: "#3A3F47", // body
          900: "#1A1D22", // max-contrast body
        },
        success: "#1F9D6B",
        warning: "#C97A12",
        danger: "#C0392B",
        info: "#4886B6",
      },
      fontFamily: {
        // One brand family for the whole site (Neue Haas Unica -> Inter -> Heebo
        // in RTL). display/sans/seed all map to it so headers + subtext + hero
        // stay consistent.
        brand: ["var(--font-brand)", "system-ui", "sans-serif"],
        display: ["var(--font-brand)", "system-ui", "sans-serif"],
        sans: ["var(--font-brand)", "system-ui", "sans-serif"],
        seed: ["var(--font-brand)", "system-ui", "sans-serif"],
        heebo: ["var(--font-heebo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 1.6rem + 5.7vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.25rem, 1.5rem + 3.7vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.875rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.375rem, 1.1rem + 1.4vw, 1.75rem)", { lineHeight: "1.2" }],
        h4: ["clamp(1.125rem, 1rem + 0.6vw, 1.25rem)", { lineHeight: "1.3" }],
        lead: ["clamp(1.125rem, 1rem + 0.6vw, 1.375rem)", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.08em" }],
      },
      spacing: {
        section: "clamp(4rem, 2.5rem + 7vw, 8rem)",
        gutter: "clamp(1.25rem, 0.5rem + 2vw, 2.5rem)",
      },
      maxWidth: {
        content: "1200px",
        text: "1120px",
        wide: "1440px",
        "prose-he": "720px",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "24px",
        xl: "32px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(7,19,49,.06)",
        md: "0 8px 24px rgba(7,19,49,.08)",
        lg: "0 18px 48px rgba(7,19,49,.10)",
        cta: "0 8px 24px rgba(18,165,148,.28)",
      },
    },
  },
  plugins: [
    typography,
    // Direction-aware variants for the rare physical case (e.g. mirroring a chevron).
    plugin(({ addVariant }) => {
      addVariant("rtl", '&:where([dir="rtl"] *)');
      addVariant("ltr", '&:where([dir="ltr"] *)');
    }),
  ],
};

export default config;
