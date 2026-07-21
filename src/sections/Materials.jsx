import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import matConcrete from '../assets/mat-concrete.webp'
import matGlass from '../assets/mat-glass.webp'
import matTimber from '../assets/mat-timber.webp'
import matStone from '../assets/mat-stone.webp'

const EASE = [0.16, 1, 0.3, 1]

const MATERIALS = [
  {
    key: 'concrete',
    img: matConcrete,
    alt: 'Board-formed concrete surface in warm raking light',
    name: 'Concrete',
    note: 'Cast against rough-sawn boards so the formwork leaves its grain behind. Structure and finish in a single pour.',
    usage: 'Used in 38 of 38 buildings',
  },
  {
    key: 'glass',
    img: matGlass,
    alt: 'Edge of a floor-to-ceiling glass pane refracting golden light',
    name: 'Glass',
    note: 'Always full-height, never a window in a wall. Where a room meets the landscape, the wall simply stops.',
    usage: 'Used in 36 of 38 buildings',
  },
  {
    key: 'timber',
    img: matTimber,
    alt: 'Pale oak surface with fine straight grain in soft daylight',
    name: 'Oak',
    note: 'The one warm surface a hand touches — floors, benches, door pulls. Sawn, never stained; it earns its colour.',
    usage: 'Used in 29 of 38 buildings',
  },
  {
    key: 'stone',
    img: matStone,
    alt: 'Honed limestone with subtle fossil traces in evening light',
    name: 'Limestone',
    note: 'Quarried as close to the site as possible, honed flat, laid without pattern. Geology as flooring.',
    usage: 'Used in 17 of 38 buildings',
  },
]

export default function Materials() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section materials" id="materials" ref={ref}>
      <div className="sheet-label">
        <span>N° 03</span>
        <span>Material Library</span>
      </div>
      <div className="materials-head">
        <h2 className="section-heading">Three materials, at most.</h2>
        <p className="section-lede">
          Every building draws from the same short shelf. Fewer materials mean
          fewer joints — and fewer joints mean silence.
        </p>
      </div>

      <motion.div
        className="materials-strip"
        initial={{ y: 32, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE }}
      >
        {MATERIALS.map((m, i) => (
          <button
            key={m.key}
            type="button"
            className={`material ${active === i ? 'material-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-expanded={active === i}
          >
            <img src={m.img} alt={m.alt} loading="lazy" />
            <span className="material-scrim" aria-hidden="true" />
            <span className="material-name">{m.name}</span>
            <span className="material-info">
              <span className="material-note">{m.note}</span>
              <span className="material-usage">{m.usage}</span>
            </span>
          </button>
        ))}
      </motion.div>
    </section>
  )
}
