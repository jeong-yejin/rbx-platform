import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helper?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
  mono?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, helper, prefix, suffix, error, mono, className, id, ...rest },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const describedBy = helper || error ? `${inputId}-desc` : undefined;

  return (
    <div className="flex flex-col gap-[var(--s-2)]">
      {label && (
        <label
          htmlFor={inputId}
          className="t-micro text-[var(--ink-muted)]"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex items-baseline gap-[10px] border-b transition-colors duration-[var(--dur-fast)]",
          "border-[var(--rule-strong)] focus-within:border-[var(--accent)]",
          error && "border-[var(--negative)]",
        )}
      >
        {prefix && (
          <span
            aria-hidden
            className={cn(
              "text-[var(--ink-muted)] text-[20px] leading-none",
              mono && "mono",
            )}
          >
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={cn(
            "flex-1 py-[12px] text-[20px] leading-none placeholder:text-[var(--ink-subtle)] bg-transparent",
            mono && "mono",
            className,
          )}
          {...rest}
        />
        {suffix && (
          <span className="text-[var(--ink-muted)] text-[14px] py-[16px]">
            {suffix}
          </span>
        )}
      </div>
      {(helper || error) && (
        <p
          id={describedBy}
          className={cn(
            "t-small",
            error ? "text-[var(--negative)]" : "text-[var(--ink-muted)]",
          )}
        >
          {error ?? helper}
        </p>
      )}
    </div>
  );
});
