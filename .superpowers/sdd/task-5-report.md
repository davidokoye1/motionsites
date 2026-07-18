# Task 5 Report: Wire up home Journal section + Navbar

## What I implemented

1. **`src/sections/Journal.jsx`** — Replaced the whole file per the brief. The three home cards now pull from the `journal.js` data module via `getEntry` against a `FEATURED` slug list, and each card is a `<Link>` to `/journal/:slug` (was a dead `#journal` anchor). Card excerpts now render each entry's `deck`. Added an "All entries" `<Link className="journal-all">` (to `/journal`) with an `ArrowUpRight` icon in the journal head.

2. **`src/index.css`** — Added the `.journal-all` and `.journal-all:hover` rules inside the existing `/* ---------- Journal ---------- */` section, immediately after the `.note-excerpt` rule (before `/* ---------- Voices ---------- */`), exactly as specified. Uses only palette tokens (`--ink-55`, `--ink`, `--line-strong`).

3. **`src/sections/Navbar.jsx`** —
   - `MENU_LINKS` Journal entry changed from `{ label: 'Journal', hash: 'journal' }` to `{ label: 'Journal', to: '/journal' }`.
   - The menu-item body now branches: `<Link className="menu-link" to={link.to} onClick={onClose}>` for entries with `.to`, and the existing `<button className="menu-link" onClick={() => goTo(link.hash)}>` for `.hash` entries.
   - Changed the `motion.li` `key` from `link.hash` to `link.label`. This was necessary because the Journal entry no longer has a `hash` property, so `key={link.hash}` would have produced `key={undefined}` and a React duplicate/undefined-key warning. `link.label` is unique and stable across all entries.

## `.menu-link` selector extension — NOT needed

The brief asked to verify `.menu-link` renders identically on an `<a>` as on a `<button>` and to extend the selector only if it did not. It renders identically, so **no extension was made**. Evidence:
- The global reset `a { color: inherit; text-decoration: none; }` (src/index.css:35-38) strips default anchor underline/color.
- `.menu-link` (src/index.css:1006) sets `background: none; border: none; color: var(--paper)` explicitly, overriding button chrome on either element.
- Computed-style comparison in the browser confirmed the anchor and button `.menu-link` are byte-identical: `color rgb(250,249,247)`, `fontSize 40px`, `fontWeight 300`, `textDecoration none`, `letterSpacing -1px`, `background rgba(0,0,0,0)`, `border 0px`.

## Verification commands & results

- `npm run build` → `✓ built in 4.79s`, no errors.
- Browser verification (Playwright headless chromium, dev server on :5173, then killed):
  - `a.journal-all`: count 1, text "ALL ENTRIES", href `/journal`.
  - `section#journal a.note-link`: count 3, hrefs = `/journal/why-we-still-draw-by-hand-first`, `/journal/a-year-of-measuring-light-in-one-room`, `/journal/the-first-site-visit-is-the-whole-project`.
  - Clicking the first card navigated to `http://localhost:5173/journal/why-we-still-draw-by-hand-first`.
  - Overlay menu: 8 `.menu-link` items; the Journal item is an `<a>` with href `/journal`.
  - Anchor vs button `.menu-link` computed styles identical (see above).
  - Clicking the Journal menu item navigated to `/journal` and closed the overlay (overlay count 0 after the 0.4s AnimatePresence exit).

## Files changed

- `src/sections/Journal.jsx` (full replacement)
- `src/index.css` (added `.journal-all` rules in the Journal section)
- `src/sections/Navbar.jsx` (MENU_LINKS Journal → `/journal`; branch render Link/button; `key` → `link.label`)

## Self-review findings

- Brief followed exactly, with one justified deviation: the `motion.li` `key` was changed from `link.hash` to `link.label` because the retargeted Journal entry no longer carries a `hash`. Without this, React would warn on an undefined key. All other menu entries still have unique labels, so the key remains unique and stable.
- No new colors, no new fonts, mobile-first CSS conventions respected. `.journal-all` inserted inside the existing labeled section (not appended at EOF).
