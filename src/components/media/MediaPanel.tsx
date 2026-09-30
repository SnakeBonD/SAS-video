"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";

const MAX_FILE_SIZE = 12 * 1024 * 1024;

export type MediaItem = {
  id: string;
  file: File;
  previewUrl: string;
};

type MediaPanelProps = {
  items: MediaItem[];
  selectedId: string | null;
  onChange: (items: MediaItem[]) => void;
  onSelect: (id: string) => void;
};

export function MediaPanel({
  items,
  selectedId,
  onChange,
  onSelect,
}: MediaPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addFiles(files: File[]) {
    setError(null);

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        return false;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}" dépasse la limite de 12 Mo.`);
        return false;
      }

      return true;
    });

    const newItems = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    if (newItems.length === 0) {
      return;
    }

    const nextItems = [...items, ...newItems];

    onChange(nextItems);

    if (!selectedId) {
      onSelect(newItems[0].id);
    }
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.target.files ?? []));

    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    addFiles(Array.from(event.dataTransfer.files));
  }

  function removeItem(id: string) {
    const item = items.find((media) => media.id === id);

    if (item) {
      URL.revokeObjectURL(item.previewUrl);
    }

    const nextItems = items.filter((media) => media.id !== id);

    onChange(nextItems);

    if (selectedId === id) {
      onSelect(nextItems[0]?.id ?? "");
    }
  }

  return (
    <aside className="media-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">SOURCE MEDIA</span>
          <h2>Images</h2>
        </div>

        <span className="media-count">{items.length}</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleInput}
      />

      <div
        className={`media-dropzone ${isDragging ? "is-dragging" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <span className="dropzone-plus">+</span>

        <strong>Ajouter des images</strong>

        <span>
          Cliquer ou glisser-déposer
          <br />
          JPG, PNG, WEBP · 12 Mo max.
        </span>
      </div>

      {error && (
        <div className="media-error" role="alert">
          {error}
        </div>
      )}

      {items.length > 0 ? (
        <div className="media-grid">
          {items.map((item, index) => (
            <article
              key={item.id}
              className={`media-card ${
                selectedId === item.id ? "is-selected" : ""
              }`}
            >
              <button
                type="button"
                className="media-preview"
                onClick={() => onSelect(item.id)}
                aria-label={`Sélectionner l'image ${index + 1}`}
              >
                <img
                  src={item.previewUrl}
                  alt={`Image source ${index + 1}`}
                />

                <span className="media-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>

              <button
                type="button"
                className="media-remove"
                onClick={() => removeItem(item.id)}
                aria-label={`Supprimer l'image ${index + 1}`}
                title="Supprimer"
              >
                ×
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="media-empty">
          <span>NO MEDIA</span>
          <p>
            Les images ajoutées apparaîtront ici dans l’ordre de génération.
          </p>
        </div>
      )}
    </aside>
  );
}