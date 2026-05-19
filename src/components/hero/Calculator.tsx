import { useMemo, useState } from "react";
import { NumberDisplay } from "../primitives/NumberDisplay";
import { Input } from "../primitives/Input";

type Props = {
  onStart: () => void;
};

const REBATE_RATE = 0.62;
const ASSUMED_FEE_BPS = 6;
const BPS_DIVISOR = 10_000;
const MAX_MONTHLY_VOLUME_USD = 100_000_000;
const DEFAULT_VOLUME_USD = 500_000;
const REBATE_PERCENT_LABEL = `${Math.round(REBATE_RATE * 100)}%`;

export function Calculator({ onStart }: Props) {
  const [volume, setVolume] = useState<number>(DEFAULT_VOLUME_USD);

  const result = useMemo(() => {
    const fees = (volume * ASSUMED_FEE_BPS) / BPS_DIVISOR;
    const back = fees * REBATE_RATE;
    return { fees, back };
  }, [volume]);

  return (
    <section
      className="flex flex-col items-start gap-[var(--s-8)] py-[var(--s-12)]"
      aria-labelledby="calc-heading"
    >
      <h2 id="calc-heading" className="t-h2 max-w-[18ch] text-[var(--ink)]">
        Type your monthly volume.
      </h2>

      <div className="w-full max-w-[420px]">
        <Input
          label="Monthly trading volume"
          prefix="$"
          mono
          type="text"
          inputMode="numeric"
          pattern="[0-9,]*"
          value={volume.toLocaleString("en-US")}
          onChange={(e) => {
            const digits = e.target.value.replace(/[^0-9]/g, "");
            const next = digits ? Number(digits) : 0;
            if (next <= MAX_MONTHLY_VOLUME_USD) setVolume(next);
          }}
          helper="Notional volume including leverage. No signup, no email — just math."
        />
      </div>

      <div className="flex flex-col gap-[var(--s-2)]" aria-live="polite">
        <p className="t-micro text-[var(--ink-muted)]">
          You should be getting back
        </p>
        <NumberDisplay
          value={result.back}
          format="money"
          className="t-display"
          ariaLabel={`${Math.round(result.back).toLocaleString("en-US")} dollars per month`}
        />
        <p className="text-[14px] text-[var(--ink-muted)] mono">
          per month · ${Math.round(result.fees).toLocaleString()} in fees · {REBATE_PERCENT_LABEL} returned
        </p>
      </div>

      <button
        onClick={onStart}
        className="group inline-flex items-baseline gap-[10px] text-[16px] font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
      >
        See how this works
        <span
          aria-hidden
          className="transition-transform duration-[var(--dur-base)] group-hover:translate-x-[4px]"
        >
          →
        </span>
      </button>
    </section>
  );
}
