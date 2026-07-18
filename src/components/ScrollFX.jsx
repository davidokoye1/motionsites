import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

/**
 * Page-level scroll effects, applied by selector so section markup stays clean.
 * Elements already animated by motion containers (.studio-copy, .contact-main)
 * are skipped to avoid double reveals.
 */
export default function ScrollFX() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const splits = []

      // Drawing-sheet labels wipe in left to right, borders included.
      gsap.utils.toArray('.sheet-label').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      // Section headings rise line by line from behind a mask.
      gsap.utils
        .toArray('.section-heading')
        .filter((el) => !el.closest('.studio-copy') && !el.closest('.contact-main'))
        .forEach((el) => {
          const split = SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.1,
                ease: 'power4.out',
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                // Restore clean markup once revealed so tight line-heights never clip descenders.
                onComplete: () => self.revert(),
              }),
          })
          splits.push(split)
        })

      // Imagery opens like an aperture as it enters. clip-path only —
      // the images' transform is owned by motion parallax / CSS hover.
      gsap.utils.toArray('.project-media, .note-media').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(12% 8% 12% 8%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
      })

      // Material plates part one after another.
      const materials = gsap.utils.toArray('.material')
      if (materials.length) {
        gsap.fromTo(
          materials,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.materials-strip', start: 'top 82%', once: true },
          },
        )
      }

      // Supporting copy drifts up just after its heading.
      gsap.utils
        .toArray('.section-lede, .manifesto-footnote')
        .filter((el) => !el.closest('.studio-copy') && !el.closest('.contact-main'))
        .forEach((el) => {
          gsap.from(el, {
            y: 28,
            autoAlpha: 0,
            duration: 1.1,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })

      return () => splits.forEach((s) => s.revert())
    })

    // Positions depend on webfont metrics and image decode.
    document.fonts?.ready?.then(() => ScrollTrigger.refresh())
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  })

  return null
}
