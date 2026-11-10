import { memo } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import heroFintechLight from "../assets/hero-fintech-light.jpg";
import heroFintechDark from "../assets/hero-fintech-dark.jpg";
import useTheme from "../theme/useTheme";

/**
 * HeroTechCard — Fintech-grade software engineering & live production telemetry visual.
 * Precision studio backdrop card, photorealistic hardware mockup with dedicated
 * light and dark mode seamless background matching, unobstructed display visibility,
 * and architectural SLA metrics.
 */
const HeroTechCard = memo(function HeroTechCard() {
  const { pref } = useTheme();
  const isDark = pref === "dark";

  return (
    <div
      role="region"
      aria-label="Fintech-grade software architecture and live production telemetry preview"
      className="relative mx-auto w-full max-w-[560px] lg:max-w-[600px] xl:max-w-[650px] lg:self-center"
    >
      {/* 1. Rear physical depth plate (concentric 28px radius, offset for tactile layering) */}
      <div
        aria-hidden="true"
        className="console-depth-plate animate-[workIndexRise_600ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
      />

      {/* 2. Main Studio Console Card (pure white on light, obsidian #11131a on dark) */}
      <div className="console-panel animate-[workIndexRise_600ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:60ms] motion-reduce:animate-none">
        {/* Console Header Bar (Zero brand name: authentic macOS window controls & telemetry status) */}
        <div className="mb-3.5 flex items-center justify-between border-b border-black/[0.06] pb-3 dark:border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            {/* Window control traffic lights */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="traffic-dot-red" />
              <span className="traffic-dot-yellow" />
              <span className="traffic-dot-green" />
            </div>
            <span className="h-3.5 w-px bg-border-subtle" aria-hidden="true" />
            <span className="font-mono text-[11px] font-medium tracking-tight text-text-muted">
              cluster-prod-01 <span className="text-text-muted/50">/</span> ap-south-1
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-medium text-text-secondary">
              99.98% SLA
            </span>
            <span className="hidden font-mono text-[10.5px] text-text-muted sm:inline">
              • 24ms
            </span>
          </div>
        </div>

        {/* 3. The Visual Stage (Bigger size, unobstructed, perfectly matched light & dark background) */}
        <div className="console-stage">
          <div className="relative aspect-[16/9.5] w-full overflow-hidden">
            {isDark ? (
              /* Dark Mode Fintech Device Mockup (Seamless obsidian dark slate background) */
              <img
                src={heroFintechDark}
                alt="Fintech-grade software engineering platform and real-time telemetry dashboard in dark mode"
                width="1376"
                height="768"
                fetchpriority="high"
                decoding="async"
                className="block h-full w-full object-contain object-center transition-transform duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.015] motion-reduce:hover:scale-100"
              />
            ) : (
              /* Light Mode Fintech Device Mockup (Seamless white background) */
              <img
                src={heroFintechLight}
                alt="Fintech-grade software engineering platform and real-time telemetry dashboard in light mode"
                width="1376"
                height="768"
                fetchpriority="high"
                decoding="async"
                className="block h-full w-full object-contain object-center transition-transform duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.015] motion-reduce:hover:scale-100"
              />
            )}

            {/* Subtle specular glass highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-white/[0.04]"
            />
          </div>

          {/* Floating Architectural SLA Shield Badge (Top-Right, subtle & non-obstructive) */}
          <div
            aria-hidden="true"
            className="console-sla-badge animate-[workIndexRise_600ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:240ms] motion-reduce:animate-none"
          >
            <LuShieldCheck size={18} className="shrink-0" />
          </div>
        </div>

        {/* 4. Systems Spec Footer Strip (3-column production telemetry ledger) */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-black/[0.06] pt-3 text-center dark:border-white/[0.06]">
          <div className="flex flex-col items-center">
            <span className="font-display text-[15px] font-semibold text-text-primary sm:text-[16px]">
              10 Years
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              Engineering Practice
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-border-subtle">
            <span className="font-display text-[15px] font-semibold text-text-primary sm:text-[16px]">
              99.9%
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              Uptime Architecture
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-[15px] font-semibold text-text-primary sm:text-[16px]">
              &lt;1.2s
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              Page Load Velocity
            </span>
          </div>
        </div>

        {/* 5. Action Link to Verified Projects */}
        <div className="mt-3.5 flex items-center justify-between border-t border-black/[0.06] pt-2.5 dark:border-white/[0.06]">
          <span className="signal-tick" aria-hidden="true" />

          <Link
            to="/projects"
            className="group/link inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-text-primary underline decoration-transparent underline-offset-4 decoration-1 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-brand [@media(hover:hover)_and_(pointer:fine)]:hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>See live platforms</span>
            <FiArrowRight
              size={13}
              className="shrink-0 text-text-muted transition-transform duration-150 [@media(hover:hover)_and_(pointer:fine)]:group-hover/link:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/link:text-brand"
            />
          </Link>
        </div>
      </div>
    </div>
  );
});

export default HeroTechCard;

