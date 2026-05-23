/**
 * Loader visual de 4 pawprints caminando.
 * Reemplaza el spinner genérico para mantener identidad de marca.
 */
export function PawLoader({
  texto = "Cargando...",
  altura = "200px",
}: {
  texto?: string;
  altura?: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 text-stone-500"
      style={{ minHeight: altura }}
    >
      <div className="paw-walk flex items-end gap-1.5">
        <Paw delay={0} rotation={-15} />
        <Paw delay={0.2} rotation={15} />
        <Paw delay={0.4} rotation={-15} />
        <Paw delay={0.6} rotation={15} />
      </div>
      {texto && <span className="text-sm font-medium animate-pulse">{texto}</span>}
    </div>
  );
}

function Paw({ delay, rotation }: { delay: number; rotation: number }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="#fb923c"
      style={{ transform: `rotate(${rotation}deg)`, animationDelay: `${delay}s` }}
    >
      <ellipse cx="7" cy="8" rx="2" ry="2.5" />
      <ellipse cx="12" cy="6.5" rx="2" ry="2.5" />
      <ellipse cx="17" cy="8" rx="2" ry="2.5" />
      <ellipse cx="5" cy="13" rx="1.5" ry="2" />
      <path d="M12 11 c-3 0-5 2.5-5.5 5 -0.5 1.5 1 2.5 2.5 2.5h6 c1.5 0 3-1 2.5-2.5 -0.5-2.5-2.5-5-5.5-5z" />
    </svg>
  );
}
