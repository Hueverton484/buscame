"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Quote, MessageCircle } from "lucide-react";

interface Testimonio {
  texto: string;
  nombre: string;
  contexto: string;
  color: string;
}

const TESTIMONIOS_A: Testimonio[] = [
  {
    texto:
      "Mi perra desapareció una noche de tormenta. A la mañana siguiente, gracias a una pista de Buscame, la encontré en otro barrio.",
    nombre: "María",
    contexto: "Recoleta",
    color: "border-l-rose-500",
  },
  {
    texto:
      "Nunca pensé que podía ayudar tanto desde el celular. Mandé tres pistas y ya hay un reencuentro.",
    nombre: "Federico",
    contexto: "Almagro",
    color: "border-l-brand-500",
  },
  {
    texto:
      "La interfaz es clarísima. Subí publicación en 3 minutos y a la hora ya tenía dos avisos.",
    nombre: "Paula",
    contexto: "Villa Urquiza",
    color: "border-l-amber-500",
  },
  {
    texto:
      "Vi al perro perdido cruzando una avenida. Saqué foto desde el colectivo, mandé pista. Ya está con su familia.",
    nombre: "Joaquín",
    contexto: "Núñez",
    color: "border-l-emerald-500",
  },
  {
    texto:
      "Necesitábamos algo así hace años. Lo cuento en cada lugar al que voy.",
    nombre: "Mariana",
    contexto: "Boedo",
    color: "border-l-violet-500",
  },
];

const TESTIMONIOS_B: Testimonio[] = [
  {
    texto:
      "El mapa con las publicaciones cercanas es lo mejor. Veo en mi celular si hay algún caso en mi cuadra.",
    nombre: "Pablo",
    contexto: "Belgrano",
    color: "border-l-trust-700",
  },
  {
    texto:
      "Me enteré por una vecina. La instalé en el celu el mismo día. Hoy ayudé a recuperar dos.",
    nombre: "Carolina",
    contexto: "Caballito",
    color: "border-l-pink-500",
  },
  {
    texto:
      "Después de tres años buscando una herramienta así, la encontré. Gracias por hacerla gratis.",
    nombre: "Andrés",
    contexto: "Saavedra",
    color: "border-l-orange-500",
  },
  {
    texto:
      "Subí foto, datos y en seis horas alguien lo vio dos cuadras de casa. Increíble.",
    nombre: "Sol",
    contexto: "Villa Crespo",
    color: "border-l-teal-500",
  },
  {
    texto:
      "Lloro cada vez que veo un perro marcado como reunido. Es un golazo colectivo.",
    nombre: "Mateo",
    contexto: "Chacarita",
    color: "border-l-yellow-500",
  },
];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-stone-50 py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider mb-4">
            <MessageCircle className="h-3 w-3" /> En sus palabras
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-stone-900 tracking-tight leading-[1.05]">
            Lo que dice <em className="not-italic text-brand-500">la gente</em>
          </h2>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="relative space-y-5">
        {/* Fade gradients laterales */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <MarqueeRow testimonios={TESTIMONIOS_A} direction="left" duration={45} />
        <MarqueeRow testimonios={TESTIMONIOS_B} direction="right" duration={55} />
      </div>
    </section>
  );
}

function MarqueeRow({
  testimonios,
  direction,
  duration,
}: {
  testimonios: Testimonio[];
  direction: "left" | "right";
  duration: number;
}) {
  // Duplicamos la lista para el efecto seamless
  const items = [...testimonios, ...testimonios];

  return (
    <div className="group relative flex overflow-hidden">
      <motion.div
        className="flex gap-5 pr-5 shrink-0"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: "max-content" }}
      >
        {items.map((t, i) => (
          <TestimonioCard key={`${t.nombre}-${i}`} testimonio={t} />
        ))}
      </motion.div>
    </div>
  );
}

function TestimonioCard({ testimonio }: { testimonio: Testimonio }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group/card relative w-[340px] sm:w-[400px] shrink-0 bg-white rounded-2xl border border-stone-200 border-l-4 ${testimonio.color} p-6 shadow-sm hover:shadow-xl transition-shadow`}
    >
      <Quote
        className="absolute top-4 right-4 h-7 w-7 text-stone-200"
        aria-hidden="true"
      />
      <p className="text-stone-800 leading-relaxed text-base mb-4 pr-8">
        “{testimonio.texto}”
      </p>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-stone-900">{testimonio.nombre}</span>
        <span className="text-stone-400">·</span>
        <span className="text-stone-500">{testimonio.contexto}</span>
      </div>
    </motion.div>
  );
}
