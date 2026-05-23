"use client";

import dynamic from "next/dynamic";

const Picker = dynamic(
  () => import("./MapaPicker").then((m) => m.MapaPicker),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-stone-200 bg-stone-100 flex items-center justify-center" style={{ height: "350px" }}>
        <div className="flex flex-col items-center gap-2 text-stone-500">
          <div className="h-6 w-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Cargando mapa...</span>
        </div>
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
