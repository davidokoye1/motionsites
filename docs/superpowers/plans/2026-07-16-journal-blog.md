# Atelier Mono Journal (Blog) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the static home-page Journal teaser into a functional blog: an archive-ledger index at `/journal` and art-directed article pages at `/journal/:slug`, per the approved spec at `docs/superpowers/specs/2026-07-16-journal-blog-design.md`.

**Architecture:** A JS data module (`src/data/journal.js`) holds six articles as typed content blocks (`p`, `pull`, `figure`, `note`, `break`). Two new routed pages render it: `JournalIndex` (year-grouped ledger with theme filters and a cursor-following hover preview) and `JournalArticle` (reading-progress line, drop cap, margin rail, pull quotes, prev/next flow). Mirrors the existing `projects.js` + `/projects/:slug` pattern.

**Tech Stack:** React 19, Vite 7, `motion/react` (Motion), `react-router-dom` 7, `lucide-react`. No new npm dependencies, no new fonts.

## Global Constraints

- **No test framework exists** in this project (no vitest/jest). Verification = `npm run build` must pass with zero errors, plus browser verification steps given per task. Do NOT add a test framework.
- **Not a git repository.** All commit steps are intentionally omitted. Do NOT run `git init`.
- Follow existing code conventions exactly: `.jsx` files, no semicolon-free style changes, `const EASE = [0.16, 1, 0.3, 1]` at module top, CSS in the single `src/index.css` file appended in labeled `/* ---------- Name ---------- */` sections, mobile-first CSS with `@media (min-width: 768px)` and `(min-width: 1024px)` overrides added inside the existing media-query blocks or as new blocks at the end.
- Palette tokens only: `--paper`, `--paper-dim`, `--ink`, `--ink-55`, `--ink-70`, `--line`, `--line-strong`. No new colors.
- **Typography is Inter only — do NOT add any font.** (User direction 2026-07-16: stay within the existing design system.) Reuse the site's established type patterns verbatim: display titles `font-weight: 300` with tight negative letter-spacing (as `.detail-title`), meta text `11px / 500 / uppercase / letter-spacing 0.1em` (as `.note-head`), body prose `15.5px / 1.75` (as `.detail-narrative p`), large quotes `font-weight: 300` with `clamp()` sizing (as `.voice-quote p`).
- All images are existing assets in `src/assets/` — do not add image files.
- Run all commands from `/home/okoye/motionsites`.

---

### Task 1: REMOVED

**Removed 2026-07-16 by user direction:** the plan originally added the
Fraunces font here. The user requires the existing design system only (Inter,
existing tokens, existing type patterns). No work in this task — `index.html`
and `:root` are untouched. Task numbering below is preserved.

---

### Task 2: Journal data module

**Files:**
- Create: `src/data/journal.js`

**Interfaces:**
- Produces (consumed by Tasks 3, 4, 5):
  - `export const ENTRIES` — array of entry objects, **sorted newest-first by `iso`**, shape:
    `{ slug, title, deck, date, iso, year, theme, readTime, minutes, img, alt, blocks }`
    - `readTime` is a display string like `'6 min read'`; `minutes` is the number (used by the countdown).
    - `blocks` items: `{ type: 'p', text }` | `{ type: 'pull', text }` | `{ type: 'figure', img, alt, caption }` | `{ type: 'note', label, text }` | `{ type: 'break', label }`
  - `export function getEntry(slug)` — returns the entry or `undefined`.
  - `export function adjacentEntries(slug)` — returns `{ prev, next }` (wrapping, same semantics as `adjacentProjects` in `src/data/projects.js`).
  - `export const THEMES` — `['All', ...unique themes in ENTRIES order]`.

- [ ] **Step 1: Create `src/data/journal.js` with the full content below**

```js
import journalDrawing from '../assets/journal-drawing.png'
import journalLight from '../assets/journal-light.png'
import journalSite from '../assets/journal-site.png'
import matConcrete from '../assets/mat-concrete.png'
import matGlass from '../assets/mat-glass.png'
import matStone from '../assets/mat-stone.png'
import matTimber from '../assets/mat-timber.png'
import detailCourtyard from '../assets/detail-courtyard.png'
import detailChapel from '../assets/detail-chapel.png'
import detailPavilion from '../assets/detail-pavilion.png'
import detailHillside from '../assets/detail-hillside.png'

export const ENTRIES = [
  {
    slug: 'why-we-still-draw-by-hand-first',
    title: 'Why we still draw by hand first',
    deck: 'The pencil is slower than the mouse, and that is the point.',
    date: 'June 2026',
    iso: '2026-06-12',
    year: '2026',
    theme: 'Drawing',
    readTime: '6 min read',
    minutes: 6,
    img: journalDrawing,
    alt: 'Hand-drawn floor plan on tracing paper under warm lamp light',
    blocks: [
      {
        type: 'p',
        text: 'Every project in this studio begins the same way: a roll of tracing paper, a soft pencil, and a rule that nobody is allowed to open a laptop. Clients sometimes find this quaint, as if we kept a horse in the car park. But the rule is not nostalgia. It is quality control.',
      },
      {
        type: 'note',
        label: 'Studio rule N° 3',
        text: 'No CAD before the third client meeting. The computer joins the project only after the section is settled by hand.',
      },
      {
        type: 'p',
        text: 'A drawing made by hand cannot be copied and pasted. Every wall you draw, you have chosen to draw, at that thickness, in that place. The software will happily mirror a bathroom or array a window without asking whether the light there deserves it. The pencil asks every time.',
      },
      {
        type: 'pull',
        text: 'Speed hides decisions. A hand drawing exposes every one of them.',
      },
      { type: 'break', label: 'II — What the hand knows' },
      {
        type: 'p',
        text: 'There is also the matter of error. On tracing paper, a mistake stays visible under the next sheet; the project carries its own history in graphite. We have often gone back four or five layers to recover an idea that was abandoned too early — the wall that was right the first time.',
      },
      {
        type: 'figure',
        img: detailCourtyard,
        alt: 'Built-in concrete bench beside a glass wall with olive tree shadows',
        caption: 'Courtyard House — the bench that survived from the first sketch to the finished building, unchanged.',
      },
      {
        type: 'p',
        text: 'When the drawings finally move to the computer, they move as decisions, not as searches. The model is a fair copy, in the old sense: the thinking has already happened. We think that is why our built work looks like our sketches — because the sketch was never a suggestion. It was the building, early.',
      },
    ],
  },
  {
    slug: 'a-year-of-measuring-light-in-one-room',
    title: 'A year of measuring light in one room',
    deck: 'We photographed the same wall at noon, every day, for a year.',
    date: 'March 2026',
    iso: '2026-03-04',
    year: '2026',
    theme: 'Light',
    readTime: '4 min read',
    minutes: 4,
    img: journalLight,
    alt: 'Sunlight falling through a narrow concrete aperture onto a bare wall',
    blocks: [
      {
        type: 'p',
        text: 'In the corner of the studio there is a room we do not use for anything. It has one aperture, four hundred millimetres wide, facing south-southeast. On the first working day of last year we set a camera on a tripod, pointed it at the west wall, and photographed it at noon. Then we did it again, every day, three hundred and eleven times.',
      },
      {
        type: 'note',
        label: 'The archive',
        text: '311 photographs, one missed week in August (nobody will admit to it), printed at postcard size and pinned in a grid.',
      },
      {
        type: 'p',
        text: 'The archive is the least efficient daylight study ever conducted. Software would have given us the same geometry in an afternoon. What the software would not have given us is the weather — the eleven days in November when the patch of sun never arrived at all, and the one afternoon in June when it landed on the floor junction and made the room feel twice its height.',
      },
      {
        type: 'pull',
        text: 'A daylight simulation tells you where the sun will be. It does not tell you whether you will care.',
      },
      { type: 'break', label: 'II — What we changed' },
      {
        type: 'figure',
        img: matGlass,
        alt: 'Detail of glass panel edge catching soft daylight',
        caption: 'Glass returns at the aperture — resized twice after the winter photographs.',
      },
      {
        type: 'p',
        text: 'Two live projects changed because of that wall. A chapel aperture grew narrower and taller; a kitchen lost a window it did not need. Patience turned out to be a design tool with a unit of measurement: one year, one wall, one photograph a day.',
      },
    ],
  },
  {
    slug: 'what-concrete-remembers',
    title: 'What concrete remembers',
    deck: 'Formwork is a mould for memory. Cast carefully, the building keeps a record of how it was made.',
    date: 'January 2026',
    iso: '2026-01-21',
    year: '2026',
    theme: 'Material',
    readTime: '5 min read',
    minutes: 5,
    img: matConcrete,
    alt: 'Close view of board-marked concrete with visible timber grain',
    blocks: [
      {
        type: 'p',
        text: 'Concrete has a reputation for being mute — the material of car parks and motorway bridges, poured by the tonne and forgotten. We think of it differently. Concrete is the only material on a building site that is liquid on Monday and permanent by Friday, and in between it will remember anything you press against it.',
      },
      {
        type: 'p',
        text: 'At the Courtyard House we cast the walls against rough-sawn boards from a barn that had stood on the site for ninety years. The barn is gone; its grain is not. Every knot and saw mark is printed at full scale into the walls that replaced it. Visitors run their hands along it before they know why.',
      },
      {
        type: 'note',
        label: 'Site note, day 40',
        text: 'The foreman rejected the first delivery of boards for being too clean. He was right.',
      },
      {
        type: 'pull',
        text: 'The imprint is the only ornament the house has. The afternoon sun does the rest.',
      },
      { type: 'break', label: 'II — Casting as archive' },
      {
        type: 'figure',
        img: detailChapel,
        alt: 'Concrete chapel interior with a single blade of light on the wall',
        caption: 'Chapel of a Single Light — the pour was scheduled around the weather, not the calendar.',
      },
      {
        type: 'p',
        text: 'This is why we write the formwork drawings ourselves rather than leaving them to the contractor. Board widths, tie positions, day joints — each one is a line the building will wear forever. A concrete wall is a photograph of its own construction, exposed once, developed over a century.',
      },
    ],
  },
  {
    slug: 'the-first-site-visit-is-the-whole-project',
    title: 'The first site visit is the whole project',
    deck: 'Everything a building will become is already present in the first hour on site.',
    date: 'November 2025',
    iso: '2025-11-18',
    year: '2025',
    theme: 'Site',
    readTime: '8 min read',
    minutes: 8,
    img: journalSite,
    alt: 'Small white concept model held against a blurred grassland site',
    blocks: [
      {
        type: 'p',
        text: 'There is a superstition in this studio that we defend as if it were a method: the first site visit decides the project. Not the survey, not the brief, not the planning meeting — the first hour of standing in the weather on the actual ground. Everything after that is transcription.',
      },
      {
        type: 'note',
        label: 'Field kit',
        text: 'A6 notebook, 2B pencil, compass, and a folding stool. Phones stay in the car for the first hour.',
      },
      {
        type: 'p',
        text: 'We arrive early and we arrive quiet. The rule of the first hour is that nobody proposes anything. You may notice — the wind arriving over the ridge, the neighbour’s roofline, where the grass is worn by walking, which way the sheep face — but you may not solve. Solving too early is how sites get buildings that could be anywhere.',
      },
      {
        type: 'pull',
        text: 'Nobody proposes anything for one hour. Noticing first, solving later.',
      },
      { type: 'break', label: 'II — The hillside' },
      {
        type: 'p',
        text: 'At the Hillside Longhouse the whole parti arrived in minute forty. The client had walked us to the "view side" of the plot, the one the estate agent photographed. But the worn path in the grass — the one the family actually used — ran along the contour, at an angle to the view, toward a gap in the stone wall. The house is that path, roofed.',
      },
      {
        type: 'figure',
        img: detailHillside,
        alt: 'Long low timber house following the slope of a hillside at dusk',
        caption: 'Hillside Longhouse — the plan follows the family’s desire line, not the postcard view.',
      },
      {
        type: 'p',
        text: 'When a scheme goes wrong later — and schemes always wobble around planning — we do not reach for references. We reach for the site notebook. The answer is nearly always on the first three pages, written down before we knew it was the answer.',
      },
      {
        type: 'p',
        text: 'The lesson took us ten years to learn and fits in one sentence: a building is a site’s opinion, held long enough to be made of stone.',
      },
    ],
  },
  {
    slug: 'in-praise-of-the-working-model',
    title: 'In praise of the working model',
    deck: 'Cardboard tells the truth faster than any render.',
    date: 'August 2025',
    iso: '2025-08-07',
    year: '2025',
    theme: 'Craft',
    readTime: '5 min read',
    minutes: 5,
    img: detailPavilion,
    alt: 'Timber pavilion interior with rhythmic exposed roof structure',
    blocks: [
      {
        type: 'p',
        text: 'Renders are for convincing. Models are for finding out. The difference matters, because a practice that only produces convincing images will eventually convince itself. Our models are grey card and glue, cut on the same table where we eat lunch, and they are never photographed for the website. They are instruments, not products.',
      },
      {
        type: 'note',
        label: 'Scale policy',
        text: '1:200 for the site, 1:50 for the rooms, 1:5 for the one junction the project will be remembered by.',
      },
      {
        type: 'p',
        text: 'A model at 1:50 has a way of being honest that a screen never manages. You cannot dolly a cardboard model to its best angle; it sits on the table in ordinary daylight, seen from above like no building ever is, and still it must feel right. If the roof rhythm works on grey card, it will work in timber.',
      },
      {
        type: 'pull',
        text: 'You cannot dolly a cardboard model to its best angle. That is its entire value.',
      },
      { type: 'break', label: 'II — The pavilion test' },
      {
        type: 'figure',
        img: matTimber,
        alt: 'Stacked timber battens showing end grain and surface texture',
        caption: 'Batten spacing for the pavilion roof — settled with a knife and 3mm card, not a parameter.',
      },
      {
        type: 'p',
        text: 'For the Meadow Pavilion we built eleven roof studies in a week. Ten of them died on the table, which is exactly where projects should die — cheaply, early, and in company. The eleventh is the one you can stand under today. It cost four euros in card and saved a structure we would have regretted for fifty years.',
      },
    ],
  },
  {
    slug: 'buildings-that-learn-to-age',
    title: 'Buildings that learn to age',
    deck: 'We design for the photograph taken in thirty years, not the one taken at handover.',
    date: 'May 2025',
    iso: '2025-05-14',
    year: '2025',
    theme: 'Material',
    readTime: '7 min read',
    minutes: 7,
    img: matStone,
    alt: 'Rough stone wall surface with varied weathered texture',
    blocks: [
      {
        type: 'p',
        text: 'Architecture has a dirty secret: most buildings look their best on the day they are handed over, and spend the next fifty years apologising. The sealant yellows, the render streaks, the crisp arris chips. We try to work the other way around — to choose materials that are merely good when new and become better as the weather gets at them.',
      },
      {
        type: 'p',
        text: 'Stone understands this contract best. The wall in the photograph above was unremarkable when it was laid; two decades of rain have given it a surface no specification could describe. Copper, oak, lime render, board-marked concrete — the whole palette of this studio is really one material: time, in different speeds.',
      },
      {
        type: 'note',
        label: 'Specification clause',
        text: 'We write expected weathering into the material schedule, wall by wall, so the client knows what the building is becoming.',
      },
      {
        type: 'pull',
        text: 'The palette of this studio is one material: time, at different speeds.',
      },
      { type: 'break', label: 'II — Detailing for rain' },
      {
        type: 'p',
        text: 'Ageing well is not luck; it is drainage. Every streak on a façade is a drawing of where the water went, so we draw the water first. Drips, throats, projections — the unglamorous millimetres that decide whether rain washes a wall evenly or writes graffiti on it. A parapet detail is a promise about the year 2055.',
      },
      {
        type: 'figure',
        img: detailCourtyard,
        alt: 'Built-in concrete bench beside a glass wall with olive tree shadows',
        caption: 'Courtyard House — the concrete was designed to darken unevenly under the olive tree, and has.',
      },
      {
        type: 'p',
        text: 'When clients ask for a maintenance-free building we tell them, gently, that there is no such thing — there are only buildings that wear their maintenance as decay or as character. The best compliment our work receives is not "it looks new". It is "it looks like it has always been there". That look is designed.',
      },
    ],
  },
]

export const THEMES = ['All', ...new Set(ENTRIES.map((e) => e.theme))]

export function getEntry(slug) {
  return ENTRIES.find((e) => e.slug === slug)
}

export function adjacentEntries(slug) {
  const i = ENTRIES.findIndex((e) => e.slug === slug)
  const prev = ENTRIES[(i - 1 + ENTRIES.length) % ENTRIES.length]
  const next = ENTRIES[(i + 1) % ENTRIES.length]
  return { prev, next }
}
```

- [ ] **Step 2: Verify the module's syntax**

The module is not imported by the app yet, so Vite won't parse it during a build. Check its syntax directly with esbuild (bundled with Vite):

Run: `npx esbuild src/data/journal.js --loader:.png=empty --bundle --outfile=/dev/null`
Expected: no output, exit code 0. (Full integration verification happens in Task 3 Step 4 when the module is first imported.)

---

### Task 3: Journal index page (the ledger) + route

**Files:**
- Create: `src/pages/JournalIndex.jsx`
- Modify: `src/App.jsx` (add route)
- Modify: `src/index.css` (append `/* ---------- Journal index ---------- */` section)

**Interfaces:**
- Consumes: `ENTRIES`, `THEMES` from `src/data/journal.js` (Task 2).
- Produces: route `/journal` rendering `<JournalIndex />`. CSS classes `journal-page`, `ledger-*`, `chip` used only here.

- [ ] **Step 1: Create `src/pages/JournalIndex.jsx`**

```jsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { ENTRIES, THEMES } from '../data/journal.js'

const EASE = [0.16, 1, 0.3, 1]

const canHover =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

function monthOf(entry) {
  return entry.date.split(' ')[0]
}

function LedgerRow({ entry, number, onHover, onLeave, onMove }) {
  return (
    <motion.li
      layout
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -12, opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      onMouseEnter={() => onHover(entry)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      <Link className="ledger-row" to={`/journal/${entry.slug}`}>
        <span className="ledger-no">{String(number).padStart(2, '0')}</span>
        <span className="ledger-month">{monthOf(entry)}</span>
        <span className="ledger-thumb" aria-hidden="true">
          <img src={entry.img} alt="" loading="lazy" />
        </span>
        <span className="ledger-title">{entry.title}</span>
        <span className="ledger-meta">
          <span className="ledger-theme">{entry.theme}</span>
          <span className="ledger-time">{entry.readTime}</span>
        </span>
        <ArrowUpRight className="ledger-arrow" size={16} strokeWidth={1.75} aria-hidden="true" />
      </Link>
    </motion.li>
  )
}

function YearGroup({ year, entries, startNumber, onHover, onLeave, onMove }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section className="ledger-group" ref={ref}>
      <motion.span className="ledger-year" style={{ y }} aria-hidden="true">
        {year}
      </motion.span>
      <h2 className="ledger-year-label">{year}</h2>
      <ul className="ledger-list">
        <AnimatePresence mode="popLayout">
          {entries.map((entry, i) => (
            <LedgerRow
              key={entry.slug}
              entry={entry}
              number={startNumber + i}
              onHover={onHover}
              onLeave={onLeave}
              onMove={onMove}
            />
          ))}
        </AnimatePresence>
      </ul>
    </section>
  )
}

export default function JournalIndex() {
  const [theme, setTheme] = useState('All')
  const [preview, setPreview] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    document.title = 'Journal — Atelier Mono'
  }, [])

  const filtered = useMemo(
    () => (theme === 'All' ? ENTRIES : ENTRIES.filter((e) => e.theme === theme)),
    [theme]
  )

  const groups = useMemo(() => {
    const byYear = new Map()
    for (const e of filtered) {
      if (!byYear.has(e.year)) byYear.set(e.year, [])
      byYear.get(e.year).push(e)
    }
    let n = 1
    return [...byYear.entries()].map(([year, entries]) => {
      const g = { year, entries, startNumber: n }
      n += entries.length
      return g
    })
  }, [filtered])

  const years = ENTRIES.map((e) => e.year)
  const range = `${years[years.length - 1]} – ${years[0]}`

  const onHover = (entry) => canHover && setPreview(entry)
  const onLeave = () => setPreview(null)
  const onMove = (e) => canHover && setPos({ x: e.clientX, y: e.clientY })

  return (
    <main className="journal-page">
      <header className="journal-page-head">
        <div className="sheet-label">
          <span>N°</span>
          <span>Journal</span>
        </div>
        <motion.h1
          className="journal-page-title"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Field notes.
        </motion.h1>
        <motion.p
          className="section-lede"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
        >
          Writing from the practice — on drawing, light, and the slow parts of
          building that never make the photographs.
        </motion.p>
        <motion.div
          className="journal-page-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
        >
          <span className="journal-count">
            {ENTRIES.length} entries, {range}
          </span>
          <div className="chip-row" role="group" aria-label="Filter by theme">
            {THEMES.map((t) => (
              <button
                key={t}
                type="button"
                className={`chip${theme === t ? ' chip-active' : ''}`}
                onClick={() => setTheme(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>
      </header>

      {groups.map((g) => (
        <YearGroup
          key={g.year}
          year={g.year}
          entries={g.entries}
          startNumber={g.startNumber}
          onHover={onHover}
          onLeave={onLeave}
          onMove={onMove}
        />
      ))}

      <AnimatePresence>
        {preview && (
          <motion.div
            className="ledger-preview"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: EASE }}
            aria-hidden="true"
          >
            <img src={preview.img} alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
```

- [ ] **Step 2: Add the route in `src/App.jsx`**

Add import after the `ProjectDetail` import:

```jsx
import JournalIndex from './pages/JournalIndex.jsx'
```

Add route inside `<Routes>` after the projects route:

```jsx
        <Route path="/journal" element={<JournalIndex />} />
```

- [ ] **Step 3: Append the CSS section to `src/index.css`**

Append at the end of the file (before nothing — true end), then add the desktop overrides shown afterwards:

```css
/* ---------- Journal index ---------- */

.journal-page {
  padding: 140px 16px 96px;
}

.journal-page-head {
  margin-bottom: 64px;
}

.journal-page-title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 20px 0 16px;
}

.journal-page-meta {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 28px;
}

.journal-count {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-55);
}

.chip-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.chip {
  flex-shrink: 0;
  border: 1px solid var(--line);
  background: transparent;
  border-radius: 999px;
  padding: 7px 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-70);
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.chip:hover {
  border-color: var(--line-strong);
  color: var(--ink);
}

.chip-active {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}

.chip-active:hover {
  color: var(--paper);
}

.ledger-group {
  position: relative;
  padding-top: 32px;
  margin-bottom: 56px;
}

.ledger-year {
  position: absolute;
  top: -10px;
  right: 0;
  font-size: clamp(5rem, 16vw, 11rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px var(--line);
  pointer-events: none;
  user-select: none;
}

.ledger-year-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-55);
  margin-bottom: 20px;
}

.ledger-list {
  list-style: none;
  position: relative;
  z-index: 1;
}

.ledger-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'thumb thumb thumb'
    'no month meta'
    'title title arrow';
  align-items: baseline;
  gap: 6px 14px;
  padding: 18px 0 22px;
  border-top: 1px solid var(--line);
  transition: border-color 0.3s ease;
}

.ledger-row:hover {
  border-top-color: var(--line-strong);
}

.ledger-no,
.ledger-month {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-55);
}

.ledger-thumb {
  grid-area: thumb;
  display: block;
  width: 96px;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 3px;
  margin-bottom: 8px;
}

.ledger-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ledger-title {
  grid-area: title;
  font-size: clamp(1.3rem, 4vw, 2rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--ink);
  transition: opacity 0.3s ease;
}

.ledger-meta {
  grid-area: meta;
  display: inline-flex;
  gap: 16px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-55);
}

.ledger-arrow {
  grid-area: arrow;
  align-self: center;
  justify-self: end;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ledger-row:hover .ledger-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.ledger-preview {
  position: fixed;
  z-index: 40;
  width: 260px;
  aspect-ratio: 3 / 2;
  margin: 24px 0 0 24px;
  border-radius: 4px;
  overflow: hidden;
  pointer-events: none;
  box-shadow: 0 24px 48px rgba(26, 26, 24, 0.18);
}

.ledger-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 768px) {
  .journal-page {
    padding: 180px 32px 128px;
  }

  .journal-page-meta {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .ledger-thumb {
    display: none;
  }

  .ledger-row {
    grid-template-columns: 48px 90px 1fr auto 24px;
    grid-template-areas: 'no month title meta arrow';
    align-items: baseline;
    gap: 24px;
    padding: 26px 0;
  }

  .ledger-row:hover .ledger-title {
    opacity: 0.6;
  }
}

@media (max-width: 767px) {
  .ledger-preview {
    display: none;
  }
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: `✓ built in ...`, no errors.

- [ ] **Step 5: Browser-verify the index**

Run: `npm run dev` (background), open `http://localhost:5173/journal`.
Expected: header "Field notes.", count "6 entries, 2025 – 2026", chips All/Drawing/Light/Material/Site/Craft; two year groups (2026 with rows 01–03, 2025 with rows 04–06) with ghost year numerals; clicking a chip filters rows with a layout animation (e.g. "Material" shows rows for "What concrete remembers" and "Buildings that learn to age" only); hovering a row on desktop shows the rotated floating image following the cursor; each row links to `/journal/<slug>` (article page 404s to `/journal` until Task 4 — verify the URL changes only). At a narrow viewport (<768px), rows show inline thumbnails and no cursor preview.

---

### Task 4: Article page (the annotated page) + route

**Files:**
- Create: `src/pages/JournalArticle.jsx`
- Modify: `src/App.jsx` (add route)
- Modify: `src/index.css` (append `/* ---------- Journal article ---------- */` section)

**Interfaces:**
- Consumes: `getEntry`, `adjacentEntries` from `src/data/journal.js` (Task 2).
- Produces: route `/journal/:slug` rendering `<JournalArticle />`; unknown slug redirects to `/journal`.

- [ ] **Step 1: Create `src/pages/JournalArticle.jsx`**

Block-rendering rule: `note` blocks attach to the **following** block — they render inside that block's `.article-row` margin rail. Figures place their numbered caption in the rail. The first `p` block gets the drop cap.

```jsx
import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { getEntry, adjacentEntries } from '../data/journal.js'

const EASE = [0.16, 1, 0.3, 1]

const reveal = {
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: EASE },
}

function Row({ rail, children, wide = false }) {
  return (
    <motion.div className={`article-row${wide ? ' article-row-wide' : ''}`} {...reveal}>
      <aside className="article-rail">{rail}</aside>
      <div className="article-main">{children}</div>
    </motion.div>
  )
}

function MarginNote({ note }) {
  if (!note) return null
  return (
    <div className="margin-note">
      <span className="margin-note-label">{note.label}</span>
      <span className="margin-note-text">{note.text}</span>
    </div>
  )
}

function ArticleBody({ entry }) {
  const rows = []
  let pendingNote = null
  let figureCount = 0
  let firstP = true

  entry.blocks.forEach((block, i) => {
    if (block.type === 'note') {
      pendingNote = block
      return
    }
    const note = pendingNote
    pendingNote = null

    if (block.type === 'p') {
      const dropcap = firstP
      firstP = false
      rows.push(
        <Row key={i} rail={<MarginNote note={note} />}>
          <p className={`article-p${dropcap ? ' has-dropcap' : ''}`}>{block.text}</p>
        </Row>
      )
    } else if (block.type === 'pull') {
      rows.push(
        <Row key={i} rail={<MarginNote note={note} />} wide>
          <blockquote className="article-pull">{block.text}</blockquote>
        </Row>
      )
    } else if (block.type === 'figure') {
      figureCount += 1
      rows.push(
        <Row
          key={i}
          wide
          rail={
            <>
              <MarginNote note={note} />
              <span className="figure-caption">
                Fig. {figureCount} — {block.caption}
              </span>
            </>
          }
        >
          <figure className="article-figure">
            <img src={block.img} alt={block.alt} loading="lazy" />
          </figure>
        </Row>
      )
    } else if (block.type === 'break') {
      rows.push(
        <Row key={i} rail={<MarginNote note={note} />}>
          <div className="article-break">
            <span>{block.label}</span>
          </div>
        </Row>
      )
    }
  })

  return <div className="article-body">{rows}</div>
}

export default function JournalArticle() {
  const { slug } = useParams()
  const entry = getEntry(slug)
  const { scrollYProgress } = useScroll()
  const [minsLeft, setMinsLeft] = useState(entry ? entry.minutes : 0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (entry) setMinsLeft(Math.max(0, Math.ceil((1 - p) * entry.minutes)))
  })

  useEffect(() => {
    if (entry) document.title = `${entry.title} — Atelier Mono Journal`
  }, [entry])

  if (!entry) return <Navigate to="/journal" replace />

  const { prev, next } = adjacentEntries(slug)

  return (
    <article className="article" key={slug}>
      <motion.div
        className="read-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      <header className="article-head">
        <motion.p
          className="detail-kicker"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="dot" />
          {entry.theme} · {entry.date} · {entry.readTime}
        </motion.p>
        <motion.h1
          className="article-title"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          {entry.title}
        </motion.h1>
        <motion.p
          className="article-deck"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          {entry.deck}
        </motion.p>
        <motion.span
          className="read-remaining"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          ~{minsLeft} min left
        </motion.span>
      </header>

      <motion.figure
        className="article-hero"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <img src={entry.img} alt={entry.alt} />
      </motion.figure>

      <ArticleBody entry={entry} />

      <footer className="article-foot">
        <span className="article-filed">
          Filed under {entry.theme} · {entry.date}
        </span>
      </footer>

      <nav className="detail-nav" aria-label="More entries">
        <Link className="detail-nav-link" to={`/journal/${prev.slug}`}>
          <span className="detail-nav-dir">
            <ArrowLeft size={14} strokeWidth={1.75} /> Previous
          </span>
          <span className="detail-nav-name">{prev.title}</span>
        </Link>
        <Link className="detail-nav-all" to="/journal">
          All entries <ArrowUpRight size={14} strokeWidth={1.75} />
        </Link>
        <Link className="detail-nav-link detail-nav-next" to={`/journal/${next.slug}`}>
          <span className="detail-nav-dir">
            Next <ArrowRight size={14} strokeWidth={1.75} />
          </span>
          <span className="detail-nav-name">{next.title}</span>
        </Link>
      </nav>
    </article>
  )
}
```

Note: the prev/next `nav` reuses the existing `detail-nav*` CSS classes from the project detail page verbatim — do not duplicate those styles.

- [ ] **Step 2: Add the route in `src/App.jsx`**

Add import after the `JournalIndex` import:

```jsx
import JournalArticle from './pages/JournalArticle.jsx'
```

Add route inside `<Routes>` after the `/journal` route (order matters — index route first is fine since paths are exact in v7):

```jsx
        <Route path="/journal/:slug" element={<JournalArticle />} />
```

- [ ] **Step 3: Append the CSS section to `src/index.css`**

```css
/* ---------- Journal article ---------- */

.read-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--ink);
  transform-origin: 0 50%;
  z-index: 60;
}

.article {
  padding: 150px 16px 0;
}

.article-head {
  position: relative;
  max-width: 880px;
  margin: 0 auto 48px;
}

.article-title {
  font-size: clamp(2.25rem, 7vw, 4.5rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 18px 0 20px;
}

.article-deck {
  font-size: clamp(1.1rem, 2.6vw, 1.45rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.4;
  color: var(--ink-70);
  max-width: 34em;
}

.read-remaining {
  display: inline-block;
  margin-top: 22px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-55);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 6px 14px;
}

.article-hero {
  max-width: 1080px;
  margin: 0 auto 72px;
  overflow: hidden;
  border-radius: 4px;
}

.article-hero img {
  width: 100%;
  display: block;
}

.article-body {
  max-width: 880px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.article-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-rail:empty {
  display: none;
}

.article-p {
  font-size: 15.5px;
  line-height: 1.75;
  color: rgba(26, 26, 24, 0.85);
  max-width: 65ch;
}

.has-dropcap::first-letter {
  font-weight: 300;
  font-size: 3.6em;
  line-height: 0.85;
  float: left;
  padding: 6px 10px 0 0;
}

.margin-note {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-left: 1px solid var(--line-strong);
  padding-left: 14px;
}

.margin-note-label {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-55);
}

.margin-note-text {
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--ink-70);
}

.article-pull {
  font-size: clamp(1.4rem, 3.4vw, 2rem);
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: -0.02em;
  border-top: 2px solid var(--ink);
  padding-top: 20px;
  max-width: 26em;
}

.article-figure {
  overflow: hidden;
  border-radius: 4px;
}

.article-figure img {
  width: 100%;
  display: block;
}

.figure-caption {
  display: block;
  font-size: 12px;
  line-height: 1.6;
  color: var(--ink-55);
}

.article-break {
  padding-top: 40px;
  border-top: 1px solid var(--line);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-55);
}

.article-foot {
  max-width: 880px;
  margin: 72px auto 0;
  padding: 24px 0 56px;
  border-top: 1px solid var(--line);
}

.article-filed {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-55);
}

@media (min-width: 768px) {
  .article {
    padding: 190px 32px 0;
  }

  .article-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 40px;
  }

  .article-rail {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 6px;
  }

  .article-rail:empty {
    display: block;
  }

  .article-row-wide .article-main {
    margin-left: -60px;
  }

  .figure-caption {
    border-top: 1px solid var(--line);
    padding-top: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .read-progress,
  .read-remaining {
    display: none;
  }
}
```

Layout note for the implementer: on mobile everything stacks (`.article-row` is a column — rail notes fold inline above their block as indented asides via the `border-left` style). On desktop the 200px rail column holds notes and figure captions; `.article-row-wide` lets pull quotes and figures bleed 60px into the rail's visual space.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: `✓ built in ...`, no errors.

- [ ] **Step 5: Browser-verify the article page**

Open `http://localhost:5173/journal/why-we-still-draw-by-hand-first`.
Expected: 2px ink progress line at the very top filling as you scroll; kicker "Drawing · June 2026 · 6 min read"; light-weight display title matching the project pages' `.detail-title` look; deck line under it; "~6 min left" pill counting down toward 0 while scrolling; first paragraph has a drop cap "E"; the "Studio rule N° 3" margin note sits in the left rail beside its paragraph (desktop) / inline above it (mobile); pull quote with heavy top rule bleeding left; "II — What the hand knows" section break; figure with "Fig. 1 — Courtyard House…" caption in the rail; footer "Filed under Drawing · June 2026"; prev/next nav (Previous → "Buildings that learn to age", Next → "A year of measuring light in one room") and "All entries" back to `/journal`. Also verify `http://localhost:5173/journal/nonexistent` redirects to `/journal`, and the browser tab title reads "Why we still draw by hand first — Atelier Mono Journal".

---

### Task 5: Wire up home Journal section + Navbar

**Files:**
- Modify: `src/sections/Journal.jsx` (cards become links into the blog; add "All entries" link)
- Modify: `src/sections/Navbar.jsx` (menu Journal item routes to `/journal`)

**Interfaces:**
- Consumes: `getEntry` from `src/data/journal.js` (Task 2); routes from Tasks 3–4.

- [ ] **Step 1: Rewrite `src/sections/Journal.jsx`**

Replace the whole file with (the three original cards stay visually identical, but now pull from the data module and link to their articles; the head gains an "All entries" link):

```jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { getEntry } from '../data/journal.js'

const EASE = [0.16, 1, 0.3, 1]

const FEATURED = [
  'why-we-still-draw-by-hand-first',
  'a-year-of-measuring-light-in-one-room',
  'the-first-site-visit-is-the-whole-project',
]

function NoteCard({ entry, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      className="note"
      initial={{ y: 28, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
    >
      <Link className="note-link" to={`/journal/${entry.slug}`} aria-label={`Read: ${entry.title}`}>
        <div className="note-media">
          <img src={entry.img} alt={entry.alt} loading="lazy" />
        </div>
        <div className="note-head">
          <span className="note-date">{entry.date}</span>
          <span className="note-length">{entry.readTime}</span>
        </div>
        <h3 className="note-title">
          {entry.title}
          <ArrowUpRight className="note-arrow" size={15} strokeWidth={1.75} aria-hidden="true" />
        </h3>
        <p className="note-excerpt">{entry.deck}</p>
      </Link>
    </motion.article>
  )
}

export default function Journal() {
  const entries = FEATURED.map(getEntry)

  return (
    <section className="section journal" id="journal">
      <div className="sheet-label">
        <span>N° 07</span>
        <span>Journal</span>
      </div>
      <div className="journal-head">
        <h2 className="section-heading">Field notes.</h2>
        <p className="section-lede">
          Writing from the practice — on drawing, light, and the slow parts of
          building that never make the photographs.
        </p>
        <Link className="journal-all" to="/journal">
          All entries <ArrowUpRight size={14} strokeWidth={1.75} />
        </Link>
      </div>
      <div className="journal-grid">
        {entries.map((entry, i) => (
          <NoteCard key={entry.slug} entry={entry} index={i} />
        ))}
      </div>
    </section>
  )
}
```

Content note: the original card excerpts are replaced by each entry's `deck`. The decks in Task 2 were written to preserve the originals' first sentences, so the home page copy stays on-voice.

- [ ] **Step 2: Add the `.journal-all` style to `src/index.css`**

Append to the existing `/* ---------- Journal ---------- */` section (after `.note-excerpt`):

```css
.journal-all {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-55);
  border-bottom: 1px solid var(--line-strong);
  padding-bottom: 4px;
  transition: color 0.25s ease;
}

.journal-all:hover {
  color: var(--ink);
}
```

- [ ] **Step 3: Point the Navbar menu's Journal item at `/journal`**

In `src/sections/Navbar.jsx`, change the `MENU_LINKS` entry `{ label: 'Journal', hash: 'journal' }` to:

```js
  { label: 'Journal', to: '/journal' },
```

And update the menu link rendering inside `MenuOverlay` — replace the existing `<button ... onClick={() => goTo(link.hash)}>` list-item body with a branch:

```jsx
                {link.to ? (
                  <Link className="menu-link" to={link.to} onClick={onClose}>
                    {link.label}
                  </Link>
                ) : (
                  <button type="button" className="menu-link" onClick={() => goTo(link.hash)}>
                    {link.label}
                  </button>
                )}
```

(`Link` is already imported in Navbar.jsx. The `.menu-link` class currently styles a `button`; verify it renders identically on an `a` — it should, since the global reset strips default anchor styling. If the anchor shows an underline or wrong color, extend the existing `.menu-link` rule's selector rather than adding a new rule.)

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: `✓ built in ...`, no errors.

- [ ] **Step 5: Browser-verify integration**

Open `http://localhost:5173/`.
Expected: Journal section unchanged visually except a new "ALL ENTRIES ↗" link under the lede; the three cards navigate to their articles; the overlay menu's "Journal" item navigates to `/journal` and closes the menu; menu item styling matches the other items.

---

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
