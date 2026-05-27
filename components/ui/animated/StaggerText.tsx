"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Word {
  text: string;
  highlight?: boolean;
  className?: string;
}

interface Props {
  /** Pasá un string (se splittea por espacios) o un array de Word para control fino */
  words: string | Word[];
  highlightClassName?: string;
  delay?: number;
  step?: number;
  duration?: number;
  blur?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Renderiza algo después del último word (ej. punto, ícono) */
  after?: ReactNode;
}

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

/**
 * Título que aparece palabra-por-palabra, con blur opcional y posibilidad
 * de resaltar palabras puntuales con un gradient/color.
 */
export function StaggerText({
  words,
  highlightClassName = "bg-gradient-to-r from-brand-400 via-amber-300 to-brand-400 bg-clip-text text-transparent bg-[length:200%_auto] [animation:shimmerGradient_4s_linear_infinite]",
  delay = 0.2,
  step = 0.08,
  duration = 0.85,
  blur = true,
  className = "",
  as = "h1",
  after,
}: Props) {
  const arr: Word[] =
    typeof words === "string"
      ? words.split(" ").map((w) => ({ text: w }))
      : words;

  const Tag = TAGS[as];

  return (
    <Tag className={className}>
      {arr.map((w, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            y: 40,
            ...(blur ? { filter: "blur(10px)" } : {}),
          }}
          animate={{
            opacity: 1,
            y: 0,
            ...(blur ? { filter: "blur(0px)" } : {}),
          }}
          transition={{
            delay: delay + i * step,
            duration,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {w.highlight ? (
            <span className={w.className || highlightClassName}>{w.text}</span>
          ) : (
            w.text
          )}
        </motion.span>
      ))}
      {after}
    </Tag>
  );
}
