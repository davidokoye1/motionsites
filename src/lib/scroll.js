import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let rafCallback = null

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis

  lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  })

  lenis.on('scroll', ScrollTrigger.update)
  rafCallback = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(rafCallback)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroySmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(rafCallback)
  lenis.destroy()
  lenis = null
  rafCallback = null
}

export function getLenis() {
  return lenis
}

export function stopScroll() {
  lenis?.stop()
}

export function startScroll() {
  lenis?.start()
}

export function scrollToTarget(target, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, immediate ? { immediate: true, force: true } : { duration: 1.4, force: true })
    return
  }
  const behavior = immediate || prefersReducedMotion() ? 'auto' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior })
  } else {
    target?.scrollIntoView({ behavior })
  }
}
