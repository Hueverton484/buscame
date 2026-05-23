"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CABA_CENTER } from "@/lib/constants";

// Fix de íconos default de Leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const iconoSelector = L.divIcon({
  className: "buscame-picker-marker",
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background: #ff6b35;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 12px rgba(0,0,0,0.4);
    ">
      <div style="width: 10px; height: 10px; background: white; border-radius: 50%; position: absolute; top: 8px; left: 8px;"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function ClickHandler({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function MapaPicker({
  lat,
  lng,
  onPick,
  altura = "350px",
}: {
  lat: number | null;
  lng: number | null;
  onPick: (lat: number, lng: number) => void;
  altura?: string;
}) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => mapRef.current?.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="overflow-hidden rounded-xl border border-stone-200"
      style={{ height: altura }}
    >
      <MapContainer
        center={lat && lng ? [lat, lng] : CABA_CENTER}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", cursor: "crosshair" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPick={onPick} />
        {lat !== null && lng !== null && (
          <Marker position={[lat, lng]} icon={iconoSelector} />
        )}
      </MapContainer>
    </div>
  );
}
