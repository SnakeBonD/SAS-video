# Local generation queue — verification, 2026-09-30

Status: implemented and locally tested; user validation pending. No release or deployment.
Branch: feature/v0.1-studio-ui. Base: edb71fb.

## Scope
- One queue entry per imported image, in import order, with an individual pending status.
- Completed video count and native progress bar; no fake progress or provider calls.
- Queue selection updates preview; removing a source removes its queue entry.
- Queue uses the source media state, avoiding a second list that can drift out of sync.
- Queue stays in memory; page reload clears it, as explained in the interface.
- Typed pending/running/completed/failed states prepare the future provider connection.
- Tablet layout switches at 900px to fix the observed 6px overflow at 834px.

## Automated checks
Node 22.23.3, Next.js 15.5.27, Vitest 3.2.7.
- npm run typecheck: passed.
- npm run test: 11 passed (6 effects + 5 queue summary tests).
- npm run build: passed, including after the responsive correction.
- git diff --check: passed.
- npm run lint: NOT validated. Existing script launches the interactive ESLint setup;
  no ESLint configuration is present. The build message is not evidence of an ESLint pass.

The initial build in the working checkout failed on missing generated chunks while an
existing next dev server used the same .next directory on port 3000. Checks were then
run on a temporary copy of the sources with the same installed dependencies and a
separate .next directory. The existing dev process was left running.
The temporary copy emitted a workspace-root warning because of a parent lockfile;
production build nevertheless completed successfully.

## Browser checks
Playwright / Chromium, production build served locally on port 3101.
Viewport sizes: 1440x1000, 834x1112, 390x844, 320x740.
At each size:
1. Empty queue displays 0 / 0.
2. Import two synthetic PNGs, including a long filename: two pending entries, 0 / 2.
3. Select second entry: preview switches to image 002.
4. Focus first entry and press Enter: preview switches to image 001.
5. Generation CTA remains disabled with the v0.2 label.
6. Remove selected source: one entry remains and selection falls back correctly.
7. Remove final source: queue and preview become empty, 0 / 0.
8. Reimport works; reload clears the in-memory queue.
9. No JavaScript page errors, no fetch/XHR API requests, no horizontal page overflow.

Evidence: [results.json](checks/queue/results.json), and desktop/tablet/mobile/small-mobile
queue screenshots in the checks/queue directory. Desktop and small-mobile captures were
visually inspected. These are emulated viewport checks, not physical-device tests.

## Security and remaining work
Images remain local blob URLs; no new endpoint, credentials, storage or dependencies.
No migration is needed. Source labels render as React text.
Agnes integration, real state transitions, persistence, deployment, full pre-production
checklist and release validation remain outstanding. This is not a stable release.
