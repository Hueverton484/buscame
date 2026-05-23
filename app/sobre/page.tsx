import Link from "next/link";
import { Heart, Shield, Users, PawPrint } from "lucide-react";

export const metadata = {
  title: "Sobre Buscame",
  description: "La historia de Buscame, una plataforma comunitaria para reencontrar perros perdidos en Buenos Aires.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <header className="mb-10 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg mb-5">
          <PawPrint className="h-8 w-8" strokeWidth={2.5} />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-2">Sobre Buscame</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 tracking-tight leading-tight">
          Una herramienta para reencontrar familias
        </h1>
      </header>

      <div className="prose prose-stone max-w-none">
        <p className="text-lg text-stone-700 leading-relaxed">
          Buscame nació de la necesidad real de muchas familias en Buenos Aires que pierden a sus perros y no saben por dónde empezar a buscar. Las redes sociales se llenan de publicaciones desordenadas, los grupos de WhatsApp se diluyen, y muchas veces el dueño y el vecino que vio al perro nunca llegan a conectarse.
        </p>
        <p className="text-lg text-stone-700 leading-relaxed mt-4">
          Esta plataforma centraliza todo en un lugar: un mapa donde ves dónde se perdió cada perro, fotos claras, datos de contacto directo, y la posibilidad de que cualquier vecino que lo vea pueda dejar una pista al instante.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-10">
        <Valor
          icono={<Heart className="h-5 w-5" />}
          titulo="Gratis y sin vueltas"
          descripcion="Sin publicidad, sin planes premium. La plataforma es 100% gratuita para ayudar al máximo de familias posible."
        />
        <Valor
          icono={<Users className="h-5 w-5" />}
          titulo="Comunidad real"
          descripcion="El poder está en los vecinos. Cuantos más usuarios activos en cada barrio, más rápido aparecen los perros."
        />
        <Valor
          icono={<Shield className="h-5 w-5" />}
          titulo="Sin abusos"
          descripcion="Verificación de email, captcha y sistema de flaggeo comunitario para mantener publicaciones reales."
        />
      </div>

      <div className="mt-12 p-6 bg-stone-50 border border-stone-200 rounded-2xl text-center">
        <p className="text-stone-700">
          Si te resulta útil, compartila con vecinos. Cuantos más seamos, más chances tiene cada perro de volver a casa.
        </p>
        <Link
          href="/publicaciones"
          className="inline-block mt-4 font-semibold text-brand-600 hover:text-brand-700"
        >
          Ver publicaciones activas →
        </Link>
      </div>
    </div>
  );
}

function Valor({
  icono,
  titulo,
  descripcion,
}: {
  icono: React.ReactNode;
  titulo: string;
  descripcion: string;
}) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 text-center">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600 mb-3">
        {icono}
      </div>
      <h3 className="font-display text-lg font-semibold text-stone-900 mb-1">
        {titulo}
      </h3>
      <p className="text-sm text-stone-600 leading-relaxed">{descripcion}</p>
    </div>
  );
}
