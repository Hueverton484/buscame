"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type FlagResult = {
  ok: boolean;
  mensaje?: string;
};

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
