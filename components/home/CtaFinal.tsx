"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Heart, ArrowRight, PawPrint, Sparkles } from "lucide-react";
import { MagneticButton, FloatingPaws } from "@/components/ui/animated";

const SPARKLES = [
  { x: 10, y: 20, size: 16, delay: 0 },
  { x: 85, y: 15, size: 20, delay: 0.5 },
  { x: 90, y: 70, size: 14, delay: 1 },
  { x: 15, y: 75, size: 22, delay: 1.5 },
  { x: 75, y: 40, size: 12, delay: 2 },
  { x: 25, y: 50, size: 18, delay: 0.8 },
];

export function CtaFinal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-stone-950 py-28 sm:py-36 overflow-hidden"
    >
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 50%, rgba(255, 107, 53, 0.35) 0%, transparent 60%)",
            "radial-gradient(ellipse at 70% 50%, rgba(255, 107, 53, 0.35) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 80%, rgba(255, 107, 53, 0.35) 0%, transparent 60%)",
            "radial-gradient(ellipse at 30% 50%, rgba(255, 107, 53, 0.35) 0%, transparent 60%)",
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
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className="absolute text-amber-300"
          >
            <Sparkles style={{ width: s.size, height: s.size }} />
          </motion.div>
        ))}
      </div>

      <FloatingPaws opacity={0.2} />

      {/* Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="inline-block mb-8"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-rose-500 shadow-2xl shadow-brand-500/50"
          >
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-10 w-10 text-white fill-current" />
            </motion.div>
          </motion.div>
        </motion.div>

        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[0.95]">
          {["Cada", "vecino", "que", "mira"].map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
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
          <br />
          <motion.span
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block bg-gradient-to-r from-brand-400 via-amber-300 to-brand-400 bg-clip-text text-transparent bg-[length:200%_auto] [animation:shimmerGradient_4s_linear_infinite]"
          >
            cambia una historia.
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed"
        >
          Reportá, mandá pistas, compartí. La comunidad se construye con vos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton href="/reportar" variant="primary" size="lg" shine>
            <PawPrint className="h-5 w-5" />
            Reportar un perro
            <ArrowRight className="h-5 w-5" />
          </MagneticButton>
          <MagneticButton href="/publicaciones" variant="ghost" size="lg">
            Ver publicaciones activas
          </MagneticButton>
        </motion.div>

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
