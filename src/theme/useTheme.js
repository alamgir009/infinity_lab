/**
 * Central theme preference management (Light / Dark / System).
 *
 *  - The current preference is persisted under the "il-theme" localStorage key.
 *  - "system" follows prefers-color-scheme and reacts live to OS changes.
 *  - The effective theme is expressed as a "dark" class on <html>, matching
 *    Tailwind's darkMode: "class" strategy and the no-flash bootstrap script
 *    in index.html.
 */
import { useCallback, useEffect, useState } from "react";

export const THEME_KEY = "il-theme";
export const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

/**
 * Resolve a preference id to an effective "light"/"dark" string.
 * @param {"light"|"dark"|"system"} pref
 */
export function resolveTheme(pref, prefersDark) {
  if (pref === "dark" || pref === "light") return pref;
  return prefersDark ? "dark" : "light";
}

export default function useTheme() {
  const getInitial = () => {
    try {
      const stored = window.localStorage.getItem(THEME_KEY);
      return THEME_OPTIONS.some((o) => o.id === stored) ? stored : "system";
    } catch {
      return "system";
    }
  };

  const [pref, setPref] = useState(getInitial);
  const [prefersDark, setPrefersDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Keep every hook instance in sync (the header mounts one toggle per
  // breakpoint) and pick up changes from other tabs.
  useEffect(() => {
    const sync = (e) => {
      if (e.type === "il-theme-change") {
        setPref(e.detail);
      } else if (e.key === THEME_KEY && e.newValue) {
        setPref(e.newValue);
      }
    };
    window.addEventListener("il-theme-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("il-theme-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Keep "system" live against OS changes.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setPrefersDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Apply the effective theme to <html>.
  useEffect(() => {
    const effective = resolveTheme(pref, prefersDark);
    document.documentElement.classList.toggle("dark", effective === "dark");
    document.documentElement.style.colorScheme = effective;
  }, [pref, prefersDark]);

  /**
   * Change the persisted preference.
   * @param {"light"|"dark"|"system"} next
   */
  const setTheme = useCallback((next) => {
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable (private mode) — preference applies for session */
    }
    window.dispatchEvent(
      new window.CustomEvent("il-theme-change", { detail: next })
    );
    setPref(next);
  }, []);

  return { pref, setTheme, effective: resolveTheme(pref, prefersDark) };
}
