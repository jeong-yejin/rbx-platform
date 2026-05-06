import { useState } from 'react';
import LandingNav from '../components/LandingNav';
import { EXCHANGES, EVENTS, PERP_VENUES, VOLUME_PRESETS } from '../data';

const LOGO_MAP: Record<string, string> = {
  okx: '/logos/okx.svg', bybit: '/logos/bybit.svg', grvt: '/logos/grvt.svg',
  binance: '/logos/binance.svg', backpack: '/logos/backpack.svg', edgex: '/logos/edgex.svg',
  lighter: '/logos/lighter.svg', variational: '/logos/variational.svg',
};

const TYPE_LABEL: Record<string, string> = { bonus: 'Bonus', competition: 'Competition', launch: 'Launch', airdrop: 'Airdrop' };
const TYPE_COLOR: Record<string, string> = { bonus: '#CAFF5D', competition: '#F59E0B', launch: '#60A5FA', airdrop: '#EC4899' };

function fmt(n: number, d = 2) { return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
function fmtVol(n: number) { return n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1_000).toFixed(0)}k`; }
function pct(n: number) {
  if (n === 0) return '—';
  const abs = Math.abs(n * 100);
  return `${n < 0 ? '-' : ''}${abs < 0.01 ? abs.toFixed(4) : abs.toFixed(3)}%`;
}

interface Props { onEnterPlatform: () => void; }

/* ── Hero section ─────────────────────────────── */
function HeroSection({ onEnterPlatform }: { onEnterPlatform: () => void }) {
  const [volume, setVolume] = useState(50_000);
  const feeTotal    = EXCHANGES.filter(e => !e.comingSoon && !e.noFee).reduce((s, ex) => s + volume * ex.feeRate, 0) / EXCHANGES.filter(e => !e.comingSoon && !e.noFee).length;
  const rebateTotal = EXCHANGES.filter(e => !e.comingSoon && !e.noFee).reduce((s, ex) => s + volume * ex.feeRate * ex.rebateRate, 0) / EXCHANGES.filter(e => !e.comingSoon && !e.noFee).length;

  return (
    <section className="ln-hero">
      <div className="ln-glow" aria-hidden="true" />
      <div className="ln-glow-2" aria-hidden="true" />
      <div className="ln-container ln-hero-inner">
        <div className="ln-hero-label">Fee Rebate Platform</div>
        <h1 className="ln-hero-headline">
          Every trade costs a fee.<br />
          <em className="ln-accent">We send part of it back.</em>
        </h1>
        <p className="ln-hero-sub">
          ReboundX automatically tracks fee rebates from partner exchanges<br className="ln-br-desktop" />
          and pays you directly every cycle. Just connect your UID.
        </p>

        {/* Flow diagram */}
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
            <div className="ln-flow-title">Exchange Fee</div>
            <div className="ln-flow-val">${fmt(feeTotal)}</div>
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
            <div className="ln-flow-val ln-accent-val">${fmt(rebateTotal)}<span>/mo</span></div>
          </div>
        </div>

        {/* Volume slider */}
        <div className="ln-hero-calc">
          <div className="ln-hero-calc-label">
            <span>Adjust monthly volume</span>
            <span className="ln-hero-calc-vol">{fmtVol(volume)}</span>
          </div>
          <input type="range" min={5_000} max={1_000_000} step={5_000} value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="ln-slider" aria-label="Monthly trading volume" />
          <div className="ln-slider-ticks">
            <span>$5k</span><span>$250k</span><span>$500k</span><span>$1M</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="ln-hero-actions">
          <button type="button" className="ln-btn-primary" onClick={onEnterPlatform}>
            Launch Platform
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <a href="#exchanges" className="ln-btn-ghost" onClick={(e) => { e.preventDefault(); document.querySelector('#exchanges')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Exchanges
          </a>
        </div>

        {/* Trust chips */}
        <div className="ln-trust-strip">
          {['UID-only · no withdrawal access', 'On-chain verifiable payouts', 'Paid within 24 hours'].map((t) => (
            <div key={t} className="ln-trust-chip">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M5 8.5L2 5.5l1-1L5 6.5l4-4 1 1L5 8.5Z" fill="currentColor"/></svg>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats bar ──────────────────────────────────── */
function StatsBar() {
  const stats = [
    { label: 'Partner Exchanges', value: `${EXCHANGES.filter(e => !e.comingSoon).length}+` },
    { label: 'Max Rebate', value: '55%' },
    { label: 'Pay Cycle', value: 'Monthly' },
    { label: 'CEX + DEX', value: 'Supported' },
  ];
  return (
    <div className="ln-stats-bar">
      <div className="ln-container">
        <div className="ln-stats-row">
          {stats.map(({ label, value }) => (
            <div key={label} className="ln-stat-item">
              <div className="ln-stat-value">{value}</div>
              <div className="ln-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Partner Exchanges section ──────────────────── */
function ExchangesSection() {
  const [filter, setFilter] = useState<'all' | 'CEX' | 'DEX'>('all');
  const [volume, setVolume] = useState(50_000);
  const [sortBy, setSortBy] = useState<'rebateRate' | 'avgRebate'>('rebateRate');

  const rows = EXCHANGES
    .filter((ex) => filter === 'all' || ex.type === filter)
    .map((ex) => ({ ...ex, fees: volume * ex.feeRate, rebate: volume * ex.feeRate * ex.rebateRate }))
    .sort((a, b) => {
      if (a.comingSoon) return 1;
      if (b.comingSoon) return -1;
      return sortBy === 'rebateRate' ? b.rebateRate - a.rebateRate : b.avgRebate - a.avgRebate;
    });

  return (
    <section id="exchanges" className="ln-section">
      <div className="ln-container">
        <div className="ln-section-head">
          <div>
            <div className="ln-section-label">Partner Exchanges</div>
            <h2 className="ln-section-title">Compare Partner Exchanges</h2>
            <p className="ln-section-sub">Compare rebate rates, fees, and real earnings across all partners by trading volume</p>
          </div>
        </div>

        {/* Controls */}
        <div className="ln-exc-controls">
          <div className="ln-filter-group">
            {(['all', 'CEX', 'DEX'] as const).map((f) => (
              <button key={f} className={`ln-filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          <div className="ln-exc-volume-row">
            <span className="ln-label-sm">Volume / mo</span>
            <div className="ln-filter-group">
              {VOLUME_PRESETS.map((p) => (
                <button key={p} className={`ln-filter-btn${volume === p ? ' active' : ''}`} onClick={() => setVolume(p)}>
                  {fmtVol(p)}
                </button>
              ))}
            </div>
          </div>
          <div className="ln-filter-group">
            <span className="ln-label-sm">Sort</span>
            <button className={`ln-filter-btn${sortBy === 'rebateRate' ? ' active' : ''}`} onClick={() => setSortBy('rebateRate')}>Rebate Rate</button>
            <button className={`ln-filter-btn${sortBy === 'avgRebate' ? ' active' : ''}`} onClick={() => setSortBy('avgRebate')}>Avg Payout</button>
          </div>
        </div>

        {/* Table */}
        <div className="ln-exc-table-wrap">
          <table className="ln-exc-table">
            <thead>
              <tr>
                <th>Exchange</th>
                <th>Type</th>
                <th>Rebate Rate</th>
                <th>Taker Fee</th>
                <th>Est. Payout/mo</th>
                <th>Avg Payout</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((ex) => (
                <tr key={ex.slug} className={ex.comingSoon ? 'ln-exc-row-dim' : ''}>
                  <td>
                    <div className="ln-exc-name-cell">
                      <span className="ln-exc-dot" style={{ background: ex.dotColor }} />
                      {LOGO_MAP[ex.slug]
                        ? <img src={LOGO_MAP[ex.slug]} alt={ex.name} width="60" height="18" style={{ objectFit: 'contain', objectPosition: 'left' }} />
                        : <span className="ln-exc-text-name">{ex.name}</span>}
                      {ex.comingSoon && <span className="ln-soon-badge">Coming Soon</span>}
                      {ex.note && <span className="ln-exc-note">{ex.note}</span>}
                    </div>
                  </td>
                  <td><span className={`ln-type-badge ln-type-${ex.type.toLowerCase()}`}>{ex.type}</span></td>
                  <td className="ln-num-cell">
                    {ex.comingSoon ? '—' : <strong className="ln-accent-text">{(ex.rebateRate * 100).toFixed(0)}%</strong>}
                  </td>
                  <td className="ln-num-cell">{ex.noFee ? <span className="ln-positive">Free</span> : pct(ex.takerFee)}</td>
                  <td className="ln-num-cell">{ex.comingSoon || ex.noFee ? '—' : `$${fmt(ex.rebate)}`}</td>
                  <td className="ln-num-cell">{ex.avgRebate > 0 ? `$${fmt(ex.avgRebate)}` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── Events section ─────────────────────────────── */
function EventsSection() {
  const [filter, setFilter] = useState<'all' | 'bonus' | 'competition' | 'launch' | 'airdrop'>('all');

  const filtered = filter === 'all' ? EVENTS : EVENTS.filter((e) => e.type === filter);
  const sorted = [...filtered].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <section id="events" className="ln-section ln-section--alt">
      <div className="ln-container">
        <div className="ln-section-head">
          <div>
            <div className="ln-section-label">Events</div>
            <h2 className="ln-section-title">Active Events</h2>
            <p className="ln-section-sub">Limited-time bonuses, competitions, and special offers from partner exchanges</p>
          </div>
          <span className="ln-ev-count">{EVENTS.length} active</span>
        </div>

        {/* Filter */}
        <div className="ln-filter-group" style={{ marginBottom: '1.5rem' }}>
          {(['all', 'bonus', 'competition', 'launch', 'airdrop'] as const).map((f) => (
            <button key={f} className={`ln-filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : TYPE_LABEL[f]}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="ln-ev-grid">
          {sorted.map((ev) => (
            <div key={ev.id} className={`ln-ev-card${ev.daysLeft <= 10 ? ' ln-ev-card--urgent' : ''}`}>
              <div className="ln-ev-card-head">
                <div className="ln-ev-exchange-row">
                  {LOGO_MAP[ev.exchangeSlug]
                    ? <img src={LOGO_MAP[ev.exchangeSlug]} alt={ev.exchange} width="60" height="18" style={{ objectFit: 'contain', objectPosition: 'left' }} />
                    : <span className="ln-ev-exchange-name">{ev.exchange}</span>}
                  <div className="ln-ev-badges">
                    <span className="ln-ev-type-badge" style={{ '--type-color': TYPE_COLOR[ev.type] } as React.CSSProperties}>
                      {TYPE_LABEL[ev.type]}
                    </span>
                    {ev.isHot && <span className="ln-ev-tag ln-ev-tag--hot">🔥 Hot</span>}
                    {ev.isNew && <span className="ln-ev-tag ln-ev-tag--new">New</span>}
                  </div>
                </div>
                <h3 className="ln-ev-title">{ev.title}</h3>
              </div>

              <div className="ln-ev-bonus-block">
                <div className="ln-ev-bonus-label">Bonus</div>
                <div className="ln-ev-bonus-val">{ev.bonus}</div>
              </div>

              <p className="ln-ev-desc">{ev.desc}</p>

              <div className="ln-ev-footer">
                <div className="ln-ev-deadline">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  Ends {ev.endsAt}
                </div>
                <div className={`ln-ev-days${ev.daysLeft <= 10 ? ' urgent' : ''}`}>
                  D-{ev.daysLeft}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PerpDex Point Calculator section ────────────── */
function CalculatorSection() {
  const [volume, setVolume] = useState(100_000);
  const [selected, setSelected] = useState<string>('all');

  const venues = selected === 'all' ? PERP_VENUES : PERP_VENUES.filter((v) => v.slug === selected);

  return (
    <section id="calculator" className="ln-section">
      <div className="ln-container">
        <div className="ln-section-head">
          <div>
            <div className="ln-section-label">PerpDex Point Calculator</div>
            <h2 className="ln-section-title">Points Earnings Calculator</h2>
            <p className="ln-section-sub">Estimate points earned, dollar value, and stacked rebates across Perp DEXs</p>
          </div>
        </div>

        <div className="ln-calc-layout">
          {/* Controls */}
          <div className="ln-calc-sidebar">
            <div className="ln-calc-control-card">
              <div className="ln-calc-section-title">Monthly Volume</div>
              <div className="ln-calc-vol-display">{fmtVol(volume)}</div>
              <input type="range" min={5_000} max={2_000_000} step={5_000}
                value={volume} onChange={(e) => setVolume(Number(e.target.value))}
                className="ln-slider" aria-label="Monthly trading volume" />
              <div className="ln-calc-presets">
                {[10_000, 50_000, 200_000, 500_000, 1_000_000].map((p) => (
                  <button key={p} className={`ln-filter-btn${volume === p ? ' active' : ''}`} onClick={() => setVolume(p)}>
                    {fmtVol(p)}
                  </button>
                ))}
              </div>
            </div>

            <div className="ln-calc-control-card">
              <div className="ln-calc-section-title">Platform</div>
              <div className="ln-calc-venue-btns">
                <button className={`ln-filter-btn${selected === 'all' ? ' active' : ''}`} onClick={() => setSelected('all')}>All</button>
                {PERP_VENUES.map((v) => (
                  <button key={v.slug} className={`ln-filter-btn${selected === v.slug ? ' active' : ''}`} onClick={() => setSelected(v.slug)}>
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="ln-calc-results">
            {venues.map((v) => {
              const fees      = volume * v.feeRate;
              const points    = (volume / 1_000_000) * v.pointsPerM;
              const pointsUSD = points * v.pointValue;
              const rebateUSD = fees * v.rebateRate;
              const totalUSD  = pointsUSD + rebateUSD;

              return (
                <div key={v.slug} className="ln-calc-card">
                  <div className="ln-calc-card-head">
                    <div className="ln-calc-venue-logo">
                      {LOGO_MAP[v.slug]
                        ? <img src={LOGO_MAP[v.slug]} alt={v.name} width="72" height="22" style={{ objectFit: 'contain', objectPosition: 'left' }} />
                        : <span className="ln-calc-venue-name">{v.name}</span>}
                    </div>
                    {v.volumeBoost && <span className="ln-calc-boost-badge">{v.volumeBoost}</span>}
                  </div>

                  {v.note && <div className="ln-calc-venue-note">{v.note}</div>}

                  <div className="ln-calc-metrics">
                    <div className="ln-calc-metric">
                      <div className="ln-calc-metric-label">Est. Points</div>
                      <div className="ln-calc-metric-val">{fmt(points, 0)}</div>
                      <div className="ln-calc-metric-sub">≈ ${fmt(pointsUSD)}</div>
                    </div>
                    <div className="ln-calc-metric">
                      <div className="ln-calc-metric-label">Rebate</div>
                      <div className="ln-calc-metric-val">${fmt(rebateUSD)}</div>
                      <div className="ln-calc-metric-sub">{(v.rebateRate * 100).toFixed(0)}% back</div>
                    </div>
                    <div className="ln-calc-metric ln-calc-metric--total">
                      <div className="ln-calc-metric-label">Total / mo</div>
                      <div className="ln-calc-metric-val ln-accent-text">${fmt(totalUSD)}</div>
                      <div className="ln-calc-metric-sub">Points + Rebate</div>
                    </div>
                  </div>

                  <div className="ln-calc-progress-row">
                    <div className="ln-calc-progress-label">
                      <span>Points</span>
                      <span>Rebate</span>
                    </div>
                    <div className="ln-calc-progress-track">
                      {totalUSD > 0 && (
                        <>
                          <div className="ln-calc-progress-points" style={{ width: `${(pointsUSD / totalUSD) * 100}%` }} />
                          <div className="ln-calc-progress-rebate" style={{ width: `${(rebateUSD / totalUSD) * 100}%` }} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────── */
function LandingFooter({ onEnterPlatform }: { onEnterPlatform: () => void }) {
  return (
    <footer className="ln-footer">
      <div className="ln-container">
        <div className="ln-footer-inner">
          <div className="ln-footer-brand">
            <img src="/brand/reboundx.svg" alt="ReboundX" width="120" height="18" style={{ display: 'block', marginBottom: '0.75rem' }} />
            <p className="ln-footer-tagline">The easiest way to get your trading fees back</p>
          </div>
          <div className="ln-footer-links">
            <a href="#exchanges" onClick={(e) => { e.preventDefault(); document.querySelector('#exchanges')?.scrollIntoView({ behavior: 'smooth' }); }}>Exchanges</a>
            <a href="#events" onClick={(e) => { e.preventDefault(); document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' }); }}>Events</a>
            <a href="#calculator" onClick={(e) => { e.preventDefault(); document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth' }); }}>Calculator</a>
          </div>
          <button type="button" className="ln-btn-primary ln-footer-cta" onClick={onEnterPlatform}>
            Launch Platform
          </button>
        </div>
        <div className="ln-footer-bottom">
          <span>© 2025 ReboundX. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Main export ────────────────────────────────── */
export default function LandingPage({ onEnterPlatform }: Props) {
  return (
    <>
      <a href="#main" className="ln-skip-link">Skip to main content</a>
      <LandingNav onEnterPlatform={onEnterPlatform} />
      <main id="main">
        <HeroSection onEnterPlatform={onEnterPlatform} />
        <StatsBar />
        <ExchangesSection />
        <EventsSection />
        <CalculatorSection />
      </main>
      <LandingFooter onEnterPlatform={onEnterPlatform} />
    </>
  );
}
