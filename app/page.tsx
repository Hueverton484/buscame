import Link from "next/link";
import { Search, MapPin, Heart, ArrowRight } from "lucide-react";
import { getPublicaciones, getEstadisticas } from "@/lib/supabase/queries";
import { PublicacionCard } from "@/components/PublicacionCard";
import { ReencuentroCard } from "@/components/ReencuentroCard";
import { HeroImmersive } from "@/components/HeroImmersive";
import { DedicatoriaMalawi } from "@/components/DedicatoriaMalawi";

export default async function HomePage() {
  const [publicaciones, estadisticas] = await Promise.all([
    getPublicaciones(),
    getEstadisticas(),
  ]);

  const publicacionesRecientes = publicaciones
    .filter((p) => p.estado !== "reunido")
    .slice(0, 6);

  const reencuentros = publicaciones
    .filter((p) => p.estado === "reunido")
    .slice(0, 3);

  return (
    <>
      {/* Dedicatoria personal para mamá + Malawi */}
      <DedicatoriaMalawi />

      {/* Hero inmersivo full-viewport con foto bleed + animaciones */}
      <HeroImmersive estadisticas={estadisticas} />

      {/* Publicaciones recientes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              Activos ahora
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-stone-900 leading-tight">
              Buscando <em className="not-italic text-brand-500">a casa</em>
            </h2>
            <p className="mt-2 text-stone-600 text-lg">
              Perros perdidos o avistados en las últimas horas
            </p>
          </div>
          <Link
            href="/publicaciones"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 group"
          >
            Ver todas
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {publicacionesRecientes.map((publicacion) => (
            <PublicacionCard key={publicacion.id} publicacion={publicacion} />
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/publicaciones"
            className="block w-full text-center bg-white hover:bg-stone-50 text-stone-900 text-base font-semibold px-6 py-3 rounded-lg border border-stone-300 transition-colors"
          >
            Ver todas las publicaciones
          </Link>
        </div>
      </section>

      {/* Reencuentros recientes — storytelling */}
      {reencuentros.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50/50 to-stone-50 border-y border-green-100">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-green-200/30 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
                <Heart className="h-3 w-3 fill-current" /> Historias felices
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 leading-tight">
                Volvieron <em className="not-italic text-green-700">a casa</em>
              </h2>
              <p className="mt-4 text-stone-600 text-lg sm:text-xl">
                Cada uno de estos perros se reencontró con su familia gracias a esta comunidad.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {reencuentros.map((p, i) => (
                <ReencuentroCard key={p.id} publicacion={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cómo funciona — más teatral */}
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-4">
              Cómo funciona
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Tres pasos hacia <em className="not-italic bg-gradient-to-r from-brand-300 to-amber-300 bg-clip-text text-transparent">el reencuentro</em>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <PasoCardDark
              numero="01"
              icono={<Search className="h-7 w-7" />}
              titulo="Publicá o buscá"
              descripcion="Reportá tu perro perdido con fotos y datos, o revisá si alguien encontró el tuyo."
            />
            <PasoCardDark
              numero="02"
              icono={<MapPin className="h-7 w-7" />}
              titulo="Recibí pistas"
              descripcion="Vecinos cercanos pueden enviarte avistamientos con ubicación en el mapa."
            />
            <PasoCardDark
              numero="03"
              icono={<Heart className="h-7 w-7" />}
              titulo="Reencuentro"
              descripcion="Coordiná por WhatsApp y marcá la publicación como reunida cuando vuelva a casa."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function PasoCardDark({
  numero,
  icono,
  titulo,
  descripcion,
}: {
  numero: string;
  icono: React.ReactNode;
  titulo: string;
  descripcion: string;
}) {
  return (
    <div className="group relative bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-2 transition-all duration-300">
      <span className="absolute top-6 right-6 font-display text-6xl font-bold text-white/[0.06] group-hover:text-brand-400/20 transition-colors">
        {numero}
      </span>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-xl shadow-brand-500/30 group-hover:scale-110 transition-transform mb-5">
        {icono}
      </div>
      <h3 className="font-display text-2xl font-semibold mb-2 tracking-tight">
        {titulo}
      </h3>
      <p className="text-white/70 leading-relaxed">{descripcion}</p>
    </div>
  );
}
