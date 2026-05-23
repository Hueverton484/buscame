import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, PawPrint, ArrowRight } from "lucide-react";
import { getCurrentPerfil } from "@/lib/supabase/auth";

export const metadata = {
  title: "¡Bienvenido a Buscame!",
};

export default async function BienvenidoPage() {
  const perfil = await getCurrentPerfil();
  if (!perfil) redirect("/ingresar");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center shadow-sm">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle2 className="h-12 w-12" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
          ¡Bienvenido a Buscame, {perfil.nombre.split(" ")[0]}!
        </h1>

        <p className="text-stone-600 text-lg mb-8 max-w-md mx-auto">
          Tu email fue verificado correctamente. Ya estás listo para ayudar a reencontrar familias.
        </p>

        <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 text-left mb-8">
          <h2 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-brand-600" />
            ¿Qué podés hacer ahora?
          </h2>
          <ul className="space-y-2 text-sm text-stone-700">
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-0.5">•</span>
              <span><strong>Reportar un perro</strong> perdido o encontrado — tus reportes quedan asociados a tu cuenta</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-0.5">•</span>
              <span><strong>Gestionar tus publicaciones</strong> — editar, marcar como reunidas, ver pistas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-0.5">•</span>
              <span><strong>Dejar pistas</strong> en publicaciones de otros si viste algún perro</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/reportar"
            className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-base font-semibold px-6 py-3 rounded-lg shadow-sm transition-colors"
          >
            Reportar un perro <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/publicaciones"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-900 text-base font-semibold px-6 py-3 rounded-lg border border-stone-300 transition-colors"
          >
            Ver publicaciones
          </Link>
        </div>
      </div>
    </div>
  );
}
