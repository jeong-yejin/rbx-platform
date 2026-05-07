import { USER, CYCLE, PAYOUT_HISTORY, LINKED_EXCHANGES, EVENTS } from '../data';
import type { Page } from '../components/TopNav';

const LOGO: Record<string, string> = { okx: '/logos/okx.svg', bybit: '/logos/bybit.svg', grvt: '/logos/grvt.svg', binance: '/logos/binance.svg', backpack: '/logos/backpack.svg', edgex: '/logos/edgex.svg', lighter: '/logos/lighter.svg', variational: '/logos/variational.svg' };

function fmt(n: number, d = 2) { return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
function fmtVol(n: number) { return n >= 1_000_000 ? `$${(n/1_000_000).toFixed(2)}M` : `$${(n/1_000).toFixed(0)}k`; }

interface Props { onNav: (p: Page) => void; }

export default function Dashboard({ onNav }: Props) {
  const avgMonthly = USER.totalEarned / PAYOUT_HISTORY.length;

  return (
    <div className="pg-wrap">
      <div className="pg-header">
        <div>
          <h1 className="pg-title">Dashboard</h1>
          <p className="pg-sub">Welcome back, {USER.name.split(' ')[0]}</p>
        </div>
        <div className="dash-total">
          <span className="dash-total-label">All-time earned</span>
          <span className="dash-total-val">${fmt(USER.totalEarned)}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="stats-row">
        <div className="stat-card stat-card--accent">
          <div className="stat-label">This cycle</div>
          <div className="stat-value text-accent">${fmt(CYCLE.pending)}</div>
          <div className="stat-sub">Ends in {CYCLE.endsIn}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg / month</div>
          <div className="stat-value">${fmt(avgMonthly)}</div>
          <div className="stat-sub">Last {PAYOUT_HISTORY.length} cycles</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total trades</div>
          <div className="stat-value">{USER.totalTrades.toLocaleString()}</div>
          <div className="stat-sub">{fmtVol(USER.totalVolume)} volume</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Referrals</div>
          <div className="stat-value">{USER.referralCount}</div>
          <div className="stat-sub">${fmt(USER.referralEarned)} earned</div>
        </div>
      </div>

      {/* Main grid */}
      <div className="dash-grid">
        {/* Current cycle */}
        <div className="card">
          <div className="card-head">
            <span className="card-title">Current cycle</span>
            <span className="cycle-badge">
              <span className="pulse-dot" />
              Live · {CYCLE.exchange}
            </span>
          </div>
          <div className="cycle-body">
            <div>
              <div className="cycle-label">Pending rebate</div>
              <div className="cycle-amount">${fmt(CYCLE.pending)}</div>
              <div className="cycle-meta">from ${fmt(CYCLE.fees)} in fees · {CYCLE.trades} trades · {fmtVol(CYCLE.volume)}</div>
            </div>
            <div className="cycle-ends">Ends in <strong>{CYCLE.endsIn}</strong></div>
          </div>
          <div className="progress-wrap">
            <div className="progress-track"><div className="progress-fill" style={{ width:`${CYCLE.pct}%` }} /></div>
            <span className="progress-label">{CYCLE.pct}% complete</span>
          </div>
        </div>

        {/* Linked exchanges */}
        <div className="card">
          <div className="card-head">
            <span className="card-title">Linked exchanges</span>
            <button className="card-action" onClick={() => onNav('exchanges')}>Manage</button>
          </div>
          {LINKED_EXCHANGES.map(ex => (
            <div key={ex.slug} className="linked-exc-row">
              <div className="linked-exc-logo">
                {LOGO[ex.slug] ? <img src={LOGO[ex.slug]} alt={ex.name} width="56" height="18" style={{ objectFit:'contain', objectPosition:'left' }} /> : <span>{ex.name}</span>}
              </div>
              <div className="linked-exc-status">
                <span className={`status-dot status-dot--${ex.status}`} />
                <span className="status-label">{ex.status === 'active' ? 'Active' : 'Pending'}</span>
              </div>
              <div className="linked-exc-right">
                <span className="linked-exc-earned">${fmt(ex.earnedTotal)}</span>
                <span className="linked-exc-rate">{(ex.rebateRate*100).toFixed(0)}% back</span>
              </div>
            </div>
          ))}
        </div>

        {/* Payout history */}
        <div className="card">
          <div className="card-head">
            <span className="card-title">Recent payouts</span>
          </div>
          {PAYOUT_HISTORY.map(p => (
            <div key={p.id} className="payout-row">
              <div className="payout-left">
                <div className="payout-check">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="payout-exchange">{p.exchange}</div>
                  <div className="payout-meta">{p.date} · {p.trades} trades</div>
                </div>
              </div>
              <span className="payout-amount">+${fmt(p.amount)}</span>
            </div>
          ))}
        </div>

        {/* Active events */}
        <div className="card">
          <div className="card-head">
            <span className="card-title">Active events</span>
            <button className="card-action" onClick={() => onNav('events')}>View all</button>
          </div>
          {EVENTS.slice(0, 3).map(ev => (
            <div key={ev.id} className="event-row">
              <div className="event-row-left">
                {LOGO[ev.exchangeSlug] ? <img src={LOGO[ev.exchangeSlug]} alt={ev.exchange} width="44" height="14" style={{ objectFit:'contain', objectPosition:'left' }} /> : <span className="event-exchange">{ev.exchange}</span>}
                <span className="event-title">{ev.title}</span>
              </div>
              <div className="event-row-right">
                <span className="event-bonus">{ev.bonus}</span>
                <span className={`event-days${ev.daysLeft <= 10 ? ' urgent' : ''}`}>D-{ev.daysLeft}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
