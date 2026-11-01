/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* Semantic tokens — driven by CSS variables in src/index.css */
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-sunken": "rgb(var(--surface-sunken) / <alpha-value>)",
        "surface-card": "rgb(var(--surface-card) / <alpha-value>)",
        "surface-brand": "rgb(var(--surface-brand) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
        "text-on-brand": "rgb(var(--text-on-brand) / <alpha-value>)",
        "text-on-brand-muted": "rgb(var(--text-on-brand-muted) / <alpha-value>)",
        "border-subtle": "rgb(var(--border-subtle) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        "brand-hover": "rgb(var(--brand-hover) / <alpha-value>)",
        "brand-chip": "rgb(var(--brand-chip) / <alpha-value>)",
        "brand-chip-text": "rgb(var(--brand-chip-text) / <alpha-value>)",
        "btn-bg": "rgb(var(--btn-bg) / <alpha-value>)",
        "btn-bg-hover": "rgb(var(--btn-bg-hover) / <alpha-value>)",
        "btn-text": "rgb(var(--btn-text) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        "accent-gold": "rgb(var(--accent-gold) / <alpha-value>)",
      },
      fontFamily: {
        // saira: ["Saira", "sans-serif"],
        // manrope: ["Manrope", "sans-serif"],
        heading: ["Manrope", "cursive", "sans-serif"],
        display: ["Manrope", "cursive", "sans-serif"],
        subheading: ["Exo", "sans-serif"],
        btn: ["Google Sans Flex", "Google Sans", "sans-serif"],
        sans: ["Manrope", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        body: ["Manrope", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        pop: "var(--shadow-pop)",
        "glow-brand": "0 0 20px -3px rgb(var(--brand) / 0.35)",
        "inner-light": "inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
      },
      borderRadius: {
        card: "16px",
        "card-lg": "20px",
        btn: "9999px",
        "btn-sm": "9999px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
