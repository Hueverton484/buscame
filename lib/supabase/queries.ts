import { createSupabaseServerClient } from "./server";
import type {
  Publicacion,
  FiltrosBusqueda,
  EstadoPublicacion,
  TipoReporte,
  TamanoPerro,
  SexoPerro,
  Pista,
} from "../types";

// =============================================
// Tipos que matchean las tablas de Supabase (snake_case)
// =============================================

interface PublicacionRow {
  id: string;
  usuario_id: string | null;
  tipo: TipoReporte;
  estado: EstadoPublicacion;
  perro_nombre: string | null;
  perro_raza: string;
  perro_color: string;
  perro_tamano: TamanoPerro;
  perro_sexo: SexoPerro;
  perro_edad_aproximada: string | null;
  perro_descripcion: string;
  perro_caracteristicas_unicas: string | null;
  ubicacion_lat: number;
  ubicacion_lng: number;
  ubicacion_barrio: string;
  ubicacion_direccion_aproximada: string | null;
  fecha_evento: string;
  fecha_publicacion: string;
  contacto_nombre: string;
  contacto_telefono: string | null;
  contacto_email: string | null;
  contacto_preferencia: "whatsapp" | "telefono" | "email";
  recompensa: number | null;
}

interface FotoRow {
  url: string;
  orden: number;
}

interface PistaRow {
  id: string;
  publicacion_id: string;
  autor_nombre: string;
  mensaje: string;
  fecha: string;
  ubicacion_avistamiento_lat: number | null;
  ubicacion_avistamiento_lng: number | null;
  ubicacion_avistamiento_barrio: string | null;
}

// =============================================
// Mappers: DB row → app type
// =============================================

function mapearPublicacion(
  row: PublicacionRow,
  fotos: string[] = [],
  pistas: Pista[] = []
): Publicacion {
  return {
    id: row.id,
    tipo: row.tipo,
    estado: row.estado,
    usuarioId: row.usuario_id ?? undefined,
    perro: {
      nombre: row.perro_nombre ?? undefined,
      raza: row.perro_raza,
      color: row.perro_color,
      tamano: row.perro_tamano,
      sexo: row.perro_sexo,
      edadAproximada: row.perro_edad_aproximada ?? undefined,
      descripcion: row.perro_descripcion,
      caracteristicasUnicas: row.perro_caracteristicas_unicas ?? undefined,
    },
    ubicacion: {
      lat: row.ubicacion_lat,
      lng: row.ubicacion_lng,
      barrio: row.ubicacion_barrio,
      direccionAproximada: row.ubicacion_direccion_aproximada ?? undefined,
    },
    fechaEvento: row.fecha_evento,
    fechaPublicacion: row.fecha_publicacion,
    fotos,
    contacto: {
      nombre: row.contacto_nombre,
      telefono: row.contacto_telefono ?? undefined,
      email: row.contacto_email ?? undefined,
      preferenciaContacto: row.contacto_preferencia,
    },
    recompensa: row.recompensa ?? undefined,
    pistas,
  };
}

function mapearPista(row: PistaRow): Pista {
  return {
    id: row.id,
    publicacionId: row.publicacion_id,
    autorNombre: row.autor_nombre,
    mensaje: row.mensaje,
    fecha: row.fecha,
    ubicacionAvistamiento:
      row.ubicacion_avistamiento_lat !== null &&
      row.ubicacion_avistamiento_lng !== null
        ? {
            lat: row.ubicacion_avistamiento_lat,
            lng: row.ubicacion_avistamiento_lng,
            barrio: row.ubicacion_avistamiento_barrio ?? "",
          }
        : undefined,
  };
}

// =============================================
// Queries
// =============================================

/**
 * Trae todas las publicaciones con sus fotos, aplicando filtros.
 * Server-side, devuelve listas para listados y home.
 */
export async function getPublicaciones(
  filtros: FiltrosBusqueda = {}
): Promise<Publicacion[]> {
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("publicaciones")
    .select(
      `
      *,
      fotos:fotos_publicacion(url, orden)
    `
    )
    .eq("oculta", false)
    .order("fecha_publicacion", { ascending: false });

  if (filtros.estado) query = query.eq("estado", filtros.estado);
  if (filtros.tipo) query = query.eq("tipo", filtros.tipo);
  if (filtros.barrio) query = query.eq("ubicacion_barrio", filtros.barrio);
  if (filtros.tamano) query = query.eq("perro_tamano", filtros.tamano);
  if (filtros.raza) query = query.eq("perro_raza", filtros.raza);
  if (filtros.color) query = query.eq("perro_color", filtros.color);
  if (filtros.texto) {
    const t = `%${filtros.texto}%`;
    query = query.or(
      `perro_nombre.ilike.${t},perro_raza.ilike.${t},perro_color.ilike.${t},perro_descripcion.ilike.${t},perro_caracteristicas_unicas.ilike.${t},ubicacion_barrio.ilike.${t}`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error al traer publicaciones:", error);
    return [];
  }

  return (data ?? []).map((row) => {
    const fotos = ((row.fotos as FotoRow[]) ?? [])
      .sort((a, b) => a.orden - b.orden)
      .map((f) => f.url);
    return mapearPublicacion(row as PublicacionRow, fotos);
  });
}

/**
 * Trae una publicación con sus fotos y pistas.
 * Para la página de detalle.
 */
export async function getPublicacionPorId(
  id: string
): Promise<Publicacion | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("publicaciones")
    .select(
      `
      *,
      fotos:fotos_publicacion(url, orden),
      pistas(*)
    `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    if (error && error.code !== "PGRST116") {
      console.error("Error al traer publicación:", error);
    }
    return null;
  }

  const fotos = ((data.fotos as FotoRow[]) ?? [])
    .sort((a, b) => a.orden - b.orden)
    .map((f) => f.url);
  const pistas = ((data.pistas as PistaRow[]) ?? [])
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .map(mapearPista);

  return mapearPublicacion(data as PublicacionRow, fotos, pistas);
}

/**
 * Trae estadísticas globales para la home.
 */
export async function getEstadisticas() {
  const supabase = await createSupabaseServerClient();

  const [perdidos, avistados, reunidos] = await Promise.all([
    supabase.from("publicaciones").select("id", { count: "exact", head: true }).eq("estado", "perdido").eq("oculta", false),
    supabase.from("publicaciones").select("id", { count: "exact", head: true }).eq("estado", "avistado").eq("oculta", false),
    supabase.from("publicaciones").select("id", { count: "exact", head: true }).eq("estado", "reunido").eq("oculta", false),
  ]);

  return {
    activas: perdidos.count ?? 0,
    avistados: avistados.count ?? 0,
    reunidos: reunidos.count ?? 0,
  };
}
