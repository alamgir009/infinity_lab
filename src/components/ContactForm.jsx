import { useState, useRef } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiLayers,
  FiChevronDown,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "../data/siteConfig";

/**
 * Contact inquiry form — top-tier fintech input architecture.
 *
 * Behaviour:
 *  - Client-side required/email validation before submission.
 *  - Formats inquiry details into a structured dispatch and connects
 *    directly to the admin WhatsApp number.
 *  - Spam protection via honeypot field.
 *  - Accessible live regions for screen readers.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS = [
  {
    id: "name",
    label: "Your name",
    type: "text",
    autoComplete: "name",
    required: true,
    icon: FiUser,
    placeholder: "e.g. John Doe",
  },
  {
    id: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
    required: true,
    icon: FiMail,
    placeholder: "name@company.com",
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    required: false,
    icon: FiPhone,
    placeholder: "+91 (optional)",
  },
];

const SERVICE_OPTIONS = [
  "Full-Stack Web Development",
  "Backend & Cloud Architecture",
  "Mobile Development",
  "Something else",
];

const INITIAL = { name: "", email: "", phone: "", service: "", message: "", botfield: "" };

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email))
    errors.email = "Please enter a valid email address, e.g. name@example.com.";
  if (!values.message.trim()) errors.message = "Please tell us briefly about your project.";
  else if (values.message.trim().length < 2)
    errors.message = "Please provide at least a couple of sentences (2 characters).";
  return errors;
};

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle|submitting|success|error
  const [feedback, setFeedback] = useState("");
  const liveRef = useRef(null);

  const setField = (id, v) =>
    setValues((prev) => ({ ...prev, [id]: v }));

  const handleChange = (e) => {
    setField(e.target.id, e.target.value);
    if (errors[e.target.id]) {
      setErrors((prev) => ({ ...prev, [e.target.id]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    // Honeypot hit — silently proceed
    if (values.botfield) {
      setStatus("success");
      setFeedback("Thanks — your inquiry has been received.");
      return;
    }

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFeedback("Please fix the highlighted fields and try again.");
      const firstKey = ["name", "email", "message"].find((k) => nextErrors[k]);
      if (firstKey) document.getElementById(firstKey)?.focus();
      return;
    }

    setStatus("submitting");

    // Clean admin WhatsApp number
    const adminNumber = (CONTACT?.whatsapp || "+91 9851109954").replace(/[^0-9]/g, "");

    // Format structured WhatsApp dispatch
    const lines = [
      "*New Project Inquiry — Infinity Lab*",
      "",
      `*Name:* ${values.name.trim()}`,
      `*Email:* ${values.email.trim()}`,
      `*Phone:* ${values.phone.trim() || "Not provided"}`,
      `*Service:* ${values.service || "General Inquiry"}`,
      "",
      "*Project Details:*",
      values.message.trim(),
    ];

    const waText = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/${adminNumber}?text=${waText}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setStatus("success");
    setFeedback("Inquiry formatted successfully. WhatsApp has been opened to connect you directly with our team.");
    setValues(INITIAL);
    setErrors({});
    liveRef.current?.focus?.();
  };

  const renderField = (f) => {
    const Icon = f.icon;
    const hasError = Boolean(errors[f.id]);

    return (
      <div key={f.id} className="group/field space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor={f.id}
            className="block font-mono text-[11px] font-bold uppercase tracking-wider text-text-primary"
          >
            {f.label}
            {f.required ? (
              <span aria-hidden="true" className="ml-1 text-red-500 font-bold">*</span>
            ) : (
              <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-normal text-text-muted">
                (Optional)
              </span>
            )}
          </label>
        </div>

        <div className="relative">
          {Icon && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted transition-colors duration-150 group-focus-within/field:text-brand"
            >
              <Icon size={16} />
            </span>
          )}
          <input
            id={f.id}
            name={f.id}
            type={f.type}
            autoComplete={f.autoComplete}
            value={values[f.id]}
            onChange={handleChange}
            placeholder={f.placeholder}
            aria-required={f.required || undefined}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={hasError ? `${f.id}-error` : undefined}
            className={`block w-full min-h-[48px] rounded-xl border ${
              Icon ? "pl-11" : "pl-4"
            } pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 transition-all duration-200 bg-surface-sunken/40 hover:bg-surface-card hover:border-slate-300 dark:bg-surface-sunken/50 dark:hover:border-slate-700 focus:bg-surface-card focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 dark:focus:ring-brand/15 ${
              hasError
                ? "border-red-500/80 bg-red-50/40 dark:border-red-400 dark:bg-red-950/20 focus:border-red-500 focus:ring-red-500/10"
                : "border-border-subtle"
            }`}
          />
        </div>

        {hasError && (
          <p id={`${f.id}-error`} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
            {errors[f.id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot field */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto size-px overflow-hidden">
        <label htmlFor="botfield">Leave this field empty</label>
        <input
          id="botfield"
          name="botfield"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.botfield}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map(renderField)}
      </div>

      {/* Dropdown (Select) */}
      <div className="group/field space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="service"
            className="block font-mono text-[11px] font-bold uppercase tracking-wider text-text-primary"
          >
            What do you need help with?
          </label>
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-normal">
            (Optional)
          </span>
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted transition-colors duration-150 group-focus-within/field:text-brand"
          >
            <FiLayers size={16} />
          </span>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={handleChange}
            className="block w-full min-h-[48px] appearance-none cursor-pointer rounded-xl border border-border-subtle bg-surface-sunken/40 pl-11 pr-10 py-3 text-sm text-text-primary transition-all duration-200 hover:bg-surface-card hover:border-slate-300 focus:bg-surface-card focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 dark:bg-surface-sunken/50 dark:hover:border-slate-700 dark:focus:ring-brand/15 dark:[&>option]:bg-[#131A26] dark:[&>option]:text-text-primary"
          >
            <option value="">Select a service discipline</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors duration-150 group-focus-within/field:text-brand"
          >
            <FiChevronDown size={17} />
          </span>
        </div>
      </div>

      {/* Textarea */}
      <div className="group/field space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="message"
            className="block font-mono text-[11px] font-bold uppercase tracking-wider text-text-primary"
          >
            About your project
            <span aria-hidden="true" className="ml-1 text-red-500 font-bold">*</span>
          </label>
          <span className="font-mono text-[11px] text-text-muted">
            {values.message.length > 0 ? `${values.message.length} chars` : ""}
          </span>
        </div>

        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="A few sentences about your goals, timelines, expected load, and current tech stack..."
            className={`block w-full rounded-xl border p-4 text-sm text-text-primary placeholder:text-text-muted/60 transition-all duration-200 bg-surface-sunken/40 hover:bg-surface-card hover:border-slate-300 dark:bg-surface-sunken/50 dark:hover:border-slate-700 focus:bg-surface-card focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 dark:focus:ring-brand/15 ${
              errors.message
                ? "border-red-500/80 bg-red-50/40 dark:border-red-400 dark:bg-red-950/20 focus:border-red-500 focus:ring-red-500/10"
                : "border-border-subtle"
            }`}
          />
        </div>

        {errors.message && (
          <p id="message-error" role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Live region for form feedback */}
      <p
        ref={liveRef}
        tabIndex={-1}
        aria-live="polite"
        className={`flex items-start gap-2.5 rounded-xl text-sm ${
          status === "success"
            ? "border border-emerald-300/80 bg-emerald-50/80 p-4 text-emerald-900 dark:border-emerald-700/50 dark:bg-emerald-950/40 dark:text-emerald-200"
            : status === "error"
              ? "border border-red-300/80 bg-red-50/80 p-4 text-red-900 dark:border-red-700/50 dark:bg-red-950/30 dark:text-red-200"
              : "sr-only"
        }`}
      >
        {status === "success" && <FiCheckCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />}
        {status === "error" && <FiAlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" />}
        {feedback || "Form status updates appear here."}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <button
          type="submit"
          className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full font-btn bg-btn-bg px-8 py-3 text-sm font-semibold text-btn-text shadow-card transition-all duration-200 hover:bg-btn-bg-hover hover:shadow-card-hover active:scale-[0.98] w-full sm:w-auto"
        >
          <FaWhatsapp aria-hidden="true" className="size-4 text-emerald-400 transition-transform group-hover:scale-110" />
          <span>Send inquiry</span>
        </button>
        <span className="font-mono text-xs text-text-muted">
          Connects directly to WhatsApp
        </span>
      </div>
    </form>
  );
}
