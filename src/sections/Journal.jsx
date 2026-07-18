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
