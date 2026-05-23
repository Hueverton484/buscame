import { PawPrint } from "lucide-react";

/**
 * Logo de Buscame — paw print en gradiente + wordmark Fraunces.
 * Usar size="md" (default) en headers, size="sm" para footer, size="lg" para auth pages.
 */
export function Logo({
  size = "md",
  href,
}: {
  size?: "sm" | "md" | "lg";
  href?: boolean;
}) {
  const config = {
    sm: { box: "h-8 w-8", icon: "h-4 w-4", text: "text-base" },
    md: { box: "h-9 w-9", icon: "h-5 w-5", text: "text-xl" },
    lg: { box: "h-14 w-14", icon: "h-7 w-7", text: "text-3xl" },
  }[size];

  return (
    <div className="flex items-center gap-2 group">
      <div
        className={`relative ${config.box} flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all`}
      >
        <PawPrint className={config.icon} strokeWidth={2.5} />
      </div>
      <span
        className={`font-display font-bold tracking-tight text-stone-900 ${config.text}`}
      >
        Buscame
      </span>
    </div>
  );
}
