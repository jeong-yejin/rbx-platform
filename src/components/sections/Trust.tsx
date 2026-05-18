import { SectionHeader } from "./SectionHeader";
import { Rule } from "../primitives/Rule";

type Receipt = {
  date: string;
  trader: string;
  amount: string;
  network: string;
};

const RECENT: Receipt[] = [
  { date: "2026-05-15", trader: "trader…a3F2", amount: "$1,284.20", network: "TRC20" },
  { date: "2026-05-15", trader: "trader…91Bd", amount: "$612.04", network: "TRC20" },
  { date: "2026-05-14", trader: "trader…4Kp1", amount: "$2,109.55", network: "ERC20" },
  { date: "2026-05-14", trader: "trader…hF8n", amount: "$87.40", network: "SOL" },
  { date: "2026-05-13", trader: "trader…0xQ2", amount: "$4,420.18", network: "TRC20" },
];

export function Trust() {
  return (
    <section
      id="trust"
      className="container pt-[var(--s-24)] scroll-mt-[80px]"
      aria-labelledby="trust-heading"
    >
      <SectionHeader
        eyebrow="Trust"
        title={
          <>
            We never touch your funds.{" "}
            <span className="text-[var(--ink-muted)]">We only send to your address.</span>
          </>
        }
        description="The rebate flow is one-directional: the exchange remits to us, we remit to you. Every payout is on-chain, every receipt is exportable."
      />
      <h3 id="trust-heading" className="sr-only">Trust signals</h3>

      <div className="mt-[var(--s-12)] grid gap-[var(--s-8)] md:grid-cols-3">
        <div>
          <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
            Lifetime returned
          </p>
          <p className="t-display mono leading-none">$4.2M</p>
          <p className="t-small text-[var(--ink-muted)] mt-[var(--s-2)]">
            Across 184,420 payouts since Aug 2022
          </p>
        </div>
        <div>
          <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
            Active traders
          </p>
          <p className="t-display mono leading-none">23,140</p>
          <p className="t-small text-[var(--ink-muted)] mt-[var(--s-2)]">
            +412 this week
          </p>
        </div>
        <div>
          <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
            Median payout latency
          </p>
          <p className="t-display mono leading-none">6.4d</p>
          <p className="t-small text-[var(--ink-muted)] mt-[var(--s-2)]">
            From trade close to wallet credit
          </p>
        </div>
      </div>

      <div className="mt-[var(--s-16)]">
        <div className="flex items-baseline justify-between mb-[var(--s-3)]">
          <p className="t-micro text-[var(--ink-muted)]">
            Recent payouts · live
          </p>
          <a
            href="#"
            className="text-[13px] text-[var(--ink-muted)] hover:text-[var(--accent)]"
          >
            View on-chain →
          </a>
        </div>
        <Rule />
        <ul className="mono text-[13px]">
          {RECENT.map((r) => (
            <li
              key={r.date + r.trader}
              className="grid grid-cols-[100px_1fr_auto_60px] gap-[var(--s-4)] py-[var(--s-3)] items-baseline"
            >
              <span className="text-[var(--ink-muted)]">{r.date}</span>
              <span>{r.trader}</span>
              <span>{r.amount}</span>
              <span className="text-[var(--ink-muted)] justify-self-end">
                {r.network}
              </span>
            </li>
          ))}
        </ul>
        <Rule />
      </div>
    </section>
  );
}
