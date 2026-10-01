# SAS Video

SnakeBonD AI Studio — Video.

## v0.1.0 Foundation

The project is a modern rebuild of the original `atelier-video_v4.htm` prototype.

### Goals
- Next.js + React + TypeScript foundation.
- SnakeBonD dark / off-white / green design system.
- Responsive studio shell.
- Image upload and local preview.
- Prompt editor and technical controls.
- Effects data separated from the UI.
- No live video API in v0.1.
- No provider secret stored in the browser.

### Visual rule
No decorative snakes are used anywhere in the product. The only snake mark permitted is the official SnakeBonD logo supplied by the project owner. Its color may adapt to the theme without changing its shape.

### Development
```bash
npm ci
npm run dev
```

### Checks
```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Live video generation is planned for v0.2 with server-side provider credentials.

### Local generation queue
Imported images appear in order with an individual pending status. Selecting a queue
entry updates the preview; removing a source also removes its queue entry. The counter
tracks completed videos (0 / N until the v0.2 provider is connected), not uploaded images.
No simulated jobs or provider requests run. The queue and images remain in memory and
are cleared when the page reloads. Status types also cover running, completed and failed
jobs for the future provider integration.

### Browser regression tests
After `npm run build`, run `npx playwright install chromium`, then `npm run test:e2e`.
The suite starts its own production server on localhost:3102 and checks desktop,
tablet and two mobile sizes. Stop any other process using that port first.
GitHub CI uses `npm ci` and runs lint, typecheck, unit tests, build and browser tests.

### Source media
Use the arrow buttons below each image to change its generation order. Selection
stays attached to the same image. JPG, PNG and WEBP up to 12 MiB are accepted;
empty files and unsupported MIME types are reported without discarding valid files
from the same import. This is local input validation; future uploads require server
validation too. Preview object URLs are released on removal and studio unmount.

### Dependency maintenance
Vitest 4.1.11 and PostCSS 8.5.28 address the reported dependency advisories. Next.js
15.5.27's nested PostCSS is overridden to the same tested 8.5.28 version; review this
override when upgrading Next.js. Vite 7.3.6 is pinned for compatible test tooling.
ESLint 9 is used with Next.js 15's configuration; npm reports that this ESLint major
is no longer maintained. Plan a coordinated lint/framework upgrade separately.