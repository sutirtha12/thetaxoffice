import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 15, suffix: '+', label: 'Years of Excellence', desc: 'Decades of navigating financial complexities' },
  { value: 500, suffix: '+', label: 'Global Clients', desc: 'From startups to Fortune 500 companies' },
  { value: 98, suffix: '%', label: 'Success Rate', desc: 'Audit outcomes meeting or exceeding targets' },
  { value: 2, suffix: '.4B', prefix: '₹', label: 'Assets Under Advisory', desc: 'Total value of portfolios we manage' },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} style={{
      padding: 'clamp(5rem, 10vw, 8rem) 0',
      background: 'var(--bg-secondary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(90deg, var(--border) 1px, transparent 1px),
          linear-gradient(0deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity: 0.3,
      }} />

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        border: '1px solid var(--border)',
        opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        border: '1px solid var(--border)',
        opacity: 0.3,
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-label"
            style={{ justifyContent: 'center' }}
          >
            Impact in Numbers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
            }}
          >
            Results That <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Speak</span>
          </motion.h2>
        </div>

        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2px',
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stats-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: 'clamp(2rem, 3vw, 3rem)',
                background: 'rgba(15,15,15,0.8)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div className="stats-number" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                color: 'var(--gold)',
                lineHeight: 1,
                marginBottom: '0.8rem',
                letterSpacing: '-0.03em',
              }}>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix || ''}
                />
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
              }}>
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-card { padding: 1.8rem 1rem !important; }
          .stats-number { font-size: 2rem !important; }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1px !important;
          }
          .stats-card { padding: 1.4rem 0.6rem !important; }
          .stats-number { font-size: 1.6rem !important; }
        }
      `}</style>
    </section>
  )
}
