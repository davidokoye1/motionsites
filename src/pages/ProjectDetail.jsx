import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { getProject, adjacentProjects } from '../data/projects.js'

const EASE = [0.16, 1, 0.3, 1]

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    if (project) document.title = `${project.name} — Atelier Mono`
  }, [project])

  if (!project) return <Navigate to="/" replace />

  const { prev, next } = adjacentProjects(slug)
  const facts = [
    { label: 'Location', value: project.place },
    { label: 'Completed', value: project.year },
    { label: 'Programme', value: project.kind },
    { label: 'Area', value: project.area },
    { label: 'Status', value: project.status },
    { label: 'Materials', value: project.materials },
  ]

  return (
    <article className="detail" key={slug}>
      <header className="detail-hero">
        <motion.div
          className="detail-hero-media"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <img src={project.img} alt={project.alt} />
        </motion.div>
        <div className="detail-hero-foot">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            <p className="detail-kicker">
              <span className="dot" />
              {project.kind} — {project.place}
            </p>
            <h1 className="detail-title">{project.name}</h1>
          </motion.div>
        </div>
      </header>

      <div className="detail-body">
        <motion.div
          className="detail-intro-row"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
        >
          <p className="detail-intro">{project.intro}</p>
          <dl className="detail-facts">
            {facts.map((f) => (
              <div className="detail-fact" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <div className="detail-narrative">
          {project.body.map((para, i) => (
            <motion.p
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.figure
          className="detail-media"
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <img src={project.detailImg} alt={project.detailAlt} loading="lazy" />
          <figcaption>{project.detailAlt}</figcaption>
        </motion.figure>

        <div className="detail-credits">
          <span className="detail-credits-title">Credits</span>
          <ul>
            {project.credits.map((c) => (
              <li key={c.role}>
                <span>{c.role}</span>
                <span>{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav className="detail-nav" aria-label="More projects">
        <Link className="detail-nav-link" to={`/projects/${prev.slug}`}>
          <span className="detail-nav-dir">
            <ArrowLeft size={14} strokeWidth={1.75} /> Previous
          </span>
          <span className="detail-nav-name">{prev.name}</span>
        </Link>
        <Link className="detail-nav-all" to="/projects">
          All works <ArrowUpRight size={14} strokeWidth={1.75} />
        </Link>
        <Link className="detail-nav-link detail-nav-next" to={`/projects/${next.slug}`}>
          <span className="detail-nav-dir">
            Next <ArrowRight size={14} strokeWidth={1.75} />
          </span>
          <span className="detail-nav-name">{next.name}</span>
        </Link>
      </nav>
    </article>
  )
}
