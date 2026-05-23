import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para uso en componentes del navegador ("use client").
 * Usa la clave anon pública, las políticas RLS protegen los datos.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
