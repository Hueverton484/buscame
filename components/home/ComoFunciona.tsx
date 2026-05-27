"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Camera, Bell, Heart, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/animated";

const PASOS = [
  {
    numero: "01",
    Icon: Camera,
    titulo: "Publicá o buscá",
    descripcion:
      "Reportá tu perro perdido con fotos, datos y última ubicación. O entrá al feed para ver si alguien encontró el tuyo.",
    color: "from-rose-500 to-orange-500",
    glow: "shadow-rose-500/40",
  },
  {
    numero: "02",
    Icon: Bell,
    titulo: "Recibí pistas",
    descripcion:
      "Vecinos cercanos te mandan avistamientos con foto y ubicación en el mapa. Todo en tiempo real.",
    color: "from-brand-500 to-amber-500",
    glow: "shadow-brand-500/40",
  },
  {
    numero: "03",
    Icon: Heart,
    titulo: "Reencuentro",
    descripcion:
      "Coordiná directo con quien lo vio y marcá la publicación como reunida cuando vuelva a casa.",
    color: "from-emerald-500 to-green-500",
    glow: "shadow-emerald-500/40",
  },
];

export function ComoFunciona() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
      {/* Bg pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#e7e5e4_1px,_transparent_0)] bg-[size:24px_24px] opacity-60"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Cómo funciona"
          badgeIcon={<Sparkles className="h-3 w-3" />}
          badgeColor="brand"
          title={
            <>
              Tres pasos para{" "}
              <em className="not-italic text-brand-500">reencontrar</em>
            </>
          }
          subtitle="Sin formularios eternos. Sin esperas. Diseñado para que funcione cuando más lo necesitás."
          size="lg"
          className="mb-20"
        />

        <div ref={ref} className="relative">
          {/* Connecting path */}
          <svg
            className="absolute top-12 left-0 right-0 hidden md:block pointer-events-none"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "60px" }}
            aria-hidden="true"
          >
            <motion.path
              d="M 170 30 Q 333 5 500 30 T 830 30"
              stroke="url(#stepsGrad)"
              strokeWidth="2"
              strokeDasharray="6 8"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="stepsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#ff6b35" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-2">
            {PASOS.map((paso, i) => (
              <Paso key={paso.numero} paso={paso} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Paso({
  paso,
  index,
}: {
  paso: (typeof PASOS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 30%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="flex flex-col items-center text-center px-4 relative"
    >
      <div className="relative mb-6">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255, 107, 53, 0)",
              "0 0 0 16px rgba(255, 107, 53, 0)",
              "0 0 0 0 rgba(255, 107, 53, 0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
          whileHover={{ rotate: -8, scale: 1.1 }}
          className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${paso.color} text-white shadow-2xl ${paso.glow}`}
        >
          <paso.Icon className="h-9 w-9" strokeWidth={2.2} />
        </motion.div>
        <span className="absolute -top-4 -right-6 font-display text-5xl font-bold text-stone-200 pointer-events-none select-none">
          {paso.numero}
        </span>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mb-3 tracking-tight">
        {paso.titulo}
      </h3>
      <p className="text-stone-600 leading-relaxed max-w-xs">
        {paso.descripcion}
      </p>
    </motion.div>
  );
}
