import { describe, expect, it } from "vitest";
import { getQueueSummary, type GenerationStatus } from "./generation-queue";

const items = (...states: GenerationStatus[]) => states.map((generationStatus) => ({ generationStatus }));

describe("generation queue progress", () => {
  it("starts empty without reporting a completed video", () => {
    expect(getQueueSummary([])).toEqual({ total: 0, queued: 0, running: 0, completed: 0, failed: 0 });
  });
  it("keeps imported images pending until a provider completes them", () => {
    expect(getQueueSummary(items("queued", "queued"))).toEqual({ total: 2, queued: 2, running: 0, completed: 0, failed: 0 });
  });
  it("does not count errors or active jobs as completed videos", () => {
    expect(getQueueSummary(items("completed", "failed", "running", "queued"))).toEqual({ total: 4, queued: 1, running: 1, completed: 1, failed: 1 });
  });
  it("recalculates after removal without retaining a stale total", () => {
    const queue = items("completed", "queued", "failed");
    expect(getQueueSummary(queue.slice(1))).toEqual({ total: 2, queued: 1, running: 0, completed: 0, failed: 1 });
    expect(queue).toHaveLength(3);
  });
  it("handles all completed images", () => {
    const summary = getQueueSummary(items("completed", "completed"));
    expect(summary.completed).toBe(summary.total);
  });
});
