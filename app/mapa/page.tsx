import { getPublicaciones } from "@/lib/supabase/queries";
import { MapaWrapper } from "@/components/MapaWrapper";
import { FiltrosBusqueda } from "@/components/FiltrosBusqueda";
import { parseFiltrosFromSearchParams } from "@/lib/filtrar";

export const metadata = {
  title: "Mapa · Buscame",
  description: "Ver perros perdidos y avistados en el mapa de Buenos Aires",
};

export default async function MapaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filtros = parseFiltrosFromSearchParams(params);
  const publicaciones = await getPublicaciones(filtros);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Mapa de publicaciones</h1>
        <p className="mt-1 text-stone-600">
          <span className="font-semibold text-stone-900">{publicaciones.length}</span> {publicaciones.length === 1 ? "publicación" : "publicaciones"} en CABA · tocá los marcadores para ver detalles
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside>
          <FiltrosBusqueda />

          <div className="mt-4 bg-white rounded-xl border border-stone-200 p-4">
            <h3 className="text-sm font-bold text-stone-900 mb-3">Referencias</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-status-lost border-2 border-white shadow" />
                Perdido
              </li>
              <li className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-status-spotted border-2 border-white shadow" />
                Avistado
              </li>
              <li className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-status-reunited border-2 border-white shadow" />
                Reunido
              </li>
            </ul>
          </div>
        </aside>

        <div>
          <MapaWrapper publicaciones={publicaciones} altura="calc(100vh - 200px)" />
        </div>
      </div>
    </div>
  );
}
