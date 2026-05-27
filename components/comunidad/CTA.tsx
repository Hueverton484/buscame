"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useTransform,
} from "motion/react";
import { Heart, ArrowRight, PawPrint, Sparkles } from "lucide-react";

const SPARKLES = [
  { x: 10, y: 20, size: 16, delay: 0 },
  { x: 85, y: 15, size: 20, delay: 0.5 },
  { x: 90, y: 70, size: 14, delay: 1 },
  { x: 15, y: 75, size: 22, delay: 1.5 },
  { x: 75, y: 40, size: 12, delay: 2 },
  { x: 25, y: 50, size: 18, delay: 0.8 },
  { x: 60, y: 85, size: 16, delay: 1.3 },
  { x: 40, y: 10, size: 14, delay: 1.8 },
];

const FLOATING_PAWS = [
  { x: "15%", y: "30%", size: 28, delay: 0, rotate: -20 },
  { x: "80%", y: "25%", size: 32, delay: 0.6, rotate: 25 },
  { x: "20%", y: "70%", size: 24, delay: 1.2, rotate: 40 },
  { x: "85%", y: "75%", size: 30, delay: 1.8, rotate: -30 },
];

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-stone-950 py-24 sm:py-32 overflow-hidden"
    >
      {/* Animated gradient bg */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 50%, rgba(255, 107, 53, 0.3) 0%, transparent 60%)",
            "radial-gradient(ellipse at 70% 50%, rgba(255, 107, 53, 0.3) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 80%, rgba(255, 107, 53, 0.3) 0%, transparent 60%)",
            "radial-gradient(ellipse at 30% 50%, rgba(255, 107, 53, 0.3) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        aria-hidden="true"
      />

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {SPARKLES.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              inView
                ? {
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }
                : {}
            }
            transition={{
              duration: 3,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
            }}
            className="absolute text-amber-300"
          >
            <Sparkles style={{ width: s.size, height: s.size }} />
          </motion.div>
        ))}
      </div>

      {/* Floating paws */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {FLOATING_PAWS.map((p, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [p.rotate, p.rotate + 10, p.rotate],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 5,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: p.x,
              top: p.y,
            }}
            className="absolute text-white"
          >
            <PawPrint style={{ width: p.size, height: p.size }} />
          </motion.div>
        ))}
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Heart icon flotando */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="inline-block mb-8"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-rose-500 shadow-2xl shadow-brand-500/50"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-10 w-10 text-white fill-current" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Headline con stagger */}
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[0.95]">
          {["Sumate.", "Sé", "vos", "el", "próximo"].map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={
                inView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{
                delay: 0.2 + i * 0.08,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block mr-3"
            >
              {w}
            </motion.span>
          ))}
          <br className="hidden sm:block" />
          <motion.span
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={
              inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block bg-gradient-to-r from-brand-400 via-amber-300 to-brand-400 bg-clip-text text-transparent bg-[length:200%_auto] [animation:shimmerGradient_4s_linear_infinite]"
          >
            reencuentro.
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed"
        >
          Hacé como cientos de vecinos: reportá, mandá pistas, compartí. La
          comunidad se hace con vos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticCTA href="/reportar" primary>
            <PawPrint className="h-5 w-5" />
            Reportar un perro
            <ArrowRight className="h-5 w-5" />
          </MagneticCTA>
          <MagneticCTA href="/publicaciones">
            Ver publicaciones activas
          </MagneticCTA>
        </motion.div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 text-sm text-stone-500 font-mono"
        >
          Hecho con cariño en Buenos Aires · gratis, para siempre.
        </motion.p>
      </div>
    </section>
  );
}

function MagneticCTA({
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
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const scale = useMotionValue(1);
  const sscale = useSpring(scale, { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  }
  function onMouseEnter() {
    scale.set(1.05);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  return (
    <motion.div style={{ x: sx, y: sy, scale: sscale }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={
          primary
            ? "group relative inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white text-lg font-bold px-8 py-4 rounded-full shadow-2xl shadow-brand-500/40 transition-colors overflow-hidden"
            : "group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-lg font-semibold px-7 py-4 rounded-full border border-white/20 transition-colors"
        }
      >
        {primary && <ShineEffect />}
        <span className="relative flex items-center gap-2">{children}</span>
      </Link>
    </motion.div>
  );
}

function ShineEffect() {
  return (
    <motion.span
      animate={{ x: ["-100%", "200%"] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 1,
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3"
      aria-hidden="true"
    />
  );
}
