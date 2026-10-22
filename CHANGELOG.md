# Changelog

## 0.1.2 (release preparation)

- Update all runtime, development and optional package manifests and regenerate
  their transitive lockfiles from current package registries.
- Upgrade Next.js and its tooling together to 16.4.2, React to 19.3.1 and the
  supported build/runtime Node.js line to 26.12.1.
- Keep ESLint at 9.39.5 because the current React, import and accessibility plugins
  do not support ESLint 10. Keep TypeScript at 6.0.3 because typescript-eslint
  requires TypeScript below 6.1. These are explicit compatibility limits.
- Reuse the tested, licensed local braces depth fix for CVE-2026-93687 until an
  upstream fixed release exists; include dependency security regression tests.

This change prepares the next patch release. Tags, releases, image publication
and deployment require the subsequent release workflow.

Lucide 1.x removes brand icons. Retain the existing GitHub icon locally with its
upstream ISC license so the site keeps its source links and appearance.
