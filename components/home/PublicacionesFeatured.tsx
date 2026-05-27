"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import type { Publicacion } from "@/lib/types";
import { formatearFechaRelativa } from "@/lib/utils";
import {
  SectionHeader,
  MagneticButton,
  TiltCard,
} from "@/components/ui/animated";

export function PublicacionesFeatured({
  publicaciones,
}: {
  publicaciones: Publicacion[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (publicaciones.length === 0) return null;

  return (
    <section className="relative bg-stone-50 py-24 sm:py-32 overflow-hidden">
      {/* Bg gradient ornament */}
      <div
        className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-amber-200/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeader
            badge="En vivo"
            badgeColor="brand"
            align="left"
            title={
              <>
                Publicaciones{" "}
                <em className="not-italic text-brand-500">recientes</em>
              </>
            }
            subtitle="Perros perdidos, encontrados o avistados en las últimas horas. Mirá si conocés alguno."
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticButton href="/publicaciones" variant="dark" size="md">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {publicaciones.slice(0, 6).map((pub, i) => (
            <PubCard
              key={pub.id}
              publicacion={pub}
              inView={inView}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ESTADO_BADGE = {
  perdido: { label: "Perdido", classes: "bg-red-600 text-white" },
  avistado: { label: "Avistado", classes: "bg-amber-500 text-white" },
  reunido: { label: "Reunido", classes: "bg-emerald-600 text-white" },
};

function PubCard({
  publicacion,
  inView,
  delay,
}: {
  publicacion: Publicacion;
  inView: boolean;
  delay: number;
}) {
  const nombre =
    publicacion.perro.nombre ||
    (publicacion.tipo === "encontrado" ? "Perro encontrado" : "Sin nombre");
  const foto = publicacion.fotos[0];
  const badge = ESTADO_BADGE[publicacion.estado];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard
        intensity={6}
        glare
        className="h-full"
        innerClassName="group h-full bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-2xl transition-shadow duration-300"
      >
        <Link
          href={`/publicaciones/${publicacion.id}`}
          className="flex flex-col h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative aspect-[4/3] bg-stone-100 overflow-hidden rounded-t-2xl"
            style={{ transform: "translateZ(20px)" }}
          >
            {foto && (
              <Image
                src={foto}
                alt={nombre}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span
              className={`absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badge?.classes}`}
            >
              {badge?.label}
            </span>
          </div>

          <div
            className="flex flex-col gap-1.5 p-5 flex-1"
            style={{ transform: "translateZ(30px)" }}
          >
            <h3 className="font-display text-xl font-semibold text-stone-900 leading-tight">
              {nombre}
            </h3>
            <p className="text-sm text-stone-600">
              {publicacion.perro.raza} · {publicacion.perro.tamano}
            </p>
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {publicacion.ubicacion.barrio}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatearFechaRelativa(publicacion.fechaPublicacion)}
              </span>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
