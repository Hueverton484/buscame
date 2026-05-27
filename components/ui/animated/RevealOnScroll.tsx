"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface Props {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  blur?: boolean;
  scale?: boolean;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  className?: string;
  as?: keyof typeof tags;
}

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
};

const DIRECTION_MAP = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Reveal genérico: cuando el elemento entra al viewport, hace fade
 * + traslación + opcional blur + opcional escala.
 */
export function RevealOnScroll({
  children,
  direction = "up",
  distance,
  blur = false,
  scale = false,
  delay = 0,
  duration = 0.7,
  once = true,
  margin = "-50px",
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref as React.RefObject<Element>, { once, margin: margin as any });

  const dir = DIRECTION_MAP[direction];
  const distMult = distance ? distance / 30 : 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = tags[as] as any;

  return (
    <Tag
      ref={ref}
      initial={{
        opacity: 0,
        x: dir.x * distMult,
        y: dir.y * distMult,
        ...(blur ? { filter: "blur(10px)" } : {}),
        ...(scale ? { scale: 0.95 } : {}),
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              ...(blur ? { filter: "blur(0px)" } : {}),
              ...(scale ? { scale: 1 } : {}),
            }
          : {}
      }
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
