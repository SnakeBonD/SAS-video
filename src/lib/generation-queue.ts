export type GenerationStatus = "queued" | "running" | "completed" | "failed";

export const generationStatusLabels: Record<GenerationStatus, string> = {
  queued: "En attente",
  running: "En cours",
  completed: "Terminée",
  failed: "Échec",
};

export function getQueueSummary(items: readonly { generationStatus: GenerationStatus }[]) {
  const counts = { queued: 0, running: 0, completed: 0, failed: 0 };
  for (const item of items) counts[item.generationStatus] += 1;
  return { ...counts, total: items.length };
}
