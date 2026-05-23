export type EstadoPublicacion = "perdido" | "avistado" | "reunido";

export type TipoReporte = "perdido" | "encontrado";

export type TamanoPerro = "pequeno" | "mediano" | "grande";

export type SexoPerro = "macho" | "hembra" | "desconocido";

export interface Ubicacion {
  lat: number;
  lng: number;
  barrio: string;
  direccionAproximada?: string;
}

export interface Perro {
  nombre?: string;
  raza: string;
  color: string;
  tamano: TamanoPerro;
  sexo: SexoPerro;
  edadAproximada?: string;
  descripcion: string;
  caracteristicasUnicas?: string;
}

export interface Contacto {
  nombre: string;
  telefono?: string;
  email?: string;
  preferenciaContacto: "whatsapp" | "telefono" | "email";
}

export interface Pista {
  id: string;
  publicacionId: string;
  autorNombre: string;
  mensaje: string;
  fecha: string;
  ubicacionAvistamiento?: Ubicacion;
}

export interface Publicacion {
  id: string;
  tipo: TipoReporte;
  estado: EstadoPublicacion;
  perro: Perro;
  ubicacion: Ubicacion;
  fechaEvento: string;
  fechaPublicacion: string;
  fotos: string[];
  contacto: Contacto;
  recompensa?: number;
  pistas: Pista[];
  usuarioId?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  fechaRegistro: string;
}

export interface FiltrosBusqueda {
  estado?: EstadoPublicacion;
  tipo?: TipoReporte;
  barrio?: string;
  raza?: string;
  color?: string;
  tamano?: TamanoPerro;
  fechaDesde?: string;
  fechaHasta?: string;
  texto?: string;
}
