import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../theme/useTheme";

/* Single-icon cycling theme control (fintech style): one button shows the
 * current theme and toggles light <-> dark on click.
 * The icon swaps with a short rotation/fade (disabled under
 * prefers-reduced-motion by the global base rule). */
const ICONS = { light: FiSun, dark: FiMoon };
const LABELS = { light: "Light", dark: "Dark" };

export default function ThemeToggle() {
  const { pref, setTheme } = useTheme();
  const next = pref === "dark" ? "light" : "dark";
  const Icon = ICONS[pref] ?? FiSun;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Colour theme: ${LABELS[pref]}. Switch to ${LABELS[next]} theme`}
      title={`Theme: ${LABELS[pref]}`}
      className="inline-flex h-11 min-w-[40px] items-center justify-center rounded-btn border border-border-subtle bg-surface-card px-3.5 shadow-xs transition-colors duration-150 hover:border-border-strong hover:bg-surface-sunken"
    >
      {/* key=pref remounts the glyph so the swap animation replays */}
      <span key={pref} className="theme-icon-swap inline-flex" aria-hidden="true">
        <Icon size={15} />
      </span>
      <span className="sr-only">
        Colour theme: {LABELS[pref]}. Switch to {LABELS[next]} theme
      </span>
    </button>
  );
}
