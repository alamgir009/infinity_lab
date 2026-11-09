/**
 * Pure, precomputed geometry + kinematics for the HeroInstrument planetary train.
 * No React, no DOM: safe to unit test in node/vitest.
 */

export const TAU = Math.PI * 2;
export const DEG = Math.PI / 180;
export const PRESSURE = 20 * DEG;
const INV_PHI = Math.tan(PRESSURE) - PRESSURE;

export const TEETH = { sun: 36, planet: 18, ring: 72 };
export const MODULE = 325 / 54; // = 2 * 162.5 / (36 + 18)
export const CENTER = 250;
export const RING_OUTER = 236;
export const RING_BOLT_ORBIT = 230;

export const PITCH = {
  sun: (MODULE * TEETH.sun) / 2,
  planet: (MODULE * TEETH.planet) / 2,
  ring: (MODULE * TEETH.ring) / 2,
};
export const TIP = {
  sun: PITCH.sun + MODULE,
  planet: PITCH.planet + MODULE,
  ring: PITCH.ring - MODULE,
};
export const ROOT = {
  sun: PITCH.sun - 1.25 * MODULE,
  planet: PITCH.planet - 1.25 * MODULE,
  ring: PITCH.ring + 1.25 * MODULE,
};
export const CARRIER_RADIUS = PITCH.sun + PITCH.planet; // 162.5 = 32.5cqw
export const CIRCULAR_PITCH = Math.PI * MODULE; // 18.9077 units

export const PLANET_ANGLES = [-90, 30, 150]; // exactly 60° from card anchors
export const PHASE = { sun: 0, planet: 20, ring: 30 }; // degrees

/* Willis: w_s*Zs + w_r*Zr = w_c*(Zs+Zr) */
export const W_CARRIER = 1 / 96; // rev/s, CW positive
export const W_RING = -1 / 240; // rev/s, CCW
export const W_SUN =
  (W_CARRIER * (TEETH.sun + TEETH.ring) - W_RING * TEETH.ring) / TEETH.sun;
export const W_PLANET_REL =
  -(TEETH.sun / TEETH.planet) * (W_SUN - W_CARRIER);
export const W_PLANET_ABS = W_CARRIER + W_PLANET_REL;
export const PERIOD = {
  carrier: 1 / W_CARRIER,
  ring: Math.abs(1 / W_RING),
  sun: 1 / W_SUN,
  planetRel: Math.abs(1 / W_PLANET_REL),
};
export const DEG_PER_SEC = {
  carrier: W_CARRIER * 360,
  ring: W_RING * 360,
  sun: W_SUN * 360,
  planetRel: W_PLANET_REL * 360,
};

const r3 = (v) => Math.round(v * 1000) / 1000;
const point = (cx, cy, radius, angle) =>
  `${r3(cx + radius * Math.cos(angle))} ${r3(cy + radius * Math.sin(angle))}`;
const involute = (alpha) => Math.tan(alpha) - alpha;
const flankOffset = (radius, base, halfTooth, sign) => {
  const alpha = Math.acos(Math.min(1, base / radius));
  return sign * (halfTooth + INV_PHI - involute(alpha));
};
const circlePath = (cx, cy, radius) =>
  `M${cx - radius} ${cy}a${radius} ${radius} 0 1 0 ${radius * 2} 0` +
  `a${radius} ${radius} 0 1 0 ${-radius * 2} 0Z`;

/** External involute outline, true flanks + tip land + root arc. */
function externalOutline({ teeth, cx, cy, phase }) {
  const pitch = (MODULE * teeth) / 2;
  const tip = pitch + MODULE;
  const root = pitch - 1.25 * MODULE;
  const base = pitch * Math.cos(PRESSURE);
  const start = Math.max(root, base + 0.001);
  const angularPitch = TAU / teeth;
  const halfTooth = Math.PI / (2 * teeth);
  const samples = 5;
  let d = "";

  for (let k = 0; k < teeth; k += 1) {
    const center = phase + k * angularPitch;
    const leftRoot = center + flankOffset(root, base, halfTooth, -1);
    const rightRoot = center + flankOffset(root, base, halfTooth, 1);

    if (k === 0) d += `M${point(cx, cy, root, leftRoot)}`;
    d += `L${point(
      cx,
      cy,
      start,
      center + flankOffset(start, base, halfTooth, -1)
    )}`;

    for (let i = 1; i <= samples; i += 1) {
      const radius = start + ((tip - start) * i) / samples;
      d += `L${point(
        cx,
        cy,
        radius,
        center + flankOffset(radius, base, halfTooth, -1)
      )}`;
    }

    const rightTip = center + flankOffset(tip, base, halfTooth, 1);
    d += `A${tip} ${tip} 0 0 1 ${point(cx, cy, tip, rightTip)}`;

    for (let i = samples; i >= 1; i -= 1) {
      const radius = start + ((tip - start) * i) / samples;
      d += `L${point(
        cx,
        cy,
        radius,
        center + flankOffset(radius, base, halfTooth, 1)
      )}`;
    }

    d += `L${point(cx, cy, root, rightRoot)}`;
    const nextLeftRoot =
      center + angularPitch + flankOffset(root, base, halfTooth, -1);
    d += `A${root} ${root} 0 0 1 ${point(cx, cy, root, nextLeftRoot)}`;
  }

  return { d: `${d}Z`, pitch, tip, root, base };
}

/** Internal-tooth boundary for the ring; true involute, tip land, root arc. */
function internalOutline({ teeth, cx, cy, phase }) {
  const pitch = (MODULE * teeth) / 2;
  const tip = pitch - MODULE; // inward addendum
  const root = pitch + 1.25 * MODULE; // outward dedendum
  const base = pitch * Math.cos(PRESSURE);
  const start = Math.max(tip, base + 0.001);
  const angularPitch = TAU / teeth;
  const halfTooth = Math.PI / (2 * teeth);
  const samples = 5;
  let d = "";

  for (let k = 0; k < teeth; k += 1) {
    const center = phase + k * angularPitch;
    const leftRoot = center + flankOffset(root, base, halfTooth, -1);
    const rightRoot = center + flankOffset(root, base, halfTooth, 1);

    if (k === 0) d += `M${point(cx, cy, root, leftRoot)}`;

    for (let i = 1; i <= samples; i += 1) {
      const radius = root + ((start - root) * i) / samples;
      d += `L${point(
        cx,
        cy,
        radius,
        center + flankOffset(radius, base, halfTooth, -1)
      )}`;
    }

    const rightTip = center + flankOffset(start, base, halfTooth, 1);
    d += `A${start} ${start} 0 0 1 ${point(cx, cy, start, rightTip)}`;

    for (let i = samples; i >= 1; i -= 1) {
      const radius = root + ((start - root) * i) / samples;
      d += `L${point(
        cx,
        cy,
        radius,
        center + flankOffset(radius, base, halfTooth, 1)
      )}`;
    }

    d += `L${point(cx, cy, root, rightRoot)}`;
    const nextLeftRoot =
      center + angularPitch + flankOffset(root, base, halfTooth, -1);
    d += `A${root} ${root} 0 0 1 ${point(cx, cy, root, nextLeftRoot)}`;
  }

  return { d: `${d}Z`, pitch, tip: start, root, base };
}

function holeRingPath(cx, cy, orbit, hole, count, phase) {
  let d = "";
  for (let i = 0; i < count; i += 1) {
    const angle = phase + (i * TAU) / count;
    const x = r3(cx + orbit * Math.cos(angle));
    const y = r3(cy + orbit * Math.sin(angle));
    d += `M${x - hole} ${y}`;
    d += `a${hole} ${hole} 0 1 0 ${hole * 2} 0`;
    d += `a${hole} ${hole} 0 1 0 ${-hole * 2} 0`;
  }
  return d;
}

function centerlinePath(cx, cy, inner, outer, tick = 3) {
  let d = "";
  for (let i = 0; i < 4; i += 1) {
    const angle = (i * Math.PI) / 2;
    const ux = Math.cos(angle);
    const uy = Math.sin(angle);
    const px = -uy;
    const py = ux;
    const x1 = cx + inner * ux;
    const y1 = cy + inner * uy;
    const x2 = cx + outer * ux;
    const y2 = cy + outer * uy;

    d += `M${r3(x1)} ${r3(y1)}L${r3(x2)} ${r3(y2)}`;
    d += `M${r3(x2 - px * tick)} ${r3(y2 - py * tick)}`;
    d += `L${r3(x2 + px * tick)} ${r3(y2 + py * tick)}`;
  }
  return d;
}

function keywayPath(cx, cy, rim, angle, width, depth) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const map = (x, y) =>
    `${r3(cx + x * c - y * s)} ${r3(cy + x * s + y * c)}`;
  const hw = width / 2;

  return [
    `M${map(rim - 1, -hw)}`,
    `L${map(rim + depth, -hw)}`,
    `L${map(rim + depth, hw)}`,
    `L${map(rim - 1, hw)}Z`,
  ].join("");
}

function leaderPath(cx, cy, from, to, angle, tick) {
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const px = -uy;
  const py = ux;
  const x1 = cx + from * ux;
  const y1 = cy + from * uy;
  const x2 = cx + to * ux;
  const y2 = cy + to * uy;

  return [
    `M${r3(x1)} ${r3(y1)}L${r3(x2)} ${r3(y2)}`,
    `M${r3(x2 - px * tick)} ${r3(y2 - py * tick)}`,
    `L${r3(x2 + px * tick)} ${r3(y2 + py * tick)}`,
  ].join("");
}

const ringShape = internalOutline({
  teeth: TEETH.ring,
  cx: CENTER,
  cy: CENTER,
  phase: PHASE.ring * DEG,
});
const sunShape = externalOutline({
  teeth: TEETH.sun,
  cx: CENTER,
  cy: CENTER,
  phase: PHASE.sun * DEG,
});
const planetShape = externalOutline({
  teeth: TEETH.planet,
  cx: 0,
  cy: 0,
  phase: PHASE.planet * DEG,
});

export const GEAR = {
  ring: {
    ...ringShape,
    cx: CENTER,
    cy: CENTER,
    outer: RING_OUTER,
    d: circlePath(CENTER, CENTER, RING_OUTER) + ringShape.d,
    bolts: holeRingPath(CENTER, CENTER, RING_BOLT_ORBIT, 2.4, 12, 15 * DEG),
    boltCircle: RING_BOLT_ORBIT,
    centerline: centerlinePath(CENTER, CENTER, 228, 238, 2.5),
    leaders: [60, 180, 300]
      .map((a) => leaderPath(CENTER, CENTER, 232, 241, a * DEG, 3))
      .join(""),
  },
  sun: {
    ...sunShape,
    cx: CENTER,
    cy: CENTER,
    holes: holeRingPath(CENTER, CENTER, 78, 7.5, 5, 10 * DEG),
    bore: 54,
    keyway: keywayPath(CENTER, CENTER, 54, 135 * DEG, 7, 8),
    centerline: centerlinePath(CENTER, CENTER, 56, 120, 4),
  },
  planet: {
    ...planetShape,
    cx: 0,
    cy: 0,
    holes: holeRingPath(0, 0, 33, 4.2, 4, 45 * DEG),
    bearing: 22,
    bearingInner: 14,
    centerline: centerlinePath(0, 0, 0, 70, 3),
  },
};

export const PLANET_BOX = 150;
export const PLANET_POSITIONS = PLANET_ANGLES.map((angle) => {
  const radians = angle * DEG;
  return {
    angle,
    x: CENTER + CARRIER_RADIUS * Math.cos(radians) - 75,
    y: CENTER + CARRIER_RADIUS * Math.sin(radians) - 75,
  };
});
export const CARRIER_ARM_WIDTH = 9;
export const CARRIER_ARM_INNER = 42;
export const CARRIER_BOSS = 12;
export const CARRIER_PIN = 5.5;

const wrap = (value, pitch) => ((value % pitch) + pitch) % pitch;
const distanceToPitch = (value, pitch) => {
  const mod = wrap(value, pitch);
  return Math.min(mod, pitch - mod);
};

/** Tooth/gap residuals (degrees) at all three pitch points, at time t. */
export function meshResiduals(planetAngle, t) {
  const carrier = DEG_PER_SEC.carrier * t;
  const line = planetAngle + carrier;
  const sun = PHASE.sun + DEG_PER_SEC.sun * t;
  const ring = PHASE.ring + DEG_PER_SEC.ring * t;
  const planet = PHASE.planet + carrier + DEG_PER_SEC.planetRel * t;
  const sunPitch = 360 / TEETH.sun;
  const planetPitch = 360 / TEETH.planet;
  const ringPitch = 360 / TEETH.ring;
  return {
    sunTooth: distanceToPitch(line - sun, sunPitch),
    planetGapIn: distanceToPitch(
      line + 180 - (planet + planetPitch / 2),
      planetPitch
    ),
    planetGapOut: distanceToPitch(
      line - (planet + planetPitch / 2),
      planetPitch
    ),
    ringTooth: distanceToPitch(line - ring, ringPitch),
  };
}
