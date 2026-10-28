import {
  FiActivity,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const FALLBACK_ICONS = [LuShieldCheck, FiActivity, FiEye, FiCheckCircle];

/**
 * GuaranteeStrip — unified fintech assurance ribbon (same DNA as StatStrip):
 * one bordered container split into equal cells by internal hairlines.
 * Each cell: soft brand-chip icon tile, semibold title, secondary body copy.
 * Used for contractual/trust messaging (IP ownership, SLA, sprint access).
 * Rendered as a semantic list with per-item headings for screen readers.
 *
 * @param {object} props
 * @param {Array<{ title: string, body: string, icon?: React.ComponentType<{ size?: number, className?: string }> }>} props.items
 */
export default function GuaranteeStrip({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-card shadow-card">
      <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-subtle">
        {items.map((item, i) => {
          const Icon = item.icon ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length];
          return (
            <li key={item.title} className="flex h-full min-w-0 flex-col p-6 sm:p-7">
              <div className="flex items-center gap-3.5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-brand-chip text-brand-chip-text dark:bg-surface-sunken dark:text-brand">
                  <Icon size={19} aria-hidden="true" className="shrink-0" />
                </div>
                <h3 className="text-base font-semibold leading-6 tracking-tight text-text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3.5 text-sm leading-[22px] text-text-secondary">
                {item.body}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
