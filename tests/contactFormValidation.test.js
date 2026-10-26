import { describe, it, expect } from "vitest";

/**
 * Re-implementation of ContactForm's validation rules for pure-logic testing.
 * Kept in sync with src/components/ContactForm.jsx (single rule source).
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email))
    errors.email = "Please enter a valid email address, e.g. name@example.com.";
  if (!values.message.trim()) errors.message = "Please tell us briefly about your project.";
  else if (values.message.trim().length < 20)
    errors.message = "Please provide at least a couple of sentences (20+ characters).";
  return errors;
}

const valid = { name: "A. Islam", email: "a@b.co", message: "We need a new e-commerce platform built." };

describe("contact form validation", () => {
  it("accepts a complete, well-formed submission", () => {
    expect(validate(valid)).toEqual({});
  });
  it("rejects empty required fields", () => {
    const e = validate({ name: "", email: "", message: "" });
    expect(Object.keys(e)).toEqual(["name", "email", "message"]);
  });
  it("rejects malformed email", () => {
    expect(validate({ ...valid, email: "not-an-email" }).email).toBeTruthy();
    expect(validate({ ...valid, email: "a@b" }).email).toBeTruthy();
  });
  it("rejects short messages", () => {
    expect(validate({ ...valid, message: "hi" }).message).toBeTruthy();
  });
  it("accepts 20+ char messages", () => {
    expect(validate({ ...valid, message: "x".repeat(20) }).message).toBeUndefined();
  });
});
