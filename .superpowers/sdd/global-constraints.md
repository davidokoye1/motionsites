## Global Constraints

- **No test framework exists** in this project (no vitest/jest). Verification = `npm run build` must pass with zero errors, plus browser verification steps given per task. Do NOT add a test framework.
- **Not a git repository.** All commit steps are intentionally omitted. Do NOT run `git init`.
- Follow existing code conventions exactly: `.jsx` files, no semicolon-free style changes, `const EASE = [0.16, 1, 0.3, 1]` at module top, CSS in the single `src/index.css` file appended in labeled `/* ---------- Name ---------- */` sections, mobile-first CSS with `@media (min-width: 768px)` and `(min-width: 1024px)` overrides added inside the existing media-query blocks or as new blocks at the end.
- Palette tokens only: `--paper`, `--paper-dim`, `--ink`, `--ink-55`, `--ink-70`, `--line`, `--line-strong`. No new colors.
- **Typography is Inter only — do NOT add any font.** (User direction 2026-07-16: stay within the existing design system.) Reuse the site's established type patterns verbatim: display titles `font-weight: 300` with tight negative letter-spacing (as `.detail-title`), meta text `11px / 500 / uppercase / letter-spacing 0.1em` (as `.note-head`), body prose `15.5px / 1.75` (as `.detail-narrative p`), large quotes `font-weight: 300` with `clamp()` sizing (as `.voice-quote p`).
- All images are existing assets in `src/assets/` — do not add image files.
- Run all commands from `/home/okoye/motionsites`.

---
