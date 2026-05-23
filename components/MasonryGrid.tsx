"use client";

import Masonry from "react-masonry-css";
import { PublicacionCard } from "./PublicacionCard";
import type { Publicacion } from "@/lib/types";

const breakpointColumns = {
  default: 3,
  1024: 2,
  640: 1,
};

export function MasonryGrid({ publicaciones }: { publicaciones: Publicacion[] }) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-5 w-auto"
      columnClassName="flex flex-col gap-5"
    >
      {publicaciones.map((pub) => (
        <PublicacionCard key={pub.id} publicacion={pub} />
      ))}
    </Masonry>
  );
}
