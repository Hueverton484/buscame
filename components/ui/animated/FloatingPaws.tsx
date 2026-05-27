"use client";

import { motion } from "motion/react";
import { PawPrint } from "lucide-react";

interface Paw {
  x: string;
  y: string;
  size: number;
  rotate: number;
  delay: number;
}

const DEFAULT_PAWS: Paw[] = [
  { x: "8%", y: "20%", size: 24, rotate: -20, delay: 0 },
  { x: "88%", y: "18%", size: 32, rotate: 15, delay: 1.2 },
  { x: "12%", y: "78%", size: 28, rotate: 40, delay: 2.4 },
  { x: "85%", y: "75%", size: 36, rotate: -30, delay: 0.6 },
  { x: "50%", y: "8%", size: 20, rotate: 5, delay: 1.8 },
  { x: "4%", y: "50%", size: 22, rotate: 25, delay: 3 },
  { x: "92%", y: "45%", size: 26, rotate: -15, delay: 0.3 },
  { x: "30%", y: "88%", size: 30, rotate: 60, delay: 2.1 },
];

interface Props {
  paws?: Paw[];
  color?: string;
  opacity?: number;
}

/**
 * Patitas que flotan hacia arriba con loop infinito. Para usar dentro de un
 * container `relative overflow-hidden`.
 */
export function FloatingPaws({
  paws = DEFAULT_PAWS,
  color = "text-white",
  opacity = 0.15,
}: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {paws.map((paw, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, opacity, opacity, 0],
            scale: [0.6, 1, 1, 0.8],
            y: [0, -40, -80, -120],
          }}
          transition={{
            duration: 7,
            delay: paw.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ left: paw.x, top: paw.y, rotate: paw.rotate }}
          className={`absolute ${color}`}
        >
          <PawPrint style={{ width: paw.size, height: paw.size }} />
        </motion.div>
      ))}
    </div>
  );
}
