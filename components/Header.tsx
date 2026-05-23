import Link from "next/link";
import { getCurrentPerfil } from "@/lib/supabase/auth";
import { UsuarioMenu } from "./UsuarioMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

export async function Header() {
  const perfil = await getCurrentPerfil();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Buscame - Inicio">
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/publicaciones">Publicaciones</NavLink>
            <NavLink href="/mapa">Mapa</NavLink>
            {perfil && (
              <NavLink href="/mis-publicaciones">Mis publicaciones</NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {/* Desktop: usuario / login + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {perfil ? (
                <UsuarioMenu nombre={perfil.nombre} />
              ) : (
                <Link
                  href="/ingresar"
                  className="text-sm font-medium text-stone-700 hover:text-stone-900 px-3 py-2 rounded-md hover:bg-stone-100 transition-colors"
                >
                  Ingresar
                </Link>
              )}
              <Link
                href="/reportar"
                className="inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
              >
                Reportar perro
              </Link>
            </div>

            {/* Mobile: solo CTA + hamburger */}
            <Link
              href="/reportar"
              className="md:hidden inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-3 py-2 rounded-lg shadow-sm transition-colors"
            >
              Reportar
            </Link>
            <MobileMenu perfil={perfil ? { nombre: perfil.nombre } : null} />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-stone-700 hover:text-stone-900 px-3 py-2 rounded-md hover:bg-stone-100 transition-colors"
    >
      {children}
    </Link>
  );
}
