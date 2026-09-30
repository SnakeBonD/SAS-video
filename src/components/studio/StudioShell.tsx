"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { effects } from "@/data/effects";

export function StudioShell() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No image selected");
  const [prompt, setPrompt] = useState("Cinematic camera movement, subtle depth, realistic light, premium film look.");
  const [selectedEffect, setSelectedEffect] = useState("cinematic");

  const selected = useMemo(
    () => effects.find((effect) => effect.id === selectedEffect) ?? effects[0],
    [selectedEffect],
  );

  function onImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setFileName(file.name);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="wordmark">SnakeBonD <span>/ SAS VIDEO</span></div>
        <nav aria-label="Navigation principale">
          <a href="#studio">Studio</a>
          <a href="#effects">Effects</a>
          <a href="#project">Project</a>
        </nav>
        <div className="version">V0.1 FOUNDATION</div>
      </header>

      <section className="studio" id="studio">
        <aside className="panel media-panel">
          <div className="eyebrow">01 / MEDIA</div>
          <h2>Source image</h2>
          <label className="upload-zone">
            <input type="file" accept="image/*" onChange={onImage} />
            <span className="upload-plus">+</span>
            <strong>Add image</strong>
            <small>JPG · PNG · WEBP</small>
          </label>
          <div className="file-meta">{fileName}</div>

          <div className="section-rule" />
          <div className="eyebrow">PROJECT</div>
          <button className="ghost-button" type="button">New project</button>
          <button className="ghost-button" type="button">Save locally</button>
        </aside>

        <section className="preview-panel" aria-label="Aperçu média">
          <div className="preview-head">
            <div>
              <div className="eyebrow">02 / PREVIEW</div>
              <h1>Image to motion.</h1>
            </div>
            <span className="status"><i /> READY</span>
          </div>

          <div className="preview-stage">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Image source importée" />
            ) : (
              <div className="empty-preview">
                <div className="frame-mark">+</div>
                <p>Import an image to start.</p>
              </div>
            )}
            <div className="preview-index">SAS / VIDEO / 001</div>
          </div>

          <div className="timeline" aria-label="Timeline mock">
            <div className="timeline-playhead" />
            {[1, 2, 3, 4, 5].map((item) => <div className="timeline-cell" key={item}>0{item}</div>)}
          </div>
        </section>

        <aside className="panel controls-panel">
          <div className="eyebrow">03 / DIRECTION</div>
          <label>
            <span>Prompt</span>
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          </label>

          <div className="control-grid">
            <label><span>Duration</span><select defaultValue="6.4s"><option>5s</option><option>6.4s</option><option>10s</option></select></label>
            <label><span>Framing</span><select defaultValue="random"><option value="random">Random</option><option>Close</option><option>Medium</option><option>Wide</option></select></label>
          </div>

          <div className="section-rule" />
          <div className="eyebrow" id="effects">EFFECT LIBRARY</div>
          <div className="effects-list">
            {effects.map((effect) => (
              <button
                type="button"
                className={effect.id === selectedEffect ? "effect active" : "effect"}
                onClick={() => setSelectedEffect(effect.id)}
                key={effect.id}
              >
                <span>{effect.name}</span><small>{effect.category}</small>
              </button>
            ))}
          </div>
          <div className="effect-description">{selected.description}</div>

          <button className="generate-button" type="button" disabled>
            GENERATE VIDEO <span>→</span>
          </button>
          <small className="generation-note">Live generation starts in v0.2. API keys remain server-side.</small>
        </aside>
      </section>

      <footer className="bottom-strip" id="project">
        <span>SECURE BY DESIGN</span>
        <span>DESKTOP + MOBILE</span>
        <span>MODULAR PROVIDERS</span>
        <span>NO DECORATIVE SNAKES</span>
      </footer>
    </main>
  );
}
