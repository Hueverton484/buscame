import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
  Dog,
} from "lucide-react";
import { getPublicacionPorId } from "@/lib/supabase/queries";
import { getCurrentUser } from "@/lib/supabase/auth";
import { EstadoBadge } from "@/components/EstadoBadge";
import { BotonReportar } from "@/components/BotonReportar";
import { PhotoGallery } from "@/components/PhotoLightbox";
import { TAMANO_LABELS } from "@/lib/constants";
import {
  formatearFechaRelativa,
  formatearMoneda,
  whatsappLink,
} from "@/lib/utils";

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

          {/* Datos del perro */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-stone-900">
                  {nombreMostrar}
                </h1>
                <p className="text-stone-600 mt-1">
                  {perro.raza} · {perro.color}
                </p>
              </div>
              {recompensa && recompensa > 0 && (
                <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {formatearMoneda(recompensa)}
                </div>
              )}
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <Dato label="Tamaño" valor={TAMANO_LABELS[perro.tamano]} />
              <Dato label="Sexo" valor={capitalizar(perro.sexo)} />
              {perro.edadAproximada && (
                <Dato label="Edad aproximada" valor={perro.edadAproximada} />
              )}
              <Dato
                label="Fecha del evento"
                valor={new Date(fechaEvento).toLocaleDateString("es-AR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
            </dl>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                Descripción
              </h3>
              <p className="text-stone-700 leading-relaxed">{perro.descripcion}</p>
            </div>

            {perro.caracteristicasUnicas && (
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Características únicas
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  {perro.caracteristicasUnicas}
                </p>
              </div>
            )}
          </div>

          {/* Pistas */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="text-lg font-bold text-stone-900 mb-4">
              Pistas y avistamientos {pistas.length > 0 && `(${pistas.length})`}
            </h2>
            {pistas.length === 0 ? (
              <p className="text-sm text-stone-500">
                Todavía no hay pistas. Si lo viste, ¡compartilo!
              </p>
            ) : (
              <ul className="space-y-4">
                {pistas.map((pista) => (
                  <li
                    key={pista.id}
                    className="border-l-2 border-brand-300 pl-4 py-1"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-stone-900">
                        {pista.autorNombre}
                      </span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-500">
                        {formatearFechaRelativa(pista.fecha)}
                      </span>
                    </div>
                    <p className="text-stone-700 mt-1">{pista.mensaje}</p>
                    {pista.ubicacionAvistamiento && (
                      <p className="text-xs text-stone-500 mt-1 inline-flex items-center gap-1">
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

function Dato({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
        {label}
      </dt>
      <dd className="text-stone-900 mt-0.5">{valor}</dd>
    </div>
  );
}

function capitalizar(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
