export interface Exchange {
  name: string; slug: string; type: 'CEX' | 'DEX';
  rebateRate: number; makerFee: number; takerFee: number;
  feeRate: number; avgRebate: number; dotColor: string;
  note?: string; noFee?: boolean; comingSoon?: boolean;
}

export const EXCHANGES: Exchange[] = [
  { name: 'Binance',     slug: 'binance',     type: 'CEX', rebateRate: 0.40, makerFee: 0.00012,   takerFee: 0.00024,   feeRate: 0.00024,   avgRebate: 609.10, dotColor: '#F0B90B', note: 'Futures only' },
  { name: 'OKX',         slug: 'okx',         type: 'CEX', rebateRate: 0.55, makerFee: 0.00009,   takerFee: 0.000225,  feeRate: 0.000225,  avgRebate: 101.88, dotColor: '#3ECF8E' },
  { name: 'Bybit',       slug: 'bybit',       type: 'CEX', rebateRate: 0.35, makerFee: 0.00013,   takerFee: 0.000286,  feeRate: 0.000286,  avgRebate: 116.69, dotColor: '#F59E0B' },
  { name: 'Backpack',    slug: 'backpack',    type: 'CEX', rebateRate: 0.35, makerFee: 0.00013,   takerFee: 0.000325,  feeRate: 0.000325,  avgRebate: 1395.49, dotColor: '#8B5CF6' },
  { name: 'Lighter',     slug: 'lighter',     type: 'DEX', rebateRate: 0,    makerFee: 0,         takerFee: 0,         feeRate: 0,         avgRebate: 0,      dotColor: '#A855F7', noFee: true },
  { name: 'GRVT',        slug: 'grvt',        type: 'DEX', rebateRate: 0.25, makerFee: -0.000001, takerFee: 0.0004125, feeRate: 0.0004125, avgRebate: 237.06, dotColor: '#EC4899' },
  { name: 'edgeX',       slug: 'edgex',       type: 'DEX', rebateRate: 0.30, makerFee: 0.00009,   takerFee: 0.000252,  feeRate: 0.000252,  avgRebate: 323.50, dotColor: '#06B6D4' },
  { name: 'Variational', slug: 'variational', type: 'DEX', rebateRate: 0.15, makerFee: 0,         takerFee: 0,         feeRate: 0,         avgRebate: 108.54, dotColor: '#F97316', noFee: true, note: 'Silver Tier · 15% extra' },
  { name: 'Nado',        slug: 'nado',        type: 'DEX', rebateRate: 0,    makerFee: 0,         takerFee: 0,         feeRate: 0,         avgRebate: 0,      dotColor: '#64748B', comingSoon: true },
];

export const VOLUME_PRESETS = [10_000, 50_000, 200_000, 500_000, 1_000_000];

export interface PerpDexVenue {
  name: string; slug: string;
  pointsPerM: number; pointValue: number;
  rebateRate: number; feeRate: number;
  volumeBoost?: string; note?: string;
}

export const PERP_VENUES: PerpDexVenue[] = [
  { name: 'Hyperliquid', slug: 'hyperliquid', pointsPerM: 1200, pointValue: 0.012, rebateRate: 0,    feeRate: 0.00035,   volumeBoost: '2× for new users', note: 'Airdrop active' },
  { name: 'GRVT',        slug: 'grvt',        pointsPerM: 800,  pointValue: 0.008, rebateRate: 0.25, feeRate: 0.0004125, note: '+ 25% rebate stacked' },
  { name: 'edgeX',       slug: 'edgex',       pointsPerM: 600,  pointValue: 0.006, rebateRate: 0.30, feeRate: 0.000252,  note: '+ 30% rebate stacked' },
  { name: 'Lighter',     slug: 'lighter',     pointsPerM: 500,  pointValue: 0.005, rebateRate: 0,    feeRate: 0,         note: 'Zero fee + points' },
];

export interface PlatformEvent {
  id: string; title: string; exchange: string; exchangeSlug: string;
  type: 'bonus' | 'competition' | 'launch' | 'airdrop';
  bonus: string; desc: string; endsAt: string; daysLeft: number;
  isNew?: boolean; isHot?: boolean;
}

export const EVENTS: PlatformEvent[] = [
  { id: 'ev1', title: 'OKX May Rebate Boost', exchange: 'OKX', exchangeSlug: 'okx', type: 'bonus', bonus: '+10% extra', desc: 'Stack an additional 10% on top of the standard 55% rebate for all trades in May 2025.', endsAt: 'May 31, 2025', daysLeft: 25, isHot: true },
  { id: 'ev2', title: 'Backpack New User Special', exchange: 'Backpack', exchangeSlug: 'backpack', type: 'launch', bonus: '40% rebate', desc: 'New accounts registered via ReboundX receive 40% rebate rate for the first 3 months.', endsAt: 'Jun 30, 2025', daysLeft: 55 },
  { id: 'ev3', title: 'Bybit Trading Competition', exchange: 'Bybit', exchangeSlug: 'bybit', type: 'competition', bonus: '$5,000 prize pool', desc: 'Top 10 traders by volume win a share of the $5,000 prize pool. Min. $10k volume to qualify.', endsAt: 'May 15, 2025', daysLeft: 9, isHot: true },
  { id: 'ev4', title: 'edgeX Points Airdrop', exchange: 'edgeX', exchangeSlug: 'edgex', type: 'airdrop', bonus: '2× points multiplier', desc: 'All trades on edgeX earn double points during the launch month. Points convert to tokens at TGE.', endsAt: 'May 31, 2025', daysLeft: 25, isNew: true },
  { id: 'ev5', title: 'Binance Futures Bonus', exchange: 'Binance', exchangeSlug: 'binance', type: 'bonus', bonus: '45% rebate', desc: 'Elevated rebate rate for futures traders who maintain at least $100k monthly volume.', endsAt: 'Jun 15, 2025', daysLeft: 40 },
];

export const USER = {
  name: 'Marcus T.', handle: '@marcustrades', joinDate: 'Jan 2025',
  totalEarned: 2847.32, totalTrades: 318, totalVolume: 4_230_000,
  referralCount: 7, referralEarned: 340.50,
};

export const CYCLE = {
  pending: 138.47, fees: 462.00, trades: 47,
  volume: 462_300, endsIn: '12 days', pct: 61, exchange: 'OKX',
};

export const PAYOUT_HISTORY = [
  { id: 'p1', exchange: 'OKX',      exchangeSlug: 'okx',      amount: 312.44, date: 'Apr 1, 2025',  fees: 568.08, trades: 89, status: 'paid' as const },
  { id: 'p2', exchange: 'Backpack', exchangeSlug: 'backpack', amount: 287.90, date: 'Mar 1, 2025',  fees: 822.57, trades: 74, status: 'paid' as const },
  { id: 'p3', exchange: 'OKX',      exchangeSlug: 'okx',      amount: 198.76, date: 'Feb 1, 2025',  fees: 361.38, trades: 55, status: 'paid' as const },
  { id: 'p4', exchange: 'Bybit',    exchangeSlug: 'bybit',    amount: 156.20, date: 'Jan 1, 2025',  fees: 446.29, trades: 48, status: 'paid' as const },
];

export const LINKED_EXCHANGES = [
  { name: 'OKX',      slug: 'okx',      status: 'active'  as const, earnedTotal: 823.40, rebateRate: 0.55 },
  { name: 'Backpack', slug: 'backpack', status: 'active'  as const, earnedTotal: 1640.22, rebateRate: 0.35 },
  { name: 'Bybit',    slug: 'bybit',    status: 'pending' as const, earnedTotal: 383.70, rebateRate: 0.35 },
];
