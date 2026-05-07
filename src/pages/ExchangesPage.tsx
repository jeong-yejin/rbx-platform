import { useState } from 'react';
import { EXCHANGES, VOLUME_PRESETS } from '../data';

const LOGO: Record<string, string> = { okx: '/logos/okx.svg', bybit: '/logos/bybit.svg', grvt: '/logos/grvt.svg', binance: '/logos/binance.svg', backpack: '/logos/backpack.svg', edgex: '/logos/edgex.svg', lighter: '/logos/lighter.svg', variational: '/logos/variational.svg' };

function fmt(n: number, d = 2) { return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
function fmtVol(n: number) { return n >= 1_000_000 ? `$${(n/1_000_000).toFixed(1)}M` : `$${(n/1_000).toFixed(0)}k`; }
function pct(n: number) { if (n === 0) return '—'; const a = Math.abs(n*100); return `${n<0?'-':''}${a<0.01?a.toFixed(4):a.toFixed(3)}%`; }

export default function ExchangesPage() {
  const [filter, setFilter]   = useState<'all'|'CEX'|'DEX'>('all');
  const [volume, setVolume]   = useState(50_000);
  const [sortBy, setSortBy]   = useState<'rebateRate'|'avgRebate'>('rebateRate');

  const rows = EXCHANGES
    .filter(ex => filter === 'all' || ex.type === filter)
    .map(ex => ({ ...ex, fees: volume * ex.feeRate, rebate: volume * ex.feeRate * ex.rebateRate }))
    .sort((a, b) => {
      if (a.comingSoon) return 1; if (b.comingSoon) return -1;
      return sortBy === 'rebateRate' ? b.rebateRate - a.rebateRate : b.avgRebate - a.avgRebate;
    });

  return (
    <div className="pg-wrap">
      <div className="pg-header">
        <div>
          <h1 className="pg-title">Partner Exchanges</h1>
          <p className="pg-sub">Compare rebate rates, fees, and real earnings across all partners</p>
        </div>
      </div>

      {/* Controls */}
      <div className="exc-controls">
        <div className="pg-filter-row">
          {(['all','CEX','DEX'] as const).map(f => (
            <button key={f} className={`pg-filter-btn${filter===f?' active':''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
        <div className="exc-volume-block">
          <span className="pg-label-sm">Volume / mo</span>
          <div className="pg-filter-row">
            {VOLUME_PRESETS.map(p => (
              <button key={p} className={`pg-filter-btn${volume===p?' active':''}`} onClick={() => setVolume(p)}>
                {fmtVol(p)}
              </button>
            ))}
          </div>
        </div>
        <div className="pg-filter-row">
          <span className="pg-label-sm">Sort</span>
          <button className={`pg-filter-btn${sortBy==='rebateRate'?' active':''}`} onClick={() => setSortBy('rebateRate')}>Rebate Rate</button>
          <button className={`pg-filter-btn${sortBy==='avgRebate'?' active':''}`} onClick={() => setSortBy('avgRebate')}>Avg Payout</button>
        </div>
      </div>

      {/* Table */}
      <div className="exc-table-wrap">
        <table className="exc-table">
          <thead>
            <tr>
              <th>Exchange</th><th>Type</th><th>Rebate Rate</th>
              <th>Taker Fee</th><th>Est. Payout/mo</th><th>Avg Payout</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(ex => (
              <tr key={ex.slug} className={ex.comingSoon ? 'exc-row-dim' : ''}>
                <td>
                  <div className="exc-name-cell">
                    <span className="exc-dot" style={{ background: ex.dotColor }} />
                    {LOGO[ex.slug] ? <img src={LOGO[ex.slug]} alt={ex.name} width="60" height="18" style={{ objectFit:'contain', objectPosition:'left' }} /> : <span className="exc-text">{ex.name}</span>}
                    {ex.comingSoon && <span className="exc-soon">Coming Soon</span>}
                    {ex.note && <span className="exc-note">{ex.note}</span>}
                  </div>
                </td>
                <td><span className={`exc-type exc-type-${ex.type.toLowerCase()}`}>{ex.type}</span></td>
                <td className="exc-num">{ex.comingSoon ? '—' : <strong className="text-accent">{(ex.rebateRate*100).toFixed(0)}%</strong>}</td>
                <td className="exc-num">{ex.noFee ? <span className="text-positive">Free</span> : pct(ex.takerFee)}</td>
                <td className="exc-num">{ex.comingSoon||ex.noFee ? '—' : `$${fmt(ex.rebate)}`}</td>
                <td className="exc-num">{ex.avgRebate > 0 ? `$${fmt(ex.avgRebate)}` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
