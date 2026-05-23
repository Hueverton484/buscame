"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, MapPin, X } from "lucide-react";

const RADIOS = [
  { value: "1", label: "1 km" },
  { value: "3", label: "3 km" },
  { value: "5", label: "5 km" },
  { value: "10", label: "10 km" },
];

export function BotonCercaMio() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const radioActual = searchParams.get("radio");
  const activo = !!searchParams.get("lat") && !!searchParams.get("lng");

  const pedirUbicacion = (radio: string) => {
    if (!navigator.geolocation) {
      toast.error("Tu navegador no soporta geolocalización");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("lat", pos.coords.latitude.toFixed(6));
        params.set("lng", pos.coords.longitude.toFixed(6));
        params.set("radio", radio);
        router.push(`${pathname}?${params.toString()}`);
        toast.success(`Mostrando publicaciones a menos de ${radio} km tuyo`);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          toast.error("Necesito permiso de ubicación para mostrarte lo cercano");
        } else {
          toast.error("No pude obtener tu ubicación. Intentá de nuevo.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const limpiar = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("lat");
    params.delete("lng");
    params.delete("radio");
    router.push(`${pathname}?${params.toString()}`);
  };

  if (activo) {
    return (
      <div className="bg-brand-50 border border-brand-200 rounded-lg p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider">
              Filtro de cercanía
            </p>
            <p className="text-sm font-semibold text-stone-900 mt-0.5">
              A {radioActual} km tuyo
            </p>
          </div>
          <button
            type="button"
            onClick={limpiar}
            className="text-stone-400 hover:text-stone-600 flex-shrink-0"
            aria-label="Quitar filtro de cercanía"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-1 mt-2">
          {RADIOS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => pedirUbicacion(r.value)}
              className={`flex-1 text-xs font-semibold py-1 rounded ${
                r.value === radioActual
                  ? "bg-brand-500 text-white"
                  : "bg-white text-stone-700 hover:bg-stone-100"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => pedirUbicacion("5")}
      disabled={loading}
      className="group inline-flex items-center justify-center gap-2 w-full bg-white hover:bg-brand-50 text-stone-900 hover:text-brand-700 border border-stone-300 hover:border-brand-300 text-sm font-semibold py-2.5 rounded-lg transition-all"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Pidiendo ubicación...
        </>
      ) : (
        <>
          <MapPin className="h-4 w-4 group-hover:scale-110 transition-transform" />
          Ver perros cerca mío
        </>
      )}
    </button>
  );
}
