# Task 6: End-to-end verification report

Date: 2026-07-16
Environment: React 19 + Vite (Atelier Mono) at /home/okoye/motionsites
Tooling: `npm run build`; Playwright (chromium, headless) via Node script at /tmp/journal_verify.mjs (+ re-verification /tmp/journal_verify2.mjs)

## Step 1: Clean production build

PASS — `npm run build` → `✓ built in 4.58s`, 2094 modules transformed. No warnings about missing assets. Only informational output is Vite listing bundled image assets (large PNGs) and the JS/CSS chunk sizes; no chunk-size warning emitted. No errors.

## Step 2: Browser flow checks (dev server on http://localhost:5173)

1. PASS — Home → scroll to `#journal` → click "A year of measuring light in one room" (1 matching `a.note-link`). Article loads at `/journal/a-year-of-measuring-light-in-one-room`, title = "A year of measuring light in one room", scrollY = 0 (scrolled to top).

2. PASS — Article → "Next" (`a.detail-nav-next` → `/journal/what-concrete-remembers`). New page title = "What concrete remembers", kicker = "Material · January 2026 · 5 min read" (theme Material confirmed). Progress line container full-width and driven by scaleX scroll transform (resets at top of new article). Note: initial headless run read stale AnimatePresence exit DOM; re-verified with waitForFunction on title text → correct.

3. PASS — Article → "All entries" (`a.detail-nav-all`) → URL `/journal`, ledger renders 6 `.ledger-row` entries (re-verified with `waitForSelector('.ledger-row')`; first run read before AnimatePresence enter completed).

4. PASS — Ledger filter "Light" → exactly 1 row remains; filter "All" → 6 rows return. (initial=6, light=1, back=6.)

5. PASS — Ledger row hover (desktop; `matchMedia('(hover: hover) and (pointer: fine)')` = true in headless chromium): floating `.ledger-preview` appears on hover (count=1); after moving cursor away to empty area it clears (count=0) once the exit animation completes.

6. PASS — `/journal/does-not-exist` → redirected (React Router `<Navigate replace>`) to `/journal`. Final URL = http://localhost:5173/journal.

7. PASS — Narrow viewport 390px: ledger shows 6 `.ledger-thumb` thumbnails; horizontal overflow = 0px on ledger, article (`what-concrete-remembers`), and home. No horizontal scroll anywhere.

8. PASS — Tab titles: `/journal` → "Journal — Atelier Mono"; article → "What concrete remembers — Atelier Mono Journal".

9. PASS — Regression: home renders 8 `<section>` elements incl. `#journal`; `/projects/courtyard-house` loads (URL correct, 1173 chars of body text). No console errors on any main-page navigation.

## Step 3: Reduced-motion check

10. PASS — With `prefers-reduced-motion: reduce` emulated (Playwright `reducedMotion: 'reduce'`), on article page `.read-progress` computes to `display: none`.
11. PASS — `.read-remaining` ("~N min left" pill) computes to `display: none` under reduced-motion.

## Console errors
None captured across all navigations (page `console` type=error and `pageerror` listeners empty).

## Summary
11/11 checks pass (build + 9 flow + reduced-motion progress + reduced-motion pill). No files modified. Dev server killed after run.

Note on method: 4 checks (2,3,4-timing,5) initially reported false-negatives in the first headless pass because Framer Motion's AnimatePresence keeps exiting nodes mounted during transitions and my DOM reads fired before React repainted. All four were re-run with explicit state waits and confirmed passing; the app behavior is correct.
