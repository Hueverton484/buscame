"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import type { Publicacion } from "@/lib/types";
import { CABA_CENTER } from "@/lib/constants";

// Fix de íconos default de Leaflet rotos con bundlers
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Íconos personalizados por estado
function crearIcono(color: string) {
  return L.divIcon({
    className: "buscame-marker",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 8px;
          left: 8px;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

const ICONOS = {
  perdido: crearIcono("#dc2626"),
  avistado: crearIcono("#eab308"),
  reunido: crearIcono("#16a34a"),
};

export function MapaPublicaciones({
  publicaciones,
  altura = "500px",
  zoom = 12,
}: {
  publicaciones: Publicacion[];
  altura?: string;
  zoom?: number;
}) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Forzar invalidación de tamaño cuando el contenedor cambia (sticky/responsive)
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="overflow-hidden rounded-xl border border-stone-200"
      style={{ height: altura }}
    >
      <MapContainer
        center={CABA_CENTER}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {publicaciones.map((pub) => (
          <Marker
            key={pub.id}
            position={[pub.ubicacion.lat, pub.ubicacion.lng]}
            icon={ICONOS[pub.estado]}
          >
            <Popup>
              <PopupContent publicacion={pub} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function PopupContent({ publicacion }: { publicacion: Publicacion }) {
  const nombre =
    publicacion.perro.nombre ||
    (publicacion.tipo === "encontrado" ? "Perro encontrado" : "Sin nombre");

  return (
    <div className="w-56">
      {publicacion.fotos[0] && (
        <div className="relative h-32 w-full mb-2 -mx-3 -mt-3 overflow-hidden">
          <Image
            src={publicacion.fotos[0]}
            alt={nombre}
            fill
            sizes="224px"
            className="object-cover"
            style={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          />
        </div>
      )}
      <h3 className="text-base font-bold text-stone-900 m-0">{nombre}</h3>
      <p className="text-xs text-stone-600 m-0 mb-1">
        {publicacion.perro.raza} · {publicacion.perro.color}
      </p>
      <p className="text-xs text-stone-500 m-0 mb-2">
        📍 {publicacion.ubicacion.barrio}
      </p>
      <Link
        href={`/publicaciones/${publicacion.id}`}
        className="inline-block text-xs font-semibold text-brand-600 hover:text-brand-700"
      >
        Ver detalle →
      </Link>
    </div>
  );
}
