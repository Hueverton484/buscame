"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "light";
type Size = "sm" | "md" | "lg";

interface Props {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  shine?: boolean;
  pull?: number;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  prefetch?: boolean;
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/30",
  secondary:
    "bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 shadow-sm",
  ghost:
    "bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20",
  dark: "bg-stone-900 hover:bg-stone-800 text-white shadow-lg",
  light:
    "bg-white hover:bg-stone-100 text-stone-900 shadow-xl shadow-stone-900/10",
};

/**
 * Botón con efecto magnético (sigue al mouse), opcional shine animado.
 * Funciona como <Link> si se pasa href, o como <button> con onClick.
 */
export function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  shine = false,
  pull = 0.35,
  className = "",
  type = "button",
  disabled,
  prefetch,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  function onMouseMove(e: React.MouseEvent) {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * pull);
    y.set((e.clientY - rect.top - rect.height / 2) * pull);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const base = `group relative inline-flex items-center justify-center gap-2 font-semibold rounded-full overflow-hidden transition-colors ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${
    disabled ? "opacity-60 cursor-not-allowed" : ""
  } ${className}`;

  const inner = (
    <>
      {shine && <Shine />}
      <span className="relative flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.div style={{ x: sx, y: sy }} className="inline-block">
        <Link
          ref={ref}
          href={href}
          prefetch={prefetch}
          onMouseMove={onMouseMove}
          onMouseLeave={reset}
          className={base}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        disabled={disabled}
        className={base}
      >
        {inner}
      </button>
    </motion.div>
  );
}

function Shine() {
  return (
    <motion.span
      animate={{ x: ["-100%", "200%"] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 1.2,
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3 pointer-events-none"
      aria-hidden="true"
    />
  );
}
