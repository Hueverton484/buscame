"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Barra de progreso de scroll, fija en el tope.
 * Útil en páginas largas como /reportar para indicar avance.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0 0" }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 to-brand-600 z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
}
