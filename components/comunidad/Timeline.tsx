"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import {
  Sparkles,
  Code,
  Users,
  Heart,
  TrendingUp,
  Globe,
  Rocket,
} from "lucide-react";

interface Milestone {
  fecha: string;
  titulo: string;
  descripcion: string;
  Icon: typeof Sparkles;
  color: string;
}

const MILESTONES: Milestone[] = [
  {
    fecha: "Enero 2024",
    titulo: "La idea nace",
    descripcion:
      "Después de perder un perro en el barrio y ver el caos en redes, una vecina anota: \"esto necesita un lugar centralizado\".",
    Icon: Sparkles,
    color: "bg-rose-500",
  },
  {
    fecha: "Marzo 2024",
    titulo: "Primer prototipo",
    descripcion:
      "Mapa + publicaciones + pistas. Lo más simple posible. Una semana programando en pijama.",
    Icon: Code,
    color: "bg-brand-500",
  },
  {
    fecha: "Junio 2024",
    titulo: "Los primeros 100 vecinos",
    descripcion:
      "El boca a boca empieza. Se suman familias de Palermo, Villa Crespo y Caballito. Los primeros reencuentros.",
    Icon: Users,
    color: "bg-amber-500",
  },
  {
    fecha: "Septiembre 2024",
    titulo: "Primer mes con 50+ casos",
    descripcion:
      "El sistema de pistas con foto y ubicación se vuelve viral. Cada publicación recibe avisos en promedio en 4 horas.",
    Icon: TrendingUp,
    color: "bg-yellow-500",
  },
  {
    fecha: "Diciembre 2024",
    titulo: "Toda CABA cubierta",
    descripcion:
      "Vecinos activos en los 48 barrios. Sistema de notificación por proximidad. Primera nota en medio local.",
    Icon: Globe,
    color: "bg-emerald-500",
  },
  {
    fecha: "Hoy",
    titulo: "Una comunidad real",
    descripcion:
      "Cientos de vecinos activos, decenas de reencuentros, y la sensación clara de que esto no para de crecer.",
    Icon: Heart,
    color: "bg-pink-500",
  },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative bg-stone-100 py-24 sm:py-32 overflow-hidden">
      {/* Bg pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(45deg,#fafaf9_25%,transparent_25%),linear-gradient(-45deg,#fafaf9_25%,transparent_25%)] bg-[size:32px_32px] opacity-50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Rocket className="h-3 w-3" /> El camino
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-stone-900 tracking-tight leading-[1.05]"
          >
            De una idea en una libreta{" "}
            <em className="not-italic text-brand-500">
              a una comunidad real
            </em>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Static line bg */}
          <div
            className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-stone-300"
            aria-hidden="true"
          />
          {/* Animated progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-brand-500 via-amber-400 to-emerald-500"
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {MILESTONES.map((milestone, i) => (
              <MilestoneItem
                key={milestone.titulo}
                milestone={milestone}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneItem({
  milestone,
  index,
  isLeft,
}: {
  milestone: Milestone;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Dot icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
        className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255, 107, 53, 0.4)",
              "0 0 0 14px rgba(255, 107, 53, 0)",
              "0 0 0 0 rgba(255, 107, 53, 0)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
          className={`flex h-14 w-14 items-center justify-center rounded-full ${milestone.color} text-white shadow-lg ring-4 ring-stone-100`}
        >
          <milestone.Icon className="h-5 w-5" strokeWidth={2.4} />
        </motion.div>
      </motion.div>

      {/* Spacer left */}
      <div className="hidden md:block flex-1" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        whileHover={{ y: -4 }}
        className="flex-1 ml-24 md:ml-0 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-xl transition-shadow"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-1.5">
          {milestone.fecha}
        </p>
        <h3 className="font-display text-2xl font-semibold text-stone-900 mb-2 leading-tight">
          {milestone.titulo}
        </h3>
        <p className="text-stone-600 leading-relaxed">{milestone.descripcion}</p>
      </motion.div>
    </div>
  );
}
