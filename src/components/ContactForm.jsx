import { useState, useRef } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiLayers,
  FiChevronDown,
  FiMessageSquare,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "../data/siteConfig";

/**
 * Contact inquiry form — engineering precision input architecture.
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
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor={f.id}
            className="block text-[14px] font-semibold  text-text-secondary"
          >
            {f.label}
            {f.required ? (
              <span aria-hidden="true" className="ml-1 font-semibold text-danger">*</span>
            ) : (
              <span className="ml-2 text-[13px] font-normal text-text-muted">
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
              <Icon size={15} />
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
            className={`field-input ${Icon ? "pl-10" : "pl-4"} pr-4`}
          />
        </div>

        {hasError && (
          <p id={`${f.id}-error`} role="alert" className="text-xs font-semibold text-danger">
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

        {/* Dropdown — shares the second ledger row with the phone field */}
        <div className="group/field space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="service"
              className="block text-[14px] font-semibold   text-text-secondary"
            >
              What do you need help with?
            </label>
            <span className=" text-[13px]  text-text-muted">
              (Optional)
            </span>
          </div>

          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted transition-colors duration-150 group-focus-within/field:text-brand"
            >
              <FiLayers size={15} />
            </span>
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={handleChange}
              className={`field-input cursor-pointer appearance-none pl-10 pr-10 dark:[&>option]:bg-[#14151b] dark:[&>option]:text-text-primary ${
                values.service ? "text-text-primary" : "text-text-muted"
              }`}
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
              <FiChevronDown size={16} />
            </span>
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="group/field space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="message"
            className="block text-[14px] font-semibold text-text-secondary"
          >
            About your project
            <span aria-hidden="true" className="ml-1 font-semibold text-danger">*</span>
          </label>
          <span className="font-mono text-[10px] tabular-nums text-text-muted">
            {values.message.length > 0 ? `${values.message.length} chars` : ""}
          </span>
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-3.5 text-text-muted transition-colors duration-150 group-focus-within/field:text-brand"
          >
            <FiMessageSquare size={15} />
          </span>
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
            className="field-input min-h-[140px] resize-y pl-10 pr-4 leading-relaxed"
          />
        </div>

        {errors.message && (
          <p id="message-error" role="alert" className="text-xs font-semibold text-danger">
            {errors.message}
          </p>
        )}
      </div>

      {/* Live region for form feedback */}
      <p
        ref={liveRef}
        tabIndex={-1}
        aria-live="polite"
        className={`flex items-start gap-2.5 rounded-[3px] text-sm ${
          status === "success"
            ? "border border-positive/30 bg-positive-soft p-4 text-positive"
            : status === "error"
              ? "border border-danger/30 bg-danger-soft p-4 text-danger"
              : "sr-only"
        }`}
      >
        {status === "success" && <FiCheckCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />}
        {status === "error" && <FiAlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />}
        {feedback || "Form status updates appear here."}
      </p>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-btn bg-btn-bg px-8 py-3 text-sm font-semibold text-btn-text transition-colors duration-150 hover:bg-btn-bg-hover active:translate-y-px sm:w-auto"
        >
          <FaWhatsapp aria-hidden="true" className="size-4" />
          <span>Send inquiry</span>
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
          Connects directly to WhatsApp
        </span>
      </div>
    </form>
  );
}
