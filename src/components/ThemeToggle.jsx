import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import useTheme from "../theme/useTheme";

/* Single-icon cycling theme control (fintech style): one button shows the
 * current preference and advances system -> light -> dark on click.
 * The icon swaps with a short rotation/fade (disabled under
 * prefers-reduced-motion by the global base rule). */
const ORDER = ["system", "light", "dark"];
const ICONS = { light: FiSun, dark: FiMoon, system: FiMonitor };
const LABELS = { light: "Light", dark: "Dark", system: "System" };

export default function ThemeToggle() {
  const { pref, setTheme } = useTheme();
  const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
  const Icon = ICONS[pref] ?? FiMonitor;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Colour theme: ${LABELS[pref]}. Change to ${LABELS[next]} theme`}
      title={`Theme: ${LABELS[pref]}`}
      className="inline-flex h-9 min-w-[40px] items-center justify-center rounded-btn border border-border-subtle bg-surface-card px-2.5 shadow-xs transition-colors duration-150 hover:border-border-strong hover:bg-surface-sunken"
    >
      {/* key=pref remounts the glyph so the swap animation replays */}
      <span key={pref} className="theme-icon-swap inline-flex" aria-hidden="true">
        <Icon size={15} />
      </span>
      <span className="sr-only">
        Colour theme: {LABELS[pref]}. Change to {LABELS[next]} theme
      </span>
    </button>
  );
}
