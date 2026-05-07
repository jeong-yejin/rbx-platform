import { useState } from 'react';
import LandingNav from '../components/LandingNav';

interface MyPageProps { onHome?: () => void; }

type Tab = 'overview' | 'history' | 'exchanges' | 'settings';

const LANDING = import.meta.env.VITE_LANDING_URL ?? '';

const USER = {
  name: 'Marcus T.',
  handle: '@marcustrades',
  joinDate: 'Jan 2025',
  totalEarned: 2847.32,
  totalTrades: 318,
  totalVolume: 4_230_000,
};

const CYCLE = {
  pending: 138.47,
  fees: 462.00,
  trades: 47,
  volume: 462_300,
  endsIn: '6h 12m',
  pct: 74,
  exchange: 'OKX + Bybit',
};

const LINKED = [
  {
    name: 'OKX', slug: 'okx', type: 'CEX' as const,
    rebateRate: 0.55, status: 'active' as const,
    earnedTotal: 1847.20, avgMonthly: 308.53,
    uid: '3847****29', connectedDate: 'Jan 15, 2025',
  },
  {
    name: 'Bybit', slug: 'bybit', type: 'CEX' as const,
    rebateRate: 0.35, status: 'active' as const,
    earnedTotal: 784.12, avgMonthly: 130.69,
    uid: '7720****51', connectedDate: 'Feb 3, 2025',
  },
  {
    name: 'GRVT', slug: 'grvt', type: 'Perp DEX' as const,
    rebateRate: 0.25, status: 'pending' as const,
    earnedTotal: 216.00, avgMonthly: 72.00,
    uid: 'GV-****4812', connectedDate: 'Apr 20, 2025',
  },
];

const HISTORY = [
  { id: 'c12', date: 'May 3, 2025',  exchange: 'OKX + Bybit', trades: 47, volume: 462_300, amount: 138.47, tx: '0x4a7f…c3d9' },
  { id: 'c11', date: 'Apr 26, 2025', exchange: 'OKX + Bybit', trades: 61, volume: 583_100, amount: 174.93, tx: '0x9b2e…f7a1' },
  { id: 'c10', date: 'Apr 19, 2025', exchange: 'OKX + Bybit', trades: 38, volume: 391_500, amount: 117.45, tx: '0x3c81…a4d2' },
  { id: 'c09', date: 'Apr 12, 2025', exchange: 'OKX',          trades: 52, volume: 497_200, amount: 111.87, tx: '0x7f3e…b6c8' },
  { id: 'c08', date: 'Apr 5, 2025',  exchange: 'OKX',          trades: 44, volume: 422_800, amount:  95.13, tx: '0x2d9a…e3f5' },
  { id: 'c07', date: 'Mar 29, 2025', exchange: 'OKX',          trades: 29, volume: 278_600, amount:  62.69, tx: '0x8e4c…d1b7' },
  { id: 'c06', date: 'Mar 22, 2025', exchange: 'OKX',          trades: 33, volume: 314_500, amount:  70.76, tx: '0x1f6b…9e23' },
  { id: 'c05', date: 'Mar 15, 2025', exchange: 'OKX',          trades: 41, volume: 389_700, amount:  87.68, tx: '0x5d3c…2a47' },
  { id: 'c04', date: 'Mar 8, 2025',  exchange: 'OKX',          trades: 26, volume: 247_100, amount:  55.60, tx: '0xa2e7…4f91' },
  { id: 'c03', date: 'Mar 1, 2025',  exchange: 'OKX',          trades: 19, volume: 181_800, amount:  40.91, tx: '0x6c9d…7b35' },
  { id: 'c02', date: 'Feb 22, 2025', exchange: 'OKX',          trades: 22, volume: 208_400, amount:  46.89, tx: '0xd4f1…c062' },
  { id: 'c01', date: 'Feb 15, 2025', exchange: 'OKX',          trades: 15, volume: 141_300, amount:  31.82, tx: '0x8a5e…1d4f' },
];

const LOGO_MAP: Record<string, string> = {
  okx:   '/logos/okx.svg',
  bybit: '/logos/bybit.svg',
  grvt:  '/logos/grvt.svg',
};

function fmt(n: number, d = 2) {
  return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
}
function fmtVol(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${(n / 1_000).toFixed(0)}k`;
}

/* ── Icons ── */
function IconOverview()   { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>; }
function IconHistory()    { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 5v3l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IconExchanges()  { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 5h12M10 2l3 3-3 3M14 11H2M6 8l-3 3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IconSettings()   { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.4 3.4l.85.85M11.75 11.75l.85.85M3.4 12.6l.85-.85M11.75 4.25l.85-.85" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IconCheck()      { return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IconExternal()   { return <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M4.5 2H2.5A1 1 0 001.5 3v5.5a1 1 0 001 1H8a1 1 0 001-1V6.5M6.5 1.5H9.5M9.5 1.5v3M9.5 1.5L5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IconCopy()       { return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="4" y="4" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M2 8V1.5A.5.5 0 012.5 1H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>; }
function IconPlus()       { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
function IconBell()       { return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M7.5 1.5a4 4 0 00-4 4v2.5L2 10h11l-1.5-2V5.5a4 4 0 00-4-4zM6 10.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IconShield()     { return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M7.5 1.5L2 4v4c0 3 2.5 5.5 5.5 6 3-.5 5.5-3 5.5-6V4L7.5 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M5 7.5l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IconBack()       { return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M8 2.5L4 6.5l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }

/* ─── Overview ─────────────────────────────────── */
function OverviewTab({ onNav }: { onNav: (t: Tab) => void }) {
  const avgMonthly = USER.totalEarned / 6;
  return (
    <div className="mp-tab-content">
      <div className="mp-stats-row">
        <div className="mp-stat-card mp-stat-accent">
          <div className="mp-stat-label">Total earned</div>
          <div className="mp-stat-value">${fmt(USER.totalEarned)}</div>
          <div className="mp-stat-sub">{LINKED.length} exchanges · since {USER.joinDate}</div>
        </div>
        <div className="mp-stat-card">
          <div className="mp-stat-label">This cycle</div>
          <div className="mp-stat-value mp-pending">${fmt(CYCLE.pending)}</div>
          <div className="mp-stat-sub">Ends in {CYCLE.endsIn}</div>
        </div>
        <div className="mp-stat-card">
          <div className="mp-stat-label">Avg / month</div>
          <div className="mp-stat-value">${fmt(avgMonthly)}</div>
          <div className="mp-stat-sub">Based on last 6 cycles</div>
        </div>
        <div className="mp-stat-card">
          <div className="mp-stat-label">Total trades</div>
          <div className="mp-stat-value">{USER.totalTrades.toLocaleString()}</div>
          <div className="mp-stat-sub">{fmtVol(USER.totalVolume)} volume</div>
        </div>
      </div>

      <div className="mp-card mp-cycle-card">
        <div className="mp-card-head">
          <span className="mp-card-title">Current cycle</span>
          <span className="mp-cycle-badge">
            <span className="mp-pulse-dot" />
            Live · {CYCLE.exchange}
          </span>
        </div>
        <div className="mp-cycle-body">
          <div className="mp-cycle-main">
            <div className="mp-cycle-label">Pending rebate</div>
            <div className="mp-cycle-amount">${fmt(CYCLE.pending)}</div>
            <div className="mp-cycle-meta">from ${fmt(CYCLE.fees)} in fees · {CYCLE.trades} trades · {fmtVol(CYCLE.volume)}</div>
          </div>
          <div className="mp-cycle-ends">Ends in <strong>{CYCLE.endsIn}</strong></div>
        </div>
        <div className="mp-progress-wrap">
          <div className="mp-progress-track">
            <div className="mp-progress-fill" style={{ width: `${CYCLE.pct}%` }} />
          </div>
          <span className="mp-progress-label">{CYCLE.pct}% of cycle complete</span>
        </div>
      </div>

      <div className="mp-card">
        <div className="mp-card-head">
          <span className="mp-card-title">Recent payouts</span>
          <button className="mp-link-btn" onClick={() => onNav('history')}>View all</button>
        </div>
        <div className="mp-payout-list">
          {HISTORY.slice(0, 4).map((h) => (
            <div key={h.id} className="mp-payout-row">
              <div className="mp-payout-left">
                <div className="mp-payout-check"><IconCheck /></div>
                <div>
                  <div className="mp-payout-date">{h.date}</div>
                  <div className="mp-payout-meta">{h.exchange} · {h.trades} trades · {fmtVol(h.volume)}</div>
                </div>
              </div>
              <div className="mp-payout-right">
                <div className="mp-payout-amount">+${fmt(h.amount)}</div>
                <a href="#" className="mp-payout-tx" onClick={(e) => e.preventDefault()}>{h.tx} <IconExternal /></a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mp-card">
        <div className="mp-card-head">
          <span className="mp-card-title">Linked exchanges</span>
          <button className="mp-link-btn" onClick={() => onNav('exchanges')}>Manage</button>
        </div>
        <div className="mp-exc-summary">
          {LINKED.map((ex) => (
            <div key={ex.slug} className="mp-exc-row">
              <div className="mp-exc-logo-wrap">
                {LOGO_MAP[ex.slug]
                  ? <img src={LOGO_MAP[ex.slug]} alt={ex.name} width="56" height="18" style={{ objectFit: 'contain', objectPosition: 'left' }} />
                  : <span className="mp-exc-name-text">{ex.name}</span>}
              </div>
              <div className="mp-exc-row-mid">
                <span className={`mp-exc-status-dot ${ex.status}`} />
                <span className="mp-exc-status-text">{ex.status === 'active' ? 'Active' : 'Pending'}</span>
                <span className="mp-exc-type">{ex.type}</span>
              </div>
              <div className="mp-exc-row-right">
                <span className="mp-exc-earned">${fmt(ex.earnedTotal)} earned</span>
                <span className="mp-exc-rate">{(ex.rebateRate * 100).toFixed(0)}% back</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── History ───────────────────────────────────── */
function HistoryTab() {
  const [filter, setFilter] = useState<'all' | 'okx' | 'bybit' | 'grvt'>('all');
  const total = HISTORY.reduce((s, h) => s + h.amount, 0);
  const filtered = filter === 'all' ? HISTORY : HISTORY.filter((h) => h.exchange.toLowerCase().includes(filter));

  return (
    <div className="mp-tab-content">
      <div className="mp-card">
        <div className="mp-card-head">
          <div>
            <span className="mp-card-title">Payout history</span>
            <span className="mp-history-total">${fmt(total)} total · {HISTORY.length} cycles</span>
          </div>
          <div className="mp-filter-row">
            {(['all', 'okx', 'bybit', 'grvt'] as const).map((f) => (
              <button key={f} className={`mp-filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="mp-history-table-wrap">
          <table className="mp-history-table">
            <thead>
              <tr>
                <th>Date</th><th>Exchange</th><th>Trades</th><th>Volume</th><th>Rebate</th><th>TX Hash</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => (
                <tr key={h.id}>
                  <td className="mp-td-date">{h.date}</td>
                  <td className="mp-td-exchange">{h.exchange}</td>
                  <td className="mp-td-num">{h.trades}</td>
                  <td className="mp-td-num">{fmtVol(h.volume)}</td>
                  <td className="mp-td-amount">+${fmt(h.amount)}</td>
                  <td className="mp-td-tx">
                    <a href="#" className="mp-tx-link" onClick={(e) => e.preventDefault()}>
                      <code>{h.tx}</code> <IconExternal />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mp-history-footer">All payouts verified on-chain. Each TX hash links to the blockchain transaction.</div>
      </div>
    </div>
  );
}

/* ─── Exchanges ─────────────────────────────────── */
function ExchangesTab() {
  return (
    <div className="mp-tab-content">
      <div className="mp-exc-grid">
        {LINKED.map((ex) => (
          <div key={ex.slug} className={`mp-exc-card ${ex.status}`}>
            <div className="mp-exc-card-top">
              <div className="mp-exc-card-logo">
                {LOGO_MAP[ex.slug]
                  ? <img src={LOGO_MAP[ex.slug]} alt={ex.name} width="72" height="22" style={{ objectFit: 'contain', objectPosition: 'left' }} />
                  : <span style={{ fontWeight: 700 }}>{ex.name}</span>}
              </div>
              <div className="mp-exc-card-badges">
                <span className={`mp-exc-badge ${ex.status}`}>
                  <span className={`mp-exc-status-dot ${ex.status}`} />
                  {ex.status === 'active' ? 'Active' : 'Pending'}
                </span>
                <span className="mp-exc-type-badge">{ex.type}</span>
              </div>
            </div>
            <div className="mp-exc-card-stats">
              <div className="mp-exc-stat"><span className="mp-exc-stat-label">Total earned</span><span className="mp-exc-stat-val">${fmt(ex.earnedTotal)}</span></div>
              <div className="mp-exc-stat"><span className="mp-exc-stat-label">Avg / month</span><span className="mp-exc-stat-val">${fmt(ex.avgMonthly)}</span></div>
              <div className="mp-exc-stat"><span className="mp-exc-stat-label">Rebate rate</span><span className="mp-exc-stat-val mp-accent">{(ex.rebateRate * 100).toFixed(0)}% back</span></div>
            </div>
            <div className="mp-exc-card-meta">
              <div className="mp-exc-uid-row">
                <span className="mp-exc-uid-label">UID</span>
                <code className="mp-exc-uid">{ex.uid}</code>
                <button className="mp-icon-btn" aria-label="Copy UID"><IconCopy /></button>
              </div>
              <span className="mp-exc-since">Connected {ex.connectedDate}</span>
            </div>
            {ex.status === 'pending' && (
              <div className="mp-exc-pending-notice"><IconBell /> Verification in progress · usually 24–48h</div>
            )}
          </div>
        ))}
        <a href={`${LANDING}/en/exchanges`} className="mp-exc-add-card">
          <div className="mp-exc-add-icon"><IconPlus /></div>
          <div className="mp-exc-add-title">Add exchange</div>
          <div className="mp-exc-add-desc">Connect another exchange to earn on more of your volume</div>
        </a>
      </div>
    </div>
  );
}

/* ─── Settings ──────────────────────────────────── */
function SettingsTab() {
  const [notifications, setNotifications] = useState({ payout: true, cycle: true, promo: false, security: true });
  type K = keyof typeof notifications;

  return (
    <div className="mp-tab-content">
      <div className="mp-card">
        <div className="mp-settings-section-title">Profile</div>
        <div className="mp-settings-field"><label className="mp-settings-label">Display name</label><input className="mp-settings-input" defaultValue={USER.name} /></div>
        <div className="mp-settings-field"><label className="mp-settings-label">Handle</label><input className="mp-settings-input" defaultValue={USER.handle} /></div>
        <div className="mp-settings-field"><label className="mp-settings-label">Email</label><input className="mp-settings-input" type="email" defaultValue="m.trading@proton.me" /></div>
        <button className="mp-settings-save">Save changes</button>
      </div>

      <div className="mp-card">
        <div className="mp-settings-section-title">Payout wallet</div>
        <div className="mp-settings-field">
          <label className="mp-settings-label">USDT address (TRC-20)</label>
          <div className="mp-wallet-row">
            <code className="mp-wallet-addr">TLa7T…xQ4mZ</code>
            <button className="mp-icon-btn" aria-label="Copy address"><IconCopy /></button>
          </div>
        </div>
        <div className="mp-settings-note"><IconShield /> Wallet address is verified at setup. Contact support to change.</div>
      </div>

      <div className="mp-card">
        <div className="mp-settings-section-title">Notifications</div>
        {([
          { key: 'payout' as K,   label: 'Payout sent',     desc: 'When your rebate lands in your wallet' },
          { key: 'cycle' as K,    label: 'Cycle summary',    desc: 'Weekly recap of your trading activity' },
          { key: 'security' as K, label: 'Security alerts',  desc: 'New UID linked or account changes' },
          { key: 'promo' as K,    label: 'Updates & offers', desc: 'New exchanges, rate changes, promotions' },
        ]).map((n) => (
          <div key={n.key} className="mp-notif-row">
            <div><div className="mp-notif-label">{n.label}</div><div className="mp-notif-desc">{n.desc}</div></div>
            <button
              role="switch" aria-checked={notifications[n.key]}
              className={`mp-toggle${notifications[n.key] ? ' on' : ''}`}
              onClick={() => setNotifications((p) => ({ ...p, [n.key]: !p[n.key] }))}
            ><span className="mp-toggle-thumb" /></button>
          </div>
        ))}
      </div>

      <div className="mp-card">
        <div className="mp-settings-section-title">Security</div>
        <div className="mp-security-row">
          <div><div className="mp-security-label">Two-factor authentication</div><div className="mp-security-desc">Add an extra layer of protection</div></div>
          <button className="mp-btn-ghost-sm">Enable 2FA</button>
        </div>
        <div className="mp-security-row">
          <div><div className="mp-security-label">Change password</div><div className="mp-security-desc">Last changed 3 months ago</div></div>
          <button className="mp-btn-ghost-sm">Update</button>
        </div>
        <div className="mp-security-row mp-danger-row">
          <div><div className="mp-security-label">Delete account</div><div className="mp-security-desc">Permanently remove your account and all data</div></div>
          <button className="mp-btn-danger-sm">Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Shell ─────────────────────────────────────── */
const TABS: { key: Tab; label: string; Icon: () => JSX.Element }[] = [
  { key: 'overview',  label: 'Overview',       Icon: IconOverview  },
  { key: 'history',   label: 'Payout history', Icon: IconHistory   },
  { key: 'exchanges', label: 'Exchanges',       Icon: IconExchanges },
  { key: 'settings',  label: 'Settings',        Icon: IconSettings  },
];

export default function MyPage({ onHome }: MyPageProps = {}) {
  const [tab, setTab] = useState<Tab>('overview');

  return (
    <>
      <LandingNav onHome={onHome} />
      <div className="mp-shell">
        {/* Sidebar */}
        <aside className="mp-sidebar">
          <div className="mp-sidebar-brand">
            <img src="/brand/reboundx.svg" alt="ReboundX" width="120" height="18" style={{ display: 'block' }} />
          </div>

          <div className="mp-sidebar-profile">
            <div className="mp-avatar">{USER.name[0]}</div>
            <div className="mp-profile-info">
              <div className="mp-profile-name">{USER.name}</div>
              <div className="mp-profile-handle">{USER.handle}</div>
            </div>
          </div>

          <nav className="mp-sidebar-nav" aria-label="Platform navigation">
            {TABS.map(({ key, label, Icon }) => (
              <button key={key} className={`mp-nav-item${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>
                <Icon /><span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="mp-sidebar-footer">
            <div className="mp-sidebar-total-label">Total earned</div>
            <div className="mp-sidebar-total">${fmt(USER.totalEarned)}</div>
            <a href={`${LANDING}/`} className="mp-back-btn">
              <IconBack /> Back to site
            </a>
          </div>
        </aside>

        {/* Main */}
        <main className="mp-main">
          {/* Mobile header */}
          <div className="mp-mobile-header">
            <a href={`${LANDING}/`} className="mp-back-mobile" aria-label="Back to site"><IconBack /></a>
            <img src="/brand/reboundx.svg" alt="ReboundX" width="100" height="16" />
            <div className="mp-mobile-avatar">{USER.name[0]}</div>
          </div>

          {/* Mobile tabs */}
          <div className="mp-mobile-tabs" role="tablist">
            {TABS.map(({ key, label, Icon }) => (
              <button key={key} role="tab" aria-selected={tab === key} className={`mp-mobile-tab${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>
                <Icon /><span>{label}</span>
              </button>
            ))}
          </div>

          <div className="mp-content-area">
            <div className="mp-content-header">
              <h1 className="mp-content-title">{TABS.find((t) => t.key === tab)?.label}</h1>
              {tab === 'overview' && <div className="mp-welcome">Welcome back, {USER.name.split(' ')[0]}</div>}
            </div>

            {tab === 'overview'  && <OverviewTab onNav={setTab} />}
            {tab === 'history'   && <HistoryTab />}
            {tab === 'exchanges' && <ExchangesTab />}
            {tab === 'settings'  && <SettingsTab />}
          </div>
        </main>
      </div>
    </>
  );
}
