import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 150
const framePath = (i) => `/frames/frame_${String(i).padStart(4, '0')}.jpg`

export default function Hero() {
  const root = useRef(null)
  const canvasRef = useRef(null)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    const images = []
    const state = { frame: 0 }

    // ---- preload the frame sequence ----
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = framePath(i)
      images.push(img)
    }

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

    // draw current frame with object-fit: cover behaviour.
    // Guarded: only repaint when the integer frame actually changes (or on an
    // explicit force, e.g. resize). Avoids redundant canvas work on every scroll
    // tick, which is what keeps the scrub buttery.
    let lastFrame = -1
    const render = (force) => {
      const f = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(state.frame)))
      if (!force && f === lastFrame) return
      const img = images[f]
      if (!img || !img.complete || !img.naturalWidth) return
      lastFrame = f
      const ir = img.naturalWidth / img.naturalHeight
      const cr = cw / ch
      let dw, dh, dx, dy
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0 }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2 }
      // "cover" guarantees full coverage, so no per-frame clear is needed
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    images[0].onload = () => render(true)
    resize()
    window.addEventListener('resize', resize)

    const ctxGsap = gsap.context(() => {
      // Initial hidden states: headline + supporting details are NOT shown yet.
      // The intro line stays visible by default (CSS) so it's always there at the
      // top and reliably returns whenever you scroll back up.
      // Headline container starts fully visible (opacity 1); only the WORDS are
      // pre-hidden (pushed below their clipped line box) so they can rise in.
      gsap.set('.hero-headline', { autoAlpha: 1, yPercent: 0, scale: 1 })
      gsap.set('.hero-headline .word', { yPercent: 120, autoAlpha: 0 })
      gsap.set('.hero-details', { autoAlpha: 0, y: 50 })

      // ---- Scroll-driven frame scrub + staged reveals (pinned) ----
      // Timeline total duration is 1.0 (the frame scrub below spans 0 -> 1), so
      // every position/duration here is a fraction of the full pin scroll.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=2800',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      tl
        // frames scrub across the whole pin (defines the 0 -> 1 timeline length)
        .to(state, { frame: FRAME_COUNT - 1, ease: 'none', snap: 'frame', onUpdate: render, duration: 1 }, 0)
        // intro line lifts away almost immediately as you begin to scroll
        .to('.hero-intro', { autoAlpha: 0, y: -40, ease: 'power1.out', duration: 0.1 }, 0.02)
        // BIG centered headline rises + fades IN early (~10% -> ~30% of scroll),
        // large and white. Quick, low stagger so it reads as one confident line.
        .fromTo(
          '.hero-headline .word',
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, stagger: 0.05, ease: 'power3.out', duration: 0.16 },
          0.1
        )
        // ...and it STAYS centered + full size through the whole middle of the
        // scroll. No early upward translate / shrink that would hide it.
        // Near the very end it gives a gentle, still-on-screen handoff: a small
        // lift + slight scale-down (never off-screen, never shrunk to nothing)
        // so the supporting details can take the lower third.
        .to(
          '.hero-headline',
          { y: '-4vh', scale: 0.96, ease: 'power1.inOut', duration: 0.22 },
          0.82
        )
        // supporting details (sub + buttons + stats) rise in over the last stretch
        .fromTo(
          '.hero-details',
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.22 },
          0.8
        )

      // Warm-decode every frame (in small batches) so no frame has to decode on
      // the main thread mid-scroll — this is the key to a jank-free scrub.
      ;(async () => {
        for (let i = 0; i < images.length; i += 12) {
          await Promise.allSettled(
            images.slice(i, i + 12).map((im) => (im.decode ? im.decode().catch(() => {}) : null))
          )
        }
        ScrollTrigger.refresh()
        render(true)
      })()
    }, root)

    return () => {
      window.removeEventListener('resize', resize)
      ctxGsap.revert()
    }
  }, [])

  return (
    <section ref={root} className="hero-pin">
      <div className="hero-atmos" />
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-overlay" />

      {/* Center headline + details — hidden until you scroll */}
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

      {/* Initial intro — the only thing visible on first load */}
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
