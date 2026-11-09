import { describe, it, expect } from "vitest";
import {
  TEETH,
  W_SUN,
  W_RING,
  W_CARRIER,
  PLANET_ANGLES,
  meshResiduals,
} from "../src/components/heroGearGeometry";

const PASSAGE = 20 / 21; // 0.95238s: one tooth/gap passage at every mesh

describe("hero planetary train", () => {
  it("satisfies the Willis equation", () => {
    expect(W_SUN * TEETH.sun + W_RING * TEETH.ring).toBeCloseTo(
      W_CARRIER * (TEETH.sun + TEETH.ring),
      12
    );
  });

  it("keeps tooth-to-gap at sun-planet and planet-ring pitch points", () => {
    for (const t of [0, 10 * PASSAGE, 20 * PASSAGE, 30 * PASSAGE]) {
      for (const angle of PLANET_ANGLES) {
        const r = meshResiduals(angle, t);
        expect(r.sunTooth).toBeLessThan(0.5);
        expect(r.planetGapIn).toBeLessThan(0.5);
        expect(r.planetGapOut).toBeLessThan(0.5);
        expect(r.ringTooth).toBeLessThan(0.5);
      }
    }
  });
});
