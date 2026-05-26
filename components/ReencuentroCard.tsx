"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import type { Publicacion } from "@/lib/types";
import { formatearFechaRelativa } from "@/lib/utils";

export function ReencuentroCard({
  publicacion,
  index = 0,
}: {
  publicacion: Publicacion;
  index?: number;
}) {
  const nombre =
    publicacion.perro.nombre ||
    (publicacion.tipo === "encontrado" ? "Perro encontrado" : "Sin nombre");
  const foto = publicacion.fotos[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: index * 0.1,
      }}
      whileHover={{ y: -8 }}
    >
      <Link
        href={`/publicaciones/${publicacion.id}`}
        className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-green-300 hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          {foto && (
            <Image
              src={foto}
              alt={nombre}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-600 text-white text-xs font-bold">
            <Heart className="h-3 w-3 fill-current" aria-hidden="true" /> Reunido
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-display text-2xl font-semibold leading-tight">{nombre}</h3>
            <p className="text-sm text-white/90">
              {publicacion.perro.raza} · {publicacion.ubicacion.barrio}
            </p>
          </div>
        </div>
        <div className="p-4 flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700 text-base flex-shrink-0">
            🏠
          </div>
          <div>
            <p className="text-sm text-stone-700 leading-snug">
              Volvió a casa {formatearFechaRelativa(publicacion.fechaPublicacion)}.
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
