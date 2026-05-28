import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock, LogIn, UserPlus } from "lucide-react";
import { FormularioReporte } from "@/components/FormularioReporte";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageHero } from "@/components/PageHero";
import { getCurrentUser } from "@/lib/supabase/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Reportar un perro",
  description: "Reportá un perro perdido o encontrado en Buenos Aires",
};

const LIMITE_DIARIO = 3;

export default async function ReportarPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <PantallaLoginRequerido />;
  }

  // Chequear cuántas publicaciones creó en las últimas 24h
  const supabase = await createSupabaseServerClient();
  const desde = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("publicaciones")
    .select("id", { count: "exact", head: true })
    .eq("usuario_id", user.id)
    .gte("fecha_publicacion", desde);

  const usados = count ?? 0;
  if (usados >= LIMITE_DIARIO) {
    return <PantallaLimiteAlcanzado limite={LIMITE_DIARIO} />;
  }

  return (
    <>
      <ScrollProgress />
      <PageHero
        title="Reportar un perro"
        subtitle="Completá los datos para publicar el reporte. Mientras más información des, más fácil será reencontrar al perro."
        badge="🐾 Nuevo reporte"
      >
        {usados > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md">
            Te quedan {LIMITE_DIARIO - usados} de {LIMITE_DIARIO} publicaciones hoy
          </span>
        )}
      </PageHero>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        <FormularioReporte />
      </div>
    </>
  );
}

function PantallaLoginRequerido() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-4">
          <Lock className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">
          Necesitás una cuenta
        </h1>
        <p className="text-stone-600 mb-6">
          Para reportar perros pedimos que tengas cuenta. Sirve para mantener la comunidad libre de reportes falsos y para que puedas gestionar tus publicaciones después.
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href="/ingresar?next=/reportar"
            className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-base font-semibold py-3 rounded-lg shadow-sm transition-colors"
          >
            <LogIn className="h-4 w-4" /> Ya tengo cuenta
          </Link>
          <Link
            href="/registrarse"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-900 text-base font-semibold py-3 rounded-lg border border-stone-300 transition-colors"
          >
            <UserPlus className="h-4 w-4" /> Crear cuenta gratis
          </Link>
        </div>
        <p className="mt-4 text-xs text-stone-500">
          Tarda 1 minuto. Solo necesitás un email.
        </p>
      </div>
    </div>
  );
}

function PantallaLimiteAlcanzado({ limite }: { limite: number }) {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4">
          <Lock className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">
          Llegaste al límite diario
        </h1>
        <p className="text-stone-600 mb-6">
          Cada usuario puede crear hasta <strong>{limite} publicaciones por día</strong>.
          Esto evita abusos y mantiene la calidad de los reportes. Vas a poder volver a publicar mañana.
        </p>
        <Link
          href="/mis-publicaciones"
          className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-900 text-base font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Ver mis publicaciones
        </Link>
      </div>
    </div>
  );
}
