import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  label?: string;
  onClick?(): void;
  className?: string;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ label = 'Generate', onClick, className }, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
      onClick?.();
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn('glow-btn', className)}
        onClick={handleClick}
        data-state={isClicked ? 'clicked' : undefined}
      >
        <span className="flex items-center justify-center gap-1.5">
          {label}
        </span>
      </button>
    );
  },
);

GlowButton.displayName = 'GlowButton';
