import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/projects.js'

const EASE = [0.16, 1, 0.3, 1]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <motion.div
      ref={ref}
      className={`project ${project.wide ? 'project-wide' : ''}`}
      initial={{ y: 32, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: EASE }}
    >
      <Link to={`/projects/${project.slug}`} className="project-link">
        <div className="project-media">
          <motion.img src={project.img} alt={project.alt} style={{ y }} loading="lazy" />
          <span className="project-kind">{project.kind}</span>
          <span className="project-arrow" aria-hidden="true">
            <ArrowUpRight size={16} strokeWidth={2} />
          </span>
        </div>
        <div className="project-meta">
          <span className="project-name">{project.name}</span>
          <span className="project-detail">
            {project.place} — {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Works() {
  return (
    <section className="section works" id="works">
      <div className="sheet-label">
        <span>N° 02</span>
        <span>Selected Works</span>
      </div>
      <div className="works-head">
        <h2 className="section-heading">
          Four buildings,
          <br />
          nothing to spare.
        </h2>
        <p className="section-lede">
          A selection from a decade of practice. Each project is documented the
          way it was designed — patiently.
        </p>
      </div>
      <div className="works-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <div className="works-foot">
        <Link className="journal-all" to="/projects">
          Index of all works <ArrowUpRight size={14} strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  )
}
