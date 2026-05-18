import { useEffect, useRef, useState } from "react";

const PREFERS_REDUCED_MOTION = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function useAnimatedNumber(target: number, duration = 480) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (PREFERS_REDUCED_MOTION()) {
      setValue(target);
      fromRef.current = target;
      return;
    }

    const from = fromRef.current;
    const delta = target - from;
    if (delta === 0) return;

    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      const next = from + delta * eased;
      setValue(next);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else {
        fromRef.current = target;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}
