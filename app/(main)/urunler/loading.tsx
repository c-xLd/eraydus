import { Skeleton } from '@/components/ui/skeleton'

export default function UrunlerLoading() {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="pt-24 sm:pt-32 pb-6 sm:pb-10 border-b border-black/5">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <Skeleton className="h-3 w-36 rounded-full" />
              <Skeleton className="h-10 sm:h-14 w-72 sm:w-96 rounded-xl" />
              <Skeleton className="h-4 w-full max-w-lg rounded-lg" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-36 rounded-full" />
              <Skeleton className="h-11 w-36 rounded-full" />
            </div>
          </div>
          <div className="pt-4 border-t border-black/5 flex gap-6">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-4 w-28 rounded" />
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
        {/* Categories Showcase Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full rounded-xl sm:rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Product Grid Section Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-40 rounded-lg" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2.5">
                <Skeleton className="aspect-[3/4] w-full rounded-xl sm:rounded-2xl" />
                <Skeleton className="h-3 w-1/3 rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
