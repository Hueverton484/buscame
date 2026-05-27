"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import { Heart, Search, ArrowDown, MapPin } from "lucide-react";
import {
  BackgroundOrbs,
  FloatingPaws,
  MagneticButton,
  RippleDot,
  StaggerText,
} from "@/components/ui/animated";

interface Stats {
  activas: number;
  avistados: number;
  reunidos: number;
}

export function HeroHome({ estadisticas }: { estadisticas: Stats }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Mouse parallax para la imagen
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });
  const imgTx = useTransform(smx, [-0.5, 0.5], [-20, 20]);
  const imgTy = useTransform(smy, [-0.5, 0.5], [-20, 20]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-brand-950 text-white min-h-screen flex items-center"
    >
      <BackgroundOrbs />
      <FloatingPaws />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28 w-full z-10"
      >
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Lado texto */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 shadow-lg shadow-black/20"
            >
              <RippleDot size="sm" color="emerald" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {estadisticas.reunidos} reencuentros · y contando
              </span>
            </motion.div>

            <StaggerText
              as="h1"
              words={[
                { text: "Cada" },
                { text: "perro" },
                { text: "merece" },
                { text: "volver", highlight: true },
                { text: "a", highlight: true },
                { text: "casa." },
              ]}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.95]"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-8 text-lg sm:text-xl text-stone-300 max-w-xl leading-relaxed"
            >
              Publicá si perdiste o encontraste un perro. La comunidad te ayuda
              con avistamientos, pistas y reencuentros — gratis, sin vueltas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <MagneticButton href="/reportar" variant="primary" size="lg" shine>
                <Heart className="h-5 w-5" />
                Reportar un perro
              </MagneticButton>
              <MagneticButton href="/publicaciones" variant="ghost" size="lg">
                <Search className="h-5 w-5" />
                Buscar perro perdido
              </MagneticButton>
            </motion.div>

            {/* Estadísticas inline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8 text-sm"
            >
              <InlineStat
                icon={<MapPin className="h-3.5 w-3.5" />}
                num={estadisticas.activas}
                label="activas"
                color="text-red-300"
                dotColor="red"
              />
              <span className="text-stone-700">·</span>
              <InlineStat
                num={estadisticas.avistados}
                label="avistados"
                color="text-amber-300"
                dotColor="amber"
              />
              <span className="text-stone-700">·</span>
              <InlineStat
                icon={<Heart className="h-3.5 w-3.5 fill-current" />}
                num={estadisticas.reunidos}
                label="reunidos"
                color="text-emerald-300"
                dotColor="emerald"
              />
            </motion.div>
          </div>

          {/* Lado imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: imgY }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/50"
          >
            <motion.div
              style={{ scale: imgScale, x: imgTx, y: imgTy }}
              className="absolute inset-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&q=80"
                alt="Persona acariciando a su perro"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />

            {/* Cards flotantes */}
            <FloatingCard
              className="top-6 right-6"
              icon="🐶"
              title={`${estadisticas.reunidos} ${estadisticas.reunidos === 1 ? "perro" : "perros"}`}
              subtitle="ya volvieron a casa"
              delay={1.3}
            />
            <FloatingCard
              className="bottom-6 left-6"
              icon="📍"
              title="48 barrios"
              subtitle="con vecinos activos"
              delay={1.5}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
            Mirá las historias
          </span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function InlineStat({
  icon,
  num,
  label,
  color,
  dotColor,
}: {
  icon?: React.ReactNode;
  num: number;
  label: string;
  color: string;
  dotColor: "red" | "amber" | "emerald";
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <RippleDot size="sm" color={dotColor} />
      <span className={`font-display text-2xl font-semibold ${color}`}>
        {num}
      </span>
      <span className="text-stone-400 uppercase tracking-wider text-xs">
        {icon}
        {label}
      </span>
    </span>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  subtitle,
  delay,
}: {
  className: string;
  icon: string;
  title: string;
  subtitle: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      className={`absolute ${className} bg-white/95 backdrop-blur rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 max-w-[200px]`}
    >
      <motion.span
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-2xl shrink-0"
      >
        {icon}
      </motion.span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-stone-900 leading-tight">{title}</p>
        <p className="text-xs text-stone-600 leading-snug mt-0.5">{subtitle}</p>
      </div>
    </motion.div>
  );
}
