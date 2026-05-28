"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { motion } from "motion/react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}

export function PageHero({ title, subtitle, badge, children }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Animated WebGL shader background */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#1c1917", "#c2410c", "#ff6b35", "#78350f"]}
        speed={0.5}
      />
      {/* Subtle grid for depth */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden="true"
      />
      {/* Overlay gradients for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-stone-950/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {badge && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-wider">
                {badge}
              </span>
            </div>
          )}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </div>
    </div>
  );
}
