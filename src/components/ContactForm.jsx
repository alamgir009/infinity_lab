import { useState, useRef } from "react";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FORM_ENDPOINT } from "../data/siteConfig";

/**
 * Contact inquiry form.
 *
 * Behaviour:
 *  - Client-side required/email validation before submission.
 *  - Submits JSON to VITE_FORM_ENDPOINT when configured. Fails honestly:
 *    without an endpoint the submit control is disabled with a visible reason.
 *  - Spam protection via an invisible honeypot field (robots filling it get
 *    silently dropped, no error shown).
 *  - Loading, success and error states are all announced to assistive tech
 *    via a polite live region.
 *  - Timeout guard prevents an indefinite spinner if the backend stalls.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS = [
  { id: "name", label: "Your name", type: "text", autoComplete: "name", required: true },
  { id: "email", label: "Email address", type: "email", autoComplete: "email", required: true },
  { id: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel", required: false },
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
  else if (values.message.trim().length < 20)
    errors.message = "Please provide at least a couple of sentences (20+ characters).";
  return errors;
};

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle|submitting|success|error
  const [feedback, setFeedback] = useState("");
  const liveRef = useRef(null);
  const hasEndpoint = Boolean(FORM_ENDPOINT);

  const setField = (id, v) =>
    setValues((prev) => ({ ...prev, [id]: v }));

  const handleChange = (e) => {
    setField(e.target.id, e.target.value);
    if (errors[e.target.id]) {
      setErrors((prev) => ({ ...prev, [e.target.id]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    // Honeypot hit — pretend to proceed, silently drop.
    if (values.botfield) {
      setStatus("success");
      setFeedback("Thanks — we will get back to you shortly.");
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
    setFeedback("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          service: values.service,
          message: values.message.trim(),
          submittedAt: new Date().toISOString(),
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        let serverMsg = `Submission failed (HTTP ${res.status}).`;
        try {
          const data = await res.json();
          if (data && typeof data.message === "string") serverMsg = data.message;
        } catch {
          /* non-JSON error body — keep generic message */
        }
        throw new Error(serverMsg);
      }

      await res.json().catch(() => ({}));
      setStatus("success");
      setFeedback("Thanks — your inquiry has been sent. We will reply using the contact details you provided.");
      setValues(INITIAL);
      setErrors({});
      liveRef.current?.focus?.();
    } catch (err) {
      clearTimeout(timeout);
      setStatus("error");
      setFeedback(
        err.name === "AbortError"
          ? "The request timed out. Please try again, or contact us using the phone or email details on this page."
          : err.message || "Something went wrong while sending your inquiry. Please try again, or use the phone or email details on this page."
      );
      liveRef.current?.focus?.();
    }
  };

  const renderField = (f) => (
    <div key={f.id}>
      <label htmlFor={f.id} className="block text-sm font-medium text-text-primary">
        {f.label}
        {f.required && (
          <span aria-hidden="true" className="ml-1 text-red-600 dark:text-red-400">
            *
          </span>
        )}
      </label>
      <input
        id={f.id}
        name={f.id}
        type={f.type}
        autoComplete={f.autoComplete}
        value={values[f.id]}
        onChange={handleChange}
        aria-required={f.required || undefined}
        aria-invalid={errors[f.id] ? "true" : undefined}
        aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
        className={`mt-2 block w-full min-h-[44px] rounded-btn border px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ${
          errors[f.id]
            ? "border-red-500 bg-red-50 dark:border-red-400/70 dark:bg-red-950/40"
            : "border-border-subtle bg-surface-card"
        }`}
      />
      {errors[f.id] && (
        <p id={`${f.id}-error`} role="alert" className="mt-1.5 text-sm text-red-700 dark:text-red-300">
          {errors[f.id]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {!hasEndpoint && (
        <p className="rounded-btn border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700/60 dark:bg-amber-900/25 dark:text-amber-200">
          <FiAlertCircle aria-hidden="true" className="mr-1.5 inline size-4" />
          Form submission endpoint is not configured yet
          (set <code className="font-mono">VITE_FORM_ENDPOINT</code>). You can
          still reach us directly using the phone or email details on this
          page.
        </p>
      )}

      {/* Honeypot — invisible to humans, ignored by bots' fill heuristic */}
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

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-text-primary">
          What do you need help with?
        </label>
        <select
          id="service"
          name="service"
          value={values.service}
          onChange={handleChange}
          className="mt-2 block w-full min-h-[44px] rounded-btn border border-border-subtle bg-surface-card px-3 py-2 text-sm text-text-primary"
        >
          <option value="">Select a service (optional)</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary">
          About your project
          <span aria-hidden="true" className="ml-1 text-red-600 dark:text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="A few sentences about your goals, timeline and any existing system."
          className={`mt-2 block w-full rounded-btn border px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ${
            errors.message ? "border-red-500 bg-red-50 dark:border-red-400/70 dark:bg-red-950/40" : "border-border-subtle bg-surface-card"
          }`}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-700 dark:text-red-300">
            {errors.message}
          </p>
        )}
      </div>

      {/* Live region for form feedback */}
      <p
        ref={liveRef}
        tabIndex={-1}
        aria-live="polite"
        className={`flex items-start gap-2 text-sm ${
          status === "success"
            ? "rounded-btn border border-green-300 bg-green-50 p-3 text-green-800 dark:border-green-700/60 dark:bg-green-900/25 dark:text-green-300"
            : status === "error"
              ? "rounded-btn border border-red-300 bg-red-50 p-3 text-red-800 dark:border-red-700/60 dark:bg-red-900/25 dark:text-red-300"
              : "sr-only"
        }`}
      >
        {status === "success" && <FiCheckCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />}
        {status === "error" && <FiAlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />}
        {feedback || "Form status updates appear here."}
      </p>

      <button
        type="submit"
        disabled={status === "submitting" || !hasEndpoint}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-btn bg-btn-bg px-7 py-3 font-display text-base font-semibold text-btn-text transition-colors duration-150 hover:bg-btn-bg-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <FiSend aria-hidden="true" className={status === "submitting" ? "animate-spin" : ""} />
        {status === "submitting" ? "Sending your inquiry…" : "Send inquiry"}
      </button>
      {!hasEndpoint && (
        <p className="text-xs text-text-muted" id="submit-disabled-reason">
          The Send button is disabled until a submission endpoint is configured
          (see VITE_FORM_ENDPOINT in .env.example) — form submissions are never
          faked.
        </p>
      )}
    </form>
  );
}
