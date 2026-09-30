"use client";
import { promptPresets } from "@/data/presets";
import { useMemo, useState } from "react";
import {
  MediaPanel,
  type MediaItem,
} from "@/components/media/MediaPanel";
import { effects } from "@/data/effects";

export function StudioShell() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

  const [prompt, setPrompt] = useState(
    "Cinematic camera movement, subtle depth, realistic light, premium film look.",
  );

  const [selectedEffect, setSelectedEffect] = useState("cinematic");
const [movementIntensity, setMovementIntensity] = useState("random");
  const selectedMedia = useMemo(
    () =>
      mediaItems.find((item) => item.id === selectedMediaId) ??
      mediaItems[0] ??
      null,
    [mediaItems, selectedMediaId],
  );

  const selectedEffectData = useMemo(
    () =>
      effects.find((effect) => effect.id === selectedEffect) ??
      effects[0],
    [selectedEffect],
  );

  function handleMediaChange(items: MediaItem[]) {
    setMediaItems(items);

    if (items.length === 0) {
      setSelectedMediaId(null);
      return;
    }

    if (!items.some((item) => item.id === selectedMediaId)) {
      setSelectedMediaId(items[0].id);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="wordmark">
          SnakeBonD <span>/ SAS VIDEO</span>
        </div>

        <nav aria-label="Navigation principale">
          <a href="#studio">Studio</a>
          <a href="#effects">Effects</a>
          <a href="#project">Project</a>
        </nav>

        <div className="version">V0.1</div>
      </header>

      <section className="studio" id="studio">
        <MediaPanel
          items={mediaItems}
          selectedId={selectedMediaId}
          onChange={handleMediaChange}
          onSelect={(id) => setSelectedMediaId(id || null)}
        />

        <section className="preview-panel" aria-label="Aperçu média">
          <div className="preview-head">
            <div>
              <div className="eyebrow">02 / PREVIEW</div>
              <h1>Image to motion.</h1>
            </div>

            <span className="status">
              <i /> READY
            </span>
          </div>

          <div className="preview-stage">
            {selectedMedia ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedMedia.previewUrl}
                alt="Image source sélectionnée"
              />
            ) : (
              <div className="empty-preview">
                <div className="frame-mark">+</div>
                <p>Import an image to start.</p>
              </div>
            )}

            <div className="preview-index">
              {selectedMedia
                ? `IMAGE / ${String(
                    mediaItems.findIndex(
                      (item) => item.id === selectedMedia.id,
                    ) + 1,
                  ).padStart(3, "0")}`
                : "SAS / VIDEO"}
            </div>
          </div>

          <div className="timeline" aria-label="Timeline">
            <div className="timeline-playhead" />

            {[1, 2, 3, 4, 5].map((item) => (
              <div className="timeline-cell" key={item}>
                0{item}
              </div>
            ))}
          </div>
        </section>

        <aside className="panel controls-panel">
          <div className="eyebrow">03 / DIRECTION</div>

          <label>
            <span>Prompt</span>

            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
          </label>
<div className="prompt-presets">
  {promptPresets.map((preset) => (
    <button
      key={preset.id}
      type="button"
      className="preset-button"
      onClick={() => setPrompt(preset.prompt)}
      title={preset.name}
    >
      {preset.name}
    </button>
  ))}
</div>
<div className="control-grid">
  <label>
    <span>Duration</span>
    <select defaultValue="6.4s">
      <option value="5s">5s</option>
      <option value="6.4s">6.4s · Recommended</option>
      <option value="10s">10s</option>
    </select>
  </label>

  <label>
    <span>Framing</span>
    <select defaultValue="random">
      <option value="random">Random</option>
      <option value="close">Close</option>
      <option value="medium">Medium</option>
      <option value="wide">Wide</option>
    </select>
  </label>

  <label className="control-wide">
    <span>Movement intensity</span>
    <select
      value={movementIntensity}
      onChange={(event) => setMovementIntensity(event.target.value)}
    >
      <option value="random">Random</option>
      <option value="subtle">Subtle</option>
      <option value="moderate">Moderate</option>
      <option value="strong">Strong</option>
    </select>
  </label>
</div>

          <div className="section-rule" />

          <div className="eyebrow" id="effects">
            EFFECT LIBRARY
          </div>

          <div className="effects-list">
            <button
              type="button"
              className={
                selectedEffect === "none"
                  ? "effect active"
                  : "effect"
              }
              onClick={() => setSelectedEffect("none")}
            >
              <span>Aucun effet</span>
              <small>Original</small>
            </button>

            {effects.map((effect) => (
              <button
                type="button"
                className={
                  effect.id === selectedEffect
                    ? "effect active"
                    : "effect"
                }
                onClick={() => setSelectedEffect(effect.id)}
                key={effect.id}
              >
                <span>{effect.name}</span>
                <small>{effect.group}</small>
              </button>
            ))}
          </div>

          <div className="effect-description">
            {selectedEffect === "none"
              ? "Aucune transformation visuelle appliquée."
              : selectedEffectData.description}
          </div>

          <button
            className="generate-button"
            type="button"
            disabled
          >
            GENERATE VIDEO <span>→</span>
          </button>

          <small className="generation-note">
            Generation engine will be connected in v0.2.
            Provider secrets remain server-side.
          </small>
        </aside>
      </section>

      <footer className="bottom-strip" id="project">
        <span>SECURE BY DESIGN</span>
        <span>DESKTOP + MOBILE</span>
        <span>24 EFFECTS</span>
        <span>9:16 VIDEO WORKFLOW</span>
      </footer>
    </main>
  );
}