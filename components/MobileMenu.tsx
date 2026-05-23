"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Map, FileText, FolderHeart, User, LogIn, LogOut } from "lucide-react";
import { cerrarSesion } from "@/app/(auth)/actions";
import { Logo } from "./Logo";

export function MobileMenu({
  perfil,
}: {
  perfil: { nombre: string } | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col">
            {/* Header del drawer */}
            <div className="flex items-center justify-between p-4 border-b border-stone-200">
              <Logo size="sm" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sección usuario */}
            {perfil && (
              <div className="px-4 py-4 border-b border-stone-100 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  {perfil.nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-stone-500">Sesión iniciada como</p>
                  <p className="text-sm font-semibold text-stone-900">{perfil.nombre}</p>
                </div>
              </div>
            )}

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-2">
              <NavItem href="/publicaciones" icon={<FileText className="h-5 w-5" />} onClick={() => setOpen(false)}>
                Publicaciones
              </NavItem>
              <NavItem href="/mapa" icon={<Map className="h-5 w-5" />} onClick={() => setOpen(false)}>
                Mapa
              </NavItem>
              {perfil && (
                <NavItem href="/mis-publicaciones" icon={<FolderHeart className="h-5 w-5" />} onClick={() => setOpen(false)}>
                  Mis publicaciones
                </NavItem>
              )}
              {perfil && (
                <NavItem href="/perfil" icon={<User className="h-5 w-5" />} onClick={() => setOpen(false)}>
                  Mi perfil
                </NavItem>
              )}
            </nav>

            {/* Footer del drawer */}
            <div className="border-t border-stone-100 p-4 space-y-2">
              {perfil ? (
                <form action={cerrarSesion}>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 py-2.5 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </form>
              ) : (
                <Link
                  href="/ingresar"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 py-2.5 rounded-lg transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Ingresar
                </Link>
              )}
              <Link
                href="/reportar"
                onClick={() => setOpen(false)}
                className="block text-center bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                Reportar perro
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({
  href,
  icon,
  onClick,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 active:bg-stone-100 transition-colors"
    >
      <span className="text-stone-500">{icon}</span>
      {children}
    </Link>
  );
}
