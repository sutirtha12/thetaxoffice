import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ------------------------------------------------------------------ */
/* Mini accounting visualisations (SVG)                                */
/* ------------------------------------------------------------------ */

function MiniBars({ data = [42, 58, 50, 72, 64, 88] }) {
  const max = Math.max(...data)
  const n = data.length
  const gap = 9
  const w = (220 - (n - 1) * gap) / n
  return (
    <svg className="svc-chart" viewBox="0 0 220 120" preserveAspectRatio="xMidYMid meet">
      <line x1="0" y1="104" x2="220" y2="104" stroke="rgba(135,143,176,0.2)" strokeWidth="1" />
      {data.map((v, i) => {
        const h = (v / max) * 86
        return (
          <rect
            key={i}
            className="svc-bar"
            x={i * (w + gap)}
            y={104 - h}
            width={w}
            height={h}
            rx="3"
            fill="url(#svcGrad)"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        )
      })}
    </svg>
  )
}

function MiniArea({ data = [30, 40, 36, 52, 48, 66, 60, 82] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const W = 220
  const H = 112
  const n = data.length
  const x = (i) => i * (W / (n - 1))
  const y = (v) => H - 10 - ((v - min) / (max - min || 1)) * (H - 30)
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${W} ${H} L0 ${H} Z`
  return (
    <svg className="svc-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <path d={area} fill="url(#svcArea)" />
      <path className="svc-line" d={line} fill="none" stroke="url(#svcGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x(n - 1)} cy={y(data[n - 1])} r="4.5" fill="var(--accent-light)" />
      <circle cx={x(n - 1)} cy={y(data[n - 1])} r="9" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

function MiniRing({ pct = 80, label = 'complete' }) {
  const R = 46
  const C = 2 * Math.PI * R
  const off = C * (1 - pct / 100)
  return (
    <svg className="svc-chart" viewBox="0 0 120 132" preserveAspectRatio="xMidYMid meet">
      <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(135,143,176,0.15)" strokeWidth="8" />
      <circle
        cx="60" cy="60" r={R} fill="none" stroke="url(#svcGrad)" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={C} strokeDashoffset={off} transform="rotate(-90 60 60)"
      />
      <text x="60" y="58" textAnchor="middle" className="svc-ring-num">
        {pct}<tspan className="svc-ring-pct" dy="-8">%</tspan>
      </text>
      <text x="60" y="78" textAnchor="middle" className="svc-ring-lbl">{label}</text>
    </svg>
  )
}

function MiniDonut({ center = 'OK', segs = [{ v: 64, c: 'url(#svcGrad)' }, { v: 22, c: '#7b6cff' }, { v: 14, c: 'rgba(135,143,176,0.25)' }] }) {
  const R = 44
  const C = 2 * Math.PI * R
  let start = 0
  return (
    <svg className="svc-chart" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet">
      <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(135,143,176,0.12)" strokeWidth="14" />
      {segs.map((s, i) => {
        const dash = (C * s.v) / 100
        const offset = -((C * start) / 100)
        start += s.v
        return (
          <circle
            key={i} cx="60" cy="60" r={R} fill="none" stroke={s.c} strokeWidth="14"
            strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={offset} transform="rotate(-90 60 60)"
          />
        )
      })}
      <text x="60" y="64" textAnchor="middle" className="svc-donut-c">{center}</text>
    </svg>
  )
}

function IdCard({ tag = 'PAN' }) {
  return (
    <svg className="svc-chart" viewBox="0 0 220 132" preserveAspectRatio="xMidYMid meet">
      <rect x="8" y="14" width="204" height="104" rx="12" fill="rgba(58,224,255,0.05)" stroke="var(--border-hover)" />
      <rect x="22" y="34" width="46" height="46" rx="10" fill="url(#svcGrad)" opacity="0.55" />
      <rect x="84" y="36" width="112" height="10" rx="5" fill="rgba(234,240,255,0.5)" />
      <rect x="84" y="54" width="80" height="8" rx="4" fill="rgba(135,143,176,0.5)" />
      <rect x="22" y="92" width="174" height="8" rx="4" fill="rgba(135,143,176,0.32)" />
      <text x="196" y="28" textAnchor="end" className="svc-idtag">{tag}</text>
    </svg>
  )
}

function SignMark() {
  return (
    <svg className="svc-chart" viewBox="0 0 220 120" preserveAspectRatio="xMidYMid meet">
      <path className="svc-line" d="M18 80 C38 40, 58 102, 78 70 S118 28, 138 74 C148 90, 160 60, 176 66" fill="none" stroke="url(#svcGrad)" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="98" x2="150" y2="98" stroke="rgba(135,143,176,0.3)" strokeWidth="1.5" />
      <circle cx="186" cy="40" r="16" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <path d="M179 40 l5 5 l9 -11" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Chart({ s }) {
  switch (s.chart) {
    case 'bars': return <MiniBars data={s.data} />
    case 'area': return <MiniArea data={s.data} />
    case 'ring': return <MiniRing pct={s.ringPct} label={s.ringLabel} />
    case 'donut': return <MiniDonut center={s.center} segs={s.segs} />
    case 'idcard': return <IdCard tag={s.cat} />
    case 'sign': return <SignMark />
    default: return null
  }
}

/* ------------------------------------------------------------------ */
/* Service data — all 14 services, paired into 7 stacking rows         */
/* ------------------------------------------------------------------ */

const PAIRS = [
  [
    { n: '01', cat: 'Income Tax', title: 'Income Tax Filing', desc: 'ITR-1 to ITR-4 — optimised, accurate, penalty-free.', chart: 'bars', data: [42, 58, 50, 72, 64, 88], stat: ['₹48k', 'avg. saved'] },
    { n: '02', cat: 'GST', title: 'GST Registration', desc: 'Your GSTIN secured in days, not weeks.', chart: 'ring', ringPct: 92, ringLabel: 'approval', stat: ['3 days', 'turnaround'] },
  ],
  [
    { n: '03', cat: 'TDS', title: 'TDS Refund Claim', desc: 'PF, FD & salary TDS — recovered in full.', chart: 'ring', ringPct: 78, ringLabel: 'recovered', stat: ['₹1.2L', 'refunded'] },
    { n: '04', cat: 'GST', title: 'Annual Return · GSTR-9 & 9C', desc: 'Reconciled, certified and audit-ready.', chart: 'donut', center: 'GSTR-9', segs: [{ v: 70, c: 'url(#svcGrad)' }, { v: 20, c: '#7b6cff' }, { v: 10, c: 'rgba(135,143,176,0.25)' }], stat: ['100%', 'reconciled'] },
  ],
  [
    { n: '05', cat: 'GST', title: 'E-Way Bill & E-Invoice', desc: 'Generated around the clock, 24×7.', chart: 'area', data: [28, 40, 34, 52, 46, 66, 58, 80], stat: ['24×7', 'generation'] },
    { n: '06', cat: 'Books', title: 'Bookkeeping · Tally', desc: 'Clean, reconciled books every single month.', chart: 'bars', data: [60, 52, 70, 64, 80, 74], stat: ['12 / yr', 'closings'] },
  ],
  [
    { n: '07', cat: 'Reports', title: 'Balance Sheet & P&L', desc: 'Statements prepared, finalised and signed.', chart: 'area', data: [44, 50, 47, 60, 56, 70, 66], stat: ['FY 25-26', 'ready'] },
    { n: '08', cat: 'Audit', title: 'CA Certified Audit', desc: 'Signed, compliant and fully defensible.', chart: 'ring', ringPct: 100, ringLabel: 'certified', stat: ['CA', 'attested'] },
  ],
  [
    { n: '09', cat: 'PAN', title: 'PAN Registration', desc: 'New PAN applications and corrections.', chart: 'idcard', stat: ['48 hrs', 'issued'] },
    { n: '10', cat: 'TAN', title: 'TAN Registration', desc: 'Deductor TAN, filed the same week.', chart: 'idcard', stat: ['e-TAN', 'same week'] },
  ],
  [
    { n: '11', cat: 'DSC', title: 'Digital Signature', desc: 'Class-3 DSC issuance, fast and secure.', chart: 'sign', stat: ['Class 3', 'verified'] },
    { n: '12', cat: 'MSME', title: 'MSME / UDYAM', desc: 'Register and unlock every MSME benefit.', chart: 'area', data: [20, 30, 27, 44, 52, 60, 74], stat: ['+34%', 'perks unlocked'] },
  ],
  [
    { n: '13', cat: 'Licence', title: 'Trade Licence · Shop Act', desc: 'Operate fully legal from day one.', chart: 'ring', ringPct: 85, ringLabel: 'filed', stat: ['Shop Act', 'registered'] },
    { n: '14', cat: 'FSSAI', title: 'FSSAI Registration', desc: 'Food-business licence, certified.', chart: 'donut', center: 'FSSAI', segs: [{ v: 80, c: 'url(#svcGrad)' }, { v: 12, c: '#7b6cff' }, { v: 8, c: 'rgba(135,143,176,0.25)' }], stat: ['Licensed', 'compliant'] },
  ],
]

function ServiceCard({ s }) {
  return (
    <div className="svc-card">
      <div className="svc-card__top">
        <span className="svc-num">{s.n}</span>
        <span className="svc-tag">{s.cat}</span>
      </div>
      <h3 className="svc-title">{s.title}</h3>
      <p className="svc-desc">{s.desc}</p>
      <div className="svc-chartwrap">
        <Chart s={s} />
      </div>
      <div className="svc-card__foot">
        <div className="svc-kpi">
          <span className="svc-kpi__v">{s.stat[0]}</span>
          <span className="svc-kpi__l">{s.stat[1]}</span>
        </div>
        <a className="svc-go">
          Get Started <span>→</span>
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  const headRef = useRef(null)
  const sectionRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={sectionRef} className="svc-section">
      {/* shared gradient defs */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="svcGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7b6cff" />
            <stop offset="55%" stopColor="#3ae0ff" />
            <stop offset="100%" stopColor="#8af1ff" />
          </linearGradient>
          <linearGradient id="svcArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(58,224,255,0.34)" />
            <stop offset="100%" stopColor="rgba(58,224,255,0)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container svc-head" ref={headRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-label"
        >
          What We Do
        </motion.div>
        <div className="svc-head__row">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="svc-head__title"
          >
            Precision-Crafted<br />
            <span className="svc-head__accent">Financial Solutions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="svc-head__sub"
          >
            Fourteen services across GST, income tax, registrations and compliance —
            each one engineered to move your numbers in the right direction.
            Scroll to deal them out, two at a time.
          </motion.p>
        </div>
      </div>

      <div className="svc-stack">
        {PAIRS.map((pair, i) => (
          <div className="svc-panel" key={i} style={{ '--i': i, zIndex: i + 1 }}>
            <div className="container svc-row">
              <ServiceCard s={pair[0]} />
              <ServiceCard s={pair[1]} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .svc-section { position: relative; background: var(--bg-primary); padding: clamp(5rem,9vw,8rem) 0 clamp(8rem,16vh,13rem); }
        .svc-head { margin-bottom: clamp(2.5rem,5vw,4.5rem); }
        .svc-head__row { display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem; flex-wrap: wrap; }
        .svc-head__title { font-family: var(--font-display); font-weight: 600; font-size: clamp(2.2rem,4.5vw,3.8rem); line-height: 1.05; letter-spacing: -0.03em; color: var(--text-primary); }
        .svc-head__accent { background: linear-gradient(120deg, var(--accent-light), var(--accent) 45%, var(--accent-2)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .svc-head__sub { font-family: var(--font-body); font-weight: 300; font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary); max-width: 400px; }

        .svc-stack { position: relative; }
        .svc-panel { position: sticky; top: calc(92px + var(--i) * 12px); padding-bottom: 8vh; }
        .svc-row { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1rem,1.8vw,1.5rem); }

        .svc-card {
          position: relative; overflow: hidden; isolation: isolate;
          display: flex; flex-direction: column;
          height: clamp(360px, 56vh, 500px);
          padding: clamp(1.6rem,2.4vw,2.4rem);
          border-radius: 22px;
          background: linear-gradient(165deg, #10142a, #090b16);
          border: 1px solid var(--border);
          box-shadow: 0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05);
          transform-origin: center top;
        }
        .svc-card::after { content:''; position:absolute; right:-50px; top:-50px; width:190px; height:190px; border-radius:50%; background: radial-gradient(circle, var(--accent-glow), transparent 70%); pointer-events:none; z-index:-1; }
        .svc-card__top { display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.1rem; }
        .svc-num { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent); letter-spacing: 0.1em; }
        .svc-tag { font-family: var(--font-mono); font-size: 0.55rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-secondary); border: 1px solid var(--border); padding: 0.32rem 0.7rem; border-radius: 999px; }
        .svc-title { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.35rem,2vw,1.85rem); letter-spacing: -0.02em; color: #fff; margin-bottom: 0.45rem; }
        .svc-desc { font-family: var(--font-body); font-weight: 300; font-size: 0.9rem; line-height: 1.55; color: var(--text-secondary); max-width: 38ch; }
        .svc-chartwrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 1rem 0; min-height: 0; }
        .svc-chart { width: 100%; height: 100%; max-height: 190px; overflow: visible; }
        .svc-card__foot { display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; }
        .svc-kpi { display: flex; flex-direction: column; }
        .svc-kpi__v { font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; line-height: 1; background: linear-gradient(120deg, var(--accent-light), var(--accent-2)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .svc-kpi__l { font-family: var(--font-mono); font-size: 0.55rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-top: 0.35rem; }
        .svc-go { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; color: #fff; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; transition: gap 0.3s, color 0.3s; }
        .svc-go span { color: var(--accent); transition: transform 0.3s; }
        .svc-go:hover { color: var(--accent); }
        .svc-go:hover span { transform: translateX(4px); }

        .svc-bar { transform-box: fill-box; transform-origin: bottom; animation: svcGrow 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes svcGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .svc-ring-num { fill: #fff; font-family: var(--font-display); font-weight: 700; font-size: 25px; }
        .svc-ring-pct { fill: var(--accent); font-size: 12px; }
        .svc-ring-lbl { fill: var(--text-secondary); font-family: var(--font-mono); font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; }
        .svc-donut-c { fill: #fff; font-family: var(--font-mono); font-size: 13px; font-weight: 700; letter-spacing: 0.5px; }
        .svc-idtag { fill: var(--accent); font-family: var(--font-mono); font-size: 11px; font-weight: 700; letter-spacing: 2px; }
        .svc-line { stroke-dasharray: 600; animation: svcDraw 1.6s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes svcDraw { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }

        @media (max-width: 820px) {
          .svc-head__row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.2rem;
          }
          .svc-head__title { text-align: center; }
          .svc-head__sub { max-width: 100%; text-align: center; }

          .svc-stack { padding: 0 clamp(1.1rem, 5vw, 2rem); }
          .svc-panel { display: contents; }
          .svc-row { display: contents; }
          .svc-card {
            position: sticky;
            top: 80px;
            height: auto;
            min-height: auto;
            margin-bottom: 7vh;
            padding: 1.5rem 1.4rem;
            border-radius: 18px;
            text-align: center;
            align-items: center;
          }
          .svc-card:last-child { margin-bottom: 0; }
          .svc-card__top { justify-content: center; gap: 0.8rem; }
          .svc-title { font-size: 1.35rem; }
          .svc-desc { max-width: 100%; text-align: center; }
          .svc-chart { max-height: 150px; }
          .svc-card__foot { flex-direction: column; align-items: center; gap: 1rem; }
        }
      `}</style>
    </section>
  )
}
