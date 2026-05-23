import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, FolderHeart } from "lucide-react";
import { getCurrentUser } from "@/lib/supabase/auth";
import { getPublicaciones } from "@/lib/supabase/queries";
import { PublicacionCard } from "@/components/PublicacionCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Mis publicaciones · Buscame",
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <header className="flex items-end justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Mis publicaciones</h1>
          <p className="mt-1 text-stone-600">
            <span className="font-semibold text-stone-900">{misPublicaciones.length}</span>{" "}
            {misPublicaciones.length === 1 ? "publicación creada" : "publicaciones creadas"}
          </p>
        </div>
        <Link
          href="/reportar"
          className="group inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all"
        >
          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" /> Nueva publicación
        </Link>
      </header>

      {misPublicaciones.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white border border-stone-200 rounded-xl p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-4">
            <FolderHeart className="h-7 w-7" />
          </div>
          <h2 className="text-lg font-semibold text-stone-900 mb-1">
            Todavía no publicaste nada
          </h2>
          <p className="text-sm text-stone-600 max-w-sm mb-5">
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
          {misPublicaciones.map((pub) => (
            <PublicacionCard key={pub.id} publicacion={pub} />
          ))}
        </div>
      )}
    </div>
  );
}
