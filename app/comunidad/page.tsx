import { getEstadisticas } from "@/lib/supabase/queries";
import { Hero } from "@/components/comunidad/Hero";
import { Stats } from "@/components/comunidad/Stats";
import { Journey } from "@/components/comunidad/Journey";
import { Heroes } from "@/components/comunidad/Heroes";
import { Timeline } from "@/components/comunidad/Timeline";
import { Marquee } from "@/components/comunidad/Marquee";
import { MapaPulsante } from "@/components/comunidad/MapaPulsante";
import { FAQ } from "@/components/comunidad/FAQ";
import { CTA } from "@/components/comunidad/CTA";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata = {
  title: "Comunidad — Vecinos que devuelven perros a casa",
  description:
    "La historia de la comunidad detrás de Buscame: vecinos y vecinas que cada día ayudan a reencontrar perros perdidos en Buenos Aires.",
  openGraph: {
    title: "Comunidad — Buscame",
    description: "Vecinos y vecinas que devuelven perros a casa en Buenos Aires.",
  },
};

export default async function ComunidadPage() {
  const estadisticas = await getEstadisticas();
  const total =
    estadisticas.activas + estadisticas.avistados + estadisticas.reunidos;

  return (
    <>
      <ScrollProgress />
      <Hero estadisticas={estadisticas} />
      <Stats estadisticas={estadisticas} total={total} />
      <Journey />
      <Heroes />
      <Timeline />
      <Marquee />
      <MapaPulsante />
      <FAQ />
      <CTA />
    </>
  );
}
