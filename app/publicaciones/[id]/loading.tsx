import { Skeleton } from "@/components/Skeleton";

export default function DetalleLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-5 w-40 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
            <Skeleton className="h-20 w-full mt-4" />
          </div>
        </div>

        <aside className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </aside>
      </div>
    </div>
  );
}
