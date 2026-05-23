import { PublicacionGridSkeleton, Skeleton } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-brand-50 via-stone-50 to-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <Skeleton className="h-14 w-3/4" />
            <Skeleton className="h-14 w-1/2" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full max-w-xl" />
              <Skeleton className="h-5 w-2/3" />
            </div>
            <div className="flex gap-3 pt-4">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-5 w-80 mb-8" />
        <PublicacionGridSkeleton count={6} />
      </section>
    </>
  );
}
