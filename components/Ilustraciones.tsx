/**
 * Ilustraciones SVG inline para empty states.
 * Sin dependencias externas, usan los colores de la marca via `currentColor`.
 */

export function IlustracionBuscar({ className = "h-32 w-32" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fondo circular suave */}
      <circle cx="100" cy="100" r="90" fill="#fff7ed" />

      {/* Huellas de fondo */}
      <g opacity="0.3" fill="#fb923c">
        <ellipse cx="40" cy="50" rx="3" ry="4" />
        <ellipse cx="48" cy="48" rx="3" ry="4" />
        <ellipse cx="44" cy="60" rx="4" ry="5" />
        <ellipse cx="160" cy="155" rx="3" ry="4" />
        <ellipse cx="168" cy="153" rx="3" ry="4" />
        <ellipse cx="164" cy="165" rx="4" ry="5" />
      </g>

      {/* Lupa */}
      <circle cx="85" cy="95" r="38" fill="white" stroke="#1c1917" strokeWidth="4" />
      <line x1="115" y1="125" x2="148" y2="158" stroke="#1c1917" strokeWidth="8" strokeLinecap="round" />

      {/* Perro adentro de la lupa */}
      <g transform="translate(60 75)">
        {/* Cara */}
        <ellipse cx="25" cy="22" rx="22" ry="18" fill="#fb923c" />
        {/* Orejas */}
        <ellipse cx="8" cy="10" rx="6" ry="10" fill="#ea580c" transform="rotate(-20 8 10)" />
        <ellipse cx="42" cy="10" rx="6" ry="10" fill="#ea580c" transform="rotate(20 42 10)" />
        {/* Ojos */}
        <circle cx="17" cy="20" r="2.5" fill="#1c1917" />
        <circle cx="33" cy="20" r="2.5" fill="#1c1917" />
        {/* Nariz */}
        <ellipse cx="25" cy="28" rx="3" ry="2" fill="#1c1917" />
        {/* Sonrisita */}
        <path d="M22 32 Q 25 35 28 32" stroke="#1c1917" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Signo de interrogación rebotando */}
      <text
        x="155"
        y="60"
        fontSize="32"
        fontWeight="bold"
        fill="#fb923c"
        fontFamily="ui-serif, Georgia, serif"
      >
        ?
      </text>
    </svg>
  );
}

export function IlustracionVacio({ className = "h-32 w-32" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="90" fill="#fff7ed" />

      {/* Casita/hogar */}
      <g transform="translate(60 70)">
        {/* Techo */}
        <path d="M 0 35 L 40 0 L 80 35 Z" fill="#ea580c" />
        {/* Pared */}
        <rect x="8" y="35" width="64" height="45" fill="#fb923c" />
        {/* Puerta */}
        <rect x="32" y="55" width="16" height="25" fill="#7c2d12" rx="2" />
        <circle cx="44" cy="68" r="1.5" fill="#fde68a" />
        {/* Ventanas */}
        <rect x="14" y="44" width="12" height="10" fill="#fde68a" rx="1" />
        <rect x="54" y="44" width="12" height="10" fill="#fde68a" rx="1" />
      </g>

      {/* Pawprint flotante (esperando llenar la casa) */}
      <g opacity="0.6" fill="#fb923c">
        <ellipse cx="130" cy="55" rx="4" ry="5" />
        <ellipse cx="138" cy="53" rx="4" ry="5" />
        <ellipse cx="146" cy="55" rx="4" ry="5" />
        <ellipse cx="138" cy="65" rx="6" ry="6" />
      </g>

      {/* Pasto */}
      <rect x="10" y="155" width="180" height="3" fill="#86efac" rx="1.5" />
      <g fill="#86efac">
        <path d="M 30 155 L 32 148 L 34 155 Z" />
        <path d="M 60 155 L 63 145 L 66 155 Z" />
        <path d="M 90 155 L 92 149 L 94 155 Z" />
        <path d="M 120 155 L 123 146 L 126 155 Z" />
        <path d="M 155 155 L 158 148 L 161 155 Z" />
      </g>
    </svg>
  );
}

export function IlustracionPistas({ className = "h-24 w-24" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Camino punteado */}
      <g opacity="0.5">
        <circle cx="40" cy="160" r="3" fill="#a8a29e" />
        <circle cx="60" cy="140" r="3" fill="#a8a29e" />
        <circle cx="80" cy="120" r="3" fill="#a8a29e" />
        <circle cx="100" cy="100" r="3" fill="#a8a29e" />
        <circle cx="120" cy="80" r="3" fill="#a8a29e" />
        <circle cx="140" cy="60" r="3" fill="#a8a29e" />
        <circle cx="160" cy="40" r="3" fill="#a8a29e" />
      </g>

      {/* Pawprints siguiendo el camino */}
      <g fill="#fb923c">
        <g transform="translate(40 150)">
          <ellipse cx="0" cy="0" rx="2" ry="3" />
          <ellipse cx="5" cy="-1" rx="2" ry="3" />
          <ellipse cx="2.5" cy="6" rx="3" ry="3.5" />
        </g>
        <g transform="translate(85 110)" opacity="0.7">
          <ellipse cx="0" cy="0" rx="2" ry="3" />
          <ellipse cx="5" cy="-1" rx="2" ry="3" />
          <ellipse cx="2.5" cy="6" rx="3" ry="3.5" />
        </g>
        <g transform="translate(130 70)" opacity="0.5">
          <ellipse cx="0" cy="0" rx="2" ry="3" />
          <ellipse cx="5" cy="-1" rx="2" ry="3" />
          <ellipse cx="2.5" cy="6" rx="3" ry="3.5" />
        </g>
      </g>

      {/* Lupa al final del camino */}
      <circle cx="160" cy="40" r="20" fill="white" stroke="#1c1917" strokeWidth="3" />
      <line x1="175" y1="55" x2="188" y2="68" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" />
      <text x="155" y="46" fontSize="18" fill="#fb923c" fontWeight="bold" fontFamily="ui-serif, Georgia, serif">?</text>
    </svg>
  );
}
