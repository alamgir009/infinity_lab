import markWebp from "../assets/brand/inf-lab-mark.webp";
import markPng from "../assets/brand/inf-lab-mark.png";

/**
 * Brand lockup: the gradient infinity mark (optimised WebP with a high-DPI
 * PNG fallback) paired with a tight Geist wordmark.
 *
 * @param {{ className?: string, onBrand?: boolean, size?: "md"|"lg" }} props
 */
export default function Logo({ className = "", onBrand = false, size = "md" }) {
  const isLg = size === "lg";

  return (
    <span
      className={`inline-flex shrink-0 select-none items-center ${
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
          className={`pointer-events-none block w-auto select-none transition-transform duration-150 dark:brightness-110 sm:dark:brightness-125 ${
            isLg
              ? "h-[26px] sm:h-[30px] lg:h-[32px]"
              : "h-[22px] xs:h-[24px] sm:h-[26px] lg:h-[27px]"
          }`}
        />
      </picture>
      <span
        className={`whitespace-nowrap font-brand font-semibold leading-none tracking-[-0.02em] ${
          isLg ? "text-lg sm:text-xl lg:text-[22px]" : "text-[16.5px] sm:text-[18px] lg:text-[18.5px]"
        } ${onBrand ? "text-text-primary" : "text-text-primary"}`}
      >
        Infinity Lab
      </span>
    </span>
  );
}
