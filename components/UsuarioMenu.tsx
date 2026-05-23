"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, FolderHeart, ChevronDown } from "lucide-react";
import { cerrarSesion } from "@/app/(auth)/actions";

export function UsuarioMenu({ nombre }: { nombre: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const inicial = nombre.charAt(0).toUpperCase();
  const primerNombre = nombre.split(" ")[0];

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
        aria-expanded={open}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
          {inicial}
        </div>
        <span className="hidden sm:block text-sm font-medium text-stone-900">
          {primerNombre}
        </span>
        <ChevronDown className="hidden sm:block h-4 w-4 text-stone-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-50">
          <div className="px-4 py-3 border-b border-stone-100">
            <p className="text-xs text-stone-500">Sesión iniciada como</p>
            <p className="text-sm font-semibold text-stone-900 truncate">{nombre}</p>
          </div>

          <Link
            href="/mis-publicaciones"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
          >
            <FolderHeart className="h-4 w-4" />
            Mis publicaciones
          </Link>

          <Link
            href="/perfil"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
          >
            <User className="h-4 w-4" />
            Mi perfil
          </Link>

          <div className="border-t border-stone-100 mt-1 pt-1">
            <form action={cerrarSesion}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
