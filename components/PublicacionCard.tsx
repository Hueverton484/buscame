import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import type { Publicacion } from "@/lib/types";
import { EstadoBadge } from "./EstadoBadge";
import { formatearFechaRelativa, formatearMoneda } from "@/lib/utils";
import { TAMANO_LABELS } from "@/lib/constants";

export function PublicacionCard({ publicacion }: { publicacion: Publicacion }) {
  const { perro, ubicacion, estado, tipo, fotos, fechaPublicacion, recompensa } =
    publicacion;
  const nombreMostrar =
    perro.nombre || (tipo === "encontrado" ? "Perro encontrado" : "Sin nombre");
  const imagen = fotos[0];

  return (
    <Link
      href={`/publicaciones/${publicacion.id}`}
      className="group flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-brand-300 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={nombreMostrar}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400">
            Sin foto
          </div>
        )}
        <div className="absolute top-3 left-3">
          <EstadoBadge estado={estado} />
        </div>
        {tipo === "encontrado" && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-trust-50 text-trust-700 border border-trust-500/30">
              Encontrado
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-stone-900 text-lg leading-tight group-hover:text-brand-600 transition-colors">
            {nombreMostrar}
          </h3>
        </div>

        <p className="text-sm text-stone-600 mb-3">
          {perro.raza} · {perro.color} · {TAMANO_LABELS[perro.tamano].split(" ")[0]}
        </p>

        <div className="flex flex-col gap-1.5 text-sm text-stone-500 mt-auto">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{ubicacion.barrio}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{formatearFechaRelativa(fechaPublicacion)}</span>
          </div>
        </div>

        {recompensa && recompensa > 0 && (
          <div className="mt-3 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 self-start">
            Recompensa: {formatearMoneda(recompensa)}
          </div>
        )}
      </div>
    </Link>
  );
}
