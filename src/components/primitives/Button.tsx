import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "ghost" | "link";
type Size = "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  trailingArrow?: boolean;
};

const base =
  "inline-flex items-center gap-[10px] font-medium transition-colors duration-[var(--dur-fast)] disabled:opacity-40 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--accent)] active:bg-[var(--accent-hover)]",
  ghost:
    "bg-transparent text-[var(--ink)] hover:bg-[var(--bg-hover)]",
  link: "bg-transparent text-[var(--ink)] hover:text-[var(--accent)] px-0",
};

const sizes: Record<Size, string> = {
  md: "h-[44px] px-[20px] text-[15px]",
  lg: "h-[52px] px-[24px] text-[16px]",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    trailingArrow = false,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[variant === "link" ? "md" : size], className)}
      {...rest}
    >
      <span>{children}</span>
      {trailingArrow && (
        <span aria-hidden className="translate-y-[-1px] text-current">
          →
        </span>
      )}
    </button>
  );
});
