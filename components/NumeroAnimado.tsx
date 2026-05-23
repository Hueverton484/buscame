"use client";

import { useEffect, useRef, useState } from "react";

export function NumeroAnimado({
  valor,
  duracion = 1200,
}: {
  valor: number;
  duracion?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const yaAnimado = useRef(false);

  useEffect(() => {
    if (yaAnimado.current) {
      setDisplay(valor);
      return;
    }
    yaAnimado.current = true;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duracion);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * valor));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [valor, duracion]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
