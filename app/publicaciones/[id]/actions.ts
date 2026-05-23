"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type FlagResult = {
  ok: boolean;
  mensaje?: string;
};

export type PistaResult = {
  ok: boolean;
  mensaje?: string;
  fieldErrors?: Record<string, string>;
};

export async function dejarPista(
  _prev: PistaResult | null,
  formData: FormData
): Promise<PistaResult> {
  const publicacion_id = formData.get("publicacion_id")?.toString();
  const mensaje = formData.get("mensaje")?.toString().trim() ?? "";
  const autorNombreManual = formData.get("autor_nombre")?.toString().trim();
  const barrio = formData.get("ubicacion_barrio")?.toString().trim() || null;
  const latStr = formData.get("ubicacion_lat")?.toString();
  const lngStr = formData.get("ubicacion_lng")?.toString();

  const errors: Record<string, string> = {};
  if (!publicacion_id) errors.publicacion = "Faltó la publicación";
  if (mensaje.length < 10)
    errors.mensaje = "Contanos al menos un poco más de lo que viste (mín. 10 caracteres)";

  if (Object.keys(errors).length > 0) {
    return { ok: false, fieldErrors: errors };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let autor_nombre = autorNombreManual || "Anónimo";
  let autor_usuario_id: string | null = null;

  if (user) {
    autor_usuario_id = user.id;
    const { data: perfil } = await supabase
      .from("perfiles")
      .select("nombre")
      .eq("id", user.id)
      .single();
    if (perfil?.nombre) autor_nombre = perfil.nombre;
  }

  const lat = latStr ? parseFloat(latStr) : null;
  const lng = lngStr ? parseFloat(lngStr) : null;

  const { error } = await supabase.from("pistas").insert({
    publicacion_id,
    autor_usuario_id,
    autor_nombre,
    mensaje,
    ubicacion_avistamiento_lat: lat,
    ubicacion_avistamiento_lng: lng,
    ubicacion_avistamiento_barrio: barrio,
  });

  if (error) {
    return { ok: false, mensaje: error.message };
  }

  revalidatePath(`/publicaciones/${publicacion_id}`);
  return {
    ok: true,
    mensaje:
      "¡Gracias por tu pista! El dueño la va a poder ver en la publicación.",
  };
}

const MOTIVOS_VALIDOS = ["falso", "inapropiado", "spam", "duplicado", "otro"] as const;
type MotivoFlag = (typeof MOTIVOS_VALIDOS)[number];

export async function reportarPublicacion(
  _prev: FlagResult | null,
  formData: FormData
): Promise<FlagResult> {
  const publicacion_id = formData.get("publicacion_id")?.toString();
  const motivo = formData.get("motivo")?.toString() as MotivoFlag;
  const comentario = formData.get("comentario")?.toString().trim() || null;

  if (!publicacion_id) {
    return { ok: false, mensaje: "Faltó indicar la publicación" };
  }
  if (!MOTIVOS_VALIDOS.includes(motivo)) {
    return { ok: false, mensaje: "Elegí un motivo válido" };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      mensaje: "Necesitás tener cuenta para reportar publicaciones",
    };
  }

  const { error } = await supabase.from("flags_publicacion").insert({
    publicacion_id,
    usuario_id: user.id,
    motivo,
    comentario,
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: false, mensaje: "Ya reportaste esta publicación antes" };
    }
    if (error.code === "23514" || error.message.includes("policy")) {
      return {
        ok: false,
        mensaje: "No podés reportar tu propia publicación",
      };
    }
    return { ok: false, mensaje: error.message };
  }

  revalidatePath(`/publicaciones/${publicacion_id}`);
  return {
    ok: true,
    mensaje:
      "Reporte enviado. Si otros usuarios coinciden, la publicación se ocultará automáticamente.",
  };
}
