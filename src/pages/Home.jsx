import { useEffect } from 'react'
import Hero from '../sections/Hero.jsx'
import Manifesto from '../sections/Manifesto.jsx'
import Works from '../sections/Works.jsx'
import Materials from '../sections/Materials.jsx'
import Process from '../sections/Process.jsx'
import Studio from '../sections/Studio.jsx'
import Recognition from '../sections/Recognition.jsx'
import Journal from '../sections/Journal.jsx'
import Voices from '../sections/Voices.jsx'
import Contact from '../sections/Contact.jsx'
import ScrollFX from '../components/ScrollFX.jsx'

export default function Home() {
  useEffect(() => {
    document.title = 'Atelier Mono — Architecture Studio'
  }, [])

  return (
    <>
      <Hero />
      <main>
        <Manifesto />
        <Works />
        <Materials />
        <Process />
        <Studio />
        <Recognition />
        <Journal />
        <Voices />
      </main>
      <Contact />
      <ScrollFX />
    </>
  )
}
