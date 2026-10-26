/** Shape validation used by tests to guard data integrity. */
export const REQUIRED_KEYS = [
  "id", "name", "url", "category", "verified", "summary", "statusLabel",
];

/**
 * Validate a project entry carries all required keys with plausible values.
 * @param {object} p project entry
 * @returns {boolean}
 */
export function validateShape(p) {
  if (REQUIRED_KEYS.some((k) => !(k in p) || (typeof p[k] === "string" && !p[k].trim()))) {
    return false;
  }
  try {
    const u = new URL(p.url);
    return u.protocol === "https:";
  } catch {
    return false;
  }
}
