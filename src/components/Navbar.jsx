import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const v = window.scrollY > 2600
      setVisible(v)
      if (!v) setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Services', 'About', 'Testimonials', 'Contact']

  return (
    <>
      <motion.nav
        className="floating-nav"
        initial={{ y: -90, opacity: 0, x: '-50%' }}
        animate={visible ? { y: 0, opacity: 1, x: '-50%' } : { y: -90, opacity: 0, x: '-50%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: '1.1rem',
          left: '50%',
          zIndex: 1000,
          pointerEvents: visible ? 'auto' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '1.3rem',
          padding: '0.4rem 0.45rem 0.4rem 1.15rem',
          maxWidth: '92vw',
          background: 'rgba(9, 11, 22, 0.62)',
          backdropFilter: 'blur(20px) saturate(170%)',
          WebkitBackdropFilter: 'blur(20px) saturate(170%)',
          border: '1px solid var(--glass-border)',
          borderRadius: '999px',
          boxShadow:
            '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px rgba(58,224,255,0.06)',
        }}
      >
        {/* Brand */}
        <a
          href="#"
          className="nav-brand"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-display)',
            fontSize: '0.84rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="2" width="10" height="10" stroke="var(--accent)" strokeWidth="2" />
            <rect x="16" y="2" width="10" height="10" fill="var(--accent)" />
            <rect x="2" y="16" width="10" height="10" fill="var(--accent)" opacity="0.4" />
            <rect x="16" y="16" width="10" height="10" stroke="var(--accent)" strokeWidth="2" />
          </svg>
          The <span style={{ color: 'var(--accent)' }}>Tax</span> Office
        </a>

        <span className="nav-div" style={{ width: 1, height: 18, background: 'var(--glass-border)' }} />

        {/* Desktop links */}
        <ul
          className="nav-links"
          style={{ display: 'flex', listStyle: 'none', gap: '1.35rem', margin: 0 }}
        >
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  transition: 'color 0.3s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <motion.button
          className="nav-cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '0.55rem 1.25rem',
            background: 'linear-gradient(120deg, var(--accent), var(--accent-2))',
            color: '#04101a',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 700,
            borderRadius: '999px',
            whiteSpace: 'nowrap',
          }}
        >
          Book a Call
        </motion.button>

        {/* Mobile hamburger */}
        <button
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="13" x2="21" y2="13" />
                <line x1="3" y1="19" x2="15" y2="19" />
              </>
            )}
          </svg>
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {visible && menuOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="nav-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="nav-mobile-cta" onClick={() => setMenuOpen(false)}>
              Book a Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: rgba(58, 224, 255, 0.08);
          border: 1px solid var(--glass-border);
        }
        .nav-mobile-menu {
          position: fixed;
          top: 4.1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999;
          width: min(88vw, 340px);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.7rem;
          background: rgba(9, 11, 22, 0.92);
          backdrop-filter: blur(22px) saturate(170%);
          -webkit-backdrop-filter: blur(22px) saturate(170%);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          box-shadow: 0 24px 70px rgba(0,0,0,0.6);
        }
        .nav-mobile-link {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-secondary);
          padding: 0.95rem 1rem;
          border-radius: 12px;
          transition: background 0.2s, color 0.2s;
        }
        .nav-mobile-link:hover, .nav-mobile-link:active {
          background: rgba(58, 224, 255, 0.08);
          color: var(--accent);
        }
        .nav-mobile-cta {
          margin-top: 0.35rem;
          padding: 0.95rem 1rem;
          background: linear-gradient(120deg, var(--accent), var(--accent-2));
          color: #04101a;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          border-radius: 12px;
        }

        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-links, .nav-div, .nav-cta { display: none !important; }
          .nav-burger { display: flex !important; }
          .floating-nav {
            gap: 0.7rem !important;
            padding: 0.4rem 0.4rem 0.4rem 1rem !important;
          }
          .nav-brand { font-size: 0.8rem !important; }
        }
        @media (max-width: 480px) {
          .nav-brand { font-size: 0.74rem !important; gap: 0.4rem !important; }
          .floating-nav { gap: 0.55rem !important; }
        }
      `}</style>
    </>
  )
}
