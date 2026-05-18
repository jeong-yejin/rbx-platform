import { useEffect, useRef, useState } from "react";
import { Rule } from "../primitives/Rule";
import { Button } from "../primitives/Button";
import { EXCHANGES, type Exchange } from "../../data/exchanges";
import { usePageVisibility } from "../../lib/usePageVisibility";
import { cn } from "../../lib/cn";

function rebateText(e: Exchange): string {
  if (e.rebateLabel) return e.rebateLabel;
  if (e.rebateRate === null) return "—";
  return `${e.rebateRate}% back`;
}

type Props = {
  selected: Exchange | null;
  onSelect: (exchange: Exchange) => void;
  onComplete: () => void;
};

type Status = "idle" | "opened" | "returned";

export function Step2Exchange({ selected, onSelect, onComplete }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const openedAt = useRef<number | null>(null);

  usePageVisibility(() => {
    if (status === "opened") {
      const elapsed = openedAt.current ? Date.now() - openedAt.current : 0;
      if (elapsed > 1500) setStatus("returned");
    }
  });

  const open = (exchange: Exchange) => {
    onSelect(exchange);
    openedAt.current = Date.now();
    setStatus("opened");
    window.open(
      `https://www.${exchange.id}.com/?ref=ReboundX`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  useEffect(() => {
    setStatus("idle");
    openedAt.current = null;
  }, [selected?.id]);

  return (
    <div className="flex flex-col gap-[var(--s-8)] max-w-[640px]">
      <div className="flex flex-col gap-[var(--s-3)]">
        <p className="t-micro text-[var(--ink-muted)]">Step 02 of 04</p>
        <h2 className="t-h1">Pick your exchange.</h2>
        <p className="t-body text-[var(--ink-muted)]">
          Opening through this link is what makes the rebate work. UIDs can't switch referrers later — this is the step that matters.
        </p>
      </div>

      <div>
        <Rule />
        <ul>
          {EXCHANGES.filter((e) => e.status === "live").map((exchange) => {
            const isSelected = selected?.id === exchange.id;
            return (
              <li key={exchange.id}>
                <button
                  type="button"
                  onClick={() => open(exchange)}
                  className={cn(
                    "w-full grid grid-cols-[160px_1fr_auto] gap-[var(--s-4)] py-[var(--s-4)] items-center text-left transition-colors hover:bg-[var(--bg-hover)] -mx-[var(--s-2)] px-[var(--s-2)]",
                    isSelected && "bg-[var(--accent-soft)]",
                  )}
                >
                  <img
                    src={exchange.logo}
                    alt={exchange.name}
                    height={22}
                    className="h-[22px] w-auto max-w-[140px]"
                    loading="lazy"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="mono text-[12px] text-[var(--ink-muted)]">
                      {exchange.type}{exchange.tier ? ` · ${exchange.tier}` : ""}
                    </span>
                  </div>
                  <span className="mono text-[14px] text-[var(--accent)] justify-self-end whitespace-nowrap">
                    {rebateText(exchange)}
                  </span>
                </button>
                <Rule />
              </li>
            );
          })}
        </ul>
      </div>

      <div aria-live="polite" className="min-h-[80px]">
        {status === "opened" && selected && (
          <div className="flex flex-col gap-[var(--s-3)]">
            <p className="t-body">
              <span className="text-[var(--accent)] font-medium">Tracking active.</span>{" "}
              <span className="text-[var(--ink-muted)]">
                Finish signing up in the {selected.name} tab. We'll detect when you come back.
              </span>
            </p>
            <div className="flex flex-wrap items-baseline gap-[var(--s-4)]">
              <Button variant="primary" trailingArrow onClick={() => setStatus("returned")}>
                I've signed up
              </Button>
              <span className="t-small text-[var(--ink-muted)]">
                Or just return to this tab — we'll move you along automatically.
              </span>
            </div>
          </div>
        )}

        {status === "returned" && selected && (
          <div className="flex flex-col gap-[var(--s-3)]">
            <p className="t-body">
              <span className="text-[var(--accent)] font-medium">Welcome back.</span>{" "}
              <span className="text-[var(--ink-muted)]">
                Next: paste your {selected.name} UID so we can match your trades.
              </span>
            </p>
            <Button size="lg" trailingArrow onClick={onComplete}>
              Continue to UID
            </Button>
          </div>
        )}

        {status === "idle" && selected && (
          <p className="t-small text-[var(--ink-muted)]">
            Already have a {selected.name} account?{" "}
            <span className="text-[var(--ink)]">You'll need a new one</span> — UIDs can't switch referrers.
          </p>
        )}
      </div>
    </div>
  );
}
