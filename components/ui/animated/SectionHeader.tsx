"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

type BadgeColor = "brand" | "stone" | "white" | "emerald" | "amber" | "rose" | "trust";

interface Props {
  badge?: string;
  badgeIcon?: ReactNode;
  badgeColor?: BadgeColor;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  variant?: "light" | "dark";
  className?: string;
  size?: "md" | "lg" | "xl";
}

const BADGE_COLORS: Record<BadgeColor, string> = {
  brand: "bg-brand-100 text-brand-700",
  stone: "bg-stone-900 text-white",
  white: "bg-white/10 border border-white/20 text-white",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  trust: "bg-trust-50 text-trust-700",
};

const SIZE_CLASSES = {
  md: "text-3xl sm:text-4xl lg:text-5xl",
  lg: "text-4xl sm:text-5xl lg:text-6xl",
  xl: "text-5xl sm:text-6xl lg:text-7xl",
};

/**
 * Header de sección con badge + título + subtitle. Anima al entrar al viewport.
 */
export function SectionHeader({
  badge,
  badgeIcon,
  badgeColor = "brand",
  title,
  subtitle,
  align = "center",
  variant = "light",
  className = "",
  size = "lg",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const titleColor = variant === "dark" ? "text-white" : "text-stone-900";
  const subColor = variant === "dark" ? "text-stone-300" : "text-stone-600";

  return (
    <div
      ref={ref}
      className={`${align === "center" ? "text-center mx-auto" : "text-left"} max-w-2xl ${className}`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${BADGE_COLORS[badgeColor]}`}
        >
          {badgeIcon}
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={`font-display font-semibold tracking-tight leading-[1.05] ${SIZE_CLASSES[size]} ${titleColor}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-5 text-lg leading-relaxed ${subColor}`}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
}
