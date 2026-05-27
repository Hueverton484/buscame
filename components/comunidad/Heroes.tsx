"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "motion/react";
import { Quote, Award } from "lucide-react";

interface Heroe {
  nombre: string;
  barrio: string;
  historia: string;
  perro: string;
  avatar: string;
  gradient: string;
  emoji: string;
}

const HEROES: Heroe[] = [
  {
    nombre: "Lucía",
    barrio: "Palermo",
    historia:
      "Vi a un caniche temblando en el parque a las 7am. Saqué foto y subí avistamiento. A la hora ya estaba con su familia.",
    perro: "Toby — 4 años",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    gradient: "from-rose-500/80 to-orange-500/80",
    emoji: "🌅",
  },
  {
    nombre: "Martín",
    barrio: "Villa Crespo",
    historia:
      "Mi hijo encontró un perrito en la puerta del cole. Subimos foto y a las dos horas vino el dueño llorando de alegría.",
    perro: "Coco — mestizo",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    gradient: "from-amber-500/80 to-yellow-500/80",
    emoji: "🏫",
  },
  {
    nombre: "Sofía",
    barrio: "Recoleta",
    historia:
      "Reconocí al perrito de una publicación cuando lo vi en una esquina. Mandé pista y al rato vino la familia. Lloré con ellos.",
    perro: "Maca — galga",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    gradient: "from-violet-500/80 to-pink-500/80",
    emoji: "💌",
  },
  {
    nombre: "Diego",
    barrio: "Caballito",
    historia:
      "Encontré uno asustado bajo un auto en una tormenta. Lo metí en casa, subí publicación. En 30 min apareció la dueña, era de la otra cuadra.",
    perro: "Pelusa — bichón",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    gradient: "from-trust-700/80 to-blue-500/80",
    emoji: "⛈️",
  },
  {
    nombre: "Camila",
    barrio: "Belgrano",
    historia:
      "Llevo tres reencuentros ayudados en seis meses. Es adictivo: cada uno te deja una sensación que no se compra con nada.",
    perro: "Y los que vienen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    gradient: "from-emerald-500/80 to-teal-500/80",
    emoji: "🏆",
  },
  {
    nombre: "Tomás",
    barrio: "San Telmo",
    historia:
      "Soy fotógrafo. Cuando perdí al mío, la comunidad lo encontró en dos días. Desde entonces ayudo con fotos a otras publicaciones.",
    perro: "Frida — labradora",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
    gradient: "from-stone-700/80 to-stone-500/80",
    emoji: "📸",
  },
];

export function Heroes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white py-24 sm:py-32 overflow-hidden">
      {/* Bg ornament */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] bg-gradient-radial from-brand-100/50 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="h-3 w-3" /> Vecinos que ayudan
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-stone-900 tracking-tight leading-[1.05]">
            Las personas detrás{" "}
            <em className="not-italic text-brand-500">de cada reencuentro</em>
          </h2>
          <p className="mt-5 text-lg text-stone-600 leading-relaxed">
            Vecinas y vecinos comunes que tuvieron el reflejo de mirar, sacar
            foto y mandar pista. Sin ellos, nada de esto pasa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HEROES.map((heroe, i) => (
            <HeroeCard
              key={heroe.nombre}
              heroe={heroe}
              inView={inView}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroeCard({
  heroe,
  inView,
  delay,
}: {
  heroe: Heroe;
  inView: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  // Glare position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${heroe.gradient} text-white shadow-lg hover:shadow-2xl transition-shadow duration-300`}
      >
        {/* Glare */}
        <motion.div
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.25), transparent 50%)`,
            left: glareX,
            top: glareY,
          }}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
          aria-hidden="true"
        />

        {/* Avatar + nombre */}
        <div className="relative flex items-center gap-4 mb-5" style={{ transform: "translateZ(40px)" }}>
          <div className="relative h-14 w-14 rounded-full overflow-hidden ring-4 ring-white/30 shadow-lg shrink-0">
            <img
              src={heroe.avatar}
              alt={heroe.nombre}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold leading-tight">
              {heroe.nombre}
            </h3>
            <p className="text-sm text-white/80">{heroe.barrio}</p>
          </div>
          <div className="ml-auto text-3xl" aria-hidden="true">
            {heroe.emoji}
          </div>
        </div>

        {/* Quote */}
        <Quote
          className="absolute top-6 right-6 h-10 w-10 text-white/15 rotate-180"
          aria-hidden="true"
        />
        <p
          className="relative text-base leading-relaxed text-white/95 mb-5"
          style={{ transform: "translateZ(30px)" }}
        >
          {heroe.historia}
        </p>

        {/* Footer */}
        <div
          className="relative pt-4 border-t border-white/20 text-sm font-medium text-white/80"
          style={{ transform: "translateZ(20px)" }}
        >
          Ayudó con: <span className="text-white font-semibold">{heroe.perro}</span>
        </div>

        {/* Decorative blob */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
}
