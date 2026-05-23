"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, AlertCircle } from "lucide-react";
import { ingresar, type AuthResult } from "@/app/(auth)/actions";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

export function FormularioLogin({
  mensajeError,
}: {
  mensajeError?: string | null;
}) {
  const [state, formAction, pending] = useActionState<
    AuthResult | null,
    FormData
  >(ingresar, null);

  const err = state?.fieldErrors ?? {};
  const error = state?.mensaje ?? mensajeError;

  return (
    <form action={formAction} className="space-y-4 bg-white border border-stone-200 rounded-xl p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="vos@email.com"
          className={inputClass}
          required
        />
        {err.email && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" /> {err.email}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-stone-700">
            Contraseña
          </label>
          <Link
            href="/recuperar"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            ¿La olvidaste?
          </Link>
        </div>
        <input
          name="password"
          type="password"
          className={inputClass}
          required
        />
        {err.password && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" /> {err.password}
          </p>
        )}
      </div>

      <div className="flex justify-center pt-2">
        <Turnstile siteKey={TURNSTILE_SITE_KEY} options={{ theme: "light", size: "flexible" }} />
      </div>
      {err.captcha && (
        <p className="flex items-center gap-1 text-xs text-red-600 justify-center">
          <AlertCircle className="h-3.5 w-3.5" /> {err.captcha}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 w-full bg-brand-500 hover:bg-brand-600 disabled:bg-stone-400 text-white text-base font-semibold py-3 rounded-lg shadow-sm transition-colors"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Ingresando...
          </>
        ) : (
          "Ingresar"
        )}
      </button>
    </form>
  );
}

const inputClass =
  "w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-white";
