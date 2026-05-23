"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ReporteResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function crearReporte(
  _prevState: ReporteResult | null,
  formData: FormData
): Promise<ReporteResult> {
  // Extracción de campos
  const tipo = formData.get("tipo")?.toString();
  const perro_nombre = formData.get("perro_nombre")?.toString().trim() || null;
  const perro_raza = formData.get("perro_raza")?.toString().trim();
  const perro_raza_otra = formData.get("perro_raza_otra")?.toString().trim();
  const perro_color = formData.get("perro_color")?.toString().trim();
  const perro_color_otro = formData.get("perro_color_otro")?.toString().trim();
  const perro_tamano = formData.get("perro_tamano")?.toString();
  const perro_sexo = formData.get("perro_sexo")?.toString() || "desconocido";
  const perro_edad_aproximada =
    formData.get("perro_edad_aproximada")?.toString().trim() || null;
  const perro_descripcion = formData.get("perro_descripcion")?.toString().trim();
  const perro_caracteristicas_unicas =
    formData.get("perro_caracteristicas_unicas")?.toString().trim() || null;

  const ubicacion_lat = parseFloat(formData.get("ubicacion_lat")?.toString() || "");
  const ubicacion_lng = parseFloat(formData.get("ubicacion_lng")?.toString() || "");
  const ubicacion_barrio = formData.get("ubicacion_barrio")?.toString().trim();
  const ubicacion_direccion_aproximada =
    formData.get("ubicacion_direccion_aproximada")?.toString().trim() || null;

  const fecha_evento = formData.get("fecha_evento")?.toString();

  const contacto_nombre = formData.get("contacto_nombre")?.toString().trim();
  const contacto_telefono =
    formData.get("contacto_telefono")?.toString().trim() || null;
  const contacto_email =
    formData.get("contacto_email")?.toString().trim() || null;
  const contacto_preferencia =
    formData.get("contacto_preferencia")?.toString() || "whatsapp";

  const recompensaRaw = formData.get("recompensa")?.toString().trim();
  const recompensa = recompensaRaw ? parseInt(recompensaRaw, 10) : null;

  // Validaciones
  const errors: Record<string, string> = {};

  if (tipo !== "perdido" && tipo !== "encontrado") {
    errors.tipo = "Tenés que indicar si el perro está perdido o lo encontraste";
  }

  const razaFinal = perro_raza === "Otra" ? perro_raza_otra : perro_raza;
  if (!razaFinal) errors.perro_raza = "Indicá la raza (o 'Mestizo' si no sabés)";

  const colorFinal = perro_color === "Otro" ? perro_color_otro : perro_color;
  if (!colorFinal) errors.perro_color = "Indicá el color principal";

  if (!perro_tamano || !["pequeno", "mediano", "grande"].includes(perro_tamano)) {
    errors.perro_tamano = "Elegí el tamaño";
  }

  if (!perro_descripcion || perro_descripcion.length < 10) {
    errors.perro_descripcion = "Describí al perro con al menos 10 caracteres";
  }

  if (isNaN(ubicacion_lat) || isNaN(ubicacion_lng)) {
    errors.ubicacion = "Marcá la ubicación en el mapa";
  }

  if (!ubicacion_barrio) errors.ubicacion_barrio = "Elegí el barrio";

  if (!fecha_evento) errors.fecha_evento = "Indicá la fecha";

  if (!contacto_nombre) errors.contacto_nombre = "Ingresá tu nombre";

  if (!contacto_telefono && !contacto_email) {
    errors.contacto = "Dejá un teléfono o un email para que te puedan contactar";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, fieldErrors: errors, error: "Revisá los campos marcados" };
  }

  const supabase = await createSupabaseServerClient();

  // Auth obligatoria
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      ok: false,
      error: "Necesitás tener cuenta para publicar. Iniciá sesión y volvé a intentar.",
    };
  }
  const usuario_id = user.id;

  // Rate limiting: máximo 3 publicaciones en 24h
  const LIMITE_DIARIO = 3;
  const desde = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count: usados } = await supabase
    .from("publicaciones")
    .select("id", { count: "exact", head: true })
    .eq("usuario_id", usuario_id)
    .gte("fecha_publicacion", desde);

  if ((usados ?? 0) >= LIMITE_DIARIO) {
    return {
      ok: false,
      error: `Llegaste al límite de ${LIMITE_DIARIO} publicaciones por día. Probá mañana.`,
    };
  }

  // 1. Subir fotos a Storage (si hay)
  const fotosFiles = formData.getAll("fotos").filter(
    (f): f is File => f instanceof File && f.size > 0
  );
  const fotosUrls: string[] = [];

  for (const [i, file] of fotosFiles.entries()) {
    if (file.size > 5 * 1024 * 1024) {
      return {
        ok: false,
        error: `La foto "${file.name}" supera los 5MB. Achicala e intentá de nuevo.`,
      };
    }
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
    const folder = usuario_id ?? "anonimo";
    const path = `${folder}/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from("fotos-perros")
      .upload(path, file, {
        contentType: file.type,
        cacheControl: "3600",
      });

    if (uploadError) {
      return {
        ok: false,
        error: `No se pudo subir la foto "${file.name}": ${uploadError.message}`,
      };
    }

    const { data: { publicUrl } } = supabase.storage
      .from("fotos-perros")
      .getPublicUrl(path);

    fotosUrls.push(publicUrl);
  }

  // 2. Insertar publicación
  const { data: publicacion, error: insertError } = await supabase
    .from("publicaciones")
    .insert({
      usuario_id,
      tipo,
      estado: tipo === "encontrado" ? "perdido" : "perdido", // ambos arrancan como "perdido" hasta que aparezca
      perro_nombre,
      perro_raza: razaFinal,
      perro_color: colorFinal,
      perro_tamano,
      perro_sexo,
      perro_edad_aproximada,
      perro_descripcion,
      perro_caracteristicas_unicas,
      ubicacion_lat,
      ubicacion_lng,
      ubicacion_barrio,
      ubicacion_direccion_aproximada,
      fecha_evento,
      contacto_nombre,
      contacto_telefono,
      contacto_email,
      contacto_preferencia,
      recompensa,
    })
    .select("id")
    .single();

  if (insertError || !publicacion) {
    return {
      ok: false,
      error: `No se pudo guardar la publicación: ${insertError?.message ?? "error desconocido"}`,
    };
  }

  // 3. Insertar fotos asociadas
  if (fotosUrls.length > 0) {
    const { error: fotosError } = await supabase
      .from("fotos_publicacion")
      .insert(
        fotosUrls.map((url, orden) => ({
          publicacion_id: publicacion.id,
          url,
          orden,
        }))
      );

    if (fotosError) {
      console.error("Error al guardar fotos:", fotosError);
      // No abortamos: la publicación quedó creada, solo no pudimos asociar las fotos
    }
  }

  // 4. Revalidar páginas que muestran listados
  revalidatePath("/");
  revalidatePath("/publicaciones");
  revalidatePath("/mapa");

  // 5. Redirigir a la nueva publicación
  redirect(`/publicaciones/${publicacion.id}`);
}
