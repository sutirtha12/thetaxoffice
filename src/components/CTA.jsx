import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} style={{
      padding: 'clamp(6rem, 14vw, 12rem) 0',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(58,224,255,0.06) 0%, transparent 60%)',
      }} />

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        border: '1px solid var(--border)',
        opacity: 0.2,
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        border: '1px solid var(--border)',
        opacity: 0.15,
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        border: '1px solid var(--border)',
        opacity: 0.1,
      }} />

      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-label"
          style={{ justifyContent: 'center' }}
        >
          Let's Build Together
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            marginBottom: '1.5rem',
          }}
        >
          Ready to Redefine<br />
          <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Your Finances?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '0 auto 3rem',
          }}
        >
          Schedule a confidential consultation with our senior partners.
          No obligations, just possibilities.
        </motion.p>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            className="cta-btn cta-btn--primary"
            whileHover={{ scale: 1.03, boxShadow: '0 0 60px rgba(58,224,255,0.35)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '1.2rem 3.5rem',
              background: 'var(--gold)',
              color: 'var(--bg-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Schedule Consultation
          </motion.button>
          <motion.button
            className="cta-btn cta-btn--ghost"
            whileHover={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '1.2rem 3.5rem',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              border: '1px solid var(--text-muted)',
              transition: 'all 0.3s',
            }}
          >
            Download Brochure
          </motion.button>
        </motion.div>

        <motion.div
          className="cta-badges"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {['24/7 Support', 'NDA Protected', 'Free Initial Audit'].map((item) => (
            <div key={item} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="var(--gold)" strokeWidth="1"/>
                <path d="M4 7L6 9L10 5" stroke="var(--gold)" strokeWidth="1.2"/>
              </svg>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-buttons { gap: 0.85rem !important; }
          .cta-btn {
            padding: 1.05rem 2rem !important;
            flex: 1 1 220px;
            max-width: 360px;
          }
          .cta-badges {
            margin-top: 3rem !important;
            gap: 1.25rem 1.75rem !important;
          }
        }
        @media (max-width: 480px) {
          .cta-buttons { flex-direction: column; align-items: stretch; }
          .cta-btn {
            width: 100%;
            max-width: 100%;
            flex: 1 1 auto;
            padding: 1rem 1.5rem !important;
            letter-spacing: 0.15em !important;
          }
          .cta-badges { gap: 1rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
