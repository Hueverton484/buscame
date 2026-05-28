import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/supabase/auth";
import { getPublicaciones } from "@/lib/supabase/queries";
import { PublicacionCard } from "@/components/PublicacionCard";
import { PageHero } from "@/components/PageHero";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { IlustracionVacio } from "@/components/Ilustraciones";

export const metadata = {
  title: "Mis publicaciones",
};

export default async function MisPublicacionesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/ingresar");

  // Traer solo las publicaciones de este usuario
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("publicaciones")
    .select("id")
    .eq("usuario_id", user.id);

  const ids = (data ?? []).map((d) => d.id);
  const todas = await getPublicaciones();
  const misPublicaciones = todas.filter((p) => ids.includes(p.id));

  return (
    <>
      <PageHero
        title="Mis publicaciones"
        subtitle={`${misPublicaciones.length} ${misPublicaciones.length === 1 ? "publicación creada" : "publicaciones creadas"}`}
        badge="Mi cuenta"
      >
        <Link
          href="/reportar"
          className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-sm font-semibold px-5 py-2.5 rounded-lg border border-white/30 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nueva publicación
        </Link>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        {misPublicaciones.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white border border-stone-200 rounded-2xl p-12 text-center">
            <IlustracionVacio className="h-40 w-40 mb-3" />
            <h2 className="font-display text-2xl font-semibold text-stone-900 mb-2 tracking-tight">
              Todavía no publicaste nada
            </h2>
            <p className="text-stone-600 max-w-sm mb-5 leading-relaxed">
              Reportá un perro perdido o encontrado y aparecerá acá para que lo gestiones.
            </p>
            <Link
              href="/reportar"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              <Plus className="h-4 w-4" /> Crear primera publicación
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {misPublicaciones.map((publicacion) => (
              <PublicacionCard key={publicacion.id} publicacion={publicacion} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
