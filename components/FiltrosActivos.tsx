"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { X, Filter } from "lucide-react";

const LABELS: Record<string, (v: string) => string> = {
  estado: (v) => `Estado: ${v === "perdido" ? "Perdido" : v === "avistado" ? "Avistado" : "Reunido"}`,
  tipo: (v) => `Tipo: ${v === "perdido" ? "Reportado perdido" : "Reportado encontrado"}`,
  barrio: (v) => `📍 ${v}`,
  tamano: (v) => `Tamaño: ${v === "pequeno" ? "Pequeño" : v === "mediano" ? "Mediano" : "Grande"}`,
  raza: (v) => v,
  color: (v) => `Color: ${v}`,
  texto: (v) => `"${v}"`,
};

const KEYS_FILTRABLES = ["estado", "tipo", "barrio", "tamano", "raza", "color", "texto"];

export function FiltrosActivos() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activos = KEYS_FILTRABLES
    .map((k) => ({ key: k, value: searchParams.get(k) }))
    .filter((f): f is { key: string; value: string } => !!f.value);

  if (activos.length === 0) return null;

  const removerFiltro = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const limpiarTodo = () => router.push(pathname);

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5" role="region" aria-label="Filtros activos">
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 uppercase tracking-wider">
        <Filter className="h-3 w-3" aria-hidden="true" />
        Filtros
      </span>
      <AnimatePresence mode="popLayout">
        {activos.map(({ key, value }) => (
          <motion.button
            key={key}
            type="button"
            onClick={() => removerFiltro(key)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-brand-100 text-brand-800 text-sm font-medium hover:bg-brand-200 transition-colors group"
            aria-label={`Quitar filtro ${LABELS[key]?.(value) ?? value}`}
          >
            <span>{LABELS[key]?.(value) ?? value}</span>
            <X className="h-3.5 w-3.5 text-brand-600 group-hover:text-brand-800" aria-hidden="true" />
          </motion.button>
        ))}
      </AnimatePresence>
      {activos.length > 1 && (
        <button
          type="button"
          onClick={limpiarTodo}
          className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-2 py-1"
        >
          Limpiar todos
        </button>
      )}
    </div>
  );
}
