import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const AWARDS = [
  { year: '2026', award: 'Architecture Firm of the Year', body: 'Dezeen Awards', project: 'Practice-wide' },
  { year: '2025', award: 'House of the Year, Shortlist', body: 'RIBA International', project: 'Courtyard House' },
  { year: '2025', award: 'Best Sacred Space', body: 'ArchDaily Building of the Year', project: 'Chapel of a Single Light' },
  { year: '2024', award: 'Cultural Building Award', body: 'Mies Crown Hall Americas', project: 'Stillwater Pavilion' },
  { year: '2024', award: 'International Fellowship', body: 'RIBA', project: 'Practice-wide' },
  { year: '2023', award: 'Residential Prize, Winner', body: 'FAD Awards', project: 'Terraced Residence' },
]

function AwardRow({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.li
      ref={ref}
      className="award-row"
      initial={{ y: 16, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
    >
      <span className="award-year">{item.year}</span>
      <span className="award-name">
        {item.award}
        <ArrowUpRight className="award-arrow" size={14} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="award-body">{item.body}</span>
      <span className="award-project">{item.project}</span>
    </motion.li>
  )
}

export default function Recognition() {
  return (
    <section className="section recognition" id="recognition">
      <div className="sheet-label">
        <span>N° 06</span>
        <span>Recognition</span>
      </div>
      <div className="recognition-head">
        <h2 className="section-heading">Noticed, quietly.</h2>
      </div>
      <ul className="award-list">
        {AWARDS.map((a, i) => (
          <AwardRow key={`${a.year}-${a.award}`} item={a} index={i} />
        ))}
      </ul>
    </section>
  )
}
