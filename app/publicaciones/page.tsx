import { getPublicaciones } from "@/lib/supabase/queries";
import { MasonryGrid } from "@/components/MasonryGrid";
import { FiltrosBusqueda } from "@/components/FiltrosBusqueda";
import { FiltrosActivos } from "@/components/FiltrosActivos";
import { BotonCercaMio } from "@/components/BotonCercaMio";
import { PageHero } from "@/components/PageHero";
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

  const hayFiltros = Object.keys(params).length > 0;
  const subtituloConteo = `${publicaciones.length} ${publicaciones.length === 1 ? "perro esperando volver a casa" : "perros esperando volver a casa"}`;

  return (
    <>
      <PageHero
        title="Publicaciones"
        subtitle={subtituloConteo}
        badge={hayFiltros ? "Filtros aplicados" : "Activos ahora"}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="space-y-3">
            <BotonCercaMio />
            <FiltrosBusqueda />
          </aside>

          <section>
            <FiltrosActivos />
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
    </>
  );
}
