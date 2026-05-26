"use client";

import { motion } from "motion/react";

/**
 * Fondo decorativo con pawprints flotantes en movimiento perpetuo.
 * Se ven sutiles pero crean sensación de "comunidad viva" siempre presente.
 */

const PAWS = [
  { x: "5%", y: "10%", delay: 0, rotate: -15, size: 28 },
  { x: "85%", y: "15%", delay: 2, rotate: 25, size: 22 },
  { x: "12%", y: "75%", delay: 4, rotate: -25, size: 32 },
  { x: "92%", y: "65%", delay: 1, rotate: 10, size: 26 },
  { x: "60%", y: "5%", delay: 3, rotate: -10, size: 24 },
  { x: "40%", y: "85%", delay: 5, rotate: 20, size: 30 },
  { x: "25%", y: "40%", delay: 6, rotate: -5, size: 18 },
  { x: "75%", y: "45%", delay: 7, rotate: 15, size: 20 },
];

export function PawPrintsBackground({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {PAWS.map((paw, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: paw.x,
            top: paw.y,
            transform: `rotate(${paw.rotate}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, opacity, opacity, 0],
            scale: [0.5, 1, 1, 0.8],
            y: [0, -40, -80, -120],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: paw.delay,
            ease: "easeInOut",
          }}
        >
          <svg
            width={paw.size}
            height={paw.size}
            viewBox="0 0 24 24"
            fill="#ea580c"
          >
            <ellipse cx="7" cy="8" rx="2" ry="2.5" />
            <ellipse cx="12" cy="6.5" rx="2" ry="2.5" />
            <ellipse cx="17" cy="8" rx="2" ry="2.5" />
            <ellipse cx="5" cy="13" rx="1.5" ry="2" />
            <ellipse cx="19" cy="13" rx="1.5" ry="2" />
            <path d="M12 11 c-3 0-5 2.5-5.5 5 -0.5 1.5 1 2.5 2.5 2.5h6 c1.5 0 3-1 2.5-2.5 -0.5-2.5-2.5-5-5.5-5z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
