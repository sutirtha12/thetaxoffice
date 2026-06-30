import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Services from './components/Services'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import useSmoothScroll from './hooks/useSmoothScroll'
import { preloadFrames } from './utils/preloadFrames'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [frames, setFrames] = useState(null)

  useSmoothScroll()

  useEffect(() => {
    preloadFrames((p) => {
      setProgress(p * 0.82)
    }).then(async (images) => {
      for (let i = 0; i < images.length; i += 20) {
        await Promise.allSettled(
          images.slice(i, i + 20).map((im) =>
            im.decode ? im.decode().catch(() => {}) : null
          )
        )
        setProgress(0.82 + 0.18 * Math.min(1, (i + 20) / images.length))
      }
      setProgress(1)
      setFrames(images)
    })
  }, [])

  return (
    <>
      <Loader progress={progress} onComplete={() => setLoaded(true)} />
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero frames={frames} />
        <Ticker />
        <Services />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
