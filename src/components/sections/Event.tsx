import { Rule } from "../primitives/Rule";

type Props = {
  onStart: () => void;
};

export function Event({ onStart }: Props) {
  return (
    <section
      id="event"
      className="container pt-[var(--s-24)] scroll-mt-[80px]"
      aria-labelledby="event-heading"
    >
      <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-3)]">Now</p>
      <h2
        id="event-heading"
        className="t-h1 max-w-[22ch] text-[var(--ink)]"
      >
        Spring rebate boost.{" "}
        <span className="text-[var(--ink-muted)]">
          Extra <span className="mono">10%</span> on Backpack volume through May 31.
        </span>
      </h2>

      <div className="mt-[var(--s-8)]">
        <Rule />
        <ul className="grid grid-cols-1 md:grid-cols-3">
          <li className="py-[var(--s-6)] md:pr-[var(--s-8)] md:border-r md:border-[var(--rule)]">
            <p className="t-micro text-[var(--ink-muted)]">Top this month</p>
            <p className="t-h2 mono mt-[var(--s-2)] text-[var(--ink)]">
              1,396.45 <span className="text-[14px] text-[var(--ink-muted)]">USDT</span>
            </p>
            <p className="t-small text-[var(--ink-muted)] mt-[var(--s-1)]">
              Average Backpack rebate, last 30 days
            </p>
          </li>
          <li className="py-[var(--s-6)] md:px-[var(--s-8)] md:border-r md:border-[var(--rule)] border-t border-[var(--rule)] md:border-t-0">
            <p className="t-micro text-[var(--ink-muted)]">No opt-in</p>
            <p className="t-h2 mono mt-[var(--s-2)] text-[var(--ink)]">
              Auto-applied
            </p>
            <p className="t-small text-[var(--ink-muted)] mt-[var(--s-1)]">
              Boost ships with your regular cycle. No code, no checkbox.
            </p>
          </li>
          <li className="py-[var(--s-6)] md:pl-[var(--s-8)] border-t border-[var(--rule)] md:border-t-0">
            <p className="t-micro text-[var(--ink-muted)]">Closes in</p>
            <p className="t-h2 mono mt-[var(--s-2)] text-[var(--ink)]">
              12d 04h
            </p>
            <p className="t-small text-[var(--ink-muted)] mt-[var(--s-1)]">
              Only volume after sign-up counts toward the boost.
            </p>
          </li>
        </ul>
        <Rule />
      </div>

      <div className="mt-[var(--s-6)]">
        <button
          onClick={onStart}
          className="group inline-flex items-baseline gap-[10px] text-[16px] font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
        >
          Claim the boost
          <span
            aria-hidden
            className="transition-transform duration-[var(--dur-base)] group-hover:translate-x-[4px]"
          >
            →
          </span>
        </button>
      </div>
    </section>
  );
}
