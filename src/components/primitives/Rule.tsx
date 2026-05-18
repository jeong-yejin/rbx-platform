import { cn } from "../../lib/cn";

type Props = {
  variant?: "default" | "strong" | "dashed";
  className?: string;
};

export function Rule({ variant = "default", className }: Props) {
  return (
    <hr
      className={cn(
        "border-0 h-px w-full",
        variant === "default" && "bg-[var(--rule)]",
        variant === "strong" && "bg-[var(--rule-strong)]",
        variant === "dashed" &&
          "h-0 border-t border-dashed border-[var(--rule)] bg-transparent",
        className,
      )}
    />
  );
}
