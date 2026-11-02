/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* Semantic tokens — driven by CSS variables in src/index.css.
           RGB triplets keep Tailwind alpha support, e.g. bg-surface/80. */
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-sunken": "rgb(var(--surface-sunken) / <alpha-value>)",
        "surface-card": "rgb(var(--surface-card) / <alpha-value>)",
        "surface-raised": "rgb(var(--surface-raised) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
        wordmark: "rgb(var(--wordmark) / <alpha-value>)",
        "text-inverse": "rgb(var(--text-inverse) / <alpha-value>)",
        "text-inverse-muted": "rgb(var(--text-inverse-muted) / <alpha-value>)",
        "border-subtle": "rgb(var(--border-subtle) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        "brand-hover": "rgb(var(--brand-hover) / <alpha-value>)",
        "brand-soft": "rgb(var(--brand-soft) / <alpha-value>)",
        "brand-soft-text": "rgb(var(--brand-soft-text) / <alpha-value>)",
        "btn-bg": "rgb(var(--btn-bg) / <alpha-value>)",
        "btn-bg-hover": "rgb(var(--btn-bg-hover) / <alpha-value>)",
        "btn-text": "rgb(var(--btn-text) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        positive: "rgb(var(--positive) / <alpha-value>)",
        "positive-soft": "rgb(var(--positive-soft) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        "warning-soft": "rgb(var(--warning-soft) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        "danger-soft": "rgb(var(--danger-soft) / <alpha-value>)",

        /* Legacy aliases kept so older utility names resolve to the new system. */
        "brand-chip": "rgb(var(--brand-soft) / <alpha-value>)",
        "brand-chip-text": "rgb(var(--brand-soft-text) / <alpha-value>)",
        "text-on-brand": "rgb(var(--text-inverse) / <alpha-value>)",
        "text-on-brand-muted": "rgb(var(--text-inverse-muted) / <alpha-value>)",
        "surface-brand": "rgb(var(--surface) / <alpha-value>)",
      },
      fontFamily: {
        /* Display voice. */
        display: [
          "Manrope",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        heading: [
          "Manrope",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        subheading: [
          "Manrope",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        /* Body and UI voice. */
        sans: [
          "Geist",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        body: [
          "Geist",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        /* Brand voice: wordmark and every button label. */
        brand: [
          "Inter",
          "Geist",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        btn: [
          "Inter",
          "Geist",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card)",
        pop: "var(--shadow-pop)",
        rim: "var(--shadow-rim)",
      },
      borderRadius: {
        card: "6px",
        "card-lg": "8px",
        btn: "4px",
        "btn-sm": "4px",
        input: "2px",
      },
      maxWidth: {
        container: "1240px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
