import markWebp from "../assets/brand/inf-lab-mark.webp";
import markPng from "../assets/brand/inf-lab-mark.png";

/**
 * Brand lockup: the gradient infinity mark (optimised WebP with a high-DPI
 * PNG fallback) paired with a monochrome Inter wordmark.
 *
 * Engineered with fintech-grade optical alignment and responsive scaling
 * across mobile, tablet, laptop, and 4K desktop screens.
 *
 * @param {{ className?: string, onBrand?: boolean, size?: "md"|"lg" }} props
 * `onBrand` — rendered on a brand surface (hero/footer): theme-aware text
 * (dark text on the light surface, light text on the obsidian surface).
 */
export default function Logo({ className = "", onBrand = false, size = "md" }) {
  const isLg = size === "lg";

  return (
    <span
      className={`inline-flex shrink-0 items-center select-none ${
        isLg ? "gap-2.5 sm:gap-3" : "gap-2 sm:gap-2.5 lg:gap-3"
      } ${className}`}
    >
      <picture className="flex shrink-0 items-center">
        <source
          srcSet={markWebp}
          type="image/webp"
          media="(max-resolution: 1.5dppx)"
        />
        <img
          src={markPng}
          width="242"
          height="128"
          alt=""
          loading="eager"
          fetchpriority="high"
          decoding="async"
          draggable={false}
          className={`block w-auto select-none pointer-events-none transition-transform duration-150 dark:brightness-110 sm:dark:brightness-125 ${
            isLg
              ? "h-[26px] sm:h-[30px] lg:h-[32px]"
              : "h-[22px] xs:h-[24px] sm:h-[26px] lg:h-[27px]"
          }`}
        />
      </picture>
      <span
        className={`whitespace-nowrap font-sans font-bold tracking-tight leading-none ${
          isLg
            ? "text-lg sm:text-xl lg:text-[22px]"
            : "text-[16.5px] sm:text-[18px] lg:text-[18.5px]"
        } ${onBrand ? "text-text-on-brand" : "text-text-primary"}`}
      >
        Infinity Lab
      </span>
    </span>
  );
}
