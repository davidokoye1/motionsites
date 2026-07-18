### Task 6: End-to-end verification pass

**Files:** none (verification only)

- [ ] **Step 1: Clean production build**

Run: `npm run build`
Expected: `✓ built in ...`, zero warnings about missing assets.

- [ ] **Step 2: Drive the full flow in a browser (dev server)**

With `npm run dev` running, verify each of:

1. Home → scroll to Journal → click "A year of measuring light in one room" → article loads, scrolled to top.
2. Article → "Next" → "What concrete remembers" loads (title, theme "Material", progress bar resets).
3. Article → "All entries" → `/journal` ledger.
4. Ledger → filter "Light" → only one row remains, animated; filter "All" → six rows return.
5. Ledger row hover (desktop) → floating preview follows cursor; leaves cleanly on mouse-out.
6. `/journal/does-not-exist` → redirected to `/journal`.
7. Narrow viewport (~390px): ledger shows thumbnails, article rail notes fold inline, no horizontal scroll anywhere.
8. Tab titles: `/journal` → "Journal — Atelier Mono"; article → "{title} — Atelier Mono Journal".
9. Navigate back to `/` — home sections and project pages still work (regression check: `/projects/courtyard-house`).

- [ ] **Step 3: Reduced-motion check**

Emulate `prefers-reduced-motion: reduce` (browser devtools → Rendering). Expected: progress line and "~N min left" pill are hidden on article pages.
