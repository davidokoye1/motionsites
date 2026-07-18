import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import studioImg from '../assets/studio.png'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const EASE = [0.16, 1, 0.3, 1]

const FACTS = [
  { value: '2014', label: 'Practice founded' },
  { value: '38', label: 'Buildings completed' },
  { value: '11', label: 'Countries built in' },
  { value: '3', label: 'Materials, at most' },
]

export default function Studio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Practice numbers count up as they enter view.
        gsap.utils.toArray('.fact-value', ref.current).forEach((el) => {
          const end = parseInt(el.textContent, 10)
          if (Number.isNaN(end)) return
          gsap.fromTo(
            el,
            { innerText: Math.max(0, end - 42) },
            {
              innerText: end,
              duration: 1.8,
              ease: 'power2.out',
              snap: { innerText: 1 },
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            },
          )
        })
      })
    },
    { scope: ref },
  )

  return (
    <section className="section studio" id="studio" ref={ref}>
      <div className="sheet-label">
        <span>N° 05</span>
        <span>The Studio</span>
      </div>
      <div className="studio-layout">
        <motion.div
          className="studio-media"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <motion.img
            src={studioImg}
            alt="Architectural massing models on a long oak table in warm daylight"
            style={{ y }}
            loading="lazy"
          />
        </motion.div>
        <motion.div
          className="studio-copy"
          initial={{ y: 24, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          <h2 className="section-heading">
            Twelve people.
            <br />
            One long table.
          </h2>
          <p className="section-lede">
            The studio works from a converted printworks in Lisbon. Every
            project — from a chapel to a hillside house — is drawn, modelled,
            and argued over at the same oak table. We take on four projects a
            year, never more.
          </p>
          <dl className="facts">
            {FACTS.map((f) => (
              <div className="fact" key={f.label}>
                <dt className="fact-label">{f.label}</dt>
                <dd className="fact-value">{f.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
