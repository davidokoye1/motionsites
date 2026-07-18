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
            <h2>{block.label}</h2>
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
