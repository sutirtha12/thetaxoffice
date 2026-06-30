import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{
      padding: '4rem 0 2rem',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}>
          <div className="footer-brand">
            <a href="#" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1rem',
            }}>
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="2" width="10" height="10" stroke="var(--accent)" strokeWidth="1.5"/>
                <rect x="16" y="2" width="10" height="10" fill="var(--accent)"/>
                <rect x="2" y="16" width="10" height="10" fill="var(--accent)" opacity="0.4"/>
                <rect x="16" y="16" width="10" height="10" stroke="var(--accent)" strokeWidth="1.5"/>
              </svg>
              The <span style={{ color: 'var(--accent)' }}>Tax</span> Office
            </a>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: '280px',
            }}>
              Transforming financial complexity into strategic clarity since 2019.
            </p>
          </div>

          {[
            {
              title: 'Services',
              links: ['Tax Strategy', 'Audit & Assurance', 'Financial Advisory', 'Wealth Management'],
            },
            {
              title: 'Company',
              links: ['About Us', 'Our Team', 'Careers', 'Press'],
            },
            {
              title: 'Connect',
              links: ['LinkedIn', 'Twitter/X', 'contact@thetaxoffice.com', '+1 (512) 555-0147'],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '1.2rem',
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom" style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
          }}>
            © 2026 The Tax Office. All rights reserved.
          </span>
          <div className="footer-legal" style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.25rem 1.5rem !important;
            margin-bottom: 3rem !important;
          }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom {
            justify-content: flex-start !important;
            gap: 1.25rem !important;
          }
          .footer-legal { gap: 1.5rem !important; flex-wrap: wrap; }
        }
        @media (max-width: 480px) {
          .footer-grid { gap: 2rem 1.25rem !important; }
        }
      `}</style>
    </footer>
  )
}
