import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './sections/Navbar.jsx'
import Home from './pages/Home.jsx'
import ProjectsIndex from './pages/ProjectsIndex.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import JournalIndex from './pages/JournalIndex.jsx'
import JournalArticle from './pages/JournalArticle.jsx'
import { initSmoothScroll, destroySmoothScroll, scrollToTarget } from './lib/scroll.js'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        scrollToTarget(el)
        return
      }
    }
    scrollToTarget(0, { immediate: true })
    // New page content = new layout; recalculate trigger positions.
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [pathname, hash])

  return null
}

export default function App() {
  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  return (
    <div id="top">
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsIndex />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/journal" element={<JournalIndex />} />
        <Route path="/journal/:slug" element={<JournalArticle />} />
      </Routes>
    </div>
  )
}
