"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { Flag, X, Loader2, AlertTriangle } from "lucide-react";
import {
  reportarPublicacion,
  type FlagResult,
} from "@/app/publicaciones/[id]/actions";

const MOTIVOS = [
  { value: "falso", label: "Publicación falsa o inventada" },
  { value: "inapropiado", label: "Contenido inapropiado" },
  { value: "spam", label: "Spam o publicidad" },
  { value: "duplicado", label: "Duplicado de otra publicación" },
  { value: "otro", label: "Otro motivo" },
];

export function BotonReportar({
  publicacionId,
  logueado,
}: {
  publicacionId: string;
  logueado: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<
    FlagResult | null,
    FormData
  >(reportarPublicacion, null);

  useEffect(() => {
    if (state?.ok) {
      toast.success("Reporte enviado", {
        description: state.mensaje,
      });
      setOpen(false);
    } else if (state?.mensaje && !state.ok) {
      toast.error(state.mensaje);
    }
  }, [state]);

  if (!logueado) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-red-600 transition-colors"
      >
        <Flag className="h-3.5 w-3.5" />
        Reportar publicación
      </button>

      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !pending) setOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="bg-white rounded-2xl max-w-md w-full shadow-xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-bold text-stone-900">
                  Reportar publicación
                </h2>
              </div>
              <button
                type="button"
                onClick={() => !pending && setOpen(false)}
                className="text-stone-400 hover:text-stone-600"
                disabled={pending}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              <form action={formAction} className="space-y-4">
                  <input
                    type="hidden"
                    name="publicacion_id"
                    value={publicacionId}
                  />

                  <p className="text-sm text-stone-600">
                    Si esta publicación es falsa, inapropiada o duplica otra, contanos. Si varios usuarios la reportan, se oculta automáticamente.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Motivo <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="motivo"
                      required
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Elegí un motivo...</option>
                      {MOTIVOS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Comentario <span className="text-xs font-normal text-stone-400">(opcional)</span>
                    </label>
                    <textarea
                      name="comentario"
                      rows={3}
                      placeholder="¿Por qué? Cualquier detalle que ayude a evaluar..."
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-white"
                    />
                  </div>

                  {state?.mensaje && !state.ok && (
                    <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg p-3">
                      {state.mensaje}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      disabled={pending}
                      className="flex-1 px-4 py-2.5 text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={pending}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-stone-400 rounded-lg transition-colors"
                    >
                      {pending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar reporte"
                      )}
                    </button>
                  </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
