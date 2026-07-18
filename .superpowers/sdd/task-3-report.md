# Task 3 Report: Journal index page (the ledger) + route

## What I implemented
- Created `src/pages/JournalIndex.jsx` — transcribed exactly from the brief. Consumes `ENTRIES` and `THEMES` from `src/data/journal.js`. Renders the "Field notes." ledger with theme-filter chips, per-year groups (parallax ghost numerals via `useScroll`/`useTransform`), animated ledger rows (Framer Motion `layout` + `AnimatePresence`), and a cursor-following image preview gated behind a hover-capable media query.
- Modified `src/App.jsx`: added `import JournalIndex from './pages/JournalIndex.jsx'` after the `ProjectDetail` import, and added `<Route path="/journal" element={<JournalIndex />} />` after the projects route.
- Modified `src/index.css`: appended the `/* ---------- Journal index ---------- */` section (journal-page, chip, ledger-*, ledger-preview + the 768px and max-767px media blocks) to the true end of the file.

## Verification commands & results

### Build
`npm run build` → `✓ built in 3.76s`, zero errors. CSS bundle 26.74 kB, JS 422.55 kB.

### Browser (Playwright headless chromium, dev server on :5174)
Python Playwright was not preinstalled; created an isolated venv at `/tmp/framer/pwvenv`, pinned `playwright==1.60.0` to match the cached `chromium-1223` browser, and launched via the full chromium executable. Script: `/tmp/framer/verify_journal.py`. Observed:
- TITLE: `Journal — Atelier Mono`
- H1: `Field notes.`
- COUNT: `6 ENTRIES, 2025 – 2026` (uppercased via CSS)
- CHIPS: `All, Drawing, Light, Material, Site, Craft`
- YEAR_LABELS + GHOST_YEARS: `2026`, `2025` (two groups, ghost numerals present)
- 6 rows numbered 01–06, correct titles, hrefs `/journal/<slug>` — rows 01–03 in 2026, 04–06 in 2025
- Material filter → only `What concrete remembers` + `Buildings that learn to age`
- Hover on desktop → 1 `.ledger-preview` element rendered
- Clicking row 01 → URL changed to `/journal/why-we-still-draw-by-hand-first` (renders nothing below navbar, as expected — route added in Task 4)
- No console/page errors
- Narrow viewport (390px): `.ledger-thumb` computed `display: block` (inline thumbnails shown); `.ledger-preview` hidden by max-width media rule

### Cleanup
Dev server killed; confirmed no vite ports listening.

## Files changed
- Created: `src/pages/JournalIndex.jsx`
- Modified: `src/App.jsx`
- Modified: `src/index.css` (appended only)

## Self-review findings
- Diffed JournalIndex.jsx, App.jsx edits, and CSS block against the brief — exact match, no deviations.
- CSS appended at true end: file grew 1854 → 2086 lines; the section begins immediately after the pre-existing `.detail-nav-all` closing block. Nothing above line 1854 was touched.
- Reused classes `.sheet-label` (line 318) and `.section-lede` (line 345) already exist in index.css, so the component's markup is fully styled.
- No new fonts, no new color tokens introduced (constraint compliant).
