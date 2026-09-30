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
npm install
npm run dev
```

### Checks
```bash
npm run typecheck
npm run test
npm run build
```

Live video generation is planned for v0.2 with server-side provider credentials.
