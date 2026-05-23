import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/auth";
import { FormularioLogin } from "@/components/FormularioLogin";
import { PawPrint } from "lucide-react";

export const metadata = {
  title: "Ingresar",
};

export default async function IngresarPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/mis-publicaciones");

  const { error } = await searchParams;
  const mensajeError =
    error === "verificacion_fallida"
      ? "No pudimos verificar tu email. El link puede haber expirado — intentá registrarte de nuevo."
      : null;

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <header className="text-center mb-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-md mb-4">
          <PawPrint className="h-7 w-7" />
        </div>
        <h1 className="font-display text-4xl font-semibold text-stone-900 tracking-tight">Ingresar</h1>
        <p className="mt-2 text-stone-600">Bienvenido de nuevo a Buscame</p>
      </header>

      <FormularioLogin mensajeError={mensajeError} />

      <p className="mt-6 text-center text-sm text-stone-600">
        ¿Todavía no tenés cuenta?{" "}
        <Link href="/registrarse" className="font-semibold text-brand-600 hover:text-brand-700">
          Creá una acá
        </Link>
      </p>
    </div>
  );
}
