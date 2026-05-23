"use client";

import { useActionState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { actualizarContrasena, type AuthResult } from "@/app/(auth)/actions";

export function FormularioNuevaContrasena() {
  const [state, formAction, pending] = useActionState<
    AuthResult | null,
    FormData
  >(actualizarContrasena, null);

  const err = state?.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-4 bg-white border border-stone-200 rounded-xl p-6">
      {state?.mensaje && !state.fieldErrors && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{state.mensaje}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Nueva contraseña <span className="text-red-500">*</span>
        </label>
        <input
          name="password"
          type="password"
          minLength={6}
          required
          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
        />
        {err.password && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" /> {err.password}
          </p>
        )}
        <p className="mt-1 text-xs text-stone-500">Al menos 6 caracteres</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Confirmar contraseña <span className="text-red-500">*</span>
        </label>
        <input
          name="confirmar"
          type="password"
          minLength={6}
          required
          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
        />
        {err.confirmar && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" /> {err.confirmar}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 w-full bg-brand-500 hover:bg-brand-600 disabled:bg-stone-400 text-white text-base font-semibold py-3 rounded-lg shadow-sm transition-colors"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Guardando...
          </>
        ) : (
          "Guardar nueva contraseña"
        )}
      </button>
    </form>
  );
}
