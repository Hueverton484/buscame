import { PublicacionGridSkeleton, Skeleton } from "@/components/Skeleton";

export default function PublicacionesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-40" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-3">
          <Skeleton className="h-80 w-full" />
        </aside>
        <section>
          <PublicacionGridSkeleton count={6} />
        </section>
      </div>
    </div>
  );
}
