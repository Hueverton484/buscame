"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Search, X } from "lucide-react";
import { BARRIOS_CABA } from "@/lib/constants";

const ESTADOS = [
  { value: "", label: "Todos" },
  { value: "perdido", label: "🔴 Perdido" },
  { value: "avistado", label: "🟡 Avistado" },
  { value: "reunido", label: "🟢 Reunido" },
];

const TIPOS = [
  { value: "", label: "Todos" },
  { value: "perdido", label: "Reportado como perdido" },
  { value: "encontrado", label: "Reportado como encontrado" },
];

const TAMANOS = [
  { value: "", label: "Cualquier tamaño" },
  { value: "pequeno", label: "Pequeño" },
  { value: "mediano", label: "Mediano" },
  { value: "grande", label: "Grande" },
];

export function FiltrosBusqueda() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearFilters = () => router.push(pathname);

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-stone-900">Filtros</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900"
          >
            <X className="h-3.5 w-3.5" /> Limpiar
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="texto" className="block text-sm font-medium text-stone-700 mb-1.5">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              id="texto"
              type="search"
              placeholder="Nombre, raza, color..."
              defaultValue={searchParams.get("texto") ?? ""}
              onChange={(e) => updateFilter("texto", e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <SelectFilter
          label="Estado"
          name="estado"
          options={ESTADOS}
          value={searchParams.get("estado") ?? ""}
          onChange={(v) => updateFilter("estado", v)}
        />

        <SelectFilter
          label="Tipo de reporte"
          name="tipo"
          options={TIPOS}
          value={searchParams.get("tipo") ?? ""}
          onChange={(v) => updateFilter("tipo", v)}
        />

        <SelectFilter
          label="Barrio"
          name="barrio"
          options={[
            { value: "", label: "Todos los barrios" },
            ...BARRIOS_CABA.map((b) => ({ value: b, label: b })),
          ]}
          value={searchParams.get("barrio") ?? ""}
          onChange={(v) => updateFilter("barrio", v)}
        />

        <SelectFilter
          label="Tamaño"
          name="tamano"
          options={TAMANOS}
          value={searchParams.get("tamano") ?? ""}
          onChange={(v) => updateFilter("tamano", v)}
        />
      </div>
    </div>
  );
}

function SelectFilter({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
      </label>
      <select
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
