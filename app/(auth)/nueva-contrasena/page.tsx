import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/auth";
import { FormularioNuevaContrasena } from "@/components/FormularioNuevaContrasena";
import { KeyRound } from "lucide-react";

export const metadata = {
  title: "Nueva contraseña",
};

export default async function NuevaContrasenaPage() {
  // El usuario debería estar logueado acá (Supabase crea la sesión al verificar el link)
  const user = await getCurrentUser();
  if (!user) {
    // El link puede haber expirado o ser inválido
    redirect("/recuperar?error=link_invalido");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <header className="text-center mb-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white shadow-md mb-4">
          <KeyRound className="h-7 w-7" />
        </div>
        <h1 className="font-display text-4xl font-semibold text-stone-900 tracking-tight">
          Nueva contraseña
        </h1>
        <p className="mt-2 text-stone-600">
          Ingresá tu nueva contraseña para <strong>{user.email}</strong>
        </p>
      </header>

      <FormularioNuevaContrasena />

      <p className="mt-6 text-center text-sm text-stone-500">
        <Link href="/ingresar" className="hover:text-stone-700">
          Cancelar
        </Link>
      </p>
    </div>
  );
}
