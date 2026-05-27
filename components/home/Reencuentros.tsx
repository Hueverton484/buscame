"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Heart, ArrowRight } from "lucide-react";
import type { Publicacion } from "@/lib/types";
import { formatearFechaRelativa } from "@/lib/utils";
import {
  SectionHeader,
  TiltCard,
  MagneticButton,
} from "@/components/ui/animated";

export function Reencuentros({
  publicaciones,
}: {
  publicaciones: Publicacion[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (publicaciones.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-gradient-to-br from-emerald-50 via-green-50/50 to-stone-50 border-y border-emerald-100">
      {/* Bg ornament */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-200/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Historias felices"
          badgeIcon={<Heart className="h-3 w-3 fill-current" />}
          badgeColor="emerald"
          title={
            <>
              Volvieron <em className="not-italic text-emerald-700">a casa</em>
            </>
          }
          subtitle="Cada uno de estos perros se reencontró con su familia gracias a esta comunidad."
          className="mb-16"
          size="lg"
        />

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {publicaciones.slice(0, 3).map((pub, i) => (
            <ReencuentroBig
              key={pub.id}
              publicacion={pub}
              inView={inView}
              delay={i * 0.12}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <MagneticButton
            href="/publicaciones?estado=reunido"
            variant="dark"
            size="md"
          >
            Ver todos los reencuentros
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function ReencuentroBig({
  publicacion,
  inView,
  delay,
}: {
  publicacion: Publicacion;
  inView: boolean;
  delay: number;
}) {
  const nombre = publicacion.perro.nombre || "Perro feliz";
  const foto = publicacion.fotos[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard
        intensity={8}
        glare
        className="h-full"
        innerClassName="group h-full rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-500"
      >
        <Link
          href={`/publicaciones/${publicacion.id}`}
          className="flex flex-col h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative aspect-[4/3] bg-stone-100 overflow-hidden"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(16,185,129,0.5)",
                  "0 0 0 12px rgba(16,185,129,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider"
            >
              <Heart className="h-3 w-3 fill-current" /> Volvió a casa
            </motion.div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-display text-3xl font-semibold leading-tight">
                {nombre}
              </h3>
              <p className="text-sm text-white/85 mt-0.5">
                {publicacion.perro.raza} · {publicacion.ubicacion.barrio}
              </p>
            </div>
          </div>

          <div
            className="p-5 flex items-center gap-3"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-lg shrink-0">
              🏠
            </div>
            <div className="text-sm text-stone-700 leading-snug">
              Reencuentro {formatearFechaRelativa(publicacion.fechaPublicacion)}
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
