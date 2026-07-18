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

