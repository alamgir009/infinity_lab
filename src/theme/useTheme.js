/**
 * Theme preference management (Light / Dark only).
 *
 *  - The preference is persisted under the "il-theme" localStorage key and
 *    defaults to light when nothing (or an unknown/legacy value) is stored.
 *  - The theme is expressed as a "dark" class on <html>, matching Tailwind's
 *    darkMode: "class" strategy and the no-flash bootstrap script in index.html.
 */
import { useCallback, useEffect, useState } from "react";

export const THEME_KEY = "il-theme";
export const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

/**
 * Normalise a stored/preference value to "light" | "dark". Unknown and
 * legacy values (including the old "system" mode) fall back to light.
 * @param {string|null|undefined} value
 */
export function normalizePref(value) {
  return value === "dark" ? "dark" : "light";
}

export default function useTheme() {
  const getInitial = () => {
    try {
      return normalizePref(window.localStorage.getItem(THEME_KEY));
    } catch {
      return "light";
    }
  };

  const [pref, setPref] = useState(getInitial);

  // Keep every hook instance in sync (the header mounts one toggle per
  // breakpoint) and pick up changes made in other tabs.
  useEffect(() => {
    const sync = (e) => {
      if (e.type === "il-theme-change") {
        setPref(normalizePref(e.detail));
      } else if (e.key === THEME_KEY) {
        setPref(normalizePref(e.newValue));
      }
    };
    window.addEventListener("il-theme-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("il-theme-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Apply the theme to <html> and keep the browser UI tint in sync.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", pref === "dark");
    document.documentElement.style.colorScheme = pref;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = pref === "dark" ? "#0B1220" : "#ffffff";
  }, [pref]);

  /**
   * Change the persisted preference.
   * @param {"light"|"dark"} next
   */
  const setTheme = useCallback((next) => {
    const normalized = normalizePref(next);
    try {
      window.localStorage.setItem(THEME_KEY, normalized);
    } catch {
      /* storage unavailable (private mode) — preference applies for session */
    }
    window.dispatchEvent(
      new window.CustomEvent("il-theme-change", { detail: normalized })
    );
    setPref(normalized);
  }, []);

  return { pref, setTheme, effective: pref };
}
