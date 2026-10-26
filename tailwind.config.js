/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — single definitions driven by CSS variables
        // declared in src/index.css (light in :root, dark under .dark).
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-sunken": "rgb(var(--surface-sunken) / <alpha-value>)",
        "surface-card": "rgb(var(--surface-card) / <alpha-value>)",
        "surface-inverse": "rgb(var(--surface-inverse) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
        "text-on-inverse": "rgb(var(--text-on-inverse) / <alpha-value>)",
        "text-on-inverse-muted":
          "rgb(var(--text-on-inverse-muted) / <alpha-value>)",
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
        display: ["Space_Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        pop: "var(--shadow-pop)",
      },
      borderRadius: {
        card: "0.75rem",
        btn: "0.5rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
