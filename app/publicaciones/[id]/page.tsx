import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
  Dog,
  Printer,
} from "lucide-react";
import { getPublicacionPorId } from "@/lib/supabase/queries";
import { getCurrentUser } from "@/lib/supabase/auth";
import { EstadoBadge } from "@/components/EstadoBadge";
import { BotonReportar } from "@/components/BotonReportar";
import { PhotoGallery } from "@/components/PhotoLightbox";
import { BotonCompartir } from "@/components/BotonCompartir";
import { TAMANO_LABELS } from "@/lib/constants";
import {
  formatearFechaRelativa,
  formatearMoneda,
  whatsappLink,
} from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pub = await getPublicacionPorId(id);
  if (!pub) return { title: "Publicación no encontrada" };

  const nombre =
    pub.perro.nombre ||
    (pub.tipo === "encontrado" ? "Perro encontrado" : "Perro perdido");

  const titulo =
    pub.tipo === "perdido"
      ? `🔴 ${nombre} se perdió en ${pub.ubicacion.barrio}`
      : `🟢 Encontré un ${pub.perro.raza} en ${pub.ubicacion.barrio}`;

  const descripcion = `${pub.perro.raza} · ${pub.perro.color} · ${pub.perro.descripcion.slice(0, 120)}${pub.perro.descripcion.length > 120 ? "…" : ""}`;
  const foto = pub.fotos[0];

  return {
    title: nombre,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      images: foto ? [{ url: foto, width: 1200, height: 630, alt: nombre }] : [],
      type: "article",
      locale: "es_AR",
      siteName: "Buscame",
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: foto ? [foto] : [],
    },
  };
}

export default async function DetallePublicacion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [publicacion, user] = await Promise.all([
    getPublicacionPorId(id),
    getCurrentUser(),
  ]);

  if (!publicacion) notFound();
  const esPropietario = user?.id === publicacion.usuarioId;

  const { perro, ubicacion, contacto, fechaEvento, fotos, pistas, recompensa } =
    publicacion;

  const nombreMostrar =
    perro.nombre ||
    (publicacion.tipo === "encontrado" ? "Perro encontrado" : "Sin nombre");

  const mensajeWhatsapp = `Hola ${contacto.nombre}, te escribo por "${nombreMostrar}" que vi en Buscame.`;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/publicaciones"
        className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a publicaciones
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 animate-fade-in-up">
        <div>
          {/* Galería de fotos con lightbox */}
          {fotos.length > 0 ? (
            <div className="relative mb-4">
              <PhotoGallery fotos={fotos} alt={nombreMostrar} />
              <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
                <EstadoBadge estado={publicacion.estado} />
                {publicacion.tipo === "encontrado" && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-trust-50 text-trust-700 border border-trust-500/30">
                    Encontrado por vecino
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="relative aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center text-stone-400">
              <Dog className="h-16 w-16" />
              <div className="absolute top-4 left-4 flex gap-2">
                <EstadoBadge estado={publicacion.estado} />
              </div>
            </div>
          )}

          {/* Datos del perro — layout revista */}
          <article className="bg-white rounded-2xl border border-stone-200 p-7 sm:p-9 mb-6">
            <header className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-2">
                    {publicacion.tipo === "perdido" ? "Reporte de extravío" : "Reporte de encuentro"}
                  </p>
                  <h1 className="font-display text-5xl sm:text-6xl font-semibold text-stone-900 tracking-tight leading-[0.95]">
                    {nombreMostrar}
                  </h1>
                </div>
                {recompensa && recompensa > 0 && (
                  <div className="inline-flex flex-col items-center px-4 py-2 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-900 border border-amber-300 shadow-sm flex-shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Recompensa</span>
                    <span className="text-xl font-extrabold">{formatearMoneda(recompensa)}</span>
                  </div>
                )}
              </div>

              {/* Pills de info clave inline */}
              <div className="flex flex-wrap items-center gap-1.5 mt-4">
                <Pill>{perro.raza}</Pill>
                <Pill>{perro.color}</Pill>
                <Pill>{TAMANO_LABELS[perro.tamano].split(" ")[0]}</Pill>
                <Pill>{capitalizar(perro.sexo)}</Pill>
                {perro.edadAproximada && <Pill>{perro.edadAproximada}</Pill>}
              </div>
            </header>

            {/* Bloque de descripción tipo párrafo de revista */}
            <div className="prose prose-stone max-w-none">
              <p className="text-lg sm:text-xl text-stone-800 leading-relaxed first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-brand-500 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
                {perro.descripcion}
              </p>
            </div>

            {perro.caracteristicasUnicas && (
              <div className="mt-6 p-5 bg-brand-50/50 border-l-4 border-brand-500 rounded-r-lg">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-2 flex items-center gap-1.5">
                  ✨ Señas particulares
                </h3>
                <p className="text-base text-stone-800 leading-relaxed">
                  {perro.caracteristicasUnicas}
                </p>
              </div>
            )}
          </article>

          {/* Pistas */}
          <div className="bg-white rounded-2xl border border-stone-200 p-7">
            <div className="flex items-end justify-between mb-5 pb-4 border-b border-stone-100">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
                Pistas y avistamientos
              </h2>
              {pistas.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-7 h-7 px-2 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
                  {pistas.length}
                </span>
              )}
            </div>
            {pistas.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">🔎</div>
                <p className="text-sm text-stone-600">
                  Todavía no hay pistas. Si lo viste, compartilo desde el botón <em>"Compartir"</em>.
                </p>
              </div>
            ) : (
              <ul className="space-y-5">
                {pistas.map((pista) => (
                  <li
                    key={pista.id}
                    className="relative pl-6"
                  >
                    <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-brand-500 ring-4 ring-brand-100" />
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-stone-900">
                        {pista.autorNombre}
                      </span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-500">
                        {formatearFechaRelativa(pista.fecha)}
                      </span>
                    </div>
                    <p className="text-stone-700 mt-1.5 leading-relaxed">{pista.mensaje}</p>
                    {pista.ubicacionAvistamiento && (
                      <p className="text-xs text-stone-500 mt-2 inline-flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-full">
                        <MapPin className="h-3 w-3" />
                        Visto en {pista.ubicacionAvistamiento.barrio}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sidebar contacto + ubicación */}
        <aside className="space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
              Ubicación
            </h2>
            <div className="flex items-start gap-2 text-stone-700">
              <MapPin className="h-5 w-5 text-brand-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{ubicacion.barrio}</p>
                {ubicacion.direccionAproximada && (
                  <p className="text-sm text-stone-600 mt-0.5">
                    {ubicacion.direccionAproximada}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600 mt-3 pt-3 border-t border-stone-200">
              <Calendar className="h-4 w-4" />
              <span>Publicado {formatearFechaRelativa(publicacion.fechaPublicacion)}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-stone-50 rounded-2xl border border-stone-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-sm">
                {contacto.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-stone-500">Contactar a</p>
                <p className="font-bold text-stone-900 truncate">{contacto.nombre}</p>
              </div>
            </div>
            <div className="space-y-2">
              {contacto.telefono && (
                <a
                  href={whatsappLink(contacto.telefono, mensajeWhatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-xl shadow-sm hover:shadow transition-all"
                >
                  <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" /> Enviar WhatsApp
                </a>
              )}
              {contacto.telefono && (
                <a
                  href={`tel:${contacto.telefono}`}
                  className="flex items-center justify-center gap-2 w-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                >
                  <Phone className="h-4 w-4" /> Llamar
                </a>
              )}
              {contacto.email && (
                <a
                  href={`mailto:${contacto.email}`}
                  className="flex items-center justify-center gap-2 w-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                >
                  <Mail className="h-4 w-4" /> Enviar email
                </a>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-3 text-center">
              Prefiere {contacto.preferenciaContacto === "whatsapp" ? "WhatsApp" : contacto.preferenciaContacto}
            </p>
          </div>

          {/* Compartir + Poster */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
              Ayudá a difundir
            </h2>
            <BotonCompartir
              publicacionId={publicacion.id}
              nombre={nombreMostrar}
              tipo={publicacion.tipo}
              barrio={publicacion.ubicacion.barrio}
            />
            <Link
              href={`/publicaciones/${publicacion.id}/poster`}
              className="group inline-flex items-center justify-center gap-2 w-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              <Printer className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Imprimir poster
            </Link>
            <p className="text-xs text-stone-500 text-center pt-1 leading-snug">
              Pegá el poster en postes del barrio — incluye QR para ver más info
            </p>
          </div>

          {!esPropietario && (
            <div className="text-center pt-2">
              <BotonReportar publicacionId={publicacion.id} logueado={!!user} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium">
      {children}
    </span>
  );
}

function capitalizar(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
