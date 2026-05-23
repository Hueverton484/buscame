import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export function formatearFechaRelativa(fechaIso: string): string {
  try {
    return formatDistanceToNow(parseISO(fechaIso), {
      addSuffix: true,
      locale: es,
    });
  } catch {
    return fechaIso;
  }
}

export function formatearMoneda(valor: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function whatsappLink(telefono: string, mensaje: string): string {
  const tel = telefono.replace(/[^0-9]/g, "");
  return `https://wa.me/${tel}?text=${encodeURIComponent(mensaje)}`;
}
