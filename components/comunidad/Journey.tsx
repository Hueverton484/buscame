"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { AlertCircle, MapPin, Eye, Home } from "lucide-react";

interface Paso {
  numero: string;
  titulo: string;
  descripcion: string;
  Icon: typeof AlertCircle;
  colorBg: string;
  colorText: string;
  colorRing: string;
}

const PASOS: Paso[] = [
  {
    numero: "01",
    titulo: "Se pierde",
    descripcion:
      "Un perro escapa, se asusta con un trueno, se confunde y no encuentra el camino. La familia entra en pánico.",
    Icon: AlertCircle,
    colorBg: "bg-red-500",
    colorText: "text-red-300",
    colorRing: "ring-red-500/30",
  },
  {
    numero: "02",
    titulo: "Lo reportás",
    descripcion:
      "Subís foto, datos y ubicación a Buscame. En minutos está visible para toda la zona y el mapa lo muestra a vecinos cercanos.",
    Icon: MapPin,
    colorBg: "bg-brand-500",
    colorText: "text-brand-300",
    colorRing: "ring-brand-500/30",
  },
  {
    numero: "03",
    titulo: "Lo avistan",
    descripcion:
      "Una vecina lo cruza paseando al suyo. Saca foto, marca ubicación en el mapa y te avisa al instante. Ya no estás solo.",
    Icon: Eye,
    colorBg: "bg-amber-500",
    colorText: "text-amber-300",
    colorRing: "ring-amber-500/30",
  },
  {
    numero: "04",
    titulo: "Vuelve a casa",
    descripcion:
      "Reencuentro. Cierra el círculo. Otra historia con final feliz, posible solo porque alguien tuvo el reflejo de mirar.",
    Icon: Home,
    colorBg: "bg-emerald-500",
    colorText: "text-emerald-300",
    colorRing: "ring-emerald-500/30",
  },
];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Path drawing progress (0 to 1)
  const pathLength = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  // Header parallax
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={ref}
      className="relative bg-stone-950 text-white"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,107,53,0.15),_transparent_50%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          aria-hidden="true"
        />

        <div className="relative flex-1 flex flex-col justify-center mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            style={{ y: headerY }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
              El recorrido
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              Del miedo al reencuentro,{" "}
              <em className="not-italic bg-gradient-to-r from-brand-400 to-amber-300 bg-clip-text text-transparent">
                en cuatro pasos
              </em>
            </h2>
          </motion.div>

          {/* Steps con SVG path */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-2">
            {/* Connecting path SVG (solo desktop) */}
            <svg
              className="absolute top-8 left-0 right-0 w-full h-16 hidden md:block pointer-events-none"
              viewBox="0 0 1000 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M 125 30 Q 250 5 375 30 T 625 30 T 875 30"
                stroke="url(#journeyGradient)"
                strokeWidth="2"
                strokeDasharray="6 8"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient
                  id="journeyGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="33%" stopColor="#ff6b35" />
                  <stop offset="66%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {PASOS.map((paso, i) => (
              <PasoCard
                key={paso.numero}
                paso={paso}
                index={i}
                total={PASOS.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PasoCard({
  paso,
  index,
  total,
  scrollYProgress,
}: {
  paso: Paso;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Cada paso se activa en su porción de scroll
  const start = index / total;
  const end = (index + 1) / total;
  const overlap = 0.08;

  // Opacity: hace fade-in cuando llegamos, queda visible un rato, fade-out
  // Excepción: primer y último paso quedan más tiempo activos
  const opacityRange =
    index === 0
      ? [start, start + overlap, end + overlap]
      : index === total - 1
      ? [start - overlap, start, end]
      : [start - overlap, start, end - overlap, end];

  const opacityValues =
    index === 0
      ? [0.3, 1, 0.5]
      : index === total - 1
      ? [0.5, 1, 1]
      : [0.3, 1, 1, 0.5];

  const opacity = useTransform(scrollYProgress, opacityRange, opacityValues);

  const scaleRange =
    index === 0
      ? [start, start + overlap, end + overlap]
      : index === total - 1
      ? [start - overlap, start, end]
      : [start - overlap, start, end - overlap, end];

  const scaleValues =
    index === 0
      ? [0.85, 1.05, 0.95]
      : index === total - 1
      ? [0.95, 1.05, 1.05]
      : [0.85, 1.05, 1.05, 0.95];

  const scale = useTransform(scrollYProgress, scaleRange, scaleValues);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative flex flex-col items-center text-center px-4"
    >
      {/* Icono + número */}
      <div className="relative mb-5">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255, 255, 255, 0)",
              "0 0 0 12px rgba(255, 255, 255, 0)",
              "0 0 0 0 rgba(255, 255, 255, 0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
          className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl ${paso.colorBg} text-white shadow-2xl ring-4 ${paso.colorRing}`}
        >
          <paso.Icon className="h-7 w-7" strokeWidth={2.2} />
        </motion.div>
        {/* Número grande detrás */}
        <span
          className={`absolute -top-6 -right-8 font-display text-6xl font-bold ${paso.colorText} opacity-20 pointer-events-none select-none`}
        >
          {paso.numero}
        </span>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-3 tracking-tight">
        {paso.titulo}
      </h3>
      <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
        {paso.descripcion}
      </p>
    </motion.div>
  );
}
