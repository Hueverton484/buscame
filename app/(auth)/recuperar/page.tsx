import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/auth";
import { FormularioRecuperar } from "@/components/FormularioRecuperar";
import { KeyRound } from "lucide-react";

export const metadata = {
  title: "Recuperar contraseña",
};

export default async function RecuperarPage() {
  const user = await getCurrentUser();
  if (user) redirect("/mis-publicaciones");

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <header className="text-center mb-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-md mb-4">
          <KeyRound className="h-7 w-7" />
        </div>
        <h1 className="font-display text-4xl font-semibold text-stone-900 tracking-tight">
          Recuperar contraseña
        </h1>
        <p className="mt-2 text-stone-600">
          Ingresá tu email y te mandamos un link para resetearla
        </p>
      </header>

      <FormularioRecuperar />

      <p className="mt-6 text-center text-sm text-stone-600">
        ¿La recordaste?{" "}
        <Link href="/ingresar" className="font-semibold text-brand-600 hover:text-brand-700">
          Volvé a ingresar
        </Link>
      </p>
    </div>
  );
}
