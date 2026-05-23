import Image from "next/image";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import QRCode from "qrcode";
import { getPublicacionPorId } from "@/lib/supabase/queries";
import { TAMANO_LABELS } from "@/lib/constants";
import { formatearMoneda } from "@/lib/utils";
import { BotonImprimir } from "@/components/BotonImprimir";

export const metadata = {
  title: "Poster imprimible",
};

export default async function PosterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publicacion = await getPublicacionPorId(id);
  if (!publicacion) notFound();

  // URL absoluta para el QR
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const urlPublicacion = `${protocol}://${host}/publicaciones/${publicacion.id}`;
  const qrDataUrl = await QRCode.toDataURL(urlPublicacion, {
    width: 400,
    margin: 1,
    color: { dark: "#1c1917", light: "#ffffff" },
  });

  const { perro, ubicacion, contacto, fotos, tipo, recompensa } = publicacion;
  const nombre = perro.nombre || (tipo === "encontrado" ? "Perro encontrado" : "Perro perdido");
  const titulo = tipo === "perdido" ? "PERRO PERDIDO" : "PERRO ENCONTRADO";
  const colorTitulo = tipo === "perdido" ? "bg-red-600" : "bg-green-600";

  return (
    <>
      {/* Barra de acciones (no se imprime) */}
      <div className="bg-stone-900 text-white p-4 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-stone-400">Vista previa del poster imprimible</p>
            <p className="text-sm">Apretá "Imprimir" y elegí "Guardar como PDF" o tu impresora</p>
          </div>
          <BotonImprimir />
        </div>
      </div>

      {/* Poster A4 — esto sí se imprime */}
      <div className="bg-stone-100 print:bg-white py-8 print:py-0">
        <div
          className="mx-auto bg-white shadow-xl print:shadow-none"
          style={{
            width: "210mm",
            minHeight: "297mm",
            maxWidth: "100%",
          }}
        >
          {/* Header rojo/verde */}
          <div className={`${colorTitulo} text-white text-center py-6 px-8`}>
            <p className="text-sm font-bold tracking-[0.3em] opacity-90 uppercase">
              {tipo === "perdido" ? "Por favor ayudame" : "Estoy en buenas manos"}
            </p>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mt-1">
              {titulo}
            </h1>
          </div>

          {/* Cuerpo */}
          <div className="p-8 sm:p-10">
            {/* Foto + datos */}
            <div className="flex flex-col sm:flex-row gap-8 mb-8">
              <div className="relative w-full sm:w-[55%] aspect-square rounded-md overflow-hidden border-4 border-stone-900 bg-stone-100 flex-shrink-0">
                {fotos[0] ? (
                  <Image
                    src={fotos[0]}
                    alt={nombre}
                    fill
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-stone-400 text-9xl">
                    🐕
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-4xl font-extrabold text-stone-900 leading-tight mb-3">
                  {nombre}
                </h2>
                <dl className="space-y-2 text-stone-900">
                  <Fila label="Raza" valor={perro.raza} />
                  <Fila label="Color" valor={perro.color} />
                  <Fila label="Tamaño" valor={TAMANO_LABELS[perro.tamano].split(" ")[0]} />
                  <Fila label="Sexo" valor={perro.sexo === "macho" ? "Macho" : perro.sexo === "hembra" ? "Hembra" : "No sé"} />
                  {perro.edadAproximada && <Fila label="Edad" valor={perro.edadAproximada} />}
                  <Fila label="Zona" valor={ubicacion.barrio} />
                </dl>

                {recompensa && recompensa > 0 && (
                  <div className="mt-4 inline-block px-4 py-2 bg-amber-100 border-2 border-amber-500 rounded-md">
                    <p className="text-xs font-bold text-amber-900 uppercase">Recompensa</p>
                    <p className="text-2xl font-extrabold text-amber-900">{formatearMoneda(recompensa)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-6 pb-6 border-b-2 border-dashed border-stone-300">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-2">
                Descripción
              </h3>
              <p className="text-base text-stone-900 leading-relaxed">{perro.descripcion}</p>
              {perro.caracteristicasUnicas && (
                <p className="text-base text-stone-900 leading-relaxed mt-2">
                  <strong className="font-bold">Señas:</strong> {perro.caracteristicasUnicas}
                </p>
              )}
            </div>

            {/* Contacto + QR */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Si lo viste, contactame
                </h3>
                <p className="text-2xl font-extrabold text-stone-900">{contacto.nombre}</p>
                {contacto.telefono && (
                  <p className="text-3xl font-bold text-stone-900 mt-1">
                    📞 {contacto.telefono}
                  </p>
                )}
                {contacto.email && (
                  <p className="text-base text-stone-700 mt-1">✉️ {contacto.email}</p>
                )}
              </div>

              <div className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="QR code" width={140} height={140} className="border-2 border-stone-900 rounded-md" />
                <p className="text-xs text-stone-600 mt-2 max-w-[140px] mx-auto leading-tight">
                  Escaneá para más info y dejar pistas
                </p>
              </div>
            </div>

            {/* Footer del poster */}
            <div className="mt-8 pt-4 border-t border-stone-300 text-center">
              <p className="text-xs text-stone-500">
                Publicado en <strong className="text-stone-900">Buscame</strong> — comunidad para reencontrar perros perdidos
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Fila({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex gap-2 text-base">
      <dt className="font-bold text-stone-700 min-w-[80px]">{label}:</dt>
      <dd>{valor}</dd>
    </div>
  );
}
