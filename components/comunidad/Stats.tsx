"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import {
  Heart,
  MapPin,
  Users,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";

interface Estadisticas {
  activas: number;
  avistados: number;
  reunidos: number;
}

export function Stats({
  estadisticas,
  total,
}: {
  estadisticas: Estadisticas;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="impacto"
      ref={ref}
      className="relative bg-stone-50 py-24 sm:py-32 overflow-hidden"
    >
      {/* Dotted bg */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#d6d3d1_1px,_transparent_0)] bg-[size:28px_28px] opacity-50"
        aria-hidden="true"
      />
      {/* Soft fade overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-stone-50 via-transparent to-stone-50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <TrendingUp className="h-3 w-3" /> Impacto en vivo
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-stone-900 tracking-tight leading-[1.05]">
            Los números de una comunidad{" "}
            <em className="not-italic text-brand-500">que ayuda</em>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-5 text-lg text-stone-600 leading-relaxed"
          >
            Cada número es un perro, una familia, un vecino que se sumó.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            valor={total}
            label="Casos totales"
            descripcion="Publicaciones de la comunidad"
            icon={<Users className="h-6 w-6" />}
            gradient="from-stone-100 to-stone-50"
            blobColor="bg-stone-400"
            iconBg="bg-stone-900 text-white"
            inView={inView}
            delay={0}
            numeroColor="text-stone-900"
          />
          <StatCard
            valor={estadisticas.activas}
            label="Buscándose ahora"
            descripcion="Familias esperando"
            icon={<MapPin className="h-6 w-6" />}
            gradient="from-red-50 to-orange-50"
            blobColor="bg-red-400"
            iconBg="bg-red-600 text-white"
            inView={inView}
            delay={0.1}
            numeroColor="text-red-600"
          />
          <StatCard
            valor={estadisticas.avistados}
            label="Avistados"
            descripcion="Vecinos los vieron"
            icon={<Sparkles className="h-6 w-6" />}
            gradient="from-amber-50 to-yellow-50"
            blobColor="bg-amber-400"
            iconBg="bg-amber-500 text-white"
            inView={inView}
            delay={0.2}
            numeroColor="text-amber-600"
          />
          <StatCard
            valor={estadisticas.reunidos}
            label="Volvieron a casa"
            descripcion="Reencuentros felices"
            icon={<Heart className="h-6 w-6" />}
            gradient="from-emerald-50 to-green-50"
            blobColor="bg-emerald-400"
            iconBg="bg-emerald-600 text-white"
            inView={inView}
            delay={0.3}
            numeroColor="text-emerald-600"
            highlight
          />
        </div>

        {/* Live ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-stone-500"
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="h-4 w-4" />
          </motion.span>
          <span>Datos actualizados en vivo desde la base de la comunidad</span>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  valor,
  label,
  descripcion,
  icon,
  gradient,
  blobColor,
  iconBg,
  inView,
  delay,
  numeroColor,
  highlight,
}: {
  valor: number;
  label: string;
  descripcion: string;
  icon: React.ReactNode;
  gradient: string;
  blobColor: string;
  iconBg: string;
  inView: boolean;
  delay: number;
  numeroColor: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative bg-gradient-to-br ${gradient} rounded-2xl p-6 border border-stone-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ${
        highlight ? "ring-2 ring-emerald-200" : ""
      }`}
    >
      {/* Animated blob */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-2xl ${blobColor}`}
        aria-hidden="true"
      />

      <div className="relative">
        <motion.div
          whileHover={{ rotate: -10, scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-md ${iconBg}`}
        >
          {icon}
        </motion.div>

        <div className="mt-5">
          <Counter
            value={valor}
            inView={inView}
            delay={delay + 0.3}
            color={numeroColor}
          />
          <h3 className="mt-2 text-base font-semibold text-stone-900">
            {label}
          </h3>
          <p className="text-sm text-stone-600 mt-0.5 leading-snug">
            {descripcion}
          </p>
        </div>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{
            duration: 1.4,
            delay: delay + 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: "left" }}
          className={`mt-5 h-[3px] rounded-full ${iconBg.split(" ")[0]} opacity-30`}
        />
      </div>
    </motion.div>
  );
}

function Counter({
  value,
  inView,
  delay,
  color,
}: {
  value: number;
  inView: boolean;
  delay: number;
  color: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    Math.round(v).toLocaleString("es-AR")
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, value, delay, count]);

  return (
    <motion.div
      className={`font-display text-5xl font-bold tabular-nums ${color}`}
    >
      <motion.span>{rounded}</motion.span>
    </motion.div>
  );
}
