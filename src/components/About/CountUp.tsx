import { useEffect, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

export function CountUp({ value, index, active, accent = false }: { value: string; index: number; active: boolean; accent?: boolean }) {
  const target = Number.parseInt(value, 10);
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setCurrent(target);
      return;
    }
    if (!active) return;
    const control = animate(0, target, {
      duration: 1.55,
      delay: index * 0.14,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: latest => setCurrent(Math.round(latest)),
    });
    return () => control.stop();
  }, [active, index, reduced, target]);

  return <strong className={accent ? 'is-accent' : ''} aria-label={value}><span aria-hidden="true">{current}+</span></strong>;
}
