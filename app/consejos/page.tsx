import Link from "next/link";
import { AlertCircle, Camera, MapPin, Megaphone, Search, Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Consejos para encontrar a tu perro",
  description: "Qué hacer cuando perdiste tu perro o encontraste uno. Guía rápida para actuar en las primeras horas.",
};

export default function ConsejosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-2">Guía rápida</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 tracking-tight leading-tight">
          Qué hacer si perdés a tu perro
        </h1>
        <p className="mt-4 text-lg text-stone-600 leading-relaxed">
          Las primeras 24 horas son las más importantes. Estos pasos te ayudan a maximizar las chances de reencuentro.
        </p>
      </header>

      <div className="space-y-6">
        <Consejo
          numero={1}
          icono={<AlertCircle className="h-5 w-5" />}
          titulo="Quedate en la zona donde lo perdiste"
          descripcion="Los perros suelen volver al último lugar donde estuvieron. Esperá 30-60 minutos cerca y dejá una prenda tuya con tu olor en el piso."
        />
        <Consejo
          numero={2}
          icono={<Megaphone className="h-5 w-5" />}
          titulo="Avisale a vecinos y comercios cercanos"
          descripcion="Encargados de edificios, kioscos, panaderías. La red local es tu mejor aliada en las primeras horas."
        />
        <Consejo
          numero={3}
          icono={<Camera className="h-5 w-5" />}
          titulo="Buscá fotos claras y recientes"
          descripcion="Idealmente con buena luz natural, mostrando su cara y cualquier seña particular (manchas, cicatrices, collar). Las fotos viejas o borrosas reducen las chances."
        />
        <Consejo
          numero={4}
          icono={<MapPin className="h-5 w-5" />}
          titulo={<>Publicalo en <Link href="/reportar" className="text-brand-600 hover:text-brand-700 underline">Buscame</Link></>}
          descripcion="Cuanto antes lo publiques, más gente lo ve. Marcá la ubicación exacta en el mapa y dejá un teléfono de contacto disponible."
        />
        <Consejo
          numero={5}
          icono={<Search className="h-5 w-5" />}
          titulo="Andá a veterinarias y refugios cercanos"
          descripcion="Mucha gente que encuentra un perro lo lleva a la veterinaria más cercana para chequear microchip. Llamá o pasá a dejar info."
        />
        <Consejo
          numero={6}
          icono={<Heart className="h-5 w-5" />}
          titulo="Imprimí carteles y pegá en la zona"
          descripcion={<>Desde la publicación podés generar un poster A4 imprimible con foto + QR. Pegalo en postes, paradas de colectivo y plazas a 5-10 cuadras a la redonda.</>}
        />
      </div>

      <div className="mt-12 p-6 bg-gradient-to-br from-brand-50 to-amber-50 border border-brand-200 rounded-2xl">
        <h2 className="font-display text-xl font-semibold text-stone-900 mb-2">
          ¿Encontraste un perro?
        </h2>
        <p className="text-sm text-stone-700 mb-4">
          Si vos sos el que encontró un perro, también podés reportarlo. Es la otra mitad del puente para que la familia lo recupere.
        </p>
        <Link
          href="/reportar"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          Reportar perro encontrado <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function Consejo({
  numero,
  icono,
  titulo,
  descripcion,
}: {
  numero: number;
  icono: React.ReactNode;
  titulo: React.ReactNode;
  descripcion: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 p-5 bg-white border border-stone-200 rounded-2xl hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            {icono}
          </div>
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-xs font-bold">
            {numero}
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-stone-900 mb-1">
          {titulo}
        </h3>
        <p className="text-stone-700 leading-relaxed">{descripcion}</p>
      </div>
    </div>
  );
}
