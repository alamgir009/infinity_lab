import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

/**
 * Site chrome: sticky 72px bar with hairline divider, scroll-added depth,
 * animated hover underline, accent active-route state, theme toggle and a
 * focus-managed mobile drawer.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const location = useLocation();

  // Close the drawer on route change and restore focus to its launcher.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Scroll depth -> shadow (passive listener, transform/opacity only).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock while the drawer is open.
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard: Escape closes the drawer.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const desktopLink = ({ isActive }) =>
    `relative flex min-h-[44px] items-center px-1 text-sm font-medium after:absolute after:inset-x-1 after:-bottom-px after:h-0.5 after:rounded-full after:content-[''] ${
      isActive
        ? "text-brand after:bg-brand"
        : "text-text-secondary after:bg-transparent hover:text-text-primary hover:after:bg-border-strong"
    }`;

  const mobileLink = ({ isActive }) =>
    `flex min-h-[44px] items-center rounded-btn px-3 text-sm font-medium ${
      isActive
        ? "bg-brand-chip text-brand-chip-text"
        : "text-text-secondary hover:bg-surface-sunken hover:text-text-primary"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 bg-surface/90 backdrop-blur-md transition-shadow duration-200 hairline border-b ${
        scrolled ? "shadow-card" : ""
      }`}
    >
      <div className="container-section flex h-[72px] items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 rounded-btn"
          aria-label="Infinity Lab"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={desktopLink}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button to="/contact" size="md">
            Start Your Project
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            ref={menuButtonRef}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-btn border border-border-subtle text-text-secondary"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <FiX size={22} aria-hidden="true" />
            ) : (
              <FiMenu size={22} aria-hidden="true" />
            )}
            <span className="sr-only">
              {open ? "Close navigation menu" : "Open navigation menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          ref={drawerRef}
          className="hairline border-t bg-surface md:hidden"
        >
          <nav aria-label="Mobile" className="container-section py-3">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={mobileLink}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button
              to="/contact"
              size="md"
              className="mt-3 w-full"
              onClick={() => setOpen(false)}
            >
              Start Your Project
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
