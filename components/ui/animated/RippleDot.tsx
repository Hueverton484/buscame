"use client";

import { motion } from "motion/react";

interface Props {
  size?: "sm" | "md" | "lg";
  color?: "red" | "amber" | "emerald" | "brand" | "trust";
  delay?: number;
  rings?: number;
}

const SIZES = {
  sm: { dot: "h-2 w-2", ring: "h-2 w-2" },
  md: { dot: "h-3 w-3", ring: "h-3 w-3" },
  lg: { dot: "h-4 w-4", ring: "h-4 w-4" },
};

const COLORS = {
  red: { bg: "bg-red-500", ring: "bg-red-500/40" },
  amber: { bg: "bg-amber-500", ring: "bg-amber-500/40" },
  emerald: { bg: "bg-emerald-500", ring: "bg-emerald-500/40" },
  brand: { bg: "bg-brand-500", ring: "bg-brand-500/40" },
  trust: { bg: "bg-trust-500", ring: "bg-trust-500/40" },
};

/**
 * Punto con efecto ripple (ondas expandiéndose). Para indicar actividad
 * en vivo, dots en mapas, badges "live", etc.
 */
export function RippleDot({
  size = "md",
  color = "brand",
  delay = 0,
  rings = 2,
}: Props) {
  const s = SIZES[size];
  const c = COLORS[color];

  return (
    <span className={`relative inline-flex ${s.dot}`}>
      {Array.from({ length: rings }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ scale: [1, 2.5 + i], opacity: [0.6, 0] }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: delay + i * 0.4,
          }}
          className={`absolute inset-0 rounded-full ${c.ring}`}
        />
      ))}
      <span className={`relative inline-flex ${s.dot} rounded-full ${c.bg} shadow-lg`} />
    </span>
  );
}
