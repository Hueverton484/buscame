"use client";

import { useActionState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { registrarse, type AuthResult } from "@/app/(auth)/actions";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

export function FormularioRegistro() {
  const [state, formAction, pending] = useActionState<
    AuthResult | null,
    FormData
  >(registrarse, null);

  if (state?.ok) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-stone-900 mb-1">¡Casi listo!</h2>
        <p className="text-sm text-stone-700">{state.mensaje}</p>
      </div>
    );
  }

  const err = state?.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-4 bg-white border border-stone-200 rounded-xl p-6">
      {state?.mensaje && !state.fieldErrors && (
        <ErrorBanner mensaje={state.mensaje} />
      )}

      <Campo label="Nombre" requerido error={err.nombre}>
        <input
          name="nombre"
          type="text"
          placeholder="Ej: María González"
          className={inputClass}
          required
        />
      </Campo>

      <Campo label="Email" requerido error={err.email}>
        <input
          name="email"
          type="email"
          placeholder="vos@email.com"
          className={inputClass}
          required
        />
      </Campo>

      <Campo
        label="Contraseña"
        requerido
        error={err.password}
        ayuda="Al menos 6 caracteres"
      >
        <input
          name="password"
          type="password"
          minLength={6}
          className={inputClass}
          required
        />
      </Campo>

      <Campo label="Teléfono / WhatsApp" opcional ayuda="Para que te contacten si alguien encuentra tu perro">
        <input
          name="telefono"
          type="tel"
          placeholder="+5491145678901"
          className={inputClass}
        />
      </Campo>

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
            <Loader2 className="h-5 w-5 animate-spin" /> Creando cuenta...
          </>
        ) : (
          "Crear cuenta"
        )}
      </button>
    </form>
  );
}

const inputClass =
  "w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-white";

function Campo({
  label,
  requerido,
  opcional,
  error,
  ayuda,
  children,
}: {
  label: string;
  requerido?: boolean;
  opcional?: boolean;
  error?: string;
  ayuda?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-1.5">
        {label}
        {requerido && <span className="text-red-500">*</span>}
        {opcional && <span className="text-xs font-normal text-stone-400">(opcional)</span>}
      </label>
      {children}
      {ayuda && !error && <p className="mt-1 text-xs text-stone-500">{ayuda}</p>}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

function ErrorBanner({ mensaje }: { mensaje: string }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 flex items-start gap-2">
      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
      <p className="text-sm">{mensaje}</p>
    </div>
  );
}
