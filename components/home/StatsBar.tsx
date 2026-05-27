"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Eye, Heart, Activity } from "lucide-react";
import { AnimatedCounter, RippleDot } from "@/components/ui/animated";

interface Stats {
  activas: number;
  avistados: number;
  reunidos: number;
}

export function StatsBar({ estadisticas }: { estadisticas: Stats }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const total =
    estadisticas.activas + estadisticas.avistados + estadisticas.reunidos;

  return (
    <section
      ref={ref}
      className="relative bg-stone-950 border-t border-white/5 py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10"
        >
          <Cell
            icon={<Activity className="h-5 w-5" />}
            num={total}
            label="Casos totales"
            color="text-stone-200"
            iconBg="bg-stone-700/40"
            delay={0}
          />
          <Cell
            icon={<MapPin className="h-5 w-5" />}
            num={estadisticas.activas}
            label="Buscándose"
            color="text-red-300"
            iconBg="bg-red-500/20"
            delay={0.1}
            live="red"
          />
          <Cell
            icon={<Eye className="h-5 w-5" />}
            num={estadisticas.avistados}
            label="Avistados"
            color="text-amber-300"
            iconBg="bg-amber-500/20"
            delay={0.2}
            live="amber"
          />
          <Cell
            icon={<Heart className="h-5 w-5" />}
            num={estadisticas.reunidos}
            label="Reunidos"
            color="text-emerald-300"
            iconBg="bg-emerald-500/20"
            delay={0.3}
            live="emerald"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Cell({
  icon,
  num,
  label,
  color,
  iconBg,
  delay,
  live,
}: {
  icon: React.ReactNode;
  num: number;
  label: string;
  color: string;
  iconBg: string;
  delay: number;
  live?: "red" | "amber" | "emerald";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
      className="relative bg-stone-950 px-6 py-6 flex items-center gap-4"
    >
      <motion.div
        whileHover={{ rotate: -8, scale: 1.1 }}
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${color}`}
      >
        {icon}
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className={`font-display text-3xl font-bold ${color} flex items-baseline gap-2`}>
          <AnimatedCounter value={num} delay={delay + 0.2} />
          {live && (
            <span className="opacity-70">
              <RippleDot size="sm" color={live} />
            </span>
          )}
        </div>
        <p className="text-xs uppercase tracking-wider text-stone-500 mt-1 font-semibold">
          {label}
        </p>
      </div>
    </motion.div>
  );
}
