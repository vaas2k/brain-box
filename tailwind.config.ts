import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: "#C0392B",
        crimson: "#96231A",
        forest: "#1A3C2E",
        "forest-lt": "#224D3A",
        cream: "#F7F3EE",
        sage: "#7A9E7E",
        gold: "#C8963E",
        charcoal: "#1C1C1C",
        muted: "#6B7280",
        white: "#FFFFFF",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      transitionTimingFunction: {
        "ease-out-custom": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out-custom": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "200ms",
        base: "400ms",
        slow: "700ms",
      },
      borderRadius: {
        card: "12px",
        btn: "6px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",
        hover: "0 4px 12px rgba(0,0,0,0.12), 0 16px 40px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
