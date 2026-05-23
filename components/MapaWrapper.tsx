"use client";

import dynamic from "next/dynamic";
import type { Publicacion } from "@/lib/types";

// Carga dinámica sin SSR — Leaflet usa window
const Mapa = dynamic(
  () => import("./MapaPublicaciones").then((m) => m.MapaPublicaciones),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-stone-200 bg-stone-100 flex items-center justify-center" style={{ height: "500px" }}>
        <div className="flex flex-col items-center gap-2 text-stone-500">
          <div className="h-8 w-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Cargando mapa...</span>
        </div>
      </div>
    ),
  }
);

export function MapaWrapper(props: {
  publicaciones: Publicacion[];
  altura?: string;
  zoom?: number;
}) {
  return <Mapa {...props} />;
}
