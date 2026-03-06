# Assistant Guide

This document has moved. Please use `AGENTS.md` as the unified guide for both Claude and Codex CLI.

Highlights for assistants:
- Build with `npm run build`; test via `npm run dev`
- Keep both changelogs updated: `CHANGELOG.md` and `docs/changelog.html`
- Sync docs examples to CDN with `node docs/copy-examples.js`
- Verify and bump CDN versions in docs pages and README, and update the homepage version pill in `docs/index.html`
- Version with `npm version`, then tag, push, and `npm publish`

For the complete checklist and conventions, see `AGENTS.md`.
