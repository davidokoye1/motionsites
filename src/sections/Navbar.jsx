import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, X, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/projects.js'
import { scrollToTarget, stopScroll, startScroll } from '../lib/scroll.js'

const EASE = [0.16, 1, 0.3, 1]

const MENU_LINKS = [
  { label: 'Manifesto', hash: 'manifesto' },
  { label: 'Selected Works', hash: 'works' },
  { label: 'All Works', to: '/projects' },
  { label: 'Materials', hash: 'materials' },
  { label: 'Process', hash: 'process' },
  { label: 'The Studio', hash: 'studio' },
  { label: 'Recognition', hash: 'recognition' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', hash: 'contact' },
]

function Logo({ fill = '#1A1A18' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect
        x="4"
        y="10"
        width="20"
        height="8"
        rx="4"
        fill={fill}
        transform="rotate(-35 14 14)"
      />
      <rect
        x="4"
        y="10"
        width="20"
        height="8"
        rx="4"
        fill={fill}
        transform="rotate(-35 14 14) translate(0 -9)"
      />
    </svg>
  )
}

function DotGridIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <circle cx="2.5" cy="2.5" r="1.5" fill="#FAF9F7" />
      <circle cx="7.5" cy="2.5" r="1.5" fill="#FAF9F7" />
      <circle cx="2.5" cy="7.5" r="1.5" fill="#FAF9F7" />
      <circle cx="7.5" cy="7.5" r="1.5" fill="#FAF9F7" />
    </svg>
  )
}

function MenuOverlay({ onClose }) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    stopScroll()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      startScroll()
    }
  }, [onClose])

  const goTo = (hash) => {
    onClose()
    if (location.pathname === '/') {
      const el = document.getElementById(hash)
      if (el) scrollToTarget(el)
    } else {
      navigate(`/#${hash}`)
    }
  }

  return (
    <motion.div
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="menu-overlay-head">
        <span className="menu-overlay-brand">
          <Logo fill="#FAF9F7" />
          Atelier Mono
        </span>
        <button className="menu-close" type="button" onClick={onClose} aria-label="Close menu">
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="menu-overlay-body">
        <nav className="menu-nav" aria-label="Sections">
          <span className="menu-col-title">Index</span>
          <ul>
            {MENU_LINKS.map((link, i) => (
              <motion.li
                key={link.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.05, ease: EASE }}
              >
                {link.to ? (
                  <Link className="menu-link" to={link.to} onClick={onClose}>
                    {link.label}
                  </Link>
                ) : (
                  <button type="button" className="menu-link" onClick={() => goTo(link.hash)}>
                    {link.label}
                  </button>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        <nav className="menu-projects" aria-label="Projects">
          <span className="menu-col-title">Projects</span>
          <ul>
            {PROJECTS.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: EASE }}
              >
                <Link className="menu-project-link" to={`/projects/${p.slug}`} onClick={onClose}>
                  <span>{p.name}</span>
                  <span className="menu-project-meta">
                    {p.place} <ArrowUpRight size={13} strokeWidth={1.75} />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="menu-overlay-foot">
        <span>Lisbon, Portugal</span>
        <a href="mailto:studio@ateliermono.com">studio@ateliermono.com</a>
      </div>
    </motion.div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="nav-left">
          <Link className="brand" to="/" aria-label="Atelier Mono — home">
            <Logo />
            <span className="brand-text">Atelier Mono</span>
          </Link>

          <button className="menu-btn" type="button" onClick={() => setOpen(true)}>
            <span className="menu-circle">
              <Plus size={12} strokeWidth={3} color="#1A1A18" />
            </span>
            <span className="menu-label">Menu</span>
          </button>

          <div className="tags-pill">
            <Link to="/#works">Residential</Link>
            <Link to="/#works">Cultural Spaces</Link>
          </div>
        </div>

        <div className="nav-right">
          <Link className="right-pill" to="/#studio">
            <span className="grid-btn" aria-hidden="true">
              <DotGridIcon />
            </span>
            <span className="right-label">Studio Practice</span>
          </Link>
        </div>
      </motion.nav>

      <AnimatePresence>{open && <MenuOverlay onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}
