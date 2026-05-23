import { createSupabaseServerClient } from "./server";

/**
 * Trae el usuario logueado actual (o null).
 * Usa cookies de sesión vía createSupabaseServerClient.
 */
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Trae el perfil extendido del usuario actual.
 */
export async function getCurrentPerfil() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}
