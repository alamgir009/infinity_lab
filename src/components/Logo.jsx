/**
 * Bespoke brand mark for Infinity Lab: the infinity loop drawn as one stroke
 * on a brand-gradient tile, paired with a hard-cased wordmark.
 *
 * @param {{ className?: string, onBrand?: boolean, size?: "md"|"lg" }} props
 * `onBrand` — rendered on a brand surface (hero/footer): theme-aware text
 * (dark text on the light surface, light text on the navy surface).
 */
export default function Logo({ className = "", onBrand = false, size = "md" }) {
  const tile = size === "lg" ? 44 : 36;
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={tile}
        height={tile}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="ilg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#4F86F7" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#ilg)" />
        <path
          d="M24 24c1.8-3 3.4-5.6 7-5.6 3.5 0 6.3 2.5 6.3 5.6s-2.8 5.6-6.3 5.6c-3.6 0-5.2-2.6-7-5.6zm0 0c-1.8 3-3.4 5.6-7 5.6-3.5 0-6.3-2.5-6.3-5.6s2.8-5.6 6.3-5.6c3.6 0 5.2 2.6 7 5.6z"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`font-display font-bold tracking-tight ${
          size === "lg" ? "text-xl" : "text-lg"
        } ${onBrand ? "text-text-on-brand" : "text-text-primary"}`}
      >
        Infinity{" "}
        <span className={onBrand ? "text-brand dark:text-accent-gold" : "text-brand"}>
          Lab
        </span>
      </span>
    </span>
  );
}
