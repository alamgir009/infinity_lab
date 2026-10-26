import { FiSun, FiMoon, FiMonitor, FiCheck } from "react-icons/fi";
import useTheme, { THEME_OPTIONS } from "../theme/useTheme";

const ICONS = { light: FiSun, dark: FiMoon, system: FiMonitor };

/**
 * Segmented Light/Dark/System theme control for the navbar.
 * Fully keyboard operable; changes are announced via aria-label updates and
 * the button text (icons are decorative).
 */
export default function ThemeToggle() {
  const { pref, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="inline-flex items-center rounded-btn border border-border-subtle bg-surface-card p-0.5 shadow-xs"
    >
      {THEME_OPTIONS.map((o) => {
        const Icon = ICONS[o.id];
        const selected = pref === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={selected}
            onClick={() => setTheme(o.id)}
            className={`group relative inline-flex h-9 min-w-[36px] items-center justify-center rounded-[6px] px-2 transition-colors duration-150 ${
              selected
                ? "bg-brand-chip text-brand-chip-text shadow-xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Icon size={15} aria-hidden="true" />
            <span className="sr-only">
              {o.label} theme{selected ? " (selected)" : ""}
            </span>
            {selected && (
              <FiCheck
                size={9}
                aria-hidden="true"
                className="absolute -bottom-px"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
