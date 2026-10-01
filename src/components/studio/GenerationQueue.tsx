"use client";

import Image from "next/image";
import type { MediaItem } from "@/components/media/MediaPanel";
import { generationStatusLabels, getQueueSummary } from "@/lib/generation-queue";

type GenerationQueueProps = {
  items: MediaItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function GenerationQueue({ items, selectedId, onSelect }: GenerationQueueProps) {
  const summary = getQueueSummary(items);

  return (
    <section className="generation-queue" aria-labelledby="queue-heading">
      <div className="queue-heading">
        <div>
          <div className="eyebrow">GENERATION QUEUE</div>
          <h2 id="queue-heading">File d’attente</h2>
        </div>
        <span className="queue-count" role="status" aria-live="polite" aria-atomic="true">
          {summary.completed} / {summary.total} terminées
        </span>
      </div>
      <progress
        className="queue-progress"
        value={summary.completed}
        max={summary.total || 1}
        aria-label="Vidéos terminées"
      />
      <p className="queue-note">
        Génération disponible en v0.2. Les images restent dans cette session ;
        recharger la page vide la file.
      </p>
      {items.length === 0 ? (
        <p className="queue-empty">Ajoutez des images pour préparer la file de génération.</p>
      ) : (
        <ol className="queue-list" aria-label="Images à générer">
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className="queue-item"
                aria-pressed={item.id === selectedId}
                aria-label={`Aperçu de l’image ${index + 1} : ${item.file.name}`}
                onClick={() => onSelect(item.id)}
              >
                <span className="queue-position">{String(index + 1).padStart(2, "0")}</span>
                <Image unoptimized src={item.previewUrl} alt="" width={36} height={48} />
                <span className="queue-filename" title={item.file.name}>{item.file.name}</span>
                <span className={`queue-status queue-status-${item.generationStatus}`}>
                  {generationStatusLabels[item.generationStatus]}
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
