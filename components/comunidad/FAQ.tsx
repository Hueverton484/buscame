"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface QnA {
  q: string;
  a: string;
}

const PREGUNTAS: QnA[] = [
  {
    q: "¿Es realmente gratis?",
    a: "Sí, 100% gratis. Sin avisos, sin planes premium, sin trucos. La plataforma se mantiene con esfuerzo voluntario y aportes mínimos. Si te resulta útil, lo único que pedimos es que la compartas con vecinos.",
  },
  {
    q: "¿Necesito crearme una cuenta para mandar una pista?",
    a: "Para mandar pistas con foto y ubicación necesitás crear una cuenta — sólo nombre y email, sin verificación complicada. Eso evita spam y nos permite que el dueño pueda contactarte.",
  },
  {
    q: "¿Cómo sé que la persona que reporta el perro no es un estafador?",
    a: "Cada cuenta tiene email verificado y captcha, y todas las publicaciones pueden ser denunciadas por la comunidad. Si algo te huele raro, marcalo: nuestro equipo revisa cada caso.",
  },
  {
    q: "¿Funciona fuera de Buenos Aires?",
    a: "Por ahora estamos enfocados en CABA porque es donde tenemos la masa crítica de vecinos activos. Si te interesa que llegue a tu ciudad, escribinos: queremos crecer pero con comunidades reales detrás.",
  },
  {
    q: "¿Qué pasa con mis datos?",
    a: "Tu email queda guardado para que puedan contactarte sobre tu publicación. No vendemos datos a nadie, no enviamos newsletters, no hacemos retargeting. Lo único que se muestra públicamente es lo que vos publicás.",
  },
  {
    q: "¿Puedo ayudar de alguna otra manera?",
    a: "Sí. Lo más útil: difundir Buscame en grupos de tu barrio y mandar pistas cuando veas un perro perdido. Si sabés de diseño, código o comunicación y querés contribuir, escribinos.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative bg-stone-50 py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,107,53,0.1),_transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="h-3 w-3" /> Preguntas frecuentes
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-stone-900 tracking-tight leading-[1.05]">
            Lo que querés <em className="not-italic text-brand-500">saber</em>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {PREGUNTAS.map((qa, i) => (
            <FAQItem
              key={i}
              qa={qa}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              inView={inView}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-stone-500 mt-10"
        >
          ¿No encontrás respuesta? Mandanos un mensaje a{" "}
          <a
            href="mailto:hola@buscame.com.ar"
            className="font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-2"
          >
            hola@buscame.com.ar
          </a>
        </motion.p>
      </div>
    </section>
  );
}

function FAQItem({
  qa,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  qa: QnA;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
      className={`overflow-hidden rounded-2xl bg-white border ${
        isOpen ? "border-brand-300 shadow-lg" : "border-stone-200 shadow-sm"
      } transition-colors`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={`font-display text-lg sm:text-xl font-semibold leading-tight ${
            isOpen ? "text-brand-600" : "text-stone-900"
          } transition-colors`}
        >
          {qa.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`flex h-9 w-9 items-center justify-center rounded-full shrink-0 ${
            isOpen
              ? "bg-brand-500 text-white"
              : "bg-stone-100 text-stone-600"
          } transition-colors`}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 -mt-1 text-stone-600 leading-relaxed">
              {qa.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
