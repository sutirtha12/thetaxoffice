import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: "The Tax Office didn't just manage our finances — they reimagined our entire fiscal architecture. The result was a 40% reduction in tax liability within the first year.",
    name: 'Alexandra Chen',
    title: 'CFO, Meridian Technologies',
    rating: 5,
    image: 'AC',
  },
  {
    quote: "Their audit process uncovered inefficiencies we'd overlooked for a decade. Methodical, transparent, and genuinely invested in our growth. A rare find in this industry.",
    name: 'James Whitfield',
    title: 'Managing Partner, Atlas Ventures',
    rating: 5,
    image: 'JW',
  },
  {
    quote: "From our Series B through IPO, The Tax Office was our financial compass. Their strategic foresight turned potential pitfalls into opportunities worth millions.",
    name: 'Priya Anand',
    title: 'Founder & CEO, NovaSphere',
    rating: 5,
    image: 'PA',
  },
  {
    quote: "The wealth management team crafted a succession plan that secured three generations of our family's legacy. Exceptionally thoughtful and discreet partners.",
    name: 'Robert Ashworth III',
    title: 'Chairman, Ashworth Holdings',
    rating: 5,
    image: 'RA',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" ref={ref} style={{
      padding: 'clamp(6rem, 12vw, 10rem) 0',
      background: 'var(--bg-primary)',
      position: 'relative',
    }}>
      <div className="container">
        <div className="testimonials-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="section-label"
            >
              Client Voices
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '2rem',
              }}
            >
              Trusted by the<br />
              <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Ambitious</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.2rem',
                    background: active === i ? 'var(--bg-card)' : 'transparent',
                    border: '1px solid',
                    borderColor: active === i ? 'var(--border-hover)' : 'transparent',
                    transition: 'all 0.4s var(--ease-out-expo)',
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: active === i ? 'var(--gold)' : 'var(--bg-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: active === i ? 'var(--bg-primary)' : 'var(--text-muted)',
                    transition: 'all 0.4s',
                    flexShrink: 0,
                  }}>
                    {t.image}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: active === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'color 0.3s',
                    }}>
                      {t.name}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.1em',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                    }}>
                      {t.title}
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              padding: 'clamp(2.5rem, 4vw, 3.5rem)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              minHeight: '350px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-1px',
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, var(--gold), var(--gold-dim), transparent)',
            }} />

            <svg width="48" height="36" viewBox="0 0 48 36" fill="none" style={{ marginBottom: '2rem', opacity: 0.2 }}>
              <path d="M0 36V20.4C0 14.4 1.2 9.6 3.6 6C6 2.4 10 0.4 15.6 0L18 6C14.8 6.8 12.4 8.2 10.8 10.2C9.2 12.2 8.4 14.6 8.4 17.4H18V36H0ZM30 36V20.4C30 14.4 31.2 9.6 33.6 6C36 2.4 40 0.4 45.6 0L48 6C44.8 6.8 42.4 8.2 40.8 10.2C39.2 12.2 38.4 14.6 38.4 17.4H48V36H30Z" fill="var(--gold)"/>
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="testimonial-quote" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: 'var(--text-primary)',
                  fontStyle: 'italic',
                  marginBottom: '2rem',
                }}>
                  "{testimonials[active].quote}"
                </p>

                <div style={{
                  display: 'flex',
                  gap: '4px',
                  marginBottom: '1rem',
                }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="var(--gold)">
                      <path d="M7 0L8.6 5.2H14L9.7 8.4L11.3 13.6L7 10.4L2.7 13.6L4.3 8.4L0 5.2H5.4L7 0Z"/>
                    </svg>
                  ))}
                </div>

                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}>
                  {testimonials[active].name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: 'var(--gold-dim)',
                  textTransform: 'uppercase',
                  marginTop: '0.2rem',
                }}>
                  {testimonials[active].title}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .testimonial-card {
            min-height: auto !important;
            padding: 2rem 1.5rem !important;
          }
          .testimonial-quote {
            font-size: 1.15rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .testimonial-card { padding: 1.75rem 1.25rem !important; }
          .testimonial-quote { font-size: 1.05rem !important; }
        }
      `}</style>
    </section>
  )
}
