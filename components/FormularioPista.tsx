"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquarePlus, X, Loader2, AlertCircle, MapPin } from "lucide-react";
import { dejarPista, type PistaResult } from "@/app/publicaciones/[id]/actions";
import { BARRIOS_CABA } from "@/lib/constants";

export function FormularioPista({
  publicacionId,
  logueado,
  nombrePerro,
}: {
  publicacionId: string;
  logueado: boolean;
  nombrePerro: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<
    PistaResult | null,
    FormData
  >(dejarPista, null);

  useEffect(() => {
    if (state?.ok) {
      toast.success(state.mensaje ?? "¡Pista enviada!");
      setOpen(false);
    } else if (state?.mensaje && !state.ok) {
      toast.error(state.mensaje);
    }
  }, [state]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center justify-center gap-2 w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        <MessageSquarePlus className="h-4 w-4 group-hover:scale-110 transition-transform" />
        Dejar una pista
      </button>

      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && !pending && setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-stone-100 sticky top-0 bg-white">
              <h2 className="font-display text-2xl font-semibold text-stone-900 tracking-tight">
                Dejar una pista
              </h2>
              <button
                type="button"
                onClick={() => !pending && setOpen(false)}
                disabled={pending}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form action={formAction} className="p-5 space-y-4">
              <input type="hidden" name="publicacion_id" value={publicacionId} />

              <p className="text-sm text-stone-600 leading-relaxed">
                Si viste a <strong>{nombrePerro}</strong> o tenés información que pueda ayudar a encontrarlo, dejala acá. El dueño la va a poder ver.
              </p>

              {!logueado && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Tu nombre <span className="text-xs font-normal text-stone-400">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    name="autor_nombre"
                    autoComplete="name"
                    placeholder="Vecino anónimo"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Qué viste <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="mensaje"
                  rows={4}
                  required
                  minLength={10}
                  placeholder="Lo vi corriendo cerca de Plaza Italia esta mañana, parecía asustado..."
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                />
                {state?.fieldErrors?.mensaje && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3 w-3" /> {state.fieldErrors.mensaje}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-stone-700 mb-1.5">
                  <MapPin className="h-3.5 w-3.5 text-brand-500" />
                  Dónde lo viste <span className="text-xs font-normal text-stone-400">(opcional)</span>
                </label>
                <select
                  name="ubicacion_barrio"
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">No sé / no estoy seguro</option>
                  {BARRIOS_CABA.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={pending}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 disabled:bg-stone-400 rounded-xl transition-colors"
                >
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
                    </>
                  ) : (
                    "Enviar pista"
                  )}
                </button>
              </div>

              <p className="text-xs text-stone-500 text-center leading-snug pt-1">
                Las pistas son públicas. Cualquier persona viendo esta publicación las puede ver.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
