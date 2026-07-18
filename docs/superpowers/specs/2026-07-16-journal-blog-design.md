# Atelier Mono — Journal (Blog) Design

**Date:** 2026-07-16
**Status:** Approved by user

## Goal

Turn the home page's static "Journal" teaser section into a fully functional,
art-directed blog: an archive index at `/journal` and individual article pages
at `/journal/:slug`, designed as a printed architecture journal that extends
the site's existing paper/ink system.

## Decisions (from brainstorming)

- **Scope:** full blog experience — index page, article pages, home section
  linked in. Six articles with real written content.
- **Content source:** JS data module (`src/data/journal.js`), mirroring the
  existing `src/data/projects.js` pattern. No new runtime dependencies.
- **Architecture:** routed pages + typed content-block renderer (mirrors
  `/projects/:slug`). Rejected: overlay reader, one-long-scroll page.
- **Signature elements (all four chosen):** editorial print style, margin
  annotations, reading progress & flow, archive-style ledger index.

## Content model — `src/data/journal.js`

Six entries. The three existing teasers ("Why we still draw by hand first",
"A year of measuring light in one room", "The first site visit is the whole
project") are written out in full; three new articles in the same voice cover
materials, models, and weathering. Hero images reuse existing assets
(`journal-*.png`, `mat-*.png`, `detail-*.png`) — no new image assets.

```js
{
  slug, title, deck,          // deck = one-line subtitle
  date, iso, year,            // 'June 2026', '2026-06-12', '2026'
  theme,                      // 'Drawing' | 'Light' | 'Site' | 'Material' | ...
  readTime, img, alt,
  blocks: [
    { type: 'p', text },              // paragraph; first gets the drop cap
    { type: 'pull', text },           // pull quote breaking the measure
    { type: 'figure', img, alt, caption }, // image w/ numbered print caption
    { type: 'note', label, text },    // margin annotation for following block
    { type: 'break', label },         // numbered section rule, e.g. 'II — On patience'
  ],
}
```

Helpers: `getEntry(slug)`, `adjacentEntries(slug)` (same shape as projects).

## Routing & integration

- `App.jsx`: add `/journal` → `JournalIndex`, `/journal/:slug` →
  `JournalArticle`. Unknown slug → `<Navigate to="/journal" replace />`.
- Existing `ScrollManager` handles scroll restoration; no changes needed.
- Home `Journal` section: the three cards become `<Link>`s to their articles;
  add an "All entries" link to `/journal`.
- Navbar: journal anchor becomes a router link to `/journal`.
- Per-page `document.title`: `{title} — Atelier Mono Journal` (and a title for
  the index).

## Typography

**Revised 2026-07-16 (user direction): no new fonts — stay within the
existing design system.** Inter only, reusing the site's established type
patterns: display titles at `font-weight: 300` with tight letter-spacing
(as `.detail-title`), small-caps 11px/500 uppercase meta (as `.note-head`),
body prose at 15.5px/1.75 (as `.detail-narrative p`), large quiet quotes
(as `.voice-quote`). Drop caps and pull quotes are set in Inter Light.

## Archive index (`/journal`) — "the ledger"

- Header: sheet label (`N° — Journal`), oversized heading "Field notes.",
  short lede, entry count in small caps ("6 entries, 2025 – 2026").
- **Theme filter chips**: All / Drawing / Light / Site / Material (derived
  from data). Filtering animates rows with Motion layout animations.
- **Ledger rows** grouped by year, each group marked with a large ghosted
  year numeral that drifts subtly on scroll. Each row: index number + month
  (small caps) · title (Fraunces, generous size) · theme + read time
  (right-aligned) · arrow. Hairline rules between rows.
- **Hover preview** (desktop, pointer devices only): a floating image preview
  fades in and follows the cursor, slightly rotated like a photo on a desk.
  Touch devices show a small inline thumbnail per row instead.
- Rows stagger in on first view using the site's existing ease
  `[0.16, 1, 0.3, 1]` and reveal distances.
- Mobile: stacked rows (thumb, date/theme, title, read time); chips scroll
  horizontally.

## Article page (`/journal/:slug`) — "the annotated page"

- **Reading progress:** fixed 2px ink hairline at viewport top filling with
  scroll (`useScroll` + `scaleX`), plus a "~N min left" countdown near the
  header. Both hidden under `prefers-reduced-motion`.
- **Header:** kicker (theme · date · read time, small caps + dot marker),
  Fraunces display title, serif deck, hero image with the project pages'
  slow scale-settle reveal.
- **Body:** desktop two-column grid — narrow margin rail (left) + ~65ch prose
  measure (right). Block rendering:
  - Paragraphs in Fraunces; first paragraph gets a two-line drop cap.
  - Margin notes: small-caps label + text in the rail, top-aligned with the
    annotated block, hairline tick connecting them. Inline indented asides
    on mobile.
  - Pull quotes: break into the rail's space, large Fraunces italic, heavy
    top rule.
  - Figures: wider than the prose measure; numbered print captions
    ("Fig. 2 — …") set in the margin rail beside them.
  - Section breaks: numbered rule echoing the site's `N°` labels.
  - Blocks reveal `whileInView` with the existing ease.
- **End flow:** hairline · "Filed under {theme} · {date}" · prev/next entry
  nav structurally identical to the project detail nav
  (Previous / All entries / Next).

## Files

- New: `src/data/journal.js`, `src/pages/JournalIndex.jsx`,
  `src/pages/JournalArticle.jsx`
- Modified: `src/App.jsx`, `src/sections/Journal.jsx`,
  `src/sections/Navbar.jsx`, `src/index.css`

## Error handling

- Unknown slug redirects to `/journal`.
- Filter state producing zero rows can't occur (chips derived from data).
- Cursor-follow preview gated behind `(hover: hover) and (pointer: fine)`.

## Testing / verification

- `npm run build` passes.
- Drive the real flows in a browser: home → journal section card → article,
  article → next/prev → archive, archive filters, hover preview, progress
  line, mobile layout at a narrow viewport, document titles.
