"use client";

import dynamic from "next/dynamic";
import type { Publicacion } from "@/lib/types";
import { PawLoader } from "./PawLoader";

// Carga dinámica sin SSR — Leaflet usa window
const Mapa = dynamic(
  () => import("./MapaPublicaciones").then((m) => m.MapaPublicaciones),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-stone-200 bg-stone-100" style={{ height: "500px" }}>
        <PawLoader texto="Cargando el mapa..." altura="500px" />
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
