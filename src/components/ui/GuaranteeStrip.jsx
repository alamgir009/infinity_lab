import {
  FiActivity,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const FALLBACK_ICONS = [LuShieldCheck, FiActivity, FiEye, FiCheckCircle];

/**
 * GuaranteeStrip — unified fintech assurance ribbon (matching StatStrip DNA):
 * one bordered container split into equal cells by internal hairlines.
 * Each cell: soft brand-chip icon tile, semibold title, secondary body copy.
 * Used for contractual/trust messaging (IP ownership, SLA, sprint access).
 *
 * @param {object} props
 * @param {Array<{ title: string, body: string, icon?: React.ComponentType<{ size?: number, className?: string }> }>} props.items
 */
export default function GuaranteeStrip({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-card-lg border border-border-subtle bg-surface-card card-rim shadow-card dark:border-slate-800">
      <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-subtle">
        {items.map((item, i) => {
          const Icon = item.icon ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length];
          return (
            <li
              key={item.title}
              className="group flex h-full min-w-0 flex-col p-6 transition-colors duration-200 hover:bg-surface-sunken/40 sm:p-8"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-brand-chip text-brand-chip-text transition-colors duration-200 group-hover:border-brand/30 dark:bg-surface-sunken dark:text-brand">
                  <Icon size={20} aria-hidden="true" className="shrink-0" />
                </div>
                <h3 className="font-display text-base font-bold leading-6 tracking-tight text-text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {item.body}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
