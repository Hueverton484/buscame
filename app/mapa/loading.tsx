import { Skeleton } from "@/components/Skeleton";

export default function MapaLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <Skeleton className="h-9 w-32 mb-2" />
        <Skeleton className="h-5 w-48" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside>
          <Skeleton className="h-80 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </aside>
        <Skeleton className="w-full" style={{ height: "calc(100vh - 200px)" }} />
      </div>
    </div>
  );
}
