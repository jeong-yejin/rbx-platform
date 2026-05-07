import { useState, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Ripple } from '@/components/ui/ripple';
import LandingNav from '../components/LandingNav';
import { EXCHANGES } from '../data';

interface Props { onEnterPlatform: () => void; }

const fmt    = (n: number, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtVol = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000).toFixed(0)}k`;

const VISIBLE_EXCHANGES = EXCHANGES.filter(e => !e.comingSoon && !e.noFee).slice(0, 5);

const HOW_STEPS = [
  { title: 'Connect your exchange', desc: 'Sign up through ReboundX, complete KYC, link your UID.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { title: 'Trade on the exchange', desc: 'Place trades like you normally would. We track your fees.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 17l5-5 4 4 9-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 7h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title: 'Receive in your wallet', desc: 'Rebates are sent to your wallet on every settlement day.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M3 10h18M16 15h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
];

const FAQ_ITEMS = [
  { q: 'What is a fee rebate?', a: 'A fee rebate is a partial refund of the trading fees you pay to an exchange. ReboundX partners with exchanges to negotiate rebates and routes them back to you on every settlement.' },
  { q: 'Do I trade on ReboundX?', a: 'No. You trade directly on the partner exchange as usual. ReboundX only tracks the trades made under your linked UID and processes the rebate.' },
  { q: 'When are rebates paid?', a: 'Rebates settle once per cycle (typically weekly, on Mondays) and are sent directly to the wallet you specify in your account.' },
  { q: 'How does ReboundX make money?', a: 'We retain a small portion of the negotiated rebate from the exchange. You always see the net rate before signing up — no hidden cuts.' },
  { q: 'Can I use my existing exchange account?', a: 'For most partners, you need to register through our referral link to be eligible. Some exchanges support attaching an existing UID — check the partner page for details.' },
  { q: 'Is my wallet data safe?', a: 'We never request withdrawal permission. Linking is UID- or read-only-API-based. Wallet addresses you provide are used solely for rebate payouts.' },
];

/* ── Hero ─────────────────────────────────────────── */
function Hero({ onEnterPlatform }: { onEnterPlatform: () => void }) {
  return (
    <section className="ln-hero">
      <Ripple numCircles={9} mainCircleSize={260} mainCircleOpacity={0.22} />
      <div className="ln-container ln-hero-inner">
        <h1 className="ln-hero-headline">
          <span className="ln-grad">Get back</span> what you pay<br />
          in trading fees
        </h1>
        <p className="ln-hero-sub">
          Trade on your favorite exchanges.<br />
          Receive rebates straight to your wallet.
        </p>
        <div className="ln-hero-actions">
          <button type="button" className="ln-btn-primary" onClick={onEnterPlatform}>Start Earning</button>
          <a href="#how" className="ln-btn-ghost"
             onClick={(e) => { e.preventDefault(); document.querySelector('#how')?.scrollIntoView({ behavior: 'smooth' }); }}>
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Section 2: Rebate calculator (flow + per-exchange, merged) ── */
function RebateSection({ onEnterPlatform }: { onEnterPlatform: () => void }) {
  const [volume, setVolume] = useState(50_000);
  const [slug, setSlug] = useState(VISIBLE_EXCHANGES[0]?.slug ?? '');
  const ex = VISIBLE_EXCHANGES.find((e) => e.slug === slug) ?? VISIBLE_EXCHANGES[0];
  const fees   = volume * ex.feeRate;
  const rebate = fees * ex.rebateRate;

  return (
    <section id="calculator" className="ln-section ln-flow-section">
      <div className="ln-container">
        <div className="ln-section-head ln-section-head--center">
          <div className="ln-section-label">Fee Rebate Calculator</div>
          <h2 className="ln-section-title">Every trade costs a fee.<br /><span className="ln-accent">We send part of it back.</span></h2>
        </div>

        {/* Flow diagram — live numbers from selected exchange */}
        <div className="ln-flow" aria-label="How fee rebates work">
          <div className="ln-flow-node">
            <div className="ln-flow-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="9" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.4"/>
                <rect x="6" y="5" width="3" height="10" rx="0.5" fill="currentColor" opacity="0.7"/>
                <rect x="11" y="2" width="3" height="13" rx="0.5" fill="currentColor"/>
              </svg>
            </div>
            <div className="ln-flow-title">You Trade</div>
            <div className="ln-flow-val">{fmtVol(volume)}/mo</div>
          </div>
          <svg className="ln-flow-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div className="ln-flow-node">
            <div className="ln-flow-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 14h12M3 6h10M8 2l6 4H2l6-4ZM5 6v8M8 6v8M11 6v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ln-flow-title">{ex.name} Fee</div>
            <div className="ln-flow-val">${fmt(fees)}</div>
          </div>
          <svg className="ln-flow-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div className="ln-flow-node ln-flow-node--rbx">
            <div className="ln-flow-icon ln-flow-icon--accent">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2L14 5.5v5L8 14L2 10.5v-5L8 2Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
                <path d="M8 5.5V10M5.5 7L8 5.5L10.5 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="ln-flow-title">ReboundX</div>
            <div className="ln-flow-val ln-muted">tracks & calculates</div>
          </div>
          <svg className="ln-flow-arrow ln-flow-arrow--accent" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div className="ln-flow-node ln-flow-node--return">
            <div className="ln-flow-icon ln-flow-icon--accent">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
                <circle cx="8" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.25"/>
              </svg>
            </div>
            <div className="ln-flow-title">You Receive</div>
            <div className="ln-flow-val ln-accent-val">${fmt(rebate)}<span>/mo</span></div>
          </div>
        </div>

        {/* Combined calculator card */}
        <div className="ln-calc2">
          <div className="ln-calc2-row">
            <div className="ln-calc2-label">Exchange</div>
            <div className="ln-calc2-chips">
              {VISIBLE_EXCHANGES.map((e) => (
                <button key={e.slug} type="button"
                        className={`ln-chip${slug === e.slug ? ' active' : ''}`}
                        onClick={() => setSlug(e.slug)}>
                  <span className="ln-chip-dot" style={{ background: e.dotColor }} />
                  {e.name}
                </button>
              ))}
            </div>
          </div>

          <div className="ln-calc2-row">
            <div className="ln-calc2-vol-head">
              <span className="ln-calc2-label">Monthly trading volume</span>
              <span className="ln-calc2-vol">${fmt(volume, 0)}</span>
            </div>
            <input type="range" min={1_000} max={1_000_000} step={1_000} value={volume}
                   onChange={(e) => setVolume(Number(e.target.value))}
                   className="ln-slider" aria-label="Monthly volume" />
            <div className="ln-slider-ticks"><span>$1k</span><span>$1M</span></div>
          </div>

          <div className="ln-calc2-result">
            <div className="ln-calc2-result-label">Estimated monthly rebate</div>
            <div className="ln-calc2-result-val">${fmt(rebate)}</div>
            <div className="ln-calc2-result-sub">
              {(ex.rebateRate * 100).toFixed(0)}% back on {ex.name} · {fmtVol(volume)}/mo volume
            </div>
          </div>

          <button type="button" className="ln-btn-primary ln-btn-block" onClick={onEnterPlatform}>
            Start with {ex.name}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Section 3: How it works ── */
function HowItWorks() {
  return (
    <section id="how" className="ln-section">
      <div className="ln-container">
        <div className="ln-section-head ln-section-head--center">
          <h2 className="ln-section-title">How it works</h2>
          <p className="ln-section-sub">Three steps. No surprise.</p>
        </div>

        <div className="ln-step-grid">
          {HOW_STEPS.map((s, i) => (
            <div key={s.title} className="ln-step-card">
              {i > 0 && <div className="ln-step-arrow" aria-hidden="true">›</div>}
              <div className="ln-step-icon">{s.icon}</div>
              <div className="ln-step-title">{s.title}</div>
              <div className="ln-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 5: Partner exchanges ── */
function PartnersSection() {
  return (
    <section id="exchanges" className="ln-section">
      <div className="ln-container">
        <div className="ln-section-head ln-section-head--center">
          <h2 className="ln-section-title">Partner exchanges</h2>
          <p className="ln-section-sub">{VISIBLE_EXCHANGES.length} exchanges. Direct rebates.</p>
        </div>

        <div className="ln-partner-list">
          {VISIBLE_EXCHANGES.map((e) => (
            <div key={e.slug} className="ln-partner-row">
              <div className="ln-partner-avatar" style={{ background: `${e.dotColor}22`, color: e.dotColor }}>
                {e.name[0]}
              </div>
              <div className="ln-partner-meta">
                <div className="ln-partner-name">{e.name}</div>
                <div className="ln-partner-sub">{e.type === 'CEX' ? 'Spot · Futures' : 'Perpetual DEX'}</div>
              </div>
              <div className="ln-partner-rate">Up to {(e.rebateRate * 100).toFixed(0)}%</div>
              <a href="#" className="ln-partner-link" onClick={(ev) => ev.preventDefault()}>View guide →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 6: Built to be verifiable (bento grid) ── */
function VerifySection() {
  const YOURS = [62, 95, 78, 111, 127, 108, 138, 174];
  const AVG   = [38, 51, 44,  66,  74,  62,  82,  96];
  const Y_TICKS = [50, 100, 150, 200];

  const VW = 400, VH = 180;
  const P = { t: 16, r: 16, b: 32, l: 42 };
  const cW = VW - P.l - P.r;
  const cH = VH - P.t - P.b;
  const Y_MAX = 210;

  const x = (i: number) => P.l + (i / (YOURS.length - 1)) * cW;
  const y = (v: number) => P.t + cH - (v / Y_MAX) * cH;
  const path = (d: number[]) => d.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  const yoursPath = path(YOURS);
  const areaPath  = `${yoursPath} L${x(YOURS.length - 1).toFixed(1)},${(P.t + cH).toFixed(1)} L${P.l},${(P.t + cH).toFixed(1)}Z`;

  return (
    <section className="ln-section ln-section--alt">
      <div className="ln-container">
        <div className="ln-section-head ln-section-head--center">
          <h2 className="ln-section-title">Built to be verifiable</h2>
          <p className="ln-section-sub">Every rebate, traceable to a transaction.</p>
        </div>

        <div className="ln-bento">

          {/* ─── Left large: rebate chart ─── */}
          <div className="ln-bento-card ln-bento-card--large">
            <div className="ln-bento-chart-area">
              <div className="ln-bento-chart-header">
                <span className="ln-bento-chart-label">Your Rebate</span>
                <div className="ln-bento-legend">
                  <span className="ln-bento-legend-item">
                    <span className="ln-bento-legend-sw ln-bento-legend-sw--solid" />
                    Yours
                  </span>
                  <span className="ln-bento-legend-item">
                    <span className="ln-bento-legend-sw ln-bento-legend-sw--dash" />
                    Market avg
                  </span>
                </div>
              </div>

              <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" aria-hidden="true">
                <defs>
                  <linearGradient id="bento-area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* grid + y labels */}
                {Y_TICKS.map((t) => (
                  <g key={t}>
                    <line x1={P.l} y1={y(t)} x2={VW - P.r} y2={y(t)}
                          stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                    <text x={P.l - 7} y={y(t) + 4}
                          fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="end">
                      ${t}
                    </text>
                  </g>
                ))}

                {/* x labels */}
                {['May 1', 'May 30'].map((label, i) => (
                  <text key={label} x={i === 0 ? P.l : x(YOURS.length - 1)} y={VH - 6}
                        fill="rgba(255,255,255,0.25)" fontSize="10"
                        textAnchor={i === 0 ? 'start' : 'end'}>
                    {label}
                  </text>
                ))}

                {/* area */}
                <path d={areaPath} fill="url(#bento-area-grad)" />

                {/* avg dashed */}
                <path d={path(AVG)} fill="none"
                      stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />

                {/* your rebate line */}
                <path d={yoursPath} fill="none"
                      stroke="var(--accent)" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />

                {/* end dot */}
                <circle cx={x(YOURS.length - 1)} cy={y(YOURS[YOURS.length - 1])}
                        r="4" fill="var(--accent)" stroke="var(--bg-2)" strokeWidth="2" />
              </svg>
            </div>

            <div className="ln-bento-body">
              <h3 className="ln-bento-title">Track every payout in real time</h3>
              <p className="ln-bento-desc">Weekly settlement history with per-trade breakdowns and on-chain transaction hashes.</p>
            </div>
          </div>

          {/* ─── Right column ─── */}
          <div className="ln-bento-right">

            {/* Top: multi-exchange connector */}
            <div className="ln-bento-card">
              <div className="ln-bento-connect-wrap">
                <div className="ln-bento-node">
                  <div className="ln-bento-node-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"
                            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="ln-bento-node-label">OKX</span>
                </div>
                <div className="ln-bento-connector">
                  <div className="ln-bento-conn-line" />
                  <div className="ln-bento-conn-dot" />
                </div>
                <div className="ln-bento-node ln-bento-node--center">
                  <div className="ln-bento-node-icon">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 2L14 5.5v5L8 14L2 10.5v-5L8 2Z"
                            stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                      <path d="M8 5.5V10M5.5 7L8 5.5L10.5 7"
                            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="ln-bento-node-label">RBX</span>
                </div>
                <div className="ln-bento-connector">
                  <div className="ln-bento-conn-dot" />
                  <div className="ln-bento-conn-line" />
                </div>
                <div className="ln-bento-node">
                  <div className="ln-bento-node-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M3 10h18M16 15h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="ln-bento-node-label">Bybit</span>
                </div>
              </div>
              <div className="ln-bento-body">
                <h3 className="ln-bento-title">Multiple exchanges</h3>
                <p className="ln-bento-desc">Connect OKX, Bybit, GRVT and more. All rebates tracked in one dashboard.</p>
              </div>
            </div>

            {/* Bottom: on-chain glow */}
            <div className="ln-bento-card">
              <div className="ln-bento-glow-wrap" aria-hidden="true">
                <div className="ln-bento-orbit" />
                <div className="ln-bento-diamond">
                  <svg viewBox="0 0 100 100" width="96" height="96" fill="none">
                    <defs>
                      <clipPath id="sparkle-clip">
                        <path d="M50,2 C54,26 74,46 98,50 C74,54 54,74 50,98 C46,74 26,54 2,50 C26,46 46,26 50,2Z"/>
                      </clipPath>
                      <linearGradient id="sparkle-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#e8ffa8"/>
                        <stop offset="45%"  stopColor="#CAFF5D"/>
                        <stop offset="100%" stopColor="#7FE020" stopOpacity="0.85"/>
                      </linearGradient>
                    </defs>
                    <path d="M50,2 C54,26 74,46 98,50 C74,54 54,74 50,98 C46,74 26,54 2,50 C26,46 46,26 50,2Z"
                          fill="url(#sparkle-grad)"/>
                    <g clipPath="url(#sparkle-clip)">
                      {Array.from({ length: 26 }, (_, i) => (
                        <line key={i} x1="0" y1={2 + i * 3.7} x2="100" y2={2 + i * 3.7}
                              stroke="rgba(0,0,0,0.18)" strokeWidth="0.9"/>
                      ))}
                    </g>
                  </svg>
                </div>
              </div>
              <div className="ln-bento-body">
                <h3 className="ln-bento-title">Verified on-chain</h3>
                <p className="ln-bento-desc">Every payout comes with a transaction hash. Verify it directly on the blockchain — no trust needed.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 7: FAQ ── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="ln-section">
      <div className="ln-container">
        <div className="ln-section-head ln-section-head--center">
          <h2 className="ln-section-title">Common questions</h2>
          <p className="ln-section-sub">Quick answers before you get started.</p>
        </div>

        <div className="ln-faq">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`ln-faq-item${isOpen ? ' open' : ''}`}>
                <button type="button" className="ln-faq-q" aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{item.q}</span>
                  <span className="ln-faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <div className="ln-faq-a">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer({ onEnterPlatform }: { onEnterPlatform: () => void }) {
  return (
    <footer className="ln-footer">
      <div className="ln-container">
        <div className="ln-footer-grid">
          <div className="ln-footer-brand">
            <img src="/brand/reboundx.svg" alt="ReboundX" width="120" height="18" />
            <p className="ln-footer-tagline">Get back what you pay in trading fees.</p>
          </div>
          <div className="ln-footer-cols">
            <div className="ln-footer-col">
              <div className="ln-footer-col-title">Product</div>
              <a href="#" onClick={(e) => { e.preventDefault(); onEnterPlatform(); }}>Exchanges</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Calculator</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Events</a>
            </div>
            <div className="ln-footer-col">
              <div className="ln-footer-col-title">Resources</div>
              <a href="#how" onClick={(e) => { e.preventDefault(); document.querySelector('#how')?.scrollIntoView({ behavior: 'smooth' }); }}>How it works</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Trust</a>
              <a href="#" onClick={(e) => e.preventDefault()}>FAQ</a>
            </div>
            <div className="ln-footer-col">
              <div className="ln-footer-col-title">Company</div>
              <a href="#" onClick={(e) => e.preventDefault()}>About</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
            </div>
          </div>
        </div>
        <div className="ln-footer-bottom">
          <span>© 2025 ReboundX</span>
          <span className="ln-footer-legal">Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Main export ── */
export default function LandingPage({ onEnterPlatform }: Props) {
  return (
    <>
      <a href="#main" className="ln-skip-link">Skip to main content</a>
      <LandingNav onEnterPlatform={onEnterPlatform} />
      <main id="main">
        <Hero onEnterPlatform={onEnterPlatform} />
        <RebateSection onEnterPlatform={onEnterPlatform} />
        <HowItWorks />
        <PartnersSection />
        <VerifySection />
        <FAQ />
      </main>
      <Footer onEnterPlatform={onEnterPlatform} />
    </>
  );
}
