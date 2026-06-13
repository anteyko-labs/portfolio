import type { Config } from "tailwindcss";

// NOTE (Tailwind v4): this JS config is NOT auto-detected by the build — there is
// no `@config` directive in src/app/globals.css, and v4 stopped auto-loading
// tailwind.config.{js,ts}. The real design tokens (colors, type scale, fonts)
// live in the `@theme` block of src/app/globals.css. This file is kept only as a
// conventional reference for the font-family mappings and the content globs.
// Do NOT add design tokens here — they will have no effect. Edit globals.css.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
