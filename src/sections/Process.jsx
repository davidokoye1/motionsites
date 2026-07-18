import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Compass, PencilRuler, Layers, Sun } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const STEPS = [
  {
    icon: Compass,
    title: 'Listen to the site',
    body: 'Before a single line is drawn, we spend weeks on the land — recording where light falls, where wind moves, what the ground wants to hold.',
  },
  {
    icon: PencilRuler,
    title: 'Draw by subtraction',
    body: 'We begin with more than the project needs and remove until only the essential remains. The final drawing is always the emptiest one.',
  },
  {
    icon: Layers,
    title: 'Build in few materials',
    body: 'Concrete, glass, timber, stone. Rarely more than three per project. Fewer materials mean fewer joints, and fewer joints mean silence.',
  },
  {
    icon: Sun,
    title: 'Hand over to light',
    body: 'A building is finished by the sun, not by us. We design apertures, then let the day complete the architecture — differently every hour.',
  },
]

function Step({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = step.icon

  return (
    <motion.li
      ref={ref}
      className="step"
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
    >
      <div className="step-top">
        <span className="step-icon">
          <Icon size={16} strokeWidth={1.5} />
        </span>
        <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="step-title">{step.title}</h3>
      <p className="step-body">{step.body}</p>
    </motion.li>
  )
}

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="sheet-label sheet-label-light">
        <span>N° 04</span>
        <span>Process</span>
      </div>
      <div className="process-head">
        <h2 className="section-heading">How a building becomes quiet.</h2>
      </div>
      <ol className="steps">
        {STEPS.map((s, i) => (
          <Step key={s.title} step={s} index={i} />
        ))}
      </ol>
    </section>
  )
}
