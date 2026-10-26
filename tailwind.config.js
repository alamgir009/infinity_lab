/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8",
          50: "#EFF6FF",
          100: "#DBEAFE",
          600: "#2160E0",
          700: "#1D4ED8",
          800: "#1E40AF",
        },
        neutral: {
          50: "#DCE3EC",
          100: "#C3CDDA",
          200: "#8C9CB4",
          DEFAULT: "#A9B7C8",
          900: "#E6EBF2",
        },
        accent: "#DDC58F",
        gradient1: "#4F86F7",
        gradient2: "#8C9EFF",
      },
      fontFamily: {
        display: ["Space_Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      spacing: {
        8: "2rem",
        12: "3rem",
        16: "4rem",
        24: "6rem",
        32: "8rem",
      },
      borderRadius: {
        card: "1rem",
        btn: "0.5rem",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(15, 23, 42, 0.06)",
        card: "0 2px 8px rgba(15, 23, 42, 0.1), 0 1px 3px rgba(15, 23, 42, 0.05)",
        glow: "0 0 24px rgba(79, 134, 247, 0.25)",
      },
      backgroundImage: {
        heroGradient: "linear-gradient(135deg, #0B1220 0%, #122042 60%, #1D4078 100%)",
        ctaGradient: "linear-gradient(135deg, #2160E0 0%, #4F86F7 100%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out both",
        floatY: "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
