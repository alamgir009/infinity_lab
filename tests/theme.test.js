import { describe, it, expect } from "vitest";
import { resolveTheme } from "../src/theme/useTheme";

describe("resolveTheme (pure part of useTheme)", () => {
  it("honours explicit preferences", () => {
    expect(resolveTheme("dark", false)).toBe("dark");
    expect(resolveTheme("light", true)).toBe("light");
  });
  it("falls back to OS preference only for 'system'", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme(undefined, false)).toBe("light");
  });
});
