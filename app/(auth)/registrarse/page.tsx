import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/auth";
import { FormularioRegistro } from "@/components/FormularioRegistro";
import { PawPrint } from "lucide-react";

export const metadata = {
  title: "Crear cuenta · Buscame",
};

export default async function RegistrarsePage() {
  const user = await getCurrentUser();
  if (user) redirect("/mis-publicaciones");

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <header className="text-center mb-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-md mb-4">
          <PawPrint className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold text-stone-900">Crear cuenta</h1>
        <p className="mt-2 text-stone-600">
          Para gestionar tus publicaciones y recibir avisos
        </p>
      </header>

      <FormularioRegistro />

      <p className="mt-6 text-center text-sm text-stone-600">
        ¿Ya tenés cuenta?{" "}
        <Link href="/ingresar" className="font-semibold text-brand-600 hover:text-brand-700">
          Ingresá acá
        </Link>
      </p>
    </div>
  );
}
