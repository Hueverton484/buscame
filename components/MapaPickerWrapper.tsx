"use client";

import dynamic from "next/dynamic";
import { PawLoader } from "./PawLoader";

const Picker = dynamic(
  () => import("./MapaPicker").then((m) => m.MapaPicker),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-stone-200 bg-stone-100" style={{ height: "350px" }}>
        <PawLoader texto="Cargando mapa..." altura="350px" />
      </div>
    ),
  }
);

export function MapaPickerWrapper(props: {
  lat: number | null;
  lng: number | null;
  onPick: (lat: number, lng: number) => void;
  altura?: string;
}) {
  return <Picker {...props} />;
}
