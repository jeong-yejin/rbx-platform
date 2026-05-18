import { Calculator } from "./Calculator";

type Props = {
  onStart: () => void;
};

export function Hero({ onStart }: Props) {
  return (
    <section
      className="container pt-[var(--s-16)] md:pt-[var(--s-24)]"
      aria-labelledby="hero-heading"
    >
      <div className="grid gap-[var(--s-12)] lg:grid-cols-[1.05fr_1fr] lg:gap-[var(--s-16)] items-start">
        <div className="flex flex-col gap-[var(--s-6)]">
          <p className="t-micro text-[var(--ink-muted)]">
            ReboundX · Fee-rebate platform
          </p>
          <h1
            id="hero-heading"
            className="t-display text-[var(--ink)] max-w-[14ch]"
          >
            <span>You paid </span>
            <span className="mono">$14,820</span>
            <span> in fees last year.</span>
            <br />
            <span className="text-[var(--ink-muted)]">62% of that should have been yours.</span>
          </h1>
          <p className="t-body text-[var(--ink-muted)] max-w-[52ch]">
            Exchanges already pay a referrer 40–62% of every fee they collect. ReboundX is that referrer — and we send the commission back to the person who actually traded. You.
          </p>
        </div>

        <div
          id="calculator"
          className="border-t border-[var(--rule)] lg:border-t-0 lg:border-l lg:pl-[var(--s-12)] pt-[var(--s-8)] lg:pt-0 scroll-mt-[80px]"
        >
          <Calculator onStart={onStart} />
        </div>
      </div>

      <div className="mt-[var(--s-16)] flex flex-wrap items-baseline gap-x-[var(--s-12)] gap-y-[var(--s-3)] text-[14px] text-[var(--ink-muted)]">
        <span>
          <span className="mono text-[var(--ink)]">23,140</span> traders
        </span>
        <span aria-hidden>·</span>
        <span>
          <span className="mono text-[var(--ink)]">$4.2M</span> returned
        </span>
        <span aria-hidden>·</span>
        <span>Audited monthly</span>
      </div>
    </section>
  );
}
