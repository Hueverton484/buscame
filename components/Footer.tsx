import Link from "next/link";
import { Heart } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative bg-stone-900 text-stone-300 mt-16 overflow-hidden">
      {/* Sutil decoración de fondo */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-500 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 [&_span]:!text-white">
              <Logo size="sm" />
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              Plataforma comunitaria para ayudar a reencontrar perros perdidos en Buenos Aires.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explorar
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/publicaciones" className="text-stone-400 hover:text-white transition-colors">
                  Ver publicaciones
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="text-stone-400 hover:text-white transition-colors">
                  Mapa
                </Link>
              </li>
              <li>
                <Link href="/reportar" className="text-stone-400 hover:text-white transition-colors">
                  Reportar un perro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Comunidad
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/registrarse" className="text-stone-400 hover:text-white transition-colors">
                  Crear cuenta
                </Link>
              </li>
              <li>
                <Link href="/ingresar" className="text-stone-400 hover:text-white transition-colors">
                  Ingresar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-800 flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Buscame
          </p>
          <p className="text-xs text-stone-500 inline-flex items-center gap-1">
            Hecho con <Heart className="h-3 w-3 text-brand-500 fill-brand-500" /> en Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  );
}
