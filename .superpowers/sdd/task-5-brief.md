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

