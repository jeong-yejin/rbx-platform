import * as React from 'react';
import { cn } from '@/lib/utils';

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

type Circle = {
  id: number;
  x: number;
  y: number;
  color: string;
  fadeState: 'in' | 'out' | null;
};

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [isListening, setIsListening] = React.useState(false);
    const [circles, setCircles] = React.useState<Circle[]>([]);
    const lastAddedRef = React.useRef(0);

    const createCircle = React.useCallback((x: number, y: number) => {
      const buttonWidth = buttonRef.current?.offsetWidth || 0;
      const xPos = x / buttonWidth;
      const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${xPos * 100}%)`;
      setCircles((prev) => [
        ...prev,
        { id: Date.now(), x, y, color, fadeState: null },
      ]);
    }, []);

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!isListening) return;
        const now = Date.now();
        if (now - lastAddedRef.current > 100) {
          lastAddedRef.current = now;
          const rect = event.currentTarget.getBoundingClientRect();
          createCircle(event.clientX - rect.left, event.clientY - rect.top);
        }
      },
      [isListening, createCircle],
    );

    const handlePointerEnter = React.useCallback(() => setIsListening(true), []);
    const handlePointerLeave = React.useCallback(() => setIsListening(false), []);

    React.useEffect(() => {
      circles.forEach((circle) => {
        if (circle.fadeState !== null) return;
        const inT  = setTimeout(() => setCircles((p) => p.map((c) => c.id === circle.id ? { ...c, fadeState: 'in' } : c)), 0);
        const outT = setTimeout(() => setCircles((p) => p.map((c) => c.id === circle.id ? { ...c, fadeState: 'out' } : c)), 1000);
        const rmT  = setTimeout(() => setCircles((p) => p.filter((c) => c.id !== circle.id)), 2200);
        return () => { clearTimeout(inT); clearTimeout(outT); clearTimeout(rmT); };
      });
    }, [circles]);

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={cn(
          'relative isolate px-8 py-3 rounded-3xl',
          'text-foreground font-medium text-base leading-6',
          'backdrop-blur-lg bg-[rgba(255,255,255,0.04)]',
          'cursor-pointer overflow-hidden',
          "before:content-[''] before:absolute before:inset-0",
          'before:rounded-[inherit] before:pointer-events-none',
          'before:z-[1]',
          'before:shadow-[inset_0_0_0_1px_rgba(202,255,93,0.25),inset_0_0_16px_0_rgba(202,255,93,0.12),inset_0_-3px_12px_0_rgba(202,255,93,0.18),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.45)]',
          'before:mix-blend-multiply before:transition-transform before:duration-300',
          'active:before:scale-[0.975]',
          className,
        )}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...props}
        style={{
          '--circle-start': '#EDFF9F',
          '--circle-end': '#A1E53C',
          ...(props.style ?? {}),
        } as React.CSSProperties}
      >
        {circles.map(({ id, x, y, color, fadeState }) => (
          <div
            key={id}
            className={cn(
              'absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full',
              'blur-lg pointer-events-none z-[-1] transition-opacity duration-300',
              fadeState === 'in' && 'opacity-75',
              fadeState === 'out' && 'opacity-0 duration-[1.2s]',
              !fadeState && 'opacity-0',
            )}
            style={{ left: x, top: y, background: color }}
          />
        ))}
        {children}
      </button>
    );
  },
);

HoverButton.displayName = 'HoverButton';

export { HoverButton };
