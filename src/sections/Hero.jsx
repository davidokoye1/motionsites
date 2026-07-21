import { useRef } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImage from '../assets/hero.webp'
import { scrollToTarget } from '../lib/scroll.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const pageRef = useRef(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) scrollToTarget(el)
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Depth exit: the building recedes slower than the page, content lifts away faster.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          defaults: { ease: 'none' },
        })
        tl.to('.hero-bg', { yPercent: 9, scale: 1.16 }, 0).to(
          '.hero-footer-inner',
          { yPercent: -14, opacity: 0 },
          0,
        )
      })
    },
    { scope: pageRef },
  )

  return (
    <div className="hero-page" ref={pageRef}>
      {/* Background hero image */}
      <div className="hero-bg">
        <motion.div
          className="hero-wrapper"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <motion.img
            className="hero-img"
            src={heroImage}
            alt="Minimalist concrete and glass pavilion in warm daylight"
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </motion.div>
      </div>

      {/* Footer content */}
      <motion.div
        className="hero-footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        <div className="hero-footer-inner">
          <div className="hero-footer-left">
            <motion.div
              className="subtitle"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            >
              <span className="dot" />
              <span>Architecture Firm of the Year 2026</span>
            </motion.div>

            <motion.h1
              className="heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
            >
              Space, Reduced
              <br />
              to Its Essence.
            </motion.h1>

            <motion.div
              className="buttons"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            >
              <button className="btn-primary" type="button" onClick={() => scrollTo('contact')}>
                Start a Project
              </button>
              <button className="btn-outline" type="button" onClick={() => scrollTo('works')}>
                View Projects
              </button>
            </motion.div>
          </div>

          <div className="hero-footer-right">
            <span className="tag">Concrete</span>
            <span className="tag">Light</span>
            <span className="tag">Landscape</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
