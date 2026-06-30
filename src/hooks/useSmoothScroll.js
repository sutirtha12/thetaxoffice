import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Buttery smooth scrolling (Lenis) synced to GSAP's ticker so ScrollTrigger
 * stays in lockstep with the real scroll position. Returns nothing — just runs
 * for the lifetime of the app.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Re-measure once everything (fonts, video metadata, images) has settled.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 600)

    return () => {
      gsap.ticker.remove(raf)
      window.removeEventListener('load', refresh)
      clearTimeout(t)
      lenis.destroy()
    }
  }, [])
}
