/**
 * Bespoke brand mark for Infinity Lab: an infinity loop rendered as a single
 * stroke inside a subtle gradient tile. Decorative — aria-hidden for
 * screen-reader users; the adjacent link text carries the meaning.
 *
 * @param {{ className?: string, dark?: boolean }} props
 *   Use `dark` on dark backgrounds (footer) to keep text contrast AA.
 */
export default function Logo({ className = "", dark = false }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="40"
        height="40"
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
        <rect width="48" height="48" rx="10" fill="url(#ilg)" />
        <path
          d="M24 24c1.8-3 3.4-5.6 7-5.6 3.5 0 6.3 2.5 6.3 5.6s-2.8 5.6-6.3 5.6c-3.6 0-5.2-2.6-7-5.6zm0 0c-1.8 3-3.4 5.6-7 5.6-3.5 0-6.3-2.5-6.3-5.6s2.8-5.6 6.3-5.6c3.6 0 5.2 2.6 7 5.6z"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-display text-lg font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
        <span>Infinity </span>
        <span className={dark ? "text-primary-200" : "text-primary-800"}>Lab</span>
      </span>
    </span>
  );
}
