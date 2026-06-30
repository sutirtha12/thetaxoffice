import { useRef, useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FRAME_COUNT } from '../utils/preloadFrames'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ frames }) {
  const root = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef(null)
  const renderRef = useRef(null)

  framesRef.current = frames

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    const state = { frame: 0 }

    let cw = 0, ch = 0, dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cw = window.innerWidth
      ch = window.innerHeight
      canvas.width = cw * dpr
      canvas.height = ch * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      render(true)
    }

    let lastFrame = -1
    const render = (force) => {
      const images = framesRef.current
      if (!images) return

      const f = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(state.frame)))
      if (!force && f === lastFrame) return

      let img = images[f]
      if (!img?.complete || !img?.naturalWidth) {
        for (let d = 1; d < FRAME_COUNT; d++) {
          if (f - d >= 0) {
            const prev = images[f - d]
            if (prev?.complete && prev?.naturalWidth) { img = prev; break }
          }
          if (f + d < FRAME_COUNT) {
            const next = images[f + d]
            if (next?.complete && next?.naturalWidth) { img = next; break }
          }
        }
        if (!img?.complete || !img?.naturalWidth) return
      }

      lastFrame = f
      const ir = img.naturalWidth / img.naturalHeight
      const cr = cw / ch
      let dw, dh, dx, dy
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0 }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2 }
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    renderRef.current = render
    resize()
    window.addEventListener('resize', resize)

    const ctxGsap = gsap.context(() => {
      gsap.set('.hero-headline', { autoAlpha: 1, yPercent: 0, scale: 1 })
      gsap.set('.hero-headline .word', { yPercent: 120, autoAlpha: 0 })
      gsap.set('.hero-details', { autoAlpha: 0, y: 50 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=2800',
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl
        .to(state, { frame: FRAME_COUNT - 1, ease: 'none', snap: { frame: 1 }, onUpdate: () => render(false), duration: 1 }, 0)
        .to('.hero-intro', { autoAlpha: 0, y: -40, ease: 'power1.out', duration: 0.1 }, 0.02)
        .fromTo(
          '.hero-headline .word',
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, stagger: 0.05, ease: 'power3.out', duration: 0.16 },
          0.1
        )
        .to(
          '.hero-headline',
          { y: '-4vh', scale: 0.96, ease: 'power1.inOut', duration: 0.22 },
          0.82
        )
        .fromTo(
          '.hero-details',
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.22 },
          0.8
        )

      ScrollTrigger.refresh()
    }, root)

    return () => {
      window.removeEventListener('resize', resize)
      ctxGsap.revert()
    }
  }, [])

  useEffect(() => {
    if (frames && renderRef.current) {
      renderRef.current(true)
      ScrollTrigger.refresh()
    }
  }, [frames != null])

  return (
    <section ref={root} className="hero-pin">
      <div className="hero-atmos" />
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-headline">
          <span className="line">
            <span className="word">Where</span>
            <span className="word">Numbers</span>
          </span>
          <span className="line">
            <span className="word accent">Meet</span>
            <span className="word accent">Innovation</span>
          </span>
        </h1>

        <div className="hero-details">
          <p className="hero-sub">
            GST, income tax, registrations and compliance — engineered with
            precision and delivered with the polish your business deserves.
          </p>

          <div className="hero-cta-row pointer">
            <button className="hero-btn hero-btn--primary">Start Your Filing</button>
            <button className="hero-btn hero-btn--ghost">Explore Services →</button>
          </div>

          <div className="hero-stats">
            {[
              { num: '12K+', label: 'Returns Filed' },
              { num: '4,800+', label: 'Clients Served' },
              { num: '99.6%', label: 'On-Time Rate' },
            ].map((s) => (
              <div key={s.label} className="hero-stat">
                <div className="hero-stat__num">{s.num}</div>
                <div className="hero-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-intro">
        <span className="hero-kicker">Est. 2019 · India</span>
        <p className="hero-tagline">
          We're <em>The Tax Office</em> — turning GST returns, income-tax filings
          &amp; compliance into your sharpest competitive edge.
        </p>
        <div className="hero-cue">
          <span>Scroll to begin</span>
          <div className="bar" />
        </div>
      </div>
    </section>
  )
}
