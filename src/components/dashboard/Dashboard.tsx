import { Rule } from "../primitives/Rule";
import { NumberDisplay } from "../primitives/NumberDisplay";
import { fmtCountdown, truncAddress } from "../../lib/format";

type DashboardData = {
  exchangeName: string;
  uid: string;
  address: string;
  network: string;
};

type Props = {
  data: DashboardData | null;
};

type Payout = {
  date: string;
  amount: number;
  network: string;
  txid: string;
  volume: number;
};

const HISTORY: Payout[] = [
  { date: "2026-05-12", amount: 237.42, network: "TRC20", txid: "a3F2…91Bd", volume: 312_400 },
  { date: "2026-05-05", amount: 184.06, network: "TRC20", txid: "9k1x…hF8n", volume: 248_800 },
  { date: "2026-04-28", amount: 392.81, network: "TRC20", txid: "5pQy…2nFx", volume: 521_200 },
  { date: "2026-04-21", amount: 64.55, network: "ERC20", txid: "0xQ2…ab18", volume: 84_900 },
];

const SECONDS_PER_DAY = 86_400;
const SECONDS_PER_HOUR = 3_600;
const SECONDS_PER_MINUTE = 60;
const NEXT_PAYOUT_SECONDS =
  2 * SECONDS_PER_DAY + 4 * SECONDS_PER_HOUR + 12 * SECONDS_PER_MINUTE;

const PENDING_THIS_MONTH_USD = 237.42;
const LIFETIME_RETURNED_USD = 4_820;
const LIFETIME_PAYOUT_COUNT = 14;
const FALLBACK_EXCHANGE = "Binance";
const FALLBACK_NETWORK = "TRC20";
const FALLBACK_UID = "1029…4756";
const FALLBACK_ADDRESS = "Tab9k…2nFx";
const ADDRESS_TRUNC_HEAD = 4;
const ADDRESS_TRUNC_TAIL = 4;

export function Dashboard({ data }: Props) {
  const nextPayout = fmtCountdown(NEXT_PAYOUT_SECONDS);
  const truncatedAddr = data
    ? truncAddress(data.address, ADDRESS_TRUNC_HEAD, ADDRESS_TRUNC_TAIL)
    : FALLBACK_ADDRESS;

  return (
    <section className="container pt-[var(--s-12)] pb-[var(--s-24)]">
      <div className="flex items-baseline justify-between mb-[var(--s-12)]">
        <div>
          <p className="t-micro text-[var(--ink-muted)]">Dashboard</p>
          <h1 className="t-h1 mt-[var(--s-2)]">
            <span className="text-[var(--ink-muted)]">Welcome back, </span>
            <span>trader.</span>
          </h1>
        </div>
        <a
          href="#"
          className="text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)]"
        >
          Export CSV →
        </a>
      </div>

      <Rule />

      <div className="grid gap-[var(--s-8)] md:grid-cols-[1.4fr_1fr] py-[var(--s-8)]">
        <div className="flex flex-col gap-[var(--s-2)]">
          <p className="t-micro text-[var(--ink-muted)]">This month · pending</p>
          <NumberDisplay
            value={PENDING_THIS_MONTH_USD}
            format="money-cents"
            className="t-display"
          />
          <p className="t-small text-[var(--ink-muted)] mono">
            Across 4 trading sessions on {data?.exchangeName ?? FALLBACK_EXCHANGE}
          </p>
        </div>
        <div className="flex flex-col gap-[var(--s-2)]">
          <p className="t-micro text-[var(--ink-muted)]">Next payout</p>
          <p className="t-display mono leading-none">{nextPayout}</p>
          <p className="t-small text-[var(--ink-muted)] mono">
            To {data?.network ?? FALLBACK_NETWORK} {truncatedAddr}
          </p>
        </div>
      </div>

      <Rule />

      <div className="grid gap-[var(--s-8)] md:grid-cols-3 py-[var(--s-8)]">
        <div>
          <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
            Lifetime returned
          </p>
          <p className="t-h1 mono">
            <NumberDisplay value={LIFETIME_RETURNED_USD} format="money" />
          </p>
          <p className="t-small text-[var(--ink-muted)] mt-[var(--s-1)]">
            Across {LIFETIME_PAYOUT_COUNT} payouts
          </p>
        </div>
        <div>
          <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
            Linked exchange
          </p>
          <p className="t-h1">{data?.exchangeName ?? FALLBACK_EXCHANGE}</p>
          <p className="t-small text-[var(--ink-muted)] mt-[var(--s-1)] mono">
            UID {data?.uid ?? FALLBACK_UID} · verified
          </p>
        </div>
        <div>
          <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
            Effective fee
          </p>
          <p className="t-h1 mono">0.024%</p>
          <p className="t-small text-[var(--ink-muted)] mt-[var(--s-1)]">
            From 0.06% spot · 60% rebated
          </p>
        </div>
      </div>

      <Rule />

      <div className="mt-[var(--s-12)]">
        <div className="flex items-baseline justify-between mb-[var(--s-4)]">
          <h2 className="t-h2">Payout history</h2>
          <span className="t-small text-[var(--ink-muted)] mono">
            Every cent traceable
          </span>
        </div>
        <Rule />
        <ul>
          <li
            aria-hidden
            className="grid grid-cols-[110px_1fr_120px_120px_80px] gap-[var(--s-4)] py-[var(--s-3)] t-micro text-[var(--ink-muted)]"
          >
            <span>Date</span>
            <span>Volume</span>
            <span>Amount</span>
            <span>Transaction</span>
            <span className="justify-self-end">Net</span>
          </li>
          <Rule />
          {HISTORY.map((p) => (
            <li key={p.txid}>
              <a
                href="#"
                className="grid grid-cols-[110px_1fr_120px_120px_80px] gap-[var(--s-4)] py-[var(--s-4)] items-baseline mono text-[14px] hover:bg-[var(--bg-hover)] -mx-[var(--s-2)] px-[var(--s-2)]"
              >
                <span className="text-[var(--ink-muted)]">{p.date}</span>
                <span>${p.volume.toLocaleString("en-US")}</span>
                <span>${p.amount.toFixed(2)}</span>
                <span className="text-[var(--ink-muted)]">{p.txid}</span>
                <span className="text-[var(--ink-muted)] justify-self-end">
                  {p.network}
                </span>
              </a>
              <Rule />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
