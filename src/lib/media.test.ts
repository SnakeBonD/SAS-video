import { describe, expect, it } from "vitest";
import { MAX_FILE_SIZE, moveMediaItem, validateMediaFile } from "./media";

describe("media validation", () => {
  it.each(["image/jpeg", "image/png", "image/webp"])("accepts %s at the size limit", (type) => {
    expect(validateMediaFile({ name: "image", type, size: MAX_FILE_SIZE })).toBeNull();
  });
  it.each(["image/svg+xml", "image/gif", "text/plain", ""])("rejects unsupported type %s", (type) => {
    expect(validateMediaFile({ name: "source", type, size: 100 })).toContain("format non pris en charge");
  });
  it("rejects an empty image", () => {
    expect(validateMediaFile({ name: "empty.png", type: "image/png", size: 0 })).toContain("vide");
  });
  it("rejects an oversized image", () => {
    expect(validateMediaFile({ name: "large.png", type: "image/png", size: MAX_FILE_SIZE + 1 })).toContain("12 Mo");
  });
});

describe("media order", () => {
  const items = [{ id: "a", generationStatus: "queued" }, { id: "b", generationStatus: "completed" }, { id: "c", generationStatus: "failed" }];
  it("moves an image forward without changing identity or job status", () => {
    const result = moveMediaItem(items, "a", 1);
    expect(result.map((item) => item.id)).toEqual(["b", "a", "c"]);
    expect(result[1]).toBe(items[0]);
    expect(items.map((item) => item.id)).toEqual(["a", "b", "c"]);
  });
  it("moves an image backward", () => {
    expect(moveMediaItem(items, "c", -1).map((item) => item.id)).toEqual(["a", "c", "b"]);
  });
  it("preserves the order at boundaries and for unknown images", () => {
    expect(moveMediaItem(items, "a", -1)).toBe(items);
    expect(moveMediaItem(items, "c", 1)).toBe(items);
    expect(moveMediaItem(items, "missing", -1)).toBe(items);
    expect(moveMediaItem([], "missing", 1)).toEqual([]);
  });
});
