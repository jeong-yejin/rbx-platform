import { useState } from 'react';
import { EVENTS } from '../data';

const LOGO: Record<string, string> = { okx: '/logos/okx.svg', bybit: '/logos/bybit.svg', grvt: '/logos/grvt.svg', binance: '/logos/binance.svg', backpack: '/logos/backpack.svg', edgex: '/logos/edgex.svg', lighter: '/logos/lighter.svg', variational: '/logos/variational.svg' };
const TYPE_LABEL: Record<string, string> = { bonus: 'Bonus', competition: 'Competition', launch: 'Launch', airdrop: 'Airdrop' };
const TYPE_COLOR: Record<string, string> = { bonus: '#CAFF5D', competition: '#F59E0B', launch: '#60A5FA', airdrop: '#EC4899' };

export default function EventsPage() {
  const [filter, setFilter] = useState<'all'|'bonus'|'competition'|'launch'|'airdrop'>('all');
  const filtered = filter === 'all' ? EVENTS : EVENTS.filter(e => e.type === filter);
  const sorted = [...filtered].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="pg-wrap">
      <div className="pg-header">
        <div>
          <h1 className="pg-title">Events</h1>
          <p className="pg-sub">Limited-time bonuses, competitions, and special offers from partner exchanges</p>
        </div>
        <span className="ev-count-badge">{EVENTS.length} active</span>
      </div>

      <div className="pg-filter-row" style={{ marginBottom: '1.5rem' }}>
        {(['all','bonus','competition','launch','airdrop'] as const).map(f => (
          <button key={f} className={`pg-filter-btn${filter===f?' active':''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : TYPE_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="ev-grid">
        {sorted.map(ev => (
          <div key={ev.id} className={`ev-card${ev.daysLeft <= 10 ? ' ev-card--urgent' : ''}`}>
            <div className="ev-card-head">
              <div className="ev-exchange-row">
                {LOGO[ev.exchangeSlug]
                  ? <img src={LOGO[ev.exchangeSlug]} alt={ev.exchange} width="60" height="18" style={{ objectFit:'contain', objectPosition:'left' }} />
                  : <span className="ev-exchange-name">{ev.exchange}</span>}
                <div className="ev-badges">
                  <span className="ev-type-badge" style={{ '--type-color': TYPE_COLOR[ev.type] } as React.CSSProperties}>{TYPE_LABEL[ev.type]}</span>
                  {ev.isHot && <span className="ev-tag ev-tag--hot">🔥 Hot</span>}
                  {ev.isNew && <span className="ev-tag ev-tag--new">New</span>}
                </div>
              </div>
              <h3 className="ev-title">{ev.title}</h3>
            </div>
            <div className="ev-bonus-block">
              <div className="ev-bonus-label">Bonus</div>
              <div className="ev-bonus-val">{ev.bonus}</div>
            </div>
            <p className="ev-desc">{ev.desc}</p>
            <div className="ev-footer">
              <div className="ev-deadline">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/><path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Ends {ev.endsAt}
              </div>
              <div className={`ev-days${ev.daysLeft <= 10 ? ' urgent' : ''}`}>D-{ev.daysLeft}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
