"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";

interface Props {
  children: ReactNode;
  intensity?: number;
  glare?: boolean;
  className?: string;
  innerClassName?: string;
}

/**
 * Card 3D que se inclina siguiendo el mouse. Opcionalmente con efecto glare
 * (luz radial que sigue al cursor).
 */
export function TiltCard({
  children,
  intensity = 10,
  glare = true,
  className = "",
  innerClassName = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(my, [0, 1], [intensity, -intensity]),
    { stiffness: 150, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(mx, [0, 1], [-intensity, intensity]),
    { stiffness: 150, damping: 20 }
  );

  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.25), transparent 50%)`;

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative overflow-hidden ${innerClassName}`}
      >
        {children}
        {glare && (
          <motion.div
            style={{ background: glareBg }}
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
            aria-hidden="true"
          />
        )}
      </motion.div>
    </div>
  );
}
