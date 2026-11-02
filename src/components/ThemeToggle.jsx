import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../theme/useTheme";

/* Single-icon cycling theme control — squared, hairline, never a pill. */
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
      title={`Switch to ${LABELS[next]} theme`}
      className="inline-flex size-[42px] items-center justify-center rounded-btn border border-border-subtle bg-transparent text-text-secondary transition-colors duration-150 hover:border-border-strong hover:bg-surface-sunken hover:text-text-primary active:translate-y-px"
    >
      <span
        key={pref}
        className="theme-icon-swap inline-flex items-center justify-center"
        aria-hidden="true"
      >
        <Icon size={15} className="shrink-0" />
      </span>
      <span className="sr-only">
        Colour theme: {LABELS[pref]}. Switch to {LABELS[next]} theme
      </span>
    </button>
  );
}
