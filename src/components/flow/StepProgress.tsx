import { cn } from "../../lib/cn";

export type StepKey = 1 | 2 | 3 | 4;

const STEPS: { key: StepKey; label: string }[] = [
  { key: 1, label: "Sign in" },
  { key: 2, label: "Open exchange" },
  { key: 3, label: "Paste UID" },
  { key: 4, label: "Connect wallet" },
];

type Props = {
  current: StepKey;
  completed: Set<StepKey>;
  onJump?: (step: StepKey) => void;
};

export function StepProgress({ current, completed, onJump }: Props) {
  return (
    <nav aria-label="Onboarding progress">
      <ol className="flex flex-col gap-[var(--s-3)]">
        {STEPS.map((step) => {
          const isDone = completed.has(step.key);
          const isCurrent = step.key === current;
          const isPast = step.key < current || isDone;
          const isFuture = !isPast && !isCurrent;
          const canJump = onJump && (isDone || step.key < current);

          return (
            <li key={step.key}>
              <button
                type="button"
                disabled={!canJump}
                onClick={() => canJump && onJump(step.key)}
                className={cn(
                  "w-full grid grid-cols-[28px_1fr_20px] gap-[var(--s-3)] items-center text-left py-[var(--s-2)]",
                  canJump && "hover:text-[var(--accent)] cursor-pointer",
                  !canJump && "cursor-default",
                )}
              >
                <span
                  className={cn(
                    "mono text-[12px]",
                    isCurrent
                      ? "text-[var(--ink)]"
                      : "text-[var(--ink-subtle)]",
                  )}
                >
                  {String(step.key).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-[14px] relative",
                    isCurrent && "text-[var(--ink)] font-medium",
                    isPast && !isCurrent && "text-[var(--ink-muted)]",
                    isFuture && "text-[var(--ink-subtle)]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-[12px] right-0 bottom-[-6px] h-px",
                      isCurrent && "bg-[var(--accent)]",
                      isDone && !isCurrent && "bg-[var(--ink-faint)]",
                    )}
                    style={
                      isFuture
                        ? {
                            backgroundImage:
                              "linear-gradient(to right, var(--rule) 50%, transparent 50%)",
                            backgroundSize: "8px 1px",
                            backgroundRepeat: "repeat-x",
                            height: 1,
                          }
                        : undefined
                    }
                  />
                  {step.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "justify-self-end text-[14px]",
                    isDone && "text-[var(--accent)]",
                    isCurrent && !isDone && "text-[var(--accent)]",
                    isFuture && "text-[var(--ink-subtle)]",
                  )}
                >
                  {isDone ? "✓" : isCurrent ? "●" : "○"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
