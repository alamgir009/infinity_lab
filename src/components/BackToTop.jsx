import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

/**
 * Accessible back-to-top control. Only rendered after the user has scrolled
 * one viewport down; uses click (not hover) and respects reduced motion
 * (CSS handles the smooth-scroll fallback in index.css media query).
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-btn-bg text-btn-text shadow-pop transition-colors hover:bg-btn-bg-hover"
      aria-label="Back to top"
    >
      <FiArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
