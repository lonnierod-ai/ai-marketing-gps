import type { Config } from "tailwindcss";

// Maps a CSS variable from globals.css to a Tailwind color that still
// supports opacity modifiers like text-brand-charcoal/80.
const token = (name: string) =>
  `color-mix(in srgb, var(${name}) calc(<alpha-value> * 100%), transparent)`;

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Spec section 5 palette
        brand: {
          cobalt: token("--brand-cobalt"),
          "cobalt-hover": token("--brand-cobalt-hover"),
          orange: token("--brand-orange"),
          "orange-hover": token("--brand-orange-hover"),
          "orange-soft": token("--brand-orange-soft"),
          "orange-tint": token("--brand-orange-tint"),
          ground: token("--brand-ground"),
          charcoal: token("--brand-charcoal"),
          white: token("--brand-white"),

          // TEMPORARY aliases for the pre-redesign color names, pointed at
          // the new tokens. Remove each one during the page redesigns.
          dark: token("--brand-charcoal"),
          blue: token("--brand-cobalt"),
          sand: token("--card-border"),
        },
        // Approved brand guide values not yet in the spec
        "text-secondary": token("--text-secondary"),
        rule: token("--rule"),
        "card-border": token("--card-border"),
      },
      fontFamily: {
        sans: [
          "var(--font-quattrocento-sans)",
          "'Quattrocento Sans'",
          "'Gill Sans'",
          "'Segoe UI'",
          "sans-serif",
        ],
      },
      // Spec section 7 shared easing token
      transitionTimingFunction: {
        brand: "var(--ease-brand)",
      },
      zIndex: {
        header: "40",
        // Open menu sits above the chat widget (z-index 9999)
        "menu-open": "10001",
        // Home intro covers everything, including the open menu
        intro: "10002",
      },
    },
  },
  plugins: [],
} satisfies Config;
