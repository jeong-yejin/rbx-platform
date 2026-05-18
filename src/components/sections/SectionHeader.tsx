import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--s-3)] max-w-[64ch]",
        align === "center" && "items-center text-center mx-auto",
        className,
      )}
    >
      <p className="t-micro text-[var(--ink-muted)]">{eyebrow}</p>
      <h2 className="t-h1 text-[var(--ink)]">{title}</h2>
      {description && (
        <p className="t-body text-[var(--ink-muted)] max-w-[56ch]">
          {description}
        </p>
      )}
    </div>
  );
}
