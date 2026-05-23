import type { Publicacion, FiltrosBusqueda } from "./types";

export function filtrarPublicaciones(
  publicaciones: Publicacion[],
  filtros: FiltrosBusqueda
): Publicacion[] {
  return publicaciones.filter((pub) => {
    if (filtros.estado && pub.estado !== filtros.estado) return false;
    if (filtros.tipo && pub.tipo !== filtros.tipo) return false;
    if (filtros.barrio && pub.ubicacion.barrio !== filtros.barrio) return false;
    if (filtros.tamano && pub.perro.tamano !== filtros.tamano) return false;
    if (filtros.raza && pub.perro.raza !== filtros.raza) return false;
    if (filtros.color && pub.perro.color !== filtros.color) return false;

    if (filtros.texto) {
      const texto = filtros.texto.toLowerCase();
      const camposBusqueda = [
        pub.perro.nombre,
        pub.perro.raza,
        pub.perro.color,
        pub.perro.descripcion,
        pub.perro.caracteristicasUnicas,
        pub.ubicacion.barrio,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!camposBusqueda.includes(texto)) return false;
    }

    return true;
  });
}

export function parseFiltrosFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): FiltrosBusqueda {
  const get = (key: string): string | undefined => {
    const v = searchParams[key];
    return typeof v === "string" ? v : undefined;
  };

  return {
    estado: get("estado") as FiltrosBusqueda["estado"],
    tipo: get("tipo") as FiltrosBusqueda["tipo"],
    barrio: get("barrio"),
    raza: get("raza"),
    color: get("color"),
    tamano: get("tamano") as FiltrosBusqueda["tamano"],
    texto: get("texto"),
  };
}
