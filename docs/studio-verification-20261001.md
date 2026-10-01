# Studio consolidation — 2026-10-01

Status: ready for user review; no stable release or production deployment.
Base commit: 76ba774, branch feature/v0.1-studio-ui.

## Changes
- ESLint runs without an interactive setup, with no warnings allowed; Next.js and
  TypeScript recommended rules are enabled. Local check and CI include lint.
- CI uses npm ci, then typecheck, unit tests, build and Playwright; browser evidence
  is uploaded as a GitHub Actions artifact for seven days.
- Source order can be changed with accessible, 44px arrow buttons; selected image
  identity and queue order remain synchronized. Removal also has a 44px target.
- Imports reject unsupported MIME types, zero-byte files and files above 12 MiB,
  reporting every invalid file while retaining valid files from the same batch.
- Local previews use unoptimized Next Image with blob URLs. No upload is performed.
  URLs are released on removal and component unmount.
- The Effects navigation link opens the collapsed section.

## Results
- npm ci with Node 22.23.3 / npm 10.9.9: passed in an independent temporary copy.
- npm run lint: passed, zero warnings.
- npm run typecheck: passed.
- npm run test: 23 tests passed (effects, queue summary, validation and ordering).
- npm run build: passed on the same sources in the independent copy, avoiding the
  .next folder used by the existing development server.
- npm run test:e2e: 12 tests passed, Chromium, 1440/834/390/320px viewports; the last
  two emulate touch/mobile. This does not replace physical-device testing.
- npm audit: zero reported vulnerabilities, including development dependencies.
- git diff --check: passed.
- PR #1 CI was separately verified successful on 84b163c, run 36730243590. That
  older CI does not validate the new local changes.

Evidence is in [checks/studio-20261001](checks/studio-20261001). Desktop and mobile
screenshots were visually inspected. The tested flow preserves selection and
settings across imports/reordering, rejects invalid batches, supports keyboard
selection, maintains an empty state and clears in-memory media on reload. The main
flow reports no JavaScript page errors, fetch/XHR calls or horizontal overflow.

## Dependencies
Vitest was upgraded from 3.2.7 to 4.1.11. PostCSS 8.5.28 is pinned, with a scoped
Next.js override replacing its vulnerable 8.4.31 copy. Vite remains at 7.3.6.
The new lockfile was generated with temporary npm 12 after npm 10 failed resolving
peer dependencies; it was then successfully installed with ordinary npm 10 npm ci.
No global npm installation was changed.

References:
- [Next.js 15 ESLint configuration](https://nextjs.org/docs/15/app/api-reference/config/eslint)
- [Vitest advisory](https://github.com/vitest-dev/vitest/security/advisories/GHSA-82fw-gwwq-j7x9)
- [PostCSS advisory](https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp)

ESLint 9 is compatible with the current Next.js 15 config, but npm reports this major
as unsupported. A coordinated framework/linter upgrade remains future maintenance.
The temporary build emits a workspace-root warning due to an unrelated parent
lockfile; no parent files were changed.

## Remaining validation
User acceptance of the studio is pending. No provider call, backend upload, migration,
authentication, production deployment or release tag was introduced. File MIME/size
checks are client-side only; a future provider endpoint needs server validation,
rate limiting and confirmed API documentation. The complete production checklist
remains required before release.
