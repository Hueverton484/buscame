"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function PhotoGallery({
  fotos,
  alt,
}: {
  fotos: string[];
  alt: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (fotos.length === 0) return null;

  const openLightbox = (idx: number) => {
    setSelectedIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Galería principal */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="relative aspect-[4/3] w-full bg-stone-100 rounded-xl overflow-hidden group cursor-zoom-in"
          aria-label="Ver foto en grande"
        >
          <Image
            src={fotos[0]}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>

        {fotos.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {fotos.slice(1, 5).map((foto, i) => (
              <button
                type="button"
                key={foto}
                onClick={() => openLightbox(i + 1)}
                className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden group cursor-zoom-in"
                aria-label={`Ver foto ${i + 2}`}
              >
                <Image
                  src={foto}
                  alt={`${alt} - foto ${i + 2}`}
                  fill
                  sizes="200px"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          fotos={fotos}
          startIdx={selectedIdx}
          alt={alt}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

function Lightbox({
  fotos,
  startIdx,
  alt,
  onClose,
}: {
  fotos: string[];
  startIdx: number;
  alt: string;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);

  const next = useCallback(
    () => setIdx((i) => (i + 1) % fotos.length),
    [fotos.length]
  );
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + fotos.length) % fotos.length),
    [fotos.length]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, next, prev]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      {fotos.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-12 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            key={fotos[idx]}
            src={fotos[idx]}
            alt={`${alt} - ${idx + 1} de ${fotos.length}`}
            fill
            sizes="100vw"
            className="object-contain animate-fade-in"
          />
        </div>
      </div>

      {fotos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm px-3 py-1 rounded-full backdrop-blur">
          {idx + 1} / {fotos.length}
        </div>
      )}
    </div>
  );
}
