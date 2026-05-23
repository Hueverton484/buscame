import { ESTADO_LABELS } from "@/lib/constants";
import type { EstadoPublicacion } from "@/lib/types";

export function EstadoBadge({ estado }: { estado: EstadoPublicacion }) {
  const config = ESTADO_LABELS[estado];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}
    >
      <span>{config.emoji}</span>
      <span>{config.texto}</span>
    </span>
  );
}
