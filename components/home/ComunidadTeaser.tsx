"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, MessageCircle, Quote } from "lucide-react";
import { SectionHeader, Marquee, MagneticButton } from "@/components/ui/animated";

const QUOTES_A = [
  { texto: "Vi al perrito perdido cruzando una avenida. Saqué foto, mandé pista. Ya está con su familia.", autor: "Joaquín, Núñez" },
  { texto: "La interfaz es clarísima. Subí publicación en 3 minutos y a la hora ya tenía dos avisos.", autor: "Paula, Villa Urquiza" },
  { texto: "Mi perra desapareció una noche de tormenta. A la mañana la encontré gracias a Buscame.", autor: "María, Recoleta" },
  { texto: "Nunca pensé que podía ayudar tanto desde el celular. Mandé tres pistas y ya hay un reencuentro.", autor: "Federico, Almagro" },
  { texto: "Necesitábamos algo así hace años. Lo cuento en cada lugar al que voy.", autor: "Mariana, Boedo" },
];

const QUOTES_B = [
  { texto: "El mapa con publicaciones cercanas es lo mejor. Veo en mi celu si hay algún caso en mi cuadra.", autor: "Pablo, Belgrano" },
  { texto: "Me enteré por una vecina. La instalé en el celu el mismo día. Hoy ayudé a recuperar dos.", autor: "Carolina, Caballito" },
  { texto: "Subí foto y datos. En seis horas alguien lo vio a dos cuadras de casa. Increíble.", autor: "Sol, Villa Crespo" },
  { texto: "Lloro cada vez que veo un perro marcado como reunido. Es un golazo colectivo.", autor: "Mateo, Chacarita" },
  { texto: "Después de tres años buscando una herramienta así, la encontré. Gracias por hacerla gratis.", autor: "Andrés, Saavedra" },
];

export function ComunidadTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-stone-50 py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14">
        <SectionHeader
          badge="La comunidad"
          badgeIcon={<MessageCircle className="h-3 w-3" />}
          badgeColor="stone"
          title={
            <>
              Lo que dice <em className="not-italic text-brand-500">la gente</em>
            </>
          }
          subtitle="Vecinos comunes que tuvieron el reflejo de mirar, sacar foto y mandar pista."
          size="lg"
        />
      </div>

      <div className="space-y-5">
        <Marquee duration={50} fade fadeColor="from-stone-50" gap="1.25rem">
          {QUOTES_A.map((q, i) => (
            <QuoteCard key={`a-${i}`} texto={q.texto} autor={q.autor} accent="brand" />
          ))}
        </Marquee>
        <Marquee duration={60} direction="right" fade fadeColor="from-stone-50" gap="1.25rem">
          {QUOTES_B.map((q, i) => (
            <QuoteCard key={`b-${i}`} texto={q.texto} autor={q.autor} accent="emerald" />
          ))}
        </Marquee>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center px-4"
      >
        <MagneticButton href="/comunidad" variant="dark" size="lg" shine>
          Conocé toda la comunidad
          <ArrowRight className="h-5 w-5" />
        </MagneticButton>
      </motion.div>
    </section>
  );
}

const ACCENT = {
  brand: "border-l-brand-500",
  emerald: "border-l-emerald-500",
  amber: "border-l-amber-500",
  rose: "border-l-rose-500",
} as const;

function QuoteCard({
  texto,
  autor,
  accent = "brand",
}: {
  texto: string;
  autor: string;
  accent?: keyof typeof ACCENT;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-[340px] sm:w-[420px] shrink-0 bg-white rounded-2xl border border-stone-200 border-l-4 ${ACCENT[accent]} p-6 shadow-sm hover:shadow-xl transition-shadow`}
    >
      <Quote className="absolute top-4 right-4 h-7 w-7 text-stone-200" aria-hidden="true" />
      <p className="text-stone-800 leading-relaxed text-base pr-6 mb-3">“{texto}”</p>
      <p className="text-sm font-medium text-stone-500">{autor}</p>
    </motion.div>
  );
}
