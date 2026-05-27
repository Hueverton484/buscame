"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";

interface Props {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  format?: (v: number) => string;
  prefix?: string;
  suffix?: string;
}

/**
 * Número que cuenta de 0 al valor cuando entra al viewport.
 * Solo se anima una vez.
 */
export function AnimatedCounter({
  value,
  duration = 2.2,
  delay = 0,
  className = "",
  format = (v) => v.toLocaleString("es-AR"),
  prefix = "",
  suffix = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${format(Math.round(v))}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, value, duration, delay, count]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}
