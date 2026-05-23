import Image from "next/image";
import { Heart } from "lucide-react";

/**
 * Dedicatoria personal — diseñada por Agustín para su mamá y Malawi.
 * Aparece como sección al tope de la home, antes del hero.
 */
export function DedicatoriaMalawi() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 border-b border-rose-100">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Mensaje */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Heart className="h-3 w-3 fill-current" /> Dedicatoria especial
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-stone-900 leading-[1]">
            Te quiero <em className="not-italic bg-gradient-to-r from-rose-500 to-brand-500 bg-clip-text text-transparent">Malawi</em> 💛
          </h1>
          <p className="mt-4 text-stone-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Esto es para vos, mamá. Te quiere awito.
          </p>
        </div>

        {/* Dos fotos en estilo polaroid */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {/* Foto 1: Malawi con pewo malvado */}
          <figure className="group bg-white p-3 pb-12 rounded-md shadow-xl rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-500 max-w-[260px] sm:max-w-[280px]">
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden rounded-sm">
              <Image
                src="/malawi/mama-malawi.jpeg"
                alt="Pewo malvado"
                fill
                sizes="280px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="font-display italic text-stone-700 text-center mt-3 text-lg">
              pewo malvado
            </figcaption>
          </figure>

          {/* Foto 2: Malawi y yo — sin caption */}
          <figure className="group bg-white p-3 rounded-md shadow-xl rotate-[2deg] hover:rotate-0 hover:scale-105 transition-all duration-500 max-w-[260px] sm:max-w-[280px]">
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden rounded-sm">
              <Image
                src="/malawi/mama-yo.jpeg"
                alt="Malawi y yo"
                fill
                sizes="280px"
                className="object-cover"
                priority
              />
            </div>
          </figure>
        </div>

      </div>
    </section>
  );
}
