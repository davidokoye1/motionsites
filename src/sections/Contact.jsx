import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight, MapPin, Mail } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PROJECT_TYPES = ['Residential', 'Commercial', 'Cultural', 'Other']
const TIMELINES = ['Exploring', 'Within 6 months', 'Ready to start']

const EMPTY_FORM = { name: '', email: '', projectType: '', timeline: '', message: '' }

function FooterLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect
        x="4"
        y="10"
        width="20"
        height="8"
        rx="4"
        fill="#FAF9F7"
        transform="rotate(-35 14 14)"
      />
      <rect
        x="4"
        y="10"
        width="20"
        height="8"
        rx="4"
        fill="#FAF9F7"
        transform="rotate(-35 14 14) translate(0 -9)"
      />
    </svg>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (values) => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Please enter a valid email.'
    if (!values.projectType) next.projectType = 'Select a project type.'
    if (!values.timeline) next.timeline = 'Select a timeline.'
    if (!values.message.trim()) next.message = 'Tell us a little about the site.'
    return next
  }


  const handleChange = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    // TODO: wire to backend (Formspree / API POST). Currently a client-only success state.
    setSubmitted(true)
  }

  return (
    <footer className="contact" id="contact" ref={ref}>
      <div className="sheet-label sheet-label-light">
        <span>N° 09</span>
        <span>Begin a Project</span>
      </div>

      <motion.div
        className="contact-main"
        initial={{ y: 28, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE }}
      >
        <h2 className="contact-heading">
          Bring us
          <br />
          an empty site.
        </h2>

        {submitted ? (
          <div className="contact-success" role="status">
            <h3 className="contact-success-title">Thank you — your enquiry is in.</h3>
            <p className="contact-success-text">
              We read every message ourselves and typically reply within two working days.
              In the meantime, prefer email? Reach us at{' '}
              <a className="contact-inline-link" href="mailto:studio@ateliermono.com">
                studio@ateliermono.com
              </a>
              .
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-head">
              <span>Project enquiry</span>
              <span>01 / 01</span>
            </div>

            <p className="contact-form-intro">
              Tell us what is taking shape. A rough brief is enough to begin.
            </p>

            <div className="contact-form-row">
              <div className="contact-field">
                <label className="contact-label" htmlFor="cf-name">
                  Name
                </label>
                <input
                  id="cf-name"
                  className="contact-input"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  aria-invalid={errors.name ? 'true' : undefined}
                  autoComplete="name"
                />
                {errors.name && <span className="contact-error">{errors.name}</span>}
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="cf-email">
                  Email
                </label>
                <input
                  id="cf-email"
                  className="contact-input"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  aria-invalid={errors.email ? 'true' : undefined}
                  autoComplete="email"
                />
                {errors.email && <span className="contact-error">{errors.email}</span>}
              </div>
            </div>

            <div className="contact-form-row">
              <div className="contact-field">
                <label className="contact-label" htmlFor="cf-type">
                  Project type
                </label>
                <select
                  id="cf-type"
                  className="contact-input contact-select"
                  value={form.projectType}
                  onChange={handleChange('projectType')}
                  aria-invalid={errors.projectType ? 'true' : undefined}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <span className="contact-error">{errors.projectType}</span>
                )}
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="cf-timeline">
                  Timeline
                </label>
                <select
                  id="cf-timeline"
                  className="contact-input contact-select"
                  value={form.timeline}
                  onChange={handleChange('timeline')}
                  aria-invalid={errors.timeline ? 'true' : undefined}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.timeline && <span className="contact-error">{errors.timeline}</span>}
              </div>
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="cf-message">
                Your project
              </label>
              <textarea
                id="cf-message"
                className="contact-input contact-textarea"
                rows={4}
                value={form.message}
                onChange={handleChange('message')}
                aria-invalid={errors.message ? 'true' : undefined}
                placeholder="A few words on the site, the brief, or the ambition."
              />
              {errors.message && <span className="contact-error">{errors.message}</span>}
            </div>

            <div className="contact-form-foot">
              <button className="contact-submit" type="submit">
                <span>Send project enquiry</span>
                <span className="contact-submit-icon" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={1.75} />
                </span>
              </button>
              <p className="contact-reassure">
                No-obligation initial conversation. We reply within two working days — or
                email{' '}
                <a className="contact-inline-link" href="mailto:studio@ateliermono.com">
                  studio@ateliermono.com
                </a>
                .
              </p>
            </div>
          </form>
        )}
      </motion.div>

      <motion.div
        className="contact-grid"
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      >
        <div className="contact-col">
          <span className="contact-col-title">
            <MapPin size={12} strokeWidth={1.75} /> Studio
          </span>
          <p>
            Rua da Imprensa 14
            <br />
            1200-846 Lisbon
            <br />
            Portugal
          </p>
        </div>
        <div className="contact-col">
          <span className="contact-col-title">
            <Mail size={12} strokeWidth={1.75} /> Enquiries
          </span>
          <p>
            studio@ateliermono.com
            <br />
            press@ateliermono.com
          </p>
        </div>
        <div className="contact-col">
          <span className="contact-col-title">Elsewhere</span>
          <ul className="contact-links">
            <li><a href="#contact">Instagram</a></li>
            <li><a href="#contact">Are.na</a></li>
            <li><a href="#contact">Divisare</a></li>
          </ul>
        </div>
      </motion.div>

      <div className="contact-bottom">
        <span className="contact-brand">
          <FooterLogo />
          Atelier Mono
        </span>
        <span className="contact-fine">© 2026 Atelier Mono, Lda. All drawings remain drawings.</span>
      </div>
    </footer>
  )
}
