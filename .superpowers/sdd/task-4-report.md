# Task 4 Report: Journal article page + route

## What I implemented

1. **Created `src/pages/JournalArticle.jsx`** — transcribed verbatim from the brief. The component:
   - Consumes `getEntry(slug)` and `adjacentEntries(slug)` from `src/data/journal.js`.
   - Renders a fixed 2px `.read-progress` bar bound to `scrollYProgress`.
   - Article header (kicker, title, deck) and a "~N min left" pill that counts down via `useMotionValueEvent`.
   - `ArticleBody` renders blocks with the block-rendering rule: `note` blocks attach to the *following* block's rail; figures get a numbered `Fig. N` caption in the rail; the first `p` gets the drop cap.
   - Redirects unknown slugs to `/journal` via `<Navigate to="/journal" replace />`.
   - Sets `document.title` to `${title} — Atelier Mono Journal`.
   - prev/next nav reuses existing `detail-nav*` classes (no duplication).

2. **Modified `src/App.jsx`** — added `import JournalArticle from './pages/JournalArticle.jsx'` after the `JournalIndex` import, and added `<Route path="/journal/:slug" element={<JournalArticle />} />` after the `/journal` route inside `<Routes>`.

3. **Appended to `src/index.css`** — the `/* ---------- Journal article ---------- */` section at the true end of the file (lines 2088–2297), including the mobile-first base styles, the `@media (min-width: 768px)` grid rail overrides, and the `@media (prefers-reduced-motion: reduce)` block. No `detail-nav*` styles were added.

## Verification

### Build
`npm run build` → **`✓ built in 7.77s`**, no errors.

### Browser (Playwright headless, dev server on port 5174)
Verified `http://localhost:5174/journal/why-we-still-draw-by-hand-first`:
- Tab title: `Why we still draw by hand first — Atelier Mono Journal` ✓
- Kicker: `Drawing · June 2026 · 6 min read` ✓
- Article title: `Why we still draw by hand first` ✓
- Deck: `The pencil is slower than the mouse, and that is the point.` ✓
- Read pill: `~6 MIN LEFT` initially → `~1 MIN LEFT` after scrolling to bottom (countdown works) ✓
- First paragraph classes: `article-p has-dropcap` ✓
- Margin note label: `STUDIO RULE N° 3` ✓
- Pull quote: `Speed hides decisions. A hand drawing exposes every one of them.` ✓
- Section break: `II — WHAT THE HAND KNOWS` ✓
- Figure caption: `Fig. 1 — Courtyard House — the bench that survived…` ✓
- Footer: `FILED UNDER DRAWING · JUNE 2026` ✓
- Nav: Previous → `/journal/buildings-that-learn-to-age` ("Buildings that learn to age"); Next → `/journal/a-year-of-measuring-light-in-one-room` ("A year of measuring light in one room"); "All entries" → `/journal` ✓
- `.read-progress` element present (count 1) ✓

Redirect: `http://localhost:5174/journal/nonexistent` → URL resolved to `http://localhost:5174/journal` (journal index rendered) ✓

Dev server killed after verification.

## Files changed
- Created: `/home/okoye/motionsites/src/pages/JournalArticle.jsx`
- Modified: `/home/okoye/motionsites/src/App.jsx`
- Modified: `/home/okoye/motionsites/src/index.css` (appended section at end)

## Self-review findings
- Transcription matches the brief's code blocks exactly (JSX, route, CSS).
- CSS section confirmed appended at the true end of `index.css` (last block is the `prefers-reduced-motion` rule).
- Confirmed no `detail-nav*` styles were duplicated in the new section (grep after line 2087 returns nothing).
- Route order: `/journal` before `/journal/:slug` as specified.
- No new fonts, no new color tokens, no test framework added, no git usage — all global constraints respected.
