import { useState, useEffect, useRef } from "react";
import { FiArrowUp } from "react-icons/fi";

/**
 * Accessible back-to-top control. Only rendered after the user has scrolled
 * one viewport down; scroll position is sampled inside requestAnimationFrame
 * so the passive listener never blocks the compositor.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const sample = () => {
      frame.current = 0;
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(sample);
    };
    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
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
      className="fixed bottom-6 right-6 z-50 inline-flex size-11 items-center justify-center rounded-btn border border-border-subtle bg-btn-bg text-btn-text shadow-pop transition-colors duration-150 hover:bg-btn-bg-hover"
      aria-label="Back to top"
    >
      <FiArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
