import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const QUOTES = [
  {
    text: 'They gave us a house with fewer rooms than we asked for, and somehow more space than we imagined. Three years in, we have changed nothing — not even a light switch.',
    name: 'Marta & João Silveira',
    role: 'Courtyard House, Alentejo',
  },
  {
    text: 'Most architects present you with options. Atelier Mono presented us with one drawing and a very long explanation of everything they had removed from it. It was the right drawing.',
    name: 'The Ishii Foundation',
    role: 'Chapel of a Single Light, Naoshima',
  },
  {
    text: 'The pavilion runs almost entirely without mechanical cooling, in the Texas desert. Our conservators did not believe the numbers until the second summer.',
    name: 'R. Whitfield',
    role: 'Director, Stillwater Collection',
  },
]

export default function Voices() {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 8000)
    return () => clearInterval(id)
  }, [])

  const go = (dir) => setIndex((i) => (i + dir + QUOTES.length) % QUOTES.length)
  const quote = QUOTES[index]

  return (
    <section className="section voices" id="voices" ref={ref}>
      <div className="sheet-label">
        <span>N° 08</span>
        <span>Voices</span>
      </div>
      <motion.div
        className="voices-inner"
        initial={{ y: 24, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="voices-quote-area" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              className="voice-quote"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p>“{quote.text}”</p>
              <footer>
                <span className="voice-name">{quote.name}</span>
                <span className="voice-role">{quote.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="voices-controls">
          <div className="voices-dots" aria-hidden="true">
            {QUOTES.map((_, i) => (
              <span key={i} className={`voices-dot ${i === index ? 'voices-dot-active' : ''}`} />
            ))}
          </div>
          <div className="voices-arrows">
            <button type="button" onClick={() => go(-1)} aria-label="Previous quote">
              <ArrowLeft size={15} strokeWidth={1.75} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next quote">
              <ArrowRight size={15} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
