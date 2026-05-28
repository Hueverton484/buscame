"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { MapPin, ArrowRight } from "lucide-react";

// Coordenadas geográficas reales de CABA
// Bounds: lat [-34.524, -34.710] lon [-58.531, -58.335]
// Fórmula: x = (lon - lonMin) / (lonMax - lonMin) * 76 + 12
//          y = (latMax - lat) / (latMax - latMin) * 84 + 8
// lonMin=-58.531 lonMax=-58.335 latMax=-34.524 latMin=-34.710

interface Punto {
  x: number;
  y: number;
  barrio: string;
  estado: "lost" | "spotted" | "reunited";
  delay: number;
}

const PUNTOS: Punto[] = [
  // Saavedra — noroeste de CABA (-34.545, -58.487)
  { x: 29, y: 17, barrio: "Saavedra", estado: "spotted", delay: 1.0 },
  // Núñez — norte, cerca del río (-34.548, -58.462)
  { x: 39, y: 16, barrio: "Núñez", estado: "reunited", delay: 1.5 },
  // Belgrano — norte-centro (-34.568, -58.459)
  { x: 40, y: 25, barrio: "Belgrano", estado: "lost", delay: 0 },
  // Colegiales — norte, levemente al oeste de Palermo (-34.574, -58.444)
  { x: 46, y: 28, barrio: "Colegiales", estado: "lost", delay: 1.7 },
  // Palermo — norte, cerca del río (-34.572, -58.420)
  { x: 57, y: 27, barrio: "Palermo", estado: "spotted", delay: 0.3 },
  // Recoleta — noreste, sobre el río (-34.584, -58.394)
  { x: 67, y: 33, barrio: "Recoleta", estado: "lost", delay: 0.9 },
  // Villa Crespo — centro (-34.598, -58.440)
  { x: 48, y: 40, barrio: "Villa Crespo", estado: "reunited", delay: 0.6 },
  // Almagro — centro-este (-34.610, -58.418)
  { x: 57, y: 46, barrio: "Almagro", estado: "spotted", delay: 2.1 },
  // Microcentro — este, nivel centro (-34.605, -58.375)
  { x: 75, y: 43, barrio: "Microcentro", estado: "reunited", delay: 0.4 },
  // Caballito — centro (-34.618, -58.432)
  { x: 51, y: 50, barrio: "Caballito", estado: "lost", delay: 1.8 },
  // Boedo — centro-sur (-34.629, -58.414)
  { x: 59, y: 55, barrio: "Boedo", estado: "lost", delay: 2.4 },
  // San Telmo — sureste, sobre el río (-34.621, -58.374)
  { x: 76, y: 52, barrio: "San Telmo", estado: "spotted", delay: 1.2 },
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

// Contorno de CABA trazado a partir de sus límites reales:
// Oeste/Norte: Av. General Paz
// Este/Norte: Río de la Plata (costa curva)
// Sur: Riachuelo
// Coordenadas mapeadas al mismo sistema que PUNTOS
const CABA_PATH =
  "M 14 12 L 28 8 L 44 7 L 60 8 L 73 8 " +      // límite norte (de NO a NE)
  "C 82 12 87 20 88 30 " +                         // costa NE curva (zona Palermo/Recoleta)
  "L 87 43 " +                                     // costa este (Microcentro/Puerto Madero)
  "L 83 56 " +                                     // costa SE (San Telmo)
  "L 76 69 " +                                     // viraje a La Boca
  "L 66 80 " +                                     // La Boca
  "C 56 87 45 90 35 89 " +                         // Riachuelo (curva sur)
  "L 20 85 " +                                     // Riachuelo suroeste
  "L 14 76 " +                                     // esquina SO (límite con Bs. As. Provincia)
  "L 13 55 L 13 35 " +                             // Av. General Paz subiendo
  "Z";                                             // cierre al punto de inicio

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
            {/* SVG con contorno real de CABA + grilla */}
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

              {/* Fill de CABA — relleno suave */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                d={CABA_PATH}
                fill="rgba(255, 107, 53, 0.07)"
              />

              {/* Contorno animado de CABA */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.55 } : {}}
                transition={{ duration: 3.5, ease: "easeOut", delay: 0.2 }}
                d={CABA_PATH}
                fill="none"
                stroke="rgba(255, 107, 53, 0.7)"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Líneas de conexión sutiles entre barrios cercanos */}
              {[
                [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [6, 7], [7, 9], [9, 10],
              ].map(([a, b], i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={PUNTOS[a].x}
                  y1={PUNTOS[a].y}
                  x2={PUNTOS[b].x}
                  y2={PUNTOS[b].y}
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="0.2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1 + i * 0.15 }}
                />
              ))}
            </svg>

            {/* Pulsing dots — posicionados geográficamente */}
            {PUNTOS.map((punto, i) => (
              <Dot key={i} punto={punto} inView={inView} />
            ))}

            {/* Glow central */}
            <motion.div
              animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Etiqueta superior */}
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
        delay: 1.2 + punto.delay * 0.2,
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
      {/* Ripple exterior */}
      <motion.span
        animate={{ scale: [1, 3.2], opacity: [0.55, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: punto.delay,
        }}
        className={`absolute inset-0 h-3 w-3 rounded-full ${color.ring}`}
      />
      <motion.span
        animate={{ scale: [1, 4.5], opacity: [0.35, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
          delay: punto.delay + 0.5,
        }}
        className={`absolute inset-0 h-3 w-3 rounded-full ${color.ring}`}
      />
      {/* Dot central */}
      <span
        className={`relative block h-3 w-3 rounded-full ${color.bg} shadow-lg`}
      />
      {/* Tooltip al hover */}
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
