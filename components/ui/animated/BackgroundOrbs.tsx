"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

interface Orb {
  className: string;
  size: number;
  x: string;
  y: string;
  pull?: number;
}

interface Props {
  orbs?: Orb[];
  rings?: boolean;
  grid?: boolean;
  className?: string;
}

const DEFAULT_ORBS: Orb[] = [
  {
    className: "bg-brand-500/30",
    size: 500,
    x: "-10%",
    y: "-10%",
    pull: 40,
  },
  {
    className: "bg-amber-500/20",
    size: 600,
    x: "100%",
    y: "100%",
    pull: 50,
  },
  {
    className: "bg-rose-500/15",
    size: 400,
    x: "50%",
    y: "30%",
    pull: 25,
  },
];

/**
 * Fondo decorativo: orbes de luz blureados que siguen el mouse con parallax suave,
 * anillos rotando opuestamente, grid con máscara radial. Pensado para usar dentro
 * de un container `relative overflow-hidden`.
 */
export function BackgroundOrbs({
  orbs = DEFAULT_ORBS,
  rings = true,
  grid = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <OrbEl key={i} orb={orb} smx={smx} smy={smy} sign={i % 2 === 0 ? 1 : -1} />
      ))}

      {rings && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full border border-white/[0.04]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full border border-white/[0.06]"
          />
        </>
      )}

      {grid && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />
      )}
    </div>
  );
}

function OrbEl({
  orb,
  smx,
  smy,
  sign,
}: {
  orb: Orb;
  smx: ReturnType<typeof useSpring>;
  smy: ReturnType<typeof useSpring>;
  sign: number;
}) {
  const pull = orb.pull ?? 30;
  const x = useTransform(smx, [-0.5, 0.5], [-pull * sign, pull * sign]);
  const y = useTransform(smy, [-0.5, 0.5], [-pull * sign, pull * sign]);

  return (
    <motion.div
      style={{
        x,
        y,
        left: orb.x,
        top: orb.y,
        width: orb.size,
        height: orb.size,
        translate: "-50% -50%",
      }}
      className={`absolute rounded-full blur-[120px] ${orb.className}`}
    />
  );
}
