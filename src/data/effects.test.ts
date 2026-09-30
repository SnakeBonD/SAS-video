import { describe, expect, it } from "vitest";
import { effectCategories, effects } from "./effects";

describe("effects catalog", () => {
  it("contains unique ids", () => {
    expect(new Set(effects.map((effect) => effect.id)).size).toBe(effects.length);
  });

  it("exposes an All category", () => {
    expect(effectCategories[0]).toBe("All");
  });
});
