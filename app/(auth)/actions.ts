"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export type AuthResult = {
  ok: boolean;
  mensaje?: string;
  fieldErrors?: Record<string, string>;
};

// =============================================
// REGISTRO
// =============================================

export async function registrarse(
  _prev: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString() ?? "";
  const nombre = formData.get("nombre")?.toString().trim();
  const telefono = formData.get("telefono")?.toString().trim() || null;
  const captchaToken = formData.get("cf-turnstile-response")?.toString();

  const errors: Record<string, string> = {};
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    errors.email = "Email inválido";
  if (password.length < 6)
    errors.password = "La contraseña tiene que tener al menos 6 caracteres";
  if (!nombre) errors.nombre = "Ingresá tu nombre";
  if (!captchaToken)
    errors.captcha = "Completá la verificación anti-bot";

  if (Object.keys(errors).length > 0) {
    return { ok: false, fieldErrors: errors };
  }

  const supabase = await createSupabaseServerClient();
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  const { error } = await supabase.auth.signUp({
    email: email!,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      captchaToken,
      data: {
        nombre,
        telefono,
      },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return {
        ok: false,
        fieldErrors: { email: "Ya hay una cuenta con este email" },
      };
    }
    return { ok: false, mensaje: error.message };
  }

  return {
    ok: true,
    mensaje:
      "¡Listo! Te mandamos un email para confirmar tu cuenta. Revisá tu inbox (y la carpeta de spam).",
  };
}

// =============================================
// LOGIN
// =============================================

export async function ingresar(
  _prev: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString() ?? "";
  const captchaToken = formData.get("cf-turnstile-response")?.toString();

  const errors: Record<string, string> = {};
  if (!email) errors.email = "Ingresá tu email";
  if (!password) errors.password = "Ingresá tu contraseña";
  if (!captchaToken) errors.captcha = "Completá la verificación anti-bot";

  if (Object.keys(errors).length > 0) {
    return { ok: false, fieldErrors: errors };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email!,
    password,
    options: {
      captchaToken,
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      return {
        ok: false,
        mensaje:
          "Tu email todavía no fue confirmado. Revisá tu bandeja de entrada.",
      };
    }
    if (error.message.toLowerCase().includes("invalid login")) {
      return {
        ok: false,
        mensaje: "Email o contraseña incorrectos",
      };
    }
    return { ok: false, mensaje: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/mis-publicaciones");
}

// =============================================
// LOGOUT
// =============================================

export async function cerrarSesion() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
