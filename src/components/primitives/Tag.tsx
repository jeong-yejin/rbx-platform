import { cn } from "../../lib/cn";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "default" | "muted" | "accent";
  className?: string;
};

export function Tag({ children, variant = "default", className }: Props) {
  return (
    <span
      className={cn(
        "t-micro inline-flex items-center",
        variant === "default" && "text-[var(--ink)]",
        variant === "muted" && "text-[var(--ink-muted)] italic normal-case tracking-normal text-[13px] font-normal",
        variant === "accent" && "text-[var(--accent)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
