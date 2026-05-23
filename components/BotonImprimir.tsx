"use client";

import { Printer } from "lucide-react";

export function BotonImprimir() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
    >
      <Printer className="h-4 w-4" />
      Imprimir poster
    </button>
  );
}
