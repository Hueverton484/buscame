import { getPublicaciones, getEstadisticas } from "@/lib/supabase/queries";
import { DedicatoriaMalawi } from "@/components/DedicatoriaMalawi";
import { HeroHome } from "@/components/home/HeroHome";
import { StatsBar } from "@/components/home/StatsBar";
import { PublicacionesFeatured } from "@/components/home/PublicacionesFeatured";
import { ComoFunciona } from "@/components/home/ComoFunciona";
import { Reencuentros } from "@/components/home/Reencuentros";
import { ComunidadTeaser } from "@/components/home/ComunidadTeaser";
import { CtaFinal } from "@/components/home/CtaFinal";

export default async function HomePage() {
  const [publicaciones, estadisticas] = await Promise.all([
    getPublicaciones(),
    getEstadisticas(),
  ]);

  const recientes = publicaciones.filter((p) => p.estado !== "reunido");
  const reencuentros = publicaciones.filter((p) => p.estado === "reunido");

  return (
    <>
      <DedicatoriaMalawi />
      <HeroHome estadisticas={estadisticas} />
      <StatsBar estadisticas={estadisticas} />
      <PublicacionesFeatured publicaciones={recientes} />
      <ComoFunciona />
      {reencuentros.length > 0 && (
        <Reencuentros publicaciones={reencuentros} />
      )}
      <ComunidadTeaser />
      <CtaFinal />
    </>
  );
}
