# AGENTS: Development Guide (Codex + Claude)

This repository includes guidance for AI coding assistants (Codex CLI and Claude) to work consistently across development, docs, and releases.

## Quick Summary
- Source of truth: version in `package.json`
- Two changelogs to maintain: `CHANGELOG.md` and `docs/changelog.html`
- Examples in `examples/` are local-dev; docs copies live in `docs/examples/` (CDN)
- Docs analytics is centralized in `docs/assets/navigation.js`; do not add it to `docs/demo.html`
- Always run `npm run build` before testing examples
- Use `node docs/copy-examples.js` to re-copy examples and bump CDN version
- Keep diffs minimal and focused; don’t fix unrelated issues

## Core Commands
- Dev servers:
  - `npm run dev` (or `dev:basic`, `dev:dragdrop`, `dev:embed`)
- Build + lint:
  - `npm run build`
  - `npm run lint`
- Docs:
  - `npm run docs:serve` (local static docs on :8000)
  - `npm run docs:examples` (copy examples → docs + set CDN version)
- Versioning:
  - `npm version patch|minor|major` (runs build + lint via prepublishOnly)
- Release:
  - `git push origin main --tags`
  - `npm publish` (public)

## Release Process (Checklist)
1) Merge feature branch → `main`
2) Update root changelog: `CHANGELOG.md`
3) Update docs changelog: `docs/changelog.html`
4) Bump version in `package.json` (manually or via `npm version patch|minor|major`)
5) Build + lint: `npm run build && npm run lint`
6) **CRITICAL**: Run `node docs/copy-examples.js` to sync docs examples with new version
   - This script reads version from package.json and updates ALL CDN references automatically
   - Updates: docs/examples/, docs/installation.html, docs/demo.html, docs/examples.html, docs/changelog.html
7) Manually update remaining CDN references:
   - `README.md` (version badge text + CDN URLs in Quick Start section)
   - `AGENTS.md` (Current version section below)
8) **VERIFY**: Check all docs files have correct version
   - Run: `grep -r "belowjs@1\." docs/*.html README.md | grep -v "1.7.1"` (should be empty)
9) Commit, tag, and push:
   - Commit message: `release: X.Y.Z – summary`
   - Tag: `vX.Y.Z`
9) Login to npm (if needed): `npm login`
10) Publish: `npm publish`

## Versioning & Changelogs
- Use SemVer.
- Keep `CHANGELOG.md` concise and chronological.
- Mirror relevant entries in `docs/changelog.html` (HTML, with “Latest Release” banner).
- For features that alter public behavior (e.g., screenshot button), document:
  - New config options
  - New public methods
  - Any required renderer flags

## Examples & Docs Sync
- Local examples (`examples/`) import from `/dist`.
- Docs examples (`docs/examples/`) import from CDN with the current package version.
- Script: `docs/copy-examples.js` copies and rewrites imports.
- After bumping the version, rerun the script and verify CDN refs.

## Git & Branching
- Feature branches: `feature/<short-name>`
- Release branches (optional): `release/<major.minor.x>`
- Merge to `main` with minimal conflict churn. Resolve examples carefully.
- Commit messages should be scoped and descriptive.

## Assistant Playbook
- Keep preambles short when running commands; group related actions.
- Maintain an explicit plan/TODO if supported (e.g., Plan tool).
- Validate changes with build + lint; prefer small, verifiable steps.
- Ask before destructive actions (resets, large refactors).
- Don’t introduce new tools or formatters without user approval.

## Do / Don’t
- Do: update both changelogs; bump README + docs CDN versions.
- Do: run `docs:examples` after version bumps.
- Don’t: fix unrelated issues or reformat unrelated files.
- Don’t: publish without successful build + lint.

## Useful Paths
- `src/` – source modules
- `dist/` – built JS/CSS bundles
- `examples/` – local dev examples (dist imports)
- `docs/` – static docs site
- `docs/examples/` – CDN-based examples (copied)
- `docs/copy-examples.js` – example copy + CDN rewrite script
- `CHANGELOG.md` – root changelog
- `docs/changelog.html` – docs changelog

## Current (1.7.2)
- Fixed: Model selector and dive mode toggle remain usable after opening the Quest system menu during immersive viewing
