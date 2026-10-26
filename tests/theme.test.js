import { describe, it, expect } from "vitest";
import { normalizePref } from "../src/theme/useTheme";

describe("normalizePref (pure part of useTheme)", () => {
  it("accepts explicit light/dark preferences", () => {
    expect(normalizePref("light")).toBe("light");
    expect(normalizePref("dark")).toBe("dark");
  });
  it("resolves unknown and legacy values to the light default", () => {
    expect(normalizePref("system")).toBe("light");
    expect(normalizePref(null)).toBe("light");
    expect(normalizePref(undefined)).toBe("light");
    expect(normalizePref("bogus")).toBe("light");
  });
});
