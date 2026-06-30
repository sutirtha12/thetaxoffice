import { motion } from 'framer-motion'

const clients = [
  'Goldman Sachs', 'McKinsey & Co', 'Deloitte', 'BlackRock',
  'JPMorgan Chase', 'Berkshire Hathaway', 'Morgan Stanley', 'KPMG',
  'Ernst & Young', 'PwC', 'Bain Capital', 'Citadel',
]

function TickerRow({ direction = 'left', speed = 30 }) {
  const items = [...clients, ...clients]

  return (
    <div className="ticker-row" style={{
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '1.2rem 0',
      borderTop: '1px solid var(--border)',
    }}>
      <motion.div
        className="ticker-track"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'inline-flex', gap: '4rem', alignItems: 'center' }}
      >
        {items.map((client, i) => (
          <span
            key={i}
            className="ticker-item"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
              color: 'var(--text-secondary)',
              opacity: 0.6,
              letterSpacing: '-0.02em',
              transition: 'opacity 0.3s, color 0.3s',
              cursor: 'default',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.target.style.opacity = '1'; e.target.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.target.style.opacity = '0.4'; e.target.style.color = 'var(--text-muted)' }}
          >
            {client}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Ticker() {
  return (
    <section className="ticker-section" style={{
      padding: '4rem 0',
      background: 'var(--bg-primary)',
      position: 'relative',
    }}>
      <div className="container" style={{ marginBottom: '2rem' }}>
        <div className="section-label">Trusted by Industry Leaders</div>
      </div>
      <TickerRow direction="left" speed={35} />
      <TickerRow direction="right" speed={40} />
      <div style={{
        borderBottom: '1px solid var(--border)',
      }} />

      <style>{`
        @media (max-width: 768px) {
          .ticker-section { padding: 3rem 0 !important; }
          .ticker-row { padding: 0.9rem 0 !important; }
          .ticker-track { gap: 2.6rem !important; }
          .ticker-item { font-size: 1.05rem !important; }
        }
        @media (max-width: 480px) {
          .ticker-section { padding: 2.5rem 0 !important; }
          .ticker-track { gap: 2rem !important; }
          .ticker-item { font-size: 0.9rem !important; }
        }
      `}</style>
    </section>
  )
}
