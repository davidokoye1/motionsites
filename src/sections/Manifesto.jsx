import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const WORDS =
  'We design buildings that hold light, frame silence, and give shape to the land they stand on.'.split(
    ' ',
  )

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span className="manifesto-word" style={{ opacity }}>
      {children}{' '}
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })

  return (
    <section className="section manifesto" id="manifesto" ref={ref}>
      <div className="sheet-label">
        <span>N° 01</span>
        <span>Manifesto</span>
      </div>
      <p className="manifesto-text">
        {WORDS.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / WORDS.length, (i + 1) / WORDS.length]}
          >
            {word}
          </Word>
        ))}
      </p>
      <p className="manifesto-footnote">
        Atelier Mono is an architecture practice working across residential,
        cultural, and sacred spaces. Every project begins with the same
        question — what can be taken away?
      </p>
    </section>
  )
}
