import { useState } from 'react';
import { PERP_VENUES } from '../data';

const LOGO: Record<string, string> = { hyperliquid: '/logos/lighter.svg', grvt: '/logos/grvt.svg', edgex: '/logos/edgex.svg', lighter: '/logos/lighter.svg', variational: '/logos/variational.svg' };

function fmt(n: number, d = 2) { return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
function fmtVol(n: number) { return n >= 1_000_000 ? `$${(n/1_000_000).toFixed(1)}M` : `$${(n/1_000).toFixed(0)}k`; }

export default function CalculatorPage() {
  const [volume, setVolume]   = useState(100_000);
  const [selected, setSelected] = useState('all');
  const venues = selected === 'all' ? PERP_VENUES : PERP_VENUES.filter(v => v.slug === selected);

  return (
    <div className="pg-wrap">
      <div className="pg-header">
        <div>
          <h1 className="pg-title">PerpDex Point Calculator</h1>
          <p className="pg-sub">Estimate points earned, dollar value, and stacked rebates across Perp DEXs</p>
        </div>
      </div>

      <div className="calc-layout">
        {/* Sidebar controls */}
        <div className="calc-sidebar">
          <div className="calc-control-card">
            <div className="calc-control-label">Monthly Volume</div>
            <div className="calc-vol-display">{fmtVol(volume)}</div>
            <input type="range" min={5_000} max={2_000_000} step={5_000}
              value={volume} onChange={e => setVolume(Number(e.target.value))}
              className="pg-slider" aria-label="Monthly trading volume" />
            <div className="pg-filter-row" style={{ flexWrap:'wrap' }}>
              {[10_000,50_000,200_000,500_000,1_000_000].map(p => (
                <button key={p} className={`pg-filter-btn${volume===p?' active':''}`} onClick={() => setVolume(p)}>
                  {fmtVol(p)}
                </button>
              ))}
            </div>
          </div>
          <div className="calc-control-card">
            <div className="calc-control-label">Platform</div>
            <div className="calc-venue-btns">
              <button className={`pg-filter-btn${selected==='all'?' active':''}`} onClick={() => setSelected('all')}>All</button>
              {PERP_VENUES.map(v => (
                <button key={v.slug} className={`pg-filter-btn${selected===v.slug?' active':''}`} onClick={() => setSelected(v.slug)}>
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="calc-results">
          {venues.map(v => {
            const fees      = volume * v.feeRate;
            const points    = (volume / 1_000_000) * v.pointsPerM;
            const pointsUSD = points * v.pointValue;
            const rebateUSD = fees * v.rebateRate;
            const totalUSD  = pointsUSD + rebateUSD;
            return (
              <div key={v.slug} className="calc-card">
                <div className="calc-card-head">
                  <div>
                    {LOGO[v.slug] ? <img src={LOGO[v.slug]} alt={v.name} width="72" height="22" style={{ objectFit:'contain', objectPosition:'left' }} /> : <span className="calc-venue-name">{v.name}</span>}
                  </div>
                  {v.volumeBoost && <span className="calc-boost">{v.volumeBoost}</span>}
                </div>
                {v.note && <div className="calc-note">{v.note}</div>}
                <div className="calc-metrics">
                  <div className="calc-metric">
                    <div className="calc-metric-label">Est. Points</div>
                    <div className="calc-metric-val">{fmt(points, 0)}</div>
                    <div className="calc-metric-sub">≈ ${fmt(pointsUSD)}</div>
                  </div>
                  <div className="calc-metric">
                    <div className="calc-metric-label">Rebate</div>
                    <div className="calc-metric-val">${fmt(rebateUSD)}</div>
                    <div className="calc-metric-sub">{(v.rebateRate*100).toFixed(0)}% back</div>
                  </div>
                  <div className="calc-metric calc-metric--total">
                    <div className="calc-metric-label">Total / mo</div>
                    <div className="calc-metric-val text-accent">${fmt(totalUSD)}</div>
                    <div className="calc-metric-sub">Points + Rebate</div>
                  </div>
                </div>
                <div className="calc-progress-row">
                  <div className="calc-progress-labels"><span>Points</span><span>Rebate</span></div>
                  <div className="calc-progress-track">
                    {totalUSD > 0 && <>
                      <div className="calc-progress-points" style={{ width:`${(pointsUSD/totalUSD)*100}%` }} />
                      <div className="calc-progress-rebate" style={{ width:`${(rebateUSD/totalUSD)*100}%` }} />
                    </>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
