import { CSSProperties, ComponentPropsWithoutRef, memo } from 'react';

interface RippleProps extends ComponentPropsWithoutRef<'div'> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  style,
  ...props
}: RippleProps) {
  const wrapperClass = ['ui-ripple', className].filter(Boolean).join(' ');
  return (
    <div className={wrapperClass} style={style} aria-hidden="true" {...props}>
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = Math.max(mainCircleOpacity - i * 0.03, 0);
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';
        const borderOpacity = 5 + i * 5;

        const circleStyle: CSSProperties = {
          width: `${size}px`,
          height: `${size}px`,
          opacity,
          animationDelay,
          borderStyle,
          borderWidth: '1px',
          borderColor: `rgba(245, 245, 245, ${borderOpacity / 100})`,
        };

        return <span key={i} className="ui-ripple-circle" style={circleStyle} />;
      })}
    </div>
  );
});
