import { Button } from "../primitives/Button";

type Props = {
  onStart: () => void;
};

export function FinalCTA({ onStart }: Props) {
  return (
    <section
      className="container pt-[var(--s-24)]"
      aria-labelledby="cta-heading"
    >
      <div className="border-t border-[var(--rule)] pt-[var(--s-12)]">
        <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-3)]">
          Last thing
        </p>
        <h2 id="cta-heading" className="t-h1 max-w-[18ch]">
          Every day without it,{" "}
          <span className="text-[var(--ink-muted)]">
            you trade for free — for them.
          </span>
        </h2>
        <p className="t-body text-[var(--ink-muted)] mt-[var(--s-4)] max-w-[56ch]">
          A UID's referrer is permanent. There's no way to switch it later. Open your rebate account before your next trade.
        </p>
        <div className="mt-[var(--s-8)] flex flex-wrap items-baseline gap-[var(--s-6)]">
          <Button size="lg" onClick={onStart} trailingArrow>
            Open my rebate account
          </Button>
          <span className="text-[14px] text-[var(--ink-muted)]">
            30 seconds · no card · no commitment
          </span>
        </div>
      </div>
    </section>
  );
}
