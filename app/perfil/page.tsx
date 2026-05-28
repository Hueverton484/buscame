import { redirect } from "next/navigation";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { getCurrentUser, getCurrentPerfil } from "@/lib/supabase/auth";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Mi perfil",
};

export default async function PerfilPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/ingresar");

  const perfil = await getCurrentPerfil();
  if (!perfil) redirect("/ingresar");

  return (
    <>
      <PageHero
        title="Mi perfil"
        subtitle="Datos asociados a tu cuenta"
        badge="Tu cuenta"
      />

      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-center gap-4 pb-6 border-b border-stone-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white text-2xl font-bold">
              {perfil.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900">{perfil.nombre}</h2>
              <p className="text-sm text-stone-600">{user.email}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-4">
            <Dato icono={<User className="h-4 w-4" />} label="Nombre" valor={perfil.nombre} />
            <Dato icono={<Mail className="h-4 w-4" />} label="Email" valor={user.email ?? ""} />
            <Dato
              icono={<Phone className="h-4 w-4" />}
              label="Teléfono"
              valor={perfil.telefono ?? "No cargado"}
            />
            <Dato
              icono={<Calendar className="h-4 w-4" />}
              label="Cuenta creada"
              valor={new Date(perfil.fecha_registro).toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          </dl>

          <p className="mt-6 pt-6 border-t border-stone-100 text-xs text-stone-500">
            La edición del perfil estará disponible próximamente. Por ahora, contactanos si necesitás cambiar algo.
          </p>
        </div>
      </div>
    </>
  );
}

function Dato({
  icono,
  label,
  valor,
}: {
  icono: React.ReactNode;
  label: string;
  valor: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
        {icono}
      </div>
      <div className="flex-1">
        <dt className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {label}
        </dt>
        <dd className="text-sm text-stone-900 mt-0.5">{valor}</dd>
      </div>
    </div>
  );
}
