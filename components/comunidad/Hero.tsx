"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "motion/react";
import {
  Heart,
  PawPrint,
  ArrowDown,
  Sparkles,
  MapPin,
  Search,
} from "lucide-react";

interface Estadisticas {
  activas: number;
  avistados: number;
  reunidos: number;
}

const PALABRAS = [
  { texto: "Una", highlight: false },
  { texto: "comunidad", highlight: false },
  { texto: "que", highlight: false },
  { texto: "no", highlight: false },
  { texto: "deja", highlight: false },
  { texto: "perros", highlight: true },
  { texto: "solos.", highlight: false },
];

export function Hero({ estadisticas }: { estadisticas: Estadisticas }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const orb1X = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const orb1Y = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);
  const orb2X = useTransform(smoothX, [-0.5, 0.5], [50, -50]);
  const orb2Y = useTransform(smoothY, [-0.5, 0.5], [60, -60]);
  const orb3X = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);
  const orb3Y = useTransform(smoothY, [-0.5, 0.5], [25, -25]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-brand-950 text-white min-h-screen flex items-center"
    >
      {/* Background orbs con parallax */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-brand-500/30 blur-[120px]"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-amber-500/20 blur-[140px]"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: orb3X, y: orb3Y }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-rose-500/15 blur-[100px]"
        aria-hidden="true"
      />

      {/* Anillo rotando */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full border border-white/[0.04]"
        aria-hidden="true"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full border border-white/[0.06]"
        aria-hidden="true"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
        aria-hidden="true"
      />

      <FloatingPaws />

      {/* Content */}
      <motion.div
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full text-center z-10"
      >
        {/* Badge live */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 18 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 shadow-lg shadow-black/20"
        >
          <span className="relative flex h-2 w-2">
            <motion.span
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider">
            {estadisticas.reunidos} reencuentros · y contando
          </span>
        </motion.div>

        {/* Título palabra-por-palabra */}
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95]">
          {PALABRAS.map((p, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.25 + i * 0.08,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block mr-2.5 lg:mr-4"
            >
              {p.highlight ? (
                <span className="relative">
                  <span className="bg-gradient-to-r from-brand-400 via-amber-300 to-brand-400 bg-clip-text text-transparent bg-[length:200%_auto] [animation:shimmerGradient_4s_linear_infinite]">
                    {p.texto}
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-brand-400/60 rounded-full"
                    aria-hidden="true"
                  />
                </span>
              ) : (
                p.texto
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed"
        >
          Vecinas y vecinos de Buenos Aires que, todos los días, devuelven
          hocicos asustados a sus casas. Esta es su historia.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <MagneticButton href="/reportar" primary>
            <Heart className="h-5 w-5" />
            Sumate a la comunidad
          </MagneticButton>
          <MagneticButton href="#impacto">
            <Search className="h-5 w-5" />
            Ver el impacto
          </MagneticButton>
        </motion.div>

        {/* Stat chips flotantes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          <StatChip
            icon={<MapPin className="h-3 w-3" />}
            label={`${estadisticas.activas} activas`}
            color="bg-red-500/15 text-red-200 border-red-400/30"
            delay={1.7}
          />
          <StatChip
            icon={<Sparkles className="h-3 w-3" />}
            label={`${estadisticas.avistados} avistados`}
            color="bg-amber-500/15 text-amber-200 border-amber-400/30"
            delay={1.8}
          />
          <StatChip
            icon={<Heart className="h-3 w-3 fill-current" />}
            label={`${estadisticas.reunidos} reunidos`}
            color="bg-emerald-500/15 text-emerald-200 border-emerald-400/30"
            delay={1.9}
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
            Scrollá
          </span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingPaws() {
  const paws = [
    { x: "8%", y: "20%", delay: 0, size: 24, rotate: -20 },
    { x: "88%", y: "18%", delay: 1.2, size: 32, rotate: 15 },
    { x: "12%", y: "78%", delay: 2.4, size: 28, rotate: 40 },
    { x: "85%", y: "75%", delay: 0.6, size: 36, rotate: -30 },
    { x: "50%", y: "8%", delay: 1.8, size: 20, rotate: 5 },
    { x: "4%", y: "50%", delay: 3, size: 22, rotate: 25 },
    { x: "92%", y: "45%", delay: 0.3, size: 26, rotate: -15 },
    { x: "30%", y: "88%", delay: 2.1, size: 30, rotate: 60 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {paws.map((paw, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
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
          className="absolute text-white"
        >
          <PawPrint style={{ width: paw.size, height: paw.size }} />
        </motion.div>
      ))}
    </div>
  );
}

function MagneticButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: smoothX, y: smoothY }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        className={
          primary
            ? "group inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white text-base font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-brand-500/30 transition-colors"
            : "group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white text-base font-semibold px-7 py-3.5 rounded-full border border-white/20 transition-colors"
        }
      >
        {children}
      </Link>
    </motion.div>
  );
}

function StatChip({
  icon,
  label,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 18 }}
      whileHover={{ y: -3, scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-semibold ${color}`}
    >
      {icon}
      {label}
    </motion.div>
  );
}
