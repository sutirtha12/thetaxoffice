import { useEffect, useRef, useState } from "react";

/**
 * Loader — premium full-screen 3D loading overlay for "THE TAX OFFICE".
 *
 * Centerpiece: a metallic 3D spinning Rupee (₹) coin built with pure CSS 3D
 * transforms (preserve-3d + perspective). Front face, back face and a ring of
 * thin rim segments give it real coin depth so it reads as a solid coin while
 * it flips, not a flat card. A conic-gradient shine sweep, an SVG progress ring
 * and a monospace 0→100 counter complete the fintech vibe.
 *
 * Contract: <Loader onComplete={() => ...} />
 *  - fixed, full-viewport overlay at z-index 100000
 *  - progress 0→100 over ~2.2s, then fade/scale out (~0.6s)
 *  - calls onComplete?.() once fully gone and renders nothing afterwards.
 */

const FILL_MS = 2200; // 0 → 100 duration
const FADE_MS = 600; // fade/scale-out duration

// Number of thin rim segments used to fake coin thickness.
const RIM_SEGMENTS = 36;

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // "loading" | "fading" | "done"
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Drive the progress counter with requestAnimationFrame (smooth, GPU-friendly).
  useEffect(() => {
    let raf = 0;
    let start = 0;
    let fadeTimer = 0;
    let doneTimer = 0;

    const tick = (now) => {
      if (!start) start = now;
      const elapsed = now - start;
      // easeOutCubic so the counter decelerates as it approaches 100.
      const t = Math.min(elapsed / FILL_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Begin fade-out, then unmount + notify.
        fadeTimer = window.setTimeout(() => setPhase("fading"), 140);
        doneTimer = window.setTimeout(() => {
          setPhase("done");
          onCompleteRef.current?.();
        }, 140 + FADE_MS);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  // After the fade-out completes, render nothing so it can never block the page.
  if (phase === "done") return null;

  // SVG progress ring geometry.
  const R = 130;
  const CIRC = 2 * Math.PI * R;
  const dashoffset = CIRC * (1 - progress / 100);

  return (
    <div
      className={`txo-loader${phase === "fading" ? " txo-loader--out" : ""}`}
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <style>{loaderCSS}</style>

      {/* ambient backdrop glow + grid wash */}
      <div className="txo-ambient" aria-hidden="true" />
      <div className="txo-grid" aria-hidden="true" />

      <div className="txo-stage">
        {/* progress ring sits behind the coin */}
        <svg className="txo-ring" width="320" height="320" viewBox="0 0 320 320" aria-hidden="true">
          <defs>
            <linearGradient id="txoRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-light)" />
              <stop offset="55%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
            <filter id="txoRingGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* track */}
          <circle cx="160" cy="160" r={R} className="txo-ring-track" />
          {/* progress */}
          <circle
            cx="160"
            cy="160"
            r={R}
            className="txo-ring-fill"
            stroke="url(#txoRingGrad)"
            filter="url(#txoRingGlow)"
            strokeDasharray={CIRC}
            strokeDashoffset={dashoffset}
          />
        </svg>

        {/* 3D coin */}
        <div className="txo-coin-perspective" aria-hidden="true">
          <div className="txo-coin">
            {/* rim segments — faked thickness around the coin's edge */}
            {Array.from({ length: RIM_SEGMENTS }).map((_, i) => (
              <span
                key={i}
                className="txo-rim"
                style={{ transform: `rotateY(${(360 / RIM_SEGMENTS) * i}deg) translateZ(127px)` }}
              />
            ))}

            {/* front face */}
            <div className="txo-face txo-face--front">
              <div className="txo-face-sheen" />
              <div className="txo-shine" />
              <span className="txo-symbol">₹</span>
            </div>

            {/* back face */}
            <div className="txo-face txo-face--back">
              <div className="txo-face-sheen" />
              <div className="txo-shine txo-shine--rev" />
              <span className="txo-symbol">₹</span>
            </div>
          </div>
        </div>
      </div>

      {/* counter + labels */}
      <div className="txo-readout">
        <div className="txo-count">
          <span className="txo-count-num">{String(progress).padStart(3, "0")}</span>
          <span className="txo-count-pct">%</span>
        </div>
        <div className="txo-brand">THE&nbsp;TAX&nbsp;OFFICE</div>
        <div className="txo-status">
          <span className="txo-dot" />
          LOADING
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* All styles scoped under .txo-loader so nothing leaks into the site.     */
/* Animations touch only transform / opacity for 60fps GPU compositing.    */
/* ----------------------------------------------------------------------- */
const loaderCSS = `
.txo-loader {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 38px;
  background:
    radial-gradient(120% 120% at 50% 38%, var(--bg-secondary, #090b16) 0%, var(--bg-primary, #06070f) 62%),
    var(--bg-primary, #06070f);
  font-family: var(--font-mono, 'Space Mono', monospace);
  overflow: hidden;
  will-change: opacity, transform;
  transform: scale(1);
  opacity: 1;
  transition: opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1),
              transform ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1),
              filter ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1);
}
.txo-loader--out {
  opacity: 0;
  transform: scale(1.06);
  filter: blur(6px);
  pointer-events: none;
}

/* ambient radial glow that breathes behind everything */
.txo-ambient {
  position: absolute;
  width: 720px;
  height: 720px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%,
      rgba(58, 224, 255, 0.16) 0%,
      rgba(123, 108, 255, 0.12) 34%,
      transparent 68%);
  filter: blur(14px);
  animation: txo-breathe 3.6s ease-in-out infinite;
  pointer-events: none;
}
@keyframes txo-breathe {
  0%, 100% { transform: scale(0.94); opacity: 0.75; }
  50%      { transform: scale(1.08); opacity: 1; }
}

/* faint perspective grid wash for depth */
.txo-grid {
  position: absolute;
  inset: -20%;
  background-image:
    linear-gradient(rgba(58, 224, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(123, 108, 255, 0.05) 1px, transparent 1px);
  background-size: 46px 46px;
  -webkit-mask-image: radial-gradient(circle at 50% 46%, #000 0%, transparent 64%);
  mask-image: radial-gradient(circle at 50% 46%, #000 0%, transparent 64%);
  animation: txo-drift 9s linear infinite;
  pointer-events: none;
}
@keyframes txo-drift {
  from { transform: translateY(0); }
  to   { transform: translateY(46px); }
}

/* stage holds ring + coin, centered */
.txo-stage {
  position: relative;
  width: 320px;
  height: 320px;
  display: grid;
  place-items: center;
}

/* progress ring */
.txo-ring {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}
.txo-ring-track {
  fill: none;
  stroke: rgba(135, 143, 176, 0.16);
  stroke-width: 2.5;
}
.txo-ring-fill {
  fill: none;
  stroke-width: 3.5;
  stroke-linecap: round;
  transition: stroke-dashoffset 90ms linear;
}

/* ----- 3D COIN ----- */
.txo-coin-perspective {
  perspective: 1100px;
  width: 220px;
  height: 220px;
  display: grid;
  place-items: center;
  filter:
    drop-shadow(0 0 26px rgba(58, 224, 255, 0.45))
    drop-shadow(0 0 60px rgba(123, 108, 255, 0.30));
}
.txo-coin {
  position: relative;
  width: 220px;
  height: 220px;
  transform-style: preserve-3d;
  animation: txo-flip 3.4s linear infinite;
  will-change: transform;
}
@keyframes txo-flip {
  from { transform: rotateY(0deg)   rotateX(8deg); }
  to   { transform: rotateY(360deg) rotateX(8deg); }
}

/* coin faces */
.txo-face {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: 2px solid rgba(138, 241, 255, 0.55);
  background:
    radial-gradient(circle at 34% 28%,
      rgba(138, 241, 255, 0.35) 0%,
      rgba(58, 224, 255, 0.10) 24%,
      transparent 46%),
    radial-gradient(circle at 70% 78%,
      rgba(123, 108, 255, 0.30) 0%,
      transparent 50%),
    conic-gradient(from 220deg at 50% 50%,
      #0c1124 0deg,
      #1a2546 70deg,
      #0a1020 150deg,
      #222f5a 230deg,
      #0c1124 360deg);
  box-shadow:
    inset 0 0 28px rgba(58, 224, 255, 0.25),
    inset 0 0 60px rgba(6, 7, 15, 0.85);
}
.txo-face--front { transform: translateZ(8px); }
.txo-face--back  { transform: rotateY(180deg) translateZ(8px); }

/* soft metallic sheen highlight on each face */
.txo-face-sheen {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.22) 0%,
    transparent 32%,
    transparent 64%,
    rgba(123, 108, 255, 0.18) 100%);
  mix-blend-mode: screen;
  pointer-events: none;
}

/* rotating conic shine sweep across the face */
.txo-shine {
  position: absolute;
  inset: -25%;
  border-radius: 50%;
  background: conic-gradient(from 0deg,
    transparent 0deg,
    rgba(138, 241, 255, 0.55) 28deg,
    transparent 70deg,
    transparent 200deg,
    rgba(169, 155, 255, 0.40) 250deg,
    transparent 300deg);
  mix-blend-mode: screen;
  opacity: 0.85;
  animation: txo-sweep 2.4s linear infinite;
  pointer-events: none;
}
.txo-shine--rev { animation-direction: reverse; }
@keyframes txo-sweep {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* embossed glowing ₹ */
.txo-symbol {
  position: relative;
  font-family: var(--font-display, 'Poppins', sans-serif);
  font-weight: 700;
  font-size: 116px;
  line-height: 1;
  letter-spacing: -2px;
  color: var(--text-primary, #eaf0ff);
  background: linear-gradient(160deg,
    var(--accent-light, #8af1ff) 0%,
    var(--accent, #3ae0ff) 42%,
    var(--accent-2, #7b6cff) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 26px rgba(58, 224, 255, 0.55);
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.55));
  animation: txo-symbol-pulse 2.2s ease-in-out infinite;
}
@keyframes txo-symbol-pulse {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(58, 224, 255, 0.45)) drop-shadow(0 2px 1px rgba(0,0,0,0.55)); }
  50%      { filter: drop-shadow(0 0 22px rgba(138, 241, 255, 0.85)) drop-shadow(0 2px 1px rgba(0,0,0,0.55)); }
}

/* rim segments — many thin slabs arranged around the edge to fake thickness */
.txo-rim {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 220px;
  margin-left: -8px;
  margin-top: -110px;
  border-radius: 2px;
  background: linear-gradient(90deg,
    #05070e 0%,
    #1d294d 38%,
    #3a5a8c 50%,
    #1d294d 62%,
    #05070e 100%);
  box-shadow: inset 0 0 6px rgba(58, 224, 255, 0.30);
}

/* ----- READOUT ----- */
.txo-readout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}
.txo-count {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-family: var(--font-mono, 'Space Mono', monospace);
  color: var(--text-primary, #eaf0ff);
}
.txo-count-num {
  font-size: 46px;
  font-weight: 700;
  letter-spacing: 2px;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 18px rgba(58, 224, 255, 0.35);
}
.txo-count-pct {
  font-size: 20px;
  color: var(--accent, #3ae0ff);
  transform: translateY(-2px);
}
.txo-brand {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.42em;
  color: var(--text-secondary, #868fb0);
  padding-left: 0.42em; /* compensate trailing letter-spacing */
}
.txo-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  color: var(--text-muted, #474d6b);
}
.txo-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent, #3ae0ff);
  box-shadow: 0 0 10px var(--accent, #3ae0ff);
  animation: txo-blink 1.1s ease-in-out infinite;
}
@keyframes txo-blink {
  0%, 100% { opacity: 0.25; transform: scale(0.8); }
  50%      { opacity: 1;    transform: scale(1.15); }
}

/* respect reduced-motion: kill spins/sweeps, keep the coin + progress legible */
@media (prefers-reduced-motion: reduce) {
  .txo-coin { animation: none; transform: rotateX(8deg); }
  .txo-shine, .txo-ambient, .txo-grid, .txo-symbol, .txo-dot { animation: none; }
  .txo-loader { transition: opacity ${FADE_MS}ms ease; }
  .txo-loader--out { transform: none; filter: none; }
}
`;
