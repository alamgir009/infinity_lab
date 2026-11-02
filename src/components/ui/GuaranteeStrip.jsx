import {
  FiActivity,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const FALLBACK_ICONS = [LuShieldCheck, FiActivity, FiEye, FiCheckCircle];

/**
 * GuaranteeStrip — a three-cell assurance ledger. The cells share one
 * hairline grid, so contractual messaging reads as a single document
 * rather than three floating cards.
 *
 * @param {object} props
 * @param {Array<{ title: string, body: string, icon?: React.ComponentType<{ size?: number, className?: string }> }>} props.items
 */
export default function GuaranteeStrip({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-card border border-border-subtle bg-border-subtle">
      <ul className="grid grid-cols-1 gap-px md:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length];
          return (
            <li
              key={item.title}
              className="group flex h-full min-w-0 flex-col bg-surface-card p-6 transition-colors duration-200 hover:bg-surface-sunken/40 sm:p-8"
            >
              <span className="signal-tick mb-5" aria-hidden="true" />
              <div className="flex items-center gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[3px] border border-border-subtle bg-brand-soft text-brand-soft-text">
                  <Icon size={18} aria-hidden="true" className="shrink-0" />
                </span>
                <h3 className="type-card text-text-primary">
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
