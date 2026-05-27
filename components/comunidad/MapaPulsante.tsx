"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { MapPin, ArrowRight } from "lucide-react";

interface Punto {
  x: number;
  y: number;
  barrio: string;
  estado: "lost" | "spotted" | "reunited";
  delay: number;
}

const PUNTOS: Punto[] = [
  { x: 28, y: 35, barrio: "Belgrano", estado: "lost", delay: 0 },
  { x: 45, y: 48, barrio: "Palermo", estado: "spotted", delay: 0.3 },
  { x: 38, y: 60, barrio: "Villa Crespo", estado: "reunited", delay: 0.6 },
  { x: 58, y: 55, barrio: "Recoleta", estado: "lost", delay: 0.9 },
  { x: 65, y: 70, barrio: "San Telmo", estado: "spotted", delay: 1.2 },
  { x: 25, y: 55, barrio: "Núñez", estado: "reunited", delay: 1.5 },
  { x: 52, y: 75, barrio: "Caballito", estado: "lost", delay: 1.8 },
  { x: 68, y: 40, barrio: "Almagro", estado: "spotted", delay: 2.1 },
  { x: 35, y: 80, barrio: "Boedo", estado: "lost", delay: 2.4 },
  { x: 75, y: 60, barrio: "Microcentro", estado: "reunited", delay: 0.4 },
  { x: 22, y: 70, barrio: "Saavedra", estado: "spotted", delay: 1.0 },
  { x: 48, y: 30, barrio: "Colegiales", estado: "lost", delay: 1.7 },
];

const COLORES = {
  lost: { bg: "bg-red-500", ring: "bg-red-500/40", text: "text-red-400" },
  spotted: {
    bg: "bg-amber-500",
    ring: "bg-amber-500/40",
    text: "text-amber-400",
  },
  reunited: {
    bg: "bg-emerald-500",
    ring: "bg-emerald-500/40",
    text: "text-emerald-400",
  },
};

export function MapaPulsante() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-stone-950 text-white py-24 sm:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,107,53,0.15),_transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider mb-4"
            >
              <MapPin className="h-3 w-3" /> En vivo
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]"
            >
              Buenos Aires{" "}
              <em className="not-italic bg-gradient-to-r from-brand-400 to-rose-400 bg-clip-text text-transparent">
                respira ayuda
              </em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 text-lg text-stone-300 leading-relaxed"
            >
              Cada punto que palpita es una historia: un perro que se busca, un
              vecino que avisó, una familia que volvió a abrazarlo.
            </motion.p>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Legend color={COLORES.lost} label="Buscándose" />
              <Legend color={COLORES.spotted} label="Avistado" />
              <Legend color={COLORES.reunited} label="Reunido" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Link
                href="/mapa"
                className="group inline-flex items-center gap-2 bg-white text-stone-900 hover:bg-stone-100 text-base font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Ver el mapa completo
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Map visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square rounded-3xl bg-stone-900 border border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Background SVG: shape of CABA simplified */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="mapBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1c1917" />
                  <stop offset="100%" stopColor="#292524" />
                </linearGradient>
                <pattern
                  id="mapGrid"
                  x="0"
                  y="0"
                  width="5"
                  height="5"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 5 0 L 0 0 0 5"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.1"
                    opacity="0.15"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#mapBgGrad)" />
              <rect width="100" height="100" fill="url(#mapGrid)" />

              {/* Outline aproximado de CABA */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
                transition={{ duration: 3, ease: "easeOut" }}
                d="M 20 25 L 30 18 L 45 22 L 60 18 L 75 25 L 82 38 L 80 55 L 75 72 L 68 82 L 55 88 L 42 85 L 28 80 L 18 65 L 15 48 Z"
                fill="rgba(255, 107, 53, 0.05)"
                stroke="rgba(255, 107, 53, 0.6)"
                strokeWidth="0.4"
                strokeDasharray="2 1"
              />

              {/* Connection lines entre puntos */}
              {PUNTOS.slice(0, 6).map((p, i) => {
                const next = PUNTOS[(i + 1) % PUNTOS.length];
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={p.x}
                    y1={p.y}
                    x2={next.x}
                    y2={next.y}
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeWidth="0.15"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, delay: 0.5 + i * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Pulsing dots */}
            {PUNTOS.map((punto, i) => (
              <Dot key={i} punto={punto} inView={inView} />
            ))}

            {/* Glow center */}
            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Top label */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
              <span className="px-2 py-1 rounded bg-black/50 backdrop-blur text-white/60 border border-white/10">
                CABA · Actividad reciente
              </span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-2 py-1 rounded bg-emerald-500/20 backdrop-blur text-emerald-300 border border-emerald-400/30 flex items-center gap-1"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                LIVE
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Dot({ punto, inView }: { punto: Punto; inView: boolean }) {
  const color = COLORES[punto.estado];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        delay: 1 + punto.delay * 0.2,
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      style={{
        left: `${punto.x}%`,
        top: `${punto.y}%`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group/dot"
    >
      {/* Ripples */}
      <motion.span
        animate={{ scale: [1, 3], opacity: [0.6, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: punto.delay,
        }}
        className={`absolute inset-0 h-3 w-3 rounded-full ${color.ring}`}
      />
      <motion.span
        animate={{ scale: [1, 4], opacity: [0.4, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
          delay: punto.delay + 0.5,
        }}
        className={`absolute inset-0 h-3 w-3 rounded-full ${color.ring}`}
      />
      {/* Dot */}
      <span
        className={`relative block h-3 w-3 rounded-full ${color.bg} shadow-lg`}
      />
      {/* Tooltip on hover */}
      <span className="absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap px-2 py-0.5 rounded bg-stone-900 text-white text-[10px] font-medium opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none border border-white/10">
        {punto.barrio}
      </span>
    </motion.div>
  );
}

function Legend({
  color,
  label,
}: {
  color: { bg: string; ring: string; text: string };
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
      <span className="relative flex h-2.5 w-2.5">
        <motion.span
          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 rounded-full ${color.ring}`}
        />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color.bg}`} />
      </span>
      <span className="text-sm text-stone-300">{label}</span>
    </div>
  );
}
