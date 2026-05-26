import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Heart, ArrowRight, Sparkles } from "lucide-react";
import { getPublicaciones, getEstadisticas } from "@/lib/supabase/queries";
import { PublicacionCard } from "@/components/PublicacionCard";
import { ReencuentroCard } from "@/components/ReencuentroCard";
import { NumeroAnimado } from "@/components/NumeroAnimado";
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

      {/* Hero con foto emocional */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-stone-50 to-white border-b border-stone-200">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 animate-fade-in-up">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Texto */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
                <Sparkles className="h-3 w-3" /> Comunidad activa en Buenos Aires
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-stone-900 leading-[0.95]">
                Cada perro merece <em className="not-italic text-brand-500">volver a casa</em>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-stone-600 leading-relaxed max-w-xl">
                Publicá si perdiste o encontraste un perro. La comunidad te ayuda con avistamientos, pistas y reencuentros — gratis, sin vueltas.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/reportar"
                  className="group inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-base font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Reportar un perro
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/publicaciones"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-900 text-base font-semibold px-6 py-3.5 rounded-xl border border-stone-300 hover:border-stone-400 transition-all"
                >
                  <Search className="h-5 w-5" />
                  Buscar perro perdido
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <Estadistica numero={estadisticas.activas} label="Activas" color="text-status-lost" />
                <Estadistica numero={estadisticas.avistados} label="Avistados" color="text-status-spotted" />
                <Estadistica numero={estadisticas.reunidos} label="Reunidos" color="text-status-reunited" />
              </div>
            </div>

            {/* Imagen emocional */}
            <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-stone-200/50">
              <Image
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&q=80"
                alt="Persona acariciando a su perro"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />

              {/* Tarjeta flotante con quote */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 text-xl flex-shrink-0">
                    🏠
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stone-900">
                      {estadisticas.reunidos} {estadisticas.reunidos === 1 ? "perro reencontrado" : "perros reencontrados"}
                    </p>
                    <p className="text-xs text-stone-600 leading-snug mt-0.5">
                      gracias a vecinos como vos que ayudaron
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publicaciones recientes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
              Publicaciones recientes
            </h2>
            <p className="mt-1.5 text-stone-600">
              Perros perdidos o avistados en las últimas horas
            </p>
          </div>
          <Link
            href="/publicaciones"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Ver todas
            <ArrowRight className="h-4 w-4" />
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

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
                <Heart className="h-3 w-3 fill-current" /> Historias felices
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-tight">
                Volvieron <em className="not-italic text-green-700">a casa</em>
              </h2>
              <p className="mt-3 text-stone-600 text-lg">
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

      {/* Cómo funciona */}
      <section className="bg-stone-100 border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
              ¿Cómo funciona?
            </h2>
            <p className="mt-2 text-stone-600">Tres pasos para ayudar a reencontrar familias</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <PasoCard
              numero="1"
              icono={<Search className="h-6 w-6" />}
              titulo="Publicá o buscá"
              descripcion="Reportá tu perro perdido con fotos y datos, o revisá si alguien encontró el tuyo."
            />
            <PasoCard
              numero="2"
              icono={<MapPin className="h-6 w-6" />}
              titulo="Recibí pistas"
              descripcion="Vecinos cercanos pueden enviarte avistamientos con ubicación en el mapa."
            />
            <PasoCard
              numero="3"
              icono={<Heart className="h-6 w-6" />}
              titulo="Reencuentro"
              descripcion="Coordiná por WhatsApp y marcá la publicación como reunida cuando vuelva a casa."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Estadistica({
  numero,
  label,
  color,
}: {
  numero: number;
  label: string;
  color: string;
}) {
  return (
    <div>
      <div className={`text-3xl font-bold ${color}`}>
        <NumeroAnimado valor={numero} />
      </div>
      <div className="text-sm text-stone-600">{label}</div>
    </div>
  );
}

function PasoCard({
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
    <div className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-brand-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md group-hover:scale-110 transition-transform">
          {icono}
        </div>
        <span className="text-3xl font-bold text-stone-200 group-hover:text-brand-200 transition-colors">{numero}</span>
      </div>
      <h3 className="text-lg font-bold text-stone-900 mb-2">{titulo}</h3>
      <p className="text-sm text-stone-600 leading-relaxed">{descripcion}</p>
    </div>
  );
}
