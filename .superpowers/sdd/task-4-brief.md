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

