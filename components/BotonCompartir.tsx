"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Share2, Copy, Check, MessageCircle, X } from "lucide-react";

interface BotonCompartirProps {
  publicacionId: string;
  nombre: string;
  tipo: "perdido" | "encontrado";
  barrio: string;
}

export function BotonCompartir({
  publicacionId,
  nombre,
  tipo,
  barrio,
}: BotonCompartirProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined"
    ? `${window.location.origin}/publicaciones/${publicacionId}`
    : "";

  const mensajeWhatsapp =
    tipo === "perdido"
      ? `🆘 ¿Viste a ${nombre}? Se perdió en ${barrio}. Mirá su info y ayudanos a encontrarlo: ${url}`
      : `🟢 Encontré un perro en ${barrio}. ¿Es tuyo o lo conocés? ${url}`;

  const compartirNativo = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${nombre} - Buscame`,
          text: mensajeWhatsapp,
          url,
        });
      } catch (err) {
        // Cancelado por usuario o no soportado, no hacemos nada
        if ((err as Error).name !== "AbortError") {
          setOpen(true);
        }
      }
    } else {
      setOpen(true);
    }
  };

  const copiarLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={compartirNativo}
        className="group inline-flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-700 text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
      >
        <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
        Compartir
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h2 className="text-lg font-bold text-stone-900">
                Compartir publicación
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(mensajeWhatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-stone-50 transition-colors text-left"
                onClick={() => setOpen(false)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 flex-shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">WhatsApp</p>
                  <p className="text-xs text-stone-500">
                    Compartilo en chats y estados
                  </p>
                </div>
              </a>

              <button
                type="button"
                onClick={copiarLink}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-stone-50 transition-colors text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-semibold text-stone-900">
                    {copied ? "¡Copiado!" : "Copiar link"}
                  </p>
                  <p className="text-xs text-stone-500">
                    Para pegarlo donde quieras
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
