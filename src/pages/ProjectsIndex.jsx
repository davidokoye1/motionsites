import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, LayoutGrid, Rows3 } from 'lucide-react'
import { PROJECTS } from '../data/projects.js'

const EASE = [0.16, 1, 0.3, 1]
const KINDS = ['All', ...new Set(PROJECTS.map((p) => p.kind))]
// Layout plates cycle: cinematic full-bleed → split right → offset left.
const VARIANTS = ['plate-a', 'plate-b', 'plate-c']

const canHover =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

function Plate({ project, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const numY = useTransform(scrollYProgress, [0, 1], [56, -56])

  const facts = [
    { label: 'Area', value: project.area },
    { label: 'Materials', value: project.materials },
    { label: 'Status', value: project.status },
  ]

  return (
    <motion.article
      ref={ref}
      layout
      className={`plate ${VARIANTS[index % VARIANTS.length]}`}
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <motion.span className="plate-no" style={{ y: numY }} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <div className="plate-head">
        <span>
          {project.kind} — {project.place}
        </span>
        <span>{project.year}</span>
      </div>

      <Link className="plate-link" to={`/projects/${project.slug}`}>
        <motion.div
          className="plate-media"
          initial={{ clipPath: 'inset(10% 6% 10% 6%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <motion.div className="plate-parallax" style={{ y }}>
            <img src={project.img} alt={project.alt} loading="lazy" />
          </motion.div>
        </motion.div>

        <div className="plate-info">
          <div className="plate-title-block">
            <h2 className="plate-name">{project.name}</h2>
            <p className="plate-intro">{project.intro}</p>
          </div>
          <div className="plate-side">
            <dl className="plate-facts">
              {facts.map((f) => (
                <div className="plate-fact" key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <span className="plate-cta">
              View project
              <span className="plate-cta-circle" aria-hidden="true">
                <ArrowUpRight size={15} strokeWidth={1.75} />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function IndexRow({ project, number, onHover, onLeave, onMove }) {
  return (
    <motion.li
      layout
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -12, opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      <Link className="arow" to={`/projects/${project.slug}`}>
        <span className="arow-no">{String(number).padStart(2, '0')}</span>
        <span className="arow-thumb" aria-hidden="true">
          <img src={project.img} alt="" loading="lazy" />
        </span>
        <span className="arow-name">{project.name}</span>
        <span className="arow-place">{project.place}</span>
        <span className="arow-meta">
          <span>{project.kind}</span>
          <span>{project.area}</span>
          <span>{project.year}</span>
        </span>
        <ArrowUpRight className="arow-arrow" size={16} strokeWidth={1.75} aria-hidden="true" />
      </Link>
    </motion.li>
  )
}

export default function ProjectsIndex() {
  const [kind, setKind] = useState('All')
  const [view, setView] = useState('plates')
  const [preview, setPreview] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    document.title = 'All Works — Atelier Mono'
  }, [])

  const filtered = useMemo(
    () => (kind === 'All' ? PROJECTS : PROJECTS.filter((p) => p.kind === kind)),
    [kind]
  )

  const years = PROJECTS.map((p) => Number(p.year))
  const stats = [
    { label: 'Projects', value: String(PROJECTS.length).padStart(2, '0') },
    {
      label: 'Built area',
      value: `${PROJECTS.reduce((sum, p) => sum + parseInt(p.area, 10), 0).toLocaleString()} m²`,
    },
    {
      label: 'Programmes',
      value: String(new Set(PROJECTS.map((p) => p.kind)).size).padStart(2, '0'),
    },
    { label: 'Years', value: `${Math.min(...years)} – ${Math.max(...years)}` },
  ]

  const onHover = (project) => canHover && setPreview(project)
  const onLeave = () => setPreview(null)
  const onMove = (e) => {
    if (!canHover) return
    const x = Math.min(e.clientX, window.innerWidth - 308)
    const y = Math.min(e.clientY, window.innerHeight - 222)
    setPos({ x, y })
  }

  return (
    <main className="archive">
      <header className="archive-head">
        <div className="sheet-label">
          <span>N° 01–{String(PROJECTS.length).padStart(2, '0')}</span>
          <span>Index of Works</span>
        </div>
        <motion.h1
          className="archive-title"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Everything
          <br />
          we have built.
        </motion.h1>
        <motion.p
          className="section-lede"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
        >
          The complete record of the practice — every site, every programme,
          documented the way it was designed. Patiently.
        </motion.p>

        <motion.div
          className="archive-stats"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          {stats.map((s) => (
            <div className="archive-stat" key={s.label}>
              <span className="fact-label">{s.label}</span>
              <span className="fact-value">{s.value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="archive-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <div className="chip-row" role="group" aria-label="Filter by programme">
            {KINDS.map((k) => (
              <button
                key={k}
                type="button"
                className={`chip${kind === k ? ' chip-active' : ''}`}
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="view-toggle" role="group" aria-label="Change view">
            <button
              type="button"
              className={`view-btn${view === 'plates' ? ' view-btn-active' : ''}`}
              aria-pressed={view === 'plates'}
              onClick={() => setView('plates')}
            >
              <LayoutGrid size={13} strokeWidth={1.75} aria-hidden="true" />
              Plates
            </button>
            <button
              type="button"
              className={`view-btn${view === 'index' ? ' view-btn-active' : ''}`}
              aria-pressed={view === 'index'}
              onClick={() => setView('index')}
            >
              <Rows3 size={13} strokeWidth={1.75} aria-hidden="true" />
              Index
            </button>
          </div>
        </motion.div>
      </header>

      {view === 'plates' ? (
        <div className="plates">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <Plate key={p.slug} project={p} index={i} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <ul className="archive-list">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <IndexRow
                key={p.slug}
                project={p}
                number={i + 1}
                onHover={onHover}
                onLeave={onLeave}
                onMove={onMove}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}

      <aside className="archive-cta">
        <p className="archive-cta-kicker">
          <span className="dot" />
          Have a site in mind?
        </p>
        <Link className="archive-cta-link" to="/#contact">
          Start a project
          <span className="archive-cta-circle" aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={1.75} />
          </span>
        </Link>
      </aside>

      <AnimatePresence>
        {view === 'index' && preview && (
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
