# Final Code Review — Fix Report

Date: 2026-07-16

## Fixes applied

### Fix 1 (Important): document.title restored on every page
- `src/pages/Home.jsx`: added `import { useEffect } from 'react'` and a `useEffect(() => { document.title = 'Atelier Mono — Architecture Studio' }, [])` (matches index.html static title).
- `src/pages/ProjectDetail.jsx`: added `import { useEffect } from 'react'` and a `useEffect(() => { if (project) document.title = \`${project.name} — Atelier Mono\` }, [project])` placed BEFORE the `if (!project) return <Navigate/>` early return, guarded internally to respect the Rules of Hooks.

### Fix 2 (Important): filter chips aria-pressed
- `src/pages/JournalIndex.jsx`: added `aria-pressed={theme === t}` to each theme chip `<button>`.

### Fix 3 (Minor): cursor preview viewport clamp
- `src/pages/JournalIndex.jsx`: rewrote `onMove` to clamp x to `window.innerWidth - 308` and y to `window.innerHeight - 222`.

### Fix 4 (Minor): semantic section-break heading
- `src/pages/JournalArticle.jsx`: changed the `.article-break` inner `<span>` to `<h2>`.
- `src/index.css`: appended `.article-break h2 { margin: 0; font: inherit; letter-spacing: inherit; }` right after the `.article-break` rule inside the Journal article section, so the h2 keeps the 11px uppercase styling and no default margins.

## Files changed
- src/pages/Home.jsx
- src/pages/ProjectDetail.jsx
- src/pages/JournalIndex.jsx
- src/pages/JournalArticle.jsx
- src/index.css

## Verification

### 1. Build
`npm run build` → PASS (`✓ built in 5.11s`, no errors).

### 2. Browser check (headless chromium via puppeteer, dev server on :5175, killed after)
- Article `/journal/why-we-still-draw-by-hand-first` title: "Why we still draw by hand first — Atelier Mono Journal"
- After clicking brand link → URL `http://localhost:5175/`, title `Atelier Mono — Architecture Studio` ✓
- `/projects/courtyard-house` title: `Courtyard House — Atelier Mono` ✓
- `/journal` chips: active "All" → `aria-pressed="true"`; all others `aria-pressed="false"` ✓
- Section break renders as `<H2>` (text "II — What the hand knows"), computed `font-size: 11px`, `text-transform: uppercase`, `margin: 0px`, `letter-spacing: 1.76px` ✓

All required checks passed.
