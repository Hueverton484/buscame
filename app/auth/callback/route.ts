import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Endpoint donde aterriza el usuario después de hacer click en el email de verificación.
 * Intercambia el código por una sesión y redirige a la home (o a la URL "next" si la hay).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  // Después de verificación inicial, llevamos al usuario a /bienvenido.
  // Para otros flujos (recuperar contraseña, etc), el parámetro "next" override esto.
  const next = url.searchParams.get("next") ?? "/bienvenido";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  // Si algo sale mal, mostramos un mensaje en /ingresar
  return NextResponse.redirect(
    new URL("/ingresar?error=verificacion_fallida", url.origin)
  );
}
