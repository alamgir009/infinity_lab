import { describe, it, expect } from "vitest";
import { filterProjects } from "../src/pages/Projects";
import { PROJECTS, PROJECT_CATEGORIES } from "../src/data/projects";
import { validateShape } from "./helpers";

describe("filterProjects", () => {
  it("returns all projects for the default 'all' filter", () => {
    expect(filterProjects(PROJECTS, "all")).toHaveLength(PROJECTS.length);
  });
  it("returns only web projects for the 'web' filter", () => {
    const web = filterProjects(PROJECTS, "web");
    expect(web.length).toBeGreaterThan(0);
    expect(web.every((p) => p.category === "web")).toBe(true);
  });
  it("returns no projects for 'mobile' (honest empty state)", () => {
    expect(filterProjects(PROJECTS, "mobile")).toHaveLength(0);
  });
  it("returns only system projects for the 'system' filter", () => {
    const sys = filterProjects(PROJECTS, "system");
    expect(sys.length).toBeGreaterThan(0);
    expect(sys.every((p) => p.category === "system")).toBe(true);
  });
});

describe("project data shape", () => {
  it("exactly 10 supplied project links are listed", () => {
    expect(PROJECTS).toHaveLength(10);
  });
  it("exactly the four filter categories exist", () => {
    expect(PROJECT_CATEGORIES.map((c) => c.id)).toEqual([
      "all", "web", "mobile", "system",
    ]);
  });
  it("every project carries the required shape", () => {
    for (const p of PROJECTS) {
      expect(validateShape(p)).toBe(true);
    }
  });
});
