import { useAnimatedNumber } from "../../lib/useAnimatedNumber";
import { fmtMoney, fmtNumber } from "../../lib/format";
import { cn } from "../../lib/cn";

type Props = {
  value: number;
  format?: "money" | "number" | "money-cents";
  className?: string;
  ariaLabel?: string;
  animate?: boolean;
};

export function NumberDisplay({
  value,
  format = "money",
  className,
  ariaLabel,
  animate = true,
}: Props) {
  const animated = useAnimatedNumber(animate ? value : value);
  const shown = animate ? animated : value;
  const text =
    format === "money"
      ? fmtMoney(Math.round(shown))
      : format === "money-cents"
        ? fmtMoney(shown, { cents: true })
        : fmtNumber(shown);

  return (
    <span
      className={cn("mono tabular-nums", className)}
      aria-label={ariaLabel ?? text}
    >
      {text}
    </span>
  );
}
