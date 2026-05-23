import { getPublicaciones } from "@/lib/supabase/queries";
import { MasonryGrid } from "@/components/MasonryGrid";
import { FiltrosBusqueda } from "@/components/FiltrosBusqueda";
import { BotonCercaMio } from "@/components/BotonCercaMio";
import {
  filtrarPorDistancia,
  parseFiltrosFromSearchParams,
  parseGeoFromSearchParams,
} from "@/lib/filtrar";
import { IlustracionBuscar } from "@/components/Ilustraciones";

export const metadata = {
  title: "Publicaciones",
  description: "Ver perros perdidos y encontrados en Buenos Aires",
};

export default async function PublicacionesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filtros = parseFiltrosFromSearchParams(params);
  const geo = parseGeoFromSearchParams(params);
  let publicaciones = await getPublicaciones(filtros);
  if (geo) publicaciones = filtrarPorDistancia(publicaciones, geo.lat, geo.lng, geo.radio);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 tracking-tight">Publicaciones</h1>
          <p className="mt-1 text-stone-600">
            <span className="font-semibold text-stone-900">{publicaciones.length}</span>{" "}
            {publicaciones.length === 1 ? "resultado" : "resultados"}
            {Object.keys(params).length > 0 && (
              <span className="ml-1 text-xs text-stone-500">· filtros aplicados</span>
            )}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-3">
          <BotonCercaMio />
          <FiltrosBusqueda />
        </aside>

        <section>
          {publicaciones.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white border border-stone-200 rounded-2xl p-12 text-center animate-fade-in-up">
              <IlustracionBuscar className="h-40 w-40 mb-3" />
              <h2 className="font-display text-2xl font-semibold text-stone-900 mb-2 tracking-tight">
                No encontramos publicaciones
              </h2>
              <p className="text-stone-600 max-w-sm mb-5 leading-relaxed">
                Probá modificar los filtros o limpiarlos. Si todavía no hay nada que coincida, podés ser la primera persona en publicar.
              </p>
              <a
                href="/reportar"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors"
              >
                Reportar un perro
              </a>
            </div>
          ) : (
            <MasonryGrid publicaciones={publicaciones} />
          )}
        </section>
      </div>
    </div>
  );
}
