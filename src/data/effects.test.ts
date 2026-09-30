import { describe, expect, it } from "vitest";
import { effectCategories, effects } from "./effects";
import { promptPresets } from "./presets";

describe("studio catalog", () => {
  it("contains the 24 visual effects", () => {
    expect(effects).toHaveLength(24);
  });

  it("contains unique effect ids", () => {
    expect(new Set(effects.map((effect) => effect.id)).size).toBe(24);
  });

  it("contains 12 ambience effects and 12 transformations", () => {
    expect(effects.filter((effect) => effect.group === "Ambiance")).toHaveLength(
      12,
    );
    expect(
      effects.filter((effect) => effect.group === "Transformation"),
    ).toHaveLength(12);
  });

  it("exposes the expected categories", () => {
    expect(effectCategories).toEqual([
      "All",
      "Ambiance",
      "Transformation",
    ]);
  });

  it("contains the 7 prompt presets", () => {
    expect(promptPresets).toHaveLength(7);
  });

  it("contains unique preset ids", () => {
    expect(new Set(promptPresets.map((preset) => preset.id)).size).toBe(7);
  });
});