"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

interface Props {
  children: ReactNode;
  direction?: "left" | "right";
  duration?: number;
  pauseOnHover?: boolean;
  fade?: boolean;
  fadeColor?: string;
  className?: string;
  gap?: string;
}

/**
 * Marquee infinito horizontal. Duplica los hijos internamente
 * para conseguir un loop seamless.
 */
export function Marquee({
  children,
  direction = "left",
  duration = 50,
  pauseOnHover = false,
  fade = true,
  fadeColor = "from-stone-50",
  className = "",
  gap = "1.25rem",
}: Props) {
  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      style={{ "--marquee-gap": gap } as React.CSSProperties}
    >
      {fade && (
        <>
          <div
            className={`absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r ${fadeColor} to-transparent pointer-events-none`}
            aria-hidden="true"
          />
          <div
            className={`absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l ${fadeColor} to-transparent pointer-events-none`}
            aria-hidden="true"
          />
        </>
      )}

      <motion.div
        className={`flex shrink-0 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{ gap, paddingRight: gap, width: "max-content" }}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
