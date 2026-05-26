"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Search, ChevronDown, Sparkles } from "lucide-react";
import { NumeroAnimado } from "./NumeroAnimado";
import { PawPrintsBackground } from "./PawPrintsBackground";

interface HeroImmersiveProps {
  estadisticas: {
    activas: number;
    avistados: number;
    reunidos: number;
  };
}

const TITULO_PARTES = ["Cada", "perro", "merece"];
const TITULO_ACENTO = "volver a casa";

export function HeroImmersive({ estadisticas }: HeroImmersiveProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: la foto sube un poco mientras scrolleás (Ken Burns soft)
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  // El texto del hero se va opacando + sube levemente
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-stone-950 text-white"
    >
      {/* Foto de fondo con parallax */}
      <motion.div
        style={{ y: photoY, scale: photoScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=2000&q=85"
          alt="Persona acariciando a su perro con cariño"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlay para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/60 to-stone-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-transparent" />
      </motion.div>

      {/* Paws flotantes decorativas */}
      <div className="absolute inset-0 z-10">
        <PawPrintsBackground opacity={0.15} />
      </div>

      {/* Contenido */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[100svh] flex flex-col justify-between py-20 sm:py-24"
      >
        <div /> {/* spacer top */}

        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider shadow-lg">
              <Sparkles className="h-3 w-3" />
              Comunidad activa en Buenos Aires
            </span>
          </motion.div>

          {/* Título MASIVO con letter stagger */}
          <h1 className="font-display font-semibold tracking-tight leading-[0.9] mt-6 text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
            {TITULO_PARTES.map((palabra, i) => (
              <motion.span
                key={palabra}
                initial={{ opacity: 0, y: 60, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-3 lg:mr-5"
              >
                {palabra}
              </motion.span>
            ))}
            <br />
            <motion.em
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + TITULO_PARTES.length * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="not-italic inline-block bg-gradient-to-r from-brand-300 via-brand-400 to-amber-300 bg-clip-text text-transparent italic"
            >
              {TITULO_ACENTO}
            </motion.em>
          </h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 text-lg sm:text-xl lg:text-2xl text-white/85 leading-relaxed max-w-2xl"
          >
            Publicá si perdiste o encontraste un perro. La comunidad te ayuda con avistamientos, pistas y reencuentros.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/reportar"
              className="group inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-base font-semibold px-7 py-4 rounded-2xl shadow-2xl shadow-brand-500/40 hover:shadow-brand-500/60 hover:-translate-y-0.5 transition-all"
            >
              Reportar un perro
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/publicaciones"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-base font-semibold px-7 py-4 rounded-2xl border border-white/30 hover:border-white/50 transition-all"
            >
              <Search className="h-5 w-5" />
              Buscar perro perdido
            </Link>
          </motion.div>
        </div>

        {/* Stats gigantes abajo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-12 max-w-2xl"
        >
          <StatHero
            numero={estadisticas.activas}
            label="Buscando"
            color="from-red-300 to-red-500"
          />
          <StatHero
            numero={estadisticas.avistados}
            label="Avistados"
            color="from-amber-300 to-amber-500"
          />
          <StatHero
            numero={estadisticas.reunidos}
            label="Reunidos"
            color="from-emerald-300 to-emerald-500"
          />
        </motion.div>
      </motion.div>

      {/* Indicador de scroll abajo */}
      <motion.div
        style={{ opacity: arrowOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
}

function StatHero({
  numero,
  label,
  color,
}: {
  numero: number;
  label: string;
  color: string;
}) {
  return (
    <div>
      <div
        className={`font-display font-bold text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-br ${color} bg-clip-text text-transparent leading-none tracking-tight`}
      >
        <NumeroAnimado valor={numero} />
      </div>
      <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/70 mt-2 font-semibold">
        {label}
      </div>
    </div>
  );
}
